import { LitElement, html, css } from "lit";
import { injectFonts, materiaCardStyles } from "../styles/shared.js";

class MateriaPillToggle extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!config.left_service) throw new Error("left_service is required");
    if (!config.left_service_data) throw new Error("left_service_data is required");
    if (!config.right_service) throw new Error("right_service is required");
    if (!config.right_service_data) throw new Error("right_service_data is required");
    this._config = {
      left_name: "On",
      right_name: "Off",
      left_state: "on",
      right_state: "off",
      color_active: "var(--md-sys-color-primary)",
      color_on_active: "var(--md-sys-color-on-primary)",
      height: "88px",
      ...config,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    injectFonts();
  }

  _callService(service, serviceData) {
    if (!this.hass || !service) return;
    const [domain, action] = service.split(".");
    this.hass.callService(domain, action, serviceData);
  }

  _handleLeftTap() {
    const c = this._config;
    this._callService(c.left_service, c.left_service_data);
  }

  _handleRightTap() {
    const c = this._config;
    this._callService(c.right_service, c.right_service_data);
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const c = this._config;
    const stateObj = this.hass.states[c.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${c.entity}</ha-card>`;

    const state = stateObj.state;
    const leftActive = state === c.left_state;
    const rightActive = state === c.right_state;

    return html`
      <ha-card>
        <div class="container" style="--pill-height: ${c.height}">
          <button
            class="pill left ${leftActive ? "active" : ""}"
            style="
              --bg: ${leftActive ? c.color_active : "var(--card-background-color)"};
              --fg: ${leftActive ? c.color_on_active : "var(--primary-text-color)"};
              --bdr: ${leftActive ? `2px solid ${c.color_on_active}` : "1px solid transparent"};
            "
            @click=${this._handleLeftTap}
          >
            ${c.left_name}
          </button>
          <button
            class="pill right ${rightActive ? "active" : ""}"
            style="
              --bg: ${rightActive ? c.color_active : "var(--card-background-color)"};
              --fg: ${rightActive ? c.color_on_active : "var(--primary-text-color)"};
              --bdr: ${rightActive ? `2px solid ${c.color_on_active}` : "1px solid transparent"};
            "
            @click=${this._handleRightTap}
          >
            ${c.right_name}
          </button>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 2;
  }

  static get styles() {
    return [
      materiaCardStyles,
      css`
        ha-card {
          box-shadow: none;
          background: transparent;
          border: none;
        }

        .container {
          display: flex;
          gap: 0;
        }

        .pill {
          flex: 1;
          height: var(--pill-height, 88px);
          padding: 8px;
          cursor: pointer;
          background-color: var(--bg);
          color: var(--fg);
          border: var(--bdr);
          font-family: inherit;
          font-weight: bold;
          font-size: 14px;
          transition: background-color 0.2s ease, color 0.2s ease, border 0.2s ease;
          outline: none;
        }

        .pill.left {
          border-radius: 999px 0 0 999px;
        }

        .pill.right {
          border-radius: 0 999px 999px 0;
        }
      `,
    ];
  }
}

customElements.define("materia-pill-toggle", MateriaPillToggle);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-pill-toggle",
  name: "Materia Pill Toggle",
  description: "A two-option pill toggle for any entity",
});
