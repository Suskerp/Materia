/**
 * "Is this entity doing something?" — one answer for the whole library.
 *
 * THE RULE: an explicit `active_state` from config always wins, and there is
 * no library-wide default of "on". A baked-in "on" is what silently broke
 * every badge whose entity was later swapped for a cover, and it is why a
 * sensor reporting "Connected" or "Available" reads as inert on a card that
 * only knows about lights. When nothing is configured the answer is DERIVED
 * FROM THE DOMAIN, and "on" is only the last rung of that chain.
 *
 * Extracted from materia-badge's _isActive so the table lives in one place.
 * A second copy of it in another card is a second thing to forget to update
 * the next time an integration invents a state word.
 */

/** Per-domain "this is the busy state". Add domains, never special-case cards. */
export const DOMAIN_ACTIVE_STATE = {
  cover: "open",
  lock: ["locked", "locking"],
  vacuum: "cleaning",
  media_player: "playing",
  climate: "heat",
  alarm_control_panel: "armed_away",
  timer: "active",
};

/** States that are never "active", whatever the domain says. */
const DEAD = new Set(["unavailable", "unknown", "none", ""]);

/**
 * @param stateObj   a hass state object
 * @param configured the card's `active_state` — a string, a list, or null.
 *                   Matching is case-insensitive, because integrations
 *                   disagree with themselves about casing ("on" vs "On",
 *                   "Connected" vs "connected").
 */
export function isActiveState(stateObj, configured) {
  if (!stateObj) return false;
  const s = String(stateObj.state);
  if (DEAD.has(s.toLowerCase())) return false;

  const eq = (a, b) => String(a).toLowerCase() === String(b).toLowerCase();

  if (configured != null && configured !== "") {
    // A comma-separated string is accepted as well as a list, because that is
    // what an editor text field can produce and what reads naturally in YAML.
    const list = Array.isArray(configured)
      ? configured
      : String(configured).split(",").map((x) => x.trim()).filter(Boolean);
    return list.some((c) => eq(c, s));
  }

  const domain = String(stateObj.entity_id || "").split(".")[0];
  const fallback = DOMAIN_ACTIVE_STATE[domain] ?? "on";
  const list = Array.isArray(fallback) ? fallback : [fallback];
  return list.some((c) => eq(c, s));
}
