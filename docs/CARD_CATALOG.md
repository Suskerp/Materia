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
| Media summary | `materia-media` | Seeking is required; add `materia-media-progress` alongside it. For a full player, compose the expressive media family below. |
| Weather overview | `materia-weather-glance` | The page needs a hero, forecast strip, or one detailed metric. |
| Humidity control | `materia-humidifier` | A compact humidity control is enough; use `materia-climate-panel` when the full dial-and-sections layout is wanted. |
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
- **Humidity:** `materia-humidifier` and `materia-climate-panel` support both humidifiers and
  dehumidifiers. Prefer the entity's reported limits, step size, current
  humidity, and modes; configure an external sensor only when the integration
  does not expose `current_humidity`.

## Expressive media family

Composable parts of an M3 Expressive player. Each part is its own card;
stack them, or put them in `materia-art-scope` to colour them from the cover.
Every part reads the player's `controls` attribute (a list) when it has one,
else its `supported_features`. Volume is in steps 0–99: `volume_steps` when
present, else `volume_level` × 99; the `limit` attribute caps it.

| Part | Type | Role |
|---|---|---|
| Art scope | `materia-art-scope` | Container. Colours its children from the cover; `kiosk` layout hosts a side panel. |
| Media art | `materia-media`, `variant: player` | Cover, title, artist · album, app chip. |
| Progress | `materia-media-progress`, `variant: player` | Wave up to the position, handle, drag to seek, LIVE chip. |
| Transport | `materia-button-group`, `group: transport` | Prev / play-pause / next. |
| Toolbar | `materia-button-group`, `group: toolbar` | Shuffle, repeat, volume, custom buttons. |
| Header | `materia-media-header` | Source, input, app · zone, stations + volume ring. |
| Volume | `materia-volume-knob` | Knob, arc or tap-first panel with zones and linking. |
| Volume ring | `materia-volume-ring` | 48 px button that opens the volume panel. |
| Tiles | `materia-tile-grid` | Square image tiles (`items`, `tile: logo` or `cover`, `tile_background`); the `active` one is ringed. |
| Stations | `materia-station-grid` | Alias of `materia-tile-grid` for `stations:`; white square logos. |

**Configure once, inherit everywhere.** Inside a `materia-art-scope`:
- media cards without an `entity` take the scope's entity, also inside stacks;
- the volume ring, the toolbar's volume button, the header's ring and the
  kiosk volume panel use the scope's `volume:` block (`zones`,
  `link_entity`, `style`) unless they have their own;
- without any `volume:` block the volume panel has one zone, the card's own
  entity, and zone names default to the friendly name.

So a plain `group: toolbar` with only `entity` (or none, inside a scope)
already has a working volume button. Every editor edits these settings with
HA selectors (zones, link switch, style picker, button and station lists), so
no YAML is needed in normal use.

Buttons that open something (volume ring, toolbar volume, header stations,
toolbar buttons with `card:`) open it in a **bottom sheet**. Inside a
`materia-art-scope` with `layout: kiosk` that is at least 900 px wide, they
open the kiosk's **side panel** instead.

### materia-art-scope

Sets the `--md-sys-color-*` tokens (plus HA's primary/text colours) from the
cover. Colours are computed in the browser with the theme's own
material-color-utilities build and the user's `material_you_*` helpers
(per user, then global).

```yaml
type: custom:materia-art-scope
entity: media_player.arcam_living
layout: stack            # stack | row | grid | kiosk
columns: 2               # grid: a number or a grid-template-columns string
gap: 16
background: true         # false: colours only, no surface
volume:                  # inherited by every volume button inside
  zones:
    - { entity: media_player.arcam_living, name: Living }
    - { entity: media_player.arcam_eetkamer_keuken }      # name: the friendly name
  link_entity: switch.arcam_zones_koppelen
  style: knob            # knob | arc | tap
cards: [ … ]
```

A phone player:

```yaml
type: custom:materia-art-scope
entity: media_player.arcam_living
volume:
  zones: [ { entity: media_player.arcam_living, name: Living }, { entity: media_player.arcam_eetkamer_keuken } ]
  link_entity: switch.arcam_zones_koppelen
cards:
  - type: custom:materia-media-header
    stations: [ { name: Radio 1, image: /local/radio/radio1.png, action: script.radio_1 } ]
  - { type: custom:materia-media, variant: player }
  - { type: custom:materia-media-progress, variant: player }
  - { type: custom:materia-button-group, group: transport }
  - { type: custom:materia-button-group, group: toolbar }
```

`grid` and `row` stack below 600 px.

`kiosk` places the first card as the cover and the rest as the player column,
at exactly 50/50.
- **Height:** it fills the viewport below HA's header (a panel view or a
  full-width section) and centres its content vertically; `fill: false` opts
  out. The cover is a square that fits both its column and the height (at most
  560 px).
- **Side panel:** opening it gives a three-column layout. The panel takes
  320–400 px; the cover shrinks first (400 down to 200 px) so the player keeps
  at least 360 px.
- **Too narrow:** when even that doesn't fit (below about 930 px of content
  width), the buttons open a bottom sheet instead; below 600 px the kiosk
  stacks. One measurement, the kiosk's own content width, decides all of it.
- **Closing:** after `panel_timeout` seconds without a touch (default 10,
  0 = never), on a second tap of its button, or on ×.
- **Overrides:** `panels.<id>` is merged over what a button asks for. The ids
  are `volume` and `stations`, plus any `panel:` of a custom toolbar button.
- **Type:** in the kiosk the player title is headline-medium (28/36, two
  lines) and the byline title-large (22/28). The app chip moves to the
  header chip, which shows the source plus the app only when the app differs
  from both the title and the source.
- **Solo volume:** when the toolbar has only the volume button (TV, radio), the
  kiosk shows it as a compact 56 px volume ring next to the transport, not the
  phone's wide "Volume NN" pill.

```yaml
type: custom:materia-art-scope
entity: media_player.arcam_living
layout: kiosk
padding: 32
gap: 20
panel_timeout: 10
panels:
  volume: { style: tap }   # the kiosk panel taps; phones keep the knob
volume:
  zones: [ { entity: media_player.arcam_living, name: Living }, { entity: media_player.arcam_eetkamer_keuken } ]
  link_entity: switch.arcam_zones_koppelen
cards:
  - { type: custom:materia-media, variant: player, art_size: fill, show_titles: false }
  - type: custom:materia-media-header
    variant: kiosk
    stations: [ { name: Radio 1, image: /local/radio/radio1.png, action: script.radio_1 } ]
  - { type: custom:materia-media, variant: player, show_art: false }
  - { type: custom:materia-media-progress, variant: player }
  - { type: custom:materia-button-group, group: transport }
  - type: custom:materia-button-group
    group: toolbar
    align: start
    buttons: [shuffle, repeat, { type: volume, style: ring }]
```

### materia-media — `variant: player`

```yaml
type: custom:materia-media
entity: media_player.arcam_living
variant: player
art_size: auto      # auto | fill | a number in px
art_max: 420        # largest auto / fill size (or --materia-art-max)
show_app: true      # app chip, never when it repeats the title or source
show_titles: true   # false: art only (kiosk cover)
live_logo: true     # live radio: logo on white, contained
```

`art_size: auto` sizes the cover by the space the player really has. It
measures the enclosing `materia-art-scope` (or the card alone) against the
nearest container that clips it, such as a swipe card's slide or the view.
The cover then shrinks or grows so the header, transport and toolbar stay
visible, between 136 px and `art_max`. It falls back to the viewport only when
the player is the view's main content. Further down a long column it simply
fills the width up to `art_max`.

`art_size: auto | fill` also works on the default variant. Numeric
`art_size` values keep their meaning.

### materia-media-progress — `variant: player`

```yaml
type: custom:materia-media-progress
entity: media_player.arcam_living
variant: player
```

The wave runs up to the position, then a flat track, a handle and an end dot.
Drag or tap to seek, only when `seek` is among the controls (and `seekable`
is not false). A live stream (`live` attribute, `live: true`, or the
rolling-duration latch) shows a full-width wave with a LIVE chip and no
handle. The wave lies flat while paused. Hidden while off or when there is
nothing to seek and nothing live.

### materia-button-group — media groups

`group: transport` is an M3 Expressive *standard* group of prev / play-pause /
next. The pressed button widens and its neighbours shrink. Play is the
larger tertiary-container shape, round when paused and squarer when playing;
prev/next are primary-container. Without next/previous (radio), play stands
alone. It is hidden while off. The default height is 88 px; `size: m | l | xl`
overrides it.

```yaml
type: custom:materia-button-group
group: transport
entity: media_player.arcam_living
```

`group: toolbar` is a *connected* group on its own container (the M3
Expressive toolbar). `buttons` defaults to `[shuffle, repeat, volume]`.
Shuffle and repeat show only when the player supports them; repeat cycles
off → all → one. Outer corners follow the visible buttons. When only the
volume button is left, it reads "Volume NN" at the play button's width.
`{ type: volume, style: ring }` draws the volume ring. A custom button runs
its `tap_action`, or opens `card:` (in kiosk panel `panel:`, else a sheet).
`volume:` is the config of the volume panel it opens. `align: start`
left-aligns the toolbar.

```yaml
type: custom:materia-button-group
group: toolbar
entity: media_player.arcam_living
buttons:
  - shuffle
  - repeat
  - volume
  - { icon: mdi:power, tap_action: { action: toggle } }
volume:
  zones:
    - { entity: media_player.arcam_living, name: Living }
    - { entity: media_player.arcam_eetkamer_keuken, name: Eetkamer & keuken }
  link_entity: switch.arcam_zones_koppelen
  style: knob
```

### materia-media-header

```yaml
type: custom:materia-media-header
entity: media_player.arcam_living
zone_name: Living              # default: the friendly name
stations_label: Zenders        # default: the translated "Stations"
stations: [ { name: Radio 1, image: /local/radio/radio1.png, action: script.radio_1 } ]
volume: { zones: [ … ], link_entity: switch.arcam_zones_koppelen }
# variant: kiosk  → an "input · app" chip and a labelled stations button
# show_source: false / show_volume: false
```

The source button cycles `source_list`. The stations button and the volume
ring form a connected pair.

### materia-volume-knob

```yaml
type: custom:materia-volume-knob
entity: media_player.arcam_living
style: knob          # knob | arc | tap
zones:
  - { entity: media_player.arcam_living, name: Living }
  - { entity: media_player.arcam_eetkamer_keuken, name: Eetkamer & keuken }
link_entity: switch.arcam_zones_koppelen
```

- **Knob:** turns freely, 24 steps per turn, and coasts after a flick.
  The thin outer arc shows the volume the player reports.
- **Arc:** a 270° dial with ticks.
- **Tap (tablets):** a slim level bar next to a large number.
  - A tap moves at most 5 steps toward the spot.
  - Holding − or + repeats.
  - The zone buttons show every zone's value.
  - The link chip reads "gekoppeld −15" or "los".

In every style, "limiet N" appears in the error colour from the `limit`
attribute. The zone link line shows the second zone's value and `offset`.

### materia-volume-ring

```yaml
type: custom:materia-volume-ring
entity: media_player.arcam_living
volume: { zones: [ … ], link_entity: switch.arcam_zones_koppelen }
```

### materia-station-grid

```yaml
type: custom:materia-station-grid
entity: media_player.arcam_living     # rings the station that plays now
columns: 3                            # default: as many as fit
stations:
  - name: Radio 1
    image: /local/radio/radio1.png
    match: [Radio 1]                  # default: the name, against album / title / channel
    tap_action: { action: perform-action, perform_action: script.radio_1 }
  - { name: Klara, image: /local/radio/klara.png, action: script.klara, data: {} }
```

In a sheet, a tap runs the action and closes the sheet. In a kiosk panel the
panel stays open until its timer closes it.

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
