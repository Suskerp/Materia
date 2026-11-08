import { SmartEditorBase } from "../../utils/smart-editor.js";

/* "materia-volume-editor" is the volume block editor in utils/media-editors.js. */
class MateriaVolumeCardEditor extends SmartEditorBase {
  _sectionsSignature() {
    return `${this._config?.style}|${!!this._config?.column}`;
  }

  get _sections() {
    const column = this._config?.style === "tap" && this._config?.column;
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", label: "e_player_empty_art", selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "e_name", selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "style",
            selector: { select: { mode: "dropdown", options: [
              { value: "knob", label: "e_knob" },
              { value: "arc", label: "e_arc" },
              { value: "tap", label: "e_tap_vertic_slider" },
            ] } },
          },
          ...(this._config?.style === "tap"
            ? [{ name: "column", label: "e_narrow_column", selector: { boolean: {} } }]
            : []),
          ...(column ? [{ name: "show_name", label: "e_show_name", selector: { boolean: {} } }] : []),
        ],
      },
    ];
  }
}

customElements.define("materia-volume-card-editor", MateriaVolumeCardEditor);
