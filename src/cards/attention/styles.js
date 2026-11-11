import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

/* Levels: the tone fills the badge; the row is a tonal container mixed from
   it (as materia-alerts does), so text stays on-surface in light and dark.
   info has no tone of its own: a neutral row, the badge in surface colours. */
export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    :host {
      --at-urgent: var(--materia-attention-urgent, var(--md-sys-color-error, #e5484d));
      --at-warning: var(--materia-attention-warning, #f2c94c);
      --at-info: var(--md-sys-color-surface-container-highest, rgba(127, 127, 127, 0.3));
      --at-surface: var(--ha-card-background, var(--card-background-color, #1c1c1c));
      --at-on: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .item,
    .summary {
      --tone: var(--at-warning);
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px 10px 10px;
      border: 0;
      border-radius: 28px;
      background: color-mix(in srgb, var(--tone) 20%, var(--at-surface));
      color: var(--at-on);
      font: inherit;
      text-align: start;
    }
    .urgent {
      --tone: var(--at-urgent);
    }
    .info {
      --tone: var(--at-info);
    }
    .item.info,
    .summary.info {
      background: color-mix(in srgb, var(--at-on) 6%, var(--at-surface));
    }

    .main,
    .summary {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .main {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0;
      border: 0;
      background: none;
      color: inherit;
      font: inherit;
      text-align: start;
    }

    .badge {
      flex: none;
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      background: var(--tone);
      color: #1b1b1b;
    }
    .info .badge,
    .dot.info {
      color: var(--at-on);
    }

    .body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 15px;
      line-height: 20px;
      font-weight: 600;
    }
    .detail {
      font-size: 13px;
      line-height: 18px;
      opacity: 0.8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .act {
      flex: none;
      height: 40px;
      padding: 0 16px;
      border: 0;
      border-radius: 20px;
      background: var(--tone);
      color: #1b1b1b;
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial, 200ms);
    }
    .info .act {
      background: var(--md-sys-color-secondary-container, rgba(127, 127, 127, 0.3));
      color: var(--md-sys-color-on-secondary-container, var(--at-on));
    }
    .act:active,
    .summary:active {
      border-radius: 12px;
    }
    .list .act {
      background: color-mix(in srgb, var(--at-on) 10%, transparent);
      color: var(--at-on);
    }

    .stack {
      flex: none;
      display: flex;
      padding-inline-end: 4px;
    }
    .dot {
      --tone: var(--at-warning);
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--tone);
      color: #1b1b1b;
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--at-urgent) 0%, var(--at-surface));
      --mdc-icon-size: 20px;
    }
    .dot.urgent {
      --tone: var(--at-urgent);
    }
    .dot.info {
      --tone: var(--at-info);
    }
    .dot + .dot {
      margin-inline-start: -10px;
    }
    .chev {
      flex: none;
      opacity: 0.7;
    }

    .empty {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 28px;
      background: var(--at-surface);
      color: var(--at-on);
      opacity: 0.8;
    }
  `,
];
