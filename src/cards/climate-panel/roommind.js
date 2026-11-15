/**
 * RoomMind rooms on the climate panel. A room's thermostat is
 * climate.roommind_<area>; a manual change on it is an override that RoomMind
 * holds until the active schedule's next change. The panel lets you hold it
 * for a fixed time instead, through RoomMind's own roommind/override/set.
 */

/** The RoomMind area of a room thermostat, else null (the _override entity is not a room). */
export const roommindRoom = (entityId) => {
  const m = /^climate\.roommind_(.+)$/.exec(entityId || "");
  return m && !m[1].endsWith("_override") ? m[1] : null;
};

const PRESET_TYPE = { comfort: "boost", eco: "eco" };

/** True while a manual change (or a comfort/eco preset) holds. */
export const isHeld = (stateObj) => {
  const preset = stateObj?.attributes?.preset_mode;
  return !!preset && preset !== "none";
};

/** Epoch ms of the active schedule's next change, or null. */
export const nextChange = (hass, room) => {
  const schedules = room?.schedules || [];
  // rooms/list keeps the live index under `live`; one schedule is always the active one.
  const idx = room?.live?.active_schedule_index ?? room?.active_schedule_index ?? (schedules.length === 1 ? 0 : -1);
  const id = idx >= 0 ? schedules[idx]?.entity_id : null;
  const raw = id ? hass.states[id]?.attributes?.next_event : null;
  const ms = raw ? Date.parse(raw) : NaN;
  return Number.isFinite(ms) ? ms : null;
};

/**
 * The override/set message that holds `target` (or the band in force) for
 * `hours`; hours null holds until it is cleared.
 */
export const overrideMessage = (area, room, stateObj, hours, target) => {
  const a = stateObj?.attributes || {};
  const mode = room?.climate_mode || "auto";
  const type = target == null ? (PRESET_TYPE[a.preset_mode] || "custom") : "custom";
  const msg = { type: "roommind/override/set", area_id: area, override_type: type };
  if (hours != null) msg.duration = Math.max(hours, 1 / 60);
  if (type !== "custom") return msg;
  let heat = a.target_temp_low ?? a.temperature;
  let cool = a.target_temp_high ?? null;
  if (target != null) {
    if (mode === "cool_only") cool = target;
    else heat = target;
  }
  if (mode === "heat_only") cool = null;
  if (mode === "cool_only") { heat = null; cool = cool ?? a.temperature; }
  if (mode === "auto" && heat != null) cool = Math.max(heat, cool ?? room?.comfort_cool ?? 24);
  if (heat != null) msg.heat = heat;
  if (cool != null) msg.cool = cool;
  return msg;
};
