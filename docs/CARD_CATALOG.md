# Card catalog and selection guide

Materia contains both general-purpose cards and specialized dashboard building
blocks. Start with the smallest recommended set below; use a specialized card
only when its extra interaction is the reason you chose it.

## Recommended starting set

| Need | Start with | Choose something else when… |
|---|---|---|
| Entity, navigation, or simple action | `materia-card` | You need a safety gesture (`materia-confirm`) or a dedicated slider (`materia-level`). |
| Room overview | `materia-room` | The page already supplies navigation and only needs a plain list. |
| Compact sensor summary | `materia-glance-tile`, variant `plain` | A gauge/history visualization adds information rather than decoration. |
| On/off row | `materia-switch` | The universal card already fits the page; do not replace it only for visual variety. |
| Media summary | `materia-media` | Seeking is required; add `materia-media-progress` alongside it. |
| Weather overview | `materia-weather-glance` | The page needs a hero, forecast strip, or one detailed metric. |
| Humidity control | `materia-humidifier` | A plain entity row is enough and target humidity or device modes are not needed. |
| Safe consequential action | `materia-confirm` | Native HA confirmation is sufficient for the risk involved. |

## Specialized families

- **Weather:** `weather-glance` is the normal overview. `weather-hero` is the
  page focal point. `forecast-daily` and `forecast-hourly` are forecast strips.
  `weather-metric` is one detailed metric. `weather-tile` is retained for
  compact tilted-condition layouts; avoid mixing every family on one page.
- **Glance:** prefer `plain`, `percent`, or `detail` first. Gauge and recorder
  variants should only be used when their scale or history answers a real
  question. Recorder variants cost a history request and periodic refresh.
- **Scheduling:** `presentation: manager` is the parent-facing Scheduler UI.
  `inline` is a compact one-off picker. `sheet` and backend wiring fields are
  advanced integration seams, not normal dashboard choices.
- **Humidity:** `materia-humidifier` supports both humidifiers and
  dehumidifiers. Prefer the entity's reported limits, step size, current
  humidity, and modes; configure an external sensor only when the integration
  does not expose `current_humidity`.

## Deprecation policy

Existing card types and YAML remain supported when a newer recommended path is
introduced. A deprecated type will:

1. remain registered for at least two minor releases;
2. be labelled as legacy in this catalog and the card picker;
3. receive security and compatibility fixes, but no new visual variants; and
4. include a documented equivalent configuration before removal.

No card is currently scheduled for removal. This policy exists so dashboards
can consolidate without surprise breakage.

## Configuration principle

Visual editors show the card's effective defaults but do not write those
defaults into YAML merely because the editor was opened. Explicit user choices
remain explicit, so a later runtime-default change cannot silently reinterpret
them. Advanced service names, raw objects, and entity wiring should remain
collapsed until needed.
