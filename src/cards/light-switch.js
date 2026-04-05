import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";

/* ───────────────────────────────────────────────────────
 *  materia-light-switch
 *  Native Lit light toggle card (no bubble-card).
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaLightSwitchEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "light" } } },
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
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }
}
customElements.define("materia-light-switch-editor", MateriaLightSwitchEditor);

class MateriaLightSwitch extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-light-switch-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "mdi:track-light" };
  }

  static styles = css`
    :host { display: block; }
    ha-card {
      border-radius: var(--ha-card-border-radius, 18px);
      padding: 12px 16px;
      cursor: pointer;
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
    this.config = {
      icon: "mdi:track-light",
      ...config,
    };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const isOn = stateObj.state === "on";
    const name = this.config.name || stateObj.attributes.friendly_name || this.config.entity;
    const stateText = isOn ? "On" : "Off";

    const bgColor = isOn
      ? "var(--md-sys-cust-color-light-container)"
      : "var(--ha-card-background)";
    const textColor = isOn
      ? "var(--md-sys-cust-color-on-light)"
      : "var(--primary-text-color)";

    return html`
      <ha-card
        style="background-color: ${bgColor}; color: ${textColor};"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${this.config.icon} style="color: ${textColor};"></ha-icon>
        <div class="info">
          <div class="name">${name}</div>
          <div class="state">${stateText}</div>
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    this.hass.callService("light", "toggle", {
      entity_id: this.config.entity,
    });
  }

  getGridOptions() {
    return { columns: 12, rows: 1.5 };
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-light-switch", MateriaLightSwitch);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-light-switch",
  name: "Materia Light Switch",
  description: "A native Lit light toggle switch card.",
});
