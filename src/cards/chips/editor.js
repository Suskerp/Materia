import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaChipsEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", label: "Entity holding the selection", selector: { entity: {} } },
          { name: "attribute", label: "Attribute (instead of the state)", selector: { text: {} } },
          { name: "multi_select", label: "Multi-select (state is a comma-separated list)", selector: { boolean: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "show_check", label: "Show the check on selected chips", selector: { boolean: {} } },
          { name: "color", label: "Selected chip color", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Selected chip text", color: true, template: true, selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-chips-editor", MateriaChipsEditor);
