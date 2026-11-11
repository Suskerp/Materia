/**
 * Pure form <-> config conversions for the schedule editor. Every list the
 * card reads (steps, plan phases, presets, triggers, devices and their
 * actions, window actions) is edited through HA selectors; these functions
 * translate between the config shape the card reads and the flat values an
 * ha-form shows. Keys a form does not know are kept.
 */

/** The editor's purpose choice, as the card reads its config. */
export const schedulePurpose = (config = {}) => {
  if (config.presentation === "moment") return "moment";
  if (config.presentation === "manager" || config.manage_schedules === true || Array.isArray(config.targets)) return "manager";
  return config.presentation === "sheet" ? "sheet" : "inline";
};

/** Switching purpose: keys that only mean "manager" go when leaving it, and a
 * moment card gets its own Scheduler tag so it finds its entries again. */
export const withPurpose = (config, purpose, makeTag) => {
  const next = { ...config, presentation: purpose };
  if (purpose !== "manager") {
    delete next.manage_schedules;
    delete next.targets;
  }
  if (purpose === "moment" && !next.manager_tag) next.manager_tag = makeTag();
  return next;
};

const isEmpty = (value) => value == null || value === "" || (typeof value === "object" && !Object.keys(value).length);

const prune = (obj) => {
  for (const [key, value] of Object.entries(obj)) if (isEmpty(value)) delete obj[key];
  return obj;
};

/** Any stored action (Scheduler shape or HA action) as HA's ui_action value. */
export const uiAction = (action) => {
  if (!action || typeof action !== "object") return undefined;
  if (action.perform_action != null || action.action) return action;
  if (!action.service) return undefined;
  return prune({
    action: "perform-action",
    perform_action: action.service,
    target: action.entity_id ? { entity_id: action.entity_id } : undefined,
    data: action.service_data,
  });
};

const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

/* ---- steps: { name?, offset_minutes, action } ------------------------- */

export const durationFromMinutes = (minutes) => {
  const m = Math.abs(Math.round(Number(minutes) || 0));
  return { hours: Math.floor(m / 60), minutes: m % 60 };
};

export const minutesFromDuration = (d) =>
  !d || typeof d !== "object"
    ? 0
    : Math.round((Number(d.days) || 0) * 1440 + (Number(d.hours) || 0) * 60 + (Number(d.minutes) || 0) + (Number(d.seconds) || 0) / 60);

const stepAction = (step) => uiAction(step?.action ?? (Array.isArray(step?.actions) ? step.actions[0] : step?.actions));

export const stepForm = (step = {}) => {
  const offset = Number(step.offset_minutes ?? step.offset ?? 0) || 0;
  return prune({
    name: step.name ?? step.label,
    action: stepAction(step),
    when: offset < 0 ? "before" : offset > 0 ? "after" : "at",
    offset: offset ? durationFromMinutes(offset) : undefined,
  });
};

export const stepFromForm = (old = {}, form = {}) => {
  const next = { ...old };
  delete next.label;
  delete next.offset;
  if (form.name) next.name = form.name;
  else delete next.name;
  const minutes = form.when === "at" || !form.when ? 0 : minutesFromDuration(form.offset);
  next.offset_minutes = form.when === "before" && minutes ? -minutes : minutes;
  // Only replace the action when it was edited: a legacy step with several
  // `actions` keeps them until someone actually picks a new one.
  if (!same(form.action, stepAction(old))) {
    delete next.actions;
    if (form.action) next.action = form.action;
    else delete next.action;
  }
  return next;
};

/* ---- quick picks: { label, offset: "90m" } | { label, at, days?, weekday? } */

export const offsetDuration = (offset) => {
  const m = /^(\d+(?:\.\d+)?)\s*(m|h|d)$/i.exec(String(offset ?? "").trim());
  if (!m) return undefined;
  const n = parseFloat(m[1]);
  const unit = m[2].toLowerCase();
  if (unit === "d" && Number.isInteger(n)) return { days: n, hours: 0, minutes: 0 };
  const total = Math.round(n * (unit === "d" ? 1440 : unit === "h" ? 60 : 1));
  return { days: Math.floor(total / 1440), hours: Math.floor((total % 1440) / 60), minutes: total % 60 };
};

/** Whole days stay days, so "1d" keeps its same-wall-clock-time meaning. */
export const durationOffset = (d) => {
  const total = minutesFromDuration(d);
  if (total <= 0) return undefined;
  if (total % 1440 === 0) return `${total / 1440}d`;
  if (total % 60 === 0) return `${total / 60}h`;
  return `${total}m`;
};

export const presetDay = (preset = {}) => {
  if (preset.weekday != null) return `w${preset.weekday}`;
  if (preset.days != null && Number(preset.days) === 1) return "tomorrow";
  if (preset.days != null) return `d${Number(preset.days)}`;
  return "next";
};

export const presetForm = (preset = {}) =>
  preset.at != null || preset.offset == null
    ? prune({
        label: preset.label,
        kind: "at",
        at: preset.at ? `${String(preset.at).padStart(5, "0")}:00` : undefined,
        day: presetDay(preset),
        tap_action: preset.tap_action,
      })
    : prune({ label: preset.label, kind: "in", in: offsetDuration(preset.offset), tap_action: preset.tap_action });

export const presetFromForm = (old = {}, form = {}) => {
  const next = { ...old };
  for (const key of ["label", "offset", "at", "days", "weekday", "tap_action"]) delete next[key];
  if (form.label) next.label = form.label;
  if (form.tap_action) next.tap_action = form.tap_action;
  if (form.kind === "in") {
    const offset = durationOffset(form.in);
    if (offset) next.offset = offset;
    return next;
  }
  if (form.at) next.at = String(form.at).slice(0, 5);
  const day = form.day || "next";
  if (day === "tomorrow") next.days = 1;
  else if (/^d\d+$/.test(day)) next.days = Number(day.slice(1));
  else if (/^w[1-7]$/.test(day)) next.weekday = Number(day.slice(1));
  return next;
};

/* ---- triggers: { key?, label, secondary, icon, tap_action } ------------ */

export const triggerForm = (trigger = {}) =>
  prune({
    label: trigger.label ?? trigger.name,
    secondary: trigger.secondary ?? trigger.sub,
    icon: trigger.icon,
    tap_action: trigger.tap_action,
  });

export const triggerFromForm = (old = {}, form = {}) => {
  const next = { ...old };
  for (const key of ["label", "name", "secondary", "sub", "icon", "tap_action"]) delete next[key];
  return prune({ ...next, ...form });
};

/* ---- manager devices: { entity, name, icon, actions: [{ service, label, icon, service_data }] } */

export const targetForm = (target) => (typeof target === "string" ? { entity: target } : { ...(target || {}) });

export const targetFromForm = (old, form = {}) => {
  const next = { ...targetForm(old) };
  for (const key of ["entity", "name", "icon"]) delete next[key];
  return prune({ ...next, ...form });
};

export const targetActionForm = (item) => {
  const action = typeof item === "string" ? { service: item } : item || {};
  return prune({
    label: action.label,
    icon: action.icon,
    action: action.service
      ? prune({ action: "perform-action", perform_action: action.service, data: action.service_data })
      : undefined,
  });
};

/** The device is the target at run time, so a picked target is not stored. */
export const targetActionFromForm = (old, form = {}) => {
  const next = typeof old === "string" ? {} : { ...(old || {}) };
  for (const key of ["label", "icon", "service", "service_data"]) delete next[key];
  const data = { ...(form.action?.data || {}) };
  delete data.entity_id;
  return prune({
    ...next,
    label: form.label,
    icon: form.icon,
    service: form.action?.perform_action ?? form.action?.service,
    service_data: Object.keys(data).length ? data : undefined,
  });
};

/* ---- window start/end actions: a list of actions ---------------------- */

export const actionItemForm = (action) => prune({ action: uiAction(action) });

export const actionItemFromForm = (old, form = {}) => (same(form.action, uiAction(old)) ? old : form.action || {});
