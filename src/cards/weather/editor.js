import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaWeatherEditor extends SmartEditorBase {
  _formData() {
    return { show_temperature: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "name", template: true, selector: { text: {} } },
          {
            name: "icon",
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
        ],
      },
      {
        title: "Large layout",
        icon: "mdi:weather-partly-cloudy",
        fields: [
          { name: "large", label: "Large blobby widget", selector: { boolean: {} } },
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / temperature", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Sensors",
        icon: "mdi:water-percent",
        fields: [
          { name: "show_temperature", label: "Show temperature", selector: { boolean: {} } },
          { name: "temperature_entity", label: "Temperature sensor (optional)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "humidity_entity", label: "Humidity sensor", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-weather-editor", MateriaWeatherEditor);
