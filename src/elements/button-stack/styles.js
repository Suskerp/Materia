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
    gap: 12px;
    padding: 8px 0;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .stack {
    display: flex;
    flex-direction: column;
    width: 140px;
    border-radius: 999px;
    overflow: hidden;
    background: var(--ha-card-background, var(--card-background-color));
    --_active: var(--materia-active-bg, var(--md-sys-cust-color-device-container, var(--md-sys-color-secondary-container)));
  }

  .segment {
    height: 130px;
    border: none;
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0;
    transition: background-color 0.2s ease, color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .segment:not(:last-child) {
    border-bottom: 1px solid var(--md-sys-color-outline-variant, var(--divider-color, rgba(0, 0, 0, 0.12)));
  }

  /* The divider touching an active segment takes the active color rather than
     staying gray — both the active segment's own bottom edge and the edge of
     the segment directly above it. */
  .segment.active:not(:last-child),
  .segment:not(:last-child):has(+ .segment.active) {
    border-bottom-color: var(--_active);
  }

  .segment ha-icon {
    --mdc-icon-size: 28px;
  }

  .segment .seg-label {
    font-size: 13px;
    font-weight: 500;
  }

  .segment.active {
    background: var(--_active);
    color: var(--materia-active-fg, var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container)));
  }

  .segment:hover {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
  }

  .segment.active:hover {
    filter: brightness(0.97);
  }

  .state {
    font-size: 16px;
    color: var(--secondary-text-color);
  }

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`;
