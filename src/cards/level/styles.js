import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  // The unavailable treatment is keyed on ha-card.unavailable, which is why
  // the class goes on the card rather than the tile inside it.
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .tile {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      /* Asymmetric on purpose: the 44dp handle already overhangs the 16dp
         track by 14dp, so an equal bottom pad reads as too much air. */
      padding: 14px 16px 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      box-sizing: border-box;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .head {
      display: flex;
      align-items: baseline;
      gap: 10px;
      min-width: 0;
    }

    .head ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
      color: var(--ml-accent);
      /* Baseline alignment would hang a glyph off the text baseline. */
      align-self: center;
      opacity: 0.9;
    }

    .label {
      flex: 1;
      min-width: 0;
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.65;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      flex: none;
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(16px, 5.6cqi, 20px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.25;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .unit {
      font-size: 0.65em;
      font-weight: 600;
      opacity: 0.6;
      margin-left: 0.15em;
    }

    materia-slider {
      display: block;
      width: 100%;
    }
  `,
];
