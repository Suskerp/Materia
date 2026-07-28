/**
 * Brand capability profiles for materia-vacuum-hero.
 *
 * Rather than guessing entity ids from string prefixes (which breaks the moment
 * a user renames something, or runs a non-English integration), the card finds
 * its siblings through the DEVICE the vacuum belongs to and then matches them by
 * keyword. That is why these are lists of suffix fragments, not names: Roborock
 * exposes `_status` and `_time_left`, Ecovacs `_work_mode` and `_lifespan`, and
 * a Dutch Ecovacs install reports `_batterij`. All of them resolve here.
 *
 * Every capability is overridable per-card, so an odd setup never needs a new
 * profile — the profile only decides the DEFAULT search order.
 */

/** Capability -> ordered keyword candidates. First match on the device wins. */
export const CAPABILITY_KEYS = {
  status: ["_status", "_work_mode", "_state", "_activity"],
  progress: ["_cleaning_progress", "_progress"],
  battery: ["_battery", "_batterij", "_batterie"],
  room: ["_current_room", "_room", "_active_map"],
  cleaning_time: ["_cleaning_time", "_cleaning_duration"],
  cleaning_area: ["_cleaning_area", "_area_cleaned"],
  error: ["_vacuum_error", "_error"],
  dock_error: ["_dock_error"],
  water_shortage: ["_water_shortage"],
  clean_water: ["_dock_clean_water_box", "_clean_water"],
  dirty_water: ["_dock_dirty_water_box", "_dirty_water"],
  mop_drying: ["_mop_drying", "_drying"],
  last_clean: ["_last_clean_end", "_last_job", "_last_clean"],
};

/** Consumables are a LIST, not one entity — matched by these fragments. */
export const CONSUMABLE_KEYS = ["_time_left", "_lifespan", "_consumable"];

/**
 * States that mean "not working". The card negates this set, per the insight
 * that enumerating the working states is hopeless — the Qrevo alone reports
 * 40+, including segment_cleaning, going_to_wash_the_mop, washing_the_mop,
 * emptying_the_bin and returning_home, all of which ARE work.
 */
const IDLE = [
  "docked", "charging", "charging_complete", "fully_charged", "idle", "sleeping",
  "paused", "standby", "off", "unavailable", "unknown", "error", "device_offline",
  "charger_disconnected", "locked", "shutting_down", "updating", "air_drying_stopping",
];

export const PROFILES = {
  roborock: { idle_states: IDLE },
  // Ecovacs has no progress sensor and no room sensor, so the card simply
  // degrades: the numeral falls back to battery and no ETA is derived.
  ecovacs: { idle_states: [...IDLE, "cleaning_paused", "returning"] },
  generic: { idle_states: IDLE },
};

export function profileFor(brand) {
  return PROFILES[brand] || PROFILES.generic;
}
