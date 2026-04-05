import { LitElement, html, css } from "lit";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-button
 *  Replaces the entire small_button_* template family.
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaButtonEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", selector: { entity: {} } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "icon", required: true, selector: { icon: {} } },
      {
        name: "variant",
        selector: {
          select: {
            options: [
              { value: "primary", label: "Primary" },
              { value: "secondary", label: "Secondary" },
              { value: "tertiary", label: "Tertiary" },
              { value: "error", label: "Error" },
              { value: "device", label: "Device" },
              { value: "primary-container", label: "Primary Container" },
              { value: "secondary-container", label: "Secondary Container" },
              { value: "error-container", label: "Error Container" },
              { value: "device-container", label: "Device Container" },
              { value: "battery", label: "Battery" },
            ],
          },
        },
      },
      { name: "show_state", selector: { boolean: {} } },
      { name: "active_state", selector: { text: {} } },
      { name: "state_display", selector: { text: {} } },
      { name: "color", selector: { text: {} } },
      { name: "color_on", selector: { text: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s) => s.name.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
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
customElements.define("materia-button-editor", MateriaButtonEditor);

const VARIANT_COLORS = {
  /* variant → [bg-active, text-active] */
  primary:               ["var(--md-sys-color-primary)",                "var(--md-sys-color-on-primary)"],
  secondary:             ["var(--md-sys-color-secondary)",              "var(--md-sys-color-on-secondary)"],
  tertiary:              ["var(--md-sys-color-tertiary)",               "var(--md-sys-color-on-tertiary)"],
  error:                 ["var(--md-sys-color-error)",                  "var(--md-sys-color-on-error)"],
  device:                ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
  "primary-container":   ["var(--md-sys-color-primary-container)",      "var(--md-sys-color-on-primary-container)"],
  "secondary-container": ["var(--md-sys-color-secondary-container)",    "var(--md-sys-color-secondary)"],
  "error-container":     ["var(--md-sys-color-error-container)",        "var(--md-sys-color-error)"],
  "device-container":    ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
};

class MateriaButton extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-button-editor");
  }

  static getStubConfig() {
    return { name: "", icon: "mdi:power-plug", variant: "primary", show_state: false, active_state: "on" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      height: 107px;
      width: 110px;
      border-radius: var(--ha-card-border-radius, 18px);
      overflow: hidden;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      font-family: inherit;
      transition: background-color 0.3s ease, color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    /* ---- base layout: icon + name ---- */
    ha-card.no-state {
      grid-template-areas: "i" "n";
      grid-template-rows: 1fr min-content;
    }

    /* ---- with-state layout: icon + name + state ---- */
    ha-card.with-state {
      grid-template-areas: "i" "n" "s";
      grid-template-rows: 1fr min-content min-content;
    }

    .icon-cell {
      grid-area: i;
      align-self: start;
      text-align: start;
      display: flex;
      justify-content: start;
      align-items: start;
      height: 24px;
      margin: 10px;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 24px;
      width: 24px;
      height: 24px;
      margin: 0 15px;
    }

    .name {
      grid-area: n;
      justify-self: start;
      padding-left: 10px;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
    }

    ha-card.no-state .name {
      margin: 10px 10px 22px 6px;
    }

    ha-card.with-state .name {
      margin: 10px 10px 0 6px;
    }

    .state {
      grid-area: s;
      justify-self: start;
      margin: 0 0 4px 16px;
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      line-height: 18px;
    }

    /* ---- inactive (default) styling ---- */
    ha-card.inactive {
      background-color: var(--ha-card-background);
      color: var(--primary-text-color);
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.icon) throw new Error("icon is required");
    if (!config.name) throw new Error("name is required");
    this.config = {
      show_state: false,
      active_state: "on",
      variant: "secondary",
      tap_action: { action: "toggle" },
      ...config,
    };
  }

  _isActive(stateObj) {
    if (!stateObj) return false;
    const s = stateObj.state;
    const target = this.config.active_state || "on";
    return s === String(target) || s === "open";
  }

  _getBatteryColors(stateObj) {
    const pct = parseFloat(stateObj?.state) || 0;
    if (pct < 10) {
      return ["var(--md-sys-color-error-container)", "var(--md-sys-color-on-error-container)"];
    }
    if (pct < 20) {
      return ["var(--md-sys-cust-color-warning-container)", "var(--md-sys-cust-color-on-warning-container)"];
    }
    return ["var(--ha-card-background)", "var(--primary-text-color)"];
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entity = this.config.entity;
    const stateObj = entity ? this.hass.states[entity] : undefined;
    const active = this._isActive(stateObj);
    const variant = this.config.variant || "secondary";
    const showState = this.config.show_state;

    /* Determine background & text color */
    let bgColor, textColor;

    if (variant === "battery") {
      const [bg, fg] = this._getBatteryColors(stateObj);
      bgColor = bg;
      textColor = fg;
    } else if (active && entity) {
      /* Use overrides first, then variant map */
      if (this.config.color_on) {
        bgColor = this.config.color_on;
        textColor = this.config.color ? this.config.color : "var(--primary-text-color)";
      } else {
        const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.secondary;
        bgColor = colors[0];
        textColor = colors[1];
      }
    } else {
      bgColor = "var(--ha-card-background)";
      textColor = "var(--primary-text-color)";
    }

    /* Static variants without state (always colored) */
    const staticVariants = ["primary", "tertiary", "error", "primary-container", "secondary-container", "error-container", "device-container"];
    if (!showState && !entity && staticVariants.includes(variant)) {
      const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.secondary;
      bgColor = colors[0];
      textColor = colors[1];
    }

    const cardClass = showState ? "with-state" : "no-state";
    const activeClass = active ? "active" : "inactive";

    /* State display */
    let stateDisplay = "";
    if (showState && stateObj) {
      if (this.config.state_display) {
        try {
          const fn = new Function("state", "hass", "entity", `return ${this.config.state_display}`);
          stateDisplay = fn(stateObj.state, this.hass, stateObj);
        } catch (_) {
          stateDisplay = stateObj.state;
        }
      } else {
        stateDisplay = stateObj.state;
      }
    }

    return html`
      <ha-card
        class="${cardClass} ${activeClass}"
        style="background-color: ${bgColor}; color: ${textColor};"
        @click=${this._handleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this.config.icon} style="color: ${textColor};"></ha-icon>
        </div>
        <div class="name">${this.config.name}</div>
        ${showState
          ? html`<div class="state">${stateDisplay}</div>`
          : ""}
      </ha-card>
    `;
  }

  _handleTap() {
    const actionConfig = this.config.tap_action || { action: "toggle" };
    this._handleAction(actionConfig);
  }

  _handleAction(actionConfig) {
    if (!actionConfig || actionConfig.action === "none") return;

    switch (actionConfig.action) {
      case "toggle":
        if (this.config.entity) {
          this.hass.callService("homeassistant", "toggle", {
            entity_id: this.config.entity,
          });
        }
        break;

      case "call-service": {
        const [domain, service] = (actionConfig.service || "").split(".", 2);
        if (domain && service) {
          this.hass.callService(domain, service, {
            ...actionConfig.service_data,
            ...actionConfig.data,
          }, actionConfig.target);
        }
        break;
      }

      case "navigate":
        history.pushState(null, "", actionConfig.navigation_path);
        this.dispatchEvent(
          new Event("location-changed", { bubbles: true, composed: true })
        );
        break;

      case "more-info":
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { entityId: actionConfig.entity || this.config.entity },
          })
        );
        break;

      default:
        break;
    }
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-button", MateriaButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-button",
  name: "Materia Button",
  description: "Material You small button with variants, state display, and battery mode.",
});
