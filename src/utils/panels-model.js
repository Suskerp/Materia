/* Pure helpers for the visual `panels:` editor (no Lit, no DOM): node-testable.
 *
 * A registry entry takes three forms (primitives/panel-protocol.js panelSpec):
 * a bare card config (has `type`), { heading?, card, ... } or
 * { heading?, cards: [...], ... }. The editor shows every form as
 * { heading, actions, cards, head } and writes an edit back in the entry's
 * own form where it can, so an unedited config round-trips unchanged and
 * keys the editor does not know are kept. */

const isObj = (v) => !!v && typeof v === "object" && !Array.isArray(v);

/** The registry as an ordered list of { id, entry }. */
export function panelList(panels) {
  return isObj(panels) ? Object.entries(panels).map(([id, entry]) => ({ id, entry })) : [];
}

/** What the editor shows for one entry. */
export function panelView(entry) {
  const e = isObj(entry) ? entry : {};
  if (e.type) return { heading: "", actions: [], cards: [e], head: true };
  let cards = [];
  if (Array.isArray(e.cards)) cards = e.cards;
  else if (isObj(e.card)) cards = [e.card];
  return {
    heading: typeof e.heading === "string" ? e.heading : e.heading == null ? "" : String(e.heading),
    actions: Array.isArray(e.actions) ? e.actions : [],
    cards,
    head: e.head !== false,
  };
}

/**
 * Applies `patch` (any of heading, actions, cards, head) to an entry.
 * Empty heading / actions and head: true are written as absent keys; a
 * `card:` entry keeps `card:` while it holds one card; a bare-card entry
 * stays bare while it is still just that one card.
 */
export function patchPanel(entry, patch) {
  const bare = isObj(entry) && !!entry.type;
  const next = bare ? { cards: [entry] } : { ...(isObj(entry) ? entry : {}) };
  if ("heading" in patch) {
    if (patch.heading) next.heading = patch.heading;
    else delete next.heading;
  }
  if ("actions" in patch) {
    if (patch.actions?.length) next.actions = patch.actions;
    else delete next.actions;
  }
  if ("head" in patch) {
    if (patch.head === false) next.head = false;
    else delete next.head;
  }
  if ("cards" in patch) {
    const cards = Array.isArray(patch.cards) ? patch.cards : [];
    if ("card" in next && !("cards" in next) && cards.length === 1) next.card = cards[0];
    else {
      delete next.card;
      next.cards = cards;
    }
  }
  const keys = Object.keys(next);
  if (bare && keys.length === 1 && next.cards?.length === 1) return next.cards[0];
  return next;
}

/** The list back as a registry object; undefined when it is empty. */
export function panelsFromList(list) {
  if (!list.length) return undefined;
  const out = {};
  for (const { id, entry } of list) out[id] = entry;
  return out;
}

/** A trimmed, usable panel id, or "" (spaces become underscores). */
export function cleanPanelId(id) {
  return String(id ?? "").trim().replace(/\s+/g, "_");
}

/** Renames panel `from` to `to` in place of order; null when `to` is empty or taken. */
export function renamePanel(panels, from, to) {
  const id = cleanPanelId(to);
  const list = panelList(panels);
  if (!id) return null;
  if (id === from) return panels;
  if (list.some((p) => p.id === id)) return null;
  return panelsFromList(list.map((p) => (p.id === from ? { id, entry: p.entry } : p)));
}

/** A free id: `base`, else base_2, base_3 … */
export function freePanelId(panels, base = "panel") {
  const taken = new Set(Object.keys(isObj(panels) ? panels : {}));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}_${n}`)) n++;
  return `${base}_${n}`;
}

/** Adds an empty panel ({ cards: [] }); returns { panels, id }. */
export function addPanel(panels, base = "panel") {
  const id = freePanelId(panels, base);
  return { id, panels: { ...(isObj(panels) ? panels : {}), [id]: { cards: [] } } };
}

/** Removes panel `id`; undefined when none remain. */
export function removePanel(panels, id) {
  return panelsFromList(panelList(panels).filter((p) => p.id !== id));
}

/** Replaces panel `id`'s entry with `entry` (order kept). */
export function setPanel(panels, id, entry) {
  return panelsFromList(panelList(panels).map((p) => (p.id === id ? { id, entry } : p)));
}
