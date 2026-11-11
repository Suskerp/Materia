import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultSettings, settingsSchema, cleanSettings, validateSettings, periodActions, actionData } from '../src/cards/weekly-scheduler/targets.js';
import { copyDays } from '../src/cards/weekly-scheduler/model.js';
const hass = { states: {
  'climate.room': { attributes: { hvac_modes: ['heat', 'cool', 'heat_cool', 'off'], min_temp: 7, max_temp: 30, target_temp_step: 0.5, temperature: 18 } },
  'humidifier.room': { attributes: { min_humidity: 35, max_humidity: 80, target_humidity_step: 5, available_modes: ['normal', 'auto'], humidity: 55 } },
  'light.simple': { attributes: { supported_color_modes: ['onoff'] } },
  'light.dimmer': { attributes: { supported_color_modes: ['brightness'] } },
  'input_number.value': { attributes: { min: 10, max: 50, step: 2 } },
  'input_select.mode': { attributes: { options: ['Home', 'Away'] } },
} };
const member = (entity) => ({ entity });
test('climate modes use device limits and validate heat/cool ranges', () => {
  const m = member('climate.room');
  assert.equal(validateSettings(m, hass, { hvac_mode: 'cool', temperature: 24 }), null);
  assert.equal(validateSettings(m, hass, { hvac_mode: 'heat', temperature: 5 }), 'invalid_setting');
  assert.equal(validateSettings(m, hass, { hvac_mode: 'heat_cool', target_temp_low: 23, target_temp_high: 20 }), 'invalid_range');
  assert.deepEqual(cleanSettings(m, { hvac_mode: 'off', temperature: 18, target_temp_low: 16, target_temp_high: 24 }), { hvac_mode: 'off' });
});
test('humidity and light fields follow actual capabilities', () => {
  assert.equal(validateSettings(member('humidifier.room'), hass, { state: 'on', humidity: 90, mode: 'auto' }), 'invalid_setting');
  assert.equal(validateSettings(member('humidifier.room'), hass, { state: 'off' }), null);
  assert.deepEqual(settingsSchema(member('light.simple'), hass, { state: 'on' }).map((field) => field.name), ['state']);
  assert.deepEqual(settingsSchema(member('light.dimmer'), hass, { state: 'on' }).map((field) => field.name), ['state', 'brightness_pct']);
  assert.deepEqual(cleanSettings(member('light.dimmer'), { state: 'off', brightness_pct: 80 }), { state: 'off' });
});
test('helpers and generic actions validate their supported values', () => {
  assert.equal(validateSettings(member('input_boolean.test'), hass, { state: 'on' }), null);
  assert.equal(validateSettings(member('input_number.value'), hass, { value: 51 }), 'invalid_setting');
  assert.equal(validateSettings(member('input_select.mode'), hass, { option: 'Home' }), null);
  assert.equal(validateSettings(member('input_select.mode'), hass, { option: 'Other' }), 'invalid_setting');
  assert.equal(validateSettings(member('sensor.any'), hass, { action: { action: 'navigate' } }), 'invalid_action');
  assert.equal(validateSettings(member('sensor.any'), hass, { action: { action: 'perform-action', perform_action: 'script.example' } }), null);
});
test('mixed group actions survive helper serialization and multi-day copy', () => {
  const members = [member('climate.room'), member('light.dimmer'), member('input_boolean.test')];
  const actions = [
    { entity: 'climate.room', start: { hvac_mode: 'heat', temperature: 19 }, end: { hvac_mode: 'heat', temperature: 16 } },
    { entity: 'light.dimmer', start: { state: 'on', brightness_pct: 40 }, end: { state: 'off' } },
    { entity: 'input_boolean.test', start: { state: 'on' }, end: { state: 'off' } },
  ];
  const block = { from: '17:00', to: '22:00', data: actionData({ note: 'Keep this' }, actions) };
  const copied = copyDays({ monday: [block] }, 0, [1, 2]);
  assert.equal(copied.tuesday[0].data.note, 'Keep this');
  assert.deepEqual(periodActions(copied.tuesday[0], members, hass), actions);
  assert.equal(block.data.temperature, 19);
  assert.deepEqual(periodActions(block, [members[1]], hass), [actions[1]]);
});
test('legacy temperature presets populate thermostats and preserve member defaults', () => {
  const members = [member('climate.room'), { entity: 'light.dimmer', defaults: { state: 'on', brightness_pct: 40 }, end: { state: 'off' } }];
  const actions = periodActions({ data: { temperature: 20 } }, members, hass);
  assert.equal(actions[0].start.temperature, 20);
  assert.equal(actions[1].start.brightness_pct, 40);
  assert.equal(actions[1].end.state, 'off');
  assert.equal(defaultSettings(member('input_number.value'), hass).value, 10);
  assert.throws(() => periodActions({ data: { materia_actions: 'broken' } }, members, hass), /Invalid stored/);
});

test('RoomMind schedules store only a temperature and honor configured defaults', () => {
  const m = { entity: 'climate.room', backend: 'roommind', defaults: { temperature: 20 } };
  assert.deepEqual(defaultSettings(m, hass), { temperature: 20 });
  assert.deepEqual(settingsSchema(m, hass, { temperature: 20 }).map(field => field.name), ['temperature']);
  assert.deepEqual(cleanSettings(m, { temperature: 20, hvac_mode: 'heat', target_temp_high: 25 }), { temperature: 20 });
  assert.equal(validateSettings(m, hass, { temperature: 20 }), null);
  assert.equal(validateSettings(m, hass, { temperature: 40 }), 'invalid_setting');
  const actions = periodActions({ data: { temperature: 21 } }, [m], hass);
  assert.equal(actions[0].start.temperature, 21);
  assert.equal(actionData({}, actions).temperature, 21);
});
