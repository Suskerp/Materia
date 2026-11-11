/**
 * The robot-vacuum hero's reading of a vacuum, for other cards.
 *
 * materia-vacuum-hero is where a vacuum gets understood: it finds the dock's
 * entities, decides what counts as working, turns error codes into what to do,
 * and spots worn consumables. Other cards (a navigation row's state line, the
 * attention card) must say the same thing, so instead of a second copy of
 * that logic they ask a detached hero. It is never connected, so it never
 * renders; only its getters run, against the hass it is handed.
 */
const heroes = new Map();

function heroFor(hass, entity, brand = "roborock") {
  if (!entity || !customElements.get("materia-vacuum-hero")) return null;
  const key = `${entity}|${brand}`;
  let el = heroes.get(key);
  if (!el) {
    el = document.createElement("materia-vacuum-hero");
    el.setConfig({ entity, brand });
    heroes.set(key, el);
  }
  el.hass = hass;
  return el;
}

/**
 * Everything a card needs to talk about a vacuum the way the hero does:
 * { working, title, secondary, battery, error } (error = the hero's top error
 * alert text, or null), or null when the vacuum or the hero is missing.
 */
export function vacuumReading(hass, entity, brand) {
  const st = hass?.states?.[entity];
  const el = heroFor(hass, entity, brand);
  if (!st || !el) return null;
  try {
    const { title, secondary } = el._statusLines(st);
    const error = el._alerts.find((a) => a.severity === "error")?.text ?? null;
    return { working: el._working, title, secondary, battery: el._numOf(el._caps.battery), error };
  } catch (_) {
    return null;
  }
}

/** "Cleaning · Kitchen - 12 min left", "Docked · Last cleaned 3 h ago", or null.
 *  An error replaces the sub-line, as it takes over the hero. */
export function vacuumStatusLine(hass, entity, brand) {
  const r = vacuumReading(hass, entity, brand);
  if (!r) return null;
  return [r.title, r.error ?? r.secondary].filter(Boolean).join(" · ") || null;
}

/**
 * The hero's built-in alerts (vacuum and dock errors, water, worn parts),
 * worst first: [{ icon, text, severity: "error" | "warning", entity, reset }].
 * The hero's own appended alerts are not included: they live in that card's
 * config, not on the machine.
 */
export function vacuumAlerts(hass, entity, brand) {
  const el = heroFor(hass, entity, brand);
  if (!el || !hass?.states?.[entity]) return [];
  try {
    return el._alerts.filter((a) => a.severity === "error" || a.severity === "warning");
  } catch (_) {
    return [];
  }
}
