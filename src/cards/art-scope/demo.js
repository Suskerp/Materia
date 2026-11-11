/**
 * Demo mode for materia-art-scope: a pretend player for design reviews.
 *
 * With `demo: true` the scope hands its cards a copy of hass in which its
 * player is a made-up state object, and in which callService changes that
 * object instead of reaching Home Assistant. Every card inside keeps working
 * as written (play/pause, stations, sources, volume, power), so a layout can
 * be clicked through while nothing in the house moves. Nothing is sent at
 * all, not even calls aimed at other entities.
 */

const FEATURES = 1 | 4 | 8 | 16 | 32 | 128 | 256 | 512 | 1024 | 2048 | 16384; // pause, volume, mute, prev/next, power, play_media, source, play

/** Stations found anywhere in a card tree: { name, image, media_id }. */
export function stationsIn(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => stationsIn(n, out));
  else if (node && typeof node === "object") {
    const id = node.tap_action?.data?.media_id ?? node.tap_action?.data?.media_content_id;
    if (node.name && id != null) out.push({ name: node.name, image: node.image, media_id: String(id) });
    for (const v of Object.values(node)) if (v && typeof v === "object") stationsIn(v, out);
  }
  return out;
}

/** The pretend player at first sight: playing the first station. */
export function demoInitial(entity, real, stations) {
  const first = stations[0];
  // Keep what describes the device (name, sources), drop what describes the
  // real player's current playback, or it leaks into the pretend one.
  const kept = Object.fromEntries(
    Object.entries(real?.attributes ?? {}).filter(([k]) => !/^(media_|entity_picture|app_|group_members|active_queue)/.test(k))
  );
  return {
    entity_id: entity,
    state: "playing",
    last_changed: new Date().toISOString(),
    attributes: {
      ...kept,
      friendly_name: real?.attributes?.friendly_name ?? "Demo",
      supported_features: FEATURES,
      source_list: real?.attributes?.source_list ?? ["Internet Radio", "Spotify", "AirPlay", "TV"],
      source: "Internet Radio",
      volume_level: 0.3,
      is_volume_muted: false,
      media_content_type: "music",
      media_title: first?.name ?? "Demo station",
      media_artist: first ? "Live radio" : "",
      entity_picture: first?.image ?? undefined,
      demo_station: 0,
    },
  };
}

const playStation = (st, stations, i) => {
  const s = stations[((i % stations.length) + stations.length) % stations.length];
  if (!s) return st;
  return {
    ...st,
    state: "playing",
    attributes: {
      ...st.attributes,
      source: "Internet Radio",
      media_title: s.name,
      media_artist: "Live radio",
      entity_picture: s.image,
      demo_station: stations.indexOf(s),
    },
  };
};

/** The next pretend state after a service call (the same object when nothing applies). */
export function demoReduce(st, domain, service, data = {}, stations = []) {
  const a = st.attributes;
  const set = (patch, state = st.state) => ({ ...st, state, attributes: { ...a, ...patch } });
  if (service === "play_media") {
    const id = String(data.media_id ?? data.media_content_id ?? "");
    const i = stations.findIndex((s) => s.media_id === id);
    return i >= 0 ? playStation(st, stations, i) : set({ media_title: id || a.media_title }, "playing");
  }
  if (domain !== "media_player" && domain !== "homeassistant") return st;
  switch (service) {
    case "turn_on":
      return set({}, "playing");
    case "turn_off":
      return set({}, "off");
    case "toggle":
      return set({}, st.state === "off" ? "playing" : "off");
    case "media_play_pause":
      return set({}, st.state === "playing" ? "paused" : "playing");
    case "media_play":
      return set({}, "playing");
    case "media_pause":
      return set({}, "paused");
    case "media_stop":
      return set({}, "idle");
    case "media_next_track":
      return playStation(st, stations, (a.demo_station ?? 0) + 1);
    case "media_previous_track":
      return playStation(st, stations, (a.demo_station ?? 0) - 1);
    case "volume_up":
      return set({ volume_level: Math.min(1, Math.round(((a.volume_level ?? 0) + 0.05) * 100) / 100) });
    case "volume_down":
      return set({ volume_level: Math.max(0, Math.round(((a.volume_level ?? 0) - 0.05) * 100) / 100) });
    case "volume_set":
      return set({ volume_level: Number(data.volume_level) || 0 });
    case "volume_mute":
      return set({ is_volume_muted: !!data.is_volume_muted });
    case "select_source": {
      const source = String(data.source ?? "");
      if (/radio/i.test(source)) return playStation(set({ source }), stations, a.demo_station ?? 0);
      return set({ source, media_title: source, media_artist: "", entity_picture: undefined }, "playing");
    }
    default:
      return st;
  }
}
