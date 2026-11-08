import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMediaSourceEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:import",
        fields: [
          { name: "entity", label: "e_player_in_art", selector: { entity: { domain: "media_player" } } },
          {
            name: "mode",
            selector: { select: { mode: "dropdown", options: [
              { value: "cycle", label: "e_cycle_tap_next" },
              { value: "menu", label: "e_menu_pick_from" },
            ] } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-media-source-editor", MateriaMediaSourceEditor);
