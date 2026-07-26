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
      gap: clamp(12px, 4cqi, 20px);
      background: var(--wg-bg, var(--ha-card-background, var(--card-background-color)));
      color: var(--wg-fg, var(--md-sys-color-on-surface, var(--primary-text-color)));
      border-radius: 999px;
      padding: clamp(12px, 4cqi, 18px) clamp(18px, 6cqi, 28px);
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
      width: clamp(40px, 13cqi, 56px);
      height: clamp(40px, 13cqi, 56px);
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
      font-size: clamp(14px, 4.5cqi, 17px);
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
      font-size: clamp(13px, 4cqi, 15px);
      font-weight: 500;
      opacity: 0.85;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .now {
      font-size: clamp(26px, 9cqi, 38px);
      font-weight: 500;
      flex-shrink: 0;
    }
  `,
];
