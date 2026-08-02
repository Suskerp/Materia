import { html, css } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaLockEditor extends SmartEditorBase {
  static styles = [
    SmartEditorBase.styles,
    css`
      .remap-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
      }
      .remap-row ha-textfield {
        flex: 1;
        min-width: 0;
      }
      .remap-arrow {
        flex: none;
        opacity: 0.5;
        --mdc-icon-size: 18px;
      }
      .remap-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
      }
    `,
  ];

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
    return `${this._config?.gesture || "slide"}|${this._config?.entity?.split(".")[0] || ""}|${this._config?.open_action ? "o" : ""}`;
  }

  get _sections() {
    const hold = this._config?.gesture === "hold";
    const hasEntity = !!this._config?.entity;
    const isLock = !!this._config?.entity?.startsWith("lock.");
    const hasOpenButton = !!this._config?.open_action;

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
          ...(isLock
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
            selector: { select: { mode: "dropdown", options: [
              { value: "slide", label: "Slide the handle across" },
              { value: "hold", label: "Press and hold" },
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
        title: "Open button",
        icon: "mdi:door-open",
        expanded: hasOpenButton,
        fields: [
          {
            name: "open_action",
            label: "Open action",
            helper: "A separate, extra action available ONLY once unlocked (a relay pulse, a multi-step let-them-in sequence) — never a substitute for the gesture above, and disabled entirely while locked. Leave empty to hide the button.",
            selector: { ui_action: { default_action: "none" } },
          },
          ...(hasOpenButton
            ? [
                { name: "open_button_icon", label: 'Icon (default "door-open")', selector: { icon: {} } },
                { name: "open_button_label", label: 'Label (default "Open")', selector: { text: {} } },
              ]
            : []),
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
          ...(hold
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
          ...(hasEntity
            ? [
                { name: "jammed_color", label: "Background while jammed (default error container)", color: true, selector: { text: {} } },
                { name: "jammed_color_on", label: "Text while jammed", color: true, selector: { text: {} } },
                { name: "jammed_icon", label: 'Icon while jammed (default "warning")', selector: { icon: {} } },
              ]
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

  /** Only rendered when there's an entity — the list itself, in `_renderExtra`
   *  below the standard sections, since a from->to map isn't a `selector`
   *  the shared field renderer knows how to draw. */
  get _showRemapList() {
    return !!this._config?.entity;
  }

  _remapEntries() {
    const map = this._config?.state_remap || {};
    return Object.entries(map).map(([from, to]) => ({ from, to }));
  }

  _commitRemap(entries) {
    const map = {};
    for (const e of entries) if (e.from) map[e.from] = e.to ?? "";
    this._commit({ ...this._config, state_remap: map });
  }

  _addRemap() {
    this._commitRemap([...this._remapEntries(), { from: "", to: "" }]);
  }

  _removeRemap(i) {
    const entries = [...this._remapEntries()];
    entries.splice(i, 1);
    this._commitRemap(entries);
  }

  _updateRemapFrom(i, value) {
    const entries = [...this._remapEntries()];
    entries[i] = { ...entries[i], from: value };
    this._commitRemap(entries);
  }

  _updateRemapTo(i, value) {
    const entries = [...this._remapEntries()];
    entries[i] = { ...entries[i], to: value };
    this._commitRemap(entries);
  }

  _renderExtra() {
    if (!this._showRemapList) return "";
    const entries = this._remapEntries();
    return html`
      <div class="options-header" style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;font-weight:600;font-size:14px;">
        <span>State skips</span>
        <ha-icon-button @click=${this._addRemap}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="remap-note">
        Treat one reported entity state as another, before anything else
        reads it — for hardware that reports a real but misleading
        transition (e.g. a relatch settling reported as "unlocking" seconds
        after a door that was never locked). Example: from "unlocking" to
        "unlocked".
      </div>
      ${entries.map(
        (e, i) => html`
          <div class="remap-row">
            <ha-textfield
              label="From (raw state)"
              .value=${e.from}
              @change=${(ev) => this._updateRemapFrom(i, ev.target.value)}
            ></ha-textfield>
            <ha-icon class="remap-arrow" icon="mdi:arrow-right"></ha-icon>
            <ha-textfield
              label="To"
              .value=${e.to}
              @change=${(ev) => this._updateRemapTo(i, ev.target.value)}
            ></ha-textfield>
            <ha-icon-button @click=${() => this._removeRemap(i)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `
      )}
    `;
  }
}

customElements.define("materia-lock-editor", MateriaLockEditor);
