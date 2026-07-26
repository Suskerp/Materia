import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    /* Expressive M3: state is a container TONE, no strokes. */
    ha-card.row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 16px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        opacity var(--md-sys-motion-fast-effects);
    }

    ha-card.row.on {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 7%, var(--ha-card-background, var(--card-background-color)));
    }

    ha-card.row.off {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 3%, var(--ha-card-background, var(--card-background-color)));
      opacity: 0.75;
    }

    /* A colored row (template escalation, e.g. calling for heat) pops its
       radius a notch, like the ladder's calling state did. */
    ha-card.row.colored {
      border-radius: 20px;
      opacity: 1;
    }

    /* Nested inside another card: transparent tones instead of card-on-card. */
    ha-card.row.flat {
      box-shadow: none;
      border: none;
    }

    ha-card.row.flat.on {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 7%, transparent);
    }

    ha-card.row.flat.off {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 3%, transparent);
    }

    ha-card.row.colored[style*="background"] {
      background: none; /* inline style wins; keep the class from fighting it */
    }

    .r-icon {
      --mdc-icon-size: 22px;
      flex-shrink: 0;
    }

    .r-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }

    .r-name {
      font-size: 14px;
      font-weight: 600;
    }

    .r-sub {
      font-size: 12px;
      opacity: 0.75;
    }

    /* M3 switch, per SwitchTokens.kt (scaled from the 52×32 spec track). */
    .m3-switch {
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

    .m3-switch i {
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
    .m3-switch.on {
      background: var(--md-sys-color-primary);
      border-color: transparent;
    }

    .m3-switch.on i {
      left: 19px;
      width: 20px; /* spec 24/32 — the thumb GROWS when selected */
      height: 20px;
      background: var(--md-sys-color-on-primary, #fff);
    }

    /* Pressed: thumb swells toward the spec's 28/32 pressed size. */
    ha-card.row:active .m3-switch i {
      width: 22px;
      height: 22px;
    }

    ha-card.row:active .m3-switch:not(.on) i {
      left: 2px;
    }

    ha-card.row:active .m3-switch.on i {
      left: 16px;
    }
  `,
];
