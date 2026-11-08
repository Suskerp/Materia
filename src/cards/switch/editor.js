import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaSwitchEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "name", label: "e_name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "secondary", label: "e_second_text_templa", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_row_color_escala", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_icon_color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color", label: "e_switch_track_color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color_on", label: "e_switch_thumb_color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [{ name: "tap_action", selector: { ui_action: { default_action: "toggle" } } }],
      },
      {
        title: "e_disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }
}

customElements.define("materia-switch-editor", MateriaSwitchEditor);
