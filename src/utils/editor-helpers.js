export const computeLabel = (schema) =>
  schema.label ??
  schema.name
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
