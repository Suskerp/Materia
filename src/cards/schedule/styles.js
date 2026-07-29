import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .sheet {
      border-radius: 32px 32px 14px 32px;
      background: var(--md-sys-color-surface-container-low, var(--card-background-color));
      color: var(--md-sys-color-on-surface);
      padding: clamp(14px, 4cqi, 20px);
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3.6cqi, 18px);
      overflow: hidden;
    }

    /* ---- collapsed strip (design 7b) ---- */

    .strip {
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* Armed gets a FILLED tonal treatment, not quiet grey text: a timer that is
       going to fire must never be able to hide. */
    .strip .glyph {
      width: 56px;
      height: 56px;
      flex: none;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial);
    }

    /* A repeating schedule is a different KIND of thing from a one-off, so the
       silhouette says so as well as the text. */
    .strip.repeating .glyph {
      border-radius: 16px;
    }

    .strip .glyph ha-icon {
      --mdc-icon-size: 26px;
    }

    .strip .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .strip .head {
      font-size: clamp(16px, 4.6cqi, 18px);
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .strip .sub {
      font-size: clamp(12px, 3.4cqi, 13px);
      opacity: 0.68;
    }

    /* Inline cancel on the armed strip. Tonal against the filled glyph, so it
       reads as secondary to the schedule itself rather than competing with it. */
    .strip-cancel {
      flex: none;
      height: 44px;
      padding: 0 18px;
      border-radius: 22px;
      font-size: 14px;
      font-weight: 600;
      background: color-mix(in srgb, var(--md-sys-color-on-surface) 10%, transparent);
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .strip-cancel:hover {
      background: color-mix(in srgb, var(--md-sys-color-on-surface) 18%, transparent);
    }

    /* ---- header echo (design 7a) ---- */

    .echo {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .echo .eyebrow {
      font-size: clamp(11px, 3.2cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.62;
    }

    /* The chosen moment is echoed large so it can be confirmed without
       re-reading the chips. */
    .echo .headline {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(30px, 10.5cqi, 44px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.08;
      color: var(--md-sys-color-primary);
    }

    .echo .subline {
      font-size: clamp(12px, 3.6cqi, 14px);
      opacity: 0.62;
    }

    /* ---- rows of choices ---- */


    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    button {
      font: inherit;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      color: inherit;
    }


    /* Two-line selectable cells, NOT M3 chips — verified: FilterChipTokens is
       ContainerHeight 32dp with ContainerShape CornerSmall (8dp) and a LabelLarge
       label, which cannot hold a name plus a resolved time. So these are sized
       off the M3 button ladder instead: 56px is the medium rung, 28px is half of
       it (the pill), and 16px is that rung's square corner, giving a morph whose
       every value traces to something. The previous 60px/30px/18px was on no
       scale at all.

       28px rather than 999px matters: above half the height every radius renders
       identically, so a 999 -> 16 morph would sit visually still for most of its
       duration and then snap. */
    .quick {
      height: 56px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .quick.on {
      border-radius: 16px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .quick .n {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }

    .quick .t {
      font-size: 12px;
      opacity: 0.66;
      white-space: nowrap;
    }

    /* Trigger list (the "When..." tab). */
    .trigger {
      width: 100%;
      box-sizing: border-box;
      height: 78px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      text-align: left;
      border-radius: 34px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .trigger.on {
      border-radius: 20px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .trigger ha-icon {
      --mdc-icon-size: 26px;
      flex: none;
    }

    .trigger .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .trigger .n {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.01em;
    }

    .trigger .s {
      font-size: 12px;
      opacity: 0.66;
    }

    .trigger .check {
      opacity: 0;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .trigger.on .check {
      opacity: 1;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* ---- the unfolding custom picker ---- */

    .custom {
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      overflow: hidden;
    }

    .custom-head {
      width: 100%;
      box-sizing: border-box;
      height: 66px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      background: none;
      text-align: left;
    }

    .custom-head .lbl {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }

    .custom-head .chev {
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .custom.open .custom-head .chev {
      transform: rotate(180deg);
    }

    .custom-head svg {
      width: 24px;
      height: 24px;
      flex: none;
    }

    /* Height is animated from a MEASURED pixel value, because CSS cannot
       interpolate to auto. See updated() in index.js. */
    .custom-body {
      overflow: hidden;
      height: 0;
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    .custom-inner {
      padding: 2px 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .sep {
      height: 1px;
      background: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
      margin: 2px 6px;
    }

    .timerow {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      padding: 0 6px;
      min-width: 0;
    }

    .clock {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(38px, 13cqi, 52px);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1;
      color: var(--md-sys-color-primary);
      flex: none;
      font-variant-numeric: tabular-nums;
    }

    .spacer {
      flex: 1;
    }

    .mins {
      display: flex;
      gap: 3px;
      flex: none;
    }





    /* 24 hours on a drag-free scroll rail — a 24-wide grid would crush each
       cell below the 40px minimum touch target. */
    .hours {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      padding: 2px 6px 6px;
      scrollbar-width: none;
    }

    .hours::-webkit-scrollbar {
      display: none;
    }

    .hour {
      flex: none;
      width: 56px;
      height: 56px;
      display: grid;
      place-items: center;
      font-size: 15px;
      font-weight: 500;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
      border-radius: 28px;
      font-variant-numeric: tabular-nums;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .hour.on {
      border-radius: 16px;
      font-weight: 700;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    /* ---- repeat ---- */

    .repeat {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 2px 6px;
    }

    .repeat .text {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .repeat .n {
      font-size: 15px;
      font-weight: 600;
    }

    .repeat .s {
      font-size: 12px;
      opacity: 0.66;
    }

    /* M3 switch, per SwitchTokens (52x32 track, 24 thumb selected). */
    .sw {
      width: 52px;
      height: 32px;
      flex: none;
      border-radius: 16px;
      padding: 3px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.2));
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .sw.on {
      justify-content: flex-end;
      background: var(--md-sys-color-primary);
    }

    .sw i {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .sw.on i {
      background: var(--md-sys-color-on-primary);
    }




    /* ---- actions ---- */

    .actions {
      display: flex;
      gap: 4px;
      height: 72px;
      margin-top: 2px;
    }

    .cancel {
      flex: 1;
      border-radius: 34px 12px 12px 34px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.08));
      display: grid;
      place-items: center;
      font-size: 16px;
      font-weight: 600;
    }

    .confirm {
      flex: 2;
      border-radius: 12px 34px 34px 12px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
    }

    .confirm ha-icon {
      --mdc-icon-size: 24px;
    }

    /* Composed button groups. They bring their own ha-card, so the wrapper is
       flattened to sit in this sheet rather than reading as a card-in-a-card. */
    materia-button-group {
      display: block;
    }

    materia-button-group.mins {
      flex: none;
    }

    /* STAGGERED ENTER. The gap the picker had was not missing transitions on
       selection — those were there — it was that whole GROUPS appeared with no
       motion at all: switching tab swapped one block for another instantly, and
       the weekday row popped into existence. Each item now rises with a 45ms
       step, the same cadence materia-bar-select uses, so a set reads as arriving
       rather than being replaced.

       This is an ANIMATION, not a transition, because the elements are created
       and destroyed by the mode switch — there is no previous value to
       interpolate from. */
    @keyframes ms-rise {
      from {
        opacity: 0;
        transform: translateY(10px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }

    .rise {
      animation: ms-rise var(--md-sys-motion-expressive-default-spatial) both;
    }

    /* Respect the user's setting: the stagger is decorative, and a vestibular
       trigger is not worth a flourish. */
    @media (prefers-reduced-motion: reduce) {
      .rise {
        animation: none;
      }
    }

    /* SHEET MODE: lose the ROUNDED EDGE, keep the surface.
       The card-in-a-card look came from the inner radius reading as a second
       card outline inside the dialog's own, so only that goes — the card then
       fills the dialog edge to edge and becomes its surface.

       Background and padding deliberately STAY. Dropping the background made the
       chips disappear: they are surface-container-high, which is what the dialog
       itself is, so they had nothing to contrast against. And the dialog supplies
       no padding of its own, so removing the card's left the content flush
       against the edges. */
    :host([sheet]) .sheet {
      border-radius: 0;
    }

    .mock {
      font-size: clamp(11px, 3.2cqi, 12px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.5;
      padding: 0 6px;
    }
  `,
];
