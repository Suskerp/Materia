import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { MAX_STEPS, volumeSteps, volumeLimit, isMediaOff, maxSteps } from "../../utils/media.js";
import { attributeMapOf } from "../../utils/media-attributes.js";
import {
  SWEEP,
  START,
  unwrapDelta,
  filterVelocity,
  shouldCoast,
  coastAmplitude,
  coastOffset,
  coastFinished,
  knobAngleFor,
  knobStepsFor,
  arcStep,
  stepHapticType,
  dialArc,
  stepHaptic,
  tapStep,
  repeatDelay,
  REPEAT_INITIAL_MS,
} from "../../utils/kinetic-knob.js";
import {
  volumeStyle,
  polar,
  DIAL_TICKS,
  DIAL_KNURL,
  clampVolume,
  showsLimit,
  barLevel,
  reportedArc,
  barFraction,
  keyStep,
  zoneLabel,
} from "../../utils/volume-control.js";
import { scopeContext } from "../../primitives/sheet.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * materia-volume — one media player's volume: a kinetic rotary knob, an arc
 * dial or (tap) a vertical M3 slider with − mute + under it; `column: true`
 * is the narrow column with the zone name and number on top. No heading,
 * zones or linking: materia-volume-knob composes those around it.
 *
 * `entity` falls back to the enclosing materia-art-scope's player.
 *
 * `embedded` (set by materia-volume-knob): no card of its own; the host and
 * its wrapper are display: contents, so the parts lay out in the enclosing
 * card as its own children.
 *
 * The dial is drawn by Lit once and then mutated imperatively while it turns:
 * a full Lit update per pointer event would starve the finger-following ring
 * on slow tablets (see materia-media-progress for the same rule).
 */
class MateriaVolume extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    embedded: { type: Boolean, reflect: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-volume-card-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity, style: "knob" };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this.config = { style: "knob", ...config };
  }

  connectedCallback() {
    super.connectedCallback();
    // (Re)attached, e.g. inside an art scope: ask its entity again.
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._coast);
    this._coast = null;
    clearTimeout(this._wheel);
    this._repeatStop();
  }

  /* ---------------------------------------------------------------- state */

  get _style() {
    return volumeStyle(this.config?.style);
  }

  get _knob() {
    return this._style === "knob";
  }

  _state() {
    return this.hass?.states[this._entityId];
  }

  _volValue() {
    if (this._local != null && (this._dragging || Date.now() < this._localUntil)) return this._local;
    this._local = null;
    return volumeSteps(this._state(), this._attrs);
  }

  _setVolume(steps, final) {
    const s = this._state();
    const limit = volumeLimit(s, this._attrs);
    const v = clampVolume(steps, limit);
    const prev = this._local ?? volumeSteps(s, this._attrs);
    if (v !== prev) stepHaptic(this, stepHapticType(v, limit, this._max));
    else if (Math.round(steps) > limit && prev === limit && !this._atLimitBuzzed) {
      stepHaptic(this, "warning");
      this._atLimitBuzzed = true;
    }
    if (v < limit) this._atLimitBuzzed = false;
    this._local = v;
    this._localUntil = Date.now() + 2500;
    this._renderDial();
    const now = Date.now();
    if ((final || now - (this._lastSent ?? 0) > 150) && (v !== this._sent || final)) {
      this._lastSent = now;
      this._sent = v;
      this._callService("media_player", "volume_set", {
        entity_id: this._entityId,
        volume_level: +(v / this._max).toFixed(4),
      });
    }
  }

  _toggleMute() {
    stepHaptic(this, "light");
    this._callService("media_player", "volume_mute", {
      entity_id: this._entityId,
      is_volume_muted: !this._state()?.attributes?.is_volume_muted,
    });
  }

  /* ---------------------------------------------------------------- dial input */

  _angle(ev) {
    const r = this._dialEl.getBoundingClientRect();
    return (Math.atan2(ev.clientY - (r.top + r.height / 2), ev.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  }

  _down(ev) {
    cancelAnimationFrame(this._coast);
    this._coast = null;
    this._vel = 0;
    this._lastMoveT = ev.timeStamp;
    this._dragging = true;
    this._knobAngle = knobAngleFor(this._volValue());
    this._lastAng = this._angle(ev);
    this._dragVal = this._volValue();
    ev.currentTarget.setPointerCapture(ev.pointerId);
    ev.currentTarget.classList.add("drag");
  }

  _move(ev) {
    if (!this._dragging) return;
    const a = this._angle(ev);
    const d = unwrapDelta(a, this._lastAng);
    this._lastAng = a;
    if (this._knob) {
      this._turnKnob(d);
      this._vel = filterVelocity(this._vel, d, ev.timeStamp - (this._lastMoveT ?? ev.timeStamp));
      this._lastMoveT = ev.timeStamp;
      return;
    }
    this._dragVal = Math.max(0, Math.min(volumeLimit(this._state(), this._attrs), this._dragVal + arcStep(d, this._max)));
    if (Math.round(this._dragVal) !== this._local) this._setVolume(this._dragVal, false);
  }

  _up(ev) {
    if (!this._dragging) return;
    this._dragging = false;
    ev.currentTarget.classList.remove("drag");
    const idle = ev.timeStamp - (this._lastMoveT ?? 0);
    if (this._knob && shouldCoast(this._vel ?? 0, idle)) this._startCoast(this._vel);
    else this._settle();
  }

  _wheelStep(ev) {
    ev.preventDefault();
    this._setVolume(this._volValue() + (ev.deltaY < 0 ? 1 : -1), false);
    clearTimeout(this._wheel);
    this._wheel = setTimeout(() => this._setVolume(this._volValue(), true), 300);
  }

  _key(ev) {
    const step = keyStep(ev.key);
    if (step) {
      ev.preventDefault();
      this._setVolume(this._volValue() + step, true);
    }
  }

  /** Turns the knob by `deg` (finger or coast); the volume follows in whole steps. False at an end stop. */
  _turnKnob(deg) {
    const limit = volumeLimit(this._state(), this._attrs);
    const next = this._dragVal + knobStepsFor(deg);
    this._dragVal = Math.max(0, Math.min(limit, next));
    this._knobAngle = knobAngleFor(this._dragVal);
    if (Math.round(this._dragVal) !== this._local) this._setVolume(this._dragVal, false);
    else this._renderDial();
    return next === this._dragVal;
  }

  /** Release: snap the knob onto the step it stopped at and send the final value. */
  _settle() {
    this._coast = null;
    const g = this._knobG;
    g?.classList.add("settle");
    this._knobAngle = null;
    this._setVolume(this._dragVal ?? this._volValue(), true);
    setTimeout(() => g?.classList.remove("settle"), 260);
  }

  _startCoast(speedDegPerMs) {
    const amplitude = coastAmplitude(speedDegPerMs);
    const t0 = performance.now();
    let travelled = 0;
    const frame = (now) => {
      const elapsed = now - t0;
      const target = coastOffset(amplitude, elapsed);
      const moving = this._turnKnob(target - travelled);
      travelled = target;
      if (!moving || coastFinished(amplitude, target, elapsed)) return this._settle();
      this._coast = requestAnimationFrame(frame);
    };
    this._coast = requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------------- tap style */

  /* Slider: drag follows the finger over 0 … limit; a tap without moving
     steps at most TAP_MAX_STEPS toward the spot (no accidental jumps). */
  _barFrac(ev, bar) {
    const r = bar.getBoundingClientRect();
    return barFraction(ev.clientY, r.top, r.height);
  }

  _barDown(ev) {
    if (ev.button > 0) return;
    const bar = ev.currentTarget;
    bar.setPointerCapture?.(ev.pointerId);
    this._bar = { id: ev.pointerId, y: ev.clientY, moved: false };
    this._dragging = true;
    bar.classList.add("dragging");
  }

  _barMove(ev) {
    const d = this._bar;
    if (!d || d.id !== ev.pointerId) return;
    if (!d.moved && Math.abs(ev.clientY - d.y) < 6) return;
    d.moved = true;
    const limit = volumeLimit(this._state(), this._attrs);
    this._setVolume(this._barFrac(ev, ev.currentTarget) * limit, false);
  }

  _barUp(ev) {
    const d = this._bar;
    if (!d || d.id !== ev.pointerId) return;
    this._bar = null;
    this._dragging = false;
    ev.currentTarget.classList.remove("dragging");
    if (ev.type === "pointercancel") return;
    const limit = volumeLimit(this._state(), this._attrs);
    const frac = this._barFrac(ev, ev.currentTarget);
    this._setVolume(d.moved ? frac * limit : tapStep(this._volValue(), frac, limit), true);
  }

  /** Hold − / +: one step now, repeats after 380 ms, speeding from 140 to 70 ms. */
  _repeatStart(ev, d) {
    if (ev.button > 0) return;
    this._repeatStop();
    this._setVolume(this._volValue() + d, true);
    let ticks = 0;
    const run = () => {
      this._setVolume(this._volValue() + d, true);
      ticks += 1;
      this._repeat = setTimeout(run, repeatDelay(ticks));
    };
    this._repeat = setTimeout(run, REPEAT_INITIAL_MS);
  }

  _repeatStop() {
    clearTimeout(this._repeat);
    this._repeat = null;
  }

  /** Keyboard activation of −/+ (pointer presses are handled on pointerdown). */
  _repeatKey(ev, d) {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    ev.preventDefault();
    this._setVolume(this._volValue() + d, true);
  }

  /* ---------------------------------------------------------------- render */

  willUpdate(changed) {
    super.willUpdate?.(changed);
    const id = this.config?.entity || (this.isConnected ? scopeContext(this).entity : undefined);
    if (id !== this._entityId) {
      // Another zone: drop the previous one's optimistic value and repeat.
      this._repeatStop();
      this._local = null;
      this._entityId = id;
    }
    this._attrs = this._attributeMap();
  }

  /** Attribute names and volume scale: own `attributes:`, else the art scope's, else the defaults. */
  _attributeMap() {
    return attributeMapOf(this);
  }

  /** The volume scale in steps (attributes.steps, default MAX_STEPS). */
  get _max() {
    return maxSteps(this._attrs);
  }

  /** A volume in steps on the dial's fixed 0 … MAX_STEPS geometry. */
  _dial(v) {
    const max = this._max;
    return max === MAX_STEPS ? v : (v * MAX_STEPS) / max;
  }

  updated(changed) {
    super.updated?.(changed);
    const dial = this.renderRoot.querySelector(".dial-svg");
    if (dial && dial !== this._dialEl) {
      // Wheel must be non-passive to stop the page scrolling under the dial.
      dial.addEventListener("wheel", (e) => this._wheelStep(e), { passive: false });
    }
    this._dialEl = dial;
    this._renderDial();
  }

  /** Imperative dial update — called per pointer event, never via Lit. */
  _renderDial() {
    const root = this.renderRoot;
    const dial = this._dialEl;
    if (!dial || !this.hass) return;
    const s = this._state();
    const off = isMediaOff(s);
    const v = this._volValue();
    const limit = volumeLimit(s, this._attrs);
    const style = this._style;
    const $ = (sel) => root.querySelector(sel);
    $(".num").textContent = off ? t("state_off", this.hass) : String(Math.round(v));
    dial.setAttribute("aria-valuenow", String(Math.round(v)));
    $(".limlabel").textContent = showsLimit(style, v, limit, this._max) ? t("media_limit", this.hass, { value: limit }) : "";
    if (style === "tap") {
      // The bar spans 0 … the limit: the range above it can't be used, so it isn't drawn.
      dial.style.setProperty("--p", String(barLevel(v, limit, off)));
      return;
    }
    if (style === "knob") {
      this._knobG = $("#knobg");
      const angle = (this._dragging || this._coast) && this._knobAngle != null ? this._knobAngle : knobAngleFor(v);
      this._knobG.style.transform = `rotate(${angle}deg)`;
      // Outer thin arc = the volume the amplifier REPORTS, so it trails the knob.
      $(".actual").style.strokeDasharray = `${reportedArc(volumeSteps(s, this._attrs), limit, off)} ${MAX_STEPS + 1}`;
      return;
    }
    $(".trk").setAttribute("d", dialArc(0, this._dial(limit)));
    $(".lvl").setAttribute("d", off ? "" : dialArc(0, Math.max(this._dial(v), 0.01)));
    const [cx, cy] = polar(74, START + (SWEEP * v) / this._max);
    const dot = $(".dot");
    dot.setAttribute("cx", cx.toFixed(2));
    dot.setAttribute("cy", cy.toFixed(2));
    for (const tick of root.querySelectorAll(".tick")) {
      const tv = Number(tick.dataset.v);
      tick.classList.toggle("t-on", !off && tv <= this._dial(v));
    }
  }

  _dialContent() {
    if (this._knob) {
      return svg`
        <path class="actual" pathLength=${MAX_STEPS} d=${dialArc(0, MAX_STEPS, 150)}></path>
        <circle class="knobshadow" cx="150" cy="150" r="118"></circle>
        <g id="knobg">
          <circle class="bigknob" cx="150" cy="150" r="118"></circle>
          ${DIAL_KNURL.map((k) => svg`<line class="knurl ${k.major ? "major" : ""}" x1=${k.x1} y1=${k.y1} x2=${k.x2} y2=${k.y2}></line>`)}
        </g>`;
    }
    return svg`
      ${DIAL_TICKS.map((k) => svg`<line data-v=${k.v} class="tick ${k.major ? "major" : ""}" x1=${k.x1} y1=${k.y1} x2=${k.x2} y2=${k.y2}></line>`)}
      <path class="trk"></path><path class="lvl"></path>
      <circle class="knob" cx="150" cy="150" r="96"></circle><circle class="dot" r="9"></circle>`;
  }

  /** − | mute | + under a slider; hold − / + to repeat. */
  _tapFoot(muted) {
    return html`
        <div class="tfoot">
          <button
            class="step first"
            aria-label=${t("media_volume_down", this.hass)}
            @pointerdown=${(e) => this._repeatStart(e, -1)}
            @pointerup=${this._repeatStop}
            @pointerleave=${this._repeatStop}
            @pointercancel=${this._repeatStop}
            @keydown=${(e) => this._repeatKey(e, -1)}
          ><ha-icon icon="mdi:minus"></ha-icon></button>
          <button
            class="mute ${muted ? "on" : ""}"
            aria-label=${t("media_mute", this.hass)}
            aria-pressed=${muted ? "true" : "false"}
            @click=${this._toggleMute}
          ><ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon></button>
          <button
            class="step last"
            aria-label=${t("media_volume_up", this.hass)}
            @pointerdown=${(e) => this._repeatStart(e, 1)}
            @pointerup=${this._repeatStop}
            @pointerleave=${this._repeatStop}
            @pointercancel=${this._repeatStop}
            @keydown=${(e) => this._repeatKey(e, 1)}
          ><ha-icon icon="mdi:plus"></ha-icon></button>
        </div>`;
  }

  _tapBar(name, limit) {
    return html`<button
      class="tbar dial-svg"
      role="slider"
      aria-label=${name}
      aria-valuemin="0"
      aria-valuemax=${limit}
      @pointerdown=${this._barDown}
      @pointermove=${this._barMove}
      @pointerup=${this._barUp}
      @pointercancel=${this._barUp}
      @keydown=${this._key}
    ><span class="tin"></span><span class="thandle"></span><span class="tfill"></span></button>`;
  }

  /** The narrow column: name and number on top, slider, limit, − mute +. */
  _renderTapColumn(off, muted) {
    const name = this.config.name ?? zoneLabel({ entity: this._entityId }, this.hass);
    return html`
      <ha-card class="panel tap col ${off ? "off" : ""} ${muted ? "muted" : ""}">
        <div class="colhead">
          ${this.config.show_name === false ? nothing : html`<span class="zn">${name}</span>`}
          <span class="num"></span>
        </div>
        <div class="tbody">${this._tapBar(name, volumeLimit(this._state(), this._attrs))}</div>
        <div class="limlabel"></div>
        ${this._tapFoot(muted)}
      </ha-card>
    `;
  }

  _tapParts(name, muted) {
    return html`
      <div class="tbody">
        ${this._tapBar(name, volumeLimit(this._state(), this._attrs))}
        <div class="treadout">
          <span class="num"></span>
          <div class="limlabel"></div>
        </div>
      </div>
      ${this._tapFoot(muted)}`;
  }

  _dialParts(name, muted) {
    return html`
      <div class="readout"><b class="num"></b></div>
      <div class="dial">
        <svg
          class="dial-svg"
          viewBox="-20 -20 340 340"
          tabindex="0"
          role="slider"
          aria-label=${name}
          aria-valuemin="0"
          aria-valuemax=${this._max}
          @pointerdown=${this._down}
          @pointermove=${this._move}
          @pointerup=${this._up}
          @pointercancel=${this._up}
          @keydown=${this._key}
        >${this._dialContent()}</svg>
      </div>
      <div class="limlabel"></div>
      <div class="pfoot">
        <button class="round ${muted ? "on" : ""}" aria-label=${t("media_mute", this.hass)} aria-pressed=${muted ? "true" : "false"} @click=${this._toggleMute}>
          <ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
        </button>
        <div class="info"></div>
        <div class="pm">
          <button aria-label=${t("media_volume_down", this.hass)} @click=${() => this._setVolume(this._volValue() - 1, true)}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button aria-label=${t("media_volume_up", this.hass)} @click=${() => this._setVolume(this._volValue() + 1, true)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`;
  }

  render() {
    if (!this.hass || !this.config || !this._entityId) return html``;
    const s = this._state();
    const off = isMediaOff(s);
    const muted = !!s?.attributes?.is_volume_muted;
    const tap = this._style === "tap";
    if (tap && this.config.column) return this._renderTapColumn(off, muted);
    // The slider's accessible name: the panel title.
    const name = this.config.name ?? t("media_volume", this.hass);
    const cls = tap ? `tap ${off ? "off" : ""} ${muted ? "muted" : ""}` : off ? "off" : "";
    const parts = tap ? this._tapParts(name, muted) : this._dialParts(name, muted);
    if (this.embedded) return html`<div class="body ${cls}">${parts}</div>`;
    return html`<ha-card class="panel ${cls}">${parts}</ha-card>`;
  }

  getGridOptions() {
    return { columns: 6, rows: "auto", min_columns: 4 };
  }

  getCardSize() {
    return 8;
  }
}

customElements.define("materia-volume", MateriaVolume);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-volume",
  name: "Materia Volume",
  description: "One player's volume — rotating knob, arc dial or tap-first level bar — with mute and −/+.",
  preview: true,
});
