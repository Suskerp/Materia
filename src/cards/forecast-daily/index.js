import { LitElement, html, svg } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { coloredWeatherIcon } from "../weather-tile/icons.js";
import { hourlyItems } from "../forecast-hourly/row.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Pixel-style daily forecast: a horizontally scrollable row of stadium pills,
 * each with high/low, a colored condition glyph, precipitation chance and the
 * weekday. Tapping a pill selects (highlights) it.
 */
class MateriaForecastDaily extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _forecast: { state: true },
    _hourly: { state: true },
    _selected: { state: true },
    _expanded: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-forecast-daily-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("weather.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { ...config };
    this._fcEntity = undefined; // (re)subscribe forecast for the (new) entity
    this._selected = 0;
    this._expanded = false;
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._subscribeForecast();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscribeForecast(); // re-subscribe after re-attach
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
    this._forecast = null;
    this._hourly = [];
    this._hourlyByDay = new Map();
    const daily = this.hass.connection.subscribeMessage(
      (ev) => {
        this._forecast = ev?.forecast || [];
      },
      { type: "weather/subscribe_forecast", forecast_type: "daily", entity_id: entity }
    );
    daily.catch(() => {}); // entity may not support forecasts — fall back gracefully
    this._fcUnsubs = [daily];
    if (this.config.show_hourly !== false) {
      // Hourly detail for the tapped day. Integrations with a short hourly
      // horizon (e.g. KMI ~3 days) simply have no hours for later days.
      const hourly = this.hass.connection.subscribeMessage(
        (ev) => {
          this._hourly = ev?.forecast || [];
          // Bucket ONCE per push (not per pill per render) using the HA
          // instance's timezone — browser-local toDateString misassigns
          // hours for any viewer in a different timezone.
          const map = new Map();
          for (const h of this._hourly) {
            const key = this._dayKey(h.datetime);
            if (!key) continue;
            const arr = map.get(key) || [];
            if (arr.length < 24) arr.push(h);
            map.set(key, arr);
          }
          this._hourlyByDay = map;
        },
        { type: "weather/subscribe_forecast", forecast_type: "hourly", entity_id: entity }
      );
      hourly.catch(() => {});
      this._fcUnsubs.push(hourly);
    }
  }

  _unsubForecast() {
    for (const p of this._fcUnsubs || []) {
      p.then((u) => u && u()).catch(() => {});
    }
    this._fcUnsubs = null;
    // Allow re-subscribe after re-attach — a stale guard froze forecasts.
    this._fcEntity = undefined;
  }

  /** Calendar-day key (YYYY-MM-DD) in the HA instance's timezone. */
  _dayKey(datetime) {
    const tz = this.hass?.config?.time_zone;
    if (!this._dayFmt || this._dayFmtTz !== tz) {
      this._dayFmtTz = tz;
      try {
        this._dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
      } catch {
        this._dayFmt = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
      }
    }
    const d = new Date(datetime);
    return Number.isNaN(d.getTime()) ? "" : this._dayFmt.format(d);
  }

  /** Hourly entries falling on the same calendar day (HA timezone) as `day`. */
  _hoursFor(day) {
    if (!day?.datetime || !this._hourlyByDay?.size) return [];
    return this._hourlyByDay.get(this._dayKey(day.datetime)) || [];
  }

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.round(n) : null;
  }

  _dayLabel(datetime, index) {
    const d = new Date(datetime);
    if (Number.isNaN(d.getTime())) return "";
    const today = new Date();
    if (index === 0 && this._dayKey(datetime) === this._dayKey(today)) {
      return this.config.today_label ?? "Today";
    }
    const locale = this.hass?.locale?.language || navigator.language || "en";
    return d.toLocaleDateString(locale, { weekday: "short" });
  }

  /* Mouse drag-to-scroll: overflow-x only pans natively for touch/trackpad,
     so grab-and-drag with a mouse must be wired up by hand. A real drag also
     suppresses the click so letting go doesn't select a pill. */
  _onPointerDown(e) {
    if (e.pointerType !== "mouse") return; // touch pans natively
    const row = e.currentTarget;
    this._dragStartX = e.clientX;
    this._dragStartScroll = row.scrollLeft;
    this._didDrag = false;
    this._dragPointerId = e.pointerId;
    // Do NOT capture here — capturing on pointerdown retargets the eventual
    // click to the row, which would swallow the pill taps.
  }

  _onPointerMove(e) {
    if (this._dragStartX == null) return;
    const dx = e.clientX - this._dragStartX;
    if (!this._didDrag && Math.abs(dx) > 4) {
      this._didDrag = true;
      e.currentTarget.setPointerCapture(this._dragPointerId);
    }
    if (this._didDrag) e.currentTarget.scrollLeft = this._dragStartScroll - dx;
  }

  _onPointerUp(e) {
    if (this._dragStartX == null) return;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    this._dragStartX = null;
    // _didDrag stays set until the click fires (click comes after pointerup).
    setTimeout(() => { this._didDrag = false; }, 0);
  }

  _select(i, day) {
    if (this._didDrag) return; // it was a scroll, not a tap
    // Re-tapping the selected day folds the hourly detail; a new day opens it.
    this._expanded = i === this._selected ? !this._expanded : true;
    this._selected = i;
    // Let dashboards react to the selection (e.g. a detail card) if they want.
    this.dispatchEvent(new CustomEvent("materia-forecast-day-selected", {
      detail: { index: i, day },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    // ?.length — the subscribed array starts empty, and an empty array is
    // truthy, which used to permanently mask the legacy attribute fallback.
    const days = (this._forecast?.length ? this._forecast : stateObj?.attributes?.forecast || [])
      .slice(0, this.config.days ?? 10);
    if (!days.length) return html``;

    const showPrecip = this.config.show_precipitation !== false;
    const minPrecip = this.config.min_precipitation ?? 10; // hide noise below 10%

    // Hourly detail for the selected day — empty beyond the integration's
    // hourly horizon, in which case the panel just stays closed.
    const selDay = days[this._selected];
    const hours = this.config.show_hourly !== false && this._expanded && selDay
      ? this._hoursFor(selDay)
      : [];
    const open = this._expanded && hours.length > 0;
    const locale = this.hass?.locale?.language || navigator.language || "en";

    return html`
      <ha-card>
        <div
          class="row ${unavailable ? "unavailable" : ""}"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${days.map((day, i) => {
            const hi = this._num(day.temperature);
            const lo = this._num(day.templow);
            const precip = this._num(day.precipitation_probability);
            const selected = i === this._selected;
            // Days beyond the hourly horizon (KMI ≈ 3 days) have nothing to
            // expand — render them inert instead of teasing a dead tap.
            const expandable = this.config.show_hourly !== false && this._hoursFor(day).length > 0;
            return html`
              <button
                class="pill ${selected ? "selected" : ""} ${expandable ? "" : "static"}"
                @click=${expandable ? () => this._select(i, day) : undefined}
              >
                <span class="hi">${hi != null ? `${hi}°` : "—"}</span>
                <span class="lo">${lo != null ? `${lo}°` : "—"}</span>
                <svg class="glyph" viewBox="0 0 24 24">${coloredWeatherIcon(day.condition)}</svg>
                ${showPrecip && precip != null && precip >= minPrecip
                  ? html`<span class="precip">${precip}%</span>`
                  : html`<span class="precip empty"></span>`}
                <span class="day">${this._dayLabel(day.datetime, i)}</span>
              </button>
            `;
          })}
        </div>
        <div class="detail ${open ? "open" : ""}">
          <div class="detail-inner">
            <div
              class="hours"
              @pointerdown=${this._onPointerDown}
              @pointermove=${this._onPointerMove}
              @pointerup=${this._onPointerUp}
              @pointercancel=${this._onPointerUp}
            >
              ${open ? hourlyItems(hours, { locale, showPrecip, minPrecip }) : ""}
            </div>
          </div>
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

customElements.define("materia-forecast-daily", MateriaForecastDaily);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-forecast-daily",
  name: "Materia Forecast Daily",
  description: "Pixel-style daily forecast pill row with colored glyphs and precipitation chance.",
  preview: true,
});
