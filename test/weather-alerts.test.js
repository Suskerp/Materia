import assert from "node:assert/strict";
import test from "node:test";
import { readAlerts, visibleAlerts, worstActive, alertTone } from "../src/utils/weather-alerts.js";

const now = Date.parse("2026-11-11T12:00:00+01:00");
const st = {
  attributes: {
    warnings: [
      { slug: "fog", level: 1, friendly_name: "Mist", text: "Dichte mist", starts_at: "2026-11-12T06:00:00+01:00", ends_at: "2026-11-12T10:00:00+01:00" },
      { slug: "wind", level: 2, friendly_name: "Wind", text: "Rukwinden", starts_at: "2026-11-11T08:00:00+01:00", ends_at: "2026-11-11T18:00:00+01:00" },
      { slug: "rain", level: 1, friendly_name: "Regen", text: "", starts_at: "2026-11-10T08:00:00+01:00", ends_at: "2026-11-10T18:00:00+01:00" },
    ],
  },
};

test("readAlerts drops ended warnings and puts active ones first", () => {
  const a = readAlerts(st, now);
  assert.deepEqual(a.map((x) => [x.title, x.active, x.upcoming, x.tone]), [
    ["Wind", true, false, "orange"],
    ["Mist", false, true, "yellow"],
  ]);
  assert.equal(a[0].icon, "mdi:weather-windy");
  assert.deepEqual(readAlerts({ attributes: {} }, now), []);
  assert.deepEqual(readAlerts(undefined, now), []);
});

test("visibleAlerts filters and caps; worstActive picks the highest level", () => {
  const a = readAlerts(st, now);
  assert.equal(visibleAlerts(a, "active").length, 1);
  assert.equal(visibleAlerts(a, "all", 1).length, 1);
  assert.equal(worstActive(a).title, "Wind");
  assert.equal(worstActive(a.filter((x) => !x.active)), null);
});

test("alertTone maps KMI levels", () => {
  assert.equal(alertTone(1), "yellow");
  assert.equal(alertTone(2), "orange");
  assert.equal(alertTone(3), "red");
  assert.equal(alertTone(4), "red");
  assert.equal(alertTone(null), "yellow");
});

test("visibleAlerts: current first, then most severe", () => {
  const list = [
    { tone: "yellow", active: false, start: 3 },
    { tone: "orange", active: true, start: 1 },
    { tone: "red", active: true, start: 2 },
  ];
  assert.deepEqual(visibleAlerts(list).map((a) => a.tone), ["red", "orange", "yellow"]);
});
