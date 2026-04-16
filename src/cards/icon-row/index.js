import { LitElement, html, css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import "../../elements/icon-button/index.js";
import "./editor.js";

class MateriaIconRow extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = [
    hostStyles,
    css`
      .row {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];

  static getConfigElement() {
    return document.createElement("materia-icon-row-editor");
  }

  static getStubConfig() {
    return {
      buttons: [
        { icon: "mdi:arrow-left", variant: "filled-tonal", size: "default" },
        { icon: "mdi:play", variant: "filled", size: "large" },
        { icon: "mdi:stop", variant: "filled", size: "large" },
        { icon: "mdi:arrow-right", variant: "filled-tonal", size: "default" },
      ],
      gap: 8,
      padding: 4,
    };
  }

  setConfig(config) {
    if (!Array.isArray(config.buttons) || config.buttons.length === 0) {
      throw new Error("buttons array is required");
    }
    this.config = { gap: 8, padding: 4, ...config };
  }

  getCardSize() {
    return 1;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const gap = this.config.gap ?? 8;
    const padding = this.config.padding ?? 4;

    return html`
      <div class="row" style="gap: ${gap}px; padding: ${padding}px 0;">
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
  description: "A centered row of icon buttons with configurable spacing.",
  preview: true,
});
