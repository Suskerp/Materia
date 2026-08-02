import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { HeroShellMixin, heroShellStyles } from "./shell.js";
import { OptimismBus } from "../../utils/optimism-bus.js";
import { settledLockState, isLockBusy } from "../../utils/lock-state.js";
import { t } from "../../utils/i18n.js";
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
class MateriaHero extends HeroShellMixin(ActionMixin(LitElement)) {
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

  static styles = heroShellStyles;

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
      this._resolveAlertTemplates();
      this._trackLockFamily();
    }
  }

  /** Lock-domain only: remembers the family ("locked" | "unlocked") the
   *  entity last actually SETTLED into, so `_effectiveLockState` can tell a
   *  genuine "unlocking" from hardware that reports one as a relatch
   *  settling — see utils/lock-state.js. A lock card paired with this same
   *  entity applies the identical logic, so the two never disagree about
   *  what a given raw state means. */
  _trackLockFamily() {
    const st = this._stateObj;
    if (!st || this.config.entity?.split(".")[0] !== "lock") return;
    const lockedState = this.config.locked_state ?? "locked";
    const eff = settledLockState(st.state, this._lastFamily, lockedState);
    if (!isLockBusy(eff)) {
      this._lastFamily = eff === lockedState ? "locked" : "unlocked";
    }
  }

  /** The state string everything below should actually read: unchanged for
   *  every domain but lock, where a bogus direction report gets swapped for
   *  the settled state it actually means (see utils/lock-state.js). */
  _effectiveLockState(st) {
    if (!st || this.config.entity?.split(".")[0] !== "lock") return st?.state;
    return settledLockState(st.state, this._lastFamily, this.config.locked_state ?? "locked");
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

  connectedCallback() {
    super.connectedCallback();
    // Sibling cards (a lock below this hero) publish what they just told the
    // entity to do — reflect it instantly instead of waiting out the ack.
    this._busUnsub = OptimismBus.subscribe((entity) => {
      if (entity === this.config?.entity) this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._busUnsub?.();
    this._busUnsub = null;
  }

  /** Localized word for a predicted (not yet reported) state. */
  _predictedLabel(state) {
    const key = { locking: "state_locking", unlocking: "state_unlocking" }[state];
    if (key) return t(key, this.hass);
    return state.charAt(0).toUpperCase() + state.slice(1);
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    const unavailable = this._isUnavailable(st);
    // A live prediction outranks the (stale) reported state — for the title
    // AND the active surface, so this card and the one that fired the
    // command move together. peek() dies as soon as reality moves.
    const predicted = st && this.config.entity
      ? OptimismBus.peek(this.config.entity, st.state)
      : null;
    // Lock-only: a bogus direction report (this Nuki's post-relatch
    // "unlocking", seconds after the door was already open again) gets
    // swapped for the state it actually settled into — see
    // _trackLockFamily/utils/lock-state.js. Every other domain is
    // untouched: effState === st.state.
    const effState = this._effectiveLockState(st);
    const effSt = st && effState !== st.state ? { ...st, state: effState } : st;
    const active = !unavailable && (predicted
      ? this._isActive({ ...effSt, state: predicted })
      : this._isActive(effSt));

    const name = this.config.name ?? st?.attributes?.friendly_name ?? this.config.entity;
    const icon = this.config.icon ?? st?.attributes?.icon;

    // Title defaults to the localized state ("Cleaning", "Charging").
    const title = predicted
      ? this._predictedLabel(predicted)
      : this._field("title", "_resolvedTitle")
        ?? (effSt ? (this.hass.formatEntityState?.(effSt) ?? effSt.state) : "—");

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

    // The tier decides the family (see SHELL_PAIR in shell.js); config may
    // override either channel, per state, with a template.
    const pair = this._shellPair(active);
    const bgOverride = active
      ? this._field("active_color", "_resolvedActiveColor")
      : this._field("color", "_resolvedColor");
    const fgOverride = active
      ? this._field("active_color_on", "_resolvedActiveColorOn")
      : this._field("color_on", "_resolvedColorOn");
    const bg = tinted ? alertBg : (bgOverride ?? pair.bg);
    const fg = tinted ? alertFg : (fgOverride ?? pair.fg);

    return html`
      <ha-card style="--mh-bg:${bg};--mh-fg:${fg};--mh-alert-bg:${alertBg};--mh-alert-fg:${alertFg};">
        <div class="stack">
        <div
          class="hero ${unavailable ? "unavailable" : ""} ${alert ? "attached" : ""}"
          @click=${() => this._handleAction(this.config.tap_action || { action: "more-info", entity: this.config.entity })}
        >
          ${this._renderBurst({ alarm: !!alert, working: active })}
          <div class="content">
            <div class="eyebrow">
              ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
              <span>${name}</span>
            </div>
            <div class="title">${unavailable ? t("unavailable", this.hass) : title}</div>
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
        ${this._renderAlertStrip(alert, this.config.entity)}
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
