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

export const STRINGS = {
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

  /* ---- materia-humidifier ------------------------------------------ */
  humidifier_name: { en: "Humidifier", nl: "Luchtbevochtiger" },
  humidifier_current_value: { en: "Current {value}%", nl: "Nu {value}%" },
  humidifier_turn_on: { en: "Turn humidifier on", nl: "Luchtbevochtiger aanzetten" },
  humidifier_turn_off: { en: "Turn humidifier off", nl: "Luchtbevochtiger uitzetten" },
  humidifier_increase: { en: "Increase target humidity", nl: "Doelvochtigheid verhogen" },
  humidifier_decrease: { en: "Decrease target humidity", nl: "Doelvochtigheid verlagen" },
  humidifier_modes: { en: "Humidifier modes", nl: "Luchtbevochtigingsmodi" },
  humidifier_action_humidifying: { en: "Humidifying", nl: "Bevochtigt" },
  humidifier_action_drying: { en: "Dehumidifying", nl: "Ontvochtigt" },
  humidifier_action_idle: { en: "Idle", nl: "Stand-by" },
  humidifier_action_off: { en: "Off", nl: "Uit" },
  humidifier_mode_auto: { en: "Auto", nl: "Automatisch" },
  humidifier_mode_away: { en: "Away", nl: "Afwezig" },
  humidifier_mode_baby: { en: "Baby", nl: "Baby" },
  humidifier_mode_boost: { en: "Boost", nl: "Boost" },
  humidifier_mode_comfort: { en: "Comfort", nl: "Comfort" },
  humidifier_mode_eco: { en: "Eco", nl: "Eco" },
  humidifier_mode_home: { en: "Home", nl: "Thuis" },
  humidifier_mode_laundry: { en: "Laundry", nl: "Was drogen" },
  humidifier_mode_normal: { en: "Normal", nl: "Normaal" },
  humidifier_mode_sleep: { en: "Sleep", nl: "Slapen" },

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
  sched_window_start: { en: "Start", nl: "Begin" },
  sched_window_stop: { en: "Stop", nl: "Einde" },
  sched_window_overnight: { en: "Overnight", nl: "Nacht" },
  sched_window_daily: { en: "Daily", nl: "Dagelijks" },
  sched_window_pick_days: { en: "Pick at least one day", nl: "Kies minstens één dag" },
  sched_window_days: { en: "Repeat on", nl: "Herhaal op" },
  sched_multi_slots_head: { en: "Multiple blocks", nl: "Meerdere blokken" },
  sched_multi_slots_sub: { en: "Edit in Scheduler", nl: "Bewerk in Scheduler" },
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
  sched_add_short: { en: "Add", nl: "Toevoegen" },
  sched_manager_sub: { en: "Choose a schedule to change it", nl: "Kies een planning om ze aan te passen" },
  sched_choose_device: { en: "Choose a device", nl: "Kies een toestel" },
  sched_device: { en: "Device", nl: "Toestel" },
  sched_devices: { en: "Devices", nl: "Toestellen" },
  sched_add_device: { en: "Add device", nl: "Toestel toevoegen" },
  sched_remove_device: { en: "Remove", nl: "Verwijder" },
  sched_action: { en: "Action", nl: "Actie" },
  sched_start_action: { en: "At start", nl: "Bij start" },
  sched_end_action: { en: "At end", nl: "Bij einde" },
  sched_kind_window: { en: "Recurring", nl: "Herhalend" },
  sched_kind_once: { en: "One time", nl: "Eenmalig" },
  sched_kind_plan: { en: "Plan", nl: "Plan" },
  sched_plan: { en: "Plan", nl: "Plan" },
  sched_choose_plan: { en: "Choose a plan", nl: "Kies een plan" },
  sched_arrival: { en: "Arrival", nl: "Aankomst" },
  sched_run_at: { en: "Run at", nl: "Uitvoeren om" },
  sched_phase: { en: "Step", nl: "Stap" },
  sched_phases: { en: "steps", nl: "stappen" },
  sched_saving: { en: "Saving…", nl: "Opslaan…" },
  sched_save_failed: { en: "Could not save the schedule", nl: "De planning kon niet worden opgeslagen" },
  sched_delete_failed: { en: "Could not delete the schedule", nl: "De planning kon niet worden verwijderd" },
  sched_phase_in_past: { en: "Choose a later arrival so every step is still in the future", nl: "Kies een latere aankomst zodat elke stap nog in de toekomst ligt" },
  sched_run: { en: "Run", nl: "Uitvoeren" },
  sched_activate: { en: "Activate", nl: "Activeren" },
  sched_configure_actions: { en: "Configure the allowed actions for this device", nl: "Configureer de toegelaten acties voor dit toestel" },
  sched_new: { en: "New schedule", nl: "Nieuwe planning" },
  sched_edit: { en: "Change schedule", nl: "Planning aanpassen" },
  sched_enabled: { en: "Enabled", nl: "Actief" },
  sched_disabled: { en: "Disabled", nl: "Gepauzeerd" },
  sched_enable: { en: "Enable schedule", nl: "Planning activeren" },
  sched_disable: { en: "Pause schedule", nl: "Planning pauzeren" },
  sched_empty_head: { en: "No schedules yet", nl: "Nog geen planningen" },
  sched_empty_sub: { en: "Tap here to add the first one", nl: "Tik hier om de eerste toe te voegen" },
  sched_delete: { en: "Delete", nl: "Verwijderen" },
  sched_delete_confirm: { en: "Tap again", nl: "Tik nogmaals" },

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
  wm_birch: { en: "Birch", nl: "Berk" },
  wm_alder: { en: "Alder", nl: "Els" },
  wm_hazel: { en: "Hazel", nl: "Hazelaar" },
  wm_oak: { en: "Oak", nl: "Eik" },
  wm_ash: { en: "Ash", nl: "Es" },
  wm_mugwort: { en: "Mugwort", nl: "Bijvoet" },
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
  data_loading: { en: "Loading…", nl: "Laden…" },
  data_unavailable: { en: "Entity unavailable", nl: "Entiteit niet beschikbaar" },
  data_not_available: { en: "No data available", nl: "Geen gegevens beschikbaar" },
  forecast_not_supported: { en: "Forecast unavailable for this weather service", nl: "Geen verwachting beschikbaar voor deze weerdienst" },

  /* ---- materia-glance-tile (soil moisture) ------------------------------ */
  gt_state_cleaning: { en: "Cleaning", nl: "Aan het poetsen" },
  gt_state_docked: { en: "Docked", nl: "In het dokstation" },
  gt_state_paused: { en: "Paused", nl: "Gepauzeerd" },
  gt_state_idle: { en: "Idle", nl: "Inactief" },
  gt_state_returning: { en: "Returning to dock", nl: "Keert terug naar dokstation" },
  gt_state_error: { en: "Error", nl: "Fout" },
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
  vh_drying_mop: { en: "Drying the mop", nl: "Dweil wordt gedroogd" },
  vh_done_caption: { en: "done", nl: "klaar" },
  vh_battery_caption: { en: "battery", nl: "batterij" },
  vh_about_min_left: { en: "about {mins} min left", nl: "nog {mins} min" },
  vh_last_cleaned_ago: { en: "Last cleaned {rel} ago", nl: "Laatst gestofzuigd {rel} geleden" },
  vh_needs_attention: { en: "{name} needs attention", nl: "{name} heeft aandacht nodig" },

  /* ---- materia-alarm ------------------------------------------------------
     Mode labels and armed titles are looked up with COMPUTED keys
     (t(`al_mode_${mode.key}`) / t(`al_state_armed_${mode.key}`)), so every
     MODES entry in cards/alarm/index.js needs a pair here. A missing key
     renders as its own name, and a grep for t("...") will not find these. */
  cf_hold_to_confirm: { en: "Hold to confirm", nl: "Houd vast om te bevestigen" },
  cf_active: { en: "Active", nl: "Actief" },
  cf_working: { en: "Working…", nl: "Bezig…" },
  cf_tap_to_stop: { en: "Tap to stop", nl: "Tik om te stoppen" },
  cf_tap_to_stop_aria: { en: "Stop {what}", nl: "{what} stoppen" },
  bars_no_rows: { en: "Add a bar in the card settings", nl: "Voeg een balk toe bij de kaartinstellingen" },
  bars_aria_unknown: { en: "{label}: no reading", nl: "{label}: geen meting" },
  bars_unknown_title: { en: "No reading available", nl: "Geen meting beschikbaar" },
  al_mode_home: { en: "Home", nl: "Aanwezig" },
  al_mode_away: { en: "Away", nl: "Afwezig" },
  al_mode_night: { en: "Night", nl: "Nacht" },
  al_mode_vacation: { en: "Vacation", nl: "Vakantie" },
  al_mode_custom: { en: "Custom", nl: "Aangepast" },

  al_state_armed_home: { en: "Home", nl: "Aanwezig" },
  al_state_armed_away: { en: "Away", nl: "Afwezig" },
  al_state_armed_night: { en: "Night", nl: "Nacht" },
  al_state_armed_vacation: { en: "Vacation", nl: "Vakantie" },
  al_state_armed_custom: { en: "Custom", nl: "Aangepast" },

  al_state_disarmed: { en: "Disarmed", nl: "Uitgeschakeld" },
  al_state_arming: { en: "Arming", nl: "Wordt ingeschakeld" },
  al_state_pending: { en: "Entry delay", nl: "Ingangsvertraging" },
  al_state_triggered: { en: "Alarm!", nl: "Alarm!" },
  al_state_unknown: { en: "Unknown", nl: "Onbekend" },

  al_sub_ready: { en: "Ready to arm", nl: "Klaar om in te schakelen" },
  al_sub_not_ready: { en: "{n} zones not ready", nl: "{n} zones niet gereed" },
  al_sub_not_ready_one: { en: "{n} zone not ready", nl: "{n} zone niet gereed" },
  al_sub_armed_since: { en: "Armed since {time}", nl: "Ingeschakeld sinds {time}" },
  al_sub_triggered: { en: "Triggered at {time}", nl: "Alarm afgegaan om {time}" },
  al_sub_pending: { en: "Entry delay running", nl: "Ingangsvertraging loopt" },
  al_sub_arming: { en: "Arming...", nl: "Wordt ingeschakeld..." },
  al_sub_disarming: { en: "Disarming...", nl: "Wordt uitgeschakeld..." },
  al_sub_unavailable: { en: "Panel unavailable", nl: "Paneel niet beschikbaar" },

  al_hint_hold_to_arm: { en: "Hold to arm", nl: "Houd vast" },
  al_hint_hold_to_disarm: { en: "Hold to disarm", nl: "Houd vast om uit te schakelen" },
  al_hint_holding: { en: "Keep holding...", nl: "Blijf vasthouden..." },
  al_hint_disarm_first: { en: "Disarm first", nl: "Schakel eerst uit" },
  al_hint_code_required: { en: "Enter the code in alarm details", nl: "Voer de code in bij de alarmdetails" },
  al_code_security_title: { en: "Alarm codes stay in Home Assistant", nl: "Alarmcodes blijven in Home Assistant" },
  al_code_native_notice: { en: "This panel requires a code. Use the alarm details to arm it; Materia never stores the code in dashboard YAML.", nl: "Dit paneel vereist een code. Schakel het in via de alarmdetails; Materia bewaart de code nooit in dashboard-YAML." },
  al_code_legacy_notice: { en: "An older card stored a code in dashboard YAML. Materia no longer reads it, and your next editor change removes it. Change the alarm code if this dashboard was shared.", nl: "Een oudere kaart bewaarde een code in dashboard-YAML. Materia leest die niet meer en verwijdert die bij je volgende wijziging. Wijzig de alarmcode als dit dashboard gedeeld werd." },
  al_hint_arming: { en: "Arming...", nl: "Inschakelen..." },
  al_hint_disarming: { en: "Disarming...", nl: "Uitschakelen..." },

  al_foot_disarmed: { en: "Hold a mode to arm.", nl: "Houd een modus vast om in te schakelen." },
  al_foot_armed: { en: "Armed in {mode}.", nl: "Ingeschakeld in {mode}." },
  al_foot_locked_modes: { en: "Disarm before choosing another mode.", nl: "Schakel eerst uit voor je een andere modus kiest." },
  al_foot_pending: { en: "Entry delay - disarm now.", nl: "Ingangsvertraging - schakel nu uit." },
  al_foot_triggered: { en: "Alarm triggered while armed in {mode}.", nl: "Alarm afgegaan terwijl ingeschakeld in {mode}." },

  al_zones_not_ready: { en: "Not ready", nl: "Niet gereed" },
  al_zone_bypass: { en: "Bypass", nl: "Blokkeer" },
  al_zones_bypassed_count: { en: "{n} zones bypassed", nl: "{n} zones geblokkeerd" },
  al_zones_bypassed_one: { en: "{n} zone bypassed", nl: "{n} zone geblokkeerd" },
  al_zone_unbypass: { en: "Restore", nl: "Deblokkeer" },
  al_zones_safety_ok: { en: "{n} detectors OK", nl: "{n} detectoren in orde" },
  al_zones_safety_ok_one: { en: "{n} detector OK", nl: "{n} detector in orde" },
  al_zones_safety_fault: { en: "{n} detectors need attention", nl: "{n} detectoren vragen aandacht" },
  al_zones_safety_fault_one: { en: "{n} detector needs attention", nl: "{n} detector vraagt aandacht" },
  al_aria_safety_toggle: { en: "Show detectors", nl: "Toon detectoren" },
  al_zones_ready_count: { en: "{n} zones ready", nl: "{n} zones gereed" },
  al_zones_ready_one: { en: "{n} zone ready", nl: "{n} zone gereed" },
  al_zone_sensing: { en: "Movement", nl: "Beweging" },
  al_zone_ready: { en: "Ready", nl: "Gereed" },
  al_zone_not_ready: { en: "Not ready", nl: "Niet gereed" },
  al_zone_bypassing: { en: "Bypassing…", nl: "Wordt geblokkeerd…" },
  al_zone_restoring: { en: "Restoring…", nl: "Wordt gedeblokkeerd…" },
  al_zones_ready_sensing: {
    en: "{n} ready · {m} sensing movement",
    nl: "{n} gereed · {m} met beweging",
  },

  al_aria_modes: { en: "Alarm modes", nl: "Alarmmodi" },
  al_aria_hold_arm: { en: "Hold to arm in {mode}", nl: "Houd vast om in te schakelen in {mode}" },
  al_aria_hold_disarm: { en: "Hold to disarm", nl: "Houd vast om uit te schakelen" },
  al_aria_inert: { en: "{mode} unavailable - disarm first", nl: "{mode} niet beschikbaar - schakel eerst uit" },
  al_aria_bypass: { en: "Bypass {name}", nl: "{name} blokkeren" },
  al_aria_unbypass: { en: "Stop bypassing {name}", nl: "{name} niet meer blokkeren" },
  al_aria_zones_toggle: { en: "Show ready zones", nl: "Toon zones die gereed zijn" },
  al_zones_unavailable: { en: "{n} zones unavailable", nl: "{n} zones niet beschikbaar" },
  al_zones_unavailable_one: { en: "{n} zone unavailable", nl: "{n} zone niet beschikbaar" },
  al_aria_unavail_toggle: { en: "Show unavailable zones", nl: "Toon zones die niet beschikbaar zijn" },

  al_needs_entity: { en: "Set an alarm_control_panel entity", nl: "Stel een alarm_control_panel-entiteit in" },
  al_no_modes: { en: "This panel offers no arm modes", nl: "Dit paneel biedt geen alarmmodi" },

  /* ---- materia-expander -------------------------------------------------- */
  expander_expand: { en: "Expand", nl: "Uitvouwen" },
  expander_collapse: { en: "Collapse", nl: "Invouwen" },

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
