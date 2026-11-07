/**
 * materia-shape-morph — a calm M3 Expressive "resting" animation: one shape
 * drifting through the expressive shape set (cookie, clover, sunny, flower,
 * burst) while it turns slowly, over a lighter shape in the primary container
 * colour. Colours come from the theme (--md-sys-color-primary /
 * -primary-container), so it follows a Material You or cover palette.
 *
 * Cheap on a wall tablet: ~30 fps, paused while off screen or hidden, and a
 * still frame with prefers-reduced-motion.
 */

// Shapes as polar functions r(θ) = 1 + a·cos(n·θ): any two blend smoothly.
const SHAPES = [
  { n: 12, a: 0.06 }, // cookie
  { n: 4, a: 0.16 }, // clover
  { n: 8, a: 0.09 }, // sunny
  { n: 6, a: 0.13 }, // flower
  { n: 9, a: 0.07 }, // soft burst
];
const SEGMENT_S = 6; // one shape to the next every 6 s, morphing the whole time
const STEPS = 180;

/**
 * Shape blend at time `t` (s): a continuous walk through SHAPES with no pause
 * or jump at the segment edges. `lag` (in segments) offsets a second layer.
 */
function shapeAt(t, lag = 0) {
  const u = Math.max(0, t / SEGMENT_S - lag);
  const i = Math.floor(u);
  return {
    s1: SHAPES[i % SHAPES.length],
    s2: SHAPES[(i + 1) % SHAPES.length],
    k: u - i,
  };
}

function morphPath(ctx, cx, cy, r, s1, s2, k, rot) {
  ctx.beginPath();
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2;
    const r1 = 1 + s1.a * Math.cos(s1.n * (t + rot));
    const r2 = 1 + s2.a * Math.cos(s2.n * (t + rot));
    const rr = r * (r1 + (r2 - r1) * k);
    const x = cx + rr * Math.cos(t);
    const y = cy + rr * Math.sin(t);
    if (i) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  }
  ctx.closePath();
}

class MateriaShapeMorph extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" }).innerHTML = `<style>
        :host { display: block; width: 100%; height: 100%; }
        canvas { display: block; width: 100%; height: 100%; }
      </style><canvas aria-hidden="true"></canvas>`;
      this._canvas = this.shadowRoot.querySelector("canvas");
    }
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);
    this._io = new IntersectionObserver(([e]) => {
      this._visible = e.isIntersecting;
      this._schedule();
    });
    this._io.observe(this);
    this._onVis = () => this._schedule();
    document.addEventListener("visibilitychange", this._onVis);
    this._reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    this._resize();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    this._raf = null;
    this._ro?.disconnect();
    this._io?.disconnect();
    document.removeEventListener("visibilitychange", this._onVis);
  }

  _resize() {
    const r = this.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this._canvas.width = Math.max(1, Math.round(r.width * dpr));
    this._canvas.height = Math.max(1, Math.round(r.height * dpr));
    this._colors = null; // re-read after a theme or palette change
    this._draw(this._reduce ? 3 : performance.now() / 1000);
    this._schedule();
  }

  _schedule() {
    const run = this._visible !== false && !document.hidden && !this._reduce && this.isConnected;
    if (run && !this._raf) {
      let last = 0;
      const frame = (now) => {
        this._raf = requestAnimationFrame(frame);
        if (now - last < 33) return; // ~30 fps is plenty for this pace
        last = now;
        // The page clock, not one started per element: HA re-attaches cards on
        // re-render, and a per-element start made the shapes snap back each time.
        this._draw(now / 1000);
      };
      this._raf = requestAnimationFrame(frame);
    } else if (!run && this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
  }

  _draw(t) {
    const cv = this._canvas;
    const ctx = cv?.getContext("2d");
    if (!ctx) return;
    if (!this._colors || t - (this._colorsAt ?? 0) > 5) {
      const cs = getComputedStyle(this);
      this._colors = {
        front: cs.getPropertyValue("--md-sys-color-primary").trim() || "#b8c4ff",
        back: cs.getPropertyValue("--md-sys-color-primary-container").trim() || "#36437a",
      };
      this._colorsAt = t;
    }
    const w = cv.width;
    const h = cv.height;
    const c = Math.min(w, h);
    const cx = w / 2;
    const cy = h / 2;
    const front = shapeAt(t);
    const back = shapeAt(t, 0.5); // half a shape behind, so the layers never match
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = this._colors.back;
    morphPath(ctx, cx + c * 0.04, cy + c * 0.05, c * 0.34, back.s1, back.s2, back.k, -t * 0.05);
    ctx.fill();
    ctx.fillStyle = this._colors.front;
    morphPath(ctx, cx, cy, c * 0.3, front.s1, front.s2, front.k, t * 0.08);
    ctx.fill();
    ctx.fillStyle = this._colors.back;
    ctx.beginPath();
    ctx.arc(cx, cy, c * 0.06, 0, Math.PI * 2);
    ctx.fill();
  }
}

if (!customElements.get("materia-shape-morph")) customElements.define("materia-shape-morph", MateriaShapeMorph);
