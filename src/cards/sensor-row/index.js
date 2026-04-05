import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaSensorRow extends ActionMixin(LitElement) {
  static get properties() {
    return {
      hass: { attribute: false },
      config: { state: true },
    };
  }

  static styles = [hostStyles, haCardReset, styles];

  static getConfigElement() {
    return document.createElement("materia-sensor-row-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", padding: "0px 20px" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!config.name) throw new Error("name is required");
    this.config = { padding: "0px 20px", ...config };
  }

  _handleTap() {
    if (!this.hass || !this.config.tap_action) return;
    this._handleAction(this.config.tap_action);
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const c = this.config;
    const stateObj = this.hass.states[c.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${c.entity}</ha-card>`;

    const stateStr = stateObj.state;
    const unit = stateObj.attributes.unit_of_measurement || "";
    const displayState = unit ? `${this._capitalize(stateStr)} ${unit}` : this._capitalize(stateStr);
    const hasTap = !!c.tap_action;

    return html`
      <ha-card
        class="${hasTap ? "clickable" : ""}"
        @click=${hasTap ? this._handleTap : undefined}
      >
        <div class="container" style="--row-padding: ${c.padding}">
          <span class="name">${c.name}</span>
          <span class="value">${displayState}</span>
          ${this._hasNavigateAction ? html`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          ` : ''}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-sensor-row", MateriaSensorRow);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-sensor-row",
  name: "Materia Sensor Row",
  description: "A simple name/value row for displaying sensor data",
});
