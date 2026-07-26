import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Climate redesign POC — three research-backed layouts behind one `variant`
 * switch so they can be compared live on the same entities:
 *
 *   a — "dial hero + connected stack": the existing materia-thermostat as
 *       hero, with modes/zones/water-heater as 2px-seam connected segments
 *       (M3 connected-group spec: 8px inner corners, 24px outer).
 *   b — "zones first": the zone ladder IS the hero (3-state rows: calling /
 *       satisfied / off, with valve-open duration), a house summary line on
 *       top, and a compact stepper-only setpoint row at the bottom (Google
 *       Home Favorites pattern — no dial at all).
 *   c — "slider": vertical temperature slider (handle-only drag, claims the
 *       vertical axis only after a movement threshold), current temp beside
 *       it, steppers for fine control, zone chips below.
 *
 * Zone config: zones: [{ entity, name, temp_entity? }] — on/off valve
 * switches. State ladder derives "calling" from the climate entity actively
 * heating while the valve is open.
 */
class MateriaClimatePoc extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _optimisticTemp: { state: true },
    _dragTemp: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-climate-poc-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("climate.")) || "";
    return { entity, variant: "a", zones: [] };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Climate POC: entity is required");
    this.config = { variant: "a", zones: [], ...config };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._optimisticTimer);
    clearTimeout(this._sendTimer);
  }

  /* ---- shared model ------------------------------------------------------ */

  get _entity() {
    return this.hass?.states[this.config.entity];
  }

  _numRaw(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  get _step() {
    return this.config.step ?? this._numRaw(this._entity?.attributes?.target_temp_step) ?? 0.5;
  }

  get _target() {
    if (this._dragTemp != null) return this._dragTemp;
    if (this._optimisticTemp != null) return this._optimisticTemp;
    return this._numRaw(this._entity?.attributes?.temperature);
  }

  get _current() {
    return this._numRaw(this._entity?.attributes?.current_temperature);
  }

  get _scale() {
    return {
      min: this.config.min_temp ?? this._numRaw(this._entity?.attributes?.min_temp) ?? 7,
      max: this.config.max_temp ?? this._numRaw(this._entity?.attributes?.max_temp) ?? 30,
    };
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

  _setTarget(temp) {
    const { min, max } = this._scale;
    const step = this._step;
    const clamped = Math.round(Math.min(max, Math.max(min, Math.round(temp / step) * step)) * 100) / 100;
    this._optimisticTemp = clamped;
    clearTimeout(this._optimisticTimer);
    this._optimisticTimer = setTimeout(() => { this._optimisticTemp = null; }, 10000);
    clearTimeout(this._sendTimer);
    this._sendTimer = setTimeout(() => {
      this._callService("climate", "set_temperature", {
        entity_id: this.config.entity,
        temperature: clamped,
      });
    }, 400);
  }

  _nudge(d) {
    const t = this._target;
    if (t != null) this._setTarget(t + d);
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

  updated(changedProps) {
    if (changedProps.has("hass") && this._optimisticTemp != null) {
      const actual = this._numRaw(this._entity?.attributes?.temperature);
      if (actual != null && Math.abs(actual - this._optimisticTemp) < 1e-6) {
        this._optimisticTemp = null;
        clearTimeout(this._optimisticTimer);
      }
    }
  }

  /* ---- shared fragments --------------------------------------------------- */

  /** Stepper pair — the universal fine control (48px targets, hold repeats).
   *  Vertical puts + on TOP: up = warmer, the strongest stepper metaphor. */
  _steppers(vertical = false) {
    const start = (d) => {
      this._nudge(d);
      this._holdTimer = setTimeout(() => {
        this._holdInterval = setInterval(() => this._nudge(d), 220);
      }, 550);
    };
    const stop = () => {
      clearTimeout(this._holdTimer);
      clearInterval(this._holdInterval);
    };
    const plus = html`<button class="step" @pointerdown=${() => start(this._step)} @pointerup=${stop} @pointerleave=${stop}>
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`;
    const minus = html`<button class="step" @pointerdown=${() => start(-this._step)} @pointerup=${stop} @pointerleave=${stop}>
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`;
    return html`
      <div class="steppers ${vertical ? "vertical" : ""}">
        ${vertical ? plus : minus}${vertical ? minus : plus}
      </div>
    `;
  }

  /** Zone row — the 3-state ladder from the research: calling (container
   *  fill + fire), satisfied (subtle fill + radiator), off (outline only). */
  _zoneRow(z) {
    const stateClass = z.calling ? "calling" : z.on ? "idle" : "off";
    const icon = z.calling ? "mdi:radiator" : z.on ? "mdi:radiator" : "mdi:radiator-off";
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

  _summaryLine() {
    const zones = this._zones;
    const calling = zones.filter((z) => z.calling).length;
    const on = zones.filter((z) => z.on).length;
    const txt = calling
      ? `${calling} of ${zones.length} zones calling for heat`
      : on
        ? `${on} of ${zones.length} zones on · at temperature`
        : "All zones off";
    return html`<div class="summary ${calling ? "hot" : ""}">
      <ha-icon icon=${calling ? "m3o:mode-heat" : "mdi:radiator-off"}></ha-icon>${txt}
    </div>`;
  }

  _modeGroup() {
    const modes = (this._entity?.attributes?.hvac_modes || []).filter((m) => ["heat", "auto", "off", "cool", "heat_cool"].includes(m));
    if (!modes.length) return nothing;
    return html`
      <materia-button-group
        .hass=${this.hass}
        .config=${{
          entity: this.config.entity,
          size: "l",
          variant: "tonal",
          active_shape: "square",
          preset: "secondary",
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

  _waterSegment() {
    const wh = this.config.water_heater ? this.hass.states[this.config.water_heater] : null;
    if (!wh) return nothing;
    const temp = this._numRaw(wh.attributes?.current_temperature);
    return html`
      <div class="seg water" @click=${() => this._fireMoreInfo(this.config.water_heater)}>
        <ha-icon icon="mdi:water-boiler"></ha-icon>
        <div class="z-text">
          <span class="z-name">${wh.attributes?.friendly_name ?? "Water heater"}</span>
          <span class="z-sub">${this._capitalize(wh.state)}${temp != null ? ` · ${this._fmt(temp)}°` : ""}</span>
        </div>
        <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
      </div>
    `;
  }

  /* ---- variant A: dial hero + connected stack ------------------------------ */

  _variantA() {
    return html`
      <materia-thermostat
        .hass=${this.hass}
        .config=${{ entity: this.config.entity, show_modes: false, wave: this.config.wave ?? "auto", steppers: this.config.steppers ?? "side" }}
      ></materia-thermostat>
      <div class="stack">
        <div class="seg">${this._modeGroup()}</div>
        <div class="seg zones">${this._zones.map((z) => this._zoneRow(z))}</div>
        ${this._waterSegment()}
      </div>
    `;
  }

  /* ---- variant B: zones first ---------------------------------------------- */

  _variantB() {
    const target = this._target;
    const current = this._current;
    return html`
      ${this._summaryLine()}
      <div class="stack hero-zones">
        <div class="seg actions">
          <button class="mini" @click=${() => this._allZones(false)}>All off</button>
          <button class="mini" @click=${() => this._allZones(true)}>All on</button>
        </div>
        <div class="seg zones big">${this._zones.map((z) => this._zoneRow(z))}</div>
        <div class="seg setpoint">
          <div class="sp-text">
            <span class="sp-current">${current != null ? `${this._fmt(current)}°` : ""}</span>
            <span class="sp-label">Set to ${this._fmt(target)}°</span>
          </div>
          ${this._steppers(true)}
        </div>
        ${this._waterSegment()}
      </div>
    `;
  }

  /* ---- variant C: vertical slider ------------------------------------------ */

  _sliderPointerDown(e) {
    if (e.button != null && e.button !== 0) return;
    const handle = e.currentTarget;
    this._slDrag = { startY: e.clientY, engaged: false, pointerId: e.pointerId, handle };
  }

  _sliderPointerMove(e) {
    const d = this._slDrag;
    if (!d) return;
    const dy = e.clientY - d.startY;
    if (!d.engaged) {
      if (Math.abs(dy) < 6) return; // movement threshold before claiming the gesture
      d.engaged = true;
      d.handle.setPointerCapture(d.pointerId);
    }
    const track = this.renderRoot.querySelector(".sl-track");
    const rect = track.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, 1 - (e.clientY - rect.top) / rect.height));
    const { min, max } = this._scale;
    const raw = min + frac * (max - min);
    const step = this._step;
    this._dragTemp = Math.round(Math.round(raw / step) * step * 100) / 100;
  }

  _sliderPointerUp(e) {
    const d = this._slDrag;
    this._slDrag = null;
    if (!d?.engaged) return;
    d.handle.releasePointerCapture?.(d.pointerId);
    if (this._dragTemp != null) {
      this._setTarget(this._dragTemp);
      this._dragTemp = null;
    }
  }

  _variantC() {
    const { min, max } = this._scale;
    const target = this._target;
    const current = this._current;
    const frac = target != null ? Math.min(1, Math.max(0, (target - min) / (max - min))) : 0;
    const adjusting = this._dragTemp != null;
    return html`
      <div class="sl-hero ${this._boilerActive ? "hot" : ""}">
        <div class="sl-track">
          <div class="sl-fill" style="height:${(frac * 100).toFixed(1)}%"></div>
          <button
            class="sl-handle"
            style="bottom:calc(${(frac * 100).toFixed(1)}% - 14px)"
            @pointerdown=${this._sliderPointerDown}
            @pointermove=${this._sliderPointerMove}
            @pointerup=${this._sliderPointerUp}
            @pointercancel=${this._sliderPointerUp}
          ></button>
        </div>
        <div class="sl-read">
          <span class="sl-big ${adjusting ? "adjust" : ""}">
            ${adjusting ? this._fmt(target) : current != null ? this._fmt(current) : this._fmt(target)}°
          </span>
          <span class="sl-sub">${adjusting ? "Setting…" : `Set to ${this._fmt(target)}°`}</span>
          ${this._steppers()}
        </div>
      </div>
      <div class="chip-row">
        ${this._zones.map((z) => html`
          <button class="chip ${z.calling ? "calling" : z.on ? "idle" : "off"}" @click=${() => this._toggleZone(z)}>
            <ha-icon icon=${z.on ? "mdi:radiator" : "mdi:radiator-off"}></ha-icon>
            ${z.name}
          </button>
        `)}
      </div>
      <div class="stack"><div class="seg">${this._modeGroup()}</div></div>
    `;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    if (!this._entity) return html`<ha-card class="poc">Unknown entity: ${this.config.entity}</ha-card>`;
    const v = this.config.variant;
    return html`
      <ha-card class="poc variant-${v}">
        ${v === "b" ? this._variantB() : v === "c" ? this._variantC() : this._variantA()}
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
  description: "Comparison POC: three climate-surface layouts (dial+stack / zones-first / slider) behind one variant switch.",
  preview: false,
});
