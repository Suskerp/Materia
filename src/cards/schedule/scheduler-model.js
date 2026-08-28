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

export const normalizeSchedulerAction = (action) => {
  if (!action || typeof action !== "object" || !action.service) return null;
  const entityId = action.entity_id ?? action.target?.entity_id;
  return {
    service: String(action.service),
    ...(entityId ? { entity_id: entityId } : {}),
    ...(action.service_data && Object.keys(action.service_data).length
      ? { service_data: action.service_data }
      : {}),
  };
};

export const oneShotPayload = ({ name, when, actions, tags = [] }) => {
  if (!(when instanceof Date) || Number.isNaN(when.getTime())) throw new TypeError("A valid execution date is required");
  const normalized = (actions || []).map(normalizeSchedulerAction).filter(Boolean);
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
    const when = addMinutes(arrival, phase.offset_minutes ?? phase.offset ?? 0);
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
