import { LitElement, html, css } from "lit";
import { injectFonts, materiaCardStyles } from "../styles/shared.js";

class MateriaSensorRow extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!config.name) throw new Error("name is required");
    this._config = {
      padding: "0px 20px",
      ...config,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    injectFonts();
  }

  _handleTap() {
    if (!this.hass || !this._config.tap_action) return;
    const action = this._config.tap_action;

    switch (action.action) {
      case "call-service": {
        const [domain, service] = action.service.split(".");
        this.hass.callService(domain, service, action.service_data || {});
        break;
      }
      case "more-info": {
        const event = new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: action.entity || this._config.entity },
        });
        this.dispatchEvent(event);
        break;
      }
      case "navigate": {
        history.pushState(null, "", action.navigation_path);
        const navEvent = new CustomEvent("location-changed", {
          bubbles: true,
          composed: true,
        });
        window.dispatchEvent(navEvent);
        break;
      }
      default:
        break;
    }
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const c = this._config;
    const stateObj = this.hass.states[c.entity];
    if (!stateObj) return html`<ha-card>Entity not found: ${c.entity}</ha-card>`;

    const stateStr = stateObj.state;
    const unit = stateObj.attributes.unit_of_measurement || "";
    const displayState = unit ? `${stateStr} ${unit}` : stateStr;
    const hasTap = !!c.tap_action;

    return html`
      <ha-card
        class="${hasTap ? "clickable" : ""}"
        style="--row-padding: ${c.padding}"
        @click=${hasTap ? this._handleTap : undefined}
      >
        <div class="row">
          <span class="name">${c.name}</span>
          <span class="state">${displayState}</span>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }

  static get styles() {
    return [
      materiaCardStyles,
      css`
        ha-card {
          box-shadow: none;
          border-radius: 18px;
        }

        ha-card.clickable {
          cursor: pointer;
        }

        .row {
          display: grid;
          grid-template-areas: "n s";
          grid-template-columns: 1fr auto;
          align-items: center;
          padding: var(--row-padding, 0px 20px);
          font-size: 14px;
          font-weight: 400;
        }

        .name {
          grid-area: n;
          justify-self: start;
        }

        .state {
          grid-area: s;
          justify-self: end;
        }
      `,
    ];
  }
}

customElements.define("materia-sensor-row", MateriaSensorRow);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-sensor-row",
  name: "Materia Sensor Row",
  description: "A simple name/value row for displaying sensor data",
});
