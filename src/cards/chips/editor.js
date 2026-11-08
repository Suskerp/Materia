import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaChipsEditor extends SmartEditorBase {
  /* Switches must be seeded with the card's own defaults. An option that
     defaults to TRUE but is absent from config renders as `undefined`, which
     ha-form draws as OFF — so the toggle claims the feature is disabled when it
     is actually on, and merely opening the editor and saving would turn it off
     for real. Config still wins, so an explicit false is preserved. */
  _formData() {
    return { show_check: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", label: "e_entity_holdin_select2", selector: { entity: {} } },
          { name: "attribute", label: "e_attrib_instea_state", selector: { text: {} } },
          { name: "multi_select", label: "e_multi_select_state", selector: { boolean: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "show_check", label: "e_show_check_on", selector: { boolean: {} } },
          { name: "color", label: "e_select_chip_color", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_select_chip_text", color: true, template: true, selector: { text: {} } },
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

customElements.define("materia-chips-editor", MateriaChipsEditor);
