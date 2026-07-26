import { html, svg } from "lit";
import { coloredWeatherIcon } from "../weather-tile/icons.js";

/** Round while treating unknown/unavailable/empty as missing (null), never 0. */
export function numOrNull(v) {
  if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

/**
 * Shared hourly item strip: temp, colored glyph, precipitation chance, hour.
 * Used by the standalone hourly card and the daily card's expanded detail.
 */
export function hourlyItems(hours, { locale = "en", showPrecip = true, minPrecip = 10 } = {}) {
  return hours.map((h) => {
    const temp = numOrNull(h.temperature);
    const precip = numOrNull(h.precipitation_probability);
    const d = new Date(h.datetime);
    const time = Number.isNaN(d.getTime())
      ? ""
      : d.toLocaleTimeString(locale, { hour: "numeric" });
    return html`
      <div class="hour">
        <span class="h-temp">${temp != null ? `${temp}°` : "—"}</span>
        <svg class="h-glyph" viewBox="0 0 24 24">${coloredWeatherIcon(h.condition)}</svg>
        ${showPrecip && precip != null && precip >= minPrecip
          ? html`<span class="h-precip">${precip}%</span>`
          : html`<span class="h-precip empty"></span>`}
        <span class="h-time">${time}</span>
      </div>
    `;
  });
}
