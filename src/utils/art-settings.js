/**
 * The user's Material You settings as the theme reads them: the per-user
 * material_you_* helper first, then the global one, then the theme's
 * defaults. Pure (no colour library), so it is unit-tested on its own.
 */

const blank = (v) => v == null || v === "" || v === "unknown" || v === "unavailable";

export function themeSettings(hass) {
  const uid = hass?.user?.id;
  const read = (domain, name, fallback) => {
    const states = hass?.states ?? {};
    const s = (uid && states[`${domain}.material_you_${name}_${uid}`]) || states[`${domain}.material_you_${name}`];
    return blank(s?.state) ? fallback : s.state;
  };
  return {
    scheme: read("input_select", "scheme", "tonalspot"),
    contrast: Number(read("input_number", "contrast", 0)) || 0,
    spec: read("input_select", "spec", "2025"),
    platform: read("input_select", "platform", "phone"),
  };
}

/** "Tonal Spot", "tonal_spot" and "tonalspot" all name the same scheme. */
export function schemeKey(name) {
  return String(name ?? "").toLowerCase().replace(/[^a-z]/g, "");
}
