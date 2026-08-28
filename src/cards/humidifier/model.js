const finite = (value) => {
  if (value == null || value === "" || typeof value === "boolean") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

export function humidifierTarget(attributes = {}) {
  return finite(attributes.target_humidity ?? attributes.humidity);
}

export function humidifierRange(attributes = {}, configuredStep) {
  const min = finite(attributes.min_humidity) ?? 0;
  const max = finite(attributes.max_humidity) ?? 100;
  const entityStep = finite(attributes.target_humidity_step);
  const requestedStep = finite(configuredStep);
  const step = requestedStep > 0 ? requestedStep : entityStep > 0 ? entityStep : 1;
  return { min: Math.min(min, max), max: Math.max(min, max), step };
}

export function adjustedHumidity(value, delta, range) {
  const current = finite(value);
  if (current == null) return undefined;
  const { min, max, step } = range;
  const precision = Math.max(0, String(step).split(".")[1]?.length ?? 0);
  const stepped = Math.round((current + delta) / step) * step;
  return Number(Math.min(max, Math.max(min, stepped)).toFixed(precision));
}

export function humidifierModes(attributes = {}) {
  const modes = Array.isArray(attributes.available_modes) ? attributes.available_modes : [];
  return [...new Set(modes.filter((mode) => typeof mode === "string" && mode.trim()))];
}

export function humidifierAction(entity) {
  if (!entity || ["off", "unavailable", "unknown"].includes(entity.state)) return "off";
  return String(entity.attributes?.action || "idle").toLowerCase();
}
