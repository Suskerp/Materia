import assert from "node:assert/strict";
import test from "node:test";
import { ActionMixin } from "../src/utils/action-handler.js";

class Harness extends ActionMixin(EventTarget) {
  constructor(callService) {
    super();
    this.config = { entity: "switch.test" };
    this.hass = { callService, states: {}, user: { id: "test" } };
  }

  // Haptics are integration polish, not part of these result-contract tests.
  _fireHaptic() {}
}

test("service calls resolve to an explicit success result", async () => {
  const card = new Harness(async () => "done");
  assert.deepEqual(await card._callService("switch", "turn_on", {}), {
    ok: true,
    value: "done",
  });
});

test("service failures stay observable without becoming unhandled rejections", async () => {
  const failure = new Error("backend refused");
  const card = new Harness(async () => { throw failure; });
  let notification;
  card.addEventListener("hass-notification", (event) => { notification = event.detail; });

  const result = await card._callService("switch", "turn_on", {});
  assert.equal(result.ok, false);
  assert.equal(result.error, failure);
  assert.equal(notification.message, "backend refused");
});

test("perform-action returns the service outcome to transactional callers", async () => {
  const failure = new Error("not saved");
  const card = new Harness(async () => { throw failure; });
  const result = await card._handleAction({
    action: "perform-action",
    perform_action: "scheduler.edit",
    data: { entity_id: "switch.schedule_test" },
  });

  assert.equal(result.ok, false);
  assert.equal(result.error, failure);
});
