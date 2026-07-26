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

function compass(deg) {
  const pts = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return pts[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16];
}

/**
 * Weather glance pill (Pixel "at a glance" style): condition glyph, one or
 * two compact metric lines (or an alert), and the big current temperature.
 * Meant as the home-screen row that routes to the weather page.
 */
class MateriaWeatherGlance extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _forecast: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedAlert: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-weather-glance-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("weather.")) || "";
    return { entity, metrics: ["condition", "minmax"] };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { metrics: ["condition", "minmax"], ...config };
    this._fcEntity = undefined;
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("alert", "_resolvedAlert");
      this._subscribeForecast();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubForecast();
  }

  _subscribeForecast() {
    const entity = this.config?.entity;
    if (!this.hass || !entity || this._fcEntity === entity) return;
    this._unsubForecast();
    this._fcEntity = entity;
    this._forecast = [];
    const p = this.hass.connection.subscribeMessage(
      (ev) => { this._forecast = ev?.forecast || []; },
      { type: "weather/subscribe_forecast", forecast_type: "daily", entity_id: entity }
    );
    this._fcUnsub = p;
    p.catch(() => {});
  }

  _unsubForecast() {
    if (this._fcUnsub) {
      this._fcUnsub.then((u) => u && u()).catch(() => {});
      this._fcUnsub = null;
    }
  }

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n) : null;
  }

  /** Compact text for one metric; null = skip (no data). */
  _metricText(type, stateObj) {
    const a = stateObj?.attributes || {};
    const fc = this._forecast?.[0] || a.forecast?.[0];
    switch (type) {
      case "condition": {
        const c = stateObj?.state ?? "";
        return CONDITION_LABELS[c] || this._capitalize(String(c).replace(/-|_/g, " "));
      }
      case "minmax": {
        const hi = this._num(fc?.temperature);
        const lo = this._num(fc?.templow);
        if (hi == null && lo == null) return null;
        return `${hi != null ? `${hi}°` : "—"} ${lo != null ? `${lo}°` : "—"}`;
      }
      case "wind": {
        const s = this._num(a.wind_speed);
        if (s == null) return null;
        const b = this._num(a.wind_bearing);
        return `${s} ${a.wind_speed_unit ?? "km/h"}${b != null ? ` ${compass(b)}` : ""}`;
      }
      case "humidity": {
        const h = this._num(a.humidity);
        return h == null ? null : `${h}%`;
      }
      case "uv": {
        const u = this._num(a.uv_index);
        return u == null ? null : `UV ${u}`;
      }
      case "precipitation": {
        const p = fc?.precipitation;
        const n = p == null ? null : Number(p);
        if (n == null || !Number.isFinite(n)) return null;
        return `${n} ${a.precipitation_unit ?? "mm"}`;
      }
      case "pressure": {
        const p = this._num(a.pressure);
        return p == null ? null : `${p} ${a.pressure_unit ?? "hPa"}`;
      }
      default:
        return null;
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const condition = stateObj?.state ?? "";

    let temp = stateObj?.attributes?.temperature;
    if (this.config.temperature_entity) {
      const t = this.hass.states[this.config.temperature_entity];
      if (t && !this._isUnavailable(t)) temp = t.state;
    }
    const tempNum = this._num(temp);

    // Alert template (e.g. a warning sensor) takes over line 1 when non-empty.
    const alert = this._isTemplate(this.config.alert) ? this._resolvedAlert : this.config.alert;
    const metrics = (this.config.metrics || []).map((m) => this._metricText(m, stateObj)).filter(Boolean);
    const line1 = alert || metrics[0] || "";
    const line2 = (alert ? metrics : metrics.slice(1)).join(" · ");

    const bg = this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;

    return html`
      <ha-card>
        <div
          class="glance ${unavailable ? "unavailable" : ""}"
          style="${bg ? `--wg-bg:${bg};` : ""}${fg ? `--wg-fg:${fg};` : ""}"
          @click=${() => this._handleAction(this.config.tap_action || { action: "more-info" })}
        >
          <svg class="glyph" viewBox="0 0 24 24">${coloredWeatherIcon(condition)}</svg>
          <div class="mid">
            ${line1
              ? html`<div class="line1">
                  ${alert ? html`<ha-icon icon="mdi:alert-outline"></ha-icon>` : ""}
                  <span>${line1}</span>
                </div>`
              : ""}
            ${line2 ? html`<div class="line2">${line2}</div>` : ""}
          </div>
          <div class="now">${unavailable || tempNum == null ? "—" : `${tempNum}°`}</div>
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-weather-glance", MateriaWeatherGlance);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-weather-glance",
  name: "Materia Weather Glance",
  description: "Weather pill for the home screen: glyph, configurable metric lines or an alert, big temperature.",
  preview: true,
});
