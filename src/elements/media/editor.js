import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMediaEditor extends SmartEditorBase {
  _formData() {
    return { show_art: true, show_titles: true, show_app: true, live_logo: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "e_title", template: true, selector: { text: {} } },
          { name: "subtitle", template: true, selector: { text: {} } },
          { name: "image", helper: "e_defaul_entity_s2", template: true, selector: { text: {} } },
          { name: "fallback_image", helper: "e_shown_when_there", selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "e_defaul_centre_editor" },
              { value: "player", label: "e_player_expres_now" },
            ] } },
          },
          { name: "show_art", selector: { boolean: {} } },
          {
            name: "art_size",
            label: "e_art_size_auto",
            selector: { select: { custom_value: true, mode: "dropdown", options: [
              { value: "auto", label: "e_auto_fits_space" },
              { value: "fill", label: "e_fill_width" },
              { value: "240", label: "240 px" },
              { value: "320", label: "320 px" },
            ] } },
          },
          { name: "art_max", label: "e_larges_art_size", selector: { number: { min: 136, max: 800, mode: "box" } } },
          { name: "show_titles", label: "e_title_row_player", selector: { boolean: {} } },
          { name: "show_app", label: "e_app_chip_player", selector: { boolean: {} } },
          { name: "live_logo", label: "e_live_radio_logo", selector: { boolean: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-media-editor", MateriaMediaEditor);
