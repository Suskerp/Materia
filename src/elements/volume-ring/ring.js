import { html, svg, css } from "lit";
import { MAX_STEPS, volumeSteps, volumeLimit, isMediaOff } from "../../utils/media.js";
import { dialArc } from "../../utils/kinetic-knob.js";

/**
 * The volume ring: a thin 270° arc showing the level, with a speaker icon
 * inside (no number), drawn in a 48 px square. Shared by materia-volume-ring
 * and the media header, so both read identically.
 */
export function volumeRing(stateObj) {
  const off = isMediaOff(stateObj);
  const v = off ? 0 : volumeSteps(stateObj);
  const limit = volumeLimit(stateObj);
  // r 20 in a 48 box: the 3 px stroke stays inside the 48 px target.
  const muted = off || !!stateObj?.attributes?.is_volume_muted;
  return html`<span class="vring-box" aria-hidden="true"><svg class="vring" viewBox="0 0 48 48">
    <path class="vring-trk" d=${dialArc(0, limit, 20, 24)}></path>
    ${limit < MAX_STEPS ? svg`<path class="vring-lim" d=${dialArc(limit + 3, MAX_STEPS, 20, 24)}></path>` : ""}
    ${v > 0 ? svg`<path class="vring-lvl" d=${dialArc(0, v, 20, 24)}></path>` : ""}
  </svg><ha-icon class="vring-icon" icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon></span>`;
}

export const volumeRingStyles = css`
  .vring-box {
    position: relative;
    display: block;
    width: 48px;
    height: 48px;
  }
  .vring-icon {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 20px;
    height: 20px;
    --mdc-icon-size: 20px;
    color: var(--md-sys-color-on-surface, var(--primary-text-color));
  }
  .vring {
    width: 48px;
    height: 48px;
    display: block;
    overflow: visible;
  }
  .vring path {
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
  }
  .vring-trk {
    stroke: var(--md-sys-color-outline-variant, rgba(127, 127, 127, 0.4));
  }
  .vring-lim {
    stroke: var(--md-sys-color-error-container, #8c1d18);
  }
  .vring-lvl {
    stroke: currentColor;
  }
`;
