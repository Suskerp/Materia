import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaZonesEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "zones",
            label: "Zone valves",
            required: true,
            helper: "Per-zone names, icons and temp sensors: zones: [{entity, name, icon, temp_entity}] in YAML.",
            selector: { entity: { domain: "switch", multiple: true } },
          },
          { name: "climate", label: "Climate entity (derives 'calling for heat')", selector: { entity: { domain: "climate" } } },
          { name: "zone_icon", label: "Zone icon (e.g. mdi:heating-coil)", selector: { icon: {} } },
          { name: "actions", label: "Show All off / All on", selector: { boolean: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-zones-editor", MateriaZonesEditor);
