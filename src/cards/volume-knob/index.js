import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { MAX_STEPS, volumeSteps, volumeLimit, isMediaOff, formatOffset } from "../../utils/media.js";
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
import "../../elements/button-group/index.js";
import { styles } from "./styles.js";
import "./editor.js";

const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
};

/* Static dial geometry, built once. */
const TICKS = Array.from({ length: 31 }, (_, i) => {
  const major = i % 5 === 0;
  const [x1, y1] = polar(158, START + (SWEEP * i) / 30);
  const [x2, y2] = polar(major ? 172 : 167, START + (SWEEP * i) / 30);
  return { v: (i / 30) * MAX_STEPS, major, x1, y1, x2, y2 };
});
const KNURL = Array.from({ length: 60 }, (_, i) => {
  const major = i % 5 === 0;
  const [x1, y1] = polar(major ? 108 : 111, i * 6);
  const [x2, y2] = polar(major ? 128 : 125, i * 6);
  return { major, x1, y1, x2, y2 };
});

/**
 * materia-volume-knob — the volume panel: a rotating dial (knob or arc
 * style), zones, zone linking, mute and −/+. Works inline (a kiosk column)
 * and as sheet content (the volume ring, the toolbar's volume button and the
 * media header open it in a materia-sheet).
 *
 * The dial is drawn by Lit once and then mutated imperatively while it turns:
 * a full Lit update per pointer event would starve the finger-following ring
 * on slow tablets (see materia-media-progress for the same rule).
 */
class MateriaVolumeKnob extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _zone: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-volume-knob-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity, style: "knob" };
  }

  setConfig(config) {
    if (!config.entity && !config.zones?.length) throw new Error("entity is required");
    const zones = Array.isArray(config.zones) && config.zones.length ? config.zones : [{ entity: config.entity }];
    this.config = { style: "knob", ...config, zones };
    if (!(this._zone < zones.length)) this._zone = Math.max(0, zones.findIndex((z) => z.entity === config.entity));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._coast);
    this._coast = null;
    clearTimeout(this._wheel);
    this._repeatStop();
  }

  /* ---------------------------------------------------------------- state */

  /** knob (default) | arc | tap */
  get _style() {
    return ["arc", "tap"].includes(this.config.style) ? this.config.style : "knob";
  }

  get _knob() {
    return this._style === "knob";
  }

  _zoneState(i = this._zone) {
    return this.hass?.states[this.config.zones[i]?.entity];
  }

  _zoneName(i) {
    const z = this.config.zones[i];
    return z?.name ?? this.hass?.states[z?.entity]?.attributes?.friendly_name ?? z?.entity ?? "";
  }

  _volValue() {
    if (this._local != null && (this._dragging || Date.now() < this._localUntil)) return this._local;
    this._local = null;
    return volumeSteps(this._zoneState());
  }

  _setVolume(steps, final) {
    const s = this._zoneState();
    const limit = volumeLimit(s);
    const v = Math.max(0, Math.min(limit, Math.round(steps)));
    const prev = this._local ?? volumeSteps(s);
    if (v !== prev) stepHaptic(this, stepHapticType(v, limit));
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
        entity_id: this.config.zones[this._zone].entity,
        volume_level: +(v / MAX_STEPS).toFixed(4),
      });
    }
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
    this._dragVal = Math.max(0, Math.min(volumeLimit(this._zoneState()), this._dragVal + arcStep(d)));
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
    const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 5, PageDown: -5 }[ev.key];
    if (step) {
      ev.preventDefault();
      this._setVolume(this._volValue() + step, true);
    }
  }

  /** Turns the knob by `deg` (finger or coast); the volume follows in whole steps. False at an end stop. */
  _turnKnob(deg) {
    const limit = volumeLimit(this._zoneState());
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

  /* ---------------------------------------------------------------- render */

  updated(changed) {
    super.updated?.(changed);
    // Kiosk side panel: fit the content. In place (panel_back) it fills the subview instead.
    this.toggleAttribute("panel-fit", this._style === "tap" && !!this.config?.in_panel && !this.config?.panel_back);
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
    const s = this._zoneState();
    const off = isMediaOff(s);
    const v = this._volValue();
    const limit = volumeLimit(s);
    const $ = (sel) => root.querySelector(sel);
    $(".num").textContent = off ? t("state_off", this.hass) : String(Math.round(v));
    if (this._style === "tap") {
      dial.setAttribute("aria-valuenow", String(Math.round(v)));
      // The bar spans 0 … the limit: the range above it can't be used, so it isn't drawn.
      $(".tfill").style.height = `${off ? 0 : Math.min(1, v / limit) * 100}%`;
      $(".limlabel").textContent =
        limit < MAX_STEPS && Math.round(v) >= limit ? t("media_limit", this.hass, { value: limit }) : "";
      return;
    }
    const limitText = t("media_limit", this.hass, { value: limit });
    dial.setAttribute("aria-valuenow", String(Math.round(v)));
    if (this._knob) {
      this._knobG = $("#knobg");
      const angle = (this._dragging || this._coast) && this._knobAngle != null ? this._knobAngle : knobAngleFor(v);
      this._knobG.style.transform = `rotate(${angle}deg)`;
      // Outer thin arc = the volume the amplifier REPORTS, so it trails the knob.
      // Scaled to the limit: the full ring is the usable range.
      const actual = off ? 0 : Math.min(MAX_STEPS, (volumeSteps(s) / limit) * MAX_STEPS);
      $(".actual").style.strokeDasharray = `${Math.max(actual, 0.001)} ${MAX_STEPS + 1}`;
      $(".limlabel").textContent = limit < MAX_STEPS && Math.round(v) >= limit ? limitText : "";
      return;
    }
    $(".limlabel").textContent = limit < MAX_STEPS ? limitText : "";
    $(".trk").setAttribute("d", dialArc(0, limit));
    $(".lvl").setAttribute("d", off ? "" : dialArc(0, Math.max(v, 0.01)));
    const [cx, cy] = polar(74, START + (SWEEP * v) / MAX_STEPS);
    const dot = $(".dot");
    dot.setAttribute("cx", cx.toFixed(2));
    dot.setAttribute("cy", cy.toFixed(2));
    for (const tick of root.querySelectorAll(".tick")) {
      const tv = Number(tick.dataset.v);
      tick.classList.toggle("t-on", !off && tv <= v);
    }
  }

  _dialContent() {
    if (this._knob) {
      return svg`
        <path class="actual" pathLength=${MAX_STEPS} d=${dialArc(0, MAX_STEPS, 150)}></path>
        <circle class="knobshadow" cx="150" cy="150" r="118"></circle>
        <g id="knobg">
          <circle class="bigknob" cx="150" cy="150" r="118"></circle>
          ${KNURL.map((k) => svg`<line class="knurl ${k.major ? "major" : ""}" x1=${k.x1} y1=${k.y1} x2=${k.x2} y2=${k.y2}></line>`)}
        </g>`;
    }
    return svg`
      ${TICKS.map((k) => svg`<line data-v=${k.v} class="tick ${k.major ? "major" : ""}" x1=${k.x1} y1=${k.y1} x2=${k.x2} y2=${k.y2}></line>`)}
      <path class="trk"></path><path class="lvl"></path>
      <circle class="knob" cx="150" cy="150" r="96"></circle><circle class="dot" r="9"></circle>`;
  }

  _selectZone(e) {
    e.stopPropagation();
    this._pickZone(Number(e.detail.value) || 0);
  }

  _pickZone(i) {
    this._repeatStop();
    this._zone = i;
    this._local = null;
  }

  _toggleLink() {
    this._fireHaptic("light");
    this._callService("homeassistant", "toggle", { entity_id: this.config.link_entity });
  }

  _toggleMute() {
    stepHaptic(this, "light");
    this._callService("media_player", "volume_mute", {
      entity_id: this.config.zones[this._zone].entity,
      is_volume_muted: !this._zoneState()?.attributes?.is_volume_muted,
    });
  }

  /* ---------------------------------------------------------------- tap style */

  _tapBar(ev) {
    const r = ev.currentTarget.getBoundingClientRect();
    const limit = volumeLimit(this._zoneState());
    this._setVolume(tapStep(this._volValue(), 1 - (ev.clientY - r.top) / r.height, limit), true);
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

  _dismiss() {
    this.dispatchEvent(new CustomEvent("materia-dismiss", { bubbles: true, composed: true }));
  }

  /** In place of the player (art scope `panel_mode: inline`): a back arrow leads the header. */
  _backButton() {
    return this.config.panel_back
      ? html`<button class="close back" aria-label=${t("media_back", this.hass)} @click=${this._dismiss}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>`
      : nothing;
  }

  _closeButton() {
    return this.config.in_panel && !this.config.panel_back
      ? html`<button class="close" aria-label=${t("media_close", this.hass)} @click=${this._dismiss}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>`
      : nothing;
  }

  _linkChip(link) {
    if (!link) return nothing;
    const linked = link.state === "on";
    const z2 = this.config.zones[1] ? this.hass.states[this.config.zones[1].entity] : null;
    const offset = formatOffset(z2?.attributes?.offset ?? this._zoneState()?.attributes?.offset);
    const text = linked ? t("media_linked", this.hass, { offset }).trim() : t("media_unlinked", this.hass);
    return html`<button
      class="linkchip ${linked ? "on" : ""}"
      role="switch"
      aria-checked=${linked ? "true" : "false"}
      aria-label=${t("media_link_zones", this.hass)}
      @click=${this._toggleLink}
    ><ha-icon icon="mdi:link-variant"></ha-icon><span>${text}</span></button>`;
  }

  _renderTap(name, link, off, muted) {
    const zones = this.config.zones;
    const s = this._zoneState();
    const limit = volumeLimit(s);
    const zoneValue = (i) => {
      const zs = this._zoneState(i);
      return isMediaOff(zs) || zs?.attributes?.is_volume_muted ? t("state_off", this.hass) : volumeSteps(zs);
    };
    return html`
      <ha-card class="panel tap ${this.config.panel_back ? "sub" : ""} ${this.config.in_sheet ? "in-sheet" : ""} ${this.config.in_panel && !this.config.panel_back ? "in-panel" : ""} ${off ? "off" : ""} ${muted ? "muted" : ""}">
        <div class="phead">
          ${this._backButton()}
          <h3>${name}</h3>
          ${this._linkChip(link)} ${this._closeButton()}
        </div>
        ${zones.length > 1
          ? html`<div class="ztabs" role="radiogroup" aria-label=${name}>
              ${zones.map((z, i) => html`<button
                role="radio"
                aria-checked=${i === this._zone ? "true" : "false"}
                class="${i === this._zone ? "on" : ""} ${i === 0 ? "first" : ""} ${i === zones.length - 1 ? "last" : ""}"
                @click=${() => this._pickZone(i)}
              ><span class="zn">${this._zoneName(i)}</span><span class="zv">${zoneValue(i)}</span></button>`)}
            </div>`
          : nothing}
        <div class="tbody">
          <button
            class="tbar dial-svg"
            role="slider"
            aria-label=${name}
            aria-valuemin="0"
            aria-valuemax=${limit}
            @click=${this._tapBar}
            @keydown=${this._key}
          >
            <span class="tfill"></span>
          </button>
          <div class="treadout">
            <span class="num"></span>
            <div class="limlabel"></div>
          </div>
        </div>
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
        </div>
      </ha-card>
    `;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const zones = this.config.zones;
    const s = this._zoneState();
    const off = isMediaOff(s);
    const link = this.config.link_entity ? this.hass.states[this.config.link_entity] : null;
    const linked = link?.state === "on";
    const muted = !!s?.attributes?.is_volume_muted;
    const name = this.config.name ?? t("media_volume", this.hass);
    if (this._style === "tap") return this._renderTap(name, link, off, muted);
    const zoneGroup = {
      size: "s",
      aria_label: name,
      options: zones.map((z, i) => ({
        label: this._zoneName(i),
        value: String(i),
        icon: i === this._zone ? "mdi:check" : undefined,
      })),
    };

    return html`
      <ha-card class="panel ${this.config.panel_back ? "sub" : ""} ${this.config.in_sheet ? "in-sheet" : ""} ${off ? "off" : ""}">
        <div class="phead">
          ${this._backButton()}
          <h3>${name}</h3>
          ${link
            ? html`<button class="linklabel" @click=${this._toggleLink}>${t("media_link_zones", this.hass)}</button>
                <button
                  class="switch ${linked ? "on" : ""}"
                  role="switch"
                  aria-checked=${linked ? "true" : "false"}
                  aria-label=${t("media_link_zones", this.hass)}
                  @click=${this._toggleLink}
                ><i><ha-icon icon="mdi:link-variant"></ha-icon></i></button>`
            : nothing}
          ${this._closeButton()}
        </div>
        ${zones.length > 1
          ? html`<materia-button-group
              .hass=${this.hass}
              .config=${zoneGroup}
              .value=${String(this._zone)}
              @option-selected=${this._selectZone}
            ></materia-button-group>`
          : nothing}
        <div class="readout"><b class="num"></b></div>
        <div class="dial">
          <svg
            class="dial-svg"
            viewBox="-20 -20 340 340"
            tabindex="0"
            role="slider"
            aria-label=${name}
            aria-valuemin="0"
            aria-valuemax=${MAX_STEPS}
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
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 6, rows: "auto", min_columns: 4 };
  }

  getCardSize() {
    return 8;
  }
}

customElements.define("materia-volume-knob", MateriaVolumeKnob);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-volume-knob",
  name: "Materia Volume Knob",
  description: "Volume panel — rotating knob, arc dial or tap-first level bar — with zones, zone linking, mute and −/+.",
  preview: true,
});
