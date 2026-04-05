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

// Cards (native Lit)
import "./cards/light-switch.js";
import "./cards/light-dimmer.js";
import "./cards/cover.js";
import "./cards/device.js";
import "./cards/lock.js";
import "./cards/battery-low.js";
import "./cards/room.js";
import "./cards/climate.js";
import "./cards/pill-toggle.js";
import "./cards/sensor-row.js";
import "./cards/weather.js";
import "./cards/sensor-display.js";

// Elements (native Lit)
import "./elements/button.js";
import "./elements/segmented-button.js";
import "./elements/icon-button.js";
import "./elements/select-chip.js";
import "./elements/checkbox.js";
import "./elements/circle-action.js";
import "./elements/tonal-button.js";
import "./elements/pill-badge.js";
import "./elements/separator.js";
import "./elements/select.js";

// Inject Figtree font globally
injectFonts();

// Version info
const VERSION = "0.2.0";
console.info(
  `%c MATERIA %c v${VERSION} `,
  "color: white; background: #6750A4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #6750A4; background: #E8DEF8; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;"
);
