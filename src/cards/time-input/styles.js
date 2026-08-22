import { css } from "lit";

export const styles = css`
  .field {
    box-sizing: border-box;
    min-height: 64px;
    width: 100%;
    padding: 0 18px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-radius: 20px;
    background: var(--md-sys-color-surface-container-high, var(--ha-card-background));
    color: var(--md-sys-color-on-surface, var(--primary-text-color));
    cursor: pointer;
    transition: background-color var(--md-sys-motion-fast-effects);
  }

  .field:hover {
    background: var(--md-sys-color-surface-container-highest, var(--ha-card-background));
  }

  .field > span {
    flex: 1;
    min-width: 0;
    font-size: 15px;
    font-weight: 600;
  }

  input {
    min-width: 5.5ch;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--md-sys-color-primary, var(--primary-color));
    font: 700 22px/1.2 var(--materia-font-display, inherit);
    text-align: right;
    color-scheme: light dark;
    cursor: pointer;
  }

  input:focus-visible {
    outline: 2px solid var(--md-sys-color-primary, var(--primary-color));
    outline-offset: 4px;
    border-radius: 4px;
  }

  input::selection {
    background: var(--md-sys-color-primary, var(--primary-color));
    color: var(--md-sys-color-on-primary, #fff);
  }

  input::-webkit-calendar-picker-indicator,
  input::-webkit-inner-spin-button,
  input::-webkit-clear-button {
    display: none;
    -webkit-appearance: none;
  }

  .unavailable {
    opacity: 0.38;
    cursor: default;
  }
`;
