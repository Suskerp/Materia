import { BaseEditor, computeLabel } from "../../utils/editor-helpers.js";

class MateriaSensorDisplayEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "sensor" } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "unit", selector: { text: {} } },
    ];
  }
}

customElements.define("materia-sensor-display-editor", MateriaSensorDisplayEditor);
