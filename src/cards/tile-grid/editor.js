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
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", label: "e_player_rings_active", selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "e_title", selector: { text: {} } },
          { name: "columns", selector: { number: { min: 1, max: 8, mode: "box" } } },
          ...(key === "stations"
            ? [{ name: "logo_fill", label: "e_logo_fills_tile", selector: { boolean: {} } }]
            : [
                { name: "tile", selector: { select: { mode: "dropdown", options: [{ value: "logo", label: "e_logo" }, { value: "cover", label: "e_cover" }] } } },
                { name: "tile_background", label: "e_tile_backgr", selector: { text: {} } },
              ]),
        ],
      },
      {
        title: key === "stations" ? "media_stations" : "e_items",
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
