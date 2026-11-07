/** Pure layout helpers of materia-art-scope (unit-tested). */

/* ---- kiosk geometry ------------------------------------------------------
   One measurement drives everything: the content-box width of the kiosk
   (ResizeObserver contentRect). Tracks are always five lengths in px —
   cover, gap, player, gap, panel — so open/close interpolates. */

/** Below this content width the kiosk stacks (cover above player). */
export const KIOSK_STACK_BELOW = 600;
/** Closed: cover | player at exactly 50/50 with this gap. */
export const KIOSK_CLOSED_GAP = 48;
/** Open: the player column never gets narrower than this. */
export const KIOSK_PLAYER_MIN = 360;
export const KIOSK_COVER_MIN = 200;
export const KIOSK_COVER_MAX = 400;
export const KIOSK_PANEL_MIN = 320;
export const KIOSK_PANEL_MAX = 400;

const clamp = (min, v, max) => Math.max(min, Math.min(max, v));

/**
 * Kiosk tracks for a content width. Open, the panel takes 32 % (320–400 px),
 * the cover 30 % (200–400 px, shrinking first), and the player keeps at least
 * KIOSK_PLAYER_MIN. `canOpen` is false when even the smallest cover leaves
 * the player too narrow: then buttons open a sheet instead.
 */
export function kioskTracks(width, open) {
  if (!(width >= KIOSK_STACK_BELOW)) return { stacked: true, canOpen: false, columns: null, panel: 0 };
  const half = Math.floor((width - KIOSK_CLOSED_GAP) / 2);
  const closed = `${half}px ${KIOSK_CLOSED_GAP}px ${half}px 0px 0px`;
  const gap = width >= 1200 ? 32 : 24;
  const panel = clamp(KIOSK_PANEL_MIN, Math.round(width * 0.32), KIOSK_PANEL_MAX);
  let cover = clamp(KIOSK_COVER_MIN, Math.round(width * 0.3), KIOSK_COVER_MAX);
  let player = width - panel - cover - 2 * gap;
  if (player < KIOSK_PLAYER_MIN) {
    cover = Math.max(KIOSK_COVER_MIN, width - panel - 2 * gap - KIOSK_PLAYER_MIN);
    player = width - panel - cover - 2 * gap;
  }
  const canOpen = player >= KIOSK_PLAYER_MIN;
  return {
    stacked: false,
    canOpen,
    panel,
    columns: open && canOpen ? `${cover}px ${gap}px ${Math.floor(player)}px ${gap}px ${panel}px` : closed,
  };
}

/**
 * Grid track list for `columns`: a number means that many equal columns, a
 * string is used as grid-template-columns as written.
 */
export function scopeGridColumns(columns) {
  const n = Number(columns);
  if (Number.isInteger(n) && n > 0) return `repeat(${n}, minmax(0, 1fr))`;
  return typeof columns === "string" && columns.trim() ? columns : "repeat(2, minmax(0, 1fr))";
}

/**
 * Card config shown in panel `id`: the button's request, then the scope's
 * override. In place (`inline`), its header shows a back arrow instead of ×.
 */
export function panelCardConfig(requested, panels, id, inline = false) {
  const cfg = { ...requested, ...(panels?.[id] ?? {}), in_panel: true };
  if (inline) cfg.panel_back = true;
  return cfg;
}
