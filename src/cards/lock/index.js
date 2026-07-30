import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { materialCookiePath, pillPath, gemPath } from "../../utils/shapes.js";
import { t } from "../../utils/i18n.js";
import { styles } from "./styles.js";
import "../../primitives/drag-confirm.js";
import "./editor.js";

/** Silhouettes the shape can take, drawn in a 180x180 box.
 *
 *  `rot` is HALF the shape's rotational-symmetry period — the largest turn that
 *  still reads as movement before the silhouette maps back onto itself. Deriving
 *  it per shape is why cookie9 turns 20 degrees and gem turns 90: a flat 45 for
 *  everything would be nearly invisible on a 9-pointed cookie (whose period is
 *  40) and would stop well short on a 2-fold gem.
 *
 *  cookie9 is the DEFAULT. `squircle` is the CSS-box original and is kept
 *  because it is the only one of these that can animate its OUTLINE
 *  continuously — CSS cannot interpolate an SVG path, so every vector silhouette
 *  changes state by turning rather than by morphing. Choosing a vector shape is
 *  therefore a deliberate trade of that continuous morph for a real
 *  MaterialShapes outline. */
const SHAPE_STYLES = {
  squircle: { vector: false, rot: 45 },
  // star(9, innerRadius .8, rounding .5) rotated -90 — MaterialShapes.Cookie9Sided.
  cookie9: { vector: true, rot: 360 / 9 / 2, path: () => materialCookiePath(90, 90, 86, 9) },
  // reps 2 + mirroring -> 4-fold, so its period is 90. Measured aspect 1.000:
  // despite the name this is a squircle with concave sides, not a capsule.
  pill: { vector: true, rot: 45, path: () => pillPath(90, 90, 172) },
  // reps 1 + mirroring -> 2-fold, period 180.
  gem: { vector: true, rot: 90, path: () => gemPath(90, 90, 172) },
};

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
    /** True from spin-up until the wind-down completes — drives the class that
     *  stands the path's own state turn down while the spin owns rotation. */
    _spinning: { state: true },
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
    if (this._selfContained) return this._local ?? (this.config.initial_locked !== false);
    // IN-FLIGHT DISPLAYS THE ORIGIN. Some locks report locking/unlocking for the
    // seconds the bolt is driving, and the destination has not happened yet —
    // the surface floods when the machine ARRIVES, not when the command is
    // accepted. "unlocking" needs saying explicitly: it fails the === locked
    // test and would read as already-unlocked, flipping the card at the moment
    // of acceptance. ("locking" reads as still-unlocked for the same reason,
    // which happens to be correct.) _pending no longer flips the display either;
    // it only marks the wait.
    if (String(this._stateObj?.state ?? "") === "unlocking") return true;
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
    if (changed.has("hass") && this._pending != null) {
      // The entity has agreed with what we asked for — drop the optimistic state
      // and let the real one drive again.
      if (this._entityLocked === this._pending) {
        this._pending = null;
        clearTimeout(this._pendingTimer);
      }
    }
    this._syncSpin();
  }

  /* ---- the in-flight spin -------------------------------------------------
     A CSS animation cannot stop gracefully: removing it snaps the shape back to
     its resting angle, which is the opposite of graceful. So the spin is
     integrated per frame — ramp up, cruise at 40 deg/s (one revolution in 9s,
     the pace vacuum-hero's burst already established for "working"), and on
     arrival decelerate to the NEXT SYMMETRIC POSE of the silhouette. The stop
     duration is derived so the ease-out's initial slope EQUALS the cruise
     speed, so the wind-down begins without a kick at the seam.

     Only shapes whose silhouette repeats quickly can land in reasonable time —
     the cookie repeats every 40 degrees and always lands inside ~2.5s; pill and
     gem repeat every 90/180 and would take up to 5-10s, so they breathe
     instead (_spins gates on the period). */
  get _shapeStyle() {
    return SHAPE_STYLES[this.config.shape_style] ?? SHAPE_STYLES.cookie9;
  }

  get _spins() {
    const st = this._shapeStyle;
    return st.vector && st.rot * 2 <= 45
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  get _inFlight() {
    const s = this._transitioning;
    return s === "locking" || s === "unlocking";
  }

  _syncSpin() {
    if (this._inFlight && this._spins) this._spinUp();
    else this._spinDown();
  }

  _spinUp() {
    if (this._spinMode === "ramp" || this._spinMode === "cruise") return;
    const resuming = this._spinMode === "stop";
    this._spinMode = "ramp";
    this._spinning = true;
    this._spinDeg = this._spinDeg ?? 0;
    // Re-committing mid-wind-down: the braked speed is unknown, so ramp afresh
    // from zero rather than jumping back to the stale cruise value.
    this._spinVel = resuming ? 0 : (this._spinVel ?? 0);
    if (this._spinRaf) return; // a wind-down is mid-frame; the loop redirects
    const CRUISE = 40;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (this._spinMode === "ramp") {
        this._spinVel = Math.min(CRUISE, this._spinVel + (CRUISE / 0.5) * dt);
        if (this._spinVel >= CRUISE) this._spinMode = "cruise";
        this._spinDeg += this._spinVel * dt;
      } else if (this._spinMode === "cruise") {
        this._spinDeg += CRUISE * dt;
      } else if (this._spinMode === "stop") {
        const t = Math.min(1, (now - this._stopT0) / this._stopDur);
        const k = 1 - (1 - t) * (1 - t); // quadratic ease-out
        this._spinDeg = this._stopFrom + (this._stopTo - this._stopFrom) * k;
        if (t >= 1) {
          this._spinDeg = this._stopTo % 360; // bounded growth; pose is free
          this._applySpin();
          this._spinMode = null;
          this._spinVel = 0;
          this._spinning = false;
          this._spinRaf = null;
          return;
        }
      } else {
        this._spinRaf = null;
        return;
      }
      this._applySpin();
      this._spinRaf = requestAnimationFrame(tick);
    };
    this._spinRaf = requestAnimationFrame(tick);
  }

  _spinDown() {
    if (this._spinMode !== "ramp" && this._spinMode !== "cruise") return;
    const from = this._spinDeg ?? 0;
    const vel = Math.max(this._spinVel ?? 40, 8);
    // NATURAL stop, no target pose. A 9-fold star reads identically at any
    // resting angle — its tips have no absolute reference — so the earlier
    // land-on-a-symmetric-pose rule bought nothing and cost a tail of up to
    // 2.5s that kept turning long after the lock had landed. Fixed 550ms, the
    // expressive-default morph's own beat, travelling only what momentum
    // carries: to = from + vel*D/2 makes the quadratic-out's initial slope
    // EXACTLY the cruise speed. Braking only; it can never speed up.
    const D = 0.55;
    this._stopFrom = from;
    this._stopTo = from + (vel * D) / 2;
    this._stopDur = D * 1000;
    this._stopT0 = performance.now();
    this._spinMode = "stop";
  }

  _applySpin() {
    const el = this.shadowRoot?.querySelector(".shape");
    el?.style.setProperty("--ml-spin", (this._spinDeg % 360).toFixed(2) + "deg");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._pendingTimer);
    if (this._spinRaf) cancelAnimationFrame(this._spinRaf);
    this._spinRaf = null;
    this._spinMode = null;
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
        <div class="pending">${t("entity_not_found_with_id", this.hass, { entity: this.config.entity })}</div>
      </div></ha-card>`;
    }

    const unavailable = !!st && this._isUnavailable(st);
    const locked = this._locked;
    const busy = this._transitioning;
    const inFlight = busy === "locking" || busy === "unlocking";

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

    const style = this._shapeStyle;

    // Locking is a backward motion and unlocking a forward one, so the gesture
    // mirrors rather than always sweeping the same way — the handle ends each
    // commit resting where the next one starts.
    const hint = locked
      ? (this.config.unlock_hint ?? t("lock_slide_to_unlock", this.hass))
      : (this.config.lock_hint ?? t("lock_slide_to_lock", this.hass));
    const holdHint = locked
      ? (this.config.unlock_hold_hint ?? t("lock_hold_to_unlock", this.hass))
      : (this.config.lock_hold_hint ?? t("lock_hold_to_lock", this.hass));
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
                <div
                  class="shape ${locked ? "" : "unlocked"} ${style.vector ? "vector" : ""} ${inFlight && !this._spins ? "working" : ""} ${this._spinning ? "spinning" : ""}"
                  style="--ml-rot:${style.rot}deg"
                >
                  ${style.vector
                    ? html`<svg class="silhouette" viewBox="0 0 180 180" aria-hidden="true">
                        ${svg`<path d=${style.path()} />`}
                      </svg>`
                    : nothing}
                  <ha-icon .icon=${icon}></ha-icon>
                </div>
              </div>`}

          <materia-drag-confirm
            .gesture=${isHold ? "hold" : "slide"}
            .label=${inFlight
              ? (busy === "locking"
                  ? (this.config.locking_label ?? t("lock_locking", this.hass))
                  : (this.config.unlocking_label ?? t("lock_unlocking", this.hass)))
              : isHold
              ? holdHint
              : hint}
            .pending=${inFlight}
            .direction=${locked ? "forward" : "backward"}
            .threshold=${this.config.threshold ?? 0.55}
            .holdMs=${this.config.hold_ms ?? 800}
            ?disabled=${unavailable}
            @confirm=${this._confirm}
          ></materia-drag-confirm>

          ${busy === "jammed"
            ? html`<div class="pending">
                ${this.config.jammed_label ?? t("lock_jammed_hint", this.hass)}
              </div>`
            : this._selfContained
            ? html`<div class="demo-note">
                ${this.config.demo_label ?? t("lock_demo_note", this.hass)}
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
