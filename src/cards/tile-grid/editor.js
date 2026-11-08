import { SmartEditorBase } from "../../utils/smart-editor.js";
import { stationsField, ACTIVE_ATTRIBUTES_SELECTOR } from "../../utils/media-editors.js";
import { t } from "../../utils/i18n.js";

/** `active: { entity, attributes }` is edited as two flat fields. */
const ACTIVE_FIELDS = { active_entity: "entity", active_attributes: "attributes" };

class MateriaTileGridEditor extends SmartEditorBase {
  _formData() {
    const c = { close_on_select: true, ...this._config };
    if (c.active?.entity) c.active_entity = c.active.entity;
    if (c.active?.attributes != null) c.active_attributes = [].concat(c.active.attributes);
    return c;
  }

  _sectionsSignature() {
    return `${this._listKey}|${this.hass?.locale?.language ?? ""}`;
  }

  _setField(name, value) {
    const key = ACTIVE_FIELDS[name];
    if (!key) return super._setField(name, value);
    const active = { ...(this._config?.active ?? {}) };
    if (value == null || value === "" || (Array.isArray(value) && !value.length)) delete active[key];
    else active[key] = value;
    super._setField("active", Object.keys(active).length ? active : undefined);
  }

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
          { name: "close_on_select", label: t("ed_tile_close", this.hass), selector: { boolean: {} } },
          { name: "active_entity", label: t("ed_tile_active_entity", this.hass), selector: { entity: { domain: "media_player" } } },
          { name: "active_attributes", label: t("ed_tile_active_attributes", this.hass), selector: ACTIVE_ATTRIBUTES_SELECTOR },
        ],
      },
      {
        title: key === "stations" ? "Zenders" : "Items",
        icon: key === "stations" ? "mdi:radio" : "mdi:view-grid-outline",
        fields: [{ name: key, render: (value) => stationsField(this, value, key, true) }],
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
