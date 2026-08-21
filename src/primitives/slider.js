import { LitElement, html, css, nothing } from "lit";
import { motionTokens } from "../utils/motion.js";

/**
 * <materia-slider> — the M3 EXPRESSIVE slider primitive for Materia cards.
 *
 * M3 Expressive redrew the slider completely: the 4dp rail with a 20dp round
 * thumb is gone, replaced by a 16dp fully-rounded track split by a narrow
 * 4x44dp pill handle, with a 6dp gap either side of the handle and 2dp
 * "inside" corners facing it. Every number below is a real token, sourced in
 * a comment where it is used:
 *
 *   androidx.compose.material3.tokens.SliderTokens
 *     ActiveTrackHeight / InactiveTrackHeight  16dp
 *     HandleWidth 4dp · HandleHeight 44dp
 *     PressedHandleWidth 2dp · FocusHandleWidth 2dp
 *     StopIndicatorSize 4dp · all shapes CornerFull
 *     ValueIndicatorActiveBottomSpace 12dp
 *     ValueIndicatorLabelTextFont = LabelLarge (14sp / 500 / 20sp line)
 *     Handle + active track = Primary · inactive track = SecondaryContainer
 *     Value indicator = InverseSurface on InverseOnSurface
 *     DisabledHandleOpacity .38 · DisabledActiveTrackOpacity .38
 *     DisabledInactiveTrackOpacity .12
 *   material-components-android Slider.md (attribute defaults)
 *     thumbTrackGapSize 6dp · trackInsideCornerSize 2dp
 *     trackStopIndicatorSize 4dp · tickVisibilityMode autoLimit
 *
 * IMPLEMENTATION. The interactive layer is still a native
 * <input type="range">, laid transparently over the drawn parts. That keeps
 * arrow/Home/End/PageUp/PageDown keys, the implicit role="slider" and
 * aria-valuenow/min/max, and browser-native touch handling for free — none of
 * which a hand-rolled pointer implementation gets right cheaply. The native
 * thumb is sized to the handle width so the browser's own pointer-to-value
 * mapping (which insets the thumb inside the track) matches the drawn
 * handle's position exactly.
 *
 * Properties (min/max/value/step/color/trackColor/disabled/liveUpdate are the
 * original API and behave as they always did):
 *   min, max, value, step — as the range input
 *   color      — active track + handle color
 *   trackColor — inactive track color
 *   disabled   — inert, drawn with the M3 disabled opacities
 *   liveUpdate — fire value-changed during drag (debounced 100ms) as well as
 *                on release  (attribute: live-update)
 *   stops      — draw the inset end stop indicators (default true)
 *   ticks      — draw a stop indicator per step instead (default false)
 *   showLabel  — reserve and show the value indicator above the handle
 *                (attribute: show-label)
 *   valueLabel — pre-formatted text for that indicator, e.g. "42%"
 *                (attribute: value-label); defaults to the raw value
 *   label      — accessible name, passed through to the input's aria-label
 *
 * Events:
 *   value-changed  { value } — a COMMIT: on release, or debounced while
 *                             dragging when liveUpdate is set.
 *   value-dragging { value } — every intermediate value, always. Display only:
 *                             cards use it to keep a readout in step with the
 *                             finger without firing a service call per frame.
 */
class MateriaSlider extends LitElement {
  static properties = {
    min: { type: Number },
    max: { type: Number },
    value: { type: Number },
    step: { type: Number },
    color: { type: String },
    trackColor: { type: String },
    disabled: { type: Boolean },
    liveUpdate: { type: Boolean, attribute: "live-update" },
    stops: { type: Boolean },
    ticks: { type: Boolean },
    showLabel: { type: Boolean, attribute: "show-label", reflect: true },
    valueLabel: { type: String, attribute: "value-label" },
    label: { type: String },
    _pressed: { state: true },
    _focused: { state: true },
  };

  static styles = [
    motionTokens,
    css`
      :host {
        display: block;
        width: 100%;

        /* SliderTokens: 16dp track, 4x44dp handle, 2dp when pressed/focused.
           StopIndicatorSize 4dp. MCA: 6dp thumb-track gap, 2dp inside corner. */
        --slider-track-height: 16px;
        --slider-handle-width: 4px;
        --slider-handle-height: 44px;
        --slider-handle-width-pressed: 2px;
        --slider-gap: 6px;
        --slider-inside-corner: 2px;
        --slider-stop-size: 4px;

        /* SliderTokens colors. surface-variant is only a fallback for themes
           that predate the secondary-container role. */
        --slider-color: var(--md-sys-color-primary, var(--primary-color));
        --slider-track-color: var(
          --md-sys-color-secondary-container,
          var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.24))
        );
      }

      .slider {
        position: relative;
        width: 100%;
        /* The row is exactly one handle tall: HandleHeight 44dp. */
        height: var(--slider-handle-height);
        box-sizing: border-box;
      }

      /* ValueIndicatorActiveBottomSpace 12dp, above an indicator that is
         LabelLarge (20dp line) plus 6dp padding top and bottom = 32dp.
         The room is reserved whether or not the indicator is showing, so
         pressing the handle can never shove the card's layout around. */
      :host([show-label]) .slider {
        margin-top: 44px;
      }

      .track {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: var(--slider-track-height);

        /* The one piece of geometry everything else is derived from: the
           handle slides its own width inside the track, exactly as the native
           range thumb does, so its left edge travels 0 .. (width - 4dp).
           The active track stops one 6dp gap short of that edge. */
        --_slot-x: calc(var(--_p) * (100% - var(--slider-handle-width)));
        --_active-w: max(0px, calc(var(--_slot-x) - var(--slider-gap)));
      }

      .active,
      .inactive {
        position: absolute;
        top: 0;
        bottom: 0;
        /* CornerFull on the outer end, trackInsideCornerSize 2dp on the end
           that faces the handle. 999px clamps to the full 8dp radius. */
        transition: background-color var(--md-sys-motion-default-effects);
      }

      .active {
        left: 0;
        width: var(--_active-w);
        border-radius: 999px var(--slider-inside-corner) var(--slider-inside-corner) 999px;
        background: var(--_fill);
      }

      .inactive {
        /* Starts one gap past the far edge of the handle. Over-constrained on
           purpose: past the end the computed width clamps to zero. */
        left: calc(var(--_slot-x) + var(--slider-handle-width) + var(--slider-gap));
        right: 0;
        border-radius: var(--slider-inside-corner) 999px 999px var(--slider-inside-corner);
        background: var(--_track);
      }

      /* Stop indicators, drawn twice: the base layer in the ACTIVE colour
         (which is what reads against the inactive track — MCA paints inactive
         tick marks colorPrimary) and, clipped to the active track's own
         width, a second layer in the INACTIVE colour (SliderTokens puts
         StopIndicators on SecondaryContainer, the colour that reads against
         the primary fill). No measuring: the clip does the deciding. */
      .dots {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .dots.over {
        clip-path: inset(0 calc(100% - var(--_active-w)) 0 0);
      }

      .dot {
        position: absolute;
        top: 50%;
        width: var(--slider-stop-size);
        height: var(--slider-stop-size);
        margin-top: calc(var(--slider-stop-size) / -2);
        border-radius: 999px;
        background: var(--_fill);
      }

      .dots.over .dot {
        background: var(--_track);
      }

      /* The two end indicators sit centred in the track's round caps, half a
         track height in from each edge. */
      .dot.start {
        left: calc(var(--slider-track-height) / 2 - var(--slider-stop-size) / 2);
      }

      .dot.end {
        right: calc(var(--slider-track-height) / 2 - var(--slider-stop-size) / 2);
      }

      /* Per-step indicators ride the handle's own travel, so at either
         extreme the handle covers its indicator exactly. */
      .dot.tick {
        left: calc(var(--_t) * (100% - var(--slider-handle-width)));
      }

      /* A fixed-width slot the handle is centred in, so narrowing on press
         happens about the handle's own axis and the fills never shift. */
      .slot {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(var(--_p) * (100% - var(--slider-handle-width)));
        width: var(--slider-handle-width);
        display: grid;
        place-items: center;
        z-index: 1;
        pointer-events: none;
        /* Effects, not spatial: a spatial spring overshoots, and a slider
           handle that swings past the value is a handle showing a value the
           entity does not have. */
        transition: left var(--md-sys-motion-default-effects);
      }

      .handle {
        width: var(--slider-handle-width);
        height: var(--slider-handle-height);
        border-radius: 999px;
        background: var(--_fill);
        transition: width var(--md-sys-motion-fast-effects),
          background-color var(--md-sys-motion-default-effects);
      }

      /* PressedHandleWidth / FocusHandleWidth: 2dp. */
      .slider.pressed .handle,
      .slider.focused .handle {
        width: var(--slider-handle-width-pressed);
      }

      /* While the finger is down the handle must track it 1:1 — an easing
         curve here would lag behind the drag. */
      .slider.pressed .slot {
        transition: none;
      }

      /* M3 focus indicator: 3dp outline, 2dp offset, in the secondary role. */
      .slider.focused .track {
        outline: 3px solid var(--md-sys-color-secondary, var(--primary-color));
        outline-offset: 2px;
        border-radius: 999px;
      }

      /* Value indicator. LabelLarge = 14sp / 500 / 20sp line, on an
         inverse-surface pill 12dp above the handle. */
      .indicator {
        position: absolute;
        bottom: calc(100% + 12px);
        left: calc(var(--_p) * (100% - var(--slider-handle-width)));
        transform: translateX(calc(-50% + var(--slider-handle-width) / 2));
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--md-sys-color-inverse-surface, #313033);
        color: var(--md-sys-color-inverse-on-surface, #f4eff4);
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.1px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--md-sys-motion-fast-effects),
          left var(--md-sys-motion-default-effects);
      }

      .slider.pressed .indicator,
      .slider.focused .indicator {
        opacity: 1;
      }

      .slider.pressed .indicator {
        transition: opacity var(--md-sys-motion-fast-effects);
      }

      /* Disabled: per-part opacities over on-surface, not one dimmed host.
         .38 handle and active track, .12 inactive track. */
      .slider.disabled .active,
      .slider.disabled .handle {
        background: color-mix(in srgb, var(--md-sys-color-on-surface, currentColor) 38%, transparent);
      }

      .slider.disabled .inactive {
        background: color-mix(in srgb, var(--md-sys-color-on-surface, currentColor) 12%, transparent);
      }

      .slider.disabled .dots {
        display: none;
      }

      /* The interactive layer: invisible, full-bleed, on top. */
      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: transparent;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
      }

      input[type="range"]:disabled {
        cursor: not-allowed;
      }

      input[type="range"]::-webkit-slider-runnable-track {
        height: 100%;
        background: transparent;
      }

      /* Sized to the drawn handle so the browser's pointer-to-value mapping
         and our own position maths agree to the pixel. */
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: var(--slider-handle-width);
        height: var(--slider-handle-height);
        border: none;
        background: transparent;
      }

      input[type="range"]::-moz-range-track {
        height: 100%;
        background: transparent;
      }

      input[type="range"]::-moz-range-thumb {
        width: var(--slider-handle-width);
        height: var(--slider-handle-height);
        border: none;
        background: transparent;
      }
    `,
  ];

  constructor() {
    super();
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.step = 1;
    this.color = "";
    this.trackColor = "";
    this.disabled = false;
    this.liveUpdate = false;
    this.stops = true;
    this.ticks = false;
    this.showLabel = false;
    this.valueLabel = "";
    this.label = "";
    this._pressed = false;
    this._focused = false;
    this._debounceTimer = null;
  }

  get _fillColor() {
    return this.color || "var(--slider-color)";
  }

  get _trackColor() {
    return this.trackColor || "var(--slider-track-color)";
  }

  /** Position as a 0..1 fraction — what every CSS expression is built on. */
  get _fraction() {
    const span = this.max - this.min;
    if (!(span > 0)) return 0;
    return Math.min(1, Math.max(0, (this.value - this.min) / span));
  }

  /** Kept from the original API; some callers read it. */
  get _percentage() {
    return this._fraction * 100;
  }

  get _stepCount() {
    const span = this.max - this.min;
    if (!(span > 0) || !(this.step > 0)) return 0;
    const n = Math.round(span / this.step);
    return Number.isFinite(n) ? n : 0;
  }

  /** Stop indicators. Per-step when ticks are on, else the two inset ends. */
  _dots() {
    if (this.ticks) {
      const n = this._stepCount;
      // MCA's tickVisibilityMode=autoLimit drops ticks that would crowd the
      // track. Without measuring, a step count is the honest proxy: past ~30
      // the 4dp dots close up into a dotted line on a phone-width row.
      if (n < 1 || n > 30) return [];
      const out = [];
      for (let i = 0; i <= n; i++) {
        out.push(html`<span class="dot tick" style="--_t:${i / n}"></span>`);
      }
      return out;
    }
    if (!this.stops) return [];
    return [html`<span class="dot start"></span>`, html`<span class="dot end"></span>`];
  }

  get _indicatorText() {
    if (this.valueLabel) return this.valueLabel;
    // Trim binary-float noise (0.30000000000000004) without pretending to
    // know the caller's unit or precision — that is what valueLabel is for.
    return String(Math.round(this.value * 1000) / 1000);
  }

  render() {
    const dots = this._dots();
    const cls = [
      "slider",
      this._pressed ? "pressed" : "",
      this._focused ? "focused" : "",
      this.disabled ? "disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <div
        class=${cls}
        style="--_p:${this._fraction};--_fill:${this._fillColor};--_track:${this._trackColor};"
      >
        ${this.showLabel
          ? html`<div class="indicator">${this._indicatorText}</div>`
          : nothing}

        <div class="track">
          <div class="active"></div>
          <div class="inactive"></div>
          ${dots.length
            ? html`<div class="dots base">${dots}</div>
                <div class="dots over">${dots}</div>`
            : nothing}
        </div>

        <div class="slot"><div class="handle"></div></div>

        <input
          type="range"
          .min=${String(this.min)}
          .max=${String(this.max)}
          .value=${String(this.value)}
          .step=${String(this.step)}
          ?disabled=${this.disabled}
          aria-label=${this.label || nothing}
          @input=${this._onInput}
          @change=${this._onChange}
          @pointerdown=${this._onPressStart}
          @pointerup=${this._onPressEnd}
          @pointercancel=${this._onPressEnd}
          @focus=${this._onFocus}
          @blur=${this._onBlur}
        />
      </div>
    `;
  }

  _onPressStart() {
    if (!this.disabled) this._pressed = true;
  }

  _onPressEnd() {
    this._pressed = false;
  }

  /** Only a keyboard/AT focus earns the ring and the value indicator; a
   *  pointer press already has the handle under the finger. */
  _onFocus(e) {
    this._focused = e.target?.matches?.(":focus-visible") ?? true;
  }

  _onBlur() {
    this._focused = false;
  }

  _onInput(e) {
    const val = parseFloat(e.target.value);
    if (Number.isNaN(val)) return;

    // The drawn parts are ours now, so the primitive owns the in-flight value
    // rather than leaning on the native thumb to show it.
    this.value = val;
    this.dispatchEvent(
      new CustomEvent("value-dragging", {
        detail: { value: val },
        bubbles: true,
        composed: true,
      })
    );

    if (!this.liveUpdate) return;

    // Debounce live commits.
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      this._fireValueChanged(val);
    }, 100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // A pending debounce firing on a detached slider would emit value-changed
    // into nothing — or worse, onto a card that already re-rendered elsewhere.
    clearTimeout(this._debounceTimer);
  }

  _onChange(e) {
    clearTimeout(this._debounceTimer);
    const val = parseFloat(e.target.value);
    if (Number.isNaN(val)) return;
    this.value = val;
    this._fireValueChanged(val);
  }

  _fireValueChanged(value) {
    this.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("materia-slider", MateriaSlider);
