import { SmartEditorBase } from "../../utils/smart-editor.js";

const METRICS = [
  { value: "wind", label: "Wind" },
  { value: "uv", label: "UV index" },
  { value: "aqi", label: "Air quality" },
  { value: "pollen", label: "Pollen" },
  { value: "precipitation", label: "Precipitation" },
  { value: "sun", label: "Sunrise & sunset" },
  { value: "visibility", label: "Visibility" },
  { value: "humidity", label: "Humidity" },
  { value: "pressure", label: "Pressure" },
];

class MateriaWeatherMetricEditor extends SmartEditorBase {
  _formData() {
    return { metric: "wind", ...this._config };
  }

  _sectionsSignature() {
    return this._config?.metric || "";
  }

  get _sections() {
    const m = this._config?.metric;

    const content = {
      title: "Content",
      icon: "mdi:card-text-outline",
      fields: [
        { name: "metric", required: true, selector: { select: { mode: "dropdown", options: METRICS } } },
        ...(m !== "sun" && m !== "pollen"
          ? [
              { name: "entity", label: "Weather entity", selector: { entity: { domain: "weather" } } },
              { name: "sensor", label: "Sensor override (optional)", selector: { entity: { domain: "sensor" } } },
            ]
          : []),
        { name: "name", label: "Title", selector: { text: {} } },
        { name: "icon", label: "Header icon (overrides default)", selector: { icon: {} } },
      ],
    };

    const extras = { title: "Options", icon: "mdi:tune", fields: [] };
    if (m === "wind") {
      extras.fields.push(
        { name: "unit", label: "Unit (converts from the source)", selector: { select: { mode: "dropdown", options: [
          { value: "km/h", label: "km/h" },
          { value: "m/s", label: "m/s" },
          { value: "mph", label: "mph" },
          { value: "kn", label: "knots" },
          { value: "bft", label: "Beaufort" },
        ] } } },
        { name: "shape_color", label: "Blob color (overrides default)", color: true, selector: { text: {} } },
        { name: "bearing_entity", label: "Bearing sensor (optional)", selector: { entity: { domain: "sensor" } } },
        { name: "from_label", label: '"From" label', selector: { text: {} } },
      );
    }
    if (m === "humidity") {
      extras.fields.push(
        { name: "dew_entity", label: "Dew point sensor (optional)", selector: { entity: { domain: "sensor" } } },
        { name: "dew_label", label: "Dew point label", selector: { text: {} } },
      );
    }
    if (m === "pressure") {
      extras.fields.push(
        { name: "min", label: "Gauge min", selector: { number: { mode: "box" } } },
        { name: "max", label: "Gauge max", selector: { number: { mode: "box" } } },
      );
    }
    if (m === "precipitation") {
      extras.fields.push(
        { name: "total_label", label: "Subtitle when raining", selector: { text: {} } },
        { name: "none_label", label: '"None expected" label', selector: { text: {} } },
      );
    }
    if (m === "sun") {
      extras.fields.push({ name: "sun_entity", label: "Sun entity", selector: { entity: { domain: "sun" } } });
    }
    if (m === "pollen") {
      extras.fields.push(
        { name: "entities", label: "Pollen sensors", selector: { entity: { domain: "sensor", multiple: true } } },
        { name: "variant", label: "Variant", selector: { select: { mode: "dropdown", options: [
          { value: "gauges", label: "Gauges (wide)" },
          { value: "small", label: "Small (dot list)" },
        ] } } },
        { name: "max_shown", label: "Max species shown (worst first)", selector: { number: { min: 1, max: 6, step: 1, mode: "slider" } } },
        { name: "hide_inactive", label: "Hide species at 'none'", selector: { boolean: {} } },
        { name: "max", label: "Scale max for numeric sensors (default 4)", selector: { number: { min: 1, max: 10, mode: "box" } } },
      );
    }

    const appearance = {
      title: "Appearance",
      icon: "mdi:palette-outline",
      fields: [
        { name: "color", label: "Tile color", color: true, template: true, selector: { text: {} } },
        { name: "color_on", label: "Text color", color: true, template: true, selector: { text: {} } },
      ],
    };

    const actions = {
      title: "Actions",
      icon: "mdi:gesture-tap",
      fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
    };

    return extras.fields.length
      ? [content, extras, appearance, actions]
      : [content, appearance, actions];
  }
}

customElements.define("materia-weather-metric-editor", MateriaWeatherMetricEditor);
