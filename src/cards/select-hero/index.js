import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin, disabledConditionStyles } from "../../utils/conditions.js";
import { HeroShellMixin } from "../hero/shell.js";
import { t } from "../../utils/i18n.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Select hero (materia-select-hero) — design 9c, "mode owns the panel", made
 * generic: a select whose CURRENT OPTION owns a hero block — a per-option
 * glyph, the option's name at display size, one line of consequence — with the
 * option pills inside the same block, because choosing is part of the same
 * object as the explanation.
 *
 * It is a VARIANT OF materia-hero, not a lookalike: container, tiers, eyebrow,
 * title, burst and alert strip all come from the shared shell (../hero/shell.js).
 * What this card adds is the select's own brain — options, the route glyph, and
 * the pills.
 *
 * WHY NOT BARS. Suction and water are ordinal — more is more — so rising bars
 * are honest for them. A mode is CATEGORICAL: Fast and Ultra deep trade time
 * against thoroughness, and Deep is not "more water". A fourth bar row would
 * lie about the relationship; a categorical decision gets a different shape of
 * control entirely.
 *
 * THE CARD SETS ONLY ITS OWN SELECT. Design 9c's "mode sets suction and water"
 * is deliberately NOT in here: the recipe belongs in an HA automation on the
 * select's state, exactly as the design brief itself says ("matches how you'd
 * script this in HA anyway"). That keeps the recipe editable without touching
 * the dashboard, and keeps this card reusable for any select — HVAC presets,
 * scene modes — whose options deserve a sentence.
 *
 * Options come from config (label, short, secondary, glyph/icon, value); with
 * no options configured, a select/input_select's own options render plainly.
 * `glyph` is an SVG path on the design's 48x34 grid — the route the machine
 * actually drives — stroked in currentColor and drawn on when it changes.
 */
class MateriaSelectHero extends DisabledMixin(HeroShellMixin(ActionMixin(LitElement))) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = [styles, disabledConditionStyles];

  static getConfigElement() {
    return document.createElement("materia-select-hero-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {})
      .find((e) => e.startsWith("select.") || e.startsWith("input_select.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Select Hero: entity is required");
    this.config = { ...config };
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  get _options() {
    if (this.config.options?.length) return this.config.options;
    const st = this._stateObj;
    return (st?.attributes?.options || []).map((o) => ({
      value: o,
      label: this._capitalize(String(o).replace(/_/g, " ")),
    }));
  }

  updated(changed) {
    super.updated?.(changed);
    if (changed.has("hass") && this.hass) this._resolveAlertTemplates();
    // Draw the route whenever the chosen option actually changes — including
    // the first paint, which gives the card an entrance rather than a pop.
    const cur = String(this._stateObj?.state ?? "");
    if (cur !== this._drawnFor) {
      this._drawnFor = cur;
      this._drawRoute();
    }
  }

  /** THE ROUTE DRAWS ITSELF. The glyph is a path the machine will drive, so
   *  showing it being drawn says "this is the new route" in a way a cross-fade
   *  cannot — and it makes an otherwise instant select feel like it did
   *  something. Web Animations rather than CSS: the same <path> element is
   *  reused across options (only `d` changes), and a CSS animation cannot be
   *  restarted on an element that never left the DOM without class-toggle
   *  hacks. `pathLength="100"` in the template makes one duration correct for
   *  every glyph, whether it is a single line or eight crossing strokes. */
  _drawRoute() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const path = this.shadowRoot?.querySelector(".route path");
    path?.animate?.(
      [{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }],
      { duration: 620, easing: "cubic-bezier(0.2, 0, 0, 1)" }
    );
  }

  _select(opt) {
    this._fireHaptic("selection");
    if (opt.tap_action) {
      this._handleAction(opt.tap_action);
      return;
    }
    const domain = this.config.entity.split(".")[0];
    if (domain === "select" || domain === "input_select") {
      this._callService(domain, "select_option", {
        entity_id: this.config.entity,
        option: String(opt.value),
      });
    }
  }

  /** Arrow keys move the selection, as a radio group must: the pills are one
   *  control with N positions, not N independent buttons, so they take ONE tab
   *  stop (roving tabindex) and the arrows walk it. */
  _onKeydown(ev) {
    const KEYS = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!KEYS.includes(ev.key)) return;
    const options = this._options;
    if (!options.length) return;
    ev.preventDefault();
    const cur = String(this._stateObj?.state ?? "");
    const n = options.length;
    let i = options.findIndex((o) => String(o.value) === cur);
    if (i < 0) i = 0;
    const next =
      ev.key === "Home"
        ? 0
        : ev.key === "End"
        ? n - 1
        : ev.key === "ArrowRight" || ev.key === "ArrowDown"
        ? (i + 1) % n
        : (i - 1 + n) % n;
    this._select(options[next]);
    this.shadowRoot?.querySelectorAll(".pill")[next]?.focus();
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    const unavailable = this._isUnavailable(st);
    const cur = String(st?.state ?? "");
    const options = this._options;
    const active = options.find((o) => String(o.value) === cur) || null;
    const alert = this._activeAlert;

    // Two emphasis tiers, straight from the shell: HERO is the filled device
    // block — the loudest thing on its panel. SIDEKICK is its quiet companion
    // for pages that already have a hero. One hero per page; the rest are
    // sidekicks. A select is never "active", so it takes the resting pair.
    const pair = this._shellPair(false);
    const alertBg = alert?.color
      || "var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container))";
    const alertFg = alert?.color_on
      || "var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container))";
    const tinted = alert && this.config.alert_tints_hero !== false;
    const bg = tinted ? alertBg : (this.config.color ?? pair.bg);
    const fg = tinted ? alertFg : (this.config.color_on ?? pair.fg);

    const name = active?.label
      ?? (st ? (this.hass.formatEntityState?.(st) ?? this._capitalize(cur)) : "—");

    return html`
      <ha-card
        class=${unavailable ? "unavailable" : ""}
        style="--mh-bg:${bg};--mh-fg:${fg};--mh-alert-bg:${alertBg};--mh-alert-fg:${alertFg};"
      >
        <div class="stack">
          <div class="hero ${alert ? "attached" : ""}">
            ${this._renderBurst({ alarm: !!alert })}
            <div class="content">
              ${this.config.name ? html`<div class="eyebrow"><span>${this.config.name}</span></div>` : nothing}
              <div class="head">
                ${active?.glyph
                  ? html`<svg class="route" viewBox="0 0 48 34" aria-hidden="true">
                      ${svg`<path d=${active.glyph} pathLength="100" />`}
                    </svg>`
                  : active?.icon
                  ? html`<ha-icon class="gicon" .icon=${active.icon}></ha-icon>`
                  : nothing}
                <div class="text">
                  <div class="title">${unavailable ? t("unavailable", this.hass) : name}</div>
                  ${active?.secondary ? html`<div class="blurb">${active.secondary}</div>` : nothing}
                </div>
              </div>
              <div
                class="pills"
                role="radiogroup"
                aria-label=${this.config.name ?? this.config.entity}
                @keydown=${this._onKeydown}
              >
                ${options.map((o) => {
                  const on = String(o.value) === cur;
                  return html`<button
                    class="pill ${on ? "on" : ""}"
                    role="radio"
                    aria-checked=${on ? "true" : "false"}
                    tabindex=${on ? "0" : "-1"}
                    @click=${() => this._select(o)}
                  >${o.short ?? o.label}</button>`;
                })}
              </div>
            </div>
          </div>
          ${this._renderAlertStrip(alert, this.config.entity)}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-select-hero", MateriaSelectHero);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-select-hero",
  name: "Materia Select Hero",
  description: "A select whose current option owns the panel — glyph, name, one line of consequence, and the option pills in one block. A variant of Materia Hero.",
  preview: true,
});
