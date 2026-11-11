import { MateriaTileGrid } from "../tile-grid/index.js";
import { loadEditors } from "../../utils/load-editors.js";

/**
 * materia-station-grid — the radio name of materia-tile-grid, kept so
 * existing configs (`stations:`, `logo_fill`, `entity`) render as before.
 */
class MateriaStationGrid extends MateriaTileGrid {
  static async getConfigElement() {
    await loadEditors();
    return document.createElement("materia-station-grid-editor");
  }

  static getStubConfig(hass) {
    const { items, ...rest } = MateriaTileGrid.getStubConfig(hass);
    return { ...rest, stations: items };
  }
}

customElements.define("materia-station-grid", MateriaStationGrid);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-station-grid",
  name: "Materia Station Grid",
  description: "Radio stations as white square logos; the current one is ringed. Each runs its action.",
  preview: true,
});
