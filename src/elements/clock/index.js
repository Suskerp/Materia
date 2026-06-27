import { LitElement, html, svg } from "lit";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaClock extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _t: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-clock-editor");
  }

  static getStubConfig() {
    return { numbers: "cardinal", show_seconds: true };
  }

  setConfig(config) {
    this.config = config || {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stop();
  }

  updated(changedProps) {
    // Re-evaluate cadence only when config changes (e.g. `smooth` toggled),
    // not on every tick.
    if (changedProps.has("config")) {
      this._facePath = null;
      this._stop();
      this._start();
    }
  }

  // Scalloped "squiggle" face — a 12-lobe wavy circle (Material You expressive)
  _scallop() {
    const N = 12, R = 46, A = 3.5, steps = 240;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const r = R + A * Math.cos(N * t);
      const x = (50 + r * Math.cos(t)).toFixed(2);
      const y = (50 + r * Math.sin(t)).toFixed(2);
      d += `${i === 0 ? "M" : "L"}${x} ${y} `;
    }
    return d + "Z";
  }

  _start() {
    if (this._raf || this._tick) return;
    if (this.config?.smooth) {
      const loop = () => {
        this._raf = requestAnimationFrame(loop);
        this._t = performance.now();
      };
      this._raf = requestAnimationFrame(loop);
    } else {
      this._tick = setInterval(() => (this._t = Date.now()), 1000);
    }
  }

  _stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._tick) clearInterval(this._tick);
    this._raf = null;
    this._tick = null;
  }

  render() {
    if (!this.config) return html``;

    const now = new Date();
    const smooth = !!this.config.smooth;
    const sec = now.getSeconds() + (smooth ? now.getMilliseconds() / 1000 : 0);
    const min = now.getMinutes() + sec / 60;
    const hr = (now.getHours() % 12) + min / 60;
    const hourA = hr * 30;
    const minA = min * 6;
    const secA = sec * 6;

    const showSeconds = this.config.show_seconds !== false;
    const squiggle = !!this.config.squiggle;
    if (squiggle) this._facePath ??= this._scallop();
    const mode = this.config.numbers || "cardinal";
    const nums = mode === "all"
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      : mode === "none"
      ? []
      : [12, 3, 6, 9];
    const R = mode === "all" ? 40 : 34;
    const fs = mode === "all" ? 9 : 18;

    const hw = this.config.hand_width;
    // size 1–10 → max-width (10 = fill the card)
    const widths = ["98px", "136px", "174px", "212px", "250px", "300px", "360px", "440px", "560px", "100%"];
    const size = Math.min(10, Math.max(1, this.config.size ?? 10));
    const vars =
      `--clock-size:${widths[size - 1]};` +
      `${this.config.face_color ? `--clock-face:${this.config.face_color};` : ""}` +
      `${this.config.number_color ? `--clock-number:${this.config.number_color};` : ""}` +
      `${this.config.hand_color ? `--clock-hand:${this.config.hand_color};` : ""}` +
      `${this.config.second_color ? `--clock-second:${this.config.second_color};` : ""}` +
      `${hw ? `--clock-hour-w:${hw};--clock-minute-w:${(hw * 0.7).toFixed(2)};--clock-second-w:${(hw * 0.3).toFixed(2)};` : ""}`;

    return html`
      <ha-card style=${vars}>
        <svg viewBox="0 0 100 100">
          ${squiggle
            ? svg`<path class="face" d=${this._facePath}></path>`
            : svg`<circle class="face" cx="50" cy="50" r="49"></circle>`}
          ${nums.map((n) => {
            const a = ((n % 12) * 30 * Math.PI) / 180;
            const x = 50 + R * Math.sin(a);
            const y = 50 - R * Math.cos(a);
            return svg`<text class="num" x=${x.toFixed(1)} y=${y.toFixed(1)} font-size=${fs} text-anchor="middle" dominant-baseline="central">${n}</text>`;
          })}
          <line class="hand hour" x1="50" y1="50" x2="50" y2="28" transform="rotate(${hourA.toFixed(2)} 50 50)"></line>
          <line class="hand minute" x1="50" y1="50" x2="50" y2="16" transform="rotate(${minA.toFixed(2)} 50 50)"></line>
          ${showSeconds
            ? svg`<line class="hand second" x1="50" y1="56" x2="50" y2="13" transform="rotate(${secA.toFixed(2)} 50 50)"></line>`
            : ""}
          <circle class="pin" cx="50" cy="50" r="2.4"></circle>
        </svg>
      </ha-card>
    `;
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("materia-clock", MateriaClock);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-clock",
  name: "Materia Clock",
  description: "Material You analog clock — cardinal numbers, sweeping hands.",
  preview: true,
});
