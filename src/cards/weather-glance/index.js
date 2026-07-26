import { LitElement, html, svg } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { coloredWeatherIcon, moonPhaseFrac } from "../weather-tile/icons.js";
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
    return { entity, metrics: ["minmax"] };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { metrics: ["minmax"], ...config };
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

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n) : null;
  }

  /** One metric entry → { text, sev (0–4 severity), icon } or null (no data).
   *  Entries are strings ("uv") or objects ({ type, icon, entity, unit,
   *  label, severity }) — "sensor" reads any entity you point it at. */
  _metricData(entry, stateObj) {
    const a = stateObj?.attributes || {};
    const fc = this._forecast?.[0] || a.forecast?.[0];
    const DEFAULT_ICONS = {
      minmax: "mdi:thermometer",
      wind: "mdi:weather-windy",
      humidity: "mdi:water-percent",
      uv: "mdi:white-balance-sunny",
      precipitation: "m3o:rainy",
      pressure: "mdi:gauge",
      pollen: "m3of:allergy",
      aqi: "mdi:waves",
      sensor: "mdi:information-outline",
    };
    let text = null;
    let sev = 0;
    switch (entry.type) {
      case "condition": {
        const c = stateObj?.state ?? "";
        text = CONDITION_LABELS[c] || this._capitalize(String(c).replace(/-|_/g, " "));
        if (/lightning/.test(c)) sev = 3;
        else if (/pouring|snowy|hail/.test(c)) sev = 2;
        else if (/rainy|fog|windy/.test(c)) sev = 1;
        break;
      }
      case "minmax": {
        const hi = this._num(fc?.temperature);
        const lo = this._num(fc?.templow);
        if (hi == null && lo == null) return null;
        text = `${hi != null ? `${hi}°` : "—"} ${lo != null ? `${lo}°` : "—"}`;
        break;
      }
      case "wind": {
        const s = this._num(a.wind_speed);
        if (s == null) return null;
        const b = this._num(a.wind_bearing);
        text = `${s} ${a.wind_speed_unit ?? "km/h"}${b != null ? ` ${compass(b)}` : ""}`;
        sev = s >= 88 ? 4 : s >= 62 ? 3 : s >= 39 ? 2 : s >= 20 ? 1 : 0;
        break;
      }
      case "humidity": {
        const h = this._num(a.humidity);
        if (h == null) return null;
        text = `${h}%`;
        sev = h >= 85 || h <= 20 ? 2 : h >= 70 || h <= 30 ? 1 : 0;
        break;
      }
      case "uv": {
        const u = this._num(a.uv_index);
        if (u == null) return null;
        text = `UV ${u}`;
        sev = u >= 11 ? 4 : u >= 8 ? 3 : u >= 6 ? 2 : u >= 3 ? 1 : 0;
        break;
      }
      case "precipitation": {
        const p = fc?.precipitation;
        const n = p == null ? null : Number(p);
        if (n == null || !Number.isFinite(n)) return null;
        // Labeled — a bare "2 mm" in a metric line reads as nothing in particular.
        text = `${entry.label ?? "Rain"} ${n} ${a.precipitation_unit ?? "mm"}`;
        sev = n >= 10 ? 3 : n >= 2 ? 2 : n > 0 ? 1 : 0;
        break;
      }
      case "pressure": {
        const p = this._num(a.pressure);
        if (p == null) return null;
        text = `${p} ${a.pressure_unit ?? "hPa"}`;
        sev = Math.abs(p - 1013) >= 25 ? 2 : Math.abs(p - 1013) >= 15 ? 1 : 0;
        break;
      }
      case "pollen": {
        // Worst species across the configured pollen sensors (KMI enum levels).
        const LEVELS = { none: 0, active: 1, green: 1, yellow: 2, orange: 3, red: 4, purple: 5 };
        const LABELS = ["None", "Low", "Low", "Moderate", "High", "Very high", "Extreme"];
        const list = entry.entities || this.config.pollen_entities || [];
        let worst = null;
        for (const eid of list) {
          const st = this.hass.states[eid];
          if (!st || this._isUnavailable(st)) continue;
          const v = LEVELS[String(st.state).toLowerCase()] ?? this._num(st.state) ?? 0;
          if (!worst || v > worst.v) {
            const fn = st.attributes.friendly_name || eid;
            const words = fn.replace(/pollen/i, "").trim().split(/\s+/);
            worst = { v, label: words[words.length - 1] || fn };
          }
        }
        if (!worst) return null;
        // Labeled so the subtitle reads "Pollen Grass High", not a bare
        // species name floating in the line.
        const prefix = entry.label ?? this.config.pollen_label ?? "Pollen";
        text = worst.v === 0
          ? (this.config.no_pollen_label ?? `${prefix} none`)
          : `${prefix} ${worst.label} ${LABELS[worst.v + 1] ?? worst.v}`;
        sev = worst.v;
        break;
      }
      case "aqi": {
        const eid = entry.entity ?? this.config.aqi_entity;
        const st = eid ? this.hass.states[eid] : null;
        if (!st || this._isUnavailable(st)) return null;
        const n = this._num(st.state);
        if (n == null) return null;
        text = `AQI ${n}`;
        sev = n > 200 ? 4 : n > 150 ? 3 : n > 100 ? 2 : n > 50 ? 1 : 0;
        break;
      }
      case "sensor": {
        const st = entry.entity ? this.hass.states[entry.entity] : null;
        if (!st || this._isUnavailable(st)) return null;
        const unit = entry.unit ?? st.attributes.unit_of_measurement ?? "";
        text = `${entry.label ? `${entry.label} ` : ""}${st.state}${unit ? ` ${unit}` : ""}`;
        break;
      }
      default:
        return null;
    }
    if (entry.severity != null) sev = Number(entry.severity) || 0;
    const icon = entry.icon
      ?? (this.config.show_metric_icons ? DEFAULT_ICONS[entry.type] : null);
    return { text, sev, icon, type: entry.type };
  }

  /** Subtitle metrics: everything configured EXCEPT condition (which always
   *  owns the title line), severity-sorted with the configurable `priority`
   *  tie-break (e.g. [precipitation, pollen, aqi]). */
  _metricItems(stateObj) {
    const order = this.config.priority ?? ["precipitation", "pollen", "aqi"];
    const weight = (t) => {
      const i = order.indexOf(t);
      return i === -1 ? 0 : (order.length - i) / (order.length + 1);
    };
    const entries = (this.config.metrics || [])
      .map((e) => (typeof e === "string" ? { type: e } : e))
      .filter((e) => e.type !== "condition"); // condition is the title, always
    const items = entries.map((e) => this._metricData(e, stateObj)).filter(Boolean);
    if (this.config.sort_by_severity) {
      items.sort((x, y) => (y.sev + weight(y.type)) - (x.sev + weight(x.type)));
    }
    return items;
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
    // Title is ALWAYS the condition (alert overrides); everything else is
    // secondary and lives on the subtitle line.
    const first = alert ? null : this._metricData({ type: "condition" }, stateObj);
    const cap = this.config.max_metrics ?? Infinity;
    const rest = this._metricItems(stateObj).slice(0, cap);

    const bg = this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;
    // Navigation affordance: a chevron on the right edge when the pill routes
    // somewhere (or force with show_chevron).
    const chevron = this.config.show_chevron
      ?? (this.config.tap_action?.action === "navigate");

    const metricSpan = (i) => html`<span class="m">
      ${i.icon ? html`<ha-icon .icon=${i.icon}></ha-icon>` : ""}${i.text}
    </span>`;

    return html`
      <ha-card>
        <div
          class="glance ${unavailable ? "unavailable" : ""}"
          style="${bg ? `--wg-bg:${bg};` : ""}${fg ? `--wg-fg:${fg};` : ""}"
          @click=${() => this._handleAction(this.config.tap_action || { action: "more-info" })}
        >
          <svg class="glyph" viewBox="0 0 24 24">${coloredWeatherIcon(condition, moonPhaseFrac(this.hass, this.config.moon_entity))}</svg>
          <div class="mid">
            ${alert || first
              ? html`<div class="line1">
                  ${alert ? html`<ha-icon icon="mdi:alert-outline"></ha-icon>` : ""}
                  ${alert ? html`<span>${alert}</span>` : metricSpan(first)}
                </div>`
              : ""}
            ${rest.length
              ? html`<div class="line2">
                  ${rest.map((i, n) => html`${n ? html`<span class="dot">·</span>` : ""}${metricSpan(i)}`)}
                </div>`
              : ""}
          </div>
          <div class="now">${unavailable || tempNum == null ? "—" : `${tempNum}°`}</div>
          ${chevron ? html`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>` : ""}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: 1.5 }; // same cell height as materia-card
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
