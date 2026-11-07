/**
 * Pure media-player helpers shared by the expressive media family
 * (materia-media variant player, materia-media-progress variant player,
 * materia-button-group transport/toolbar, materia-volume-knob, the volume
 * ring, the media header and the station grid). No DOM, no Lit: unit-tested.
 */

/** Volume scale of the Arcam template player: 0..99 steps. */
export const MAX_STEPS = 99;

/** HA MediaPlayerEntityFeature bits read by mediaControls(). */
export const MEDIA_FEATURE = {
  PAUSE: 1,
  SEEK: 2,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  PLAY: 16384,
  SHUFFLE_SET: 32768,
  REPEAT_SET: 262144,
};

const finite = (v) => (v === null || v === undefined || v === "" ? NaN : Number(v));

/** Volume in steps: `volume_steps` when the player publishes it, else volume_level x 99. */
export function volumeSteps(stateObj) {
  const a = stateObj?.attributes ?? {};
  const steps = finite(a.volume_steps);
  if (Number.isFinite(steps)) return Math.max(0, Math.min(MAX_STEPS, Math.round(steps)));
  const level = finite(a.volume_level);
  return Number.isFinite(level) ? Math.round(Math.max(0, Math.min(1, level)) * MAX_STEPS) : 0;
}

/** Upper volume limit in steps from the `limit` attribute; no (valid) limit = MAX_STEPS. */
export function volumeLimit(stateObj) {
  const l = finite(stateObj?.attributes?.limit);
  return Number.isFinite(l) && l > 0 ? Math.min(Math.round(l), MAX_STEPS) : MAX_STEPS;
}

export function isMediaOff(stateObj) {
  return !stateObj || ["off", "unavailable", "unknown"].includes(stateObj.state);
}

export function isLive(stateObj) {
  const v = stateObj?.attributes?.live;
  return v === true || v === "true" || v === "on";
}

/**
 * Which transport controls work right now. A player that publishes a
 * `controls` list (the Arcam template player) is taken at its word; anything
 * else is read from supported_features.
 */
export function mediaControls(stateObj) {
  const a = stateObj?.attributes ?? {};
  if (Array.isArray(a.controls)) return a.controls.map(String);
  const f = Number(a.supported_features) || 0;
  const out = [];
  if (f & (MEDIA_FEATURE.PAUSE | MEDIA_FEATURE.PLAY)) out.push("play_pause");
  if (f & MEDIA_FEATURE.PREVIOUS_TRACK) out.push("previous");
  if (f & MEDIA_FEATURE.NEXT_TRACK) out.push("next");
  if (f & MEDIA_FEATURE.SEEK && Number(a.media_duration) > 0) out.push("seek");
  if (f & MEDIA_FEATURE.SHUFFLE_SET) out.push("shuffle");
  if (f & MEDIA_FEATURE.REPEAT_SET) out.push("repeat");
  return out;
}

/** Live media position in seconds (null when the player reports none). */
export function mediaPosition(stateObj, now = Date.now()) {
  const a = stateObj?.attributes ?? {};
  const pos = finite(a.media_position);
  if (!Number.isFinite(pos)) return null;
  let p = pos;
  if (stateObj.state === "playing" && a.media_position_updated_at) {
    const t = new Date(a.media_position_updated_at).getTime();
    if (Number.isFinite(t)) p += Math.max(0, now - t) / 1000;
  }
  const dur = finite(a.media_duration);
  return Number.isFinite(dur) && dur > 0 ? Math.min(p, dur) : p;
}

/** Repeat cycle of the toolbar button: off -> all -> one -> off. */
export function nextRepeat(current) {
  return { off: "all", all: "one", one: "off" }[current ?? "off"] ?? "all";
}

/**
 * First and last VISIBLE index of a connected row. Outer radii must follow
 * what is shown: a hidden sibling must never make a visible button lose (or
 * keep) its rounded outer end, which is what :first-child/:last-child did.
 */
export function visibleEdges(visible) {
  let first = -1;
  let last = -1;
  visible.forEach((v, i) => {
    if (!v) return;
    if (first < 0) first = i;
    last = i;
  });
  return { first, last };
}

/** "+3", "−2" or "±0" for a zone offset; "" when there is none. */
export function formatOffset(offset) {
  const n = finite(offset);
  if (!Number.isFinite(n)) return "";
  return `${n > 0 ? "+" : n < 0 ? "−" : "±"}${Math.abs(n)}`;
}

/** "artist · album" (the album is dropped when it merely repeats the title). */
export function mediaByline(attributes) {
  const a = attributes ?? {};
  const album = a.media_album_name && a.media_album_name !== a.media_title ? a.media_album_name : null;
  return [a.media_artist, album].filter(Boolean).join(" · ");
}

const norm = (s) => String(s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
/** Same text, ignoring case and whitespace (empty is never the same). */
export const sameText = (a, b) => !!norm(a) && norm(a) === norm(b);
const same = sameText;

/**
 * Now-playing text with every distinct value shown once. Players that report
 * no title fall back to the app or source name (Google TV: title = app =
 * "TV VLAANDEREN", source = "Google TV"), so values are compared case- and
 * whitespace-insensitively:
 *   chip     — source, plus " · app" when the app is neither title nor source
 *   title    — the title (else the source)
 *   subtitle — artist · album, empty parts and repeats of the title dropped
 *   appChip  — the app, unless it equals the title or the source
 */
export function nowPlayingText({ source, app, title, artist, album } = {}) {
  const t = String(title ?? "").trim() || String(source ?? "").trim();
  const distinctApp = app && !same(app, t) && !same(app, source) ? String(app).trim() : "";
  const chip = [String(source ?? "").trim(), distinctApp].filter(Boolean).join(" · ");
  const parts = [];
  for (const p of [artist, album]) {
    const v = String(p ?? "").trim();
    if (v && !same(v, t) && !parts.some((q) => same(q, v))) parts.push(v);
  }
  return { chip, title: t, subtitle: parts.join(" · "), appChip: distinctApp || null };
}

/* ---- art_size: auto ------------------------------------------------------ */

/** Smallest cover in auto mode (tuned prototype), and the default largest. */
export const ART_MIN = 136;
export const ART_MAX = 420;
/** Kept free below the player inside a clipping container (pagination dots). */
export const ART_FIT_MARGIN = 16;

/**
 * Cover size for art_size: auto. `max` is the width available (capped by
 * art_max); `spare` is the vertical room left below the player in the space
 * it really has — negative when it overflows — or null when nothing bounds
 * its height. The cover grows or shrinks by exactly that room, which fits in
 * one step (the player moves by the same amount).
 */
export function fitArtSize({ current, max, spare }) {
  const cap = Math.max(ART_MIN, Math.floor(max));
  if (spare == null || !Number.isFinite(spare)) return cap;
  return Math.round(Math.max(ART_MIN, Math.min(cap, current + spare)));
}

/** Next entry of source_list after the current source (null when there is no list). */
export function nextSource(stateObj) {
  const a = stateObj?.attributes ?? {};
  const list = Array.isArray(a.source_list) ? a.source_list : [];
  if (!list.length) return null;
  const i = list.indexOf(a.source);
  return list[(i + 1) % list.length];
}

/** Index of the station that is playing now: `match`, else name vs album/title. */
export function currentStationIndex(stations, stateObj) {
  const a = stateObj?.attributes ?? {};
  const playing = [a.media_album_name, a.media_title, a.media_channel].filter(Boolean);
  return (stations ?? []).findIndex((s) => {
    const keys = [].concat(s?.match ?? s?.name ?? []).filter(Boolean);
    return keys.some((k) => playing.includes(k));
  });
}

/**
 * The volume-knob card config an opener (volume ring, toolbar, header) shows:
 * its own `volume:` block, else the one it inherits from an enclosing
 * materia-art-scope (`inherited` = { volume, entity }), defaulting to one zone
 * — the opener's own entity.
 */
export function volumeKnobConfig(config, inherited) {
  const v = config?.volume ?? inherited?.volume ?? {};
  return {
    ...v,
    type: "custom:materia-volume-knob",
    entity: v.entity ?? config?.entity ?? inherited?.entity ?? v.zones?.[0]?.entity,
  };
}

export function formatMediaTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "–:––";
  const s = Math.floor(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s % 60)}` : `${m}:${pad(s % 60)}`;
}
