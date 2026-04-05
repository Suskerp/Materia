import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────
 *  materia-select-editor
 * ─────────────────────────────────────────────── */

class MateriaSelectEditor extends LitElement {
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
customElements.define("materia-select-editor", MateriaSelectEditor);

/* ───────────────────────────────────────────────
 *  materia-select
 *  Dropdown select for input_select / select entities.
 * ─────────────────────────────────────────────── */

class MateriaSelect extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-select-editor");
  }

  static getStubConfig() {
    return { entity: "" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      border-radius: var(--ha-card-border-radius, 18px);
      padding: 12px 16px;
      font-family: inherit;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    ha-icon {
      --mdc-icon-size: 24px;
      color: var(--md-sys-color-on-surface-variant);
      flex-shrink: 0;
    }
    .info {
      flex: 1;
      min-width: 0;
    }
    .name {
      font-size: 14px;
      font-weight: 500;
    }
    .current-option {
      font-size: 12px;
      opacity: 0.7;
    }
    select {
      background: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
      border: 1px solid var(--md-sys-color-outline);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 14px;
      font-family: inherit;
      cursor: pointer;
      max-width: 50%;
    }
    select:focus {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: -1px;
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const name = this.config.name || stateObj.attributes.friendly_name || this.config.entity;
    const options = stateObj.attributes.options || [];
    const current = stateObj.state;

    return html`
      <ha-card>
        <div class="row">
          ${this.config.icon
            ? html`<ha-icon .icon=${this.config.icon}></ha-icon>`
            : ""}
          <div class="info">
            <div class="name">${name}</div>
            <div class="current-option">${current}</div>
          </div>
          <select @change=${this._onSelect}>
            ${options.map(
              (opt) => html`<option value=${opt} ?selected=${opt === current}>${opt}</option>`
            )}
          </select>
        </div>
      </ha-card>
    `;
  }

  _onSelect(ev) {
    const option = ev.target.value;
    const entityId = this.config.entity;
    const domain = entityId.split(".")[0];
    this.hass.callService(domain, "select_option", {
      entity_id: entityId,
      option,
    });
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-select", MateriaSelect);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-select",
  name: "Materia Select",
  description: "Dropdown select for input_select / select entities.",
});
