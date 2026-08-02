import { LitElement, html, css, nothing } from "lit";
import { motionTokens } from "../utils/motion.js";

/**
 * <materia-track-confirm> — materia-drag-confirm generalized from two
 * resting ends to N stops on one physical track (design doc 6b: "one track,
 * push past the end"). Built for materia-lock's locked / unlocked / open,
 * but the stop list and boundaries are configuration, not lock-specific
 * logic, so anything else with more than one meaningful rest position
 * (a vent-crack stop on a cover, say) can reuse it instead of growing its
 * own bespoke drag machinery.
 *
 * DRAG ONLY — no tap path, same reasoning as materia-drag-confirm: a stray
 * tap must never fire the far stop. `boundaries` (length = stops.length-1)
 * decide which stop a release lands on; they need not be evenly spaced —
 * the lock's own boundaries put the last stop behind a deliberate 0.82
 * detent so reaching it takes an unmistakable extra push, while the middle
 * "unlocked" rest gets the wide, easy two-thirds of the track.
 *
 * The thumb rests at `pos` (a stop index) between gestures — driven by the
 * caller from the REAL entity state, not by this component, so a lock that
 * settles back to "unlocked" on its own re-centers the thumb without any
 * gesture happening. Every release emits `select` with the resolved stop;
 * the caller decides what that means (including firing the same service
 * again when the resolved stop equals the current one — the whole point of
 * the last stop is that it can be re-triggered from rest).
 *
 * Gesture plumbing (scroll-intent detection, pointer capture, the iOS
 * spurious-pointercancel grace timer, the visibilitychange bail-out) is
 * lifted verbatim from materia-drag-confirm, which is the version that
 * survived contact with iOS and the HA companion app.
 */
class MateriaTrackConfirm extends LitElement {
  static properties = {
    /** [{ value, icon }] — 2 or more stops, left to right. */
    stops: { type: Array },
    /** Thresholds (0..1) between consecutive stops. Length = stops.length-1.
     *  Defaults to even spacing when omitted. */
    boundaries: { type: Array },
    /** Resting stop index, set by the caller from real state. */
    pos: { type: Number },
    /** Optional label shown centered over the track (e.g. "Unlocking…"). */
    label: { type: String },
    /** Optional captions under the track, one per stop. */
    stopLabels: { type: Array },
    /** Busy: thumb holds at `pos` and breathes; no drag accepted. */
    pending: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    _dragIndex: { state: true },
    _armed: { state: true },
  };

  static styles = [
    motionTokens,
    css`
      :host {
        display: block;
        /* Same rung as materia-drag-confirm (M3 Expressive LARGE button:
           96px / 32px) so the two controls read as one family. */
        --mtc-h: 96px;
        --mtc-icon: 28px;
        --mtc-r: 28px;
        --mtc-inset: 8px;
        --mtc-track: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.12));
        --mtc-thumb: var(--md-sys-color-primary);
        --mtc-thumb-ink: var(--md-sys-color-on-primary);
        --mtc-callout-border: var(--md-sys-color-outline-variant);
        --mtc-callout-ink: var(--md-sys-color-on-surface-variant);
        --mtc-callout-active: var(--md-sys-color-primary);
      }

      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }

      :host([pending]) .track {
        cursor: default;
      }

      :host([pending]) .thumb {
        animation: mtc-breathe 2s ease-in-out infinite alternate;
      }

      @keyframes mtc-breathe {
        to {
          scale: 1.05;
        }
      }

      .wrap {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .track {
        position: relative;
        height: var(--mtc-h);
        border-radius: var(--mtc-r);
        background: var(--mtc-track);
        overflow: hidden;
        box-sizing: border-box;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: pan-y;
      }

      .track:focus-visible {
        outline: 3px solid var(--md-sys-color-primary);
        outline-offset: 2px;
      }

      .track.armed {
        cursor: grabbing;
        touch-action: none;
      }

      /* The final stop's callout: a dashed target that brightens once the
         drag actually reaches it — the "push past the end" affordance. */
      .callout {
        position: absolute;
        top: var(--mtc-inset);
        bottom: var(--mtc-inset);
        right: var(--mtc-inset);
        border: 2px dashed var(--mtc-callout-border);
        border-radius: calc(var(--mtc-r) - var(--mtc-inset));
        display: grid;
        place-items: center;
        color: var(--mtc-callout-ink);
        transition: border-color var(--md-sys-motion-fast-effects),
          color var(--md-sys-motion-fast-effects);
        pointer-events: none;
      }

      .callout.active {
        border-color: var(--mtc-callout-active);
        color: var(--mtc-callout-active);
      }

      .callout ha-icon {
        --mdc-icon-size: 24px;
      }

      .thumb {
        position: absolute;
        top: var(--mtc-inset);
        bottom: var(--mtc-inset);
        width: calc(var(--mtc-h) - 2 * var(--mtc-inset));
        border-radius: calc(var(--mtc-r) - var(--mtc-inset));
        background: var(--mtc-thumb);
        color: var(--mtc-thumb-ink);
        display: grid;
        place-items: center;
        left: calc(var(--mtc-inset) + var(--mtc-frac, 0) * (100% - var(--mtc-h)));
      }

      .thumb.settling {
        transition: left var(--md-sys-motion-standard-fast-spatial),
          background-color var(--md-sys-motion-fast-effects),
          color var(--md-sys-motion-fast-effects);
      }

      .thumb ha-icon {
        --mdc-icon-size: var(--mtc-icon);
      }

      .label {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 0 calc(var(--mtc-h) - var(--mtc-inset));
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--md-sys-color-on-surface-variant);
        opacity: 0.72;
        text-align: center;
        pointer-events: none;
      }

      .labels {
        display: flex;
        justify-content: space-between;
        padding: 0 14px;
      }

      .labels span {
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--md-sys-color-on-surface-variant);
        opacity: 0.6;
        transition: opacity var(--md-sys-motion-fast-effects),
          color var(--md-sys-motion-fast-effects);
      }

      .labels span.on {
        opacity: 1;
        color: var(--mtc-thumb);
      }

      @media (prefers-reduced-motion: reduce) {
        .thumb,
        .callout {
          transition: none;
          animation: none;
        }
      }
    `,
  ];

  constructor() {
    super();
    this.stops = [];
    this.boundaries = null;
    this.pos = 0;
    this.label = "";
    this.stopLabels = null;
    this.pending = false;
    this.disabled = false;
    this._dragIndex = null;
    this._armed = false;
    this._settling = false;
    this._travel = 0;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
  }

  willUpdate(changed) {
    // The undefined-guard skips the very first render (mirrors
    // materia-drag-confirm) — a card mounted mid-state should not animate a
    // commit nobody made.
    const posChanged = changed.has("pos") && changed.get("pos") !== undefined;
    const pendingChanged = changed.has("pending") && changed.get("pending") !== undefined;
    if ((posChanged || pendingChanged) && !this._armed) {
      this._settling = true;
    }
  }

  get _boundaries() {
    if (this.boundaries?.length) return this.boundaries;
    const n = this.stops.length;
    return Array.from({ length: n - 1 }, (_, i) => (i + 1) / n);
  }

  /** Stop index resolved from a raw 0..1 track fraction, via `_boundaries`. */
  _indexFromFraction(frac) {
    const b = this._boundaries;
    let idx = 0;
    for (let i = 0; i < b.length; i++) {
      if (frac > b[i]) idx = i + 1;
    }
    return idx;
  }

  _fracForIndex(i) {
    const n = this.stops.length;
    return n > 1 ? i / (n - 1) : 0;
  }

  _measure() {
    const rect = this._rect();
    this._travel = rect ? Math.max(0, rect.width - rect.height) : 0;
  }

  _rect() {
    return this.shadowRoot?.querySelector(".track")?.getBoundingClientRect();
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

  _onPointerDown(ev) {
    if (this.disabled || this.pending) return;
    if (ev.button && ev.button !== 0) return;
    if (!ev.isPrimary) return;
    if (ev.pointerType === "touch" && ev.clientX <= 30) return;

    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._pointerId = ev.pointerId;
    this._scrollIntent = false;
    this._measure();

    this._onUpRef = this._onPointerUp.bind(this);
    window.addEventListener("pointerup", this._onUpRef);
    window.addEventListener("pointercancel", this._onUpRef);

    this._onEarlyMoveRef = this._onEarlyMove.bind(this);
    window.addEventListener("pointermove", this._onEarlyMoveRef);
  }

  _onEarlyMove(ev) {
    if (this._scrollIntent) return;
    const dx = Math.abs(ev.clientX - this._startX);
    const dy = Math.abs(ev.clientY - this._startY);
    if (dy > 10 && dy > dx + 4) {
      this._scrollIntent = true;
      this._dropEarlyMove();
      return;
    }
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

  _engage(ev) {
    if (this._armed) return;
    this._armed = true;
    this._settling = false;
    this._grabX = this._eventX(ev);
    this._grabFrac = this._fracForIndex(this.pos);
    this._dragIndex = this.pos;

    const track = this.shadowRoot?.querySelector(".track");
    try {
      track?.setPointerCapture(this._pointerId);
    } catch (_) {}

    document.documentElement.style.setProperty("touch-action", "none");
    document.documentElement.style.setProperty("overscroll-behavior", "contain");
    track?.addEventListener("touchmove", this._preventTouch, { passive: false });

    this._onVisibilityRef = () => {
      if (document.hidden) this._release(this._dragIndex);
    };
    document.addEventListener("visibilitychange", this._onVisibilityRef);

    this._onMoveRef = this._onDragMove.bind(this);
    window.addEventListener("pointermove", this._onMoveRef);
  }

  _preventTouch(ev) {
    ev.preventDefault();
  }

  _onDragMove(ev) {
    if (!this._armed) return;
    if (ev.pointerType === "touch") ev.preventDefault();
    if (this._travel <= 0) return;
    const dx = this._eventX(ev) - this._grabX;
    const frac = Math.max(0, Math.min(1, this._grabFrac + dx / this._travel));
    this._dragIndex = this._indexFromFraction(frac);
    this._liveFrac = frac;
    this.requestUpdate();
  }

  _onPointerUp(ev) {
    // A plain tap (never armed — no drag ever crossed the engage threshold)
    // must fire NOTHING, same guarantee materia-drag-confirm makes: null
    // means "spring back to rest", not "re-select the current stop". Passing
    // `this.pos` here was the bug — it turned an idle tap into a live
    // lock.open on the last stop, exactly the stray-tap failure this whole
    // control family exists to prevent.
    if (ev.type === "pointercancel" && this._grabX != null) {
      clearTimeout(this._graceTimer);
      this._graceTimer = setTimeout(() => this._release(this._armed ? this._dragIndex : null), 400);
      return;
    }
    clearTimeout(this._graceTimer);
    this._release(this._armed ? this._dragIndex : null);
  }

  _release(index) {
    if (!this._armed && this._startX == null) return;
    this._settling = true;
    this._liveFrac = null;
    this._cleanup();
    if (index != null && this.stops[index]) {
      this._haptic("success");
      this.dispatchEvent(
        new CustomEvent("select", {
          detail: { index, value: this.stops[index].value },
          bubbles: true,
          composed: true,
        })
      );
    }
    this.requestUpdate();
  }

  _cleanup() {
    this._armed = false;
    this._startX = null;
    this._scrollIntent = false;

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

  /** Keyboard bypasses the pointer machinery entirely, so it must NOT go
   *  through `_release` — that guards against a duplicate pointer release
   *  by checking `_startX`, which a key press never sets, and would swallow
   *  every keyboard commit as though it were a stray repeat. */
  _commitDirect(index) {
    this._settling = true;
    this._haptic("success");
    this.dispatchEvent(
      new CustomEvent("select", {
        detail: { index, value: this.stops[index].value },
        bubbles: true,
        composed: true,
      })
    );
  }

  _onKeyDown(ev) {
    if (this.disabled || this.pending) return;
    const n = this.stops.length;
    if (ev.key === "ArrowRight" && this.pos < n - 1) {
      ev.preventDefault();
      this._commitDirect(this.pos + 1);
    } else if (ev.key === "ArrowLeft" && this.pos > 0) {
      ev.preventDefault();
      this._commitDirect(this.pos - 1);
    } else if (ev.key === "Enter" || ev.key === " " || ev.key === "Spacebar") {
      ev.preventDefault();
      this._commitDirect(this.pos);
    }
  }

  render() {
    const n = this.stops.length;
    if (!n) return html``;
    const liveIndex = this._armed ? this._dragIndex : this.pos;
    const frac = this._armed && this._liveFrac != null ? this._liveFrac : this._fracForIndex(this.pos);
    const settle = this._settling && !this._armed ? "settling" : "";
    const lastIndex = n - 1;
    const calloutActive = this._armed && this._dragIndex === lastIndex;
    const thumbStop = this.stops[liveIndex] ?? this.stops[this.pos];

    return html`
      <div class="wrap">
        <div
          class="track ${this._armed ? "armed" : ""}"
          role="slider"
          tabindex=${this.disabled ? -1 : 0}
          aria-valuemin="0"
          aria-valuemax=${lastIndex}
          aria-valuenow=${this.pos}
          aria-valuetext=${this.stops[this.pos]?.value ?? ""}
          aria-disabled=${this.disabled ? "true" : "false"}
          style="--mtc-frac:${frac};"
          @pointerdown=${this._onPointerDown}
          @keydown=${this._onKeyDown}
        >
          <div class="callout ${calloutActive ? "active" : ""}">
            ${this.stops[lastIndex]?.icon
              ? html`<ha-icon .icon=${this.stops[lastIndex].icon}></ha-icon>`
              : nothing}
          </div>
          ${this.label ? html`<div class="label"><span>${this.label}</span></div>` : nothing}
          <div class="thumb ${settle}">
            ${thumbStop?.icon ? html`<ha-icon .icon=${thumbStop.icon}></ha-icon>` : nothing}
          </div>
        </div>
        ${this.stopLabels?.length
          ? html`
              <div class="labels">
                ${this.stopLabels.map(
                  (l, i) => html`<span class="${i === this.pos ? "on" : ""}">${l}</span>`
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

customElements.define("materia-track-confirm", MateriaTrackConfirm);
