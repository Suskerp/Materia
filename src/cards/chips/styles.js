import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      display: flex;
      align-items: center;
      gap: 7px;
      height: 44px;
      padding: 0 15px;
      box-sizing: border-box;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      /* Unselected is a quiet filled surface with NO outline — an outlined
         chip next to filled neighbours read as disabled rather than
         unselected, and it matches the tonal button groups elsewhere. */
      background: var(--md-sys-color-surface-container-high, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent));
      border: none;
      color: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
      border-radius: 999px;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      /* Radius rides the NON-overshooting effects curve. On the springy
         spatial curve it overshot past its target, and with overflow:hidden
         that briefly clipped the corners square mid-transition. */
      transition: border-radius var(--md-sys-motion-default-effects),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .chip.on {
      background: var(--mc-bg);
      color: var(--mc-fg);
      border-radius: 14px;
      font-weight: 600;
    }

    /* Check collapses to zero width when unselected — the chip closes up
       around the label instead of holding an empty slot. Width only, so
       nothing can overshoot the chip's own bounds. */
    .check {
      --mdc-icon-size: 17px;
      width: 0;
      opacity: 0;
      overflow: hidden;
      flex-shrink: 0;
      transition: width var(--md-sys-motion-default-effects),
        opacity var(--md-sys-motion-fast-effects);
    }

    .chip.on .check {
      width: 17px;
      opacity: 1;
    }

    .lead {
      --mdc-icon-size: 17px;
      flex-shrink: 0;
    }

    .text {
      white-space: nowrap;
    }

    /* M3 state layer */
    .chip::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .chip:hover::before {
      opacity: 0.08;
    }

    .chip:active::before {
      opacity: 0.12;
    }

    @media (prefers-reduced-motion: reduce) {
      .chip,
      .check {
        transition: none;
      }
    }
  `,
];
