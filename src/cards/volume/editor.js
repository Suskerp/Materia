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
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", label: "Player (empty: the art scope's)", selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "Name", selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "style",
            selector: { select: { mode: "dropdown", options: [
              { value: "knob", label: "Knob" },
              { value: "arc", label: "Arc" },
              { value: "tap", label: "Tap (vertical slider)" },
            ] } },
          },
          ...(this._config?.style === "tap"
            ? [{ name: "column", label: "Narrow column", selector: { boolean: {} } }]
            : []),
          ...(column ? [{ name: "show_name", label: "Show the name", selector: { boolean: {} } }] : []),
        ],
      },
    ];
  }
}

customElements.define("materia-volume-card-editor", MateriaVolumeCardEditor);
