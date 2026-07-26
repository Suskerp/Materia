import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Zone valve ladder (materia-zones) — the 3-state rows extracted from the
 * climate card so they compose anywhere: calling (container fill), on/at
 * temperature (tonal), off (quiet). Spec M3 switches, tap toggles the valve.
 *
 * zones: [{ entity, name?, icon?, temp_entity? }] (or plain entity strings).
 * climate: optional climate entity — "calling" is derived from it actively
 * heating while a valve is open.
 * actions: true renders All off / All on chips above the ladder.
 * flat: true drops the card chrome (background/padding) for nesting inside
 * other cards (the climate card's wallet sections set this).
 */
class MateriaZones extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-zones-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("switch.")) || "";
    return { zones: entity ? [entity] : [] };
  }

  setConfig(config) {
    if (!config.zones?.length) throw new Error("Materia Zones: zones is required");
    this.config = config;
  }

  _numRaw(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  /** Boiler actively producing heat (reported or inferred from the climate). */
  get _boilerActive() {
    const clim = this.config.climate ? this.hass.states[this.config.climate] : null;
    if (!clim) return false;
    const a = clim.attributes?.hvac_action;
    if (a === "heating") return true;
    if (a && a !== "idle") return false;
    const cur = this._numRaw(clim.attributes?.current_temperature);
    const tgt = this._numRaw(clim.attributes?.temperature);
    if (clim.state === "off" || tgt == null) return false;
    if (cur == null) return clim.state === "heat";
    return cur < tgt - 0.2;
  }

  _zoneModel(z) {
    const st = this.hass.states[z.entity];
    const on = st?.state === "on";
    const calling = on && this._boilerActive;
    const temp = z.temp_entity ? this._numRaw(this.hass.states[z.temp_entity]?.state) : null;
    let sinceMin = null;
    if (st?.last_changed) {
      sinceMin = Math.max(0, Math.round((Date.now() - new Date(st.last_changed).getTime()) / 60000));
    }
    return {
      ...z,
      name: z.name || st?.attributes?.friendly_name || z.entity,
      on,
      calling,
      temp,
      sinceMin,
    };
  }

  get _zones() {
    return (this.config.zones || []).map((z) =>
      this._zoneModel(typeof z === "string" ? { entity: z } : z)
    );
  }

  _fmt(v) {
    return v == null ? "—" : Math.round(v * 10) / 10;
  }

  _toggleZone(z) {
    this._callService("switch", z.on ? "turn_off" : "turn_on", { entity_id: z.entity });
    this._fireHaptic("light");
  }

  _allZones(onOff) {
    for (const z of this._zones) {
      this._callService("switch", onOff ? "turn_on" : "turn_off", { entity_id: z.entity });
    }
  }

  _zoneRow(z) {
    const stateClass = z.calling ? "calling" : z.on ? "idle" : "off";
    const custom = z.icon || this.config.zone_icon;
    const icon = custom || (z.on ? "mdi:radiator" : "mdi:radiator-off");
    const secondary = z.calling
      ? `Heating · open ${z.sinceMin} min`
      : z.on
        ? "At temperature"
        : "Off";
    return html`
      <div class="zone-row ${stateClass}" @click=${() => this._toggleZone(z)}>
        <ha-icon class="z-icon" icon=${icon}></ha-icon>
        <div class="z-text">
          <span class="z-name">${z.name}</span>
          <span class="z-sub">${secondary}${z.temp != null ? ` · ${this._fmt(z.temp)}°` : ""}</span>
        </div>
        <div class="z-switch ${z.on ? "on" : ""}"><i></i></div>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    return html`
      <ha-card class=${this.config.flat ? "flat" : ""}>
        ${this.config.actions
          ? html`<div class="actions">
              <button class="mini" @click=${() => this._allZones(false)}>All off</button>
              <button class="mini" @click=${() => this._allZones(true)}>All on</button>
            </div>`
          : nothing}
        <div class="zones">${this._zones.map((z) => this._zoneRow(z))}</div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return Math.max(1, this.config?.zones?.length ?? 1);
  }
}

customElements.define("materia-zones", MateriaZones);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-zones",
  name: "Materia Zones",
  description: "Heating zone valve ladder — calling / at-temperature / off rows with spec M3 switches.",
  preview: true,
});
