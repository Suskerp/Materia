import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";

/* ───────────────────────────────────────────────────────
 *  materia-device
 *  Native Lit generic device/switch card (no bubble-card).
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaDeviceEditor extends LitElement {
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
      { name: "button_type", selector: { select: { options: ["switch", "state"] } } },
      { name: "active_state", selector: { text: {} } },
      { name: "color_active", selector: { text: {} } },
      { name: "color_on_active", selector: { text: {} } },
      { name: "show_state", selector: { boolean: {} } },
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
customElements.define("materia-device-editor", MateriaDeviceEditor);

class MateriaDevice extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-device-editor");
  }

  static getStubConfig() {
    return {
      entity: "",
      name: "",
      icon: "mdi:power-plug",
      button_type: "switch",
      active_state: "on",
      show_state: true,
    };
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
      icon: "mdi:power-plug",
      button_type: "switch",
      active_state: "on",
      color_active: "var(--md-sys-cust-color-device-container)",
      color_on_active: "var(--md-sys-cust-color-on-device)",
      show_state: true,
      ...config,
    };
  }

  _isActive(stateObj) {
    if (!stateObj) return false;
    const s = stateObj.state;
    const target = this.config.active_state || "on";
    return s === String(target) || s === "open";
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const active = this._isActive(stateObj);
    const name = this.config.name || stateObj.attributes.friendly_name || this.config.entity;

    const bgColor = active
      ? this.config.color_active
      : "var(--ha-card-background)";
    const textColor = active
      ? this.config.color_on_active
      : "var(--primary-text-color)";

    return html`
      <ha-card
        style="background-color: ${bgColor}; color: ${textColor};"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${this.config.icon} style="color: ${textColor};"></ha-icon>
        <div class="info">
          <div class="name">${name}</div>
          ${this.config.show_state
            ? html`<div class="state">${stateObj.state}</div>`
            : ""}
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    if (this.config.tap_action) {
      this._handleAction(this.config.tap_action);
    } else {
      this.hass.callService("homeassistant", "toggle", {
        entity_id: this.config.entity,
      });
    }
  }

  getGridOptions() {
    return { columns: 12, rows: 1.5 };
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-device", MateriaDevice);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-device",
  name: "Materia Device",
  description: "A native Lit generic device/switch card with active-state colors.",
});
