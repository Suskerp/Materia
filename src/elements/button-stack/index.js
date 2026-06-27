import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaButtonStack extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedName: { state: true },
    _resolvedActiveColor: { state: true },
    _resolvedActiveColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-button-stack-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("lock.")) || "";
    return {
      entity,
      options: [
        { icon: "m3o:lock-open", value: "unlocked", tap_action: { action: "perform-action", perform_action: "lock.unlock", target: { entity_id: entity } } },
        { icon: "m3o:lock", value: "locked", tap_action: { action: "perform-action", perform_action: "lock.lock", target: { entity_id: entity } } },
      ],
    };
  }

  setConfig(config) {
    if (!Array.isArray(config.options) || config.options.length === 0) {
      throw new Error("at least one option is required");
    }
    this.config = config;
  }

  updated(changed) {
    if (changed.has("hass") && this.hass) {
      this._resolveField("name", "_resolvedName");
      this._resolveField("active_color", "_resolvedActiveColor");
      this._resolveField("active_color_on", "_resolvedActiveColorOn");
    }
  }

  get _name() {
    if (!this.config.name) return "";
    return this._isTemplate(this.config.name) ? this._resolvedName : this.config.name;
  }

  /**
   * Active when the option's `value` matches the entity state (or the
   * configured attribute) — same model as materia-button-group. `value`
   * is optional; omit it for a plain action button.
   */
  _isActive(opt, stateObj) {
    const v = opt.value;
    if (v == null) return false;
    const current = this.config.attribute
      ? stateObj?.attributes?.[this.config.attribute]
      : stateObj?.state;
    if (Array.isArray(v)) return v.map(String).includes(String(current));
    return String(v) === String(current);
  }

  _onOption(opt) {
    if (opt.tap_action) this._handleAction(opt.tap_action);
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entity = this.config.entity;
    const stateObj = entity ? this.hass.states[entity] : undefined;
    const unavailable = entity ? this._isUnavailable(stateObj) : false;
    const options = this.config.options || [];
    const showState = this.config.show_state !== false && !!entity;

    const activeBg = this._resolvedActiveColor || this.config.active_color;
    const activeFg = this._resolvedActiveColorOn || this.config.active_color_on;
    const stackVars =
      `${activeBg ? `--materia-active-bg:${activeBg};` : ""}${activeFg ? `--materia-active-fg:${activeFg};` : ""}`;

    const stateLabel = unavailable
      ? "Unavailable"
      : stateObj
      ? this._capitalize(stateObj.state)
      : "";

    return html`
      <ha-card>
        <div class="wrap ${unavailable ? "unavailable" : ""}">
          ${this._name ? html`<div class="name">${this._name}</div>` : ""}
          <div class="stack" style=${stackVars}>
            ${options.map(
              (opt) => html`
                <button
                  class="segment ${!unavailable && this._isActive(opt, stateObj) ? "active" : ""}"
                  title=${opt.label || ""}
                  @click=${() => this._onOption(opt)}
                >
                  ${opt.icon ? html`<ha-icon .icon=${opt.icon}></ha-icon>` : nothing}
                  ${opt.label ? html`<span class="seg-label">${opt.label}</span>` : nothing}
                </button>
              `
            )}
          </div>
          ${showState ? html`<div class="state">${stateLabel}</div>` : nothing}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return Math.max(2, (this.config?.options?.length || 2) * 2);
  }
}

customElements.define("materia-button-stack", MateriaButtonStack);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-button-stack",
  name: "Materia Button Stack",
  description: "Vertical segmented button — stacked options with optional active-state highlighting.",
  preview: true,
});
