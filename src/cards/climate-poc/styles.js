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

    /* ---- summary line (variant B) ----------------------------------------- */
    .summary {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      padding: 4px 8px;
      opacity: 0.9;
    }

    .summary ha-icon {
      --mdc-icon-size: 18px;
    }

    .summary.hot {
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-primary));
    }

    .seg.actions {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .mini {
      border: 1.5px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.2));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 18px;
      border-radius: 999px;
      cursor: pointer;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .mini:active {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    /* ---- setpoint segment (variant B) -------------------------------------- */
    .seg.setpoint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
    }

    .sp-text {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .sp-current {
      font-size: 30px;
      font-weight: 500;
    }

    .sp-label {
      font-size: 13px;
      font-weight: 500;
      opacity: 0.75;
    }

    /* ---- steppers (shared) -------------------------------------------------- */
    .steppers {
      display: flex;
      gap: 2px; /* connected-group spec seam */
    }

    .steppers .step {
      width: 52px;
      height: 44px;
      border: none;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      background: var(--md-sys-cust-color-climate-heat-container, var(--md-sys-color-secondary-container));
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-on-secondary-container));
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .steppers .step:first-child {
      border-radius: 999px 8px 8px 999px;
    }

    .steppers .step:last-child {
      border-radius: 8px 999px 999px 8px;
    }

    .steppers .step:active {
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, var(--md-sys-cust-color-climate-heat-container, var(--md-sys-color-secondary-container)));
    }

    /* Vertical connected pair: + on top (up = warmer), − below. Pressing a
       segment expands it downward/upward against its sibling. */
    .steppers.vertical {
      flex-direction: column;
    }

    .steppers.vertical .step {
      width: 56px;
      height: 46px;
    }

    .steppers.vertical .step:first-child {
      border-radius: 999px 999px 8px 8px;
    }

    .steppers.vertical .step:last-child {
      border-radius: 8px 8px 999px 999px;
    }

    .steppers.vertical .step:active {
      border-radius: 999px;
      flex-grow: 1.3;
    }

    /* ---- variant C: vertical slider ----------------------------------------- */
    .sl-hero {
      display: flex;
      align-items: stretch;
      gap: 20px;
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      padding: 20px;
      min-height: 240px;
    }

    .sl-track {
      position: relative;
      width: 64px;
      border-radius: 20px;
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 7%, transparent);
      overflow: visible;
      align-self: stretch;
    }

    .sl-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 20px;
      background: var(--md-sys-cust-color-climate-heat, var(--md-sys-color-primary-container));
      transition: height var(--md-sys-motion-fast-effects);
    }

    .sl-hero.hot .sl-fill {
      background: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-primary));
    }

    .sl-handle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 76px; /* wider than the track — generous invisible hit area */
      height: 28px;
      border: none;
      background: transparent;
      cursor: grab;
      touch-action: none;
      -webkit-tap-highlight-color: transparent;
    }

    .sl-handle::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 52px;
      height: 10px;
      border-radius: 6px;
      background: var(--md-sys-color-on-surface, #333);
    }

    .sl-read {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
    }

    /* Current temp dominant at rest; target takes over while adjusting. */
    .sl-big {
      font-size: 52px;
      font-weight: 500;
      line-height: 1;
    }

    .sl-big.adjust {
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-primary));
    }

    .sl-sub {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.75;
    }

    /* ---- zone chips (variant C) ---------------------------------------------- */
    .chip-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border: 1.5px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.2));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 9px 16px;
      border-radius: 999px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-radius var(--md-sys-motion-expressive-fast-spatial);
    }

    .chip ha-icon {
      --mdc-icon-size: 17px;
    }

    .chip.calling {
      background: var(--md-sys-cust-color-climate-heat-container, var(--md-sys-color-primary-container));
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-on-primary-container));
      border-color: transparent;
      border-radius: 14px; /* selected morphs squarer */
    }

    .chip.idle {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 6%, transparent);
      border-radius: 14px;
    }

    .chip.off {
      opacity: 0.7;
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
