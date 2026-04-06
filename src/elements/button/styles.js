import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";

export const VARIANT_COLORS = {
  primary:               ["var(--md-sys-color-primary)",                "var(--md-sys-color-on-primary)"],
  secondary:             ["var(--md-sys-color-secondary)",              "var(--md-sys-color-on-secondary)"],
  tertiary:              ["var(--md-sys-color-tertiary)",               "var(--md-sys-color-on-tertiary)"],
  error:                 ["var(--md-sys-color-error)",                  "var(--md-sys-color-on-error)"],
  device:                ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
  "primary-container":   ["var(--md-sys-color-primary-container)",      "var(--md-sys-color-on-primary-container)"],
  "secondary-container": ["var(--md-sys-color-secondary-container)",    "var(--md-sys-color-secondary)"],
  "error-container":     ["var(--md-sys-color-error-container)",        "var(--md-sys-color-error)"],
  "device-container":    ["var(--md-sys-cust-color-device-container)",  "var(--md-sys-cust-color-on-device)"],
};

export const styles = [
  hostStyles,
  css`
    :host {
      display: inline-block;
      margin-bottom: 10px;
    }

    ha-card {
      box-sizing: border-box;
      height: 107px;
      width: 110px;
      border-radius: var(--ha-card-border-radius, 18px);
      overflow: hidden;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      font-family: inherit;
      transition: background-color 0.3s ease, color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card.no-state {
      grid-template-areas: "i" "n";
      grid-template-rows: 1fr min-content;
    }

    ha-card.with-state {
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

    ha-card.no-state .name {
      margin: 10px 10px 14px 6px;
    }

    ha-card.with-state .name {
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

    ha-card.inactive {
      background-color: var(--ha-card-background);
      color: var(--primary-text-color);
    }
  `,
];
