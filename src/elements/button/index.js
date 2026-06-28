import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/** Legacy materia-icon-button variant names → M3 button variants. */
const VARIANT_ALIAS = {
  "filled-tonal": "tonal",
  standard: "text",
};

/** Default "active" state per domain (for shape morphing). */
const DOMAIN_ACTIVE = {
  light: "on",
  switch: "on",
  fan: "on",
  input_boolean: "on",
  vacuum: "cleaning",
  lock: ["locked", "locking"],
  cover: "open",
  climate: "heat",
  media_player: "playing",
};

class MateriaButton extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedIcon: { state: true },
    _resolvedLabel: { state: true },
    _resolvedDisabled: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-button-editor");
  }

  static getStubConfig() {
    return { icon: "mdi:play", variant: "filled", size: "m", shape: "round" };
  }

  setConfig(config) {
    if (!config.icon && !config.label) {
      throw new Error("icon or label is required");
    }
    this.config = { variant: "filled", size: "m", shape: "round", ...config };
    this.toggleAttribute("wide", !!config.wide);
  }

  get _disabled() {
    const val = this.config?.disabled;
    if (val === undefined || val === null) return false;
    if (typeof val === "boolean") return val;
    if (this._isTemplate(val)) {
      const r = this._resolvedDisabled;
      return r === "True" || r === "true" || r === "1";
    }
    return val === "true" || val === "True";
  }

  updated(changedProps) {
    // Reflect `wide` whenever config changes — not just in setConfig, since
    // icon-row sets the `.config` property directly (bypassing setConfig).
    if (changedProps.has("config")) {
      this.toggleAttribute("wide", !!this.config?.wide);
    }
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("label", "_resolvedLabel");
      this._resolveField("disabled", "_resolvedDisabled");
    }
  }

  _isActive(stateObj) {
    if (!stateObj) return false;
    const domain = stateObj.entity_id.split(".")[0];
    const active = this.config.active_state ?? DOMAIN_ACTIVE[domain] ?? "on";
    if (Array.isArray(active)) return active.includes(stateObj.state);
    return stateObj.state === String(active);
  }

  _defaultTapAction() {
    return this.config.entity ? { action: "toggle" } : { action: "none" };
  }

  _resolveTapAction() {
    if (this.config.tap_action_map && this.config.entity) {
      const state = this.hass?.states[this.config.entity]?.state;
      const mapped = this.config.tap_action_map[state] ?? this.config.tap_action_map.default;
      if (mapped) return mapped;
    }
    return this.config.tap_action || this._defaultTapAction();
  }

  _handleTap() {
    if (this._disabled) return;
    this._handleAction(this._resolveTapAction());
  }

  render() {
    if (!this.config) return html``;

    const stateObj = this.config.entity ? this.hass?.states?.[this.config.entity] : undefined;
    const unavailable = this.config.entity ? this._isUnavailable(stateObj) : false;
    const disabled = this._disabled;

    const variant = VARIANT_ALIAS[this.config.variant] || this.config.variant || "filled";
    // size may be a named token (xs/s/m/l/xl) or a custom height in px
    // (e.g. 72) for an in-between size.
    const sizeVal = this.config.size ?? "m";
    const numeric = typeof sizeVal === "number" || /^\d+$/.test(String(sizeVal));
    let sizeClass = "";
    let sizeStyle = "";
    if (numeric) {
      const h = Number(sizeVal);
      sizeStyle =
        `--mb-h:${h}px;--mb-icon:${Math.round(h * 0.43)}px;--mb-font:16px;` +
        `--mb-px:${Math.round(h * 0.42)}px;--mb-rsq:${Math.round(h * 0.28)}px;--mb-gap:8px;`;
    } else {
      sizeClass = `size-${sizeVal}`;
    }
    const baseShape = this.config.shape === "square" ? "square" : "round";
    const active = this._isActive(stateObj);
    // M3 spec: a selected/active toggle button morphs toward square; inactive
    // keeps its base shape. (Don't flip square→round — that's backwards.)
    const shape = this.config.morph_on_active && active ? "square" : baseShape;

    const icon = this._isTemplate(this.config.icon)
      ? (this._resolvedIcon || "")
      : this.config.icon;
    const label = this._isTemplate(this.config.label)
      ? (this._resolvedLabel || "")
      : this.config.label;
    const iconOnly = !label;

    return html`
      <button
        class="btn variant-${variant} ${sizeClass} shape-${shape} ${iconOnly ? "icon-only" : ""} ${disabled ? "disabled" : ""} ${unavailable ? "unavailable" : ""}"
        style=${sizeStyle}
        @click=${this._handleTap}
      >
        ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
        ${label ? html`<span class="label">${label}</span>` : nothing}
      </button>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-button", MateriaButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-button",
  name: "Materia Button",
  description: "M3 button — icon and/or label, variants, sizes, shapes, and shape-morph on state.",
  preview: true,
});
