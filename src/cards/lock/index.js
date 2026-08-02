import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { materialCookiePath, pillPath, gemPath } from "../../utils/shapes.js";
import { t } from "../../utils/i18n.js";
import { OptimismBus } from "../../utils/optimism-bus.js";
import { settledLockState, isLockBusy } from "../../utils/lock-state.js";
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
 *
 * OPEN/UNLATCH is a SEPARATE control (below the gesture), not a third
 * position on it — a square outlined button, disabled while locked (opening
 * only makes sense once already unlocked; the gesture itself still owns
 * locked <-> unlocked). `unlock_service: open` covers hardware whose
 * "unlock" IS the swing-open action; `open_action` covers the OTHER case,
 * a distinct extra action available once unlocked (a relay pulse, a
 * multi-step "let them in" sequence) that the gesture must never fire by
 * itself.
 *
 * `state_remap` treats one reported raw state as another before ANYTHING
 * else reads it (locked/unlocked, in-flight, jammed, colour, icon, spin) —
 * for hardware that reports a real but misleading transition (a relatch
 * settling reported as "unlocking" seconds after a door that was never
 * locked). */
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
    /** One-shot flourish on the OPEN button — a quick single full turn,
     *  distinct from the continuous in-flight spin above (which tracks a
     *  real busy lock/unlock and eases to an aligned pose). This is just a
     *  tap receipt: it always completes one full turn and never touches
     *  the shape's actual pose. */
    _openSpin: { state: true },
    /** Optimistic OPEN: set the instant the button is tapped, cleared once
     *  the real entity actually reports open/opening (or a safety timeout)
     *  — the same bridge-over-the-ack-gap `_pending` already is for the
     *  gesture, so the open face doesn't wait out the round-trip either. */
    _openPending: { state: true },
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
    this._openSpin = false;
    this._openPending = false;
  }

  get _stateObj() {
    return this.config?.entity ? this.hass?.states[this.config.entity] : null;
  }

  get _selfContained() {
    return !this.config?.entity;
  }

  /** The raw entity state, remapped through `state_remap` BEFORE anything
   *  else reads it — a literal, context-free substitution for hardware that
   *  reports some OTHER genuinely idiosyncratic string. It does NOT solve
   *  the "unlocking" ambiguity below — that needs the previous state, not
   *  just the current one, which is what `_effectiveState` is for. */
  get _rawState() {
    const raw = String(this._stateObj?.state ?? "");
    const remap = this.config?.state_remap || {};
    return Object.prototype.hasOwnProperty.call(remap, raw) ? remap[raw] : raw;
  }

  /** `_rawState`, disambiguated against `_lastFamily` — see
   *  utils/lock-state.js for the full reasoning. This is the single point
   *  every other getter funnels through, so the fix applies to
   *  locked/unlocked, in-flight, jammed, colour, icon and spin uniformly,
   *  not just one of them. */
  get _effectiveState() {
    return settledLockState(this._rawState, this._lastFamily, this._lockedState);
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
    return this._effectiveState === this._lockedState;
  }

  get _locked() {
    if (this._selfContained) return this._local ?? (this.config.initial_locked !== false);
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) return this._local ?? true;
    // IN-FLIGHT DISPLAYS THE ORIGIN. A genuine "unlocking" (locked heading to
    // unlocked) hasn't arrived yet, so the surface stays locked until the
    // machine ARRIVES — `_effectiveState` has already dropped anything that
    // ISN'T genuine (see settledLockState), so this check no longer needs to
    // guess.
    if (this._effectiveState === "unlocking") return true;
    return this._effectiveState === this._lockedState;
  }

  /** In-flight states are worth showing: a lock that takes three seconds should
   *  say so rather than look like nothing happened. */
  get _transitioning() {
    if (this._selfContained) return null;
    const s = this._effectiveState;
    if (s === "locking" || s === "unlocking" || s === "jammed") return s;
    return this._pending != null ? (this._pending ? "locking" : "unlocking") : null;
  }

  updated(changed) {
    if (changed.has("hass")) {
      if (this._pending != null) {
        // The entity has agreed with what we asked for — drop the optimistic
        // state and let the real one drive again.
        if (this._entityLocked === this._pending) {
          this._pending = null;
          clearTimeout(this._pendingTimer);
        }
      }
      // The family the entity last actually SETTLED into — everything
      // `settledLockState` needs to tell a real "unlocking" from a bogus
      // one apart. Only resting reads move it forward; a state this same
      // getter just resolved (opening, jammed, a genuine locking/unlocking)
      // never does, or the memory of "where we came from" would be
      // overwritten by the very transition it exists to judge.
      if (!this._selfContained) {
        const eff = this._effectiveState;
        if (!isLockBusy(eff)) {
          this._lastFamily = eff === this._lockedState ? "locked" : "unlocked";
        }
        // The entity has caught up with the open tap — drop the optimistic
        // hold and let the real read take over.
        if (this._openPending && (eff === "open" || eff === "opening")) {
          this._openPending = false;
          clearTimeout(this._openPendingTimer);
        }
      }
    }
    // Order matters: fold a pose flip into the spin BEFORE _syncSpin reads
    // _spinDeg as the wind-down's starting point.
    this._compensatePoseTurn();
    this._syncSpin();
  }

  /** THE SEAM THAT USED TO JUMP. Pose (the state turn, ±rot on the path) and
   *  spin (the in-flight rotation on the silhouette) are rotations of the SAME
   *  shape, so they compose additively — which means a pose change need not be
   *  visible at all while the spin runs. When the destination state lands, the
   *  path's turn snaps (transition:none under .spinning) — a jump of half the
   *  silhouette's symmetry period, the LARGEST displacement the eye can see,
   *  and at 40 deg/s it was very visible, "imperceptible on a spinning shape"
   *  was simply wrong. So the snap is cancelled in the same frame: the spin
   *  variable absorbs exactly -delta, total rotation stays continuous, and the
   *  wind-down carries the shape through the state change as one unbroken
   *  deceleration. The pose still ends up correct; the spin residual is just
   *  offset by a symmetry-equivalent amount, which on these shapes is free. */
  _compensatePoseTurn() {
    const unlocked = !this._locked;
    const prev = this._lastPose;
    this._lastPose = unlocked;
    if (prev === undefined || prev === unlocked) return;
    if (!this._spinning || !this._spins) return;
    const rot = this._shapeStyle.rot;
    this._spinDeg = (this._spinDeg ?? 0) + (unlocked ? -rot : rot);
    // Same frame as the class flip, so both land in one style recalc.
    this._applySpin();
    // A wind-down in progress is now half a period off its aligned target
    // (the pose turn is rot, alignment is 2*rot), and its endpoints predate
    // the compensation — re-plan from here at the brake's instantaneous
    // speed instead of patching the stale interpolation.
    if (this._spinMode === "stop") {
      const t = Math.min(1, (performance.now() - this._stopT0) / this._stopDur);
      const vel = (2 * (this._stopTo - this._stopFrom) * (1 - t)) / (this._stopDur / 1000);
      this._planStop(this._spinDeg, Math.max(vel, 8));
    }
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
          this._spinDeg = this._stopTo % 360; // bounded growth; alignment survives — the period divides 360
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
    this._planStop(this._spinDeg ?? 0, Math.max(this._spinVel ?? 40, 8));
  }

  /** ROLL OUT TO ALIGNMENT. The brake is never harder than the 550ms natural
   *  stop (initial slope of the quadratic-out EQUALS the entry speed, so the
   *  seam has no kick), but the travel extends to the next angle where the
   *  spin residual is a whole number of symmetry periods — so the shape always
   *  comes to rest on its exact canonical pose, just via a slightly longer,
   *  fully continuous roll. That extra beat is sanctioned: a settle that
   *  visibly finds its pose reads as the mechanism seating, not as lag. If
   *  momentum is too low to reach the next aligned angle in reasonable time
   *  (an interrupted ramp), alignment is skipped rather than crawled to —
   *  at those speeds the pose is unreadable anyway. Braking only, never a
   *  speed-up. */
  _planStop(from, vel) {
    const D_MIN = 0.55; // the natural-stop beat: minimum roll the momentum carries
    const D_MAX = 2.6; // longest acceptable settle
    const period = this._shapeStyle.rot * 2;
    const minTravel = (vel * D_MIN) / 2;
    let to = Math.ceil((from + minTravel) / period) * period;
    if ((2 * (to - from)) / vel > D_MAX) to = from + minTravel;
    this._stopFrom = from;
    this._stopTo = to;
    this._stopDur = (2 * (to - from) / vel) * 1000;
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
    clearTimeout(this._openSpinTimer);
    clearTimeout(this._openPendingTimer);
    if (this._spinRaf) cancelAnimationFrame(this._spinRaf);
    this._spinRaf = null;
    this._spinMode = null;
  }

  /** A quick single turn as the OPEN button's tap receipt — always exactly
   *  one full rotation, never eased into an aligned pose the way the
   *  continuous in-flight spin is, because this isn't tracking anything
   *  ongoing. Re-toggling the class within the same frame is a no-op in
   *  the DOM, so a re-tap mid-spin drops the class for a frame first —
   *  that's what lets it restart cleanly instead of being ignored. */
  _spinOpenShape() {
    clearTimeout(this._openSpinTimer);
    this._openSpin = false;
    requestAnimationFrame(() => {
      this._openSpin = true;
      this._openSpinTimer = setTimeout(() => {
        this._openSpin = false;
      }, 650);
    });
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
      // Tell sibling cards on this entity what is happening BEFORE the
      // round-trip — the hero above must say "Unlocking" when our track does.
      OptimismBus.publish(eid, next ? "locking" : "unlocking", this._stateObj?.state);
      // Some locks (electric strikes, videophone relays) don't have a
      // meaningful "unlocked and staying that way" state — the door should
      // swing on `lock.open` rather than sit unlatched. Locking is always
      // `lock.lock`; only the unlatch service is configurable.
      const unlockService = this.config.unlock_service === "open" ? "open" : "unlock";
      this._callService("lock", next ? "lock" : unlockService, { entity_id: eid });
    } else {
      // Which switch position is "locked" is configurable, so derive the
      // service from that rather than assuming on/off means anything.
      const lockedIsOff = this._lockedState === "off";
      const on = next ? !lockedIsOff : lockedIsOff;
      this._callService(domain, on ? "turn_on" : "turn_off", { entity_id: eid });
    }
  }

  /** The OPEN button: a separate, deliberate extra action reachable only
   *  once already unlocked — never a substitute for the gesture, and never
   *  usable to skip past "locked" in one step. */
  _openTap() {
    if (this._locked || !this.config.open_action) return;
    this._spinOpenShape();

    if (!this._selfContained) {
      this._openPending = true;
      clearTimeout(this._openPendingTimer);
      this._openPendingTimer = setTimeout(() => {
        this._openPending = false;
      }, this.config.pending_timeout_ms ?? 10000);
      // Tell sibling cards on this entity (the hero above) what's about to
      // happen BEFORE the round-trip, same bridge OptimismBus already
      // gives the gesture — otherwise only THIS card's face was optimistic
      // and the hero kept sitting on the stale state for the round-trip.
      OptimismBus.publish(this.config.entity, "open", this._stateObj?.state);
    }

    this._handleAction(this.config.open_action);
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
    const jammed = busy === "jammed";

    // Colour: the flooded pair while unlocked, a quiet surface while locked —
    // EXCEPT jammed, which overrides both with an error tint regardless of
    // lock state, since a jam is a fault, not a resting position.
    const bg = jammed
      ? (this.config.jammed_color ?? "var(--md-sys-color-error-container)")
      : locked
      ? (this.config.locked_color ?? "var(--md-sys-color-surface-container-low, var(--card-background-color))")
      : (this.config.unlocked_color ?? "var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))");
    const fg = jammed
      ? (this.config.jammed_color_on ?? "var(--md-sys-color-on-error-container)")
      : locked
      ? (this.config.locked_color_on ?? "var(--md-sys-color-on-surface)")
      : (this.config.unlocked_color_on ?? "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))");
    const accent = this.config.accent ?? "var(--md-sys-color-primary)";
    const accentOn = this.config.accent_on ?? "var(--md-sys-color-on-primary)";

    // Shape and handle are derived from the surface pair rather than adding four
    // more colour keys. While unlocked they INVERT it — the surface's ink
    // becomes their fill and the surface itself becomes their glyph — which is
    // legible in both themes for free, because the theme already guarantees
    // those two contrast. Jammed skips the invert and just flattens to the
    // same error pair as the card, since there is no "unlocked-style" pose to
    // invert toward — the mechanism isn't in either resting state right now.
    //
    // These have to name `fg`/`bg` explicitly and NOT use currentColor: both
    // .shape and .handle set their own `color`, so a currentColor fill would
    // resolve against their own glyph colour and paint the glyph invisible
    // against an identically-coloured block.
    const shapeBg = jammed ? bg : locked ? `color-mix(in srgb, ${fg} 12%, transparent)` : fg;
    const shapeFg = jammed ? fg : locked ? accent : bg;
    const handleBg = jammed ? fg : locked ? accent : fg;
    const handleFg = jammed ? bg : locked ? accentOn : bg;

    // The open FACE rides on top of the unlocked family colour — never its
    // own colour treatment (that would contradict "styling stays unlocked
    // the whole time"), only its own glyph, and only while the entity is
    // LITERALLY open/opening. The moment that stops being true (the bogus
    // post-relatch "unlocking" among them) the icon reverts to the plain
    // unlocked glyph, same as the colour already does.
    const open = !this._selfContained
      && (this._openPending || this._effectiveState === "open" || this._effectiveState === "opening");
    const icon = jammed
      ? (this.config.jammed_icon ?? "m3o:warning")
      : open
      ? (this.config.open_icon ?? "m3o:door-open")
      : locked
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
                  class="shape ${locked ? "" : "unlocked"} ${jammed ? "jammed" : ""} ${style.vector ? "vector" : ""} ${inFlight && !this._spins ? "working" : ""} ${this._spinning ? "spinning" : ""} ${this._openSpin ? "spin-once" : ""}"
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

          ${this.config.open_action
            ? html`
                <button
                  class="open-btn"
                  ?disabled=${locked || unavailable}
                  @click=${this._openTap}
                >
                  <ha-icon .icon=${this.config.open_button_icon ?? "m3o:door-open"}></ha-icon>
                  <span>${this.config.open_button_label ?? t("lock_open_button", this.hass)}</span>
                </button>
              `
            : nothing}

          ${jammed
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
