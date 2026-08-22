import { css } from "lit";

export const styles = css`
  /* Artwork in the icon slot. Sized to fill .icon-container's own 42px
     footprint exactly (see rowCardStyles) so a row that switches between icon
     and thumbnail never changes height — it's a same-box swap, not a layout
     change. The surface-tint background-color is the same "nothing decoded
     yet" placeholder materia-media uses for its art tile. */
  .thumb {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.2)));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex-shrink: 0;
  }

  .container.slider-active {
    touch-action: pan-y pinch-zoom;
    overscroll-behavior: contain;
    -webkit-user-select: none;
    user-select: none;
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
    gap: 2px;
    margin-right: 8px;
    position: relative;
    z-index: 3;
  }

  .sub-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: currentColor;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: background-color 0.15s ease;
  }

  .sub-btn ha-icon {
    --mdc-icon-size: 20px;
    display: flex;
  }

  .sub-btn:hover {
    background: color-mix(in srgb, currentColor 8%, transparent);
  }

  .sub-btn:active {
    background: color-mix(in srgb, currentColor 14%, transparent);
  }
`;
