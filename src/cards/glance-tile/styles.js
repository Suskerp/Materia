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
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      container-type: inline-size;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: clamp(12px, 6cqi, 15px);
      font-weight: 600;
      opacity: 0.92;
      max-width: 100%;
    }

    .header span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header ha-icon {
      --mdc-icon-size: clamp(14px, 7cqi, 18px);
      flex-shrink: 0;
    }

    /* ---- shape tiles (percent / binary) ---- */
    .shape-tile {
      container-type: inline-size;
      position: relative;
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      max-width: var(--ms-size, 225px);
      margin-inline: auto;
      width: 100%;
    }

    .shape {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .shape-fill {
      fill: var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      transition: fill var(--md-sys-motion-default-effects);
    }

    /* Active binary: the star carries a clear accent tint. */
    .shape-fill.on {
      fill: var(--ms-color, color-mix(in srgb, var(--md-sys-color-primary, #6750a4) 16%, var(--md-sys-color-secondary-container, var(--ha-card-background))));
    }

    /* Always a translucent wash — the level should tint the card, not bury it. */
    .level-fill {
      fill: color-mix(in srgb, var(--ms-accent, var(--md-sys-color-primary, #6750a4)) 30%, transparent);
      transition: d var(--md-sys-motion-default-effects);
    }

    /* Barely-there rotation while the entity is active — ambient "working"
       drift, never a spinner. One lobe-step takes ~19s; you notice it only
       when you look for it. transform-box rotates around the path's center. */
    .spin {
      transform-box: fill-box;
      transform-origin: center;
      animation: ms-spin 150s linear infinite;
    }

    @keyframes ms-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Liquid drift: slide by exactly one wave period (50 units) to loop.
       Slow enough to read as water settling, not a marquee. */
    .level-fill.drift {
      animation: ms-drift 11s linear infinite;
    }

    @keyframes ms-drift {
      to {
        transform: translateX(50px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spin,
      .level-fill.drift {
        animation: none;
      }
    }

    .overlay {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1cqi;
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      text-align: center;
      max-width: 78%;
    }

    .state-icon {
      --mdc-icon-size: clamp(26px, 13cqi, 38px);
    }

    .shape-tile.active .state-icon {
      color: var(--md-sys-color-primary, currentColor);
    }

    .big {
      font-size: clamp(28px, 24cqi, 52px);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.02em;
    }

    .big.small-big {
      font-size: clamp(18px, 11cqi, 30px);
      line-height: 1.2;
    }

    .big .unit {
      font-size: 0.42em;
      font-weight: 600;
      opacity: 0.85;
    }

    .sub {
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
      opacity: 0.85;
    }

    .sub.hint {
      opacity: 0.6;
      max-width: 85%;
      line-height: 1.4;
    }

    /* ---- rect tiles (temperature / power / energy / plain) ---- */
    .rect-tile {
      container-type: inline-size;
      position: relative;
      background: var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      border-radius: 28px;
      padding: clamp(12px, 7cqi, 20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(6px, 4cqi, 14px);
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      aspect-ratio: 1;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      max-width: var(--ms-size, 225px);
      margin-inline: auto;
      width: 100%;
    }

    .rect-tile.clip {
      overflow: hidden;
    }

    .fill-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .rect-tile .overlay {
      max-width: 100%;
    }

    .rect-tile.left {
      align-items: flex-start;
      text-align: left;
      justify-content: space-between;
    }

    .rect-tile.left .header {
      justify-content: flex-start;
    }

    .split-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 10px;
      flex: 1;
      min-height: 0;
    }

    .split-main {
      display: flex;
      flex-direction: column;
      gap: 4px;
      justify-content: flex-end;
    }

    /* Thermometer: a quiet vertical pill track; the fill height and color ARE
       the reading. */
    .thermo {
      position: relative;
      width: clamp(12px, 7cqi, 18px);
      height: 82%;
      min-height: 46px;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      overflow: hidden;
      flex-shrink: 0;
      align-self: center;
    }

    .thermo i {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 999px;
      transition: height var(--md-sys-motion-expressive-default-spatial), background-color var(--md-sys-motion-default-effects);
    }

    /* Power: ascending equalizer bars, lit count = load. */
    .bars {
      display: flex;
      align-items: flex-end;
      gap: clamp(3px, 1.6cqi, 5px);
      height: clamp(38px, 20cqi, 58px);
      flex-shrink: 0;
    }

    .bars i {
      width: clamp(7px, 3.6cqi, 11px);
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .bars i.lit {
      background: var(--ms-accent, var(--md-sys-color-primary, #6750a4));
    }

    .energy-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    .energy-bottom .sub {
      max-width: 62%;
      line-height: 1.35;
    }

    .energy-bottom .glyph {
      --mdc-icon-size: clamp(30px, 14cqi, 44px);
      color: color-mix(in srgb, var(--ms-accent, var(--md-sys-color-primary, #6750a4)) 45%, transparent);
    }
  `,
];
