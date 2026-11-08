import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMediaProgressEditor extends SmartEditorBase {
  // These default to on in the card; reflect that in the toggles.
  _formData() {
    return { show_times: true, seekable: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "e_default" },
              { value: "player", label: "e_player_handle_drag" },
            ] } },
          },
          { name: "show_times", selector: { boolean: {} } },
          { name: "seekable", selector: { boolean: {} } },
          {
            name: "live",
            label: "e_live_stream",
            helper: "e_keep_track_full",
            selector: { boolean: {} },
          },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_wave_color", color: true, template: true, selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-media-progress-editor", MateriaMediaProgressEditor);
