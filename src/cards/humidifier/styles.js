import { css } from "lit";

export const styles = css`
  ha-card {
    min-height: 220px;
    padding: 16px 20px 18px;
    border-radius: 30px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    color: var(--md-sys-color-on-surface);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--md-sys-motion-default-effects),
      color var(--md-sys-motion-default-effects);
  }

  .header {
    min-height: 48px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header > ha-icon { --mdc-icon-size: 22px; flex: 0 0 auto; }

  .name {
    flex: 1;
    min-width: 0;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    border: 0;
    font: inherit;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible {
    outline: 3px solid var(--md-sys-color-primary);
    outline-offset: 2px;
  }

  .power {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    cursor: pointer;
    background: var(--md-sys-color-surface-container-highest);
    transition:
      border-radius var(--md-sys-motion-default-spatial),
      transform var(--md-sys-motion-fast-spatial),
      background-color var(--md-sys-motion-default-effects);
  }

  .power.on {
    border-radius: 16px;
    background: var(--control-color);
    color: var(--control-on-color);
  }

  .power:active { transform: scale(0.94); border-radius: 12px; }
  .power ha-icon { --mdc-icon-size: 22px; }

  .setpoint {
    min-height: 104px;
    flex: 1;
    display: grid;
    grid-template-columns: minmax(48px, 80px) 1fr minmax(48px, 80px);
    align-items: center;
    gap: 8px;
  }

  .adjust {
    width: min(80px, 100%);
    height: 52px;
    padding: 0;
    border-radius: 999px;
    justify-self: center;
    display: grid;
    place-items: center;
    cursor: pointer;
    background: var(--control-color);
    color: var(--control-on-color);
    transition:
      border-radius var(--md-sys-motion-default-spatial),
      transform var(--md-sys-motion-fast-spatial);
  }

  .adjust:active { transform: scale(0.96); border-radius: 16px; }
  .adjust:disabled { opacity: 0.38; cursor: default; }
  .adjust ha-icon { --mdc-icon-size: 20px; }

  .target {
    min-width: 0;
    font-family: var(--materia-font-display);
    font-size: 68px;
    font-weight: 450;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    user-select: none;
  }

  .target .unit { font-size: 22px; font-weight: 600; line-height: 1; margin-left: 2px; }
  .target.word { font-size: 34px; opacity: 0.78; }

  .status {
    min-height: 22px;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--md-sys-color-on-surface-variant);
  }

  .modes {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 12px 0 2px;
  }
  .modes::-webkit-scrollbar { display: none; }

  .mode {
    min-width: 64px;
    min-height: 48px;
    padding: 0 18px;
    border-radius: 999px;
    flex: 1 0 auto;
    cursor: pointer;
    background: transparent;
    border: 1px solid var(--md-sys-color-outline-variant);
    transition:
      border-radius var(--md-sys-motion-default-spatial),
      transform var(--md-sys-motion-fast-spatial),
      background-color var(--md-sys-motion-default-effects),
      color var(--md-sys-motion-default-effects);
  }

  .mode[aria-pressed="true"] {
    border-radius: 16px;
    border-color: transparent;
    background: var(--control-color);
    color: var(--control-on-color);
    font-weight: 600;
  }
  .mode:active { transform: scale(0.96); border-radius: 12px; }
  .mode:disabled { opacity: 0.38; cursor: default; }

  @media (max-width: 420px) {
    ha-card { padding-inline: 16px; }
    .setpoint { grid-template-columns: 60px 1fr 60px; }
    .target { font-size: 58px; }
  }

  @media (prefers-reduced-motion: reduce) {
    ha-card, .power, .adjust, .mode { transition: none; }
  }
`;
