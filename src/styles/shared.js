import { css } from "lit";

/**
 * Inject Figtree font into the document head (once).
 */
export function injectFonts() {
  // Home Assistant's own typography is the reliable, privacy-preserving
  // default. Remote display fonts are an explicit visual opt-in because a
  // dashboard must remain complete on an isolated LAN and under a strict CSP.
  if (window.MATERIA_LOAD_REMOTE_FONTS !== true) return;
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
    /* Display voice: Outfit VARIABLE (true wght 100-900 axis) — hero
       numerals & titles via --materia-font-display; the weight axis
       interpolates smoothly, which flavor C's morphs animate. */
    @font-face {
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJuktqUYLkn8BJ.woff2) format('woff2');
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
      font-family: 'Outfit';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtqUYLknw.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* Accent voice: Fraunces italic — ONE personality moment (clock date). */
    @font-face {
      font-family: 'Fraunces';
      font-style: italic;
      font-weight: 500;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7frU9kMz3lR27gVA.woff2) format('woff2');
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
      font-family: 'Fraunces';
      font-style: italic;
      font-weight: 500;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/fraunces/v38/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tc7RrU9kMz3lR24.woff2) format('woff2');
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
