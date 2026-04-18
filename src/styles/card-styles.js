import { css } from "lit";

export const haCardReset = css`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    overflow: visible;
  }
`;

export const unavailableStyles = css`
  .container.unavailable,
  ha-card.unavailable,
  .title-row.unavailable,
  .group.unavailable {
    opacity: 0.4;
    pointer-events: none;
    filter: grayscale(80%);
  }
`;

export const hostStyles = css`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
  }
`;

export const rowCardStyles = css`
  .container {
    position: relative;
    width: 100%;
    min-height: 88px;
    background-color: var(--ha-card-background, var(--card-background-color));
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px;
    margin-left: 8px;
    border-radius: 50%;
    background-color: transparent;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
  }

  .name-container {
    display: flex;
    line-height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin: 0 16px 0 4px;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subtitle {
    font-size: 11px;
    font-weight: 500;
    opacity: 0.6;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .state {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.7;
    white-space: nowrap;
  }

  .chevron {
    --mdc-icon-size: 20px;
    opacity: 0.5;
    margin-right: 12px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }
`;

export const fillBarStyles = css`
  .fill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: width 0.3s ease;
    z-index: 0;
    border-radius: 28px 0 0 28px;
  }
`;

export const pillContainerStyles = css`
  .container {
    position: relative;
    width: 100%;
    min-height: 50px;
    background: transparent;
    border-radius: 28px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px;
    margin-left: 8px;
    border-radius: 50%;
    background-color: var(--ha-card-background, var(--card-background-color));
    flex-shrink: 0;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
  }

  .name-container {
    display: flex;
    line-height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin: 0 16px 0 4px;
    overflow: hidden;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }

  .state {
    font-size: 12px;
    font-weight: normal;
    opacity: 0.7;
    white-space: nowrap;
  }
`;

export const m3StateLayer = css`
  button {
    position: relative;
    overflow: hidden;
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
`;
