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
    const N = 12, R = 48, A = 1.0, steps = 240;
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
      : mode === "cardinal"
      ? [12, 3, 6, 9]
      : [];
    const R = mode === "all" ? 40 : 34;
    const fs = mode === "all" ? 9 : 18;

    // "dots" mode places a marker at each hour instead of numerals.
    const dots = mode === "dots" ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [];

    // Optional large, faint digital readout behind the hands (HH over MM).
    const digital = !!this.config.digital;
    const hh = String(now.getHours() % 12 || 12).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    // Optional date label ("Thu 22"), placed in the largest open arc BETWEEN
    // the hands and curved along the rim — like the Pixel clock, it drifts to
    // wherever the hands aren't.
    const showDate = !!this.config.date;
    const dateStr = `${now.toLocaleDateString(undefined, { weekday: "short" })} ${now.getDate()}`;
    const a1 = ((hourA % 360) + 360) % 360;
    const a2 = ((minA % 360) + 360) % 360;
    const lo = Math.min(a1, a2);
    const hi = Math.max(a1, a2);
    const gapInside = hi - lo;
    let dateAngle = gapInside >= 360 - gapInside ? lo + gapInside / 2 : hi + (360 - gapInside) / 2;
    dateAngle = ((dateAngle % 360) + 360) % 360;
    const dRad = (dateAngle * Math.PI) / 180;
    const dateX = (50 + 31 * Math.sin(dRad)).toFixed(2);
    const dateY = (50 - 31 * Math.cos(dRad)).toFixed(2);
    // Tangent rotation, kept upright (no upside-down text in the lower arc).
    let dateRot = dateAngle;
    if (dateRot > 90 && dateRot < 270) dateRot -= 180;

    // Optional: render the second indicator as a rim dot instead of a hand.
    const secondDot = !!this.config.second_dot;
    const secRad = (secA * Math.PI) / 180;
    const secDotX = (50 + 44 * Math.sin(secRad)).toFixed(2);
    const secDotY = (50 - 44 * Math.cos(secRad)).toFixed(2);

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
          ${dots.map((n) => {
            const a = ((n % 12) * 30 * Math.PI) / 180;
            const x = 50 + 41 * Math.sin(a);
            const y = 50 - 41 * Math.cos(a);
            return svg`<circle class="dot" cx=${x.toFixed(1)} cy=${y.toFixed(1)} r="1.3"></circle>`;
          })}
          ${digital
            ? svg`
                <text class="digital" x="50" y="40" font-size="30" text-anchor="middle" dominant-baseline="central">${hh}</text>
                <text class="digital" x="50" y="64" font-size="30" text-anchor="middle" dominant-baseline="central">${mm}</text>
              `
            : ""}
          ${showDate
            ? svg`<text class="date" x=${dateX} y=${dateY} font-size="8" text-anchor="middle" dominant-baseline="central" transform="rotate(${dateRot.toFixed(1)} ${dateX} ${dateY})">${dateStr}</text>`
            : ""}
          <line class="hand hour" x1="50" y1="50" x2="50" y2="28" transform="rotate(${hourA.toFixed(2)} 50 50)"></line>
          <line class="hand minute" x1="50" y1="50" x2="50" y2="16" transform="rotate(${minA.toFixed(2)} 50 50)"></line>
          ${showSeconds
            ? secondDot
              ? svg`<circle class="second-dot" cx=${secDotX} cy=${secDotY} r="3.2"></circle>`
              : svg`<line class="hand second" x1="50" y1="56" x2="50" y2="13" transform="rotate(${secA.toFixed(2)} 50 50)"></line>`
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
