import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaLockEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "lock" } } },
      { name: "name", selector: { text: {} } },
    ];
  }
}
customElements.define("materia-lock-editor", MateriaLockEditor);
