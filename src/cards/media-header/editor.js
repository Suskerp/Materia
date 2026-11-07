import { SmartEditorBase } from "../../utils/smart-editor.js";
import { VOLUME_BLOCK_FIELD } from "../../elements/volume-ring/editor.js";

class MateriaMediaHeaderEditor extends SmartEditorBase {
  _formData() {
    return { show_source: true, show_volume: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "Default (source, title, stations + volume)" },
              { value: "kiosk", label: "Kiosk (chip + stations button)" },
            ] } },
          },
          { name: "zone_name", label: "Zone name (defaults to the friendly name)", selector: { text: {} } },
          { name: "show_source", label: "Source button", selector: { boolean: {} } },
          { name: "show_volume", label: "Volume ring", selector: { boolean: {} } },
        ],
      },
      {
        title: "Sheets",
        icon: "mdi:dock-bottom",
        expanded: false,
        fields: [
          { name: "stations", label: "Stations (name, image, tap_action, match)", selector: { object: {} } },
          VOLUME_BLOCK_FIELD,
        ],
      },
    ];
  }
}

customElements.define("materia-media-header-editor", MateriaMediaHeaderEditor);
