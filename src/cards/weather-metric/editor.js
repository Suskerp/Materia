import { SmartEditorBase } from "../../utils/smart-editor.js";

const METRICS = [
  { value: "wind", label: "wm_wind" },
  { value: "uv", label: "wm_uv_index" },
  { value: "aqi", label: "wm_air_quality" },
  { value: "pollen", label: "wm_pollen" },
  { value: "precipitation", label: "wm_precipitation" },
  { value: "sun", label: "wm_sunrise_sunset" },
  { value: "visibility", label: "wm_visibility" },
  { value: "humidity", label: "wm_humidity" },
  { value: "pressure", label: "wm_pressure" },
];

/** The title each metric falls back to, and the defaults of its own fields.
 *  Units are absent on purpose — they follow the source entity's unit
 *  attribute, so the field labels carry that instead of a fixed value. */
/* Only what the form MISRENDERS without: pollen's variant select and its
   max_shown slider. The name/label strings that used to live here are
   runtime defaults (and i18n-translated) — seeding them made every field
   look user-filled and, once saved, froze the English wording into config. */
const METRIC_DEFAULTS = {
  pollen: { variant: "gauges", max_shown: 4 },
};

class MateriaWeatherMetricEditor extends SmartEditorBase {
  /* Seed ONLY booleans, closed-set selects, and sliders — controls that
     MISRENDER when the value is absent (an unseeded switch reads off, an
     unseeded slider sits at its minimum). Free values — text, icons, numbers
     in plain boxes — must NOT be seeded: the field looks user-filled, and
     saving writes the default into config, permanently freezing it. For
     labels that i18n translates at runtime, a seeded English default would
     even override the user's language. */
  _formData() {
    return { metric: "wind", ...METRIC_DEFAULTS[this._config?.metric], ...this._config };
  }

  _sectionsSignature() {
    return this._config?.metric || "";
  }

  get _sections() {
    const m = this._config?.metric;

    const content = {
      title: "e_content",
      icon: "mdi:card-text-outline",
      fields: [
        { name: "metric", required: true, selector: { select: { mode: "dropdown", options: METRICS } } },
        ...(m !== "sun" && m !== "pollen"
          ? [
              { name: "entity", label: "e_weathe_entity", selector: { entity: { domain: "weather" } } },
              { name: "sensor", label: "e_sensor_overri_option", selector: { entity: { domain: "sensor" } } },
            ]
          : []),
        { name: "name", label: "e_title", selector: { text: {} } },
        { name: "icon", label: "e_header_icon_overri", selector: { icon: {} } },
      ],
    };

    const extras = { title: "e_options", icon: "mdi:tune", fields: [] };
    if (m === "wind") {
      extras.fields.push(
        { name: "unit", label: "e_unit_conver_from", selector: { select: { mode: "dropdown", options: [
          { value: "km/h", label: "km/h" },
          { value: "m/s", label: "m/s" },
          { value: "mph", label: "mph" },
          { value: "kn", label: "e_knots" },
          { value: "bft", label: "Beaufort" },
        ] } } },
        { name: "bearing_entity", label: "e_bearin_sensor_option", selector: { entity: { domain: "sensor" } } },
        { name: "from_label", label: "e_from_label", selector: { text: {} } },
      );
    }
    if (m === "humidity") {
      extras.fields.push(
        { name: "dew_entity", label: "e_dew_point_sensor", selector: { entity: { domain: "sensor" } } },
        { name: "dew_label", label: "e_dew_point_label", selector: { text: {} } },
      );
    }
    if (m === "pressure") {
      extras.fields.push(
        { name: "min", label: "e_gauge_min", selector: { number: { mode: "box" } } },
        { name: "max", label: "e_gauge_max", selector: { number: { mode: "box" } } },
      );
    }
    if (m === "precipitation") {
      extras.fields.push(
        { name: "total_label", label: "e_subtit_when_rainin", selector: { text: {} } },
        { name: "none_label", label: "e_none_expect_label", selector: { text: {} } },
      );
    }
    if (m === "sun") {
      extras.fields.push(
        { name: "sun_entity", label: "e_sun_entity", selector: { entity: { domain: "sun" } } },
        { name: "moon_entity", label: "e_moon_phase_sensor2", selector: { entity: { domain: "sensor" } } },
      );
    }
    if (m === "pollen") {
      extras.fields.push(
        { name: "entities", label: "e_pollen_sensor", selector: { entity: { domain: "sensor", multiple: true } } },
        { name: "variant", label: "e_variant", selector: { select: { mode: "dropdown", options: [
          { value: "gauges", label: "e_gauges_wide" },
          { value: "small", label: "e_small_dot_list" },
        ] } } },
        { name: "max_shown", label: "e_max_specie_shown", selector: { number: { min: 1, max: 6, step: 1, mode: "slider" } } },
        { name: "hide_inactive", label: "e_hide_specie_at", selector: { boolean: {} } },
        { name: "max", label: "e_scale_max_for", selector: { number: { min: 1, max: 10, mode: "box" } } },
      );
    }

    const appearance = {
      title: "e_appearance",
      icon: "mdi:palette-outline",
      fields: [
        ...(m === "wind"
          ? [{ name: "shape_color", label: "e_shape_color", color: true, template: true, selector: { text: {} } }]
          : []),
        { name: "color", label: "e_tile_color", color: true, template: true, selector: { text: {} } },
        { name: "color_on", label: "e_text_color", color: true, template: true, selector: { text: {} } },
      ],
    };

    const actions = {
      title: "e_actions",
      icon: "mdi:gesture-tap",
      fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
    };

    return extras.fields.length
      ? [content, extras, appearance, actions]
      : [content, appearance, actions];
  }
}

customElements.define("materia-weather-metric-editor", MateriaWeatherMetricEditor);
