import { css } from "lit";

/**
 * Inject Figtree font into the document head (once).
 */
export function injectFonts() {
  if (document.querySelector("#materia-fonts")) return;
  const style = document.createElement("style");
  style.id = "materia-fonts";
  style.textContent = `
    /* latin-ext */
    @font-face {
      font-family: 'Figtree';
      font-style: italic;
      font-weight: 300 900;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GNAa5o7Cqcs8-2.woff2) format('woff2');
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'Figtree';
      font-style: italic;
      font-weight: 300 900;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xmu-HUzqDCFdgfMm4GND65o7Cqcsw.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* latin-ext */
    @font-face {
      font-family: 'Figtree';
      font-style: normal;
      font-weight: 300 900;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4q9DaRvziissg.woff2) format('woff2');
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'Figtree';
      font-style: normal;
      font-weight: 300 900;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/figtree/v8/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Shared card styles used across all Materia native cards.
 */
export const materiaCardStyles = css`
  :host {
    display: block;
    font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    --materia-border-radius: 18px;
    --materia-card-height: 107px;
  }

  ha-card {
    border-radius: var(--materia-border-radius);
    overflow: hidden;
    font-family: inherit;
  }
`;

/**
 * Helper to load card helpers (for wrapper cards that render other cards).
 */
let _helpers;
export async function loadCardHelpers() {
  if (_helpers) return _helpers;
  _helpers = await window.loadCardHelpers();
  return _helpers;
}

/**
 * Create and configure a child card element.
 */
export async function createCard(config, hass) {
  const helpers = await loadCardHelpers();
  const el = await helpers.createCardElement(config);
  if (hass) el.hass = hass;
  return el;
}
