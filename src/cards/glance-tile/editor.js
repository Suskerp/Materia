import { SmartEditorBase } from "../../utils/smart-editor.js";

const VARIANTS = [
  { value: "percent", label: "Percent (filling cookie)" },
  { value: "battery", label: "Battery (vertical bar)" },
  { value: "temperature", label: "Temperature (thermometer)" },
  { value: "power", label: "Power (load bars)" },
  { value: "energy", label: "Energy" },
  { value: "binary", label: "On/off (spinning star)" },
  { value: "plain", label: "Plain value" },
  { value: "vacuum", label: "Robot vacuum (state + room + battery bar)" },
  // The gauge family: these spend the tile's empty half on the scale, so all
  // four need a max they can calibrate against (config, the entity's own max
  // attribute, or 100 for a percentage).
  { value: "fill", label: "Gauge · tile floods to the value" },
  { value: "bar", label: "Gauge · value over a track" },
  { value: "ladder", label: "Gauge · ladder of bars" },
  { value: "ring", label: "Gauge · ring beside the value" },
  { value: "status", label: "Status row (tonal, icon badge + state)" },
  // The history family: these ask the recorder for the measurement's past.
  { value: "spark", label: "History · area sparkline hero" },
  { value: "sparkline", label: "History · bare line" },
  { value: "weekbars", label: "History · a bar per day" },
  { value: "events", label: "History · event ticks (tonal row)" },
];

/** Variants that fetch history. */
const HISTORIC = ["spark", "sparkline", "weekbars", "events"];
/** ...of which these bucket by day rather than plotting a line. */
const BUCKETED = ["weekbars", "events"];

/** Variants that read _gaugeRange and so accept min/max. */
const SCALED = ["fill", "bar", "ladder", "ring"];

class MateriaGlanceTileEditor extends SmartEditorBase {
  /* The threshold/label defaults belong to the soil-moisture scale the percent
     tile draws, and the full-load watts to the power tile — both scoped to the
     variant, exactly like the fields they sit next to. The temperature scale is
     deliberately absent: its default depends on the entity's unit (10–30 °C,
     50–86 °F), so the field labels state it instead. */
  _formData() {
    const v = this._config?.variant;
    const perVariant =
      v === "percent"
        ? {
            critical_dry: 10,
            dry_below: 20,
            soggy_above: 60,
            dry_label: "Needs water now",
            soon_label: "Water soon",
            optimal_label: "Optimal",
            wet_label: "Overwatered",
          }
        : v === "power"
          ? // bars is seeded at 5 because that is the ladder's real default,
            // and power has always drawn five — an editor that showed any
            // other number here would be lying about what the card does.
            { max: 3000, bars: 5 }
          : v === "ladder"
            ? { bars: 5 }
            : v === "status"
              ? { dots: 4 }
              : v === "spark" || v === "sparkline"
                ? // 24h and 48 points are the card's real defaults, and
                  // show_delta is true only for the area hero.
                  { hours: 24, points: 48, history_refresh: 5, show_delta: v === "spark" }
                : v === "weekbars" || v === "events"
                  ? // 3 days, not the concept's 7/14: a window past the
                    // recorder's retention returns NO series at all.
                    { days: 3, aggregate: "delta", history_refresh: 5 }
                  : {};
    return { variant: "percent", ...perVariant, ...this._config };
  }

  _sectionsSignature() {
    return this._config?.variant || "";
  }

  get _sections() {
    const v = this._config?.variant;

    const content = {
      title: "Content",
      icon: "mdi:card-text-outline",
      fields: [
        { name: "entity", required: true, selector: { entity: {} } },
        { name: "variant", label: "Category", required: true, selector: { select: { mode: "dropdown", options: VARIANTS } } },
        { name: "name", label: "Title", selector: { text: {} } },
        { name: "icon", label: "Icon (overrides entity icon)", selector: { icon: {} } },
        { name: "label", label: "Subtitle", selector: { text: {} } },
      ],
    };

    const extras = { title: "Options", icon: "mdi:tune", fields: [] };
    if (v === "temperature") {
      extras.fields.push(
        { name: "min", label: "Scale min (default 10°)", selector: { number: { mode: "box" } } },
        { name: "max", label: "Scale max (default 30°)", selector: { number: { mode: "box" } } },
      );
    }
    if (v === "power") {
      extras.fields.push(
        { name: "max", label: "Full-load watts (default 3000)", selector: { number: { mode: "box" } } },
        { name: "bars", label: "Number of bars (default 5)", selector: { number: { min: 2, max: 40, mode: "box" } } },
      );
    }
    if (SCALED.includes(v)) {
      extras.fields.push(
        {
          name: "min",
          label: "Scale min (default: the entity's min attribute, else 0)",
          selector: { number: { mode: "box", step: "any" } },
        },
        {
          name: "max",
          label: "Scale max (default: the entity's max attribute, else 100 for a %)",
          helper: "Without a max the gauge cannot be calibrated and the tile falls back to a plain value.",
          selector: { number: { mode: "box", step: "any" } },
        },
        {
          name: "caption",
          label: "Caption under the gauge",
          helper:
            "Your sentence, in your language. Placeholders: {value} {min} {max} {unit} {percent}. Jinja templates work too. Empty shows the bare top of the scale.",
          template: true,
          selector: { text: {} },
        },
        {
          name: "precision",
          label: "Decimal places (default: at most 1)",
          selector: { number: { min: 0, max: 6, mode: "box" } },
        },
      );
    }
    if (v === "ladder") {
      extras.fields.push({ name: "bars", label: "Number of bars (default 5)", selector: { number: { min: 2, max: 40, mode: "box" } } });
    }
    // The bar variant needs no caption field of its own: the Content
    // section's Subtitle IS the caption override, and repeating that same
    // name in a second section would put it in the schema twice.
    if (v === "status") {
      extras.fields.push(
        {
          name: "active_state",
          label: "State(s) that count as active",
          helper:
            "Comma-separated. Left empty it is derived from the domain (cover open, vacuum cleaning, media_player playing…), falling back to \"on\" — so a sensor reading \"Connected\" needs it spelled out here.",
          selector: { text: {} },
        },
        {
          name: "dots",
          label: "Indicator dots (default 4)",
          helper: "Filled to the value when the entity has a scale; otherwise they pulse while it is active.",
          selector: { number: { min: 2, max: 12, mode: "box" } },
        },
      );
    }
    if (v === "plain") {
      extras.fields.push({ name: "battery_entity", label: "Paired battery sensor (adds the vertical bar)", selector: { entity: { domain: "sensor" } } });
    }
    if (v === "vacuum") {
      extras.fields.push(
        { name: "status_entity", label: "Detailed status sensor (shown as the state)", selector: { entity: { domain: "sensor" } } },
        { name: "room_entity", label: "Current room sensor (shown while cleaning)", selector: { entity: { domain: "sensor" } } },
        { name: "battery_entity", label: "Battery sensor (adds the vertical bar)", selector: { entity: { domain: "sensor" } } },
      );
    }
    // Only meaningful for device_class: moisture (soil sensors) — harmless
    // no-ops for battery/humidity/other percent entities.
    if (v === "percent") {
      extras.fields.push(
        { name: "critical_dry", label: "Critical dry, ≤% (default 10 — red)", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "dry_below", label: "Water soon, ≤% (default 20 — orange)", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "soggy_above", label: "Overwatered, >% (default 60 — blue)", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "dry_label", label: '"Needs water now" label', selector: { text: {} } },
        { name: "soon_label", label: '"Water soon" label', selector: { text: {} } },
        { name: "optimal_label", label: '"Optimal" label', selector: { text: {} } },
        { name: "wet_label", label: '"Overwatered" label', selector: { text: {} } },
      );
    }

    if (HISTORIC.includes(v)) {
      if (BUCKETED.includes(v)) {
        extras.fields.push(
          {
            name: "days",
            label: "Days of history (default 3)",
            helper:
              "Kept short on purpose: a window longer than your recorder keeps returns nothing at all, not a shorter series. Days with no data are simply not drawn.",
            selector: { number: { min: 1, max: 90, mode: "box" } },
          },
          {
            name: "aggregate",
            label: "What each bar measures (default: change)",
            helper: "change = how much the value moved that day (counters). mean/min/max/sum/count for measurements.",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "delta", label: "Change across the day" },
                  { value: "mean", label: "Average" },
                  { value: "min", label: "Minimum" },
                  { value: "max", label: "Maximum" },
                  { value: "sum", label: "Sum of samples" },
                  { value: "count", label: "Number of samples" },
                ],
              },
            },
          },
        );
      } else {
        extras.fields.push(
          {
            name: "hours",
            label: "Hours of history (default 24)",
            helper: "A window longer than your recorder keeps returns nothing at all.",
            selector: { number: { min: 1, max: 2160, mode: "box" } },
          },
          { name: "points", label: "Points plotted (default 48)", selector: { number: { min: 2, max: 400, mode: "box" } } },
          { name: "show_delta", label: "Show the change pill", selector: { boolean: {} } },
          {
            name: "delta_label",
            label: "Change pill text",
            helper: "Placeholders: {delta} {delta_pct} {from} {to} {unit} {hours} {days}. Empty shows just the signed change.",
            template: true,
            selector: { text: {} },
          },
        );
      }
      extras.fields.push(
        {
          name: "caption",
          label: "Caption",
          helper: "Your words. Placeholders: {value} {unit} {hours} {days} {buckets}. Jinja templates work too.",
          template: true,
          selector: { text: {} },
        },
        {
          name: "history_refresh",
          label: "Refresh every N minutes (default 5)",
          helper: "History is polled on this interval, never on every state change.",
          selector: { number: { min: 1, max: 180, mode: "box" } },
        },
      );
    }

    const appearance = {
      title: "Appearance",
      icon: "mdi:palette-outline",
      fields: [
        { name: "accent", label: "Accent color (fill / bars / star)", color: true, selector: { text: {} } },
        { name: "color", label: "Tile color", color: true, template: true, selector: { text: {} } },
        { name: "color_on", label: "Text color", color: true, template: true, selector: { text: {} } },
      ],
    };

    const actions = {
      title: "Actions",
      icon: "mdi:gesture-tap",
      fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
    };

    return extras.fields.length
      ? [content, extras, appearance, actions]
      : [content, appearance, actions];
  }
}

customElements.define("materia-glance-tile-editor", MateriaGlanceTileEditor);
