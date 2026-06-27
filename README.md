# Materia

Material You card collection for Home Assistant.

## Overview

Materia is an opinionated collection of native [Lit](https://lit.dev/) custom cards styled with Material You (M3) design tokens. Born from patterns that emerged while building dashboards with off-the-shelf cards, Materia distills those layouts and interactions into standalone components -- no wrapping, no template cards, no dependencies on other custom cards.

The collection is split into two categories:

- **Cards** -- Dashboard content cards: a universal entity card, rooms, climate, weather, and an icon row.
- **Elements** -- Smaller UI primitives: badges, pills, button groups, checkboxes, icon buttons, and dropdown menus.

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
      "on-warning-container": "#745D00"
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

A weather card showing temperature, a condition icon, and optional humidity.

```yaml
type: custom:materia-weather
entity: weather.home
name: Weather
humidity_entity: sensor.outdoor_humidity
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Weather entity ID |
| `name` | string | temperature | Display name. *Templatable* |
| `icon` | string | condition icon | Icon override. *Templatable* |
| `humidity_entity` | string | | Humidity sensor (falls back to the weather entity's humidity attribute) |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-icon-row`

A horizontal row of `materia-icon-button`s -- handy for media transport or scene shortcuts.

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
| `buttons` | array | **required** | Array of button configs (see `materia-icon-button` options: `icon`, `variant`, `size`, `entity`, `disabled`, `tap_action`) |

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

#### `materia-icon-button`

An M3 icon button with four variants and optional state-based action mapping.

```yaml
type: custom:materia-icon-button
icon: mdi:play
variant: filled
size: default
entity: media_player.living_room
tap_action_map:
  playing:
    action: call-service
    service: media_player.media_pause
    service_data: { entity_id: media_player.living_room }
  default:
    action: call-service
    service: media_player.media_play
    service_data: { entity_id: media_player.living_room }
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon` | string | **required** | Icon. *Templatable* |
| `variant` | string | `filled` | `standard`, `outlined`, `filled`, `filled-tonal` |
| `size` | string | `default` | `default` (48px) or `large` (56px) |
| `entity` | string | | Entity ID (used for toggle and state maps) |
| `disabled` | string | | Template returning `true`/`false` to disable the button |
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
