import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaLevelEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "label", label: "Label", template: true, selector: { text: {} } },
          {
            name: "attribute",
            label: "Attribute holding the level",
            helper:
              "Defaults per domain: volume_level, brightness, percentage, current_position. Leave empty for number helpers.",
            selector: { text: {} },
          },
          { name: "icon", label: "Leading icon", template: true, selector: { icon: {} } },
        ],
      },
      {
        title: "Range",
        icon: "mdi:ruler",
        secondary: "Left empty, these come from the entity",
        fields: [
          {
            name: "min",
            label: "Minimum (entity units)",
            selector: { number: { mode: "box", step: "any" } },
          },
          {
            name: "max",
            label: "Maximum (entity units)",
            selector: { number: { mode: "box", step: "any" } },
          },
          {
            name: "step",
            label: "Step (entity units)",
            selector: { number: { mode: "box", step: "any" } },
          },
          {
            name: "unit",
            label: "Unit shown after the value",
            helper: "Defaults to the entity's unit, or % for volume and brightness.",
            selector: { text: {} },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Tile background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Content color on it", color: true, template: true, selector: { text: {} } },
          { name: "slider_color", label: "Active track & handle", color: true, template: true, selector: { text: {} } },
          { name: "slider_track_color", label: "Inactive track", color: true, template: true, selector: { text: {} } },
          {
            name: "hide_stops",
            label: "Hide the stop indicators",
            helper: "The small M3 dots at each end of the track. Shown by default.",
            selector: { boolean: {} },
          },
        ],
      },
      {
        title: "Advanced",
        icon: "mdi:tune",
        fields: [
          { name: "service", label: "Override service (domain.service)", selector: { text: {} } },
          { name: "service_key", label: "Override service data key", selector: { text: {} } },
        ],
      },
      {
        title: "Disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }
}

customElements.define("materia-level-editor", MateriaLevelEditor);
