import { SmartEditorBase } from "../../utils/smart-editor.js";

const METRIC_OPTIONS = [
  { value: "condition", label: "Condition" },
  { value: "minmax", label: "High / low" },
  { value: "wind", label: "Wind" },
  { value: "humidity", label: "Humidity" },
  { value: "uv", label: "UV index" },
  { value: "precipitation", label: "Precipitation" },
  { value: "pressure", label: "Pressure" },
];

class MateriaWeatherGlanceEditor extends SmartEditorBase {
  _formData() {
    return { metrics: ["condition", "minmax"], ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "temperature_entity", label: "Real temperature sensor (optional)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "metrics", label: "Metric lines (first = top line)", selector: { select: { multiple: true, mode: "list", options: METRIC_OPTIONS } } },
          { name: "sort_by_severity", label: "Sort metrics worst-first", selector: { boolean: {} } },
          { name: "show_metric_icons", label: "Show metric icons", selector: { boolean: {} } },
          { name: "alert", label: "Alert text / template (takes over top line)", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "navigate" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-weather-glance-editor", MateriaWeatherGlanceEditor);
