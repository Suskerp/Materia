import { LitElement, html, css } from "lit";
import { TAP_MAX_STEPS } from "../utils/kinetic-knob.js";

/**
 * <materia-vslider> — M3 Expressive slider, vertical: active track (bottom) |
 * gap | 4 px handle, a little wider than the track | gap | inactive track with
 * a stop dot at its end. Same contract as <materia-slider>: min / max / step /
 * value in the caller's units, `value-dragging` while the finger moves and
 * `value-changed` when it lifts (detail.value).
 *
 * A drag follows the finger over min … max; a tap without moving steps at most
 * `tapSteps` steps toward the spot, so a stray touch can't jump the level
 * (a volume from 20 to 90). Arrow keys / Page keys step as usual.
 */
class MateriaVSlider extends LitElement {
  static properties = {
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
    value: { type: Number },
    tapSteps: { type: Number },
    label: { type: String },
    disabled: { type: Boolean, reflect: true },
    muted: { type: Boolean, reflect: true },
    _drag: { state: true },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 64px;
      min-height: 120px;
      --vs-active: var(--md-sys-color-primary, var(--primary-color));
      --vs-inactive: var(--md-sys-color-secondary-container, rgba(127, 127, 127, 0.3));
      --vs-muted: var(--md-sys-color-outline, rgba(127, 127, 127, 0.7));
    }
    :host([disabled]) {
      opacity: 0.38;
      pointer-events: none;
    }
    .bar {
      --p: 0;
      --gap: 6px;
      --hw: 4px;
      position: relative;
      flex: 1;
      width: 100%;
      min-height: 0;
      padding: 0;
      border: 0;
      background: none;
      cursor: pointer;
      /* Vertical drags belong to the slider, not to page scrolling. */
      touch-action: none;
      outline: none;
    }
    .bar:focus-visible {
      outline: 3px solid var(--md-sys-color-secondary, currentColor);
      outline-offset: 4px;
      border-radius: 24px;
    }
    .fill,
    .rest,
    .handle {
      position: absolute;
      transition:
        height 0.18s ease-out,
        bottom 0.18s ease-out;
    }
    .dragging .fill,
    .dragging .rest,
    .dragging .handle {
      transition: none;
    }
    .fill {
      left: 0;
      right: 0;
      bottom: 0;
      height: max(0px, calc(var(--p) * 100% - var(--gap) - var(--hw) / 2));
      border-radius: 4px 4px 22px 22px;
      background: var(--vs-active);
    }
    .rest {
      left: 0;
      right: 0;
      top: 0;
      bottom: min(100%, calc(var(--p) * 100% + var(--gap) + var(--hw) / 2));
      border-radius: 22px 22px 4px 4px;
      background: var(--vs-inactive);
    }
    /* Stop indicator at the end of the inactive track. */
    .rest::after {
      content: "";
      position: absolute;
      top: 10px;
      left: 50%;
      width: 4px;
      height: 4px;
      margin-left: -2px;
      border-radius: 2px;
      background: var(--vs-active);
    }
    .handle {
      left: -8px;
      right: -8px;
      height: var(--hw);
      bottom: calc(var(--p) * 100% - var(--hw) / 2);
      border-radius: 2px;
      background: var(--vs-active);
    }
    :host([muted]) .fill,
    :host([muted]) .handle {
      background: var(--vs-muted);
    }
  `;

  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.value = 0;
    this.tapSteps = TAP_MAX_STEPS;
  }

  get _range() {
    return this.max - this.min || 1;
  }

  _shown() {
    return this._drag?.value ?? this.value;
  }

  _snap(v) {
    const s = this.step > 0 ? this.step : 1;
    const snapped = Math.round((v - this.min) / s) * s + this.min;
    return Math.min(this.max, Math.max(this.min, Number(snapped.toFixed(6))));
  }

  _fraction(ev, bar) {
    const r = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, 1 - (ev.clientY - r.top) / r.height));
  }

  _emit(type, value) {
    this.dispatchEvent(new CustomEvent(type, { detail: { value }, bubbles: true, composed: true }));
  }

  _down(ev) {
    if (ev.button > 0) return;
    ev.currentTarget.setPointerCapture?.(ev.pointerId);
    this._drag = { id: ev.pointerId, y: ev.clientY, moved: false, value: null };
  }

  _move(ev) {
    const d = this._drag;
    if (!d || d.id !== ev.pointerId) return;
    if (!d.moved && Math.abs(ev.clientY - d.y) < 6) return;
    const value = this._snap(this.min + this._fraction(ev, ev.currentTarget) * this._range);
    if (value === d.value) return;
    this._drag = { ...d, moved: true, value };
    this._emit("value-dragging", value);
  }

  _up(ev) {
    const d = this._drag;
    if (!d || d.id !== ev.pointerId) return;
    this._drag = null;
    if (ev.type === "pointercancel") return;
    const target = this.min + this._fraction(ev, ev.currentTarget) * this._range;
    let value;
    if (d.moved) value = this._snap(target);
    else {
      // A tap: at most tapSteps steps toward the spot.
      const limit = (this.tapSteps || TAP_MAX_STEPS) * (this.step || 1);
      value = this._snap(this.value + Math.max(-limit, Math.min(limit, target - this.value)));
    }
    this._emit("value-changed", value);
  }

  _key(ev) {
    const big = (this.step || 1) * 10;
    const delta = { ArrowUp: this.step, ArrowRight: this.step, ArrowDown: -this.step, ArrowLeft: -this.step, PageUp: big, PageDown: -big }[ev.key];
    if (delta == null) return;
    ev.preventDefault();
    this._emit("value-changed", this._snap(this.value + delta));
  }

  render() {
    const v = this._shown();
    const p = Math.max(0, Math.min(1, (v - this.min) / this._range));
    return html`<button
      class="bar ${this._drag?.moved ? "dragging" : ""}"
      style="--p:${p}"
      role="slider"
      aria-label=${this.label || ""}
      aria-valuemin=${this.min}
      aria-valuemax=${this.max}
      aria-valuenow=${v}
      ?disabled=${this.disabled}
      @pointerdown=${this._down}
      @pointermove=${this._move}
      @pointerup=${this._up}
      @pointercancel=${this._up}
      @keydown=${this._key}
    ><span class="rest"></span><span class="handle"></span><span class="fill"></span></button>`;
  }
}

customElements.define("materia-vslider", MateriaVSlider);
