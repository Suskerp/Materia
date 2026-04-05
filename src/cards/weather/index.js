import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset, pillContainerStyles, unavailableStyles } from "../../styles/card-styles.js";
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

  static styles = [hostStyles, haCardReset, pillContainerStyles, unavailableStyles];

  static getConfigElement() {
    return document.createElement("materia-weather-editor");
  }

  static getStubConfig() {
    return { entity: "" };
  }

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
    const primary = unavailable ? 'Unavailable' : (temp != null ? `${temp}${tempUnit}` : "\u2014");
    const secondary = unavailable ? '' : (humidity != null
      ? `${this._capitalize(conditionDisplay)} \u00B7 ${humidity}% humidity`
      : this._capitalize(conditionDisplay));

    return html`
      <ha-card @click=${this._handleTap}>
        <div class="container ${unavailable ? 'unavailable' : ''}">
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
    if (this.config.tap_action) {
      this._handleAction(this.config.tap_action);
    } else {
      this._fireMoreInfo(this.config.entity);
    }
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
  description: "Weather display card with condition icons and humidity.",
});
