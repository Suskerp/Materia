import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaPill extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
    _resolvedStateDisplay: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-pill-editor");
  }

  static getStubConfig(hass) {
    const entities = hass ? Object.keys(hass.states) : [];
    const sensor = entities.find((e) => e.startsWith("sensor.")) || "";
    return { entity: sensor, name: "", icon: "mdi:information-outline" };
  }

  static styles = [unavailableStyles, styles];

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = {
      icon: "mdi:information-outline",
      ...config,
    };
  }

  /** Classify a numeric value against configured ranges */
  _classify(value) {
    const ranges = this.config.ranges || [];
    if (!ranges.length) return { label: "", color: "" };
    const num = parseFloat(value);
    for (const range of ranges) {
      if (range.max == null || num <= range.max) {
        return { label: range.label, color: range.color };
      }
    }
    return { label: "", color: "" };
  }

  get _templatesReady() {
    const c = this.config;
    if (this._isTemplate(c?.color) && this._resolvedColor === undefined) return false;
    if (this._isTemplate(c?.color_on) && this._resolvedColorOn === undefined) return false;
    if (this._isTemplate(c?.icon) && this._resolvedIcon === undefined) return false;
    if (this._isTemplate(c?.name) && this._resolvedName === undefined) return false;
    return true;
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("name", "_resolvedName");
      this._resolveField("state_display", "_resolvedStateDisplay");
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    if (!this._templatesReady) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const name = this._isTemplate(this.config.name)
      ? this._resolvedName
      : (this.config.name || stateObj?.attributes?.friendly_name || this.config.entity);
    const icon = this._isTemplate(this.config.icon)
      ? this._resolvedIcon
      : (this.config.icon || stateObj?.attributes?.icon || "");
    const unit = stateObj?.attributes?.unit_of_measurement || "";
    const stateVal = stateObj?.state ?? "";

    const ranges = this.config.ranges || [];
    const classification = this._classify(stateVal);

    let stateText;
    if (unavailable) {
      stateText = "Unavailable";
    } else if (this.config.state_display) {
      stateText = this._isTemplate(this.config.state_display)
        ? (this._resolvedStateDisplay ?? "")
        : this.config.state_display;
    } else if (ranges.length) {
      // Sensor-display style: show value + classification label
      stateText = unit
        ? `${stateVal} \u00B7 ${classification.label || name}`
        : stateVal;
    } else {
      // Default pill style: show state with unit
      stateText = unit
        ? `${this._capitalize(stateVal)} ${unit}`
        : this._capitalize(stateVal);
    }

    const secondaryText = ranges.length
      ? (unavailable ? name : (unit ? unit : (classification.label || name)))
      : "";

    const s = stateVal.toLowerCase();
    const isActive = s === "on" || s === "true" || s === "home" || s === "open"
      || s === "cleaning" || s === "playing"
      || (!isNaN(Number(s)) && Number(s) > 0);

    const color = this._resolvedColor || this.config.color;
    const colorOn = this._resolvedColorOn || this.config.color_on;
    const containerBg = isActive && color
      ? color
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = isActive && colorOn
      ? colorOn
      : "var(--primary-text-color)";

    const noBg = this.config.background === false || this.config.background === "none";

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? "unavailable" : ""} ${noBg ? "no-bg" : ""}"
          style="background-color: ${noBg ? "transparent" : containerBg}; color: ${textColor};"
          @click=${this._handleTap}
        >
          ${icon ? html`
            <div class="icon-container">
              <ha-icon .icon=${icon} style="color: ${textColor};"></ha-icon>
            </div>
          ` : ""}
          <div class="name-container">
            <div class="name">${ranges.length ? stateText : name}</div>
            <div class="state">${ranges.length ? secondaryText : stateText}</div>
          </div>
          ${this._hasNavigateAction
            ? html`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`
            : ""}
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    this._handleAction(this.config.tap_action || { action: "more-info" });
  }

  getGridOptions() {
    return { columns: 6, rows: "auto" };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-pill", MateriaPill);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-pill",
  name: "Materia Pill",
  description: "Compact info pill for sensors, weather, and status indicators.",
  preview: true,
});
