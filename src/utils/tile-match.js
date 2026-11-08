/** Player attributes an item's `match` (or name) is compared against by default. */
export const ACTIVE_ATTRIBUTES = ["media_album_name", "media_title", "media_channel"];

/**
 * Index of the active item: the first whose `match` (else `name`) equals one
 * of the entity's `attributes` (the state itself when "state" is listed).
 * -1 when none matches.
 */
export function activeItemIndex(items, stateObj, attributes = ACTIVE_ATTRIBUTES) {
  const a = stateObj?.attributes ?? {};
  const values = [].concat(attributes ?? ACTIVE_ATTRIBUTES).map((k) => (k === "state" ? stateObj?.state : a[k]));
  const live = values.filter(Boolean);
  return (items ?? []).findIndex((s) => {
    const keys = [].concat(s?.match ?? s?.name ?? []).filter(Boolean);
    return keys.some((k) => live.includes(k));
  });
}

/** Index of the station that is playing now: `match`, else name vs album/title/channel. */
export const currentStationIndex = (stations, stateObj) => activeItemIndex(stations, stateObj);
