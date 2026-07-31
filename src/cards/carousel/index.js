import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin } from "../../utils/conditions.js";
import { MOTION } from "../../utils/motion.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Horizontal tile carousel (materia-carousel): a free-scrolling row of
 * selectable tiles — icon top-left, check top-right, name and a secondary line
 * at the bottom. The alternative to materia-chips when each option deserves
 * more than a label (a room's size, a scene's preview, a zone's status).
 *
 * Shares materia-chips' selection contract exactly, so the two are drop-in
 * swaps for one another: read from a tracked entity's state, or from a
 * comma-separated list when `multi_select` is on.
 */
class MateriaCarousel extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-carousel-editor");
  }

  static getStubConfig() {
    return { items: [{ label: "Item 1", value: "one" }, { label: "Item 2", value: "two" }] };
  }

  setConfig(config) {
    if (!config.items?.length) throw new Error("Materia Carousel: at least one item is required");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
    }
  }

  get _stateObj() {
    return this.config.entity ? this.hass?.states[this.config.entity] : null;
  }

  get _current() {
    const st = this._stateObj;
    if (!st) return null;
    return this.config.attribute ? st.attributes?.[this.config.attribute] : st.state;
  }

  /** Selected values as a list — same contract as materia-chips. */
  get _selected() {
    const cur = this._current;
    if (cur == null || cur === "unknown" || cur === "unavailable") return [];
    if (Array.isArray(cur)) return cur.map((v) => String(v).trim());
    if (this.config.multi_select) {
      return String(cur)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return [String(cur)];
  }

  _items() {
    return (this.config.items || []).map((i) => (typeof i === "string" ? { label: i, value: i } : i));
  }

  updated(changedProps) {
    super.updated?.(changedProps);
    const sel = new Set(this._selected.map(String));
    if (this._prevSel) {
      // Only the tiles whose membership actually flipped are origins.
      const flipped = [...new Set([...sel, ...this._prevSel])]
        .filter((v) => sel.has(v) !== this._prevSel.has(v));
      if (flipped.length) this._ripple(flipped, sel);
    }
    this._prevSel = sel;
  }

  /** Neighbours react to a selection instead of it happening in isolation:
   *  the toggled tile swells, the tiles beside it recoil, and the reaction
   *  weakens and lags with distance. M3 choreography, applied across the row
   *  rather than along one control. */
  _ripple(flipped, sel) {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const tiles = Array.from(this.shadowRoot?.querySelectorAll(".tile") || []);
    if (!tiles.length) return;
    const items = this._items();
    const origins = flipped
      .map((v) => items.findIndex((it) => String(it.value ?? it.label) === v))
      .filter((i) => i >= 0);
    if (!origins.length) return;

    tiles.forEach((el, i) => {
      const d = Math.min(...origins.map((o) => Math.abs(o - i)));
      if (d > 2) return;
      // Origin pushes outward; neighbours give way, faintly and later.
      // The spec's spatial spring ALREADY overshoots — its curve peaks at ~1.15
      // of the value change. Adding an exaggerated keyframe peak on top of a
      // hand-rolled bouncy bezier double-counted that, which is what made it
      // aggressive. Modest targets, two keyframes, and the androidx token
      // supplies the spring.
      const target = d === 0 ? 1.04 : d === 1 ? 0.985 : 0.995;
      const spring = MOTION["expressive-fast-spatial"];
      el.animate(
        [{ transform: "scale(1)" }, { transform: `scale(${target})` }, { transform: "scale(1)" }],
        {
          duration: spring.ms,
          delay: d * 30,
          easing: spring.easing,
          fill: "none",
        }
      );
    });
  }

  /* Mouse drag-to-scroll with a kinetic release — touch pans natively. Built
     on materia-forecast-hourly's construction (nothing captured until the
     pointer passes a small threshold, so plain clicks still reach the tile),
     plus flick momentum so one gesture can cross the whole rail instead of
     stopping dead where the mouse stopped. */
  _onPointerDown(e) {
    this._stopMomentum();
    if (e.pointerType !== "mouse") return;
    this._dragStartX = e.clientX;
    this._dragStartScroll = e.currentTarget.scrollLeft;
    this._captured = false;
    this._didDrag = false;
    this._dragPointerId = e.pointerId;
    this._lastX = e.clientX;
    this._lastT = performance.now();
    this._velocity = 0;
  }

  _onPointerMove(e) {
    if (this._dragStartX == null) return;
    const dx = e.clientX - this._dragStartX;
    if (!this._captured && Math.abs(dx) > 4) {
      this._captured = true;
      this._didDrag = true;
      e.currentTarget.setPointerCapture(this._dragPointerId);
    }
    if (!this._captured) return;
    e.currentTarget.scrollLeft = this._dragStartScroll - dx;

    // Velocity in px/ms, smoothed so a single jittery frame can't dominate
    // the throw.
    const now = performance.now();
    const dt = now - this._lastT;
    if (dt > 0) {
      const v = (this._lastX - e.clientX) / dt;
      this._velocity = this._velocity * 0.7 + v * 0.3;
      this._lastX = e.clientX;
      this._lastT = now;
    }
  }

  _onPointerUp(e) {
    if (this._dragStartX == null) return;
    const rail = e.currentTarget;
    rail.releasePointerCapture?.(e.pointerId);
    this._dragStartX = null;
    this._captured = false;
    if (Math.abs(this._velocity) > 0.05) this._startMomentum(rail);
  }

  /** Exponential decay, stepped by elapsed time so the glide is identical on
   *  a 60Hz and a 120Hz display. */
  _startMomentum(rail) {
    let v = this._velocity;
    let last = performance.now();
    const step = () => {
      const now = performance.now();
      const dt = Math.min(32, now - last);
      last = now;
      const before = rail.scrollLeft;
      rail.scrollLeft += v * dt;
      // Hit an end — no point coasting against it.
      if (rail.scrollLeft === before) {
        this._raf = null;
        return;
      }
      v *= Math.pow(0.95, dt / 16);
      this._raf = Math.abs(v) > 0.02 ? requestAnimationFrame(step) : null;
    };
    this._raf = requestAnimationFrame(step);
  }

  _stopMomentum() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopMomentum();
  }

  _tap(item) {
    // A drag that happens to end on a tile must not toggle it.
    if (this._didDrag) {
      this._didDrag = false;
      return;
    }
    this._fireHaptic?.("selection");
    if (item.tap_action) {
      this._handleAction(item.tap_action);
      return;
    }
    const st = this._stateObj;
    const domain = st?.entity_id?.split(".")[0];
    const value = item.value ?? item.label;
    if ((domain === "select" || domain === "input_select") && value != null) {
      this._callService(domain, "select_option", { entity_id: st.entity_id, option: String(value) });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const selected = this._selected;
    const bg = (this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color)
      || "var(--md-sys-cust-color-device, var(--md-sys-color-secondary-container))";
    const fg = (this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on)
      || "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container))";

    return html`
      <ha-card style="--mcar-bg:${bg};--mcar-fg:${fg};">
        <div
          class="rail"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        >
          ${this._items().map((item) => {
            const value = item.value ?? item.label;
            const on = selected.some((s) => s === String(value));
            return html`
              <button class="tile ${on ? "on" : ""}" @click=${() => this._tap(item)} aria-pressed=${on ? "true" : "false"}>
                <div class="top">
                  ${item.icon ? html`<ha-icon class="glyph" .icon=${item.icon}></ha-icon>` : html`<span></span>`}
                  <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
                </div>
                <div class="bottom">
                  <span class="name">${item.label ?? value}</span>
                  ${item.secondary ? html`<span class="sub">${item.secondary}</span>` : nothing}
                </div>
              </button>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-carousel", MateriaCarousel);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-carousel",
  name: "Materia Carousel",
  description: "Scroll-snapping row of selectable tiles — the richer alternative to a chip row.",
  preview: true,
});
