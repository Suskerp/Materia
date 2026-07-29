import { LitElement, html, nothing } from "lit";
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
 * STATE IS MOCKED — entirely client-side, no entity, no service call. Nothing
 * here schedules anything, because nothing is wired to a device yet. Confirm arms
 * the strip, Cancel clears it. Swapping the mock for a real backend means
 * implementing _commit and nothing else.
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
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-schedule-editor");
  }

  static getStubConfig() {
    return { name: "Start cleaning" };
  }

  setConfig(config) {
    this.config = { presentation: "inline", ...config };
  }

  /** "sheet" drops the collapsed strip and renders the picker directly, for
   *  putting the card INSIDE a modal (browser_mod.popup) rather than expanding
   *  it in place. The strip stays the default because a bare picker sitting on a
   *  dashboard has nothing to summarise and no way to be dismissed. */
  get _isSheet() {
    return this.config.presentation === "sheet";
  }

  updated(changed) {
    super.updated?.(changed);
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
  }

  /** Selected shortcut, defaulting to the first configured one. Deferred rather
   *  than hardcoded in the constructor, because `presets` may not be set yet and
   *  its keys are generated. */
  get _pickKey() {
    return this._pick ?? this._quick[0]?.key ?? null;
  }

  /** True once anything is wired, so the card stops advertising itself as a mock
   *  the moment it can actually do something. */
  get _isWired() {
    return !!(this.config.confirm_action || this.config.trigger_action
      || (this.config.presets ?? []).some((p) => p.tap_action)
      || (this.config.triggers ?? []).some((t) => t.tap_action));
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
  static DEFAULT_PRESETS = [
    { label: "In 1 hour", offset: "1h" },
    { label: "In 4 hours", offset: "4h" },
    { label: "Tonight", at: "23:00" },
    { label: "Tomorrow", at: "09:00", days: 1, grow: 1.4 },
    { label: "Noon", at: "12:00" },
    { label: "Saturday", at: "10:00", weekday: 6, grow: 1.4 },
  ];

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
    const list = this.config.presets ?? MateriaSchedule.DEFAULT_PRESETS;
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

  static DEFAULT_TRIGGERS = [
    { key: "leave", label: "When I leave", secondary: "My phone leaves home", icon: "m3o:directions-walk" },
    { key: "empty", label: "When everyone's out", secondary: "All trackers away for 10 min", icon: "m3o:person-off" },
    { key: "night", label: "When the house sleeps", secondary: "All lights off after 22:00", icon: "m3o:bedtime" },
    { key: "sunset", label: "At sunset", secondary: "Around 21:48 today", icon: "m3o:wb-twilight" },
  ];

  /** Configured triggers. `label`/`secondary` are the documented keys; `name`
   *  and `sub` are accepted as aliases so a config written against the earlier
   *  shape keeps working. */
  get _events() {
    const list = this.config.triggers ?? MateriaSchedule.DEFAULT_TRIGGERS;
    return list.map((t, i) => ({
      key: t.key ?? `t${i}`,
      name: t.label ?? t.name ?? "—",
      sub: t.secondary ?? t.sub ?? "",
      icon: t.icon ?? "m3o:sensors",
      tap_action: t.tap_action,
    }));
  }

  /** What the header echoes, and what the strip shows once armed. */
  get _describe() {
    if (this._mode === "event") {
      const e = this._events.find((x) => x.key === this._event);
      return e
        ? { head: e.name, sub: `${e.sub} · trigger` }
        : { head: "Pick a trigger", sub: "Runs whenever it happens" };
    }
    if (this._pick === "custom") {
      const date = new Intl.DateTimeFormat(this._lang, { day: "numeric", month: "long" })
        .format(new Date(this._viewY, this._viewM, this._date));
      return { head: `${this._pad(this._hour)}:${this._pad(this._minute)}`, sub: date };
    }
    const q = this._quick.find((x) => x.key === this._pickKey);
    return q ? { head: q.name, sub: `Starts at ${q.at}` } : { head: "When?", sub: "Pick a moment" };
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
    return {
      size: "m", // 56px, the M3 button ladder's medium rung
      preset: "primary",
      options: [
        { label: this.config.time_tab_label ?? "At a time", value: "clock", icon: "m3o:schedule" },
        { label: this.config.trigger_tab_label ?? "When…", value: "event", icon: "m3o:sensors" },
      ],
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
    if (!body) return;
    const inner = this.shadowRoot.querySelector(".custom-inner");
    body.style.height = this._customOpen && inner ? `${inner.scrollHeight}px` : "0px";
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
   *  browser_mod.close_popup, because a Cancel button that leaves the modal open
   *  is broken and defaulting to nothing would ship exactly that. */
  _dismiss() {
    this._open = false;
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

  _renderStrip() {
    const a = this._armed;
    const head = a ? a.head : (this.config.empty_label ?? "Not scheduled");
    const sub = a ? a.sub : (this.config.empty_sub ?? "Tap to pick a time or a trigger");
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
            >Cancel</button>`
          : nothing}
      </div>
    `;
  }

  render() {
    if (!this.config) return html``;

    if (!this._open && !this._isSheet) {
      return html`<ha-card><div class="sheet">${this._renderStrip()}</div></ha-card>`;
    }

    const d = this._describe;
    const isClock = this._mode === "clock";

    return html`
      <ha-card>
        <div class="sheet">
          <div class="echo">
            <span class="eyebrow">${this.config.name ?? "Schedule"}</span>
            <span class="headline">${d.head}</span>
            <span class="subline">${d.sub}</span>
          </div>

          <materia-button-group
            .hass=${this.hass}
            .value=${this._mode}
            .config=${this._tabConfig}
            @option-selected=${(e) => { this._mode = e.detail.value; }}
          ></materia-button-group>

          ${isClock ? this._renderClock() : this._renderTriggers()}

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
              <span class="n">${this.config.repeat_label ?? "Repeat weekly"}</span>
              <span class="s">${this._repeating
                ? "Same time every selected day"
                : "Runs once, then back to normal"}</span>
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

          <div class="actions">
            <button class="cancel" @click=${this._dismiss}>Cancel</button>
            <button class="confirm" @click=${this._commit}>
              <ha-icon icon="m3o:alarm-on"></ha-icon>
              <span>${this._repeating ? "Save schedule" : "Set timer"}</span>
            </button>
          </div>

          ${this._isWired
            ? nothing
            : html`<div class="mock">Mocked · nothing is scheduled</div>`}
        </div>
      </ha-card>
    `;
  }

  _renderClock() {
    return html`
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
          <span class="lbl">Pick a date &amp; time</span>
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
