import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "../../primitives/calendar.js";
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
    this.config = { ...config };
  }

  constructor() {
    super();
    const now = new Date();
    this._open = false;
    this._armed = null; // { head, sub, repeating } once confirmed
    this._mode = "clock";
    this._pick = "1h";
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

  /** The six shortcuts, resolved against the current clock. */
  get _quick() {
    const now = new Date();
    const plus = (h) => new Date(now.getTime() + h * 3600000);
    const at = (dayOffset, hh, mm = 0) => {
      const d = new Date(now);
      d.setDate(d.getDate() + dayOffset);
      d.setHours(hh, mm, 0, 0);
      return d;
    };
    const in1 = plus(1);
    const in4 = plus(4);
    const tonight = at(now.getHours() >= 23 ? 1 : 0, 23);
    const tomorrow = at(1, 9);
    const noon = at(now.getHours() >= 12 ? 1 : 0, 12);
    // Days until Saturday, Monday-indexed; today only counts before 10:00.
    const toSat = (5 - ((now.getDay() + 6) % 7) + 7) % 7;
    const sat = at(toSat === 0 && now.getHours() >= 10 ? 7 : toSat, 10);

    return [
      { key: "1h", name: "In 1 hour", at: this._hhmm(in1), grow: 1 },
      { key: "4h", name: "In 4 hours", at: this._hhmm(in4), grow: 1 },
      { key: "tonight", name: "Tonight", at: this._hhmm(tonight), grow: 1 },
      { key: "tomorrow", name: "Tomorrow", at: this._dayTime(tomorrow), grow: 1.4 },
      { key: "noon", name: "Noon", at: this._dayTime(noon), grow: 1 },
      { key: "weekend", name: "Saturday", at: this._dayTime(sat), grow: 1.4 },
    ];
  }

  get _events() {
    return this.config.triggers ?? [
      { key: "leave", name: "When I leave", sub: "My phone leaves home", icon: "m3o:directions-walk" },
      { key: "empty", name: "When everyone's out", sub: "All trackers away for 10 min", icon: "m3o:person-off" },
      { key: "night", name: "When the house sleeps", sub: "All lights off after 22:00", icon: "m3o:bedtime" },
      { key: "sunset", name: "At sunset", sub: "Around 21:48 today", icon: "m3o:wb-twilight" },
    ];
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
    const q = this._quick.find((x) => x.key === this._pick);
    return q ? { head: q.name, sub: `Starts at ${q.at}` } : { head: "When?", sub: "Pick a moment" };
  }

  get _dayNames() {
    const fmt = new Intl.DateTimeFormat(this._lang, { weekday: "narrow" });
    // 2024-01-01 was a Monday, so index 0 lands on Monday.
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)));
  }

  /** The fold animates from a MEASURED height: CSS cannot interpolate to auto,
   *  and a hardcoded max-height would either clip a 6-row month or leave a gap
   *  under a 5-row one. */
  updated() {
    const body = this.shadowRoot?.querySelector(".custom-body");
    if (!body) return;
    const inner = this.shadowRoot.querySelector(".custom-inner");
    body.style.height = this._customOpen && inner ? `${inner.scrollHeight}px` : "0px";
  }

  _commit() {
    // MOCK — the single method a real backend would replace.
    this._armed = { ...this._describe, repeating: this._repeating, mode: this._mode };
    this._open = false;
    this._fireHaptic("success");
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

    if (!this._open) {
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

          <div class="tabs">
            <button class="tab ${isClock ? "on" : ""}" @click=${() => { this._mode = "clock"; }}>
              <ha-icon icon="m3o:schedule"></ha-icon>At a time
            </button>
            <button class="tab ${isClock ? "" : "on"}" @click=${() => { this._mode = "event"; }}>
              <ha-icon icon="m3o:sensors"></ha-icon>When…
            </button>
          </div>

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
              <span class="n">${this._repeating ? "Repeats weekly" : "Just once"}</span>
              <span class="s">${this._repeating
                ? "Same time every selected day"
                : "One run, then back to normal"}</span>
            </div>
          </div>

          ${this._repeating
            ? html`<div class="days">
                ${this._dayNames.map(
                  (n, i) => html`<button
                    class="dayb ${this._days[i] ? "on" : ""}"
                    @click=${() => {
                      const next = [...this._days];
                      next[i] = !next[i];
                      this._days = next;
                    }}
                  >${n}</button>`
                )}
              </div>`
            : nothing}

          <div class="actions">
            <button class="cancel" @click=${() => { this._open = false; }}>Cancel</button>
            <button class="confirm" @click=${this._commit}>
              <ha-icon icon="m3o:alarm-on"></ha-icon>
              <span>${this._repeating ? "Save schedule" : "Set timer"}</span>
            </button>
          </div>

          <div class="mock">Mocked · nothing is scheduled</div>
        </div>
      </ha-card>
    `;
  }

  _renderClock() {
    return html`
      <div class="chips">
        ${this._quick.map(
          (q) => html`<button
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
            if (this._customOpen) this._pick = "custom";
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
              <div class="mins">
                ${[0, 15, 30, 45].map(
                  (m) => html`<button
                    class="min ${this._minute === m ? "on" : ""}"
                    @click=${() => {
                      this._minute = m;
                      this._pick = "custom";
                    }}
                  >${this._pad(m)}</button>`
                )}
              </div>
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
          (e) => html`<button
            class="trigger ${this._event === e.key ? "on" : ""}"
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
    return this._open ? 10 : 2;
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
