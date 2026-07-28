/**
 * Actionable text for vacuum consumables and error codes.
 *
 * The integrations report opaque values — `sensor_time_left`, `filter_lifespan`,
 * `dustbin_full` — and a generic "<friendly name> needs attention" tells nobody
 * what to actually DO. These map to the chore.
 *
 * Scope is deliberate: consumables (a small closed set) and the error codes that
 * can be verified. Anything unmatched falls through to the raw value rather than
 * being hidden, so an unknown code is still visible and reportable.
 *
 * Where Home Assistant already localises something (entity states via
 * formatEntityState), we defer to it. These strings only cover what HA does not.
 */

/** Consumable chores, keyed by a fragment of the entity id. */
const CONSUMABLES = [
  { match: ["sensor_time_left", "sensor_lifespan"], en: "Clean the sensors", nl: "Maak de sensoren schoon" },
  { match: ["main_brush"], en: "Replace the main brush", nl: "Vervang de hoofdrolborstel" },
  { match: ["side_brush"], en: "Replace the side brush", nl: "Vervang de zijborstel" },
  { match: ["filter"], en: "Replace the filter", nl: "Vervang de filter" },
  { match: ["strainer"], en: "Clean the dock strainer", nl: "Maak de zeef van het dock schoon" },
  { match: ["maintenance_brush"], en: "Clean the dock brush", nl: "Maak de dockborstel schoon" },
  { match: ["mop_life", "mop_time"], en: "Replace the mop pad", nl: "Vervang de dweil" },
];

/**
 * Error codes. Roborock reports snake_case slugs; Ecovacs reports its own set.
 * Only entries that could be verified are here — the rest fall through.
 */
const ERRORS = [
  { match: ["dustbin_full", "bin_full", "dust_bin_full"], en: "Empty the dustbin", nl: "Leeg de stofbak" },
  { match: ["water_box_empty", "low_water", "no_water"], en: "Refill the water tank", nl: "Vul het waterreservoir bij" },
  { match: ["waste_water_tank_full", "dirty_water_full"], en: "Empty the dirty water tank", nl: "Leeg het vuilwaterreservoir" },
  { match: ["main_brush_stuck", "main_brush_jammed"], en: "Free the main brush", nl: "Maak de hoofdrolborstel vrij" },
  { match: ["side_brush_stuck", "side_brush_jammed"], en: "Free the side brush", nl: "Maak de zijborstel vrij" },
  { match: ["wheel_stuck", "wheels_stuck", "stuck"], en: "The wheels are stuck - move it clear", nl: "De wielen zitten vast - zet hem vrij" },
  { match: ["cliff_sensor", "cliff"], en: "Clean the cliff sensors", nl: "Maak de valsensoren schoon" },
  { match: ["filter_blocked", "filter_dirty"], en: "Clean or replace the filter", nl: "Maak de filter schoon of vervang hem" },
  { match: ["bumper_stuck", "bumper"], en: "Free the bumper", nl: "Maak de bumper vrij" },
  { match: ["dock", "charger"], en: "Check the dock connection", nl: "Controleer de verbinding met het dock" },
  { match: ["low_battery", "battery_low"], en: "Battery too low - let it charge", nl: "Accu te laag - laat hem opladen" },
  { match: ["trapped", "cannot_move", "stuck_in_place"], en: "It is trapped - move it clear", nl: "Hij zit vast - zet hem vrij" },
  { match: ["mop_missing", "no_mop"], en: "Attach the mop pad", nl: "Bevestig de dweil" },
  { match: ["full", "container_full"], en: "Empty the container", nl: "Leeg het reservoir" },
];

/** HA gives us the user's locale; fall back to English. */
function pick(entry, lang) {
  const base = String(lang || "en").toLowerCase().split("-")[0];
  return entry[base] || entry.en;
}

function lookup(table, haystack, lang) {
  const h = String(haystack || "").toLowerCase();
  if (!h) return null;
  const hit = table.find((e) => e.match.some((m) => h.includes(m)));
  return hit ? pick(hit, lang) : null;
}

/** "Clean the sensors" for sensor.x_sensor_time_left, else null. */
export function explainConsumable(entityId, lang) {
  return lookup(CONSUMABLES, entityId, lang);
}

/** "Empty the dustbin" for a `dustbin_full` error value, else null. */
export function explainError(rawValue, lang) {
  return lookup(ERRORS, rawValue, lang);
}
