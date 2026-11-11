/**
 * Pure helpers for the weekly scheduler's screens: what a group is doing now,
 * where a tap on the day bar lands, and whether a whole-home plan is what
 * today already looks like. No Lit, no hass calls, so they are unit-tested.
 */
import { DAYS, minutes, clock, presetDayBlocks } from "./model.js";

export const dayIndex = (date = new Date()) => (date.getDay() + 6) % 7;
export const nowMinutes = (date = new Date()) => date.getHours() * 60 + date.getMinutes();

export const sortedBlocks = (schedule, day) =>
  [...(schedule?.[DAYS[day]] || [])].sort((a, b) => minutes(a.from) - minutes(b.from));

/** Block at `at` minutes, the next one after it, and both indexes. */
export function where(blocks, at) {
  const current = blocks.findIndex((b) => minutes(b.from) <= at && at < minutes(b.to));
  const next = blocks.findIndex((b) => minutes(b.from) > at);
  return { current, next };
}

/**
 * A new period where the day bar was tapped: starts on the half hour under
 * the finger, lasts two hours, and is clipped so it never runs into the next
 * period. null when the tap landed inside an existing period.
 */
export function slotAt(blocks, fraction) {
  const raw = Math.max(0, Math.min(1439, Math.round(fraction * 1440)));
  if (blocks.some((b) => minutes(b.from) <= raw && raw < minutes(b.to))) return null;
  let from = Math.floor(raw / 30) * 30;
  const prevEnd = Math.max(0, ...blocks.filter((b) => minutes(b.to) <= raw).map((b) => minutes(b.to)));
  if (from < prevEnd) from = prevEnd;
  const nextStart = Math.min(1440, ...blocks.filter((b) => minutes(b.from) > raw).map((b) => minutes(b.from)));
  const to = Math.min(from + 120, nextStart);
  if (to - from < 15) return null;
  return { from: hhmm(from), to: hhmm(to) };
}

/** Minutes as HH:MM; 1440 stays "24:00", which HA schedules accept as an end. */
export const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Same periods (times and settings) on both days. */
export function sameDay(a = [], b = []) {
  const key = (list) => JSON.stringify([...list].sort((x, y) => minutes(x.from) - minutes(y.from)).map((x) => [clock(x.from), clock(x.to), x.data || {}]));
  return key(a) === key(b);
}

/** True when every group in the plan already runs that plan's pattern today. */
export function planMatchesDay(plan, lookup, day) {
  const entries = plan?.groups || [];
  if (!entries.length) return false;
  return entries.every((entry) => {
    const target = lookup[entry.schedule], source = lookup[entry.source];
    if (!target || !source) return false;
    return sameDay(target[DAYS[day]] || [], presetDayBlocks(source, entry.source_day));
  });
}

/** CSS left/width of a block on a 24 h bar. */
export const span = (block) => `left:${minutes(block.from) / 14.4}%;width:${(minutes(block.to) - minutes(block.from)) / 14.4}%`;
