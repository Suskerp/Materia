/* Pure helpers for materia-power-menu and materia-media-source (no Lit, no DOM): node-testable. */
import { isMediaOff } from "../../utils/media.js";

/** Popover width (px) of the header menus. */
export const MENU_WIDTH = 248;

/** `entities` (ids or { entity, name }) as zones, else the fallback entity alone. */
export function powerZones(entities, fallback) {
  const list = (Array.isArray(entities) ? entities : [])
    .map((p) => (typeof p === "string" ? { entity: p } : p))
    .filter((p) => p?.entity);
  return list.length ? list : fallback ? [{ entity: fallback }] : [];
}

/** True while any zone is on. */
export function anyZoneOn(zones, states) {
  return zones.some((z) => !isMediaOff(states?.[z.entity]));
}

/** "All off" (anyOn) switches the zones that are on; "all on" the ones that are off. */
export function allPowerTargets(zones, states, anyOn) {
  return zones.filter((z) => isMediaOff(states?.[z.entity]) === !anyOn).map((z) => z.entity);
}

/**
 * Viewport position of a menu under a button rect: 8 px below it, its end
 * edge on the button's end (`align: "start"`: its start edge on the
 * button's start), kept 8 px inside the viewport.
 */
export function menuPlacement(rect, viewportWidth, width = MENU_WIDTH, align = "end") {
  const want = align === "start" ? rect.left : rect.right - width;
  return { top: rect.bottom + 8, left: Math.max(8, Math.min(want, viewportWidth - width - 8)), width };
}

/** The player's source_list, or an empty list. */
export function sourceList(stateObj) {
  const list = stateObj?.attributes?.source_list;
  return Array.isArray(list) ? list : [];
}

/** cycle (default) | menu */
export function sourceMode(config) {
  return config?.mode === "menu" ? "menu" : "cycle";
}

/** Class list of a header button; `seg` ("first", "last", "first last" or "") marks a connected-pair member. */
export function segClass(base, seg) {
  return seg == null ? base : `${base} seg ${seg}`;
}
