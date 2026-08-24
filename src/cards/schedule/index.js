import { LitElement, html, nothing } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { t } from "../../utils/i18n.js";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "../../elements/button-group/index.js";
import "./editor.js";

/**
 * Schedule picker (materia-schedule) — design doc 7a and 7b as ONE card.
 *
 * 7b is the collapsed strip on the page; 7a is the picker. They are the same
 * card in two states rather than separate implementations. Manager cards may
 * also open that same picker in Browser Mod, keeping long dashboards compact;
 * inline remains the dependency-free fallback.
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
    _multipleSlots: { state: true },
    _resolvedPending: { state: true },
    _resolvedNextLabel: { state: true },
    _resolvedNextSub: { state: true },
    _activeScheduleEntity: { state: true },
    _targetEntity: { state: true },
    _targetEntities: { state: true },
    _targetAction: { state: true },
    _targetEndAction: { state: true },
    _removeArmed: { state: true },
    _targetPickerOpen: { state: true },
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
    if (this._isManagerEditor) {
      this._open = true;
      this._activeScheduleEntity = config.schedule_entity || null;
      if (this._activeScheduleEntity) {
        // hass arrives after setConfig; updated() seeds the live entry once it
        // is available. Do not select a default here because that marks the
        // draft dirty and would block the seed.
        this._dirty = false;
      } else if (!this._targetEntities.length) {
        this._selectTarget(this._managerTargets[0]?.entity);
        this._days = [true, true, true, true, true, true, true];
      }
    } else if (this._isManager && !this._targetEntities.length) {
      this._selectTarget(this._managerTargets[0]?.entity);
    }
  }

  /** "sheet" drops the collapsed strip and renders the picker directly, for
   *  putting the card INSIDE a modal (browser_mod.popup) rather than expanding
   *  it in place. The strip stays the default because a bare picker sitting on a
   *  dashboard has nothing to summarise and no way to be dismissed. */
  get _isSheet() {
    return this.config.presentation === "sheet" || this._isManagerEditor;
  }

  get _isManagerEditor() {
    return this.config.presentation === "manager-editor";
  }

  /** Design 7b: the page-level summary. Not a picker at all — it shows what is
   *  set and offers the three things you actually want from a glance: skip the
   *  next run, open an existing schedule, or add another. The picker itself lives
   *  behind `add_action`, which is why this stays a presentation of the same card
   *  rather than a second card: same config surface, same wiring seam. */
  get _isSummary() {
    return this.config.presentation === "summary";
  }

  /** Parent-facing Scheduler frontend. Technical entity IDs and service names
   *  are declared once in card config; the runtime only exposes friendly
   *  devices, actions and schedules. */
  get _isManager() {
    return this.config.presentation === "manager"
      || this.config.manage_schedules === true
      || Array.isArray(this.config.targets);
  }

  get _managerTargets() {
    return (this.config.targets || [])
      .map((item) => typeof item === "string" ? { entity: item } : item)
      .filter((item) => item?.entity);
  }

  get _scheduleEntity() {
    return this._activeScheduleEntity || this.config.schedule_entity || "";
  }

  get _managedSchedules() {
    const explicit = new Set(this.config.schedule_entities || []);
    const targets = new Set(this._managerTargets.map((item) => item.entity));
    return Object.values(this.hass?.states || {})
      .filter((stateObj) => stateObj.entity_id.startsWith("switch.schedule_"))
      .filter((stateObj) => explicit.has(stateObj.entity_id)
        || (stateObj.attributes.entities || []).some((entity) => targets.has(entity)))
      .sort((a, b) => String(a.attributes.next_trigger || "9999").localeCompare(String(b.attributes.next_trigger || "9999")));
  }

  _targetConfig(entity = this._targetEntity) {
    return this._managerTargets.find((item) => item.entity === entity) || null;
  }

  _targetName(entity = this._targetEntity) {
    return this._targetConfig(entity)?.name
      || this.hass?.states?.[entity]?.attributes?.friendly_name
      || entity
      || t("sched_choose_device", this.hass);
  }

  _targetActions(entity = this._targetEntity) {
    const configured = this._targetConfig(entity)?.actions;
    if (configured?.length) return configured.map((item) => typeof item === "string" ? { service: item } : item);
    const domain = String(entity || "switch.unknown").split(".")[0];
    return [
      { service: `${domain}.turn_on`, label: t("state_on", this.hass), icon: "m3o:power-settings-new" },
      { service: `${domain}.turn_off`, label: t("state_off", this.hass), icon: "m3o:power-off" },
    ];
  }

  _actionKey(action) {
    if (!action) return "";
    if (typeof action === "string") return action;
    if (action.key != null) return String(action.key);
    const data = action.service_data && Object.keys(action.service_data).length
      ? JSON.stringify(action.service_data)
      : "";
    return data ? `${action.service}::${data}` : action.service;
  }

  _actionForSelection(selection, entity = this._targetEntity) {
    return this._targetActions(entity).find((item) => this._actionKey(item) === selection)
      || this._targetActions(entity).find((item) => item.service === selection)
      || null;
  }

  _inverseAction(selection, actions = this._commonTargetActions()) {
    const selected = actions.find((item) => this._actionKey(item) === selection);
    const service = selected?.service || String(selection || "").split("::", 1)[0];
    const inverse = service.endsWith(".turn_on")
      ? service.replace(/\.turn_on$/, ".turn_off")
      : service.endsWith(".turn_off")
        ? service.replace(/\.turn_off$/, ".turn_on")
        : null;
    return inverse
      ? this._actionKey(actions.find((item) => item.service === inverse))
      : "";
  }

  _defaultEndAction(startAction, actions = this._commonTargetActions()) {
    return this._inverseAction(startAction, actions)
      || this._actionKey(actions.find((item) => this._actionKey(item) !== startAction))
      || startAction
      || null;
  }

  get _selectedTargets() {
    return this._targetEntities?.length
      ? this._targetEntities
      : (this._targetEntity ? [this._targetEntity] : []);
  }

  _commonTargetActions(entities = this._selectedTargets) {
    if (!entities.length) return [];
    const first = this._targetActions(entities[0]);
    return first.filter((action) => entities.every((entity) =>
      this._targetActions(entity).some((candidate) => this._actionKey(candidate) === this._actionKey(action))
    ));
  }

  _targetSelectionName(entities = this._selectedTargets) {
    if (!entities.length) return t("sched_choose_device", this.hass);
    return entities.map((entity) => this._targetName(entity)).join(" + ");
  }

  _actionName(service = this._targetAction, entity = this._targetEntity) {
    const action = this._actionForSelection(service, entity);
    const rawService = action?.service || String(service || "").split("::", 1)[0];
    return action?.label || (rawService.endsWith("turn_off") ? t("state_off", this.hass) : t("state_on", this.hass));
  }

  _selectTarget(entity) {
    this._selectTargets(entity ? [entity] : []);
  }

  _selectTargets(value) {
    const requested = Array.isArray(value) ? value : (value ? [value] : []);
    const allowed = new Set(this._managerTargets.map((item) => item.entity));
    const entities = [...new Set(requested)].filter((entity) => allowed.has(entity));
    this._targetEntities = entities;
    this._targetEntity = entities[0] || null;
    const actions = this._commonTargetActions(entities);
    if (!actions.some((action) => this._actionKey(action) === this._targetAction)) {
      this._targetAction = this._actionKey(actions[0]) || null;
    }
    if (!actions.some((action) => this._actionKey(action) === this._targetEndAction)) {
      this._targetEndAction = this._defaultEndAction(this._targetAction, actions);
    }
    this._dirty = true;
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
      if (this._scheduleEntity && !this._dirty) this._seedFromEntity();
    }
    // Reflected as an attribute so the stylesheet can flatten the surface —
    // a config value alone is invisible to CSS.
    this.toggleAttribute("sheet", this._isSheet);
  }

  constructor() {
    super();
    const now = new Date();
    this._open = false;
    this._armed = null; // { head, sub, repeating } once confirmed
    this._mode = "clock";
    this._pick = null; // resolved lazily to the first preset
    this._event = null;
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
    this._multipleSlots = false;
    this._activeScheduleEntity = null;
    this._targetEntity = null;
    this._targetEntities = [];
    this._targetAction = null;
    this._targetEndAction = null;
    this._removeArmed = false;
    // Plain fields, not reactive props: neither is ever read by render()
    // directly, only by the seed/commit machinery.
    this._entityActions = null; // actions read off schedule_entity, preserved on write
    this._entityTags = [];
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
    if (this._isWindow) return !this._windowBlocked
      && !this._windowSameTime
      && this._days.some(Boolean)
      && (!this._isManager || (this._selectedTargets.length > 0 && !!this._targetAction && !!this._targetEndAction));
    return this._mode === "event" ? this._event != null : this._pick != null;
  }

  /* ---- window mode: a recurring start-stop range instead of one moment ----

     Bound to a Scheduler `switch.schedule_*` (schedule_entity) or opted into
     bare (show_stop) for a custom confirm_action. Only replaces the CLOCK
     tab's content — the trigger tab is untouched, and unlike a one-off
     moment a window is always recurring, so it carries its own weekday chips
     rather than reusing the generic repeat switch. */

  get _isWindow() {
    return this._mode === "clock" && (this._isManager || this.config.show_stop === true || !!this._scheduleEntity);
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

  get _windowSameTime() {
    return this._stopHour === this._hour && this._stopMinute === this._minute;
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
    const id = this._scheduleEntity;
    if (!id) return;
    const st = this.hass?.states[id];
    if (!st) return;
    const slots = st.attributes.timeslots || [];
    const marker = (st.attributes.tags || []).find((tag) => String(tag).startsWith("materia_window_"));
    const markerMatch = marker && /^materia_window_(\d{2})(\d{2})_(\d{2})(\d{2})$/.exec(String(marker));
    this._multipleSlots = slots.length > 1 && !markerMatch;
    this._entityActions = st.attributes.actions ?? null;
    if (this._isManager) {
      const allowed = new Set(this._managerTargets.map((item) => item.entity));
      const entities = [...new Set(st.attributes.entities || [])].filter((entity) => allowed.has(entity));
      this._targetEntities = entities;
      this._targetEntity = entities[0] || null;
      const common = this._commonTargetActions(entities);
      // Scheduler exposes one representative action per timeslot in the state
      // attributes, even when that timeslot targets several entities.
      const slotActions = st.attributes.actions || [];
      const slotStarts = slots.map((raw) => String(raw).trim().split(/\s+-\s+/)[0]?.slice(0, 5));
      const startText = markerMatch ? `${markerMatch[1]}:${markerMatch[2]}` : null;
      const stopText = markerMatch ? `${markerMatch[3]}:${markerMatch[4]}` : null;
      const startIndex = startText ? slotStarts.indexOf(startText) : 0;
      const endIndex = stopText ? slotStarts.indexOf(stopText) : -1;
      const startSelection = this._actionKey(slotActions[Math.max(0, startIndex)]);
      const endSelection = this._actionKey(slotActions[endIndex]);
      this._targetAction = common.some((action) => this._actionKey(action) === startSelection)
        ? startSelection
        : this._actionKey(common[0]) || null;
      this._targetEndAction = common.some((action) => this._actionKey(action) === endSelection)
        ? endSelection
        : this._defaultEndAction(this._targetAction, common);
    }

    if (markerMatch) {
      this._hour = Number(markerMatch[1]);
      this._minute = Number(markerMatch[2]);
      this._stopHour = Number(markerMatch[3]);
      this._stopMinute = Number(markerMatch[4]);
    } else {
      const raw = slots[0];
      const m = raw && /^(\d{1,2}):(\d{2})(?::\d{2})?\s*-\s*(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(String(raw).trim());
      if (m) {
        this._hour = Number(m[1]);
        this._minute = Number(m[2]);
        this._stopHour = Number(m[3]);
        this._stopMinute = Number(m[4]);
      }
    }
    this._entityTags = st.attributes.tags ?? [];

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
    return !!(this.config.confirm_action || this.config.trigger_action || this._scheduleEntity || this._isManager
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
    if (this._isManager) return ["clock"];
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

  _localDateTimeValue(date) {
    return `${date.getFullYear()}-${this._pad(date.getMonth() + 1)}-${this._pad(date.getDate())}T${this._hhmm(date)}`;
  }

  get _nativeDateTimeValue() {
    if (this._pick === "custom") {
      return this._localDateTimeValue(new Date(this._viewY, this._viewM, this._date, this._hour, this._minute));
    }
    return this._localDateTimeValue(this._quick.find((x) => x.key === this._pickKey)?.when ?? new Date(Date.now() + 3600000));
  }

  _setNativeDateTime(event) {
    const raw = String(event.currentTarget.value || "");
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(raw);
    if (!match) return;
    this._viewY = Number(match[1]);
    this._viewM = Number(match[2]) - 1;
    this._date = Number(match[3]);
    this._hour = Number(match[4]);
    this._minute = Number(match[5]);
    this._pick = "custom";
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
    const actions = this._isManager
      ? this._scheduledActions(this._targetAction)
      : (this.config.actions ?? this._entityActions ?? []);
    const endActions = this._isManager
      ? this._scheduledActions(this._targetEndAction)
      : (this.config.end_actions ?? this._inverseScheduledActions(actions));
    const tags = [
      ...(this._entityTags || []).filter((tag) => !String(tag).startsWith("materia_window_")),
      `materia_window_${start.replace(":", "")}_${stop.replace(":", "")}`,
    ];
    return {
      start,
      stop,
      weekdays,
      actions,
      start_actions: actions,
      end_actions: endActions,
      timeslots: this._scheduleTimeslots(start, stop, actions, endActions),
      tags,
      entity: this._scheduleEntity,
      name: `${this._targetSelectionName()} · ${this._windowLabel}`,
      label: this._windowLabel,
    };
  }

  _scheduledActions(selection) {
    return this._selectedTargets.map((entity) => {
      const configured = this._actionForSelection(selection, entity) || { service: selection };
      return {
        service: configured.service,
        entity_id: entity,
        ...(configured.service_data ? { service_data: configured.service_data } : {}),
      };
    });
  }

  _inverseScheduledActions(actions) {
    return actions.map((action) => ({
      ...action,
      service: String(action.service || "").endsWith(".turn_on")
        ? String(action.service).replace(/\.turn_on$/, ".turn_off")
        : String(action.service || "").endsWith(".turn_off")
          ? String(action.service).replace(/\.turn_off$/, ".turn_on")
          : action.service,
      ...(action.service_data ? { service_data: action.service_data } : {}),
    }));
  }

  _scheduleTimeslots(start, stop, startActions, endActions) {
    const startMinutes = this._hour * 60 + this._minute;
    const stopMinutes = this._stopHour * 60 + this._stopMinute;
    const slots = [];
    if (startMinutes < stopMinutes) {
      if (startMinutes > 0) slots.push({ start: "00:00", stop: start, actions: endActions });
      slots.push({ start, stop, actions: startActions });
      if (stopMinutes > 0) slots.push({ start: stop, stop: "00:00", actions: endActions });
    } else {
      if (stopMinutes > 0) slots.push({ start: "00:00", stop, actions: startActions });
      slots.push({ start: stop, stop: start, actions: endActions });
      if (startMinutes > 0) slots.push({ start, stop: "00:00", actions: startActions });
    }
    return slots;
  }

  /** Only fires when schedule_entity is set AND config doesn't supply its own
   *  confirm_action — a bare show_stop window with no entity has nothing
   *  sensible to call by default and stays a mock, same as the classic
   *  picker does with nothing wired. */
  _defaultWindowAction() {
    if (!this._scheduleEntity && !this._isManager) return null;
    const editing = !!this._scheduleEntity;
    return {
      action: "perform-action",
      perform_action: editing ? "scheduler.edit" : "scheduler.add",
      data: {
        // Scheduler defines entity_id as ordinary service data (single string),
        // not as HA target metadata. Passing it through target normalizes it to
        // an array and Scheduler rejects that value.
        ...(editing ? { entity_id: "$entity" } : {}),
        weekdays: "$weekdays",
        repeat_type: "repeat",
        ...(!editing ? { name: "$name" } : {}),
        // Write shape is {start, stop, actions} — NOT the "HH:MM:SS - HH:MM:SS"
        // string schedule_entity's own timeslots attribute reads back as. See
        // _seedFromEntity for the other half of that asymmetry.
        timeslots: "$timeslots",
        tags: "$tags",
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
    if (this._isManager) this._activeScheduleEntity = null;
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

  _openNewSchedule() {
    if (this.config.editor_presentation === "popup") {
      this._openManagerPopup();
      return;
    }
    this._activeScheduleEntity = null;
    this._selectTarget(this._managerTargets[0]?.entity);
    this._hour = 9;
    this._minute = 0;
    this._stopHour = 10;
    this._stopMinute = 0;
    this._days = [true, true, true, true, true, true, true];
    this._multipleSlots = false;
    this._removeArmed = false;
    this._dirty = true;
    this._open = true;
  }

  _openSchedule(stateObj) {
    if (this.config.editor_presentation === "popup") {
      this._openManagerPopup(stateObj.entity_id);
      return;
    }
    this._activeScheduleEntity = stateObj.entity_id;
    this._dirty = false;
    this._removeArmed = false;
    this._seedFromEntity();
    this._open = true;
  }

  _openManagerPopup(scheduleEntity = null) {
    const content = {
      ...this.config,
      type: "custom:materia-schedule",
      presentation: "manager-editor",
      editor_presentation: "inline",
    };
    delete content.grid_options;
    delete content.visibility;
    if (scheduleEntity) content.schedule_entity = scheduleEntity;
    else delete content.schedule_entity;

    this._handleAction({
      action: "fire-dom-event",
      browser_mod: {
        service: "browser_mod.popup",
        data: {
          title: scheduleEntity ? t("sched_edit", this.hass) : t("sched_new", this.hass),
          dismissable: true,
          size: "normal",
          content,
          popup_styles: [{
            style: "all",
            styles: "ha-dialog { --mdc-dialog-max-width: 640px; --mdc-dialog-min-width: min(92vw, 420px); --mdc-dialog-max-height: 88vh; } .content .container { padding: 0 !important; overflow: auto !important; }",
          }],
        },
      },
    });
  }

  _formatNext(stateObj) {
    const raw = stateObj.attributes.next_trigger;
    if (!raw) return stateObj.state === "on" ? t("sched_enabled", this.hass) : t("sched_disabled", this.hass);
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return String(raw);
    return new Intl.DateTimeFormat(this._lang, { weekday: "short", hour: "2-digit", minute: "2-digit" }).format(date);
  }

  _renderManager() {
    const schedules = this._managedSchedules;
    return html`<ha-card><div class="sheet manager">
      <div class="manager-head">
        <div>
          <span class="manager-title">${this.config.name ?? t("sched_name_default", this.hass)}</span>
          <span class="manager-sub">${t("sched_manager_sub", this.hass)}</span>
        </div>
        <button class="manager-add" @click=${this._openNewSchedule}>
          <ha-icon icon="mdi:plus"></ha-icon><span>${t("sched_add_short", this.hass)}</span>
        </button>
      </div>
      <div class="schedule-list">
        ${schedules.length ? schedules.map((stateObj) => {
          const targets = stateObj.attributes.entities || [];
          const target = targets[0];
          const marker = (stateObj.attributes.tags || []).find((tag) => String(tag).startsWith("materia_window_"));
          const markerMatch = marker && /^materia_window_(\d{2})(\d{2})_(\d{2})(\d{2})$/.exec(String(marker));
          const markerStart = markerMatch ? `${markerMatch[1]}:${markerMatch[2]}` : null;
          const timeslots = stateObj.attributes.timeslots || [];
          const slotIndex = markerStart
            ? Math.max(0, timeslots.findIndex((slot) => String(slot).trim().startsWith(markerStart)))
            : 0;
          const service = (stateObj.attributes.actions || [])[slotIndex]?.service;
          const time = markerMatch
            ? `${markerStart} - ${markerMatch[3]}:${markerMatch[4]}`
            : timeslots[0] || "";
          return html`<div class="schedule-row">
            <button class="schedule-main" @click=${() => this._openSchedule(stateObj)}>
              <ha-icon icon=${targets.length > 1 ? "m3o:devices" : (this._targetConfig(target)?.icon ?? "m3o:schedule")}></ha-icon>
              <span class="schedule-text">
                <span class="schedule-name">${this._targetSelectionName(targets)} · ${this._actionName(service, target)}</span>
                <span class="schedule-sub">${time} · ${this._formatNext(stateObj)}</span>
              </span>
              <ha-icon icon="m3o:edit"></ha-icon>
            </button>
            <button
              class="schedule-toggle ${stateObj.state === "on" ? "on" : ""}"
              role="switch"
              aria-checked=${stateObj.state === "on" ? "true" : "false"}
              aria-label=${stateObj.state === "on" ? t("sched_disable", this.hass) : t("sched_enable", this.hass)}
              @click=${() => this.hass.callService("switch", stateObj.state === "on" ? "turn_off" : "turn_on", {}, { entity_id: stateObj.entity_id })}
            ><i></i></button>
          </div>`;
        }) : html`<button class="manager-empty" @click=${this._openNewSchedule}>
          <ha-icon icon="m3o:add-alarm"></ha-icon>
          <span><b>${t("sched_empty_head", this.hass)}</b>${t("sched_empty_sub", this.hass)}</span>
        </button>`}
      </div>
    </div></ha-card>`;
  }

  _renderManagerFields() {
    const selectedTargets = this._selectedTargets;
    const targetSummary = selectedTargets.length
      ? this._targetSelectionName(selectedTargets)
      : t("sched_choose_device", this.hass);
    return html`<div class="manager-fields">
      <div class="manager-field"><span>${t("sched_devices", this.hass)}</span>
        <button
          class="target-field ${this._targetPickerOpen ? "open" : ""}"
          aria-haspopup="listbox"
          aria-expanded=${this._targetPickerOpen ? "true" : "false"}
          @click=${() => { this._targetPickerOpen = !this._targetPickerOpen; }}
        >
          <ha-icon icon=${selectedTargets.length === 1
            ? (this._targetConfig(selectedTargets[0])?.icon || "m3o:toggle-on")
            : "m3o:devices"}></ha-icon>
          <span>${targetSummary}</span>
          <ha-icon class="expand" icon="m3o:expand-more"></ha-icon>
        </button>
        ${this._targetPickerOpen ? html`<div class="target-options" role="listbox" aria-multiselectable="true">
          ${this._managerTargets.map((item) => {
            const selected = selectedTargets.includes(item.entity);
            return html`<button
              class=${selected ? "selected" : ""}
              role="option"
              aria-selected=${selected ? "true" : "false"}
              @click=${() => this._selectTargets(selected
                ? selectedTargets.filter((entity) => entity !== item.entity)
                : [...selectedTargets, item.entity])}
            >
              <ha-icon icon=${item.icon || "m3o:toggle-on"}></ha-icon>
              <span>${this._targetName(item.entity)}</span>
              <i class="target-check ${selected ? "selected" : ""}" aria-hidden="true">
                <ha-icon icon=${selected ? "mdi:checkbox-marked" : "mdi:checkbox-blank-outline"}></ha-icon>
              </i>
            </button>`;
          })}
        </div>` : nothing}
      </div>
    </div>`;
  }

  _removeSchedule() {
    if (!this._scheduleEntity) return;
    if (!this._removeArmed) {
      this._removeArmed = true;
      this._fireHaptic("warning");
      return;
    }
    this.hass.callService("scheduler", "remove", { entity_id: this._scheduleEntity });
    this._activeScheduleEntity = null;
    this._removeArmed = false;
    this._open = false;
    if (this._isManagerEditor) this._dismiss();
  }

  render() {
    if (!this.config) return html``;

    if (this._isManager && !this._open && !this._isManagerEditor) return this._renderManager();
    if (this._isSummary) return this._renderSummary();

    if (!this._open && !this._isSheet) {
      return html`<ha-card><div class="sheet">${this._renderStrip()}</div></ha-card>`;
    }

    const pending = this._pending;
    const d = this._describe;
    const isClock = this._mode === "clock";

    return html`
      <ha-card>
        <div class="sheet ${this._isManagerEditor ? "manager-editor" : ""}">
          <div class="echo">
            <span class="eyebrow">${this._isManager
              ? (this._scheduleEntity ? t("sched_edit", this.hass) : t("sched_new", this.hass))
              : (this.config.name ?? t("sched_name_default", this.hass))}</span>
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

          ${this._isManager ? this._renderManagerFields() : nothing}

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
            ${this._isManager && this._scheduleEntity
              ? html`<button class="remove ${this._removeArmed ? "armed" : ""}" @click=${this._removeSchedule}>
                  ${this._removeArmed ? t("sched_delete_confirm", this.hass) : t("sched_delete", this.hass)}
                </button>`
              : nothing}
            <button class="cancel" @click=${this._dismiss}>
              ${this.config.close_label ?? t("sched_close", this.hass)}
            </button>
            <button
              class="confirm"
              ?disabled=${!this._hasSelection}
              @click=${this._commit}
            >
              <ha-icon icon="m3o:alarm-on"></ha-icon>
              <span>${this._isWindow || this._repeating
                ? t("sched_save_schedule", this.hass)
                : t("sched_set_timer", this.hass)}</span>
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
      <div class="chips-wrap">
      <div class="chips">
        ${this._quick.map(
          (q, i) => html`<button
            class="quick ${this._pick === q.key ? "on" : ""}"
            style="flex-grow:${q.grow}"
            @click=${() => {
              this._pick = q.key;
            }}
          >
            <span class="n">${q.name}</span><span class="t">${q.at}</span>
          </button>`
        )}
      </div>
      </div>

      <div class="custom native-datetime">
        <div class="custom-head" @click=${this._showNativeTimePicker}>
          <ha-icon icon="m3o:event"></ha-icon>
          <span class="lbl">${t("sched_pick_date_time", this.hass)}</span>
          <input
            class="native-datetime-input"
            type="datetime-local"
            required
            step="60"
            aria-label=${t("sched_pick_date_time", this.hass)}
            min=${this._localDateTimeValue(new Date())}
            .value=${this._nativeDateTimeValue}
            @input=${this._setNativeDateTime}
          />
        </div>
      </div>
    `;
  }

  /** Start-stop window (schedule_entity / show_stop). The input itself covers
   *  each styled row, so a direct tap invokes the operating system's time
   *  picker: wheel on iOS, native dialog on Android, browser picker on desktop.
   *  There is no expanding imitation of a picker to maintain or scroll past. */
  _showNativeTimePicker(event) {
    const input = event.currentTarget.querySelector("input[type='time'], input[type='datetime-local']");
    if (!input || event.composedPath().includes(input)) return;
    input.focus();
    try {
      input.showPicker?.();
    } catch (_) {
      // Firefox and older WebViews have no programmatic picker; focus still
      // exposes their native editable time field.
    }
  }

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

    const actionOptions = this._isManager
      ? this._commonTargetActions().map((item) => ({
          value: this._actionKey(item),
          label: item.label || this._actionName(this._actionKey(item)),
        }))
      : [];
    const actionSelector = (value, label, change) => this._isManager ? html`
      <div class="win-action" @click=${(event) => event.stopPropagation()}>
        <span class="sr-only">${label}</span>
        <ha-selector
          .hass=${this.hass}
          .selector=${{ select: { mode: "dropdown", options: actionOptions } }}
          .value=${value || ""}
          @value-changed=${change}
        ></ha-selector>
      </div>
    ` : nothing;

    return html`
      <div class="window">
        <div class="win-edge native-time">
          <div class="win-head" @click=${this._showNativeTimePicker}>
            <span class="lbl">${t("sched_window_start", this.hass)}</span>
            ${actionSelector(this._targetAction, t("sched_start_action", this.hass), (event) => {
              this._targetAction = event.detail.value;
              this._dirty = true;
            })}
            <input
              class="native-time-input"
              type="time"
              required
              step="60"
              aria-label=${t("sched_window_start", this.hass)}
              .value=${`${this._pad(this._hour)}:${this._pad(this._minute)}`}
              @input=${(event) => {
                const [hour, minute] = String(event.currentTarget.value || "").split(":").map(Number);
                if (Number.isFinite(hour) && Number.isFinite(minute)) {
                  this._hour = hour;
                  this._minute = minute;
                  this._dirty = true;
                }
              }}
            />
          </div>
        </div>

        <div class="win-edge native-time">
          <div class="win-head" @click=${this._showNativeTimePicker}>
            <span class="lbl">${t("sched_window_stop", this.hass)}</span>
            ${actionSelector(this._targetEndAction, t("sched_end_action", this.hass), (event) => {
              this._targetEndAction = event.detail.value;
              this._dirty = true;
            })}
            <!-- Non-normative: crossing midnight round-trips exactly as entered,
                 this is only here so the reversed order doesn't read as a mistake. -->
            ${this._windowOvernight ? html`<span class="overnight-badge">${t("sched_window_overnight", this.hass)}</span>` : nothing}
            <input
              class="native-time-input"
              type="time"
              required
              step="60"
              aria-label=${t("sched_window_stop", this.hass)}
              .value=${`${this._pad(this._stopHour)}:${this._pad(this._stopMinute)}`}
              @input=${(event) => {
                const [hour, minute] = String(event.currentTarget.value || "").split(":").map(Number);
                if (Number.isFinite(hour) && Number.isFinite(minute)) {
                  this._stopHour = hour;
                  this._stopMinute = minute;
                  this._dirty = true;
                }
              }}
            />
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
