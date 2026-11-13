import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

/* M3 roles throughout; each device kind gets one custom-colour family
   (--k-container / --k-on-container / --k-accent) for its avatar, its
   periods on the bars and its period values. */
export const styles = [hostStyles, motionTokens, css`
  :host {
    display: block;
    container-type: inline-size;
    --surface: var(--md-sys-color-surface, var(--card-background-color, #fef7ff));
    --s-low: var(--md-sys-color-surface-container-low, #f7f2fa);
    --s-mid: var(--md-sys-color-surface-container, #f3edf7);
    --s-high: var(--md-sys-color-surface-container-high, #ece6f0);
    --s-highest: var(--md-sys-color-surface-container-highest, #e6e0e9);
    --on-surface: var(--md-sys-color-on-surface, var(--primary-text-color, #1d1b20));
    --on-variant: var(--md-sys-color-on-surface-variant, var(--secondary-text-color, #49454f));
    --outline: var(--md-sys-color-outline, #79747e);
    --outline-variant: var(--md-sys-color-outline-variant, #cac4d0);
    --primary: var(--md-sys-color-primary, #65558f);
    --on-primary: var(--md-sys-color-on-primary, #fff);
    --primary-container: var(--md-sys-color-primary-container, #e9ddff);
    --on-primary-container: var(--md-sys-color-on-primary-container, #4f378a);
    --secondary-container: var(--md-sys-color-secondary-container, #e8def8);
    --on-secondary-container: var(--md-sys-color-on-secondary-container, #1d192b);
    --error: var(--md-sys-color-error, #b3261e);
    color: var(--on-surface);
  }
  * { box-sizing: border-box; }
  button { font: inherit; color: inherit; border: 0; background: none; padding: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
  button:disabled { cursor: default; opacity: .38; }
  button:focus-visible, input:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }

  .theme-heat, .sheet.theme-heat { --k-container: var(--md-sys-cust-color-climate-heat, #ffdbcb); --k-on-container: var(--md-sys-cust-color-on-climate-heat, #5c1f05); --k-accent: var(--md-sys-cust-color-climate-heat-accent, #a14614); }
  .theme-cool, .sheet.theme-cool { --k-container: var(--md-sys-cust-color-climate-cool, #d3e4ff); --k-on-container: var(--md-sys-cust-color-on-climate-cool, #001c38); --k-accent: var(--md-sys-cust-color-climate-cool-accent, #205f82); }
  .theme-auto, .sheet.theme-auto { --k-container: var(--md-sys-cust-color-climate-auto, #d4ebdd); --k-on-container: var(--md-sys-cust-color-on-climate-auto, #0f3a24); --k-accent: var(--md-sys-cust-color-climate-auto-accent, #2e5e44); }
  .theme-light, .sheet.theme-light { --k-container: var(--md-sys-cust-color-light, #ffe08b); --k-on-container: var(--md-sys-cust-color-on-light, #3b2f00); --k-accent: var(--md-sys-cust-color-on-light, #745d00); }
  .theme-neutral, .sheet.theme-neutral { --k-container: var(--secondary-container); --k-on-container: var(--on-secondary-container); --k-accent: var(--primary); }

  ha-card { display: block; padding: 4px 0 16px; overflow: hidden; }

  /* M3 Expressive motion. Shapes and positions move on the spatial springs
     (they overshoot a little); colours and opacity on the effects springs.
     Every pressable thing tightens its corners while held and springs back. */
  .icon-button, .assist-chip, .filter-chip, .fab, .text-button, .filled-button, .week-row, .tonal-icon, .radio-item, .device-head, .group-card, .list-item {
    transition: border-radius var(--md-sys-motion-expressive-fast-spatial), background-color var(--md-sys-motion-fast-effects), color var(--md-sys-motion-fast-effects), box-shadow var(--md-sys-motion-fast-effects);
  }
  .icon-button:active, .text-button:active, .filled-button:active { border-radius: 8px; }
  .assist-chip:active, .filter-chip:active { border-radius: 4px; }
  .fab:active { border-radius: 12px; }
  .week-row:active { border-radius: 8px; }
  .group-card:active { border-radius: 8px; }
  .radio-item:active, .device-head:active { background: color-mix(in srgb, var(--on-surface) 10%, transparent); }
  .list-item:active { background: color-mix(in srgb, var(--on-surface) 10%, transparent); }
  /* State layers: hover 8 %, pressed 10 % of the content colour. */
  .assist-chip:hover, .filter-chip:hover, .text-button:hover, .week-row:hover:not([aria-checked="true"]) { background-image: linear-gradient(color-mix(in srgb, currentColor 8%, transparent), color-mix(in srgb, currentColor 8%, transparent)); }
  .filled-button:hover { box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15); }

  /* Periods slide and stretch to their new place when the day changes. */
  .bar .seg { transition: left var(--md-sys-motion-expressive-default-spatial), width var(--md-sys-motion-expressive-default-spatial), background-color var(--md-sys-motion-default-effects); }
  .now { transition: left var(--md-sys-motion-expressive-default-spatial); }
  .seg-value, .seg-time { animation: fade-in var(--md-sys-motion-default-effects); }
  @keyframes fade-in { from { opacity: 0; } }

  /* Whole-home plans: one entry row on the overview, a radio list in the sheet. */
  .plan-entry { padding: 0 16px 4px; margin-top: 8px; }
  .radio-item.single { border-radius: 12px; }
  .radio-item.single > ha-icon { color: var(--on-variant); }
  .plan-row { display: grid; grid-template-columns: minmax(72px, 30%) minmax(0, 1fr); align-items: center; gap: 12px; margin-top: 8px; }
  .plan-row .bar { margin-top: 0; }
  .plan-room { font-size: 12px; line-height: 16px; letter-spacing: .4px; color: var(--on-variant); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Top app bar: 64dp, Title Large, 48dp icon buttons. */
  .appbar { display: flex; align-items: center; gap: 4px; min-height: 64px; padding: 8px 4px 8px 16px; }
  .appbar:has(> .icon-button:first-child) { padding-left: 4px; }
  .titles { flex: 1; min-width: 0; }
  .title { margin: 0; flex: 1; font-size: 22px; line-height: 28px; font-weight: 400; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .subtitle { font-size: 12px; line-height: 16px; letter-spacing: .4px; color: var(--on-variant); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .icon-button { width: 48px; height: 48px; flex: none; border-radius: 24px; display: inline-flex; align-items: center; justify-content: center; color: var(--on-variant); }
  .icon-button:hover { background: color-mix(in srgb, var(--on-variant) 8%, transparent); }
  .icon-button.danger { color: var(--error); }

  .section { margin: 16px 16px 8px; font-size: 14px; line-height: 20px; font-weight: 500; letter-spacing: .1px; color: var(--on-variant); }
  .section.in-sheet { margin: 8px 0 0; }

  /* Filter & assist chips: 32dp, 8dp corners. */
  .chips { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 16px; }
  .sheet .chips { padding: 0; }
  .filter-chip, .assist-chip { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 16px; border-radius: 8px; border: 1px solid var(--outline); font-size: 14px; line-height: 20px; font-weight: 500; letter-spacing: .1px; color: var(--on-variant); white-space: nowrap; position: relative; }
  .filter-chip::before, .assist-chip::before { content: ""; position: absolute; inset: -8px 0; }
  .filter-chip[aria-pressed="true"] { padding-left: 8px; border-color: transparent; background: var(--secondary-container); color: var(--on-secondary-container); }
  .filter-chip ha-icon { --mdc-icon-size: 18px; }

  /* Overview: one filled card per group. */
  .groups { display: grid; gap: 8px; padding: 0 16px; }
  .group-card { display: block; width: 100%; text-align: start; padding: 12px 16px 16px; border-radius: 12px; background: var(--s-mid); }
  .group-card:hover { background: color-mix(in srgb, var(--on-surface) 8%, var(--s-mid)); }
  .row { display: flex; align-items: center; gap: 16px; min-height: 56px; }
  .avatar { width: 40px; height: 40px; flex: none; border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; background: var(--k-container); color: var(--k-on-container); }
  .avatar.neutral { background: var(--s-highest); color: var(--on-variant); }
  .avatar ha-icon { --mdc-icon-size: 24px; }
  .text { flex: 1; min-width: 0; display: block; }
  .headline { display: block; font-size: 16px; line-height: 24px; letter-spacing: .5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .supporting { display: block; font-size: 14px; line-height: 20px; letter-spacing: .25px; color: var(--on-variant); }
  .trailing { font-size: 22px; line-height: 28px; font-variant-numeric: tabular-nums; }
  .hours { display: flex; justify-content: space-between; padding: 8px 32px 0; font-size: 11px; line-height: 16px; font-weight: 500; letter-spacing: .5px; color: var(--on-variant); font-variant-numeric: tabular-nums; }
  .day-card .hours { padding: 8px 0 0; }

  /* Day bars: an M3 slider-style 16dp track, periods in the kind's accent. */
  /* The empty track tints whatever it sits on, so it reads on the card and in a filled card alike. */
  .bar { position: relative; display: block; border-radius: 8px; background: color-mix(in srgb, var(--on-surface) 10%, transparent); }
  .bar.mini { height: 16px; margin-top: 8px; }
  .bar.mini.on-container { height: 8px; border-radius: 4px; background: var(--surface); }
  .bar .seg { position: absolute; top: 0; bottom: 0; min-width: 3px; border-radius: inherit; background: var(--k-accent); }
  .now { position: absolute; top: -4px; bottom: -4px; width: 4px; margin-left: -2px; border-radius: 2px; background: var(--on-surface); box-shadow: 0 0 0 2px var(--s-mid); pointer-events: none; }

  /* Week at a glance: seven 40dp rows, the chosen day in secondary container. */
  .week { display: grid; padding: 0 4px; }
  .week-row { display: grid; grid-template-columns: 44px minmax(0, 1fr); align-items: center; gap: 12px; height: 40px; padding: 0 12px; border-radius: 20px; text-align: start; }
  .week-row .bar.mini { height: 8px; margin: 0; border-radius: 4px; }
  .week-row[aria-checked="true"] { background: var(--secondary-container); color: var(--on-secondary-container); }
  .week-row[aria-checked="true"] .bar { background: var(--surface); }
  .week-day { font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: .5px; text-transform: capitalize; }
  .week-day.today { color: var(--primary); }
  .week-row[aria-checked="true"] .week-day.today { color: inherit; }

  .day-card { margin: 12px 16px 0; padding: 16px; border-radius: 12px; background: var(--s-mid); }
  .day-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: -8px -8px 8px; }
  .day-head h3 { margin: 0; flex: 1; text-align: center; font-size: 16px; line-height: 24px; font-weight: 500; letter-spacing: .15px; }
  .icon-button.small { width: 40px; height: 40px; border-radius: 20px; position: relative; }
  /* 40dp shapes keep a 48dp touch target. */
  .icon-button.small::before, .week-row::before, .text-button::before, .filled-button::before { content: ""; position: absolute; inset: -4px; }
  .week-row, .text-button, .filled-button { position: relative; }
  .hint { margin: 4px 0 0; font-size: 12px; line-height: 16px; letter-spacing: .4px; color: var(--on-variant); text-align: center; }
  .day-switch { padding: 0 16px 12px; }
  .bar.big { touch-action: pan-y; }
  .bar.big { height: 64px; border-radius: 16px; cursor: copy; }
  .bar.big .grid { position: absolute; top: 12px; bottom: 12px; width: 1px; background: var(--outline-variant); }
  .bar.big .seg { top: 4px; bottom: 4px; border-radius: 12px; background: var(--k-container); color: var(--k-on-container); display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; cursor: pointer; box-shadow: inset 0 0 0 2px var(--k-accent); }
  .seg-value { font-size: 16px; line-height: 20px; font-weight: 500; white-space: nowrap; }
  .seg-time { font-size: 12px; line-height: 16px; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .bar.big .now { box-shadow: 0 0 0 2px var(--s-mid); }

  /* Periods: M3 two-line list items. */
  .list { padding-top: 8px; }
  .list-item { display: flex; align-items: center; gap: 16px; width: 100%; min-height: 72px; padding: 8px 24px 8px 16px; text-align: start; }
  button.list-item:hover { background: color-mix(in srgb, var(--on-surface) 8%, transparent); }
  .list-item + .list-item { border-top: 1px solid var(--outline-variant); }
  .trailing-value { font-size: 16px; line-height: 24px; font-weight: 500; color: var(--k-on-container); text-align: end; max-width: 45%; }
  .trailing-value.muted { color: var(--on-variant); font-weight: 400; }
  .empty { padding: 16px; color: var(--on-variant); font-size: 14px; line-height: 20px; }

  /* Extended FAB: 56dp, 16dp corners, primary container, level 3. */
  .fab-row { display: flex; justify-content: flex-end; padding: 8px 16px 0; }
  .fab { display: inline-flex; align-items: center; gap: 12px; height: 56px; padding: 0 20px 0 16px; border-radius: 16px; background: var(--primary-container); color: var(--on-primary-container); font-size: 16px; line-height: 24px; font-weight: 500; letter-spacing: .15px; box-shadow: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15); }
  .fab:hover { box-shadow: 0 2px 3px rgba(0,0,0,.3), 0 6px 10px 4px rgba(0,0,0,.15); }

  .error { margin: 12px 16px 0; color: var(--error); font-size: 14px; line-height: 20px; }

  /* Modal bottom sheet on phones, a basic dialog on wider screens. */
  dialog.sheet { border: 0; padding: 0; margin: auto; width: min(560px, calc(100vw - 48px)); max-height: min(90dvh, 900px); border-radius: 28px; background: var(--s-low); color: var(--on-surface); box-shadow: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15); overflow: hidden; }
  dialog.sheet[open] { display: flex; flex-direction: column; }
  dialog.sheet::backdrop { background: rgba(0, 0, 0, .32); animation: fade-in var(--md-sys-motion-default-effects); }
  dialog.sheet.closing::backdrop { opacity: 0; transition: opacity var(--md-sys-motion-fast-effects); }
  .handle { display: none; }
  .handle span { display: block; width: 32px; height: 4px; border-radius: 2px; background: var(--on-variant); opacity: .4; }
  @media (max-width: 600px) {
    dialog.sheet { width: 100vw; max-width: 100vw; margin: auto 0 0; border-radius: 28px 28px 0 0; max-height: 92dvh; }
    .handle { display: flex; align-items: center; justify-content: center; flex: none; width: 48px; height: 36px; margin: 6px auto 0; }
  }
  .sheet-head { flex: none; display: flex; align-items: center; gap: 8px; padding: 24px 12px 16px 24px; }
  @media (max-width: 600px) { .sheet-head { padding: 16px 8px 16px 16px; } }
  .sheet-head > div { flex: 1; min-width: 0; }
  .sheet-head h2 { margin: 0; font-size: 24px; line-height: 32px; font-weight: 400; }
  .sheet-sub { font-size: 14px; line-height: 20px; letter-spacing: .25px; color: var(--on-variant); text-transform: none; }
  .sheet-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 0 24px 16px; display: flex; flex-direction: column; gap: 20px; outline: none; }
  @media (max-width: 600px) { .sheet-body { padding: 0 16px 16px; } }
  .sheet-actions { flex: none; display: flex; justify-content: flex-end; gap: 8px; padding: 16px 24px 24px; }
  @media (max-width: 600px) { .sheet-actions { padding: 12px 16px max(16px, env(safe-area-inset-bottom)); } }
  .text-button, .filled-button { height: 40px; padding: 0 12px; border-radius: 20px; font-size: 14px; line-height: 20px; font-weight: 500; letter-spacing: .1px; color: var(--primary); }
  .filled-button { padding: 0 24px; background: var(--primary); color: var(--on-primary); }
  .sheet-text { margin: 0; font-size: 14px; line-height: 20px; color: var(--on-variant); }
  .supporting-text { margin: -12px 16px 0; font-size: 12px; line-height: 16px; letter-spacing: .4px; color: var(--on-variant); }

  /* Outlined text fields for the two times. */
  .times { display: flex; align-items: center; gap: 8px; padding-top: 8px; }
  .times .arrow { flex: none; color: var(--outline); --mdc-icon-size: 20px; }
  .outlined-field { position: relative; flex: 1; min-width: 0; display: block; }
  .outlined-field span { position: absolute; top: -8px; left: 12px; padding: 0 4px; background: var(--s-low); font-size: 12px; line-height: 16px; letter-spacing: .4px; color: var(--on-variant); pointer-events: none; }
  .outlined-field input { display: block; width: 100%; min-width: 0; height: 56px; padding: 0 12px 0 16px; border: 1px solid var(--outline); border-radius: 4px; background: transparent; color: var(--on-surface); font: 400 16px/24px inherit; font-family: inherit; letter-spacing: .5px; font-variant-numeric: tabular-nums; -webkit-appearance: none; appearance: none; }
  .outlined-field input:focus { border: 2px solid var(--primary); padding-left: 15px; outline: none; }
  .outlined-field:focus-within span { color: var(--primary); }
  .outlined-field input::-webkit-date-and-time-value { text-align: start; }

  /* Device settings. */
  .devices { display: grid; gap: 2px; }
  .device { border-radius: 4px; background: var(--s-high); overflow: hidden; }
  .devices .device:first-child { border-radius: 12px 12px 4px 4px; }
  .devices .device:last-child { border-radius: 4px 4px 12px 12px; }
  .devices .device:only-child { border-radius: 12px; }
  .device.single { background: none; display: flex; flex-direction: column; gap: 20px; }
  .device-head { display: flex; align-items: center; gap: 16px; width: 100%; min-height: 72px; padding: 8px 16px; text-align: start; }
  .device-head > ha-icon { color: var(--on-variant); }
  .device-body { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 16px; }
  .phase { display: flex; flex-direction: column; gap: 12px; }
  .phase-label, .field-label { font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: .5px; color: var(--on-variant); }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field-big { align-items: stretch; }
  .field-big > .field-label { font-size: 14px; line-height: 20px; letter-spacing: .1px; }

  .stepper { display: flex; align-items: center; gap: 12px; }
  .stepper.big { justify-content: space-between; padding: 8px 0; }
  .stepper-label { flex: 1; font-size: 14px; line-height: 20px; }
  .tonal-icon { width: 40px; height: 40px; flex: none; border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; background: var(--secondary-container); color: var(--on-secondary-container); transition: border-radius var(--md-sys-motion-expressive-fast-spatial, 200ms); }
  .tonal-icon:active { border-radius: 12px; }
  .stepper.big .tonal-icon { width: 56px; height: 56px; border-radius: 28px; }
  .stepper.big .tonal-icon:active { border-radius: 16px; }
  .stepper-value { min-width: 64px; text-align: center; font-size: 16px; line-height: 24px; font-variant-numeric: tabular-nums; }
  .stepper-value span { margin-left: 2px; }
  .stepper.big .stepper-value { font-family: var(--materia-font-display, inherit); font-size: 45px; line-height: 52px; color: var(--k-on-container); }
  .stepper.big .stepper-value span { font-size: 24px; vertical-align: top; }
  .quick { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }

  /* M3 Expressive slider: 16dp track, 4x44 handle with gaps, stop dot. */
  .slider-field { display: flex; flex-direction: column; gap: 4px; }
  .m3-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 44px; margin: 0; background: transparent; --track-a: var(--primary); --track-i: var(--secondary-container); }
  .m3-slider::-webkit-slider-runnable-track { height: 16px; border-radius: 8px; background: linear-gradient(to right, var(--track-a) 0 calc(var(--pct) - 6px), transparent calc(var(--pct) - 6px) calc(var(--pct) + 6px), var(--track-i) calc(var(--pct) + 6px)); }
  .m3-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 4px; height: 44px; margin-top: -14px; border-radius: 2px; background: var(--primary); }
  .m3-slider::-moz-range-track { height: 16px; border-radius: 8px; background: var(--track-i); }
  .m3-slider::-moz-range-progress { height: 16px; border-radius: 8px 2px 2px 8px; background: var(--track-a); }
  .m3-slider::-moz-range-thumb { width: 4px; height: 44px; border: 0; border-radius: 2px; background: var(--primary); }

  .info-row { display: flex; align-items: center; gap: 16px; min-height: 56px; padding: 0 16px; border-radius: 12px; background: var(--s-high); font-size: 14px; line-height: 20px; color: var(--on-variant); }
  .info-row span { flex: 1; }
  .info-row strong { font-size: 16px; line-height: 24px; font-weight: 400; color: var(--on-surface); }

  /* Presets & plans: radio list items with the pattern as a mini bar. */
  .radio-list, .plan-list { display: grid; gap: 2px; }
  .radio-item, .plan-item { display: flex; align-items: center; gap: 16px; width: 100%; min-height: 72px; padding: 12px 16px; border-radius: 4px; background: var(--s-high); text-align: start; }
  .radio-list > :first-child, .plan-list > :first-child { border-radius: 12px 12px 4px 4px; }
  .radio-list > :last-child, .plan-list > :last-child { border-radius: 4px 4px 12px 12px; }
  .radio-list > :only-child, .plan-list > :only-child { border-radius: 12px; }
  .radio-item[aria-checked="true"] { background: var(--secondary-container); color: var(--on-secondary-container); }
  .radio-item .bar, .plan-item .bar { margin-top: 8px; }
  .radio { width: 20px; height: 20px; flex: none; border-radius: 10px; border: 2px solid var(--on-variant); display: inline-flex; align-items: center; justify-content: center; }
  .radio.on { border-color: var(--primary); }
  .radio.on::after { content: ""; width: 10px; height: 10px; border-radius: 5px; background: var(--primary); }

  materia-button-group { display: block; }
`];
