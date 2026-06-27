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
    align-items: center;
    gap: 12px;
    padding: 8px 4px;
  }

  .time {
    font-size: 13px;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    min-width: 38px;
    flex-shrink: 0;
  }
  .time.right {
    text-align: right;
  }

  .bar {
    flex: 1;
    position: relative;
    height: 28px;
    cursor: pointer;
    touch-action: none;
    min-width: 0;
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  .track {
    stroke: var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.3));
    stroke-width: 4;
    stroke-linecap: round;
    fill: none;
  }

  .wave {
    stroke: var(--mp-color, var(--md-sys-color-primary));
    stroke-width: 4;
    stroke-linecap: round;
    fill: none;
  }

  .wave.playing {
    animation: mp-flow 0.9s linear infinite;
  }

  @keyframes mp-flow {
    to {
      transform: translateX(-32px);
    }
  }

  .thumb {
    fill: var(--mp-color, var(--md-sys-color-primary));
  }

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`;
