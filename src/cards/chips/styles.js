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
      /* ON THE LADDER. 44px was on no scale at all: M3's FilterChipTokens is
         ContainerHeight 32dp with ContainerShape CornerSmall (8dp), and the M3
         Expressive button ladder is 32/40/56/96/136 — 44 is neither. These
         behave like M3E selected-toggle buttons rather than filter chips (they
         morph shape on selection, which a filter chip does not), so they take the
         button ladder's SMALL rung: 40px tall, 16px padding, 8px gap, 14px label
         — all four straight from .size-s in elements/button/styles.js. */
      height: 40px;
      padding: 0 16px;
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
      /* EXACTLY half the height, not 999px. Both look like a pill at rest, but
         999px is unanimatable: on a 40px chip every value above 20px renders
         identically, so interpolating 999 -> 12 sits visually still for ~97% of
         the duration and then snaps at the end. Starting at the real half-height
         makes the morph perceptually linear. */
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      /* All on ONE duration so the chip reads as a single motion. Mixing
         durations made it grow in two stages: the colour landed on the fast
         curve while the width (driven by the check expanding) was still
         running on the slower one. Non-overshooting curve throughout — on the
         springy spatial one the radius sailed past its target and
         overflow:hidden flashed square corners. */
      transition: border-radius var(--md-sys-motion-fast-effects),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .chip.on {
      background: var(--mc-bg);
      color: var(--mc-fg);
      /* .size-s's square-shape corner, so the morph lands on a real token
         instead of a number picked to look right. */
      border-radius: 12px;
      font-weight: 600;
    }

    /* Check collapses to zero width when unselected — the chip closes up
       around the label instead of holding an empty slot. Width only, so
       nothing can overshoot the chip's own bounds. */
    .check {
      /* FilterChipTokens.IconSize. */
      --mdc-icon-size: 18px;
      width: 0;
      opacity: 0;
      overflow: hidden;
      flex-shrink: 0;
      transition: width var(--md-sys-motion-fast-effects),
        opacity var(--md-sys-motion-fast-effects);
    }

    .chip.on .check {
      width: 17px;
      opacity: 1;
    }

    .lead {
      /* FilterChipTokens.IconSize. */
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
