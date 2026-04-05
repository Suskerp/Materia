import { LitElement, html, css } from "lit";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-circle-action
 *  Replaces circle_action and circle_action_small templates.
 * ─────────────────────────────────────────────────────── */

class MateriaCircleAction extends LitElement {
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

customElements.define("materia-circle-action", MateriaCircleAction);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-circle-action",
  name: "Materia Circle Action",
  description: "Material You circular action button in normal (66px) or small (52px) sizes.",
});
