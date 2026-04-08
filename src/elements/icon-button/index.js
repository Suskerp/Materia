import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaIconButton extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedIcon: { state: true },
    _resolvedDisabled: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-icon-button-editor");
  }

  static getStubConfig() {
    return { icon: "mdi:play", variant: "filled", size: "default" };
  }

  static styles = [unavailableStyles, styles];

  setConfig(config) {
    if (!config.icon) throw new Error("icon is required");
    this.config = {
      variant: "filled",
      size: "default",
      ...config,
    };
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
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("disabled", "_resolvedDisabled");
    }
  }

  _defaultTapAction() {
    if (this.config.entity) return { action: "toggle" };
    return { action: "none" };
  }

  render() {
    if (!this.config) return html``;

    const stateObj = this.config.entity ? this.hass?.states?.[this.config.entity] : undefined;
    const unavailable = this.config.entity ? this._isUnavailable(stateObj) : false;
    const disabled = this._disabled;

    const variant = this.config.variant || "filled";
    const size = this.config.size === "large" ? "large" : "default";
    const icon = this._isTemplate(this.config.icon)
      ? (this._resolvedIcon || "mdi:circle-small")
      : this.config.icon;

    return html`
      <ha-card
        class="${variant} size-${size} ${unavailable ? 'unavailable' : ''} ${disabled ? 'disabled' : ''}"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </ha-card>
    `;
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

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-icon-button", MateriaIconButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-icon-button",
  name: "Materia Icon Button",
  description: "M3 icon button with variants and state-based icons.",
  preview: true,
});
