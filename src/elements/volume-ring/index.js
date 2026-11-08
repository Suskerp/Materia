import { LitElement, html, css } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { SheetOpenerMixin } from "../../primitives/sheet.js";
import { t } from "../../utils/i18n.js";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";
import { volumeRing, volumeRingStyles } from "./ring.js";
import "./editor.js";

/**
 * materia-volume-ring — a 48 px button showing the volume as a thin 270° arc
 * plus the number. Tap opens panel `volume` (or one vertical level in a sheet); the
 * `volume:` block is that knob's config (zones, link_entity, style).
 */
class MateriaVolumeRing extends SheetOpenerMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = [
    hostStyles,
    haCardReset,
    motionTokens,
    mediaTokens,
    volumeRingStyles,
    css`
      :host {
        display: inline-block;
      }
      button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--mx-s2);
        color: var(--mx-p);
        transition:
          border-radius var(--md-sys-motion-expressive-fast-spatial),
          background-color var(--md-sys-motion-fast-effects);
      }
      button:active {
        border-radius: 12px;
      }
      button.open {
        background: var(--mx-sc);
        color: var(--mx-osc);
      }
    `,
  ];

  static getConfigElement() {
    return document.createElement("materia-volume-ring-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = config;
  }

  _open(e) {
    this._openVolumePanel(e.currentTarget);
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const s = this.hass.states[this._mediaEntity()];
    return html`<ha-card>
      <button
        class=${this._openPanel === "volume" ? "open" : ""}
        aria-label=${t("media_volume", this.hass)}
        aria-expanded=${this._openPanel === "volume" ? "true" : "false"}
        @click=${this._open}
      >${volumeRing(s)}</button>
    </ha-card>`;
  }

  getGridOptions() {
    return { columns: 3, rows: 1, min_columns: 1 };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-volume-ring", MateriaVolumeRing);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-volume-ring",
  name: "Materia Volume Ring",
  description: "48 px volume button (thin arc + number) that opens the volume knob in a bottom sheet.",
  preview: true,
});
