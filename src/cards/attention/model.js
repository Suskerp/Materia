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
 *
 * `for_minutes` on a rule: it only shows once its entity has been in its
 * current state that long (the entity's own last_changed, so no helper:
 * "the fridge door has been open for 3 minutes").
 */
export function activeItems(items, hass, vacuumAlerts = () => [], now = Date.now()) {
  const out = [];
  (Array.isArray(items) ? items : []).forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    if (item.type === "vacuum") {
      // `errors_only`: just the red alerts; worn parts and tanks stay on the vacuum's own page.
      vacuumAlerts(item.entity, item.brand)
        .filter((a) => !item.errors_only || a.severity === "error")
        .forEach((a, j) => {
        out.push({
          key: `v${index}-${j}`,
          index,
          level: levelOfSeverity(a.severity),
          name: a.text,
          // Which machine, and how pressing ("Qrevo Pro · due now").
          secondary: [hass?.states?.[item.entity]?.attributes?.friendly_name, a.detail].filter(Boolean).join(" · "),
          icon: a.icon,
          entity: a.entity,
          tap_action: { action: "more-info", entity: item.entity },
          reset: a.reset,
          later: item.later,
          later_hours: item.later_hours,
        });
      });
      return;
    }
    if (!conditionsMet(item.conditions, hass)) return;
    if (heldFor(item, hass, now) === false) return;
    out.push({ ...item, key: `r${index}`, index, level: LEVELS.includes(item.level) ? item.level : "warning" });
  });
  return out
    .map((x, order) => ({ x, order }))
    .sort((a, b) => rank(a.x.level) - rank(b.x.level) || a.order - b.order)
    .map(({ x }) => x);
}

/** null without `for_minutes`; else whether its entity has held its state that long. */
export function heldFor(item, hass, now = Date.now()) {
  const min = Number(item?.for_minutes);
  if (!(min > 0) || !item.entity) return null;
  const since = Date.parse(hass?.states?.[item.entity]?.last_changed ?? "");
  return Number.isFinite(since) && now - since >= min * 60000;
}
