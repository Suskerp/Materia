import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { hourlyRowStyles } from "../forecast-hourly/styles.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  hourlyRowStyles,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .row {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 2px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      cursor: grab;
      user-select: none;
    }

    .row:active {
      cursor: grabbing;
    }

    .row::-webkit-scrollbar {
      display: none;
    }

    .pill {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 64px;
      padding: 14px 10px 12px;
      border: none;
      border-radius: 999px;
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      font-family: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .pill:active {
      transform: scale(0.96);
    }

    .pill.selected {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .hi {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.2;
    }

    .lo {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.6;
      line-height: 1.2;
    }

    .glyph {
      width: 34px;
      height: 34px;
      margin: 6px 0 0;
    }

    .precip {
      font-size: 12px;
      font-weight: 600;
      color: var(--md-sys-cust-color-weather-rain, #5fa8f5);
      line-height: 1.3;
      min-height: 16px;
    }

    .pill.selected .precip {
      color: inherit;
      opacity: 0.85;
    }

    .precip.empty {
      visibility: hidden;
    }

    .day {
      font-size: 13px;
      font-weight: 500;
      margin-top: 2px;
      opacity: 0.85;
    }

    /* Expanding hourly detail — the 0fr→1fr grid-row trick animates height
       without measuring; the expressive spatial spring gives it the M3 bounce. */
    .detail {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--md-sys-motion-expressive-default-spatial);
    }

    .detail.open {
      grid-template-rows: 1fr;
    }

    .detail-inner {
      overflow: hidden;
      min-height: 0;
    }

    .detail-inner .hours {
      margin-top: 8px;
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      padding: 8px 10px;
    }
  `,
];
