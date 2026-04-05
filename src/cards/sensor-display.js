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
      border: none;
      overflow: visible;
    }
    .container {
      position: relative;
      width: 100%;
      min-height: 50px;
      background: transparent;
      border-radius: 28px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      min-height: 42px;
      margin: 6px;
      margin-left: 8px;
      border-radius: 50%;
      background-color: var(--ha-card-background, var(--card-background-color));
      flex-shrink: 0;
    }
    .icon-container ha-icon {
      --mdc-icon-size: 24px;
      display: flex;
    }
    .name-container {
      display: flex;
      line-height: 18px;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      margin: 0 16px 0 4px;
      overflow: hidden;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
    .state {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
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

    const primary = unit ? `${stateVal} · ${classification.label || name}` : `${stateVal}`;
    const secondary = unit ? unit : (classification.label || name);

    return html`
      <ha-card @click=${this._handleTap}>
        <div class="container">
          ${icon ? html`
            <div class="icon-container">
              <ha-icon .icon=${icon}></ha-icon>
            </div>
          ` : ""}
          <div class="name-container">
            <div class="name">${primary}</div>
            <div class="state">${secondary}</div>
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
