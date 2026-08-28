import test from "node:test";
import assert from "node:assert/strict";
import { bucketDays } from "../src/utils/history.js";

// These assertions exercise the install's actual calendar rules rather than a
// synthetic fixed offset. Node applies TZ to subsequently-created Date values.
process.env.TZ = "Europe/Brussels";

const at = (value, v) => ({ t: new Date(value).getTime(), v });

test("daily counter delta includes the state already in effect at midnight", () => {
  const series = [
    at("2026-08-24T22:00:00+02:00", 100),
    at("2026-08-25T08:00:00+02:00", 112),
    at("2026-08-25T20:00:00+02:00", 125),
  ];
  const buckets = bucketDays(series, {
    days: 1,
    aggregate: "delta",
    now: new Date("2026-08-25T23:00:00+02:00").getTime(),
  });

  assert.equal(buckets.length, 1);
  assert.equal(buckets[0].v, 25);
});

test("an unchanged known counter produces a truthful zero day", () => {
  const buckets = bucketDays([at("2026-08-24T22:00:00+02:00", 100)], {
    days: 1,
    aggregate: "delta",
    now: new Date("2026-08-25T23:00:00+02:00").getTime(),
  });

  assert.equal(buckets.length, 1);
  assert.equal(buckets[0].v, 0);
});

test("local day buckets retain 23-hour DST boundaries", () => {
  const series = [
    at("2026-03-28T23:00:00+01:00", 10),
    at("2026-03-29T12:00:00+02:00", 15),
    at("2026-03-30T12:00:00+02:00", 22),
  ];
  const buckets = bucketDays(series, {
    days: 2,
    aggregate: "delta",
    now: new Date("2026-03-30T20:00:00+02:00").getTime(),
  });

  assert.equal(buckets.length, 2);
  assert.equal(buckets[0].v, 5);
  assert.equal(buckets[1].v, 7);
  assert.equal(buckets[1].t - buckets[0].t, 23 * 60 * 60 * 1000);
});
