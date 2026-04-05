import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaDeviceEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "button_type", selector: { select: { options: ["switch", "state"] } } },
      { name: "active_state", selector: { text: {} } },
      { name: "color_active", selector: { text: {} } },
      { name: "color_on_active", selector: { text: {} } },
      { name: "show_state", selector: { boolean: {} } },
    ];
  }
}
customElements.define("materia-device-editor", MateriaDeviceEditor);
