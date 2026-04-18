import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaPillEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { template: {} } },
      { name: "icon", selector: { template: {} }, context: { icon_entity: "entity" } },
      { name: "state_display", selector: { template: {} } },
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
