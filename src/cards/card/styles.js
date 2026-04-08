import { css } from "lit";

export const styles = css`
  .container.slider-active {
    touch-action: pan-y pinch-zoom;
  }

  .container.is-dragging {
    touch-action: none;
  }

  .container.is-dragging .fill {
    transition: none !important;
  }

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
`;
