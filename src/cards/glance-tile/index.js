import { LitElement, html, svg, nothing } from "lit";
import { t } from "../../utils/i18n.js";
import { ActionMixin } from "../../utils/action-handler.js";
import { roundedPolygonPath } from "../../utils/shapes.js";
import { isActiveState } from "../../utils/active-state.js";
import { fetchNumericHistory, resample, segments, bucketDays, delta, withLiveSample } from "../../utils/history.js";
import { styles } from "./styles.js";
import "./editor.js";

// Severity/temperature scale — same harmonizable tokens as the weather metrics.
const SCALE = {
  blue: "var(--md-sys-cust-color-weather-rain, #5fa8f5)",
  green: "var(--md-sys-cust-color-scale-green, #5E9E50)",
  yellow: "var(--md-sys-cust-color-scale-yellow, #C7A128)",
  orange: "var(--md-sys-cust-color-scale-orange, #D9713C)",
  red: "var(--md-sys-cust-color-scale-red, #C94D42)",
};

const ACTIVE_STATES = ["on", "open", "running", "playing", "heat", "heating", "home", "true", "active"];

// hass.formatEntityState() renders through the user's PROFILE language, not
// HA's system language Materia otherwise follows — a Dutch-system/English-
// profile user saw "Cleaning" with no card config able to override it. The
// vacuum domain's states are a small fixed set (HA's vacuum integration:
// cleaning/docked/paused/idle/returning/error), so translate those words
// ourselves and fall back to formatEntityState for anything else (e.g. a
// status_entity with richer, non-enum text).
const VACUUM_STATE_KEYS = {
  cleaning: "gt_state_cleaning",
  docked: "gt_state_docked",
  paused: "gt_state_paused",
  idle: "gt_state_idle",
  returning: "gt_state_returning",
  error: "gt_state_error",
};

/** The 19b variants: these draw the measurement's recent PAST, so they need
 *  the recorder. Everything else renders from the current state alone. */
const SPARK_VARIANTS = new Set(["spark", "sparkline", "weekbars", "events"]);

/** Per-variant window defaults. Deliberately SHORT: a window longer than the
 *  recorder's retention comes back as no series at all — not a truncated one —
 *  so the concept's 14 days would render empty on the install this is for.
 *  Three days is inside the measured working range; `days` raises it where a
 *  recorder keeps more. */
const SPARK_DEFAULT_HOURS = 24;
const SPARK_DEFAULT_DAYS = 3;

/**
 * Expressive view-only sensor tile (materia-glance-tile): the weather-metric look
 * for ANY entity. One entity per card; `variant` is an explicit, required
 * category — like weather-metric's `metric` field, never inferred:
 *
 *   percent      — the square tile FILLS bottom-up with the value (humidity,
 *                  valve position, any 0–100%); humidity gets a gently
 *                  drifting liquid surface; moisture gets sweet-spot zones.
 *   battery      — value + a vertical bar, battery-tiered green→orange→red.
 *   temperature  — value + a vertical thermometer pill, colored along a
 *                  cool→comfort→warm scale (min/max configurable).
 *   power        — value + equalizer bars that light up with load (max
 *                  configurable, default 3000 W).
 *   energy       — value with a quiet bolt glyph (cumulative kWh).
 *   binary       — a MaterialShapes sunny star that slowly ROTATES while the
 *                  entity is active (pumps, motion…), still + muted when off;
 *                  the whole tile washes with the accent color when active.
 *   plain        — icon + formatted state, for everything else.
 *   vacuum       — name top-left, state right below it, current room at the
 *                  bottom while actively cleaning, battery bar on the right.
 *                  Pairs the vacuum entity with optional status_entity
 *                  (richer state text) / room_entity / battery_entity.
 *
 * THE GAUGE FAMILY. Five variants answer a question the plain square cannot:
 * seven equal tiles present 47 and 64705 as the same kind of fact, so none of
 * them says whether its number is GOOD. These spend the tile's empty half on
 * the measurement's RANGE, so the number arrives already judged.
 *
 * NONE OF THEM KNOWS WHAT IT IS MEASURING. There is no domain, device class,
 * unit or entity-id pattern in any of them: they take a value, a range, a
 * unit string to echo back and a caption the author wrote. The scale comes
 * from config, else the entity's own min/max attributes, else nothing — in
 * which case the tile draws a plain value rather than a gauge it cannot
 * calibrate. See _gauge(), which is the ONLY place a fraction is derived.
 *
 *   fill         — the tile's own background floods left-to-right to the
 *                  value fraction, with a bright 3dp edge line AT the
 *                  boundary. Reads at any aspect ratio.
 *   bar          — big value over a 6dp track, plus a caption.
 *   ladder       — N discrete bars, the first k lit, heights ramping across
 *                  the run. The `power` variant IS this renderer fed through
 *                  a compatibility adapter, not a second copy of it.
 *   ring         — circular progress BESIDE the value rather than behind it,
 *                  so the number is never read through its own gauge.
 *   status       — a wide tonal row: icon badge, state, subtitle and a dot
 *                  indicator. The one variant that is a row, not a square,
 *                  and the one that reads `active_state` rather than assuming
 *                  a fixed list of on-ish words.
 *   scale        — the value's POSITION on a ramp, with any number of
 *                  author-supplied reference marks beside it. A number only
 *                  means something next to something else. Passes no
 *                  judgement unless the author names a direction or supplies
 *                  colour stops; otherwise the ramp is a neutral track.
 *
 * View only: tap opens more-info (or any configured tap_action).
 */
class MateriaGlanceTile extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedLabel: { state: true },
    _resolvedCaption: { state: true },
    _resolvedDeltaLabel: { state: true },
    _resolvedMinLabel: { state: true },
    _resolvedMaxLabel: { state: true },
    /** The fetched series. Reactive: arriving history must repaint. */
    _hist: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-glance-tile-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("sensor.")) || "";
    return { entity, variant: "percent" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Glance Tile: entity is required");
    if (!config.variant) throw new Error("Materia Glance Tile: variant is required — pick the value category");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
      this._resolveField("label", "_resolvedLabel");
      this._resolveField("caption", "_resolvedCaption");
      this._resolveField("delta_label", "_resolvedDeltaLabel");
      this._resolveField("min_label", "_resolvedMinLabel");
      this._resolveField("max_label", "_resolvedMaxLabel");
      // Marker labels live inside a list, so they take the per-item template
      // path (same machinery materia-bars and materia-schedule use).
      (Array.isArray(this.config.markers) ? this.config.markers : []).forEach((m, i) =>
        this._resolveTemplateValue(`marker_${i}`, m?.label)
      );
      // Keyed on (entity, window), so this is one fetch per mount and one per
      // config change — not one per hass tick. The interval owns refreshing.
      this._loadHistory();
    }
  }

  /** Subtitle: literal text or a live Jinja template (e.g. battery level,
   *  current room while cleaning) — same templating every other field uses. */
  get _label() {
    return this._isTemplate(this.config.label) ? this._resolvedLabel : this.config.label;
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  get _unit() {
    return this.config.unit ?? this._stateObj?.attributes?.unit_of_measurement ?? "";
  }

  get _name() {
    return this.config.name ?? this._stateObj?.attributes?.friendly_name ?? this.config.entity;
  }

  _icon(fallback) {
    return this.config.icon || this._stateObj?.attributes?.icon || fallback;
  }

  /** The category is an explicit config choice — like weather-metric's
   *  `metric` field — never inferred from device_class/unit/domain. */
  get _variant() {
    return this.config.variant;
  }

  _fmtState() {
    const st = this._stateObj;
    return this.hass.formatEntityState?.(st) ?? st.state;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) {
      return html`<ha-card><div class="rect-tile unavailable">
        <div class="header"><ha-icon icon=${this._icon("mdi:help-circle-outline")}></ha-icon><span>${this._name}</span></div>
        <div class="sub hint">${st ? this._fmtState() : "Entity not found"}</div>
      </div></ha-card>`;
    }
    const bodies = {
      percent: () => this._percent(),
      battery: () => this._battery(),
      temperature: () => this._temperature(),
      // power is the ladder with a watts-aware scale — one implementation.
      power: () => this._ladder({ power: true }),
      ladder: () => this._ladder({}),
      fill: () => this._fill(),
      bar: () => this._bar(),
      ring: () => this._ring(),
      status: () => this._status(),
      scale: () => this._scale(),
      spark: () => this._spark({ area: true }),
      sparkline: () => this._spark({ area: false }),
      weekbars: () => this._bucketBars({ events: false }),
      events: () => this._bucketBars({ events: true }),
      energy: () => this._energy(),
      binary: () => this._binary(),
      plain: () => this._plain(),
      vacuum: () => this._vacuum(),
    };
    // A variant typo used to throw straight out of render() and blank the
    // card with no clue why; the plain tile at least shows the entity.
    const body = (bodies[this._variant] || bodies.plain)();
    const bg = this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color;
    const fg = this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on;
    // Unset `size` keeps a fixed, consistent tile width (200px) regardless of
    // grid column width, centered via auto margins — the tile should always
    // read the same size, not stretch to fill a wide section. Set size: 10
    // explicitly to opt back into filling the column.
    const sizes = ["120px", "150px", "185px", "225px", "270px", "320px", "380px", "460px", "560px", "none"];
    const size = this.config.size != null ? Math.min(10, Math.max(1, this.config.size)) : null;
    const sizeVar = size != null ? sizes[size - 1] : "200px";
    // The status ROW has no business being capped at the square tile's 200px,
    // so it reads a separate var that is only set when a size was asked for.
    const rowSize = size != null ? `--ms-size-row:${sizeVar};` : "";
    return html`
      <ha-card
        style="--ms-size:${sizeVar};${rowSize}${bg ? `--ms-color:${bg};` : ""}${fg ? `--ms-color-on:${fg};` : ""}${this.config.accent ? `--ms-accent:${this.config.accent};` : ""}"
        @click=${() => this._handleAction(this.config.tap_action || { action: "more-info", entity: this.config.entity })}
      >
        ${body}
      </ha-card>
    `;
  }

  _header(fallbackIcon) {
    return html`<div class="header"><ha-icon icon=${this._icon(fallbackIcon)}></ha-icon><span>${this._name}</span></div>`;
  }

  /** Soil moisture is a SWEET SPOT, not a monotonic scale (unlike battery) —
   *  too little AND too much are both bad, for different reasons, so they
   *  get different hues: red (critical dry) → orange (water soon) → green
   *  (optimal) → blue (overwatered). Thresholds are plant-specific and
   *  configurable; defaults suit a typical houseplant. */
  _moistureZone(v) {
    const critDry = this.config.critical_dry ?? 10;
    const dryBelow = this.config.dry_below ?? 20;
    const soggyAbove = this.config.soggy_above ?? 60;
    if (v <= critDry) return { fill: SCALE.red, status: this.config.dry_label ?? t("gt_needs_water_now", this.hass) };
    if (v <= dryBelow) return { fill: SCALE.orange, status: this.config.soon_label ?? t("gt_water_soon", this.hass) };
    if (v <= soggyAbove) return { fill: SCALE.green, status: this.config.optimal_label ?? t("gt_optimal", this.hass) };
    return { fill: SCALE.blue, status: this.config.wet_label ?? t("gt_overwatered", this.hass) };
  }

  /* ---- percent: cookie that fills with the value -------------------------- */
  _percent() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const frac = Math.min(1, Math.max(0, v / 100));
    const dc = this._stateObj.attributes.device_class;
    const isMoisture = dc === "moisture";
    // Battery drains through the severity scale; everything else stays accent.
    // Always a translucent WASH (like the weather humidity wave) — a solid
    // fill drowns the card and the text sitting in it.
    let fill = null;
    let status = null;
    if (dc === "battery") {
      fill = frac > 0.4 ? SCALE.green : frac > 0.15 ? SCALE.orange : SCALE.red;
    } else if (isMoisture) {
      const zone = this._moistureZone(v);
      fill = zone.fill;
      status = zone.status;
    } else if (dc === "humidity") {
      fill = SCALE.blue;
    }
    if (fill) fill = `color-mix(in srgb, ${fill} 30%, transparent)`;
    const y = 100 - frac * 100; // square tile: the fill level maps edge to edge
    // Liquid surface. Water-like values (humidity/moisture) get a gentle wave
    // that drifts almost imperceptibly; everything else (battery…) stays a
    // still soft dome. Deliberately calmer than the weather tile's scallops.
    const liquid = dc === "humidity" || isMoisture;
    let surface;
    if (liquid) {
      // Low sine-ish wave, period 50 — drifting by one period loops seamlessly.
      let d = `M-100 ${y.toFixed(1)}`;
      for (let x = -100; x < 100; x += 25) {
        const dip = (x / 25) % 2 === 0 ? -1.6 : 1.6;
        d += ` Q ${x + 12.5} ${(y + dip).toFixed(1)} ${x + 25} ${y.toFixed(1)}`;
      }
      surface = d + " V102 H-100 Z";
    } else {
      surface = `M-2 ${y + 2.5} Q 50 ${y - 2.5} 102 ${y + 2.5} V102 H-2 Z`;
    }
    const icon = dc === "battery" ? "mdi:battery" : isMoisture ? "mdi:sprout" : "mdi:water-percent";
    return html`
      <div class="rect-tile clip">
        <svg class="fill-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${frac > 0.005
            ? svg`<path d=${surface}
                class="level-fill ${liquid ? "drift" : ""}" style=${fill ? `fill:${fill}` : ""} />`
            : ""}
        </svg>
        <div class="overlay">
          ${this._header(icon)}
          <div class="big">${Math.round(v)}<span class="unit">%</span></div>
          ${(this._label ?? status) ? html`<div class="sub">${this._label ?? status}</div>` : ""}
        </div>
      </div>
    `;
  }

  /* ---- temperature: value + vertical thermometer pill ---------------------- */
  _tempColor(v, unit) {
    const c = unit === "°F" ? ((v - 32) * 5) / 9 : v;
    if (c < 16) return SCALE.blue;
    if (c < 23) return SCALE.green;
    if (c < 27) return SCALE.orange;
    return SCALE.red;
  }

  _temperature() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const unit = this._unit || "°C";
    const min = this.config.min ?? (unit === "°F" ? 50 : 10);
    const max = this.config.max ?? (unit === "°F" ? 86 : 30);
    const frac = Math.min(1, Math.max(0, (v - min) / (max - min)));
    const color = this._tempColor(v, unit);
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:thermometer")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(v * 10) / 10}<span class="unit">${unit}</span></div>
            ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8, frac * 100)}%;background:${color}"></i>
          </div>
        </div>
      </div>
    `;
  }

  /* ---- battery: value + the SAME vertical thermometer pill, battery-tiered
     coloring (green → orange → red) instead of temperature's cool→warm ---- */
  _batteryColor(frac) {
    return frac > 0.4 ? SCALE.green : frac > 0.15 ? SCALE.orange : SCALE.red;
  }

  _battery() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const frac = Math.min(1, Math.max(0, v / 100));
    const color = this._batteryColor(frac);
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:battery")}
        <div class="split-row">
          <div class="split-main">
            <div class="big">${Math.round(v)}<span class="unit">%</span></div>
            ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
          </div>
          <div class="thermo">
            <i style="height:${Math.max(8, frac * 100)}%;background:${color}"></i>
          </div>
        </div>
      </div>
    `;
  }

  /* ================= the gauge family (19a) =================================

     FOUR PRESENTATIONS, ONE MODEL. fill, bar, ladder and ring are the same
     abstraction: a fraction in [0,1] and a way of drawing it. _gauge() is the
     only place that fraction is derived, so a variant cannot disagree with
     another about where a value sits in its range, and adding a fifth drawing
     style costs a render method and nothing else.

     NOTHING HERE KNOWS WHAT IT IS MEASURING. No domain, no device class, no
     unit and no entity-id pattern appears in any of it. The ladder does not
     know what an amp is; the bar does not know what a kilometre is. They take
     a value, a range, a unit string to echo back, and a caption the author
     wrote. Everything that could vary by install is either config or derived
     from the entity itself. ===================================================

     Compatibility presets adapt a READING before the model sees it — the only
     place a variant may be opinionated, and only to keep a config that
     shipped earlier working. */

  /** power predates the gauge family: it normalised kW to W, defaulted to a
   *  3000 W full load and displayed W below 1 kW and kW above. All of that
   *  survives HERE, as an adapter, so 3000 is the last rung of this variant's
   *  max chain instead of a rule anyone else inherits. */
  static _POWER_PRESET = {
    adapt(raw, stateObj) {
      const u = stateObj.attributes.unit_of_measurement || "W";
      const watts = u === "kW" ? raw * 1000 : raw;
      return { value: watts, unit: watts >= 1000 ? "kW" : "W", maxDefault: 3000 };
    },
    // Returns the NUMBER to show, not a string, so the shared locale-aware
    // formatter still owns the decimal separator. The old code built the
    // string itself and so printed "1.2 kW" on a Dutch install; the digits
    // are unchanged, the separator is now the reader's.
    displayValue(watts) {
      return watts >= 1000 ? Math.round(watts / 100) / 10 : Math.round(watts);
    },
  };

  /**
   * THE model. Returns null when the scale cannot be known, and every caller
   * falls back to _plain() on null rather than invent a range and lie about
   * where the value sits in it.
   *
   * The max chain, in order, each rung only reached when the one above is
   * absent: explicit config -> the entity's own `max` attribute (number,
   * input_number and climate all publish one) -> a compatibility preset's
   * default -> 100 when the entity itself declares its unit is a percentage
   * -> nothing, so no gauge. `min` follows the same chain down to 0.
   */
  _gauge(preset = null) {
    const st = this._stateObj;
    const raw = this._num(st?.state);
    if (raw == null) return null;

    const adapted = preset?.adapt ? preset.adapt(raw, st) : {};
    const value = adapted.value ?? raw;
    const unit = adapted.unit ?? this._unit;

    const a = st.attributes || {};
    const min = this._num(this.config.min) ?? this._num(a.min) ?? adapted.minDefault ?? 0;
    // A "%" here is the ENTITY declaring its own range, not this card
    // special-casing a unit — the same reading of unit_of_measurement the
    // formatting uses. Any other unit without a max simply has no gauge.
    const max =
      this._num(this.config.max) ??
      this._num(a.max) ??
      adapted.maxDefault ??
      (unit === "%" ? 100 : null);
    if (max == null || !(max > min)) return null;

    const frac = Math.min(1, Math.max(0, (value - min) / (max - min)));
    const shown = preset?.displayValue ? preset.displayValue(value) : value;
    const g = { value, min, max, frac, unit, display: this._fmtNum(shown), accent: this._gaugeAccent(frac) };
    // The bare-scale default belongs to `bar` alone, because that is the
    // presentation the concept captioned. Everywhere else an unset caption
    // means no caption — but a caption the AUTHOR set is honoured by all four.
    g.caption = this._caption(g, this._variant === "bar");
    return g;
  }

  /** Locale-aware, unit-agnostic, and the same shape _energy() has always
   *  used: at most one decimal, trailing zeros dropped by the formatter.
   *  `precision` pins it when an author wants more or fewer. */
  _fmtNum(n) {
    const locale = this.hass?.locale?.language || "en";
    const p = this._num(this.config.precision);
    if (p != null) {
      const dp = Math.max(0, Math.min(6, Math.round(p)));
      return n.toLocaleString(locale, { minimumFractionDigits: dp, maximumFractionDigits: dp });
    }
    return (Math.round(n * 10) / 10).toLocaleString(locale);
  }

  /** Placeholders an author can put in `caption`, resolved against the model
   *  so one string works for a battery, a range or a rain gauge. */
  _interpolate(text, g, extra = null) {
    let out = String(text);
    if (g) {
      out = out
        .replaceAll("{value}", g.display)
        .replaceAll("{min}", this._fmtNum(g.min))
        .replaceAll("{max}", this._fmtNum(g.max))
        .replaceAll("{unit}", g.unit ?? "")
        .replaceAll("{percent}", String(Math.round(g.frac * 100)));
    }
    for (const [k, v] of Object.entries(extra || {})) out = out.replaceAll(`{${k}}`, String(v));
    return out;
  }

  /** The caption is the AUTHOR'S sentence, never ours. It takes the same
   *  literal-or-Jinja path label/color/color_on take, and the placeholders
   *  above, so an install writes whatever fits its entity in its own
   *  language ("van {max} vol", "{percent}% of the tank").
   *
   *  With nothing configured the default is deliberately not a sentence in
   *  anybody's language: it is the bare top of the scale, which says "out of
   *  this much" without saying it in words. */
  _caption(g, fallbackToScale) {
    const raw = this.config.caption;
    if (raw != null && raw !== "") {
      const resolved = this._isTemplate(raw) ? this._resolvedCaption : raw;
      if (resolved == null) return "";
      return this._interpolate(resolved, g);
    }
    if (!fallbackToScale) return "";
    return `${this._fmtNum(g.max)}${g.unit ? ` ${g.unit}` : ""}`;
  }

  /** The gauge's colour, as a chain rather than a rule.
   *
   *  `accent` pins it outright. `ramp` is a generic severity scale — a list
   *  of { below, color } stops in percent of the range, so ANY measurement
   *  can carry a warning colour, not only the one device class this card
   *  happened to know about. Only if neither is given does a battery fall
   *  back to the tiered ramp this card already shipped, because a battery is
   *  the reading whose COLOUR is the warning and dropping it would be a
   *  regression. That is the last rung, and it is overridable. */
  _gaugeAccent(frac) {
    if (this.config.accent) return this.config.accent;
    const ramp = this.config.ramp;
    if (Array.isArray(ramp) && ramp.length) {
      const pct = frac * 100;
      for (const stop of ramp) {
        const below = this._num(stop?.below);
        if (below == null || pct <= below) return stop?.color || "var(--md-sys-color-primary, #6750a4)";
      }
      return ramp[ramp.length - 1]?.color || "var(--md-sys-color-primary, #6750a4)";
    }
    if (this._stateObj?.attributes?.device_class === "battery") return this._batteryColor(frac);
    return "var(--md-sys-color-primary, #6750a4)";
  }

  /** The M3 step for the big number, chosen by how much of it there is:
   *  display-small for up to 3 characters, headline-large to 5, then
   *  headline-medium — so "64,705" does not have to shrink the tile. */
  _valueSizeClass(text) {
    const n = String(text).replace(/\s/g, "").length;
    return n <= 3 ? "v-display" : n <= 5 ? "v-headline" : "v-headline-sm";
  }

  /** The line under the value: the subtitle when there is one, otherwise the
   *  caption. Identical in all four presentations, so no variant grows its own
   *  idea of what belongs there. */
  _captionLine(g) {
    const text = this._label != null && this._label !== "" ? this._label : g.caption;
    return text ? html`<div class="gauge-caption">${text}</div>` : nothing;
  }

  /** The value line, identical in all four presentations. */
  _gaugeValueLine(g) {
    return html`<div class="gauge-value ${this._valueSizeClass(g.display)}">
      ${g.display}${g.unit ? html`<span class="gauge-unit">${g.unit}</span>` : nothing}
    </div>`;
  }

  /* ---- fill: the tile IS the gauge ----------------------------------------
     The flood carries its own 3dp edge line as an inset shadow on its
     trailing edge, so the bright line is the flood's last 3dp and the
     boundary lands exactly at frac x width — no second element to keep in
     step, and nothing to drift by a pixel. */
  _fill() {
    const g = this._gauge();
    if (!g) return this._plain();
    return html`
      <div class="rect-tile left clip gauge">
        <div class="flood" style="width:${(g.frac * 100).toFixed(3)}%;--g-accent:${g.accent}"></div>
        <div class="gauge-body">
          ${this._header("m3o:speed")}
          <div class="gauge-main">
            ${this._gaugeValueLine(g)}
            ${this._captionLine(g)}
          </div>
        </div>
      </div>
    `;
  }

  /* ---- bar: value over a 6dp track, captioned with the scale -------------- */
  _bar() {
    const g = this._gauge();
    if (!g) return this._plain();
    return html`
      <div class="rect-tile left gauge">
        ${this._header("m3o:speed")}
        <div class="gauge-main">
          ${this._gaugeValueLine(g)}
          <div class="track" style="--g-accent:${g.accent}">
            <i style="width:${(g.frac * 100).toFixed(3)}%"></i>
          </div>
          ${this._captionLine(g)}
        </div>
      </div>
    `;
  }

  /* ---- ladder: N bars, first k lit, heights ramping across the run --------
     ONE renderer, two entry points. `power` passes the watts-aware scale it
     always had (kW normalised, 3000 W full load, five bars, W/kW display);
     `ladder` reads the generic range like every other gauge.

     The ramp is 32% -> 100% of the ladder's height. That is not a taste
     pick: the five heights this variant shipped with ([32,48,64,82,100])
     ARE 32 + i/(N-1) x 68 to within a percent, and the concept's sixteen-bar
     run (16px rising to 50px) has the identical 16/50 = 32% floor. Two
     independent sources agreeing on one formula is what makes it the formula. */
  _ladder(opts = {}) {
    const g = this._gauge(opts.power ? MateriaGlanceTile._POWER_PRESET : null);
    if (!g) return this._plain();
    const bars = Math.max(2, Math.min(40, Math.round(this._num(this.config.bars) ?? 5)));
    // ceil, so ANY value above the floor lights the first bar and only a full
    // scale lights the last: 0 -> 0, one step -> 1, N-1 steps -> N-1, full -> N.
    const lit = Math.max(0, Math.min(bars, Math.ceil(g.frac * bars)));
    return html`
      <div class="rect-tile left gauge">
        ${this._header(opts.power ? "m3o:bolt" : "m3o:bar-chart")}
        <!-- The ladder is a BAND across the card with the value beneath it,
             not a column beside the value. Tucked into a right-hand column it
             became a small cluster bottom-right, which throws away the one
             thing a climbing ramp is for: reading "how much" from the shape
             before you read the number. -->
        <div class="ladder" style="--g-accent:${g.accent}">
          ${Array.from({ length: bars }, (_, i) => {
            const h = bars > 1 ? 32 + (i / (bars - 1)) * 68 : 100;
            return html`<i class=${i < lit ? "lit" : ""} style="height:${h.toFixed(2)}%"></i>`;
          })}
        </div>
        <div class="gauge-main">
          ${this._gaugeValueLine(g)}
          ${this._captionLine(g)}
        </div>
      </div>
    `;
  }

  /* ---- ring: circular progress BESIDE the value ---------------------------
     44-unit viewBox with a 6-wide stroke, so r = (44 - 6) / 2 = 19 and the
     stroke stays inside the box.

     THE DASH IS IN PERCENT, NOT USER UNITS, and that is a measured decision.
     The obvious arithmetic is dasharray = frac x 2*pi*r = frac x 119.381 —
     and it is wrong, because a browser renders <circle> as four cubic
     Beziers whose length is not 2*pi*r. Chrome measures this exact circle at
     getTotalLength() = 118.611, so a 47% ring drawn as 56.109 units covers
     47.3% of the real path: every ring reads about 0.65% high. pathLength=100
     hands the renderer the normalisation instead, so a dash of 47 IS 47% of
     whatever the engine's approximation actually measures — exact, and
     immune to a different engine approximating differently.

     The arc is also not rendered at all below half a percent: a zero-length
     dash with stroke-linecap:round paints a DOT in most engines, which would
     put a stray blob at twelve o'clock on every empty ring. */
  _ring() {
    const g = this._gauge();
    if (!g) return this._plain();
    const R = 19;
    const pct = g.frac * 100;
    return html`
      <div class="rect-tile left gauge">
        ${this._header("m3o:donut-large")}
        <div class="split-row">
          <div class="split-main">
            ${this._gaugeValueLine(g)}
            ${this._captionLine(g)}
          </div>
          <svg class="ring" viewBox="0 0 44 44" style="--g-accent:${g.accent}">
            <circle class="ring-track" cx="22" cy="22" r=${R}></circle>
            ${pct > 0.5
              ? svg`<circle class="ring-arc" cx="22" cy="22" r=${R} pathLength="100"
                  stroke-dasharray=${`${pct.toFixed(3)} 100`}></circle>`
              : nothing}
          </svg>
        </div>
      </div>
    `;
  }

  /** The value row — big number, unit, and an optional pill on the right.
   *  Extracted rather than inlined because it is the one piece of markup a
   *  value-plus-context variant always has, so a later variant that leads with
   *  a headline number composes with this instead of copying it. */
  _valueRow(g, trailing = nothing) {
    return html`<div class="value-row">${this._gaugeValueLine(g)}${trailing}</div>`;
  }

  /* ---- scale: where a value sits on a range it can be judged against ------
     A bare number cannot say whether it is good; 17 kWh/100km only means
     something next to a reference. So this draws the range as a ramp, the
     value as a marker on it, and any number of author-supplied reference
     marks beside it.

     NOTHING HERE DECIDES WHAT GOOD MEANS. The card will not infer a direction
     from a device class or a unit, and it does not ship an opinion:

       - `ramp` given      -> the author's own stops, painted as a gradient.
       - `good: low|high`  -> the library's severity scale, oriented that way.
       - neither           -> a NEUTRAL track. The value's position and the
                              reference marks are still shown, but the card
                              passes no judgement it was not asked for.

     That last rung is the same discipline as _gauge refusing to invent a
     scale and _caption refusing to invent a sentence. */

  /** Author stops -> a gradient. Each colour sits at the MIDPOINT of the band
   *  it governs, with the first anchored at 0% and the last at 100%, so a
   *  colour dominates its own band and the transitions fall between them. */
  _rampGradient(stops) {
    const valid = (stops || []).filter((s) => s && s.color);
    if (!valid.length) return null;
    const parts = [];
    let lo = 0;
    valid.forEach((s, i) => {
      const declared = this._num(s.below);
      const hi = declared == null ? 100 : Math.max(lo, Math.min(100, declared));
      const mid = (lo + hi) / 2;
      if (i === 0) parts.push(`${s.color} 0%`);
      parts.push(`${s.color} ${mid.toFixed(1)}%`);
      if (i === valid.length - 1) parts.push(`${s.color} 100%`);
      lo = hi;
    });
    return `linear-gradient(90deg, ${parts.join(", ")})`;
  }

  _scaleRamp() {
    const authored = this._rampGradient(this.config.ramp);
    if (authored) return authored;
    const good = String(this.config.good ?? "").toLowerCase();
    if (good !== "low" && good !== "high") return null; // neutral track
    // 55% for the middle stop is the concept's own number, and it is a real
    // one: it pushes the turn past centre so the "fine" band reads wider than
    // the "bad" one.
    const seq = good === "low" ? [SCALE.green, SCALE.yellow, SCALE.red] : [SCALE.red, SCALE.yellow, SCALE.green];
    return `linear-gradient(90deg, ${seq[0]} 0%, ${seq[1]} 55%, ${seq[2]} 100%)`;
  }

  /** Reference marks. `value` is a number OR an entity id, so an install can
   *  point one at a long-term-statistics sensor and have it move on its own.
   *  A marker with no reading does not render — null is not zero — and one
   *  outside the range clamps to the end rather than escaping the ramp. */
  _scaleMarkers(g) {
    const list = Array.isArray(this.config.markers) ? this.config.markers : [];
    const out = [];
    list.forEach((m, i) => {
      const raw = m?.value;
      let v = this._num(raw);
      if (v == null && typeof raw === "string" && raw.includes(".")) {
        v = this._num(this.hass?.states?.[raw]?.state);
      }
      if (v == null) return;
      const frac = Math.min(1, Math.max(0, (v - g.min) / (g.max - g.min)));
      const vars = { marker: this._fmtNum(v), unit: g.unit ?? "" };
      const rawLabel = m?.label;
      let label = "";
      if (rawLabel != null && rawLabel !== "") {
        label = this._isTemplate(rawLabel)
          ? this._interpolate(this._tplResults?.[`marker_${i}`] ?? "", g, vars)
          : this._interpolate(rawLabel, g, vars);
      }
      out.push({ frac, label, color: m?.color });
    });
    return out;
  }

  _endLabel(configKey, resolvedKey, fallbackValue, g) {
    const raw = this.config[configKey];
    if (raw == null || raw === "") return this._fmtNum(fallbackValue);
    const text = this._isTemplate(raw) ? this[resolvedKey] : raw;
    if (text == null) return "";
    return this._interpolate(text, g, { bound: this._fmtNum(fallbackValue), unit: g.unit ?? "" });
  }

  _scale() {
    const g = this._gauge();
    if (!g) return this._plain();
    const ramp = this._scaleRamp();
    const markers = this._scaleMarkers(g);
    const pill = this.config.show_delta ? this._deltaPill(this._histSeries) : nothing;
    const pct = (f) => `${(f * 100).toFixed(3)}%`;
    return html`
      <div class="rect-tile left gauge scale-tile">
        ${this._header("m3o:straighten")}
        ${this._valueRow(g, pill)}
        <div class="ramp" style=${ramp ? `background:${ramp}` : nothing}>
          ${markers.map(
            (m) =>
              html`<i
                class="ref"
                style="left:${pct(m.frac)}${m.color ? `;--ref-color:${m.color}` : ""}"
              ></i>`
          )}
          <i class="here" style="left:${pct(g.frac)}"></i>
        </div>
        <div class="scale-labels">
          <span class="lo">${this._endLabel("min_label", "_resolvedMinLabel", g.min, g)}</span>
          ${markers.map((m) =>
            m.label ? html`<span class="ref-label" style="left:${pct(m.frac)}">${m.label}</span>` : nothing
          )}
          <span class="hi">${this._endLabel("max_label", "_resolvedMaxLabel", g.max, g)}</span>
        </div>
      </div>
    `;
  }

  /* ---- status: a wide tonal row, not a square -----------------------------
     The one variant whose shape is a row: an icon badge, the state large
     enough to read across a room, a subtitle, and a dot indicator on the
     right. Tonal container per the M3 mapping (primary-container on
     on-primary-container), so it reads as a state rather than a measurement. */
  _status() {
    // NOT the module-level ACTIVE_STATES list the `binary` variant uses: that
    // is a fixed set of light-and-switch words, which is exactly why a sensor
    // reporting "Connected" or "Available" read as inert. active_state (a
    // string or a list) wins; with nothing configured the answer is derived
    // from the entity's DOMAIN, and "on" is only the last rung.
    const active = isActiveState(this._stateObj, this.config.active_state);
    const dots = Math.max(2, Math.min(12, Math.round(this._num(this.config.dots) ?? 4)));
    // A calibratable number turns the dots into a coarse progress read;
    // without one they are an activity indicator, dim at rest.
    const g = this._gauge();
    const filled = g ? Math.max(0, Math.min(dots, Math.ceil(g.frac * dots))) : active ? dots : 0;
    return html`
      <div class="status-row ${active ? "active" : ""}">
        <div class="status-badge">
          <ha-icon icon=${this._icon(active ? "m3o:check-circle" : "m3o:info")}></ha-icon>
        </div>
        <div class="status-main">
          <div class="status-state">${this._fmtState()}</div>
          <div class="status-sub">${this._label ?? this._name}</div>
        </div>
        <div class="status-dots ${!g && active ? "pulse" : ""}">
          ${Array.from({ length: dots }, (_, i) =>
            html`<i class=${i < filled ? "on" : ""} style="--i:${i}"></i>`
          )}
        </div>
      </div>
    `;
  }

  /* ---- energy: value + quiet bolt glyph ------------------------------------ */
  _energy() {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const locale = this.hass?.locale?.language || navigator.language || "en";
    const display = (Math.round(v * 10) / 10).toLocaleString(locale);
    return html`
      <div class="rect-tile left">
        ${this._header("mdi:lightning-bolt")}
        <div class="big">${display}<span class="unit"> ${this._unit}</span></div>
        <div class="energy-bottom">
          ${this._label ? html`<div class="sub">${this._label}</div>` : html`<span></span>`}
          <ha-icon class="glyph" icon="mdi:lightning-bolt"></ha-icon>
        </div>
      </div>
    `;
  }

  /* ---- binary: square tile; the sunny star is a corner glyph that takes
     color and slowly turns while the entity is active ----------------------- */
  _binary() {
    const active = ACTIVE_STATES.includes(this._stateObj.state);
    const sunny = roundedPolygonPath(50, 50, 46, { vertices: 8, innerRadius: 0.8, rounding: 0.15, rotate: -Math.PI / 2 });
    return html`
      <div class="rect-tile left binary ${active ? "active" : ""}">
        ${this._header("mdi:power")}
        <div class="big small-big">${this._fmtState()}</div>
        <div class="binary-bottom">
          ${this._label ? html`<div class="sub">${this._label}</div>` : html`<span></span>`}
          <svg class="binary-star" viewBox="0 0 100 100">
            <g class=${active ? "spin" : ""}><path d=${sunny} /></g>
          </svg>
        </div>
      </div>
    `;
  }

  /* ---- plain fallback -------------------------------------------------------
     Optional `battery_entity`: a SECOND entity (any device's paired battery
     sensor — locks, remotes, vacuums…) rendered as the same vertical bar
     battery/temperature use, name top-left / state in the middle / label at
     the bottom. Generic pairing, not specific to any one device type. */
  _plain() {
    const st = this._stateObj;
    const n = this._num(st.state);
    const value = n != null
      ? html`<div class="big">${Math.round(n * 10) / 10}<span class="unit"> ${this._unit}</span></div>`
      : html`<div class="big small-big">${this._fmtState()}</div>`;

    const battSt = this.config.battery_entity ? this.hass.states[this.config.battery_entity] : null;
    const battVal = battSt ? this._num(battSt.state) : null;
    if (battVal != null) {
      const frac = Math.min(1, Math.max(0, battVal / 100));
      const color = this._batteryColor(frac);
      return html`
        <div class="rect-tile left">
          ${this._header("mdi:eye-outline")}
          <div class="split-row">
            <div class="split-main">
              ${value}
              ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
            </div>
            <div class="thermo">
              <i style="height:${Math.max(8, frac * 100)}%;background:${color}"></i>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="rect-tile">
        ${this._header("mdi:eye-outline")}
        ${value}
        ${this._label ? html`<div class="sub">${this._label}</div>` : ""}
      </div>
    `;
  }

  /* ---- vacuum: name top-left, state centered, room at the bottom while
     cleaning, battery bar on the right. Pairs the vacuum entity with optional
     status_entity (richer state text) / room_entity / battery_entity — direct
     entity lookups, not templates, since the room should only show while the
     vacuum is actually cleaning. --------------------------------------------- */
  _fmtObj(stateObj) {
    return this.hass.formatEntityState?.(stateObj) ?? stateObj.state;
  }

  /** Vacuum-specific state text: our own table first, formatEntityState as
   *  fallback. See VACUUM_STATE_KEYS above for why. */
  _vacuumStateText(stateObj) {
    const key = VACUUM_STATE_KEYS[String(stateObj.state).toLowerCase()];
    return key ? t(key, this.hass) : this._fmtObj(stateObj);
  }

  _vacuum() {
    const st = this._stateObj;
    const active = st.state === "cleaning";

    const statusSt = this.config.status_entity ? this.hass.states[this.config.status_entity] : null;
    const stateText = this._vacuumStateText(statusSt ?? st);

    const roomSt = this.config.room_entity ? this.hass.states[this.config.room_entity] : null;
    const roomText = active && roomSt ? this._fmtObj(roomSt) : "";

    const battSt = this.config.battery_entity ? this.hass.states[this.config.battery_entity] : null;
    const battVal = battSt ? this._num(battSt.state) : null;
    const battFrac = battVal != null ? Math.min(1, Math.max(0, battVal / 100)) : null;
    const battColor = battFrac != null ? this._batteryColor(battFrac) : null;

    return html`
      <div class="rect-tile vacuum ${active ? "active" : ""}">
        ${this._header(this._icon("mdi:robot-vacuum"))}
        <div class="vacuum-row">
          <div class="vacuum-main">
            <div class="vacuum-state"><div class="big small-big">${stateText}</div></div>
            <div class="sub">${roomText}</div>
          </div>
          ${battFrac != null
            ? html`<div class="thermo"><i style="height:${Math.max(8, battFrac * 100)}%;background:${battColor}"></i></div>`
            : ""}
        </div>
      </div>
    `;
  }

  /* ================= the history family (19b) ==============================

     "Every number gets its past." Four presentations again, one pipeline: the
     recorder's step function -> even time buckets -> gaps kept as nulls ->
     drawn. See src/utils/history.js for why each of those steps exists.

     NOTHING HERE KNOWS WHAT IT IS PLOTTING either. No domain, no device class,
     no unit. A spark takes a series; a bucket row takes an aggregate and a day
     count. What the numbers mean is the author's business. ================== */

  /** Hours of history this variant wants. The bucketed variants think in days
   *  and the line variants in hours, but the transport only speaks hours. */
  get _histHours() {
    if (this._variant === "weekbars" || this._variant === "events") {
      const days = this._num(this.config.days) ?? SPARK_DEFAULT_DAYS;
      let wanted = Math.max(1, Math.min(90, Math.round(days)));
      // A compact row may show only the last seven days while its caption
      // answers a wider question such as "distance this month". Fetch through
      // the start of the current month, plus one preceding day so a cumulative
      // counter has a truthful boundary value to subtract from.
      if (this.config.summary_period === "current_month") {
        wanted = Math.max(wanted, new Date().getDate() + 1);
      }
      return wanted * 24;
    }
    return Math.max(1, Math.min(2160, Math.round(this._num(this.config.hours) ?? SPARK_DEFAULT_HOURS)));
  }

  /** The four 19b variants always need history. Anything else needs it only
   *  when it has asked for a delta pill — the pill is a change over a window,
   *  so it cannot exist without one, and no other variant should be costing
   *  the recorder a fetch it will not draw. */
  get _needsHistory() {
    return SPARK_VARIANTS.has(this._variant) || this.config?.show_delta === true;
  }

  /** The fetched series with the entity's live state appended — see
   *  withLiveSample for why that is a real sample and not an extrapolation.
   *  Everything that draws the past reads THIS, never `_hist` directly, so the
   *  line, the bars and the delta all agree about where the series ends. */
  get _histSeries() {
    return withLiveSample(this._hist || [], this._stateObj);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._needsHistory) return;
    // POLLED, never per hass tick. hass fires on every state change anywhere
    // in the house; one fetch per tick would hammer the recorder for a chart
    // that moves once a minute at most.
    const mins = Math.max(1, Math.min(180, Math.round(this._num(this.config?.history_refresh) ?? 5)));
    this._histTimer = setInterval(() => this._loadHistory(true), mins * 60 * 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._histTimer);
    this._histTimer = null;
  }

  /** Fetch once per (entity, window), then only on the poll tick. `_histToken`
   *  drops a reply that a later request has already superseded — otherwise a
   *  slow answer for the previous entity can land after the new one's. */
  _loadHistory(force = false) {
    if (!this._needsHistory || !this.hass || !this.config?.entity) return;
    const key = `${this.config.entity}|${this._histHours}`;
    if (!force && this._histKey === key) return;
    this._histKey = key;
    const token = (this._histToken = (this._histToken || 0) + 1);
    fetchNumericHistory(this.hass, this.config.entity, this._histHours).then((series) => {
      if (token !== this._histToken) return;
      this._hist = series;
    });
  }

  /** Signed and locale-formatted, so a rise reads as a rise. */
  _fmtSigned(n) {
    return (n >= 0 ? "+" : "") + this._fmtNum(n);
  }

  /** The delta pill: a trend glyph and a number, with the words left to the
   *  author. `delta_label` takes {delta} {delta_pct} {from} {to} {unit}
   *  {hours} {days}, so an install writes "−18% / 24u" or "18% in a day" in
   *  its own language; unset, the pill is just the signed change. */
  _deltaPill(series) {
    if (this.config.show_delta === false) return nothing;
    const d = delta(series);
    if (!d) return nothing;
    const unit = this._unit;
    const vars = {
      delta: this._fmtSigned(d.abs) + (unit ? ` ${unit}` : ""),
      delta_pct: d.pct == null ? "" : `${this._fmtSigned(d.pct)}%`,
      from: this._fmtNum(d.from),
      to: this._fmtNum(d.to),
      unit,
      hours: String(this._histHours),
      days: String(Math.round(this._histHours / 24)),
    };
    const raw = this.config.delta_label;
    const text =
      raw != null && raw !== ""
        ? this._interpolate(this._isTemplate(raw) ? this._resolvedDeltaLabel : raw, null, vars)
        : vars.delta;
    if (text == null || text === "") return nothing;
    const glyph = d.abs > 0 ? "m3o:trending-up" : d.abs < 0 ? "m3o:trending-down" : "m3o:trending-flat";
    return html`<div class="delta-pill">
      <ha-icon icon=${glyph}></ha-icon><span>${text}</span>
    </div>`;
  }

  /**
   * Build one SVG path per unbroken run. The scale spans the whole series so
   * runs share it, and `pad` keeps the stroke's own width inside the box.
   *
   * A flat series has no range to normalise against; it draws down the middle
   * rather than dividing by zero and vanishing.
   */
  _sparkPaths(points, w, h, pad) {
    const known = points.filter((p) => p.v != null).map((p) => p.v);
    if (!known.length) return [];
    const lo = Math.min(...known);
    const hi = Math.max(...known);
    const span = hi - lo;
    const inner = h - 2 * pad;
    const n = points.length;
    const xAt = (i) => (n > 1 ? (i / (n - 1)) * w : w / 2);
    const yAt = (v) => (span === 0 ? pad + inner / 2 : pad + (1 - (v - lo) / span) * inner);

    const out = [];
    for (const run of segments(points)) {
      const idx = run.map((p) => points.indexOf(p));
      let d = "";
      run.forEach((p, k) => {
        d += `${k === 0 ? "M" : " L"}${xAt(idx[k]).toFixed(2)} ${yAt(p.v).toFixed(2)}`;
      });
      // A single-sample run is a dot, not a line: give it a hairline segment
      // so a round linecap actually paints something.
      if (run.length === 1) d += ` L${(xAt(idx[0]) + 0.01).toFixed(2)} ${yAt(run[0].v).toFixed(2)}`;
      const x0 = xAt(idx[0]);
      const x1 = xAt(idx[idx.length - 1]);
      // Each run closes its OWN area to the baseline, so a gap is a gap in the
      // fill too rather than a wedge spanning the outage.
      out.push({ line: d, area: `${d} L${x1.toFixed(2)} ${h} L${x0.toFixed(2)} ${h} Z` });
    }
    return out;
  }

  /* ---- spark / sparkline --------------------------------------------------
     Concept geometry: the hero's area+line is a 340x60 viewBox stretched with
     preserveAspectRatio=none so it bleeds to the card's bottom edge, area at
     14% of the accent, line at 2.5 with round caps, pad 6. The bare line is
     120x26 at stroke 2 — pad 3, which is the same tenth-of-the-height the
     hero's 6-of-60 works out to. */
  _spark(opts) {
    const v = this._num(this._stateObj.state);
    if (v == null) return this._plain();
    const g = this._gauge();
    const accent = g ? g.accent : this._gaugeAccent(1);
    const series = this._histSeries;
    const pts = resample(series, this._num(this.config.points) ?? 48, this._histHours);
    const W = opts.area ? 340 : 120;
    const H = opts.area ? 60 : 26;
    const paths = this._sparkPaths(pts, W, H, opts.area ? 6 : 3);
    const display = this._fmtNum(v);
    const caption = this.config.caption
      ? this._interpolate(
          this._isTemplate(this.config.caption) ? this._resolvedCaption ?? "" : this.config.caption,
          g,
          { hours: String(this._histHours), days: String(Math.round(this._histHours / 24)) }
        )
      : this._label ?? "";

    // No history is a first-class layout, not a hole: the tile is simply a
    // value tile, sized by its content, with nothing reserved for a chart
    // that is not coming.
    const chart = paths.length
      ? html`<svg
          class=${opts.area ? "spark spark-area" : "spark spark-line"}
          viewBox="0 0 ${W} ${H}"
          preserveAspectRatio="none"
          style="--g-accent:${accent}"
        >
          ${opts.area
            ? paths.map((p) => svg`<path class="spark-fill" d=${p.area}></path>`)
            : nothing}
          ${paths.map((p) => svg`<path class="spark-stroke" d=${p.line}></path>`)}
        </svg>`
      : nothing;

    return html`
      <div
        class="rect-tile left gauge spark-tile ${opts.area ? "spark-bleed" : ""} ${paths.length
          ? "has-spark"
          : ""}"
      >
        <!-- The bled chart goes FIRST so the text paints over it in DOM order,
             rather than needing a z-index to undo a later sibling. -->
        ${opts.area ? chart : nothing}
        <div class="spark-head">
          ${this._header("m3o:show-chart")}
          ${opts.area ? this._deltaPill(series) : nothing}
        </div>
        ${this._valueRow({ display, unit: this._unit })}
        ${!opts.area ? chart : nothing}
        ${caption ? html`<div class="gauge-caption">${caption}</div>` : nothing}
      </div>
    `;
  }

  /* ---- weekbars / events -------------------------------------------------
     Concept geometry: seven bars in a 34px row, gap 4, radius 3/3/2/2, height
     max(6, v/vmax*34) so an idle day is a visible stub; the CURRENT bucket is
     the full accent and the rest 32% of it. Event ticks are the same idea at
     32px with gap 3 and radius 2, where a zero day is a 6px stub at 18%.

     A day with NO DATA is not drawn at all — bucketDays omits it — so an
     out-of-retention day is absent while an idle day is a stub. Those are
     different facts and the row says which is which. */
  _bucketBars(opts) {
    const series = this._histSeries;
    const days = this._num(this.config.days) ?? SPARK_DEFAULT_DAYS;
    // delta is the default because "how much happened that day" is what a bar
    // per day means for the counters these were drawn for; mean/max/sum/count
    // are there for measurements.
    const aggregate = this.config.aggregate || "delta";
    const buckets = bucketDays(series, { days, aggregate });
    const g = this._gauge();
    const accent = g ? g.accent : this._gaugeAccent(1);
    const vmax = Math.max(...buckets.map((b) => Math.max(0, b.v)), 0);
    const H = opts.events ? 32 : 34;

    const row = buckets.length
      ? html`<div class=${opts.events ? "ticks" : "weekbars"} style="--g-accent:${accent}">
          ${buckets.map((b, i) => {
            const val = Math.max(0, b.v);
            const zero = val <= 0;
            // 6px floor from the concept: an empty bucket must still be
            // visible, or "nothing happened" looks like "no bar drawn".
            const h = zero || vmax <= 0 ? 6 : Math.max(6, (val / vmax) * H);
            const cls = opts.events
              ? zero
                ? "stub"
                : "on"
              : i === buckets.length - 1
                ? "current"
                : "past";
            return html`<i class=${cls} style="height:${h.toFixed(1)}px"></i>`;
          })}
        </div>`
      : nothing;

    const capVars = {
      value: this._fmtNum(this._num(this._stateObj.state)),
      unit: this._unit,
      hours: String(this._histHours),
      // `days` describes the bars, not the potentially wider summary fetch.
      days: String(Math.round(days)),
      buckets: String(buckets.length),
    };
    if (this.config.summary_period === "current_month") {
      const start = new Date();
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      const before = [...series].reverse().find((p) => p.v != null && p.t < start.getTime());
      const during = series.filter((p) => p.v != null && p.t >= start.getTime());
      const summary = delta(before ? [before, ...during] : during);
      capVars.summary_delta = summary ? this._fmtNum(Math.abs(summary.abs)) : "";
      capVars.summary_delta_signed = summary ? this._fmtSigned(summary.abs) : "";
      capVars.summary_delta_pct = summary?.pct == null ? "" : `${this._fmtSigned(summary.pct)}%`;
      capVars.summary_period = "current_month";
    }
    const caption = this.config.caption
      ? this._interpolate(
          this._isTemplate(this.config.caption) ? this._resolvedCaption ?? "" : this.config.caption,
          g,
          capVars
        )
      : this._label ?? "";

    if (opts.events) {
      // The concept's tonal session row: title, ticks, caption. No big number
      // — this presentation is about the pattern, not the current reading.
      return html`
        <div class="event-row">
          <div class="event-title">${this._name}</div>
          ${row}
          ${caption ? html`<div class="gauge-caption">${caption}</div>` : nothing}
        </div>
      `;
    }

    const v = this._num(this._stateObj.state);
    return html`
      <div class="rect-tile left gauge">
        ${this._header("m3o:bar-chart")}
        <div class="gauge-main">
          ${v != null ? this._gaugeValueLine({ display: this._fmtNum(v), unit: this._unit }) : nothing}
          ${row}
          ${caption ? html`<div class="gauge-caption">${caption}</div>` : nothing}
        </div>
      </div>
    `;
  }

  /** A starting hint only — the dashboard owns layout. Every variant is built
   *  to read at 6 and at 12 columns; the two ROW presentations start wide
   *  because squeezing a row into a third of the grid wastes it. */
  getGridOptions() {
    if (this._variant === "status" || this._variant === "events") {
      return { columns: 12, rows: "auto", min_columns: 6 };
    }
    if (this._variant === "spark") return { columns: 12, rows: "auto", min_columns: 4 };
    return { columns: 4, rows: "auto", min_columns: 3 };
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("materia-glance-tile", MateriaGlanceTile);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-glance-tile",
  name: "Materia Glance Tile",
  description: "Expressive view-only sensor tile — percent fill, thermometer, power bars, spinning pump star, and a graceful fallback.",
  preview: true,
});
