import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaRoom extends ActionMixin(LitElement) {
  static properties = {
    config: { state: true },
    _expanded: { state: true },
    _childCards: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
  };

  static styles = [unavailableStyles, styles];

  constructor() {
    super();
    this._expanded = false;
    this._childCards = null;
    this._hass = null;
  }

  static getConfigElement() {
    return document.createElement("materia-room-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(e => e.startsWith("light.")) || "light.example";
    return {
      entity,
      name: "Room",
      icon: "mdi:home",
      entity_type: "light",
      columns: 2,
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    const oldCards = this.config?.cards;
    this.config = { columns: 2, ...config };

    const newCards = this.config.cards;
    if (JSON.stringify(oldCards) !== JSON.stringify(newCards)) {
      this._childCards = null;
      if (this.isConnected) this._createChildCards();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (this._childCards) {
      this._childCards.forEach((c) => (c.hass = hass));
    }
    this._resolveField("color_on", "_resolvedColorOn");
    this._resolveField("icon", "_resolvedIcon");
    this._resolveField("name", "_resolvedName");
    this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }

  firstUpdated() {
    this._createChildCards();
  }

  async _createChildCards() {
    const cards = this.config?.cards;
    if (!cards || cards.length === 0) {
      this._childCards = [];
      return;
    }
    const helpers = await loadCardHelpers();
    this._childCards = await Promise.all(
      cards.map(async (cardConfig) => {
        const el = await helpers.createCardElement(cardConfig);
        if (this._hass) el.hass = this._hass;
        return el;
      })
    );
    this.requestUpdate();
  }

  _toggleExpand() {
    this._expanded = !this._expanded;
  }

  _toggleEntity(e) {
    e.stopPropagation();
    if (!this._hass || !this.config.entity) return;
    const type = this.config.entity_type || "light";
    const domain = type === "cover" ? "cover" : "light";
    this._hass.callService(domain, "toggle", {
      entity_id: this.config.entity,
    });
  }

  get _isActive() {
    if (!this._hass || !this.config.entity) return false;
    const stateObj = this._hass.states[this.config.entity];
    if (!stateObj) return false;
    const type = this.config.entity_type || "light";
    return type === "cover" ? stateObj.state === "open" : stateObj.state === "on";
  }

  get _stateDisplay() {
    if (!this._hass || !this.config.entity) return "";
    const stateObj = this._hass.states[this.config.entity];
    if (!stateObj) return "unavailable";

    if (this.config.attribute) {
      const attr = stateObj.attributes[this.config.attribute];
      if (attr == null) return stateObj.state;
      if (this.config.attribute === "brightness") {
        return `${Math.round((attr / 255) * 100)}%`;
      }
      return String(attr);
    }

    return this._hass.formatEntityState
      ? this._hass.formatEntityState(stateObj)
      : stateObj.state;
  }

  render() {
    if (!this.config) return html``;

    const stateObj = this._hass?.states?.[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const active = this._isActive;
    const colorOn = this._resolvedColorOn || this.config.color_on
      || (active ? "var(--md-sys-color-primary)" : "var(--primary-text-color)");
    const iconColor = active ? colorOn : "var(--primary-text-color)";

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? 'unavailable' : ''}"
          @click=${this._toggleExpand}
        >
          <div
            class="icon-container"
            @click=${this._toggleEntity}
          >
            <ha-icon
              .icon=${this._isTemplate(this.config.icon) ? this._resolvedIcon : (this.config.icon || "mdi:home")}
              style="color: ${iconColor};"
            ></ha-icon>
          </div>
          <div class="name-container">
            <span class="name">${this._isTemplate(this.config.name) ? this._resolvedName : (this.config.name || "")}</span>
            <span class="state">${this._stateDisplay}</span>
          </div>
          <div class="right">
            ${this._renderSubButtons()}
            <ha-icon
              class="chevron ${this._expanded ? 'rotated' : ''}"
              icon="mdi:chevron-down"
            ></ha-icon>
          </div>
        </div>
        <div class="collapsible ${this._expanded ? 'expanded' : ''}">
          <div class="collapsible-inner">
            <div class="grid" style="--room-columns: ${this.config.columns || 2}">
              ${this._childCards?.map(c => html`<div class="grid-item">${c}</div>`)}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderSubButtons() {
    const subButtons = this.config.sub_button;
    if (!subButtons || !Array.isArray(subButtons) || subButtons.length === 0)
      return html``;

    return subButtons.map(
      (btn) => html`
        <ha-icon
          class="sub-btn"
          .icon=${btn.icon || "mdi:dots-vertical"}
          @click=${(e) => {
            e.stopPropagation();
            if (btn.entity) {
              this.dispatchEvent(
                new CustomEvent("hass-more-info", {
                  bubbles: true,
                  composed: true,
                  detail: { entityId: btn.entity },
                })
              );
            }
          }}
        ></ha-icon>
      `
    );
  }

  getCardSize() {
    return this._expanded ? 3 + (this._childCards?.length || 0) : 2;
  }
}

customElements.define("materia-room", MateriaRoom);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-room",
  name: "Materia Room",
  description: "Expandable room section with child card grid.",
  preview: true,
});
