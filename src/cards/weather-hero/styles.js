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
    }

    .hero {
      container-type: inline-size;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      color: var(--wh-fg, var(--md-sys-color-on-surface, var(--primary-text-color)));
      padding: 8px 0 10px;
      -webkit-tap-highlight-color: transparent;
    }

    .condition {
      font-size: clamp(18px, 7cqi, 26px);
      font-weight: 500;
      opacity: 0.95;
    }

    .temp {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      line-height: 0.95;
      margin: 2px 0 4px;
    }

    .temp-value {
      font-size: clamp(64px, 34cqi, 132px);
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .temp-unit {
      font-size: clamp(20px, 9cqi, 36px);
      font-weight: 600;
      margin-top: clamp(6px, 3cqi, 14px);
      opacity: 0.9;
    }

    .feels {
      font-size: clamp(15px, 5.5cqi, 20px);
      font-weight: 500;
      opacity: 0.9;
    }

    .minmax {
      display: flex;
      gap: 7px;
      margin-top: 3px;
      font-size: clamp(13px, 4.5cqi, 16px);
      font-weight: 700;
    }

    .minmax .sep {
      opacity: 0.6;
      font-weight: 400;
    }
  `,
];
