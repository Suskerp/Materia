import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaSelect extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-select-editor");
  }

  static getStubConfig() {
    return { entity: "" };
  }

  static styles = styles;

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const name = this.config.name || stateObj.attributes.friendly_name || this.config.entity;
    const options = stateObj.attributes.options || [];
    const current = stateObj.state;

    return html`
      <ha-card>
        <div class="row">
          ${this.config.icon
            ? html`<ha-icon .icon=${this.config.icon}></ha-icon>`
            : ""}
          <div class="info">
            <div class="name">${name}</div>
            <div class="current-option">${current}</div>
          </div>
          <select @change=${this._onSelect}>
            ${options.map(
              (opt) => html`<option value=${opt} ?selected=${opt === current}>${opt}</option>`
            )}
          </select>
        </div>
      </ha-card>
    `;
  }

  _onSelect(ev) {
    const option = ev.target.value;
    const entityId = this.config.entity;
    const domain = entityId.split(".")[0];
    this.hass.callService(domain, "select_option", {
      entity_id: entityId,
      option,
    });
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-select", MateriaSelect);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-select",
  name: "Materia Select",
  description: "Dropdown select for input_select / select entities.",
});
