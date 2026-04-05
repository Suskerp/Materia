import { LitElement, html, css } from "lit";
import { createCard } from "../styles/shared.js";

class MateriaCoverEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "cover" } } },
      { name: "name", selector: { text: {} } },
      { name: "show_stop", selector: { boolean: {} } },
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
customElements.define("materia-cover-editor", MateriaCoverEditor);

class MateriaCover extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("materia-cover-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", show_stop: true };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this._config = {
      show_stop: true,
      ...config,
    };
    this._card = null;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._card) this._card.hass = hass;
  }

  _buildSubButtons() {
    const entity = this._config.entity;
    const buttons = [
      {
        name: "Up",
        icon: "mdi:arrow-up",
        tap_action: {
          action: "call-service",
          service: "cover.open_cover",
          target: { entity_id: entity },
        },
      },
    ];

    if (this._config.show_stop) {
      buttons.push({
        name: "Stop",
        icon: "mdi:stop",
        tap_action: {
          action: "call-service",
          service: "cover.stop_cover",
          target: { entity_id: entity },
        },
      });
    }

    buttons.push({
      name: "Down",
      icon: "mdi:arrow-down",
      tap_action: {
        action: "call-service",
        service: "cover.close_cover",
        target: { entity_id: entity },
      },
    });

    return buttons;
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
        modules: ["Shutter", "default"],
        grid_options: { columns: 12, rows: 1.5 },
        show_state: true,
        show_attribute: true,
        attribute: "current_position",
        sub_button: { main: this._buildSubButtons(), bottom: [] },
        tap_action: { action: "none" },
        double_tap_action: { action: "none" },
        hold_action: { action: "none" },
        button_action: { tap_action: { action: "none" } },
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

customElements.define("materia-cover", MateriaCover);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-cover",
  name: "Materia Cover",
  description: "A cover card with up/stop/down controls (bubble-card wrapper)",
});
