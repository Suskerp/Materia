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

  /* ---- art size modes (any variant) ---- */

  /* auto: sized in JS by the space the player really has (a swipe slide, a
     view, the viewport), so the header and both button rows stay visible.
     Before the first measurement: the width, capped by --materia-art-max. */
  .art.art-auto {
    width: var(--mm-auto-size, min(100%, var(--materia-art-max, 420px)));
    max-width: 100%;
    transition: width var(--md-sys-motion-default-effects);
  }

  .art.art-fill {
    width: 100%;
    max-width: var(--materia-art-max, none);
  }

  /* ---- variant: player ---- */
  .player {
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: var(--md-sys-color-on-surface, var(--primary-text-color));
  }

  /* A new cover: the old one blurs while the new image loads, then the new one
     sharpens in (background-image cross-fades in Chromium). */
  .art.pl-art {
    transition:
      filter 0.35s ease,
      background-image 0.35s ease;
  }

  .art.pl-art.swapping {
    filter: blur(14px) saturate(1.1);
  }

  @media (prefers-reduced-motion: reduce) {
    .art.pl-art {
      transition: none;
    }
  }

  /* Off: the resting shape animation fills the cover area. */
  .art.pl-art.resting {
    display: grid;
    background-image: none;
  }

  .art.pl-art {
    align-self: center;
    border-radius: 28px;
    overflow: hidden;
    background-color: var(--md-sys-color-surface-container-high, rgba(127, 127, 127, 0.12));
  }

  /* Live radio: the station logo on white, contained. */
  .art.logo {
    background-color: #fff;
    background-size: contain;
  }

  .titlerow {
    display: flex;
    align-items: center;
    gap: 12px;
    /* Keeps its height while a track change briefly empties the titles. */
    min-height: calc(
      var(--mx-player-title-line, 32px) * var(--mx-player-title-lines, 1) + var(--mx-player-sub-line, 24px)
    );
  }

  .titles {
    flex: 1;
    min-width: 0;
  }

  /* Type roles (docs/M3_EXPRESSIVE.md section 4). Phone: title is
     headline-small-emphasized (24/32, 500), the byline body-large (16/24).
     A kiosk scope overrides the custom properties: headline-medium-emphasized
     (28/36, two lines) and title-large (22/28). The title is the card's one
     emphasized style. */
  .pl-title {
    font-size: var(--mx-player-title-size, 24px);
    line-height: var(--mx-player-title-line, 32px);
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--mx-player-title-lines, 1);
    overflow: hidden;
    overflow-wrap: anywhere;
  }

  .pl-sub {
    margin-top: 4px;
    font-size: var(--mx-player-sub-size, 16px);
    line-height: var(--mx-player-sub-line, 24px);
    letter-spacing: var(--mx-player-sub-tracking, 0.5px);
    color: var(--md-sys-color-on-surface-variant, var(--secondary-text-color));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* label-medium (12/16, 500). The kiosk header shows the app instead. */
  .chip {
    flex: none;
    height: 28px;
    padding: 0 12px;
    display: var(--mx-player-app-chip, flex);
    align-items: center;
    border-radius: 8px;
    background: var(--md-sys-color-surface-container-high, rgba(127, 127, 127, 0.12));
    color: var(--md-sys-color-on-surface-variant, var(--secondary-text-color));
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .player.off .art {
    opacity: 0.6;
  }

  .player.off .art.resting {
    opacity: 1;
  }
`];
