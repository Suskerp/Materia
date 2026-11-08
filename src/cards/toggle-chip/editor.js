import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaToggleChipEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: ["switch", "input_boolean"] } } },
          { name: "name", label: "e_name_switch_label", template: true, selector: { text: {} } },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "label_on", label: "e_text_when_on", template: true, selector: { text: {} } },
          { name: "label_off", label: "e_text_when_off", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "chip", label: "e_chip" },
                  { value: "switch", label: "e_label_switch" },
                ],
              },
            },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-toggle-chip-editor", MateriaToggleChipEditor);
