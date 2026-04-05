import { LitElement, html, css } from "lit";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-tonal-button
 *  Replaces the tonal_button button-card template.
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaTonalButtonEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", selector: { entity: {} } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "icon", required: true, selector: { icon: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s) => s.name.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
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
customElements.define("materia-tonal-button-editor", MateriaTonalButtonEditor);

class MateriaTonalButton extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-tonal-button-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 40px;
      width: fit-content;
      padding: 0 12px;
      border-radius: 999px;
      border: none;
      box-shadow: none;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      transition: transform 0.15s ease;
    }

    ha-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: var(--md-sys-color-on-secondary-container);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease;
    }

    ha-card:hover::before {
      opacity: 0.08;
    }

    ha-card:active::before {
      opacity: 0.12;
    }

    ha-card:active {
      transform: scale(0.98);
    }

    .grid {
      display: grid;
      grid-template-areas: "i n";
      grid-template-columns: 18px auto;
      column-gap: 8px;
      align-items: center;
      width: 100%;
    }

    .icon-cell {
      grid-area: i;
      margin: 0;
      padding: 0;
      width: 18px;
      min-width: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--md-sys-color-on-secondary-container);
    }

    .name {
      grid-area: n;
      font-size: 13px;
      font-weight: 600;
      padding: 0;
      justify-self: start;
      color: var(--md-sys-color-on-secondary-container);
      white-space: nowrap;
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.icon) throw new Error("icon is required");
    if (!config.name) throw new Error("name is required");
    this.config = config;
  }

  render() {
    if (!this.config) return html``;

    return html`
      <ha-card @click=${this._handleTap}>
        <div class="grid">
          <div class="icon-cell">
            <ha-icon .icon=${this.config.icon}></ha-icon>
          </div>
          <div class="name">${this.config.name}</div>
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    const actionConfig = this.config.tap_action;
    if (!actionConfig) return;
    this._handleAction(actionConfig);
  }

  _handleAction(actionConfig) {
    if (!actionConfig || actionConfig.action === "none") return;

    switch (actionConfig.action) {
      case "toggle":
        if (this.config.entity) {
          this.hass.callService("homeassistant", "toggle", {
            entity_id: this.config.entity,
          });
        }
        break;

      case "call-service": {
        const [domain, service] = (actionConfig.service || "").split(".", 2);
        if (domain && service) {
          this.hass.callService(domain, service, {
            ...actionConfig.service_data,
            ...actionConfig.data,
          }, actionConfig.target);
        }
        break;
      }

      case "navigate":
        history.pushState(null, "", actionConfig.navigation_path);
        this.dispatchEvent(
          new Event("location-changed", { bubbles: true, composed: true })
        );
        break;

      case "more-info":
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { entityId: actionConfig.entity || this.config.entity },
          })
        );
        break;

      default:
        break;
    }
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-tonal-button", MateriaTonalButton);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-tonal-button",
  name: "Materia Tonal Button",
  description: "Material You tonal pill button with hover and active states.",
});
