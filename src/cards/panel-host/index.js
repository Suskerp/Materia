import { LitElement, html, css, nothing } from "lit";
import { loadCardHelpers } from "../../styles/shared.js";
import { PanelHostMixin, panelChromeStyles } from "../../primitives/panels.js";
import "./editor.js";

/**
 * materia-panel-host — a stack of cards that can open named panels.
 *
 *   type: custom:materia-panel-host
 *   mode: inline          # inline (default) | sheet
 *   timeout: 30           # seconds without a touch before a panel closes; 0 = never
 *   panels:
 *     volume: { heading: Volume, actions: [...], cards: [...] }   # head: false = no head row
 *     stations: { type: custom:materia-station-grid, ... }
 *   cards: [...]
 *
 * Any button, chip or tile inside opens a panel with
 * `tap_action: { action: materia-panel, panel: volume }`; a second tap closes it.
 * INLINE swaps the cards for the panel in place, at the cards' height, with a
 * back arrow; SHEET opens a bottom sheet. The host draws the heading and the
 * back / close button, so the panel's content can be any card.
 */
class MateriaPanelHost extends PanelHostMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _cards: { state: true },
    _inlineH: { state: true },
  };

  static styles = [
    panelChromeStyles,
    css`
      :host {
        display: block;
      }
      .cards {
        display: flex;
        flex-direction: column;
      }
      .cards[hidden] {
        display: none !important;
      }
      .inline {
        overflow: hidden;
      }
    `,
  ];

  static getConfigElement() {
    return document.createElement("materia-panel-host-editor");
  }

  static getStubConfig() {
    return {
      mode: "inline",
      panels: { more: { heading: "More", cards: [{ type: "markdown", content: "Panel content" }] } },
      cards: [
        {
          type: "custom:materia-button",
          name: "Open panel",
          tap_action: { action: "materia-panel", panel: "more" },
        },
      ],
    };
  }

  setConfig(config) {
    if (!Array.isArray(config.cards)) throw new Error("cards is required");
    const modeChanged = this.config && this.config.mode !== config.mode;
    this.config = { mode: "inline", timeout: 30, gap: 16, ...config };
    if (modeChanged) this.closePanel(true);
    const sig = JSON.stringify(config.cards);
    if (sig !== this.__sig) {
      this.__sig = sig;
      this._buildCards();
    }
  }

  async _buildCards() {
    const sig = this.__sig;
    const helpers = await loadCardHelpers();
    const els = await Promise.all(
      this.config.cards.map(async (c) => {
        const el = await helpers.createCardElement(c);
        if (this.hass) el.hass = this.hass;
        return el;
      })
    );
    if (sig === this.__sig) this._cards = els;
  }

  _panelRegistry() {
    return this.config?.panels ?? {};
  }

  _panelMode() {
    return this.config?.mode === "sheet" ? "sheet" : "inline";
  }

  _panelTimeout() {
    return this.config?.timeout ?? 30;
  }

  /** Inline: the panel takes the cards' height, so the card does not change size. */
  _beforePanelOpen(mode) {
    if (mode === "inline" && !this._panelEl) this._inlineH = this.renderRoot.querySelector(".cards")?.offsetHeight ?? 0;
  }

  updated(changed) {
    super.updated(changed);
    if (changed.has("hass") && this.hass && this._cards) for (const el of this._cards) el.hass = this.hass;
  }

  render() {
    if (!this.config) return nothing;
    const open = !!this._panelEl;
    const h = this._inlineH > 0 ? `height:${this._inlineH}px;` : "";
    return html`
      <div class="cards" style="gap:${Number(this.config.gap)}px;" ?hidden=${open}>${this._cards ?? nothing}</div>
      ${open ? html`<div class="inline" style=${h}>${this._renderPanel(true)}</div>` : nothing}
    `;
  }

  getCardSize() {
    return this._cards?.reduce((n, el) => n + (el.getCardSize?.() ?? 1), 0) ?? 1;
  }

  getGridOptions() {
    return { columns: "full", rows: "auto" };
  }
}

customElements.define("materia-panel-host", MateriaPanelHost);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-panel-host",
  name: "Materia Panel Host",
  description: "A stack of cards whose buttons open named panels inline or in a bottom sheet.",
  preview: false,
});
