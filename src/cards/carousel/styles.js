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

    .rail {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      scroll-snap-type: x proximity;
      /* Bleed to the card edge so tiles scroll out under the padding rather
         than stopping short of it. */
      padding: 2px 14px 2px 0;
      margin-right: -14px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      /* Drag affordance for pointer users; without user-select the drag would
         start selecting the tile labels instead of scrolling. */
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }

    .rail:active {
      cursor: grabbing;
    }

    .rail::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .tile {
      flex: none;
      width: 112px;
      height: 132px;
      padding: 14px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      scroll-snap-align: start;
      cursor: pointer;
      border: none;
      font-family: inherit;
      text-align: left;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      /* Quiet filled surface when unselected — same treatment as the chips, so
         an unselected tile never reads as disabled. */
      background: var(--md-sys-color-surface-container-high, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent));
      color: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
      border-radius: 28px;
      /* Non-overshooting curve: a spring here overshoots the radius and, with
         overflow:hidden, flashes square corners mid-transition. */
      transition: border-radius var(--md-sys-motion-default-effects),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .tile.on {
      background: var(--mcar-bg);
      color: var(--mcar-fg);
      border-radius: 16px;
    }

    .top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .glyph {
      --mdc-icon-size: 24px;
      opacity: 0.85;
    }

    .check {
      --mdc-icon-size: 18px;
      opacity: 0;
      flex-shrink: 0;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .tile.on .check {
      opacity: 1;
    }

    .bottom {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .name {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.2;
      /* Two lines max — "Master bedroom" shouldn't force a wider tile. */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .sub {
      font-size: 12px;
      opacity: 0.65;
      margin-top: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 state layer */
    .tile::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .tile:hover::before {
      opacity: 0.08;
    }

    .tile:active::before {
      opacity: 0.12;
    }

    @media (prefers-reduced-motion: reduce) {
      .tile,
      .check {
        transition: none;
      }
    }
  `,
];
