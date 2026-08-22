import { LitElement, html, nothing } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { t } from "../../utils/i18n.js";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "../../primitives/calendar.js";
import "../../elements/button-group/index.js";
import "./editor.js";

/**
 * Schedule picker (materia-schedule) — design doc 7a and 7b as ONE card.
 *
 * 7b is the collapsed strip on the page; 7a is the picker. They are the same
 * card in two states rather than a page plus a modal, and that is a deliberate
 * platform decision: a Lovelace card cannot open a real bottom sheet without
 * either a position:fixed overlay that fights hui-view's stacking and ignores
 * Esc and the back button, or browser_mod, which is not installed here.
 * Expanding in place is the idiom this dashboard already uses (expander-card on
 * the vacuum page) and costs nothing in fidelity — every element of 7a is here.
 *
 * THE PREMISE IS SHORTCUTS FIRST. Nine times in ten the answer is "in an hour"
 * or "tonight", so those are big chips and the calendar stays folded until it is
 * asked for. Triggers that are not clock times live in a second tab of the same
 * picker rather than a separate flow, because "when I leave" is the same decision
 * arrived at differently.
 *
 * Quick-chip times are COMPUTED from the clock, never hardcoded: a chip reading
 * "In 1 hour · 21:12" has to still be right tomorrow. Tonight and Noon roll to
 * the next day once they are behind us, and Saturday skips to next week if today
 * is already Saturday afternoon — a shortcut that offers a moment in the past is
 * worse than no shortcut. That is also why the choice is echoed large at the top:
 * it is the one place that always shows the RESOLVED moment rather than the
 * shortcut's name.
 *
 * STATE IS MOCKED — entirely client-side, no entity, no service call — UNLESS
 * a preset/trigger/config action is wired, or `schedule_entity` is set (see
 * below). With nothing wired, Confirm just arms the strip and Clear removes
 * it; swapping the mock for a real backend means implementing _commit (or,
 * for window mode, _commitWindow) and nothing else.
 *
 * WINDOW MODE (`schedule_entity` / `show_stop`) is the one place this card
 * does read a real entity: a recurring start-stop range bound to a Scheduler
 * `switch.schedule_*`, read on open and written back with scheduler.edit.
 * Search this file for _isWindow.
 */
class MateriaSchedule extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _open: { state: true },
    _armed: { state: true },
    _mode: { state: true },
    _pick: { state: true },
    _event: { state: true },
    _customOpen: { state: true },
    _viewY: { state: true },
    _viewM: { state: true },
    _date: { state: true },
    _hour: { state: true },
    _minute: { state: true },
    _repeating: { state: true },
    _days: { state: true },
    // Window mode (schedule_entity / show_stop): the start time reuses
    // _hour/_minute above — a card is never both a classic single-moment
    // picker and a window at once, so sharing them is not a collision.
    _stopHour: { state: true },
    _stopMinute: { state: true },
    _startOpen: { state: true },
    _stopOpen: { state: true },
    _multipleSlots: { state: true },
    _resolvedPending: { state: true },
    _resolvedNextLabel: { state: true },
    _resolvedNextSub: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-schedule-editor");
  }

  static getStubConfig() {
    return { name: "Start cleaning" };
  }

  setConfig(config) {
    this.config = { presentation: "inline", default_mode: "clock", ...config };
    // Follow config until the user actually switches tabs themselves — after that
    // their choice wins, so re-entering the editor cannot yank the tab out from
    // under them mid-edit.
    if (!this._modeTouched) this._mode = this._modes[0];
  }

  /** "sheet" drops the collapsed strip and renders the picker directly, for
   *  putting the card INSIDE a modal (browser_mod.popup) rather than expanding
   *  it in place. The strip stays the default because a bare picker sitting on a
   *  dashboard has nothing to summarise and no way to be dismissed. */
  get _isSheet() {
    return this.config.presentation === "sheet";
  }

  /** Design 7b: the page-level summary. Not a picker at all — it shows what is
   *  set and offers the three things you actually want from a glance: skip the
   *  next run, open an existing schedule, or add another. The picker itself lives
   *  behind `add_action`, which is why this stays a presentation of the same card
   *  rather than a second card: same config surface, same wiring seam. */
  get _isSummary() {
    return this.config.presentation === "summary";
  }

  _tpl(key, resolved) {
    const raw = this.config[key];
    if (raw == null) return null;
    const v = this._isTemplate(raw) ? this[resolved] : raw;
    const t = v == null ? "" : String(v).trim();
    return t.length ? t : null;
  }

  updated(changed) {
    super.updated?.(changed);
    if (changed.has("hass") && this.hass) {
      this._resolveField("pending", "_resolvedPending");
      this._resolveField("next_label", "_resolvedNextLabel");
      this._resolveField("next_sub", "_resolvedNextSub");
      (this.config.schedules || []).forEach((sc, i) => {
        if (sc.label != null) this._resolveTemplateValue(`schedLabel${i}`, sc.label);
      });
      // Mirror the live entity while the user isn't mid-edit. _dirty flips true
      // the moment they touch a time or a weekday and only clears on commit or
      // dismiss — open ("sheet" presentation never closes) is not a reliable
      // "are they editing" signal, _dirty is.
      if (this.config.schedule_entity && !this._dirty) this._seedFromEntity();
    }
    // Reflected as an attribute so the stylesheet can flatten the surface —
    // a config value alone is invisible to CSS.
    this.toggleAttribute("sheet", this._isSheet);
    this._syncFoldHeight();
  }

  constructor() {
    super();
    const now = new Date();
    this._open = false;
    this._armed = null; // { head, sub, repeating } once confirmed
    this._mode = "clock";
    this._pick = null; // resolved lazily to the first preset
    this._event = null;
    this._customOpen = false;
    this._viewY = now.getFullYear();
    this._viewM = now.getMonth();
    this._date = now.getDate();
    this._hour = 9;
    this._minute = 0;
    this._repeating = false;
    // Mon-Fri, matching the design's default. Index 0 is Monday.
    this._days = [true, true, true, true, true, false, false];
    // Window mode. Stop defaults an hour after the start default (9 -> 10) so
    // an unseeded window (no schedule_entity, or one with no timeslot yet)
    // still opens on a sane, non-zero-length range.
    this._stopHour = 10;
    this._stopMinute = 0;
    this._startOpen = false;
    this._stopOpen = false;
    this._multipleSlots = false;
    // Plain fields, not reactive props: neither is ever read by render()
    // directly, only by the seed/commit machinery.
    this._entityActions = null; // actions read off schedule_entity, preserved on write
    this._dirty = false; // true once the user edits the window; blocks re-seeding
                          // from the live entity out from under an in-progress edit
  }

  /** Selected shortcut, or null. DELIBERATELY NOT defaulted to the first preset:
   *  pre-selecting one put "In 1 hour" in the 44px headline before the user had
   *  chosen anything, which reads as a decision already made. Nothing is selected
   *  until it is picked. */
  get _pickKey() {
    return this._pick;
  }

  /** Whether the user has actually chosen something to commit.
   *
   *  Guards the confirm button, and that guard is not cosmetic: with nothing
   *  selected _resolvedWhen is null, so $datetime substitutes empty, and
   *  as_timestamp('', 0) is 0 — which sails through the backend's "is this
   *  effectively now" check and STARTS THE VACUUM. */
  get _hasSelection() {
    if (this._isWindow) return !this._windowBlocked && this._days.some(Boolean);
    return this._mode === "event" ? this._event != null : this._pick != null;
  }

  /* ---- window mode: a recurring start-stop range instead of one moment ----

     Bound to a Scheduler `switch.schedule_*` (schedule_entity) or opted into
     bare (show_stop) for a custom confirm_action. Only replaces the CLOCK
     tab's content — the trigger tab is untouched, and unlike a one-off
     moment a window is always recurring, so it carries its own weekday chips
     rather than reusing the generic repeat switch. */

  get _isWindow() {
    return this._mode === "clock" && (this.config.show_stop === true || !!this.config.schedule_entity);
  }

  /** Scheduler's `timeslots` is a list; this card edits only the first entry.
   *  Silently dropping the others when writing back would turn "add a second
   *  block in Scheduler" into "lose it the next time this card saves" — so a
   *  second timeslot visibly blocks editing here instead. */
  get _windowBlocked() {
    return this._isWindow && this._multipleSlots;
  }

  /** Stop <= start reads as crossing midnight (22:00 -> 06:00), exactly how
   *  Scheduler's own UI treats a reversed timeslot. Materia does not adjust
   *  or carry a date for this — both times round-trip as plain HH:MM, the
   *  backend already knows what a reversed pair means. This is only used to
   *  show the "overnight" hint so the reversed order doesn't read as a typo. */
  get _windowOvernight() {
    return this._stopHour * 60 + this._stopMinute <= this._hour * 60 + this._minute;
  }

  get _windowLabel() {
    return `${this._pad(this._hour)}:${this._pad(this._minute)} → ${this._pad(this._stopHour)}:${this._pad(this._stopMinute)}`;
  }

  /** "Daily" / "Mon, Wed, Fri" / a prompt when nothing is picked yet — the
   *  window's own weekday chips have no adjacent switch to lean on for
   *  context, so the sub-line has to say more than the generic repeat one did. */
  get _windowDaysSummary() {
    if (this._days.every(Boolean)) return t("sched_window_daily", this.hass);
    if (!this._days.some(Boolean)) return t("sched_window_pick_days", this.hass);
    const fmt = new Intl.DateTimeFormat(this._lang, { weekday: "short" });
    // 2024-01-01 was a Monday, matching _dayNames' own reference date.
    return this._days
      .map((on, i) => (on ? fmt.format(new Date(2024, 0, 1 + i)) : null))
      .filter(Boolean)
      .join(", ");
  }

  get _windowSub() {
    return this._windowOvernight
      ? `${this._windowDaysSummary} · ${t("sched_window_overnight", this.hass)}`
      : this._windowDaysSummary;
  }

  /** Mirrors schedule_entity's live attributes into the picker. Read shape is
   *  a flat "15:00:00 - 20:30:00" string, NOT the {start,stop,actions} object
   *  scheduler.edit writes — that asymmetry is Scheduler's, not ours, so it is
   *  parsed here and re-assembled at commit time rather than carried as-is. */
  _seedFromEntity() {
    const id = this.config.schedule_entity;
    if (!id) return;
    const st = this.hass?.states[id];
    if (!st) return;
    const slots = st.attributes.timeslots || [];
    this._multipleSlots = slots.length > 1;
    this._entityActions = st.attributes.actions ?? null;

    const raw = slots[0];
    const m = raw && /^(\d{1,2}):(\d{2})(?::\d{2})?\s*-\s*(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(String(raw).trim());
    if (m) {
      this._hour = Number(m[1]);
      this._minute = Number(m[2]);
      this._stopHour = Number(m[3]);
      this._stopMinute = Number(m[4]);
    }

    const wd = (st.attributes.weekdays || []).map((w) => String(w).toLowerCase());
    if (wd.includes("daily")) {
      this._days = [true, true, true, true, true, true, true];
    } else if (wd.length) {
      const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      this._days = order.map((d) => wd.includes(d));
    }
    // An empty/missing weekdays attribute leaves _days untouched — nothing to
    // seed from is not the same as "every day", and guessing either way is
    // worse than keeping whatever was already on screen.
  }

  /** True once anything is wired, so the card stops advertising itself as a mock
   *  the moment it can actually do something. */
  get _isWired() {
    return !!(this.config.confirm_action || this.config.trigger_action || this.config.schedule_entity
      || (this.config.presets ?? []).some((p) => p.tap_action)
      || (this.config.triggers ?? []).some((t) => t.tap_action));
  }

  /** Whatever is already scheduled, as a TEMPLATE that renders empty when nothing
   *  is pending. A template rather than an entity because the backend decides what
   *  "pending" means — here it is a scheduler switch whose entity_id is generated,
   *  which no static config could name. Uses the same _resolveField machinery every
   *  other templatable field in Materia uses. */
  get _pending() {
    const raw = this.config.pending;
    if (!raw) return null;
    const v = this._isTemplate(raw) ? this._resolvedPending : raw;
    const t = v == null ? "" : String(v).trim();
    return t.length ? t : null;
  }

  /** Which tabs exist, in display order.
   *
   *  `default_mode` decides which is FIRST, not merely which is preselected —
   *  "first page" means leftmost as well as initially active, and a default that
   *  sat in the second position would read as arbitrary. Either tab can also be
   *  dropped entirely, and with only one left the tab row is not rendered at all:
   *  a segmented control with a single segment is just a label. */
  get _modes() {
    const wanted = [];
    if (this.config.show_time !== false) wanted.push("clock");
    if (this.config.show_triggers !== false) wanted.push("event");
    if (!wanted.length) wanted.push("clock"); // never leave the sheet with nothing
    if (this.config.default_mode === "event" && wanted.includes("event")) {
      return ["event", ...wanted.filter((m) => m !== "event")];
    }
    return wanted;
  }

  get _lang() {
    return this.hass?.locale?.language || undefined;
  }

  _pad(n) {
    return String(n).padStart(2, "0");
  }

  _hhmm(d) {
    return `${this._pad(d.getHours())}:${this._pad(d.getMinutes())}`;
  }

  /** Short weekday + time, for a moment that is not today. */
  _dayTime(d) {
    const wd = new Intl.DateTimeFormat(this._lang, { weekday: "short" }).format(d);
    return `${wd} ${this._hhmm(d)}`;
  }

  /** Built-in shortcut set, used when `presets` is not configured. Each entry
   *  is the same declarative shape a user writes, so the default IS an example
   *  of the config format rather than a hardcoded special case. */
  /** An instance getter, not a static field: a static cannot call t(), because
   *  there is no hass at class-definition time. */
  get _defaultPresets() {
    return [
      { label: t("sched_preset_1h", this.hass), offset: "1h" },
      { label: t("sched_preset_4h", this.hass), offset: "4h" },
      { label: t("sched_preset_tonight", this.hass), at: "23:00" },
      { label: t("sched_preset_tomorrow", this.hass), at: "09:00", days: 1, grow: 1.4 },
      { label: t("sched_preset_noon", this.hass), at: "12:00" },
      { label: t("sched_preset_saturday", this.hass), at: "10:00", weekday: 6, grow: 1.4 },
    ];
  }

  /** Resolve one declarative preset against the clock.
   *
   *    offset: "90m" | "2h" | "1d"   — relative to now
   *    at: "23:00"                    — clock time today
   *    at + days: 1                   — clock time N days out
   *    at + weekday: 6                — clock time on the next given weekday
   *                                     (1 = Monday .. 7 = Sunday, ISO)
   *
   *  A resolved moment is NEVER in the past. `at` alone rolls to tomorrow once
   *  it has passed, and `weekday` rolls a whole week if today already qualifies
   *  but the time has gone. A shortcut that offers a moment you cannot schedule
   *  is worse than not offering it. */
  _resolvePreset(p, now) {
    if (p.offset) {
      const m = /^(\d+(?:\.\d+)?)\s*(m|h|d)$/i.exec(String(p.offset).trim());
      if (!m) return null;
      const mult = { m: 60000, h: 3600000, d: 86400000 }[m[2].toLowerCase()];
      return new Date(now.getTime() + parseFloat(m[1]) * mult);
    }
    const hm = /^(\d{1,2}):(\d{2})$/.exec(String(p.at ?? "").trim());
    if (!hm) return null;
    const [hh, mm] = [Number(hm[1]), Number(hm[2])];

    const d = new Date(now);
    d.setSeconds(0, 0);
    d.setHours(hh, mm);

    if (p.weekday != null) {
      // ISO 1..7 (Mon..Sun) -> JS 0..6 (Sun..Sat).
      const targetJs = Number(p.weekday) % 7;
      let delta = (targetJs - now.getDay() + 7) % 7;
      if (delta === 0 && d <= now) delta = 7;
      d.setDate(d.getDate() + delta);
      return d;
    }
    if (p.days != null) {
      d.setDate(d.getDate() + Number(p.days));
      return d;
    }
    if (d <= now) d.setDate(d.getDate() + 1);
    return d;
  }

  /** Configured shortcuts, resolved. Anything unresolvable is dropped rather
   *  than rendered as a dead chip. */
  get _quick() {
    const now = new Date();
    const list = this.config.presets ?? this._defaultPresets;
    return list
      .map((p, i) => {
        const when = this._resolvePreset(p, now);
        if (!when) return null;
        const sameDay = when.toDateString() === now.toDateString();
        return {
          key: p.key ?? `p${i}`,
          name: p.label ?? "—",
          // Show a weekday too once the moment is not today, or "Tomorrow 09:00"
          // and "Sat 09:00" would be indistinguishable.
          at: sameDay ? this._hhmm(when) : this._dayTime(when),
          grow: p.grow ?? 1,
          when,
          tap_action: p.tap_action,
        };
      })
      .filter(Boolean);
  }

  get _defaultTriggers() {
    return [
      { key: "leave", label: t("sched_trigger_leave", this.hass), secondary: t("sched_trigger_leave_sub", this.hass), icon: "m3o:directions-walk" },
      { key: "empty", label: t("sched_trigger_empty", this.hass), secondary: t("sched_trigger_empty_sub", this.hass), icon: "m3o:person-off" },
      { key: "night", label: t("sched_trigger_night", this.hass), secondary: t("sched_trigger_night_sub", this.hass), icon: "m3o:bedtime" },
      { key: "sunset", label: t("sched_trigger_sunset", this.hass), secondary: t("sched_trigger_sunset_sub", this.hass), icon: "m3o:wb-twilight" },
    ];
  }

  /** Configured triggers. `label`/`secondary` are the documented keys; `name`
   *  and `sub` are accepted as aliases so a config written against the earlier
   *  shape keeps working. */
  get _events() {
    const list = this.config.triggers ?? this._defaultTriggers;
    // NOT named `t`: that is the imported translate function, and shadowing it
    // inside this callback would silently break any t() added here later.
    return list.map((trig, i) => ({
      key: trig.key ?? `t${i}`,
      name: trig.label ?? trig.name ?? "—",
      sub: trig.secondary ?? trig.sub ?? "",
      icon: trig.icon ?? "m3o:sensors",
      tap_action: trig.tap_action,
    }));
  }

  /** What the header echoes, and what the strip shows once armed. */
  get _describe() {
    if (this._mode === "event") {
      const e = this._events.find((x) => x.key === this._event);
      return e
        ? { head: e.name, sub: `${e.sub} · trigger` }
        : { head: t("sched_pick_trigger", this.hass), sub: t("sched_runs_whenever", this.hass) };
    }
    if (this._isWindow) {
      return this._windowBlocked
        ? { head: t("sched_multi_slots_head", this.hass), sub: t("sched_multi_slots_sub", this.hass) }
        : { head: this._windowLabel, sub: this._windowSub };
    }
    if (this._pick === "custom") {
      const date = new Intl.DateTimeFormat(this._lang, { day: "numeric", month: "long" })
        .format(new Date(this._viewY, this._viewM, this._date));
      return { head: `${this._pad(this._hour)}:${this._pad(this._minute)}`, sub: date };
    }
    const q = this._quick.find((x) => x.key === this._pickKey);
    // Time first, name second — the resolved moment is the answer, the
    // shortcut is only how it was arrived at. The custom branch already led
    // with the time; the class doc always claimed both did.
    return q ? { head: q.at, sub: q.name } : { head: t("sched_when_question", this.hass), sub: t("sched_pick_moment", this.hass) };
  }

  get _dayNames() {
    const fmt = new Intl.DateTimeFormat(this._lang, { weekday: "narrow" });
    // 2024-01-01 was a Monday, so index 0 lands on Monday.
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)));
  }

  /* ---- composed button-group configs -------------------------------------
     These are real materia-button-group instances in UNCONTROLLED mode, not
     lookalike rows. Hand-rolling them was the mistake: the segmented shape,
     the ladder heights, the connected-corner maths and the selected-state morph
     all already live in that element, and a copy drifts from it the moment
     either side changes.

     `preset: "primary"` deliberately overrides the element's M3 guardrail
     (which defaults an unstyled group to the SECONDARY toggle family, one
     primary per surface). Here the whole picker's selected state is primary —
     chips, hours, the echoed headline — so a secondary tab would be the only
     thing disagreeing. */

  get _tabConfig() {
    const LABELS = {
      clock: { label: this.config.time_tab_label ?? t("sched_at_a_time", this.hass), value: "clock", icon: "m3o:schedule" },
      event: { label: this.config.trigger_tab_label ?? t("sched_when_ellipsis", this.hass), value: "event", icon: "m3o:sensors" },
    };
    return {
      size: "m", // 56px, the M3 button ladder's medium rung
      preset: "primary",
      options: this._modes.map((m) => LABELS[m]),
    };
  }

  get _minuteConfig() {
    const mins = this.config.minutes ?? [0, 15, 30, 45];
    return {
      size: "s", // 40px
      preset: "primary",
      options: mins.map((m) => ({ label: this._pad(m), value: String(m) })),
    };
  }

  get _weekdayConfig() {
    return {
      size: "s",
      preset: "primary",
      multi_select: true,
      active_shape: "square", // the M3E selected-toggle morph
      options: this._dayNames.map((n, i) => ({ label: n, value: String(i) })),
    };
  }

  /* ---- the resolved moment, and the wiring seam ---------------------------

     The card deliberately knows NOTHING about vacuums, timers or schedulers. It
     resolves the moment the user picked and hands it to a configured action,
     substituting $placeholders into the service data. That keeps every branch of
     "what should actually happen" in Home Assistant — a script with a choose —
     rather than in a Lovelace card, which is where HA's own guidance puts it.

     These are NOT Jinja templates: templates are not allowed inside actions, and
     the card performs the substitution itself before calling the service. The $
     syntax is deliberately different from {{ }} so the two are not confused.

        $datetime  2026-07-29 09:00:00   local, input_datetime.set_datetime shape
        $date      2026-07-29
        $time      09:00
        $duration  01:00:00              now -> the moment, for timer.start
        $weekdays  [mon, tue, wed]       array when repeating, else empty
        $repeat    true | false
        $trigger   leave                 the chosen trigger's key
        $label     Tomorrow 09:00        what the strip will show
  */

  /** The absolute moment currently described, or null in trigger mode. */
  get _resolvedWhen() {
    if (this._mode === "event") return null;
    if (this._pickKey === "custom") {
      return new Date(this._viewY, this._viewM, this._date, this._hour, this._minute, 0, 0);
    }
    return this._quick.find((x) => x.key === this._pickKey)?.when ?? null;
  }

  _actionContext() {
    const when = this._resolvedWhen;
    const two = (n) => String(n).padStart(2, "0");
    const DOW = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

    let datetime = "";
    let date = "";
    let time = "";
    let duration = "";
    if (when) {
      date = `${when.getFullYear()}-${two(when.getMonth() + 1)}-${two(when.getDate())}`;
      time = `${two(when.getHours())}:${two(when.getMinutes())}`;
      // LOCAL, not ISO/UTC: input_datetime and scheduler both take wall-clock,
      // and handing them a Z-suffixed UTC string silently shifts the run.
      datetime = `${date} ${time}:00`;
      const secs = Math.max(0, Math.round((when.getTime() - Date.now()) / 1000));
      duration = `${two(Math.floor(secs / 3600))}:${two(Math.floor((secs % 3600) / 60))}:${two(secs % 60)}`;
    }

    return {
      datetime,
      date,
      time,
      duration,
      weekdays: this._repeating ? DOW.filter((_, i) => this._days[i]) : [],
      repeat: !!this._repeating,
      trigger: this._event ?? "",
      label: this._describe.head,
    };
  }

  /** Substitute $placeholders through a nested action object. A string that is
   *  EXACTLY one placeholder yields the raw typed value, so $weekdays arrives as
   *  an array and $repeat as a boolean rather than as "mon,tue" and "true". */
  _fill(value, ctx) {
    if (typeof value === "string") {
      const solo = /^\$(\w+)$/.exec(value.trim());
      if (solo && solo[1] in ctx) return ctx[solo[1]];
      return value.replace(/\$(\w+)/g, (m, k) => (k in ctx ? String(ctx[k]) : m));
    }
    if (Array.isArray(value)) return value.map((v) => this._fill(v, ctx));
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, this._fill(v, ctx)]));
    }
    return value;
  }

  /** The fold animates from a MEASURED height: CSS cannot interpolate to auto,
   *  and a hardcoded max-height would either clip a 6-row month or leave a gap
   *  under a 5-row one. */
  _syncFoldHeight() {
    const body = this.shadowRoot?.querySelector(".custom-body");
    if (body) {
      const inner = this.shadowRoot.querySelector(".custom-inner");
      body.style.height = this._customOpen && inner ? `${inner.scrollHeight}px` : "0px";
    }
    // Same measured-height fold, once per window edge (start, stop) — a plain
    // querySelector would only ever find the first of the two.
    this.shadowRoot?.querySelectorAll(".win-edge").forEach((edge) => {
      const b = edge.querySelector(".win-body");
      const inner = edge.querySelector(".win-inner");
      if (!b) return;
      b.style.height = edge.classList.contains("open") && inner ? `${inner.scrollHeight}px` : "0px";
    });
  }

  /** Opening the calendar should CONTINUE from the moment already on screen,
   *  not jump to an arbitrary 09:00. Anything else throws away the choice the
   *  user just made one row above. */
  _seedCustom() {
    const when = this._quick.find((x) => x.key === this._pickKey)?.when
      ?? new Date(Date.now() + 3600000);
    this._viewY = when.getFullYear();
    this._viewM = when.getMonth();
    this._date = when.getDate();

    // Snap UP to the next offered minute, never down: rounding backwards can
    // land the default in the past, which is the one thing the preset roll rules
    // exist to prevent.
    const mins = [...(this.config.minutes ?? [0, 15, 30, 45])].sort((a, b) => a - b);
    const m = when.getMinutes();
    const next = mins.find((x) => x >= m);
    this._minute = next ?? mins[0];
    this._hour = next == null ? (when.getHours() + 1) % 24 : when.getHours();
  }

  /** Close: collapse when inline, dismiss the host modal when in sheet mode.
   *
   *  The close call is CONFIGURABLE rather than hardcoded to browser_mod, so the
   *  card is not coupled to one popup implementation — but it defaults to
   *  browser_mod.close_popup, because a Close button that leaves the modal open
   *  is broken and defaulting to nothing would ship exactly that. */
  _dismiss() {
    this._open = false;
    // Discard an in-progress window edit: the next open should show what is
    // actually live on schedule_entity again, not the abandoned draft.
    this._dirty = false;
    if (!this._isSheet) return;
    // fire-dom-event rather than perform-action: browser_mod picks the ll-custom
    // event up in the CALLING browser's own context, so the popup closes on the
    // device you tapped without having to name it. Calling the service directly
    // would fan out to every registered browser unless a browser_id were
    // threaded through, and dismissing on a phone would also close it on the
    // wall tablet.
    const close = this.config.close_action ?? {
      action: "fire-dom-event",
      browser_mod: { service: "browser_mod.close_popup", data: {} },
    };
    this._handleAction(close);
  }

  _commit() {
    if (!this._hasSelection) return;
    if (this._isWindow) return this._commitWindow();

    this._armed = { ...this._describe, repeating: this._repeating, mode: this._mode };
    this._open = false;

    // Per-preset / per-trigger action wins over the card-level one, so a single
    // picker can drive several different backends — a timer for the relative
    // shortcuts, a scheduler entry for a weekly repeat, an automation toggle for
    // a trigger — without the card knowing which is which.
    const chosen = this._mode === "event"
      ? this._events.find((e) => e.key === this._event)
      : this._quick.find((q) => q.key === this._pickKey);
    const action = chosen?.tap_action
      ?? (this._mode === "event" ? this.config.trigger_action : null)
      ?? this.config.confirm_action;

    if (action) {
      this._handleAction(this._fill(action, this._actionContext()));
    } else {
      // Nothing wired: stays a mock, and says so on the face of the card.
      this._fireHaptic("success");
    }
    // Committing from inside a modal should close it — otherwise the sheet sits
    // there after the job is done and reads as though nothing happened.
    if (this._isSheet) this._dismiss();
  }

  /** Placeholders for window mode's own action, on top of the ones _fill()
   *  already supports for a single moment ($datetime etc. do not apply here —
   *  there is no one moment, only a recurring range). */
  _windowActionContext() {
    const start = `${this._pad(this._hour)}:${this._pad(this._minute)}`;
    const stop = `${this._pad(this._stopHour)}:${this._pad(this._stopMinute)}`;
    const DOW = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    // "daily" mirrors the shape read off the entity's own weekdays attribute
    // (see _seedFromEntity) rather than spelling out all seven — a straight
    // read-then-save-unchanged round-trips to the exact value Scheduler had.
    const weekdays = this._days.every(Boolean) ? ["daily"] : DOW.filter((_, i) => this._days[i]);
    // Config wins when given (authoring a NEW schedule with nothing to read
    // yet); otherwise whatever was read off schedule_entity survives
    // untouched — losing it would turn the pump's schedule into a no-op.
    const actions = this.config.actions ?? this._entityActions ?? [];
    return { start, stop, weekdays, actions, entity: this.config.schedule_entity ?? "", label: this._windowLabel };
  }

  /** Only fires when schedule_entity is set AND config doesn't supply its own
   *  confirm_action — a bare show_stop window with no entity has nothing
   *  sensible to call by default and stays a mock, same as the classic
   *  picker does with nothing wired. */
  _defaultWindowAction() {
    if (!this.config.schedule_entity) return null;
    return {
      action: "perform-action",
      perform_action: "scheduler.edit",
      target: { entity_id: "$entity" },
      data: {
        weekdays: "$weekdays",
        repeat_type: "repeat",
        // Write shape is {start, stop, actions} — NOT the "HH:MM:SS - HH:MM:SS"
        // string schedule_entity's own timeslots attribute reads back as. See
        // _seedFromEntity for the other half of that asymmetry.
        timeslots: [{ start: "$start", stop: "$stop", actions: "$actions" }],
      },
    };
  }

  _commitWindow() {
    if (this._windowBlocked) return;
    this._armed = { head: this._windowLabel, sub: this._windowDaysSummary, repeating: true, mode: "window" };
    this._open = false;
    this._dirty = false;

    const action = this.config.confirm_action ?? this._defaultWindowAction();
    if (action) {
      this._handleAction(this._fill(action, this._windowActionContext()));
    } else {
      this._fireHaptic("success");
    }
    if (this._isSheet) this._dismiss();
  }

  _renderStrip() {
    const a = this._armed;
    const head = a ? a.head : (this.config.empty_label ?? t("sched_not_scheduled", this.hass));
    const sub = a ? a.sub : (this.config.empty_sub ?? t("sched_tap_to_pick", this.hass));
    const icon = a ? (a.mode === "event" ? "m3o:sensors" : "m3o:alarm") : "m3o:add";

    return html`
      <div
        class="strip ${a?.repeating ? "repeating" : ""}"
        role="button"
        tabindex="0"
        @click=${() => { this._open = true; }}
        @keydown=${(e) => {
          if (e.key !== "Enter" && e.key !== " ") return;
          e.preventDefault();
          this._open = true;
        }}
      >
        <div class="glyph"><ha-icon .icon=${icon}></ha-icon></div>
        <div class="text">
          <span class="head">${head}</span>
          <span class="sub">${sub}</span>
        </div>
        ${a
          ? html`<button
              class="strip-cancel"
              @click=${(e) => {
                e.stopPropagation();
                this._armed = null;
                this._fireHaptic("light");
              }}
            >${this.config.clear_label ?? t("sched_clear", this.hass)}</button>`
          : nothing}
      </div>
    `;
  }

  render() {
    if (!this.config) return html``;

    if (this._isSummary) return this._renderSummary();

    if (!this._open && !this._isSheet) {
      return html`<ha-card><div class="sheet">${this._renderStrip()}</div></ha-card>`;
    }

    const pending = this._pending;
    const d = this._describe;
    const isClock = this._mode === "clock";

    return html`
      <ha-card>
        <div class="sheet">
          <div class="echo">
            <span class="eyebrow">${this.config.name ?? t("sched_name_default", this.hass)}</span>
            ${(() => {
              // With nothing picked yet, the headline shows what is ALREADY
              // scheduled rather than an empty prompt — the armed strip below no
              // longer repeats it, so this is the only place the time appears.
              const head = this._hasSelection ? d.head : (pending ?? d.head);
              const sub = this._hasSelection
                ? d.sub
                : pending
                ? (this.config.pending_sub ?? t("sched_pending_sub", this.hass))
                : d.sub;
              // keyed() so the element is REPLACED when the text changes, which is
              // what lets the animation replay — swapping a text node in place
              // leaves a running animation untouched, so the headline used to
              // change instantly while everything around it eased.
              return html`
                ${keyed(head, html`<span class="headline swap">${head}</span>`)}
                ${keyed(sub, html`<span class="subline swap">${sub}</span>`)}
              `;
            })()}
          </div>

          ${this._modes.length > 1
            ? html`<materia-button-group
                .hass=${this.hass}
                .value=${this._mode}
                .config=${this._tabConfig}
                @option-selected=${(e) => {
                  this._modeTouched = true;
                  this._mode = e.detail.value;
                }}
              ></materia-button-group>`
            : nothing}

          ${pending
            ? html`<div class="strip pending-strip">
                <div class="glyph"><ha-icon icon="m3o:alarm"></ha-icon></div>
                <div class="text">
                  <span class="head">${this.config.pending_label ?? t("sched_scheduled", this.hass)}</span>
                  <span class="sub">
                    ${this.config.pending_sub ?? t("sched_pending_sub", this.hass)}
                  </span>
                </div>
                <button
                  class="strip-cancel"
                  @click=${() => {
                    const clear = this.config.clear_action;
                    if (clear) this._handleAction(clear);
                    else this._fireHaptic("success");
                    this._dismiss();
                  }}
                >${this.config.clear_label ?? t("sched_clear", this.hass)}</button>
              </div>`
            : nothing}

          ${isClock ? (this._isWindow ? this._renderWindow() : this._renderClock()) : this._renderTriggers()}

          <!-- A window is always recurring — it carries its own weekday chips
               inside _renderWindow() — so the generic once/weekly switch below
               is for the classic single-moment picker and the trigger tab only. -->
          ${this._isWindow
            ? nothing
            : html`
                <div class="repeat">
                  <div
                    class="sw ${this._repeating ? "on" : ""}"
                    role="switch"
                    tabindex="0"
                    aria-checked=${this._repeating ? "true" : "false"}
                    @click=${() => { this._repeating = !this._repeating; }}
                  ><i></i></div>
                  <div class="text">
                    <!-- A switch labels WHAT IT TURNS ON; its position shows the state.
                         The label used to flip with the state, so an off switch read
                         "Just once" — which parses as "just-once is disabled", the exact
                         opposite of the truth. The label is now constant and only the
                         sub-line describes the consequence. -->
                    <span class="n">${this.config.repeat_label ?? t("sched_repeat_weekly", this.hass)}</span>
                    <!-- The off line says what HAPPENS, not what does not: "back to
                         normal" named a state that does not exist, so it explained
                         nothing. The on line points at the weekday chips that appear
                         directly below rather than describing them in the abstract,
                         which would just restate what is already on screen. -->
                    <span class="s">${this._repeating
                      ? (this.config.repeat_sub_on ?? t("sched_repeat_sub_on", this.hass))
                      : (this.config.repeat_sub_off ?? t("sched_repeat_sub_off", this.hass))}</span>
                  </div>
                </div>

                ${this._repeating
                  ? html`<materia-button-group
                      class="days rise"
                      .hass=${this.hass}
                      .value=${this._days.map((on, i) => (on ? String(i) : null)).filter(Boolean).join(",")}
                      .config=${this._weekdayConfig}
                      @option-selected=${(e) => {
                        const on = new Set(String(e.detail.value).split(",").filter((x) => x !== ""));
                        this._days = this._days.map((_, i) => on.has(String(i)));
                      }}
                    ></materia-button-group>`
                  : nothing}
              `}

          <div class="actions">
            <button class="cancel" @click=${this._dismiss}>
              ${this.config.close_label ?? t("sched_close", this.hass)}
            </button>
            <button
              class="confirm"
              ?disabled=${!this._hasSelection}
              @click=${this._commit}
            >
              <ha-icon icon="m3o:alarm-on"></ha-icon>
              <span>${this._repeating ? t("sched_save_schedule", this.hass) : t("sched_set_timer", this.hass)}</span>
            </button>
          </div>

          ${this._isWired
            ? nothing
            : html`<div class="mock">${t("sched_mocked_note", this.hass)}</div>`}
        </div>
      </ha-card>
    `;
  }

  _renderSummary() {
    const next = this._tpl("next_label", "_resolvedNextLabel");
    const sub = this._tpl("next_sub", "_resolvedNextSub");
    // MULTIPLE SCHEDULES: an entry whose label renders EMPTY is an unused slot and
    // is dropped, so the dashboard can declare a fixed set of slots and the row
    // grows and shrinks with what is actually scheduled.
    //
    // Fixed slots rather than a discovered list on purpose: discovery means
    // iterating a whole domain in a template, and HA rate-limits those to about
    // once a minute — the exact reason a new schedule did not appear until the
    // page was refreshed. Naming slots makes every read a specific-entity read.
    const rows = (this.config.schedules || []).filter((sc, i) => {
      if (sc.label == null) return true;
      const v = this._isTemplate(sc.label) ? this._tplResults?.[`schedLabel${i}`] : sc.label;
      return String(v ?? "").trim().length > 0;
    });

    return html`
      <ha-card>
        <div class="summary">
          ${next
            ? html`<div class="strip armed">
                <div class="glyph"><ha-icon icon=${this.config.next_icon ?? "m3o:alarm"}></ha-icon></div>
                <div class="text">
                  <span class="head">${next}</span>
                  ${sub ? html`<span class="sub">${sub}</span>` : nothing}
                </div>
                ${this.config.skip_action
                  ? html`<button
                      class="strip-cancel"
                      @click=${() => this._handleAction(this.config.skip_action)}
                    >${this.config.skip_label ?? t("sched_skip", this.hass)}</button>`
                  : nothing}
              </div>`
            : nothing}

          ${rows.length || this.config.add_action
            ? html`<div class="rows">
                ${rows.map((sc) => {
                  const i = (this.config.schedules || []).indexOf(sc);
                  return html`<button
                    class="row-item"
                    @click=${() => sc.tap_action && this._handleAction(sc.tap_action)}
                  >
                    <ha-icon .icon=${sc.icon ?? "m3o:event-repeat"}></ha-icon>
                    <span>${this._isTemplate(sc.label)
                      ? (this._tplResults?.[`schedLabel${i}`] ?? "")
                      : sc.label}</span>
                  </button>`;
                })}
                ${this.config.add_action
                  ? html`<button
                      class="row-add"
                      aria-label=${this.config.add_label ?? t("sched_add", this.hass)}
                      @click=${() => this._handleAction(this.config.add_action)}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor"
                          stroke-width="2.2" stroke-linecap="round" />
                      </svg>
                    </button>`
                  : nothing}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  _renderClock() {
    return html`
      <div class="chips-wrap ${this._customOpen ? "folded" : ""}" ?inert=${this._customOpen}>
      <div class="chips">
        ${this._quick.map(
          (q, i) => html`<button
            class="quick ${this._pick === q.key ? "on" : ""}"
            style="flex-grow:${q.grow}"
            @click=${() => {
              this._pick = q.key;
              this._customOpen = false;
            }}
          >
            <span class="n">${q.name}</span><span class="t">${q.at}</span>
          </button>`
        )}
      </div>
      </div>

      <div class="custom ${this._customOpen ? "open" : ""}">
        <button
          class="custom-head"
          @click=${() => {
            this._customOpen = !this._customOpen;
            if (this._customOpen) {
              this._seedCustom();
              this._pick = "custom";
            }
          }}
        >
          <ha-icon icon="m3o:event"></ha-icon>
          <span class="lbl">${t("sched_pick_date_time", this.hass)}</span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class="custom-body">
          <div class="custom-inner">
            <materia-calendar
              .year=${this._viewY}
              .month=${this._viewM}
              .selected=${this._date}
              no-past
              .locale=${this._lang ?? ""}
              @month-changed=${(e) => {
                this._viewY = e.detail.year;
                this._viewM = e.detail.month;
              }}
              @date-selected=${(e) => {
                this._date = e.detail.day;
                this._pick = "custom";
              }}
            ></materia-calendar>

            <div class="sep"></div>

            <div class="timerow">
              <span class="clock">${this._pad(this._hour)}:${this._pad(this._minute)}</span>
              <span class="spacer"></span>
              <materia-button-group
                class="mins"
                .hass=${this.hass}
                .value=${String(this._minute)}
                .config=${this._minuteConfig}
                @option-selected=${(e) => {
                  this._minute = Number(e.detail.value);
                  this._pick = "custom";
                }}
              ></materia-button-group>
            </div>

            <div class="hours">
              ${Array.from({ length: 24 }, (_, h) => html`<button
                class="hour ${this._hour === h ? "on" : ""}"
                @click=${() => {
                  this._hour = h;
                  this._pick = "custom";
                }}
              >${this._pad(h)}</button>`)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /** Start-stop window (schedule_entity / show_stop). Two independent folds —
   *  each opens onto the same hour-grid + minute-group shape _renderClock's
   *  custom picker already uses, just once per edge — plus the window's own
   *  always-visible weekday chips underneath. */
  _renderWindow() {
    if (this._windowBlocked) {
      return html`
        <div class="window-blocked">
          <ha-icon icon="m3o:calendar-view-day"></ha-icon>
          <div class="text">
            <span class="n">${t("sched_multi_slots_head", this.hass)}</span>
            <span class="s">${t("sched_multi_slots_sub", this.hass)}</span>
          </div>
        </div>
      `;
    }

    const chev = html`<svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;

    return html`
      <div class="window">
        <div class="win-edge ${this._startOpen ? "open" : ""}">
          <button
            class="win-head"
            @click=${() => { this._startOpen = !this._startOpen; this._stopOpen = false; }}
          >
            <span class="lbl">${t("sched_window_start", this.hass)}</span>
            <span class="val">${this._pad(this._hour)}:${this._pad(this._minute)}</span>
            ${chev}
          </button>
          <div class="win-body">
            <div class="win-inner">
              <materia-button-group
                class="mins"
                .hass=${this.hass}
                .value=${String(this._minute)}
                .config=${this._minuteConfig}
                @option-selected=${(e) => { this._minute = Number(e.detail.value); this._dirty = true; }}
              ></materia-button-group>
              <div class="hours">
                ${Array.from({ length: 24 }, (_, h) => html`<button
                  class="hour ${this._hour === h ? "on" : ""}"
                  @click=${() => { this._hour = h; this._dirty = true; }}
                >${this._pad(h)}</button>`)}
              </div>
            </div>
          </div>
        </div>

        <div class="win-edge ${this._stopOpen ? "open" : ""}">
          <button
            class="win-head"
            @click=${() => { this._stopOpen = !this._stopOpen; this._startOpen = false; }}
          >
            <span class="lbl">${t("sched_window_stop", this.hass)}</span>
            <span class="val">${this._pad(this._stopHour)}:${this._pad(this._stopMinute)}</span>
            <!-- Non-normative: crossing midnight round-trips exactly as entered,
                 this is only here so the reversed order doesn't read as a mistake. -->
            ${this._windowOvernight ? html`<span class="overnight-badge">${t("sched_window_overnight", this.hass)}</span>` : nothing}
            ${chev}
          </button>
          <div class="win-body">
            <div class="win-inner">
              <materia-button-group
                class="mins"
                .hass=${this.hass}
                .value=${String(this._stopMinute)}
                .config=${this._minuteConfig}
                @option-selected=${(e) => { this._stopMinute = Number(e.detail.value); this._dirty = true; }}
              ></materia-button-group>
              <div class="hours">
                ${Array.from({ length: 24 }, (_, h) => html`<button
                  class="hour ${this._stopHour === h ? "on" : ""}"
                  @click=${() => { this._stopHour = h; this._dirty = true; }}
                >${this._pad(h)}</button>`)}
              </div>
            </div>
          </div>
        </div>

        <div class="win-days">
          <span class="win-days-label">${t("sched_window_days", this.hass)}</span>
          <materia-button-group
            class="days"
            .hass=${this.hass}
            .value=${this._days.map((on, i) => (on ? String(i) : null)).filter(Boolean).join(",")}
            .config=${this._weekdayConfig}
            @option-selected=${(e) => {
              const on = new Set(String(e.detail.value).split(",").filter((x) => x !== ""));
              this._days = this._days.map((_, i) => on.has(String(i)));
              this._dirty = true;
            }}
          ></materia-button-group>
        </div>
      </div>
    `;
  }

  _renderTriggers() {
    return html`
      <div class="list">
        ${this._events.map(
          (e, i) => html`<button
            class="trigger rise ${this._event === e.key ? "on" : ""}"
            style="animation-delay:${i * 45}ms"
            @click=${() => { this._event = e.key; }}
          >
            <ha-icon .icon=${e.icon}></ha-icon>
            <div class="text">
              <span class="n">${e.name}</span><span class="s">${e.sub}</span>
            </div>
            <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
          </button>`
        )}
      </div>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return this._open || this._isSheet ? 10 : 2;
  }
}

customElements.define("materia-schedule", MateriaSchedule);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-schedule",
  name: "Materia Schedule",
  description: "Shortcuts-first schedule picker — quick chips, non-clock triggers, and a calendar that stays folded until asked for. Mocked, no backend.",
  preview: true,
});
