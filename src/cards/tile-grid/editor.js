import { SmartEditorBase } from "../../utils/smart-editor.js";
import { stationsField } from "../../utils/media-editors.js";

class MateriaTileGridEditor extends SmartEditorBase {
  /** The list key this config uses: `items`, or `stations` on a station grid. */
  get _listKey() {
    const c = this._config || {};
    return c.items ? "items" : c.stations ? "stations" : "items";
  }

  get _sections() {
    const key = this._listKey;
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", label: "Player (rings the active tile)", selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "Title", selector: { text: {} } },
          { name: "columns", selector: { number: { min: 1, max: 8, mode: "box" } } },
          ...(key === "stations"
            ? [{ name: "logo_fill", label: "Logo fills the tile (no white frame)", selector: { boolean: {} } }]
            : [
                { name: "tile", selector: { select: { mode: "dropdown", options: ["logo", "cover"] } } },
                { name: "tile_background", label: "Tile background", selector: { text: {} } },
              ]),
        ],
      },
      {
        title: key === "stations" ? "Zenders" : "Items",
        icon: key === "stations" ? "mdi:radio" : "mdi:view-grid-outline",
        fields: [{ name: key, render: (value) => stationsField(this, value, key) }],
      },
    ];
  }
}

class MateriaStationGridEditor extends MateriaTileGridEditor {
  get _listKey() {
    return this._config?.items ? "items" : "stations";
  }
}

customElements.define("materia-tile-grid-editor", MateriaTileGridEditor);
customElements.define("materia-station-grid-editor", MateriaStationGridEditor);
