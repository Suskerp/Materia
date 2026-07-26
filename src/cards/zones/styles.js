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
      border-radius: 24px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Nested inside another card (wallet sections etc.): no chrome of our own. */
    ha-card.flat {
      background: transparent;
      box-shadow: none;
      border: none;
      padding: 0;
      border-radius: 0;
    }

    .actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .mini {
      border: 1.5px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.2));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .mini:active {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .zones {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Expressive M3: states are container TONES, no strokes. */
    .zone-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 16px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
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

    /* enabled + satisfied — a clear tonal step above the section */
    .zone-row.idle {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 7%, transparent);
    }

    /* off — the quietest tone, reduced ink */
    .zone-row.off {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 3%, transparent);
      opacity: 0.7;
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

    /* M3 switch, per SwitchTokens.kt (scaled from the 52×32 spec track). */
    .z-switch {
      width: 44px;
      height: 26px;
      border-radius: 999px;
      background: var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.15)));
      border: 2px solid var(--md-sys-color-outline, rgba(0, 0, 0, 0.35));
      position: relative;
      flex-shrink: 0;
      box-sizing: border-box;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects);
    }

    .z-switch i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
      width: 13px; /* spec 16/32 of track height */
      height: 13px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transition:
        left var(--md-sys-motion-expressive-fast-spatial),
        width var(--md-sys-motion-expressive-fast-spatial),
        height var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    /* Selected = the spec pair (SwitchTokens: Primary/OnPrimary). */
    .z-switch.on {
      background: var(--md-sys-color-primary);
      border-color: transparent;
    }

    .z-switch.on i {
      left: 19px;
      width: 20px; /* spec 24/32 — the thumb GROWS when selected */
      height: 20px;
      background: var(--md-sys-color-on-primary, #fff);
    }

    /* Pressed: thumb swells toward the spec's 28/32 pressed size. */
    .zone-row:active .z-switch i {
      width: 22px;
      height: 22px;
    }

    .zone-row:active .z-switch:not(.on) i {
      left: 2px;
    }

    .zone-row:active .z-switch.on i {
      left: 16px;
    }
  `,
];
