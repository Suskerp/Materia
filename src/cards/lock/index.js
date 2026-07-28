import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "../../primitives/drag-confirm.js";
import "./editor.js";

/**
 * Lock control (materia-lock) — the morphing lock shape and the commit gesture,
 * as two halves of one object.
 *
 * This is the design doc's 2b lock page minus its title block, because that
 * block is already materia-hero: eyebrow, big state word, sub-line, and an
 * accent swap while active. Rebuilding it here would have been a second copy of
 * a card that exists. See the README snippet for stacking the two.
 *
 * WHAT IS DELIBERATELY MISSING is a tap. There is no tap_action on the gesture
 * and no toggle anywhere near it, because the one thing a lock card must never
 * do is throw a bolt on a mis-tap while you scroll past. Committing takes either
 * a drag past the threshold or a sustained hold — see materia-drag-confirm,
 * which owns the gesture so a garage door or an alarm can reuse it. The shape
 * still takes a tap, but only for `tap_action` (more-info by default).
 *
 * EMPHASIS, NOT HUE. UNLOCKED is the high-emphasis state — a filled tonal
 * surface — and LOCKED is a quiet one. That is the opposite of what a
 * green/red instinct suggests and it is the right way round twice over: it is
 * the design doc's own call ("open floods the screen, locked drops to
 * near-black"), and unlocked is the state you need to notice from the doorway.
 * It also survives colour blindness, because the two states differ in fill and
 * in the shape's silhouette, not only in hue. Note this inverts materia-hero's
 * default for locks, which treats `locked` as the active state — pair the two
 * with `active_state: unlocked` on the hero.
 *
 * STATE. With no entity the card is self-contained and flips its own state,
 * which is how it can be laid out and felt before a lock integration exists.
 * With an entity it drives the real thing and holds an optimistic local state
 * until the entity catches up, so the shape doesn't sit unmoved for the second
 * a Z-Wave lock takes to answer. `lock`, `switch` and `input_boolean` all work;
 * which state counts as locked is config, not a guess, because "on" means
 * unlocked on a relay strike and locked on plenty of other things.
 */
class MateriaLock extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    /** Optimistic state: what we just asked for, until the entity agrees. */
    _pending: { state: true },
    /** Self-contained state, used when there is no entity. */
    _local: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-lock-editor");
  }

  static getStubConfig() {
    // No entity by default: the card is useful and demonstrable immediately,
    // and this install has no lock to point at.
    return { gesture: "slide" };
  }

  setConfig(config) {
    this.config = { gesture: "slide", ...config };
  }

  constructor() {
    super();
    this._pending = null;
    this._local = null;
  }

  get _stateObj() {
    return this.config?.entity ? this.hass?.states[this.config.entity] : null;
  }

  get _selfContained() {
    return !this.config?.entity;
  }

  /** The state string that counts as locked, per domain. `switch` defaults to
   *  "off" because a relay strike is energised to RELEASE the door — a card
   *  reading "Locked" while the door stands open is the dangerous failure, so
   *  the safer of the two guesses is the default. Override with locked_state. */
  get _lockedState() {
    if (this.config.locked_state) return String(this.config.locked_state);
    const domain = this.config.entity?.split(".")[0];
    return domain === "switch" || domain === "input_boolean" ? "off" : "locked";
  }

  /** True when the real entity reports locked. Null when there is nothing to
   *  read, which is what puts the card in self-contained mode. */
  get _entityLocked() {
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) return null;
    return String(st.state) === this._lockedState;
  }

  get _locked() {
    if (this._pending != null) return this._pending;
    if (this._selfContained) return this._local ?? (this.config.initial_locked !== false);
    const real = this._entityLocked;
    return real ?? (this._local ?? true);
  }

  /** In-flight states are worth showing: a lock that takes three seconds should
   *  say so rather than look like nothing happened. */
  get _transitioning() {
    const s = String(this._stateObj?.state ?? "");
    if (s === "locking" || s === "unlocking" || s === "jammed") return s;
    return this._pending != null ? (this._pending ? "locking" : "unlocking") : null;
  }

  updated(changed) {
    if (!changed.has("hass") || this._pending == null) return;
    // The entity has agreed with what we asked for — drop the optimistic state
    // and let the real one drive again.
    if (this._entityLocked === this._pending) {
      this._pending = null;
      clearTimeout(this._pendingTimer);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._pendingTimer);
  }

  _confirm() {
    const next = !this._locked;

    if (this._selfContained) {
      this._local = next;
      return;
    }

    this._pending = next;
    // If the entity never answers, stop claiming we succeeded. Without this the
    // card would lie indefinitely about an offline lock.
    clearTimeout(this._pendingTimer);
    this._pendingTimer = setTimeout(() => {
      this._pending = null;
    }, this.config.pending_timeout_ms ?? 10000);

    const eid = this.config.entity;
    const domain = eid.split(".")[0];
    if (domain === "lock") {
      this._callService("lock", next ? "lock" : "unlock", { entity_id: eid });
    } else {
      // Which switch position is "locked" is configurable, so derive the
      // service from that rather than assuming on/off means anything.
      const lockedIsOff = this._lockedState === "off";
      const on = next ? !lockedIsOff : lockedIsOff;
      this._callService(domain, on ? "turn_on" : "turn_off", { entity_id: eid });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const st = this._stateObj;
    if (this.config.entity && !st) {
      return html`<ha-card><div class="body">
        <div class="pending">Entity not found: ${this.config.entity}</div>
      </div></ha-card>`;
    }

    const unavailable = !!st && this._isUnavailable(st);
    const locked = this._locked;
    const busy = this._transitioning;

    // Colour: the flooded pair while unlocked, a quiet surface while locked.
    // `device` is the palette's existing "this device is in its active state"
    // token — the same one materia-hero and materia-card already use — so the
    // two cards agree without a bespoke lock colour.
    const bg = locked
      ? (this.config.locked_color ?? "var(--md-sys-color-surface-container-low, var(--card-background-color))")
      : (this.config.unlocked_color ?? "var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))");
    const fg = locked
      ? (this.config.locked_color_on ?? "var(--md-sys-color-on-surface)")
      : (this.config.unlocked_color_on ?? "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))");
    const accent = this.config.accent ?? "var(--md-sys-color-primary)";
    const accentOn = this.config.accent_on ?? "var(--md-sys-color-on-primary)";

    // Shape and handle are derived from the surface pair rather than adding four
    // more colour keys. While unlocked they INVERT it — the surface's ink
    // becomes their fill and the surface itself becomes their glyph — which is
    // legible in both themes for free, because the theme already guarantees
    // those two contrast.
    //
    // These have to name `fg`/`bg` explicitly and NOT use currentColor: both
    // .shape and .handle set their own `color`, so a currentColor fill would
    // resolve against their own glyph colour and paint the glyph invisible
    // against an identically-coloured block.
    const shapeBg = locked ? `color-mix(in srgb, ${fg} 12%, transparent)` : fg;
    const shapeFg = locked ? accent : bg;
    const handleBg = locked ? accent : fg;
    const handleFg = locked ? accentOn : bg;

    const icon = locked
      ? (this.config.locked_icon ?? "m3o:lock")
      : (this.config.unlocked_icon ?? "m3o:lock-open-right");

    // Locking is a backward motion and unlocking a forward one, so the gesture
    // mirrors rather than always sweeping the same way — the handle ends each
    // commit resting where the next one starts.
    const hint = locked
      ? (this.config.unlock_hint ?? "Slide to unlock")
      : (this.config.lock_hint ?? "Slide to lock");
    const holdHint = locked
      ? (this.config.unlock_hold_hint ?? "Hold to unlock")
      : (this.config.lock_hold_hint ?? "Hold to lock");
    const isHold = this.config.gesture === "hold";

    return html`
      <ha-card
        class=${unavailable ? "unavailable" : ""}
        style="--ml-bg:${bg};--ml-fg:${fg};--ml-shape-bg:${shapeBg};--ml-shape-fg:${shapeFg};--ml-handle-bg:${handleBg};--ml-handle-fg:${handleFg};"
      >
        <div class="body">
          ${this.config.shape === false
            ? nothing
            : html`<div
                class="shape-wrap"
                @click=${() =>
                  this._handleAction(
                    this.config.tap_action ||
                      (this.config.entity
                        ? { action: "more-info", entity: this.config.entity }
                        : { action: "none" })
                  )}
              >
                <div class="shape ${locked ? "" : "unlocked"}">
                  <ha-icon .icon=${icon}></ha-icon>
                </div>
              </div>`}

          <materia-drag-confirm
            .gesture=${isHold ? "hold" : "slide"}
            .label=${isHold ? holdHint : hint}
            .icon=${locked ? "m3o:arrow-forward" : "m3o:arrow-back"}
            .direction=${locked ? "forward" : "backward"}
            .threshold=${this.config.threshold ?? 0.55}
            .holdMs=${this.config.hold_ms ?? 800}
            ?disabled=${unavailable}
            @confirm=${this._confirm}
          ></materia-drag-confirm>

          ${busy
            ? html`<div class="pending">
                ${busy === "jammed"
                  ? (this.config.jammed_label ?? "Jammed — check the door")
                  : busy === "locking"
                  ? (this.config.locking_label ?? "Locking…")
                  : (this.config.unlocking_label ?? "Unlocking…")}
              </div>`
            : this._selfContained
            ? html`<div class="demo-note">
                ${this.config.demo_label ?? "Demo · no entity"}
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
    return 5;
  }
}

customElements.define("materia-lock", MateriaLock);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-lock",
  name: "Materia Lock",
  description: "Lock shape that morphs square→circle, with a drag-to-confirm or hold-to-confirm gesture. Works with no entity.",
  preview: true,
});
