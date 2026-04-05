import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset, pillContainerStyles, unavailableStyles } from "../../styles/card-styles.js";
import "./editor.js";

class MateriaSensorDisplay extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = [hostStyles, haCardReset, pillContainerStyles, unavailableStyles];

  static getConfigElement() {
    return document.createElement("materia-sensor-display-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
  }

  _classify(value) {
    const ranges = this.config.ranges || [];
    const num = parseFloat(value);
    for (const range of ranges) {
      if (range.max == null || num <= range.max) {
        return { label: range.label, color: range.color };
      }
    }
    return { label: "", color: "" };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);

    const stateVal = stateObj?.state ?? "";
    const name = this.config.name || stateObj?.attributes?.friendly_name || this.config.entity;
    const icon = this.config.icon || stateObj?.attributes?.icon || "";
    const unit = this.config.unit || stateObj?.attributes?.unit_of_measurement || "";

    const classification = this._classify(stateVal);

    const primary = unavailable ? 'Unavailable' : (unit ? `${stateVal} \u00B7 ${classification.label || name}` : `${stateVal}`);
    const secondary = unavailable ? name : (unit ? unit : (classification.label || name));

    return html`
      <ha-card @click=${this._handleTap}>
        <div class="container ${unavailable ? 'unavailable' : ''}">
          ${icon ? html`
            <div class="icon-container">
              <ha-icon .icon=${icon}></ha-icon>
            </div>
          ` : ""}
          <div class="name-container">
            <div class="name">${primary}</div>
            <div class="state">${secondary}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    if (this.config.tap_action) {
      this._handleAction(this.config.tap_action);
    } else {
      this._fireMoreInfo(this.config.entity);
    }
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-sensor-display", MateriaSensorDisplay);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-sensor-display",
  name: "Materia Sensor Display",
  description: "Sensor display with range-to-label classification (AQI, etc.).",
});
