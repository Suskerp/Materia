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

    .tile {
      position: relative;
      background: var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      border-radius: 28px;
      padding: clamp(12px, 7cqi, 20px);
      display: flex;
      flex-direction: column;
      gap: clamp(6px, 4cqi, 10px);
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      box-sizing: border-box;
      max-width: var(--ms-size, 225px);
      margin-inline: auto;
      width: 100%;
      aspect-ratio: 1;
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .tile.active {
      background: color-mix(in srgb, var(--ms-accent, var(--md-sys-color-primary, #6750a4)) 22%, var(--ms-color, var(--ha-card-background, var(--card-background-color))));
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
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
      transition: color var(--md-sys-motion-default-effects);
    }

    .tile.active .header ha-icon {
      color: var(--ms-accent, var(--md-sys-color-primary, #6750a4));
    }

    .body {
      flex: 1;
      display: flex;
      gap: 10px;
      min-height: 0;
    }

    .main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .state {
      flex: 1;
      display: flex;
      align-items: center;
      min-height: 0;
    }

    .state .big {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(18px, 14cqi, 32px);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.01em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .substate {
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
      opacity: 0.75;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-height: 1em;
    }

    /* Same quiet vertical pill track as the glance-tile thermometer, stretched
       to the full body height so it always spans name-to-substate. */
    .thermo {
      position: relative;
      width: clamp(12px, 7cqi, 18px);
      align-self: stretch;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      overflow: hidden;
      flex-shrink: 0;
    }

    .thermo i {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 999px;
      transition: height var(--md-sys-motion-expressive-default-spatial), background-color var(--md-sys-motion-default-effects);
    }
  `,
];
