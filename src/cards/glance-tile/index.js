import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { materialCookiePath, roundedPolygonPath } from "../../utils/shapes.js";
import { styles } from "./styles.js";
import "./editor.js";

// Severity/temperature scale — same harmonizable tokens as the weather metrics.
const SCALE = {
  blue: "var(--md-sys-cust-color-weather-rain, #5fa8f5)",
  green: "var(--md-sys-cust-color-scale-green, #5E9E50)",
  yellow: "var(--md-sys-cust-color-scale-yellow, #C7A128)",
  orange: "var(--md-sys-cust-color-scale-orange, #D9713C)",
  red: "var(--md-sys-cust-color-scale-red, #C94D42)",
};

const ACTIVE_STATES = ["on", "open", "running", "playing", "heat", "heating", "home", "true", "active"];

// Unique clip-path ids — tiles can repeat in a grid.
let uid = 0;

/**
 * Expressive view-only sensor tile (materia-glance-tile): the weather-metric look
 * for ANY entity. One entity per card; the visualization is picked from the
 * device class (override with `variant`):
 *
 *   percent      — a 12-lobe cookie that FILLS bottom-up with the value
 *                  (humidity, battery, valve position, any 0–100%). Battery
 *                  fill turns orange/red as it drains.
 *   temperature  — value + a vertical thermometer pill, colored along a
 *                  cool→comfort→warm scale (min/max configurable).
 *   power        — value + equalizer bars that light up with load (max
 *                  configurable, default 3000 W).
 *   energy       — value with a quiet bolt glyph (cumulative kWh).
 *   binary       — a MaterialShapes sunny star that slowly ROTATES while the
 *                  entity is active (pumps, motion…), still + muted when off.
 *   plain        — icon + formatted state, for everything else.
 *
 * View only: tap opens more-info (or any configured tap_action).
 */
class MateriaGlanceTile extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-glance-tile-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("sensor.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Glance Tile: entity is required");
    this.config = { ...config };
  }

  constructor() {
    super();
    this._uid = ++uid;
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
    }
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  get _unit() {
    return this.config.unit ?? this._stateObj?.attributes?.unit_of_measurement ?? "";
  }

  get _name() {
    return this.config.name ?? this._stateObj?.attributes?.friendly_name ?? this.config.entity;
  }

  _icon(fallback) {
    return this.config.icon || this._stateObj?.attributes?.icon || fallback;
  }

  /** device class / unit / domain → visualization variant. */
  get _variant() {
    if (this.config.variant && this.config.variant !== "auto") return this.config.variant;
    const st = this._stateObj;
    if (!st) return "plain";
    const domain = this.config.entity.split(".")[0];
    const dc = st.attributes.device_class;
    const unit = st.attributes.unit_of_measurement;
    if (domain === "binary_sensor" || domain === "switch" || ACTIVE_STATES.includes(st.state) || st.state === "off") {
      if (this._num(st.state) == null) return "binary";
    }
    if (unit === "%" || dc === "humidity" || dc === "battery" || dc === "moisture") return "percent";
    if (dc === "temperature" || unit === "°C" || unit === "°F") return "temperature";
    if (dc === "power" || unit === "W" || unit === "kW") return "power";
    if (dc === "energy" || unit === "kWh" || unit === "Wh" || unit === "MWh") return "energy";
    return "plain";
  }

  _fmtState() {
    const st = this._stateObj;
    return this.hass.formatEntityState?.(st) ?? st.state;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) {
      return html`<ha-card><div class="rect-tile unavailable">
        <div class="header"><ha-icon icon=${this._icon("mdi:help-circle-outline")}></ha-icon><span>${this._name}</span></div>
        <div class="sub hint">${st ? this._fmtState() : "Entity not found"}</div>
      </div></ha-card>`;
    }
    const body = {
      percent: () => this._percent(),
      temperature: () => this._temperature(),
      power: () => this._power(),
      energy: () => this._energy(),
      binary: () => this._binary(),
      plain: () => this._plain(),
    }[this._variant]();
    const bg = this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;
    const sizes = ["120px", "150px", "185px", "225px", "270px", "320px", "380px", "460px", "560px", "none"];
    const size = Math.min(10, Math.max(1, this.config.size ?? 10));
    return html`
      <ha-card
        style="--ms-size:${sizes[size - 1]};${bg ? `--ms-color:${bg};` : ""}${fg ? `--ms-color-on:${fg};` : ""}${this.config.accent ? `--ms-accent:${this.config.accent};` : ""}"
        @click=${() => this._handleAction(this.config.tap_action || { action: "more-info", entity: this.config.entity })}
      >
        ${body}
      </ha-card>
    `;
  }

  _header(fallbackIcon) {
    return html`<div class="header"><ha-icon icon=${this._icon(fallbackIcon)}></ha-icon><span>${this._name}</span></div>`;
  }

  /* ---- percent: cookie that fills with the value -------------------------- */
  _percent() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const frac = Math.min(1, Math.max(0, v / 100));
    const dc = this._stateObj.attributes.device_class;
    // Battery drains through the severity scale; everything else stays accent.
    let fill = null;
    if (dc === "battery") fill = frac > 0.4 ? SCALE.green : frac > 0.15 ? SCALE.orange : SCALE.red;
    else if (dc === "humidity" || dc === "moisture") fill = SCALE.blue;
    const cookie = materialCookiePath(50, 52, 45, 12);
    // Liquid surface: a single soft dome, eased when the value changes —
    // deliberately calmer than the weather humidity's drifting scallops.
    const y = 97 - frac * 90; // cookie spans y ≈ 7..97
    const icon = dc === "battery" ? "mdi:battery" : "mdi:water-percent";
    return html`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <clipPath id="ms-clip-${this._uid}"><path d=${cookie} /></clipPath>
          </defs>
          <path d=${cookie} class="shape-fill" />
          ${frac > 0.005
            ? svg`<path d="M-2 ${y + 2.5} Q 50 ${y - 2.5} 102 ${y + 2.5} V102 H-2 Z"
                class="level-fill" style=${fill ? `fill:${fill}` : ""}
                clip-path="url(#ms-clip-${this._uid})" />`
            : ""}
        </svg>
        <div class="overlay">
          ${this._header(icon)}
          <div class="big">${Math.round(v)}<span class="unit">%</span></div>
          ${this.config.label ? html`<div class="sub">${this.config.label}</div>` : ""}
        </div>
      </div>
    `;
  }

  /* ---- temperature: value + vertical thermometer pill ---------------------- */
  _tempColor(v, unit) {
    const c = unit === "°F" ? ((v - 32) * 5) / 9 : v;
    if (c < 16) return SCALE.blue;
    if (c < 23) return SCALE.green;
    if (c < 27) return SCALE.orange;
    return SCALE.red;
  }

  _temperature() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const unit = this._unit || "°C";
    const min = this.config.min ?? (unit === "°F" ? 50 : 10);
    const max = this.config.max ?? (unit === "°F" ? 86 : 30);
    const frac = Math.min(1, Math.max(0, (v - min) / (max - min)));
    const color = this._tempColor(v, unit);
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:thermometer")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(v * 10) / 10}<span class="unit">${unit}</span></div>
            ${this.config.label ? html`<div class="sub">${this.config.label}</div>` : ""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8, frac * 100)}%;background:${color}"></i>
          </div>
        </div>
      </div>
    `;
  }

  /* ---- power: value + load equalizer bars ---------------------------------- */
  _power() {
    const raw = this._num(this._stateObj.state);
    if (raw == null) return this._plain();
    const unit = this._stateObj.attributes.unit_of_measurement || "W";
    const watts = unit === "kW" ? raw * 1000 : raw;
    const max = this.config.max ?? 3000;
    const frac = Math.min(1, Math.max(0, watts / max));
    const lit = Math.ceil(frac * 5);
    const display = watts >= 1000 ? `${Math.round(watts / 100) / 10}` : `${Math.round(watts)}`;
    const dUnit = watts >= 1000 ? "kW" : "W";
    const heights = [32, 48, 64, 82, 100];
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:flash")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${display}<span class="unit"> ${dUnit}</span></div>
            ${this.config.label ? html`<div class="sub">${this.config.label}</div>` : ""}
          </div>
          <div class="bars">
            ${heights.map((h, i) => html`<i class=${i < lit ? "lit" : ""} style="height:${h}%"></i>`)}
          </div>
        </div>
      </div>
    `;
  }

  /* ---- energy: value + quiet bolt glyph ------------------------------------ */
  _energy() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const locale = this.hass?.locale?.language || navigator.language || "en";
    const display = (Math.round(v * 10) / 10).toLocaleString(locale);
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:lightning-bolt")}
        <div class="big">${display}<span class="unit"> ${this._unit}</span></div>
        <div class="energy-bottom">
          ${this.config.label ? html`<div class="sub">${this.config.label}</div>` : html`<span></span>`}
          <ha-icon class="glyph" icon="mdi:lightning-bolt"></ha-icon>
        </div>
      </div>
    `;
  }

  /* ---- binary: sunny star spins while active ------------------------------- */
  _binary() {
    const active = ACTIVE_STATES.includes(this._stateObj.state);
    const sunny = roundedPolygonPath(50, 52, 45, { vertices: 8, innerRadius: 0.8, rounding: 0.15, rotate: -Math.PI / 2 });
    return html`
      <div class="shape-tile ${active ? "active" : ""}">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          ${active
            ? svg`<g class="spin"><path d=${sunny} class="shape-fill on" /></g>`
            : svg`<circle cx="50" cy="52" r="43" class="shape-fill" />`}
        </svg>
        <div class="overlay">
          ${this._header("mdi:power")}
          <ha-icon class="state-icon" icon=${this._icon("mdi:power")}></ha-icon>
          <div class="sub">${this._fmtState()}</div>
        </div>
      </div>
    `;
  }

  /* ---- plain fallback ------------------------------------------------------- */
  _plain() {
    const st = this._stateObj;
    const n = this._num(st.state);
    return html`
      <div class="rect-tile">
        ${this._header("mdi:eye-outline")}
        ${n != null
          ? html`<div class="big">${Math.round(n * 10) / 10}<span class="unit"> ${this._unit}</span></div>`
          : html`<div class="big small-big">${this._fmtState()}</div>`}
        ${this.config.label ? html`<div class="sub">${this.config.label}</div>` : ""}
      </div>
    `;
  }

  getGridOptions() {
    return { columns: 4, rows: "auto", min_columns: 3 };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-glance-tile", MateriaGlanceTile);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-glance-tile",
  name: "Materia Glance Tile",
  description: "Expressive view-only sensor tile — percent fill, thermometer, power bars, spinning pump star, and a graceful fallback.",
  preview: true,
});
