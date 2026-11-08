import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaWeatherEditor extends SmartEditorBase {
  _formData() {
    return { show_temperature: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
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
        title: "e_sensors",
        icon: "mdi:water-percent",
        fields: [
          { name: "show_temperature", label: "e_show_temper", selector: { boolean: {} } },
          { name: "temperature_entity", label: "e_temper_sensor_option", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "humidity_entity", label: "e_humidi_sensor", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-weather-editor", MateriaWeatherEditor);
