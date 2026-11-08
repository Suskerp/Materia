import { SmartEditorBase } from "../../utils/smart-editor.js";
import { stationsField, volumeOverrideSection } from "../../utils/media-editors.js";

class MateriaMediaHeaderEditor extends SmartEditorBase {
  _formData() {
    return { show_source: true, show_volume: true, show_power: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "Speler (in een art scope: die van de scope)",
            selector: { entity: { domain: "media_player" } },
          },
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "Default (source, title, stations + volume)" },
              { value: "kiosk", label: "Kiosk (chip + stations button)" },
            ] } },
          },
          { name: "zone_name", label: "Zone name (defaults to the friendly name)", selector: { text: {} } },
          { name: "stations_label", label: "Label van de zenderknop (standaard: vertaald)", selector: { text: {} } },
          { name: "show_source", label: "Source button", selector: { boolean: {} } },
          { name: "show_volume", label: "Volume ring", selector: { boolean: {} } },
          { name: "show_power", label: "Power (menu per zone)", selector: { boolean: {} } },
          { name: "logo_fill", label: "Station logos fill their tile", selector: { boolean: {} } },
        ],
      },
      {
        title: "Zenders",
        icon: "mdi:radio",
        expanded: false,
        fields: [{ name: "stations", render: (value) => stationsField(this, value) }],
      },
      volumeOverrideSection(this),
    ];
  }
}

customElements.define("materia-media-header-editor", MateriaMediaHeaderEditor);
