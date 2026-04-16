import { css } from "lit";

export const styles = css`
  ha-card {
    background: none;
    box-shadow: none;
    border: none;
    padding: 0;
    height: auto;
  }

  .container {
    position: relative;
    width: 100%;
    min-height: 88px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    min-height: 42px;
    margin: 6px 0 6px 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .icon-container ha-icon {
    --mdc-icon-size: 24px;
    display: flex;
    transition: color 0.2s ease;
  }

  .name-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 8px 0 10px;
    overflow: hidden;
    line-height: 18px;
  }

  .name {
    font-size: 13px;
    font-weight: 600;
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

  .right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 4px;
  }

  .sub-btn {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    cursor: pointer;
    padding: 10px;
  }

  .chevron {
    --mdc-icon-size: 20px;
    opacity: 0.5;
    padding: 10px;
    transition: transform 0.3s ease;
  }

  .chevron.rotated {
    transform: rotate(180deg);
  }

  .collapsible {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
    overflow: hidden;
  }

  .collapsible.expanded {
    grid-template-rows: 1fr;
  }

  .collapsible-inner {
    overflow: hidden;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--room-columns, 2), 1fr);
    gap: 8px;
    padding: 4px 8px 12px;
  }

  .grid-item {
    min-width: 0;
  }
`;
