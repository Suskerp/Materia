import { SmartEditorBase } from "../../utils/smart-editor.js";
import { stationsField, menuItemsField } from "../../utils/media-editors.js";

class MateriaMediaHeaderEditor extends SmartEditorBase {
  _formData() {
    return { show_source: true, show_volume: true, show_power: true, ...this._config };
  }

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
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "e_defaul_source_title" },
              { value: "kiosk", label: "e_kiosk_chip_statio" },
            ] } },
          },
          { name: "zone_name", label: "e_zone_name_defaul", selector: { text: {} } },
          { name: "stations_label", label: "e_stations_label", selector: { text: {} } },
          { name: "show_source", label: "e_source_button", selector: { boolean: {} } },
          { name: "source_menu", label: "e_source_menu", selector: { boolean: {} } },
          { name: "show_volume", label: "e_volume_ring", selector: { boolean: {} } },
          { name: "show_power", label: "e_power_menu_per", selector: { boolean: {} } },
          { name: "logo_fill", label: "e_statio_logos_fill", selector: { boolean: {} } },
        ],
      },
      {
        title: "media_stations",
        icon: "mdi:radio",
        expanded: false,
        fields: [{ name: "stations", render: (value) => stationsField(this, value) }],
      },
      {
        title: "e_power_menu",
        icon: "mdi:power",
        expanded: false,
        fields: [
          {
            name: "power_menu",
            render: (value) =>
              menuItemsField(this, value?.items, (items) => {
                const next = { ...(value ?? {}) };
                if (items) next.items = items;
                else delete next.items;
                this._setField("power_menu", Object.keys(next).length ? next : undefined);
              }, "ed_power_menu_items"),
          },
        ],
      },
    ];
  }
}

customElements.define("materia-media-header-editor", MateriaMediaHeaderEditor);
