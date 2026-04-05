import { LitElement, html, css } from "lit";
import { ActionMixin } from "../utils/action-handler.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────────────
 *  materia-checkbox
 *  Replaces the checkbox button-card template.
 * ─────────────────────────────────────────────────────── */

/* ── Visual Config Editor ── */
class MateriaCheckboxEditor extends LitElement {
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
      { name: "name", selector: { text: {} } },
      { name: "checked_entity", selector: { entity: {} } },
      { name: "checked_value", selector: { text: {} } },
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
customElements.define("materia-checkbox-editor", MateriaCheckboxEditor);

class MateriaCheckbox extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-checkbox-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "" };
  }

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }

    ha-card {
      box-sizing: border-box;
      height: 44px;
      padding: 0 12px;
      display: grid;
      grid-template-areas: "n i";
      grid-template-columns: 1fr 20px;
      column-gap: 8px;
      align-items: center;
      cursor: pointer;
      font-family: inherit;
      border-radius: 18px;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }

    .name {
      grid-area: n;
      justify-self: start;
      text-align: left;
      align-self: center;
      font-size: var(--ha-font-size-m, 14px);
    }

    .icon-cell {
      grid-area: i;
      height: 20px;
      align-self: center;
      justify-self: end;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 26px;
      width: 34px;
      height: 34px;
      color: var(--md-sys-color-primary);
    }
  `;

  constructor() {
    super();
    injectFonts();
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = {
      tap_action: { action: "toggle" },
      ...config,
    };
  }

  _isChecked(stateObj) {
    /* Custom checked_entity + checked_value logic (e.g. vacuum room queue) */
    if (this.config.checked_entity && this.config.checked_value) {
      const checkedObj = this.hass?.states[this.config.checked_entity];
      if (checkedObj) {
        const values = String(checkedObj.state ?? "")
          .split(",")
          .map((v) => v.trim());
        return values.includes(this.config.checked_value);
      }
      return false;
    }

    if (!stateObj) return false;
    const s = String(stateObj.state ?? "").toLowerCase();
    const n = Number(s);
    return s === "on" || s === "true" || s === "home" || (!Number.isNaN(n) && n > 0);
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const stateObj = this.hass.states[this.config.entity];
    const checked = this._isChecked(stateObj);
    const name =
      this.config.name ??
      stateObj?.attributes?.friendly_name ??
      this.config.entity;
    const icon = checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline";

    return html`
      <ha-card @click=${this._handleTap}>
        <div class="name">${name}</div>
        <div class="icon-cell">
          <ha-icon .icon=${icon}></ha-icon>
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    const actionConfig = this.config.tap_action || { action: "toggle" };
    this._handleAction(actionConfig);
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-checkbox", MateriaCheckbox);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-checkbox",
  name: "Materia Checkbox",
  description: "Material You checkbox row with name and toggle icon.",
});
