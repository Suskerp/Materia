import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClimateEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
          { name: "name", required: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Sensors",
        icon: "mdi:thermometer",
        fields: [
          { name: "temperature_entity", label: "Temperature sensor", selector: { entity: { domain: "sensor" } } },
          { name: "humidity_entity", label: "Humidity sensor", selector: { entity: { domain: "sensor" } } },
          { name: "outdoor_temp_entity", label: "Outdoor temperature sensor", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "Behavior",
        icon: "mdi:tune",
        fields: [
          { name: "step", selector: { number: { min: 0.5, max: 5, step: 0.5, mode: "box" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-climate-editor", MateriaClimateEditor);
