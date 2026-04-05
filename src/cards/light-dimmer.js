import { LitElement, html, css } from "lit";
import { createCard } from "../styles/shared.js";

class MateriaLightDimmer extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this._config = {
      icon: "mdi:track-light",
      ...config,
    };
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
        button_type: "slider",
        entity: c.entity,
        name: c.name,
        icon: c.icon,
        modules: ["light_dimmer"],
        grid_options: { columns: 12, rows: 1.5 },
        show_state: true,
        show_attribute: true,
        attribute: "brightness",
        slider_live_update: true,
        allow_light_slider_to_0: true,
        tap_action: { action: "toggle" },
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
    return 2;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
}

customElements.define("materia-light-dimmer", MateriaLightDimmer);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-light-dimmer",
  name: "Materia Light Dimmer",
  description: "A dimmable light slider card (bubble-card wrapper)",
});
