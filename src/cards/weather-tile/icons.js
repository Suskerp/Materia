import { svg } from "lit";

/**
 * Colored weather glyphs (Pixel-widget style) drawn as inline SVG in a 24×24
 * box so they tint themselves rather than inheriting a single icon color.
 */

// Harmonized custom colors (material-you-utilities, see custom_colors.json),
// with the raw source hex as a fallback when the tokens aren't injected.
const SUN = "var(--md-sys-cust-color-weather-sun, #FFC83D)";
const CLOUD = "var(--md-sys-cust-color-weather-cloud, #E6EAF0)";
const CLOUD_DK = "var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)";
const RAIN = "var(--md-sys-cust-color-weather-rain, #5FA8F5)";
const SNOW = "var(--md-sys-cust-color-weather-snow, #FFFFFF)";
const BOLT = "var(--md-sys-cust-color-weather-sun, #FFC83D)";
const MOON = "var(--md-sys-cust-color-weather-moon, #DCE3F7)";
const FOG = "var(--md-sys-cust-color-weather-cloud-dark, #C7CEDA)";

function sun(cx, cy, r) {
  // Plain disc — no rays.
  return svg`<circle cx=${cx} cy=${cy} r=${r} fill=${SUN} />`;
}

function cloud(cx, cy, s, fill) {
  return svg`
    <g fill=${fill} transform=${`translate(${cx} ${cy}) scale(${s})`}>
      <circle cx="-4" cy="1" r="4" />
      <circle cx="1" cy="-1.5" r="5" />
      <circle cx="5" cy="1.5" r="3.6" />
      <rect x="-6.2" y="1.2" width="13.4" height="5" rx="2.6" />
    </g>`;
}

function drops(color, xs, y) {
  return svg`<g stroke=${color} stroke-width="1.8" stroke-linecap="round">
    ${xs.map((x) => svg`<line x1=${x} y1=${y} x2=${x - 1.5} y2=${y + 3.5} />`)}
  </g>`;
}

function flakes(xs, y) {
  return svg`<g fill=${SNOW}>
    ${xs.map((x) => svg`<circle cx=${x} cy=${y} r="1.2" />`)}
  </g>`;
}

const ICONS = {
  sunny: () => sun(12, 12, 7.5),
  clear: () => sun(12, 12, 7.5),
  "clear-night": () =>
    svg`<path d="M17 14.5 A7 7 0 1 1 10.5 5 A5.5 5.5 0 0 0 17 14.5 Z" fill=${MOON} />`,
  partlycloudy: () => svg`${sun(12, 8, 5.2)}${cloud(10, 15, 0.85, CLOUD)}`,
  partly_cloudy: () => svg`${sun(12, 8, 5.2)}${cloud(10, 15, 0.85, CLOUD)}`,
  cloudy: () => cloud(12, 12, 1.1, CLOUD_DK),
  rainy: () => svg`${cloud(12, 10, 1, CLOUD_DK)}${drops(RAIN, [8, 12, 16], 17)}`,
  pouring: () => svg`${cloud(12, 9.5, 1, CLOUD_DK)}${drops(RAIN, [7, 10, 13, 16], 16.5)}`,
  snowy: () => svg`${cloud(12, 10, 1, CLOUD)}${flakes([8, 12, 16], 18)}`,
  "snowy-rainy": () => svg`${cloud(12, 10, 1, CLOUD)}${drops(RAIN, [9, 15], 17)}${flakes([12], 18)}`,
  fog: () =>
    svg`${cloud(12, 9, 0.95, FOG)}<g stroke=${FOG} stroke-width="1.8" stroke-linecap="round">
      <line x1="6" y1="17" x2="18" y2="17" /><line x1="7.5" y1="20" x2="16.5" y2="20" /></g>`,
  hail: () => svg`${cloud(12, 10, 1, CLOUD_DK)}${flakes([8, 12, 16], 18)}`,
  lightning: () =>
    svg`${cloud(12, 10, 1, CLOUD_DK)}<path d="M12 14 l-2.5 5 h2 l-1 4 4.5-6.5 h-2.2 l1.5-2.5 z" fill=${BOLT} />`,
  "lightning-rainy": () =>
    svg`${cloud(12, 9.5, 1, CLOUD_DK)}${drops(RAIN, [8, 16], 17)}<path d="M12 14 l-2 4 h1.8 l-0.8 3.5 4-5.5 h-2 l1.3-2 z" fill=${BOLT} />`,
  windy: () =>
    svg`<g stroke=${CLOUD_DK} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,
  "windy-variant": () =>
    svg`<g stroke=${CLOUD_DK} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,
  exceptional: () => cloud(12, 12, 1.1, CLOUD_DK),
};

/** Return the colored SVG group for a weather condition (falls back to cloud). */
export function coloredWeatherIcon(condition) {
  const fn = ICONS[condition] || ICONS.cloudy;
  return fn();
}

/** Every condition key — used by the card's icon-cycle alignment preview. */
export const WEATHER_CONDITIONS = Object.keys(ICONS);
