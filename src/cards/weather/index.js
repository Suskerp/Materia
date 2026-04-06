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

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);

    const condition = stateObj?.state ?? "";
    const temp = stateObj?.attributes?.temperature;
    const tempUnit = stateObj?.attributes?.temperature_unit || "\u00B0";
    const icon = this.config.icon || CONDITION_ICONS[condition] || "mdi:weather-partly-cloudy";

    let humidity = null;
    if (this.config.humidity_entity) {
      const humObj = this.hass.states[this.config.humidity_entity];
      if (humObj) humidity = humObj.state;
    }
    if (humidity == null && stateObj?.attributes?.humidity != null) {
      humidity = stateObj.attributes.humidity;
    }

    const conditionDisplay = condition.replace(/-|_/g, " ");
    const primary = unavailable
      ? "Unavailable"
      : this.config.name || (temp != null ? `${temp}${tempUnit}` : "\u2014");
    const secondary = unavailable
      ? ""
      : humidity != null
        ? `${this._capitalize(conditionDisplay)} \u00B7 ${humidity}%`
        : this._capitalize(conditionDisplay);

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
