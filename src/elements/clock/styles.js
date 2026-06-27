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

  svg {
    width: 100%;
    aspect-ratio: 1;
    display: block;
    font-family: inherit;
  }

  .face {
    fill: var(--clock-face, var(--md-sys-color-surface-container-high, var(--card-background-color, #eee)));
  }

  .num {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
    font-weight: 700;
  }

  .hand {
    stroke-linecap: round;
  }

  .hour {
    stroke: var(--clock-hand, var(--md-sys-color-on-surface, #222));
    stroke-width: 5;
  }

  .minute {
    stroke: var(--clock-hand, var(--md-sys-color-on-surface, #222));
    stroke-width: 3.5;
  }

  .second {
    stroke: var(--clock-second, var(--md-sys-color-error, #d33));
    stroke-width: 1.4;
  }

  .pin {
    fill: var(--clock-hand, var(--md-sys-color-on-surface, #222));
  }
`;
