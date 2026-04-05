import { LitElement, html, css } from "lit";
import { createCard } from "../styles/shared.js";

class MateriaRoom extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this._config = {
      columns: 2,
      ...config,
    };
    this._card = null;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._card) this._card.hass = hass;
  }

  _buildTitleCard() {
    const c = this._config;
    return {
      type: "custom:bubble-card",
      card_type: "button",
      button_type: "slider",
      entity: c.entity,
      name: c.name,
      icon: c.icon,
      sub_button: { main: c.sub_button || [] },
      grid_options: { columns: 12, rows: 1.5 },
      button_action: { tap_action: { action: "toggle" } },
      card_layout: "large",
      show_attribute: true,
      show_state: true,
      slider_live_update: true,
      allow_light_slider_to_0: true,
      attribute: c.attribute,
      styles: `.bubble-range-value {
  right: 40px !important;
}
.bubble-buttons-container {
  margin-right: 4em;
}
.bubble-sub-button:last-child {
  margin-right: 4em !important;
}`,
      modules: ["default", "light_toggle", "light_dimmer"],
    };
  }

  _buildGridCard() {
    const c = this._config;
    return {
      type: "custom:layout-card",
      layout_type: "custom:grid-layout",
      layout: {
        "grid-template-columns": `repeat(${c.columns}, 1fr)`,
        "grid-row-gap": "var(--ha-section-grid-row-gap, 0px)",
        "grid-column-gap": "var(--ha-section-grid-column-gap, 8px)",
        margin: "5px 0",
        padding: "0",
      },
      cards: c.cards || [],
    };
  }

  _buildCardModStyle() {
    const c = this._config;
    const entityType = c.entity_type || "light";
    const colorOn = c.color_on || "";

    // Replicate the Jinja2 conditional from the template:
    // color when entity is on (light) or open (cover)
    const stateCheck =
      entityType === "light"
        ? `states('${c.entity}') == 'on'`
        : `states('${c.entity}') == 'open'`;

    return `
.ico, .icoclose {
  color: {% if ${stateCheck} %}
      ${colorOn}
  {% else %}
    var(--primary-text-color)
  {% endif %} !important;
}
ha-card {
  box-shadow: none !important;
}`;
  }

  async _createCard() {
    if (this._card) return;

    const expanderConfig = {
      type: "custom:expander-card",
      "child-margin-top": "0.6em",
      padding: 0,
      clear: false,
      animation: false,
      "clear-children": false,
      "expander-card-background": "transparent",
      "expander-card-background-expanded": "transparent",
      "title-card-button-overlay": true,
      "title-card-clickable": false,
      "overlay-margin": "21px 4px",
      card_mod: {
        style: this._buildCardModStyle(),
      },
      "title-card": this._buildTitleCard(),
      cards: [this._buildGridCard()],
    };

    this._card = await createCard(expanderConfig, this._hass);
    this.requestUpdate();
  }

  firstUpdated() {
    this._createCard();
  }

  render() {
    return html`<div id="card">${this._card}</div>`;
  }

  getCardSize() {
    return 3;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
}

customElements.define("materia-room", MateriaRoom);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-room",
  name: "Materia Room",
  description:
    "An expandable room section with title and grid of child cards (expander-card wrapper)",
});
