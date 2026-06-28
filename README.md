# Materia

Material You / Expressive card collection for Home Assistant.

## Overview

Materia is an opinionated collection of native [Lit](https://lit.dev/) custom cards styled with Material You (M3) design tokens. Born from patterns that emerged while building dashboards with off-the-shelf cards, Materia distills those layouts and interactions into standalone components -- no wrapping, no template cards, no dependencies on other custom cards.

The collection is split into two categories:

- **Cards** -- Dashboard content cards: a universal entity card, rooms, climate, weather, now-playing media + a wavy media seek bar, and an icon row.
- **Elements** -- Smaller UI primitives: M3 buttons, button groups, vertical button stacks, badges, pills, checkboxes, and dropdown menus.

Key capabilities:

- **Universal entity card** -- one `materia-card` auto-detects the domain (light, cover, switch, lock, vacuum, climate, scene, …) and adapts its controls, colors, and active state.
- **Visual editor** -- every card ships a sectioned GUI editor with an icon picker, a Material You color picker, and a per-field `</>` toggle that flips any field between a friendly control and a Jinja template.
- **Jinja2 templates** -- `name`, `subtitle`, `icon`, `color`, and `color_on` accept templates (rendered via Home Assistant's template REST API), so any field can be dynamic.
- **Domain-aware active states** -- each domain maps to its own "active" state and accent colors (vacuum = cleaning, lock = locked, cover = open, climate = heat, …).
- **Smart sliders** -- dimmable lights and covers render a drag slider; non-dimmable entities render a tap toggle.

## Prerequisites

- Home Assistant 2024.1 or later
- [material-you-utilities-custom-harmonization](https://github.com/Suskerp/material-you-utilities-custom-harmonization) -- required for theming. This fork of material-you-utilities provides the semantic color tokens Materia depends on.

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant.
2. Go to **Frontend** and select the three-dot menu, then **Custom repositories**.
3. Add the repository URL and choose category **Dashboard**.
4. Search for "Materia" and install.

### Manual

1. Download `dist/materia.js` from this repository.
2. Copy it to `config/www/community/materia/materia.js`.
3. Add the resource in **Settings > Dashboards > Resources**:

```yaml
url: /local/community/materia/materia.js
type: module
```

## Custom Colors

Materia expects a set of semantic custom-color tokens provided by the material-you-utilities setup. These are mapped to CSS custom properties such as `--md-sys-cust-color-light`, `--md-sys-cust-color-device-container`, etc.

### Default colors included

The canonical palette lives at `src/custom_colors.json` and the build copies it into `dist/custom_colors.json` on every build, so it is always present after HACS installation at:

```
/local/community/materia/custom_colors.json
```

Configure your [material-you-utilities-custom-harmonization](https://github.com/Suskerp/material-you-utilities-custom-harmonization) to reference this path for custom color harmonization. No manual file copying required.

To use your own colors, edit `src/custom_colors.json` and rebuild, edit the served file directly at `config/www/community/materia/custom_colors.json`, or point your material-you-utilities config at a JSON elsewhere.

### Color structure

```json
{
  "light": {
    "colors": {
      "light": "#FEE082",
      "on-light": "#745D00",
      "light-container": "#FEEFCA",
      "device": "#D9E2FE",
      "on-device": "#0156CF",
      "device-container": "#EDF0FF",
      "climate-heat-container": "#FFEEE9",
      "climate-heat": "#FFDFD4",
      "on-climate-heat": "#A14614",
      "climate-cool-container": "#EAF3FF",
      "climate-cool": "#D3E8FF",
      "on-climate-cool": "#327EA7",
      "climate-auto-container": "#EAF6EE",
      "climate-auto": "#D4EBDD",
      "on-climate-auto": "#2E5E44",
      "warning": "#D9A000",
      "on-warning": "#ffffff",
      "warning-container": "#FEEFCA",
      "on-warning-container": "#745D00",
      "weather-sun": "#F2B500",
      "weather-cloud": "#9FA9B7",
      "weather-cloud-dark": "#6F7A8A",
      "weather-rain": "#2E86E0",
      "weather-snow": "#AEB8C4",
      "weather-moon": "#5961C2"
    }
  },
  "dark": { "colors": { "...": "see src/custom_colors.json" } }
}
```

The semantic color names used across Materia cards are: `light`, `device`, `climate-heat`, `climate-cool`, `climate-auto`, `water-eco`, `water-performance`, `warning`, and their `on-*` / `*-container` variants. These are surfaced (with swatches) in the color picker of every card editor, alongside the standard `--md-sys-color-*` system roles.

## Card Reference

### Cards

---

#### `materia-card`

The universal entity card. It auto-detects the entity's domain and adapts: dimmable lights and covers get a drag slider, covers get up/stop/down sub-buttons, scenes render tonal, and each domain maps to its own active state and accent colors. Numeric sensor states are rounded to 2 decimals and shown with their unit. `entity` is **optional** -- omit it for a navigation/action tile (icon + name + subtitle + `tap_action`).

```yaml
type: custom:materia-card
entity: light.living_room
name: Living Room
icon: mdi:sofa
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | | Entity ID. **Optional** -- omit for a navigation/action tile |
| `name` | string | friendly name | Display name. *Templatable* |
| `subtitle` | string | | Secondary line. *Templatable* |
| `subtitle_inline` | boolean | `true` | Render the subtitle on the state line as `State · Subtitle`. Set `false` to stack it on its own row |
| `icon` | string | domain / entity default | Icon to show. *Templatable* |
| `color` | string | domain color | Background color when active. *Templatable* |
| `color_on` | string | domain color | Text/icon color when active. *Templatable* |
| `show_state` | boolean | `true` | Show the entity state text |
| `show_last_changed` | boolean | `false` | Append relative "x ago" to the state line |
| `show_slider` | boolean | auto | Force the brightness/position slider on or off (lights/covers) |
| `slider_turn_off` | boolean | `false` | Allow the light slider to reach 0% and turn the light off |
| `show_sub_buttons` | boolean | auto (cover) | Show the auto cover up/stop/down buttons |
| `show_stop` | boolean | `true` | Include the stop button on cover sub-buttons |
| `active_state` | string \| list | domain default | Override the state(s) considered "active" |
| `sub_buttons` | array | | Custom buttons `{ icon, name, tap_action }` (overrides the auto cover buttons) |
| `tap_action` | object | toggle | Tap action. `navigate` adds a chevron |

See [Domain-aware active states](#domain-aware-active-states) for the auto-detected behavior per domain.

---

#### `materia-room`

A room card built on `materia-card` (so it accepts all of its title-row options) with an expandable grid of child cards. The title row reflects/controls the primary entity; tapping the body toggles or runs `tap_action`.

```yaml
type: custom:materia-room
entity: light.living_room
name: Living Room
icon: mdi:sofa
columns: 2
cards:
  - type: custom:materia-card
    entity: light.floor_lamp
    name: Floor Lamp
  - type: custom:materia-card
    entity: light.table_lamp
    name: Table Lamp
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| *(all `materia-card` title-row options)* | | | `name`, `subtitle`, `icon`, `color`, `color_on`, `show_state`, `subtitle_inline`, `tap_action`, … |
| `entity` | string | **required** | Primary entity for the title row (typically a light group) |
| `columns` | number | `2` | Number of columns in the child grid |
| `cards` | array | | Child card configs rendered in the grid |

---

#### `materia-climate`

A climate thermostat card with mode-based theming (heat / cool / auto / off) and `±` temperature controls. The status line shows current / humidity / outdoor temperatures, including when the thermostat is off.

```yaml
type: custom:materia-climate
entity: climate.living_room
name: Living Room
step: 0.5
humidity_entity: sensor.living_room_humidity
outdoor_temp_entity: sensor.outdoor_temperature
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Climate entity ID |
| `name` | string | **required** | Display name. *Templatable* |
| `temperature_entity` | string | | Current-temperature sensor (defaults to the climate entity's `current_temperature`) |
| `humidity_entity` | string | | Humidity sensor shown in the status line |
| `outdoor_temp_entity` | string | | Outdoor-temperature sensor shown in the status line |
| `step` | number | `0.5` | Temperature adjustment step |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-weather`

A compact weather pill showing a name, a condition icon, and an inline state line (temperature · condition · humidity).

```yaml
type: custom:materia-weather
entity: weather.home
name: Weather
show_temperature: true
temperature_entity: sensor.outdoor_temperature
humidity_entity: sensor.outdoor_humidity
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Weather entity ID |
| `name` | string | temperature | Display name. *Templatable* |
| `icon` | string | condition icon | Icon override. *Templatable* |
| `show_temperature` | boolean | `true` | Show the temperature inline on the state line |
| `temperature_entity` | string | | Temperature sensor (overrides the weather entity's temperature attribute) |
| `humidity_entity` | string | | Humidity sensor (falls back to the weather entity's humidity attribute) |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-weather-tile`

A large, diagonally-tilted weather tile inspired by the Pixel weather widget -- a big temperature, an optional small min/max subscript, and a **colored** condition icon. Uses the M3 **pill** shape ([Material 3 shape](https://m3.material.io/styles/shape)) and defaults to the same surface color as `materia-clock`, so the two read as a matching set. The condition icons are drawn with the harmonized `--md-sys-cust-color-weather-*` colors (see [Custom Colors](#custom-colors)). The tilt/size/position layout is fixed; only the entity, min/max, mirror, and colors are configurable.

```yaml
type: custom:materia-weather-tile
entity: weather.home
temperature_entity: sensor.outdoor_temperature
show_minmax: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Weather entity ID |
| `temperature_entity` | string | | Temperature sensor (overrides the weather entity's temperature attribute) |
| `show_minmax` | boolean | `true` | Show today's min/max as a small subscript (from `high_entity`/`low_entity`, else the weather entity's daily forecast) |
| `high_entity` | string | | High-temperature sensor override |
| `low_entity` | string | | Low-temperature sensor override |
| `mirror` | boolean | `false` | Mirror the layout (temperature left, icon right) |
| `icon` | string | colored glyph | Override with a monochrome HA icon instead of the colored glyph. *Templatable* |
| `color` | string | `surface-container-high` | Blob background. *Color picker / templatable* |
| `color_on` | string | `primary` | Temperature / text color. *Color picker / templatable* |
| `minmax_color` | string | text color | Min/max subscript color. *Color picker / templatable* |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-clock`

A Material You analog clock. Supports the **12-sided cookie** face ([Material 3 shape](https://m3.material.io/styles/shape)), hour numerals or dots, a large faint digital readout, and a date label that drifts into the largest gap between the hands and curves along the rim (Pixel-clock style).

```yaml
type: custom:materia-clock
cookie: true
numbers: dots
digital: true
date: true
second_dot: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cookie` | boolean | `false` | 12-sided cookie face instead of a plain circle |
| `numbers` | string | `cardinal` | `cardinal` (12·3·6·9), `all` (1-12), `dots` (hour markers), or `none` |
| `show_seconds` | boolean | `true` | Show the second hand |
| `second_dot` | boolean | `false` | Render the second indicator as a rim dot instead of a hand |
| `smooth` | boolean | `false` | Sweeping (smooth) second hand |
| `digital` | boolean | `false` | Large faint HH/MM readout behind the hands |
| `date` | boolean | `false` | Date label placed in the largest gap between the hands |
| `hand_width` | number | `5` | Hand thickness (1-12) |
| `size` | number | `10` | Size 1-10 (10 = fill the card) |
| `face_color` / `number_color` / `hand_color` / `second_color` | string | theme | Color overrides. *Color picker / templatable* |

---

#### `materia-icon-row`

A horizontal row of `materia-button`s -- handy for media transport or volume controls. Buttons auto-center; mark a button `wide: true` to let it grow.

```yaml
type: custom:materia-icon-row
gap: 8
padding: 4
buttons:
  - icon: mdi:skip-previous
    variant: filled-tonal
    tap_action:
      action: call-service
      service: media_player.media_previous_track
      service_data: { entity_id: media_player.living_room }
  - icon: mdi:play-pause
    variant: filled
    entity: media_player.living_room
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `gap` | number | `8` | Horizontal gap between buttons (px) |
| `padding` | number | `4` | Vertical padding of the row (px) |
| `buttons` | array | **required** | Array of `materia-button` configs (`icon`, `label`, `variant`, `size`, `shape`, `wide`, `entity`, `disabled`, `tap_action`, …) |

---

### Elements

---

#### `materia-badge`

A compact Material You badge for the view's badge area, with color variants, optional state text, and templated colors. Includes a special `battery` variant.

```yaml
type: custom:materia-badge
entity: lock.front_door
name: Front Door
icon: m3o:lock
variant: primary-container
show_state: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | **required** | Badge label. *Templatable* |
| `icon` | string | **required** | Icon to display. *Templatable* |
| `entity` | string | | Entity ID (enables state / active logic) |
| `variant` | string | `primary` | See variants below |
| `show_state` | boolean | `false` | Show the entity state |
| `active_state` | string | | State considered active |
| `state_display` | string | | Custom state text. *Templatable* |
| `color` | string | | Background override when active. *Templatable* |
| `color_on` | string | | Text/icon override when active. *Templatable* |
| `tap_action` | object | `{ action: "toggle" }` | Tap action |
| `double_tap_action` | object | `{ action: "none" }` | Double-tap action |

**Variants:** `primary`, `secondary`, `tertiary`, `error`, `device`, `primary-container`, `secondary-container`, `error-container`, `device-container`, `primary-state`, `secondary-state`, `tertiary-state`, `error-state`, `device-state`, `battery`.

---

#### `materia-pill`

A compact info pill showing icon, name, and state, with active-state coloring and optional numeric range-to-label classification (useful for AQI, CO₂, soil moisture, …).

```yaml
type: custom:materia-pill
entity: sensor.air_quality
name: Air Quality
icon: mdi:air-filter
ranges:
  - max: 50
    label: Good
    color: var(--md-sys-cust-color-water-eco)
  - max: 100
    label: Moderate
    color: var(--md-sys-cust-color-warning-container)
  - label: Poor
    color: var(--md-sys-color-error-container)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | friendly name | Display name. *Templatable* |
| `icon` | string | | Icon to show. *Templatable* |
| `state_display` | string | | Custom state text. *Templatable* |
| `color` | string | | Background when active. *Templatable* |
| `color_on` | string | | Text/icon when active. *Templatable* |
| `background` | boolean | `true` | Render the filled pill background |
| `ranges` | array | | `{ max, label, color }` entries; the first whose `max ≥ value` (or with no `max`) wins |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-button-group`

An M3 connected button group rendered as a segmented pill. Selection is driven by an entity's state or attribute. Supports single- or multi-select.

```yaml
type: custom:materia-button-group
entity: input_select.hvac_mode
preset: climate-heat
size: m
variant: filled
options:
  - label: Heat
    value: heat
    icon: mdi:fire
    tap_action:
      action: call-service
      service: climate.set_hvac_mode
      service_data: { entity_id: climate.living_room, hvac_mode: heat }
  - label: Cool
    value: cool
    icon: mdi:snowflake
    tap_action:
      action: call-service
      service: climate.set_hvac_mode
      service_data: { entity_id: climate.living_room, hvac_mode: cool }
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `options` | array | **required** | Button options `{ label, value, icon, tap_action }` |
| `entity` | string | | Entity whose state/attribute determines the active button |
| `attribute` | string | | Entity attribute to read instead of state |
| `preset` | string | | Color preset: `primary`, `secondary`, `tertiary`, `light`, `device`, or `custom` |
| `size` | string | `m` | Button height: `xs`, `s`, `m`, `l`, `xl` |
| `variant` | string | `filled` | Surface style: `filled` or `tonal` |
| `multi_select` | boolean | `false` | Allow multiple active buttons (wraps into a grid) |
| `columns` | number | | Max columns when `multi_select` is on |
| `color_active` | string | | Active background (when `preset: custom`). *Templatable* |
| `color_on_active` | string | | Active text color (when `preset: custom`). *Templatable* |

---

#### `materia-checkbox`

A checkbox row with custom checked-state logic and separate actions for the checked and unchecked states.

```yaml
type: custom:materia-checkbox
entity: input_boolean.do_not_disturb
name: Do Not Disturb
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | friendly name | Display name. *Templatable* |
| `checked_entity` | string | | Separate entity to evaluate the checked state against |
| `checked_value` | string | | Value that must be present in `checked_entity` state |
| `checked_values` | array | | Values that must ALL be present in `checked_entity` state |
| `tap_action` | object | `{ action: "toggle" }` | Default tap action |
| `tap_action_checked` | object | | Tap action when currently checked |
| `tap_action_unchecked` | object | | Tap action when currently unchecked |

---

#### `materia-button`

An M3 (expressive) button — icon and/or label, five variants, five sizes (or a custom pixel height), round/square shape, optional full-width, and shape-morphing on state. Supersedes the old `materia-icon-button` (legacy `variant`/`size` names still accepted).

```yaml
type: custom:materia-button
icon: mdi:play
variant: filled
size: m
shape: round
entity: media_player.living_room
# stateful icon — template the icon field:
# icon: "{{ 'mdi:pause' if is_state('media_player.living_room','playing') else 'mdi:play' }}"
tap_action_map:
  playing:
    action: perform-action
    perform_action: media_player.media_pause
    target: { entity_id: media_player.living_room }
  default:
    action: perform-action
    perform_action: media_player.media_play
    target: { entity_id: media_player.living_room }
```

`icon` or `label` (or both) is required.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon` | string | | Icon. *Templatable* (template it for a stateful icon) |
| `label` | string | | Text label, with or instead of an icon. *Templatable* |
| `variant` | string | `filled` | `elevated`, `filled`, `tonal`, `outlined`, `text` (legacy `filled-tonal`→tonal, `standard`→text) |
| `size` | string \| number | `m` | `xs` (32) · `s` (40) · `m` (56) · `l` (96) · `xl` (136), or a custom height in px (e.g. `72`) |
| `shape` | string | `round` | `round` (pill) or `square` (rounded-rect) |
| `wide` | boolean | `false` | Grow to fill the row width |
| `entity` | string | | Entity ID (for state maps, morph, toggle) |
| `active_state` | string \| list | domain default | State(s) considered active |
| `morph_on_active` | boolean | `false` | Swap shape (round↔square) when active |
| `disabled` | string | | Template returning `true`/`false` to disable |
| `tap_action` | object | toggle (if entity) | Default tap action |
| `tap_action_map` | object | | State-to-action mapping, e.g. `{ playing: {…}, default: {…} }` |

---

#### `materia-menu`

A button that opens a dropdown of options -- useful for `input_select`/`select` entities or a list of actions.

```yaml
type: custom:materia-menu
entity: input_select.scene_mode
name: Scene
icon: mdi:palette
position: below
options:
  - label: Movie
    value: movie
    icon: mdi:movie
  - label: Relax
    value: relax
    icon: mdi:sofa
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | | Entity reflected/controlled by the menu |
| `name` | string | | Display name. *Templatable* |
| `icon` | string | | Icon to show. *Templatable* |
| `position` | string | `below` | Menu open direction: `below` or `above` |
| `options` | array | | Option entries `{ label, value, icon }` |
| `color` / `color_on` | string | | Trigger background / text. *Templatable* |
| `state_colors` | array | | Per-state colors `{ state, color, color_on }` — the matching state tints the trigger and dropdown (`state` may be a list). Set in the editor's **State colors** manager |

---

#### `materia-button-stack`

A vertical segmented button — stacked option segments (the M3 connected-buttons idea, vertical). The segment whose `value` matches the entity state is highlighted. Good for locks, alarm modes, fan speeds, etc.

```yaml
type: custom:materia-button-stack
entity: lock.front_door
name: Front Door
options:
  - icon: m3o:lock-open
    value: [unlocked, open]
    tap_action: { action: perform-action, perform_action: lock.unlock, target: { entity_id: lock.front_door } }
  - icon: m3o:lock
    value: [locked, locking]
    tap_action: { action: perform-action, perform_action: lock.lock, target: { entity_id: lock.front_door } }
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `options` | array | **required** | Segments `{ icon, label, value, tap_action }`, top→bottom |
| `entity` | string | | Drives active matching + the state label |
| `attribute` | string | | Match `value` against an attribute instead of state |
| `value` (per option) | string \| list | | Matching option highlights; omit for a plain action button |
| `show_state` | boolean | `true` | State label below the stack |
| `name` | string | | Label above. *Templatable* |
| `active_color` / `active_color_on` | string | device colors | Active-segment fill. *Templatable* |

---

#### `materia-split-button`

An [M3 Expressive split button](https://m3.material.io/components/split-button) — a leading action button plus a trailing menu button that rotates 180° and morphs its inner corner when opened, revealing a menu of related actions. Outer corners are fully rounded, the inner corner is small (the connected look), with the standard five sizes and four color variants.

```yaml
type: custom:materia-split-button
label: Living room
icon: mdi:lightbulb
variant: tonal
size: s
tap_action: { action: toggle }
options:
  - label: 100%
    icon: mdi:brightness-7
    tap_action: { action: perform-action, perform_action: light.turn_on, target: { entity_id: light.living_room }, data: { brightness_pct: 100 } }
  - label: Dim
    icon: mdi:brightness-5
    tap_action: { action: perform-action, perform_action: light.turn_on, target: { entity_id: light.living_room }, data: { brightness_pct: 30 } }
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `label` | string | | Leading button label. *Templatable* |
| `icon` | string | | Leading button icon. *Templatable* |
| `tap_action` | object | `{ action: "more-info" }` | Leading button action |
| `options` | array | | Menu items `{ icon, label, tap_action }` |
| `variant` | string | `tonal` | `filled` · `tonal` · `elevated` · `outlined` |
| `size` | string | `s` | `xs` · `s` · `m` · `l` · `xl` |
| `menu_position` | string | `bottom-right` | Menu alignment: `bottom-right` · `bottom-left` · `top-right` · `top-left` |
| `wide` | boolean | `false` | Leading button grows to fill the row (trailing stays fixed) |
| `color` / `color_on` | string | variant colors | Override background / text. *Color picker / templatable* |

---

#### `materia-media`

A now-playing card — album art, title and subtitle (all templatable).

```yaml
type: custom:materia-media
entity: media_player.living_room
fallback_image: /local/cover.jpg
art_size: 220
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Media player |
| `name` | string | `media_title` | Title. *Templatable* |
| `subtitle` | string | artist / album | Secondary line. *Templatable* |
| `image` | string | `entity_picture` | Album-art URL. *Templatable* |
| `fallback_image` | string | | Shown when there's no art |
| `show_art` | boolean | `true` | Show the album art |
| `art_size` | number | `240` | Max art size (px) |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-media-progress`

A wavy (M3 expressive) media seek bar — a flowing squiggle for the played portion, a flat track for the rest, elapsed/duration labels below, and tap-to-seek.

```yaml
type: custom:materia-media-progress
entity: media_player.living_room
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Media player |
| `show_times` | boolean | `true` | Elapsed / duration labels |
| `seekable` | boolean | `true` | Tap to seek |
| `color` | string | primary | Wave color. *Templatable* |

---

## Features

### Visual editor

Every card has a GUI editor organized into collapsible **Content / Appearance / Actions** sections. Editors use a searchable icon picker, a Material You color picker (theme palette first, with swatches and a custom-color escape hatch), and HA selectors instead of raw text fields. Any templatable field shows a `</>` toggle that switches it between the friendly control and a Jinja template editor; fields that already contain a `{{ … }}` template open in template mode automatically.

### Jinja2 template support

`name`, `subtitle`, `icon`, `color`, and `color_on` (and `state_display` on badges/pills) accept Jinja2 templates, rendered via Home Assistant's template REST API whenever `hass` updates.

```yaml
type: custom:materia-card
entity: sensor.cpu_temperature
icon: mdi:thermometer
show_state: true
color: >-
  {% if states('sensor.cpu_temperature') | float > 80 %}
    var(--md-sys-color-error-container)
  {% else %}
    var(--ha-card-background)
  {% endif %}
```

### Domain-aware active states

`materia-card` detects the "active" state and accent colors per domain:

| Domain | Active state | Extras |
|--------|--------------|--------|
| `light` | `on` | brightness slider when dimmable; `light` colors |
| `cover` | `open` | position slider + up/stop/down sub-buttons; `device` colors |
| `switch`, `fan`, `input_boolean` | `on` | `device` colors |
| `lock` | `locked` / `locking` | conditional lock icon; `device` colors |
| `vacuum` | `cleaning` | `device` colors |
| `climate` | `heat` | `climate-heat` colors |
| `media_player` | `playing` | `device` colors |
| `scene` | *(never)* | tonal style |
| `alarm_control_panel` | `armed_away` | `error` colors |
| *anything else* | `on` | `device` colors |

Override with `active_state`, and override colors with `color` / `color_on`.

### Action handler

All interactive cards support these `tap_action` (and `double_tap_action`) types:

- `toggle` -- toggles the entity via `homeassistant.toggle`
- `call-service` / `perform-action` -- calls a service with `service_data`/`data` and optional `target`
- `navigate` -- navigates to a path (adds a chevron to the card)
- `more-info` -- opens the entity more-info dialog
- `fire-dom-event` -- fires a `ll-custom` DOM event with the config (for browser_mod popups, etc.)
- `none` -- no action

## Example Dashboard

A minimal working example combining several Materia cards:

```yaml
views:
  - title: Home
    type: sections
    badges:
      - type: custom:materia-badge
        entity: lock.front_door
        name: Front Door
        icon: m3o:lock
        variant: primary-container
        show_state: true
    sections:
      - type: grid
        cards:
          - type: custom:materia-weather
            entity: weather.home
            humidity_entity: sensor.outdoor_humidity

          - type: custom:materia-climate
            entity: climate.living_room
            name: Living Room
            humidity_entity: sensor.living_room_humidity
            outdoor_temp_entity: sensor.outdoor_temperature

          - type: custom:materia-room
            entity: light.living_room
            name: Living Room
            icon: mdi:sofa
            columns: 2
            cards:
              - type: custom:materia-card
                entity: light.floor_lamp
                name: Floor Lamp
              - type: custom:materia-card
                entity: switch.tv
                name: TV
                icon: mdi:television

          - type: custom:materia-card
            entity: cover.living_room_blinds
            name: Blinds

          # Entity-less navigation tile
          - type: custom:materia-card
            name: Automations
            icon: m3o:automation
            subtitle: Manage your automations
            tap_action:
              action: navigate
              navigation_path: /lovelace/automations
```
