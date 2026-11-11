/**
 * The attention editor's "Shows when": one simple test on the rule's own
 * entity, stored as the HA card conditions the card already reads. Anything
 * else (several entities, and/or, attributes) is "custom" and edited with
 * HA's full condition builder.
 *
 *   on / off / unavailable       state is that word
 *   is / is_not                  state is / is not `value`
 *   below / above                numeric_state below / above `value`
 */
export const WHEN = ["on", "off", "below", "above", "is", "is_not", "unavailable", "custom"];

const NEEDS_VALUE = new Set(["below", "above", "is", "is_not"]);
export const needsValue = (when) => NEEDS_VALUE.has(when);

/** { when, value } read back from an item's conditions; "custom" when it isn't one simple test. */
export function readWhen(item) {
  const c = item?.conditions;
  if (!Array.isArray(c) || c.length === 0) return { when: "on" };
  if (c.length !== 1) return { when: "custom" };
  const [x] = c;
  const entity = x.entity ?? x.entity_id;
  if (!x || entity !== item.entity || x.attribute) return { when: "custom" };
  if ((x.condition ?? "state") === "numeric_state") {
    if (x.below != null && x.above == null) return { when: "below", value: x.below };
    if (x.above != null && x.below == null) return { when: "above", value: x.above };
    return { when: "custom" };
  }
  if (x.condition && x.condition !== "state") return { when: "custom" };
  if (x.state_not != null && !Array.isArray(x.state_not)) return { when: "is_not", value: x.state_not };
  if (x.state == null || Array.isArray(x.state)) return { when: "custom" };
  if (["on", "off", "unavailable"].includes(x.state)) return { when: x.state };
  return { when: "is", value: x.state };
}

/** The conditions for a simple test, or null when there is nothing to write yet. */
export function writeWhen(entity, when, value) {
  if (!entity || !WHEN.includes(when) || when === "custom") return null;
  if (when === "below" || when === "above") {
    const n = Number(value);
    return Number.isFinite(n) && value !== "" && value != null ? [{ condition: "numeric_state", entity, [when]: n }] : null;
  }
  if (when === "is" || when === "is_not") {
    if (value == null || value === "") return null;
    return [{ condition: "state", entity, [when === "is" ? "state" : "state_not"]: String(value) }];
  }
  return [{ condition: "state", entity, state: when }];
}
