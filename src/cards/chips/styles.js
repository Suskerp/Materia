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
      gap: 8px;
      height: 52px;
      padding: 0 18px;
      box-sizing: border-box;
      cursor: pointer;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      /* Unselected: outlined chip on the surface, per the M3 filter chip. */
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent);
      border: 1px solid var(--md-sys-color-outline-variant, var(--md-sys-color-outline, rgba(0, 0, 0, 0.25)));
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      border-radius: 999px;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      /* The corner tightening rides the springy spatial easing; color is a
         plain effects fade so it never overshoots. */
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        transform var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects),
        font-weight var(--md-sys-motion-fast-effects);
      transform: scale(0.97);
    }

    .chip.on {
      background: var(--mc-bg);
      color: var(--mc-fg);
      border-color: transparent;
      border-radius: 18px;
      font-weight: 700;
      transform: scale(1);
    }

    /* Check collapses to zero width when unselected — the chip closes up
       around the label instead of holding an empty slot. */
    .check {
      --mdc-icon-size: 18px;
      width: 0;
      opacity: 0;
      overflow: hidden;
      flex-shrink: 0;
      transition: width var(--md-sys-motion-expressive-fast-spatial),
        opacity var(--md-sys-motion-fast-effects);
    }

    .chip.on .check {
      width: 18px;
      opacity: 1;
    }

    .lead {
      --mdc-icon-size: 18px;
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
