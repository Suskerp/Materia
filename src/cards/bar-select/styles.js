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
      container-type: inline-size;
    }

    .tile {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      padding: 14px 16px;
      display: flex;
      align-items: flex-end;
      gap: 13px;
      box-sizing: border-box;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      width: clamp(66px, 23cqi, 86px);
      flex-shrink: 0;
    }

    .label {
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.65;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .value {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(16px, 5.6cqi, 20px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.25;
    }

    /* The "off" choice — a round button, because off isn't a rung. */
    .off {
      width: 46px;
      height: 46px;
      flex: none;
      border: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-family: inherit;
      color: inherit;
      background: color-mix(in srgb, currentColor 10%, transparent);
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .off ha-icon {
      --mdc-icon-size: 21px;
      opacity: 0.55;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .off.on {
      background: var(--bs-accent);
      color: var(--bs-accent-on);
    }

    .off.on ha-icon {
      opacity: 1;
    }

    .bars {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: clamp(40px, 15cqi, 54px);
      min-width: 0;
    }

    .bar {
      flex: 1;
      min-width: 0;
      border: none;
      padding: 0;
      border-radius: 9px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      background: color-mix(in srgb, currentColor 12%, transparent);
      /* Height changes ride the springy spatial curve; color is a flat fade. */
      transition: background-color var(--md-sys-motion-fast-effects),
        height var(--md-sys-motion-expressive-default-spatial);
    }

    .bar.lit {
      background: var(--bs-accent);
    }

    /* M3 state layer on both control types */
    .off::before,
    .bar::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .bar {
      position: relative;
      overflow: hidden;
    }

    .off:hover::before,
    .bar:hover::before {
      opacity: 0.08;
    }

    .off:active::before,
    .bar:active::before {
      opacity: 0.12;
    }

    @media (prefers-reduced-motion: reduce) {
      .bar,
      .off {
        transition: none;
      }
    }
  `,
];
