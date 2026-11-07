import { SmartEditorBase } from "../../utils/smart-editor.js";

/** The `volume:` block shared by every element that opens the volume knob. */
export const VOLUME_BLOCK_FIELD = {
  name: "volume",
  label: "Volume knob (entity, zones, link_entity, style)",
  selector: { object: {} },
};

class MateriaVolumeRingEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          VOLUME_BLOCK_FIELD,
        ],
      },
    ];
  }
}

customElements.define("materia-volume-ring-editor", MateriaVolumeRingEditor);
