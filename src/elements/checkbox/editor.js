import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaCheckboxEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "checked_entity", selector: { entity: {} } },
      { name: "checked_value", selector: { text: {} } },
      { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
      { name: "tap_action_checked", label: "Action (checked)", selector: { ui_action: {} } },
      { name: "tap_action_unchecked", label: "Action (unchecked)", selector: { ui_action: {} } },
    ];
  }
}

customElements.define("materia-checkbox-editor", MateriaCheckboxEditor);
