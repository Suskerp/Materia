import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

class MateriaRoomEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    _config: { state: true },
    _selectedCard: { state: true },
  };

  static styles = css`
    :host { display: block; }

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
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
      { name: "columns", selector: { number: { min: 1, max: 6 } } },
      { name: "color_on", selector: { template: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const cards = this._config.cards || [];
    const numCards = cards.length;
    const selected = this._selectedCard;
    const showPicker = selected === numCards;
    const showEditor = selected >= 0 && selected < numCards;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

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

  _valueChanged(ev) {
    this._fireConfig({ ...this._config, ...ev.detail.value });
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
