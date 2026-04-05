import { LitElement, html, css } from "lit";
import { createCard } from "../styles/shared.js";

class MateriaBatteryLowEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "sensor" } } },
      { name: "name", selector: { text: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s) => s.name.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase())}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    const config = ev.detail.value;
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }
}
customElements.define("materia-battery-low-editor", MateriaBatteryLowEditor);

class MateriaBatteryLow extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("materia-battery-low-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this._config = { ...config };
    this._card = null;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._card) this._card.hass = hass;
  }

  async _createCard() {
    if (this._card) return;
    const c = this._config;
    this._card = await createCard(
      {
        type: "custom:bubble-card",
        card_type: "button",
        button_type: "state",
        entity: c.entity,
        name: c.name,
        icon: "m3o:battery-android-alert",
        modules: ["battery"],
        grid_options: { columns: 6, rows: "auto" },
        sub_button: { main: [], bottom: [] },
      },
      this._hass
    );
    this.requestUpdate();
  }

  firstUpdated() {
    this._createCard();
  }

  render() {
    return html`<div id="card">${this._card}</div>`;
  }

  getCardSize() {
    return 1;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
}

customElements.define("materia-battery-low", MateriaBatteryLow);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-battery-low",
  name: "Materia Battery Low",
  description: "A low battery alert card (bubble-card wrapper)",
});
