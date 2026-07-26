import { LitElement, html, svg } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

const DIAL_START = -135; // degrees, 0 = 12 o'clock
const DIAL_SWEEP = 270;

// color = the strong accent (sweep/knobs/active mode bg) — per the theme's
// climate-*-accent tokens; on = readable content color on that accent.
const MODE_META = {
  auto: { icon: "mdi:thermostat-auto", color: "var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))", on: "var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-on-primary))" },
  heat_cool: { icon: "mdi:autorenew", color: "var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))", on: "var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-on-primary))" },
  heat: { icon: "mdi:fire", color: "var(--md-sys-cust-color-climate-heat-accent, #a14614)", on: "var(--md-sys-cust-color-climate-heat-container, #ffeee9)" },
  cool: { icon: "mdi:snowflake", color: "var(--md-sys-cust-color-climate-cool-accent, #327ea7)", on: "var(--md-sys-cust-color-climate-cool-container, #eaf3ff)" },
  dry: { icon: "mdi:water-percent", color: "var(--md-sys-cust-color-climate-auto-accent, var(--md-sys-color-primary))", on: "var(--md-sys-cust-color-climate-auto-container, var(--md-sys-color-on-primary))" },
  fan_only: { icon: "mdi:fan", color: "var(--md-sys-color-secondary)", on: "var(--md-sys-color-on-secondary)" },
  // Soft neutral for off — a filled on-surface-variant pill reads far too harsh.
  off: { icon: "mdi:power", color: "var(--md-sys-color-surface-variant)", on: "var(--md-sys-color-on-surface-variant)" },
};

/**
 * Expressive thermostat: the classic circular dial, but the active sweep is
 * an M3-Expressive wavy line. While actively heating the wave travels toward
 * the target; while cooling it travels away; idle/off is a calm flat arc.
 * Modes render as a connected button group; -/+ nudge by `step`.
 */
class MateriaThermostat extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _optimisticTemp: { state: true },
    _phase: { state: true },
    _amp: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-thermostat-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("climate.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { step: 0.5, ...config };
  }

  connectedCallback() {
    super.connectedCallback();
    this._phase = 0;
    this._amp = 0;
    this._startLoop();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopLoop();
  }

  get _entity() {
    return this.hass?.states[this.config.entity];
  }

  get _action() {
    return this._entity?.attributes?.hvac_action ?? "";
  }

  /** What the wave should express. hvac_action when the integration reports
   *  it; otherwise inferred from mode + current-vs-target (many integrations,
   *  e.g. ViCare, don't expose hvac_action at all). `wave: always` animates
   *  whenever the mode is on; `never` disables. */
  get _waveAction() {
    const mode = this._mode;
    if (mode === "off" || this.config.wave === "never") return "";
    if (this.config.wave === "always") return mode === "cool" ? "cooling" : "heating";
    const isAuto = mode === "auto" || mode === "heat_cool";
    // Auto at equilibrium "holds": a gentle low-amplitude breathing wave —
    // the system is alive and watching, not pushing energy either way.
    const hold = isAuto ? "holding" : "";
    const action = this._action;
    if (action === "heating" || action === "cooling") return action;
    if (action && action !== "idle") return ""; // explicitly off/fan/drying
    const cur = this._current;
    const tgt = this._target;
    if (tgt == null) return hold;
    if (action === "idle") return hold; // integration says it's resting
    // No hvac_action support — infer intent from the temperatures.
    if (cur == null) return mode === "cool" ? "cooling" : mode === "heat" ? "heating" : hold;
    if ((mode === "heat" || isAuto) && cur < tgt - 0.2) return "heating";
    if ((mode === "cool" || isAuto) && cur > tgt + 0.2) return "cooling";
    return hold;
  }

  get _mode() {
    return this._entity?.state ?? "off";
  }

  get _target() {
    if (this._optimisticTemp != null) return this._optimisticTemp;
    return this._numRaw(this._entity?.attributes?.temperature);
  }

  get _current() {
    if (this.config.temperature_entity) {
      const t = this.hass?.states[this.config.temperature_entity];
      if (t) return this._numRaw(t.state);
    }
    return this._numRaw(this._entity?.attributes?.current_temperature);
  }

  _numRaw(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  /** Dial scale — config override → entity min/max → sane defaults. */
  get _scale() {
    return {
      min: this.config.min_temp ?? this._numRaw(this._entity?.attributes?.min_temp) ?? 7,
      max: this.config.max_temp ?? this._numRaw(this._entity?.attributes?.max_temp) ?? 35,
    };
  }

  /* ---- Wave animation loop ------------------------------------------------
     The rAF loop runs only while the wave is visible (active or settling).
     Amplitude eases toward its resting point; phase direction encodes intent:
     heating pulls the wave toward the target, cooling pushes it away. */
  _startLoop() {
    if (this._raf) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const tick = () => {
      const action = this._waveAction;
      const traveling = action === "heating" || action === "cooling";
      const holding = action === "holding";
      // Holding (auto at equilibrium) breathes at ~1/3 amplitude and drifts
      // slowly; active heat/cool waves travel at full amplitude.
      const targetAmp = reduced ? 0 : traveling ? 1 : holding ? 0.35 : 0;
      const nextAmp = this._amp + (targetAmp - this._amp) * 0.06;
      const settled = Math.abs(nextAmp - targetAmp) < 0.01;
      this._amp = settled ? targetAmp : nextAmp;
      if (this._amp > 0.005 || targetAmp > 0) {
        this._phase += action === "cooling" ? 0.045 : traveling ? -0.045 : -0.012;
        this._raf = requestAnimationFrame(tick);
      } else {
        this._raf = null; // wave gone — sleep until an update wakes us
      }
    };
    this._raf = requestAnimationFrame(tick);
  }

  _stopLoop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  updated(changedProps) {
    // Wake the loop whenever anything (hass tick, optimistic target, config)
    // turns the wave on — connectedCallback runs before hass exists, so the
    // initial start almost always happens here.
    if (this._waveAction && !this._raf) this._startLoop();
    if (changedProps.has("hass")) {
      // Reconcile optimistic target.
      if (this._optimisticTemp != null) {
        const actual = this._numRaw(this._entity?.attributes?.temperature);
        if (actual === this._optimisticTemp) {
          this._optimisticTemp = null;
          clearTimeout(this._optimisticTimer);
        }
      }
    }
  }

  /* ---- Geometry ----------------------------------------------------------- */
  _angleFor(temp, min, max) {
    const frac = Math.min(1, Math.max(0, (temp - min) / (max - min)));
    return DIAL_START + DIAL_SWEEP * frac;
  }

  _pointAt(deg, r, waveOffset = 0) {
    const rad = ((deg - 90) * Math.PI) / 180;
    const rr = r + waveOffset;
    return [50 + rr * Math.cos(rad), 50 + rr * Math.sin(rad)];
  }

  /** Wavy polyline between two dial angles. The wave fades in/out over ~20°
   *  at each end so it grows smoothly out of the knobs it connects. */
  _wavePath(startDeg, endDeg, r) {
    const amp = 3.2 * this._amp;
    const pts = [];
    const step = 2;
    for (let a = startDeg; a <= endDeg; a += step) {
      const s = a - startDeg;
      const fadeIn = Math.min(1, s / 20);
      const fadeOut = Math.min(1, (endDeg - a) / 20);
      const w = amp * fadeIn * fadeOut * Math.sin(s / 7 + this._phase);
      pts.push(this._pointAt(a, r, w));
    }
    pts.push(this._pointAt(endDeg, r, 0));
    return "M" + pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L");
  }

  _arcPath(startDeg, endDeg, r) {
    const [x1, y1] = this._pointAt(startDeg, r);
    const [x2, y2] = this._pointAt(endDeg, r);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }

  /* ---- Interaction --------------------------------------------------------- */
  _setTarget(temp) {
    const { min, max } = this._scale;
    const step = this.config.step ?? 0.5;
    const clamped = Math.min(max, Math.max(min, Math.round(temp / step) * step));
    this._optimisticTemp = clamped;
    clearTimeout(this._optimisticTimer);
    this._optimisticTimer = setTimeout(() => { this._optimisticTemp = null; }, 10000);
    clearTimeout(this._sendTimer);
    this._sendTimer = setTimeout(() => {
      this._callService("climate", "set_temperature", {
        entity_id: this.config.entity,
        temperature: clamped,
      });
    }, 350);
  }

  _nudge(delta) {
    const t = this._target;
    if (t == null) return;
    this._setTarget(t + delta);
  }

  _dialPointer(e) {
    if (!this._dialDragging && e.type !== "pointerdown") return;
    const svgEl = this.renderRoot.querySelector(".dial");
    const rect = svgEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 - 50;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - 50;
    let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (deg > 180) deg -= 360;
    // Only react within the dial's sweep (leave the bottom gap dead).
    if (deg < DIAL_START - 8 || deg > DIAL_START + DIAL_SWEEP + 8) return;
    const frac = Math.min(1, Math.max(0, (deg - DIAL_START) / DIAL_SWEEP));
    const { min, max } = this._scale;
    if (e.type === "pointerdown") {
      this._dialDragging = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    this._setTarget(min + frac * (max - min));
  }

  _endDialDrag(e) {
    this._dialDragging = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  _setMode(mode) {
    this._callService("climate", "set_hvac_mode", {
      entity_id: this.config.entity,
      hvac_mode: mode,
    });
  }

  /* ---- Render --------------------------------------------------------------- */
  render() {
    if (!this.hass || !this.config) return html``;
    const stateObj = this._entity;
    if (!stateObj) return html``;
    const unavailable = this._isUnavailable(stateObj);

    const { min, max } = this._scale;
    const target = this._target;
    const current = this._current;
    const mode = this._mode;
    const action = this._waveAction;
    const meta = MODE_META[mode] || MODE_META.off;
    const active = mode !== "off" && target != null;

    const R = 42;
    const endDeg = active ? this._angleFor(target, min, max) : DIAL_START;
    const [tx, ty] = this._pointAt(endDeg, R);
    const curDeg = current != null ? this._angleFor(current, min, max) : null;
    // Sweep layout: solid accent → current knob → wavy segment → target knob
    // → gray remainder. Without a current temp, the whole sweep waves.
    let solidEnd = null;
    let waveStart = null;
    let waveEnd = null;
    if (active && action === "holding") {
      // Equilibrium: the WHOLE filled arc breathes gently.
      waveStart = DIAL_START;
      waveEnd = curDeg != null ? Math.max(curDeg, endDeg) : endDeg;
    } else if (active && curDeg != null) {
      solidEnd = Math.min(curDeg, endDeg);
      waveStart = solidEnd;
      waveEnd = Math.max(curDeg, endDeg);
    } else if (active) {
      waveStart = DIAL_START;
      waveEnd = endDeg;
    }

    // Wave/accent color follows the *action* when running, else the mode.
    const accentMeta =
      action === "heating" ? MODE_META.heat
      : action === "cooling" ? MODE_META.cool
      : meta;
    const accent = accentMeta.color;
    const accentOn = accentMeta.on;

    const modeLabel = this.hass.formatEntityState?.(stateObj) ?? mode;
    const unit = this.hass.config?.unit_system?.temperature ?? "°C";

    const modes = (this.config.hvac_modes ?? stateObj.attributes.hvac_modes ?? [])
      .filter((m) => MODE_META[m]);

    return html`
      <ha-card class="${unavailable ? "unavailable" : ""}">
        <div class="dial-wrap">
          <svg
            class="dial"
            viewBox="0 0 100 100"
            @pointerdown=${this._dialPointer}
            @pointermove=${this._dialPointer}
            @pointerup=${this._endDialDrag}
            @pointercancel=${this._endDialDrag}
          >
            ${(() => {
              // Gray track only covers the REMAINDER (past the furthest knob),
              // M3-slider style, with a small gap — never under the sweep.
              const end = DIAL_START + DIAL_SWEEP;
              const furthest = active ? Math.max(endDeg, curDeg ?? endDeg) : DIAL_START;
              const from = active ? Math.min(furthest + 8, end) : DIAL_START;
              return from < end - 0.5
                ? svg`<path d=${this._arcPath(from, end, R)} class="track" />`
                : "";
            })()}
            ${!active && curDeg != null
              ? svg`<circle
                  cx=${this._pointAt(curDeg, R)[0]} cy=${this._pointAt(curDeg, R)[1]}
                  r="1.6" class="current-dot" />`
              : ""}
            ${active && solidEnd != null && solidEnd > DIAL_START + 0.5
              ? svg`<path d=${this._arcPath(DIAL_START, solidEnd, R)} class="sweep" style="stroke:${accent}" />`
              : ""}
            ${active && waveEnd != null && waveEnd > waveStart + 0.5
              ? svg`<path d=${this._wavePath(waveStart, waveEnd, R)} class="sweep" style="stroke:${accent}" />`
              : ""}
            ${active && curDeg != null
              ? svg`<circle
                  cx=${this._pointAt(curDeg, R)[0]} cy=${this._pointAt(curDeg, R)[1]}
                  r="3.4" class="current-knob" style="fill:${accent}" />`
              : ""}
            ${active
              ? svg`<circle cx=${tx} cy=${ty} r="5" class="thumb" style="stroke:${accent}" />`
              : ""}
          </svg>
          <div class="center" @click=${() => this._fireMoreInfo(this.config.entity)}>
            <div class="mode-label">${modeLabel}</div>
            <div class="target">
              ${target != null ? target : current != null ? current : "—"}<span class="deg">${unit}</span>
            </div>
            ${current != null && this.config.show_current !== false
              ? html`<div class="current-label">${this.config.current_label ?? "Currently"} ${current}°</div>`
              : ""}
          </div>
        </div>

        <div class="nudge">
          <button class="round" @click=${() => this._nudge(-(this.config.step ?? 0.5))}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button class="round" @click=${() => this._nudge(this.config.step ?? 0.5)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        ${this.config.show_modes !== false && modes.length
          ? html`<materia-button-group
              .hass=${this.hass}
              .config=${{
                entity: this.config.entity,
                size: this.config.mode_size ?? "l",
                variant: "tonal",
                color_active: accent,
                color_on_active: accentOn,
                options: modes.map((m) => ({
                  icon: MODE_META[m].icon,
                  value: m,
                  tap_action: {
                    action: "perform-action",
                    perform_action: "climate.set_hvac_mode",
                    data: { hvac_mode: m },
                    target: { entity_id: this.config.entity },
                  },
                })),
              }}
            ></materia-button-group>`
          : ""}
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 6, rows: "auto", min_columns: 4 };
  }

  getCardSize() {
    return 5;
  }
}

customElements.define("materia-thermostat", MateriaThermostat);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-thermostat",
  name: "Materia Thermostat",
  description: "Expressive thermostat dial — the active sweep is a living wavy line that moves with heating/cooling.",
  preview: true,
});
