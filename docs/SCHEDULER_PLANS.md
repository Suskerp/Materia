# One-time schedules and plans

## One moment (the simple path)

Pick "One moment" as what the card is for in the visual editor, give it a
title and add what should happen. Each step is an action from Home
Assistant's own action picker, at the moment itself or some time before or
after it. The editor writes:

```yaml
type: custom:materia-schedule
presentation: moment
name: I'm arriving home
manager_tag: materia_moment_k3x9qa   # generated, keeps this card's entries together
steps:
  - offset_minutes: -180
    action:
      action: perform-action
      perform_action: climate.set_hvac_mode
      target: { entity_id: climate.living_room }
      data: { hvac_mode: heat }
  - offset_minutes: 0
    action:
      action: perform-action
      perform_action: light.turn_on
      target: { entity_id: light.hallway }
```

The card shows "Not scheduled" until someone picks a date and time. Saving
creates one Scheduler entry per step (`repeat_type: single`, start-only
timeslot, `start_date` = `end_date`). Scheduler deletes each entry after it has
run, so once the last step has run the card is back to "Not scheduled" without
any clean-up action. An entry that missed its moment (Home Assistant was down)
is not shown as scheduled. Quick-pick chips (`presets`) and the "When…" tab
(`triggers`) are optional and appear only when configured.

## Manager

This feature is local-only until it is deliberately added to a dashboard and
deployed. Existing `materia-schedule` cards remain recurring-window cards,
because the new modes are opt-in through `schedule_types`.

```yaml
type: custom:materia-schedule
presentation: manager
manage_schedules: true
editor_presentation: popup
name: Planning
manager_tag: materia_house_plans
schedule_types:
  - once
  - window
  - plan
targets:
  - entity: switch.example
    name: Example device
    actions:
      - service: switch.turn_on
        label: Turn on
      - service: switch.turn_off
        label: Turn off
plans:
  - key: coming_home
    name: Coming home
    icon: m3o:home
    phases:
      - name: Prepare the house
        offset_minutes: -120
        action:
          service: script.turn_on
          entity_id: script.prepare_home
      - name: Set home mode
        offset_minutes: 0
        action:
          service: script.turn_on
          entity_id: script.arrive_home
```

Each plan phase becomes a separate Scheduler entry with `repeat_type: single`,
one start-only timeslot, and a date period limited to that day. The entries
share a generated `materia_plan_*` tag, so the manager presents, toggles, edits,
and deletes them as one plan. The arrival timestamp is stored separately from
the phase timestamp, allowing an edited plan to preserve its configured
offsets.

The scripts must be short, immediate action bundles. Do not place multi-hour
delays in them: Scheduler owns the long-lived timing so Home Assistant restarts
do not lose an in-progress plan.
