# Changelog

All notable changes to Materia. Versions follow [semver](https://semver.org); the version
lives in `package.json` and is stamped into the bundle at build time. Each release is a git
tag `vX.Y.Z` with a GitHub release carrying the section below, which is what the Home
Assistant Marketplace shows as the update's release notes.

Every release starts with **Breaking changes**: what an existing dashboard has to change,
or "None" when nothing does.

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
