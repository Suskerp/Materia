import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMediaProgressEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          { name: "show_times", selector: { boolean: {} } },
          { name: "seekable", selector: { boolean: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Wave color", color: true, template: true, selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-media-progress-editor", MateriaMediaProgressEditor);
