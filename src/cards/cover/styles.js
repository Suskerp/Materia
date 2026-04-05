import { css } from "lit";

export const styles = css`
  .sub-buttons {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-right: 8px;
    position: relative;
    z-index: 3;
  }

  .sub-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .sub-btn ha-icon {
    --mdc-icon-size: 18px;
  }

  .sub-btn:active {
    opacity: 0.7;
  }

  .range-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: ew-resize;
    z-index: 2;
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }
`;
