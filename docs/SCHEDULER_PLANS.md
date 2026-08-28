# One-time schedules and plans

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
