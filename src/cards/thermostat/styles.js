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
      /* The svg itself is inert — only the hit-ring interacts, so swipes and
         scrolls starting over the card body pass through (swipe-card etc). */
      pointer-events: none;
    }

    .hit-ring {
      fill: none;
      stroke: transparent;
      stroke-width: 16;
      stroke-linecap: round;
      pointer-events: stroke;
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

    /* Handle: a SOLID accent circle with the cookie as negative space inside
       (two layers — not a ring around a disc around a cookie). */
    .thumb {
      stroke: none;
    }

    .thumb-cookie {
      fill: var(--md-sys-color-surface, #fff);
    }

    /* Off: setpoint still visible, just quiet. */
    .thumb.muted {
      fill: var(--md-sys-color-on-surface-variant, #888);
      opacity: 0.8;
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
      gap: 3px;
      margin-top: calc(-1 * clamp(8px, 4cqi, 20px));
    }

    /* Side-mounted vertical pair: + on top (up = warmer), anchored to the
       dial's right edge at its vertical center — thumb-zone friendly. */
    .nudge.vertical {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      flex-direction: column;
      margin: 0;
      width: auto;
    }

    .nudge.vertical .seg {
      width: clamp(44px, 15cqi, 54px);
      height: clamp(44px, 15cqi, 52px);
    }

    .nudge.vertical .seg.plus {
      border-radius: 999px 999px 8px 8px;
    }

    .nudge.vertical .seg.minus {
      border-radius: 8px 8px 999px 999px;
    }

    .nudge.vertical .seg:active {
      border-radius: 999px;
      flex-grow: 1.3;
    }

    /* M3 Expressive connected pair: outer corners pill, inner corners small
       (the connected-group silhouette). Pressing a segment EXPANDS it while
       its neighbor compresses (animated flex-grow) and its shape morphs to a
       full pill — the signature expressive button-group interaction. Colors
       follow the active mode's climate palette. */
    .nudge {
      width: min(72%, 280px);
    }

    .nudge .seg {
      flex: 1 1 0;
      height: clamp(48px, 16cqi, 58px);
      border: none;
      background: var(--th-container, var(--md-sys-color-secondary-container, rgba(0, 0, 0, 0.06)));
      color: var(--th-on-container, var(--md-sys-color-on-secondary-container, var(--primary-text-color)));
      display: grid;
      place-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .nudge .seg.minus {
      border-radius: 999px 10px 10px 999px;
    }

    .nudge .seg.plus {
      border-radius: 10px 999px 999px 10px;
    }

    .nudge .seg ha-icon {
      --mdc-icon-size: clamp(22px, 8cqi, 26px);
    }

    .nudge .seg:active {
      flex-grow: 1.5;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, var(--th-container, var(--md-sys-color-secondary-container)));
    }

    materia-button-group {
      width: 100%;
      margin-top: clamp(4px, 2cqi, 10px);
    }
  `,
];
