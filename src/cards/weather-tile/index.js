import { LitElement, html, svg } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { coloredWeatherIcon, moonPhaseFrac } from "./icons.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaWeatherTile extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedMinmaxColor: { state: true },
    _forecast: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-weather-tile-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("weather.")) || "";
    return { entity, show_minmax: true };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
    this._fcEntity = undefined; // (re)subscribe forecast for the (new) entity
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("minmax_color", "_resolvedMinmaxColor");
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

  /** Subscribe to the entity's daily forecast (modern HA no longer exposes it
   *  as an attribute). Guarded so it runs once per entity, not per hass tick. */
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
    // would otherwise render a bogus "0°" when the forecast lacks a high/low.
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n) : null;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const condition = stateObj?.state ?? "";

    // Current temperature — sensor override, else the weather entity.
    let temp = stateObj?.attributes?.temperature;
    if (this.config.temperature_entity) {
      const t = this.hass.states[this.config.temperature_entity];
      if (t) temp = t.state;
    }
    // Just the degree symbol — no unit letter (28° not 28°C).
    const tempStr = this._num(temp) != null ? `${this._num(temp)}°` : "—";

    // Optional min/max — explicit sensors override today's forecast, but an
    // UNAVAILABLE sensor must fall through (its state is the string
    // "unavailable", not null, which used to block the forecast fallback).
    const readSensor = (id) => {
      const s = id ? this.hass.states[id] : null;
      return s && !this._isUnavailable(s) ? s.state : null;
    };
    let low = readSensor(this.config.low_entity);
    let high = readSensor(this.config.high_entity);
    // Today's forecast: subscribed daily forecast first, legacy attribute next.
    const fc = this._forecast?.[0] || stateObj?.attributes?.forecast?.[0];
    if (low == null && fc?.templow != null) low = fc.templow;
    if (high == null && fc?.temperature != null) high = fc.temperature;
    const showMinmax =
      this.config.show_minmax && (this._num(low) != null || this._num(high) != null);

    const bg = this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;
    const mm = this._isTemplate(this.config.minmax_color) ? this._resolvedMinmaxColor : this.config.minmax_color;
    // Diagonal tilt in degrees (negative = rises to the top-right). Accepts a
    // number (slider) or the legacy right/left/none strings.
    let tiltDeg =
      typeof this.config.tilt === "number"
        ? this.config.tilt
        : ({ right: -45, left: 45, none: 0 }[this.config.tilt] ?? -45);
    // Mirror throws the pill onto the opposite diagonal (e.g. -45 -> +45).
    // It used to swap the content sides too, back when content was anchored
    // to the pill's corners; with the content centred there is nothing left
    // to mirror but the shape itself.
    if (this.config.mirror) tiltDeg = -tiltDeg;
    // EVERY number below is manual and unclamped on purpose. Auto-fitting the
    // content to the tilted pill was tried repeatedly and kept being wrong in
    // one direction or another, so the card now just does what it is told:
    // place each piece where the config says, at the size the config says,
    // and let the pill be whatever shape the config says. Nothing here
    // second-guesses those values or quietly nudges them to fit.
    //
    // All offsets are cqi — 1% of the TILE'S OWN WIDTH — for both axes, so x
    // and y move by the same amount per unit and neither drifts when the
    // tile's aspect ratio changes. (Mixing % of height with cqi is what
    // broke every previous attempt.) 0,0 is dead centre.
    const iconSize = this.config.icon_size ?? (showMinmax ? 34 : 36);
    const textSize = this.config.text_size ?? (showMinmax ? 26 : 30);
    const minmaxSize = this.config.minmax_size ?? 5.5;
    const tempX = this.config.temp_x ?? 0;
    const tempY = this.config.temp_y ?? -18;
    const iconX = this.config.icon_x ?? 0;
    const iconY = this.config.icon_y ?? 18;
    const width = this.config.width ?? 115;
    const ratio = (this.config.height ?? 85) / 100;
    // The pill's own scale, so the shape can grow to meet the content
    // instead of the content always having to shrink to meet the shape.
    const pillScale = (this.config.pill_scale ?? 86) / 100;
    // Global size 1–10 caps the tile width (10 = fill the cell). Everything
    // else is in container-query units, so the whole tile scales with it.
    const sizes = ["120px", "150px", "185px", "225px", "270px", "320px", "380px", "460px", "560px", "none"];
    const size = Math.min(10, Math.max(1, this.config.size ?? 10));
    const style =
      `--wt-size:${sizes[size - 1]};` +
      `--wt-tilt:${tiltDeg}deg;--wt-pill-scale:${pillScale};` +
      `--wt-icon-size:${iconSize}cqi;--wt-temp-size:${textSize}cqi;--wt-minmax-size:${minmaxSize}cqi;` +
      `--wt-width:${width}%;--wt-ratio:${ratio};` +
      `--wt-temp-x:${tempX}cqi;--wt-temp-y:${tempY}cqi;` +
      `--wt-icon-x:${iconX}cqi;--wt-icon-y:${iconY}cqi;` +
      `${bg ? `--wt-bg:${bg};` : ""}${fg ? `--wt-fg:${fg};` : ""}` +
      `${mm ? `--wt-minmax:${mm};--wt-minmax-opacity:1;` : ""}`;

    // Colored Pixel-style glyph unless an explicit icon is configured.
    const customIcon = this.config.icon;

    return html`
      <ha-card>
        <div
          class="blob ${unavailable ? "unavailable" : ""}"
          style=${style}
          @click=${() => this._handleAction(this.config.tap_action || { action: "more-info" })}
        >
          <div class="readout">
            ${showMinmax
              ? html`<div class="minmax">
                  <span>↑${this._num(high) != null ? `${this._num(high)}°` : "—"}</span>
                  <span>↓${this._num(low) != null ? `${this._num(low)}°` : "—"}</span>
                </div>`
              : ""}
            <div class="temp">${unavailable ? "—" : tempStr}</div>
          </div>
          ${customIcon
            ? html`<ha-icon class="wx-mono" .icon=${customIcon}></ha-icon>`
            : svg`<svg class="wx" viewBox="0 0 24 24">${coloredWeatherIcon(condition, moonPhaseFrac(this.hass, this.config.moon_entity))}</svg>`}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 6, rows: "auto", min_columns: 4 };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-weather-tile", MateriaWeatherTile);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-weather-tile",
  name: "Materia Weather Tile",
  description: "Large blobby weather widget with a big temperature and colored condition icon.",
  preview: true,
});
