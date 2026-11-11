# Changelog

All notable changes to Materia. Versions follow [semver](https://semver.org); the version
lives in `package.json` and is stamped into the bundle at build time. Each release is a git
tag `vX.Y.Z` with a GitHub release carrying the section below, which is what the Home
Assistant Marketplace shows as the update's release notes.

Every release starts with **Breaking changes**: what an existing dashboard has to change,
or "None" when nothing does.

## 0.76.8 — 2026-11-11

Arrival times can be set from a computer again, and switchless expanders match their neighbours.

### Breaking changes
None.

### Fixed
- **A "Not set" date-and-time works on desktop browsers:** the picker now starts on today at
  the next full hour. Desktop Chrome filled in only the date of an empty field, so a pick
  never became a value and nothing was saved.
- **An expander without a switch uses the plain card colour** instead of the lighter "on"
  tint, so it matches the navigation rows next to it. Expanders with a switch keep their
  on/off tones.

## 0.76.7 — 2026-11-11

The time input's picker is easier to hit and no longer starts in the year 2000.

### Breaking changes
None.

### Fixed
- **A click anywhere on a time-input row opens the picker,** on computers as well as phones.
- **A "Not set" date-and-time opens the picker on today** instead of on the cleared value
  (1 January 2000), and moments in the past can no longer be picked.

## 0.76.6 — 2026-11-11

A quarter smaller: the visual editors now load only when you open one.

### Breaking changes
None for dashboards. Manual installs (without the Marketplace) must copy every `.js` file in
`dist/` next to `materia.js`, not only `materia.js`.

### Changed
- **Editors load on demand:** the card editors and their translations moved to a separate
  file next to `materia.js` (`materia-editors-<hash>.js`), fetched the first time someone
  opens a card editor. The main file went from 340 KB to 261 KB gzipped.
- **Clearing a date-and-time** (time input and the schedule card's date & time mode) writes
  2000-01-01 00:00 instead of now: an `input_datetime` can't be empty, and this way no
  automation on the helper can fire from a cleared value, whatever its offset.

### Fixed
- **A "Not set" date-and-time row opens the picker on every browser,** Safari included; the
  tap now lands on the date field itself.
- **The expander stays open in the card editor's preview,** instead of folding shut after
  every change.

## 0.76.5 — 2026-11-11

### Breaking changes
None.

### Added
- **`materia-time-input` clear button:** a date-and-time row that holds a moment gets a ×
  that clears it (sets the helper to now). `clearable: false` hides it.

### Fixed
- **Nested card editors stuck on "Loading card editor…"** (expander, panel host, stack,
  switcher, tabs, climate panel): Home Assistant can hand back its stack card before its code
  has loaded; Materia now waits for it and retries instead of hanging.
- **`materia-time-input`:** a date-and-time in the past shows "Not set" instead of the old
  moment.

## 0.76.4 — 2026-11-11

### Breaking changes
None.

### Added
- **Expander `collapsible: false`:** a grouped card whose cards always show, with no
  chevron and no fold; the header keeps its live subtitle (e.g. a mode and an arrival
  moment above a button group and a time row).

### Fixed
- **Expander hairline:** it has room on both sides now, instead of touching the switch.

## 0.76.3 — 2026-11-11

Expandable switch rows that look expandable, and no colour flash on the media card.

### Breaking changes
None.

### Fixed
- **Expander chevron:** it used an icon the Material Symbols set doesn't have, so it drew
  nothing. It is a standard chevron now, with a hairline before the switch when the row
  has both, so a switch row that holds settings reads as expandable.
- **Expander switch alignment:** the switch sits 14 px from the edge, like a
  `materia-switch` row, so stacked rows line their switches up.
- **Media card colours on load:** `materia-art-scope` applies the colours a player had last
  time straight away and replaces them once the cover is analysed, instead of showing the
  dashboard's default colours for a moment.

## 0.76.2 — 2026-11-11

The compact time row can now hold a date and a date-time as well.

### Breaking changes
None.

### Added
- **`materia-time-input` follows its helper:** an `input_datetime` with date and time gets a
  date-time picker, a date-only helper a date picker, and a time-only helper the time picker
  as before. A compact way to set, for example, an arrival moment in a row.

## 0.76.1 — 2026-11-11

A schedule card you can set up without YAML, a climate panel that shows only the modes you
use, and the weather warning moved to the glance's second line.

### Breaking changes
None. Existing schedule, climate and weather cards keep working as they are.

### Added
- **Schedule card: "What is this card for?"** The editor starts by asking, then shows only
  the fields for that choice:
  - **Set a date & time** (`presentation: datetime`, `datetime_entity`): stores the chosen
    moment in an `input_datetime` helper and runs nothing. Automations can trigger on the
    helper, also hours before it. The card shows the moment while it is ahead and
    "Not set" once it has passed; Clear sets the helper to now.
  - **One moment** (`presentation: moment`, `steps`): pick a date and time, and the steps
    run then (each optionally before or after it); it clears itself after the last one.
  - **Manager** and **picker for your own action**: as before.
- **Schedule card: visual editors for everything** that used to be YAML: steps, plans,
  quick picks, triggers, devices and their actions, and window start/end actions.
- **Climate panel: `hvac_modes`** limits the mode bar to the modes you choose (none
  chosen: every mode the thermostat offers); `show_modes: false` hides the bar.

### Changed
- **Weather glance:** an active weather warning (`alerts_entity`) now leads the second
  line as a coloured pill ("Oranje · Wind"); the condition keeps the first line.
- **Schedule card:**
  - The idle card shows its title and icon (`icon`, default a calendar clock).
  - Steps show the service's and entity's names, and when they run ("3 h before").
  - Quick picks and triggers only appear when configured on the new purposes.

### Fixed
- **Schedule card:** a one-time Scheduler entry left behind because Home Assistant was down
  at its moment no longer reads as "scheduled".

### Known issue
- In a schedule step's action editor, Home Assistant's service field can look empty even
  though the service is set; the row above it shows the chosen service, and saving works.

## 0.76.0 — 2026-11-11

Weather warnings on the dashboard, and a weather glance that leaves out values with
nothing to say.

### Breaking changes
None.

### Added
- **`materia-alerts`:** weather warnings from an entity's `warnings` attribute, such as the
  IRM KMI warning sensor.
  - One row per warning, coloured by level (yellow, orange, red), with when it applies.
  - A tap shows the full text; `expanded: true` shows it right away.
  - `show: active` hides upcoming warnings; `max` caps the number of rows.
  - With nothing to show the card hides itself and leaves no gap, so it can sit on a home
    screen.
- **Weather glance `alerts_entity`:** while a warning is active, its first line shows it
  ("Code oranje · Wind") with the warning icon in its level colour.

### Changed
- **The weather glance hides values that say nothing:** no pollen, no rain (0 mm) and
  UV 0. Turn `hide_quiet` off to show them again.

## 0.75.0 — 2026-11-09

The power menu becomes a regular menu: `materia-menu` gets a list mode, a button whose
menu holds a switch per entity, so a power menu can also carry other switches, such as a
zone link.

### Breaking changes
- **`materia-power-menu` is removed.** Use `materia-menu` in list mode (`mode: list`, or
  just `items:`) with `icon: mdi:power` and `color: error`.
- **`materia-media-header` `power_entities` is replaced by `power_menu`,** a
  `materia-menu` list config: `power_menu: { items: [...] }`.
  - Before: `power_entities: [media_player.a, media_player.b]`.
  - Now: `power_menu: { items: [media_player.a, media_player.b, { type: divider }, { type: all }] }`.
  - "All off / All on" is no longer added on its own: add a `{ type: all }` row.

### Added
- **`materia-menu` list mode:** an icon button (`icon`, `color`, `variant: kiosk`) whose
  menu has rows:
  - a switch per entity: players, switches, input booleans, lights, fans;
  - `{ type: divider }`;
  - `{ type: all }`: "All off" while a row is on, else "All on". Rows with
    `in_all: false` are left out.
- **Visual editor:** a choice between the two menu kinds, and a row list for list mode and
  for the media header's power menu, in English and Dutch.

### Fixed
- **Editor rows** in the power list show the entity's name instead of its id.

## 0.74.1 — 2026-11-08

Every card and option can now be set up in the visual editor, nested cards included,
and the editors speak your Home Assistant language (English or Dutch).

### Breaking changes
None.

### Added
- **Visual editors for nested cards:**
  - `materia-panel-host`: layout, the cards, and each panel (heading, head row,
    head-row actions, content cards), all without YAML.
  - `materia-stack`, `materia-switcher` (name, value and card per tab), and the kiosk
    panels of `materia-art-scope`.
  - The power list of `materia-media-header`, with a name per player.
  - Card lists let you add, edit, reorder and remove cards with Home Assistant's own
    card picker, and show each card by name.
- **Fields for options that were YAML-only**, such as the tile grid's `active` matching
  (entity and attributes).
- **Translations:** every editor label, hint and choice in English and Dutch, following
  the user's Home Assistant language (English when it is another language).

### Fixed
- **The time input editor opens again;** it showed an error instead of its fields.

## 0.74.0 — 2026-11-08

The media family becomes composable: small generic cards that build today's Arcam
volume panels, kiosk and phone drawer without device-specific code, and work for any
media player.

### Breaking changes
- **`materia-volume-knob` is removed.** Compose the same panel instead:
  - **One player:** `materia-volume` (styles `knob | arc | tap`, `column`).
  - **Zones:** `materia-switcher` (`bar: tabs | connected`, one card per tab), or a
    `materia-stack` row of `materia-volume` columns.
  - **Link control:** `materia-toggle-chip` (chip or `variant: switch`) in the panel's
    `actions:`.
- **`materia-art-scope` `volume:` block is removed.**
  - Define a `volume` panel on the panel host instead.
  - Give `materia-media-header` its `power_entities` list for the power menu, which no
    longer comes from the volume zones.
- **`materia-art-scope` `panel_mode: inline` is removed.** Wrap the cards in
  `materia-panel-host` (`mode: inline | sheet`).
- **Panel entries are full card definitions.** A `panels:` entry is now a card,
  `{ heading, actions, card }` or `{ heading, actions, cards }`. It is no longer a set of
  options merged into the card a button asks for.
  - Before: `panels: { volume: { style: tap } }`.
  - Now: `panels: { volume: { heading: Volume, cards: [...] } }`.
- **Panel content no longer draws its own panel heading or close/back buttons;** the host
  draws them. The `in_panel`, `in_sheet` and `panel_back` flags are gone.
- **The scope context event is renamed** from `materia-volume-context` to
  `materia-scope-context`. This only matters for custom code that listened for it.

### Added
- **Panels:**
  - `materia-panel-host` hosts named panels inline or as a bottom sheet, with a timeout
    and a second tap to close.
  - The `materia-panel` tap action works on any button, chip or tile:
    `{ action: materia-panel, panel: id }`.
  - A panel's head row takes `actions:` cards; `head: false` hides the row.
- **`materia-volume`:** one player's volume (knob, arc, tap) with the old card's
  physics, haptics, limit and hold-to-repeat.
- **`materia-switcher`:** a tab bar over one card slot. Each tab has a name, a live
  value (template) and a card.
- **`materia-toggle-chip`:** a chip or labelled switch for any on/off entity, with
  templated labels.
- **`materia-stack`:** cards in a row or column that fill the available space (mixers,
  panels).
- **`materia-power-menu`:** a power button with a menu holding a switch per player and
  all off/on; it also fits in a toolbar or a panel header.
- **`materia-media-source`:** a source button that cycles through the sources (or picks
  one from a menu, `mode: menu`). `materia-media-header` is now built from these two
  parts and looks the same.
- **`materia-tile-grid`:** a generic image or icon grid with actions.
  - Options: `tile: logo | cover`, `tile_background`, and `active` matching on chosen
    attributes.
  - `materia-station-grid` stays as an alias.
- **`attributes:`** maps the non-standard player attributes (`volume_steps`, `limit`,
  `controls`, `live`, `transition`, `input`, `steps`) per card or per art scope.
  Defaults are unchanged.
- **Schedule:** in window mode, an existing Scheduler window shows on the strip right
  away.

### Fixed
- **The auto-sized media cover no longer resizes on page load.** It starts at the size it
  last had for that player on that page, and its first fit doesn't animate.
- **Panel content fills the panel height,** so slider columns no longer collapse.
- **A kiosk that is too narrow for its side column** opens its own panels as bottom
  sheets.

## 0.73.0 — 2026-11-08

The expressive media family: a phone player, a kiosk with side panels, volume per zone, and
a set of fixes from living with it on a wall tablet.

### Breaking changes
None. Every option from 0.71.7 still works the same way:
- `materia-media` without `variant` keeps its tap → more-info and its numeric `art_size`.
- `materia-button-group` keeps `group: connected | standard`.
- `materia-tabs` keeps its markup.

Only new options and new card types were added.

### Added
- **Media cards**:
  - `materia-media` (player variant, auto-fitting cover art);
  - `materia-media-header` (title, zone and power menu);
  - `materia-media-progress` (M3 wavy progress bar with track, handle and stop indicator);
  - `materia-art-scope` (stack and kiosk layouts).
- **Kiosk side panels** for volume and stations:
  - `panel_mode: inline` swaps the cards in place for the volume or stations view, with a
    back arrow;
  - the panel timeout is configurable, including for inline panels.
- **Volume `tap` style**: an M3 Expressive slider with active track, handle, inactive track
  and stop dot.
  - The slider can be dragged.
  - `zones_view: side` gives one slider column per zone under a single header.
- **Power menu** in the media header: a switch per zone plus all on/off (`show_power`).
  - It opens in the top layer, so swipe cards and scopes can't clip it.
- **Power transition** while a player turns on or off ("Opstarten…" / "Uitschakelen…").
  - While off, the title shows the device name instead of the last source.
- **Resting animation**: a continuous shape morph in the cover area while the player is off.
- **Optimistic controls**: play/pause, shuffle, repeat and seek respond at once, without
  waiting for the player.
- **`materia-tabs`**: `max_height` per tab narrows taller content (maps, cameras) until it
  fits.
  - Accepts px, `NNvh`, or a list (the smallest wins).
- **`station-grid`**: `logo_fill` fills the tile with the station logo.
- **Colours**: alarm (home / armed away / armed home) and Christmas colours in the packaged
  `custom_colors.json`.
- **Docs**: the M3 Expressive guide and agent instructions.

### Changed
- **Volume range**: volume controls span 0 … limit; the excluded range above the limit is no
  longer drawn.
- **Volume numbers removed**:
  - the "/ 99" and percentages are gone;
  - the toolbar's volume button reads "Volume" and is disabled while the player is off.
- **Zone names**: the header names the zone only when the zones differ.
- **Kiosk side panels**: all share one height (80 %, centred); stations scroll when short.
- **Progress track**: the remaining part of the progress bar uses the secondary container
  colour, per spec.

### Fixed
- **Progress track missing**: the track, handle and stop dot were built as HTML inside an
  SVG and never drew.
  - They are SVG now and redraw when the bar's width changes.
- **Progress after reload**: the position no longer starts over on every page load.
  - The player's own `live` attribute now wins over the rolling-end latch.
- **Cover pulsing**: auto cover art no longer pulses or resizes between tracks; covers swap
  once the new image has loaded.
- **Swipe-card dots**: auto art keeps space free below the player, so the dots don't
  overlap it.
- **Transport buttons**: previous/next stay through a track change instead of collapsing to
  one button.
- **Shape morph**: runs on the page clock, so it no longer hitches or snaps back on
  re-attach.
- **Solo volume ring**: on the kiosk it no longer stretches to the full row width.
