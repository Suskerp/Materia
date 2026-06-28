import { LitElement, html, svg } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { coloredWeatherIcon } from "./icons.js";
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

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubForecast();
  }

  /** Subscribe to the entity's daily forecast (modern HA no longer exposes it
   *  as an attribute). Guarded so it runs once per entity, not per hass tick. */
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
  }

  _num(v) {
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

    // Optional min/max — explicit sensors override today's forecast.
    let low = this.config.low_entity ? this.hass.states[this.config.low_entity]?.state : null;
    let high = this.config.high_entity ? this.hass.states[this.config.high_entity]?.state : null;
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
    // Mirror flips the tilt to the opposite diagonal (e.g. -45 → +45) so the
    // mirrored content (temp left, icon right) still follows the pill's slope.
    if (this.config.mirror) tiltDeg = -tiltDeg;
    const iconSize = this.config.icon_size ?? 53;
    const textSize = this.config.text_size ?? 30;
    const width = this.config.width ?? 115;
    const ratio = (this.config.height ?? 85) / 100;
    const iconX = this.config.icon_x ?? 5;
    const iconY = this.config.icon_y ?? 10;
    const tempX = this.config.temp_x ?? 10;
    const tempY = this.config.temp_y ?? 15;
    // Global size 1–10 caps the tile width (10 = fill the cell). Everything
    // else is in container-query units, so the whole tile scales with it.
    const sizes = ["120px", "150px", "185px", "225px", "270px", "320px", "380px", "460px", "560px", "none"];
    const size = Math.min(10, Math.max(1, this.config.size ?? 10));
    const style =
      `--wt-size:${sizes[size - 1]};` +
      `--wt-tilt:${tiltDeg}deg;--wt-icon-size:${iconSize}cqi;--wt-temp-size:${textSize}cqi;` +
      `--wt-width:${width}%;--wt-ratio:${ratio};` +
      `--wt-icon-x:${iconX}%;--wt-icon-y:${iconY}%;--wt-temp-x:${tempX}%;--wt-temp-y:${tempY}%;` +
      `${bg ? `--wt-bg:${bg};` : ""}${fg ? `--wt-fg:${fg};` : ""}` +
      `${mm ? `--wt-minmax:${mm};--wt-minmax-opacity:1;` : ""}`;

    // Colored Pixel-style glyph unless an explicit icon is configured.
    const customIcon = this.config.icon;

    return html`
      <ha-card>
        <div
          class="blob ${unavailable ? "unavailable" : ""} ${this.config.mirror ? "flip" : ""}"
          style=${style}
          @click=${() => this._handleAction(this.config.tap_action || { action: "more-info" })}
        >
          <div class="readout">
            ${showMinmax
              ? html`<div class="minmax">
                  ${this._num(high) != null ? html`<span>↑${this._num(high)}°</span>` : ""}
                  ${this._num(low) != null ? html`<span>↓${this._num(low)}°</span>` : ""}
                </div>`
              : ""}
            <div class="temp">${unavailable ? "—" : tempStr}</div>
          </div>
          ${customIcon
            ? html`<ha-icon class="wx-mono" .icon=${customIcon}></ha-icon>`
            : svg`<svg class="wx" viewBox="0 0 24 24">${coloredWeatherIcon(condition)}</svg>`}
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
