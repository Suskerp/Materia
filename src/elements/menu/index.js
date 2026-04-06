import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaMenu extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _open: { state: true },
    _optimisticValue: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-menu-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(
      (e) => e.startsWith("input_select.") || e.startsWith("select.")
    ) || "";
    return { entity };
  }

  setConfig(config) {
    this.config = { position: "below", ...config };
    this._open = false;
  }

  get _resolvedOptions() {
    if (this.config.options?.length) return this.config.options;
    const stateObj = this.hass?.states[this.config.entity];
    const domain = this.config.entity?.split(".")[0];
    if ((domain === "input_select" || domain === "select") && stateObj?.attributes?.options) {
      return stateObj.attributes.options.map((opt) => ({
        label: this._capitalize(opt),
        value: opt,
      }));
    }
    return [];
  }

  get _currentValue() {
    if (this._optimisticValue != null) return this._optimisticValue;
    return this.hass?.states[this.config.entity]?.state ?? "";
  }

  _toggle() {
    this._open = !this._open;
  }

  _selectOption(opt) {
    const value = opt.value;
    this._optimisticValue = value;
    this._open = false;

    const domain = this.config.entity?.split(".")[0];
    if (domain === "input_select" || domain === "select") {
      this.hass.callService(domain, "select_option", {
        entity_id: this.config.entity,
        option: value,
      });
    }

    clearTimeout(this._optimisticTimer);
    this._optimisticTimer = setTimeout(() => {
      this._optimisticValue = null;
    }, 10000);
  }

  connectedCallback() {
    super.connectedCallback();
    this._outsideClickHandler = (e) => {
      if (this._open && !this.shadowRoot.contains(e.composedPath()[0])) {
        this._open = false;
      }
    };
    document.addEventListener("click", this._outsideClickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this._outsideClickHandler);
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this._optimisticValue != null) {
      const actual = this.hass?.states[this.config.entity]?.state;
      if (actual === this._optimisticValue) {
        this._optimisticValue = null;
        clearTimeout(this._optimisticTimer);
      }
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const options = this._resolvedOptions;
    const currentValue = this._currentValue;
    const currentLabel = options.find((o) => o.value === currentValue)?.label || this._capitalize(currentValue);
    const name = this.config.name || stateObj?.attributes?.friendly_name || "";

    return html`
      <ha-card>
        <div class="trigger ${unavailable ? "unavailable" : ""} ${this._open ? (this.config.position === "above" ? "open-above" : "open-below") : ""}" @click=${this._toggle}>
          ${this.config.icon ? html`
            <div class="icon-container">
              <ha-icon .icon=${this.config.icon}></ha-icon>
            </div>
          ` : ""}
          <div class="text-container">
            ${name ? html`<div class="label">${name}</div>` : ""}
            <div class="value">${currentLabel}</div>
          </div>
          <div class="chevron-btn" @click=${(e) => { e.stopPropagation(); this._toggle(); }}>
            <ha-icon class="chevron" icon=${this._open ? "m3of:arrow-drop-up" : "m3of:arrow-drop-down"}></ha-icon>
          </div>
        </div>
        <div class="dropdown-wrapper ${this._open ? "open" : ""} ${this.config.position === "above" ? "above" : "below"}">
          <div class="dropdown">
            ${options.map((opt) => html`
              <div
                class="menu-item ${opt.value === currentValue ? "selected" : ""}"
                @click=${(e) => { e.stopPropagation(); this._selectOption(opt); }}
              >
                ${opt.icon ? html`<ha-icon .icon=${opt.icon}></ha-icon>` : ""}
                <span class="item-text">${opt.label || opt.value}</span>
              </div>
            `)}
          </div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return this._open ? 3 : 2;
  }
}

customElements.define("materia-menu", MateriaMenu);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-menu",
  name: "Materia Menu",
  description: "M3 vertical dropdown menu for select entities.",
  preview: true,
});
