import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    /* The rail must be able to stretch to whatever slot it sits beside —
       a layout-card grid row, a section cell — so the whole chain is 100%. */
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      height: 100%;
    }

    .rail {
      display: flex;
      flex-direction: column;
      gap: 6px;
      height: 100%;
    }

    .tab {
      flex: 1 1 0;
      /* Standalone (nothing to stretch against) the tabs still need a body. */
      min-height: 84px;
      border: none;
      padding: 10px 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      font-family: inherit;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      /* Quiet filled surface when unselected — the carousel-tile treatment,
         so an unselected tab never reads as disabled. */
      background: var(--md-sys-color-surface-container-high, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent));
      color: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
      border-radius: 16px;
      /* The selected tab grows AND rounds in one gesture, both on the
         expressive spatial spring; colours ride the flat effects curve. */
      transition: flex-grow var(--md-sys-motion-expressive-slow-spatial),
        border-radius var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* Connected-group ends: the rail's outer corners are larger, the same
       seam grammar as the split panels. */
    .tab:first-child {
      border-radius: 28px 28px 16px 16px;
    }

    .tab:last-child {
      border-radius: 16px 16px 28px 28px;
    }

    /* Active = the nav-rail indicator itself: secondary-container pair,
       CornerFull. Growth makes the rail double as a "you are here". */
    .tab.on,
    .tab.on:first-child,
    .tab.on:last-child {
      flex-grow: 1.9;
      border-radius: 999px;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .glyph {
      --mdc-icon-size: 24px;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.02em;
      line-height: 1.2;
    }

    /* M3 state layer */
    .tab::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .tab:hover::before {
      opacity: 0.08;
    }

    .tab:active::before {
      opacity: 0.12;
    }

    @media (prefers-reduced-motion: reduce) {
      .tab,
      .tab::before {
        transition: none;
      }
    }
  `,
];
