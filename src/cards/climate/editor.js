import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClimateEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
          { name: "name", required: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_sensors",
        icon: "mdi:thermometer",
        fields: [
          { name: "temperature_entity", label: "e_temper_sensor", selector: { entity: { domain: "sensor" } } },
          { name: "humidity_entity", label: "e_humidi_sensor", selector: { entity: { domain: "sensor" } } },
          { name: "outdoor_temp_entity", label: "e_outdoo_temper_sensor", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "e_behavior",
        icon: "mdi:tune",
        fields: [
          { name: "step", default: 0.5, selector: { number: { min: 0.5, max: 5, step: 0.5, mode: "box" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-climate-editor", MateriaClimateEditor);
