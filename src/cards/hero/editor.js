import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaHeroEditor extends SmartEditorBase {
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
          { name: "name", label: "Eyebrow text", selector: { text: {} } },
          { name: "icon", label: "Eyebrow icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "title", label: "Big title (defaults to the state)", template: true, selector: { text: {} } },
          { name: "value", label: "Headline number (defaults to the state)", template: true, selector: { text: {} } },
          { name: "unit", label: "Unit after the number", selector: { text: {} } },
          { name: "caption", label: "Caption beside the number", template: true, selector: { text: {} } },
          { name: "secondary", label: "Sub-line", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "active_state", label: "State(s) that count as active", selector: { text: {} } },
          { name: "burst", label: "Show the turning burst", selector: { boolean: {} } },
          { name: "active_color", label: "Background while active", color: true, template: true, selector: { text: {} } },
          { name: "active_color_on", label: "Text while active", color: true, template: true, selector: { text: {} } },
          { name: "color", label: "Background at rest", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text at rest", color: true, template: true, selector: { text: {} } },
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

customElements.define("materia-hero-editor", MateriaHeroEditor);
