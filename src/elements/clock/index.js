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
      this._stop();
      this._start();
    }
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
    const mode = this.config.numbers || "cardinal";
    const nums = mode === "all"
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      : mode === "none"
      ? []
      : [12, 3, 6, 9];
    const R = mode === "all" ? 40 : 34;
    const fs = mode === "all" ? 9 : 18;

    const vars =
      `${this.config.face_color ? `--clock-face:${this.config.face_color};` : ""}` +
      `${this.config.number_color ? `--clock-number:${this.config.number_color};` : ""}` +
      `${this.config.hand_color ? `--clock-hand:${this.config.hand_color};` : ""}` +
      `${this.config.second_color ? `--clock-second:${this.config.second_color};` : ""}`;

    return html`
      <ha-card style=${vars}>
        <svg viewBox="0 0 100 100">
          <circle class="face" cx="50" cy="50" r="49"></circle>
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
