import { LitElement, html, css } from "lit";
import { createCard } from "../styles/shared.js";

class MateriaBatteryLow extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
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
