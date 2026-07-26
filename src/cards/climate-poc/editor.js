import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClimatePocEditor extends SmartEditorBase {
  _formData() {
    return { variant: "a", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "variant", label: "Layout variant", selector: { select: { mode: "dropdown", options: [
            { value: "a", label: "A — dial hero + connected stack" },
            { value: "b", label: "B — zones first, stepper setpoint" },
            { value: "c", label: "C — vertical slider + zone chips" },
          ] } } },
          { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
          { name: "water_heater", label: "Water heater (optional)", selector: { entity: { domain: "water_heater" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-climate-poc-editor", MateriaClimatePocEditor);
