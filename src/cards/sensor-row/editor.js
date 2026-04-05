import { BaseEditor, computeLabel } from "../../utils/editor-helpers.js";

class MateriaSensorRowEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "sensor" } } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "padding", selector: { text: {} } },
    ];
  }
}

customElements.define("materia-sensor-row-editor", MateriaSensorRowEditor);
