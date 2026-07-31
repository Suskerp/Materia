import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin, disabledConditionStyles } from "../../utils/conditions.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Generic toggle row (materia-switch): icon + name + secondary line + a spec
 * M3 switch. One entity per card — compose lists (heating zones, plugs…) from
 * several of these.
 *
 * secondary, color and color_on take templates, so the row can escalate its
 * emphasis from state (e.g. heat-container fill while a zone is calling).
 * Default secondary is the localized entity state. Tap toggles (domain-aware);
 * tap_action overrides.
 * flat: true drops the card chrome for nesting inside other cards.
 */
class MateriaSwitch extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedSecondary: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedSwitchColor: { state: true },
    _resolvedSwitchColorOn: { state: true },
  };

  static styles = [styles, disabledConditionStyles];

  static getConfigElement() {
    return document.createElement("materia-switch-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(
      (e) => e.startsWith("switch.") || e.startsWith("input_boolean.")
    ) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Switch: entity is required");
    this.config = config;
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("secondary", "_resolvedSecondary");
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("switch_color", "_resolvedSwitchColor");
      this._resolveField("switch_color_on", "_resolvedSwitchColorOn");
    }
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  get _on() {
    return this._stateObj?.state === "on";
  }

  _tap() {
    this._handleAction(this.config.tap_action || { action: "toggle", entity: this.config.entity });
    this._fireHaptic("light");
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    if (!st) return html`<ha-card class="row off">Unknown entity: ${this.config.entity}</ha-card>`;
    const on = this._on;
    const unavailable = this._isUnavailable(st);
    const name = this.config.name || st.attributes.friendly_name || this.config.entity;
    const icon = this.config.icon || st.attributes.icon || (on ? "mdi:toggle-switch" : "mdi:toggle-switch-off-outline");
    const secondary = this.config.secondary
      ? (this._isTemplate(this.config.secondary) ? this._resolvedSecondary : this.config.secondary)
      : (this.hass.formatEntityState?.(st) ?? st.state);
    const bg = this._isTemplate(this.config.color) ? (this._resolvedColor || "").trim() : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? (this._resolvedColorOn || "").trim() : this.config.color_on;
    // Switch-only colors (selected track / thumb) — the row stays neutral.
    const track = this._isTemplate(this.config.switch_color) ? (this._resolvedSwitchColor || "").trim() : this.config.switch_color;
    const thumb = this._isTemplate(this.config.switch_color_on) ? (this._resolvedSwitchColorOn || "").trim() : this.config.switch_color_on;
    return html`
      <ha-card
        class="row ${on ? "on" : "off"} ${bg ? "colored" : ""} ${this.config.flat ? "flat" : ""} ${unavailable ? "unavailable" : ""}"
        style="${bg ? `background:${bg};` : ""}${fg ? `color:${fg};` : ""}"
        @click=${this._tap}
      >
        <ha-icon class="r-icon" icon=${icon}></ha-icon>
        <div class="r-text">
          <span class="r-name">${name}</span>
          ${secondary ? html`<span class="r-sub">${secondary}</span>` : ""}
        </div>
        <div class="m3-switch ${on ? "on" : ""}"
          style="${track ? `--ms-track:${track};` : ""}${thumb ? `--ms-thumb:${thumb};` : ""}"><i></i></div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-switch", MateriaSwitch);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-switch",
  name: "Materia Switch",
  description: "Toggle row with a spec M3 switch — templatable secondary text and state-driven colors.",
  preview: true,
});
