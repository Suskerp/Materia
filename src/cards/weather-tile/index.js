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
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
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
    let unit = stateObj?.attributes?.temperature_unit || "°";
    if (this.config.temperature_entity) {
      const t = this.hass.states[this.config.temperature_entity];
      if (t) {
        temp = t.state;
        unit = t.attributes?.unit_of_measurement || unit;
      }
    }
    const tempStr = this._num(temp) != null ? `${this._num(temp)}${unit}` : "—";

    // Optional min/max — explicit sensors override today's forecast.
    let low = this.config.low_entity ? this.hass.states[this.config.low_entity]?.state : null;
    let high = this.config.high_entity ? this.hass.states[this.config.high_entity]?.state : null;
    const fc = stateObj?.attributes?.forecast?.[0];
    if (low == null && fc?.templow != null) low = fc.templow;
    if (high == null && fc?.temperature != null) high = fc.temperature;
    const showMinmax =
      this.config.show_minmax && (this._num(low) != null || this._num(high) != null);

    const bg = this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;
    const style = `${bg ? `--wt-bg:${bg};` : ""}${fg ? `--wt-fg:${fg};` : ""}`;

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
            <div class="temp">${unavailable ? "—" : tempStr}</div>
            ${showMinmax
              ? html`<div class="minmax">
                  ${this._num(high) != null ? html`<span>↑${this._num(high)}°</span>` : ""}
                  ${this._num(low) != null ? html`<span>↓${this._num(low)}°</span>` : ""}
                </div>`
              : ""}
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
