import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaPillEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "color", selector: { template: {} } },
      { name: "color_on", selector: { template: {} } },
      { name: "background", selector: { boolean: {} } },
      {
        name: "tap_action",
        selector: { ui_action: {} },
      },
    ];
  }
}

customElements.define("materia-pill-editor", MateriaPillEditor);
