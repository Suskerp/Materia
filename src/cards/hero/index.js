import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { boomPath, softBurstPath } from "../../utils/shapes.js";
import { styles } from "./styles.js";
import "./editor.js";

/** Default "active" state per domain — the state that flips the hero to its
 *  accent pair and starts the burst turning. */
const DOMAIN_ACTIVE = {
  vacuum: "cleaning",
  light: "on",
  switch: "on",
  fan: "on",
  input_boolean: "on",
  lock: ["locked", "locking"],
  cover: "open",
  climate: "heat",
  media_player: "playing",
  binary_sensor: "on",
};

/**
 * Expressive headline hero (materia-hero): an eyebrow row, a big state title,
 * one enormous numeral with a unit + caption, and a sub-line — on an
 * asymmetric expressive container that swaps to an accent color pair while the
 * entity is active, with a slow-turning decorative burst behind it.
 *
 * Deliberately generic: every text slot is a template, so the same card is the
 * vacuum's "Cleaning / 34% cleaned", the laundry's remaining time, or solar's
 * live output. `value`/`title`/`caption`/`secondary` default to sensible reads
 * of the entity so a bare `entity` already renders something useful.
 *
 * `alerts` attaches a connected strip beneath the hero — the M3 connected-group
 * treatment (2dp seam, small inner corners, large outer) so the two read as one
 * object rather than two stacked cards. It only exists while something is
 * actually wrong, and the hero's own bottom corners tighten to meet it.
 *
 * LIST ORDER IS THE PRECEDENCE: entries are checked top-down and the first
 * active one is shown, so put the most serious condition first. An entry is
 * active when its `entity` matches `state` (default: any non-idle state), or —
 * with no entity — when its `text` template renders non-empty, which lets one
 * template both decide and describe the condition.
 */
class MateriaHero extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedTitle: { state: true },
    _resolvedValue: { state: true },
    _resolvedCaption: { state: true },
    _resolvedSecondary: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedActiveColor: { state: true },
    _resolvedActiveColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-hero-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("sensor.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Hero: entity is required");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("title", "_resolvedTitle");
      this._resolveField("value", "_resolvedValue");
      this._resolveField("caption", "_resolvedCaption");
      this._resolveField("secondary", "_resolvedSecondary");
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("active_color", "_resolvedActiveColor");
      this._resolveField("active_color_on", "_resolvedActiveColorOn");
      this._alertList().forEach((a, i) => {
        if (a.text != null) this._resolveTemplateValue(`alertText${i}`, a.text);
      });
    }
  }

  /** Normalised alert list; `alert:` (singular) is accepted as one entry. */
  _alertList() {
    if (Array.isArray(this.config.alerts)) return this.config.alerts;
    return this.config.alert ? [this.config.alert] : [];
  }

  /** States that mean "nothing to report". */
  _idle(state) {
    return ["off", "idle", "unknown", "unavailable", "false", "0", "none", "", "ok", "docked"]
      .includes(String(state ?? "").toLowerCase());
  }

  _alertText(i, a) {
    if (a.text == null) return "";
    const v = this._isTemplate(a.text) ? this._tplResults?.[`alertText${i}`] : a.text;
    return v == null ? "" : String(v).trim();
  }

  /** First active alert wins — the list's order is the declared precedence. */
  get _activeAlert() {
    const list = this._alertList();
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      const text = this._alertText(i, a);
      if (a.entity) {
        const st = this.hass?.states[a.entity];
        if (!st) continue;
        const cur = String(st.state);
        if (a.state != null) {
          const want = Array.isArray(a.state) ? a.state.map(String) : [String(a.state)];
          if (!want.includes(cur)) continue;
        } else if (this._idle(cur)) {
          continue;
        }
        // No text configured: fall back to the entity's own localized state.
        return { ...a, text: text || (this.hass.formatEntityState?.(st) ?? cur) };
      }
      // Template-only: an empty render means the condition isn't met.
      if (!text) continue;
      return { ...a, text };
    }
    return null;
  }

  /** Literal config value or its resolved template. */
  _field(key, resolved) {
    const raw = this.config[key];
    if (raw == null) return null;
    const v = this._isTemplate(raw) ? this[resolved] : raw;
    return v == null || v === "" ? null : v;
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  _isActive(st) {
    if (!st) return false;
    const domain = st.entity_id.split(".")[0];
    const active = this.config.active_state ?? DOMAIN_ACTIVE[domain] ?? "on";
    const list = Array.isArray(active) ? active : [active];
    return list.some((a) => String(a) === st.state);
  }

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    const unavailable = this._isUnavailable(st);
    const active = !unavailable && this._isActive(st);

    const name = this.config.name ?? st?.attributes?.friendly_name ?? this.config.entity;
    const icon = this.config.icon ?? st?.attributes?.icon;

    // Title defaults to the localized state ("Cleaning", "Charging").
    const title = this._field("title", "_resolvedTitle")
      ?? (st ? (this.hass.formatEntityState?.(st) ?? st.state) : "—");

    // Value defaults to the entity's own numeric state; a non-numeric state
    // simply leaves the big numeral out rather than printing a word at 108px.
    let value = this._field("value", "_resolvedValue");
    if (value == null && st) {
      const n = this._num(st.state);
      if (n != null) value = String(Math.round(n));
    }
    const unit = this.config.unit ?? (value != null ? st?.attributes?.unit_of_measurement : null);
    const caption = this._field("caption", "_resolvedCaption");
    const secondary = this._field("secondary", "_resolvedSecondary");

    // Token-mapped color pairs: the accent pair takes over while active. The
    // "device" custom color is the same family materia-card gives switches,
    // vacuums and plugs when they're doing something.
    const alert = this._activeAlert;
    const alertBg = alert?.color
      || "var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container))";
    const alertFg = alert?.color_on
      || "var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container))";

    // An active alert takes the WHOLE object into its colour, hero included —
    // a red strip under an otherwise-calm hero is easy to miss. The 2dp seam
    // still shows the page through, so the two parts stay articulated even
    // when they share a tone. Opt out with alert_tints_hero: false.
    const tinted = alert && this.config.alert_tints_hero !== false;

    const bg = tinted
      ? alertBg
      : active
      ? (this._field("active_color", "_resolvedActiveColor") ?? "var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))")
      : (this._field("color", "_resolvedColor") ?? "var(--md-sys-color-secondary-container)");
    const fg = tinted
      ? alertFg
      : active
      ? (this._field("active_color_on", "_resolvedActiveColorOn") ?? "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))")
      : (this._field("color_on", "_resolvedColorOn") ?? "var(--md-sys-color-on-secondary-container)");

    // Decoration, both canonical MaterialShapes and deliberately a pair:
    // SoftBurst at rest (ten round lobes) becoming BOOM while an alert is live
    // (fifteen near-sharp spikes), so the silhouette itself carries the fault
    // rather than only the colour. Previously the calm shape was two rounded
    // squares copied from the concept art — not a spec shape at all.
    const calm = softBurstPath(90, 90, 86);
    const boom = boomPath(90, 90, 88);

    return html`
      <ha-card style="--mh-bg:${bg};--mh-fg:${fg};--mh-alert-bg:${alertBg};--mh-alert-fg:${alertFg};">
        <div class="stack">
        <div
          class="hero ${unavailable ? "unavailable" : ""} ${alert ? "attached" : ""}"
          @click=${() => this._handleAction(this.config.tap_action || { action: "more-info", entity: this.config.entity })}
        >
          ${this.config.burst === false
            ? nothing
            : html`<svg class="burst ${alert ? "alarm" : active ? "working" : ""}" viewBox="0 0 180 180" aria-hidden="true">
                ${alert
                  ? svg`<g class="loom"><path d=${boom} /></g>`
                  : svg`<g class="drift"><path d=${calm} /></g>`}
              </svg>`}
          <div class="content">
            <div class="eyebrow">
              ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
              <span>${name}</span>
            </div>
            <div class="title">${unavailable ? "Unavailable" : title}</div>
            ${value != null
              ? html`<div class="figure">
                  <span class="value">${value}</span>
                  ${unit ? html`<span class="unit">${unit}</span>` : nothing}
                  ${caption ? html`<span class="caption">${caption}</span>` : nothing}
                </div>`
              : nothing}
            ${secondary ? html`<div class="secondary">${secondary}</div>` : nothing}
          </div>
        </div>
        ${alert
          ? html`<div
              class="alert"
              role="status"
              @click=${() => this._handleAction(alert.tap_action || { action: "more-info", entity: alert.entity || this.config.entity })}
            >
              <ha-icon .icon=${alert.icon ?? "mdi:alert-circle-outline"}></ha-icon>
              <span>${alert.text}</span>
            </div>`
          : nothing}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("materia-hero", MateriaHero);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-hero",
  name: "Materia Hero",
  description: "Expressive headline block — big state title, one enormous numeral, and an accent swap while active.",
  preview: true,
});
