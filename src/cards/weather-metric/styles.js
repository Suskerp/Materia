import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Anchor for the tiles' own container-relative sizing (border-radius,
         padding) — without it those cqi units resolve unpredictably. */
      container-type: inline-size;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: clamp(12px, 6cqi, 15px);
      font-weight: 600;
      opacity: 0.92;
    }

    .header ha-icon {
      --mdc-icon-size: clamp(14px, 7cqi, 18px);
    }

    /* ---- Shape tiles (uv / visibility / pressure) ---- */
    .shape-tile {
      container-type: inline-size;
      position: relative;
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      max-width: var(--wm-size, 225px);
      margin-inline: auto;
      width: 100%;
    }

    .shape {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .shape-fill,
    .shape-fill-c {
      fill: var(--wm-color, var(--ha-card-background, var(--card-background-color)));
    }

    .overlay {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1cqi;
      color: var(--wm-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      text-align: center;
    }

    .big {
      font-size: clamp(28px, 24cqi, 52px);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.02em;
    }

    .big.small-big {
      font-size: clamp(22px, 15cqi, 38px);
    }

    .big .unit {
      font-size: 0.42em;
      font-weight: 600;
      opacity: 0.85;
    }

    .sub {
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
      opacity: 0.85;
    }

    .gauge-track {
      fill: none;
      stroke: color-mix(in srgb, currentColor 14%, transparent);
      stroke-width: 7;
      stroke-linecap: round;
      color: var(--wm-color-on, var(--md-sys-color-on-surface));
    }

    .gauge-fill {
      fill: none;
      stroke: var(--wm-accent, var(--md-sys-color-primary));
      stroke-width: 7;
      stroke-linecap: round;
      transition: d var(--md-sys-motion-default-effects);
    }

    /* Pressure ring: thinner and inset from the circle edge (Pixel style). */
    .gauge-track.thin,
    .gauge-fill.thin {
      stroke-width: 4.5;
    }

    .gauge-fill.green {
      stroke: var(--wm-accent, #7bc96a);
    }

    /* ---- Rect tiles (wind / aqi / precipitation / humidity / sun / pollen) ---- */
    .rect-tile {
      container-type: inline-size;
      position: relative;
      background: var(--wm-color, var(--ha-card-background, var(--card-background-color)));
      border-radius: 28px;
      padding: clamp(12px, 7cqi, 20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(6px, 4cqi, 14px);
      color: var(--wm-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      aspect-ratio: 1;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      max-width: var(--wm-size, 225px);
      margin-inline: auto;
      width: 100%;
    }

    .rect-tile.clip {
      overflow: hidden;
    }

    .rect-tile.pollen {
      aspect-ratio: auto;
      /* Rounded stadium, CAPPED — a full pill's corner circle swallowed the
         outer gauges on narrow cards no matter the padding. 36–64px keeps the
         soft look with corners that never reach the content. */
      border-radius: clamp(36px, 9cqi, 64px);
      padding: clamp(14px, 4cqi, 20px) clamp(22px, 7cqi, 40px) clamp(22px, 6cqi, 30px);
      max-width: calc(var(--wm-size, 225px) * 2 + 16px);
      gap: clamp(4px, 2cqi, 10px);
    }

    .sub.hint {
      opacity: 0.6;
      max-width: 85%;
      line-height: 1.4;
    }

    /* Precipitation: left-aligned value/subtitle, rainy glyph bottom-right. */
    .rect-tile.precip {
      align-items: flex-start;
      text-align: left;
      justify-content: space-between;
    }

    .rect-tile.precip .header {
      justify-content: flex-start;
    }

    .precip-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    .precip-bottom .sub {
      max-width: 62%;
      line-height: 1.35;
    }

    .precip-glyph {
      width: clamp(38px, 16cqi, 54px);
      height: clamp(38px, 16cqi, 54px);
      flex-shrink: 0;
    }

    /* Wind: a ROUND card with the expressive triangle blob tinted inside. */
    .rect-tile.wind {
      border-radius: 50%;
    }

    .blob-bg {
      position: absolute;
      inset: 7%;
      width: 86%;
      height: 86%;
    }

    .blob-fill {
      /* on-surface is near-black in light themes and near-white in dark ones,
         so mixing 15% of it into the container is a guaranteed lightness step
         in BOTH modes — no dependence on optional roles or light-dark()
         support. Override per-card with shape_color. */
      fill: var(--wm-shape, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 15%, var(--md-sys-color-secondary-container, var(--ha-card-background, #e8e8f0))));
    }

    .rect-tile.wind .overlay {
      color: var(--wm-color-on, var(--md-sys-color-on-secondary-container, var(--md-sys-color-on-surface)));
    }

    .rect-tile .overlay {
      position: relative;
    }

    /* AQI bar */
    .aqi-bar {
      position: relative;
      display: flex;
      width: 82%;
      height: 6px;
      border-radius: 3px;
      overflow: visible;
      gap: 1px;
    }

    .aqi-bar span {
      flex: 1;
      height: 100%;
    }

    .aqi-bar span:first-child {
      border-radius: 3px 0 0 3px;
    }

    .aqi-bar span:last-child {
      border-radius: 0 3px 3px 0;
    }

    .aqi-dot {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--wm-color, var(--ha-card-background));
      border: 3px solid;
      box-sizing: border-box;
    }

    /* Humidity wave — the SVG is two tile-widths of repeating wave; drifting
       it left by exactly half its width (a whole number of periods) loops
       seamlessly. Slow and linear so it reads as water, not a marquee. */
    .wave {
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      animation: wave-drift 14s linear infinite;
    }

    @keyframes wave-drift {
      to {
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .wave {
        animation: none;
      }
    }

    .wave-fill {
      fill: color-mix(in srgb, var(--md-sys-cust-color-weather-rain, #5fa8f5) 28%, transparent);
    }

    .dew {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
    }

    .dew-chip {
      display: inline-grid;
      place-items: center;
      min-width: 34px;
      height: 34px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--md-sys-cust-color-weather-rain, #5fa8f5) 35%, var(--ha-card-background));
      font-weight: 700;
      font-size: 13px;
    }

    /* Sun arc — an in-flow band between header and times, so the fill stays
       behind the hump only and the times sit on the plain card background. */
    .rect-tile.sun {
      justify-content: center;
      gap: clamp(6px, 3cqi, 10px);
    }

    .sun-arc {
      /* Wide and FLAT (viewBox 100×38) — fills the card without pushing the
         square tile taller. */
      width: 94%;
      height: auto;
      display: block;
    }

    .arc-fill {
      fill: color-mix(in srgb, var(--md-sys-cust-color-weather-sun, #ffc83d) 26%, transparent);
    }

    .horizon {
      stroke: color-mix(in srgb, currentColor 25%, transparent);
      stroke-width: 0.8;
    }

    .sun-times {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      font-size: clamp(12px, 5cqi, 15px);
      font-weight: 600;
    }

    .sun-times div {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .sun-times ha-icon {
      --mdc-icon-size: 17px;
    }

    /* Pollen gauges — always a single row; the card sorts by severity and
       shows only the top max_shown species. */
    .gauges {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-evenly;
      width: 100%;
      gap: 8px;
      min-width: 0;
    }

    .gauge {
      position: relative;
      width: clamp(72px, 26cqi, 110px);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* viewBox is 100×86 — the 270° arc leaves the bottom band empty, so the
       svg is trimmed to keep the level label snug under the gauge. */
    .gauge svg {
      width: 100%;
      aspect-ratio: 100 / 86;
    }

    /* Pixel layout: ONLY the icon lives inside the ring; species + level sit
       below the gauge. Text never shares space with the ring, so nothing can
       clip or collide at any card width. */
    .gauge-center {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      aspect-ratio: 100 / 86;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gauge-center ha-icon {
      --mdc-icon-size: clamp(20px, 9cqi, 28px);
    }

    .gauge-sub {
      display: flex;
      flex-direction: column;
      gap: 1px;
      font-size: clamp(11px, 4.2cqi, 13px);
      font-weight: 500;
      opacity: 0.85;
      text-align: center;
      line-height: 1.35;
      margin-top: 4px;
      padding-bottom: 2px;
    }

    .gauge-name {
      font-weight: 600;
      font-size: clamp(12px, 4.6cqi, 14px);
      opacity: 1;
    }

    /* Pollen small variant: left-aligned dot + species + level list. */
    .rect-tile.pollen-small {
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      gap: clamp(10px, 6cqi, 18px);
    }

    .rect-tile.pollen-small .header {
      justify-content: flex-start;
    }

    .pollen-rows {
      display: flex;
      flex-direction: column;
      gap: clamp(8px, 4cqi, 14px);
    }

    .pollen-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pollen-dot {
      width: clamp(18px, 9cqi, 26px);
      height: clamp(18px, 9cqi, 26px);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .pollen-text {
      display: flex;
      flex-direction: column;
      line-height: 1.25;
    }

    .pollen-name {
      font-size: clamp(14px, 6.5cqi, 18px);
      font-weight: 600;
    }

    .pollen-level {
      font-size: clamp(12px, 5.5cqi, 15px);
      opacity: 0.7;
    }
  `,
];
