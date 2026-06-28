import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

const H = 28;
const MID = 14;
const AMP = 2; // center-to-peak amplitude (kept low / flat per M3 spec)
const WL = 32; // wavelength (must match the CSS mp-flow keyframe translateX)
const STEP = 2;

let _uid = 0;

class MateriaMediaProgress extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _w: { state: true },
    _resolvedColor: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-media-progress-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = config;
    this._cid ??= `mp-clip-${++_uid}`;
  }

  /* ---- live position ---- */
  _position() {
    const s = this.hass?.states[this.config.entity];
    if (!s) return { pos: 0, dur: 0, playing: false, live: false };
    const dur = Number(s.attributes.media_duration) || 0;
    let pos = Number(s.attributes.media_position) || 0;
    const playing = s.state === "playing";
    const updated = s.attributes.media_position_updated_at;
    if (playing && updated) {
      pos += (Date.now() - new Date(updated).getTime()) / 1000;
    }

    // Live-stream latch: radio reports a short, rolling media_duration that
    // resets — letting the fill sweep to the end then snap back (a visible
    // hitch). Once a still-playing stream runs past its duration, treat it as
    // live and keep the bar full + flowing instead of sawtoothing.
    const key = `${this.config.entity}|${s.attributes.media_content_id ?? s.attributes.media_title ?? ""}`;
    if (key !== this._latchKey) {
      this._latchKey = key;
      this._live = false;
    }
    if (!playing) this._live = false;
    else if (dur > 0 && pos >= dur - 0.25) this._live = true;

    if (dur) pos = Math.min(pos, dur);
    return { pos: Math.max(0, pos), dur, playing, live: this._live };
  }

  _fmt(sec) {
    sec = Math.max(0, Math.round(sec));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
  }

  /** Sine wave path between two x positions (px). */
  _wavePath(fromX, toX) {
    let d = "";
    for (let x = fromX; x <= toX; x += STEP) {
      const y = MID - AMP * Math.sin((2 * Math.PI * x) / WL);
      d += `${d ? " L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d || "M 0 14";
  }

  firstUpdated() {
    const bar = this.shadowRoot?.querySelector(".bar");
    if (bar) {
      this._w = bar.clientWidth;
      this._ro = new ResizeObserver((entries) => {
        this._w = entries[0].contentRect.width;
      });
      this._ro.observe(bar);
    }
  }

  updated() {
    // Cache the few nodes the rAF loop mutates so it never has to touch Lit.
    const root = this.shadowRoot;
    this._clipRect = root?.querySelector("clipPath rect");
    this._thumbEl = root?.querySelector(".thumb");
    this._trackEl = root?.querySelector(".track");
    this._posEl = root?.querySelector(".time");

    const playing = this.hass?.states[this.config.entity]?.state === "playing";
    // The rAF loop exists only to advance the played position smoothly. When
    // the position is frozen (live stream latched at its rolling end), there's
    // nothing to advance. Stop it; CSS keeps the wave moving on its own.
    if (playing && !this._live) this._startLoop();
    else this._stopLoop();
    if (this.hass) this._resolveField("color", "_resolvedColor");
  }

  /**
   * Smoothly advance the played position with rAF while playing. Crucially this
   * mutates only the changing attributes directly on the cached DOM nodes — it
   * does NOT call requestUpdate(). Running Lit's full re-render lifecycle 60×/sec
   * on the main thread starves the (main-thread) SVG wave animation and makes it
   * hitch; direct attribute writes are cheap and leave the animation untouched.
   */
  _startLoop() {
    if (this._raf) return;
    const step = () => {
      this._raf = requestAnimationFrame(step);
      this._tickDom();
    };
    this._raf = requestAnimationFrame(step);
  }

  _tickDom() {
    const { pos, dur, live } = this._position();
    const w = this._w || 300;
    const frac = live ? 1 : dur > 0 ? Math.min(1, pos / dur) : 0;
    const playedX = frac * w;
    if (this._clipRect) this._clipRect.setAttribute("width", Math.max(0, playedX));
    if (this._thumbEl) this._thumbEl.setAttribute("x", playedX - 2);
    if (this._trackEl) this._trackEl.setAttribute("x1", playedX);
    if (this._posEl) this._posEl.textContent = this._fmt(pos);
    // Position just reached the rolling end of a live stream — freeze and let
    // CSS carry the wave alone (no more per-frame work).
    if (live) this._stopLoop();
  }

  _stopLoop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  /**
   * Full-width wave path, memoized by width (only regenerated on resize).
   * Extends one wavelength past BOTH edges: the CSS flow animation translates
   * the path left by WL, so without the extra wavelength on the right the end
   * of the bar would briefly go undrawn each cycle (a flicker/hitch that's only
   * visible once progress reaches the end and the clip no longer hides it).
   */
  _fullWave(w) {
    if (this._waveW !== w) {
      this._waveW = w;
      this._wavePathCache = this._wavePath(-WL, w + WL);
    }
    return this._wavePathCache;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopLoop();
    this._ro?.disconnect();
  }

  _seek(ev) {
    if (this.config.seekable === false) return;
    const { dur } = this._position();
    if (!dur) return;
    const rect = ev.currentTarget.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
    this._callService("media_player", "media_seek", {
      entity_id: this.config.entity,
      seek_position: frac * dur,
    });
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this.hass.states[this.config.entity];
    const unavailable = this._isUnavailable(stateObj);
    const { pos, dur, playing, live } = this._position();
    const w = this._w || 300;
    const frac = live ? 1 : dur > 0 ? Math.min(1, pos / dur) : 0;
    const playedX = frac * w;
    const showTimes = this.config.show_times !== false;
    const color = this._resolvedColor || this.config.color;

    return html`
      <ha-card>
        <div class="wrap ${unavailable ? "unavailable" : ""}" style=${color ? `--mp-color:${color};` : ""}>
          <div class="bar" @pointerdown=${this._seek}>
            <svg width="100%" height=${H}>
              <defs>
                <clipPath id=${this._cid}>
                  <rect x="0" y="0" width=${Math.max(0, playedX)} height=${H}></rect>
                </clipPath>
              </defs>
              <line class="track" x1=${playedX} y1=${MID} x2=${w} y2=${MID}></line>
              <g clip-path="url(#${this._cid})">
                <path class="wave ${playing ? "playing" : ""}" d=${this._fullWave(w)}></path>
              </g>
              <rect class="thumb" x=${playedX - 2} y=${MID - 10} width="4" height="20" rx="2"></rect>
            </svg>
          </div>
          ${showTimes
            ? html`
                <div class="times">
                  <span class="time">${this._fmt(pos)}</span>
                  <span class="time">${this._fmt(dur)}</span>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-media-progress", MateriaMediaProgress);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-media-progress",
  name: "Materia Media Progress",
  description: "Wavy (M3 expressive) media seek bar with elapsed/duration and tap-to-seek.",
  preview: true,
});
