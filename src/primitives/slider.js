import { LitElement, html, css } from "lit";

/**
 * <materia-slider> — Reusable slider primitive for Materia cards.
 *
 * Uses a styled <input type="range"> for accessibility and simplicity.
 * Fires "value-changed" event with { value } detail.
 *
 * Properties:
 *   min, max, value, step — standard range input props
 *   color      — fill/thumb color (CSS value)
 *   trackColor — unfilled track color
 *   disabled   — disables interaction
 *   liveUpdate — fire events during drag (debounced 100ms), not just on release
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
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      --slider-color: var(--md-sys-color-primary);
      --slider-track-color: var(--md-sys-color-surface-variant);
      --slider-height: 4px;
      --slider-thumb-size: 20px;
    }

    .slider-container {
      position: relative;
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: var(--slider-height);
      border-radius: 999px;
      outline: none;
      cursor: pointer;
      margin: 0;
      background: transparent;
    }

    input[type="range"]:disabled {
      cursor: not-allowed;
      opacity: 0.38;
    }

    /* Track */
    input[type="range"]::-webkit-slider-runnable-track {
      height: var(--slider-height);
      border-radius: 999px;
    }

    input[type="range"]::-moz-range-track {
      height: var(--slider-height);
      border-radius: 999px;
      background: var(--_track-color);
    }

    /* Thumb */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: var(--slider-thumb-size);
      height: var(--slider-thumb-size);
      border-radius: 50%;
      background: var(--_fill-color);
      border: none;
      margin-top: calc((var(--slider-height) - var(--slider-thumb-size)) / 2);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 0.1s ease;
    }

    input[type="range"]::-moz-range-thumb {
      width: var(--slider-thumb-size);
      height: var(--slider-thumb-size);
      border-radius: 50%;
      background: var(--_fill-color);
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    input[type="range"]:active::-webkit-slider-thumb {
      transform: scale(1.2);
    }

    input[type="range"]:active::-moz-range-thumb {
      transform: scale(1.2);
    }
  `;

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
    this._debounceTimer = null;
  }

  get _fillColor() {
    return this.color || "var(--slider-color)";
  }

  get _trackColor() {
    return this.trackColor || "var(--slider-track-color)";
  }

  get _percentage() {
    const range = this.max - this.min;
    if (range === 0) return 0;
    return ((this.value - this.min) / range) * 100;
  }

  render() {
    const pct = this._percentage;
    // Gradient for filled portion
    const trackBg = `linear-gradient(to right, ${this._fillColor} ${pct}%, ${this._trackColor} ${pct}%)`;

    return html`
      <div class="slider-container">
        <input
          type="range"
          .min=${String(this.min)}
          .max=${String(this.max)}
          .value=${String(this.value)}
          .step=${String(this.step)}
          ?disabled=${this.disabled}
          style="
            --_fill-color: ${this._fillColor};
            --_track-color: ${this._trackColor};
            background: ${trackBg};
          "
          @input=${this._onInput}
          @change=${this._onChange}
        />
      </div>
    `;
  }

  _onInput(e) {
    const val = parseFloat(e.target.value);
    if (!this.liveUpdate) return;

    // Debounce live updates
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      this._fireValueChanged(val);
    }, 100);
  }

  _onChange(e) {
    clearTimeout(this._debounceTimer);
    const val = parseFloat(e.target.value);
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
