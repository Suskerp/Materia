/**
 * Album-art colours, computed in the browser exactly like the Material You
 * theme (Suskerp/material-you-utilities-custom-harmonization): the cover is
 * drawn onto a 128 px canvas, QuantizerCelebi (128 colours) + Score picks the
 * source colour, then the user's own scheme (variant, contrast, spec,
 * platform from the material_you_* helpers) is built in light or dark.
 *
 * The library is the same nightly build the theme ships, so a cover yields
 * the same colours here as it would as the theme's seed.
 */
import {
  QuantizerCelebi,
  Score,
  Hct,
  hexFromArgb,
  argbFromRgb,
  SchemeTonalSpot,
  SchemeExpressive,
  SchemeVibrant,
  SchemeContent,
  SchemeFidelity,
  SchemeFruitSalad,
  SchemeMonochrome,
  SchemeNeutral,
  SchemeRainbow,
} from "@material/material-color-utilities";
import { themeSettings, schemeKey } from "./art-settings.js";

export { themeSettings };

const SCHEMES = {
  tonalspot: SchemeTonalSpot,
  expressive: SchemeExpressive,
  vibrant: SchemeVibrant,
  content: SchemeContent,
  fidelity: SchemeFidelity,
  fruitsalad: SchemeFruitSalad,
  monochrome: SchemeMonochrome,
  neutral: SchemeNeutral,
  rainbow: SchemeRainbow,
};

/** --md-sys-color-<token> -> DynamicScheme property. */
export const ART_TOKENS = {
  primary: "primary",
  "on-primary": "onPrimary",
  "primary-container": "primaryContainer",
  "on-primary-container": "onPrimaryContainer",
  "inverse-primary": "inversePrimary",
  secondary: "secondary",
  "on-secondary": "onSecondary",
  "secondary-container": "secondaryContainer",
  "on-secondary-container": "onSecondaryContainer",
  tertiary: "tertiary",
  "on-tertiary": "onTertiary",
  "tertiary-container": "tertiaryContainer",
  "on-tertiary-container": "onTertiaryContainer",
  error: "error",
  "on-error": "onError",
  "error-container": "errorContainer",
  "on-error-container": "onErrorContainer",
  surface: "surface",
  "on-surface": "onSurface",
  "surface-variant": "surfaceVariant",
  "on-surface-variant": "onSurfaceVariant",
  "surface-dim": "surfaceDim",
  "surface-bright": "surfaceBright",
  "surface-container-lowest": "surfaceContainerLowest",
  "surface-container-low": "surfaceContainerLow",
  "surface-container": "surfaceContainer",
  "surface-container-high": "surfaceContainerHigh",
  "surface-container-highest": "surfaceContainerHighest",
  "inverse-surface": "inverseSurface",
  "inverse-on-surface": "inverseOnSurface",
  outline: "outline",
  "outline-variant": "outlineVariant",
};

/** HA variables an art scope also sets, so core cards inside follow the cover. */
export const ART_HA_VARS = {
  "--primary-color": "primary",
  "--accent-color": "primary",
  "--primary-text-color": "on-surface",
  "--secondary-text-color": "on-surface-variant",
};

/** Every custom property an art scope may set (copied into sheets it opens). */
export const ART_VARIABLES = [
  ...Object.keys(ART_TOKENS).map((t) => `--md-sys-color-${t}`),
  ...Object.keys(ART_HA_VARS),
];

// The JS quantizer seeds its clusters with Math.random(); seed it like the
// Java/Dart ports do (0x42688) so every device picks the same colour.
function seeded(fn) {
  let a = 0x42688;
  const native = Math.random;
  Math.random = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  try {
    return fn();
  } finally {
    Math.random = native;
  }
}

const sourceCache = new Map(); // image url -> Promise<argb | null>

/** Source colour of an image (null when it has none, e.g. a black/white logo). */
export function sourceColor(url) {
  if (!sourceCache.has(url)) {
    if (sourceCache.size > 40) sourceCache.delete(sourceCache.keys().next().value);
    sourceCache.set(
      url,
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async";
        img.onload = () => {
          try {
            const n = 128;
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = n;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, n, n);
            const data = ctx.getImageData(0, 0, n, n).data;
            const px = [];
            for (let i = 0; i < data.length; i += 4) {
              if (data[i + 3] < 255) continue;
              px.push(argbFromRgb(data[i], data[i + 1], data[i + 2]));
            }
            const ranked = seeded(() =>
              Score.score(QuantizerCelebi.quantize(px, 128), { desired: 4, fallbackColorARGB: 0, filter: true })
            ).filter((c) => c !== 0);
            resolve(ranked[0] ?? null);
          } catch (_) {
            resolve(null); // tainted canvas or decode error: keep the theme
          }
        };
        img.onerror = () => resolve(null);
        img.src = url;
      })
    );
  }
  return sourceCache.get(url);
}

const schemeCache = new Map();

/** {token: hex} for an image in the user's scheme, or null. */
export async function artPalette(url, settings, dark) {
  const source = await sourceColor(url);
  if (source == null) return null;
  const key = `${source}|${schemeKey(settings.scheme)}|${settings.contrast}|${settings.spec}|${settings.platform}|${dark}`;
  if (!schemeCache.has(key)) {
    if (schemeCache.size > 80) schemeCache.delete(schemeCache.keys().next().value);
    const Cls = SCHEMES[schemeKey(settings.scheme)] ?? SchemeTonalSpot;
    const s = new Cls(Hct.fromInt(source), dark, settings.contrast, settings.spec, settings.platform);
    const out = {};
    for (const [token, prop] of Object.entries(ART_TOKENS)) out[token] = hexFromArgb(s[prop]);
    schemeCache.set(key, out);
  }
  return schemeCache.get(key);
}

/** Same-origin cover URL of a media player (entity_picture is proxied by HA). */
export function artUrl(stateObj) {
  const a = stateObj?.attributes ?? {};
  return a.entity_picture_local || a.entity_picture || null;
}
