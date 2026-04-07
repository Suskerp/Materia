import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaClimate extends ActionMixin(LitElement) {
  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
      _optimisticTemp: { state: true },
      _resolvedName: { state: true },
    };
  }

  static styles = [hostStyles, unavailableStyles, styles];

  static getConfigElement() {
    return document.createElement("materia-climate-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(e => e.startsWith("climate.")) || "climate.example";
    return { entity, name: "Climate", step: 0.5 };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!config.name) throw new Error("name is required");
    this.config = { step: 0.5, ...config };
  }

  getCardSize() {
    return 3;
  }

  get _entity() {
    return this.hass?.states[this.config.entity];
  }

  get _mode() {
    return this._entity?.state ?? "off";
  }

  get _targetTemp() {
    if (this._optimisticTemp != null) return this._optimisticTemp;
    return this._entity?.attributes?.temperature;
  }

  get _currentTemp() {
    return this._entity?.attributes?.current_temperature;
  }

  get _humidity() {
    if (!this.config.humidity_entity) return undefined;
    return this.hass?.states[this.config.humidity_entity]?.state;
  }

  get _outdoorTemp() {
    if (!this.config.outdoor_temp_entity) return undefined;
    return this.hass?.states[this.config.outdoor_temp_entity]?.state;
  }

  _modeIcon() {
    switch (this._mode) {
      case "heat": return "mdi:fire";
      case "cool": return "mdi:snowflake";
      case "auto": return "mdi:autorenew";
      default: return "mdi:power";
    }
  }

  _modeBg() {
    switch (this._mode) {
      case "heat": return "var(--md-sys-cust-color-climate-heat-container)";
      case "cool": return "var(--md-sys-cust-color-climate-cool-container)";
      case "auto": return "var(--md-sys-cust-color-climate-auto-container)";
      default: return "var(--md-sys-color-surface-variant)";
    }
  }

  _modeColor() {
    switch (this._mode) {
      case "heat": return "var(--md-sys-cust-color-on-climate-heat)";
      case "cool": return "var(--md-sys-cust-color-on-climate-cool)";
      case "auto": return "var(--md-sys-cust-color-on-climate-auto)";
      default: return "var(--md-sys-color-on-surface-variant)";
    }
  }

  _buttonBg() {
    switch (this._mode) {
      case "heat": return "var(--md-sys-cust-color-climate-heat)";
      case "cool": return "var(--md-sys-cust-color-climate-cool)";
      case "auto": return "var(--md-sys-cust-color-climate-auto)";
      default: return "rgba(68,68,68,0.7)";
    }
  }

  _buttonColor() {
    switch (this._mode) {
      case "heat": return "var(--md-sys-cust-color-on-climate-heat)";
      case "cool": return "var(--md-sys-cust-color-on-climate-cool, #fff)";
      case "auto": return "var(--md-sys-cust-color-on-climate-auto, #000)";
      default: return "var(--md-sys-color-surface-variant-light, #45464f)";
    }
  }

  _statusText() {
    const mode = this._mode;
    const current = this._currentTemp;
    const humidity = this._humidity;
    const outdoor = this._outdoorTemp;
    const isOff = mode === "off";
    const parts = [];

    if (isOff) {
      if (outdoor != null) parts.push(`${outdoor}\u00B0`);
      if (humidity != null) parts.push(`${humidity}%`);
      return parts.join(" \u00B7 ") || "";
    }

    if (current != null) parts.push(`${current}\u00B0`);
    if (humidity != null) parts.push(`${humidity}%`);

    if (outdoor != null) {
      parts.push(`${outdoor}\u00B0`);
    }

    return parts.join(" \u00B7 ") || "";
  }

  _adjustTemp(delta) {
    const temp = this._targetTemp;
    if (temp == null) return;
    const newTemp = temp + delta;
    this._optimisticTemp = newTemp;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this.config.entity,
      temperature: newTemp,
    });
    clearTimeout(this._optimisticTimer);
    this._optimisticTimer = setTimeout(() => {
      this._optimisticTemp = null;
    }, 10000);
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("name", "_resolvedName");
    }
    if (changedProps.has("hass") && this._optimisticTemp != null) {
      const actual = this._entity?.attributes?.temperature;
      if (actual === this._optimisticTemp) {
        this._optimisticTemp = null;
        clearTimeout(this._optimisticTimer);
      }
    }
  }

  _handleTap(e) {
    if (e.target.closest(".btn")) return;

    const action = this.config.tap_action ?? { action: "more-info" };

    if (action.action === "more-info") {
      const ev = new Event("hass-more-info", {
        bubbles: true,
        composed: true,
      });
      ev.detail = { entityId: this.config.entity };
      this.dispatchEvent(ev);
      return;
    }

    const ev = new Event("hass-action", { bubbles: true, composed: true });
    ev.detail = { config: this.config, action: "tap" };
    this.dispatchEvent(ev);
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entity = this._entity;
    const unavailable = this._isUnavailable(entity);

    const mode = this._mode;
    const isOff = mode === "off" || unavailable;
    const tempDisplay = unavailable
      ? "Unavailable"
      : isOff
        ? "Off"
        : this._targetTemp != null
          ? Math.round(this._targetTemp)
          : "\u2014";

    return html`
      <ha-card
        class="${unavailable ? 'unavailable' : ''}"
        @click=${this._handleTap}
        style="
          background-color: ${this._modeBg()};
          color: ${this._modeColor()};
        "
      >
        <div class="header">
          <ha-icon
            .icon=${this._modeIcon()}
            style="color: ${this._modeColor()}; --mdc-icon-size: 20px;"
          ></ha-icon>
          <span class="name" style="color: ${this._modeColor()};">
            ${this._isTemplate(this.config.name) ? this._resolvedName : this.config.name}
          </span>
        </div>

        <div class="center">
          <div class="center-side">
            ${isOff
              ? nothing
              : html`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${(e) => { e.stopPropagation(); this._adjustTemp(-this.config.step); }}
                  >
                    <ha-icon icon="mdi:minus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>

          <span class="temp ${isOff ? "off" : ""}">${tempDisplay}</span>

          <div class="center-side">
            ${isOff
              ? nothing
              : html`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${(e) => { e.stopPropagation(); this._adjustTemp(this.config.step); }}
                  >
                    <ha-icon icon="mdi:plus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>
        </div>

        <div class="status" style="color: ${this._modeColor()};">
          ${this._statusText()}
        </div>
      </ha-card>
    `;
  }
}

customElements.define("materia-climate", MateriaClimate);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-climate",
  name: "Materia Climate",
  description: "Climate thermostat with mode-based theming and temperature controls.",
  preview: true,
});
