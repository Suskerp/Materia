import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaVolumeRingEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "e_player_in_art",
            selector: { entity: { domain: "media_player" } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-volume-ring-editor", MateriaVolumeRingEditor);
