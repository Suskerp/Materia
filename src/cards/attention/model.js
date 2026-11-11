import { conditionsMet } from "../../utils/conditions.js";

/** Most urgent first. */
export const LEVELS = ["urgent", "warning", "info"];

/** The hero's alert severities, in the attention card's levels. */
export const levelOfSeverity = (sev) => (sev === "error" ? "urgent" : sev === "warning" ? "warning" : "info");

const rank = (level) => {
  const i = LEVELS.indexOf(level);
  return i < 0 ? LEVELS.indexOf("warning") : i;
};

/**
 * What needs attention right now, most urgent first (config order within a
 * level). `items` mixes two kinds:
 *  - a rule: shown while all its `conditions` (HA's card-condition schema)
 *    hold. It clears itself when they stop holding, so nothing is ticked off.
 *  - { type: "vacuum", entity, brand }: the robot-vacuum hero's own alerts
 *    for that machine, read through `vacuumAlerts(entity, brand)`.
 * Each entry is { key, level, name, secondary, icon, entity, action,
 * action_label, tap_action, reset } with `index` pointing at its rule.
 */
export function activeItems(items, hass, vacuumAlerts = () => []) {
  const out = [];
  (Array.isArray(items) ? items : []).forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    if (item.type === "vacuum") {
      vacuumAlerts(item.entity, item.brand).forEach((a, j) => {
        out.push({
          key: `v${index}-${j}`,
          index,
          level: levelOfSeverity(a.severity),
          name: a.text,
          icon: a.icon,
          entity: a.entity,
          tap_action: { action: "more-info", entity: item.entity },
          reset: a.reset,
        });
      });
      return;
    }
    if (!conditionsMet(item.conditions, hass)) return;
    out.push({ ...item, key: `r${index}`, index, level: LEVELS.includes(item.level) ? item.level : "warning" });
  });
  return out
    .map((x, order) => ({ x, order }))
    .sort((a, b) => rank(a.x.level) - rank(b.x.level) || a.order - b.order)
    .map(({ x }) => x);
}
