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
         track by 14dp, so the slider brings its own bottom air and an equal
         pad below it reads as a hole. */
      padding: 14px 16px 4px;
      display: flex;
      flex-direction: column;
      gap: 0;
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

    /* The head row is a NAME and a READING side by side, so both sit on the
       M3 type scale one step apart rather than three. The 11px uppercase
       eyebrow over a 20px/700 numeral that shipped first came from
       materia-bar-select, where the two are stacked in a narrow column and
       the size jump is what separates them; laid out horizontally and
       baseline-aligned the same pair reads as a mismatch. title-small against
       title-medium keeps the reading dominant without shouting. */

    /* M3 title-small: 14sp / 500 / 20sp line / +0.1px tracking. */
    .label {
      flex: 1;
      min-width: 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      opacity: 0.85;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 title-medium: 16sp / 500 / 24sp line / +0.15px tracking. Accent
       coloured so the number and the track it belongs to read as one thing. */
    .value {
      flex: none;
      font-family: var(--materia-font-display, inherit);
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: var(--ml-accent);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    /* M3 label-medium: 12sp / 500 / 16sp line / +0.5px tracking. */
    .unit {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.5px;
      opacity: 0.7;
      margin-left: 0.15em;
    }

    materia-slider {
      display: block;
      width: 100%;
    }
  `,
];
