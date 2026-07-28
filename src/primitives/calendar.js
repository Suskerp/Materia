import { LitElement, html, css, nothing } from "lit";
import { motionTokens } from "../utils/motion.js";

/**
 * <materia-calendar> — a month grid, and nothing else.
 *
 * Deliberately dumb: it owns no selection state and performs no actions. It is
 * told which month to show and what is selected, and it emits `date-selected`
 * with a real Date. That is what makes it reusable for a schedule picker, a
 * history scrubber or a holiday planner rather than being welded to one card.
 *
 * SIZES come from DatePickerModalTokens: DateContainerHeight and
 * DateContainerWidth are both 40dp and DateContainerShape is CornerFull, so the
 * day cell is a 40px circle. Today is a 1dp outline (DateTodayContainerOutlineWidth)
 * rather than a fill, which is what keeps it distinguishable from the selection
 * without competing with it.
 *
 * ONE DELIBERATE DEVIATION: the spec keeps DateContainerShape at CornerFull in
 * every state, so a selected day stays a circle. This morphs it to 12px —
 * Corner Medium — on selection, following the design doc's expressive
 * shape-change-on-select. It is a real shape token, and at 40px the 20px->12px
 * change is legible; the doc's own 14px on a 44px cell is the same ratio but
 * traces to no token.
 *
 * WEEK START is configurable and defaults to Monday, because a Sunday-first grid
 * silently shifts every date by one column for most of Europe. The weekday
 * labels are generated from the browser locale, not hardcoded, so they follow
 * whatever language HA is running in.
 */
class MateriaCalendar extends LitElement {
  static properties = {
    /** Month being shown: full year and 0-indexed month. */
    year: { type: Number },
    month: { type: Number },
    /** Selected day-of-month within the shown month, or null. */
    selected: { type: Number },
    /** 1 = Monday (default), 0 = Sunday. */
    firstDay: { type: Number, attribute: "first-day" },
    /** Block days before today. */
    noPast: { type: Boolean, attribute: "no-past" },
    /** BCP-47 tag for the weekday labels and month name. */
    locale: { type: String },
  };

  static styles = [
    motionTokens,
    css`
      :host {
        display: block;
        /* DatePickerModalTokens.DateContainerHeight / DateContainerWidth. */
        --mc-cell: 40px;
      }

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 0 4px 10px;
      }

      .month {
        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--md-sys-color-on-surface);
      }

      .nav {
        display: flex;
        gap: 3px;
      }

      /* Connected pair: round on the outside, small where they meet — the M3
         connected-group treatment, so the two arrows read as one control. */
      .nav button {
        width: 44px;
        height: 40px;
        border: none;
        background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.08));
        color: var(--md-sys-color-on-surface);
        display: grid;
        place-items: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        transition: background-color var(--md-sys-motion-fast-effects);
      }

      .nav button:first-child {
        border-radius: 20px 6px 6px 20px;
      }

      .nav button:last-child {
        border-radius: 6px 20px 20px 6px;
      }

      .nav button:hover {
        background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.14));
      }

      .nav svg {
        width: 20px;
        height: 20px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
        justify-items: center;
      }

      /* WeekdaysLabelTextFont is BodyLarge; scaled down here because seven of
         them share a 7-column grid that must not wrap. */
      .dow {
        height: 26px;
        display: grid;
        place-items: center;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--md-sys-color-on-surface-variant, rgba(0, 0, 0, 0.6));
      }

      .day {
        width: var(--mc-cell);
        height: var(--mc-cell);
        display: grid;
        place-items: center;
        border: none;
        padding: 0;
        font: inherit;
        font-size: 15px;
        background: transparent;
        color: var(--md-sys-color-on-surface);
        border-radius: 50%;
        cursor: pointer;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        transition: background-color var(--md-sys-motion-fast-effects),
          color var(--md-sys-motion-fast-effects),
          border-radius var(--md-sys-motion-expressive-fast-spatial);
      }

      .day.blank {
        visibility: hidden;
        cursor: default;
      }

      .day:not(.sel):not(.dead):hover {
        background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
      }

      /* DateTodayContainerOutlineWidth = 1dp. An outline, not a fill, so it
         cannot be mistaken for the selection. */
      .day.today {
        outline: 1px solid var(--md-sys-color-primary);
        outline-offset: -1px;
        font-weight: 700;
      }

      .day.sel {
        background: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        font-weight: 700;
        /* Corner Medium — see the note on the deviation from CornerFull. */
        border-radius: 12px;
        outline: none;
      }

      .day.dead {
        color: var(--md-sys-color-on-surface-variant, rgba(0, 0, 0, 0.5));
        opacity: 0.45;
        cursor: default;
      }
    `,
  ];

  constructor() {
    super();
    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
    this.selected = null;
    this.firstDay = 1;
    this.noPast = false;
    this.locale = "";
  }

  get _locale() {
    return this.locale || undefined; // undefined = the browser's own locale
  }

  /** Weekday initials in display order, generated from the locale rather than
   *  hardcoded — a hardcoded "M T W T F S S" is wrong in most languages. */
  get _dayNames() {
    const fmt = new Intl.DateTimeFormat(this._locale, { weekday: "narrow" });
    // 2024-01-01 was a Monday, so it is a convenient anchor for day ordering.
    return Array.from({ length: 7 }, (_, i) =>
      fmt.format(new Date(2024, 0, 1 + ((i + (this.firstDay === 0 ? 6 : 0)) % 7)))
    );
  }

  get _monthLabel() {
    return new Intl.DateTimeFormat(this._locale, { month: "long", year: "numeric" })
      .format(new Date(this.year, this.month, 1));
  }

  _shift(delta) {
    let m = this.month + delta;
    let y = this.year;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    this.dispatchEvent(
      new CustomEvent("month-changed", { detail: { year: y, month: m }, bubbles: true, composed: true })
    );
  }

  _pick(day) {
    this.dispatchEvent(
      new CustomEvent("date-selected", {
        detail: { date: new Date(this.year, this.month, day), day },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const first = new Date(this.year, this.month, 1);
    // getDay() is Sunday-indexed; rotate it so the grid starts on firstDay.
    const lead = (first.getDay() - this.firstDay + 7) % 7;
    const total = new Date(this.year, this.month + 1, 0).getDate();

    const now = new Date();
    const isThisMonth = now.getFullYear() === this.year && now.getMonth() === this.month;
    const todayNum = now.getDate();

    const cells = [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: total }, (_, i) => i + 1),
    ];

    return html`
      <div class="head">
        <span class="month">${this._monthLabel}</span>
        <div class="nav">
          <button type="button" aria-label="Previous month" @click=${() => this._shift(-1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Next month" @click=${() => this._shift(1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div class="grid" role="grid">
        ${this._dayNames.map((n) => html`<div class="dow" aria-hidden="true">${n}</div>`)}
        ${cells.map((d) => {
          if (d === null) return html`<div class="day blank"></div>`;
          const today = isThisMonth && d === todayNum;
          const dead = this.noPast && isThisMonth && d < todayNum;
          const sel = this.selected === d;
          return html`<button
            type="button"
            class="day ${sel ? "sel" : ""} ${today ? "today" : ""} ${dead ? "dead" : ""}"
            ?disabled=${dead}
            aria-selected=${sel ? "true" : "false"}
            @click=${dead ? undefined : () => this._pick(d)}
          >${d}</button>`;
        })}
      </div>
    `;
  }
}

customElements.define("materia-calendar", MateriaCalendar);
