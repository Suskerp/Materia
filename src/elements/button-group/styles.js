import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";

export const PRESETS = {
  primary:        { active: "var(--md-sys-color-primary)",                          onActive: "var(--md-sys-color-on-primary)" },
  secondary:      { active: "var(--md-sys-color-secondary)",                        onActive: "var(--md-sys-color-on-secondary)" },
  tertiary:       { active: "var(--md-sys-color-tertiary)",                         onActive: "var(--md-sys-color-on-tertiary)" },
  "climate-heat": { active: "var(--md-sys-cust-color-climate-heat-container)",      onActive: "var(--md-sys-cust-color-on-climate-heat)" },
  "climate-cool": { active: "var(--md-sys-cust-color-climate-cool-container)",      onActive: "var(--md-sys-cust-color-on-climate-cool)" },
  "climate-auto": { active: "var(--md-sys-cust-color-climate-auto-container)",      onActive: "var(--md-sys-cust-color-on-climate-auto)" },
  light:          { active: "var(--md-sys-cust-color-light-container)",             onActive: "var(--md-sys-cust-color-on-light)" },
  device:         { active: "var(--md-sys-cust-color-device-container)",            onActive: "var(--md-sys-cust-color-on-device)" },
};

export const SIZES = {
  xs: { height: 32, innerCorner: 4 },
  s:  { height: 36, innerCorner: 8 },
  m:  { height: 40, innerCorner: 8 },
  l:  { height: 48, innerCorner: 16 },
  xl: { height: 56, innerCorner: 20 },
};

export const styles = [
  hostStyles,
  haCardReset,
  css`
    .group {
      display: flex;
      gap: 2px;
      width: 100%;
      border-radius: 999px;
      overflow: hidden;
      background: transparent;
      box-sizing: border-box;
    }

    button {
      flex: 1;
      border: none;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 16px;
      transition: background-color 0.2s ease, color 0.2s ease;
      font-family: inherit;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
    }

    button::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }

    button:hover::before {
      opacity: 0.08;
    }

    button:active::before {
      opacity: 0.12;
    }

    button.inactive.filled {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
    }

    button.inactive.tonal {
      background: var(--md-sys-color-secondary-container, var(--ha-card-background));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    }

    button ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }
  `,
];
