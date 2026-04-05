import { LitElement, html, css } from "lit";
import { createCard } from "../styles/shared.js";

class MateriaDevice extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this._config = {
      icon: "mdi:power-plug",
      button_type: "switch",
      active_state: "on",
      color_active: "var(--md-sys-cust-color-device)",
      color_on_active: "var(--md-sys-cust-color-on-device)",
      show_state: true,
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
    const activeState = c.active_state;
    const colorActive = c.color_active;
    const colorOnActive = c.color_on_active;

    const cardConfig = {
      type: "custom:bubble-card",
      card_type: "button",
      button_type: c.button_type,
      entity: c.entity,
      name: c.name,
      icon: c.icon,
      grid_options: { columns: 12, rows: 1.5 },
      show_state: c.show_state,
      modules: ["default"],
      sub_button: { main: [], bottom: [] },
      styles: `:host {
  --bubble-main-background-color: \${ state === '${activeState}' ? '${colorActive}' : '' } ;
  --primary-text-color: \${ state === '${activeState}' ? '${colorOnActive}' : '' } ;
  --bubble-icon-color: \${ state === '${activeState}' ? '${colorOnActive}' : '' } ;
}`,
    };

    if (c.tap_action) {
      cardConfig.tap_action = c.tap_action;
    }

    this._card = await createCard(cardConfig, this._hass);
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

customElements.define("materia-device", MateriaDevice);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-device",
  name: "Materia Device",
  description:
    "A generic device/switch card with active-state colors (bubble-card wrapper)",
});
