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

/* Soft-3D shading (Google Weather / Breezy look): each glyph fills with a
   gradient built from its harmonized token — highlight toward the top-left,
   deeper shade at the lower edge — so the icons keep tinting with the theme.
   Every glyph gets UNIQUE gradient ids: url(#id) resolves to the first match
   in the tree, so shared ids break when many glyphs live in one shadow root
   (forecast rows) and in some WebKit builds — unique ids always resolve to
   the glyph's own <defs>. */
let uidCounter = 0;

function shadeDefs(uid) {
  return svg`<defs>
    <radialGradient id="wxSunG-${uid}" cx="38%" cy="30%" r="80%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${SUN} 55%, #FFF4CF)" />
      <stop offset="55%" stop-color=${SUN} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${SUN} 72%, #B85C00)" />
    </radialGradient>
    <linearGradient id="wxCloudG-${uid}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${CLOUD} 30%, #FFFFFF)" />
      <stop offset="70%" stop-color=${CLOUD} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${CLOUD} 78%, #8B94A5)" />
    </linearGradient>
    <linearGradient id="wxCloudDkG-${uid}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="color-mix(in srgb, ${CLOUD_DK} 45%, #FFFFFF)" />
      <stop offset="70%" stop-color=${CLOUD_DK} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${CLOUD_DK} 72%, #5A6474)" />
    </linearGradient>
    <radialGradient id="wxMoonG-${uid}" cx="35%" cy="28%" r="85%">
      <stop offset="0%" stop-color="color-mix(in srgb, ${MOON} 45%, #FFFFFF)" />
      <stop offset="60%" stop-color=${MOON} />
      <stop offset="100%" stop-color="color-mix(in srgb, ${MOON} 62%, #4A5AB8)" />
    </radialGradient>
  </defs>`;
}

/** Per-invocation gradient fill urls (see uid note above). */
function fillsFor(uid) {
  return {
    sun: `url(#wxSunG-${uid})`,
    cloud: `url(#wxCloudG-${uid})`,
    cloudDk: `url(#wxCloudDkG-${uid})`,
    moon: `url(#wxMoonG-${uid})`,
  };
}

function sun(cx, cy, r, fill) {
  // 9-lobe "cookie": a smooth polar-cosine scallop — r = R + A·cos(9θ) — which
  // has ROUNDED peaks AND rounded valleys (unlike a rounded-star, whose inner
  // vertices make sharp notches). Sampled densely and run through a closed
  // Catmull-Rom → cubic Bézier spline so it's soft at any scale.
  const lobes = 9;
  const amp = r * 0.1; // bump depth as a fraction of the radius
  const n = lobes * 8;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const rad = r + amp * Math.cos(lobes * t);
    pts.push([cx + rad * Math.cos(t), cy + rad * Math.sin(t)]);
  }
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  return svg`<path d=${d + "Z"} fill=${fill} />`;
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
  sunny: (f) => sun(12, 12, 7.5, f.sun),
  clear: (f) => sun(12, 12, 7.5, f.sun),
  "clear-night": (f) =>
    svg`<path d="M17 14.5 A7 7 0 1 1 10.5 5 A5.5 5.5 0 0 0 17 14.5 Z" fill=${f.moon} />`,
  partlycloudy: (f) => svg`${sun(12, 8, 5.2, f.sun)}${cloud(10, 15, 0.85, f.cloud)}`,
  partly_cloudy: (f) => svg`${sun(12, 8, 5.2, f.sun)}${cloud(10, 15, 0.85, f.cloud)}`,
  cloudy: (f) => cloud(12, 12, 1.1, f.cloudDk),
  rainy: (f) => svg`${cloud(12, 10, 1, f.cloudDk)}${drops(RAIN, [8, 12, 16], 17)}`,
  pouring: (f) => svg`${cloud(12, 9.5, 1, f.cloudDk)}${drops(RAIN, [7, 10, 13, 16], 16.5)}`,
  snowy: (f) => svg`${cloud(12, 10, 1, f.cloud)}${flakes([8, 12, 16], 18)}`,
  "snowy-rainy": (f) => svg`${cloud(12, 10, 1, f.cloud)}${drops(RAIN, [9, 15], 17)}${flakes([12], 18)}`,
  fog: (f) =>
    svg`${cloud(12, 9, 0.95, f.cloudDk)}<g stroke=${FOG} stroke-width="1.8" stroke-linecap="round">
      <line x1="6" y1="17" x2="18" y2="17" /><line x1="7.5" y1="20" x2="16.5" y2="20" /></g>`,
  hail: (f) => svg`${cloud(12, 10, 1, f.cloudDk)}${flakes([8, 12, 16], 18)}`,
  lightning: (f) =>
    svg`${cloud(12, 10, 1, f.cloudDk)}<path d="M12 14 l-2.5 5 h2 l-1 4 4.5-6.5 h-2.2 l1.5-2.5 z" fill=${BOLT} />`,
  "lightning-rainy": (f) =>
    svg`${cloud(12, 9.5, 1, f.cloudDk)}${drops(RAIN, [8, 16], 17)}<path d="M12 14 l-2 4 h1.8 l-0.8 3.5 4-5.5 h-2 l1.3-2 z" fill=${BOLT} />`,
  windy: () =>
    svg`<g stroke=${CLOUD_DK} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,
  "windy-variant": () =>
    svg`<g stroke=${CLOUD_DK} stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M4 9 h11 a2.5 2.5 0 1 0-2.5-2.5" />
      <path d="M4 14 h14 a2.5 2.5 0 1 1-2.5 2.5" /></g>`,
  exceptional: (f) => cloud(12, 12, 1.1, f.cloudDk),
};

/** Return the colored SVG group for a weather condition (falls back to cloud).
 *  Prepends the shared shading gradients so every glyph is soft-3D. */
export function coloredWeatherIcon(condition) {
  const fn = ICONS[condition] || ICONS.cloudy;
  const uid = ++uidCounter;
  return svg`${shadeDefs(uid)}${fn(fillsFor(uid))}`;
}
