import { LitElement, html, css } from "lit";
import { createCard } from "../styles/shared.js";

class MateriaLockEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "lock" } } },
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
customElements.define("materia-lock-editor", MateriaLockEditor);

class MateriaLock extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("materia-lock-editor");
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
        button_type: "switch",
        entity: c.entity,
        name: c.name,
        icon: "m3o:lock",
        modules: ["device", "default", "conditional_icon"],
        conditional_icon: {
          icon_true: "m3o:lock",
          icon_false: "m3o:lock-open-right",
          conditions: [
            {
              condition: "state",
              entity_id: c.entity,
              state: "on",
            },
          ],
        },
        sub_button: { main: [], bottom: [] },
        tap_action: { action: "none" },
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

customElements.define("materia-lock", MateriaLock);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-lock",
  name: "Materia Lock",
  description: "A lock card with conditional icons (bubble-card wrapper)",
});
