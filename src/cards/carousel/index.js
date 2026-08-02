import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin } from "../../utils/conditions.js";
import { MOTION } from "../../utils/motion.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Selectable tile cards (materia-cards): rows of tiles — icon top-left,
 * check top-right, name and a secondary line at the bottom. The alternative
 * to materia-chips when each option deserves more than a label (a room's
 * size, a scene's preview, a zone's status). A wrapped, centred grid by
 * default; `carousel: true` turns it into the free-scrolling rail.
 *
 * Shares materia-chips' selection contract exactly, so the two are drop-in
 * swaps for one another: read from a tracked entity's state, or from a
 * comma-separated list when `multi_select` is on.
 *
 * `materia-carousel` remains defined as a legacy alias whose DEFAULT is the
 * scrolling rail (what it always was); existing dashboards keep rendering
 * identically, `wrap: true` included.
 */
class MateriaCards extends DisabledMixin(ActionMixin(LitElement)) {
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
    if (!config.items?.length) throw new Error("Materia Cards: at least one item is required");
    this.config = { ...config };
    // Grid vs rail: `carousel` wins, then legacy `wrap` (inverted), then the
    // tag's own default — materia-cards is a grid, the materia-carousel
    // alias stays a rail so deployed configs don't change shape. Reflected
    // as [wrap] so CSS owns the difference.
    const scroll =
      config.carousel != null
        ? !!config.carousel
        : config.wrap != null
        ? !config.wrap
        : this.localName === "materia-carousel";
    this.toggleAttribute("wrap", !scroll);
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
    // This class briefly had TWO updated() definitions; the second silently
    // replaced the first, so these template resolutions never ran and
    // templated color/color_on were dead. One updated() per class, ever.
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
    }
    // The active set covers BOTH selection mechanisms — tracked-entity value
    // AND per-item entities. Watching only _selected meant per-item tiles
    // (a room of input_booleans) never rippled: their flips were invisible.
    const selected = this._selected;
    const sel = new Set(
      this._items()
        .filter((it) =>
          it.entity ? this._itemEntityActive(it) : selected.some((s) => s === String(it.value ?? it.label))
        )
        .map((it) => String(it.value ?? it.label))
    );
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

  /** Mirrors button-group's _entityOptionActive: with a value, the entity's
   *  state must equal it; without one, any truthy-ish state counts. */
  _itemEntityActive(item) {
    const st = this.hass?.states[item.entity]?.state;
    if (item.match != null && item.match !== "") {
      return String(st ?? "").toLowerCase() === String(item.match).toLowerCase();
    }
    return ["on", "true", "home", "open", "active", "unlocked", "cleaning"].includes(
      String(st ?? "").toLowerCase()
    );
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
    if (item.entity && !item.tap_action) {
      // The natural default for an entity tile is its toggle.
      this._callService("homeassistant", "toggle", { entity_id: item.entity });
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
    // Selected tiles wear the SELECTION tint, not the device pair — a picked
    // room is a choice, not a device doing something. (M3: secondary
    // container marks selected containers.)
    const bg = (this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color)
      || "var(--md-sys-color-secondary-container)";
    const fg = (this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on)
      || "var(--md-sys-color-on-secondary-container)";

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
            // Per-item entity wins over the tracked list — same contract as
            // button-group options, so a row of independent toggles (one
            // boolean per room) can be a carousel too.
            const on = item.entity
              ? this._itemEntityActive(item)
              : selected.some((s) => s === String(value));
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

customElements.define("materia-cards", MateriaCards);
// Legacy alias — same class, rail-by-default (see setConfig).
customElements.define("materia-carousel", class extends MateriaCards {});

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-cards",
  name: "Materia Cards",
  description: "Grid of selectable tile cards — the richer alternative to a chip row. carousel: true scrolls instead.",
  preview: true,
});
window.customCards.push({
  type: "materia-carousel",
  name: "Materia Carousel (deprecated — use Materia Cards)",
  description: "Legacy alias of Materia Cards; defaults to the scrolling rail.",
  preview: false,
});
