import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { applyCardFormDefaults } from "../card/editor.js";

function isTemplate(val) {
  return val && typeof val === "string" && (val.includes("{{") || val.includes("{%"));
}

class MateriaRoomEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    _config: { state: true },
    _selectedCard: { state: true },
    _expandedButton: { state: true },
  };

  static styles = css`
    :host { display: block; }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0 8px;
      font-weight: 600;
      font-size: 14px;
    }

    .button-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }

    .button-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
      cursor: pointer;
    }

    .button-header span {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
    }

    .button-body {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
      overflow-x: auto;
    }

    .tabs {
      display: flex;
      gap: 4px;
      flex: 1;
      overflow-x: auto;
    }

    .tab {
      padding: 6px 14px;
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 999px;
      font-size: 13px;
      cursor: pointer;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      flex-shrink: 0;
    }

    .tab.selected {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color);
    }

    .card-actions {
      display: flex;
      gap: 4px;
      margin-top: 8px;
      justify-content: flex-end;
    }

    #editor {
      margin-top: 12px;
    }
  `;

  setConfig(config) {
    this._config = config;
    this._selectedCard = -1;
    this._expandedButton = null;
  }

  get _mainSchema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "subtitle", selector: { template: {} } },
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
      { name: "columns", selector: { number: { min: 1, max: 6, mode: "slider" } } },
      { name: "show_slider", selector: { boolean: {} } },
      { name: "show_sub_buttons", selector: { boolean: {} } },
      { name: "show_stop", label: "Show stop (covers)", selector: { boolean: {} } },
      { name: "color", selector: { template: {} } },
      { name: "color_on", selector: { template: {} } },
      { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
    ];
  }

  _subButtonSchema(btn) {
    const iconIsTemplate = isTemplate(btn?.icon);
    return [
      iconIsTemplate
        ? { name: "icon", required: true, selector: { template: {} } }
        : { name: "icon", required: true, selector: { icon: {} } },
      { name: "name", label: "Label (optional)", selector: { text: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const cards = this._config.cards || [];
    const numCards = cards.length;
    const selected = this._selectedCard;
    const showPicker = selected === numCards;
    const showEditor = selected >= 0 && selected < numCards;
    const subButtons = Array.isArray(this._config.sub_buttons) ? this._config.sub_buttons : [];
    const formData = { columns: 2, ...applyCardFormDefaults(this._config) };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${this._mainSchema}
        .computeLabel=${computeLabel}
        @value-changed=${this._mainChanged}
      ></ha-form>

      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addSubButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${subButtons.map((btn, i) => html`
        <div class="button-card">
          <div class="button-header" @click=${() => this._toggleSubButton(i)}>
            <span>${btn.name || (btn.icon && !isTemplate(btn.icon) ? btn.icon : `Button ${i + 1}`)}</span>
            <ha-icon-button @click=${(e) => { e.stopPropagation(); this._toggleSubButton(i); }}>
              <ha-icon icon=${this._expandedButton === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${(e) => { e.stopPropagation(); this._removeSubButton(i); }}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._expandedButton === i ? html`
            <div class="button-body">
              <ha-form
                .hass=${this.hass}
                .data=${btn}
                .schema=${this._subButtonSchema(btn)}
                .computeLabel=${computeLabel}
                @value-changed=${(e) => this._subButtonChanged(i, e.detail.value)}
              ></ha-form>
            </div>
          ` : ""}
        </div>
      `)}

      <div class="section-header">
        <span>Cards</span>
      </div>

      <div class="toolbar">
        <div class="tabs">
          ${cards.map((_c, i) => html`
            <div
              class="tab ${selected === i ? "selected" : ""}"
              @click=${() => (this._selectedCard = i)}
            >${i + 1}</div>
          `)}
        </div>
        <ha-icon-button
          class="${showPicker ? "selected" : ""}"
          @click=${() => (this._selectedCard = numCards)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      <div id="editor">
        ${showPicker
          ? html`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardPicked}
              ></hui-card-picker>
            `
          : showEditor
          ? html`
              <div class="card-actions">
                <ha-icon-button
                  ?disabled=${selected === 0}
                  @click=${() => this._moveCard(-1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  ?disabled=${selected === numCards - 1}
                  @click=${() => this._moveCard(1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${this._removeCard}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${cards[selected]}
                @config-changed=${this._handleChildChanged}
              ></hui-card-element-editor>
            `
          : ""}
      </div>
    `;
  }

  _mainChanged(ev) {
    const { sub_buttons, cards, ...rest } = this._config;
    const next = { ...rest, ...ev.detail.value };
    if (sub_buttons !== undefined) next.sub_buttons = sub_buttons;
    if (cards !== undefined) next.cards = cards;
    this._fireConfig(next);
  }

  _toggleSubButton(i) {
    this._expandedButton = this._expandedButton === i ? null : i;
  }

  _addSubButton() {
    const buttons = [...(this._config.sub_buttons || []), { icon: "mdi:star" }];
    this._fireConfig({ ...this._config, sub_buttons: buttons });
    this._expandedButton = buttons.length - 1;
  }

  _removeSubButton(i) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons.splice(i, 1);
    if (this._expandedButton === i) this._expandedButton = null;
    const next = { ...this._config };
    if (buttons.length === 0) delete next.sub_buttons;
    else next.sub_buttons = buttons;
    this._fireConfig(next);
  }

  _subButtonChanged(i, value) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons[i] = { ...buttons[i], ...value };
    this._fireConfig({ ...this._config, sub_buttons: buttons });
  }

  _handleCardPicked(ev) {
    ev.stopPropagation();
    const cards = [...(this._config.cards || []), ev.detail.config];
    this._selectedCard = cards.length - 1;
    this._fireConfig({ ...this._config, cards });
  }

  _handleChildChanged(ev) {
    ev.stopPropagation();
    if (ev.detail.error) return;
    const cards = [...(this._config.cards || [])];
    cards[this._selectedCard] = ev.detail.config;
    this._fireConfig({ ...this._config, cards });
  }

  _moveCard(delta) {
    const cards = [...(this._config.cards || [])];
    const from = this._selectedCard;
    const to = from + delta;
    if (to < 0 || to >= cards.length) return;
    const [card] = cards.splice(from, 1);
    cards.splice(to, 0, card);
    this._selectedCard = to;
    this._fireConfig({ ...this._config, cards });
  }

  _removeCard() {
    const cards = [...(this._config.cards || [])];
    cards.splice(this._selectedCard, 1);
    this._selectedCard = Math.max(0, Math.min(this._selectedCard, cards.length - 1));
    if (cards.length === 0) this._selectedCard = -1;
    this._fireConfig({ ...this._config, cards });
  }

  _fireConfig(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define("materia-room-editor", MateriaRoomEditor);
