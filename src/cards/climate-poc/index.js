import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Climate redesign POC — the chosen layout: the materia-thermostat as hero
 * with the mode group as a connected segment, and below them a WALLET-style
 * accordion cycling between Zones and Water heater (exactly one open, muted
 * pills morph large on tap). `sections:` config appends arbitrary card
 * sections to the accordion — that's the composability.
 *
 * Zone config: zones: [{ entity, name, temp_entity? }] — on/off valve
 * switches. State ladder derives "calling" from the climate entity actively
 * heating while the valve is open.
 *
 * (Variants B "zones first" and C "vertical slider" were compared and
 * retired; a stray `variant:` key in old configs is ignored.)
 */
class MateriaClimatePoc extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _openSection: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-climate-poc-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("climate.")) || "";
    return { entity, zones: [] };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Climate POC: entity is required");
    this.config = { zones: [], ...config };
    this._extraEls = null;
    if (this.isConnected) this._createExtraCards();
  }

  firstUpdated() {
    this._createExtraCards();
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this._extraEls) {
      // Only the OPEN custom section needs live child updates.
      const offset = (this._zones.length ? 1 : 0) + (this.config.water_heater ? 1 : 0);
      const idx = (this._openSection ?? 0) - offset;
      if (idx >= 0 && this._extraEls[idx]) this._extraEls[idx].forEach((el) => { el.hass = this.hass; });
    }
  }

  /* ---- model --------------------------------------------------------------- */

  get _entity() {
    return this.hass?.states[this.config.entity];
  }

  _numRaw(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  get _current() {
    return this._numRaw(this._entity?.attributes?.current_temperature);
  }

  /** Boiler is actively producing heat (reported or inferred). */
  get _boilerActive() {
    const a = this._entity?.attributes?.hvac_action;
    if (a === "heating") return true;
    if (a && a !== "idle") return false;
    const mode = this._entity?.state;
    const cur = this._current;
    const tgt = this._numRaw(this._entity?.attributes?.temperature);
    if (mode === "off" || tgt == null) return false;
    if (cur == null) return mode === "heat";
    return cur < tgt - 0.2;
  }

  /** Zone → { name, on, calling, temp, sinceMin } — the 3-state ladder. */
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

  /* ---- fragments ------------------------------------------------------------ */

  /** Zone row — the 3-state ladder from the research: calling (container
   *  fill + fire), satisfied (subtle fill + radiator), off (outline only). */
  _zoneRow(z) {
    const stateClass = z.calling ? "calling" : z.on ? "idle" : "off";
    // Per-zone icon (or card-wide zone_icon) wins — underfloor heating isn't
    // a radiator. The row's state styling still carries on/calling/off.
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

  _modeGroup() {
    const modes = (this._entity?.attributes?.hvac_modes || []).filter((m) => ["heat", "auto", "off", "cool", "heat_cool"].includes(m));
    if (!modes.length) return nothing;
    // Same palette the dial speaks — active mode button matches the sweep.
    const MODE_COLORS = {
      heat: ["var(--md-sys-cust-color-climate-heat-accent, #a14614)", "var(--md-sys-cust-color-climate-heat-container, #ffeee9)"],
      cool: ["var(--md-sys-cust-color-climate-cool-accent, #327ea7)", "var(--md-sys-cust-color-climate-cool-container, #eaf3ff)"],
      auto: ["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))", "var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],
      heat_cool: ["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))", "var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],
      off: ["var(--md-sys-color-secondary)", "var(--md-sys-color-on-secondary)"],
    };
    const [act, on] = MODE_COLORS[this._entity?.state] ?? MODE_COLORS.off;
    return html`
      <materia-button-group
        .hass=${this.hass}
        .config=${{
          entity: this.config.entity,
          size: "l",
          variant: "tonal",
          active_shape: "square",
          color_active: act,
          color_on_active: on,
          options: modes.map((m) => ({
            icon: { heat: "m3o:mode-heat", cool: "mdi:snowflake", auto: "mdi:thermostat-auto", heat_cool: "mdi:thermostat-auto", off: "m3o:power-settings-new" }[m],
            value: m,
            tap_action: {
              action: "perform-action",
              perform_action: "climate.set_hvac_mode",
              data: { hvac_mode: m },
              target: { entity_id: this.config.entity },
            },
          })),
        }}
      ></materia-button-group>
    `;
  }

  _waterRow() {
    const wh = this.hass.states[this.config.water_heater];
    if (!wh) return nothing;
    const temp = this._numRaw(wh.attributes?.current_temperature);
    return html`
      <div class="water-row" @click=${() => this._fireMoreInfo(this.config.water_heater)}>
        <ha-icon icon="mdi:water-boiler"></ha-icon>
        <div class="z-text">
          <span class="z-name">${wh.attributes?.friendly_name ?? "Water heater"}</span>
          <span class="z-sub">${this._capitalize(wh.state)}${temp != null ? ` · ${this._fmt(temp)}°` : ""}</span>
        </div>
        <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
      </div>
    `;
  }

  /* ---- wallet accordion: Zones / Water heater / custom sections ------------ */

  async _createExtraCards() {
    const gen = (this._extraGen = (this._extraGen || 0) + 1);
    const secs = this.config.sections || [];
    if (!secs.length) { this._extraEls = []; return; }
    const helpers = await loadCardHelpers();
    const els = await Promise.all(
      secs.map(async (s) =>
        (await Promise.all(
          (s.cards || []).map(async (c) => {
            try {
              const el = await helpers.createCardElement(c);
              el.hass = this.hass;
              return el;
            } catch {
              return null;
            }
          })
        )).filter(Boolean)
      )
    );
    if (gen !== this._extraGen) return;
    this._extraEls = els;
    this.requestUpdate();
  }

  _accordionSections() {
    const zones = this._zones;
    const calling = zones.filter((z) => z.calling).length;
    const on = zones.filter((z) => z.on).length;
    const secs = [];
    if (zones.length) {
      secs.push({
        title: this.config.zones_title ?? "Zones",
        icon: this.config.zone_icon ?? "mdi:radiator",
        info: calling ? `${calling} of ${zones.length} heating` : `${on} of ${zones.length} on`,
        body: html`
          <div class="acc-actions">
            <button class="mini" @click=${() => this._allZones(false)}>All off</button>
            <button class="mini" @click=${() => this._allZones(true)}>All on</button>
          </div>
          <div class="zones">${zones.map((z) => this._zoneRow(z))}</div>
        `,
      });
    }
    const wh = this.config.water_heater ? this.hass.states[this.config.water_heater] : null;
    if (wh) {
      const temp = this._numRaw(wh.attributes?.current_temperature);
      secs.push({
        title: this.config.water_title ?? "Water heater",
        icon: "mdi:water-boiler",
        info: `${this._capitalize(wh.state)}${temp != null ? ` · ${this._fmt(temp)}°` : ""}`,
        body: this._waterRow(),
      });
    }
    (this.config.sections || []).forEach((s, i) => {
      const st = s.info_entity ? this.hass.states[s.info_entity] : null;
      secs.push({
        title: s.title ?? `Section ${i + 1}`,
        icon: s.icon,
        info: s.info ?? (st ? (this.hass.formatEntityState?.(st) ?? st.state) : ""),
        body: this._extraEls?.[i]?.length ? html`<div class="acc-cards">${this._extraEls[i]}</div>` : nothing,
      });
    });
    return secs;
  }

  _openAcc(i) {
    if (this._openSection === i) return; // wallet invariant: one always large
    this._openSection = i;
    this._fireHaptic("light");
    // Catch-up hass for custom-section children that were dormant.
    const extraIdx = i - (this._zones.length ? 1 : 0) - (this.config.water_heater ? 1 : 0);
    if (extraIdx >= 0 && this._extraEls?.[extraIdx]) {
      this._extraEls[extraIdx].forEach((el) => { el.hass = this.hass; });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    if (!this._entity) return html`<ha-card class="poc">Unknown entity: ${this.config.entity}</ha-card>`;
    const open = this._openSection ?? 0;
    const secs = this._accordionSections();
    // The accordion sections LIVE IN the connected stack (2px seams, group
    // silhouette): closed bars are compact segments, the open one grows tall.
    return html`
      <ha-card class="poc">
        <materia-thermostat
          .hass=${this.hass}
          .config=${{
            entity: this.config.entity,
            show_modes: false,
            wave: this.config.wave ?? "auto",
            steppers: this.config.steppers ?? "side",
            ...(this.config.step != null ? { step: this.config.step } : {}),
            ...(this.config.min_temp != null ? { min_temp: this.config.min_temp } : {}),
            ...(this.config.max_temp != null ? { max_temp: this.config.max_temp } : {}),
          }}
        ></materia-thermostat>
        <div class="stack">
          <div class="seg">${this._modeGroup()}</div>
          ${secs.map((s, i) => html`
            <div class="seg acc-sec ${open === i ? "open" : ""}">
              <div class="acc-bar" @click=${() => this._openAcc(i)}>
                ${s.icon ? html`<ha-icon class="acc-icon" icon=${s.icon}></ha-icon>` : ""}
                <span class="acc-title">${s.title}</span>
                <span class="acc-info">${open === i ? "" : s.info}</span>
                ${open === i ? nothing : html`<ha-icon class="acc-chev" icon="mdi:chevron-down"></ha-icon>`}
              </div>
              <div class="acc-body"><div class="acc-inner">${open === i ? s.body : nothing}</div></div>
            </div>
          `)}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 6;
  }
}

customElements.define("materia-climate-poc", MateriaClimatePoc);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-climate-poc",
  name: "Materia Climate POC",
  description: "Climate surface: thermostat dial hero + connected stack of modes, zone ladder and water heater.",
  preview: false,
});
