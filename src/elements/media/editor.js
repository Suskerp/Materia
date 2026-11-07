import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMediaEditor extends SmartEditorBase {
  _formData() {
    return { show_art: true, show_titles: true, show_app: true, live_logo: true, ...this._config };
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
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "Default (centred, editorial)" },
              { value: "player", label: "Player (expressive now playing)" },
            ] } },
          },
          { name: "show_art", selector: { boolean: {} } },
          {
            name: "art_size",
            label: "Art size (auto, fill or px)",
            selector: { select: { custom_value: true, mode: "dropdown", options: [
              { value: "auto", label: "Auto (fits the space the player has)" },
              { value: "fill", label: "Fill the width" },
              { value: "240", label: "240 px" },
              { value: "320", label: "320 px" },
            ] } },
          },
          { name: "art_max", label: "Largest art size, auto / fill (px, default 420)", selector: { number: { min: 136, max: 800, mode: "box" } } },
          { name: "show_titles", label: "Title row (player)", selector: { boolean: {} } },
          { name: "show_app", label: "App chip (player)", selector: { boolean: {} } },
          { name: "live_logo", label: "Live radio logo on white (player)", selector: { boolean: {} } },
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
