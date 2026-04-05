import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────
 *  materia-sensor-display-editor
 * ─────────────────────────────────────────────── */

class MateriaSensorDisplayEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "sensor" } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "unit", selector: { text: {} } },
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
customElements.define("materia-sensor-display-editor", MateriaSensorDisplayEditor);

/* ───────────────────────────────────────────────
 *  materia-sensor-display
 *  Sensor display with range-to-label classification.
 * ─────────────────────────────────────────────── */

class MateriaSensorDisplay extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-sensor-display-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      padding: 8px 0;
      font-family: inherit;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 16px;
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
    .value {
      font-size: 20px;
      font-weight: 500;
    }
    .unit {
      font-size: 14px;
      font-weight: 400;
      opacity: 0.7;
      margin-left: 4px;
    }
    .classification {
      font-size: 13px;
      font-weight: 500;
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

  _classify(value) {
    const ranges = this.config.ranges || [];
    const num = parseFloat(value);
    for (const range of ranges) {
      if (range.max == null || num <= range.max) {
        return { label: range.label, color: range.color };
      }
    }
    return { label: "", color: "" };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const stateVal = stateObj.state;
    const name = this.config.name || stateObj.attributes.friendly_name || this.config.entity;
    const icon = this.config.icon || stateObj.attributes.icon || "";
    const unit = this.config.unit || stateObj.attributes.unit_of_measurement || "";

    const classification = this._classify(stateVal);

    return html`
      <ha-card @click=${this._handleTap}>
        <div class="row">
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : ""}
          <div class="info">
            <div class="value">
              ${stateVal}${unit ? html`<span class="unit">${unit}</span>` : ""}
            </div>
            ${classification.label
              ? html`<div class="classification" style="color: ${classification.color || "inherit"}">${classification.label}</div>`
              : html`<div class="classification">${name}</div>`}
          </div>
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    if (this.config.tap_action) {
      this._handleAction(this.config.tap_action);
    } else {
      this._fireMoreInfo(this.config.entity);
    }
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-sensor-display", MateriaSensorDisplay);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-sensor-display",
  name: "Materia Sensor Display",
  description: "Sensor display with range-to-label classification (AQI, etc.).",
});
