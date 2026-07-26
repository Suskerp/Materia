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
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: clamp(18px, 7cqi, 26px);
      font-weight: 500;
      opacity: 0.95;
    }

    .cond-glyph {
      width: clamp(22px, 8cqi, 30px);
      height: clamp(22px, 8cqi, 30px);
    }

    /* Pixel-style numerals: big but LIGHT — the heavy 700 weight and tight
       tracking read as "off" next to the reference. */
    .temp {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      line-height: 0.95;
      margin: 4px 0 6px;
    }

    .temp-value,
    .temp-deg {
      font-size: clamp(72px, 38cqi, 150px);
      font-weight: 400;
      letter-spacing: normal;
    }

    .temp-deg {
      opacity: 0.95;
    }

    .feels {
      font-size: clamp(16px, 6cqi, 22px);
      font-weight: 500;
      opacity: 0.92;
    }

    .minmax {
      display: flex;
      gap: 7px;
      margin-top: 4px;
      font-size: clamp(14px, 5cqi, 18px);
      font-weight: 600;
    }

    .minmax .sep {
      opacity: 0.6;
      font-weight: 400;
    }
  `,
];
