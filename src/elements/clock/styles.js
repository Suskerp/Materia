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
    max-width: var(--clock-size, 100%);
    aspect-ratio: 1;
    display: block;
    margin: 0 auto;
    font-family: inherit;
  }

  .face {
    fill: var(--clock-face, var(--md-sys-color-surface-container-high, var(--card-background-color, #eee)));
  }

  .num {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
    font-weight: 700;
  }

  .dot {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
  }

  .digital {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 26%, transparent));
    font-weight: 800;
    letter-spacing: -1px;
  }

  .date {
    fill: var(--clock-number, color-mix(in srgb, var(--md-sys-color-primary, #888) 45%, transparent));
    font-weight: 700;
  }

  .second-dot {
    fill: var(--clock-second, var(--md-sys-color-error, #d33));
  }

  .hand {
    stroke-linecap: round;
  }

  .hour {
    stroke: var(--clock-hand, var(--md-sys-color-on-surface, #222));
    stroke-width: var(--clock-hour-w, 5);
  }

  .minute {
    stroke: var(--clock-hand, var(--md-sys-color-on-surface, #222));
    stroke-width: var(--clock-minute-w, 3.5);
  }

  .second {
    stroke: var(--clock-second, var(--md-sys-color-error, #d33));
    stroke-width: var(--clock-second-w, 1.4);
  }

  .pin {
    fill: var(--clock-hand, var(--md-sys-color-on-surface, #222));
  }
`;
