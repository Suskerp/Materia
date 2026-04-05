import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset, rowCardStyles, unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaLock extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-lock-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);

    const isLocked = stateObj?.state === "locked";
    const name = this.config.name || stateObj?.attributes?.friendly_name || this.config.entity;
    const icon = isLocked ? "m3o:lock" : "m3o:lock-open-right";

    const stateText = unavailable ? 'Unavailable' : this._capitalize(stateObj.state);

    const containerBg = isLocked
      ? "var(--md-sys-cust-color-device-container)"
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = isLocked
      ? "var(--md-sys-cust-color-on-device)"
      : "var(--primary-text-color)";

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? 'unavailable' : ''}"
          style="background-color: ${containerBg}; color: ${textColor};"
        >
          <div class="icon-container">
            <ha-icon .icon=${icon} style="color: ${textColor};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${name}</div>
            <div class="state">${stateText}</div>
          </div>
          ${this._hasNavigateAction ? html`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          ` : ''}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: 1.5 };
  }

  getCardSize() {
    return 2;
  }

  static styles = [hostStyles, haCardReset, rowCardStyles, unavailableStyles, styles];
}

customElements.define("materia-lock", MateriaLock);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-lock",
  name: "Materia Lock",
  description: "A native Lit lock display card with conditional icons.",
});
