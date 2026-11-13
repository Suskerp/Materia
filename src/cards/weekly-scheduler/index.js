import { LitElement, html, nothing } from "lit";
import { t } from "../../utils/i18n.js";
import { loadEditors } from "../../utils/load-editors.js";
import { DAYS, clock, minutes, clone, validateBlock, applyPreset, presetDayBlocks, copyDays } from "./model.js";
import { entityId, memberName, memberIcon, domainOf, cleanSettings, validateSettings, describeSettings, periodActions, actionData, defaultSettings, settingsSchema } from "./targets.js";
import { homePlanWeeks, saveScheduleBatch } from "./plans.js";
import { dayIndex, nowMinutes, sortedBlocks, where, slotAt, planMatchesDay, span, sameOnDays, hhmm } from "./view-model.js";
import { renderSettings, choiceGroup } from "./controls.js";
import { styles } from "./styles.js";
import { MOTION } from "../../utils/motion.js";
import { PressController } from "../../utils/press.js";
import "../../elements/button-group/index.js";

/**
 * Weekly scheduler (materia-weekly-scheduler) — a week of periods for any
 * group of devices, stored in a native HA `schedule` helper.
 *
 * One card, three screens: the overview (every group with what it is doing
 * today and a now line), a group (the week at a glance, the chosen day as a
 * bar you tap to add or edit, its periods as a list), and bottom sheets for a
 * period, copying a day, presets and whole-home plans. What a period does is
 * drawn per device from targets.js, so climate is one kind of device among
 * lights, switches, fans, humidifiers, numbers, selects and actions.
 *
 * Every group is just a schedule helper and its devices. A group whose one
 * device is a RoomMind thermostat (climate.roommind_<area>) is recognised by
 * itself: its periods store only a temperature (RoomMind reads the schedule)
 * and outside periods RoomMind's own Eco temperature applies.
 */
/** The RoomMind area of a group whose only device is a RoomMind thermostat, else null. */
export const roommindArea = (members) => {
  const ids = members.map(entityId).filter(Boolean);
  return ids.length === 1 && ids[0].startsWith("climate.roommind_") ? ids[0].slice("climate.roommind_".length) : null;
};

/** "18 °C" never breaks between the number and its unit. */
const keepUnit = (text) => String(text).replace(/ (°[CF]|%|K)(?=$|[\s·,])/g, "\u00a0$1");

/** Kinds of device that a period switches on, and that should go off again at its end by default. */
const ONOFF = new Set(["light", "switch", "input_boolean", "fan", "humidifier"]);

class MateriaWeeklyScheduler extends LitElement {
  /** Holds the pressed shape on touch (see utils/press.js). */
  _press = new PressController(this, ".icon-button, .text-button, .filled-button, .assist-chip, .filter-chip, .fab, .week-row, .group-card, .radio-item, .device-head, .list-item, .tonal-icon");
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _room: { state: true },
    _day: { state: true },
    _overview: { state: true },
    _schedules: { state: true },
    _roommind: { state: true },
    _sheet: { state: true },
    _busy: { state: true },
    _error: { state: true },
    _tick: { state: true },
    _snackbar: { state: true },
    _drag: { state: true },
  };

  static styles = styles;

  static async getConfigElement() {
    await loadEditors();
    return document.createElement("materia-weekly-scheduler-editor");
  }

  static getStubConfig(hass) {
    const ids = Object.keys(hass?.states || {});
    const entity = ids.find((id) => id.startsWith("climate.")) || "";
    return { groups: [{ name: "Schedule", members: entity ? [{ entity }] : [], schedule: ids.find((id) => id.startsWith("schedule.")) || "" }] };
  }

  setConfig(config) {
    const groups = config.groups || config.rooms;
    if (!Array.isArray(groups) || !groups.length) throw new Error("Weekly scheduler: add at least one schedule group.");
    for (const group of groups) {
      const ids = (group.members || []).map(entityId).filter(Boolean);
      if (new Set(ids).size !== ids.length) throw new Error("Each entity can appear only once in a schedule group.");
    }
    const rooms = groups.map((group) => {
      const members = (group.members || (group.climate ? [{ entity: group.climate }] : [])).filter((m) => entityId(m));
      const roommind = roommindArea(members);
      const backend = roommind ? "roommind" : undefined;
      return { ...group, backend, roommind_area: group.roommind_area || roommind || undefined, members: members.map((m) => ({ ...m, backend })) };
    });
    this.config = { ...config, rooms };
    this._room = Math.min(this._room ?? 0, rooms.length - 1);
    this._day ??= dayIndex();
    this._overview ??= rooms.length > 1;
    if (rooms.length === 1) this._overview = false;
    if (this.hass) this._load();
  }

  set hass(value) {
    const previous = this._hass;
    this._hass = value;
    if (!this._schedules && this.config) this._load();
    const watched = this.config?.rooms.some((g) => g.members.some((m) => previous?.states?.[entityId(m)] !== value?.states?.[entityId(m)]) || previous?.states?.[g.schedule] !== value?.states?.[g.schedule]);
    if (watched) {
      if (this.config.rooms.some((g) => previous?.states?.[g.schedule]?.last_updated !== value?.states?.[g.schedule]?.last_updated)) this._load();
      this.requestUpdate();
    }
  }
  get hass() { return this._hass; }

  connectedCallback() {
    super.connectedCallback();
    // The now line and "until …" texts move with the clock.
    this._timer = setInterval(() => { this._tick = Date.now(); }, 60000);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  getCardSize() { return this._overview ? 2 + (this.config?.rooms.length || 1) * 2 : 10; }
  getGridOptions() { return { columns: 12, min_columns: 4 }; }

  _label(key, vars) { return t(`ws_${key}`, this.hass, vars); }
  get _unit() { return this.hass?.config?.unit_system?.temperature || "°C"; }
  get _group() { return this.config.rooms[this._room]; }
  get _members() { return this._group.members; }
  _schedule(group = this._group) { return this._lookup[group.schedule]; }
  get _lookup() { return Object.fromEntries((this._schedules || []).map((s) => [`schedule.${s.id}`, s])); }
  _blocks(group = this._group, day = this._day) { return sortedBlocks(this._schedule(group), day); }
  _days(style = "short") {
    const f = new Intl.DateTimeFormat(this.hass?.locale?.language || "en", { weekday: style });
    return DAYS.map((_, i) => f.format(new Date(2024, 0, i + 1)));
  }
  _isRoommind(group = this._group) { return group.backend === "roommind"; }

  _actions(block, group = this._group) {
    return periodActions(block, group.members, this.hass).map((a, i) =>
      this._isRoommind(group) ? { entity: a.entity, start: cleanSettings(group.members[i], a.start), end: {} } : a);
  }

  /** What one period does, in a few words ("19 °C", "On · 60%", "3 devices"). */
  _blockLabel(block, group = this._group) {
    if (group.members.length !== 1) return this._label("device_count", { count: group.members.length });
    return keepUnit(describeSettings(group.members[0], this._actions(block, group)[0]?.start, (k) => this._label(k), this._unit));
  }

  /** Outside periods: RoomMind's Eco temperature, or the group's own setting, or nothing. */
  _outside(group = this._group) {
    if (!this._isRoommind(group)) return null;
    const room = this._roommind?.[group.roommind_area];
    const eco = room?.eco_heat ?? room?.eco_temp ?? group.eco_temperature;
    return eco != null ? keepUnit(`${eco} ${this._unit}`) : null;
  }

  /** The status line: what the group does now and what comes next today. */
  _status(group) {
    const today = dayIndex(), at = nowMinutes();
    const blocks = this._blocks(group, today);
    const { current, next } = where(blocks, at);
    const outside = this._outside(group);
    if (current >= 0) {
      const b = blocks[current];
      return this._label(outside ? "status_until_then" : "status_until", { what: this._blockLabel(b, group), to: clock(b.to), then: outside });
    }
    if (next >= 0) {
      const b = blocks[next];
      return this._label(outside ? "status_from_outside" : "status_from", { what: this._blockLabel(b, group), from: clock(b.from), outside });
    }
    return outside ? this._label("status_outside", { outside }) : this._label("status_none");
  }

  _theme(group = this._group) {
    const m = group.members[0];
    const d = m ? domainOf(m) : "";
    if (group.mode) return group.mode;
    if (d === "light") return "light";
    if (d === "humidifier" || d === "fan") return "cool";
    if (d === "climate") return this.hass?.states?.[entityId(m)]?.state === "cool" ? "cool" : "heat";
    return "neutral";
  }

  async _load() {
    if (this._loading || !this.hass || !this.config) return;
    this._loading = true;
    try {
      const list = await this.hass.callWS({ type: "schedule/list" });
      this._schedules = Array.isArray(list) ? list : [];
      if (this.config.rooms.some((g) => this._isRoommind(g))) {
        try { this._roommind = (await this.hass.callWS({ type: "roommind/rooms/list" })).rooms; } catch { this._roommind = null; }
      }
      this._error = null;
    } catch (error) {
      this._error = error.message || String(error);
    } finally {
      this._loading = false;
    }
  }

  /* ------------------------------------------------------------ render */

  render() {
    if (!this.config) return nothing;
    try {
      return html`<ha-card class="theme-${this._overview ? "neutral" : this._theme()}">
        ${this._overview ? this._renderOverview() : this._renderGroup()}
        ${this._error ? html`<div class="error" role="alert">${this._error}</div>` : nothing}
        ${this._snackbar ? html`<div class="snackbar" role="status"><span>${this._snackbar.text}</span>${this._snackbar.undo ? html`<button @click=${this._snackbar.undo}>${this._label("undo")}</button>` : nothing}</div>` : nothing}
      </ha-card>${this._sheet ? this._renderSheet() : nothing}`;
    } catch (error) {
      return html`<ha-card><div class="error" role="alert">${error.message || String(error)}</div></ha-card>`;
    }
  }

  _bar(blocks, { now = false, cls = "mini" } = {}) {
    return html`<div class="bar ${cls}" aria-hidden="true">${blocks.map((b) => html`<span class="seg" style=${span(b)}></span>`)}${now ? html`<span class="now" style=${`left:${nowMinutes() / 14.4}%`}></span>` : nothing}</div>`;
  }

  _renderOverview() {
    const today = dayIndex();
    const lookup = this._lookup;
    return html`
      <header class="appbar">
        <h2 class="title">${this.config.title || this._label("title")}</h2>
      </header>
      ${this.config.plans?.length ? html`
        <div class="plan-entry">
          ${(() => {
            // One row in the style of the preset list; the plan the chosen day already runs is named.
            const match = this._schedules ? this.config.plans.findIndex((plan) => planMatchesDay(plan, lookup, this._day)) : -1;
            return html`<button class="radio-item single" @click=${() => this._openPlan(Math.max(0, match))}>
              <span class="avatar neutral"><ha-icon icon="mdi:home-clock-outline"></ha-icon></span>
              <span class="text"><span class="headline">${this._label("home_plans")}</span>
                <span class="supporting">${this._days("long")[this._day]} · ${match >= 0 ? this.config.plans[match].name : this._label("plan_custom")}</span></span>
              <ha-icon icon="mdi:chevron-right" aria-hidden="true"></ha-icon>
            </button>`;
          })()}
        </div>` : nothing}
      <h3 class="section">${this._day === today ? this._label("today", { day: this._days("long")[today] }) : this._days("long")[this._day]}</h3>
      <div class="day-switch">${this._daySwitch()}</div>
      <div class="groups">
        ${this.config.rooms.map((group, index) => {
          const current = this._currentValue(group);
          return html`<button class="group-card theme-${this._theme(group)}" @click=${() => { this._room = index; this._overview = false; }}>
            <span class="row">
              <span class="avatar"><ha-icon .icon=${group.icon || memberIcon(group.members[0] || {}, this.hass)}></ha-icon></span>
              <span class="text"><span class="headline">${group.name || this._label("group")}</span><span class="supporting">${!this._schedule(group) ? this._label("unavailable") : this._day === today ? this._status(group) : this._dayLine(group, this._day)}</span></span>
              ${current ? html`<span class="trailing">${current}</span>` : nothing}
            </span>
            ${this._bar(this._blocks(group, this._day), { now: this._day === today })}
          </button>`;
        })}
      </div>
      <div class="hours" aria-hidden="true"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>`;
  }

  /** Seven days as one connected button group; today is the starting point. */
  _daySwitch() {
    const short = this._days("short"), long = this._days("long"), today = dayIndex();
    return choiceGroup(this, DAYS.map((_, i) => ({ label: short[i], aria_label: i === today ? this._label("today", { day: long[i] }) : long[i], value: String(i), active: i === this._day })), String(this._day), (v) => { this._day = Number(v); }, { label: this._label("day") });
  }

  /** Another day's periods in a line ("05:45–06:45 · 19:00–22:00"). */
  _dayLine(group, day) {
    const blocks = this._blocks(group, day);
    if (!blocks.length) return this._outside(group) ? this._label("status_outside_day", { outside: this._outside(group) }) : this._label("empty");
    const times = blocks.map((b) => `${clock(b.from)}–${clock(b.to)}`).join(" · ");
    return group.members.length === 1 ? `${times} · ${this._blockLabel(blocks[0], group)}` : times;
  }

  /** Step the chosen day, wrapping around the week. */
  _step(delta) { this._day = (this._day + delta + 7) % 7; }

  /** A horizontal swipe on the day bar moves a day back or forward. */
  _swipeStart(e) {
    // A swipe that ended without a click must not swallow the next real tap.
    this._swiped = false;
    this._swipe = { x: e.clientX, y: e.clientY };
  }
  _swipeEnd(e) {
    const s = this._swipe; this._swipe = null;
    if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) { this._swiped = true; this._step(dx < 0 ? 1 : -1); }
  }

  /* ---------------------------------------------- direct manipulation */

  /**
   * Hold a period for 0,3 s to pick it up, then drag an end or the middle;
   * hold on empty time to draw a new period. Times snap to 15 minutes with a
   * selection haptic per step; letting go saves (with Undo). A tap still
   * opens the sheet and a quick horizontal swipe still changes the day.
   */
  _pressStart(e) {
    if (e.button > 0 || !this._schedule()) return;
    const bar = e.currentTarget, rect = bar.getBoundingClientRect();
    const seg = e.target.closest?.(".seg[data-index]");
    const index = seg ? Number(seg.dataset.index) : -1;
    const block = index >= 0 ? this._blocks()[index] : null;
    const at = this._snap((e.clientX - rect.left) / rect.width);
    let edge = "move";
    if (seg) {
      const s = seg.getBoundingClientRect();
      if (e.clientX - s.left < 24) edge = "start";
      else if (s.right - e.clientX < 24) edge = "end";
    }
    this._press = { x: e.clientX, y: e.clientY, id: e.pointerId, bar, rect, index, block, at, edge };
    clearTimeout(this._pressTimer);
    this._pressTimer = setTimeout(() => this._lift(), 300);
  }

  _snap(fraction) { return Math.max(0, Math.min(1440, Math.round((fraction * 1440) / 15) * 15)); }

  _lift() {
    const p = this._press;
    if (!p) return;
    if (p.index < 0 && slotAt(this._blocks(), p.at / 1440) == null) return;
    this._swipe = null;
    p.bar.setPointerCapture?.(p.id);
    // Scrolling would fight the drag on touch: block it while a period is held.
    this._noScroll = (ev) => ev.preventDefault();
    p.bar.addEventListener("touchmove", this._noScroll, { passive: false });
    const from = p.block ? minutes(p.block.from) : p.at, to = p.block ? minutes(p.block.to) : Math.min(1440, p.at + 15);
    this._drag = { lifted: true, index: p.index, edge: p.block ? p.edge : "end", origin: { from, to }, from: hhmm(from), to: hhmm(to), grab: p.at };
    this._haptic("medium");
  }

  _pressMove(e) {
    const p = this._press;
    if (!p) return;
    if (!this._drag?.lifted) {
      if (Math.hypot(e.clientX - p.x, e.clientY - p.y) > 8) this._pressCancel();
      return;
    }
    const d = this._drag, at = this._snap((e.clientX - p.rect.left) / p.rect.width);
    const others = this._blocks().filter((_, i) => i !== d.index);
    const lo = Math.max(0, ...others.filter((b) => minutes(b.to) <= d.origin.from).map((b) => minutes(b.to)));
    const hi = Math.min(1440, ...others.filter((b) => minutes(b.from) >= d.origin.to).map((b) => minutes(b.from)));
    let from = d.origin.from, to = d.origin.to;
    if (d.edge === "start") from = Math.min(to - 15, Math.max(lo, at));
    else if (d.edge === "end") to = Math.max(from + 15, Math.min(hi, d.index < 0 ? Math.max(at, from + 15) : at));
    else {
      const len = to - from, shift = at - d.grab;
      from = Math.min(hi - len, Math.max(lo, d.origin.from + shift));
      to = from + len;
    }
    if (hhmm(from) !== d.from || hhmm(to) !== d.to) {
      this._drag = { ...d, from: hhmm(from), to: hhmm(to) };
      this._haptic(from % 60 === 0 || to % 60 === 0 ? "light" : "selection");
    }
  }

  /** Ends a press; true when it was a drag (so the swipe and click are skipped). */
  _pressEnd() {
    clearTimeout(this._pressTimer);
    const d = this._drag, p = this._press;
    this._press = null;
    if (!d?.lifted) return false;
    this._drag = null;
    p?.bar.removeEventListener("touchmove", this._noScroll);
    this._swiped = true;
    if (d.index < 0) {
      this._openPeriod(-1, { from: d.from, to: d.to });
      return true;
    }
    const block = this._blocks()[d.index];
    if (!block || (clock(block.from) === d.from && clock(block.to) === d.to)) return true;
    const week = Object.fromEntries(DAYS.map((day) => [day, clone(this._schedule()[day] || [])]));
    week[DAYS[this._day]] = week[DAYS[this._day]].map((b) => (b.from === block.from && b.to === block.to ? { ...b, from: `${d.from}:00`, to: `${d.to}:00` } : b));
    this._save(week, "moved");
    return true;
  }

  _pressCancel() {
    clearTimeout(this._pressTimer);
    if (this._drag) this._press?.bar.removeEventListener("touchmove", this._noScroll);
    this._press = null;
    this._drag = null;
  }

  _haptic(type) { this.dispatchEvent(new CustomEvent("haptic", { detail: type, bubbles: true, composed: true })); }

  /** A single thermostat's room temperature, shown beside its group. */
  _currentValue(group) {
    if (group.members.length !== 1) return "";
    const a = this.hass?.states?.[entityId(group.members[0])]?.attributes;
    return a?.current_temperature != null ? `${Number(a.current_temperature).toLocaleString(this.hass?.locale?.language)}°` : "";
  }

  _renderGroup() {
    const group = this._group, blocks = this._blocks(), today = dayIndex();
    const long = this._days("long"), short = this._days("short");
    const outside = this._outside();
    const ready = !!this._schedule();
    return html`
      <header class="appbar">
        ${this.config.rooms.length > 1 ? html`<button class="icon-button" aria-label=${this._label("back")} @click=${() => { this._overview = true; }}><ha-icon icon="mdi:arrow-left"></ha-icon></button>` : nothing}
        <div class="titles"><h2 class="title">${group.name || this._label("group")}</h2><div class="subtitle">${ready ? this._status(group) : this._label("unavailable")}</div></div>
        <button class="icon-button" aria-label=${this._label("copy")} ?disabled=${!ready || this._busy} @click=${() => this._showSheet({ kind: "copy", destinations: [] })}><ha-icon icon="mdi:content-copy"></ha-icon></button>
        ${group.presets?.length ? html`<button class="icon-button" aria-label=${this._label("presets")} ?disabled=${!ready || this._busy} @click=${this._openPresets}><ha-icon icon="mdi:calendar-sync-outline"></ha-icon></button>` : nothing}
      </header>

      <div class="week" role="radiogroup" aria-label=${this._label("day")}>
        ${DAYS.map((_, i) => html`<button class="week-row" role="radio" aria-checked=${String(i === this._day)} aria-label=${long[i]} @click=${() => { this._day = i; }}>
          <span class="week-day ${i === today ? "today" : ""}">${short[i]}</span>${this._bar(this._blocks(group, i))}
        </button>`)}
      </div>

      <section class="day-card">
        <div class="day-head">
          <button class="icon-button small" aria-label=${this._label("previous_day")} @click=${() => this._step(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
          <h3>${this._day === today ? this._label("today", { day: long[this._day] }) : long[this._day]}</h3>
          <button class="icon-button small" aria-label=${this._label("next_day")} @click=${() => this._step(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        </div>
        <div class="bar big ${this._drag?.lifted ? "dragging" : ""}" @pointerdown=${(e) => { this._swipeStart(e); this._pressStart(e); }} @pointermove=${(e) => this._pressMove(e)} @pointerup=${(e) => { if (!this._pressEnd(e)) this._swipeEnd(e); }} @pointercancel=${() => { this._swipe = null; this._pressCancel(); }} @click=${(e) => this._tapBar(e)}>
          <span class="grid" style="left:25%"></span><span class="grid" style="left:50%"></span><span class="grid" style="left:75%"></span>
          ${blocks.map((b, i) => {
            const d = this._drag?.lifted && this._drag.index === i ? this._drag : null;
            const shown = d ? { from: d.from, to: d.to } : b;
            // Short periods show just their value, very short ones nothing; the list below has it all.
            const length = minutes(shown.to) - minutes(shown.from);
            return html`<button class="seg ${d ? "lifted" : ""}" data-index=${i} style=${span(shown)} aria-label=${`${clock(b.from)}–${clock(b.to)} · ${this._blockLabel(b)}`} @click=${(e) => { e.stopPropagation(); if (this._swiped) { this._swiped = false; return; } this._openPeriod(i, null, e.currentTarget); }}>
              ${d ? html`<span class="handle-bar start"></span><span class="handle-bar end"></span>` : nothing}
              ${length >= 210 ? html`<span class="seg-value">${this._blockLabel(b)}</span>` : nothing}${length >= 300 ? html`<span class="seg-time">${clock(shown.from)} – ${clock(shown.to)}</span>` : nothing}
            </button>`;
          })}
          ${this._drag?.lifted && this._drag.index < 0 ? html`<span class="seg ghost" style=${span(this._drag)}></span>` : nothing}
          ${this._drag?.lifted ? html`<span class="readout" style=${`left:${(this._drag.edge === "start" ? minutes(this._drag.from) : minutes(this._drag.to)) / 14.4}%`}>${clock(this._drag.from)} → ${clock(this._drag.to)}</span>` : nothing}
          ${this._day === today ? html`<span class="now" style=${`left:${nowMinutes() / 14.4}%`}></span>` : nothing}
        </div>
        <div class="hours" aria-hidden="true"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>
        <p class="hint">${this._label("tap_to_add")}</p>
      </section>

      <div class="list">
        ${blocks.map((b, i) => {
          const on = this._day === today && where(blocks, nowMinutes()).current === i;
          const left = on ? minutes(b.to) - nowMinutes() : 0;
          return html`<button class="list-item" @click=${(e) => this._openPeriod(i, null, e.currentTarget)}>
            <span class="avatar"><ha-icon .icon=${group.icon || memberIcon(group.members[0] || {}, this.hass)}></ha-icon></span>
            <span class="text"><span class="headline">${clock(b.from)} – ${clock(b.to)}</span><span class="supporting">${on ? this._label("now_left", { h: Math.floor(left / 60), m: left % 60 }) : group.members.length > 1 ? group.members.map((m) => memberName(m, this.hass)).join(" · ") : this._label("period")}</span></span>
            <span class="trailing-value">${this._blockLabel(b)}</span>
          </button>`;
        })}
        ${outside ? html`<div class="list-item quiet"><span class="avatar neutral"><ha-icon icon="mdi:weather-night"></ha-icon></span><span class="text"><span class="headline">${blocks.length ? this._label("rest_of_day") : this._label("all_day")}</span><span class="supporting">${this._label("setback")}</span></span><span class="trailing-value muted">${outside}</span></div>` : nothing}
        ${!blocks.length && !outside ? html`<div class="empty">${this._label("empty")}</div>` : nothing}
      </div>

      <div class="fab-row"><button class="fab" ?disabled=${!ready || !this._members.length || this._busy} @click=${(e) => this._openPeriod(-1, null, e.currentTarget)}><ha-icon icon="mdi:plus"></ha-icon>${this._label("add")}</button></div>`;
  }

  _tapBar(event) {
    if (this._swiped) { this._swiped = false; return; }
    if (!this._schedule()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const slot = slotAt(this._blocks(), (event.clientX - rect.left) / rect.width);
    if (slot) this._openPeriod(-1, slot);
  }

  /* ------------------------------------------------------------ sheets */

  async _showSheet(state) {
    // Remember what opened the sheet, so focus goes back there when it closes.
    if (!this._sheet) this._opener = this.renderRoot.activeElement;
    this._sheet = { error: null, ...state };
    await this.updateComplete;
    const dialog = this.renderRoot.querySelector("dialog");
    if (dialog && !dialog.open) {
      dialog.showModal();
      this._animateSheet(dialog, true, this._origin);
    }
    dialog?.querySelector(".sheet-body")?.focus({ preventScroll: true });
  }

  /**
   * M3 motion for the sheet: it enters on the expressive default spatial
   * spring (up from the bottom edge on a phone, growing from 90 % as a dialog)
   * and leaves faster, without overshoot, on the standard fast spring.
   */
  _animateSheet(dialog, opening, origin) {
    if (!dialog.animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    // The period you tapped grows into the sheet, and the sheet shrinks back into it.
    if (origin?.isConnected) {
      const o = origin.getBoundingClientRect(), d = dialog.getBoundingClientRect();
      const inset = `inset(${Math.max(0, o.top - d.top)}px ${Math.max(0, d.right - o.right)}px ${Math.max(0, d.bottom - o.bottom)}px ${Math.max(0, o.left - d.left)}px round 12px)`;
      const full = "inset(0px 0px 0px 0px round 28px)";
      const spring = MOTION[opening ? "expressive-default-spatial" : "standard-fast-spatial"];
      return dialog.animate(opening ? [{ clipPath: inset }, { clipPath: full }] : [{ clipPath: full }, { clipPath: inset, opacity: 0 }], { duration: spring.ms, easing: spring.easing, fill: "forwards" });
    }
    const phone = matchMedia("(max-width: 600px)").matches;
    const spring = MOTION[opening ? "expressive-default-spatial" : "standard-fast-spatial"];
    const hidden = phone ? { transform: "translateY(100%)" } : { transform: "scale(0.9)", opacity: 0 };
    const shown = phone ? { transform: "translateY(0)" } : { transform: "scale(1)", opacity: 1 };
    return dialog.animate(opening ? [hidden, shown] : [shown, hidden], { duration: spring.ms, easing: spring.easing, fill: "forwards" });
  }

  /**
   * Drag the sheet down to close it (phones): it follows the finger 1:1,
   * rubber-bands upward, and closes past a third of its height or on a flick;
   * otherwise it springs back.
   */
  _dragSheetStart(e) {
    const dialog = this.renderRoot.querySelector("dialog");
    if (!dialog || !matchMedia("(max-width: 600px)").matches || e.button > 0 || e.target.closest?.("button:not(.handle)")) return;
    const startY = e.clientY, h = dialog.getBoundingClientRect().height;
    let last = { y: e.clientY, t: performance.now() }, v = 0, dy = 0;
    dialog.getAnimations().forEach((a) => a.cancel());
    const move = (ev) => {
      dy = ev.clientY - startY;
      const now = performance.now();
      v = (ev.clientY - last.y) / Math.max(1, now - last.t);
      last = { y: ev.clientY, t: now };
      dialog.style.transform = `translateY(${dy > 0 ? dy : dy * 0.2}px)`;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      dialog.style.transform = "";
      if (dy > h / 3 || v > 0.5) {
        const spring = MOTION["standard-fast-spatial"];
        dialog.animate([{ transform: `translateY(${Math.max(0, dy)}px)` }, { transform: "translateY(100%)" }], { duration: spring.ms, easing: spring.easing, fill: "forwards" })
          .finished.then(() => { this._origin = null; dialog.close(); this._sheet = null; this._opener?.isConnected && this._opener.focus({ preventScroll: true }); }).catch(() => {});
      } else if (dy) {
        const spring = MOTION["expressive-fast-spatial"];
        dialog.animate([{ transform: `translateY(${dy > 0 ? dy : dy * 0.2}px)` }, { transform: "translateY(0)" }], { duration: spring.ms, easing: spring.easing });
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  }

  async _closeSheet() {
    const dialog = this.renderRoot.querySelector("dialog");
    if (dialog?.open && !this._closing) {
      this._closing = true;
      dialog.classList.add("closing");
      await this._animateSheet(dialog, false, this._origin)?.finished.catch(() => {});
      dialog.close();
      this._closing = false;
    }
    this._sheet = null;
    this._opener?.isConnected && this._opener.focus({ preventScroll: true });
    this._opener = null;
    this._origin = null;
  }

  _openPeriod(index, slot, origin) {
    const block = this._blocks()[index];
    const actions = this._actions(block);
    // A new period for something you switch on ends by switching it off again, not "leave as is".
    if (!block && !this._isRoommind()) actions.forEach((a, i) => { if (!Object.keys(a.end || {}).length && ONOFF.has(domainOf(this._members[i]))) a.end = this._endDefault(this._members[i]); });
    this._origin = origin || null;
    this._showSheet({
      kind: "period", index,
      from: clock(block?.from || slot?.from || "07:00"),
      to: clock(block?.to || slot?.to || "09:00"),
      actions, open: this._members.length > 1 ? 0 : -1,
      // Editing a period that other days share (same times and settings) changes those days too.
      days: block ? sameOnDays(this._schedule(), block, this._day) : [this._day],
    });
  }

  _renderSheet() {
    const s = this._sheet;
    const title = { period: s.index < 0 ? "new_period" : "edit_period", copy: "copy", preset: "presets", plan: "home_plans" }[s.kind];
    const sub = s.kind === "plan" ? this._label("plan_sub") : `${this._group.name || this._label("group")}${s.kind === "period" ? ` · ${this._days("long")[this._day]}` : ""}`;
    const primary = { period: [s.index < 0 ? "add_short" : "save", this._savePeriod], copy: ["copy_short", this._copyDay], preset: ["apply", this._applyPreset], plan: ["apply", this._applyPlan] }[s.kind];
    const blocked = this._busy || (s.kind === "copy" && !s.destinations.length) || (s.kind === "preset" && (s.loading || !s.weeks?.[s.index])) || (s.kind === "plan" && (s.loading || !s.entries || !s.destinations.length));
    return html`<dialog class="sheet theme-${this._theme()}" aria-labelledby="sheet-title" @close=${() => { this._sheet = null; }} @cancel=${(e) => { e.preventDefault(); this._closeSheet(); }} @click=${(e) => { if (e.target === e.currentTarget) this._closeSheet(); }}>
      <button class="handle" aria-label=${this._label("close")} @click=${this._closeSheet} @pointerdown=${(e) => this._dragSheetStart(e)}><span></span></button>
      <header class="sheet-head" @pointerdown=${(e) => this._dragSheetStart(e)}>
        <div><h2 id="sheet-title">${this._label(title)}</h2><div class="sheet-sub">${sub}</div></div>
        ${s.kind === "period" && s.index >= 0 ? html`<button class="icon-button danger" aria-label=${this._label("delete")} ?disabled=${this._busy} @click=${this._deletePeriod}><ha-icon icon="mdi:delete-outline"></ha-icon></button>` : nothing}
      </header>
      <div class="sheet-body" tabindex="-1">
        ${s.kind === "period" ? this._renderPeriodSheet(s) : s.kind === "copy" ? this._renderCopySheet(s) : s.kind === "preset" ? this._renderPresetSheet(s) : this._renderPlanSheet(s)}
        ${s.error ? html`<div class="error" role="alert">${s.error}</div>` : nothing}
      </div>
      <footer class="sheet-actions">
        <button class="text-button" ?disabled=${this._busy} @click=${this._closeSheet}>${t("cancel", this.hass)}</button>
        <button class="filled-button" ?disabled=${blocked} @click=${primary[1]}>${this._label(primary[0])}</button>
      </footer>
    </dialog>`;
  }

  _renderPeriodSheet(s) {
    const roommind = this._isRoommind();
    const outside = this._outside();
    const long = this._days("long"), letters = this._days("narrow");
    return html`
      <div class="times">
        ${["from", "to"].map((key) => html`<div class="time-row">
          <button class="tonal-icon step" aria-label=${this._label("earlier", { what: this._label(key === "from" ? "from" : "until") })} @click=${() => this._shiftTime(key, -15)}>−15</button>
          <label class="outlined-field"><span>${this._label(key === "from" ? "from" : "until")}</span><input type="time" .value=${key === "to" && s.to === "24:00" ? "00:00" : s[key]} @change=${(e) => { this._sheet = { ...this._sheet, [key]: e.target.value, error: null }; }}></label>
          <button class="tonal-icon step" aria-label=${this._label("later", { what: this._label(key === "from" ? "from" : "until") })} @click=${() => this._shiftTime(key, 15)}>+15</button>
        </div>`)}
      </div>

      ${this._members.length === 1
        ? html`<div class="device single">${this._renderPhases(s, 0, roommind)}</div>`
        : html`<h3 class="section in-sheet">${this._label("devices")}</h3><div class="devices">${s.actions.map((action, i) => {
            const member = this._members[i], open = s.open === i;
            return html`<div class="device ${open ? "open" : ""}">
              <button class="device-head" aria-expanded=${String(open)} @click=${() => { this._sheet = { ...this._sheet, open: open ? -1 : i }; }}>
                <span class="avatar"><ha-icon .icon=${memberIcon(member, this.hass)}></ha-icon></span>
                <span class="text"><span class="headline">${memberName(member, this.hass)}</span><span class="supporting">${this._summary(member, action)}</span></span>
                <ha-icon icon=${open ? "mdi:chevron-up" : "mdi:chevron-down"} aria-hidden="true"></ha-icon>
              </button>
              ${open ? html`<div class="device-body">${this._renderPhases(s, i, roommind)}</div>` : nothing}
            </div>`;
          })}</div>`}

      <h3 class="section in-sheet">${this._label("repeat_on")}</h3>
      ${choiceGroup(this, DAYS.map((_, i) => ({ label: letters[i], aria_label: long[i], value: String(i), active: s.days.includes(i), disabled: i === this._day })), s.days.map(String), (v) => {
        const d = Number(v);
        if (d === this._day) return;
        this._sheet = { ...this._sheet, days: s.days.includes(d) ? s.days.filter((x) => x !== d) : [...s.days, d], error: null };
      }, { multi: true, label: this._label("repeat_on") })}
      ${s.days.length > 1 ? html`<p class="supporting-text">${this._label(s.index >= 0 ? "also_changes" : "also_adds", { days: s.days.filter((d) => d !== this._day).sort().map((d) => this._days("short")[d]).join(", ") })}</p>` : nothing}

      <div class="info-row what"><ha-icon icon="mdi:clock-outline"></ha-icon><span>${this._whatWillHappen(s)}</span></div>`;
  }

  /** Move one end of the period by 15 minutes, keeping at least 15 minutes between them. */
  _shiftTime(key, delta) {
    const s = this._sheet, m = (t) => minutes(t === "00:00" && key === "to" ? "24:00" : t);
    const from = m(s.from), to = m(s.to === "24:00" ? "24:00" : s.to);
    const next = key === "from" ? Math.min(to - 15, Math.max(0, from + delta)) : Math.max(from + 15, Math.min(1440, to + delta));
    this._sheet = { ...s, [key]: hhmm(next), error: null };
  }

  /** One plain sentence: which days, what, when, and what comes after. */
  _whatWillHappen(s) {
    const long = this._days("long");
    const days = [...s.days].sort();
    const list = days.length === 7 ? this._label("every_day") : days.length > 1 ? days.map((d) => long[d]).join(", ") : long[days[0] ?? this._day];
    const unit = this._unit, members = this._members;
    const what = members.length === 1 ? keepUnit(describeSettings(members[0], s.actions[0]?.start, (k) => this._label(k), unit)) : this._label("device_count", { count: members.length });
    const end = members.length === 1 && Object.keys(s.actions[0]?.end || {}).length ? keepUnit(describeSettings(members[0], s.actions[0].end, (k) => this._label(k), unit)) : this._outside();
    return this._label(end ? "what_then" : "what", { days: list, what, from: s.from, to: s.to === "24:00" ? "24:00" : s.to, then: end });
  }

  _summary(member, action) {
    const start = describeSettings(member, action.start, (k) => this._label(k), this._unit);
    if (!Object.keys(action.end || {}).length) return start;
    return `${start} · ${this._label("then_at", { to: this._sheet.to, what: describeSettings(member, action.end, (k) => this._label(k), this._unit) })}`;
  }

  /** Start settings, then (except RoomMind) what happens when the period ends. */
  _renderPhases(s, index, roommind) {
    const member = this._members[index], action = s.actions[index];
    const start = renderSettings(this, member, action.start, (next) => this._updateAction(index, "start", next));
    if (roommind) return start;
    const hasEnd = !!Object.keys(action.end || {}).length;
    const simple = settingsSchema(member, this.hass, { state: "on" }).every((f) => f.name === "state");
    const endValue = !hasEnd ? "none" : simple ? action.end.state : "set";
    const endOptions = [{ label: this._label("leave"), value: "none" }, ...(simple ? [{ label: this._label("off"), value: "off" }] : [{ label: this._label("set_end"), value: "set" }])];
    return html`
      <div class="phase"><span class="phase-label">${this._label("at_time", { time: s.from })}</span>${start}</div>
      <div class="phase"><span class="phase-label">${this._label("at_time", { time: s.to })}</span>
        ${choiceGroup(this, endOptions.map((o) => ({ ...o, active: o.value === endValue })), endValue, (v) => this._updateAction(index, "end", v === "none" ? {} : simple ? { state: v } : hasEnd ? action.end : this._endDefault(member)), { label: this._label("at_time", { time: s.to }) })}
        ${hasEnd && !simple ? renderSettings(this, member, action.end, (next) => this._updateAction(index, "end", next)) : nothing}
      </div>`;
  }

  _endDefault(member) {
    const d = domainOf(member);
    if (d === "climate") return { hvac_mode: "off" };
    if (["humidifier", "light", "switch", "input_boolean", "fan"].includes(d)) return { state: "off" };
    return defaultSettings(member, this.hass);
  }

  _updateAction(index, phase, value) {
    const actions = clone(this._sheet.actions);
    const previous = actions[index][phase] || {};
    if (JSON.stringify(previous) === JSON.stringify(value)) return;
    const member = this._members[index];
    if (domainOf(member) === "climate" && value.hvac_mode === "heat_cool" && previous.hvac_mode !== "heat_cool") {
      const a = this.hass?.states?.[entityId(member)]?.attributes || {};
      value = { ...value, target_temp_low: a.target_temp_low ?? previous.temperature ?? 18, target_temp_high: a.target_temp_high ?? Math.min(a.max_temp ?? 35, (previous.temperature ?? 18) + 4) };
    }
    if (domainOf(member) === "climate" && previous.hvac_mode === "heat_cool" && value.hvac_mode !== "heat_cool") value = { ...value, temperature: previous.target_temp_low ?? 18 };
    actions[index][phase] = value;
    this._sheet = { ...this._sheet, actions, error: null };
  }

  _savePeriod() {
    const s = this._sheet;
    const actions = s.actions.map((a, i) => ({ entity: a.entity, start: cleanSettings(this._members[i], a.start), end: cleanSettings(this._members[i], a.end) }));
    for (let i = 0; i < actions.length; i++) {
      const error = validateSettings(this._members[i], this.hass, actions[i].start) || (Object.keys(actions[i].end).length ? validateSettings(this._members[i], this.hass, actions[i].end) : null);
      if (error) { this._sheet = { ...s, open: i, error: this._label(error) }; return; }
    }
    const old = this._blocks()[s.index];
    const block = { from: `${s.from}:00`, to: `${s.to === "00:00" ? "24:00" : s.to}:00`, data: actionData(old?.data, actions) };
    const week = Object.fromEntries(DAYS.map((d) => [d, clone(this._schedule()[d] || [])]));
    const long = this._days("long");
    for (const day of s.days) {
      // The edited period is replaced on every chosen day that has it, not added beside it.
      const others = sortedBlocks(week, day).filter((b) => !(old && b.from === old.from && b.to === old.to));
      const error = validateBlock(block, others);
      if (error) { this._sheet = { ...s, error: s.days.length > 1 ? `${long[day]}: ${this._label(error)}` : this._label(error) }; return; }
      week[DAYS[day]] = [...others, clone(block)].sort((a, b) => minutes(a.from) - minutes(b.from));
    }
    this._save(week);
  }

  _deletePeriod() {
    const old = this._blocks()[this._sheet.index];
    const week = Object.fromEntries(DAYS.map((d) => [d, clone(this._schedule()[d] || [])]));
    week[DAYS[this._day]] = week[DAYS[this._day]].filter((b) => !(b.from === old.from && b.to === old.to));
    this._save(week, "deleted");
  }

  _renderCopySheet(s) {
    const long = this._days("long"), short = this._days("short");
    const set = (days) => { this._sheet = { ...this._sheet, destinations: days.filter((d) => d !== this._day) }; };
    return html`
      <p class="sheet-text">${this._label("copy_from", { day: long[this._day] })}</p>
      ${choiceGroup(this, DAYS.map((_, i) => ({ label: short[i], aria_label: long[i], value: String(i), active: s.destinations.includes(i), disabled: i === this._day })), s.destinations.map(String), (v) => {
        const d = Number(v);
        set(s.destinations.includes(d) ? s.destinations.filter((x) => x !== d) : [...s.destinations, d]);
      }, { multi: true, label: this._label("copy_to") })}
      <div class="chips">
        <button class="assist-chip" @click=${() => set([0, 1, 2, 3, 4])}>${this._label("weekdays")}</button>
        <button class="assist-chip" @click=${() => set([5, 6])}>${this._label("weekend")}</button>
        <button class="assist-chip" @click=${() => set([0, 1, 2, 3, 4, 5, 6])}>${this._label("every_day")}</button>
      </div>
      <p class="supporting-text">${this._label("copy_note")}</p>`;
  }

  _copyDay() { this._save(copyDays(this._schedule(), this._day, this._sheet.destinations), "copied"); }

  /** A preset's week: from the schedule list when it is a UI helper, else asked for. */
  async _week(entity) {
    const known = this._lookup[entity];
    if (known) return known;
    const r = await this.hass.callWS({ type: "call_service", domain: "schedule", service: "get_schedule", target: { entity_id: entity }, return_response: true });
    const week = r.response?.[entity];
    if (!week) throw new Error(this._label("unavailable"));
    return week;
  }

  async _openPresets() {
    await this._showSheet({ kind: "preset", index: 0, scope: "day", loading: true });
    try {
      const weeks = await Promise.all(this._group.presets.map((p) => this._week(p.schedule).catch(() => null)));
      if (this._sheet?.kind === "preset") this._sheet = { ...this._sheet, weeks, loading: false };
    } catch (error) {
      if (this._sheet?.kind === "preset") this._sheet = { ...this._sheet, loading: false, error: error.message || String(error) };
    }
  }

  _renderPresetSheet(s) {
    const presets = this._group.presets;
    const long = this._days("long");
    if (s.loading) return html`<p class="sheet-text">${this._label("loading")}</p>`;
    return html`
      <div class="radio-list" role="radiogroup" aria-label=${this._label("presets")}>
        ${presets.map((p, i) => {
          const week = s.weeks?.[i];
          const day = week ? presetDayBlocks(week, p.source_day) : [];
          const on = i === s.index;
          return html`<button class="radio-item" role="radio" aria-checked=${String(on)} ?disabled=${!week} @click=${() => { this._sheet = { ...this._sheet, index: i }; }}>
            <span class="text"><span class="headline">${p.name || this.hass?.states?.[p.schedule]?.attributes?.friendly_name || this._label("preset")}</span>
              <span class="supporting">${week ? day.map((b) => `${clock(b.from)}–${clock(b.to)}`).join(" · ") || this._label("empty") : this._label("unavailable")}</span>
              ${this._bar(day, { cls: "mini on-container" })}</span>
            <span class="radio ${on ? "on" : ""}" aria-hidden="true"></span>
          </button>`;
        })}
      </div>
      <h3 class="section in-sheet">${this._label("apply_to")}</h3>
      ${choiceGroup(this, [{ label: long[this._day], value: "day", active: s.scope === "day" }, { label: this._label("whole_week"), value: "week", active: s.scope === "week" }], s.scope, (scope) => { this._sheet = { ...this._sheet, scope }; }, { label: this._label("apply_to") })}
      <p class="supporting-text">${s.scope === "week" ? this._label("preset_week_note") : this._label("preset_day_note", { day: long[this._day] })}</p>`;
  }

  _applyPreset() {
    const s = this._sheet, preset = this._group.presets[s.index], week = s.weeks?.[s.index];
    if (!week) return;
    const mapped = Object.fromEntries(DAYS.map((d) => [d, (week[d] || []).map((b) => ({ ...b, data: actionData(b.data, this._actions(b)) }))]));
    this._save(applyPreset(this._schedule(), mapped, this._day, s.scope, preset?.source_day), "applied");
  }

  /** Every plan's per-group pattern, read once, so the sheet can show them all side by side. */
  async _openPlan(index) {
    await this._showSheet({ kind: "plan", index, destinations: [this._day], loading: true });
    try {
      const plans = await Promise.all(this.config.plans.map((plan) => Promise.all((plan.groups || []).map(async (item) => {
        const group = this.config.rooms.find((g) => g.schedule === item.schedule);
        if (!group || !item.source) return null;
        const source = await this._week(item.source).catch(() => null);
        if (!source) return null;
        const week = Object.fromEntries(DAYS.map((d) => [d, (source[d] || []).map((b) => ({ ...b, data: actionData(b.data, this._actions(b, group)) }))]));
        return { ...item, week, group, pattern: group.presets?.find((p) => p.schedule === item.source)?.name || "" };
      })).then((list) => (list.some((e) => !e) ? null : list))));
      if (this._sheet?.kind === "plan") this._sheet = { ...this._sheet, plans, entries: plans[this._sheet.index], loading: false };
    } catch (error) {
      if (this._sheet?.kind === "plan") this._sheet = { ...this._sheet, loading: false, error: error.message || String(error) };
    }
  }

  _renderPlanSheet(s) {
    const long = this._days("long"), short = this._days("short");
    const set = (destinations) => { this._sheet = { ...this._sheet, destinations }; };
    return html`
      ${s.loading ? html`<p class="sheet-text">${this._label("loading")}</p>` : html`
        <div class="radio-list" role="radiogroup" aria-label=${this._label("home_plans")}>
          ${this.config.plans.map((plan, i) => {
            const entries = s.plans?.[i];
            const on = i === s.index;
            return html`<button class="radio-item" role="radio" aria-checked=${String(on)} ?disabled=${!entries} @click=${() => { this._sheet = { ...this._sheet, index: i, entries }; }}>
              <span class="text"><span class="headline">${plan.name}</span>
                ${entries ? entries.map((e) => {
                  const day = presetDayBlocks(e.week, e.source_day);
                  return html`<span class="plan-row theme-${this._theme(e.group)}"><span class="plan-room">${e.group.name}</span>${this._bar(day, { cls: "mini on-container" })}</span>`;
                }) : html`<span class="supporting">${this._label("unavailable")}</span>`}
              </span>
              <span class="radio ${on ? "on" : ""}" aria-hidden="true"></span>
            </button>`;
          })}
        </div>`}
      <h3 class="section in-sheet">${this._label("apply_to")}</h3>
      ${choiceGroup(this, DAYS.map((_, i) => ({ label: short[i], aria_label: long[i], value: String(i), active: s.destinations.includes(i) })), s.destinations.map(String), (v) => {
        const d = Number(v);
        set(s.destinations.includes(d) ? s.destinations.filter((x) => x !== d) : [...s.destinations, d]);
      }, { multi: true, label: this._label("apply_to") })}
      <div class="chips">
        <button class="assist-chip" @click=${() => set([0, 1, 2, 3, 4])}>${this._label("weekdays")}</button>
        <button class="assist-chip" @click=${() => set([5, 6])}>${this._label("weekend")}</button>
        <button class="assist-chip" @click=${() => set([0, 1, 2, 3, 4, 5, 6])}>${this._label("every_day")}</button>
      </div>`;
  }

  async _applyPlan() {
    const s = this._sheet;
    if (this._busy || !s.entries || !s.destinations.length) return;
    this._busy = true;
    try {
      const current = await this.hass.callWS({ type: "schedule/list" });
      const lookup = Object.fromEntries(current.map((x) => [`schedule.${x.id}`, x]));
      const weeks = homePlanWeeks(lookup, s.entries, s.destinations);
      const updates = [], originals = [];
      for (const [entity, week] of Object.entries(weeks)) {
        const group = this.config.rooms.find((g) => g.schedule === entity);
        updates.push(this._update(lookup[entity], week, group));
        originals.push(this._update(lookup[entity], lookup[entity]));
      }
      await saveScheduleBatch((u) => this.hass.callWS(u), updates, originals);
      this._closeSheet();
      await this._load();
      this._snack({ text: this._label("applied"), undo: async () => {
        this._snackbar = null;
        try { await saveScheduleBatch((u) => this.hass.callWS(u), originals, updates); await this._load(); this._snack({ text: this._label("undone") }); }
        catch (error) { this._error = error.message || String(error); }
      } });
    } catch (error) {
      this._sheet = { ...this._sheet, error: `${this._label(error.rollbackFailed ? "plan_partial" : "plan_failed")} ${error.message || ""}` };
    } finally {
      this._busy = false;
    }
  }

  /** M3 snackbar with Undo, gone after 6 s. */
  _snack(snack) {
    clearTimeout(this._snackTimer);
    this._snackbar = snack;
    this._snackTimer = setTimeout(() => { this._snackbar = null; }, 6000);
  }

  async _restore(before, group) {
    this._snackbar = null;
    try {
      await this.hass.callWS(this._update(before, before, group));
      await this._load();
      this._snack({ text: this._label("undone") });
    } catch (error) {
      this._error = error.message || String(error);
    }
  }

  /** A schedule/update message for a whole week; RoomMind keeps only a temperature per period. */
  _update(current, week, group) {
    const update = { type: "schedule/update", schedule_id: current.id, name: current.name, ...(current.icon ? { icon: current.icon } : {}) };
    for (const d of DAYS) update[d] = clone(week[d] || []);
    if (group && this._isRoommind(group)) {
      for (const d of DAYS) update[d] = update[d].map((b) => ({ from: b.from, to: b.to, data: { temperature: cleanSettings(group.members[0], periodActions(b, group.members, this.hass)[0].start).temperature } }));
    }
    return update;
  }

  async _save(week, message = "saved") {
    const current = this._schedule();
    if (!current || this._busy) return;
    this._busy = true;
    const before = clone(current), group = this._group;
    try {
      await this.hass.callWS(this._update(current, week, group));
      this._closeSheet();
      await this._load();
      this._snack({ text: this._label(message), undo: () => this._restore(before, group) });
    } catch (error) {
      if (this._sheet) this._sheet = { ...this._sheet, error: error.message || String(error) };
      else this._error = error.message || String(error);
    } finally {
      this._busy = false;
    }
  }
}

for (const tag of ["materia-weekly-scheduler", "materia-climate-scheduler"]) {
  if (!customElements.get(tag)) customElements.define(tag, class extends MateriaWeeklyScheduler {});
}
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "materia-weekly-scheduler")) {
  window.customCards.push({ type: "materia-weekly-scheduler", name: "Materia Weekly Scheduler", description: "A week of periods for any group of devices, stored in a schedule helper", preview: true });
}
