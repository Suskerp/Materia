import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMediaSourceEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:import",
        fields: [
          { name: "entity", label: "Player (in an art scope: the scope's)", selector: { entity: { domain: "media_player" } } },
          {
            name: "mode",
            selector: { select: { mode: "dropdown", options: [
              { value: "cycle", label: "Cycle (tap: next source)" },
              { value: "menu", label: "Menu (pick from a list)" },
            ] } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-media-source-editor", MateriaMediaSourceEditor);
