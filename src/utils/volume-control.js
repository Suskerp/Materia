/**
 * Pure pieces of one zone's volume control (materia-volume): the static dial
 * geometry and the small decisions its imperative renderer makes. The dial
 * physics live in kinetic-knob.js; nothing here touches the DOM.
 */
import { MAX_STEPS } from "./media.js";
import { SWEEP, START } from "./kinetic-knob.js";

/** knob (default) | arc | tap */
export const VOLUME_STYLES = ["knob", "arc", "tap"];

export function volumeStyle(style) {
  return style === "arc" || style === "tap" ? style : "knob";
}

/** Point at radius `r`, angle `deg`, around the dial centre (150, 150). */
export function polar(r, deg) {
  const a = (deg * Math.PI) / 180;
  return [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
}

/** Arc style: 31 ticks over the 270° sweep, every fifth a major one. */
export const DIAL_TICKS = Array.from({ length: 31 }, (_, i) => {
  const major = i % 5 === 0;
  const [x1, y1] = polar(158, START + (SWEEP * i) / 30);
  const [x2, y2] = polar(major ? 172 : 167, START + (SWEEP * i) / 30);
  return { v: (i / 30) * MAX_STEPS, major, x1, y1, x2, y2 };
});

/** Knob style: 60 knurls round the knob, every fifth a major one. */
export const DIAL_KNURL = Array.from({ length: 60 }, (_, i) => {
  const major = i % 5 === 0;
  const [x1, y1] = polar(major ? 108 : 111, i * 6);
  const [x2, y2] = polar(major ? 128 : 125, i * 6);
  return { major, x1, y1, x2, y2 };
});

/** Volume in whole steps, clamped to 0 … limit. */
export function clampVolume(steps, limit) {
  return Math.max(0, Math.min(limit, Math.round(steps)));
}

/**
 * Whether the limit label shows: the arc shows any limit below MAX_STEPS
 * (its track ends there); knob and tap only once the value reaches it.
 */
export function showsLimit(style, value, limit, max = MAX_STEPS) {
  if (!(limit < max)) return false;
  return style === "arc" ? true : Math.round(value) >= limit;
}

/** Tap bar level (0 … 1) over 0 … limit; 0 while the player is off. */
export function barLevel(value, limit, off) {
  return off ? 0 : Math.max(0, Math.min(1, value / limit));
}

/** Knob style: the reported-volume ring's dash length, scaled so the full ring is the usable range. */
export function reportedArc(reported, limit, off) {
  const actual = off ? 0 : Math.min(MAX_STEPS, (reported / limit) * MAX_STEPS);
  return Math.max(actual, 0.001);
}

/** Fraction (0 = bottom, 1 = top) of a vertical bar at `clientY`. */
export function barFraction(clientY, top, height) {
  return Math.max(0, Math.min(1, 1 - (clientY - top) / height));
}

const KEY_STEPS = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 5, PageDown: -5 };

/** Steps a key press moves the volume (0 for other keys). */
export function keyStep(key) {
  return KEY_STEPS[key] ?? 0;
}

/** A zone's label: its own name, else the player's friendly name, else the entity id. */
export function zoneLabel(zone, hass) {
  return zone?.name ?? hass?.states?.[zone?.entity]?.attributes?.friendly_name ?? zone?.entity ?? "";
}
