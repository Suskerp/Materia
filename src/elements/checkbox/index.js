import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

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

  static styles = [unavailableStyles, styles];

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = {
      tap_action: { action: "toggle" },
      ...config,
    };
  }

  _isChecked(stateObj) {
    if (this.config.checked_entity) {
      const checkedObj = this.hass?.states[this.config.checked_entity];
      if (!checkedObj) return false;
      const values = String(checkedObj.state ?? "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      if (this.config.checked_values) {
        return this.config.checked_values.every((v) => values.includes(v));
      }
      if (this.config.checked_value) {
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
    const unavailable = this._isUnavailable(stateObj);
    const checked = !unavailable && this._isChecked(stateObj);
    const name =
      this.config.name ??
      stateObj?.attributes?.friendly_name ??
      this.config.entity;
    const icon = checked ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline";

    return html`
      <ha-card class="${unavailable ? 'unavailable' : ''}" @click=${this._handleTap}>
        <div class="name">${name}</div>
        <div class="icon-cell">
          <ha-icon .icon=${icon}></ha-icon>
        </div>
      </ha-card>
    `;
  }

  _handleTap() {
    const stateObj = this.hass?.states[this.config.entity];
    const checked = this._isChecked(stateObj);

    let actionConfig;
    if (checked && this.config.tap_action_checked) {
      actionConfig = this.config.tap_action_checked;
    } else if (!checked && this.config.tap_action_unchecked) {
      actionConfig = this.config.tap_action_unchecked;
    } else {
      actionConfig = this.config.tap_action || { action: "toggle" };
    }
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
