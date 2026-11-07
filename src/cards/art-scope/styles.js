import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  motionTokens,
  css`
    ha-card {
      border: none;
      border-radius: var(--ha-card-border-radius, 28px);
      box-shadow: var(--ha-card-box-shadow, none);
      background: var(--md-sys-color-surface-container-low, var(--ha-card-background, var(--card-background-color)));
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      container-type: inline-size;
      box-sizing: border-box;
      transition: background-color var(--md-sys-motion-slow-effects);
    }

    ha-card.bare {
      background: transparent;
    }

    /* Children sit on the scope's surface: give their cards the next rung. */
    .children > *,
    .inline-panel > *,
    .k-cover > *,
    .k-player > *,
    .k-panel-inner > * {
      min-width: 0;
      --ha-card-background: var(--md-sys-color-surface-container, var(--card-background-color));
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0;
    }

    /* !important: .children.stack/.row/.grid set display at the same specificity. */
    .children[hidden] {
      display: none !important;
    }

    /* In place: a subview of the same card, exactly as tall as the player was. */
    .inline-panel {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      animation: inline-in var(--md-sys-motion-expressive-default-spatial, 0.35s ease) both;
    }

    .inline-panel > * {
      flex: 1;
      min-height: 0;
      /* Same card: no card-in-card surface or padding of its own. */
      --ha-card-background: transparent;
    }

    @keyframes inline-in {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
    }

    .children.stack {
      display: flex;
      flex-direction: column;
    }

    .children.row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .children.row > * {
      flex: 1 1 240px;
    }

    .children.grid {
      display: grid;
      align-items: center;
    }

    @container (max-width: 599px) {
      .children.grid,
      .children.row {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
    }


    /* ---- kiosk: cover | player, plus a side panel ----
       The JS measures the kiosk's content box once (ResizeObserver) and sets
       grid-template-columns as five px tracks (cover, gap, player, gap,
       panel); px to px interpolates, so open/close animates. */
    ha-card.fill {
      /* Measured in JS (--k-fill-px: visible viewport height minus the
         scope's top), so it is right with HA's header shown or hidden by a
         kiosk mode. Before the first measurement: 100dvh minus the header. */
      --k-avail: calc(
        var(--k-fill-px, calc(100dvh - var(--header-height, 56px) - env(safe-area-inset-top, 0px)))
          - env(safe-area-inset-bottom, 0px)
      );
      min-height: var(--k-avail);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .kiosk {
      display: grid;
      grid-template-columns: 1fr 0px 1fr 0px 0px;
      grid-template-rows: minmax(0, 1fr);
      align-items: center;
      flex: 1 1 auto;
      transition: grid-template-columns var(--md-sys-motion-standard-default-spatial);
    }

    .k-cover {
      grid-column: 1;
      grid-row: 1;
      /* A square that fits both its column and the available height. */
      width: min(100%, 560px, calc(var(--k-avail, 100vh) - 2 * var(--k-pad, 0px)));
      justify-self: center;
    }

    .k-player {
      grid-column: 3;
      grid-row: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .k-panel {
      grid-column: 5;
      grid-row: 1;
      align-self: stretch;
      overflow: hidden;
      min-width: 0;
    }

    /* Fixed width, so the panel is revealed rather than squeezed. */
    .k-panel-inner {
      width: var(--k-panel, 400px);
      height: 100%;
    }

    .k-panel-inner > * {
      height: 100%;
    }

    /* Kiosk type: headline-medium-emphasized title on two lines, a
       title-large byline; the header chip names the app, so no app chip. */
    .kiosk {
      --mx-player-title-size: 28px;
      --mx-player-title-line: 36px;
      --mx-player-title-lines: 2;
      --mx-player-sub-size: 22px;
      --mx-player-sub-line: 28px;
      --mx-player-sub-tracking: 0px;
      --mx-player-app-chip: none;
    }

    .kiosk.stacked {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .kiosk.stacked .k-cover {
      width: 100%;
    }

    .kiosk.stacked .k-panel {
      display: none;
    }
  `,
];
