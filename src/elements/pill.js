import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-pill
 *  Generic compact info pill card. Shows icon + name + state
 *  in a rounded pill. Colors are fully configurable.
 * ─────────────────────────────────────────────────────── */

/* ── Editor ── */

class MateriaPillEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
  `;

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "color", selector: { template: {} } },
      { name: "color_on", selector: { template: {} } },
      {
        name: "tap_action",
        type: "expandable",
        schema: [
          {
            name: "action",
            selector: {
              select: {
                options: [
                  { value: "none", label: "None" },
                  { value: "more-info", label: "More info" },
                  { value: "navigate", label: "Navigate" },
                  { value: "toggle", label: "Toggle" },
                  { value: "call-service", label: "Call service" },
                ],
              },
            },
          },
          { name: "navigation_path", selector: { text: {} } },
        ],
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
    this._config = ev.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("materia-pill-editor", MateriaPillEditor);

/* ── Card ── */

class MateriaPill extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-pill-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "mdi:information-outline" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
    }
    .container {
      position: relative;
      width: 100%;
      min-height: 50px;
      background-color: var(--ha-card-background, var(--card-background-color));
      border-radius: 28px;
      overflow: hidden;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition: background-color 0.3s ease, color 0.3s ease;
      cursor: pointer;
    }
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      min-height: 42px;
      margin: 6px;
      margin-left: 8px;
      border-radius: 50%;
      background-color: transparent;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    .icon-container ha-icon {
      --mdc-icon-size: 24px;
      display: flex;
    }
    .name-container {
      display: flex;
      line-height: 18px;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      margin: 0 16px 0 4px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .state {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
    }
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = {
      icon: "mdi:information-outline",
      ...config,
    };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj)
      return html`<ha-card>Entity not found: ${this.config.entity}</ha-card>`;

    const name =
      this.config.name ||
      stateObj.attributes.friendly_name ||
      this.config.entity;
    const icon = this.config.icon;
    const unit = stateObj.attributes.unit_of_measurement || "";
    const stateText = unit
      ? `${this._capitalize(stateObj.state)} ${unit}`
      : this._capitalize(stateObj.state);

    // Colors: use config overrides, else default
    const containerBg =
      this.config.color ||
      "var(--ha-card-background, var(--card-background-color))";
    const textColor =
      this.config.color_on || "var(--primary-text-color)";

    return html`
      <ha-card>
        <div
          class="container"
          style="background-color: ${containerBg}; color: ${textColor};"
          @click=${this._handleTap}
        >
          <div class="icon-container">
            <ha-icon .icon=${icon} style="color: ${textColor};"></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${name}</div>
            <div class="state">${stateText}</div>
          </div>
          ${this._hasNavigateAction
            ? html` <ha-icon
                class="chevron"
                icon="mdi:chevron-right"
              ></ha-icon>`
            : ""}
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    const action = this.config.tap_action || { action: "more-info" };
    this._handleAction(action);
  }

  getGridOptions() {
    return { columns: 6, rows: "auto" };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-pill", MateriaPill);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-pill",
  name: "Materia Pill",
  description:
    "Compact info pill card with configurable icon, name, state, and colors.",
});
