import { html, nothing } from "lit";
import { nextSource } from "../../utils/media.js";
import { t } from "../../utils/i18n.js";
import { MenuButton } from "../menu-list/index.js";
import { sourceList, sourceMode } from "../menu-list/model.js";
import "./editor.js";

/**
 * materia-media-source — the media header's source button. `mode: cycle`
 * (default) steps through the player's source_list on each tap;
 * `mode: menu` opens the list as a popover (the power menu's look). The
 * player is `entity`, else the art scope's. Nothing renders while the
 * player has no source_list.
 */
class MateriaMediaSource extends MenuButton {
  static getConfigElement() {
    return document.createElement("materia-media-source-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity };
  }

  _select(source) {
    this._fireHaptic("light");
    this._callService("media_player", "select_source", { entity_id: this._entityId, source });
  }

  _cycle() {
    const source = nextSource(this.hass.states[this._entityId]);
    if (source) this._select(source);
  }

  _rows(list, current) {
    return list.map(
      (source) => html`<button
        class="prow"
        role="menuitemradio"
        aria-checked=${source === current ? "true" : "false"}
        @click=${() => {
          this._select(source);
          this._closeMenu();
        }}
      >
        <span class="pname">${source}</span>
        ${source === current ? html`<ha-icon icon="mdi:check"></ha-icon>` : nothing}
      </button>`
    );
  }

  render() {
    const s = this.hass?.states[this._entityId];
    const list = sourceList(s);
    if (!list.length) return nothing;
    const menu = sourceMode(this.config) === "menu";
    return html`<button
        class="iconbtn ${menu && this._menu ? "open" : ""}"
        aria-label=${t("media_source", this.hass)}
        aria-haspopup=${menu ? "menu" : nothing}
        aria-expanded=${menu ? (this._menu ? "true" : "false") : nothing}
        @click=${menu ? (e) => this._toggleMenu(e, "start") : this._cycle}
      ><ha-icon icon="mdi:import"></ha-icon></button
      >${menu ? this._popover(this._menu ? this._rows(list, s.attributes.source) : nothing, "start scroll") : nothing}`;
  }
}

customElements.define("materia-media-source", MateriaMediaSource);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-media-source",
  name: "Materia Media Source",
  description: "A player's source button: tap to cycle the inputs, or open them as a menu.",
  preview: true,
});
