import { css } from "lit";

export const styles = css`
  :host {
    display: block;
  }

  ha-card {
    background: none;
    border: none;
    box-shadow: none;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 8px;
    cursor: pointer;
  }

  .art {
    width: 100%;
    max-width: var(--mm-art, 240px);
    aspect-ratio: 1;
    border-radius: 18px;
    background-color: var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.2));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: var(--primary-text-color);
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subtitle {
    font-size: 14px;
    text-align: center;
    color: var(--secondary-text-color);
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`;
