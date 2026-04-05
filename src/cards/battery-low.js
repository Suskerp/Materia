import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";

/* ───────────────────────────────────────────────────────
 *  materia-battery-low
 *  Native Lit battery alert card (no bubble-card).
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaBatteryLowEditor extends LitElement {
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
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }
}
customElements.define("materia-battery-low-editor", MateriaBatteryLowEditor);

class MateriaBatteryLow extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-battery-low-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "" };
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
      background-color: var(--ha-card-background, var(--card-background-color));
      border-radius: 28px;
      overflow: hidden;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition: background-color 0.3s ease;
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
      background-color: transparent;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    .icon-container ha-icon {
      --mdc-icon-size: 24px;
      display: flex;
    }
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    .name-container {
      display: flex;
      line-height: 18px;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      margin: 0 16px 0 4px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .state {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
    }
  `;

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
  }

  _getBatteryColors(pct) {
    if (pct < 10) {
      return [
        "var(--md-sys-color-error-container)",
        "var(--md-sys-color-on-error-container)",
      ];
    }
    if (pct < 20) {
      return [
        "var(--md-sys-cust-color-warning-container)",
        "var(--md-sys-cust-color-on-warning-container)",
      ];
    }
    return [
      "var(--ha-card-background, var(--card-background-color))",
      "var(--primary-text-color)",
    ];
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const pct = parseFloat(stateObj.state) || 0;
    const name = this.config.name || stateObj.attributes.friendly_name || this.config.entity;
    const unit = stateObj.attributes.unit_of_measurement || "%";
    const stateText = `${this._capitalize(stateObj.state)}${unit}`;

    const [containerBg, textColor] = this._getBatteryColors(pct);

    return html`
      <ha-card>
        <div
          class="container"
          style="background-color: ${containerBg}; color: ${textColor};"
        >
          <div class="icon-container">
            <ha-icon icon="m3o:battery-android-alert" style="color: ${textColor};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${name}</div>
            <div class="state">${stateText}</div>
          </div>
          ${this._hasNavigateAction ? html`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          ` : ''}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: 1.5 };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-battery-low", MateriaBatteryLow);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-battery-low",
  name: "Materia Battery Low",
  description: "A native Lit low battery alert card with color thresholds.",
});
