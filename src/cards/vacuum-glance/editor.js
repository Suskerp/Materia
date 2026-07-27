import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaVacuumGlanceEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "vacuum" } } },
          { name: "name", label: "Name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "status_entity", label: "Detailed status sensor (shown as the state)", selector: { entity: { domain: "sensor" } } },
          { name: "room_entity", label: "Current room sensor (shown while cleaning)", selector: { entity: { domain: "sensor" } } },
          { name: "battery_entity", label: "Battery sensor (adds the vertical bar)", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "accent", label: "Accent color (active wash / icon)", color: true, selector: { text: {} } },
          { name: "color", label: "Tile color", color: true, selector: { text: {} } },
          { name: "color_on", label: "Text color", color: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
      },
    ];
  }
}

customElements.define("materia-vacuum-glance-editor", MateriaVacuumGlanceEditor);
