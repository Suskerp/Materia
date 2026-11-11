/**
 * Pure Scheduler-component payload helpers.
 *
 * Keeping date arithmetic and backend shapes outside the Lit component makes
 * them independently testable and prevents the editor UI from becoming the
 * source of truth for Scheduler's API contract.
 */

const pad = (value) => String(value).padStart(2, "0");

export const localMoment = (date) => ({
  date: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
  time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
});

export const addMinutes = (date, minutes) => new Date(date.getTime() + Number(minutes || 0) * 60_000);

/** Resolve a quick-preset offset. Minutes and hours are elapsed durations; a
 * day is a local calendar day, so "1d" remains the same wall-clock time across
 * the 23/25-hour DST transitions. */
export const addPresetOffset = (date, amount, unit) => {
  const n = Number(amount);
  if (!Number.isFinite(n)) return null;
  if (unit === "m") return new Date(date.getTime() + n * 60_000);
  if (unit === "h") return new Date(date.getTime() + n * 3_600_000);
  if (unit === "d") {
    const result = new Date(date);
    const whole = Math.trunc(n);
    result.setDate(result.getDate() + whole);
    // Preserve the existing decimal-offset capability without making the
    // integer calendar portion DST-sensitive.
    if (n !== whole) result.setTime(result.getTime() + (n - whole) * 86_400_000);
    return result;
  }
  return null;
};

export const slug = (value, fallback = "plan") => {
  const result = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 36);
  return result || fallback;
};

export const oneShotMarker = (date) => {
  const moment = localMoment(date);
  return `materia_once_${moment.date.replaceAll("-", "")}_${moment.time.replace(":", "")}`;
};

export const parseOneShotMarker = (tags = []) => {
  const marker = tags.find((tag) => /^materia_once_\d{8}_\d{4}$/.test(String(tag)));
  if (!marker) return null;
  const match = /^materia_once_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})$/.exec(String(marker));
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]));
  return Number.isNaN(date.getTime()) ? null : date;
};

export const planArrivalMarker = (date) => `materia_arrival_${oneShotMarker(date).slice("materia_once_".length)}`;

export const parsePlanArrivalMarker = (tags = []) => parseOneShotMarker(
  tags.map((tag) => String(tag).replace(/^materia_arrival_/, "materia_once_"))
);

const TARGET_KEYS = ["area_id", "device_id", "floor_id", "label_id"];

const asList = (value) => (Array.isArray(value) ? value : value == null || value === "" ? [] : [value]);

/** One configured action (or a list) as Scheduler actions. Accepts both the
 * Scheduler shape ({ service, entity_id, service_data }) and what Home
 * Assistant's own action picker writes ({ action: "perform-action",
 * perform_action, target, data }). Scheduler takes ONE entity_id per action,
 * so a target of several entities becomes several actions with the same
 * service, which Scheduler allows in one timeslot. Area, device, floor and
 * label targets travel in the service data, where Home Assistant accepts them
 * as well. */
export const toSchedulerActions = (action) => {
  if (Array.isArray(action)) return action.flatMap(toSchedulerActions);
  if (!action || typeof action !== "object") return [];
  const haShape = action.perform_action != null || ["perform-action", "call-service"].includes(action.action);
  const service = haShape ? (action.perform_action ?? action.service) : action.service;
  if (!service) return [];
  const data = { ...((haShape ? (action.data ?? action.service_data) : action.service_data) || {}) };
  const target = action.target || {};
  const entities = [...new Set([
    ...asList(action.entity_id),
    ...asList(target.entity_id),
    ...asList(data.entity_id),
  ].map(String))];
  delete data.entity_id;
  for (const key of TARGET_KEYS) if (target[key] != null && data[key] == null) data[key] = target[key];
  const base = { service: String(service), ...(Object.keys(data).length ? { service_data: data } : {}) };
  return entities.length ? entities.map((entity_id) => ({ ...base, entity_id })) : [base];
};

/** True once a one-shot entry's own moment lies more than `graceMs` behind
 * `now`. Scheduler deletes a `repeat_type: single` entry right after it ran;
 * one still present after that missed its moment (Home Assistant was down)
 * and will never run, so it must not read as "scheduled". */
export const isSpentOneShot = (tags = [], now = Date.now(), graceMs = 5 * 60_000) => {
  const when = parseOneShotMarker(tags);
  return !!when && when.getTime() < now - graceMs;
};

export const phaseOffsetMinutes = (phase) => Number(phase?.offset_minutes ?? phase?.offset ?? 0) || 0;

/** "set_hvac_mode" -> "Set hvac mode", for a service HA has no name for. */
export const humanizeService = (service) => {
  const words = String(service || "").split(".").pop().replace(/_/g, " ").trim();
  return words ? words[0].toUpperCase() + words.slice(1) : "";
};

/** A service's display name: HA's translation, then its services.yaml
 *  name, then the humanised id. Never the raw "domain.service". */
export const serviceLabel = (hass, service) => {
  const [domain, name] = String(service || "").split(".");
  const translated = name ? hass?.localize?.(`component.${domain}.services.${name}.name`) : "";
  return translated || hass?.services?.[domain]?.[name]?.name || humanizeService(service);
};

const friendlyName = (hass, entity) => hass?.states?.[entity]?.attributes?.friendly_name || entity;

/** "Living room · Set HVAC mode" (or "Hall +1 · Turn on") for an action
 *  in either shape; "" when there is no service. */
export const actionSummary = (hass, action) => {
  const actions = toSchedulerActions(action ?? []);
  if (!actions.length) return "";
  const entities = actions.map((item) => item.entity_id).filter(Boolean);
  const who = entities.length
    ? `${friendlyName(hass, entities[0])}${entities.length > 1 ? ` +${entities.length - 1}` : ""}`
    : "";
  return [who, serviceLabel(hass, actions[0].service)].filter(Boolean).join(" · ");
};

/* ---- input_datetime helpers ----------------------------------------- */

const pad2 = (n) => String(n).padStart(2, "0");

/** What an input_datetime holds: which parts it has, and the moment (a
 *  time-only helper's time lands on today, for display). Null for a missing
 *  entity; `when` is null while the helper is unknown. */
export const helperMoment = (stateObj, now = new Date()) => {
  if (!stateObj) return null;
  const attrs = stateObj.attributes || {};
  const raw = String(stateObj.state ?? "");
  const date = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
  const time = /(?:^|[ T])(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(raw);
  const hasDate = attrs.has_date ?? !!date;
  const hasTime = attrs.has_time ?? !!time;
  let when = null;
  if (hasDate && date) {
    when = new Date(Number(date[1]), Number(date[2]) - 1, Number(date[3]),
      hasTime && time ? Number(time[1]) : 0, hasTime && time ? Number(time[2]) : 0);
  } else if (!hasDate && hasTime && time) {
    when = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(time[1]), Number(time[2]));
  }
  return { hasDate: !!hasDate, hasTime: !!hasTime, when: when && !Number.isNaN(when.getTime()) ? when : null };
};

/** Whether the helper reads as "set": a date and time still ahead, a date
 *  that is today or later, or any time at all (a time has no past). */
export const helperIsSet = (moment, now = new Date()) => {
  if (!moment?.when) return false;
  if (moment.hasDate && moment.hasTime) return moment.when.getTime() > now.getTime();
  if (moment.hasDate) return moment.when >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return moment.hasTime;
};

/** input_datetime.set_datetime data for a moment, local wall clock. */
export const setDatetimeData = (when, { hasDate = true, hasTime = true } = {}) => {
  const date = `${when.getFullYear()}-${pad2(when.getMonth() + 1)}-${pad2(when.getDate())}`;
  const time = `${pad2(when.getHours())}:${pad2(when.getMinutes())}:00`;
  if (hasDate && hasTime) return { datetime: `${date} ${time}` };
  return hasDate ? { date } : { time };
};

/** Clearing writes a fixed moment far in the past (2000-01-01 00:00): an
 *  input_datetime can't be empty, this reads as passed, and no automation that
 *  triggers on the helper (with any offset) fires from it. A time-only helper
 *  cannot read as passed: null. */
export const clearDatetimeData = ({ hasDate = true, hasTime = true } = {}) => {
  if (!hasDate) return null;
  return setDatetimeData(new Date(2000, 0, 1, 0, 0, 0), { hasDate, hasTime });
};

export const oneShotPayload = ({ name, when, actions, tags = [] }) => {
  if (!(when instanceof Date) || Number.isNaN(when.getTime())) throw new TypeError("A valid execution date is required");
  const normalized = toSchedulerActions(actions || []);
  if (!normalized.length) throw new TypeError("At least one Scheduler action is required");
  const moment = localMoment(when);
  const cleanTags = [...new Set([
    ...tags.filter(Boolean).map(String),
    oneShotMarker(when),
  ])];
  return {
    name,
    weekdays: ["daily"],
    start_date: moment.date,
    end_date: moment.date,
    repeat_type: "single",
    timeslots: [{ start: moment.time, actions: normalized }],
    tags: cleanTags,
  };
};

export const planPayloads = ({ plan, arrival, managerTag, instanceId }) => {
  if (!plan || !Array.isArray(plan.phases) || !plan.phases.length) {
    throw new TypeError("A plan needs at least one phase");
  }
  const planKey = slug(plan.key || plan.name || plan.label);
  const instance = slug(instanceId || `${Date.now()}`, "instance");
  const groupTag = `materia_plan_${planKey}_${instance}`;

  return plan.phases.map((phase, index) => {
    const when = addMinutes(arrival, phaseOffsetMinutes(phase));
    if (when.getTime() <= Date.now()) throw new RangeError("Every plan phase must be in the future");
    const phaseName = phase.name || phase.label || `${index + 1}`;
    return oneShotPayload({
      name: `${plan.name || plan.label || planKey} · ${phaseName}`,
      when,
      actions: phase.actions || (phase.action ? [phase.action] : []),
      tags: [managerTag, groupTag, planArrivalMarker(arrival), `materia_phase_${index + 1}`],
    });
  });
};
