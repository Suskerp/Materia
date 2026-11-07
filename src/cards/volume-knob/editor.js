import { SmartEditorBase } from "../../utils/smart-editor.js";

/** Shared by every editor that embeds a volume-knob config (`volume:` block). */
export const VOLUME_FIELDS = [
  {
    name: "style",
    selector: { select: { mode: "dropdown", options: [
      { value: "knob", label: "Knob (turns freely, coasts)" },
      { value: "arc", label: "Arc (270° dial with ticks)" },
      { value: "tap", label: "Tap (level bar, for tablets)" },
    ] } },
  },
  { name: "zones", label: "Zones (list of { entity, name })", selector: { object: {} } },
  { name: "link_entity", label: "Zone link switch", selector: { entity: { domain: ["switch", "input_boolean"] } } },
];

class MateriaVolumeKnobEditor extends SmartEditorBase {
  _formData() {
    return { style: "knob", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "Title", selector: { text: {} } },
          ...VOLUME_FIELDS,
        ],
      },
    ];
  }
}

customElements.define("materia-volume-knob-editor", MateriaVolumeKnobEditor);
