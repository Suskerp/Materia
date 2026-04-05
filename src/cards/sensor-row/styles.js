import { css } from "lit";

export const styles = css`
  ha-card.clickable {
    cursor: pointer;
  }

  .container {
    position: relative;
    width: 100%;
    min-height: 50px;
    background-color: var(--ha-card-background, var(--card-background-color));
    border-radius: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: var(--row-padding, 0px 20px);
  }

  .name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .value {
    font-size: 13px;
    font-weight: 400;
    white-space: nowrap;
    flex-shrink: 0;
    margin-left: 16px;
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
