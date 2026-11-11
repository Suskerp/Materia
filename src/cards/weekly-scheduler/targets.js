/** Typed presentation adapters. These describe schedule data, never call devices. */
import { humidifierRange, humidifierModes, humidifierTarget } from '../humidifier/model.js';

export const domainOf = (member) => (member.entity || '').split('.')[0];
export const entityId = (member) => member.entity || member.climate || '';
export const memberName = (member, hass) => member.name || hass?.states?.[entityId(member)]?.attributes?.friendly_name || entityId(member);
export const memberIcon = (member, hass) => member.icon || hass?.states?.[entityId(member)]?.attributes?.icon || ({ climate: 'mdi:thermostat', humidifier: 'mdi:air-humidifier', light: 'mdi:lightbulb-outline', switch: 'mdi:power-socket-eu', input_boolean: 'mdi:toggle-switch-outline', fan: 'mdi:fan', input_number: 'mdi:counter', number: 'mdi:counter', select: 'mdi:form-dropdown', input_select: 'mdi:form-dropdown' }[domainOf(member)] || 'mdi:calendar-clock');
const number = (value, fallback) => value == null || value === '' || !Number.isFinite(Number(value)) ? fallback : Number(value);
const select = (name, options, label, display = (value) => value.replaceAll('_', ' ').replace(/^./, (letter) => letter.toUpperCase())) => ({ name, label, selector: { select: { options: options.map((value) => ({ value, label: display(value) })) } } });
const numeric = (name, min, max, step, label, unit) => ({ name, label, selector: { number: { min, max, step, mode: 'box', ...(unit ? { unit_of_measurement: unit } : {}) } } });

export function defaultSettings(member, hass) {
  if (member.defaults) return structuredClone(member.defaults);
  const attributes = hass?.states?.[entityId(member)]?.attributes || {};
  switch (domainOf(member)) {
    case 'climate': {
      const hvac_mode = attributes.hvac_modes?.includes('heat') ? 'heat' : attributes.hvac_modes?.find((mode) => mode !== 'off') || 'heat';
      return hvac_mode === 'heat_cool' ? { hvac_mode, target_temp_low: number(attributes.target_temp_low, 18), target_temp_high: number(attributes.target_temp_high, 24) } : { hvac_mode, temperature: number(attributes.temperature, 18) };
    }
    case 'humidifier': return { state: 'on', humidity: humidifierTarget(attributes) ?? 55, ...(attributes.mode ? { mode: attributes.mode } : {}) };
    case 'light': return { state: 'on', ...(attributes.supported_color_modes?.some((mode) => mode !== 'onoff') ? { brightness_pct: 50 } : {}) };
    case 'switch': case 'input_boolean': return { state: 'on' };
    case 'fan': return { state: 'on', ...((attributes.supported_features & 1) ? { percentage: 50 } : {}) };
    case 'number': case 'input_number': return { value: number(attributes.min, 0) };
    case 'select': case 'input_select': return { option: attributes.options?.[0] || '' };
    default: {
      const domain = domainOf(member);
      const service = { button: 'button.press', input_button: 'input_button.press', scene: 'scene.turn_on', script: 'script.turn_on' }[domain];
      return { action: service ? { action: 'perform-action', perform_action: service, target: { entity_id: entityId(member) } } : { action: 'none' } };
    }
  }
}

export function settingsSchema(member, hass, settings, label = (key) => key) {
  const a = hass?.states?.[entityId(member)]?.attributes || {};
  const domain = domainOf(member);
  if (member.backend === 'roommind') return [numeric('temperature', number(a.min_temp, 5), number(a.max_temp, 35), number(a.target_temp_step, 0.5), label('target_temperature'), hass?.config?.unit_system?.temperature || '°C')];
  const state = select('state', ['on', 'off'], label('state'), (value) => label(value));
  if (domain === 'climate') {
    const modes = a.hvac_modes?.length ? a.hvac_modes : ['heat', 'cool', 'heat_cool', 'off'];
    const fields = [select('hvac_mode', modes, label('hvac_mode'), (value) => label(value === 'off' ? 'off' : 'mode_' + value))];
    const unit = hass?.config?.unit_system?.temperature || '°C';
    const min = number(a.min_temp, 5), max = number(a.max_temp, 35), step = number(a.target_temp_step, 0.5);
    if (settings.hvac_mode === 'heat_cool') fields.push(numeric('target_temp_low', min, max, step, label('low'), unit), numeric('target_temp_high', min, max, step, label('high'), unit));
    else if (!['off', 'dry', 'fan_only'].includes(settings.hvac_mode)) fields.push(numeric('temperature', min, max, step, label('target_temperature'), unit));
    return fields;
  }
  if (['light', 'switch', 'input_boolean', 'fan', 'humidifier'].includes(domain)) {
    const fields = [state];
    if (settings.state === 'off') return fields;
    if (domain === 'humidifier') {
      const range = humidifierRange(a);
      fields.push(numeric('humidity', range.min, range.max, range.step, label('humidity'), '%'));
      const modes = humidifierModes(a);
      if (modes.length) fields.push(select('mode', modes, label('mode')));
    }
    if (domain === 'light' && a.supported_color_modes?.some((mode) => mode !== 'onoff')) fields.push(numeric('brightness_pct', 1, 100, 1, label('brightness'), '%'));
    if (domain === 'light' && a.supported_color_modes?.includes('color_temp')) fields.push(numeric('color_temp_kelvin', a.min_color_temp_kelvin || 2000, a.max_color_temp_kelvin || 6500, 1, label('color_temperature'), 'K'));
    if (domain === 'fan' && (a.supported_features & 1)) fields.push(numeric('percentage', 1, 100, a.percentage_step || 1, label('speed'), '%'));
    return fields;
  }
  if (['number', 'input_number'].includes(domain)) return [numeric('value', number(a.min, 0), number(a.max, 100), number(a.step, 1), label('value'), a.unit_of_measurement)];
  if (['select', 'input_select'].includes(domain)) return [select('option', a.options || [], label('option'))];
  return [{ name: 'action', label: label('action'), selector: { ui_action: { default_action: 'perform-action' } } }];
}

export function cleanSettings(member, settings) {
  const data = structuredClone(settings || {});
  if (member.backend === 'roommind') return data.temperature != null ? { temperature: data.temperature } : {};
  if (domainOf(member) === 'climate') {
    if (data.hvac_mode === 'heat_cool') delete data.temperature;
    else { delete data.target_temp_low; delete data.target_temp_high; }
    if (['off', 'dry', 'fan_only'].includes(data.hvac_mode)) delete data.temperature;
  }
  if (data.state === 'off') for (const key of ['humidity', 'mode', 'brightness_pct', 'color_temp_kelvin', 'percentage']) delete data[key];
  for (const key of Object.keys(data)) if (data[key] == null || data[key] === '') delete data[key];
  return data;
}

export function validateSettings(member, hass, settings) {
  const schema = settingsSchema(member, hass, settings);
  for (const field of schema) {
    const value = settings[field.name], range = field.selector.number, choices = field.selector.select?.options;
    if (range && (field.name !== 'color_temp_kelvin' || value != null)) {
      if (value == null || value === '' || !Number.isFinite(Number(value)) || Number(value) < range.min || Number(value) > range.max) return 'invalid_setting';
    }
    if (choices && !choices.some((choice) => choice.value === value)) return 'invalid_setting';
    if (field.name === 'action') {
      if (!['perform-action', 'call-service', 'toggle'].includes(value?.action)) return 'invalid_action';
      if (value.action !== 'toggle' && !/^[a-z_]+\.[a-z_]+$/.test(value.perform_action || value.service || '')) return 'invalid_action';
    }
  }
  if (settings.hvac_mode === 'heat_cool' && Number(settings.target_temp_low) >= Number(settings.target_temp_high)) return 'invalid_range';
  return null;
}

export function describeSettings(member, settings, label = (key) => key, unit = '°C') {
  if (!settings || !Object.keys(settings).length) return label('no_change');
  if (settings.hvac_mode === 'off' || settings.state === 'off') return label('off');
  const domain = domainOf(member);
  if (member.backend === 'roommind') return `${settings.temperature ?? '–'} ${unit}`;
  if (domain === 'climate') {
    const mode = settings.hvac_mode ? label('mode_' + settings.hvac_mode) : '';
    const target = settings.hvac_mode === 'heat_cool' ? `${settings.target_temp_low ?? '–'}–${settings.target_temp_high ?? '–'} ${unit}` : settings.temperature != null ? `${settings.temperature} ${unit}` : '';
    return [mode, target].filter(Boolean).join(' · ');
  }
  if (domain === 'humidifier') return [settings.humidity != null ? `${settings.humidity}%` : label('on'), settings.mode].filter(Boolean).join(' · ');
  if (domain === 'light') return [label('on'), settings.brightness_pct != null ? `${settings.brightness_pct}%` : '', settings.color_temp_kelvin ? `${settings.color_temp_kelvin} K` : ''].filter(Boolean).join(' · ');
  if (settings.percentage != null) return `${label('on')} · ${settings.percentage}%`;
  if (settings.value != null) return String(settings.value);
  if (settings.option != null) return settings.option;
  if (settings.action) return settings.action.perform_action || settings.action.service || label('action');
  return label('on');
}

export function periodActions(block, members, hass) {
  let saved = [];
  if (block?.data?.materia_actions) {
    try { saved = JSON.parse(block.data.materia_actions); }
    catch { throw new Error('Invalid stored group actions'); }
    if (!Array.isArray(saved)) throw new Error('Invalid stored group actions');
  }
  return members.map((member) => {
    const match = saved.find((action) => action.entity === entityId(member));
    if (match) {
      if (!match.start || typeof match.start !== 'object' || Array.isArray(match.start) || (match.end && (typeof match.end !== 'object' || Array.isArray(match.end)))) throw new Error('Invalid stored group actions');
      return { ...structuredClone(match), end: structuredClone(match.end || {}) };
    }
    const start = defaultSettings(member, hass);
    if (domainOf(member) === 'climate' && block?.data?.temperature != null) start.temperature = block.data.temperature;
    return { entity: entityId(member), start, end: structuredClone(member.end || {}) };
  });
}

export function actionData(previous = {}, actions) {
  const data = { ...previous, materia_actions: JSON.stringify(actions) };
  // Retain the legacy temperature attribute only when it has a single unambiguous target.
  const climate = actions.filter((action) => action.entity.startsWith('climate.'));
  if (climate.length === 1 && climate[0].start?.temperature != null) data.temperature = climate[0].start.temperature;
  else delete data.temperature;
  return data;
}
