import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles, VARIANT_COLORS } from "./styles.js";
import "./editor.js";

class MateriaBadge extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedStateDisplay: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-badge-editor");
  }

  static getStubConfig(hass) {
    const entities = hass ? Object.keys(hass.states) : [];
    const entity = entities.find((e) => e.startsWith("light.") || e.startsWith("switch.")) || "";
    return { name: "", icon: "mdi:power-plug", variant: "primary", show_state: false, active_state: "on", entity };
  }

  static styles = [unavailableStyles, styles];

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

  updated(changedProps) {
    super.updated?.(changedProps);
    if (!changedProps.has("hass") || !this.hass) return;
    this._resolveField("state_display", "_resolvedStateDisplay");
    this._resolveField("color", "_resolvedColor");
    this._resolveField("color_on", "_resolvedColorOn");
  }

  _resolveField(configKey, propKey) {
    const val = this.config?.[configKey];
    if (val && typeof val === "string" && (val.includes("{{") || val.includes("{%"))) {
      this._renderTemplate(val).then(result => {
        const trimmed = typeof result === "string" ? result.trim() : result;
        if (trimmed !== this[propKey]) this[propKey] = trimmed;
      });
    }
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
    const unavailable = entity ? this._isUnavailable(stateObj) : false;
    const active = !unavailable && this._isActive(stateObj);
    const variant = this.config.variant || "secondary";
    const showState = this.config.show_state;

    let bgColor = this._resolvedColor || this.config.color;
    let textColor = this._resolvedColorOn || this.config.color_on;

    if (!bgColor) {
      if (variant === "battery") {
        const [bg, fg] = this._getBatteryColors(stateObj);
        bgColor = bg;
        textColor = fg;
      } else if (active && entity) {
        const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.secondary;
        bgColor = colors[0];
        textColor = textColor || colors[1];
      } else {
        bgColor = "var(--ha-card-background)";
        textColor = textColor || "var(--primary-text-color)";
      }
    }

    const staticVariants = ["primary", "tertiary", "error", "primary-container", "secondary-container", "error-container", "device-container"];
    if (!entity && !this.config.color && staticVariants.includes(variant)) {
      const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.secondary;
      bgColor = colors[0];
      textColor = colors[1];
    }

    textColor = textColor || "var(--primary-text-color)";

    const cardClass = showState ? "with-state" : "no-state";
    const activeClass = active ? "active" : "inactive";

    let stateDisplay = "";
    if (showState && unavailable) {
      stateDisplay = "Unavailable";
    } else if (showState && stateObj) {
      const hasTpl = this.config.state_display && (this.config.state_display.includes("{{") || this.config.state_display.includes("{%"));
      if (this._resolvedStateDisplay && hasTpl) {
        stateDisplay = this._resolvedStateDisplay;
      } else if (this.config.state_display && !hasTpl) {
        stateDisplay = this.config.state_display;
      } else {
        stateDisplay = stateObj.state;
      }
      stateDisplay = this._capitalize(stateDisplay);
    }

    return html`
      <ha-card
        class="${cardClass} ${activeClass} ${unavailable ? 'unavailable' : ''}"
        style="background-color: ${bgColor}; color: ${textColor};"
        @click=${this._handleTap}
      >
        <div class="icon-cell">
          <ha-icon .icon=${this.config.icon} style="color: ${textColor};"></ha-icon>
        </div>
        <div class="name">${this.config.name}</div>
        ${showState ? html`<div class="state">${stateDisplay}</div>` : ""}
      </ha-card>
    `;
  }

  _handleTap() {
    this._handleAction(this.config.tap_action || { action: "toggle" });
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-badge", MateriaBadge);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-badge",
  name: "Materia Badge",
  description: "Material You small badge with variants, state display, and battery mode.",
});
