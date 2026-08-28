import { css } from "lit";
import { motionTokens } from "../../utils/motion.js";

export const styles = [motionTokens, css`
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
    background-color: var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant, rgba(127, 127, 127, 0.2)));
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .title {
    font-family: var(--materia-font-display, inherit);
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

  /* Editorial treatment — ONLY while actual media plays (off/idle shows the
     device name, which stays quiet). Track = headline (display face, big,
     tight, wraps to two lines); artist = letter-spaced kicker byline. */
  .wrap.editorial .title {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.18;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    transition: font-weight var(--md-sys-motion-default-effects);
  }

  /* C-morph: a typographic BEAT as a new track starts, then settle. */
  .wrap.editorial.beat .title {
    font-weight: 800;
  }

  /* Paused music relaxes its voice. */
  .wrap.editorial.paused .title {
    font-weight: 550;
  }

  @media (prefers-reduced-motion: reduce) {
    .wrap.editorial .title {
      transition: none;
    }
  }

  .wrap.editorial .subtitle {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    margin-top: 2px;
    opacity: 0.8;
  }

  .wrap.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
