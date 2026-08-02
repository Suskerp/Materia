/**
 * Shared runtime translation table — English and Belgian Dutch — for every
 * card and primitive's hardcoded UI text.
 *
 * THE MECHANISM: a flat `{ en, nl }` table keyed by short identifiers, looked
 * up through `t(key, hassOrLang, vars)`. This generalises the pattern
 * `explanations.js` already used for vacuum consumable/error text (see that
 * file — it now calls `pickLocalized` from here instead of keeping its own
 * copy), so the whole codebase has ONE i18n mechanism, not two.
 *
 * LANGUAGE SOURCE: Home Assistant's own setting always wins. A card passes
 * `this.hass` (preferred — reads `hass.locale.language`) or, for a primitive
 * that has no `hass` of its own (materia-calendar takes a plain `locale`
 * string instead), the raw language string it was handed. `navigator.language`
 * is NEVER read here — an unrecognised or missing language falls back to
 * English rather than guessing at the browser's setting, because the whole
 * point is that HA's language is the one that must win.
 *
 * HA reports the bare tag "nl" for a Dutch-language install (not "nl-BE"),
 * so Belgian Dutch is written under the "nl" key; anything else — including
 * an absent locale — falls back to "en".
 *
 * EVERY ENTRY HERE IS A DEFAULT. Every card that reads one of these keys does
 * so as `this.config.some_option ?? t("key", this.hass)` — an explicitly
 * configured string always wins, exactly as it did before these strings had
 * a translation.
 */

const STRINGS = {
  /* ---- shared across many cards ------------------------------------ */
  unavailable: { en: "Unavailable", nl: "Niet beschikbaar" },
  cancel: { en: "Cancel", nl: "Annuleren" },
  confirm: { en: "Confirm", nl: "Bevestigen" },
  reset: { en: "Reset", nl: "Resetten" },
  entity_not_found: { en: "Entity not found", nl: "Entiteit niet gevonden" },
  entity_not_found_with_id: { en: "Entity not found: {entity}", nl: "Entiteit niet gevonden: {entity}" },

  /* ---- generic domain states (materia-card / materia-room) --------- */
  state_on: { en: "On", nl: "Aan" },
  state_off: { en: "Off", nl: "Uit" },
  state_open: { en: "Open", nl: "Open" },
  state_closed: { en: "Closed", nl: "Dicht" },
  state_locked: { en: "Locked", nl: "Op slot" },
  state_unlocked: { en: "Unlocked", nl: "Open" },
  state_locking: { en: "Locking", nl: "Gaat op slot" },
  state_unlocking: { en: "Unlocking", nl: "Gaat open" },
  state_jammed: { en: "Jammed", nl: "Vastgelopen" },

  /* ---- materia-badge ------------------------------------------------- */
  badge_hold_hint: { en: "hold, don't tap", nl: "even vasthouden" },

  /* ---- materia-vacuum-hero ------------------------------------------- */
  vh_min_left: { en: "about {mins} min left", nl: "nog zo'n {mins} min" },
  vh_drying: { en: "Drying the mop", nl: "De mop droogt" },
  vh_last_cleaned: { en: "Last cleaned {rel} ago", nl: "Laatst gepoetst {rel} geleden" },
  vh_docked: { en: "Docked", nl: "In het dokstation" },
  unit_min: { en: "{n} min", nl: "{n} min" },
  unit_hours: { en: "{n} h", nl: "{n} u" },
  unit_days: { en: "{n} d", nl: "{n} d" },

  /* ---- materia-lock -------------------------------------------------- */
  lock_slide_to_unlock: { en: "Slide to unlock", nl: "Schuif om te openen" },
  lock_slide_to_lock: { en: "Slide to lock", nl: "Schuif om op slot te doen" },
  lock_hold_to_unlock: { en: "Hold to unlock", nl: "Houd ingedrukt om te openen" },
  lock_hold_to_lock: { en: "Hold to lock", nl: "Houd ingedrukt om op slot te doen" },
  lock_jammed_hint: { en: "Jammed — check the door", nl: "Vastgelopen — controleer de deur" },
  lock_locking: { en: "Locking…", nl: "Gaat op slot…" },
  lock_unlocking: { en: "Unlocking…", nl: "Gaat open…" },
  lock_demo_note: { en: "Demo · no entity", nl: "Demo · geen entiteit" },
  lock_open_button: { en: "Open", nl: "Open" },

  /* ---- materia-climate-panel ----------------------------------------- */
  cp_currently: { en: "Currently", nl: "Nu" },
  cp_section_default: { en: "Section {n}", nl: "Sectie {n}" },

  /* ---- materia-schedule ----------------------------------------------- */
  sched_at_a_time: { en: "At a time", nl: "Op een tijdstip" },
  sched_when_ellipsis: { en: "When…", nl: "Wanneer…" },
  sched_not_scheduled: { en: "Not scheduled", nl: "Niet ingepland" },
  sched_tap_to_pick: { en: "Tap to pick a time or a trigger", nl: "Tik om een uur of trigger te kiezen" },
  sched_name_default: { en: "Schedule", nl: "Planning" },
  sched_repeat_weekly: { en: "Repeat weekly", nl: "Wekelijks herhalen" },
  sched_repeat_sub_on: { en: "Runs on the days below", nl: "Loopt op de dagen hieronder" },
  sched_repeat_sub_off: { en: "One run only", nl: "Eén keer, niet herhalen" },
  sched_save_schedule: { en: "Save schedule", nl: "Planning opslaan" },
  sched_set_timer: { en: "Set timer", nl: "Timer instellen" },
  sched_pick_date_time: { en: "Pick a date & time", nl: "Kies een datum en tijdstip" },
  sched_mocked_note: { en: "Mocked · nothing is scheduled", nl: "Demo · er is niets ingepland" },
  sched_pick_trigger: { en: "Pick a trigger", nl: "Kies een trigger" },
  sched_runs_whenever: { en: "Runs whenever it happens", nl: "Start zodra het gebeurt" },
  sched_when_question: { en: "When?", nl: "Wanneer?" },
  sched_pick_moment: { en: "Pick a moment", nl: "Kies een moment" },
  sched_starts_at: { en: "Starts at {time}", nl: "Begint om {time}" },

  sched_preset_1h: { en: "In 1 hour", nl: "Over 1 uur" },
  sched_preset_4h: { en: "In 4 hours", nl: "Over 4 uur" },
  sched_preset_tonight: { en: "Tonight", nl: "Vanavond" },
  sched_preset_tomorrow: { en: "Tomorrow", nl: "Morgen" },
  sched_preset_noon: { en: "Noon", nl: "12 uur" },
  sched_preset_saturday: { en: "Saturday", nl: "Zaterdag" },

  sched_trigger_leave: { en: "When I leave", nl: "Als ik vertrek" },
  sched_trigger_leave_sub: { en: "My phone leaves home", nl: "Mijn telefoon verlaat het huis" },
  sched_trigger_empty: { en: "When everyone's out", nl: "Als iedereen weg is" },
  sched_trigger_empty_sub: { en: "All trackers away for 10 min", nl: "Alle trackers al 10 min weg van huis" },
  sched_trigger_night: { en: "When the house sleeps", nl: "Als het huis slaapt" },
  sched_trigger_night_sub: { en: "All lights off after 22:00", nl: "Alle lichten uit na 22:00" },
  sched_trigger_sunset: { en: "At sunset", nl: "Bij zonsondergang" },
  sched_trigger_sunset_sub: { en: "Around 21:48 today", nl: "Rond 21:48 vandaag" },

  /* ---- materia-schedule: sheet chrome and the 7b summary ------------- */
  sched_close: { en: "Close", nl: "Sluiten" },
  sched_clear: { en: "Clear", nl: "Wissen" },
  sched_scheduled: { en: "Scheduled", nl: "Ingepland" },
  sched_pending_sub: { en: "Pick again to move it, or clear it.", nl: "Kies opnieuw om het te verplaatsen, of wis het." },
  sched_skip: { en: "Skip", nl: "Overslaan" },
  sched_add: { en: "Add a schedule", nl: "Een planning toevoegen" },

  /* ---- actions ------------------------------------------------------ */
  confirm_action: { en: "Are you sure?", nl: "Ben je zeker?" },

  /* ---- materia-doorbell ------------------------------------------- */
  db_eyebrow: { en: "Doorbell", nl: "Deurbel" },
  db_eyebrow_street: { en: "Street door", nl: "Benedendeur" },
  db_eyebrow_front: { en: "Front door", nl: "Voordeur" },
  db_title_ringing: { en: "Someone's at the door", nl: "Er staat iemand aan de deur" },
  db_title_buzzing: { en: "Buzzing them in", nl: "Ze worden binnengelaten" },
  db_title_buzzed: { en: "Buzzed in", nl: "Binnengelaten" },
  db_title_opened: { en: "Door open", nl: "Deur open" },
  db_title_lapsed: { en: "No answer", nl: "Geen antwoord" },
  db_sub_ringing: { en: "{place} · just now", nl: "{place} · daarnet" },
  db_sub_buzzing: { en: "Street door released", nl: "Benedendeur geopend" },
  db_sub_buzzed: { en: "Front door still locked", nl: "Voordeur nog op slot" },
  db_sub_opened: { en: "Front door unlocked", nl: "Voordeur van het slot" },
  db_sub_lapsed: { en: "Ring lapsed · nothing was opened", nl: "Bel verlopen · er ging niets open" },
  db_count_before_lapse: { en: "before it lapses", nl: "voor de bel verloopt" },
  db_buzz_title: { en: "Buzz in", nl: "Binnenlaten" },
  db_buzz_sub: { en: "Street door only", nl: "Enkel de benedendeur" },
  db_buzz_cta: { en: "Tap to buzz", nl: "Tik om te zoemen" },
  db_buzz_busy: { en: "Buzzing", nl: "Zoemt…" },
  db_buzz_done: { en: "Buzzed", nl: "Gezoemd" },
  db_open_title: { en: "Open the front door", nl: "Doe de voordeur open" },
  db_open_sub: { en: "Unlocks the front door for your visitor.", nl: "Haalt de voordeur van het slot voor je bezoek." },
  db_slide_hint: { en: "Slide to open", nl: "Schuif om te openen" },
  db_hold_hint: { en: "Hold to open", nl: "Houd ingedrukt om te openen" },
  db_slide_done: { en: "Door open", nl: "Deur open" },
  db_ignore: { en: "Ignore", nl: "Negeer" },
  db_replay: { en: "Replay ring", nl: "Bel opnieuw" },
  db_mute: { en: "Silence", nl: "Stil" },
  db_muted: { en: "Muted", nl: "Gedempt" },

  /* ---- weather condition labels (materia-weather / -glance / -hero) - */
  cond_clear_night: { en: "Clear night", nl: "Heldere nacht" },
  cond_partly_cloudy: { en: "Partly cloudy", nl: "Half bewolkt" },
  cond_thunderstorm: { en: "Thunderstorm", nl: "Onweer" },
  cond_sleet: { en: "Sleet", nl: "Natte sneeuw" },
  cond_exceptional: { en: "Exceptional", nl: "Uitzonderlijk" },

  /* ---- severity / level vocabulary, shared by UV, AQI enum and pollen  */
  level_none: { en: "None", nl: "Geen" },
  level_low: { en: "Low", nl: "Laag" },
  level_moderate: { en: "Moderate", nl: "Matig" },
  level_high: { en: "High", nl: "Hoog" },
  level_very_high: { en: "Very high", nl: "Zeer hoog" },
  level_extreme: { en: "Extreme", nl: "Extreem" },
  level_active: { en: "Active", nl: "Actief" },

  aqi_good: { en: "Good air quality", nl: "Goede luchtkwaliteit" },
  aqi_moderate: { en: "Moderate air quality", nl: "Matige luchtkwaliteit" },
  aqi_unhealthy_sensitive: { en: "Unhealthy for sensitive groups", nl: "Ongezond voor gevoelige groepen" },
  aqi_unhealthy: { en: "Unhealthy air quality", nl: "Ongezonde luchtkwaliteit" },
  aqi_very_unhealthy: { en: "Very unhealthy air quality", nl: "Zeer ongezonde luchtkwaliteit" },
  aqi_hazardous: { en: "Hazardous air quality", nl: "Gevaarlijke luchtkwaliteit" },

  /* ---- materia-weather-metric ---------------------------------------- */
  wm_wind_from: { en: "From", nl: "Uit" },
  wm_wind: { en: "Wind", nl: "Wind" },
  wm_uv_index: { en: "UV index", nl: "UV-index" },
  wm_visibility: { en: "Visibility", nl: "Zicht" },
  wm_visibility_hint: { en: "Weather entity has no visibility — add a sensor", nl: "Weerentiteit heeft geen zicht — voeg een sensor toe" },
  wm_pressure: { en: "Pressure", nl: "Luchtdruk" },
  wm_air_quality: { en: "Air quality", nl: "Luchtkwaliteit" },
  wm_aqi_hint: { en: "Point this tile at an AQI sensor", nl: "Wijs deze tegel naar een luchtkwaliteitssensor" },
  wm_precipitation: { en: "Precipitation", nl: "Neerslag" },
  wm_no_precip: { en: "No precipitation expected", nl: "Geen neerslag verwacht" },
  wm_total_rain: { en: "Total rain for the day", nl: "Totale regen vandaag" },
  wm_humidity: { en: "Humidity", nl: "Vochtigheid" },
  wm_humidity_hint: { en: "Weather entity has no humidity — add a sensor", nl: "Weerentiteit heeft geen vochtigheid — voeg een sensor toe" },
  wm_dew_point: { en: "Dew point", nl: "Dauwpunt" },
  wm_sunrise_sunset: { en: "Sunrise & sunset", nl: "Zonsopgang & zonsondergang" },
  wm_grass: { en: "Grass", nl: "Gras" },
  wm_tree: { en: "Tree", nl: "Boom" },
  wm_weed: { en: "Weed", nl: "Onkruid" },
  wm_pollen: { en: "Pollen", nl: "Pollen" },
  wm_pollen_hint: { en: "Add pollen sensors", nl: "Voeg pollensensoren toe" },

  /* ---- materia-weather-glance ----------------------------------------- */
  wg_rain: { en: "Rain", nl: "Regen" },
  wg_pollen_none: { en: "none", nl: "geen" },

  /* ---- materia-weather-hero --------------------------------------------- */
  wh_night: { en: "Night", nl: "Nacht" },
  wh_day: { en: "Day", nl: "Dag" },
  wh_feels_like: { en: "Feels like", nl: "Voelt als" },

  /* ---- forecasts -------------------------------------------------------- */
  fc_hourly_forecast: { en: "Hourly forecast", nl: "Uurverwachting" },
  fc_today: { en: "Today", nl: "Vandaag" },

  /* ---- materia-glance-tile (soil moisture) ------------------------------ */
  gt_needs_water_now: { en: "Needs water now", nl: "Nu water nodig" },
  gt_water_soon: { en: "Water soon", nl: "Binnenkort water geven" },
  gt_optimal: { en: "Optimal", nl: "Optimaal" },
  gt_overwatered: { en: "Overwatered", nl: "Te veel water" },

  /* ---- materia-vacuum-hero ------------------------------------------- */
  vh_vacuum_error: { en: "Vacuum error", nl: "Fout met de stofzuiger" },
  vh_dock_error: { en: "Dock error", nl: "Fout met het dock" },
  vh_water_shortage: { en: "Water shortage - cannot mop", nl: "Te weinig water - kan niet dweilen" },
  vh_clean_water_refill: { en: "Clean water tank needs refilling", nl: "Schoonwatertank moet bijgevuld worden" },
  vh_dirty_water_empty: { en: "Dirty water tank needs emptying", nl: "Vuilwatertank moet geleegd worden" },
  vh_docked: { en: "Docked", nl: "In het dock" },
  vh_drying_mop: { en: "Drying the mop", nl: "Dweil wordt gedroogd" },
  vh_done_caption: { en: "done", nl: "klaar" },
  vh_battery_caption: { en: "battery", nl: "batterij" },
  vh_about_min_left: { en: "about {mins} min left", nl: "nog {mins} min" },
  vh_last_cleaned_ago: { en: "Last cleaned {rel} ago", nl: "Laatst gestofzuigd {rel} geleden" },
  vh_needs_attention: { en: "{name} needs attention", nl: "{name} heeft aandacht nodig" },
  unit_min: { en: "min", nl: "min" },
  unit_hour: { en: "h", nl: "u" },
  unit_day: { en: "d", nl: "d" },

  /* ---- materia-calendar (locale is a plain string prop, not hass) ----- */
  cal_prev_month: { en: "Previous month", nl: "Vorige maand" },
  cal_next_month: { en: "Next month", nl: "Volgende maand" },

  /* ---- materia-split-button --------------------------------------------- */
  sb_more_actions: { en: "more actions", nl: "meer acties" },
};

function primaryTag(lang) {
  return String(lang || "en").trim().toLowerCase().split("-")[0] || "en";
}

/**
 * Resolve a language tag from `this.hass` (reads `hass.locale.language`) or
 * from a raw language string (for primitives with no `hass`, like
 * materia-calendar's `locale` prop). Falls back to English. Deliberately
 * never touches `navigator.language`.
 */
export function resolveLanguage(hassOrLang) {
  if (typeof hassOrLang === "string") return primaryTag(hassOrLang);
  return primaryTag(hassOrLang?.locale?.language);
}

/** Pick the right language out of a raw `{ en, nl, ... }` entry — the shape
 *  explanations.js's CONSUMABLES/ERRORS tables also use. */
export function pickLocalized(entry, hassOrLang) {
  if (!entry) return "";
  const lang = resolveLanguage(hassOrLang);
  return entry[lang] || entry.en || "";
}

function fill(str, vars) {
  if (!vars) return str;
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll(`{${k}}`, String(v)),
    str
  );
}

/**
 * Translate a key from the shared table.
 *
 *   t("unavailable", this.hass)
 *   t("sched_starts_at", this.hass, { time: "21:12" })
 *
 * `hassOrLang` is `this.hass` (preferred) or a raw language string. An
 * unrecognised key returns itself rather than throwing, so a typo shows up
 * as visible mistranslated text instead of a crash.
 */
export function t(key, hassOrLang, vars) {
  const entry = STRINGS[key];
  if (!entry) return key;
  return fill(pickLocalized(entry, hassOrLang), vars);
}
