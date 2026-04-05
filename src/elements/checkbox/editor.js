import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaCheckboxEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "checked_entity", selector: { entity: {} } },
      { name: "checked_value", selector: { text: {} } },
    ];
  }
}

customElements.define("materia-checkbox-editor", MateriaCheckboxEditor);
