/**
 * Pure config transforms behind the media editors (unit-tested). Every
 * function leaves keys it does not own untouched, so YAML written by hand
 * round-trips unchanged unless the user edits that very part.
 */

/** Built-in toolbar buttons, in their canonical order. */
export const TOOLBAR_BUILTINS = ["shuffle", "repeat", "volume"];
export const DEFAULT_TOOLBAR = ["shuffle", "repeat", "volume"];

export const toolbarType = (b) => (typeof b === "string" ? b : b?.type);
export const isBuiltin = (b) => TOOLBAR_BUILTINS.includes(toolbarType(b));

/** The stored list, or the runtime default when `buttons` is absent. */
export function toolbarList(buttons) {
  return Array.isArray(buttons) ? buttons : DEFAULT_TOOLBAR;
}

/** Turns built-in `type` on or off; a new one goes after the built-ins that precede it. */
export function toggleToolbarBuiltin(buttons, type, on) {
  const list = [...toolbarList(buttons)];
  const at = list.findIndex((b) => toolbarType(b) === type);
  if (!on) {
    if (at >= 0) list.splice(at, 1);
    return list;
  }
  if (at >= 0) return list;
  const rank = TOOLBAR_BUILTINS.indexOf(type);
  let insert = 0;
  list.forEach((b, i) => {
    const r = TOOLBAR_BUILTINS.indexOf(toolbarType(b));
    if (r >= 0 && r < rank) insert = i + 1;
  });
  list.splice(insert, 0, type);
  return list;
}

export const toolbarCustoms = (buttons) => toolbarList(buttons).filter((b) => !isBuiltin(b));

/**
 * Writes the custom buttons back into the list: they refill the slots the
 * custom buttons held (so a hand-made order between built-ins survives),
 * extra ones are appended, removed ones leave their slot.
 */
export function setToolbarCustoms(buttons, customs) {
  const out = [];
  let next = 0;
  for (const b of toolbarList(buttons)) {
    if (isBuiltin(b)) out.push(b);
    else if (next < customs.length) out.push(customs[next++]);
  }
  while (next < customs.length) out.push(customs[next++]);
  return out;
}

/* ---- stations ----------------------------------------------------------- */

/** The short form `action: script.x` + `data` as the ui_action it means. */
export function legacyStationAction(st) {
  if (typeof st?.action !== "string" || !st.action.includes(".")) return undefined;
  return { action: "perform-action", perform_action: st.action, ...(st.data ? { data: st.data } : {}) };
}

/** What the station form shows: tap_action, or the short form translated. */
export function stationFormData(st) {
  const legacy = st.tap_action ? undefined : legacyStationAction(st);
  return legacy ? { ...st, tap_action: legacy } : st;
}

/**
 * Applies a station form result. An unedited short-form action stays short;
 * an edited action replaces it with tap_action.
 */
export function stationFromForm(st, value) {
  const next = { ...st, ...value };
  const legacy = st.tap_action ? undefined : legacyStationAction(st);
  if (legacy) {
    if (JSON.stringify(next.tap_action) === JSON.stringify(legacy)) delete next.tap_action;
    else {
      delete next.action;
      delete next.data;
    }
  }
  for (const k of ["name", "image"]) if (next[k] === "" || next[k] == null) delete next[k];
  if (!next.tap_action) delete next.tap_action;
  return next;
}

/* ---- art scope ---------------------------------------------------------- */

/** Cards that take the scope's media player when they name none themselves. */
const MEDIA_CARDS = new Set([
  "custom:materia-media",
  "custom:materia-media-progress",
  "custom:materia-media-header",
  "custom:materia-volume",
  "custom:materia-volume-ring",
  "custom:materia-station-grid",
]);
const MEDIA_GROUPS = new Set(["transport", "toolbar"]);

/** Fills in the scope entity on media cards without one, also inside stacks. */
export function inheritScopeEntity(card, entity) {
  if (!card || typeof card !== "object" || !entity) return card;
  let out = card;
  const media = MEDIA_CARDS.has(card.type) || (card.type === "custom:materia-button-group" && MEDIA_GROUPS.has(card.group));
  if (media && !card.entity) out = { ...out, entity };
  if (Array.isArray(card.cards)) {
    const cards = card.cards.map((c) => inheritScopeEntity(c, entity));
    if (cards.some((c, i) => c !== card.cards[i])) out = { ...out, cards };
  }
  // A nested card (`card:`) and the panels of a panel host inherit as well.
  if (card.card && typeof card.card === "object") {
    const inner = inheritScopeEntity(card.card, entity);
    if (inner !== card.card) out = { ...out, card: inner };
  }
  if (card.panels && typeof card.panels === "object") {
    let changed = false;
    const panels = {};
    for (const [id, p] of Object.entries(card.panels)) {
      panels[id] = inheritScopeEntity(p, entity);
      changed ||= panels[id] !== p;
    }
    if (changed) out = { ...out, panels };
  }
  return out;
}
