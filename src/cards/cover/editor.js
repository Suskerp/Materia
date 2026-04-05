import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaCoverEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "cover" } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "show_stop", selector: { boolean: {} } },
    ];
  }
}
customElements.define("materia-cover-editor", MateriaCoverEditor);
