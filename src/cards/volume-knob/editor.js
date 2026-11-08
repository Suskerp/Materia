import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import "../../utils/media-editors.js";

const BLOCK_KEYS = ["zones", "link_entity", "style"];

/** The knob's own config IS a volume block (zones, link_entity, style) at the top level. */
class MateriaVolumeKnobEditor extends SmartEditorBase {
  _setBlock(block) {
    const next = { ...this._config };
    for (const k of BLOCK_KEYS) {
      if (block?.[k] === undefined) delete next[k];
      else next[k] = block[k];
    }
    this._commit(next);
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "media_player" } } },
          { name: "name", label: "Title", selector: { text: {} } },
          {
            name: "zones",
            render: (_value, data) => html`<materia-volume-editor
              .hass=${this.hass}
              .value=${Object.fromEntries(BLOCK_KEYS.filter((k) => data[k] !== undefined).map((k) => [k, data[k]]))}
              .defaultEntity=${data.entity}
              @value-changed=${(e) => {
                e.stopPropagation();
                this._setBlock(e.detail.value);
              }}
            ></materia-volume-editor>`,
          },
        ],
      },
    ];
  }
}

customElements.define("materia-volume-knob-editor", MateriaVolumeKnobEditor);
