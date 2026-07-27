import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

const SCALE = {
  green: "var(--md-sys-cust-color-scale-green, #5E9E50)",
  orange: "var(--md-sys-cust-color-scale-orange, #D9713C)",
  red: "var(--md-sys-cust-color-scale-red, #C94D42)",
};

/**
 * Dedicated robot-vacuum glance (materia-vacuum-glance): name top-left, the
 * vacuum's state centered in the middle, the current room at the bottom
 * while it's actively cleaning, and a vertical battery bar on the right.
 *
 * Purpose-built rather than composed from materia-glance-tile: a robot
 * vacuum pairs three entities (vacuum + status + room + battery) with
 * conditional logic (room only while cleaning) that a generic tile would
 * need Jinja templates to express.
 */
class MateriaVacuumGlance extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-vacuum-glance-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("vacuum.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Vacuum Glance: entity is required");
    this.config = { ...config };
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  _fmtState(stateObj) {
    return this.hass.formatEntityState?.(stateObj) ?? stateObj.state;
  }

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    const name = this.config.name || st?.attributes?.friendly_name || this.config.entity;
    const icon = this.config.icon || st?.attributes?.icon || "mdi:robot-vacuum";

    if (!st || this._isUnavailable(st)) {
      return html`<ha-card><div class="tile">
        <div class="header"><ha-icon icon=${icon}></ha-icon><span>${name}</span></div>
        <div class="substate">${st ? this._fmtState(st) : "Entity not found"}</div>
      </div></ha-card>`;
    }

    const active = st.state === "cleaning";

    const statusEntity = this.config.status_entity ? this.hass.states[this.config.status_entity] : null;
    const stateText = statusEntity ? this._fmtState(statusEntity) : this._fmtState(st);

    const roomEntity = this.config.room_entity ? this.hass.states[this.config.room_entity] : null;
    const roomText = active && roomEntity ? this._fmtState(roomEntity) : "";

    const battEntity = this.config.battery_entity ? this.hass.states[this.config.battery_entity] : null;
    const battVal = battEntity ? this._num(battEntity.state) : null;
    const battFrac = battVal != null ? Math.min(1, Math.max(0, battVal / 100)) : null;
    const battColor = battFrac != null ? (battFrac > 0.4 ? SCALE.green : battFrac > 0.15 ? SCALE.orange : SCALE.red) : null;

    const bg = this.config.color;
    const fg = this.config.color_on;

    return html`
      <ha-card
        style="${bg ? `--ms-color:${bg};` : ""}${fg ? `--ms-color-on:${fg};` : ""}${this.config.accent ? `--ms-accent:${this.config.accent};` : ""}"
        @click=${() => this._handleAction(this.config.tap_action || { action: "more-info", entity: this.config.entity })}
      >
        <div class="tile ${active ? "active" : ""}">
          <div class="header"><ha-icon icon=${icon}></ha-icon><span>${name}</span></div>
          <div class="body">
            <div class="main">
              <div class="state"><div class="big">${stateText}</div></div>
              <div class="substate">${roomText}</div>
            </div>
            ${battFrac != null
              ? html`<div class="thermo"><i style="height:${Math.max(8, battFrac * 100)}%;background:${battColor}"></i></div>`
              : ""}
          </div>
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 4, rows: "auto", min_columns: 3 };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-vacuum-glance", MateriaVacuumGlance);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-vacuum-glance",
  name: "Materia Vacuum Glance",
  description: "Robot vacuum tile — name, state, current room while cleaning, and a battery bar.",
  preview: true,
});
