import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaBarSelectEditor extends SmartEditorBase {
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
          { name: "label", label: "e_label", selector: { text: {} } },
          { name: "attribute", label: "e_attrib_fan_speed", selector: { text: {} } },
          { name: "off_option", label: "e_option_shown_as", selector: { text: {} } },
          { name: "off_icon", label: "e_icon_for_button", selector: { icon: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "accent", label: "e_lit_bar_color", color: true, template: true, selector: { text: {} } },
          { name: "accent_on", label: "e_glyph_color_on", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_advanced",
        icon: "mdi:tune",
        fields: [
          { name: "service", label: "e_overri_servic_domain", selector: { text: {} } },
          { name: "service_key", label: "e_overri_servic_data", selector: { text: {} } },
        ],
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

customElements.define("materia-bar-select-editor", MateriaBarSelectEditor);
