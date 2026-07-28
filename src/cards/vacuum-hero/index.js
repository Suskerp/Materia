import { LitElement, html, svg, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { boomPath, softBurstPath } from "../../utils/shapes.js";
import { styles } from "../hero/styles.js";
import { CAPABILITY_KEYS, CONSUMABLE_KEYS, profileFor } from "./profiles.js";
import { explainConsumable, explainError } from "./explanations.js";
import "./editor.js";

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
class MateriaVacuumHero extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = styles;

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
  }

  get _profile() {
    return profileFor(this.config.brand);
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  /** Entity ids on the same DEVICE as the vacuum. */
  _siblings() {
    const reg = this.hass?.entities?.[this.config.entity];
    const devId = reg?.device_id;
    if (!devId) return [];
    return Object.values(this.hass.entities)
      .filter((e) => e.device_id === devId && !e.disabled_by && !e.hidden_by)
      .map((e) => e.entity_id);
  }

  /** Resolve every capability once per config/hass-device change. */
  get _caps() {
    if (this._discovered) return this._discovered;
    const sibs = this._siblings();
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
    this._discovered = caps;
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

  /** Minutes remaining, derived from elapsed time and percent complete. */
  get _minutesLeft() {
    const p = this._numOf(this._caps.progress);
    if (p == null || p <= 0 || p >= 100) return null;
    const elapsed = this._numOf(this._caps.cleaning_time);
    if (elapsed == null || elapsed <= 0) return null;
    // cleaning_time is minutes on Roborock; seconds if it looks too large.
    const mins = elapsed > 600 ? elapsed / 60 : elapsed;
    return Math.max(1, Math.round((mins * (100 - p)) / p));
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

  /** Consumables at or under their threshold — the invisible-warning fix. */
  _lowConsumables() {
    const limit = this.config.consumable_threshold ?? 0;
    return (this._caps.consumables || []).filter((id) => {
      const v = this._numOf(id);
      if (v == null) return false;
      const unit = this.hass.states[id]?.attributes?.unit_of_measurement;
      // Percent-style lifespans warn near zero; hour-style time-left at zero.
      return unit === "%" ? v <= (this.config.consumable_percent ?? 5) : v <= limit;
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
      ...(this.config.alerts || []),
    ].filter(Boolean);
    return list;
  }

  _severityPair(sev) {
    if (sev === "warning") {
      return [
        "var(--md-sys-cust-color-warning-container)",
        "var(--md-sys-cust-color-on-warning-container)",
      ];
    }
    return [
      "var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container))",
      "var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container))",
    ];
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    if (!st) {
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

    // "Charging" at a full battery is a lie the sensor keeps telling.
    let title = this._pretty(rawStatus);
    if (!working && batt != null && batt >= 100) title = this.config.docked_label ?? "Docked";
    if (unavailable) title = "Unavailable";

    // Progress while working, battery otherwise.
    const showProgress = working && progress != null;
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
    let bg = this.config.color ?? "var(--md-sys-color-secondary-container)";
    let fg = this.config.color_on ?? "var(--md-sys-color-on-secondary-container)";
    if (working) {
      bg = this.config.working_color ?? "var(--md-sys-cust-color-device, var(--md-sys-color-primary-container))";
      fg = this.config.working_color_on ?? "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container))";
    }
    let alertBg = null;
    let alertFg = null;
    if (alert) {
      const [ab, af] = this._severityPair(alert.severity);
      alertBg = alert.color ?? ab;
      alertFg = alert.color_on ?? af;
      if (this.config.alert_tints_hero !== false) {
        bg = alertBg;
        fg = alertFg;
      }
    }

    const calm = softBurstPath(90, 90, 86);
    const boom = boomPath(90, 90, 88);
    const name = this.config.name ?? st.attributes?.friendly_name ?? this.config.entity;
    const icon = this.config.icon ?? "mdi:robot-vacuum";

    return html`
      <ha-card style="--mh-bg:${bg};--mh-fg:${fg};--mh-alert-bg:${alertBg ?? bg};--mh-alert-fg:${alertFg ?? fg};">
        <div class="stack">
          <div
            class="hero ${unavailable ? "unavailable" : ""} ${alert ? "attached" : ""}"
            @click=${() => this._handleAction(this.config.tap_action || { action: "more-info", entity: this.config.entity })}
          >
            ${this.config.burst === false
              ? nothing
              : html`<svg class="burst ${alert ? "alarm" : working ? "working" : ""}" viewBox="0 0 180 180" aria-hidden="true">
                  ${alert
                    ? svg`<g class="loom"><path d=${boom} /></g>`
                    : svg`<g class="drift"><path d=${calm} /></g>`}
                </svg>`}
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
                        this._callService("button", "press", { entity_id: alert.reset });
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
