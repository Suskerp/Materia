import { LitElement, html, css, nothing } from "lit";
import { loadCardHelpers } from "../../styles/shared.js";

/**
 * materia-stack — cards in a row or a column that FILL the space they get.
 * HA's own stacks size to their content; inside a panel or a mixer that leaves
 * a vertical slider at its minimum. Here the children stretch:
 *
 *   direction: row      — equal columns, each as tall as the stack (a mixer)
 *   direction: column   — stacked; `grow` (index, default the last card) takes
 *                         the remaining height
 *   gap: 16             — px between cards
 */
class MateriaStack extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _cards: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .stack {
      display: flex;
      height: 100%;
      min-height: 0;
      box-sizing: border-box;
    }
    .stack.column {
      flex-direction: column;
    }
    .stack.row > * {
      flex: 1 1 0;
      min-width: 0;
    }
    .stack.column > * {
      flex: none;
    }
    .stack.column > .grow {
      flex: 1 1 auto;
      min-height: 0;
    }
  `;

  setConfig(config) {
    if (!Array.isArray(config.cards)) throw new Error("cards is required");
    this.config = { direction: "column", gap: 16, ...config };
    const sig = JSON.stringify(config.cards);
    if (sig !== this.__sig) {
      this.__sig = sig;
      this._build();
    }
  }

  async _build() {
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

  updated(changed) {
    if (changed.has("hass") && this.hass && this._cards) for (const el of this._cards) el.hass = this.hass;
  }

  render() {
    if (!this.config) return nothing;
    const row = this.config.direction === "row";
    const cards = this._cards ?? [];
    const grow = Number.isInteger(this.config.grow) ? this.config.grow : cards.length - 1;
    if (!row) cards.forEach((el, i) => el.classList.toggle("grow", i === grow));
    return html`<div class="stack ${row ? "row" : "column"}" style="gap:${Number(this.config.gap)}px;">${cards}</div>`;
  }

  getCardSize() {
    const sizes = (this._cards ?? []).map((el) => el.getCardSize?.() ?? 1);
    if (!sizes.length) return 1;
    return this.config?.direction === "row" ? Math.max(...sizes) : sizes.reduce((a, b) => a + b, 0);
  }

  getGridOptions() {
    return { columns: "full", rows: "auto" };
  }
}

customElements.define("materia-stack", MateriaStack);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-stack",
  name: "Materia Stack",
  description: "Cards in a row or column that fill the available space (mixers, panels).",
  preview: false,
});
