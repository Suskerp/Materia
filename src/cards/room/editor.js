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

    .card-picker {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }

    .pick-item {
      padding: 10px 16px;
      cursor: pointer;
      font-size: 13px;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.06));
      position: relative;
    }

    .pick-item:last-child {
      border-bottom: none;
    }

    .pick-item:hover {
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
    }

    .pick-name {
      font-weight: 500;
    }

    .pick-desc {
      font-size: 12px;
      opacity: 0.6;
      margin-top: 2px;
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
        <div class="card-picker">
          ${(window.customCards || []).map(card => html`
            <div class="pick-item" @click=${() => this._pickCard(card.type)}>
              <div class="pick-name">${card.name}</div>
              ${card.description ? html`<div class="pick-desc">${card.description}</div>` : ""}
            </div>
          `)}
        </div>
      ` : ""}
    `;
  }

  _togglePicker() {
    this._showPicker = !this._showPicker;
  }

  async _pickCard(type) {
    const ctor = customElements.get(type);
    let stub = {};
    if (ctor?.getStubConfig) {
      stub = (await ctor.getStubConfig(this.hass)) || {};
    }
    const cards = [...(this._config.cards || []), { type: `custom:${type}`, ...stub }];
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
