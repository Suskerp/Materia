/**
 * A dehumidifier's water tank on the climate panel (humidifier entities only).
 * Both parts are optional: `tank_entity` is a 0–100 % level, `tank_full_entity`
 * a binary sensor or boolean that is on while the tank is full. Without either
 * the panel is the plain dial.
 */

const num = (v) => (v == null || v === "" ? NaN : Number(v));

/** The tank level in %, clamped to 0–100; null when there is no level to show. */
export const tankLevel = (hass, config) => {
  const id = config?.tank_entity;
  if (!id) return null;
  const n = num(hass?.states?.[id]?.state);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
};

/** True while the tank is full: the full entity says so, else the level reached 100. */
export const tankFull = (hass, config) => {
  const id = config?.tank_full_entity;
  if (id) return hass?.states?.[id]?.state === "on";
  return tankLevel(hass, config) === 100;
};

/** True when the card has a tank to show at all. */
export const hasTank = (config) =>
  !!(config?.entity?.startsWith("humidifier.") && (config.tank_entity || config.tank_full_entity));

/**
 * What "emptied" does: the configured action, else turning the full flag off
 * (a boolean) or pressing it (a button). Null when nothing sensible exists, as
 * for a device's own binary sensor, which clears by itself.
 */
export const emptiedAction = (config) => {
  const a = config?.tank_emptied_action;
  if (a?.action && a.action !== "none") return a;
  if (a?.action === "none") return null;
  const id = config?.tank_full_entity || "";
  const domain = id.split(".")[0];
  if (domain === "input_boolean") return { action: "perform-action", perform_action: "input_boolean.turn_off", target: { entity_id: id } };
  if (domain === "input_button" || domain === "button") return { action: "perform-action", perform_action: `${domain}.press`, target: { entity_id: id } };
  return null;
};
