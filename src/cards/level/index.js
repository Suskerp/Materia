import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin, disabledConditionStyles } from "../../utils/conditions.js";
import { OptimisticMixin } from "../../utils/optimistic.js";
import { styles } from "./styles.js";
import "../../primitives/slider.js";
import "./editor.js";

/**
 * Generic level row (materia-level): a label, the current reading, and an M3
 * Expressive slider beneath. One entity per card — compose a mixer (three amp
 * zones, a rack of dimmers) from several of these.
 *
 * SCALES ARE DERIVED, NEVER ASSUMED. A media_player's volume is a 0..1 float
 * shown as a percentage; a light's brightness is 0..255 shown as a
 * percentage; a number takes its own min/max/step off the entity. The card
 * keeps the slider in the entity's NATIVE units — so `min`/`max`/`step` in
 * the config mean what they mean on the entity, exactly as they do for a
 * number helper — and applies a display factor to the readout only.
 *
 * The read side is the state or, when the value lives in an attribute
 * (volume_level, brightness, percentage, current_position), that attribute —
 * picked from the domain unless `attribute` says otherwise. The write side is
 * inferred from the same pair, and `service` / `service_key` override it.
 */

/** Attributes whose scale is fixed by HA, not by the entity. */
const KNOWN_ATTRS = {
  // media_player reports volume_level as a 0..1 float; 1% granularity is the
  // finest step a percentage readout can distinguish.
  volume_level: { min: 0, max: 1, step: 0.01, factor: 100, unit: "%" },
  // light.brightness is a 0..255 byte; HA's own UI shows it as a percentage.
  brightness: { min: 0, max: 255, step: 1, factor: 100 / 255, unit: "%" },
  percentage: { min: 0, max: 100, step: 1, factor: 1, unit: "%" },
  current_position: { min: 0, max: 100, step: 1, factor: 1, unit: "%" },
};

/** Where each domain keeps its level when it is not the state. */
const DOMAIN_ATTR = {
  media_player: "volume_level",
  light: "brightness",
  fan: "percentage",
  cover: "current_position",
};

/** domain -> [service, service data key]. The key is NOT always the attribute
 *  it was read from: a cover reports current_position but is set by position. */
const DOMAIN_WRITE = {
  media_player: ["media_player.volume_set", "volume_level"],
  light: ["light.turn_on", "brightness"],
  number: ["number.set_value", "value"],
  input_number: ["input_number.set_value", "value"],
  fan: ["fan.set_percentage", "percentage"],
  cover: ["cover.set_cover_position", "position"],
};

const num = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

/** Decimal places a step implies, so 0.01 steps stop printing 0.30000000000004. */
const decimalsOf = (step) => {
  const s = String(step);
  const dot = s.indexOf(".");
  if (dot < 0) return 0;
  return Math.min(6, s.length - dot - 1);
};

class MateriaLevel extends OptimisticMixin(DisabledMixin(ActionMixin(LitElement))) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedLabel: { state: true },
    _resolvedIcon: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedSliderColor: { state: true },
    _resolvedSliderTrackColor: { state: true },
    // The in-flight drag value. Display only — it keeps the readout in step
    // with the finger without a service call per frame.
    _dragging: { state: true },
  };

  static styles = [styles, disabledConditionStyles];

  static getConfigElement() {
    return document.createElement("materia-level-editor");
  }

  static getStubConfig(hass) {
    const ids = Object.keys(hass?.states || {});
    const entity =
      ids.find((e) => e.startsWith("media_player.")) ||
      ids.find((e) => e.startsWith("input_number.")) ||
      ids.find((e) => e.startsWith("number.")) ||
      ids.find((e) => e.startsWith("light.")) ||
      "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Level: entity is required");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("label", "_resolvedLabel");
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("slider_color", "_resolvedSliderColor");
      this._resolveField("slider_track_color", "_resolvedSliderTrackColor");
      this._optimisticReconcile();
    }
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  get _domain() {
    return String(this.config.entity || "").split(".")[0];
  }

  /** The attribute the level lives in, or null when it is the state itself. */
  get _attribute() {
    return this.config.attribute ?? DOMAIN_ATTR[this._domain] ?? null;
  }

  /**
   * min / max / step in the entity's OWN units, plus the display factor and
   * unit. Explicit config always wins; otherwise a known attribute fixes the
   * scale, and failing that the entity's own min/max/step attributes do (the
   * number and input_number convention), falling back to 0..100 by 1.
   */
  get _scale() {
    const a = this._stateObj?.attributes || {};
    const maxEntityRaw = this.config.max_entity
      ? Number(this.hass?.states?.[this.config.max_entity]?.state)
      : NaN;
    const maxFromEntity = Number.isFinite(maxEntityRaw)
      ? maxEntityRaw * num(this.config.max_entity_factor, 1)
      : undefined;
    const known = KNOWN_ATTRS[this._attribute];
    const base = known || {
      min: num(a.min, 0),
      max: num(a.max, 100),
      step: num(a.step, 1),
      factor: 1,
      unit: a.unit_of_measurement ?? "",
    };
    // A fan's step is per-device (a 3-speed fan steps by 33).
    const step = this._attribute === "percentage" ? num(a.percentage_step, base.step) : base.step;

    return {
      min: num(this.config.min, base.min),
      max: num(this.config.max ?? maxFromEntity, base.max),
      step: num(this.config.step, step),
      factor: base.factor,
      unit: this.config.unit ?? base.unit,
    };
  }

  /** The REAL value in native units, as a string for the optimism mixin. */
  _optimisticActual() {
    const st = this._stateObj;
    if (!st) return null;
    const raw = this._attribute ? st.attributes?.[this._attribute] : st.state;
    const n = Number(raw);
    if (Number.isFinite(n)) return String(n);
    // An off light reports no brightness at all, but HA's own UI still shows
    // it at zero — and a slider you cannot touch until the light is already on
    // is a slider that cannot turn it on. light.turn_on with a brightness does
    // both, so treat the absent attribute as the floor.
    if (this._domain === "light" && st.state === "off") return "0";
    return null;
  }

  /** What the UI shows: the finger while it is down, then the pinned value,
   *  then reality once it lands. */
  get _current() {
    if (this._dragging != null) return this._dragging;
    const n = Number(this._optimistic);
    return Number.isFinite(n) ? n : null;
  }

  /** Snap to the step grid, clamp to range, and drop float noise. */
  _quantize(v, scale) {
    const { min, max, step } = scale;
    const snapped = step > 0 ? Math.round((v - min) / step) * step + min : v;
    const clamped = Math.min(max, Math.max(min, snapped));
    return Number(clamped.toFixed(decimalsOf(step)));
  }

  /** The readout: native value scaled for humans, localized. */
  _display(raw, scale) {
    if (raw == null) return "—";
    const shown = raw * scale.factor;
    // A scaled value is a percentage — whole numbers. An unscaled one keeps
    // exactly the precision its own step implies.
    const dp = scale.factor === 1 ? decimalsOf(scale.step) : 0;
    const rounded = Number(shown.toFixed(dp));
    return rounded.toLocaleString(this.hass?.locale?.language || "en", {
      minimumFractionDigits: dp,
      maximumFractionDigits: dp,
    });
  }

  _onDragging(e) {
    e.stopPropagation();
    const v = Number(e.detail?.value);
    this._dragging = Number.isFinite(v) ? v : null;
  }

  _onCommit(e) {
    e.stopPropagation();
    const raw = Number(e.detail?.value);
    this._dragging = null;
    if (!Number.isFinite(raw)) return;
    const value = this._quantize(raw, this._scale);

    const st = this._stateObj;
    if (!st) return;

    // Resolve the write BEFORE pinning: a domain we have no setter for would
    // otherwise sit on a 10s fiction it can never make true.
    const [service, key] = this._writeTarget();
    if (!service) return;

    this._fireHaptic("selection");
    // Pin before the call so the readout answers on THIS frame instead of a
    // poll cycle later. A wrong prediction releases itself the moment the real
    // value moves anywhere.
    this._optimisticSet(value);

    // light.turn_on with brightness 0 is not "off" — HA deprecated that and
    // some integrations reject it outright. Dragging a dimmer to the floor
    // means off, so say so.
    if (!this.config.service && this._domain === "light" && value <= 0) {
      this._callService("light", "turn_off", { entity_id: st.entity_id });
      return;
    }

    const [d, s] = service.split(".");
    this._callService(d, s, { entity_id: st.entity_id, [key]: value });
  }

  /** [service, data key] — explicit override, else the domain, else HA's
   *  set_<attribute> convention (the same one bar-select leans on). */
  _writeTarget() {
    if (this.config.service) {
      const key = this.config.service_key || this._attribute || "value";
      return [String(this.config.service), key];
    }
    const known = DOMAIN_WRITE[this._domain];
    if (known) return [known[0], this.config.service_key || known[1]];
    if (this._attribute) {
      return [`${this._domain}.set_${this._attribute}`, this.config.service_key || this._attribute];
    }
    return [null, null];
  }

  _field(configKey, propKey) {
    const raw = this.config[configKey];
    const resolved = this._isTemplate(raw) ? this[propKey] : raw;
    return typeof resolved === "string" ? resolved.trim() : resolved;
  }

  _controlTap() {
    if (this.config.control_action) {
      this._handleAction(this.config.control_action);
      return;
    }
    const entityId = this.config.control_entity;
    if (entityId) this._callService("homeassistant", "toggle", { entity_id: entityId });
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    const scale = this._scale;
    const value = this._current;
    // unknown is as unusable as unavailable here: there is no level to move.
    const dead = !st || this._isUnavailable(st) || st.state === "unknown" || value == null;

    const label =
      this._field("label", "_resolvedLabel") ||
      st?.attributes?.friendly_name ||
      this.config.entity;
    const icon = this._field("icon", "_resolvedIcon");
    const bg = this._field("color", "_resolvedColor");
    const fg = this._field("color_on", "_resolvedColorOn");
    // The slider's own accent falls back to color_on, so a tile that tints
    // itself from state carries the track with it.
    // SliderTokens puts the handle and the active track on PRIMARY. A Materia
    // custom role must never pre-empt a spec role: --md-sys-cust-color-device
    // is #004E58 on a dark harmonised theme, so defaulting to it rendered every
    // slider teal beside a materia-switch that was correctly lavender. An
    // install that wants the device tint sets slider_color.
    const accent =
      this._field("slider_color", "_resolvedSliderColor") ||
      fg ||
      "var(--md-sys-color-primary, var(--primary-color))";
    const trackColor = this._field("slider_track_color", "_resolvedSliderTrackColor") || "";

    const shown = this._display(value, scale);
    const unit = scale.unit;
    const control = this.config.control_entity ? this.hass.states[this.config.control_entity] : null;
    const controlOn = control && !["off", "unavailable", "unknown"].includes(control.state);
    const controlIcon = this.config.control_icon || "m3o:power-settings-new";

    return html`
      <ha-card class=${dead ? "unavailable" : ""} style="--ml-accent:${accent};">
        <div class="level-row ${control ? "with-control" : ""}">
          <div class="tile ${this.config.variant === "flat" ? "flat" : ""}" style="${bg ? `background:${bg};` : ""}${fg ? `color:${fg};` : ""}">
            <div class="head">
              ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
              <span class="label">${label}</span>
              <span class="value"
                >${shown}${unit && !dead ? html`<span class="unit">${unit}</span>` : nothing}</span
              >
            </div>

            <!-- No show-label: the M3 value indicator would float a second copy
                 of the readout that already sits in the head row. -->
            <materia-slider
              .min=${scale.min}
              .max=${scale.max}
              .step=${scale.step}
              .value=${value ?? scale.min}
              .color=${accent}
              .trackColor=${trackColor}
              .label=${label}
              .size=${this.config.slider_size || "xs"}
              .stops=${!this.config.hide_stops}
              ?disabled=${dead}
              @value-dragging=${this._onDragging}
              @value-changed=${this._onCommit}
            ></materia-slider>
          </div>
          ${control ? html`<button
            class="control ${controlOn ? "on" : ""}"
            aria-label=${this.config.control_label || control.attributes?.friendly_name || label}
            aria-pressed=${controlOn ? "true" : "false"}
            @click=${this._controlTap}
          ><ha-icon .icon=${controlIcon}></ha-icon></button>` : nothing}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-level", MateriaLevel);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-level",
  name: "Materia Level",
  description:
    "Entity-bound level row with an M3 Expressive slider — volumes, dimmers, number helpers, fan speeds.",
  preview: true,
});
