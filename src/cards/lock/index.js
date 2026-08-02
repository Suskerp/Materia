import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { materialCookiePath, pillPath, gemPath } from "../../utils/shapes.js";
import { t } from "../../utils/i18n.js";
import { OptimismBus } from "../../utils/optimism-bus.js";
import { styles } from "./styles.js";
import "../../primitives/drag-confirm.js";
import "../../primitives/track-confirm.js";
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

  /** Resting stop + busy read for the 3-position TRACK gesture, together,
   *  because on real hardware they're the SAME decision made twice: 0
   *  locked, 1 unlocked (a real rest — reachable on its own, and the base
   *  you drag PAST to reach the third), 2 open (momentary; the entity
   *  springs back to "unlocked" once the latch closes, re-centering this
   *  on its own, no gesture needed).
   *
   *  In-flight states show the ORIGIN, same rule as `_locked`: "unlocking"
   *  hasn't arrived yet, so the thumb stays at locked; "locking" hasn't
   *  arrived yet, so it stays at unlocked.
   *
   *  `track_skip_states` remaps a raw state to another BEFORE any of that —
   *  some hardware reports states that are technically real but tell a lie
   *  about what's happening: this Nuki jumps unlocked -> open directly (no
   *  "opening" ever fires, so there's nothing to skip there — "open" IS the
   *  first report), then on relatching reports a transient "unlocking" that
   *  is not a lock-direction change at all, just the latch settling — so
   *  the interesting remap is `{unlocking: unlocked}`, which erases the
   *  false "heading toward locked" detour and the "Unlocking…" label that
   *  made no sense seconds after a door that was never locked swung open. */
  _trackState() {
    if (this._trackFlourish) return { index: 2, busy: false, label: "" };
    if (this._selfContained) return { index: this._locked ? 0 : 1, busy: false, label: "" };

    const raw = String(this._stateObj?.state ?? "");
    const remap = this.config.track_skip_states || {};
    const s = Object.prototype.hasOwnProperty.call(remap, raw) ? remap[raw] : raw;

    if (s === "open" || s === "opening") {
      return { index: 2, busy: true, label: this.config.opening_label ?? t("lock_opening", this.hass) };
    }
    if (s === "unlocking") {
      return { index: 0, busy: true, label: this.config.unlocking_label ?? t("lock_unlocking", this.hass) };
    }
    if (s === "locking") {
      return { index: 1, busy: true, label: this.config.locking_label ?? t("lock_locking", this.hass) };
    }
    // Anything else (including a remapped "unlocked"/"locked") settles by
    // the real lock state, not the possibly-remapped label.
    return { index: this._entityLocked ? 0 : 1, busy: false, label: "" };
  }

  /** The track has no `_confirm` toggle to drive it — every release names an
   *  absolute stop, not a flip — so it gets its own commit path. Index 2
   *  (open) is deliberately re-triggerable from rest: that is the entire
   *  point of a detent you can drag past more than once. */
  _onTrackSelect(ev) {
    const idx = ev.detail.index;

    if (this._selfContained) {
      if (idx === 2) {
        this._trackFlourish = true;
        this.requestUpdate();
        clearTimeout(this._trackFlourishTimer);
        this._trackFlourishTimer = setTimeout(() => {
          this._trackFlourish = false;
          this._local = false; // springs back to "unlocked", per the design
          this.requestUpdate();
        }, 1200);
        return;
      }
      this._local = idx === 0;
      return;
    }

    const eid = this.config.entity;
    const domain = eid.split(".")[0];
    if (domain !== "lock") {
      // No third stop off a lock domain — open collapses onto unlock.
      const lockedIsOff = this._lockedState === "off";
      const on = idx === 0 ? !lockedIsOff : lockedIsOff;
      this._callService(domain, on ? "turn_on" : "turn_off", { entity_id: eid });
      return;
    }
    if (idx === 0) {
      OptimismBus.publish(eid, "locking", this._stateObj?.state);
      this._callService("lock", "lock", { entity_id: eid });
    } else if (idx === 1) {
      OptimismBus.publish(eid, "unlocking", this._stateObj?.state);
      this._callService("lock", "unlock", { entity_id: eid });
    } else {
      this._callService("lock", "open", { entity_id: eid });
    }
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
    clearTimeout(this._trackFlourishTimer);
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

    const isHold = this.config.gesture === "hold";
    const isTrack = this.config.gesture === "track";
    // Index+busy+label together — see _trackState's own doc for why the
    // track needs a richer read than the binary _locked/_transitioning.
    const trackState = isTrack ? this._trackState() : null;

    // The main shape gets its OWN third face for the track's open stop —
    // otherwise a door standing open still wore the plain "unlocked"
    // lock-open glyph, no different from a door that's simply unlocked and
    // shut.
    const icon = isTrack && trackState.index === 2
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

    const trackStops = [
      { value: "locked", icon: this.config.locked_icon ?? "m3o:lock" },
      { value: "unlocked", icon: this.config.unlocked_icon ?? "m3o:lock-open-right" },
      { value: "open", icon: this.config.open_icon ?? "m3o:door-open" },
    ];
    const trackLabels = this.config.track_labels
      ? [
          t("lock_track_locked", this.hass),
          t("lock_track_unlocked", this.hass),
          t("lock_track_open", this.hass),
        ]
      : null;

    return html`
      <ha-card
        class=${unavailable ? "unavailable" : ""}
        style="--ml-bg:${bg};--ml-fg:${fg};--ml-shape-bg:${shapeBg};--ml-shape-fg:${shapeFg};--ml-handle-bg:${handleBg};--ml-handle-fg:${handleFg};--ml-accent:${accent};"
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

          ${isTrack
            ? html`
                <materia-track-confirm
                  .stops=${trackStops}
                  .boundaries=${[this.config.track_lock_boundary ?? 0.3, this.config.track_open_boundary ?? 0.75]}
                  .pos=${trackState.index}
                  .label=${trackState.label}
                  .stopLabels=${trackLabels}
                  .pending=${trackState.busy}
                  .thumbIcon=${false}
                  ?disabled=${unavailable}
                  @select=${this._onTrackSelect}
                ></materia-track-confirm>
              `
            : html`
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
              `}

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
