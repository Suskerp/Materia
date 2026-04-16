import { LitElement, html, css } from "lit";
import "../../elements/icon-button/index.js";

class MateriaIconRow extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 4px 0;
    }
  `;

  setConfig(config) {
    if (!Array.isArray(config.buttons) || config.buttons.length === 0) {
      throw new Error("buttons array is required");
    }
    this.config = config;
  }

  getCardSize() {
    return 1;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    return html`
      <div class="row">
        ${this.config.buttons.map(btn => html`
          <materia-icon-button
            .hass=${this.hass}
            .config=${{ variant: "filled", size: "default", ...btn }}
          ></materia-icon-button>
        `)}
      </div>
    `;
  }
}

customElements.define("materia-icon-row", MateriaIconRow);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-icon-row",
  name: "Materia Icon Row",
  description: "A centered row of icon buttons.",
  preview: false,
});
