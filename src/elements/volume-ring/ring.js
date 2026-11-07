import { html, svg, css } from "lit";
import { MAX_STEPS, volumeSteps, volumeLimit, isMediaOff } from "../../utils/media.js";
import { dialArc } from "../../utils/kinetic-knob.js";

/**
 * The volume ring: a thin 270° arc with the volume number inside, drawn in a
 * 48 px square. Shared by materia-volume-ring, the toolbar's volume button
 * (style: ring) and the media header, so all three read identically.
 */
export function volumeRing(stateObj) {
  const off = isMediaOff(stateObj);
  const v = off ? 0 : volumeSteps(stateObj);
  const limit = volumeLimit(stateObj);
  // r 20 in a 48 box: the 3 px stroke stays inside the 48 px target.
  return html`<svg class="vring" viewBox="0 0 48 48" aria-hidden="true">
    <path class="vring-trk" d=${dialArc(0, limit, 20, 24)}></path>
    ${limit < MAX_STEPS ? svg`<path class="vring-lim" d=${dialArc(limit + 3, MAX_STEPS, 20, 24)}></path>` : ""}
    ${v > 0 ? svg`<path class="vring-lvl" d=${dialArc(0, v, 20, 24)}></path>` : ""}
    <text x="24" y="25" class="vring-num">${off ? "–" : v}</text>
  </svg>`;
}

export const volumeRingStyles = css`
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
  .vring-num {
    fill: currentColor;
    font-size: 14px;
    font-weight: 600;
    text-anchor: middle;
    dominant-baseline: middle;
    font-variant-numeric: tabular-nums;
  }
`;
