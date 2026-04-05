import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";

export const styles = [
  hostStyles,
  css`
    ha-card {
      padding: 0;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      position: relative;
      -webkit-tap-highlight-color: transparent;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    ha-icon {
      --mdc-icon-size: 24px;
    }

    ha-card.size-default { width: 48px; height: 48px; }
    ha-card.size-large   { width: 56px; height: 56px; }

    ha-card.standard {
      background: transparent;
      box-shadow: none;
      border: none;
      color: var(--primary-text-color);
    }

    ha-card.outlined {
      background: transparent;
      box-shadow: none;
      border: 1px solid var(--md-sys-color-outline);
      color: var(--primary-text-color);
    }

    ha-card.filled {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      box-shadow: none;
      border: none;
    }

    ha-card.filled-tonal {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      box-shadow: none;
      border: none;
    }

    ha-card::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    ha-card:hover::before  { opacity: 0.08; }
    ha-card:active::before { opacity: 0.12; }
  `,
];
