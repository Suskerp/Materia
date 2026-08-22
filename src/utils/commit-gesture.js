/**
 * The COMMIT GESTURE, as a controller rather than a component.
 *
 * This is materia-drag-confirm's pointer state machine, moved out so more than
 * one thing can hold it. Nothing about the logic changed in the move — it is
 * the version that survived iOS and the HA companion app, and the four parts
 * that were each a bug first are all still here: axis-dominance scroll-intent
 * detection so a vertical flick that starts on the control still scrolls the
 * dashboard; a document-level touch lock against scroll breakthrough mid-drag;
 * a grace timer for iOS firing a spurious pointercancel right after the press;
 * and a visibilitychange bail-out so a tab switch cannot leave the page
 * scroll-locked. Plus the out-of-bounds cancel, which is the only way a hold
 * can be abandoned once the timer is running.
 *
 * WHY EXTRACT IT. A confirm gesture is a property of how a control COMMITS, not
 * of what the control looks like — so materia-button can grow one without
 * giving up a single one of its style options, and without a second copy of
 * this machine drifting out of step with the first. There is already a third
 * copy in materia-alarm, hand-rolled because the primitive could not express a
 * sweep per button inside a connected row; this controller is exactly what that
 * needed, and folding it in is a later, separate change.
 *
 * The host owns all rendering. This owns nothing visual: it reports progress
 * and asks the host to draw it.
 *
 *   const g = new CommitGesture({
 *     host,                       // dispatches confirm + haptic
 *     surface: () => el,          // the element to capture on and measure
 *     onChange: () => host.requestUpdate(),
 *   });
 *   g.gesture = "hold"; g.holdMs = 800; g.threshold = 0.55;
 *   // in render: @pointerdown=${(e) => g.pointerDown(e)}
 *
 * Read `g.p` (0..1), `g.armed` and `g.settling` to draw it.
 */
export class CommitGesture {
  constructor({ host, surface, onChange }) {
    this.host = host;
    this.surface = surface;
    this.onChange = onChange || (() => {});
    /** "slide" | "hold" */
    this.gesture = "slide";
    /** "forward" | "backward" — which way the fill or handle travels. */
    this.direction = "forward";
    this.threshold = 0.55;
    /* Must clearly exceed the platform long-press timeout (500ms on Android,
       ViewConfiguration.DEFAULT_LONG_PRESS_TIMEOUT) or an ordinary long-press
       commits by accident. */
    this.holdMs = 800;
    this.disabled = false;
    /** BUSY: the commit was accepted and the machine is working. Blocks input. */
    this.pending = false;
    /** "handle" (travel stops short by the handle's width) | "full". */
    this.travel = "handle";
    this._p = 0;
    this._armed = false;
    this._settling = false;
    this._travel = 0;
  }

  /* Progress, armed and settling are the three things a host draws from, so
     each notifies on change rather than relying on the host to poll. */
  get p() {
    return this._p;
  }

  set p(v) {
    const n = Math.max(0, Math.min(1, v));
    if (n === this._p) return;
    this._p = n;
    this.onChange();
  }

  get armed() {
    return this._armed;
  }

  set armed(v) {
    if (v === this._armed) return;
    this._armed = v;
    this.onChange();
  }

  get settling() {
    return this._settling;
  }

  set settling(v) {
    if (v === this._settling) return;
    this._settling = v;
    this.onChange();
  }

  /** Call from the host's disconnectedCallback. */
  destroy() {
    this._cleanup();
  }

  /* ---- public entry points, named for what the host binds them to ---- */

  pointerDown(ev) {
    this._onPointerDown(ev);
  }

  keyDown(ev) {
    this._onKeyDown(ev);
  }

  /** Force the fill to a position without a gesture — for a host reflecting a
   *  busy or a reset state. */
  setProgress(p, settling = true) {
    this.settling = settling;
    this.p = p;
  }

  /** Travel in px, for turning a finger delta into progress. The handle is
   *  `height - 2 * inset` wide, so the distance it can cover is simply
   *  `width - height` — no need to read the inset or the handle back out. */
  _measure() {
    const rect = this._rect();
    if (!rect) {
      this._travel = 0;
      return;
    }
    /* How far the finger has to travel for a full slide, and it depends on what
       the host draws. A HANDLE has to stop before the far edge, so its travel is
       width minus its own diameter (which equals the track height) — that is
       materia-drag-confirm. A host with no handle, like a button filling its own
       surface, travels the whole width; using the handle formula there would let
       the fill reach 100% while the finger was still short of the edge. */
    this._travel = this.travel === "full"
      ? Math.max(0, rect.width)
      : Math.max(0, rect.width - rect.height);
  }

  /** Frame-cached rect — repeated getBoundingClientRect() inside pointermove is
   *  a layout thrash on every frame. Mirrors materia-card's slider. */
  _rect() {
    const frame = this._frameId || 0;
    if (this._rectCache && this._rectCacheFrame === frame) return this._rectCache;
    this._rectCache = this.surface()?.getBoundingClientRect();
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
    this.host.dispatchEvent(new CustomEvent("haptic", { detail: type, bubbles: true, composed: true }));
  }

  /* ---- pointer down: decide nothing yet ------------------------------- */

  _onPointerDown(ev) {
    if (this.disabled || this.pending) return;
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

    if (this.gesture === "hold") {
      /* OUT-OF-BOUNDS CANCEL, hold only. Sliding a finger off a control and
         releasing is the platform-standard way to say "I changed my mind", and
         without this a hold had NO cancel at all: the pointer is captured, so
         once the timer is running the only way to stop it was to out-race it.

         The slop is 24px because Material's minimum touch target is 48dp and
         half of that is the radius within which a touch still counts as
         on-target — so an ordinary finger wobble, or a thumb rolling on a
         phone, cannot kill a deliberate hold, while a genuine move away does.

         Slide is deliberately exempt: moving the pointer IS how a slide works,
         and it already has its own cancel (release short of the threshold).

         Coming back inside without lifting does NOT resume. Once the gesture
         has been abandoned, restarting it should cost a fresh press — a commit
         that silently re-arms itself is exactly the ambiguity this control
         exists to remove. */
      const rect = this._rect();
      if (rect) {
        const SLOP = 24;
        if (
          ev.clientX < rect.left - SLOP ||
          ev.clientX > rect.right + SLOP ||
          ev.clientY < rect.top - SLOP ||
          ev.clientY > rect.bottom + SLOP
        ) {
          this._release(false);
        }
      }
      return; // already engaged; only watching scroll and bounds
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

  /* ---- engaged -------------------------------------------------------- */

  _engage(ev) {
    if (this.armed) return;
    this.armed = true;
    this.settling = false;
    this._engagedAt = Date.now();
    this._grabX = this._eventX(ev);
    this._grabP = this.p;

    const track = this.surface();
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
    if (!this.armed) return;
    const p = Math.min(1, (Date.now() - this._engagedAt) / Math.max(1, this.holdMs));
    this.p = p;
    if (p >= 1) {
      this._commit();
      return;
    }
    this._raf = requestAnimationFrame(this._tick);
  }

  _onDragMove(ev) {
    if (!this.armed) return;
    if (ev.pointerType === "touch") ev.preventDefault();
    const rect = this._rect();
    if (!rect || this._travel <= 0) return;
    // Delta from where the handle was grabbed, not an absolute map of the
    // finger onto the track: grabbing the far end of the track should not
    // teleport the handle under the finger.
    const dx = this._eventX(ev) - this._grabX;
    const signed = this.direction === "backward" ? -dx : dx;
    this.p = Math.max(0, Math.min(1, this._grabP + signed / this._travel));
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
    this._release(this.armed && this.gesture === "slide" && this._p >= this.threshold);
  }

  /** End the gesture. `commit` decides whether it counted. */
  _release(commit) {
    if (!this.armed && this._startX == null) return;
    if (commit) {
      this._commit();
      return;
    }
    this.settling = true;
    this.p = 0;
    this._cleanup();
  }

  _commit() {
    this.settling = true;
    this.p = 1;
    this._cleanup();
    this._haptic("success");
    this.host.dispatchEvent(new CustomEvent("confirm", { bubbles: true, composed: true }));
  }

  _cleanup() {
    this.armed = false;
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

    const track = this.surface();
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
    if (this.disabled || this.pending) return;
    if (ev.key !== "Enter" && ev.key !== " " && ev.key !== "Spacebar") return;
    ev.preventDefault();
    this._commit();
  }
}
