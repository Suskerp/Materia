/* Pure helpers for materia-switcher (no Lit, no DOM): node-testable. */

const PREFIX = "materia-switcher:";

/** The items list, with non-objects dropped. */
export function switcherItems(config) {
  return (Array.isArray(config?.items) ? config.items : []).filter((i) => i && typeof i === "object");
}

/** A selected index that exists in a list of `count` items (0 when it doesn't). */
export function clampIndex(index, count) {
  const i = Number(index);
  return Number.isInteger(i) && i >= 0 && i < count ? i : 0;
}

/** localStorage key for `remember: true`; null when the card can't remember. */
export function storageKey(config) {
  if (!config?.remember) return null;
  const key = config.key == null ? "" : String(config.key).trim();
  return key ? PREFIX + key : null;
}

/** The remembered index, or null. `storage` is localStorage (or a stand-in). */
export function readIndex(storage, key) {
  if (!key) return null;
  try {
    const raw = storage?.getItem(key);
    if (raw == null) return null;
    const i = Number(raw);
    return Number.isInteger(i) && i >= 0 ? i : null;
  } catch {
    return null;
  }
}

export function writeIndex(storage, key, index) {
  if (!key) return;
  try {
    storage?.setItem(key, String(index));
  } catch {
    // Private mode / quota: the choice just isn't remembered.
  }
}

/** Corner class of tab `i` of `count`, as today's zone tabs set it. */
export function tabClass(i, count, selected) {
  return [i === selected ? "on" : "", i === 0 ? "first" : "", i === count - 1 ? "last" : ""].join(" ");
}
