import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaSelectEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ];
  }
}

customElements.define("materia-select-editor", MateriaSelectEditor);
