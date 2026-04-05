import { css } from "lit";

export const styles = css`
  ha-card {
    background: var(--ha-card-background, var(--card-background-color));
    border-radius: 18px;
    overflow: hidden;
    padding: 0;
    box-shadow: none;
  }

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .title-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    flex: 1;
  }

  .entity-icon {
    --mdc-icon-size: 24px;
    flex-shrink: 0;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    font-weight: 600;
    font-size: 14px;
    line-height: 1.3;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .state {
    font-size: 12px;
    line-height: 1.3;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .sub-btn {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .sub-btn:hover {
    color: var(--primary-text-color);
  }

  .chevron {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color);
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
    padding: 4px 16px 16px;
  }

  .grid-item {
    min-width: 0;
  }
`;
