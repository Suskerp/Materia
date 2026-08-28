/** Alarm codes are secrets and Lovelace dashboard config is not a secret store. */
export function hasLegacyAlarmCode(config) {
  return Object.prototype.hasOwnProperty.call(config || {}, "code");
}

export function sanitizeAlarmConfig(config) {
  const { code: _legacyCode, ...safeConfig } = config || {};
  return safeConfig;
}
