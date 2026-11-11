import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    /* Colour ROLES, never raw mixes: error for urgent, Materia's custom
       warning role for soon, surface roles for info. Each level sets a
       container (the row), its text, a badge and the badge's glyph, so it is
       legible in light and dark alike. */
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

    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .item,
    .summary {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 64px;
      box-sizing: border-box;
      padding: 10px 12px 10px 10px;
      border: 0;
      border-radius: 28px;
      /* The row is the level's container softened toward the card, as in the
         design: a tint you can live with on a home screen. Badge and button
         keep the full-strength role. */
      --row: color-mix(in srgb, var(--c) var(--mix, 50%), var(--at-surface));
      background: var(--row);
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      font: inherit;
      text-align: start;
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
      background: var(--b);
      color: var(--on-b);
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
    .act:active,
    .summary:active {
      border-radius: 12px;
    }

    .stack {
      flex: none;
      display: flex;
      padding-inline-end: 4px;
    }
    .dot {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--b);
      color: var(--on-b);
      box-shadow: 0 0 0 2px var(--ring);
      --mdc-icon-size: 20px;
    }
    .summary {
      --ring: var(--row);
    }
    .dot + .dot {
      margin-inline-start: -10px;
    }
    .dot {
      position: relative;
    }
    .chev {
      flex: none;
      opacity: 0.7;
    }

    .panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 12px 12px;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high, var(--at-surface));
    }
    .phead {
      display: flex;
      align-items: center;
      min-height: 40px;
      padding: 0 4px;
      border: 0;
      background: none;
      color: inherit;
      font: inherit;
      text-align: start;
      cursor: pointer;
    }
    .phead .name {
      flex: 1;
    }
    .panel .item {
      --row: var(--md-sys-color-surface-container-low, var(--at-surface));
    }
    .panel .act {
      background: var(--md-sys-color-surface-container-highest, rgba(127, 127, 127, 0.3));
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .pile {
      position: relative;
      padding-bottom: 14px;
    }
    .peek {
      border: 0;
      padding: 0;
      cursor: pointer;
      position: absolute;
      left: calc(var(--n) * 10px);
      right: calc(var(--n) * 10px);
      bottom: calc(14px - var(--n) * 7px);
      height: 40px;
      border-radius: 0 0 24px 24px;
      background: color-mix(in srgb, var(--c) 35%, var(--at-surface));
      z-index: calc(3 - var(--n));
    }
    .item.top {
      position: relative;
      z-index: 3;
      flex-wrap: wrap;
      padding: 14px;
    }
    .count {
      flex: none;
      border: 0;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 4px 10px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #fff) 10%, transparent);
      font-size: 13px;
      font-weight: 600;
    }
    .acts {
      display: flex;
      gap: 8px;
      width: 100%;
    }
    .acts .act {
      flex: 1;
      height: 44px;
    }
    .act.later {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #fff) 10%, transparent);
      color: inherit;
    }
    .pages {
      display: flex;
      cursor: grab;
      gap: 8px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .pages::-webkit-scrollbar {
      display: none;
    }
    .page {
      flex: none;
      width: 86%;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      scroll-snap-align: start;
      cursor: pointer;
    }
    .badge.round {
      border-radius: 50%;
    }
    .name.big {
      font-size: 18px;
      line-height: 24px;
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
