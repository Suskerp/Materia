import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card.poc {
      display: flex;
      flex-direction: column;
      gap: 8px; /* the ONE menu-style gap separating hero from the stack */
    }

    /* ---- connected stack: 2px seams, 8px inner corners, 24px outers ------- */
    .stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stack > .seg {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 8px;
      padding: 10px 14px;
      box-sizing: border-box;
    }

    .stack > .seg:first-child {
      border-radius: 24px 24px 8px 8px;
    }

    .stack > .seg:last-child {
      border-radius: 8px 8px 24px 24px;
    }

    .stack > .seg:only-child {
      border-radius: 24px;
    }

    .seg materia-button-group {
      display: block;
    }

    /* ---- zone rows: the 3-state ladder ------------------------------------ */
    .zones {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 10px;
    }

    .zone-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 16px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border: 1.5px solid transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects),
        border-radius var(--md-sys-motion-expressive-fast-spatial);
    }

    /* calling for heat — highest emphasis: container fill + accent icon */
    .zone-row.calling {
      background: var(--md-sys-cust-color-climate-heat-container, var(--md-sys-color-primary-container));
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-on-primary-container));
      border-radius: 20px;
    }

    .zone-row.calling .z-icon {
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-primary));
    }

    /* enabled + satisfied — subtle fill, visible outline */
    .zone-row.idle {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 5%, transparent);
      border-color: var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.15));
    }

    /* off — outline only, reduced ink */
    .zone-row.off {
      border-color: var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.15));
      opacity: 0.75;
    }

    .z-icon {
      --mdc-icon-size: 22px;
      flex-shrink: 0;
    }

    .z-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }

    .z-name {
      font-size: 14px;
      font-weight: 600;
    }

    .z-sub {
      font-size: 12px;
      opacity: 0.75;
    }

    /* M3-ish switch visual (display only — row handles the tap) */
    .z-switch {
      width: 44px;
      height: 26px;
      border-radius: 999px;
      background: var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.15));
      border: 1.5px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.2));
      position: relative;
      flex-shrink: 0;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .z-switch i {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transition:
        left var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .z-switch.on {
      background: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-primary));
      border-color: transparent;
    }

    .z-switch.on i {
      left: 21px;
      background: var(--md-sys-color-surface, #fff);
    }

    /* ---- water heater segment -------------------------------------------------- */
    .seg.water {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .seg.water ha-icon {
      --mdc-icon-size: 20px;
      opacity: 0.85;
    }

    .seg.water .chev {
      opacity: 0.5;
    }

    materia-thermostat {
      display: block;
    }
  `,
];
