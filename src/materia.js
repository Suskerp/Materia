/**
 * Materia — Material You card collection for Home Assistant
 *
 * Entry point: imports all cards and elements, injects fonts,
 * and logs the version to the console.
 */

// Shared
import { injectFonts } from "./styles/shared.js";

// Cards (bubble-card wrappers)
import "./cards/light-switch.js";
import "./cards/light-dimmer.js";
import "./cards/cover.js";
import "./cards/device.js";
import "./cards/lock.js";
import "./cards/battery-low.js";
import "./cards/room.js";

// Cards (native Lit)
import "./cards/climate.js";
import "./cards/pill-toggle.js";
import "./cards/sensor-row.js";

// Elements (native Lit, replacing button-card templates)
import "./elements/button.js";
import "./elements/select-chip.js";
import "./elements/checkbox.js";
import "./elements/circle-action.js";
import "./elements/tonal-button.js";
import "./elements/pill-badge.js";

// Inject Figtree font globally
injectFonts();

// Version info
const VERSION = "0.1.0";
console.info(
  `%c MATERIA %c v${VERSION} `,
  "color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
