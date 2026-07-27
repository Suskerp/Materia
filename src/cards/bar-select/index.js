import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Ascending-bar level picker (materia-bar-select): a label, the current value,
 * and a row of climbing bars you tap to set a level. Bars at or below the
 * current option are lit, so the shape itself reads as "how much".
 *
 * The read side mirrors materia-button-group: either an entity's state
 * (select / input_select) or an `attribute`, whose choices come from HA's
 * `<attribute>_list` convention (a vacuum's fan_speed_list, say). The write
 * side is inferred from the same pair — select_option for selects,
 * vacuum.set_fan_speed for a vacuum's fan speed — and `service` /
 * `service_key` override it for anything unusual.
 *
 * `off_option` lifts one choice (a mop's "off") out of the bars into its own
 * round button, since "off" isn't a rung on the ladder.
 */
class MateriaBarSelect extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedAccent: { state: true },
    _resolvedAccentOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-bar-select-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("select.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Bar Select: entity is required");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("accent", "_resolvedAccent");
      this._resolveField("accent_on", "_resolvedAccentOn");
    }
    // Recorded AFTER paint so the next change can tell which direction it
    // travelled and stagger accordingly. Plain field, not reactive state —
    // it must not itself trigger a re-render.
    const idx = this._index;
    if (this._prevIndex != null && idx !== this._prevIndex) {
      this._choreograph(this._prevIndex, idx);
    }
    this._prevIndex = idx;
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  /** Rungs (the off choice lives in its own button, never on the ladder). */
  get _rungs() {
    const off = this.config.off_option != null ? String(this.config.off_option) : null;
    return this._options.filter((o) => off == null || o !== off);
  }

  get _index() {
    return this._rungs.indexOf(String(this._current));
  }

  /** Current value — an attribute when configured, else the state. */
  get _current() {
    const st = this._stateObj;
    if (!st) return null;
    const v = this.config.attribute ? st.attributes?.[this.config.attribute] : st.state;
    return v == null ? null : String(v);
  }

  /** Choices: explicit config, else the attribute's `_list`, else the
   *  entity's own `options` (the select domain's convention). */
  get _options() {
    if (this.config.options?.length) return this.config.options.map(String);
    const st = this._stateObj;
    if (!st) return [];
    if (this.config.attribute) {
      const list = st.attributes?.[`${this.config.attribute}_list`];
      if (Array.isArray(list)) return list.map(String);
      return [];
    }
    const opts = st.attributes?.options;
    return Array.isArray(opts) ? opts.map(String) : [];
  }

  /** Pretty-print a raw option ("max_plus" → "Max plus"). */
  _fmt(option) {
    const st = this._stateObj;
    // Let HA localize the real state; fall back to de-slugging the raw value.
    if (!this.config.attribute && st && String(st.state) === String(option)) {
      const localized = this.hass.formatEntityState?.(st);
      if (localized) return localized;
    }
    const s = String(option).replace(/[_-]+/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  _set(option) {
    const st = this._stateObj;
    if (!st) return;
    const domain = st.entity_id.split(".")[0];
    this._fireHaptic?.("light");

    // Explicit override wins.
    if (this.config.service) {
      const [d, s] = String(this.config.service).split(".");
      const key = this.config.service_key || this.config.attribute || "option";
      this._callService(d, s, { entity_id: st.entity_id, [key]: option });
      return;
    }
    if (this.config.attribute) {
      // HA's setter convention for attribute-backed lists.
      const key = this.config.attribute;
      this._callService(domain, `set_${key}`, { entity_id: st.entity_id, [key]: option });
      return;
    }
    if (domain === "select" || domain === "input_select") {
      this._callService(domain, "select_option", { entity_id: st.entity_id, option });
    }
  }

  /** The pop, driven imperatively so BOTH directions get a real gesture.
   *
   *  A CSS transition can only interpolate between two values, so growing read
   *  as a pop (the springy curve overshoots past scaleY(1)) while shrinking was
   *  a ~3px fade with nothing to overshoot into. Keyframes give the downward
   *  move its own dip below rest, and the Web Animations API restarts cleanly
   *  on every change — which a CSS class toggle does not. */
  _choreograph(prev, idx) {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const bars = Array.from(this.shadowRoot?.querySelectorAll(".bar") || []);
    if (!bars.length) return;

    const rising = idx > prev;
    const changed = [];
    for (let i = Math.min(prev, idx) + 1; i <= Math.max(prev, idx); i++) {
      if (bars[i]) changed.push(bars[i]);
    }
    // Sequence follows the direction of travel: outward when raising, back
    // inward when lowering.
    const order = rising ? changed : changed.reverse();

    const frames = rising
      ? [{ transform: "scaleY(0.94)" }, { transform: "scaleY(1.07)", offset: 0.5 }, { transform: "scaleY(1)" }]
      : [{ transform: "scaleY(1)" }, { transform: "scaleY(0.84)", offset: 0.5 }, { transform: "scaleY(0.94)" }];

    order.forEach((el, n) => {
      el.animate(frames, {
        duration: 300,
        delay: n * 45,
        // Springy on the way up, settling on the way down.
        easing: rising ? "cubic-bezier(.2,1.5,.3,1)" : "cubic-bezier(.3,0,.2,1)",
        // fill:none so CSS owns the resting state once the gesture finishes.
        fill: "none",
      });
    });
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) {
      return html`<ha-card><div class="tile unavailable">
        <div class="meta"><span class="label">${this.config.label ?? this.config.entity}</span>
        <span class="value">—</span></div>
      </div></ha-card>`;
    }

    const accent = (this._isTemplate(this.config.accent) ? this._resolvedAccent : this.config.accent)
      || "var(--md-sys-cust-color-device, var(--md-sys-color-primary))";
    // Foreground for anything sitting ON the accent (the off button's glyph).
    // A caller-supplied accent has no knowable paired "on" colour, so this is
    // configurable and defaults to the on-primary role, which reads against
    // the saturated *-accent tokens these bars are usually given.
    const accentOn = (this._isTemplate(this.config.accent_on) ? this._resolvedAccentOn : this.config.accent_on)
      || "var(--md-sys-color-on-primary, #fff)";

    const current = this._current;
    const off = this.config.off_option != null ? String(this.config.off_option) : null;
    const isOff = off != null && current === off;
    const rungs = this._rungs;
    const idx = this._index;
    const n = rungs.length;

    // M3 choreography: the bars that actually changed animate in sequence
    // rather than together, and the sequence runs the way the value moved —
    // outward when raising, back inward when lowering. Bars that didn't
    // change get no delay, so nothing lags for no reason.
    const prev = this._prevIndex == null ? idx : this._prevIndex;
    const dir = idx > prev ? 1 : idx < prev ? -1 : 0;
    const STAGGER = 45;
    const delayFor = (i) => {
      if (dir > 0) return i > prev && i <= idx ? (i - prev - 1) * STAGGER : 0;
      if (dir < 0) return i > idx && i <= prev ? (prev - i) * STAGGER : 0;
      return 0;
    };

    const label = this.config.label ?? st.attributes?.friendly_name ?? this.config.entity;

    return html`
      <ha-card style="--bs-accent:${accent};--bs-accent-on:${accentOn};">
        <div class="tile">
          <div class="meta">
            <span class="label">${label}</span>
            <span class="value">${current == null ? "—" : this._fmt(current)}</span>
          </div>

          ${off != null
            ? html`<button
                class="off ${isOff ? "on" : ""}"
                @click=${() => this._set(off)}
                aria-pressed=${isOff ? "true" : "false"}
                title=${this._fmt(off)}
              >
                <ha-icon .icon=${this.config.off_icon ?? "mdi:water-off"}></ha-icon>
              </button>`
            : nothing}

          <div class="bars">
            ${rungs.map((option, i) => {
              // Climb from a third of the height to full across the row, so the
              // ladder reads the same at any number of choices.
              const h = n > 1 ? 34 + (i * 66) / (n - 1) : 100;
              return html`<button
                class="bar ${idx >= i ? "lit" : ""}"
                style="height:${h}%;transition-delay:${delayFor(i)}ms"
                @click=${() => this._set(option)}
                aria-pressed=${idx === i ? "true" : "false"}
                title=${this._fmt(option)}
              ></button>`;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-bar-select", MateriaBarSelect);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-bar-select",
  name: "Materia Bar Select",
  description: "Tap-a-bar level picker — climbing bars for fan speeds, mop levels, any ordered select.",
  preview: true,
});
