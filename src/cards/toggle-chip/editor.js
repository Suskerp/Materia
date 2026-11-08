import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaToggleChipEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: ["switch", "input_boolean"] } } },
          { name: "name", label: "Name (switch label, accessible name)", template: true, selector: { text: {} } },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "label_on", label: "Text when on", template: true, selector: { text: {} } },
          { name: "label_off", label: "Text when off", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "chip", label: "Chip" },
                  { value: "switch", label: "Label and switch" },
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
