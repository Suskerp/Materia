import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaLockEditor extends SmartEditorBase {
  /* Switches must be seeded with the card's own defaults. An option that
     defaults to TRUE but is absent from config arrives as `undefined`, which
     ha-form draws as OFF — so the toggle claims the feature is disabled when it
     is actually on, and merely opening the editor and saving would turn it off
     for real. Config still wins, so an explicit false survives. */
  _formData() {
    return { gesture: "slide", shape: true, shape_style: "cookie9", initial_locked: true, unlock_service: "unlock", ...this._config };
  }

  /* Fields appear and disappear with the gesture and with whether an entity is
     set, so the memoized sections have to be invalidated on both. */
  _sectionsSignature() {
    return `${this._config?.gesture || "slide"}|${this._config?.entity?.split(".")[0] || ""}`;
  }

  get _sections() {
    const hold = this._config?.gesture === "hold";
    const track = this._config?.gesture === "track";
    const hasEntity = !!this._config?.entity;
    const isLock = !!this._config?.entity?.startsWith("lock.");

    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        fields: [
          {
            name: "entity",
            label: "Lock (optional)",
            helper: "Leave empty to run self-contained — the card keeps its own state, with nothing to control.",
            selector: { entity: { domain: ["lock", "switch", "input_boolean"] } },
          },
          ...(isLock && !track
            ? [{
                name: "unlock_service",
                label: "Unlatch service",
                helper: "Open is for strikes/relays that don't stay meaningfully \"unlocked\" — the door swings rather than sitting unlatched (lock.open instead of lock.unlock). Locking always uses lock.lock.",
                selector: { select: { mode: "dropdown", options: [
                  { value: "unlock", label: "Unlock (lock.unlock)" },
                  { value: "open", label: "Open (lock.open)" },
                ] } },
              }]
            : []),
          {
            name: "gesture",
            label: "Commit gesture",
            helper: track
              ? "One physical track, three stops: Locked, Unlocked (a real resting state), Open (a momentary unlatch you must drag past a detent to reach — always a drag, never a tap). The lock settling back to \"unlocked\" on its own re-centers the track with no gesture needed."
              : undefined,
            selector: { select: { mode: "dropdown", options: [
              { value: "slide", label: "Slide the handle across" },
              { value: "hold", label: "Press and hold" },
              { value: "track", label: "Drag across a 3-stop track (locked / unlocked / open)" },
            ] } },
          },
          { name: "shape", label: "Show the morphing lock shape", selector: { boolean: {} } },
          /* No silhouette picker for now: the cookie is the ONE shape whose
             symmetry period lets the in-flight spin land gracefully, so it is
             the shape the card ships with. shape_style stays supported in YAML
             (squircle/pill/gem still render) — the choice is just no longer
             advertised until another silhouette earns its place. */
        ],
      },
      {
        title: "Behaviour",
        icon: "mdi:cog-outline",
        fields: [
          ...(hold
            ? [{
                name: "hold_ms",
                label: "Hold for (ms, default 800)",
                helper: "Keep this above 500ms — the platform long-press timeout — or an ordinary long-press commits by accident.",
                selector: { number: { min: 300, max: 5000, step: 50, mode: "box" } },
              }]
            : []),
          ...(hasEntity
            ? [
                {
                  name: "locked_state",
                  label: "State that means locked",
                  helper: 'Defaults to "locked" for a lock and "off" for a switch — a relay strike is energised to release the door.',
                  selector: { text: {} },
                },
                {
                  name: "pending_timeout_ms",
                  label: "Give up waiting for the lock after (ms, default 10000)",
                  selector: { number: { min: 1000, max: 60000, step: 500, mode: "box" } },
                },
              ]
            : [{
                name: "initial_locked",
                label: "Start out locked",
                selector: { boolean: {} },
              }]),
        ],
      },
      {
        title: "Labels",
        icon: "mdi:text-short",
        fields: [
          ...(track
            ? [{
                name: "track_labels",
                label: "Show Locked / Unlocked / Open captions under the track",
                helper: "Off by default — the track's icon and position already say what it's doing; captions are an extra, opt-in explanation.",
                selector: { boolean: {} },
              }]
            : hold
            ? [
                { name: "unlock_hold_hint", label: 'While locked (default "Hold to unlock")', selector: { text: {} } },
                { name: "lock_hold_hint", label: 'While unlocked (default "Hold to lock")', selector: { text: {} } },
              ]
            : [
                { name: "unlock_hint", label: 'While locked (default "Slide to unlock")', selector: { text: {} } },
                { name: "lock_hint", label: 'While unlocked (default "Slide to lock")', selector: { text: {} } },
              ]),
          ...(hasEntity
            ? [
                { name: "locking_label", label: 'While locking (default "Locking…")', selector: { text: {} } },
                { name: "unlocking_label", label: 'While unlocking (default "Unlocking…")', selector: { text: {} } },
                ...(track
                  ? [{ name: "opening_label", label: 'While opening (default "Opening…")', selector: { text: {} } }]
                  : []),
                { name: "jammed_label", label: 'When jammed (default "Jammed — check the door")', selector: { text: {} } },
              ]
            : [{ name: "demo_label", label: 'Self-contained note (default "Demo · no entity")', selector: { text: {} } }]),
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "unlocked_color", label: "Background while unlocked", color: true, selector: { text: {} } },
          { name: "unlocked_color_on", label: "Text while unlocked", color: true, selector: { text: {} } },
          { name: "locked_color", label: "Background while locked", color: true, selector: { text: {} } },
          { name: "locked_color_on", label: "Text while locked", color: true, selector: { text: {} } },
          { name: "accent", label: "Accent (locked glyph and handle)", color: true, selector: { text: {} } },
          { name: "accent_on", label: "Ink on the accent", color: true, selector: { text: {} } },
          { name: "locked_icon", label: "Icon while locked", selector: { icon: {} } },
          { name: "unlocked_icon", label: "Icon while unlocked", selector: { icon: {} } },
          ...(track
            ? [{ name: "open_icon", label: "Icon for the Open stop (default door-open)", selector: { icon: {} } }]
            : []),
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        // Only the SHAPE takes a tap. The gesture track deliberately has none —
        // a lock that can be thrown by a stray tap defeats the whole control.
        fields: [{ name: "tap_action", label: "Tapping the shape", selector: { ui_action: { default_action: "more-info" } } }],
      },
    ];
  }
}

customElements.define("materia-lock-editor", MateriaLockEditor);
