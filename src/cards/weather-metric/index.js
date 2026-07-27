import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { cookiePath, arrowPath, moonPath, materialCookiePath, arcPath } from "../../utils/shapes.js";
import { coloredWeatherIcon, moonPhaseFrac } from "../weather-tile/icons.js";
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
      // Precipitation without an explicit sensor reads today's forecast;
      // any other metric must NOT hold a forecast subscription open.
      if (this.config.metric === "precipitation" && !this.config.sensor) {
        this._subscribeForecast();
      } else {
        this._unsubForecast();
      }
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
    if (this.config?.metric === "precipitation" && !this.config.sensor) this._subscribeForecast();
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
    // Allow re-subscribe after re-attach — HA re-parents cards on view edits
    // and re-layouts; a stale guard left forecasts permanently frozen.
    this._fcEntity = undefined;
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
    // weather-tile's scale so mixed grids line up. Unset stays a fixed,
    // consistent 200px regardless of grid column width (centered via auto
    // margins) — the tile should always read the same size, not stretch to
    // fill a wide section. Set size: 10 explicitly to opt back into filling.
    const sizes = ["120px", "150px", "185px", "225px", "270px", "320px", "380px", "460px", "560px", "none"];
    const size = this.config.size != null ? Math.min(10, Math.max(1, this.config.size)) : null;
    const sizeVar = size != null ? sizes[size - 1] : "200px";
    return html`
      <ha-card
        style="--wm-size:${sizeVar};${bg ? `--wm-color:${bg};` : ""}${fg ? `--wm-color-on:${fg};` : ""}${this.config.shape_color ? `--wm-shape:${this.config.shape_color};` : ""}"
        @click=${() => this._handleAction(this.config.tap_action || (this.config.sensor || this.config.entity ? { action: "more-info", entity: this.config.sensor || this.config.entity } : undefined))}
      >
        ${body}
      </ha-card>
    `;
  }

  _header(icon, title) {
    // config.icon overrides the per-metric default header icon.
    return html`<div class="header"><ha-icon icon=${this.config.icon || icon}></ha-icon><span>${title}</span></div>`;
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
    // The canonical MaterialShapes ARROW (notched base — you can SEE where it
    // points), rotated to where the wind blows toward (bearing is the
    // direction it comes FROM), like the Pixel tile. No strength modulation:
    // the number carries the magnitude.
    const flowDeg = bearing != null ? (bearing + 180) % 360 : 0; // default: point up
    const rotate = (flowDeg * Math.PI) / 180; // arrowPath points up at 0
    return html`
      <div class="rect-tile clip wind">
        <svg class="blob-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <path d=${arrowPath(50, 50, 36, rotate)} class="blob-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:weather-windy", this.config.name ?? "Wind")}
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
    // Two layers, matching pressure's construction: a plain outer circle
    // backdrop (r=45) with a smaller inset cookie (r=32) carrying the dots —
    // not one edge-to-edge cookie, which read as a different shape entirely.
    const dots = UV_LEVELS.map((l, i) => {
      const ang = ((160 - i * 35) * Math.PI) / 180; // 160°..20° across the bottom
      const x = 50 + 23.5 * Math.cos(ang);
      const y = 52 + 23.5 * Math.sin(ang);
      const active = l === level;
      return svg`<circle cx=${x} cy=${y} r=${active ? 4.5 : 2.6}
        fill=${l.color} opacity=${active ? 1 : 0.3} />`;
    });
    return html`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${materialCookiePath(50, 52, 32, 12)} class="shape-fill uv-fill" />
          ${dots}
        </svg>
        <div class="overlay">
          ${this._header("mdi:white-balance-sunny", this.config.name ?? "UV index")}
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
        : this._hint("mdi:eye-outline", this.config.name ?? "Visibility", "Weather entity has no visibility — add a sensor");
    }
    const unit = this.config.unit ?? this._weatherAttr("visibility_unit") ?? "km";
    // Same two-layer construction as UV/pressure: plain outer circle backdrop
    // (r=45) with a smaller colored inset cookie (r=32) — not one edge-to-edge
    // shape, which read as a completely different silhouette from the family.
    return html`
      <div class="shape-tile">
        <svg class="shape" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="52" r="45" class="shape-fill-c" />
          <path d=${materialCookiePath(50, 52, 32, 12)} class="shape-fill visibility-fill" />
        </svg>
        <div class="overlay">
          ${this._header("mdi:eye-outline", this.config.name ?? "Visibility")}
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
          ${this._header("mdi:gauge", this.config.name ?? "Pressure")}
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
        : this._hint("mdi:waves", this.config.name ?? "Air quality", "Point this tile at an AQI sensor");
    }
    const band = AQI_BANDS.find((b) => aqi <= b.max);
    // Clamp so the marker never hangs off the bar's rounded ends.
    const frac = Math.min(0.96, Math.max(0.04, aqi / 300));
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:waves", this.config.name ?? "Air quality")}
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
        : this._hint("mdi:water-percent", this.config.name ?? "Humidity", "Weather entity has no humidity — add a sensor");
    }
    const dew = this.config.dew_entity
      ? this._numRaw(this.hass.states[this.config.dew_entity]?.state)
      : this._numRaw(this._weatherAttr("dew_point"));
    const level = Math.min(1, Math.max(0, hum / 100));
    const y = 100 - level * 78; // wave crest height inside the tile
    const wave = this._scallopWave(y);
    return html`
      <div class="rect-tile left clip">
        <svg class="wave" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path d=${wave} class="wave-fill" />
        </svg>
        ${this._header("mdi:water-percent", this.config.name ?? "Humidity")}
        <div class="big">${Math.round(hum)}<span class="unit">%</span></div>
        ${dew != null
          ? html`<div class="dew"><span class="dew-chip">${Math.round(dew)}°</span> ${this.config.dew_label ?? "Dew point"}</div>`
          : ""}
      </div>
    `;
  }

  /* ---- Sunrise & sunset: sun arc ------------------------------------------ */
  /* ---- Sun: the full DAY & NIGHT cycle, midnight → midnight ---------------
     Sun hump above the horizon between sunrise and sunset, night troughs
     below; the marker rides the curve at the current time — the sun cookie by
     day, the MOON (with its real phase from moon_entity, e.g. sensor.moon
     from HA's built-in Moon integration) by night. */
  _sun() {
    const sunEntity = this.hass.states[this.config.sun_entity ?? "sun.sun"];
    if (!sunEntity) return nothing;
    const rising = sunEntity.attributes?.next_rising;
    const setting = sunEntity.attributes?.next_setting;
    if (!rising || !setting) return nothing;
    const locale = this.hass?.locale?.language || navigator.language || "en";
    const fmt = (iso) => new Date(iso).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
    // Local time-of-day in hours — next_* events carry (≈) today's times.
    const hourOf = (d) => d.getHours() + d.getMinutes() / 60;
    const riseH = hourOf(new Date(rising));
    const setH = hourOf(new Date(setting));
    const nowH = hourOf(new Date());
    const dayLen = (setH - riseH + 24) % 24 || 12;
    const nightLen = 24 - dayLen;
    const HZN = 24, AD = 17, AN = 9;
    const x = (h) => (h / 24) * 100;
    // Curve height at hour h: day = tall half-sine above the horizon,
    // night = shallow half-sine below (phase continues across midnight).
    const yAt = (h) => {
      const sinceRise = (h - riseH + 24) % 24;
      if (sinceRise <= dayLen) return HZN - AD * Math.sin((Math.PI * sinceRise) / dayLen);
      return HZN + AN * Math.sin((Math.PI * (sinceRise - dayLen)) / nightLen);
    };
    const seg = (from, to) => {
      const p = [];
      for (let h = from; h < to; h += 0.25) p.push(`${x(h).toFixed(2)} ${yAt(h).toFixed(2)}`);
      p.push(`${x(to).toFixed(2)} ${yAt(to).toFixed(2)}`);
      return p.join(" L");
    };
    const dayPath = `M${x(riseH).toFixed(2)} ${HZN} L${seg(riseH, setH)} Z`;
    const nightBefore = riseH > 0.01 ? `M0 ${HZN} L${seg(0, riseH)} Z` : "";
    const nightAfter = setH < 23.99 ? `M${x(setH).toFixed(2)} ${HZN} L${seg(setH, 24)} L100 ${HZN} Z` : "";
    const dayNow = (nowH - riseH + 24) % 24 <= dayLen;
    const mx = x(nowH);
    const my = yAt(nowH);
    // Moon phase → lit-region geometry. Defaults to sensor.moon_phase / the
    // legacy sensor.moon (same auto-detection as the condition glyphs) — no
    // config needed unless you want a different sensor.
    const moonEntity = this.config.moon_entity ?? (this.hass.states["sensor.moon_phase"] ? "sensor.moon_phase" : "sensor.moon");
    const moonSt = this.hass.states[moonEntity];
    const phaseFrac = moonPhaseFrac(this.hass, this.config.moon_entity);
    const phase = phaseFrac ?? 0.5;
    return html`
      <div class="rect-tile sun">
        ${this._header("mdi:weather-sunset", this.config.name ?? "Sunrise & sunset")}
        <svg class="sun-arc cycle" viewBox="0 0 100 40">
          <path d=${dayPath} class="arc-fill" />
          ${nightBefore ? svg`<path d=${nightBefore} class="arc-night" />` : ""}
          ${nightAfter ? svg`<path d=${nightAfter} class="arc-night" />` : ""}
          <line x1="0" y1=${HZN} x2="100" y2=${HZN} class="horizon" />
          ${dayNow
            ? svg`<path d=${cookiePath(mx, my, 5.5, 9, 0.6)} fill="var(--md-sys-cust-color-weather-sun, #FFC83D)" />`
            : svg`
                <circle cx=${mx.toFixed(2)} cy=${my.toFixed(2)} r="4.6" class="moon-dark" />
                ${moonPath(mx, my, 4.6, phase) ? svg`<path d=${moonPath(mx, my, 4.6, phase)} class="moon-lit" />` : ""}
              `}
        </svg>
        <div class="sun-times">
          <div><ha-icon icon="mdi:weather-sunset-up"></ha-icon> ${fmt(rising)}</div>
          <div><ha-icon icon="mdi:weather-sunset-down"></ha-icon> ${fmt(setting)}</div>
          ${moonSt && phaseFrac != null ? html`<div class="moon-row"><ha-icon icon=${moonSt.attributes?.icon || `mdi:moon-${String(moonSt.state).replace(/_/g, "-").replace("-moon", "")}`}></ha-icon> ${this.hass.formatEntityState?.(moonSt) ?? moonSt.state}</div>` : ""}
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
        const icon = cfg.icon || st.attributes.icon || "m3of:allergy";
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
        : this._hint("m3of:allergy", this.config.name ?? "Pollen", "Add pollen sensors");
    }
    // Small variant (Pixel small tile): colored level dot + species + level,
    // as a compact left-aligned list.
    if (this.config.variant === "small") {
      return html`
        <div class="rect-tile pollen-small">
          ${this._header("m3of:allergy", this.config.name ?? "Pollen")}
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
        ${this._header("m3of:allergy", this.config.name ?? "Pollen")}
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
                </div>
                <div class="gauge-sub">
                  <span class="gauge-name">${k.label}</span>
                  <span>${k.levelLabel}</span>
                </div>
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
