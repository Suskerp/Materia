import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaLightEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "light" } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ];
  }
}
customElements.define("materia-light-editor", MateriaLightEditor);
