import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMediaEditor extends SmartEditorBase {
  _formData() {
    return { show_art: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "Title", template: true, selector: { text: {} } },
          { name: "subtitle", template: true, selector: { text: {} } },
          { name: "image", helper: "Defaults to the entity's album art", template: true, selector: { text: {} } },
          { name: "fallback_image", helper: "Shown when there's no art", selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "show_art", selector: { boolean: {} } },
          { name: "art_size", label: "Art size (px)", selector: { number: { min: 80, max: 480, mode: "box" } } },
          { name: "art_shape", label: "Art shape", selector: { select: { mode: "dropdown", options: [
            { value: "auto", label: "Auto (rotates per track)" },
            { value: "square", label: "Square (classic)" },
            { value: "cookie12", label: "Cookie (12)" },
            { value: "cookie9", label: "Cookie (9)" },
            { value: "cookie7", label: "Cookie (7)" },
            { value: "sunny", label: "Sunny" },
          ] } } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-media-editor", MateriaMediaEditor);
