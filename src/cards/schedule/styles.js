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
      width: 52px;
      height: 52px;
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

    .tabs,
    .row {
      display: flex;
      gap: 4px;
    }

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

    /* Connected segmented pair. The selected one GROWS, which is the expressive
       button-group behaviour already used elsewhere in Materia. */
    .tab {
      flex: 1;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.08));
      color: var(--md-sys-color-on-surface-variant, inherit);
      transition: flex var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .tab:first-child {
      border-radius: 26px 6px 6px 26px;
    }

    .tab:last-child {
      border-radius: 6px 26px 26px 6px;
    }

    .tab.on {
      flex: 1.5;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .tab ha-icon {
      --mdc-icon-size: 20px;
    }

    /* Quick chips: 60px tall, so the pill radius is 30px and the morph to 18px
       is a real, visible change. A 999px radius here would be identical to 30px
       and the morph would appear to do nothing for most of its duration. */
    .quick {
      height: 60px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      border-radius: 30px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .quick.on {
      border-radius: 18px;
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
      border-radius: 30px;
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

    .min {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      font-size: 13px;
      font-weight: 600;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
      border-radius: 6px;
      transition: background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .min:first-child {
      border-radius: 20px 6px 6px 20px;
    }

    .min:last-child {
      border-radius: 6px 20px 20px 6px;
    }

    .min.on {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
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
      width: 52px;
      height: 52px;
      display: grid;
      place-items: center;
      font-size: 15px;
      font-weight: 500;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
      border-radius: 26px;
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

    .days {
      display: flex;
      gap: 3px;
    }

    .dayb {
      flex: 1;
      height: 48px;
      display: grid;
      place-items: center;
      font-size: 13px;
      font-weight: 600;
      border-radius: 24px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .dayb.on {
      border-radius: 14px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
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
