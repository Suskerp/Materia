import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const VARIANT_COLORS = {
  primary:               ["var(--md-sys-color-primary)",                "var(--md-sys-color-on-primary)"],
  secondary:             ["var(--md-sys-color-secondary)",              "var(--md-sys-color-on-secondary)"],
  tertiary:              ["var(--md-sys-color-tertiary)",               "var(--md-sys-color-on-tertiary)"],
  error:                 ["var(--md-sys-color-error)",                  "var(--md-sys-color-on-error)"],
  device:                ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
  "primary-container":   ["var(--md-sys-color-primary-container)",      "var(--md-sys-color-on-primary-container)"],
  "secondary-container": ["var(--md-sys-color-secondary-container)",    "var(--md-sys-color-on-secondary-container)"],
  "error-container":     ["var(--md-sys-color-error-container)",        "var(--md-sys-color-on-error-container)"],
  "device-container":    ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
  // State-driven: colored only when entity is active, default bg when inactive.
  "primary-state":       ["var(--md-sys-color-primary)",                "var(--md-sys-color-on-primary)"],
  "secondary-state":     ["var(--md-sys-color-secondary)",              "var(--md-sys-color-on-secondary)"],
  "tertiary-state":      ["var(--md-sys-color-tertiary)",               "var(--md-sys-color-on-tertiary)"],
  "error-state":         ["var(--md-sys-color-error)",                  "var(--md-sys-color-on-error)"],
  "device-state":        ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
};

export const styles = [
  hostStyles,
  motionTokens,
  css`
    :host {
      display: inline-block;
    }

    /* The tile layout is a section card, not a header pill — it must take
       the cell the section grid gives it. */
    :host([tile]) {
      display: block;
      width: 100%;
    }

    .badge {
      box-sizing: border-box;
      position: relative;
      height: 107px;
      width: 110px;
      border-radius: var(--ha-card-border-radius, 18px);
      overflow: hidden;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
    }

    .badge.no-state {
      grid-template-areas: "i" "n";
      grid-template-rows: 1fr min-content;
    }

    .badge.with-state {
      grid-template-areas: "i" "n" "s";
      grid-template-rows: 1fr min-content min-content;
    }

    .icon-cell {
      grid-area: i;
      align-self: start;
      display: flex;
      justify-content: start;
      align-items: start;
      height: 24px;
      padding: 14px 0 0 16px;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 24px;
      width: 24px;
      height: 24px;
    }

    .name {
      grid-area: n;
      justify-self: start;
      padding-left: 10px;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
    }

    .badge.no-state .name {
      margin: 0px 10px 30px 6px;
      align-self: end;
    }

    .badge.with-state .name {
      margin: 10px 10px 0 6px;
    }

    .state {
      grid-area: s;
      justify-self: start;
      margin: 0 0 10px 16px;
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      line-height: 18px;
    }

    /* Gesture tag — the top-right eyebrow. On the header pill it overlays the
       icon row (absolute keeps it out of the grid's auto-placement). */
    .tag {
      position: absolute;
      top: 14px;
      right: 12px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.62;
      pointer-events: none;
    }

    /* Stage track — one equal bar per stage, lit while its condition holds. */
    .stages {
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 8px;
      display: flex;
      gap: 3px;
      height: 4px;
    }

    .stage {
      flex: 1;
      border-radius: 4px;
      background: currentColor;
      opacity: 0.22;
      transition: opacity var(--md-sys-motion-default-effects);
    }

    .stage.lit {
      opacity: 0.6;
    }

    /* Lift the bottom text off the track when one is shown. */
    .badge.has-stages.with-state .state {
      margin-bottom: 18px;
    }

    /* ---- tile layout: the badge grown into a section card ------------- */
    .badge.tile {
      width: 100%;
      height: auto;
      aspect-ratio: 1;
      border-radius: 34px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px;
    }

    .tile-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .badge.tile .icon-cell {
      padding: 0;
      height: auto;
    }

    .badge.tile .icon-cell ha-icon {
      --mdc-icon-size: 34px;
      width: 34px;
      height: 34px;
    }

    .badge.tile .tag {
      position: static;
      font-size: 12px;
    }

    .tile-text {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .badge.tile .name {
      margin: 0;
      padding: 0;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.05;
    }

    .secondary {
      font-size: 14px;
      line-height: 1.35;
      opacity: 0.72;
      text-wrap: pretty;
    }

    .badge.tile .state {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      opacity: 0.85;
    }

    .badge.tile .stages {
      position: static;
      flex: none;
      gap: 4px;
      height: 8px;
      margin-top: 12px;
    }

    .badge.inactive {
      background-color: var(--ha-card-background);
      color: var(--primary-text-color);
    }

    .badge.unavailable {
      opacity: 0.4;
      pointer-events: none;
      filter: grayscale(80%);
    }
  `,
];
