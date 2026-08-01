import { LitElement, html, nothing, css } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { softBurstPath, liveBurstPath } from "../../utils/shapes.js";
import { HeroShellMixin, heroShellStyles as styles } from "../hero/shell.js";
import { CAPABILITY_KEYS, CONSUMABLE_KEYS, profileFor } from "./profiles.js";
import { explainConsumable, explainError } from "./explanations.js";
import "./editor.js";

/* Constant geometry, once at module load — see the same note in hero/shell.js. */
const BURST_CALM = softBurstPath(90, 90, 86);
const BURST_LIVE = liveBurstPath(90, 90, 86);

/**
 * Robot-vacuum hero (materia-vacuum-hero) — the vacuum-aware counterpart to
 * materia-hero, which had to be driven by a wall of Jinja in the dashboard.
 * Everything the templates were doing badly now lives here:
 *
 *  - WORKING is defined by NEGATION. Enumerating working states is hopeless (the
 *    Qrevo reports 40+, and segment_cleaning / going_to_wash_the_mop /
 *    washing_the_mop / emptying_the_bin / returning_home are all work), so the
 *    card lists the small idle set and treats everything else as active.
 *  - TIME LEFT is derived, not guessed: elapsed x (100 - progress) / progress.
 *    A rooms-times-a-constant estimate never changes as the job proceeds.
 *  - MOP DRYING and low CONSUMABLES surface on their own, so a "clean the
 *    sensors" warning can't sit invisible in the device page.
 *
 * Entities are discovered through the vacuum's DEVICE and matched by keyword,
 * not by string-prefixing the entity id — that survives renames, and it is what
 * lets one card serve Roborock (`_status`, `_time_left`) and Ecovacs
 * (`_work_mode`, `_lifespan`, and `_batterij` on a Dutch install) alike. Every
 * capability can be pinned explicitly when discovery guesses wrong.
 */
class MateriaVacuumHero extends HeroShellMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = [
    styles,
    /* The burst MORPHS between poses, like a toggle button's round-square
       shape change: the slow spin alone was invisible as a state cue (a mop
       wash went unnoticed). Both endpoints ride custom properties set inline
       in render — this rule lives HERE and not in the shared hero styles
       because materia-hero never defines the vars, and an unresolvable var()
       would compute d to none and erase its burst entirely. The attribute d
       stays the calm pose, so engines without the CSS d property keep a
       correct static shape and simply skip the morph. */
    css`
      .burst .drift path {
        d: var(--mh-calm-d);
        transition: d var(--md-sys-motion-expressive-default-spatial);
      }

      .burst.working .drift path {
        d: var(--mh-live-d);
      }

      @media (prefers-reduced-motion: reduce) {
        .burst .drift path {
          transition: none;
        }
      }
    `,
  ];

  static getConfigElement() {
    return document.createElement("materia-vacuum-hero-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("vacuum.")) || "";
    return { entity, brand: "roborock" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Vacuum Hero: entity is required");
    this.config = { brand: "roborock", ...config };
    this._discovered = null;
  }

  updated(changedProps) {
    if (changedProps.has("config")) this._discovered = null;
    if (changedProps.has("hass") && this.hass) {
      // Appended alerts resolve templates like materia-hero's do — a schedule
      // strip has to render a live "next run" without a helper per string.
      (this.config.alerts || []).forEach((a, i) => {
        if (a.text != null) this._resolveTemplateValue("alertText" + i, a.text);
      });
    }
  }

  get _profile() {
    return profileFor(this.config.brand);
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  /** Entity ids belonging to the same MACHINE as the vacuum.
   *
   *  Device scoping alone is not enough: the Qrevo Pro registers its dock as
   *  a SECOND device with via_device unset, so everything on it — dock error,
   *  mop drying, both water boxes, two consumables and their reset buttons —
   *  was invisible to discovery. The frontend's slim entity registry doesn't
   *  reliably expose config_entry_id to group by, so the dock is picked up by
   *  the vacuum's own object-id prefix (sensor.roborock_qrevo_pro_dock_* for
   *  vacuum.roborock_qrevo_pro), which holds across brands and both installs.
   *  Known edge: a fleet whose ids prefix each other (a "qrevo" AND a
   *  "qrevo_pro") would cross-match; explicit *_entity config remains the
   *  escape hatch, as ever. */
  _siblings() {
    const reg = this.hass?.entities?.[this.config.entity];
    if (!reg) return [];
    const devId = reg.device_id;
    const root = this.config.entity.split(".")[1] + "_";
    return Object.values(this.hass.entities)
      .filter((e) =>
        !e.disabled_by && !e.hidden_by &&
        ((devId && e.device_id === devId) || e.entity_id.split(".")[1].startsWith(root)))
      .map((e) => e.entity_id);
  }

  /** Resolve every capability once per config/hass-device change. */
  get _caps() {
    if (this._discovered) return this._discovered;
    const sibs = this._siblings();
    // Never CACHE an empty discovery: if this runs before hass.entities has
    // the vacuum's device, an all-null capability set would stick until the
    // next config edit — no battery, no progress, no alerts. Recompute until
    // the registry answers. (Explicit config still resolves below.)
    const cacheable = sibs.length > 0;
    const pick = (keys, domains) => {
      for (const key of keys) {
        const hit = sibs.find((id) => {
          if (domains && !domains.includes(id.split(".")[0])) return false;
          return id.split(".")[1].endsWith(key) || id.split(".")[1].includes(key);
        });
        if (hit) return hit;
      }
      return null;
    };

    const caps = {};
    for (const [cap, keys] of Object.entries(CAPABILITY_KEYS)) {
      // Explicit config always wins over discovery.
      caps[cap] = this.config[`${cap}_entity`] ?? pick(keys, ["sensor", "binary_sensor"]);
    }
    caps.consumables = this.config.consumable_entities
      ?? sibs.filter((id) => id.startsWith("sensor.") && CONSUMABLE_KEYS.some((k) => id.includes(k)));
    if (cacheable) this._discovered = caps;
    return caps;
  }

  _num(v) {
    if (v == null || v === "" || v === "unknown" || v === "unavailable") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  _stateOf(id) {
    if (!id) return null;
    const st = this.hass?.states[id];
    return st && !this._isUnavailable(st) ? st.state : null;
  }

  _numOf(id) {
    return this._num(this._stateOf(id));
  }

  get _idleStates() {
    return (this.config.idle_states ?? this._profile.idle_states).map((s) => String(s).toLowerCase());
  }

  /** Working = NOT idle. See the class note on why this is negated. */
  get _working() {
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) return false;
    // Prefer the richer status sensor when present; fall back to the vacuum.
    const s = String(this._stateOf(this._caps.status) ?? st.state).toLowerCase();
    return !this._idleStates.includes(s);
  }

  get _drying() {
    return this._stateOf(this._caps.mop_drying) === "on";
  }

  /** States that are BUSY but have no completion figure.
   *
   *  `_working` is defined by negation, which is right for "is it doing
   *  something" but wrong for "how far through the job is it". Returning home,
   *  emptying the bin and washing or drying the mop are all work, and Roborock
   *  reports progress 0 during them — so the headline read a confident "0% done"
   *  while the machine was on its way back to the dock. Matched on keywords
   *  rather than an enumerated list, for the same reason the idle set is: the
   *  Qrevo alone reports 40-odd statuses.
   *
   *  `wash` and `dry` deliberately come BEFORE any mop matching, or
   *  going_to_wash_the_mop would look like mopping. */
  get _hasProgress() {
    const s = String(this._stateOf(this._caps.status) ?? this._stateObj?.state ?? "").toLowerCase();
    const skip = this.config.no_progress_states
      ?? ["return", "empty", "wash", "dry", "charg", "dock", "locat", "seek", "idle"];
    return !skip.some((w) => s.includes(w));
  }

  /** Minutes remaining, derived from elapsed time and percent complete.
   *
   *  The elapsed reading is UNIT-AWARE. It used to guess — "minutes on Roborock,
   *  seconds if it looks too large (>600)" — and the Qrevo reports SECONDS, so a
   *  131s run was read as 131 minutes and the card promised "about 736 min left".
   *  The unit is on the sensor; there is no need to infer it. Same normalisation
   *  the consumables already do.
   *
   *  Unknown unit falls back to seconds, which is what every duration sensor seen
   *  on these devices actually reports. */
  get _minutesLeft() {
    const p = this._numOf(this._caps.progress);
    if (p == null || p <= 0 || p >= 100) return null;

    const id = this._caps.cleaning_time;
    const elapsed = this._numOf(id);
    if (elapsed == null || elapsed <= 0) return null;

    const unit = String(this.hass?.states[id]?.attributes?.unit_of_measurement ?? "").toLowerCase();
    const TO_MIN = { s: 1 / 60, sec: 1 / 60, secs: 1 / 60, seconds: 1 / 60, min: 1, mins: 1, minutes: 1, h: 60, hr: 60, hours: 60 };
    const mins = elapsed * (TO_MIN[unit] ?? 1 / 60);

    const left = Math.round((mins * (100 - p)) / p);
    // Very early in a run the extrapolation is mostly noise; a 6% sample can
    // imply anything. Better to say nothing than to state a wrong number
    // confidently.
    const floor = this.config.eta_min_progress ?? 5;
    if (p < floor) return null;
    return Math.max(1, left);
  }

  _pretty(s) {
    if (s == null) return null;
    const t = String(s).replace(/[_-]+/g, " ").trim();
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  /** The reset button that clears a given consumable, if the device has one.
   *
   *  Roborock exposes button.*_reset_sensor_consumable and friends; Ecovacs
   *  button.*_reset_filter_lifespan. Paired by part keyword so both work.
   *  Order matters: the specific two-word parts must be tested before anything
   *  that could substring-match them. */
  _resetButtonFor(consumableId) {
    const PARTS = ["main_brush", "side_brush", "maintenance_brush", "strainer", "filter", "sensor", "mop"];
    const part = PARTS.find((pt) => consumableId.includes(pt));
    if (!part) return null;
    return this._siblings().find(
      (id) => id.startsWith("button.") && id.includes("reset") && id.includes(part)
    ) ?? null;
  }

  /** Consumables due soon.
   *
   *  Duration sensors are unit-aware: Roborock reports SECONDS, so a bare
   *  "<= 0" rule left a strainer sitting at 60s silent when it was plainly due.
   *  Everything is normalised to hours and compared against one window.
   *  Percentage lifespans (Ecovacs) use their own threshold. */
  _lowConsumables() {
    const hoursLimit = this.config.consumable_hours ?? 1;
    const pctLimit = this.config.consumable_percent ?? 5;
    const TO_HOURS = { s: 1 / 3600, sec: 1 / 3600, seconds: 1 / 3600, min: 1 / 60, minutes: 1 / 60, h: 1, hours: 1, d: 24 };
    return (this._caps.consumables || []).filter((id) => {
      const v = this._numOf(id);
      if (v == null) return false;
      const unit = String(this.hass.states[id]?.attributes?.unit_of_measurement ?? "").toLowerCase();
      if (unit === "%") return v <= pctLimit;
      const factor = TO_HOURS[unit] ?? 1;
      return v * factor <= hoursLimit;
    });
  }

  /** Ordered alerts: worst first, then anything the user appended. */
  get _alerts() {
    const c = this._caps;
    const err = (id, icon, label) => {
      const v = this._stateOf(id);
      if (v == null || ["none", "ok", "off", "no_error", "0"].includes(String(v).toLowerCase())) return null;
      // Say what to DO. An unmatched code still shows its raw value rather than
      // being hidden, so anything unknown stays visible and reportable.
      const how = explainError(v, this.hass.locale?.language);
      return {
        icon,
        text: how ? `${label}: ${how}` : `${label}: ${this._pretty(v)}`,
        severity: "error",
        entity: id,
      };
    };
    const flag = (id, icon, text, severity) =>
      this._stateOf(id) === "on" ? { icon, text, severity, entity: id } : null;

    const list = [
      err(c.error, "mdi:robot-vacuum-alert", this.config.error_label ?? "Vacuum error"),
      err(c.dock_error, "mdi:home-alert-outline", this.config.dock_error_label ?? "Dock error"),
      flag(c.water_shortage, "mdi:water-alert-outline", "Water shortage - cannot mop", "error"),
      flag(c.clean_water, "mdi:water-outline", "Clean water tank needs refilling", "warning"),
      flag(c.dirty_water, "mdi:water-off-outline", "Dirty water tank needs emptying", "warning"),
      ...this._lowConsumables().map((id) => ({
        icon: "mdi:wrench-outline",
        text: explainConsumable(id, this.hass.locale?.language)
          ?? `${this.hass.states[id]?.attributes?.friendly_name ?? id} needs attention`,
        severity: "warning",
        entity: id,
        // Once you've done the chore, clearing the counter is the next thing
        // you want — so offer it inline rather than sending you to the device.
        reset: this._resetButtonFor(id),
      })),
      ...(this.config.alerts || []).map((a, i) => {
        const raw = a.text != null && this._isTemplate(a.text)
          ? this._tplResults?.["alertText" + i]
          : a.text;
        const text = raw == null ? "" : String(raw).trim();
        // materia-hero's semantics: a templated entry that renders EMPTY is a
        // condition that is not met — skipped, not shown as a blank strip.
        if (a.text != null && text.length === 0) return null;
        return { ...a, text };
      }),
    ].filter(Boolean);
    return list;
  }

  /** Severity is a difference in EMPHASIS, per M3, not only in hue — which
   *  matters when hue alone may not be distinguishable.
   *
   *  error   -> the SOLID error role. Highest emphasis, the way a filled button
   *             outranks a tonal one. Fix this now.
   *  warning -> a tonal container. Present, legible, ignorable. */
  _severityPair(sev) {
    if (sev === "warning") {
      return [
        "var(--md-sys-cust-color-warning-container)",
        "var(--md-sys-cust-color-on-warning-container)",
      ];
    }
    return [
      "var(--md-sys-cust-color-error, var(--md-sys-color-error))",
      "var(--md-sys-cust-color-on-error, var(--md-sys-color-on-error))",
    ];
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    if (!st) {
      // A RESUMED APP briefly has no states at all while the websocket
      // reconnects. Collapsing to this one-line card and springing back is the
      // "card resizes when you come back to it" jump: the hero loses its numeral,
      // its sub-line and its alert strip, then regains them a moment later.
      //
      // So a transient miss keeps the last good layout, greyed by the existing
      // unavailable styling. Only an entity that was NEVER there gets the short
      // card, because then there is no layout to preserve and the message is the
      // whole point.
      if (this._lastGood) {
        const g = this._lastGood;
        return html`
          <ha-card class="unavailable" style="--mh-bg:${g.bg};--mh-fg:${g.fg};">
            <div class="stack"><div class="hero">
              <div class="content">
                <div class="eyebrow"><ha-icon .icon=${g.icon}></ha-icon><span>${g.name}</span></div>
                <div class="title">${g.title}</div>
                ${g.value != null
                  ? html`<div class="figure">
                      <span class="value">${g.value}</span><span class="unit">%</span>
                      <span class="caption">${g.caption}</span>
                    </div>`
                  : nothing}
                ${g.secondary ? html`<div class="secondary">${g.secondary}</div>` : nothing}
              </div>
            </div></div>
          </ha-card>`;
      }
      return html`<ha-card><div class="stack"><div class="hero">
        <div class="content"><div class="title">Entity not found</div></div>
      </div></div></ha-card>`;
    }
    const unavailable = this._isUnavailable(st);
    const c = this._caps;
    const working = this._working;
    const alert = this._alerts[0] || null;

    const batt = this._numOf(c.battery);
    const progress = this._numOf(c.progress);
    const rawStatus = this._stateOf(c.status) ?? st.state;

    // "Charging" at a full battery is a lie the sensor keeps telling, so a full
    // battery relabels it "Docked".
    //
    // ONLY when the status is actually charging-ish, though. This used to fire for
    // ANY non-working state, so a PAUSED robot sitting at 100% was relabelled
    // "Docked" — the card flatly contradicting a machine that was paused mid-room.
    // Paused, idle and error all reach this branch and none of them mean docked.
    let title = this._pretty(rawStatus);
    const raw = String(rawStatus ?? "").toLowerCase();
    const chargingIsh = raw.includes("charg") || raw.includes("dock");
    if (!working && chargingIsh && batt != null && batt >= 100) {
      title = this.config.docked_label ?? "Docked";
    }
    if (unavailable) title = "Unavailable";

    // Progress while working, battery otherwise.
    const showProgress = working && progress != null && this._hasProgress;
    const value = showProgress ? Math.round(progress) : batt;
    const caption = showProgress
      ? (this.config.progress_caption ?? "done")
      : (this.config.battery_caption ?? "battery");

    // Sub-line, in priority order.
    let secondary = null;
    if (working) {
      const room = this._stateOf(c.room);
      const mins = this._minutesLeft;
      const bits = [];
      if (room && !["unknown", "unavailable"].includes(room)) bits.push(this._pretty(room));
      if (mins != null) bits.push(`about ${mins} min left`);
      secondary = bits.join(" - ") || null;
    } else if (this._drying) {
      secondary = this.config.drying_label ?? "Drying the mop";
    } else {
      const last = this._stateOf(c.last_clean);
      if (last) {
        const d = new Date(last);
        if (!Number.isNaN(d.getTime())) {
          const mins = Math.round((Date.now() - d.getTime()) / 60000);
          const rel = mins < 60
            ? `${Math.max(1, mins)} min`
            : mins < 1440
            ? `${Math.round(mins / 60)} h`
            : `${Math.round(mins / 1440)} d`;
          secondary = `Last cleaned ${rel} ago`;
        }
      }
    }

    // Colour, per M3: roles encode EMPHASIS, not subject matter. primary /
    // secondary / tertiary express prominence, and `error` is the only role
    // carrying inherent meaning — there is deliberately no "success" role, so
    // green-means-good would be inventing semantics the spec doesn't have.
    //
    // Working therefore uses `device`, the palette's existing "this device is
    // doing something" token, which is what materia-card has always given a
    // vacuum in `cleaning`. Resting uses a neutral surface tone. Borrowing
    // water-eco or climate-cool here was the mistake: domain tokens lent to an
    // unrelated domain, which misleads anyone reading the config later.
    // The tier's own pair (shell.js SHELL_PAIR) — so a sidekick vacuum hero
    // stays a quiet peer even while the robot is running.
    const pair = this._shellPair(working);
    let bg = (working ? this.config.working_color : this.config.color) ?? pair.bg;
    let fg = (working ? this.config.working_color_on : this.config.color_on) ?? pair.fg;
    // A warning stays in its strip: it does NOT repaint the hero and does not
    // swap the decoration for the spiked Boom. Ignoring a warning is fine, so
    // it must not look like the machine is broken. Only an error escalates.
    // Only a real error may repaint the hero. Unspecified severity still counts
    // as error (every built-in entry that omits it IS one), but info must not —
    // a quiet schedule strip tinting the whole hero red was the alternative.
    const isError = alert != null && (alert.severity == null || alert.severity === "error");
    let alertBg = null;
    let alertFg = null;
    if (alert) {
      // info wears the HERO'S OWN surface: the 2dp seam already articulates the
      // two parts, and a second tone read as contrast rather than attachment. A
      // schedule strip is part of the same object, not a notice pinned to it.
      const [ab, af] = alert.severity === "info" ? [bg, fg] : this._severityPair(alert.severity);
      alertBg = alert.color ?? ab;
      alertFg = alert.color_on ?? af;
      if (isError && this.config.alert_tints_hero !== false) {
        bg = alertBg;
        fg = alertFg;
      }
    }

    const name = this.config.name ?? st.attributes?.friendly_name ?? this.config.entity;
    const icon = this.config.icon ?? "mdi:robot-vacuum";

    // Kept for the reconnect path above. A plain field, not reactive state, so
    // recording it cannot itself trigger another render.
    this._lastGood = { title, value, caption, secondary, name, icon, bg, fg };

    return html`
      <ha-card style="--mh-bg:${bg};--mh-fg:${fg};--mh-alert-bg:${alertBg ?? bg};--mh-alert-fg:${alertFg ?? fg};--mh-calm-d:path('${BURST_CALM}');--mh-live-d:path('${BURST_LIVE}');">
        <div class="stack">
          <div
            class="hero ${unavailable ? "unavailable" : ""} ${alert ? "attached" : ""}"
            @click=${() => this._handleAction(this.config.tap_action || { action: "more-info", entity: this.config.entity })}
          >
            ${this._renderBurst({ alarm: isError, working })}
            <div class="content">
              <div class="eyebrow">
                <ha-icon .icon=${icon}></ha-icon><span>${name}</span>
              </div>
              <div class="title">${title}</div>
              ${value != null
                ? html`<div class="figure">
                    <span class="value">${value}</span><span class="unit">%</span>
                    <span class="caption">${caption}</span>
                  </div>`
                : nothing}
              ${secondary ? html`<div class="secondary">${secondary}</div>` : nothing}
            </div>
          </div>
          ${alert
            ? html`<div
                class="alert"
                role="status"
                @click=${() => this._handleAction(alert.tap_action || { action: "more-info", entity: alert.entity || this.config.entity })}
              >
                <ha-icon .icon=${alert.icon ?? "mdi:alert-circle-outline"}></ha-icon>
                <span>${alert.text}</span>
                ${alert.reset
                  ? html`<button
                      class="alert-action"
                      title="Reset"
                      @click=${(e) => {
                        // The strip itself opens more-info; the button must not.
                        e.stopPropagation();
                        this._fireHaptic?.("light");
                        // Entity goes in TARGET, not data. button.press is an
                        // entity service with no fields, so an entity_id passed
                        // as service data lands nowhere and the call silently
                        // does nothing.
                        this._callService("button", "press", {}, { entity_id: alert.reset });
                      }}
                    >
                      <ha-icon icon="mdi:restart"></ha-icon>
                    </button>`
                  : nothing}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("materia-vacuum-hero", MateriaVacuumHero);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-vacuum-hero",
  name: "Materia Vacuum Hero",
  description: "Robot-vacuum headline — derived ETA, negated working states, and mop/consumable warnings. Roborock and Ecovacs.",
  preview: true,
});
