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

const DOMAIN_ACTIVE_STATES = {
  light: "on", switch: "on", fan: "on", vacuum: "cleaning",
  lock: "locked", cover: "open", binary_sensor: "on",
  climate: "heat", media_player: "playing", input_boolean: "on",
};

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
      cursor: pointer;
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
    this.config = {
      icon: "mdi:power-plug",
      button_type: "switch",
      color_active: "var(--md-sys-cust-color-device)",
      color_on_active: "var(--md-sys-cust-color-on-device)",
      show_state: true,
      ...config,
    };
  }

  _getActiveState() {
    if (this.config.active_state) return String(this.config.active_state);
    const entity = this.config.entity || "";
    const domain = entity.split(".")[0];
    return DOMAIN_ACTIVE_STATES[domain] || "on";
  }

  _isActive(stateObj) {
    if (!stateObj) return false;
    const target = this._getActiveState();
    return stateObj.state === target;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const active = this._isActive(stateObj);
    const name = this.config.name || stateObj.attributes.friendly_name || this.config.entity;
    const icon = this.config.icon;
    const colorActive = this.config.color_active;
    const colorOnActive = this.config.color_on_active;

    const containerBg = active
      ? colorActive
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = active
      ? colorOnActive
      : "var(--primary-text-color)";

    return html`
      <ha-card>
        <div
          class="container"
          style="background-color: ${containerBg}; color: ${textColor};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${icon} style="color: ${textColor};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${name}</div>
            ${this.config.show_state
              ? html`<div class="state">${this._capitalize(stateObj.state)}</div>`
              : ""}
          </div>
          ${this._hasNavigateAction ? html`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          ` : ''}
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
