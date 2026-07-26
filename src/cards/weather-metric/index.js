import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { cookiePath, windBlobPath, materialCookiePath, arcPath } from "../../utils/shapes.js";
import { coloredWeatherIcon } from "../weather-tile/icons.js";
import { styles } from "./styles.js";
import "./editor.js";

/** Compass point from bearing degrees (16-wind). */
function compass(deg) {
  const pts = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return pts[Math.round((((deg % 360) + 360) % 360) / 22.5) % 16];
}

// Severity scale — harmonizable theme tokens (add scale-* entries to
// custom_colors.json to tint them to the wallpaper) with hex fallbacks.
const SCALE = {
  green: "var(--md-sys-cust-color-scale-green, #5E9E50)",
  yellow: "var(--md-sys-cust-color-scale-yellow, #C7A128)",
  orange: "var(--md-sys-cust-color-scale-orange, #D9713C)",
  red: "var(--md-sys-cust-color-scale-red, #C94D42)",
  purple: "var(--md-sys-cust-color-scale-purple, #8A4DA3)",
  maroon: "var(--md-sys-cust-color-scale-maroon, #7A4040)",
};

const UV_LEVELS = [
  { max: 2, label: "Low", color: SCALE.green },
  { max: 5, label: "Moderate", color: SCALE.yellow },
  { max: 7, label: "High", color: SCALE.orange },
  { max: 10, label: "Very high", color: SCALE.red },
  { max: Infinity, label: "Extreme", color: SCALE.purple },
];

const AQI_BANDS = [
  { max: 50, label: "Good air quality", color: SCALE.green },
  { max: 100, label: "Moderate air quality", color: SCALE.yellow },
  { max: 150, label: "Unhealthy for sensitive groups", color: SCALE.orange },
  { max: 200, label: "Unhealthy air quality", color: SCALE.red },
  { max: 300, label: "Very unhealthy air quality", color: SCALE.purple },
  { max: Infinity, label: "Hazardous air quality", color: SCALE.maroon },
];

const POLLEN_LEVELS = ["None", "Low", "Moderate", "High", "Very high"];

/**
 * Expressive weather metric tiles (Pixel weather style): one card, one
 * `metric` per instance — wind, uv, aqi, pollen, precipitation, sun,
 * visibility, humidity, pressure. Values come from the weather entity's
 * attributes where possible; a sensor override always wins; tiles with no
 * data render nothing instead of breaking.
 */
class MateriaWeatherMetric extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _forecast: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-weather-metric-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("weather.")) || "";
    return { entity, metric: "wind" };
  }

  setConfig(config) {
    if (!config.metric) throw new Error("metric is required");
    this.config = { ...config };
    this._fcEntity = undefined;
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      // Precipitation without an explicit sensor reads today's forecast.
      if (this.config.metric === "precipitation" && !this.config.sensor) {
        this._subscribeForecast();
      }
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

  _numRaw(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  /** Sensor override → weather attribute → null. */
  _value(attrName) {
    if (this.config.sensor) {
      const s = this.hass.states[this.config.sensor];
      if (s && !this._isUnavailable(s)) return this._numRaw(s.state);
      return null;
    }
    const w = this.hass.states[this.config.entity];
    return this._numRaw(w?.attributes?.[attrName]);
  }

  _weatherAttr(name) {
    return this.hass.states[this.config.entity]?.attributes?.[name];
  }

  /** Pixel-style water surface: upward arc bumps with pointy cusps between
   *  (a scallop, not a smooth sine). Two viewBox-widths (0..200) so the CSS
   *  drift of -50% (an integer number of periods) loops seamlessly. */
  _scallopWave(y) {
    // 12 bumps over the double-width path — pointy cusps but calm, not busy.
    const period = 200 / 12;
    const amp = 3.2;
    let d = `M0 ${y + amp} `;
    for (let x = 0; x < 200; x += period) {
      d += `Q ${x + period / 2} ${y - amp} ${x + period} ${y + amp} `;
    }
    return d + `V100 H0 Z`;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const m = this.config.metric;
    const renderer = {
      wind: () => this._wind(),
      uv: () => this._uv(),
      aqi: () => this._aqi(),
      pollen: () => this._pollen(),
      precipitation: () => this._precipitation(),
      sun: () => this._sun(),
      visibility: () => this._visibility(),
      humidity: () => this._humidity(),
      pressure: () => this._pressure(),
    }[m];
    if (!renderer) return html``;
    const body = renderer();
    if (body === nothing) return html``; // no data → tile no-shows
    const bg = this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;
    // Global size 1–10 caps the tile width (10 = fill the cell), matching the
    // weather-tile's scale so mixed grids line up.
    const sizes = ["120px", "150px", "185px", "225px", "270px", "320px", "380px", "460px", "560px", "none"];
    const size = Math.min(10, Math.max(1, this.config.size ?? 10));
    return html`
      <ha-card
        style="--wm-size:${sizes[size - 1]};${bg ? `--wm-color:${bg};` : ""}${fg ? `--wm-color-on:${fg};` : ""}"
        @click=${() => this._handleAction(this.config.tap_action || (this.config.sensor || this.config.entity ? { action: "more-info", entity: this.config.sensor || this.config.entity } : undefined))}
      >
        ${body}
      </ha-card>
    `;
  }

  _header(icon, title) {
    return html`<div class="header"><ha-icon icon=${icon}></ha-icon><span>${title}</span></div>`;
  }

  /** Rendered when the metric is MISconfigured (no source at all) — a silent
   *  blank card would just look broken. A configured-but-unavailable source
   *  still hides the tile. */
  _hint(icon, title, msg) {
    return html`
      <div class="rect-tile">
        ${this._header(icon, title)}
        <div class="sub hint">${msg}</div>
      </div>
    `;
  }

  /* ---- Wind: soft rounded-triangle blob --------------------------------- */

  /** Convert wind speed between units (via km/h); "bft" maps to Beaufort. */
  _convertWind(value, from, to) {
    const KMH = { "km/h": 1, "m/s": 3.6, mph: 1.609344, kn: 1.852, knots: 1.852, "ft/s": 1.09728 };
    if (!to || to === from) return { v: value, u: from };
    const kmh = value * (KMH[from] ?? 1);
    if (to === "bft") {
      const upper = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117]; // km/h bounds for Bft 0–11
      let b = upper.findIndex((t) => kmh < t);
      if (b === -1) b = 12;
      return { v: b, u: "Bft" };
    }
    return { v: kmh / (KMH[to] ?? 1), u: to };
  }

  _wind() {
    const speed = this._value("wind_speed");
    if (speed == null) return nothing;
    const srcUnit = this.config.sensor
      ? this.hass.states[this.config.sensor]?.attributes?.unit_of_measurement ?? "km/h"
      : this._weatherAttr("wind_speed_unit") ?? "km/h";
    const { v, u } = this._convertWind(speed, srcUnit, this.config.unit);
    let bearing = this.config.bearing_entity
      ? this._numRaw(this.hass.states[this.config.bearing_entity]?.state)
      : this._numRaw(this._weatherAttr("wind_bearing"));
    const from = bearing != null ? `${this.config.from_label ?? "From"} ${compass(bearing)}` : "";
    return html`
      <div class="rect-tile clip wind">
        <svg class="blob-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${windBlobPath(50, 50, 46)} class="blob-fill" />
        </svg>
        <div class="overlay">
          ${this._header("m3o:air", this.config.name ?? "Wind")}
          <div class="big">${Math.round(v)}<span class="unit"> ${u}</span></div>
          ${from ? html`<div class="sub">${from}</div>` : ""}
        </div>
      </div>
    `;
  }

  /* ---- UV: 12-lobe cookie with a colored scale dot ----------------------- */
  _uv() {
    const uv = this._value("uv_index");
    if (uv == null) return nothing;
    const level = UV_LEVELS.find((l) => uv <= l.max);
    // Scale dots along the lower inside of the cookie (Pixel-style): faint
    // markers left→right, the active level enlarged and fully opaque.
    const dots = UV_LEVELS.map((l, i) => {
      const ang = ((160 - i * 35) * Math.PI) / 180; // 160°..20° across the bottom
      const x = 50 + 33 * Math.cos(ang);
      const y = 52 + 33 * Math.sin(ang);
      const active = l === level;
      return svg`<circle cx=${x} cy=${y} r=${active ? 4.5 : 2.6}
        fill=${l.color} opacity=${active ? 1 : 0.3} />`;
    });
    return html`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${materialCookiePath(50, 52, 45, 12)} class="shape-fill" />
          ${dots}
        </svg>
        <div class="overlay">
          ${this._header("m3o:clear-day", this.config.name ?? "UV index")}
          <div class="big">${Math.round(uv)}</div>
          <div class="sub">${level.label}</div>
        </div>
      </div>
    `;
  }

  /* ---- Visibility: subtle scalloped circle ------------------------------ */
  _visibility() {
    const vis = this._value("visibility");
    if (vis == null) {
      return this.config.sensor
        ? nothing
        : this._hint("m3o:visibility", this.config.name ?? "Visibility", "Weather entity has no visibility — add a sensor");
    }
    const unit = this.config.unit ?? this._weatherAttr("visibility_unit") ?? "km";
    return html`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${materialCookiePath(50, 52, 44, 12)} class="shape-fill" />
        </svg>
        <div class="overlay">
          ${this._header("m3o:visibility", this.config.name ?? "Visibility")}
          <div class="big">${vis}<span class="unit"> ${unit}</span></div>
        </div>
      </div>
    `;
  }

  /* ---- Pressure: gauge ring ---------------------------------------------- */
  _pressure() {
    const p = this._value("pressure");
    if (p == null) return nothing;
    const unit = this.config.unit ?? this._weatherAttr("pressure_unit") ?? "hPa";
    const min = this.config.min ?? (unit === "hPa" ? 950 : 28);
    const max = this.config.max ?? (unit === "hPa" ? 1050 : 31);
    const frac = Math.min(1, Math.max(0, (p - min) / (max - min)));
    // 270° sweep starting at 7:30, ring thin and INSET from the circle edge
    // (Pixel style) rather than hugging it.
    const start = -135;
    const end = start + 270 * frac;
    const locale = this.hass?.locale?.language || navigator.language || "en";
    const value = unit === "hPa" ? Math.round(p).toLocaleString(locale) : p;
    return html`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${arcPath(50, 52, 37.5, -135, 135)} class="gauge-track thin" />
          ${frac > 0.01 ? svg`<path d=${arcPath(50, 52, 37.5, start, end)} class="gauge-fill thin" />` : ""}
        </svg>
        <div class="overlay">
          ${this._header("m3o:compress", this.config.name ?? "Pressure")}
          <div class="big small-big">${value}</div>
          <div class="sub">${unit}</div>
        </div>
      </div>
    `;
  }

  /* ---- AQI: rect tile with color band bar -------------------------------- */
  _aqi() {
    const aqi = this._value("air_quality_index");
    if (aqi == null) {
      return this.config.sensor
        ? nothing
        : this._hint("m3o:airwave", this.config.name ?? "Air quality", "Point this tile at an AQI sensor");
    }
    const band = AQI_BANDS.find((b) => aqi <= b.max);
    // Clamp so the marker never hangs off the bar's rounded ends.
    const frac = Math.min(0.96, Math.max(0.04, aqi / 300));
    return html`
      <div class="rect-tile">
        ${this._header("m3o:airwave", this.config.name ?? "Air quality")}
        <div class="big">${Math.round(aqi)}</div>
        <div class="aqi-bar">
          ${AQI_BANDS.slice(0, 5).map((b) => html`<span style="background:${b.color}"></span>`)}
          <span style="background:${AQI_BANDS[5].color}"></span>
          <i class="aqi-dot" style="left:${(frac * 100).toFixed(1)}%; border-color:${band.color}"></i>
        </div>
        <div class="sub">${band.label}</div>
      </div>
    `;
  }

  /* ---- Precipitation: rect tile ------------------------------------------ */
  _precipitation() {
    let amount = null;
    if (this.config.sensor) {
      amount = this._value();
    } else {
      const fc = this._forecast?.[0];
      amount = this._numRaw(fc?.precipitation);
    }
    if (amount == null) return nothing;
    const unit = this.config.unit ?? this._weatherAttr("precipitation_unit") ?? "mm";
    const none = this.config.none_label ?? "No precipitation expected";
    // Pixel layout: left-aligned value + subtitle, rainy glyph bottom-right.
    const subtitle = amount > 0 ? (this.config.total_label ?? "Total rain for the day") : none;
    return html`
      <div class="rect-tile precip">
        ${this._header("m3o:rainy", this.config.name ?? "Precipitation")}
        <div class="big">${amount}<span class="unit"> ${unit}</span></div>
        <div class="precip-bottom">
          <div class="sub">${subtitle}</div>
          ${amount > 0
            ? svg`<svg class="precip-glyph" viewBox="0 0 24 24">${coloredWeatherIcon("rainy")}</svg>`
            : ""}
        </div>
      </div>
    `;
  }

  /* ---- Humidity: wave fill + dew point chip ------------------------------ */
  _humidity() {
    const hum = this._value("humidity");
    if (hum == null) {
      return this.config.sensor
        ? nothing
        : this._hint("m3o:humidity-percentage", this.config.name ?? "Humidity", "Weather entity has no humidity — add a sensor");
    }
    const dew = this.config.dew_entity
      ? this._numRaw(this.hass.states[this.config.dew_entity]?.state)
      : this._numRaw(this._weatherAttr("dew_point"));
    const level = Math.min(1, Math.max(0, hum / 100));
    const y = 100 - level * 78; // wave crest height inside the tile
    const wave = this._scallopWave(y);
    return html`
      <div class="rect-tile clip">
        <svg class="wave" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d=${wave} class="wave-fill" />
        </svg>
        ${this._header("m3o:humidity-percentage", this.config.name ?? "Humidity")}
        <div class="big">${Math.round(hum)}<span class="unit">%</span></div>
        ${dew != null
          ? html`<div class="dew"><span class="dew-chip">${Math.round(dew)}°</span> ${this.config.dew_label ?? "Dew point"}</div>`
          : ""}
      </div>
    `;
  }

  /* ---- Sunrise & sunset: sun arc ------------------------------------------ */
  _sun() {
    const sunEntity = this.hass.states[this.config.sun_entity ?? "sun.sun"];
    if (!sunEntity) return nothing;
    const rising = sunEntity.attributes?.next_rising;
    const setting = sunEntity.attributes?.next_setting;
    if (!rising || !setting) return nothing;
    const locale = this.hass?.locale?.language || navigator.language || "en";
    const fmt = (iso) => new Date(iso).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
    // Sun position along the hump: fraction of daylight elapsed (only
    // meaningful while the sun is up; clamp otherwise).
    const rise = new Date(rising).getTime();
    const set = new Date(setting).getTime();
    const now = Date.now();
    let frac = 0.5;
    if (set < rise) {
      // Daytime: next_setting is today, next_rising is tomorrow.
      const dayLen = 24 * 3600 * 1000 - (rise - set);
      frac = Math.min(1, Math.max(0, 1 - (set - now) / dayLen));
    } else {
      frac = now < rise ? 0 : 1; // night
    }
    const t = frac;
    // The hump is the quadratic Bézier (4,48) → ctrl (50,-4) → (96,48); the
    // sun must sit ON it, so evaluate the same curve rather than approximating.
    const x = (1 - t) * (1 - t) * 4 + 2 * t * (1 - t) * 50 + t * t * 96;
    const y = (1 - t) * (1 - t) * 48 + 2 * t * (1 - t) * -4 + t * t * 48;
    return html`
      <div class="rect-tile sun">
        ${this._header("m3o:wb-twilight", this.config.name ?? "Sunrise & sunset")}
        <svg class="sun-arc" viewBox="0 0 100 58">
          <path d="M4 48 Q 50 -4 96 48 Z" class="arc-fill" />
          <line x1="0" y1="48" x2="100" y2="48" class="horizon" />
          ${frac > 0 && frac < 1
            ? svg`<path d=${cookiePath(x, y, 6, 9, 0.7)} fill="var(--md-sys-cust-color-weather-sun, #FFC83D)" />`
            : ""}
        </svg>
        <div class="sun-times">
          <div><ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${fmt(rising)}</div>
          <div><ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${fmt(setting)}</div>
        </div>
      </div>
    `;
  }

  /* ---- Pollen: a mini gauge per configured sensor -------------------------
     Supports numeric sensors (0..max) AND enum level sensors like the KMI
     integration (green/yellow/orange/red/purple/active/none), colored by
     level. `entities:` takes strings or {entity, label, icon}. */
  _pollen() {
    const ENUM = {
      none: { v: 0, label: "None", color: "var(--md-sys-color-outline, #9E9E9E)" },
      active: { v: 1, label: "Active", color: SCALE.green },
      green: { v: 1, label: "Low", color: SCALE.green },
      yellow: { v: 2, label: "Moderate", color: SCALE.yellow },
      orange: { v: 3, label: "High", color: SCALE.orange },
      red: { v: 4, label: "Very high", color: SCALE.red },
      purple: { v: 5, label: "Extreme", color: SCALE.purple },
    };
    const max = this.config.max ?? 4;
    let list = this.config.entities;
    if (!list?.length) {
      // Back-compat: the original grass/tree/weed slots.
      list = [
        this.config.grass_entity && { entity: this.config.grass_entity, label: this.config.grass_label ?? "Grass", icon: "mdi:grass" },
        this.config.tree_entity && { entity: this.config.tree_entity, label: this.config.tree_label ?? "Tree", icon: "mdi:tree-outline" },
        this.config.weed_entity && { entity: this.config.weed_entity, label: this.config.weed_label ?? "Weed", icon: "mdi:sprout-outline" },
      ].filter(Boolean);
    }
    const kinds = (list || [])
      .map((item) => {
        const cfg = typeof item === "string" ? { entity: item } : item;
        const st = this.hass.states[cfg.entity];
        if (!st || this._isUnavailable(st)) return null;
        const raw = String(st.state).toLowerCase();
        let frac, levelLabel, color;
        if (raw in ENUM) {
          const e = ENUM[raw];
          frac = e.v / 5;
          levelLabel = e.label;
          color = e.color;
        } else {
          const n = this._numRaw(raw);
          if (n == null) return null;
          frac = Math.min(1, Math.max(0, n / max));
          levelLabel = `${n}/${max} ${POLLEN_LEVELS[Math.min(POLLEN_LEVELS.length - 1, Math.round(frac * (POLLEN_LEVELS.length - 1)))]}`;
          color = null;
        }
        let label = cfg.label;
        if (!label) {
          // "Oostende Grass pollen" → "Grass"
          const fn = st.attributes.friendly_name || cfg.entity;
          const words = fn.replace(/pollen/i, "").trim().split(/\s+/);
          label = words[words.length - 1] || fn;
        }
        const icon = cfg.icon || st.attributes.icon || "m3o:allergies";
        return { label, icon, frac, levelLabel, color };
      })
      .filter(Boolean)
      .filter((k) => (this.config.hide_inactive ? k.frac > 0 : true))
      // Single row: sort by severity and keep only the worst offenders.
      .sort((a, b) => b.frac - a.frac)
      .slice(0, this.config.max_shown ?? 4);
    if (!kinds.length) {
      const configured = (this.config.entities?.length) || this.config.grass_entity || this.config.tree_entity || this.config.weed_entity;
      return configured
        ? nothing
        : this._hint("m3o:allergies", this.config.name ?? "Pollen", "Add pollen sensors");
    }
    // Small variant (Pixel small tile): colored level dot + species + level,
    // as a compact left-aligned list.
    if (this.config.variant === "small") {
      return html`
        <div class="rect-tile pollen-small">
          ${this._header("m3o:allergies", this.config.name ?? "Pollen")}
          <div class="pollen-rows">
            ${kinds.map((k) => html`
              <div class="pollen-row">
                <span class="pollen-dot" style="background:${k.color || "var(--wm-accent, #7bc96a)"}"></span>
                <div class="pollen-text">
                  <span class="pollen-name">${k.label}</span>
                  <span class="pollen-level">${k.levelLabel}</span>
                </div>
              </div>
            `)}
          </div>
        </div>
      `;
    }
    return html`
      <div class="rect-tile pollen">
        ${this._header("m3o:allergies", this.config.name ?? "Pollen")}
        <div class="gauges">
          ${kinds.map((k) => {
            const start = -135;
            return html`
              <div class="gauge">
                <svg viewBox="0 0 100 86">
                  <path d=${arcPath(50, 50, 40, -135, 135)} class="gauge-track" />
                  ${k.frac > 0.01
                    ? svg`<path d=${arcPath(50, 50, 40, start, start + 270 * k.frac)} class="gauge-fill" style="stroke:${k.color || "var(--wm-accent, #7bc96a)"}" />`
                    : ""}
                </svg>
                <div class="gauge-center">
                  <ha-icon icon=${k.icon}></ha-icon>
                  <span class="gauge-label">${k.label}</span>
                </div>
                <div class="gauge-sub">${k.levelLabel}</div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  getGridOptions() {
    const wide = this.config?.metric === "pollen" && this.config?.variant !== "small";
    return { columns: wide ? 8 : 4, rows: "auto", min_columns: wide ? 6 : 3 };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-weather-metric", MateriaWeatherMetric);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-weather-metric",
  name: "Materia Weather Metric",
  description: "Expressive weather metric tiles: wind, UV, AQI, pollen, precipitation, sun, visibility, humidity, pressure.",
  preview: true,
});
