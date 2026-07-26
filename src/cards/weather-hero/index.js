import { LitElement, html, svg } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { coloredWeatherIcon } from "../weather-tile/icons.js";
import { styles } from "./styles.js";
import "./editor.js";

const CONDITION_LABELS = {
  "clear-night": "Clear night",
  partlycloudy: "Partly cloudy",
  partly_cloudy: "Partly cloudy",
  "lightning-rainy": "Thunderstorm",
  "snowy-rainy": "Sleet",
  exceptional: "Exceptional",
};

/**
 * Current-conditions hero: condition text, a huge temperature with a unit
 * superscript, an optional "Feels like" line and a "Night: x° • Day: y°"
 * min/max line fed by today's daily forecast.
 */
class MateriaWeatherHero extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _forecast: { state: true },
    _resolvedColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-weather-hero-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("weather.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
    this._fcEntity = undefined; // (re)subscribe forecast for the (new) entity
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color_on", "_resolvedColorOn");
      this._subscribeForecast();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._resubOnConnect();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubForecast();
  }

  _resubOnConnect() {
    this._subscribeForecast();
  }

  _subscribeForecast() {
    const entity = this.config?.entity;
    if (!this.hass || !entity || this._fcEntity === entity) return;
    this._unsubForecast();
    this._fcEntity = entity;
    this._forecast = [];
    const p = this.hass.connection.subscribeMessage(
      (ev) => {
        this._forecast = ev?.forecast || [];
      },
      { type: "weather/subscribe_forecast", forecast_type: "daily", entity_id: entity }
    );
    this._fcUnsub = p;
    p.catch(() => {}); // entity may not support forecasts — fall back gracefully
  }

  _unsubForecast() {
    if (this._fcUnsub) {
      this._fcUnsub.then((u) => u && u()).catch(() => {});
      this._fcUnsub = null;
    }
    // Allow re-subscribe after re-attach — HA re-parents cards on view edits
    // and re-layouts; a stale guard left forecasts permanently frozen.
    this._fcEntity = undefined;
  }

  _num(v) {
    // Missing values must stay null — Number(null)/Number("") are 0, which
    // would otherwise render a bogus "0°".
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n) : null;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const condition = stateObj?.state ?? "";
    const conditionLabel =
      CONDITION_LABELS[condition] ||
      this._capitalize(String(condition).replace(/-|_/g, " "));

    // Current temperature — real external sensor override, else the entity.
    let temp = stateObj?.attributes?.temperature;
    if (this.config.temperature_entity) {
      const t = this.hass.states[this.config.temperature_entity];
      if (t && !this._isUnavailable(t)) temp = t.state;
    }
    const tempNum = this._num(temp);

    // Feels like — sensor override, else apparent_temperature. Hidden if absent.
    let feels = stateObj?.attributes?.apparent_temperature;
    if (this.config.feels_like_entity) {
      const f = this.hass.states[this.config.feels_like_entity];
      if (f && !this._isUnavailable(f)) feels = f.state;
    }
    const feelsNum = this._num(feels);

    // Night/Day from today's forecast (explicit sensors override; unavailable
    // sensors fall through to the forecast).
    const readSensor = (id) => {
      const s = id ? this.hass.states[id] : null;
      return s && !this._isUnavailable(s) ? s.state : null;
    };
    let low = readSensor(this.config.low_entity);
    let high = readSensor(this.config.high_entity);
    const fc = this._forecast?.[0] || stateObj?.attributes?.forecast?.[0];
    if (low == null && fc?.templow != null) low = fc.templow;
    if (high == null && fc?.temperature != null) high = fc.temperature;
    const lowNum = this._num(low);
    const highNum = this._num(high);

    const nightLabel = this.config.night_label ?? "Night";
    const dayLabel = this.config.day_label ?? "Day";
    const sep = this.config.separator ?? "•";

    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;

    return html`
      <ha-card>
        <div
          class="hero ${unavailable ? "unavailable" : ""}"
          style="${fg ? `--wh-fg:${fg};` : ""}"
          @click=${() => this._handleAction(this.config.tap_action || { action: "more-info" })}
        >
          ${this.config.show_condition !== false
            ? html`<div class="condition">
                ${this.config.show_icon !== false && !unavailable
                  ? svg`<svg class="cond-glyph" viewBox="0 0 24 24">${coloredWeatherIcon(condition)}</svg>`
                  : ""}
                <span>${unavailable ? "—" : conditionLabel}</span>
              </div>`
            : ""}
          <div class="temp">
            <span class="temp-value">${unavailable || tempNum == null ? "—" : tempNum}</span><span class="temp-deg">°</span>
          </div>
          ${this.config.show_feels_like !== false && feelsNum != null && !unavailable
            ? html`<div class="feels">${this.config.feels_like_label ?? "Feels like"} ${feelsNum}°</div>`
            : ""}
          ${this.config.show_minmax !== false && (lowNum != null || highNum != null) && !unavailable
            ? html`<div class="minmax">
                <span>${nightLabel}: ${lowNum != null ? `${lowNum}°` : "—"}</span>
                <span class="sep">${sep}</span>
                <span>${dayLabel}: ${highNum != null ? `${highNum}°` : "—"}</span>
              </div>`
            : ""}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("materia-weather-hero", MateriaWeatherHero);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-weather-hero",
  name: "Materia Weather Hero",
  description: "Current-conditions hero: condition, huge temperature, feels-like and night/day range.",
  preview: true,
});
