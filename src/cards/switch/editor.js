import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaSwitchEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "name", label: "Name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "secondary", label: "Secondary text / template", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Row color (e.g. escalate from state)", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / icon color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color", label: "Switch track color when on", color: true, template: true, selector: { text: {} } },
          { name: "switch_color_on", label: "Switch thumb color when on", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [{ name: "tap_action", selector: { ui_action: { default_action: "toggle" } } }],
      },
      {
        title: "Disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }
}

customElements.define("materia-switch-editor", MateriaSwitchEditor);
