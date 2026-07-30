import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Select hero (materia-select-hero) — design 9c, "mode owns the panel", made
 * generic: a select whose CURRENT OPTION owns a filled block — a per-option
 * glyph, the option's name at display size, one line of consequence — with the
 * option pills inside the same block, because choosing is part of the same
 * object as the explanation.
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
 * `glyph` is an SVG path on the design's 48x34 grid — the route the robot
 * actually drives — stroked in currentColor.
 */
class MateriaSelectHero extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = styles;

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

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    const unavailable = this._isUnavailable(st);
    const cur = String(st?.state ?? "");
    const options = this._options;
    const active = options.find((o) => String(o.value) === cur) || null;

    const bg = this.config.color
      ?? "var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))";
    const fg = this.config.color_on
      ?? "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))";

    const name = active?.label
      ?? (st ? (this.hass.formatEntityState?.(st) ?? this._capitalize(cur)) : "—");

    return html`
      <ha-card class=${unavailable ? "unavailable" : ""} style="--msh-bg:${bg};--msh-fg:${fg};">
        <div class="block">
          ${this.config.name ? html`<div class="eyebrow">${this.config.name}</div>` : nothing}
          <div class="head">
            ${active?.glyph
              ? html`<svg class="route" viewBox="0 0 48 34" aria-hidden="true">
                  ${svg`<path d=${active.glyph} />`}
                </svg>`
              : active?.icon
              ? html`<ha-icon class="gicon" .icon=${active.icon}></ha-icon>`
              : nothing}
            <div class="text">
              <div class="title">${unavailable ? t("unavailable", this.hass) : name}</div>
              ${active?.secondary ? html`<div class="blurb">${active.secondary}</div>` : nothing}
            </div>
          </div>
          <div class="pills" role="listbox" aria-label=${this.config.name ?? this.config.entity}>
            ${options.map((o) => {
              const on = String(o.value) === cur;
              return html`<button
                class="pill ${on ? "on" : ""}"
                role="option"
                aria-selected=${on ? "true" : "false"}
                @click=${() => this._select(o)}
              >${o.short ?? o.label}</button>`;
            })}
          </div>
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
  description: "A select whose current option owns the panel — glyph, name, one line of consequence, and the option pills in one filled block.",
  preview: true,
});
