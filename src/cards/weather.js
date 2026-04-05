import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────
 *  Weather condition → icon mapping
 * ─────────────────────────────────────────────── */

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

/* ───────────────────────────────────────────────
 *  materia-weather-editor
 * ─────────────────────────────────────────────── */

class MateriaWeatherEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
      { name: "name", selector: { text: {} } },
      { name: "humidity_entity", selector: { entity: { domain: "sensor" } } },
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
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("materia-weather-editor", MateriaWeatherEditor);

/* ───────────────────────────────────────────────
 *  materia-weather
 *  Weather display card reading from a weather.* entity.
 * ─────────────────────────────────────────────── */

class MateriaWeather extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-weather-editor");
  }

  static getStubConfig() {
    return { entity: "" };
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
      background: transparent;
      border-radius: 28px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
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
      background-color: var(--ha-card-background, var(--card-background-color));
      flex-shrink: 0;
    }
    .icon-container ha-icon {
      --mdc-icon-size: 24px;
      display: flex;
    }
    .name-container {
      display: flex;
      line-height: 18px;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      margin: 0 16px 0 4px;
      overflow: hidden;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
    .state {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const condition = stateObj.state;
    const temp = stateObj.attributes.temperature;
    const tempUnit = stateObj.attributes.temperature_unit || "°";
    const icon = CONDITION_ICONS[condition] || "mdi:weather-partly-cloudy";

    /* Humidity: prefer separate entity, fall back to weather entity attribute */
    let humidity = null;
    if (this.config.humidity_entity) {
      const humObj = this.hass.states[this.config.humidity_entity];
      if (humObj) humidity = humObj.state;
    }
    if (humidity == null && stateObj.attributes.humidity != null) {
      humidity = stateObj.attributes.humidity;
    }

    const conditionDisplay = condition.replace(/-|_/g, " ");

    const primary = temp != null ? `${temp}${tempUnit}` : "—";
    const secondary = humidity != null
      ? `${this._capitalize(conditionDisplay)} · ${humidity}% humidity`
      : this._capitalize(conditionDisplay);

    return html`
      <ha-card @click=${this._handleTap}>
        <div class="container">
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
