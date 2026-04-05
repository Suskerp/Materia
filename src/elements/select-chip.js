import { LitElement, html, css } from "lit";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-select-chip
 *  Replaces the select_chip button-card template.
 * ─────────────────────────────────────────────────────── */

class MateriaSelectChip extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      height: 46px;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0px;
      cursor: pointer;
      font-family: inherit;
      transition: background-color 0.3s ease, color 0.3s ease, border-radius 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card.active {
      background-color: var(--md-sys-color-secondary);
      color: var(--md-sys-color-secondary-container);
      gap: 8px;
    }

    ha-card.inactive {
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      display: none;
    }

    ha-card.active ha-icon {
      display: inline-flex;
      color: var(--md-sys-color-secondary-container);
    }

    .label {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (config.option === undefined) throw new Error("option is required");
    if (!config.label) throw new Error("label is required");
    this.config = config;
  }

  _isActive() {
    const stateObj = this.hass?.states[this.config.entity];
    return stateObj?.state === String(this.config.option);
  }

  _getBorderRadius(active) {
    const pos = this.config.position || "";
    const isLeft = pos === "left";
    const isRight = pos === "right";

    const tl = (isLeft || active) ? "30px" : "8px";
    const tr = (isRight || active) ? "30px" : "8px";
    const br = (isRight || active) ? "30px" : "8px";
    const bl = (isLeft || active) ? "30px" : "8px";

    return `${tl} ${tr} ${br} ${bl}`;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const active = this._isActive();
    const borderRadius = this._getBorderRadius(active);

    return html`
      <ha-card
        class="${active ? "active" : "inactive"}"
        style="border-radius: ${borderRadius};"
        @click=${this._handleTap}
      >
        <ha-icon .icon=${"mdi:check"}></ha-icon>
        <span class="label">${this.config.label}</span>
      </ha-card>
    `;
  }

  _handleTap() {
    this.hass.callService("select", "select_option", {
      entity_id: this.config.entity,
      option: String(this.config.option),
    });
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-select-chip", MateriaSelectChip);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-select-chip",
  name: "Materia Select Chip",
  description: "Material You select chip with active/inactive states and positional border-radius.",
});
