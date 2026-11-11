import test from "node:test";
import assert from "node:assert/strict";
import {
  actionItemForm,
  actionItemFromForm,
  durationOffset,
  offsetDuration,
  presetForm,
  presetFromForm,
  schedulePurpose,
  stepForm,
  stepFromForm,
  targetActionForm,
  targetActionFromForm,
  triggerForm,
  triggerFromForm,
  uiAction,
  withPurpose,
} from "../src/cards/schedule/editor-model.js";

const heat = {
  action: "perform-action",
  perform_action: "climate.set_hvac_mode",
  target: { entity_id: "climate.living" },
  data: { hvac_mode: "heat" },
};

test("the purpose follows the keys the card reads, defaulting to the inline picker", () => {
  assert.equal(schedulePurpose({}), "inline");
  assert.equal(schedulePurpose({ presentation: "sheet" }), "sheet");
  assert.equal(schedulePurpose({ presentation: "moment" }), "moment");
  assert.equal(schedulePurpose({ manage_schedules: true }), "manager");
  assert.equal(schedulePurpose({ targets: ["switch.a"] }), "manager");
});

test("choosing one moment drops manager-only keys and gives the card its own tag", () => {
  const next = withPurpose({ targets: ["switch.a"], manage_schedules: true, name: "Home" }, "moment", () => "materia_moment_x");
  assert.deepEqual(next, { name: "Home", presentation: "moment", manager_tag: "materia_moment_x" });
  const kept = withPurpose({ manager_tag: "mine" }, "moment", () => "other");
  assert.equal(kept.manager_tag, "mine");
  assert.deepEqual(withPurpose({ targets: ["switch.a"] }, "manager", () => "x").targets, ["switch.a"]);
});

test("a Scheduler-shaped action reads as HA's own action", () => {
  assert.deepEqual(uiAction({ service: "script.turn_on", entity_id: "script.home", service_data: { a: 1 } }), {
    action: "perform-action",
    perform_action: "script.turn_on",
    target: { entity_id: "script.home" },
    data: { a: 1 },
  });
  assert.equal(uiAction(heat), heat);
});

test("steps round-trip: at the moment, three hours before, ten minutes after", () => {
  assert.deepEqual(stepForm({ action: heat, offset_minutes: -180 }), {
    action: heat,
    when: "before",
    offset: { hours: 3, minutes: 0 },
  });
  assert.equal(stepForm({ action: heat }).when, "at");
  assert.deepEqual(stepFromForm({}, { action: heat, when: "before", offset: { hours: 3, minutes: 0 } }), {
    action: heat,
    offset_minutes: -180,
  });
  assert.equal(stepFromForm({}, { action: heat, when: "after", offset: { minutes: 10 } }).offset_minutes, 10);
  assert.equal(stepFromForm({ offset_minutes: -60 }, { action: heat, when: "at", offset: { hours: 1 } }).offset_minutes, 0);
  assert.equal(Object.is(stepFromForm({}, { when: "before" }).offset_minutes, -0), false);
});

test("a legacy step keeps its several actions until a new one is picked", () => {
  const legacy = { name: "Prepare", offset_minutes: -120, actions: [{ service: "script.turn_on", entity_id: "script.a" }, { service: "script.turn_on", entity_id: "script.b" }] };
  const form = stepForm(legacy);
  assert.deepEqual(stepFromForm(legacy, { ...form, name: "Warm up" }).actions, legacy.actions);
  const replaced = stepFromForm(legacy, { ...form, action: heat });
  assert.equal(replaced.actions, undefined);
  assert.equal(replaced.action, heat);
});

test("quick-pick offsets map to durations and back, whole days staying days", () => {
  assert.deepEqual(offsetDuration("90m"), { days: 0, hours: 1, minutes: 30 });
  assert.deepEqual(offsetDuration("1d"), { days: 1, hours: 0, minutes: 0 });
  assert.equal(durationOffset({ hours: 1, minutes: 30 }), "90m");
  assert.equal(durationOffset({ hours: 4 }), "4h");
  assert.equal(durationOffset({ days: 1 }), "1d");
  assert.equal(durationOffset({}), undefined);
});

test("quick picks round-trip through the form", () => {
  assert.deepEqual(presetForm({ label: "In 1 hour", offset: "1h" }), { label: "In 1 hour", kind: "in", in: { days: 0, hours: 1, minutes: 0 } });
  assert.deepEqual(presetForm({ label: "Tomorrow", at: "09:00", days: 1, grow: 1.4 }), { label: "Tomorrow", kind: "at", at: "09:00:00", day: "tomorrow" });
  assert.equal(presetForm({ at: "10:00", weekday: 6 }).day, "w6");
  assert.deepEqual(
    presetFromForm({ label: "Tomorrow", at: "09:00", days: 1, grow: 1.4 }, { label: "Saturday", kind: "at", at: "10:30:00", day: "w6" }),
    { label: "Saturday", at: "10:30", weekday: 6, grow: 1.4 },
  );
  assert.deepEqual(presetFromForm({ at: "09:00" }, { label: "Later", kind: "in", in: { hours: 2 } }), { label: "Later", offset: "2h" });
  assert.deepEqual(presetFromForm({}, { kind: "at", at: "07:00:00", day: "next" }), { at: "07:00" });
});

test("triggers accept the older name/sub keys and write the documented ones", () => {
  const old = { key: "leave", name: "When I leave", sub: "Phone leaves", icon: "m3o:walk" };
  assert.deepEqual(triggerForm(old), { label: "When I leave", secondary: "Phone leaves", icon: "m3o:walk" });
  assert.deepEqual(triggerFromForm(old, triggerForm(old)), { key: "leave", label: "When I leave", secondary: "Phone leaves", icon: "m3o:walk" });
});

test("a device action edits through HA's action picker and drops a picked target", () => {
  const stored = { service: "vacuum.start", label: "Clean", icon: "m3o:play", key: "clean" };
  const form = targetActionForm(stored);
  assert.deepEqual(form.action, { action: "perform-action", perform_action: "vacuum.start" });
  assert.deepEqual(targetActionFromForm(stored, form), stored);
  assert.deepEqual(
    targetActionFromForm("switch.turn_on", { label: "On", action: { action: "perform-action", perform_action: "switch.turn_on", data: { entity_id: "switch.x" } } }),
    { label: "On", service: "switch.turn_on" },
  );
});

test("window actions keep their stored shape until edited", () => {
  const stored = { service: "switch.turn_on", entity_id: "switch.pump" };
  assert.equal(actionItemFromForm(stored, actionItemForm(stored)), stored);
  assert.equal(actionItemFromForm(stored, { action: heat }), heat);
});
