import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";

export const styles = [hostStyles, haCardReset, unavailableStyles, css`
  .container {
    position: relative;
    width: 100%;
    min-height: 50px;
    background: transparent;
    border-radius: 28px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
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

  /* ---- Large blobby widget ---- */
  ha-card.large {
    background: none;
    border: none;
    box-shadow: none;
    height: 100%;
  }

  .blob {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 0.92;
    box-sizing: border-box;
    container-type: inline-size;
    cursor: pointer;
    overflow: hidden;
    background: var(--wx-bg, var(--md-sys-color-primary-container, var(--card-background-color)));
    color: var(--wx-fg, var(--md-sys-color-on-primary-container, var(--primary-text-color)));
    border-radius: 42% 58% 52% 48% / 55% 45% 55% 45%;
  }

  .big-temp {
    position: absolute;
    top: 15%;
    right: 13%;
    font-size: 30cqi;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .big-wx {
    position: absolute;
    left: 12%;
    bottom: 12%;
    --mdc-icon-size: 34cqi;
    display: flex;
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
