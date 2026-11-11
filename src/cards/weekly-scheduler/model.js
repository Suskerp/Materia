export const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export const clock = (time) => String(time ?? "").slice(0, 5);
export const minutes = (time) => {
  const [hour, minute] = String(time).split(":").map(Number);
  return hour * 60 + minute;
};
export const clone = (value) => JSON.parse(JSON.stringify(value));

export function validateBlock(block, others = []) {
  const from = minutes(block.from), to = minutes(block.to);
  if (!Number.isFinite(from) || !Number.isFinite(to) || from < 0 || to > 1440 || from >= to) return "time";
  if (others.some((other) => from < minutes(other.to) && to > minutes(other.from))) return "overlap";
  if (block.data?.materia_actions) return null;
  const temperature = Number(block.data?.temperature);
  if (!Number.isFinite(temperature) || temperature < 5 || temperature > 35) return "temperature";
  return null;
}

export const segmentPlacement = (block) => ({
  left: `${minutes(block.from) / 14.4}%`,
  center: `${(minutes(block.from) + minutes(block.to)) / 28.8}%`,
  width: `${(minutes(block.to) - minutes(block.from)) / 14.4}%`,
  short: minutes(block.to) - minutes(block.from) < 100,
});

export function presetDayBlocks(source, sourceDay) {
  const key = DAYS.includes(sourceDay) ? sourceDay : DAYS.find(day => source[day]?.length);
  return clone(key ? source[key] || [] : []);
}

export function applyPreset(current, source, day, scope = "day", sourceDay) {
  const pattern = presetDayBlocks(source, sourceDay);
  return Object.fromEntries(DAYS.map((key, index) => [key,
    clone(scope === "week" ? source[key] || [] : index === day ? pattern : current[key] || []),
  ]));
}

export function copyDays(current, sourceDay, destinations) {
  return Object.fromEntries(DAYS.map((key, index) => [key,
    clone(destinations.includes(index) ? current[DAYS[sourceDay]] || [] : current[key] || []),
  ]));
}
