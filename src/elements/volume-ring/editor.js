import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaVolumeRingEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "Speler (in een art scope: die van de scope)",
            selector: { entity: { domain: "media_player" } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-volume-ring-editor", MateriaVolumeRingEditor);
