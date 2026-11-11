import { DAYS, clone, applyPreset } from './model.js';

/** A household plan copies daily patterns; it never changes group membership. */
export function homePlanWeeks(current, entries, destinations) {
  if (!destinations.length || destinations.some(day => !Number.isInteger(day) || day < 0 || day > 6)) throw new Error('Choose at least one valid day');
  if (!entries.length || new Set(entries.map(entry => entry.schedule)).size !== entries.length) throw new Error('Invalid plan targets');
  return Object.fromEntries(entries.map(entry => {
    if (!current[entry.schedule] || !entry.week) throw new Error('Schedule unavailable: ' + entry.schedule);
    let week = clone(current[entry.schedule]);
    for (const day of new Set(destinations)) week = applyPreset(week, entry.week, day, 'day', entry.source_day);
    return [entry.schedule, week];
  }));
}

/** Native helpers have no multi-object transaction; compensate failed writes. */
export async function saveScheduleBatch(callWS, updates, originals) {
  const attempted = [];
  try {
    for (let index = 0; index < updates.length; index++) {
      attempted.push(index);
      await callWS(updates[index]);
    }
  } catch (cause) {
    const rollbackErrors = [];
    for (const index of attempted.reverse()) {
      try { await callWS(originals[index]); }
      catch (error) { rollbackErrors.push(error); }
    }
    const error = new Error(cause.message || String(cause));
    error.rollbackFailed = rollbackErrors.length > 0;
    throw error;
  }
}
