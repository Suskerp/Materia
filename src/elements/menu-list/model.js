/* Pure helpers for materia-menu's list mode and materia-media-source (no Lit, no DOM): node-testable. */
import { isMediaOff } from "../../utils/media.js";

/** Popover width (px) of the header menus. */
export const MENU_WIDTH = 248;

/**
 * A list menu's `items` as rows: an entity id or { entity, name, in_all } is a
 * switch row, { type: "divider" } a separator, { type: "all" } the
 * "All off / All on" row. Without items, the fallback entity alone.
 */
export function menuRows(items, fallback) {
  const rows = (Array.isArray(items) ? items : [])
    .map((p) => (typeof p === "string" ? { entity: p } : p))
    .filter((p) => p && (p.type === "divider" || p.type === "all" || p.entity))
    .map((p) => (p.type === "divider" || p.type === "all" ? { type: p.type } : { ...p, type: "entity" }));
  return rows.length ? rows : fallback ? [{ type: "entity", entity: fallback }] : [];
}

/** The switch rows of a menu. */
export function entityRows(rows) {
  return rows.filter((r) => r.type === "entity");
}

/** The switch rows "All off / All on" switches: all but those with `in_all: false`. */
export function allRows(rows) {
  return entityRows(rows).filter((r) => r.in_all !== false);
}

/** Whether an entity is on: a media player unless off/standby, anything else when "on". */
export function rowOn(entityId, stateObj) {
  if (!stateObj) return false;
  return String(entityId).startsWith("media_player.") ? !isMediaOff(stateObj) : stateObj.state === "on";
}

/** True while any of the rows is on. */
export function anyOn(rows, states) {
  return rows.some((r) => rowOn(r.entity, states?.[r.entity]));
}

/** "All off" (on) switches the rows that are on; "all on" the ones that are off. */
export function allTargets(rows, states, on) {
  return rows.filter((r) => rowOn(r.entity, states?.[r.entity]) === on).map((r) => r.entity);
}

/** The service that switches an entity: media players their own, the rest homeassistant.turn_on/off. */
export function switchService(entityId, on) {
  const domain = String(entityId).startsWith("media_player.") ? "media_player" : "homeassistant";
  return [domain, on ? "turn_on" : "turn_off"];
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
