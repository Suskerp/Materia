import { LitElement, html, css, nothing } from "lit";
import { motionTokens } from "../utils/motion.js";

/**
 * <materia-drag-confirm> — a deliberate COMMIT gesture.
 *
 * NOT a slider, despite looking like one. A slider reports a value repeatedly;
 * this reports a single decision, once, when the user has done enough work to
 * prove they meant it. That distinction is the whole reason it exists: a stray
 * tap must never throw a door bolt, so there is no tap path at all.
 *
 * Two gestures, both committing the same `confirm` event:
 *   slide — drag the handle past `threshold` of the track. Release short of it
 *           and the handle springs home having done nothing.
 *   hold  — press anywhere on the track and hold until the fill completes.
 *           Release early and the fill rewinds.
 *
 * The pointer state machine is lifted from materia-card's brightness slider
 * (src/cards/card/index.js), which is the version that survived contact with
 * iOS and the HA companion app. Four things in it are not obvious and were each
 * a bug first: axis-dominance scroll-intent detection, so a vertical flick that
 * happens to start on the track still scrolls the dashboard; a document-level
 * touch lock against scroll breakthrough mid-drag; a grace timer for iOS firing
 * a spurious `pointercancel` right after the drag starts; and a
 * visibilitychange bail-out so a tab switch can't leave the page scroll-locked.
 *
 * MOTION — the handle uses `standard-fast-spatial`, deliberately NOT the
 * expressive spring, in both directions. The expressive curve peaks at 1.1476,
 * a ~15% overshoot, and this handle travels to a hard stop inside a clipping
 * track: the overshoot has nowhere to go and simply vanishes under the edge,
 * which reads as a glitch rather than as bounce. Overshoot belongs on the shape
 * morph outside the track, which has room for it.
 *
 * The hold fill and the dragging handle carry NO transition at all — they are
 * following a finger, and easing a directly-manipulated element makes it feel
 * like it is lagging behind the touch. Easing applies only when the gesture is
 * released and the element is moving on its own.
 *
 * Keyboard: the track is a real button and Enter/Space commits, because a
 * drag-only control is unusable without a pointer. The deliberateness that the
 * drag buys is a pointer-affordance; it is not worth locking anyone out over.
 */
class MateriaDragConfirm extends LitElement {
  static properties = {
    /** "slide" | "hold" */
    gesture: { type: String, reflect: true },
    /** Hint text shown across the track. */
    label: { type: String },
    /** mdi icon for the slide handle. */
    icon: { type: String },
    /** "forward" (handle rests left, travels right) | "backward" (mirrored). */
    direction: { type: String },
    /** Fraction of the track the slide must pass to commit. */
    threshold: { type: Number },
    /** Milliseconds the hold must be sustained. */
    holdMs: { type: Number, attribute: "hold-ms" },
    disabled: { type: Boolean, reflect: true },
    _p: { state: true },
    _armed: { state: true },
  };

  static styles = [
    motionTokens,
    css`
      :host {
        display: block;
        /* Track height and icon size are the M3 Expressive LARGE button rung
           (96px / 32px), as already codified for this project in
           src/elements/button/styles.js .size-l. The design doc drew 104px,
           which is not on the ladder — 96 is the nearest real step, and using
           the rung keeps the track the same height as a large button placed
           beside it. */
        --mdc-h: 96px;
        --mdc-icon: 32px;
        /* The .size-l square-shape corner from the same ladder. */
        --mdc-r: 28px;
        --mdc-inset: 8px;
        --mdc-track: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.12));
        --mdc-ink: var(--md-sys-color-on-surface, #fff);
        --mdc-handle: var(--md-sys-color-primary);
        --mdc-handle-ink: var(--md-sys-color-on-primary);
      }

      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }

      .track {
        position: relative;
        height: var(--mdc-h);
        border-radius: var(--mdc-r);
        background: var(--mdc-track);
        overflow: hidden;
        box-sizing: border-box;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        /* Vertical panning stays with the dashboard until we decide the gesture
           is ours; see .track.armed. */
        touch-action: pan-y;
        transition: background-color var(--md-sys-motion-default-effects);
      }

      .track:focus-visible {
        outline: 3px solid var(--md-sys-color-primary);
        outline-offset: 2px;
      }

      .track.armed {
        cursor: grabbing;
        touch-action: none;
      }

      /* Hold progress. scaleX rather than width so it composites instead of
         relayouting every frame. */
      .fill {
        position: absolute;
        inset: 0;
        background: color-mix(in srgb, var(--mdc-handle) 34%, transparent);
        transform-origin: left center;
        transform: scaleX(var(--mdc-p, 0));
      }

      :host([gesture="hold"]) .fill.backward {
        transform-origin: right center;
      }

      .fill.settling {
        transition: transform var(--md-sys-motion-standard-fast-spatial);
      }

      .label {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        /* Keep the hint centred in the track's free space rather than in the
           track, so it does not sit half-hidden under the handle. */
        padding: 0 calc(var(--mdc-h) - var(--mdc-inset));
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--mdc-ink);
        opacity: 0.72;
        text-align: center;
        pointer-events: none;
      }

      /* In hold mode there is no travelling handle, so the label owns the whole
         track and the icon sits with it. */
      :host([gesture="hold"]) .label {
        padding: 0 16px;
        gap: 10px;
        grid-auto-flow: column;
        opacity: 1;
      }

      :host([gesture="hold"]) .label ha-icon {
        --mdc-icon-size: 24px;
      }

      .handle {
        position: absolute;
        top: var(--mdc-inset);
        bottom: var(--mdc-inset);
        width: calc(var(--mdc-h) - 2 * var(--mdc-inset));
        /* M3 nested-shape rule: an inner corner is the outer corner minus the
           padding between them, which is what keeps the two curves concentric. */
        border-radius: calc(var(--mdc-r) - var(--mdc-inset));
        background: var(--mdc-handle);
        color: var(--mdc-handle-ink);
        display: grid;
        place-items: center;
        /* Position resolves entirely in CSS, with no measured pixel anywhere:
           left percentages resolve against the track, and the handle is exactly
           one track-height minus two insets wide, so the full travel is
           100% - var(--mdc-h), and pos 0 / 1 land flush against either inset.
           This is also why the handle anchors LEFT in both directions. The
           obvious alternative — anchoring right when travelling right-to-left —
           swaps the anchor in the very frame the state flips, and CSS cannot
           interpolate a left offset into a right one, so the handle teleports to
           the far end instead of animating there. */
        left: calc(var(--mdc-inset) + var(--mdc-pos, 0) * (100% - var(--mdc-h)));
      }

      .handle.settling {
        transition: left var(--md-sys-motion-standard-fast-spatial);
      }

      .handle ha-icon {
        --mdc-icon-size: var(--mdc-icon);
      }
    `,
  ];

  constructor() {
    super();
    this.gesture = "slide";
    this.label = "";
    this.icon = "mdi:arrow-right";
    this.direction = "forward";
    this.threshold = 0.55;
    /* Must clearly exceed the platform long-press timeout (500ms on Android,
       ViewConfiguration.DEFAULT_LONG_PRESS_TIMEOUT) or an ordinary long-press
       on the card would commit by accident. */
    this.holdMs = 800;
    this.disabled = false;
    this._p = 0;
    this._armed = false;
    this._settling = false;
    this._travel = 0;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
  }

  willUpdate(changed) {
    // The consumer flipped state, which makes the end the handle just travelled
    // to its new resting end. Progress goes back to 0 and, because `pos` is
    // mirrored for the new direction, 0 now resolves to the very position the
    // handle already occupies — so this costs no movement and the two gestures
    // hand off seamlessly. Easing is dropped for the hold fill's benefit: it
    // does have to empty, and it should do that instantly rather than draining
    // while the shape is already morphing.
    if (changed.has("direction") && changed.get("direction") !== undefined) {
      this._p = 0;
      this._settling = false;
    }
  }

  /** Travel in px, for turning a finger delta into progress. The handle is
   *  `height - 2 * inset` wide, so the distance it can cover is simply
   *  `width - height` — no need to read the inset or the handle back out. */
  _measure() {
    const rect = this._rect();
    this._travel = rect ? Math.max(0, rect.width - rect.height) : 0;
  }

  /** Frame-cached rect — repeated getBoundingClientRect() inside pointermove is
   *  a layout thrash on every frame. Mirrors materia-card's slider. */
  _rect() {
    const frame = this._frameId || 0;
    if (this._rectCache && this._rectCacheFrame === frame) return this._rectCache;
    this._rectCache = this.shadowRoot?.querySelector(".track")?.getBoundingClientRect();
    this._rectCacheFrame = frame;
    if (!this._frameRaf) {
      this._frameRaf = requestAnimationFrame(() => {
        this._frameId = (this._frameId || 0) + 1;
        this._frameRaf = null;
      });
    }
    return this._rectCache;
  }

  _eventX(ev) {
    if (ev.clientX !== undefined && ev.clientX !== 0) return ev.clientX;
    if (ev.changedTouches?.[0]) return ev.changedTouches[0].clientX;
    if (ev.touches?.[0]) return ev.touches[0].clientX;
    return ev.clientX || 0;
  }

  _haptic(type) {
    this.dispatchEvent(new CustomEvent("haptic", { detail: type, bubbles: true, composed: true }));
  }

  /* ---- pointer down: decide nothing yet ------------------------------- */

  _onPointerDown(ev) {
    if (this.disabled) return;
    if (ev.button && ev.button !== 0) return;
    if (!ev.isPrimary) return; // secondary touch of a pinch
    // HA's mobile sidebar owns the left screen edge.
    if (ev.pointerType === "touch" && ev.clientX <= 30) return;

    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._pointerId = ev.pointerId;
    this._rectCache = null;
    this._scrollIntent = false;
    this._measure();

    this._onUpRef = this._onPointerUp.bind(this);
    window.addEventListener("pointerup", this._onUpRef);
    window.addEventListener("pointercancel", this._onUpRef);

    // Both gestures watch for a scroll before claiming the pointer.
    this._onEarlyMoveRef = this._onEarlyMove.bind(this);
    window.addEventListener("pointermove", this._onEarlyMoveRef);

    // A hold engages at once, because there is nothing to disambiguate but the
    // scroll. A slide waits for horizontal movement: pressing the track and not
    // moving has to do nothing at all, which is the entire point of the control.
    if (this.gesture === "hold") this._engage(ev);
  }

  _onEarlyMove(ev) {
    if (this._scrollIntent) return;
    const dx = Math.abs(ev.clientX - this._startX);
    const dy = Math.abs(ev.clientY - this._startY);

    // Vertical dominance → the user is scrolling the dashboard, not us.
    if (dy > 10 && dy > dx + 4) {
      this._scrollIntent = true;
      if (this.gesture === "hold") this._release(false);
      this._dropEarlyMove();
      return;
    }

    if (this.gesture === "hold") return; // already engaged; only watching scroll

    if (dx > 6 && dx >= dy) {
      this._dropEarlyMove();
      this._engage(ev);
    }
  }

  _dropEarlyMove() {
    if (this._onEarlyMoveRef) {
      window.removeEventListener("pointermove", this._onEarlyMoveRef);
      this._onEarlyMoveRef = null;
    }
  }

  /* ---- engaged -------------------------------------------------------- */

  _engage(ev) {
    if (this._armed) return;
    this._armed = true;
    this._settling = false;
    this._engagedAt = Date.now();
    this._grabX = this._eventX(ev);
    this._grabP = this._p;

    const track = this.shadowRoot?.querySelector(".track");
    try {
      track?.setPointerCapture(this._pointerId);
    } catch (_) {}

    // Stop the page scrolling underneath us for the duration.
    document.documentElement.style.setProperty("touch-action", "none");
    document.documentElement.style.setProperty("overscroll-behavior", "contain");
    track?.addEventListener("touchmove", this._preventTouch, { passive: false });

    this._onVisibilityRef = () => {
      if (document.hidden) this._release(false);
    };
    document.addEventListener("visibilitychange", this._onVisibilityRef);

    this._haptic("selection");

    if (this.gesture === "hold") {
      this._tick = this._tick.bind(this);
      this._raf = requestAnimationFrame(this._tick);
    } else {
      this._onMoveRef = this._onDragMove.bind(this);
      window.addEventListener("pointermove", this._onMoveRef);
    }
  }

  _preventTouch(ev) {
    ev.preventDefault();
  }

  _tick() {
    if (!this._armed) return;
    const p = Math.min(1, (Date.now() - this._engagedAt) / Math.max(1, this.holdMs));
    this._p = p;
    if (p >= 1) {
      this._commit();
      return;
    }
    this._raf = requestAnimationFrame(this._tick);
  }

  _onDragMove(ev) {
    if (!this._armed) return;
    if (ev.pointerType === "touch") ev.preventDefault();
    const rect = this._rect();
    if (!rect || this._travel <= 0) return;
    // Delta from where the handle was grabbed, not an absolute map of the
    // finger onto the track: grabbing the far end of the track should not
    // teleport the handle under the finger.
    const dx = this._eventX(ev) - this._grabX;
    const signed = this.direction === "backward" ? -dx : dx;
    this._p = Math.max(0, Math.min(1, this._grabP + signed / this._travel));
  }

  _onPointerUp(ev) {
    // iOS fires a spurious pointercancel immediately after a drag starts.
    // Ignore it, but arm a fallback so a genuine cancel — where no pointerup
    // ever arrives — still releases the page scroll lock.
    if (ev.type === "pointercancel" && this._engagedAt) {
      if (Date.now() - this._engagedAt < 150) {
        clearTimeout(this._graceTimer);
        this._graceTimer = setTimeout(() => this._release(false), 400);
        return;
      }
    }
    clearTimeout(this._graceTimer);
    this._release(this._armed && this.gesture === "slide" && this._p >= this.threshold);
  }

  /** End the gesture. `commit` decides whether it counted. */
  _release(commit) {
    if (!this._armed && this._startX == null) return;
    if (commit) {
      this._commit();
      return;
    }
    this._settling = true;
    this._p = 0;
    this._cleanup();
  }

  _commit() {
    this._settling = true;
    this._p = 1;
    this._cleanup();
    this._haptic("success");
    this.dispatchEvent(new CustomEvent("confirm", { bubbles: true, composed: true }));
  }

  _cleanup() {
    this._armed = false;
    this._startX = null;
    this._scrollIntent = false;
    this._engagedAt = null;
    this._rectCache = null;
    clearTimeout(this._graceTimer);

    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
    this._dropEarlyMove();

    const track = this.shadowRoot?.querySelector(".track");
    document.documentElement.style.removeProperty("touch-action");
    document.documentElement.style.removeProperty("overscroll-behavior");
    track?.removeEventListener("touchmove", this._preventTouch);
    try {
      track?.releasePointerCapture(this._pointerId);
    } catch (_) {}

    if (this._onVisibilityRef) {
      document.removeEventListener("visibilitychange", this._onVisibilityRef);
      this._onVisibilityRef = null;
    }
    if (this._onMoveRef) {
      window.removeEventListener("pointermove", this._onMoveRef);
      this._onMoveRef = null;
    }
    if (this._onUpRef) {
      window.removeEventListener("pointerup", this._onUpRef);
      window.removeEventListener("pointercancel", this._onUpRef);
      this._onUpRef = null;
    }
  }

  _onKeyDown(ev) {
    if (this.disabled) return;
    if (ev.key !== "Enter" && ev.key !== " " && ev.key !== "Spacebar") return;
    ev.preventDefault();
    this._commit();
  }

  render() {
    const hold = this.gesture === "hold";
    const backward = this.direction === "backward";
    // Progress is always "how far through the gesture"; position is always
    // "how far from the left". Mirroring here rather than in the gesture maths
    // is what makes the commit handoff a no-op (see willUpdate).
    const pos = backward ? 1 - this._p : this._p;
    const settle = this._settling && !this._armed ? "settling" : "";

    return html`
      <div
        class="track ${this._armed ? "armed" : ""}"
        role="button"
        tabindex=${this.disabled ? -1 : 0}
        aria-label=${this.label || "Confirm"}
        aria-disabled=${this.disabled ? "true" : "false"}
        style="--mdc-p:${hold ? this._p : 0};--mdc-pos:${pos};"
        @pointerdown=${this._onPointerDown}
        @keydown=${this._onKeyDown}
      >
        ${hold
          ? html`<div class="fill ${backward ? "backward" : ""} ${settle}"></div>`
          : nothing}
        <div class="label">
          ${hold ? html`<ha-icon .icon=${this.icon}></ha-icon>` : nothing}
          <span>${this.label}</span>
        </div>
        ${hold
          ? nothing
          : html`<div class="handle ${settle}">
              <ha-icon .icon=${this.icon}></ha-icon>
            </div>`}
      </div>
    `;
  }
}

customElements.define("materia-drag-confirm", MateriaDragConfirm);
