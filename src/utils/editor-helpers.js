/**
 * Shared editor helpers for Materia card config editors.
 */

/**
 * Label compute function for ha-form schemas.
 * Converts "humidity_entity" → "Humidity entity".
 */
export const computeLabel = (schema) =>
  schema.name
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
