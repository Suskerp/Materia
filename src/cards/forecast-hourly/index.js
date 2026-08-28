import { LitElement, html } from "lit";
import { t } from "../../utils/i18n.js";
import { ActionMixin } from "../../utils/action-handler.js";
import { hourlyItems } from "./row.js";
import { moonPhaseFrac } from "../weather-tile/icons.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Pixel-style hourly forecast strip: temp, colored glyph, precipitation
 * chance and hour, in a rounded container with an optional header.
 */
class MateriaForecastHourly extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _forecast: { state: true },
    _forecastError: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-forecast-hourly-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("weather.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (this.config?.entity && this.config.entity !== config.entity) this._unsubForecast();
    this.config = { ...config };
    this._forecastRetryCount = 0;
    this._fcEntity = undefined; // (re)subscribe forecast for the (new) entity
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
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
    this._forecast = null;
    this._forecastError = false;
    const p = this.hass.connection.subscribeMessage(
      (ev) => {
        this._forecast = ev?.forecast || [];
      },
      { type: "weather/subscribe_forecast", forecast_type: "hourly", entity_id: entity }
    );
    this._fcUnsub = p;
    p.catch(() => {
      this._forecastError = true;
      this.requestUpdate();
      this._forecastFailed(p);
    });
  }

  _forecastFailed(promise) {
    if (this._fcUnsub !== promise) return;
    this._fcUnsub = null;
    this._fcEntity = this.config?.entity;
    if (!this.isConnected || (this._forecastRetryCount || 0) >= 2) return;
    this._forecastRetryCount = (this._forecastRetryCount || 0) + 1;
    clearTimeout(this._forecastRetryTimer);
    this._forecastRetryTimer = setTimeout(() => {
      this._fcEntity = undefined;
      this._subscribeForecast();
    }, this._forecastRetryCount * 1500);
  }

  _unsubForecast() {
    clearTimeout(this._forecastRetryTimer);
    if (this._fcUnsub) {
      this._fcUnsub.then((u) => u && u()).catch(() => {});
      this._fcUnsub = null;
    }
    // Allow re-subscribe after re-attach — HA re-parents cards on view edits
    // and re-layouts; a stale guard left forecasts permanently frozen.
    this._fcEntity = undefined;
  }

  /* Mouse drag-to-scroll (touch pans natively). */
  _onPointerDown(e) {
    if (e.pointerType !== "mouse") return;
    const row = e.currentTarget;
    this._dragStartX = e.clientX;
    this._dragStartScroll = row.scrollLeft;
    this._captured = false;
    this._dragPointerId = e.pointerId;
  }

  _onPointerMove(e) {
    if (this._dragStartX == null) return;
    const dx = e.clientX - this._dragStartX;
    if (!this._captured && Math.abs(dx) > 4) {
      this._captured = true;
      e.currentTarget.setPointerCapture(this._dragPointerId);
    }
    if (this._captured) e.currentTarget.scrollLeft = this._dragStartScroll - dx;
  }

  _onPointerUp(e) {
    if (this._dragStartX == null) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    this._dragStartX = null;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    if (!stateObj || unavailable) return html`<div class="data-state" role="status"><ha-icon icon="mdi:weather-cloudy-alert"></ha-icon><span>${t("data_unavailable", this.hass)}</span></div>`;
    const hours = (this._forecast || []).slice(0, this.config.hours ?? 24);
    if (!hours.length) {
      const loading = this._forecast === null && !this._forecastError;
      return html`<div class="data-state" role="status" aria-live="polite"><ha-icon icon=${loading ? "mdi:clock-outline" : "mdi:weather-cloudy-alert"}></ha-icon><span>${t(loading ? "data_loading" : "forecast_not_supported", this.hass)}</span></div>`;
    }

    const locale = this.hass?.locale?.language || navigator.language || "en";

    return html`
      <ha-card class="${unavailable ? "unavailable" : ""}">
        ${this.config.show_header !== false
          ? html`<div class="header">
              <ha-icon icon="mdi:clock-outline"></ha-icon>
              <span>${this.config.name ?? t("fc_hourly_forecast", this.hass)}</span>
            </div>`
          : ""}
        <div
          class="hours"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${hourlyItems(hours, {
            locale,
            showPrecip: this.config.show_precipitation !== false,
            minPrecip: this.config.min_precipitation ?? 10,
            moonPhase: moonPhaseFrac(this.hass, this.config.moon_entity),
          })}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-forecast-hourly", MateriaForecastHourly);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-forecast-hourly",
  name: "Materia Forecast Hourly",
  description: "Pixel-style hourly forecast strip with colored glyphs and precipitation chance.",
  preview: true,
});
