# Materia

Material You card collection for Home Assistant.

## Overview

Materia is a collection of custom Lovelace cards styled with Material You design tokens. It requires the material-you-utilities theme to provide the underlying color system and typography.

The collection is split into two categories:

- **Cards** -- Dashboard content cards for lights, covers, climate, devices, locks, rooms, sensors, and toggles.
- **Elements** -- Smaller UI primitives such as buttons, badges, chips, and checkboxes.

## Prerequisites

- Home Assistant 2024.1 or later
- [material-you-utilities](https://github.com/Nerwyn/material-you-utilities) for theming
- [material-you-utilities-custom-harmonization](https://github.com/Suskerp/material-you-utilities-custom-harmonization) -- fork with custom color harmonization support (provides the semantic color tokens Materia depends on)
- [Bubble Card](https://github.com/Clooos/Bubble-Card) -- required by the wrapper cards: `materia-light-switch`, `materia-light-dimmer`, `materia-cover`, `materia-device`, `materia-lock`, `materia-battery-low`, `materia-room`
- [Expander Card](https://github.com/Alia5/lovelace-expander-card) -- required by `materia-room` only
- [card-mod](https://github.com/thomasloven/lovelace-card-mod) -- required by `materia-room` only

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

Create (or extend) your `custom_colors.json` with the following structure:

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

#### `materia-light-switch`

A light toggle switch card. Wraps Bubble Card.

```yaml
type: custom:materia-light-switch
entity: light.living_room
name: Living Room
icon: mdi:ceiling-light
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Light entity ID |
| `name` | string | | Display name |
| `icon` | string | `mdi:track-light` | Icon to show |

Requires: Bubble Card

---

#### `materia-light-dimmer`

A dimmable light slider card with brightness control. Wraps Bubble Card.

```yaml
type: custom:materia-light-dimmer
entity: light.bedroom
name: Bedroom
icon: mdi:lamp
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Light entity ID |
| `name` | string | | Display name |
| `icon` | string | `mdi:track-light` | Icon to show |

Requires: Bubble Card

---

#### `materia-cover`

A cover card with up/stop/down controls and position slider. Wraps Bubble Card.

```yaml
type: custom:materia-cover
entity: cover.blinds
name: Blinds
show_stop: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Cover entity ID |
| `name` | string | | Display name |
| `show_stop` | boolean | `true` | Show the stop button between up/down |

Requires: Bubble Card

---

#### `materia-device`

A generic device/switch card with configurable active-state colors. Wraps Bubble Card.

```yaml
type: custom:materia-device
entity: switch.fan
name: Fan
icon: mdi:fan
active_state: "on"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | | Display name |
| `icon` | string | `mdi:power-plug` | Icon to show |
| `button_type` | string | `switch` | Bubble Card button type (`switch`, `slider`, `state`) |
| `active_state` | string | `on` | Entity state that counts as active |
| `color_active` | string | `var(--md-sys-cust-color-device)` | Background color when active |
| `color_on_active` | string | `var(--md-sys-cust-color-on-device)` | Text/icon color when active |
| `show_state` | boolean | `true` | Show entity state text |
| `tap_action` | object | | Custom tap action (passed to Bubble Card) |

Requires: Bubble Card

---

#### `materia-lock`

A lock card with conditional lock/unlock icons. Wraps Bubble Card.

```yaml
type: custom:materia-lock
entity: lock.front_door
name: Front Door
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Lock entity ID |
| `name` | string | | Display name |

Requires: Bubble Card

---

#### `materia-battery-low`

A compact low-battery alert card. Wraps Bubble Card.

```yaml
type: custom:materia-battery-low
entity: sensor.door_sensor_battery
name: Door Sensor
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Battery sensor entity ID |
| `name` | string | | Display name |

Requires: Bubble Card

---

#### `materia-room`

An expandable room section with a title row (light slider) and a grid of child cards. Wraps Expander Card, Bubble Card, and card-mod.

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
  - type: custom:materia-light-dimmer
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
| `icon` | string | | Icon for the title row |
| `columns` | number | `2` | Number of columns in the child card grid |
| `entity_type` | string | `light` | Entity type for state color logic (`light` or `cover`) |
| `color_on` | string | | Icon color when the entity is on/open |
| `attribute` | string | | Attribute to show on the slider (e.g. `brightness`) |
| `sub_button` | array | | Array of sub-button configs passed to the Bubble Card title row |
| `cards` | array | | Array of card configs rendered in the expandable grid |

Requires: Bubble Card, Expander Card, card-mod

---

#### `materia-climate`

A native climate thermostat card with mode-based theming and temperature controls.

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
| `tap_action` | object | `{ action: "more-info" }` | Custom tap action |

---

#### `materia-pill-toggle`

A two-option pill toggle that calls a service for each side.

```yaml
type: custom:materia-pill-toggle
entity: input_boolean.guest_mode
left_name: "On"
right_name: "Off"
left_state: "on"
right_state: "off"
left_service: input_boolean.turn_on
left_service_data:
  entity_id: input_boolean.guest_mode
right_service: input_boolean.turn_off
right_service_data:
  entity_id: input_boolean.guest_mode
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity whose state determines which side is active |
| `left_service` | string | **required** | Service to call on left tap (e.g. `input_boolean.turn_on`) |
| `left_service_data` | object | **required** | Service data for the left action |
| `right_service` | string | **required** | Service to call on right tap |
| `right_service_data` | object | **required** | Service data for the right action |
| `left_name` | string | `On` | Label for the left pill |
| `right_name` | string | `Off` | Label for the right pill |
| `left_state` | string | `on` | Entity state that makes the left pill active |
| `right_state` | string | `off` | Entity state that makes the right pill active |
| `color_active` | string | `var(--md-sys-color-primary)` | Background color of the active pill |
| `color_on_active` | string | `var(--md-sys-color-on-primary)` | Text color of the active pill |
| `height` | string | `88px` | Height of the pill buttons |

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
| `tap_action` | object | | Tap action (`more-info`, `navigate`, `call-service`) |

---

### Elements

---

#### `materia-button`

A compact Material You button with icon, name, optional state display, and color variants. Supports a special `battery` variant with threshold-based colors.

```yaml
type: custom:materia-button
entity: switch.desk_lamp
icon: mdi:desk-lamp
name: Desk Lamp
variant: secondary
show_state: false
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
| `tap_action` | object | `{ action: "toggle" }` | Tap action (`toggle`, `call-service`, `navigate`, `more-info`) |
| `color_on` | string | | Override background color when active |
| `color` | string | | Override text color when active (used with `color_on`) |
| `state_display` | string | | JS expression for custom state text, receives `state`, `hass`, `entity` |

---

#### `materia-select-chip`

A Material You select chip that calls `select.select_option` on tap. Border radius adapts based on position.

```yaml
type: custom:materia-select-chip
entity: input_select.hvac_mode
option: heat
label: Heat
position: left
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | `input_select` or `select` entity ID |
| `option` | string | **required** | Option value to select on tap |
| `label` | string | **required** | Chip label text |
| `position` | string | | Position hint for border radius: `left`, `right`, or omit for middle |

---

#### `materia-checkbox`

A checkbox row with name and toggle icon.

```yaml
type: custom:materia-checkbox
entity: input_boolean.do_not_disturb
name: Do Not Disturb
tap_action:
  action: toggle
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Entity ID |
| `name` | string | | Display name (falls back to entity friendly name) |
| `tap_action` | object | `{ action: "toggle" }` | Tap action (`toggle`, `call-service`, `navigate`, `more-info`) |

---

#### `materia-circle-action`

A circular action button in normal (66px) or small (52px) size.

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
| `tap_action` | object | | Tap action (`toggle`, `call-service`, `navigate`, `more-info`) |

---

#### `materia-tonal-button`

A tonal pill-shaped button with icon and label. Uses secondary-container colors.

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
| `tap_action` | object | | Tap action (`toggle`, `call-service`, `navigate`, `more-info`) |

---

#### `materia-pill-badge`

A pill-shaped badge card with active-state highlighting and outlined border.

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
| `tap_action` | object | `{ action: "more-info" }` | Tap action (`toggle`, `call-service`, `navigate`, `more-info`) |

---

## Example Dashboard

A minimal dashboard view combining several Materia cards:

```yaml
views:
  - title: Home
    type: sections
    sections:
      - type: grid
        cards:
          # Pill badges at the top
          - type: custom:materia-pill-badge
            entity: binary_sensor.front_door
            icon: mdi:door
            name: Front Door

          - type: custom:materia-pill-badge
            entity: person.john
            icon: mdi:account
            name: John
            active_state: home

          # Climate card
          - type: custom:materia-climate
            entity: climate.living_room
            name: Living Room
            humidity_entity: sensor.living_room_humidity
            outdoor_temp_entity: sensor.outdoor_temperature

          # Room with expandable child cards
          - type: custom:materia-room
            entity: light.living_room_group
            name: Living Room
            icon: mdi:sofa
            columns: 2
            color_on: "var(--md-sys-cust-color-on-light)"
            attribute: brightness
            cards:
              - type: custom:materia-light-dimmer
                entity: light.floor_lamp
                name: Floor Lamp
              - type: custom:materia-light-switch
                entity: light.table_lamp
                name: Table Lamp
              - type: custom:materia-device
                entity: switch.tv
                name: TV
                icon: mdi:television

          # Standalone light switch
          - type: custom:materia-light-switch
            entity: light.hallway
            name: Hallway
            icon: mdi:ceiling-light

          # Sensor row
          - type: custom:materia-sensor-row
            entity: sensor.indoor_temperature
            name: Indoor Temperature

          # Action buttons
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
