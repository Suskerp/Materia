import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    :host {
      --at-surface: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    }
    .urgent {
      --mix: 65%;
      --c: var(--md-sys-cust-color-error-container, var(--md-sys-color-error-container, #ffdad6));
      --on-c: var(--md-sys-cust-color-on-error-container, var(--md-sys-color-on-error-container, #410002));
      --b: var(--md-sys-color-error, #ba1a1a);
      --on-b: var(--md-sys-color-on-error, #fff);
    }
    .warning {
      --c: var(--md-sys-cust-color-warning-container, #feefca);
      --on-c: var(--md-sys-cust-color-on-warning-container, #745d00);
      --b: var(--md-sys-cust-color-warning, #d9a000);
      --on-b: var(--md-sys-cust-color-on-warning, #4a3a00);
    }
    .info {
      --c: var(--md-sys-color-surface-container-high, rgba(127, 127, 127, 0.16));
      --on-c: var(--md-sys-color-on-surface, var(--primary-text-color));
      --b: var(--md-sys-color-secondary-container, rgba(127, 127, 127, 0.3));
      --on-b: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    }

    .pages {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      cursor: grab;
    }
    .pages::-webkit-scrollbar {
      display: none;
    }
    .item {
      --row: color-mix(in srgb, var(--c) var(--mix, 50%), var(--at-surface));
      flex: none;
      width: 86%;
      min-height: 64px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 28px;
      background: var(--row);
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      scroll-snap-align: start;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .item.only {
      width: 100%;
    }
    .badge {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--b);
      color: var(--on-b);
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      max-width: 100%;
    }
    .name {
      font-size: 18px;
      line-height: 24px;
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
    .acts {
      display: flex;
      gap: 8px;
    }
    .acts:empty {
      display: none;
    }
    .act {
      height: 40px;
      padding: 0 18px;
      border: 0;
      border-radius: 20px;
      background: var(--b);
      color: var(--on-b);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial, 200ms);
    }
    .act:active {
      border-radius: 12px;
    }
    .act.later {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #fff) 10%, transparent);
      color: inherit;
    }
    .dots {
      display: flex;
      justify-content: center;
      gap: 6px;
      padding-top: 10px;
    }
    .pip {
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background: var(--b);
      opacity: 0.6;
      transition: width var(--md-sys-motion-expressive-fast-spatial, 200ms);
    }
    .pip.on {
      width: 18px;
      opacity: 1;
    }
    .empty {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 28px;
      background: var(--at-surface);
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      opacity: 0.8;
    }
  `,
];
