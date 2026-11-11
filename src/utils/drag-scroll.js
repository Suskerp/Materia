/**
 * Mouse drag-to-scroll for a horizontal rail, shared by every card that has
 * one (materia-carousel, the attention card's carousel). Touch pans natively;
 * this adds the mouse. Nothing is captured until the pointer passes a small
 * threshold, so plain clicks still reach what is under it, and `didDrag()`
 * tells a click handler to ignore the click that ends a drag.
 *
 *   snap: false  a flick keeps gliding with momentum (exponential decay,
 *                stepped by elapsed time so 60 Hz and 120 Hz glide alike).
 *   snap: true   the rail is scroll-snapped (one item per page): snapping is
 *                paused while dragging, and on release the rail settles on
 *                the page the flick points at.
 */
export class DragScroll {
  constructor({ snap = false } = {}) {
    this.snap = snap;
    this.raf = null;
    this.start = null;
    this.dragged = false;
    this.down = (e) => this._down(e);
    this.move = (e) => this._move(e);
    this.up = (e) => this._up(e);
  }

  /** True once after a drag, so the click that ends it can be ignored. */
  didDrag() {
    const d = this.dragged;
    this.dragged = false;
    return d;
  }

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  _down(e) {
    this.stop();
    if (e.pointerType !== "mouse") return;
    this.start = { x: e.clientX, scroll: e.currentTarget.scrollLeft, id: e.pointerId };
    this.captured = false;
    this.dragged = false;
    this.lastX = e.clientX;
    this.lastT = performance.now();
    this.v = 0;
  }

  _move(e) {
    if (!this.start) return;
    const rail = e.currentTarget;
    const dx = e.clientX - this.start.x;
    if (!this.captured && Math.abs(dx) > 4) {
      this.captured = this.dragged = true;
      rail.setPointerCapture(this.start.id);
      if (this.snap) rail.style.scrollSnapType = "none";
    }
    if (!this.captured) return;
    rail.scrollLeft = this.start.scroll - dx;
    const now = performance.now();
    const dt = now - this.lastT;
    if (dt > 0) {
      this.v = this.v * 0.7 + ((this.lastX - e.clientX) / dt) * 0.3;
      this.lastX = e.clientX;
      this.lastT = now;
    }
  }

  _up(e) {
    if (!this.start) return;
    const rail = e.currentTarget;
    rail.releasePointerCapture?.(e.pointerId);
    const wasCaptured = this.captured;
    this.start = null;
    this.captured = false;
    if (!wasCaptured) return;
    if (this.snap) this._settle(rail);
    else if (Math.abs(this.v) > 0.05) this._glide(rail);
  }

  /** Snap rail: settle on the page the flick points at, then restore snapping. */
  _settle(rail) {
    const page = rail.firstElementChild;
    const step = page ? page.offsetWidth + (parseFloat(getComputedStyle(rail).columnGap) || 0) : rail.clientWidth;
    const at = rail.scrollLeft / step;
    const target = Math.abs(this.v) > 0.2 ? (this.v > 0 ? Math.ceil(at) : Math.floor(at)) : Math.round(at);
    rail.scrollTo({ left: target * step, behavior: "smooth" });
    setTimeout(() => (rail.style.scrollSnapType = ""), 400);
  }

  _glide(rail) {
    let v = this.v;
    let last = performance.now();
    const step = () => {
      const now = performance.now();
      const dt = Math.min(32, now - last);
      last = now;
      const before = rail.scrollLeft;
      rail.scrollLeft += v * dt;
      if (rail.scrollLeft === before) return (this.raf = null);
      v *= Math.pow(0.95, dt / 16);
      this.raf = Math.abs(v) > 0.02 ? requestAnimationFrame(step) : null;
    };
    this.raf = requestAnimationFrame(step);
  }
}
