import { LitElement, html, css } from "lit";
import { computeLabel } from "../utils/editor-helpers.js";

/* ───────────────────────────────────────────────
 *  materia-separator-editor
 * ─────────────────────────────────────────────── */

class MateriaSeparatorEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "label", selector: { text: {} } },
      { name: "color", selector: { text: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    const config = ev.detail.value;
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("materia-separator-editor", MateriaSeparatorEditor);

/* ───────────────────────────────────────────────
 *  materia-separator
 *  Simple horizontal line divider with optional label.
 * ─────────────────────────────────────────────── */

class MateriaSeparator extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-separator-editor");
  }

  static getStubConfig() {
    return { label: "" };
  }

  static styles = css`
    :host {
      display: block;
      padding: 8px 0;
    }
    .separator {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .line {
      flex: 1;
      height: 1px;
      background: var(--separator-color, var(--md-sys-color-outline-variant));
    }
    .label {
      font-size: 12px;
      font-weight: 500;
      color: var(--md-sys-color-on-surface-variant);
      white-space: nowrap;
    }
  `;

  setConfig(config) {
    this.config = { ...config };
  }

  render() {
    if (!this.config) return html``;

    const color = this.config.color || "";
    const styleStr = color ? `--separator-color: ${color}` : "";
    const label = this.config.label;

    if (!label) {
      return html`<div class="separator" style="${styleStr}"><div class="line"></div></div>`;
    }

    return html`
      <div class="separator" style="${styleStr}">
        <div class="line"></div>
        <span class="label">${label}</span>
        <div class="line"></div>
      </div>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-separator", MateriaSeparator);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-separator",
  name: "Materia Separator",
  description: "Simple horizontal line divider with optional label.",
});
