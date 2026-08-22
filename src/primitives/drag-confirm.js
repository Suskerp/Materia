import { LitElement, html, css, svg, nothing } from "lit";
import { motionTokens } from "../utils/motion.js";
import { CommitGesture } from "../utils/commit-gesture.js";

/** The handle's arrow, drawn inline rather than fetched from an icon set.
 *
 *  This started as an `ha-icon` and did not render. Rather than keep guessing at
 *  icon names, the arrow is now the primitive's own geometry: a shaft plus a
 *  head on the 24dp grid, stroked in currentColor so it picks up the handle's
 *  ink automatically and stays crisp at any handle size. A self-contained
 *  control should not silently lose its only directional affordance because a
 *  separately-installed icon pack names things differently.
 *
 *  One path, mirrored with scaleX for the backward direction. */
const ARROW = svg`<path
  d="M4 12h13M11 6l6 6-6 6"
  fill="none"
  stroke="currentColor"
  stroke-width="2.4"
  stroke-linecap="round"
  stroke-linejoin="round"
/>`;

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
    /** Optional glyph for the slide handle, replacing the built-in arrow.
     *  Empty by default: the arrow is drawn inline so it cannot go missing. */
    icon: { type: String },
    /** "forward" (handle rests left, travels right) | "backward" (mirrored). */
    direction: { type: String },
    /** BUSY, which is not disabled: the commit was accepted and the machine is
     *  working (a lock driving its bolt). Interaction is blocked, the handle
     *  holds at the committed end, and the caller swaps the label to say what is
     *  happening. When pending clears WITH a direction flip the existing
     *  seamless handoff runs (success); when it clears WITHOUT one, the machine
     *  refused or timed out and the handle springs home — the spring-back is the
     *  refusal, visibly. */
    pending: { type: Boolean, reflect: true },
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

      /* BUSY, per the spec's vocabulary. M3's interaction states define no
         "busy": a control that cannot accept input takes the DISABLED treatment
         — content at the 38% disabled-content opacity — so the track and its
         status line dim to exactly that, and the cursor stops advertising a
         grab. What disabled alone would get wrong is that the machine IS
         working, and the progress-indicator guidance says an indeterminate wait
         shows live activity — so the HANDLE is exempt from the dim and breathes
         at full strength. Disabled surface + live handle reads as intended:
         you cannot act, because it is acting. */
      :host([pending]) .track {
        cursor: default;
      }

      :host([pending]) .label {
        opacity: 0.38;
      }

      :host([pending]) .handle {
        animation: mdc-breathe 2s ease-in-out infinite alternate;
      }

      /* Hold mode has no handle, so the in-flight label carries the pulse. */
      :host([pending][gesture="hold"]) .label {
        animation: mdc-label-breathe 2s ease-in-out infinite alternate;
      }

      @keyframes mdc-breathe {
        to {
          scale: 1.05;
        }
      }

      @keyframes mdc-label-breathe {
        from {
          opacity: 0.6;
        }
        to {
          opacity: 1;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host([pending]) .handle,
        :host([pending][gesture="hold"]) .label {
          animation: none;
        }
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
         track and needs no clearance. It carries NO icon: whatever the gesture
         acts on is already depicted above it, and repeating that glyph inside
         the track just adds a second thing to read. */
      :host([gesture="hold"]) .label {
        padding: 0 16px;
        opacity: 1;
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

      .handle .arrow {
        width: var(--mdc-icon);
        height: var(--mdc-icon);
        display: block;
      }

      /* Backward travel reuses the same path, mirrored — one geometry, both
         directions, so the two arrows can never drift apart. */
      .handle .arrow.flip {
        transform: scaleX(-1);
      }
    `,
  ];

  constructor() {
    super();
    this.gesture = "slide";
    this.label = "";
    this.icon = "";
    this.direction = "forward";
    this.threshold = 0.55;
    /* Must clearly exceed the platform long-press timeout (500ms on Android,
       ViewConfiguration.DEFAULT_LONG_PRESS_TIMEOUT) or an ordinary long-press
       on the card would commit by accident. */
    this.holdMs = 800;
    this.disabled = false;
    this.pending = false;
    // Progress, armed and settling now live on the controller — see below.
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
  }

  willUpdate(changed) {
    // Busy: hold the handle at the committed end while the machine works. The
    // undefined-guard skips first render, so a card mounted mid-transition does
    // not animate a commit nobody made.
    if (changed.has("pending") && changed.get("pending") !== undefined) {
      if (this.pending) {
        this._gesture.setProgress(1, true);
      } else if (!changed.has("direction")) {
        // Cleared WITHOUT the state flipping — refused or timed out. Spring home.
        this._gesture.setProgress(0, true);
      }
    }
    // The consumer flipped state, which makes the end the handle just travelled
    // to its new resting end. Progress goes back to 0 and, because `pos` is
    // mirrored for the new direction, 0 now resolves to the very position the
    // handle already occupies — so this costs no movement and the two gestures
    // hand off seamlessly. Easing is dropped for the hold fill's benefit: it
    // does have to empty, and it should do that instantly rather than draining
    // while the shape is already morphing.
    if (changed.has("direction") && changed.get("direction") !== undefined) {
      this._gesture.setProgress(0, false);
    }
    this._syncGesture();
  }

  /* ---- the gesture -----------------------------------------------------
     The pointer state machine lives in utils/commit-gesture.js so that more
     than one control can hold it — materia-button grows a confirm gesture from
     the same code rather than a second copy of it. This component keeps its
     public shape exactly: the same properties in, the same `confirm` event
     out, and the same _p / _armed / _settling that its stylesheet and its
     tests read, now mirrored off the controller. */

  get _gesture() {
    this.__gesture ??= new CommitGesture({
      host: this,
      surface: () => this.shadowRoot?.querySelector(".track"),
      onChange: () => this.requestUpdate(),
    });
    return this.__gesture;
  }

  get _p() {
    return this._gesture.p;
  }

  get _armed() {
    return this._gesture.armed;
  }

  get _settling() {
    return this._gesture.settling;
  }

  /** Push the declared properties down before anything reads them. */
  _syncGesture() {
    const g = this._gesture;
    g.gesture = this.gesture;
    g.direction = this.direction;
    g.threshold = this.threshold;
    g.holdMs = this.holdMs;
    g.disabled = this.disabled;
    g.pending = this.pending;
  }

  _onPointerDown(ev) {
    this._syncGesture();
    this._gesture.pointerDown(ev);
  }

  _onKeyDown(ev) {
    this._syncGesture();
    this._gesture.keyDown(ev);
  }

  _cleanup() {
    this.__gesture?.destroy();
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
        <div class="label"><span>${this.label}</span></div>
        ${hold
          ? nothing
          : html`<div class="handle ${settle}">
              ${this.icon
                ? html`<ha-icon .icon=${this.icon}></ha-icon>`
                : html`<svg
                    class="arrow ${backward ? "flip" : ""}"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >${ARROW}</svg>`}
            </div>`}
      </div>
    `;
  }
}

customElements.define("materia-drag-confirm", MateriaDragConfirm);
