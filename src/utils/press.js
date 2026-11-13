/**
 * Touch-visible pressed state. A tap releases faster than a painted :active
 * frame, so the pressed shape never shows on touch. This controller sets
 * `data-pressed` on the pressed element (the nearest match of `selector` in the
 * host's own shadow root) on pointerdown and keeps it at least HOLD_MS after
 * pointerup/cancel. Style it next to :active:
 *
 *   .chip:active, .chip[data-pressed] { border-radius: 8px; }
 *
 * One pointerdown listener per host; the window up/cancel listeners only live
 * while a press is held.
 */
const HOLD_MS = 120;

export class PressController {
  constructor(host, selector) {
    this.host = host;
    this.selector = selector;
    this.el = null;
    this.timer = null;
    this.down = (e) => this._down(e);
    this.up = () => this._up();
    host.addController(this);
  }

  hostConnected() {
    this.host.addEventListener("pointerdown", this.down);
  }

  hostDisconnected() {
    this.host.removeEventListener("pointerdown", this.down);
    this._unlisten();
    this._clear();
  }

  _down(e) {
    if (e.button > 0) return;
    const root = this.host.renderRoot ?? this.host.shadowRoot;
    const el = e.composedPath().find((n) => n instanceof Element && n.getRootNode() === root && n.matches(this.selector));
    if (!el || el.matches(":disabled, [aria-disabled='true']")) return;
    this._clear();
    this.el = el;
    el.setAttribute("data-pressed", "");
    window.addEventListener("pointerup", this.up);
    window.addEventListener("pointercancel", this.up);
  }

  _up() {
    this._unlisten();
    const el = this.el;
    this.timer = setTimeout(() => {
      if (this.el === el) this._clear();
    }, HOLD_MS);
  }

  _unlisten() {
    window.removeEventListener("pointerup", this.up);
    window.removeEventListener("pointercancel", this.up);
  }

  _clear() {
    clearTimeout(this.timer);
    this.el?.removeAttribute("data-pressed");
    this.el = null;
  }
}

/** `new PressController(host, selector)`, for symmetry with other helpers. */
export const pressController = (host, selector) => new PressController(host, selector);
