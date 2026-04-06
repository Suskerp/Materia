import { BaseEditor, computeLabel } from "../../utils/editor-helpers.js";

class MateriaClimateEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "humidity_entity", selector: { entity: { domain: "sensor" } } },
      { name: "outdoor_temp_entity", selector: { entity: { domain: "sensor" } } },
      { name: "step", selector: { number: { min: 0.5, max: 5, step: 0.5, mode: "box" } } },
      { name: "optimistic", selector: { boolean: {} } },
    ];
  }
}

customElements.define("materia-climate-editor", MateriaClimateEditor);
