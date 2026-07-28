import { SmartEditorBase } from "../../utils/smart-editor.js";

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
