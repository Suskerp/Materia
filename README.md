# Materia

Material You card collection for Home Assistant.

## Overview

Materia is an opinionated collection of native [Lit](https://lit.dev/) custom cards styled with Material You (M3) design tokens. Born from patterns that emerged while building dashboards with off-the-shelf cards, Materia distills those layouts and interactions into standalone components -- no wrapping, no templates, no dependencies on other custom cards.

The collection is split into two categories:

- **Cards** -- Dashboard content cards for lights, covers, climate, devices, locks, rooms, sensors, and weather.
- **Elements** -- Smaller UI primitives: buttons, button groups, checkboxes, pills, badges, selects, and separators.

Key capabilities:

- Jinja2 template support for dynamic colors and state text (via Home Assistant's template REST API).
- Navigate chevron automatically shown when `tap_action` is set to `navigate`.
- Domain-aware active states (`materia-device` auto-detects vacuum=cleaning, lock=locked, cover=open, climate=heat, etc.).
- Auto-dimmable light detection (`materia-light` checks `supported_color_modes` and renders a slider when the light supports brightness).

## Prerequisites

- Home Assistant 2024.1 or later
- [material-you-utilities](https://github.com/Nerwyn/material-you-utilities) for theming, or the [custom harmonization fork](https://github.com/Suskerp/material-you-utilities-custom-harmonization) which provides the semantic color tokens Materia depends on

## Installation

### HACS (recommended)

1. Open HACS in Home Assistant.
2. Go to **Frontend** and select the three-dot menu, then **Custom repositories**.
3. Add the repository URL and choose category **Dashboard**.
4. Search for "Materia" and install.

### Manual

1. Download `dist/materia.js` from this repository.
2. Copy it to `config/www/materia/materia.js`.
3. Add the resource in **Settings > Dashboards > Resources**:

```yaml
url: /local/materia/materia.js
type: module
```

## Custom Colors

Materia expects a set of semantic custom-color tokens provided by the material-you-utilities setup. These are mapped to CSS custom properties such as `--md-sys-cust-color-light`, `--md-sys-cust-color-device-container`, etc.

### Default colors included

Materia ships a default `custom_colors.json` in the `dist/` folder. After HACS installation, it is available at:

```
/local/community/materia/custom_colors.json
```

Configure your [material-you-utilities-custom-harmonization](https://github.com/Suskerp/material-you-utilities-custom-harmonization) to reference this path for custom color harmonization. No manual file copying required.

To use your own colors, either edit the file directly at `config/www/community/materia/custom_colors.json`, or place a custom JSON elsewhere and point your material-you-utilities config to that path instead.

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
  "dark": {
    "colors": {
      "light": "#4F4629",
      "on-light": "#FEE080",
      "light-container": "#33312A",
      "device": "#004E58",
      "on-device": "#87F0FF",
      "device-container": "#253234",
      "climate-heat-container": "#3E3732",
      "climate-heat": "#684A3D",
      "on-climate-heat": "#EAD5D0",
      "climate-cool-container": "#373639",
      "climate-cool": "#425161",
      "on-climate-cool": "#C5D0DC",
      "climate-auto-container": "#363B36",
      "climate-auto": "#4A584F",
      "on-climate-auto": "#D2E7DA",
      "warning": "#FEE082",
      "on-warning": "#745D00",
      "warning-container": "#33312A",
      "on-warning-container": "#FEE080"
    }
  }
}
```

The semantic color names used across Materia cards are: `light`, `device`, `climate-heat`, `climate-cool`, `climate-auto`, `warning`, and their `on-*` / `*-container` variants.

## Card Reference

### Cards

---

#### `materia-light`

A unified light card that auto-detects whether the light supports brightness. Dimmable lights render a fill slider (drag to set brightness); non-dimmable lights render a simple toggle. Tap toggles the light on/off.

```yaml
type: custom:materia-light
entity: light.bedroom
name: Bedroom
icon: mdi:lamp
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Light entity ID |
| `name` | string | Entity friendly name | Display name |
| `icon` | string | `mdi:track-light` | Icon to show |
| `tap_action` | object | toggle | Tap action (supports `navigate` chevron) |

---

#### `materia-cover`

A cover card with up/stop/down controls and a position slider. Drag the card to set cover position.

```yaml
type: custom:materia-cover
entity: cover.blinds
name: Blinds
icon: mdi:window-shutter
show_stop: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Cover entity ID |
| `name` | string | Entity friendly name | Display name |
| `icon` | string | `mdi:window-shutter` | Icon to show |
| `show_stop` | boolean | `true` | Show the stop button between up/down |
| `tap_action` | object | | Tap action (supports `navigate` chevron) |

---

#### `materia-device`

A generic device/switch card with domain-aware active-state detection. Automatically maps domains to their active state (e.g. `vacuum` = `cleaning`, `lock` = `locked`, `cover` = `open`, `media_player` = `playing`). Falls back to `on` for unknown domains.

```yaml
type: custom:materia-device
entity: switch.fan
name: Fan
icon: mdi:fan
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | Entity friendly name | Display name |
| `icon` | string | `mdi:power-plug` | Icon to show |
| `button_type` | string | `switch` | Button type: `switch` or `state` |
| `active_state` | string | Domain-dependent | Entity state that counts as active |
| `color_active` | string | `var(--md-sys-cust-color-device)` | Background color when active |
| `color_on_active` | string | `var(--md-sys-cust-color-on-device)` | Text/icon color when active |
| `show_state` | boolean | `true` | Show entity state text |
| `tap_action` | object | toggle | Tap action (supports `navigate` chevron) |

---

#### `materia-lock`

A lock display card with conditional lock/unlock icons (`m3o:lock` / `m3o:lock-open-right`). Changes background to `device-container` colors when locked.

```yaml
type: custom:materia-lock
entity: lock.front_door
name: Front Door
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Lock entity ID |
| `name` | string | Entity friendly name | Display name |
| `tap_action` | object | | Tap action (supports `navigate` chevron) |

---

#### `materia-room`

An expandable room section with a title row (icon toggles the entity) and a collapsible grid of child cards. Click the row to expand/collapse.

```yaml
type: custom:materia-room
entity: light.living_room_group
name: Living Room
icon: mdi:sofa
columns: 2
entity_type: light
color_on: "var(--md-sys-cust-color-on-light)"
attribute: brightness
sub_button:
  - icon: mdi:television
    entity: switch.tv
cards:
  - type: custom:materia-light
    entity: light.floor_lamp
    name: Floor Lamp
  - type: custom:materia-device
    entity: switch.tv
    name: TV
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Primary entity for the title row (typically a light group) |
| `name` | string | | Room name |
| `icon` | string | `mdi:home` | Icon for the title row |
| `columns` | number | `2` | Number of columns in the child card grid |
| `entity_type` | string | `light` | Entity type for state logic: `light` (active = on) or `cover` (active = open) |
| `color_on` | string | `var(--md-sys-color-primary)` | Icon color when active |
| `attribute` | string | | Attribute to show as state display (e.g. `brightness` renders as percentage) |
| `sub_button` | array | | Array of sub-button configs with `icon` and `entity` (opens more-info on tap) |
| `cards` | array | | Array of card configs rendered in the expandable grid |

---

#### `materia-climate`

A climate thermostat card with mode-based theming (heat/cool/auto/off) and temperature controls.

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
| `name` | string | **required** | Display name |
| `step` | number | `0.5` | Temperature adjustment step |
| `humidity_entity` | string | | Humidity sensor entity ID (shown in status line) |
| `outdoor_temp_entity` | string | | Outdoor temperature sensor entity ID (shown in status line) |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-sensor-row`

A simple name/value row for displaying sensor data.

```yaml
type: custom:materia-sensor-row
entity: sensor.living_room_temperature
name: Temperature
padding: "0px 20px"
tap_action:
  action: more-info
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Sensor entity ID |
| `name` | string | **required** | Label text |
| `padding` | string | `0px 20px` | CSS padding for the row |
| `tap_action` | object | | Tap action (supports `navigate` chevron) |

---

#### `materia-sensor-display`

A sensor display card with optional range-to-label classification (useful for AQI, CO2, etc.).

```yaml
type: custom:materia-sensor-display
entity: sensor.aqi
name: Air Quality
icon: mdi:air-filter
unit: AQI
ranges:
  - max: 50
    label: Good
    color: green
  - max: 100
    label: Moderate
    color: orange
  - label: Poor
    color: red
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Sensor entity ID |
| `name` | string | Entity friendly name | Display name |
| `icon` | string | Entity icon | Icon to show |
| `unit` | string | Entity unit | Unit of measurement override |
| `ranges` | array | | Array of `{ max, label, color }` for range-to-label classification |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-weather`

A weather display card showing temperature, condition icon, and optional humidity.

```yaml
type: custom:materia-weather
entity: weather.home
name: Weather
humidity_entity: sensor.outdoor_humidity
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Weather entity ID |
| `name` | string | | Display name |
| `humidity_entity` | string | | Humidity sensor entity (falls back to the weather entity's humidity attribute) |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

### Elements

---

#### `materia-button`

A compact Material You badge/button with icon, name, optional state display, and color variants. Supports Jinja2 templates for `color`, `color_on`, and `state_display`. Includes a special `battery` variant with threshold-based colors.

```yaml
type: custom:materia-button
entity: switch.desk_lamp
icon: mdi:desk-lamp
name: Desk Lamp
variant: secondary
show_state: true
tap_action:
  action: toggle
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon` | string | **required** | Icon to display |
| `name` | string | **required** | Button label |
| `entity` | string | | Entity ID (optional; without it the button is stateless) |
| `variant` | string | `secondary` | Color variant: `primary`, `secondary`, `tertiary`, `error`, `device`, `primary-container`, `secondary-container`, `error-container`, `device-container`, `battery` |
| `show_state` | boolean | `false` | Show entity state below the name |
| `active_state` | string | `on` | Entity state that counts as active |
| `tap_action` | object | `{ action: "toggle" }` | Tap action |
| `color` | string | | Background color override when active. **Supports Jinja2 templates.** |
| `color_on` | string | | Text/icon color override when active. **Supports Jinja2 templates.** |
| `state_display` | string | | Custom state text. **Supports Jinja2 templates.** |

---

#### `materia-button-group`

An M3 connected button group rendered as a segmented pill. Buttons receive position-aware corner radii. Selection state is driven by entity state or attribute.

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
      service_data:
        entity_id: climate.living_room
        hvac_mode: heat
  - label: Cool
    value: cool
    icon: mdi:snowflake
    tap_action:
      action: call-service
      service: climate.set_hvac_mode
      service_data:
        entity_id: climate.living_room
        hvac_mode: cool
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | | Entity whose state (or attribute) determines the active button |
| `attribute` | string | | Entity attribute to read instead of state |
| `options` | array | **required** | Array of button options (see below) |
| `size` | string | `m` | Button height: `xs` (32dp), `s` (40dp), `m` (48dp), `l` (56dp), `xl` (64dp) |
| `variant` | string | `filled` | Surface style: `filled`, `tonal`, `outlined`, `elevated` |
| `preset` | string | | Color preset: `primary`, `secondary`, `climate-heat`, `climate-cool`, `climate-auto`, `light`, `device` |
| `color_active` | string | | Override active background color |
| `color_on_active` | string | | Override active text color |

Each **option** object:

| Option | Type | Description |
|--------|------|-------------|
| `value` | string | Value to match against entity state/attribute |
| `label` | string | Button label text |
| `icon` | string | Optional icon |
| `tap_action` | object | Action to perform on tap |

---

#### `materia-checkbox`

A checkbox row with name and toggle icon. Supports custom checked-state logic via `checked_entity` / `checked_value` / `checked_values`, and separate actions for checked and unchecked states.

```yaml
type: custom:materia-checkbox
entity: input_boolean.do_not_disturb
name: Do Not Disturb
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | Entity friendly name | Display name |
| `checked_entity` | string | | Separate entity to evaluate checked state against |
| `checked_value` | string | | Single value that must be present in `checked_entity` state (comma-separated) |
| `checked_values` | array | | Array of values that must ALL be present in `checked_entity` state |
| `tap_action` | object | `{ action: "toggle" }` | Default tap action |
| `tap_action_checked` | object | | Tap action when currently checked |
| `tap_action_unchecked` | object | | Tap action when currently unchecked |

---

#### `materia-icon-button`

An M3 icon button with four variants and optional state-based icon and action mapping.

```yaml
type: custom:materia-icon-button
icon: mdi:play
variant: filled
size: default
entity: media_player.living_room
icon_map:
  playing: mdi:pause
  paused: mdi:play
  default: mdi:play
tap_action_map:
  playing:
    action: call-service
    service: media_player.media_pause
    service_data:
      entity_id: media_player.living_room
  default:
    action: call-service
    service: media_player.media_play
    service_data:
      entity_id: media_player.living_room
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon` | string | **required** | Default icon |
| `variant` | string | `filled` | M3 variant: `standard`, `outlined`, `filled`, `filled-tonal` |
| `size` | string | `default` | Size: `default` (48px) or `large` (56px) |
| `entity` | string | | Entity ID (used for toggle and state-based maps) |
| `icon_map` | object | | State-to-icon mapping (e.g. `{ "playing": "mdi:pause", "default": "mdi:play" }`) |
| `tap_action` | object | toggle (if entity) | Tap action |
| `tap_action_map` | object | | State-to-action mapping (e.g. `{ "playing": { action: "call-service", ... } }`) |

---

#### `materia-pill`

A compact info pill card showing icon, name, and state. Colors change based on entity active state.

```yaml
type: custom:materia-pill
entity: binary_sensor.motion
name: Motion
icon: mdi:motion-sensor
color: "var(--md-sys-cust-color-device)"
color_on: "var(--md-sys-cust-color-on-device)"
tap_action:
  action: more-info
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | Entity friendly name | Display name |
| `icon` | string | `mdi:information-outline` | Icon to show |
| `color` | string | | Background color when active. **Supports Jinja2 templates.** |
| `color_on` | string | | Text/icon color when active. **Supports Jinja2 templates.** |
| `tap_action` | object | `{ action: "more-info" }` | Tap action (supports `navigate` chevron) |

---

#### `materia-pill-badge`

A small pill-shaped badge with outlined border and active-state highlighting.

```yaml
type: custom:materia-pill-badge
entity: binary_sensor.front_door
icon: mdi:door
name: Front Door
active_state: "on"
tap_action:
  action: more-info
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `icon` | string | **required** | Icon to display |
| `name` | string | **required** | Badge label |
| `active_state` | string | `on` | Entity state that counts as active |
| `tap_action` | object | `{ action: "more-info" }` | Tap action |

---

#### `materia-select`

A dropdown select card for `input_select` and `select` entities. Shows the current option and a native `<select>` dropdown to change it.

```yaml
type: custom:materia-select
entity: input_select.wash_cycle
name: Wash Cycle
icon: mdi:washing-machine
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | `input_select` or `select` entity ID |
| `name` | string | Entity friendly name | Display name |
| `icon` | string | | Icon to show |

---

#### `materia-separator`

A horizontal line divider with an optional centered label.

```yaml
type: custom:materia-separator
label: Settings
color: "var(--md-sys-color-outline-variant)"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `label` | string | | Optional centered label text |
| `color` | string | `var(--md-sys-color-outline-variant)` | Line color |

---

#### `materia-tonal-button`

A tonal pill-shaped button with icon and label. Uses `secondary-container` colors with M3 hover/active state layers.

```yaml
type: custom:materia-tonal-button
icon: mdi:lightbulb-group
name: All Lights
tap_action:
  action: navigate
  navigation_path: /lovelace/lights
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon` | string | **required** | Icon to display |
| `name` | string | **required** | Button label |
| `entity` | string | | Entity ID (used by toggle action) |
| `tap_action` | object | | Tap action |

---

#### `materia-circle-action`

A circular action button. Legacy component kept for compatibility; prefer `materia-icon-button` for new dashboards.

```yaml
type: custom:materia-circle-action
icon: mdi:play
size: normal
tap_action:
  action: call-service
  service: media_player.media_play
  service_data:
    entity_id: media_player.living_room
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon` | string | **required** | Icon to display |
| `size` | string | `normal` | Button size: `normal` (66px) or `small` (52px) |
| `entity` | string | | Entity ID (used by toggle action) |
| `tap_action` | object | | Tap action |

---

## Features

### Jinja2 Template Support

The `materia-button` and `materia-pill` cards support Jinja2 templates in the `color`, `color_on`, and `state_display` fields. Templates are rendered via Home Assistant's template REST API whenever `hass` updates.

```yaml
type: custom:materia-button
entity: sensor.cpu_temperature
icon: mdi:thermometer
name: CPU
show_state: true
state_display: "{{ states('sensor.cpu_temperature') }}C"
color: >-
  {% if states('sensor.cpu_temperature') | float > 80 %}
    var(--md-sys-color-error-container)
  {% else %}
    var(--ha-card-background)
  {% endif %}
color_on: >-
  {% if states('sensor.cpu_temperature') | float > 80 %}
    var(--md-sys-color-on-error-container)
  {% else %}
    var(--primary-text-color)
  {% endif %}
```

### Navigate Chevron

Cards that use the `ActionMixin` automatically render a right-chevron icon when `tap_action.action` is set to `navigate`. This applies to: `materia-light`, `materia-cover`, `materia-device`, `materia-lock`, `materia-sensor-row`, and `materia-pill`.

### Domain-Aware Active States

`materia-device` automatically detects the appropriate "active" state based on the entity domain:

| Domain | Active State |
|--------|-------------|
| `light`, `switch`, `fan`, `binary_sensor`, `input_boolean` | `on` |
| `vacuum` | `cleaning` |
| `lock` | `locked` |
| `cover` | `open` |
| `climate` | `heat` |
| `media_player` | `playing` |

This can be overridden with the `active_state` config option.

### Action Handler

All interactive cards support the following `tap_action` types:

- `toggle` -- toggles the entity via `homeassistant.toggle`
- `call-service` / `perform-action` -- calls a service with `service_data`/`data` and optional `target`
- `navigate` -- navigates to a path
- `more-info` -- opens the entity more-info dialog
- `none` -- no action

## Example Dashboard

A minimal working example combining several Materia cards:

```yaml
views:
  - title: Home
    type: sections
    sections:
      - type: grid
        cards:
          - type: custom:materia-pill-badge
            entity: binary_sensor.front_door
            icon: mdi:door
            name: Front Door

          - type: custom:materia-pill-badge
            entity: person.john
            icon: mdi:account
            name: John
            active_state: home

          - type: custom:materia-weather
            entity: weather.home
            humidity_entity: sensor.outdoor_humidity

          - type: custom:materia-climate
            entity: climate.living_room
            name: Living Room
            humidity_entity: sensor.living_room_humidity
            outdoor_temp_entity: sensor.outdoor_temperature

          - type: custom:materia-room
            entity: light.living_room_group
            name: Living Room
            icon: mdi:sofa
            columns: 2
            color_on: "var(--md-sys-cust-color-on-light)"
            attribute: brightness
            cards:
              - type: custom:materia-light
                entity: light.floor_lamp
                name: Floor Lamp
              - type: custom:materia-light
                entity: light.table_lamp
                name: Table Lamp
              - type: custom:materia-device
                entity: switch.tv
                name: TV
                icon: mdi:television

          - type: custom:materia-light
            entity: light.hallway
            name: Hallway
            icon: mdi:ceiling-light

          - type: custom:materia-sensor-row
            entity: sensor.indoor_temperature
            name: Indoor Temperature

          - type: custom:materia-button
            entity: switch.desk_lamp
            icon: mdi:desk-lamp
            name: Desk
            variant: secondary

          - type: custom:materia-tonal-button
            icon: mdi:lightbulb-group
            name: All Lights
            tap_action:
              action: navigate
              navigation_path: /lovelace/lights
```

## Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Watch for changes during development
npm run watch
```

The build output is written to `dist/materia.js`.

## License

MIT
