import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaCheckboxEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "name", template: true, selector: { text: {} } },
          { name: "checked_entity", selector: { entity: {} } },
          { name: "checked_value", selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
          { name: "tap_action_checked", label: "Action (checked)", selector: { ui_action: {} } },
          { name: "tap_action_unchecked", label: "Action (unchecked)", selector: { ui_action: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-checkbox-editor", MateriaCheckboxEditor);
