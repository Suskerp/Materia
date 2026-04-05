import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts, materiaCardStyles } from "../styles/shared.js";

/* ───────────────────────────────────────────────
 *  materia-sensor-row-editor
 *  Visual config editor for materia-sensor-row.
 * ─────────────────────────────────────────────── */

class MateriaSensorRowEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "sensor" } } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "padding", selector: { text: {} } },
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
customElements.define("materia-sensor-row-editor", MateriaSensorRowEditor);

class MateriaSensorRow extends ActionMixin(LitElement) {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("materia-sensor-row-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", padding: "0px 20px" };
  }

  /* Expose config for ActionMixin compatibility */
  get config() {
    return this._config;
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
    this._handleAction(this._config.tap_action);
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
