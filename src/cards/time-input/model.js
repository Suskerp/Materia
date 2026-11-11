/* Pure helpers for materia-time-input (no Lit, no DOM): node-testable. */

/** input_datetime state ("YYYY-MM-DD HH:MM:SS", "YYYY-MM-DD" or "HH:MM:SS") → native input value. */
export function inputValue(state, kind) {
  const date = state.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  const time = state.match(/(?:^|\s)(\d{2}:\d{2})(?::\d{2})?$/)?.[1];
  if (kind === "datetime") return date && time ? `${date}T${time}` : "";
  if (kind === "date") return date || "";
  return time || "";
}

/** Native input value → input_datetime.set_datetime data, or null when incomplete. */
export function serviceData(value, kind) {
  if (kind === "datetime") {
    const m = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(value || "");
    return m ? { datetime: `${m[1]} ${m[2]}:00` } : null;
  }
  if (kind === "date") return /^\d{4}-\d{2}-\d{2}$/.test(value || "") ? { date: value } : null;
  return /^\d{2}:\d{2}$/.test(value || "") ? { time: `${value}:00` } : null;
}
