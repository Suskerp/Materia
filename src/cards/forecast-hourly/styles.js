import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles, dataStateStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

/** Styles for the hour strip — shared by the standalone card and the daily
 *  card's expanded detail (both render the same .hour markup). */
export const hourlyRowStyles = css`
  .hours {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
    user-select: none;
  }

  .hours::-webkit-scrollbar {
    display: none;
  }

  .hours:active {
    cursor: grabbing;
  }

  .hour {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    min-width: 52px;
    padding: 8px 4px;
  }

  .h-temp {
    font-size: 14px;
    font-weight: 600;
  }

  .h-glyph {
    width: 26px;
    height: 26px;
  }

  .h-precip {
    font-size: 11px;
    font-weight: 600;
    color: var(--md-sys-cust-color-weather-rain, #5fa8f5);
    min-height: 14px;
  }

  .h-precip.empty {
    visibility: hidden;
  }

  .h-time {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.75;
  }
`;

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  dataStateStyles,
  motionTokens,
  hourlyRowStyles,
  css`
    ha-card {
      border-radius: 24px;
      padding: 12px 14px;
      /* haCardReset clears the background — restore the surface so the strip
         reads as a card like its neighbors, not floating glyphs. */
      background: var(--ha-card-background, var(--card-background-color));
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      padding: 2px 4px 6px;
      opacity: 0.9;
    }

    .header ha-icon {
      --mdc-icon-size: 18px;
    }
  `,
];
