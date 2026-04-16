import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

class MateriaRoomEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _showPicker: { state: true },
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

    .card-item {
      display: flex;
      align-items: center;
      padding: 4px 4px 4px 12px;
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
    }

    .card-item span {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
    }

    hui-card-picker {
      display: block;
      margin-top: 8px;
    }
  `;

  setConfig(config) {
    this._config = config;
    this._showPicker = false;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
      {
        name: "entity_type",
        selector: { select: { options: ["light", "cover"] } },
      },
      { name: "columns", selector: { number: { min: 1, max: 6 } } },
      { name: "color_on", selector: { template: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const cards = this._config.cards || [];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-header">
        <span>Cards</span>
        <ha-icon-button @click=${this._togglePicker}>
          <ha-icon icon=${this._showPicker ? "mdi:close" : "mdi:plus"}></ha-icon>
        </ha-icon-button>
      </div>

      ${cards.map((card, i) => html`
        <div class="card-item">
          <span>${card.type || "unknown"}</span>
          <ha-icon-button @click=${() => this._removeCard(i)}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </ha-icon-button>
        </div>
      `)}

      ${this._showPicker ? html`
        <hui-card-picker
          .hass=${this.hass}
          @config-changed=${this._cardPicked}
        ></hui-card-picker>
      ` : ""}
    `;
  }

  _togglePicker() {
    this._showPicker = !this._showPicker;
  }

  _cardPicked(ev) {
    ev.stopPropagation();
    const cards = [...(this._config.cards || []), ev.detail.config];
    this._showPicker = false;
    this._fireConfig({ ...this._config, cards });
  }

  _removeCard(i) {
    const cards = [...(this._config.cards || [])];
    cards.splice(i, 1);
    this._fireConfig({ ...this._config, cards });
  }

  _valueChanged(ev) {
    this._fireConfig({ ...this._config, ...ev.detail.value });
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
