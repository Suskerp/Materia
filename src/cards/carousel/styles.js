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
      /* No scroll-snap: proximity snapping caught fast flicks and settled them
         on the nearest tile, which killed the native fling. A room rail is a
         free scroll, not a pager. */
      /* NO bleed. The old negative-margin overhang (tiles scrolling out under
         the page padding) widened the rail beyond its grid cell, and in a
         multi-column sections view that meant painting over the neighbouring
         section. The rail is its own scroll container, so kept to its box it
         clips its content for free. */
      padding: 5px 0;
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

    /* wrap: the same tiles as full rows — no rail, no bleed, no grab. */
    :host([wrap]) .rail {
      flex-wrap: wrap;
      overflow: visible;
      padding: 5px 0;
      margin-right: 0;
      cursor: default;
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
      /* One duration for everything, matching the chips. The radius was on the
         slower default curve while the colours were on the fast one, so the
         tile visibly lagged the rest of the page. Non-overshooting throughout:
         a spring overshoots the radius and, with overflow:hidden, flashes
         square corners mid-transition. */
      transition: border-radius var(--md-sys-motion-fast-effects),
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
      /* Scales in with the corner morph instead of only fading, so the tile
         reads as one gesture. Springy curve on the transform (it moves),
         flat curve on the opacity. */
      transform: scale(0.6);
      transition: opacity var(--md-sys-motion-fast-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .tile.on .check {
      opacity: 1;
      transform: scale(1);
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

    /* disabled: conditions — DELIBERATELY not the shared host treatment.
       Killing pointer events on the host would kill scrolling too, and the
       standing decision is that a running vacuum dims the rooms but the list
       still scrolls. Tiles alone go inert; touches over an inert tile fall
       through to the rail, which is exactly what makes the scroll survive. */
    :host([card-disabled]) .tile {
      opacity: 0.38;
      pointer-events: none;
    }

    :host([card-disabled]) .tile,
    :host([card-disabled]) .check {
      transition: opacity 0.2s ease;
    }
  `,
];
