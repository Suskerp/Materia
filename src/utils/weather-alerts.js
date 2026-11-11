/* Weather warnings from an entity's `warnings` attribute (IRM KMI shape:
 * { slug, id, level, friendly_name, text, starts_at, ends_at }) — pure, node-testable. */

/** Icon per warning kind (KMI slugs); anything else gets the generic alert icon. */
const ICONS = {
  wind: "mdi:weather-windy",
  rain: "mdi:weather-pouring",
  ice_or_snow: "mdi:snowflake-alert",
  thunder: "mdi:weather-lightning",
  thunder_wind_rain: "mdi:weather-lightning-rainy",
  thunderstorm_strong_gusts: "mdi:weather-lightning",
  thunderstorm_large_rainfall: "mdi:weather-lightning-rainy",
  fog: "mdi:weather-fog",
  cold: "mdi:snowflake-thermometer",
  coldspell: "mdi:snowflake-thermometer",
  heat: "mdi:sun-thermometer",
  storm_surge: "mdi:waves-arrow-up",
};

/** KMI level → colour step: 1 yellow, 2 orange, 3+ red; unknown counts as yellow. */
export function alertTone(level) {
  const n = Number(level);
  if (!Number.isFinite(n) || n <= 1) return "yellow";
  return n === 2 ? "orange" : "red";
}

const toMs = (v) => {
  if (v == null || v === "") return null;
  const ms = v instanceof Date ? v.getTime() : Date.parse(v);
  return Number.isFinite(ms) ? ms : null;
};

/**
 * The warnings on `stateObj`, sorted active first, then by start; each as
 * { title, text, level, tone, icon, slug, start, end (ms), active, upcoming }.
 * Ended warnings are dropped. `now` in ms.
 */
export function readAlerts(stateObj, now = Date.now()) {
  const list = stateObj?.attributes?.warnings;
  if (!Array.isArray(list)) return [];
  return list
    .map((w) => {
      const start = toMs(w?.starts_at);
      const end = toMs(w?.ends_at);
      const active = (start == null || start <= now) && (end == null || now < end);
      return {
        title: w?.friendly_name || w?.slug || "",
        text: w?.text || "",
        level: w?.level ?? null,
        tone: alertTone(w?.level),
        icon: ICONS[w?.slug] ?? "mdi:alert",
        slug: w?.slug ?? null,
        start,
        end,
        active,
        upcoming: !active && start != null && start > now,
      };
    })
    .filter((a) => a.active || a.upcoming)
    .sort((a, b) => (a.active === b.active ? (a.start ?? 0) - (b.start ?? 0) : a.active ? -1 : 1));
}

/** Which alerts a card shows: `active` only, or `all` (active and upcoming; the default). */
export function visibleAlerts(alerts, show = "all", max = Infinity) {
  // Current before upcoming, then the most severe, then the earliest: the
  // weather service's own order put an orange warning above a red one.
  const rank = { yellow: 1, orange: 2, red: 3 };
  const list = (show === "active" ? alerts.filter((a) => a.active) : [...alerts]).sort(
    (a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0) || (rank[b.tone] ?? 0) - (rank[a.tone] ?? 0) || (a.start ?? 0) - (b.start ?? 0)
  );
  return list.slice(0, Math.max(0, max));
}

/** The most severe active alert (highest level, then the earliest), or null. */
export function worstActive(alerts) {
  const rank = { yellow: 1, orange: 2, red: 3 };
  return alerts.filter((a) => a.active).sort((a, b) => rank[b.tone] - rank[a.tone])[0] ?? null;
}
