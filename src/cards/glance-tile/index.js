import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { roundedPolygonPath } from "../../utils/shapes.js";
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

/**
 * Expressive view-only sensor tile (materia-glance-tile): the weather-metric look
 * for ANY entity. One entity per card; `variant` is an explicit, required
 * category — like weather-metric's `metric` field, never inferred:
 *
 *   percent      — the square tile FILLS bottom-up with the value (humidity,
 *                  valve position, any 0–100%); humidity gets a gently
 *                  drifting liquid surface; moisture gets sweet-spot zones.
 *   battery      — value + a vertical bar, battery-tiered green→orange→red.
 *   temperature  — value + a vertical thermometer pill, colored along a
 *                  cool→comfort→warm scale (min/max configurable).
 *   power        — value + equalizer bars that light up with load (max
 *                  configurable, default 3000 W).
 *   energy       — value with a quiet bolt glyph (cumulative kWh).
 *   binary       — a MaterialShapes sunny star that slowly ROTATES while the
 *                  entity is active (pumps, motion…), still + muted when off;
 *                  the whole tile washes with the accent color when active.
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
    _resolvedLabel: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-glance-tile-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("sensor.")) || "";
    return { entity, variant: "percent" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Glance Tile: entity is required");
    if (!config.variant) throw new Error("Materia Glance Tile: variant is required — pick the value category");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("label", "_resolvedLabel");
    }
  }

  /** Subtitle: literal text or a live Jinja template (e.g. battery level,
   *  current room while cleaning) — same templating every other field uses. */
  get _label() {
    return this._isTemplate(this.config.label) ? this._resolvedLabel : this.config.label;
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

  /** The category is an explicit config choice — like weather-metric's
   *  `metric` field — never inferred from device_class/unit/domain. */
  get _variant() {
    return this.config.variant;
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
      battery: () => this._battery(),
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

  /** Soil moisture is a SWEET SPOT, not a monotonic scale (unlike battery) —
   *  too little AND too much are both bad, for different reasons, so they
   *  get different hues: red (critical dry) → orange (water soon) → green
   *  (optimal) → blue (overwatered). Thresholds are plant-specific and
   *  configurable; defaults suit a typical houseplant. */
  _moistureZone(v) {
    const critDry = this.config.critical_dry ?? 10;
    const dryBelow = this.config.dry_below ?? 20;
    const soggyAbove = this.config.soggy_above ?? 60;
    if (v <= critDry) return { fill: SCALE.red, status: this.config.dry_label ?? "Needs water now" };
    if (v <= dryBelow) return { fill: SCALE.orange, status: this.config.soon_label ?? "Water soon" };
    if (v <= soggyAbove) return { fill: SCALE.green, status: this.config.optimal_label ?? "Optimal" };
    return { fill: SCALE.blue, status: this.config.wet_label ?? "Overwatered" };
  }

  /* ---- percent: cookie that fills with the value -------------------------- */
  _percent() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const frac = Math.min(1, Math.max(0, v / 100));
    const dc = this._stateObj.attributes.device_class;
    const isMoisture = dc === "moisture";
    // Battery drains through the severity scale; everything else stays accent.
    // Always a translucent WASH (like the weather humidity wave) — a solid
    // fill drowns the card and the text sitting in it.
    let fill = null;
    let status = null;
    if (dc === "battery") {
      fill = frac > 0.4 ? SCALE.green : frac > 0.15 ? SCALE.orange : SCALE.red;
    } else if (isMoisture) {
      const zone = this._moistureZone(v);
      fill = zone.fill;
      status = zone.status;
    } else if (dc === "humidity") {
      fill = SCALE.blue;
    }
    if (fill) fill = `color-mix(in srgb, ${fill} 30%, transparent)`;
    const y = 100 - frac * 100; // square tile: the fill level maps edge to edge
    // Liquid surface. Water-like values (humidity/moisture) get a gentle wave
    // that drifts almost imperceptibly; everything else (battery…) stays a
    // still soft dome. Deliberately calmer than the weather tile's scallops.
    const liquid = dc === "humidity" || isMoisture;
    let surface;
    if (liquid) {
      // Low sine-ish wave, period 50 — drifting by one period loops seamlessly.
      let d = `M-100 ${y.toFixed(1)}`;
      for (let x = -100; x < 100; x += 25) {
        const dip = (x / 25) % 2 === 0 ? -1.6 : 1.6;
        d += ` Q ${x + 12.5} ${(y + dip).toFixed(1)} ${x + 25} ${y.toFixed(1)}`;
      }
      surface = d + " V102 H-100 Z";
    } else {
      surface = `M-2 ${y + 2.5} Q 50 ${y - 2.5} 102 ${y + 2.5} V102 H-2 Z`;
    }
    const icon = dc === "battery" ? "mdi:battery" : isMoisture ? "mdi:sprout" : "mdi:water-percent";
    return html`
      <div class="rect-tile clip">
        <svg class="fill-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${frac > 0.005
            ? svg`<path d=${surface}
                class="level-fill ${liquid ? "drift" : ""}" style=${fill ? `fill:${fill}` : ""} />`
            : ""}
        </svg>
        <div class="overlay">
          ${this._header(icon)}
          <div class="big">${Math.round(v)}<span class="unit">%</span></div>
          ${(this._label ?? status) ? html`<div class="sub">${this._label ?? status}</div>` : ""}
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
            ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8, frac * 100)}%;background:${color}"></i>
          </div>
        </div>
      </div>
    `;
  }

  /* ---- battery: value + the SAME vertical thermometer pill, battery-tiered
     coloring (green → orange → red) instead of temperature's cool→warm ---- */
  _batteryColor(frac) {
    return frac > 0.4 ? SCALE.green : frac > 0.15 ? SCALE.orange : SCALE.red;
  }

  _battery() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const frac = Math.min(1, Math.max(0, v / 100));
    const color = this._batteryColor(frac);
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:battery")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(v)}<span class="unit">%</span></div>
            ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
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
            ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
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
          ${this._label ? html`<div class="sub">${this._label}</div>` : html`<span></span>`}
          <ha-icon class="glyph" icon="mdi:lightning-bolt"></ha-icon>
        </div>
      </div>
    `;
  }

  /* ---- binary: square tile; the sunny star is a corner glyph that takes
     color and slowly turns while the entity is active ----------------------- */
  _binary() {
    const active = ACTIVE_STATES.includes(this._stateObj.state);
    const sunny = roundedPolygonPath(50, 50, 46, { vertices: 8, innerRadius: 0.8, rounding: 0.15, rotate: -Math.PI / 2 });
    return html`
      <div class="rect-tile left binary ${active ? "active" : ""}">
        ${this._header("mdi:power")}
        <div class="big small-big">${this._fmtState()}</div>
        <div class="binary-bottom">
          ${this._label ? html`<div class="sub">${this._label}</div>` : html`<span></span>`}
          <svg class="binary-star" viewBox="0 0 100 100">
            <g class=${active ? "spin" : ""}><path d=${sunny} /></g>
          </svg>
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
        ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
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
