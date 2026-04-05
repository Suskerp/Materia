import { LitElement, html, css } from "lit";
import { loadCardHelpers } from "../styles/shared.js";
import { computeLabel } from "../utils/editor-helpers.js";

/* ─── Editor ──────────────────────────────────────────────────────── */

class MateriaRoomEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        name: "entity_type",
        selector: { select: { options: ["light", "cover"] } },
      },
      { name: "columns", selector: { number: { min: 1, max: 6 } } },
      { name: "color_on", selector: { text: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    const config = ev.detail.value;
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("materia-room-editor", MateriaRoomEditor);

/* ─── Card ────────────────────────────────────────────────────────── */

class MateriaRoom extends LitElement {
  static properties = {
    _config: { state: true },
    _expanded: { state: true },
    _childCards: { state: true },
  };

  constructor() {
    super();
    this._expanded = false;
    this._childCards = null;
    this._hass = null;
  }

  static getConfigElement() {
    return document.createElement("materia-room-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      name: "",
      icon: "",
      entity_type: "light",
      columns: 2,
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    const oldCards = this._config?.cards;
    this._config = { columns: 2, ...config };

    // Recreate child cards if the cards array changed
    const newCards = this._config.cards;
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
    this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }

  firstUpdated() {
    this._createChildCards();
  }

  async _createChildCards() {
    const cards = this._config?.cards;
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
    if (!this._hass || !this._config.entity) return;
    const type = this._config.entity_type || "light";
    const domain = type === "cover" ? "cover" : "light";
    this._hass.callService(domain, "toggle", {
      entity_id: this._config.entity,
    });
  }

  get _isActive() {
    if (!this._hass || !this._config.entity) return false;
    const stateObj = this._hass.states[this._config.entity];
    if (!stateObj) return false;
    const type = this._config.entity_type || "light";
    return type === "cover" ? stateObj.state === "open" : stateObj.state === "on";
  }

  get _stateDisplay() {
    if (!this._hass || !this._config.entity) return "";
    const stateObj = this._hass.states[this._config.entity];
    if (!stateObj) return "unavailable";

    if (this._config.attribute) {
      const attr = stateObj.attributes[this._config.attribute];
      if (attr == null) return stateObj.state;
      // Format brightness as percentage
      if (this._config.attribute === "brightness") {
        return `${Math.round((attr / 255) * 100)}%`;
      }
      return String(attr);
    }

    return this._hass.formatEntityState
      ? this._hass.formatEntityState(stateObj)
      : stateObj.state;
  }

  render() {
    if (!this._config) return html``;

    const active = this._isActive;
    const iconColor = active && this._config.color_on
      ? this._config.color_on
      : active
        ? "var(--md-sys-color-primary)"
        : "var(--primary-text-color)";
    const columns = this._config.columns || 2;

    return html`
      <ha-card>
        <div class="title-row" @click=${this._toggleExpand}>
          <div class="title-left">
            <ha-icon
              class="entity-icon"
              .icon=${this._config.icon || "mdi:home"}
              style="color: ${iconColor}"
              @click=${this._toggleEntity}
            ></ha-icon>
            <div class="info">
              <div class="name">${this._config.name || ""}</div>
              <div class="state">${this._stateDisplay}</div>
            </div>
          </div>
          <div class="title-right">
            ${this._renderSubButtons()}
            <ha-icon
              class="chevron ${this._expanded ? "rotated" : ""}"
              .icon=${"mdi:chevron-down"}
            ></ha-icon>
          </div>
        </div>
        <div class="collapsible ${this._expanded ? "expanded" : ""}">
          <div class="collapsible-inner">
            <div class="grid" style="--room-columns: ${columns}">
              ${this._childCards?.map(
                (c) => html`<div class="grid-item">${c}</div>`
              )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderSubButtons() {
    const subButtons = this._config.sub_button;
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

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 18px;
      overflow: hidden;
      padding: 0;
      box-shadow: none;
    }

    /* ── Title row ────────────────────────────────────────────── */

    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .title-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1;
    }

    .entity-icon {
      --mdc-icon-size: 24px;
      flex-shrink: 0;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 1.3;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state {
      font-size: 12px;
      line-height: 1.3;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .sub-btn {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .sub-btn:hover {
      color: var(--primary-text-color);
    }

    /* ── Chevron ──────────────────────────────────────────────── */

    .chevron {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
      transition: transform 0.3s ease;
    }

    .chevron.rotated {
      transform: rotate(180deg);
    }

    /* ── Collapsible container (CSS-only animation) ───────────── */

    .collapsible {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease;
      overflow: hidden;
    }

    .collapsible.expanded {
      grid-template-rows: 1fr;
    }

    .collapsible-inner {
      overflow: hidden;
    }

    /* ── Child card grid ──────────────────────────────────────── */

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--room-columns, 2), 1fr);
      gap: 8px;
      padding: 4px 16px 16px;
    }

    .grid-item {
      min-width: 0;
    }
  `;
}

customElements.define("materia-room", MateriaRoom);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-room",
  name: "Materia Room",
  description:
    "A native expandable room section with title and grid of child cards",
});
