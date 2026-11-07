import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaStationGridEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", label: "Player (rings the current station)", selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "Title", selector: { text: {} } },
          { name: "columns", selector: { number: { min: 1, max: 8, mode: "box" } } },
          { name: "stations", label: "Stations (name, image, tap_action, match)", selector: { object: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-station-grid-editor", MateriaStationGridEditor);
