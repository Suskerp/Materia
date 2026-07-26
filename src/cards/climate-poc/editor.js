import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClimatePocEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
          { name: "water_heater", label: "Water heater (optional)", selector: { entity: { domain: "water_heater" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-climate-poc-editor", MateriaClimatePocEditor);
