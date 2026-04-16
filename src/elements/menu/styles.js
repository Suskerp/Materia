import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";

export const styles = [hostStyles, haCardReset, unavailableStyles, css`
  :host {
    position: relative;
    z-index: 1;
  }

  ha-card {
    overflow: visible !important;
    height: auto;
  }

  .trigger {
    position: relative;
    width: 100%;
    min-height: 56px;
    background-color: var(--ha-card-background, var(--card-background-color));
    border-radius: 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    z-index: 1;
    transition: border-radius 0.2s ease;
  }

  .trigger.open-below {
    border-radius: 16px 16px 8px 8px;
  }

  .trigger.open-above {
    border-radius: 8px 8px 16px 16px;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px 4px 6px 8px;
    border-radius: 50%;
    background-color: transparent;
    flex-shrink: 0;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
  }

  .text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    line-height: 18px;
    margin: 0 16px 0 4px;
    overflow: hidden;
  }

  .label {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .value {
    font-size: 12px;
    opacity: 0.7;
    white-space: nowrap;
  }

  .chevron-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-right: 4px;
    flex-shrink: 0;
    cursor: pointer;
    border-radius: 50%;
  }

  .chevron {
    --mdc-icon-size: 20px;
    pointer-events: none;
  }

  .dropdown-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 10;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease;
    pointer-events: none;
  }

  .dropdown-wrapper.below {
    top: 100%;
  }

  .dropdown-wrapper.above {
    bottom: 100%;
  }

  .dropdown-wrapper.open {
    max-height: 600px;
    pointer-events: auto;
  }

  .dropdown {
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    padding: 8px;
    margin: 2px 0;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
                0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  }

  .below .dropdown {
    border-radius: 8px 8px 16px 16px;
  }

  .above .dropdown {
    border-radius: 16px 16px 8px 8px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 56px;
    padding: 0 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: var(--primary-text-color);
    position: relative;
    overflow: hidden;
    border-radius: 16px;
  }

  .menu-item::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: currentColor;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .menu-item:hover::before {
    opacity: 0.08;
  }

  .menu-item:active::before {
    opacity: 0.12;
  }

  .menu-item.selected {
    background: var(--md-sys-color-tertiary, var(--md-sys-color-secondary));
    color: var(--md-sys-color-on-tertiary, var(--md-sys-color-on-secondary));
    font-weight: 500;
    border-radius: 12px;
  }

  .menu-item ha-icon {
    --mdc-icon-size: 24px;
    flex-shrink: 0;
  }

  .menu-item .item-text {
    flex: 1;
  }

  .divider {
    height: 1px;
    background: var(--md-sys-color-outline-variant, var(--divider-color, rgba(0, 0, 0, 0.08)));
    margin: 8px 16px;
  }
`];
