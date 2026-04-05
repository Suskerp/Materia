import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset, rowCardStyles, unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

const DOMAIN_ACTIVE_STATES = {
  light: "on", switch: "on", fan: "on", vacuum: "cleaning",
  lock: "locked", cover: "open", binary_sensor: "on",
  climate: "heat", media_player: "playing", input_boolean: "on",
};

class MateriaDevice extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-device-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      name: "",
      icon: "mdi:power-plug",
      button_type: "switch",
      active_state: "on",
      show_state: true,
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = {
      icon: "mdi:power-plug",
      button_type: "switch",
      color_active: "var(--md-sys-cust-color-device)",
      color_on_active: "var(--md-sys-cust-color-on-device)",
      show_state: true,
      ...config,
    };
  }

  _getActiveState() {
    if (this.config.active_state) return String(this.config.active_state);
    const entity = this.config.entity || "";
    const domain = entity.split(".")[0];
    return DOMAIN_ACTIVE_STATES[domain] || "on";
  }

  _isActive(stateObj) {
    if (!stateObj) return false;
    const target = this._getActiveState();
    return stateObj.state === target;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);

    const active = !unavailable && this._isActive(stateObj);
    const name = this.config.name || stateObj?.attributes?.friendly_name || this.config.entity;
    const icon = this.config.icon;
    const colorActive = this.config.color_active;
    const colorOnActive = this.config.color_on_active;

    const containerBg = active
      ? colorActive
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = active
      ? colorOnActive
      : "var(--primary-text-color)";

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? 'unavailable' : ''}"
          style="background-color: ${containerBg}; color: ${textColor};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${icon} style="color: ${textColor};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${name}</div>
            ${this.config.show_state
              ? html`<div class="state">${unavailable ? 'Unavailable' : this._capitalize(stateObj.state)}</div>`
              : ""}
          </div>
          ${this._hasNavigateAction ? html`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          ` : ''}
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    if (this.config.tap_action) {
      this._handleAction(this.config.tap_action);
    } else {
      this.hass.callService("homeassistant", "toggle", {
        entity_id: this.config.entity,
      });
    }
  }

  getGridOptions() {
    return { columns: 12, rows: 1.5 };
  }

  getCardSize() {
    return 2;
  }

  static styles = [hostStyles, haCardReset, rowCardStyles, unavailableStyles, styles];
}

customElements.define("materia-device", MateriaDevice);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-device",
  name: "Materia Device",
  description: "A native Lit generic device/switch card with active-state colors.",
});
