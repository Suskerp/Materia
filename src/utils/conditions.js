import { css } from "lit";

/**
 * HA dashboard conditions, evaluated Materia-side.
 *
 * The schema is EXACTLY Home Assistant's card-visibility / conditional-card
 * condition list (condition: state | numeric_state | screen | user | and | or
 * | not), so a user who knows the visibility UI already knows this — and the
 * editor renders HA's own ha-card-conditions-editor against the same shape.
 * Materia only adds a different CONSEQUENCE: where visibility hides the card,
 * `disabled:` keeps it visible at 38% and inert (the M3 disabled treatment).
 *
 * An empty or missing list is NOT met — nothing is disabled by default. An
 * unrecognised condition is not met either: failing open (enabled) beats a
 * config typo freezing a control.
 */
export function conditionsMet(conditions, hass) {
  if (!Array.isArray(conditions) || conditions.length === 0) return false;
  return conditions.every((c) => met(c, hass));
}

function toArray(v) {
  return Array.isArray(v) ? v : v == null ? [] : [v];
}

function met(c, hass) {
  if (!c || typeof c !== "object") return false;
  switch (c.condition ?? "state") {
    case "state": {
      if (!c.entity) return false;
      const st = hass?.states?.[c.entity];
      const value = c.attribute ? st?.attributes?.[c.attribute] : st?.state;
      const v = value == null ? "" : String(value);
      if (c.state != null) return toArray(c.state).map(String).includes(v);
      if (c.state_not != null) return !toArray(c.state_not).map(String).includes(v);
      return false;
    }
    case "numeric_state": {
      if (!c.entity) return false;
      const st = hass?.states?.[c.entity];
      const n = Number(c.attribute ? st?.attributes?.[c.attribute] : st?.state);
      if (!Number.isFinite(n)) return false;
      // HA allows the bound itself to be an entity id.
      const bound = (b) =>
        typeof b === "string" && hass?.states?.[b] ? Number(hass.states[b].state) : Number(b);
      if (c.above != null && !(n > bound(c.above))) return false;
      if (c.below != null && !(n < bound(c.below))) return false;
      return c.above != null || c.below != null;
    }
    case "screen":
      return c.media_query ? window.matchMedia(c.media_query).matches : false;
    case "user":
      return toArray(c.users).includes(hass?.user?.id);
    case "and":
      return toArray(c.conditions).every((x) => met(x, hass));
    case "or":
      return toArray(c.conditions).some((x) => met(x, hass));
    case "not":
      return toArray(c.conditions).length > 0 && !toArray(c.conditions).some((x) => met(x, hass));
    default:
      return false;
  }
}

/**
 * Mixin: `disabled:` as a CONDITION LIST on any card.
 *
 * Reflects the verdict onto a host attribute so the treatment is pure CSS.
 * Cards with structural needs (the carousel must keep scrolling) skip the
 * shared stylesheet and target [card-disabled] descendants themselves.
 * Re-evaluated on every hass tick, which is what drives renders anyway.
 */
export const DisabledMixin = (Base) =>
  class extends Base {
    get _disabledByCondition() {
      const d = this.config?.disabled;
      return Array.isArray(d) && conditionsMet(d, this.hass);
    }

    willUpdate(changed) {
      super.willUpdate?.(changed);
      this.toggleAttribute("card-disabled", this._disabledByCondition);
    }
  };

/** The shared consequence: M3 disabled — 38% content, no interaction. */
export const disabledConditionStyles = css`
  :host([card-disabled]) {
    opacity: 0.38;
    pointer-events: none;
  }
`;
