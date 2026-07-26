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
      container-type: inline-size;
      border-radius: 28px;
      padding: clamp(12px, 5cqi, 24px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(4px, 2cqi, 12px);
    }

    .dial-wrap {
      position: relative;
      width: min(100%, 340px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
    }

    .dial {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      touch-action: none;
      cursor: pointer;
    }

    .track {
      fill: none;
      stroke: var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.08));
      stroke-width: 5;
      stroke-linecap: round;
    }

    .sweep {
      fill: none;
      stroke-width: 5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .current-dot {
      fill: var(--md-sys-color-on-surface-variant);
      opacity: 0.7;
    }

    .current-knob {
      stroke: var(--md-sys-color-surface, #fff);
      stroke-width: 1.4;
    }

    .thumb {
      fill: var(--md-sys-color-surface, #fff);
      stroke-width: 2.5;
    }

    .center {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .mode-label {
      font-size: clamp(14px, 6cqi, 18px);
      font-weight: 500;
      opacity: 0.85;
    }

    .target {
      font-size: clamp(44px, 22cqi, 72px);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.02em;
      display: flex;
      align-items: flex-start;
    }

    .target .deg {
      font-size: 0.38em;
      font-weight: 600;
      margin-top: 0.18em;
      opacity: 0.9;
    }

    .current-label {
      font-size: clamp(12px, 5cqi, 15px);
      font-weight: 500;
      opacity: 0.7;
    }

    .nudge {
      display: flex;
      gap: clamp(16px, 8cqi, 32px);
      margin-top: calc(-1 * clamp(8px, 4cqi, 20px));
    }

    /* M3 Expressive tonal icon buttons: filled containers (no outline) that
       shape-morph round → rounded-square on press. */
    .nudge .round {
      width: clamp(48px, 17cqi, 60px);
      height: clamp(48px, 17cqi, 60px);
      border-radius: 50%;
      border: none;
      /* Follows the active mode's climate palette (container fill, accent
         icon) so the buttons read as part of the dial, not generic chrome. */
      background: var(--th-container, var(--md-sys-color-secondary-container, rgba(0, 0, 0, 0.06)));
      color: var(--th-on-container, var(--md-sys-color-on-secondary-container, var(--primary-text-color)));
      display: grid;
      place-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .nudge .round ha-icon {
      --mdc-icon-size: clamp(22px, 8cqi, 26px);
    }

    .nudge .round:active {
      border-radius: 30%;
      transform: scale(0.94);
      background: color-mix(in srgb, currentColor 12%, var(--th-container, var(--md-sys-color-secondary-container)));
    }

    materia-button-group {
      width: 100%;
      margin-top: clamp(4px, 2cqi, 10px);
    }
  `,
];
