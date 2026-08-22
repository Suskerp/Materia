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
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--md-sys-color-on-surface);
      padding: clamp(14px, 4cqi, 20px);
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3.6cqi, 18px);
      overflow: hidden;
    }

    /* ---- multi-schedule manager ----------------------------------- */

    .manager {
      gap: 14px;
    }

    .manager-head {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .manager-head > div,
    .schedule-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .manager-title {
      font-family: var(--materia-font-display, inherit);
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .manager-sub,
    .schedule-sub {
      font-size: 13px;
      color: var(--md-sys-color-on-surface-variant, currentColor);
      opacity: 0.76;
    }

    .manager-add {
      min-width: 48px;
      height: 48px;
      padding: 0 18px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      font-weight: 700;
    }

    .schedule-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .schedule-row {
      min-height: 72px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 10px 6px 16px;
      border-radius: 24px;
      background: var(--md-sys-color-surface-container, rgba(0, 0, 0, 0.05));
    }

    .schedule-main {
      flex: 1;
      min-width: 0;
      min-height: 56px;
      padding: 0;
      display: flex;
      align-items: center;
      gap: 14px;
      text-align: left;
      background: transparent;
    }

    .schedule-main > ha-icon:last-child {
      --mdc-icon-size: 20px;
      opacity: 0.62;
    }

    .schedule-name {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .schedule-toggle {
      position: relative;
      width: 52px;
      height: 32px;
      flex: none;
      box-sizing: border-box;
      border-radius: 16px;
      border: 2px solid var(--md-sys-color-outline, rgba(0, 0, 0, 0.35));
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
    }

    .schedule-toggle i {
      position: absolute;
      top: 50%;
      left: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transform: translateY(-50%);
      transition: left var(--md-sys-motion-expressive-fast-spatial),
        width var(--md-sys-motion-expressive-fast-spatial),
        height var(--md-sys-motion-expressive-fast-spatial);
    }

    .schedule-toggle.on {
      border-color: transparent;
      background: var(--md-sys-color-primary);
    }

    .schedule-toggle.on i {
      left: 24px;
      width: 24px;
      height: 24px;
      background: var(--md-sys-color-on-primary);
    }

    .manager-empty {
      min-height: 88px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      text-align: left;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container, rgba(0, 0, 0, 0.05));
    }

    .manager-empty > span {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .manager-fields {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .manager-fields label {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .manager-fields label > span {
      padding-left: 4px;
      font-size: 12px;
      font-weight: 700;
      color: var(--md-sys-color-on-surface-variant, currentColor);
    }

    .m3-time-picker {
      display: block;
      width: 100%;
    }

    @container (max-width: 420px) {
      .manager-fields {
        grid-template-columns: 1fr;
      }

      .manager-add span {
        display: none;
      }

      .manager-add {
        padding: 0;
        width: 48px;
      }
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

    /* The armed strip when something is already scheduled. Filled tonal, because
       a pending run must not be able to read as quiet grey text — and it sits
       ABOVE the picker rather than replacing it, so the run can be moved by
       picking again or cleared outright, both without leaving the sheet. */
    .pending-strip {
      cursor: default;
      padding: 10px 12px;
      border-radius: 24px;
      background: color-mix(in srgb, var(--md-sys-color-primary) 14%, transparent);
    }

    /* ---- design 7b: the page summary ---- */

    .summary {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* A pending run is FILLED, not quiet grey text. An armed timer that reads as
       decoration is the one thing this strip exists to prevent. */
    .strip.armed {
      padding: 14px 16px;
      border-radius: 28px;
      background: var(--md-sys-cust-color-device, var(--md-sys-color-primary-container));
      color: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
      cursor: default;
    }

    /* Connected group: round on the outside, small where they meet, so the
       schedules and the add button read as one object rather than three tiles. */
    .rows {
      display: flex;
      gap: 4px;
      height: 66px;
    }

    .row-item {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 16px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 10px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .row-item:first-child {
      border-radius: 28px 10px 10px 28px;
    }

    .row-item ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
    }

    .row-item span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .row-add {
      flex: none;
      width: 66px;
      display: grid;
      place-items: center;
      border-radius: 10px 28px 28px 10px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      color: var(--md-sys-color-on-surface-variant, inherit);
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    /* Sole child: it owns both outer edges. */
    .row-add:first-child {
      border-radius: 28px;
    }

    .row-add svg {
      width: 22px;
      height: 22px;
    }

    .row-item:hover,
    .row-add:hover {
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.12));
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

    /* The headline and sub-line SWAP rather than cut. Everything else in the sheet
       eases, so an instant text change on the largest element read as a glitch.
       Paired with keyed() in index.js, which replaces the element so the animation
       actually replays — restarting one on a text change is otherwise impossible
       without touching animation-name. */
    @keyframes ms-swap {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }

    .echo .swap {
      animation: ms-swap var(--md-sys-motion-expressive-default-spatial) both;
    }

    @media (prefers-reduced-motion: reduce) {
      .echo .swap {
        animation: none;
      }
    }

    .echo .subline {
      font-size: clamp(12px, 3.6cqi, 14px);
      opacity: 0.62;
    }

    /* ---- rows of choices ---- */


    /* The quick chips fold away while the calendar is open — the picker takes
       real space, and offering both at once made the sheet enormous. 0fr/1fr
       animates height without measuring; the inert attribute on the wrapper (set in the
       template) takes the hidden buttons out of tab order. Effects curve:
       a fold is occlusion, not movement, so nothing should overshoot. */
    .chips-wrap {
      display: grid;
      grid-template-rows: 1fr;
      transition: grid-template-rows var(--md-sys-motion-default-effects),
        opacity var(--md-sys-motion-fast-effects);
    }

    .chips-wrap.folded {
      grid-template-rows: 0fr;
      opacity: 0;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      min-height: 0;
      overflow: hidden;
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

    /* ---- window (start-stop), for a recurring on/off range ---- */

    .window {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Same shell as .custom — same rounded surface a fold unfolds inside of —
       just once per edge (start, stop) instead of once for the whole picker. */
    .win-edge {
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high, rgba(0, 0, 0, 0.06));
      overflow: hidden;
    }

    .win-head {
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

    .win-head .lbl {
      flex: 1;
      font-size: 16px;
      font-weight: 600;
    }

    .win-head .val {
      font-family: var(--materia-font-display, inherit);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--md-sys-color-primary);
    }

    .win-head .chev {
      width: 24px;
      height: 24px;
      flex: none;
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .win-edge.open .win-head .chev {
      transform: rotate(180deg);
    }

    /* Height is animated from a MEASURED pixel value, same reasoning and same
       mechanism as .custom-body — see _syncFoldHeight() in index.js, which
       now walks every .win-edge rather than assuming there is only one fold. */
    .win-body {
      overflow: hidden;
      height: 0;
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    .win-inner {
      padding: 2px 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Non-normative affordance: a window whose stop <= start crosses midnight
       and round-trips exactly as entered — this badge only exists so that
       doesn't read as a mistake. Container pair, not an accent at partial
       alpha, per the rest of the library's filled-surface rule. */
    .overnight-badge {
      flex: none;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 10px;
      background: var(--md-sys-color-tertiary-container);
      color: var(--md-sys-color-on-tertiary-container);
    }

    .win-days {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 6px 0;
    }

    .win-days-label {
      font-size: 12px;
      font-weight: 600;
      opacity: 0.66;
    }

    /* A second timeslot on schedule_entity is refused rather than silently
       dropped on save — see _windowBlocked in index.js. Error container, the
       one place in this card an outcome is actually a stop, not a choice. */
    .window-blocked {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 18px;
      border-radius: 24px;
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
    }

    .window-blocked ha-icon {
      --mdc-icon-size: 24px;
      flex: none;
    }

    .window-blocked .text {
      display: flex;
      flex-direction: column;
    }

    .window-blocked .n {
      font-size: 15px;
      font-weight: 700;
    }

    .window-blocked .s {
      font-size: 12px;
      opacity: 0.8;
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

    /* M3 switch, per SwitchTokens. The previous version READ AS INVERTED and
       deserved to: the unselected handle was the same 26px as the selected one and
       the track had no outline, so "off" was a big dark knob on a plain light pill
       — which is exactly what "on" looks like.

       The spec carries the whole unselected/selected distinction in the handle
       GROWING (16dp -> 24dp inside a 32dp track) plus the 2px outline that only
       the unselected track has. cards/switch/styles.js already had this right;
       these are its values at the spec's full 52x32 track. */
    .sw {
      position: relative;
      width: 52px;
      height: 32px;
      flex: none;
      box-sizing: border-box;
      border-radius: 16px;
      background: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.1));
      border: 2px solid var(--md-sys-color-outline, rgba(0, 0, 0, 0.35));
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects);
    }

    .sw i {
      position: absolute;
      top: 50%;
      left: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transform: translateY(-50%);
      transition: left var(--md-sys-motion-expressive-fast-spatial),
        width var(--md-sys-motion-expressive-fast-spatial),
        height var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .sw.on {
      background: var(--md-sys-color-primary);
      border-color: transparent;
    }

    /* Selected: the handle grows to the spec's 24/32 and sits 4px from the edge. */
    .sw.on i {
      left: 24px;
      width: 24px;
      height: 24px;
      background: var(--md-sys-color-on-primary);
    }

    /* Pressed swells toward the spec's 28/32. */
    .sw:active i {
      width: 26px;
      height: 26px;
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

    .remove {
      flex: 1;
      border-radius: 34px 12px 12px 34px;
      background: var(--md-sys-color-error-container);
      color: var(--md-sys-color-on-error-container);
      font-size: 14px;
      font-weight: 700;
    }

    .remove + .cancel {
      border-radius: 12px;
    }

    .remove.armed {
      background: var(--md-sys-color-error);
      color: var(--md-sys-color-on-error);
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

    /* Nothing chosen yet, so there is nothing to confirm. Disabled at 38% per the
       M3 disabled-content opacity. */
    .confirm[disabled] {
      opacity: 0.38;
      cursor: default;
      pointer-events: none;
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
