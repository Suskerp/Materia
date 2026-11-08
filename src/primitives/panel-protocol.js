/**
 * The panel request protocol, without DOM-defining imports (safe to import
 * from utils and from Node tests). panels.js installs the sheet fallback.
 */

export const PANEL_OPEN_EVENT = "materia-open-panel";
export const PANEL_CHANGED_EVENT = "materia-panel-changed";
export const DISMISS_EVENT = "materia-dismiss";

/**
 * A registry entry (or, without one, the request's own card) as
 * { heading, cards, actions, head }. Entries take three forms: a card config
 * (has `type`), { heading?, card }, or { heading?, cards: [...] }. The last two
 * also take `actions: [card configs]` (drawn in the head row, before the
 * close button) and `head: false` (no head row: the content brings its own).
 */
export function panelSpec(entry, request = {}) {
  const e = hasPanelContent(entry) ? entry : null;
  const own = e && !e.type ? e : null;
  let cards = [];
  if (e?.type) cards = [e];
  else if (Array.isArray(e?.cards)) cards = e.cards;
  else if (e?.card) cards = [e.card];
  else if (request.card) cards = [request.card];
  const heading = own?.heading ?? request.heading ?? "";
  const actions = own?.actions ?? request.actions;
  const head = (own?.head ?? request.head) !== false;
  return { heading, cards, actions: Array.isArray(actions) ? actions : [], head };
}

/**
 * One card config for the spec's cards: the card itself, or a materia-stack
 * column of them whose last card takes the remaining height (a mixer row of
 * vertical levels then fills the panel).
 */
export function panelCardConfig(spec) {
  if (spec.cards.length === 1) return spec.cards[0];
  return { type: "custom:materia-stack", direction: "column", cards: spec.cards };
}

/** Whether a registry entry has something to show (a card, `card` or `cards`). */
export function hasPanelContent(entry) {
  return !!entry && typeof entry === "object" && (!!entry.type || !!entry.card || Array.isArray(entry.cards));
}

/** Whether `registry` (a host's `panels:`) can show the request, or it brings its own card. */
export function hostCanShow(registry, request) {
  return !!(request?.panel && hasPanelContent(registry?.[request.panel])) || !!request?.card;
}

let sheetFallback = null;

/** Installed by panels.js: opens a request's own card in a bottom sheet. */
export function setPanelSheetFallback(fn) {
  sheetFallback = fn;
}

/**
 * Opens panel `request.panel` from `origin`: in the nearest host that takes
 * it, else (when the request carries `card`) in a bottom sheet.
 * Returns { host } or { sheet } (a sheet controller), or {} when nothing opened.
 */
export function openPanel(origin, request, hass) {
  const detail = { id: request.panel ?? null, request, host: null };
  origin.dispatchEvent(new CustomEvent(PANEL_OPEN_EVENT, { detail, bubbles: true, composed: true }));
  if (detail.host) return { host: detail.host };
  const spec = panelSpec(null, request);
  if (!spec.cards.length || !sheetFallback) {
    console.warn(`materia: no host offers panel "${request.panel}" here, and the action has no card`);
    return {};
  }
  return { sheet: sheetFallback(origin, spec, hass) };
}
