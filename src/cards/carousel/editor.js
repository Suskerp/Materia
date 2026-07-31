import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaCarouselEditor extends SmartEditorBase {
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
          { name: "color", label: "Selected tile color", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Selected tile text", color: true, template: true, selector: { text: {} } },
        ],
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

customElements.define("materia-carousel-editor", MateriaCarouselEditor);
