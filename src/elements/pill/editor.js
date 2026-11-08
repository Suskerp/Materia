import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaPillEditor extends SmartEditorBase {
  // The card shows the background unless explicitly disabled, so reflect that
  // default in the toggle (otherwise an unset value reads as "off").
  _formData() {
    return { background: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "name", template: true, selector: { text: {} } },
          {
            name: "icon",
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
          { name: "state_display", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_color", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_icon", color: true, template: true, selector: { text: {} } },
          { name: "background", selector: { boolean: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-pill-editor", MateriaPillEditor);
