import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card.poc {
      display: flex;
      flex-direction: column;
      gap: 8px; /* the ONE menu-style gap separating hero from the stack */
    }

    /* ---- connected stack: 2px seams, 8px inner corners, 24px outers ------- */
    .stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stack > .seg {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 8px;
      padding: 10px 14px;
      box-sizing: border-box;
    }

    .stack > .seg:first-child {
      border-radius: 24px 24px 8px 8px;
    }

    .stack > .seg:last-child {
      border-radius: 8px 8px 24px 24px;
    }

    .stack > .seg:only-child {
      border-radius: 24px;
    }

    .seg materia-button-group {
      display: block;
    }

    materia-thermostat {
      display: block;
    }

    /* Water heater as a menu segment: the seg provides the group silhouette,
       the embedded materia-menu goes transparent inside it. NO extra padding —
       the trigger's own 18px inset already matches the accordion bars. */
    .stack > .seg.water-menu {
      padding: 0;
    }

    .seg.water-menu materia-menu {
      --ha-card-background: transparent;
      display: block;
    }

    /* reserve_height: the stack gets a JS-measured min-height (tallest
       section); the open section absorbs the reserved space. */
    .stack.reserve > .seg.acc-sec.open {
      flex: 1 0 auto;
    }

    /* ---- wallet accordion INSIDE the connected stack ------------------------
       The sections keep the group silhouette (2px seams, positional 8/24px
       corners from the .seg first/last rules). Wallet cues: closed bars are
       compact and slightly muted; the open one grows tall on the expressive
       spring and carries the full card tone. */
    .stack > .seg.acc-sec {
      padding: 0;
      overflow: hidden;
      background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) 78%, var(--md-sys-color-surface, var(--ha-card-background)));
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .stack > .seg.acc-sec.open {
      background: var(--ha-card-background, var(--card-background-color));
    }

    .acc-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* Open: the bar hands its bottom padding to the body so header and
       content sit on the group's seam rhythm, not a double gap. */
    .acc-sec.open .acc-bar {
      padding-bottom: 8px;
    }

    .acc-icon {
      --mdc-icon-size: 20px;
      opacity: 0.9;
      flex-shrink: 0;
    }

    .acc-title {
      font-size: 14px;
      font-weight: 600;
      flex: 1;
      transition: font-size var(--md-sys-motion-fast-effects);
    }

    .acc-sec.open .acc-title {
      font-size: 16px;
    }

    .acc-info {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.7;
      white-space: nowrap;
    }

    .acc-chev {
      --mdc-icon-size: 22px;
      opacity: 0.55;
      flex-shrink: 0;
    }

    .acc-body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--md-sys-motion-expressive-default-spatial);
    }

    .acc-sec.open .acc-body {
      grid-template-rows: 1fr;
    }

    .acc-inner {
      overflow: hidden;
      min-height: 0;
    }

    /* All off/on — right side of the OPEN bar, no orphan band. */
    .acc-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }

    .mini {
      border: 1.5px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.2));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .mini:active {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .acc-cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 12px 14px;
    }
  `,
];
