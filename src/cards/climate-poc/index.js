import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Climate surface — the materia-thermostat as hero with the mode group as a
 * connected segment, and below them a WALLET-style accordion (exactly one
 * section open, muted bars morph large on tap).
 *
 * MODULAR: every accordion section is chrome around NESTED CARDS. The
 * built-in Zones (a nested materia-zones card) and Water heater (a nested
 * materia-menu) are just the recommended defaults synthesized from zones:/
 * water_heater: config; `sections: [{title, icon, info_entity?, cards}]`
 * appends sections you fill with whatever.
 *
 * (Variants B "zones first" and C "vertical slider" were compared and
 * retired; a stray `variant:` key in old configs is ignored.)
 */
// The palette the dial speaks — mode buttons, zone switches and other accents
// all sync to the active hvac mode.
const MODE_COLORS = {
  heat: ["var(--md-sys-cust-color-climate-heat-accent, #a14614)", "var(--md-sys-cust-color-climate-heat-container, #ffeee9)"],
  cool: ["var(--md-sys-cust-color-climate-cool-accent, #327ea7)", "var(--md-sys-cust-color-climate-cool-container, #eaf3ff)"],
  auto: ["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))", "var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],
  heat_cool: ["var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))", "var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-primary-container))"],
  off: ["var(--md-sys-color-secondary)", "var(--md-sys-color-on-secondary)"],
};

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
      // Only the OPEN section's nested cards need live updates.
      const idx = this._openSection ?? 0;
      this._extraEls[idx]?.forEach((el) => { el.hass = this.hass; });
    }
    this._reserveHeight();
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

  /** Lite zone model — only what the section bar needs (counts + all off/on).
   *  The ladder itself is the nested materia-zones card. */
  get _zones() {
    return (this.config.zones || []).map((z) => {
      const entity = typeof z === "string" ? z : z.entity;
      const on = this.hass.states[entity]?.state === "on";
      return { entity, on, calling: on && this._boilerActive };
    });
  }

  _fmt(v) {
    return v == null ? "—" : Math.round(v * 10) / 10;
  }

  _allZones(onOff) {
    for (const z of this._zones) {
      this._callService("switch", onOff ? "turn_on" : "turn_off", { entity_id: z.entity });
    }
  }

  /* ---- fragments ------------------------------------------------------------ */

  _modeGroup() {
    const modes = (this._entity?.attributes?.hvac_modes || []).filter((m) => ["heat", "auto", "off", "cool", "heat_cool"].includes(m));
    if (!modes.length) return nothing;
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

  /* ---- wallet accordion: EVERY section is chrome around nested cards -------
     Built-in Zones and Water heater are just synthesized section configs (the
     recommended defaults from zones:/water_heater:); user `sections:` append
     with the same shape — fill them with whatever cards you like. */

  get _waterInAcc() {
    return !!this.config.water_heater && (this.config.water ?? "menu") === "section";
  }

  get _sectionConfigs() {
    const secs = [];
    if (this.config.zones?.length) {
      secs.push({
        _builtin: "zones",
        title: this.config.zones_title ?? "Zones",
        icon: this.config.zone_icon ?? "mdi:radiator",
        cards: [{
          type: "custom:materia-zones",
          climate: this.config.entity,
          zones: this.config.zones,
          zone_icon: this.config.zone_icon,
          flat: true,
        }],
      });
    }
    if (this._waterInAcc) {
      secs.push({
        _builtin: "water",
        title: this.config.water_title ?? "Water heater",
        icon: "mdi:water-boiler",
        cards: [{
          type: "custom:materia-menu",
          entity: this.config.water_heater,
          icon: "mdi:water-boiler",
          name: this.config.water_title ?? "Water heater",
          menu_variant: "expressive",
        }],
      });
    }
    return [...secs, ...(this.config.sections || [])];
  }

  async _createExtraCards() {
    const gen = (this._extraGen = (this._extraGen || 0) + 1);
    const secs = this._sectionConfigs;
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
    return this._sectionConfigs.map((s, i) => {
      let info = "";
      let actions = null;
      if (s._builtin === "zones") {
        const zones = this._zones;
        const calling = zones.filter((z) => z.calling).length;
        const on = zones.filter((z) => z.on).length;
        info = calling ? `${calling} of ${zones.length} heating` : `${on} of ${zones.length} on`;
        // Actions live IN the bar while open — a centered button band between
        // bar and ladder read as an orphan strip of dead space.
        actions = html`
          <div class="acc-actions">
            <button class="mini" @click=${() => this._allZones(false)}>All off</button>
            <button class="mini" @click=${() => this._allZones(true)}>All on</button>
          </div>
        `;
      } else if (s._builtin === "water") {
        const wh = this.hass.states[this.config.water_heater];
        const temp = this._numRaw(wh?.attributes?.current_temperature);
        info = wh ? `${this._capitalize(wh.state)}${temp != null ? ` · ${this._fmt(temp)}°` : ""}` : "";
      } else {
        const st = s.info_entity ? this.hass.states[s.info_entity] : null;
        info = s.info ?? (st ? (this.hass.formatEntityState?.(st) ?? st.state) : "");
      }
      return {
        title: s.title ?? `Section ${i + 1}`,
        icon: s.icon,
        info,
        actions,
        body: this._extraEls?.[i]?.length ? html`<div class="acc-cards">${this._extraEls[i]}</div>` : nothing,
      };
    });
  }

  _openAcc(i) {
    if (this._openSection === i) return; // wallet invariant: one always large
    this._openSection = i;
    this._fireHaptic("light");
    // Catch-up hass for section children that were dormant.
    this._extraEls?.[i]?.forEach((el) => { el.hass = this.hass; });
  }

  /** Menu mode: the water heater is a compact segment whose tap opens the
   *  operation-mode menu (materia-menu speaks water_heater natively). */
  _waterMenuSeg() {
    const wh = this.hass.states[this.config.water_heater];
    if (!wh) return nothing;
    const temp = this._numRaw(wh.attributes?.current_temperature);
    return html`
      <div class="seg water-menu">
        <materia-menu
          .hass=${this.hass}
          .config=${{
            entity: this.config.water_heater,
            icon: "mdi:water-boiler",
            name: this.config.water_title ?? "Water heater",
            substate: temp != null ? `${this._fmt(temp)}°` : "",
            menu_variant: "expressive",
          }}
        ></materia-menu>
      </div>
    `;
  }

  /** reserve_height: keep the card as tall as its TALLEST section, so
   *  cycling the wallet never reflows the dashboard below. Opt-in. */
  _reserveHeight() {
    const stack = this.renderRoot?.querySelector(".stack");
    if (!stack) return;
    if (!this.config.reserve_height) {
      stack.style.minHeight = "";
      return;
    }
    requestAnimationFrame(() => {
      const inners = [...stack.querySelectorAll(".acc-inner")];
      if (!inners.length) return;
      const openInner = stack.querySelector(".acc-sec.open .acc-inner");
      stack.style.minHeight = "";
      const base = stack.offsetHeight - (openInner?.offsetHeight || 0);
      const maxInner = Math.max(...inners.map((el) => el.scrollHeight));
      stack.style.minHeight = `${base + maxInner}px`;
    });
  }

  render() {
    if (!this.hass || !this.config) return html``;
    if (!this._entity) return html`<ha-card class="poc">Unknown entity: ${this.config.entity}</ha-card>`;
    const open = this._openSection ?? 0;
    const secs = this._accordionSections();
    // Accents (zone switches etc.) sync to the active mode's palette.
    const [modeAccent, modeContainer] = MODE_COLORS[this._entity.state] ?? MODE_COLORS.off;
    // The accordion sections LIVE IN the connected stack (2px seams, group
    // silhouette): closed bars are compact segments, the open one grows tall.
    return html`
      <ha-card class="poc" style="--poc-mode-accent:${modeAccent};--poc-mode-container:${modeContainer};">
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
        <div class="stack ${this.config.reserve_height ? "reserve" : ""}">
          <div class="seg">${this._modeGroup()}</div>
          ${secs.map((s, i) => html`
            <div class="seg acc-sec ${open === i ? "open" : ""}">
              <div class="acc-bar" @click=${() => this._openAcc(i)}>
                ${s.icon ? html`<ha-icon class="acc-icon" icon=${s.icon}></ha-icon>` : ""}
                <span class="acc-title">${s.title}</span>
                ${open === i
                  ? s.actions ?? nothing
                  : html`<span class="acc-info">${s.info}</span><ha-icon class="acc-chev" icon="mdi:chevron-down"></ha-icon>`}
              </div>
              <div class="acc-body"><div class="acc-inner">${s.body}</div></div>
            </div>
          `)}
          ${!this._waterInAcc && this.config.water_heater ? this._waterMenuSeg() : nothing}
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
