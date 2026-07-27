import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaBarSelectEditor extends SmartEditorBase {
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
          { name: "label", label: "Label", selector: { text: {} } },
          { name: "attribute", label: "Attribute (e.g. fan_speed) instead of the state", selector: { text: {} } },
          { name: "off_option", label: 'Option shown as its own round button (e.g. "off")', selector: { text: {} } },
          { name: "off_icon", label: "Icon for that button", selector: { icon: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "accent", label: "Lit bar color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Advanced",
        icon: "mdi:tune",
        fields: [
          { name: "service", label: "Override service (domain.service)", selector: { text: {} } },
          { name: "service_key", label: "Override service data key", selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-bar-select-editor", MateriaBarSelectEditor);
