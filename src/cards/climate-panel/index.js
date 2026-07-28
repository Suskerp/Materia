import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { styles } from "./styles.js";
import "./editor.js";
import "./dial.js";

/**
 * Climate surface — its dial as hero with the mode group as a
 * connected segment, and below them a WALLET-style accordion (exactly one
 * section open, muted bars morph large on tap).
 *
 * MODULAR: everything below the mode group comes from `sections:` — no
 * built-ins. Each section is style "section" (wallet accordion around any
 * nested cards) or "menu" (compact row opening a materia-menu from an
 * entity's options or manual options). Sections take `info` (text or Jinja
 * template) and `actions: [{label, icon?, tap_action}]` chips for the open
 * bar. The card also works with no sections at all (dial + modes only).
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

class MateriaClimatePanel extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _openSection: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-climate-panel-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("climate.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Climate Panel: entity is required");
    this.config = { ...config };
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
          // m == 56dp on the M3 button ladder, nearest the 48dp this used to be.
          size: "m",
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
     No built-ins: `sections:` is the whole story. Each section:
       { style: "section" | "menu", title, icon,
         cards: [...]                     (section style)
         entity, options?, substate?      (menu style)
         info | info_entity, actions: [{label, icon?, tap_action}] } */
  get _sectionConfigs() {
    return (this.config.sections || []).map((s) => ({ style: "section", ...s }));
  }

  /** materia-menu config for a menu-style section (also the nested card when
   *  a menu entity sits inside a wallet section). */
  _menuCardConfig(s) {
    const cfg = {
      type: "custom:materia-menu",
      entity: s.entity,
      icon: s.icon,
      name: s.title,
      menu_variant: "expressive",
    };
    if (s.options?.length) cfg.options = s.options;
    if (s.substate != null) cfg.substate = s.substate;
    if (s.state_colors) cfg.state_colors = s.state_colors;
    return cfg;
  }

  async _createExtraCards() {
    const gen = (this._extraGen = (this._extraGen || 0) + 1);
    const secs = this._sectionConfigs;
    if (!secs.length) { this._extraEls = []; return; }
    const helpers = await loadCardHelpers();
    const els = await Promise.all(
      secs.map(async (s) => {
        if (s.style === "menu") return []; // rendered live, not as nested cards
        const cards = s.cards ?? (s.entity ? [this._menuCardConfig(s)] : []);
        return (await Promise.all(
          cards.map(async (c) => {
            try {
              const el = await helpers.createCardElement(c);
              el.hass = this.hass;
              return el;
            } catch {
              return null;
            }
          })
        )).filter(Boolean);
      })
    );
    if (gen !== this._extraGen) return;
    this._extraEls = els;
    this.requestUpdate();
  }

  _accordionSections() {
    return this._sectionConfigs.map((s, i) => {
      // info: literal text, Jinja template (live via render_template), or the
      // formatted state of info_entity.
      let info = "";
      if (s.info != null) {
        if (this._isTemplate(s.info)) {
          this._resolveTemplateValue(`secInfo${i}`, s.info);
          info = this._tplResults?.[`secInfo${i}`] ?? "";
        } else {
          info = s.info;
        }
      } else if (s.info_entity) {
        const st = this.hass.states[s.info_entity];
        info = st ? (this.hass.formatEntityState?.(st) ?? st.state) : "";
      }
      // Actions live IN the bar while open — chips like "All off"/"All on".
      const actions = s.actions?.length
        ? html`
          <div class="acc-actions">
            ${s.actions.map((a) => html`
              <button class="mini" @click=${(e) => { e.stopPropagation(); this._handleAction(a.tap_action); }}>
                ${a.icon ? html`<ha-icon icon=${a.icon} style="--mdc-icon-size:15px;"></ha-icon>` : ""}${a.label ?? ""}
              </button>
            `)}
          </div>
        `
        : null;
      return {
        style: s.style,
        menuConfig: s.style === "menu" ? this._menuCardConfig(s) : null,
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
    if (!this._entity) return html`<ha-card class="panel">Unknown entity: ${this.config.entity}</ha-card>`;
    const secs = this._accordionSections();
    // One wallet section is always open — default to the first non-menu one.
    const firstAcc = secs.findIndex((s) => s.style !== "menu");
    const open = this._openSection ?? firstAcc;
    // Mode sync via inherited CSS vars: every nested materia-switch picks up
    // the active mode's pair (strong accent track, light container thumb) —
    // no per-row templates needed. Mode off → unset → the spec primary pair.
    const mode = this._entity.state;
    const sync = mode !== "off" && MODE_COLORS[mode];
    const [modeAccent, modeContainer] = MODE_COLORS[mode] ?? MODE_COLORS.off;
    // The accordion sections LIVE IN the connected stack (2px seams, group
    // silhouette): closed bars are compact segments, the open one grows tall.
    return html`
      <ha-card class="panel" style=${sync ? `--ms-track:${modeAccent};--ms-thumb:${modeContainer};` : ""}>
        <materia-climate-dial
          .hass=${this.hass}
          .config=${{
            entity: this.config.entity,
            show_modes: false,
            wave: this.config.wave ?? "auto",
            steppers: this.config.steppers ?? "side",
            ...(this.config.step != null ? { step: this.config.step } : {}),
            ...(this.config.min_temp != null ? { min_temp: this.config.min_temp } : {}),
            ...(this.config.max_temp != null ? { max_temp: this.config.max_temp } : {}),
            ...(this.config.temperature_entity ? { temperature_entity: this.config.temperature_entity } : {}),
          }}
        ></materia-climate-dial>
        <div class="stack ${this.config.reserve_height ? "reserve" : ""}">
          <div class="seg">${this._modeGroup()}</div>
          ${secs.map((s, i) => s.style === "menu"
            ? html`
              <div class="seg menu-seg">
                <materia-menu .hass=${this.hass} .config=${s.menuConfig}></materia-menu>
              </div>`
            : html`
              <div class="seg acc-sec ${open === i ? "open" : ""}">
                <div class="acc-bar" @click=${() => this._openAcc(i)}>
                  ${s.icon ? html`<ha-icon class="acc-icon" icon=${s.icon}></ha-icon>` : ""}
                  <span class="acc-title">${s.title}</span>
                  ${open === i
                    ? s.actions ?? nothing
                    : html`<span class="acc-info">${s.info}</span><ha-icon class="acc-chev" icon="mdi:chevron-down"></ha-icon>`}
                </div>
                <div class="acc-body"><div class="acc-inner">${s.body}</div></div>
              </div>`)}
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

customElements.define("materia-climate-panel", MateriaClimatePanel);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-climate-panel",
  name: "Materia Climate Panel",
  description: "Climate panel: thermostat dial hero, mode group, and wallet sections you compose with any cards or menus.",
  preview: true,
});
