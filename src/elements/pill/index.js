import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaPill extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-pill-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "mdi:information-outline" };
  }

  static styles = [unavailableStyles, styles];

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = {
      icon: "mdi:information-outline",
      ...config,
    };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);

    const name =
      this.config.name ||
      stateObj?.attributes?.friendly_name ||
      this.config.entity;
    const icon = this.config.icon;
    const unit = stateObj?.attributes?.unit_of_measurement || "";
    const stateText = unavailable
      ? 'Unavailable'
      : (unit
        ? `${this._capitalize(stateObj.state)} ${unit}`
        : this._capitalize(stateObj.state));

    const s = stateObj?.state?.toLowerCase() ?? "";
    const isActive = s === "on" || s === "true" || s === "home" || s === "open"
      || s === "cleaning" || s === "playing"
      || (!isNaN(Number(s)) && Number(s) > 0);

    const containerBg = isActive && this.config.color
      ? this.config.color
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = isActive && this.config.color_on
      ? this.config.color_on
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
            <div class="state">${stateText}</div>
          </div>
          ${this._hasNavigateAction
            ? html`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`
            : ""}
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    this._handleAction(this.config.tap_action || { action: "more-info" });
  }

  getGridOptions() {
    return { columns: 6, rows: "auto" };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-pill", MateriaPill);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-pill",
  name: "Materia Pill",
  description: "Compact info pill card with configurable icon, name, state, and colors.",
});
