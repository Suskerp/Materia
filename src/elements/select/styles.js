import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";

export const styles = [
  hostStyles,
  css`
    ha-card {
      border-radius: var(--ha-card-border-radius, 18px);
      padding: 12px 16px;
      font-family: inherit;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    ha-icon {
      --mdc-icon-size: 24px;
      color: var(--md-sys-color-on-surface-variant);
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      min-width: 0;
    }

    .name {
      font-size: 14px;
      font-weight: 500;
    }

    .current-option {
      font-size: 12px;
      opacity: 0.7;
    }

    select {
      background: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
      border: 1px solid var(--md-sys-color-outline);
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 14px;
      font-family: inherit;
      cursor: pointer;
      max-width: 50%;
    }

    select:focus {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: -1px;
    }
  `,
];
