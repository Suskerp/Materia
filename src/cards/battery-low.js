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
    :host { display: block; }
    ha-card {
      border-radius: var(--ha-card-border-radius, 18px);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 48px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    ha-icon { --mdc-icon-size: 24px; flex-shrink: 0; }
    .info { flex: 1; min-width: 0; }
    .name { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .state { font-size: 12px; opacity: 0.7; margin-top: 2px; }
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
      "var(--ha-card-background)",
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
    const stateText = `${stateObj.state}${unit}`;

    const [bgColor, textColor] = this._getBatteryColors(pct);

    return html`
      <ha-card style="background-color: ${bgColor}; color: ${textColor};">
        <ha-icon icon="m3o:battery-android-alert" style="color: ${textColor};"></ha-icon>
        <div class="info">
          <div class="name">${name}</div>
          <div class="state">${stateText}</div>
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
