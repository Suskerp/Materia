import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
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

class MateriaWeather extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-weather-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(e => e.startsWith("weather.")) || "";
    return { entity };
  }

  static styles = styles;

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("icon", "_resolvedIcon");
      this._resolveField("name", "_resolvedName");
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);

    const condition = stateObj?.state ?? "";
    const showTemp = this.config.show_temperature !== false;
    let temp = stateObj?.attributes?.temperature;
    let tempUnit = stateObj?.attributes?.temperature_unit || "\u00B0";
    if (this.config.temperature_entity) {
      const tObj = this.hass.states[this.config.temperature_entity];
      if (tObj) {
        temp = tObj.state;
        tempUnit = tObj.attributes?.unit_of_measurement || tempUnit;
      }
    }
    const icon = this._isTemplate(this.config.icon)
      ? this._resolvedIcon
      : (this.config.icon || CONDITION_ICONS[condition] || "mdi:weather-partly-cloudy");

    let humidity = null;
    if (this.config.humidity_entity) {
      const humObj = this.hass.states[this.config.humidity_entity];
      if (humObj) humidity = humObj.state;
    }
    if (humidity == null && stateObj?.attributes?.humidity != null) {
      humidity = stateObj.attributes.humidity;
    }

    const conditionDisplay = this._capitalize(condition.replace(/-|_/g, " "));
    const nameVal = this._isTemplate(this.config.name) ? this._resolvedName : this.config.name;
    const tempStr = showTemp && temp != null ? `${temp}${tempUnit}` : null;

    let primary;
    if (unavailable) primary = "Unavailable";
    else if (nameVal) primary = nameVal;
    else if (tempStr) primary = tempStr;
    else primary = conditionDisplay || "\u2014";

    const parts = [];
    if (!unavailable) {
      // temperature joins the state line inline whenever it isn't the headline
      if (tempStr && primary !== tempStr) parts.push(tempStr);
      if (primary !== conditionDisplay) parts.push(conditionDisplay);
      if (humidity != null) parts.push(`${humidity}%`);
    }
    const secondary = parts.join(" \u00B7 ");

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

customElements.define("materia-weather", MateriaWeather);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-weather",
  name: "Materia Weather",
  description: "Weather condition card with automatic icon mapping.",
  preview: true,
});
