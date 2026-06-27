/**
 * Material You color palette for the editors' friendly color picker.
 *
 * Each option stores:
 *   value  — what gets written to config (a CSS custom property reference)
 *   swatch — what the preview circle renders; the SAME runtime variable, with
 *            the light-mode hex as a fallback. This guarantees the swatch shows
 *            exactly what the card will show (even if you customise
 *            custom_colors.json), while still rendering a sensible color when
 *            the material-you-utilities theme hasn't injected the token yet.
 *
 * The hex fallbacks mirror the light-mode defaults in custom_colors.json.
 */

const cust = (key, label, hex) => ({
  value: `var(--md-sys-cust-color-${key})`,
  swatch: `var(--md-sys-cust-color-${key}, ${hex})`,
  label,
});
const sys = (key, label) => ({
  value: `var(--md-sys-color-${key})`,
  swatch: `var(--md-sys-color-${key})`,
  label,
});

export const COLOR_GROUPS = [
  {
    title: "Light",
    options: [
      cust("light", "Light", "#FEE082"),
      cust("light-container", "Light container", "#FEEFCA"),
      cust("on-light", "On light", "#745D00"),
    ],
  },
  {
    title: "Device",
    options: [
      cust("device", "Device", "#D9E2FE"),
      cust("device-container", "Device container", "#EDF0FF"),
      cust("on-device", "On device", "#0156CF"),
    ],
  },
  {
    title: "Climate · Heat",
    options: [
      cust("climate-heat", "Heat", "#FFDFD4"),
      cust("climate-heat-container", "Heat container", "#FFEEE9"),
      cust("on-climate-heat", "On heat", "#A14614"),
    ],
  },
  {
    title: "Climate · Cool",
    options: [
      cust("climate-cool", "Cool", "#D3E8FF"),
      cust("climate-cool-container", "Cool container", "#EAF3FF"),
      cust("on-climate-cool", "On cool", "#327EA7"),
    ],
  },
  {
    title: "Climate · Auto",
    options: [
      cust("climate-auto", "Auto", "#D4EBDD"),
      cust("climate-auto-container", "Auto container", "#EAF6EE"),
      cust("on-climate-auto", "On auto", "#2E5E44"),
    ],
  },
  {
    title: "Water · Eco",
    options: [
      cust("water-eco", "Eco", "#C8E6C9"),
      cust("water-eco-container", "Eco container", "#E6F4EA"),
      cust("on-water-eco", "On eco", "#256029"),
    ],
  },
  {
    title: "Water · Performance",
    options: [
      cust("water-performance", "Performance", "#FFD1B0"),
      cust("water-performance-container", "Performance container", "#FFEDE0"),
      cust("on-water-performance", "On performance", "#9C3A00"),
    ],
  },
  {
    title: "Warning",
    options: [
      cust("warning", "Warning", "#D9A000"),
      cust("warning-container", "Warning container", "#FEEFCA"),
      cust("on-warning", "On warning", "#FFFFFF"),
    ],
  },
  {
    title: "System (theme)",
    options: [
      sys("primary", "Primary"),
      sys("primary-container", "Primary container"),
      sys("secondary", "Secondary"),
      sys("secondary-container", "Secondary container"),
      sys("tertiary", "Tertiary"),
      sys("tertiary-container", "Tertiary container"),
      sys("error", "Error"),
      sys("error-container", "Error container"),
      sys("surface-container", "Surface container"),
    ],
  },
];

/** Flat set of every known palette value, for fast membership checks. */
export const COLOR_VALUES = new Set(
  COLOR_GROUPS.flatMap((g) => g.options.map((o) => o.value))
);
