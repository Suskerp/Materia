import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-circle-action
 *  Replaces circle_action and circle_action_small templates.
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaCircleActionEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "icon", required: true, selector: { icon: {} } },
      {
        name: "size",
        selector: {
          select: {
            options: [
              { value: "normal", label: "Normal" },
              { value: "small", label: "Small" },
            ],
          },
        },
      },
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
customElements.define("materia-circle-action-editor", MateriaCircleActionEditor);

class MateriaCircleAction extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-circle-action-editor");
  }

  static getStubConfig() {
    return { icon: "mdi:play", size: "normal" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      padding: 0;
      border-radius: 100%;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      box-shadow: none;
      border: none;
      -webkit-tap-highlight-color: transparent;
    }

    /* ---- normal (66px) ---- */
    ha-card.size-normal {
      width: 66px;
      height: 66px;
      background-color: var(--md-sys-color-primary);
    }

    ha-card.size-normal ha-icon {
      color: var(--md-sys-color-on-primary);
    }

    /* ---- small (52px) ---- */
    ha-card.size-small {
      width: 52px;
      height: 52px;
      background-color: var(--ha-card-background);
    }

    ha-card.size-small ha-icon {
      color: var(--primary-text-color);
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.icon) throw new Error("icon is required");
    this.config = {
      size: "normal",
      ...config,
    };
  }

  render() {
    if (!this.config) return html``;

    const size = this.config.size === "small" ? "small" : "normal";

    return html`
      <ha-card class="size-${size}" @click=${this._handleTap}>
        <ha-icon .icon=${this.config.icon}></ha-icon>
      </ha-card>
    `;
  }

  _handleTap() {
    const actionConfig = this.config.tap_action;
    if (!actionConfig) return;
    this._handleAction(actionConfig);
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-circle-action", MateriaCircleAction);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-circle-action",
  name: "Materia Circle Action",
  description: "Material You circular action button in normal (66px) or small (52px) sizes.",
});
