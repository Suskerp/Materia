import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

const CONDITION_ICONS = {
  sunny: "m3o:sunny",
  clear: "m3o:sunny",
  "clear-night": "mdi:weather-night",
  partlycloudy: "m3o:partly-cloudy-day",
  partly_cloudy: "m3o:partly-cloudy-day",
  cloudy: "m3o:cloud",
  rainy: "m3o:rainy",
  pouring: "m3o:rainy",
  snowy: "mdi:weather-snowy",
  fog: "m3o:foggy",
  windy: "mdi:weather-windy",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  hail: "mdi:weather-hail",
  exceptional: "mdi:alert-circle-outline",
};

class MateriaPill extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
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

  /** Check if entity is a weather domain */
  get _isWeather() {
    return this.config.entity.startsWith("weather.");
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);

    if (this._isWeather) {
      return this._renderWeather(stateObj, unavailable);
    }

    return this._renderDefault(stateObj, unavailable);
  }

  _renderWeather(stateObj, unavailable) {
    const condition = stateObj?.state ?? "";
    const temp = stateObj?.attributes?.temperature;
    const tempUnit = stateObj?.attributes?.temperature_unit || "\u00B0";
    const icon = CONDITION_ICONS[condition] || "mdi:weather-partly-cloudy";

    let humidity = null;
    if (this.config.humidity_entity) {
      const humObj = this.hass.states[this.config.humidity_entity];
      if (humObj) humidity = humObj.state;
    }
    if (humidity == null && stateObj?.attributes?.humidity != null) {
      humidity = stateObj.attributes.humidity;
    }

    const conditionDisplay = condition.replace(/-|_/g, " ");
    const primary = unavailable ? "Unavailable" : (temp != null ? `${temp}${tempUnit}` : "\u2014");
    const secondary = unavailable ? "" : (humidity != null
      ? `${this._capitalize(conditionDisplay)} \u00B7 ${humidity}% humidity`
      : this._capitalize(conditionDisplay));

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? "unavailable" : ""}"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${primary}</div>
            <div class="state">${secondary}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderDefault(stateObj, unavailable) {
    const name =
      this.config.name ||
      stateObj?.attributes?.friendly_name ||
      this.config.entity;
    const icon = this.config.icon || stateObj?.attributes?.icon || "";
    const unit = this.config.unit || stateObj?.attributes?.unit_of_measurement || "";
    const stateVal = stateObj?.state ?? "";

    const ranges = this.config.ranges || [];
    const classification = this._classify(stateVal);

    let stateText;
    if (unavailable) {
      stateText = "Unavailable";
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

    const containerBg = isActive && this.config.color
      ? this.config.color
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = isActive && this.config.color_on
      ? this.config.color_on
      : "var(--primary-text-color)";

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? "unavailable" : ""}"
          style="background-color: ${containerBg}; color: ${textColor};"
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
  description: "Compact info pill card with configurable icon, name, state, colors, weather, and sensor ranges.",
});
