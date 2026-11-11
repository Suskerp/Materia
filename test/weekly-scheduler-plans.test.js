import test from 'node:test';
import assert from 'node:assert/strict';
import { homePlanWeeks, saveScheduleBatch } from '../src/cards/weekly-scheduler/plans.js';
const period = temperature => ({ from: '07:00:00', to: '09:00:00', data: { temperature } });

test('a whole-home daily plan maps room patterns onto Sunday and preserves other days', () => {
  const current = { 'schedule.bedroom': { monday: [period(18)] }, 'schedule.living': { friday: [period(19)] } };
  const result = homePlanWeeks(current, [
    { schedule: 'schedule.bedroom', week: { monday: [period(20)] } },
    { schedule: 'schedule.living', week: {} },
  ], [5,6]);
  assert.equal(result['schedule.bedroom'].sunday[0].data.temperature, 20);
  assert.equal(result['schedule.bedroom'].monday[0].data.temperature, 18);
  assert.equal(result['schedule.living'].friday[0].data.temperature, 19);
  assert.deepEqual(result['schedule.living'].sunday, []);
  result['schedule.bedroom'].sunday[0].data.temperature = 25;
  assert.equal(result['schedule.bedroom'].saturday[0].data.temperature, 20);
  assert.equal(current['schedule.bedroom'].monday[0].data.temperature, 18);
});

test('plans reject missing targets, duplicate targets, and no selected days before writing', () => {
  assert.throws(() => homePlanWeeks({}, [{ schedule: 'schedule.missing', week: {} }], [0]), /unavailable/);
  assert.throws(() => homePlanWeeks({}, [], []), /Choose/);
  assert.throws(() => homePlanWeeks({}, [{schedule:'a'}, {schedule:'a'}], [0]), /Invalid/);
});

test('a failed multi-room write restores both attempted targets, including an uncertain failed write', async () => {
  const calls = [];
  const callWS = async payload => { calls.push(payload); if (payload === 'update-b') throw new Error('Connection lost'); };
  await assert.rejects(saveScheduleBatch(callWS, ['update-a','update-b'], ['restore-a','restore-b']), error => error.rollbackFailed === false);
  assert.deepEqual(calls, ['update-a','update-b','restore-b','restore-a']);
});

test('rollback failures are reported and do not prevent the other room being restored', async () => {
  const calls = [];
  await assert.rejects(saveScheduleBatch(async payload => { calls.push(payload); if (['update-b','restore-b'].includes(payload)) throw new Error('Offline'); }, ['update-a','update-b'], ['restore-a','restore-b']), error => error.rollbackFailed === true);
  assert.equal(calls.at(-1), 'restore-a');
});
