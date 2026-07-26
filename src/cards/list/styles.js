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
      border-radius: 24px;
      padding: 16px 20px;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 600;
      padding-bottom: 8px;
    }

    .header ha-icon {
      --mdc-icon-size: 18px;
    }

    .rows {
      display: flex;
      flex-direction: column;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 0;
      font-size: 14px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border-radius: 10px;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .row:hover {
      background: color-mix(in srgb, currentColor 5%, transparent);
    }

    .row-icon {
      --mdc-icon-size: 17px;
      opacity: 0.8;
      flex-shrink: 0;
    }

    .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      font-weight: 500;
      opacity: 0.85;
      flex-shrink: 0;
    }

    .row.unavailable .state {
      opacity: 0.45;
    }
  `,
];
