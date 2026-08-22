/**
 * Numeric history for cards that draw a measurement's recent past.
 *
 * THE TRANSPORT is the one materia-carousel already uses —
 * `history/history_during_period` over the websocket, `minimal_response` and
 * `no_attributes` — so there is one way this library asks the recorder for
 * history and not two. Carousel's own reader stays where it is: it counts how
 * often a text state occurred, which is a different question from "plot this
 * number", and folding them together would serve neither.
 *
 * THE THREE THINGS THAT MAKE REAL HISTORY DIFFERENT FROM SAMPLE DATA
 *
 * 1. It is a STEP FUNCTION, not a series of readings. The recorder stores a
 *    row when a state CHANGES, so a battery sitting at 47% for six hours has
 *    one sample, not six. Carrying that value forward is therefore not
 *    interpolation — it is what the entity's state actually was. resample()
 *    reads the state in effect at each bucket, which is the only reading that
 *    matches HA's own semantics.
 *
 * 2. A GAP IS NOT THE SAME AS A FLAT LINE. `unavailable` and `unknown` runs
 *    mean nobody knows what the value was. Those buckets come back null, and
 *    a caller that draws a line must BREAK it there. Drawing straight through
 *    an outage invents a past, and inventing the past is the one thing a card
 *    whose whole premise is "every number gets its past" must not do.
 *
 * 3. THE WINDOW MAY EXCEED RETENTION. A recorder keeping three days answers a
 *    fourteen-day question with nothing at all — not an error, just an empty
 *    series. Every function here returns empty rather than throwing, and
 *    callers are expected to render the no-history case as a first-class
 *    layout rather than a hole where a chart should be.
 *
 * `now` is a parameter everywhere it matters so bucketing can be asserted
 * against a fixed clock instead of whatever time the test happens to run at.
 */

/** States that carry no number. Anything unparseable joins them. */
const GAP_STATES = new Set(["unavailable", "unknown", "none", ""]);

/** HA sends `lu` in float seconds; be tolerant of ms and ISO strings too. */
function readTime(sample) {
  const raw = sample?.lu ?? sample?.last_updated ?? sample?.last_changed;
  if (raw == null) return null;
  if (typeof raw === "number") return raw < 1e12 ? raw * 1000 : raw;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : null;
}

function readNumber(sample) {
  const raw = sample?.s ?? sample?.state;
  if (raw == null || GAP_STATES.has(String(raw).toLowerCase())) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/**
 * One entity's numeric history, oldest first.
 * Returns `[{ t, v }]` where `v: null` marks a known gap (the entity reported
 * unavailable/unknown at that moment) — kept in the series on purpose, because
 * a gap is information.
 *
 * Never throws: no recorder, no permission, an entity that never existed and a
 * window past retention all come back as an empty array.
 */
export async function fetchNumericHistory(hass, entityId, hours, now = Date.now()) {
  if (!hass?.connection || !entityId || !(hours > 0)) return [];
  const start = new Date(now - hours * 3600 * 1000).toISOString();
  try {
    const result = await hass.connection.sendMessagePromise({
      type: "history/history_during_period",
      start_time: start,
      end_time: new Date(now).toISOString(),
      entity_ids: [entityId],
      minimal_response: true,
      no_attributes: true,
    });
    const rows = result?.[entityId] || [];
    const out = [];
    for (const row of rows) {
      const t = readTime(row);
      if (t == null) continue;
      out.push({ t, v: readNumber(row) });
    }
    out.sort((a, b) => a.t - b.t);
    return out;
  } catch (_) {
    return [];
  }
}

/**
 * Even time buckets across [now - hours, now], each holding the value IN
 * EFFECT at its midpoint — the step-function read described above.
 *
 * Returns `[{ t, v }]` of length `points`, `v: null` where the state was a gap
 * or where nothing had been recorded yet. Callers break their line on null.
 */
export function resample(series, points, hours, now = Date.now()) {
  const n = Math.max(2, Math.min(400, Math.round(points)));
  if (!series?.length || !(hours > 0)) return [];
  const start = now - hours * 3600 * 1000;
  const step = (now - start) / n;
  const out = [];
  let idx = 0;
  let held = null; // the state in effect, carried forward until it changes
  for (let i = 0; i < n; i++) {
    const mid = start + step * (i + 0.5);
    while (idx < series.length && series[idx].t <= mid) {
      held = series[idx].v;
      idx++;
    }
    // Before the first recorded sample there is no state to hold, which is a
    // gap and not a zero.
    out.push({ t: mid, v: idx === 0 ? null : held });
  }
  return out;
}

/** Split a resampled series into runs of consecutive non-null values, so a
 *  line can be drawn as several paths and break across every gap. */
export function segments(resampled) {
  const out = [];
  let cur = [];
  for (const p of resampled || []) {
    if (p.v == null) {
      if (cur.length) out.push(cur);
      cur = [];
    } else {
      cur.push(p);
    }
  }
  if (cur.length) out.push(cur);
  return out;
}

const AGGREGATES = {
  mean: (vs) => vs.reduce((a, b) => a + b, 0) / vs.length,
  sum: (vs) => vs.reduce((a, b) => a + b, 0),
  min: (vs) => Math.min(...vs),
  max: (vs) => Math.max(...vs),
  // A counter's movement across the bucket. This is what "how much happened
  // today" means for an odometer or an energy total, and it is why the
  // bucketed variants default to it rather than to mean.
  delta: (vs) => vs[vs.length - 1] - vs[0],
  count: (vs) => vs.length,
};

export const AGGREGATE_NAMES = Object.keys(AGGREGATES);

/**
 * Daily buckets, oldest first, ending with the day `now` falls in.
 *
 * A day with NO samples is omitted entirely rather than reported as zero:
 * "nothing was recorded" and "nothing happened" are different facts, and only
 * the second one deserves a bar. That distinction is what lets a caller draw
 * the concept's stub for an idle day while an out-of-retention day simply is
 * not there — and it is why a three-day recorder answering a seven-day
 * request yields three buckets instead of four blanks and three bars.
 *
 * Buckets are cut on LOCAL midnights, because "yesterday" is a local idea.
 */
export function bucketDays(series, { days = 7, aggregate = "delta", now = Date.now() } = {}) {
  const fn = AGGREGATES[aggregate] || AGGREGATES.delta;
  const nDays = Math.max(1, Math.min(90, Math.round(days)));
  if (!series?.length) return [];

  // Local midnight of the day `now` is in, then step back.
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);
  const dayMs = 24 * 3600 * 1000;
  const firstStart = midnight.getTime() - (nDays - 1) * dayMs;

  const bins = new Map();
  for (const p of series) {
    if (p.v == null || p.t < firstStart) continue;
    const day = Math.floor((p.t - firstStart) / dayMs);
    if (day < 0 || day >= nDays) continue;
    if (!bins.has(day)) bins.set(day, []);
    bins.get(day).push(p.v);
  }

  const out = [];
  for (let d = 0; d < nDays; d++) {
    const vs = bins.get(d);
    if (!vs || !vs.length) continue; // no data is not zero
    const v = fn(vs);
    out.push({ t: firstStart + d * dayMs, v: Number.isFinite(v) ? v : 0, samples: vs.length });
  }
  return out;
}

/**
 * The entity's CURRENT state, appended as a real sample.
 *
 * WHY THIS IS NOT FABRICATION. The recorder only stores changes, so its last
 * row can be hours old — and when an integration marks an entity unavailable
 * while a device sleeps, the tail of the series is a legitimate gap even though
 * the value is known right now. The live state is the most authoritative sample
 * there is, and `last_changed` is the moment it took effect, so placing it at
 * that timestamp states something true rather than extending a guess.
 *
 * It is timestamped at last_changed and NOT at `now` on purpose: resample reads
 * each bucket's midpoint, so a sample stamped `now` falls past the last
 * midpoint and would change nothing.
 *
 * WHAT THIS DELIBERATELY DOES NOT DO: it does not close a gap the entity is
 * still in. A currently-unavailable entity carries no number, so nothing is
 * appended and the outage runs to the right edge — which is the honest picture.
 * An outage that has ENDED keeps its break and the tail reaches the edge.
 */
export function withLiveSample(series, stateObj, now = Date.now()) {
  const base = series || [];
  const raw = stateObj?.state;
  if (raw == null || GAP_STATES.has(String(raw).toLowerCase())) return base;
  const v = Number(raw);
  if (!Number.isFinite(v)) return base;

  const t = readTime({ lu: stateObj.last_changed ?? stateObj.last_updated }) ?? now;
  const at = Math.min(t, now);
  const last = base[base.length - 1];
  // Already covered: the recorder's own last row is this value, at or after
  // the moment it took effect.
  if (last && last.v === v && last.t >= at) return base;
  const out = [...base, { t: at, v }];
  out.sort((a, b) => a.t - b.t);
  return out;
}

/**
 * The change across the whole series, for a delta readout: the first and last
 * values that are actually known, and their difference. Null when fewer than
 * two known values exist — a delta needs two points and guessing one is how
 * you end up reporting a trend that never happened.
 */
export function delta(series) {
  const known = (series || []).filter((p) => p.v != null);
  if (known.length < 2) return null;
  const from = known[0].v;
  const to = known[known.length - 1].v;
  return { from, to, abs: to - from, pct: from === 0 ? null : ((to - from) / Math.abs(from)) * 100 };
}
