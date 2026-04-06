/**
 * Materia — Material You card collection for Home Assistant
 *
 * Entry point: imports all cards and elements, injects fonts,
 * and logs the version to the console.
 */

// Shared
import { injectFonts } from "./styles/shared.js";

// Primitives
import "./primitives/slider.js";

// Cards
import "./cards/card/index.js";
import "./cards/room/index.js";
import "./cards/climate/index.js";
import "./cards/weather/index.js";

// Elements (native Lit)
import "./elements/badge/index.js";
import "./elements/button-group/index.js";
import "./elements/icon-button/index.js";
import "./elements/checkbox/index.js";
import "./elements/pill/index.js";
import "./elements/menu/index.js";

// Inject Figtree font globally
injectFonts();

// Version info
const VERSION = "0.4.0";
console.info(
  `%c MATERIA %c v${VERSION} `,
  "color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
