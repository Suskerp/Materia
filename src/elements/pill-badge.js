import { LitElement, html, css } from "lit";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-pill-badge
 *  Replaces the pill_card button-card template.
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaPillBadgeEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "icon", required: true, selector: { icon: {} } },
      { name: "active_state", selector: { text: {} } },
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
customElements.define("materia-pill-badge-editor", MateriaPillBadgeEditor);

class MateriaPillBadge extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-pill-badge-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "", active_state: "on" };
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
      height: 36px;
      width: 130px;
      padding: 0 8px;
      border-radius: 6px;
      border: 1px solid var(--md-sys-color-on-secondary-container);
      box-shadow: none;
      cursor: pointer;
      font-family: inherit;
      transition: background-color 0.3s ease, color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card.inactive {
      background-color: transparent;
      color: var(--primary-text-color);
    }

    ha-card.active {
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
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
    }

    ha-card.active .icon-cell ha-icon {
      color: var(--md-sys-color-on-secondary-container);
    }

    .name {
      grid-area: n;
      font-size: 13px;
      font-weight: 600;
      padding: 0;
      justify-self: start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ha-card.active .name {
      color: var(--md-sys-color-on-secondary-container);
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!config.icon) throw new Error("icon is required");
    if (!config.name) throw new Error("name is required");
    this.config = {
      active_state: "on",
      ...config,
    };
  }

  _isActive() {
    const stateObj = this.hass?.states[this.config.entity];
    return stateObj?.state === String(this.config.active_state);
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const active = this._isActive();

    return html`
      <ha-card
        class="${active ? "active" : "inactive"}"
        @click=${this._handleTap}
      >
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
    if (!actionConfig) {
      /* Default to more-info if entity present */
      if (this.config.entity) {
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: { entityId: this.config.entity },
          })
        );
      }
      return;
    }
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

customElements.define("materia-pill-badge", MateriaPillBadge);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-pill-badge",
  name: "Materia Pill Badge",
  description: "Material You pill badge card with active state highlighting.",
});
