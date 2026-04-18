import { html, nothing } from "lit";
import { MateriaCard } from "../card/index.js";
import { loadCardHelpers } from "../../styles/shared.js";
import {
  hostStyles,
  haCardReset,
  rowCardStyles,
  fillBarStyles,
  unavailableStyles,
} from "../../styles/card-styles.js";
import { styles as cardStyles } from "../card/styles.js";
import { styles as roomStyles } from "./styles.js";
import "./editor.js";

class MateriaRoom extends MateriaCard {
  static properties = {
    ...MateriaCard.properties,
    _expanded: { state: true },
    _childCards: { state: true },
  };

  static styles = [
    hostStyles,
    haCardReset,
    rowCardStyles,
    fillBarStyles,
    unavailableStyles,
    cardStyles,
    roomStyles,
  ];

  static getConfigElement() {
    return document.createElement("materia-room-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(e => e.startsWith("light.")) || "light.example";
    return { entity, columns: 2, cards: [] };
  }

  constructor() {
    super();
    this._expanded = false;
    this._childCards = null;
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

  firstUpdated() {
    this._createChildCards();
  }

  updated(changedProps) {
    super.updated?.(changedProps);
    if (changedProps.has("hass") && this.hass && this._childCards) {
      this._childCards.forEach(c => (c.hass = this.hass));
    }
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
        if (this.hass) el.hass = this.hass;
        return el;
      })
    );
    this.requestUpdate();
  }

  _toggleExpand(ev) {
    ev?.stopPropagation?.();
    this._expanded = !this._expanded;
    this._fireHaptic("selection");
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const stateObj = this._stateObj;
    const unavailable = this._isUnavailable(stateObj);
    const isActive = !unavailable && this._isActive;
    const showSlider = !unavailable && this._showSlider;
    const subButtons = unavailable ? [] : this._subButtons;

    const containerBg = this._getContainerBg();
    const textColor = this._getTextColor();
    const fillPct = showSlider && isActive ? this._fillPercent : 0;
    const sliderColor = this._domainConfig.sliderColor || this._domainConfig.colorActive;

    const icon = this._icon;
    const stateDisplay = unavailable ? "Unavailable" : this._stateDisplay;
    const subtitle = this._subtitle;
    const columns = this.config.columns || 2;

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? "unavailable" : ""} ${showSlider ? "slider-active" : ""}"
          style="background-color: ${containerBg}; color: ${textColor};"
          @pointerdown=${showSlider ? this._onPointerDown : undefined}
          @click=${showSlider ? undefined : () => this._handleTap()}
        >
          ${showSlider
            ? html`<div class="fill" style="width: ${fillPct}%; background-color: ${sliderColor}; opacity: 1;"></div>`
            : nothing}

          <div class="icon-container">
            ${icon
              ? html`<ha-icon .icon=${icon} style="color: ${textColor};"></ha-icon>`
              : html`<ha-state-icon .hass=${this.hass} .stateObj=${stateObj} style="color: ${textColor};"></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${subtitle ? html`<div class="subtitle">${subtitle}</div>` : nothing}
            ${stateDisplay ? html`<div class="state">${stateDisplay}</div>` : nothing}
          </div>

          <div class="sub-buttons">
            ${subButtons.map(
              (btn) => html`
                <button
                  class="sub-btn"
                  title=${btn.name || ""}
                  @click=${(ev) => this._handleSubButton(btn, ev)}
                >
                  <ha-icon .icon=${btn.icon}></ha-icon>
                </button>
              `
            )}
            <button class="sub-btn room-expand" @click=${this._toggleExpand}>
              <ha-icon icon=${this._expanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>

      <div class="collapsible ${this._expanded ? "expanded" : ""}">
        <div class="collapsible-inner">
          <div class="grid" style="--room-columns: ${columns}">
            ${this._childCards?.map(c => html`<div class="grid-item">${c}</div>`)}
          </div>
        </div>
      </div>
    `;
  }

  getCardSize() {
    return this._expanded ? 3 + (this._childCards?.length || 0) : 2;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
}

customElements.define("materia-room", MateriaRoom);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-room",
  name: "Materia Room",
  description: "Materia card with expandable child-card grid.",
  preview: true,
});
