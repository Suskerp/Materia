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
    .k-cover > *,
    .k-player > *,
    .k-panel-inner > * {
      min-width: 0;
      --ha-card-background: var(--md-sys-color-surface-container, var(--card-background-color));
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0;
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
       Five length-percentage tracks (cover, gap, player, gap, panel) so the
       open/close interpolates; fr tracks would only flip. */
    .kiosk {
      display: grid;
      grid-template-columns: calc(50% - 24px) 48px calc(50% - 24px) 0px 0px;
      align-items: center;
      transition: grid-template-columns var(--md-sys-motion-standard-default-spatial);
    }

    .kiosk.open {
      grid-template-columns: 400px 32px calc(100% - 864px) 32px 400px;
    }

    .k-cover {
      grid-column: 1;
      grid-row: 1;
      width: 100%;
      max-width: 560px;
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
      width: 400px;
      height: 100%;
    }

    .k-panel-inner > * {
      height: 100%;
    }

    @container (max-width: 899px) {
      .kiosk,
      .kiosk.open {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .k-cover {
        max-width: none;
      }

      .k-panel {
        display: none;
      }
    }
  `,
];
