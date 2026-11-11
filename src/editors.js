/**
 * Every visual card editor, as ONE lazy chunk (dist/materia-editors-<hash>.js).
 * Nothing in the main bundle imports this file statically: cards reach it
 * through loadEditors() (src/utils/load-editors.js) in getConfigElement().
 * The editor-only strings register first, so labels translate from the start.
 */
import "./utils/i18n-editor.js";

import "./cards/card/editor.js";
import "./cards/room/editor.js";
import "./cards/climate/editor.js";
import "./cards/humidifier/editor.js";
import "./cards/weather/editor.js";
import "./cards/weather-tile/editor.js";
import "./cards/weather-hero/editor.js";
import "./cards/forecast-daily/editor.js";
import "./cards/forecast-hourly/editor.js";
import "./cards/weather-metric/editor.js";
import "./cards/weather-glance/editor.js";
import "./cards/alerts/editor.js";
import "./cards/attention/editor.js";
import "./cards/list/editor.js";
import "./cards/switch/editor.js";
import "./cards/glance-tile/editor.js";
import "./cards/hero/editor.js";
import "./cards/vacuum-hero/editor.js";
import "./cards/chips/editor.js";
import "./cards/bar-select/editor.js";
import "./cards/carousel/editor.js";
import "./cards/climate-panel/editor.js";
import "./cards/icon-row/editor.js";
import "./cards/lock/editor.js";
import "./cards/schedule/editor.js";
import "./cards/time-input/editor.js";
import "./cards/select-hero/editor.js";
import "./cards/heading/editor.js";
import "./cards/doorbell/editor.js";
import "./cards/tabs/editor.js";
import "./cards/expander/editor.js";
import "./cards/level/editor.js";
import "./cards/alarm/editor.js";
import "./cards/confirm/editor.js";
import "./cards/bars/editor.js";
import "./cards/art-scope/editor.js";
import "./cards/panel-host/editor.js";
import "./cards/stack/editor.js";
import "./cards/media-header/editor.js";
import "./cards/volume/editor.js";
import "./cards/tile-grid/editor.js";
import "./cards/switcher/editor.js";
import "./cards/toggle-chip/editor.js";
import "./elements/badge/editor.js";
import "./elements/button-group/editor.js";
import "./elements/button/editor.js";
import "./elements/checkbox/editor.js";
import "./elements/pill/editor.js";
import "./elements/menu/editor.js";
import "./elements/split-button/editor.js";
import "./elements/media-progress/editor.js";
import "./elements/media/editor.js";
import "./elements/clock/editor.js";
import "./elements/volume-ring/editor.js";
import "./elements/media-source/editor.js";
