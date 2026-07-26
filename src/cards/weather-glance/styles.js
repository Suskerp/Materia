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
    }

    .glance {
      container-type: inline-size;
      display: flex;
      align-items: center;
      gap: clamp(12px, 3.5cqi, 16px);
      background: var(--wg-bg, var(--ha-card-background, var(--card-background-color)));
      color: var(--wg-fg, var(--md-sys-color-on-surface, var(--primary-text-color)));
      border-radius: 28px; /* match the materia-card family, not a full pill */
      padding: clamp(12px, 3.5cqi, 15px) clamp(16px, 5cqi, 22px);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-default-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    .glance:active {
      transform: scale(0.985);
    }

    .glyph {
      width: clamp(32px, 10cqi, 42px);
      height: clamp(32px, 10cqi, 42px);
      flex-shrink: 0;
    }

    .mid {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .line1 {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: clamp(14px, 4cqi, 16px);
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .line1 ha-icon {
      --mdc-icon-size: clamp(16px, 5cqi, 20px);
      flex-shrink: 0;
    }

    .line2 {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: clamp(12px, 3.6cqi, 14px);
      font-weight: 500;
      opacity: 0.78;
      white-space: nowrap;
      overflow: hidden;
    }

    .m {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .m ha-icon {
      --mdc-icon-size: clamp(14px, 4.5cqi, 17px);
      opacity: 0.85;
    }

    .dot {
      opacity: 0.55;
    }

    /* Quieter numerals — the pill should sit at the same visual volume as
       the materia-card rows around it. */
    .now {
      font-size: clamp(22px, 7cqi, 30px);
      font-weight: 400;
      flex-shrink: 0;
    }

    .chev {
      --mdc-icon-size: clamp(20px, 6cqi, 26px);
      opacity: 0.55;
      flex-shrink: 0;
      margin: 0 -6px 0 -4px;
    }
  `,
];
