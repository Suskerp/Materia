import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { DisabledMixin } from "../../utils/conditions.js";
import { t } from "../../utils/i18n.js";
import { OptimismBus } from "../../utils/optimism-bus.js";
import { MOTION } from "../../utils/motion.js";
import { styles } from "./styles.js";
import "./editor.js";

/** AlarmControlPanelEntityFeature, from HA core
 *  (homeassistant/components/alarm_control_panel/const.py). The modes a panel
 *  offers are DERIVED from these bits, never hardcoded: the real panel here
 *  reports 3 (home | away), but a 63 panel must be able to offer night and
 *  vacation without a code change. */
const MODES = [
  { key: "home", feature: 1, state: "armed_home", service: "alarm_arm_home", icon: "m3o:home", hero: "m3o:shield-person" },
  { key: "away", feature: 2, state: "armed_away", service: "alarm_arm_away", icon: "m3o:directions-walk", hero: "m3o:shield-lock" },
  { key: "night", feature: 4, state: "armed_night", service: "alarm_arm_night", icon: "m3o:bedtime", hero: "m3o:shield-moon" },
  { key: "vacation", feature: 32, state: "armed_vacation", service: "alarm_arm_vacation", icon: "m3o:beach-access", hero: "m3o:shield-lock" },
  { key: "custom", feature: 16, state: "armed_custom_bypass", service: "alarm_arm_custom_bypass", icon: "m3o:tune", hero: "m3o:shield-lock" },
];

const ARMED_STATES = new Set(MODES.map((m) => m.state));

/** The two states that mean "the panel is on its way somewhere". Neither is a
 *  destination, so neither may ever overwrite an optimistic pin — that is the
 *  same "don't flicker through the transitional state" problem materia-lock
 *  solves with utils/lock-state.js, and the pin release below is where it is
 *  answered for the alarm. */
const TRANSITIONAL = new Set(["arming", "pending"]);

/** Truthiness for a zone sensor, from the list materia-doorbell already uses
 *  (src/cards/doorbell/index.js _on) plus "detected", since a zone can just as
 *  easily be a motion or occupancy sensor. A zone is a door, a window, a
 *  contact, a lock or a detector, and "not ready" is spelled differently by
 *  each of them. */
const ON_STATES = new Set([
  "on", "true", "open", "opening", "unlocked", "unlocking", "detected", "running", "active", "home",
]);

/* WHICH ZONES CAN BLOCK AN ARM, from Home Assistant's own
   BinarySensorDeviceClass enum (homeassistant/components/binary_sensor/const.py)
   — an enumerated platform constant, not a list anybody has to maintain here.

   The distinction is not cosmetic and not really about layout. A door contact
   that reads open is a PERSISTENT obstruction: someone has to close it or skip
   it. A PIR that reads open is you, walking to the keypad, and it will clear on
   its own. Panels know this — interior and follower zones are ignored during
   the exit delay, which is the whole reason an exit delay exists — so a motion
   zone that is "Not Ready" is not a reason to warn anyone about arming, and
   listing it under "Not ready" was wrong before it was ever noisy. */
const TRANSIENT_CLASSES = new Set([
  "motion", "occupancy", "presence", "vibration", "sound", "moving", "running", "light",
]);
const BLOCKING_CLASSES = new Set([
  "door", "window", "opening", "garage_door", "lock", "tamper", "safety",
  "problem", "smoke", "gas", "heat", "moisture", "co",
]);

/* Geometry, all off the M3 button ladder — see the spec header in styles.js.
   96px is the large rung (the concept's 104px is not a step on the ladder,
   the same call materia-drag-confirm already documents); 48 is the stadium
   end, 16 the connected inner seam from button-group SIZES.l, 28 the
   .size-l square-shape corner the active button morphs to. */
/** How long the pose turn takes, read from the motion table rather than
 *  retyped, so this guard can never drift from the CSS that owns the
 *  transition. The receipt below refuses to fire while the pose is still
 *  travelling. */
const POSE_MS = MOTION["expressive-default-spatial"].ms;

const OUTER_R = 48;
const INNER_R = 16;
const ACTIVE_R = 28;

/**
 * Alarm panel (materia-alarm) — the arming gesture IS the mode button.
 *
 * THE ONE IDEA. Every other alarm card asks you to pick a mode and then
 * confirm it somewhere else: a keypad, a dialog, a second tap. Here the
 * deliberateness lives inside the mode button itself — you press and hold the
 * mode you want and a fill sweeps across it until it commits. There is no tap
 * path at all, for the same reason materia-lock has none: a stray tap while
 * scrolling past must never arm or disarm a house.
 *
 * THE WARNING IS INSIDE THE GESTURE. If a zone is not ready, the sweeping fill
 * turns amber instead of the accent. That is deliberately not a banner
 * somewhere else on the card: the moment you are already committing is the only
 * moment you are guaranteed to be looking, so the warning is put there and
 * nowhere else. The zone list below says WHICH ones; the fill says THAT there
 * are some, without you having to read anything.
 *
 * THE ACTIVE MODE IS THE EXIT. There is no separate disarm button. Whichever
 * mode you are standing in becomes the disarm gesture — hold it and it lets
 * go. So the row is always "hold the thing you mean", whether you mean to
 * leave or to come home, and the card never grows a button that only does
 * something in one state.
 *
 * ARMED IS A ONE-WAY DOOR, by default. While armed, the mode you are NOT in is
 * inert: it dims to M3 disabled content, its glyph becomes a lock, and pressing
 * it explains itself instead of arming. Going home-to-away without passing
 * through disarmed is how people accidentally leave a house armed in the wrong
 * shape, so it takes two deliberate gestures unless direct_switch: true says
 * otherwise.
 *
 * OPTIMISTIC, AND HONEST ABOUT IT. A commit pins the requested state
 * immediately and publishes it on the OptimismBus, so this card and any
 * sibling card on the same entity both say "Armed away" the instant you let
 * go rather than sitting on the stale state for the round-trip. The pin is
 * released the moment the entity settles anywhere real, and it expires — an
 * offline panel must stop being claimed as armed.
 *
 * TRIGGERED IS THE EXCEPTION TO EVERY QUIET DECISION HERE. It is the one state
 * that floods the whole card (the error pair, plus a siren wash) rather than
 * only recolouring the hero shape, because it is the one state that has to be
 * legible from across the room before anyone reads a word of it.
 */
class MateriaAlarm extends DisabledMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    /** Optimistic state: the alarm state we just asked for, until the entity
     *  settles somewhere real. */
    _pending: { state: true },
    /** Mode key currently being held, or null. */
    _holdKey: { state: true },
    /** True while the fill is moving on its own (released short of the
     *  commit) — the only time it gets easing. */
    _settling: { state: true },
    /** Transient refusal: { key, text }, shown in that button's hint line and
     *  in the footnote for about two seconds. */
    _hint: { state: true },
    /** Mode key currently playing the refusal shake. */
    _refused: { state: true },
    /** Whether the ready-zone list is expanded. Undefined until the reader
     *  touches it, so the config default can seed it at render time. */
    _zonesOpen: { state: true },
    /** Whether the unavailable-zone list is expanded. Always starts closed:
     *  it is a footnote about the install, not something to read every time. */
    _unavailOpen: { state: true },
    /** One-shot ARRIVAL turn: the panel has finished doing the thing we were
     *  already claiming it had done. See _punctuate. */
    _turn: { state: true },
    /** One-shot REFUSAL shake: an optimistic pin expired unanswered. */
    _shake: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-alarm-editor");
  }

  static getStubConfig(hass) {
    // Point at whatever panel this install actually has, so the card is useful
    // the moment it is dropped in rather than showing an entity-not-found.
    const ids = hass ? Object.keys(hass.states) : [];
    const first = ids.find((id) => id.startsWith("alarm_control_panel."));
    const config = first ? { entity: first } : {};

    /* Zone discovery and the bypass actions are SNIFFED, never assumed. The
       card knows nothing about any particular alarm integration; it only
       recognises that if an install has zone entities in a known shape AND the
       services to skip them, pre-filling that is strictly better than handing
       someone an empty zone list and a regex to write. An install without them
       gets a plain panel card and no dead config keys. */
    const zoneish = ids.find((id) => /^sensor\..*zone\d+state$/i.test(id));
    if (zoneish) {
      const domain = zoneish.split(".")[1].replace(/_?zone\d+state$/i, "");
      config.zone_filter = "sensor." + domain + "_zone";
      const svc = hass?.services?.[domain];
      if (svc?.bypass && svc?.unbypass) {
        config.bypass_action = { action: "perform-action", perform_action: domain + ".bypass", data: { zone: "{zone}" } };
        config.unbypass_action = { action: "perform-action", perform_action: domain + ".unbypass", data: { zone: "{zone}" } };
      }
    }
    return config;
  }

  setConfig(config) {
    this.config = { ...config };
  }

  constructor() {
    super();
    this._pending = null;
    this._holdKey = null;
    /* Deliberately NOT a reactive property — see the note on _applyP. */
    this._p = 0;
    this._settling = false;
    this._hint = null;
    this._refused = null;
    this._zonesOpen = undefined;
    this._unavailOpen = false;
    this._turn = false;
    this._shake = false;
    /* +1 turns the way arming turns, -1 retraces it. Not reactive: it is only
       ever read in the same render the class flip triggers. */
    this._turnDir = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    // A sibling card firing a command on our entity must move this card too.
    this._unsub = OptimismBus.subscribe((entity) => {
      if (entity === this.config?.entity) this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsub?.();
    this._unsub = null;
    clearTimeout(this._pinTimer);
    clearTimeout(this._hintTimer);
    clearTimeout(this._refuseTimer);
    clearTimeout(this._turnTimer);
    clearTimeout(this._shakeTimer);
    clearTimeout(this._latchTimer);
    this._cleanupGesture();
  }

  /* ---- state ------------------------------------------------------------ */

  get _stateObj() {
    return this.hass?.states[this.config?.entity];
  }

  get _rawState() {
    return String(this._stateObj?.state ?? "");
  }

  /** What the card SHOWS. The optimistic pin wins, then a sibling card's
   *  prediction on the same entity, then reality. */
  get _state() {
    if (this._pending) return this._pending;
    const raw = this._rawState;
    const predicted = OptimismBus.peek(this.config.entity, raw);
    return predicted || raw;
  }

  /** BUSY: the panel is on its way. Either it says so itself, or we are
   *  holding a pin the entity has not caught up with yet. */
  get _busy() {
    const raw = this._rawState;
    if (TRANSITIONAL.has(raw)) return true;
    return !!this._pending && raw !== this._pending;
  }

  get _triggered() {
    // The DISPLAYED state, not the raw one: a disarm that has been asked for
    // but not yet acknowledged drops the flood at once, the same optimism the
    // rest of the card runs on. If the panel refuses, the pin expires and the
    // red comes back — which is the honest outcome, visibly.
    return this._state === "triggered";
  }

  /** Which way the in-flight commit is going. Busy is not one piece of copy:
   *  "leave now" is exactly the wrong thing to say to someone who has just
   *  asked to disarm. */
  get _disarming() {
    return this._pending === "disarmed";
  }

  /** Armed in the sense the SHAPE cares about — anything that is not resting
   *  at disarmed, transitional states included, so the corner morph happens
   *  on commit rather than waiting out the arming delay. */
  get _armedish() {
    const s = this._state;
    return ARMED_STATES.has(s) || TRANSITIONAL.has(s) || s === "triggered";
  }

  /** The shape's POSE: turned or not. Named separately from _armedish because
   *  the arrival receipt has to ask whether the pose is changing in this very
   *  frame, and comparing booleans is the whole test. */
  get _pose() {
    return this._armedish;
  }

  get _reduceMotion() {
    return !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }

  get _features() {
    return Number(this._stateObj?.attributes?.supported_features ?? 0);
  }

  /** The modes this card offers. Derived from supported_features; config may
   *  narrow or reorder it (accepting either the short key or the full state
   *  name, since both spellings are natural in YAML). */
  get _modes() {
    const features = this._features;
    let offered = MODES.filter((m) => (features & m.feature) !== 0);
    // A panel that reports nothing at all still has to be usable: fall back to
    // the two modes essentially every integration implements.
    if (!offered.length && !this.config.modes) {
      offered = MODES.filter((m) => m.key === "home" || m.key === "away");
    }
    const want = this.config.modes;
    if (Array.isArray(want) && want.length) {
      offered = want
        .map((w) => {
          const key = String(w).replace(/^armed_/, "").replace("custom_bypass", "custom");
          return MODES.find((m) => m.key === key);
        })
        .filter(Boolean);
    }
    return offered;
  }

  /** The mode the panel is standing in, or null.
   *
   *  triggered and pending are only reachable FROM an armed state, so the mode
   *  is remembered rather than guessed — same trick materia-lock uses with its
   *  last settled family. If it is still unknown (the card loaded mid-alarm)
   *  the FIRST mode becomes the disarm gesture anyway: being unable to
   *  identify the mode must never leave someone unable to turn the siren off. */
  get _activeMode() {
    const modes = this._modes;
    const s = this._state;
    const direct = modes.find((m) => m.state === s);
    if (direct) return direct;
    // arming is in this list DELIBERATELY, and it was a real gap: forcing the
    // state directly (the test rig's input_select, or a page load part-way
    // through an exit delay) left no button carrying the disarm gesture at
    // all, so an arming nobody could abort. Our OWN arm never had the problem
    // — the optimistic pin names the target, so that button is already active
    // — which is exactly why it went unnoticed. The cost is that during an
    // externally started arming one button shows a mode identity taken from
    // the last armed state, which may be stale; being unable to abort is
    // plainly the worse of the two, and the hero still says "Arming" rather
    // than naming a mode.
    if (s === "triggered" || s === "pending" || s === "arming") {
      return modes.find((m) => m.state === this._lastArmed) || modes[0] || null;
    }
    return null;
  }

  updated(changed) {
    /* THE POSE CLOCK. Tracked on EVERY update and not only on hass ticks,
       because a commit turns the shape by setting the pin with no entity
       change at all — and read from a remembered field rather than by
       comparing before and after inside this method, which cannot work:
       updated() runs after the property is applied, so this._pose here is
       already the new value. materia-lock keeps _lastPose for exactly this
       reason. */
    const prevPose = this._lastPose;
    this._lastPose = this._pose;
    if (prevPose !== this._lastPose) this._poseAt = performance.now();

    if (!changed.has("hass")) return;
    const raw = this._rawState;
    if (ARMED_STATES.has(raw)) this._lastArmed = raw;

    if (this._pending) {
      // Reality has agreed with the pin, or has settled somewhere else
      // entirely. Transitional reads never release it — they are the reason
      // it exists.
      if (raw === this._pending) this._clearPin();
      else if (!TRANSITIONAL.has(raw) && raw !== this._pinFrom) this._clearPin();
    }

    this._punctuate(raw);
  }

  /* ---- the one-shot marks ----------------------------------------------
     THE COMMIT IS NOT THE THING TO PUNCTUATE. The sweep completing across the
     button is already an unmistakable "yes, that registered", and in the same
     frame the shape morphs its corner, turns its pose and floods its colour.
     A spin on top of all that is a second confirmation of one event.

     What had NO mark at all was the panel ANSWERING. An arm sits busy for a
     thirty-second exit delay and then the breathe simply... stops, which is
     the least legible way to say "it is done". So the receipt goes there: one
     turn of the shape when a settled state arrives that the card was already
     optimistically claiming. That is materia-lock's own reasoning for rolling
     its spin out to an aligned pose — "a settle that visibly finds its pose
     reads as the mechanism seating, not as lag" — as a discrete mark, since
     this hero has no continuous spin to decelerate.

     And the genuine FAULT here is not `triggered` (which already floods the
     card and pulses, and stacking a third thing on it would be noise). It is
     a pin that expires unanswered: the card quietly stops claiming the state
     it promised, which is precisely the "silently reverting optimistic state
     looks like the card is broken" failure _callService already worries about.
     That gets the lock's jam shake, because it is the same event — the
     mechanism tried and did not move. */

  /** Decide whether an entity update deserves a one-shot mark. */
  _punctuate(raw) {
    const settled = raw !== "" && !TRANSITIONAL.has(raw) && raw !== "unavailable" && raw !== "unknown";
    const prev = this._lastSettled;
    if (settled) this._lastSettled = raw;
    if (!settled || prev === undefined || prev === raw) return; // mount, or no arrival

    /* THE SEAM, and the guard is TIME rather than "did the pose change in this
       same update". Two rotations of one shape landing together read as a
       single sudden speed-up instead of as two events — the problem
       materia-lock documents at length in _compensatePoseTurn — and a
       frame-equality test only catches the case where they land in literally
       the same tick. It misses the one that actually bites: a panel that
       answers a disarm in 150ms, where the pose turn is still mid-flight when
       the receipt would start. So the receipt waits out the pose transition,
       measured against the very token that drives it.

       What survives the guard is exactly the case worth marking: the panel
       finishing something the card has been claiming for a while — the end of
       a thirty-second exit delay, or a siren that has finally stopped. */
    if (performance.now() - (this._poseAt ?? -Infinity) < POSE_MS) return;

    this._playTurn(raw === "disarmed" ? -1 : 1);
  }

  /** One full turn of the SHAPE — never the glyph, which counter-rotates.
   *  Re-toggling a class inside one frame is a no-op in the DOM, so a
   *  re-trigger drops it for a frame first; that restart trick is lifted
   *  straight from materia-lock's _spinOpenShape. */
  _playTurn(dir) {
    if (this._reduceMotion) return;
    clearTimeout(this._turnTimer);
    this._turnDir = dir;
    this._turn = false;
    requestAnimationFrame(() => {
      this._turn = true;
      this._turnTimer = setTimeout(() => {
        this._turn = false;
      }, 650);
    });
  }

  _playShake() {
    if (this._reduceMotion) return;
    clearTimeout(this._shakeTimer);
    this._shake = false;
    requestAnimationFrame(() => {
      this._shake = true;
      this._shakeTimer = setTimeout(() => {
        this._shake = false;
      }, 500);
    });
  }

  _clearPin() {
    this._pending = null;
    clearTimeout(this._pinTimer);
  }

  /* ---- zones ------------------------------------------------------------
     A zone is EITHER a plain binary contact (on / open / unlocked) or a panel
     sensor reporting a human word ("Ready" / "Not Ready" / "Bypassed"), because
     those are the two shapes real installs come in. Both go through the same
     three predicates below rather than through a per-integration branch.

     WHAT CHANGED AND WHY. This used to read bypass state out of a mirror
     helper (an input_boolean per zone) and write to it. A panel that bypasses
     NATIVELY makes that wrong twice over: the helper is a second truth to
     drift from, and the panel already answers both questions itself — whether
     a zone IS bypassed (its own state word) and whether it MAY be (can_bypass).
     So the card now reads the zone and fires a real service action. */

  /** The word a zone's readiness is judged from. The entity state comes first
   *  and deliberately so: an unavailable entity has NO attributes at all, so
   *  anything that read an attribute first would score those zones as ready
   *  and quietly claim a perimeter that is not being watched. The attribute
   *  fallbacks are for integrations that park the interesting word there. */
  _zoneWord(st) {
    const raw = String(st?.state ?? "").trim();
    if (raw && raw !== "unknown") return raw;
    return String(st?.attributes?.status ?? st?.attributes?.state ?? raw).trim();
  }

  _zoneUnavailable(st) {
    if (!st) return true;
    const w = this._zoneWord(st).toLowerCase();
    return w === "" || w === "unavailable" || w === "unknown" || w === "none";
  }

  /** Bypassed, from the zone's OWN word rather than from a helper: a panel
   *  that bypasses natively is the authority on what it is currently ignoring.
   *  Matched on the "bypass" STEM, case-insensitively, because the exact
   *  spelling is unobserved on this install (nothing is bypassed right now) —
   *  so "Bypassed", "Bypass" and "Bypassing" all have to land. Guessing one
   *  exact string and being wrong would silently show a skipped zone as armed. */
  _zoneBypassed(st) {
    return /^bypass/i.test(this._zoneWord(st));
  }

  /** Not ready: the panel's own words, or the binary-contact vocabulary for an
   *  ordinary door sensor. Only ever consulted after bypassed and unavailable
   *  have been ruled out, so nothing is counted twice. */
  _zoneNotReady(st) {
    const w = this._zoneWord(st).toLowerCase();
    if (w === "not ready" || w === "notready") return true;
    return ON_STATES.has(w);
  }

  get _zonePattern() {
    // The UltraSync entity_id shape, which is also the pattern the user wrote.
    return this.config.zone_pattern ?? "zone(\\d+)state$";
  }

  /** The panel's zone NUMBER, parsed out of the entity_id, because the bypass
   *  services take a number and not an entity — without this there is nothing
   *  to send. A pattern that does not match yields null, and a zone with a
   *  null number offers no skip action at all: firing the service anyway would
   *  be a blind write to whatever the panel considers zone 0. */
  _zoneNumber(entityId) {
    const src = this._zonePattern;
    if (this.__zoneReSrc !== src) {
      this.__zoneReSrc = src;
      try {
        this.__zoneRe = new RegExp(src, "i");
      } catch (_) {
        // A typo in a user-supplied regex must not take the whole card down.
        this.__zoneRe = null;
      }
    }
    if (!this.__zoneRe) return null;
    const m = this.__zoneRe.exec(String(entityId ?? ""));
    if (!m || m[1] === undefined) return null;
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : null;
  }

  /* ---- the zone stability book ------------------------------------------
     THE PROBLEM, in the user's words: "zones can quickly constantly switch
     between ready and not ready, which makes it feel like the card resizes
     constantly." Measured on this install, zone sensors alternate every 2-5
     seconds for minutes at a time, and roughly a third of the 47 zones are
     PIRs. Every flap moved a zone between the not-ready group and the ready
     group, which changed the height of both, which resized the card under the
     reader's thumb — possibly mid-hold on an arm gesture.

     TWO MECHANISMS, because one is not enough and I tried it first.

     Plain asymmetric hysteresis (not-ready instantly, ready has to be earned)
     is the obvious surgical fix and it does stop the resizing — by leaving
     every flapping PIR permanently listed as an obstruction and the sweep
     permanently amber. That trades a thrash for a permanent false alarm, which
     is the same "teach the reader to ignore the warning colour" failure the
     unavailable zones already had to be kept out of. So:

       1. CLASSIFY. A transient zone never joins the not-ready group and never
          turns the sweep amber. It keeps its exact row and only recolours,
          which is design 16a's behaviour applied to precisely the zones 16a is
          right about. Its position never moves, so it cannot resize anything.

       2. HYSTERESIS, for the blocking zones only. Not-ready is immediate,
          because that is the information the reader needs now and it is what
          turns the sweep amber. Going ready has to be HELD for the settle
          window. That kills contact bounce on a real door without ever
          delaying a warning.

     Together the not-ready group only ever moves for a real, sustained
     obstruction. Bookkeeping lives here rather than in the _zones getter
     because a getter called during render must not mutate anything. */

  get _settleMs() {
    /* Must clear the 2-5s flap band measured on this install by a comfortable
       margin, or an unclassified flapper could still thrash the list in the
       seconds before mechanism 1 has enough evidence to demote it. It only
       ever delays a zone LEAVING the list, which is the safe direction: the
       card over-reports an obstruction for a few seconds rather than
       under-reporting one. */
    return Math.max(0, Number(this.config.zone_settle_ms ?? 8000));
  }

  /** Per-zone record: the last word seen, when it last flipped, the recent
   *  flip timestamps, and the latched blocking verdict. */
  _book(id) {
    this._zoneBook ??= new Map();
    let b = this._zoneBook.get(id);
    if (!b) {
      b = { word: null, flips: [], latched: false, readyAt: null };
      this._zoneBook.set(id, b);
    }
    return b;
  }

  /** True when a zone has changed state often enough, recently enough, to be
   *  behaving like a detector rather than like a door.
   *
   *  This is the fallback for zones carrying NO device_class at all — which is
   *  every zone on this install, because they are `sensor` entities from the
   *  panel integration rather than binary_sensors. Observed behaviour is the
   *  most real signal available in that case, it needs no hand-maintained
   *  list, and it is self-correcting: a door opened once does not flap, a PIR
   *  does. It is also deliberately conservative — six transitions in a minute
   *  is roughly 12-30s of PIR activity but three full open/close cycles of a
   *  door, which is not something a door does by accident. */
  _flapping(b, now) {
    const win = Math.max(1000, Number(this.config.zone_flap_window_ms ?? 60000));
    const need = Math.max(2, Number(this.config.zone_flap_count ?? 6));
    while (b.flips.length && now - b.flips[0] > win) b.flips.shift();
    return b.flips.length >= need;
  }

  /** Classification, most specific source first. */
  _isTransient(zoneCfg, st, b, now) {
    if (typeof zoneCfg?.transient === "boolean") return zoneCfg.transient;
    const dc = st?.attributes?.device_class;
    if (dc) {
      if (TRANSIENT_CLASSES.has(dc)) return true;
      if (BLOCKING_CLASSES.has(dc)) return false;
    }
    // Unclassifiable: default to BLOCKING (the safe reading of an unknown
    // zone), unless it has demonstrated otherwise.
    if (this.config.zone_flap_detect === false) return false;
    return this._flapping(b, now);
  }

  willUpdate(changed) {
    super.willUpdate?.(changed);
    this._surveyZones();
  }

  /** Advance the stability book. Runs before render, so the very first paint is
   *  already consistent with what the getter will read; idempotent, so being
   *  called on unrelated updates costs a map lookup per zone and changes
   *  nothing. */
  _surveyZones() {
    if (!this.hass || !this.config) return;
    const now = Date.now();
    const settle = this._settleMs;
    let nextDue = Infinity;

    for (const z of this._zoneConfigs()) {
      const st = this.hass.states[z.entity];
      const b = this._book(z.entity);
      const word = this._zoneWord(st);

      if (b.word !== word) {
        if (b.word !== null) b.flips.push(now);
        b.word = word;
      }

      const transient = this._isTransient(z, st, b, now);
      b.transient = transient;

      const unavailable = this._zoneUnavailable(st);
      const bypassed = !unavailable && this._zoneBypassed(st);
      // Only a BLOCKING zone can be latched; a transient one is never in the
      // group whose height the latch exists to protect.
      const live = !transient && !unavailable && !bypassed && this._zoneNotReady(st);

      if (live) {
        b.latched = true;
        b.readyAt = null;
      } else if (b.latched) {
        if (b.readyAt == null) b.readyAt = now;
        if (now - b.readyAt >= settle) {
          b.latched = false;
          b.readyAt = null;
        } else {
          nextDue = Math.min(nextDue, b.readyAt + settle);
        }
      }
      // A zone that is no longer blocking for any other reason (it went
      // unavailable, or was bypassed) drops the latch at once: the latch only
      // ever smooths the ready/not-ready edge, never the others.
      if ((unavailable || bypassed || transient) && b.latched) {
        b.latched = false;
        b.readyAt = null;
      }
    }

    /* A latch has to be able to expire on a QUIET house. hass ticks arrive
       whenever anything anywhere changes, which is usually often enough, but
       "usually" is not a guarantee — so the next expiry is scheduled
       explicitly. One timer for the earliest one, rescheduled each survey. */
    clearTimeout(this._latchTimer);
    if (nextDue !== Infinity) {
      this._latchTimer = setTimeout(() => this.requestUpdate(), Math.max(16, nextDue - now));
    }
  }

  /** The configured-or-discovered zone list, before any hass resolution. Split
   *  out so the survey and the getter walk exactly the same set. */
  _zoneConfigs() {
    const explicit = Array.isArray(this.config.zones) ? this.config.zones : null;
    const list = explicit && explicit.length ? explicit : this._discoverZones();
    return list.filter((z) => z && z.entity);
  }

  /** Zone auto-discovery. Forty-seven hand-written zone entries is not a
   *  reasonable ask, so `zone_filter` finds them instead — a plain entity_id
   *  prefix, or a regex when it looks like one. An explicit `zones` list still
   *  wins, so a curated subset (four doors on a bedside dashboard) is intact. */
  _discoverZones() {
    const f = this.config.zone_filter;
    if (!f || !this.hass?.states) return [];
    const src = String(f);
    let test;
    // A bare prefix is the common case and must not be misread as a pattern:
    // only a string carrying regex metacharacters is compiled as one.
    if (/[\\^$.*+?()[\]{}|]/.test(src)) {
      try {
        const re = new RegExp(src, "i");
        test = (id) => re.test(id);
      } catch (_) {
        test = (id) => id.startsWith(src);
      }
    } else {
      test = (id) => id.startsWith(src);
    }
    return Object.keys(this.hass.states)
      .filter(test)
      .map((entity) => ({ entity }));
  }

  /** Whether to offer the skip action on a zone at all.
   *
   *  THE PANEL DECIDES. can_bypass is the panel's own answer and a false is
   *  final — a Skip button on a 24-hour or fire zone is a button that cannot
   *  work, and offering it would be a lie the user only discovers mid-arm.
   *  When the attribute is ABSENT (an unavailable zone has no attributes at
   *  all, and integrations other than this one never had the attribute) it
   *  falls back to "offer it if there is an action to fire and a number to
   *  fire it with", which is the most this card can honestly know. */
  _canSkip(z) {
    if (z.unavailable) return false;
    if (!this.config.bypass_action || z.zone == null) return false;
    const attr = z.st?.attributes?.can_bypass;
    if (attr === undefined || attr === null) return true;
    return attr === true || attr === 1 || /^(true|yes|1)$/i.test(String(attr));
  }

  /** Whether a bypassed zone can be brought back in. */
  _canUnskip(z) {
    return !!this.config.unbypass_action && z.zone != null;
  }

  /** Zones, from config or discovery, resolved against hass and sorted. */
  get _zones() {
    const resolved = this._zoneConfigs()
      .map((z) => {
        const st = this.hass?.states[z.entity];
        const unavailable = this._zoneUnavailable(st);
        const bypassed = !unavailable && this._zoneBypassed(st);
        /* Verdicts come from the stability book, which the survey has already
           advanced this cycle. The book is consulted rather than recomputed so
           the getter stays free of side effects and every reader — the groups,
           the counts, the sweep colour — agrees by construction. Falling back
           to the live read costs nothing and covers a getter reached before any
           survey has run. */
        const b = this._zoneBook?.get(z.entity);
        const transient = b?.transient ?? false;
        const liveNotReady = !unavailable && !bypassed && this._zoneNotReady(st);
        const out = {
          ...z,
          st,
          zone: this._zoneNumber(z.entity),
          unavailable,
          bypassed,
          transient,
          /* SENSING: a transient zone currently detecting. It holds its row,
             recolours, and is deliberately absent from `open` — so it can
             neither move a group's height nor turn the sweep amber. */
          sensing: transient && liveNotReady,
          /* OPEN is the blocking, hysteresis-smoothed obstruction: the only
             thing that may size the not-ready group or drive the warning. */
          open: b ? (!transient && b.latched) : (!transient && liveNotReady),
          // friendly_name beats the panel's short `name` attribute on purpose:
          // "Raam Pool Badkamer" is a room, "MC pool badkamer" is a wiring
          // label. An explicit config name still wins over both.
          name: z.name || st?.attributes?.friendly_name || st?.attributes?.name || z.entity,
          icon: z.icon || st?.attributes?.icon || "m3o:sensors",
        };
        out.skippable = this._canSkip(out);
        out.unskippable = this._canUnskip(out);
        return out;
      })
      // show_unavailable: false drops them here, at the single point every
      // other reader goes through — the groups, the counts and the summary
      // rows all derive from this list, so nothing can disagree about whether
      // they exist. Default stays true: a zone the panel cannot see is worth
      // saying out loud on a panel where it is news. On an install where seven
      // of them are permanently dark it is just noise, which is what the flag
      // is for. They were never in the not-ready count either way.
      .filter((z) => this.config.show_unavailable !== false || !z.unavailable);
    /* Attention first, the unknowns next, then the fine ones, and last the
       ones deliberately being ignored. Ties break on the panel's own zone
       number so zone 2 never sorts after zone 10.

       `sensing` is deliberately NOT a rank. A sensing zone sorts exactly where
       it would if it were quiet, so it never changes position — reordering
       rows inside the expanded list would be the same complaint in a smaller
       box, even though the card's overall height would not move. */
    const rank = (z) => (z.bypassed ? 3 : z.open ? 0 : z.unavailable ? 1 : 2);
    return resolved.sort((a, b) => {
      const d = rank(a) - rank(b);
      if (d) return d;
      if (a.zone != null && b.zone != null) return a.zone - b.zone;
      return String(a.name).localeCompare(String(b.name));
    });
  }

  /** Zones standing in the way of a clean arm. This is the number the sweep
   *  turns amber for, and UNAVAILABLE ZONES ARE NOT IN IT — a zone the panel
   *  cannot see is not a zone that is open, and counting the seven permanently
   *  unavailable ones here would leave the gesture amber forever, which is the
   *  fastest way to teach someone to ignore a warning colour. They get their
   *  own honest row instead. */
  _notReady(zones) {
    return zones.filter((z) => z.open);
  }

  /** Substitute the panel's zone number into an action config.
   *
   *  A value that is EXACTLY the placeholder becomes a real NUMBER, because
   *  UltraSync's `zone` field is numeric and the string "7" is not the same
   *  thing to a service schema. A placeholder embedded in a longer string
   *  splices in as text. Deliberately not a template language: one
   *  placeholder, no expressions, nothing to evaluate. The whole action is
   *  walked, not only `data`, so `target` and `service_data` work too. */
  _withZone(value, zone) {
    if (typeof value === "string") {
      if (value.trim() === "{zone}") return zone;
      return value.includes("{zone}") ? value.split("{zone}").join(String(zone)) : value;
    }
    if (Array.isArray(value)) return value.map((v) => this._withZone(v, zone));
    if (value && typeof value === "object") {
      const out = {};
      for (const [k, v] of Object.entries(value)) out[k] = this._withZone(v, zone);
      return out;
    }
    return value;
  }

  /** Fire the skip / un-skip action for one zone. Never fires without a parsed
   *  number, and never for a zone the panel said it will not bypass. */
  _fireZoneAction(z, which) {
    const action = which === "bypass" ? this.config.bypass_action : this.config.unbypass_action;
    if (!action || z.zone == null) return;
    if (which === "bypass" && !z.skippable) return;
    this._handleAction(this._withZone(action, z.zone));
  }

  /* ---- the gesture -----------------------------------------------------
     The pointer state machine is lifted from materia-drag-confirm (which took
     it from materia-card's brightness slider) because that is the version that
     survived iOS and the HA companion app. The four non-obvious parts are all
     kept: axis-dominance scroll-intent detection so a vertical flick that
     starts on a button still scrolls the dashboard, a document-level touch
     lock against scroll breakthrough, a grace timer for iOS firing a spurious
     pointercancel right after the press, and a visibilitychange bail-out so a
     tab switch cannot leave the page scroll-locked.

     KEYBOARD runs the identical gesture rather than a shortcut: Enter or Space
     on keydown engages the same hold and the same fill, and releasing the key
     before it completes cancels it exactly as lifting a finger does. Committing
     on keyup would have made the keyboard path the fast path — the one way to
     arm a house without the deliberate delay — which defeats the control. */

  get _holdMs() {
    /* Must clearly exceed the platform long-press timeout (500ms on Android,
       ViewConfiguration.DEFAULT_LONG_PRESS_TIMEOUT) or an ordinary long-press
       on the dashboard commits by accident — the same floor
       materia-drag-confirm documents. */
    return Math.max(300, Number(this.config.hold_ms ?? 800));
  }

  /** True when this mode cannot be actuated because the panel is armed
   *  elsewhere. Not "disabled": pressing it still has to explain itself. */
  _isInert(mode) {
    if (this.config.direct_switch) return false;
    const active = this._activeMode;
    return !!active && active.key !== mode.key;
  }

  _showHint(key, text, haptic = "warning") {
    clearTimeout(this._hintTimer);
    clearTimeout(this._refuseTimer);
    this._hint = { key, text };
    this._refused = key;
    this._fireHaptic(haptic);
    // Android Toast.LENGTH_SHORT — the platform's own idea of how long a
    // transient one-line message stays up.
    this._hintTimer = setTimeout(() => {
      this._hint = null;
    }, Number(this.config.hint_ms ?? 2000));
    // Just long enough to outlast the shake keyframes.
    this._refuseTimer = setTimeout(() => {
      this._refused = null;
    }, 450);
  }

  /** Why this press cannot become a commit, or null if it can. */
  _refusalFor(mode) {
    if (this._isInert(mode)) return t("al_hint_disarm_first", this.hass);
    const isDisarm = this._activeMode?.key === mode.key;
    if (!isDisarm && this._stateObj?.attributes?.code_arm_required && !this.config.code) {
      return t("al_hint_code_required", this.hass);
    }
    return null;
  }

  _onPointerDown(ev, mode) {
    if (this._isUnavailable(this._stateObj)) return;
    if (ev.button && ev.button !== 0) return;
    if (!ev.isPrimary) return; // secondary touch of a pinch
    // HA's mobile sidebar owns the left screen edge.
    if (ev.pointerType === "touch" && ev.clientX <= 30) return;

    const refusal = this._refusalFor(mode);
    if (refusal) {
      this._showHint(mode.key, refusal);
      return;
    }

    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._pointerId = ev.pointerId;
    this._scrollIntent = false;
    this._holdEl = ev.currentTarget;
    this._target = ev.currentTarget;

    this._onUpRef = this._onPointerUp.bind(this);
    window.addEventListener("pointerup", this._onUpRef);
    window.addEventListener("pointercancel", this._onUpRef);
    this._onEarlyMoveRef = this._onEarlyMove.bind(this);
    window.addEventListener("pointermove", this._onEarlyMoveRef);

    this._engage(mode);
  }

  _onEarlyMove(ev) {
    if (this._scrollIntent) return;
    const dx = Math.abs(ev.clientX - this._startX);
    const dy = Math.abs(ev.clientY - this._startY);
    // Vertical dominance means the user is scrolling the dashboard, not us.
    if (dy > 10 && dy > dx + 4) {
      this._scrollIntent = true;
      this._release(false);
    }
  }

  _engage(mode) {
    if (this._holdKey) return;
    this._holdKey = mode.key;
    this._settling = false;
    this._p = 0;
    this._engagedAt = Date.now();
    this._holdMode = mode;

    try {
      this._target?.setPointerCapture?.(this._pointerId);
    } catch (_) {
      /* no pointer (keyboard), or the capture was refused — neither is fatal */
    }

    if (this._target) {
      document.documentElement.style.setProperty("touch-action", "none");
      document.documentElement.style.setProperty("overscroll-behavior", "contain");
      this._target.addEventListener("touchmove", this._preventTouch, { passive: false });
    }

    this._onVisibilityRef = () => {
      if (document.hidden) this._release(false);
    };
    document.addEventListener("visibilitychange", this._onVisibilityRef);

    this._tick = this._tick.bind(this);
    this._raf = requestAnimationFrame(this._tick);
  }

  /** The fill is written straight onto the held button rather than through a
   *  reactive property, for the reason materia-lock writes its spin the same
   *  way: the gesture owns every frame, and re-rendering a card with a hero
   *  and a zone list sixty times a second to move one custom property is a
   *  waste. Lit rewrites the whole style attribute on its next render, which
   *  is why render() reads this._p back out — otherwise an unrelated hass tick
   *  mid-hold would snap the fill back to zero. */
  _applyP() {
    this._holdEl?.style.setProperty("--ma-p", String(this._p));
  }

  _preventTouch(ev) {
    ev.preventDefault();
  }

  _tick() {
    if (!this._holdKey) return;
    const p = Math.min(1, (Date.now() - this._engagedAt) / this._holdMs);
    this._p = p;
    if (p >= 1) {
      this._commit();
      return;
    }
    this._applyP();
    this._raf = requestAnimationFrame(this._tick);
  }

  _onPointerUp(ev) {
    // iOS fires a spurious pointercancel immediately after a press starts.
    // Ignore it, but arm a fallback so a genuine cancel — where no pointerup
    // ever arrives — still releases the page scroll lock.
    if (ev.type === "pointercancel" && this._engagedAt) {
      if (Date.now() - this._engagedAt < 150) {
        clearTimeout(this._graceTimer);
        this._graceTimer = setTimeout(() => this._release(false), 400);
        return;
      }
    }
    clearTimeout(this._graceTimer);
    this._release(false);
  }

  /** End the gesture. Only the timer reaching 1 ever commits, so releasing is
   *  always a cancel: the fill springs home having done nothing. */
  _release(commit) {
    if (!this._holdKey && this._startX == null) return;
    if (commit) {
      this._commit();
      return;
    }
    this._settling = true;
    this._p = 0;
    this._cleanupGesture();
  }

  _commit() {
    const mode = this._holdMode;
    this._cleanupGesture();
    if (!mode) return;

    const isDisarm = this._activeMode?.key === mode.key;
    const target = isDisarm ? "disarmed" : mode.state;
    const service = isDisarm ? "alarm_disarm" : mode.service;

    // The fill drops back to nothing WITHOUT easing, and that costs no visible
    // movement: the swept face is a preview of the button's committed
    // appearance, and the pin below repaints the base face as exactly that in
    // the same frame. Same seamless handoff materia-drag-confirm relies on.
    this._settling = false;
    this._p = 0;

    this._pinFrom = this._rawState;
    this._pending = target;
    clearTimeout(this._pinTimer);
    // Stop claiming success if the panel never answers. Without this the card
    // would lie indefinitely about an offline alarm — and the revert is
    // ANNOUNCED rather than silent, because a state that quietly slides back
    // is indistinguishable from a card that is broken.
    this._armPinExpiry();

    // Tell sibling cards on this entity BEFORE the round-trip, so a hero above
    // this card moves in the same frame the fill commits.
    OptimismBus.publish(this.config.entity, target, this._pinFrom);

    const data = { entity_id: this.config.entity };
    if (this.config.code) data.code = String(this.config.code);
    this._fireHaptic("success");
    this._callService("alarm_control_panel", service, data);
  }

  /** The pin expiry guards ONE failure: nothing came back at all. It must not
   *  fire while the panel is visibly on its way, because arming and pending
   *  mean the panel answered and is counting down — measured on this very
   *  install, an UltraSync exit delay runs 90 SECONDS (Exit Delay 1 -> Armed
   *  Away at 90.0s, -> Armed Stay at 90.9s). The old flat 10s expiry therefore
   *  dropped the pin, announced a revert and shook the card while the alarm was
   *  doing exactly what it had been asked to do. So a transitional read
   *  RESCHEDULES instead of expiring, and only silence ever gives up. */
  _armPinExpiry() {
    clearTimeout(this._pinTimer);
    this._pinTimer = setTimeout(() => {
      if (!this._pending) return;
      if (TRANSITIONAL.has(this._rawState)) {
        this._armPinExpiry();
        return;
      }
      this._pending = null;
      this._fireHaptic("warning");
      this._playShake();
    }, Number(this.config.pending_timeout_ms ?? 20000));
  }

  _cleanupGesture() {
    /* Clear the swept fill ON THE ELEMENT, while we still hold the
       reference. The comment on _applyP claimed Lit would rewrite the
       whole style attribute on its next render — it only does that when
       the interpolated string CHANGES. `held` is false both before the
       press and after the release, so the string is identical, Lit skips
       the DOM write, and the imperatively-set --ma-p survives at its last
       frame: the fill sticks part-way across for good. */
    this._holdEl?.style.removeProperty("--ma-p");
    this._holdKey = null;
    this._holdMode = null;
    this._holdEl = null;
    this._startX = null;
    this._engagedAt = null;
    this._scrollIntent = false;
    clearTimeout(this._graceTimer);

    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
    document.documentElement.style.removeProperty("touch-action");
    document.documentElement.style.removeProperty("overscroll-behavior");
    if (this._target) {
      this._target.removeEventListener("touchmove", this._preventTouch);
      try {
        this._target.releasePointerCapture?.(this._pointerId);
      } catch (_) {
        /* already released */
      }
      this._target = null;
    }
    if (this._onVisibilityRef) {
      document.removeEventListener("visibilitychange", this._onVisibilityRef);
      this._onVisibilityRef = null;
    }
    if (this._onEarlyMoveRef) {
      window.removeEventListener("pointermove", this._onEarlyMoveRef);
      this._onEarlyMoveRef = null;
    }
    if (this._onUpRef) {
      window.removeEventListener("pointerup", this._onUpRef);
      window.removeEventListener("pointercancel", this._onUpRef);
      this._onUpRef = null;
    }
  }

  _isHoldKey(ev) {
    return ev.key === "Enter" || ev.key === " " || ev.key === "Spacebar";
  }

  _onKeyDown(ev, mode) {
    if (!this._isHoldKey(ev)) return;
    ev.preventDefault();
    if (ev.repeat) return; // auto-repeat must not restart the hold
    if (this._isUnavailable(this._stateObj)) return;
    const refusal = this._refusalFor(mode);
    if (refusal) {
      this._showHint(mode.key, refusal);
      return;
    }
    // No pointer capture and no page scroll lock for a key press: there is no
    // finger to fight over and nothing to steal the scroll from.
    this._target = null;
    this._holdEl = ev.currentTarget;
    this._engage(mode);
  }

  _onKeyUp(ev) {
    if (!this._isHoldKey(ev)) return;
    this._release(false);
  }

  /* ---- copy ------------------------------------------------------------- */

  _time(iso) {
    if (!iso) return "";
    const locale = this.hass?.locale?.language || "en";
    return new Date(iso).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
  }

  _modeLabel(mode) {
    return this.config[`label_${mode.key}`] ?? t(`al_mode_${mode.key}`, this.hass);
  }

  /** The big state word. */
  _title() {
    const s = this._state;
    if (this._isUnavailable(this._stateObj)) return t("unavailable", this.hass);
    if (s === "triggered") return t("al_state_triggered", this.hass);
    if (s === "arming") return t("al_state_arming", this.hass);
    if (s === "pending") return t("al_state_pending", this.hass);
    if (s === "disarmed") return t("al_state_disarmed", this.hass);
    const mode = MODES.find((m) => m.state === s);
    return mode ? t(`al_state_armed_${mode.key}`, this.hass) : t("al_state_unknown", this.hass);
  }

  /** The quieter line under it. */
  _sub(notReady) {
    const s = this._state;
    const st = this._stateObj;
    if (this._isUnavailable(st)) return { text: t("al_sub_unavailable", this.hass), warn: true };
    if (s === "triggered") {
      return { text: t("al_sub_triggered", this.hass, { time: this._time(st?.last_changed) }), warn: true };
    }
    if (s === "pending") return { text: t("al_sub_pending", this.hass), warn: true };
    if (this._busy) {
      return { text: t(this._disarming ? "al_sub_disarming" : "al_sub_arming", this.hass), warn: false };
    }
    if (s === "disarmed") {
      if (!notReady.length) return { text: t("al_sub_ready", this.hass), warn: false };
      const key = notReady.length === 1 ? "al_sub_not_ready_one" : "al_sub_not_ready";
      return { text: t(key, this.hass, { n: notReady.length }), warn: true };
    }
    if (ARMED_STATES.has(s)) {
      return { text: t("al_sub_armed_since", this.hass, { time: this._time(st?.last_changed) }), warn: false };
    }
    return { text: "", warn: false };
  }

  /** The hint line inside one mode button. */
  _buttonHint(mode) {
    if (this._hint?.key === mode.key) return this._hint.text;
    if (this._holdKey === mode.key) return t("al_hint_holding", this.hass);
    if (this._busy && this._disarming) return t("al_hint_disarming", this.hass);
    if (this._isInert(mode)) return t("al_hint_disarm_first", this.hass);
    if (this._activeMode?.key === mode.key) {
      /* ENTRY DELAY IS NOT "BUSY", and treating it as such was a real bug the
         test rig surfaced: forcing pending made the active button read
         "Arming..." — narrating the panel — at the one moment the line on the
         button you must actually press needs to say what to DO. pending is a
         countdown running against you, not a command of yours in flight.
         arming keeps its informational word, because that IS a state you asked
         for and the hero and footnote already say the same thing; the
         aria-label says "hold to disarm" in both cases regardless. */
      if (this._rawState === "pending") return t("al_hint_hold_to_disarm", this.hass);
      if (!this._busy) return t("al_hint_hold_to_disarm", this.hass);
      return t(this._disarming ? "al_hint_disarming" : "al_hint_arming", this.hass);
    }
    return t("al_hint_hold_to_arm", this.hass);
  }

  /** The line under the row, explaining the gesture on offer right now. */
  _footnote(notReady) {
    if (this._hint) return { text: this._hint.text, tone: "warn" };
    const s = this._state;
    const active = this._activeMode;
    if (this._isUnavailable(this._stateObj)) return { text: t("al_sub_unavailable", this.hass), tone: "warn" };
    if (s === "triggered") {
      return {
        text: t("al_foot_triggered", this.hass, { mode: active ? this._modeLabel(active) : "" }),
        tone: "alert",
      };
    }
    if (s === "pending") return { text: t("al_foot_pending", this.hass), tone: "alert" };
    if (this._busy) {
      return { text: t(this._disarming ? "al_foot_disarming" : "al_foot_arming", this.hass), tone: "" };
    }
    if (active) {
      const base = t("al_foot_armed", this.hass, { mode: this._modeLabel(active) });
      const extra = this.config.direct_switch || this._modes.length < 2
        ? ""
        : ` ${t("al_foot_locked_modes", this.hass)}`;
      return { text: base + extra, tone: "" };
    }
    if (notReady.length) {
      return { text: t("al_foot_disarmed_warn", this.hass, { n: notReady.length }), tone: "warn" };
    }
    return { text: t("al_foot_disarmed", this.hass), tone: "" };
  }

  /* ---- render ----------------------------------------------------------- */

  /** Connected-group corners: stadium ends on the outside of the row, the
   *  16px seam on the inside, and the active button breaking out of the group
   *  entirely with one uniform 28px radius. Straight out of
   *  src/elements/button-group/index.js. */
  _radius(i, n, isActive) {
    if (isActive) return `${ACTIVE_R}px`;
    const or = `${OUTER_R}px`;
    const ir = `${INNER_R}px`;
    if (n === 1) return or;
    if (i === 0) return `${or} ${ir} ${ir} ${or}`;
    if (i === n - 1) return `${ir} ${or} ${or} ${ir}`;
    return ir;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    // The quiet surface, named here as well as below: the two placeholder
    // branches never reach the colour block, and a body with no --ma-bg would
    // render as a transparent hole rather than a card.
    const blank = "--ma-bg:var(--md-sys-color-surface-container-low, var(--card-background-color));--ma-fg:var(--md-sys-color-on-surface);";

    // getStubConfig comes back without an entity on an install that has no
    // panel at all, so this has to explain itself rather than throw and break
    // the card-picker preview.
    if (!this.config.entity) {
      return html`<ha-card style=${blank}><div class="body">
        <div class="note">${t("al_needs_entity", this.hass)}</div>
      </div></ha-card>`;
    }

    const st = this._stateObj;
    if (!st) {
      return html`<ha-card style=${blank}><div class="body">
        <div class="note">${t("entity_not_found_with_id", this.hass, { entity: this.config.entity })}</div>
      </div></ha-card>`;
    }

    const unavailable = this._isUnavailable(st);
    const zones = this._zones;
    const notReady = this._notReady(zones);
    const triggered = this._triggered;
    const armedish = this._armedish;
    const modes = this._modes;
    const active = this._activeMode;

    /* COLOUR. The hero shape carries the state and the card stays the neutral
       surface — except triggered, which floods. That split is deliberate: if
       the whole card recoloured on every arm, the mode buttons underneath
       would need a second colour decision per state to stay legible, and the
       one state that genuinely must shout would have nothing louder left to
       do. Roles only, never literals. */
    const bg = triggered
      ? "var(--md-sys-color-error-container)"
      : (this.config.background ?? "var(--md-sys-color-surface-container-low, var(--card-background-color))");
    const fg = triggered
      ? "var(--md-sys-color-on-error-container)"
      : (this.config.background_on ?? "var(--md-sys-color-on-surface)");
    const accent = this.config.armed_color ?? "var(--md-sys-color-primary)";
    const accentOn = this.config.armed_color_on ?? "var(--md-sys-color-on-primary)";

    const heroBg = triggered
      ? "var(--md-sys-color-error)"
      : armedish
      ? accent
      : `color-mix(in srgb, ${fg} 12%, transparent)`;
    const heroFg = triggered ? "var(--md-sys-color-on-error)" : armedish ? accentOn : accent;

    // Quiet tonal pair for a button that is not the current mode — the
    // connected-group unselected treatment.
    const idleBg = "var(--md-sys-color-secondary-container)";
    const idleFg = "var(--md-sys-color-on-secondary-container)";

    const heroIcon = triggered
      ? (this.config.triggered_icon ?? "m3o:crisis-alert")
      : active && ARMED_STATES.has(this._state)
      ? (this.config[`icon_${active.key}`] ?? active.hero)
      : (this.config.disarmed_icon ?? "m3o:shield");

    const sub = this._sub(notReady);
    const foot = this._footnote(notReady);

    // The shape is only a control if it actually does something. With
    // tap_action: none it stops advertising itself as one — no role, no tab
    // stop — rather than offering an empty focus target.
    const heroAction = this.config.tap_action || { action: "more-info", entity: this.config.entity };
    const heroTappable = heroAction.action !== "none";

    return html`
      <ha-card class=${unavailable ? "unavailable" : ""} style="--ma-bg:${bg};--ma-fg:${fg};">
        <div class="body ${triggered ? "triggered" : ""}">
          ${this.config.hero === false
            ? nothing
            : html`
                <div class="hero">
                  <div
                    class="shape ${armedish ? "armed" : ""} ${this._busy ? "busy" : ""} ${this._turn ? "turn" : ""} ${this._shake ? "shake" : ""}"
                    style="--ma-hero-bg:${heroBg};--ma-hero-fg:${heroFg};--ma-turn-dir:${this._turnDir};${heroTappable ? "" : "cursor:default;"}"
                    role=${heroTappable ? "button" : "img"}
                    tabindex=${heroTappable ? 0 : -1}
                    aria-label=${this._title()}
                    @click=${() => heroTappable && this._handleAction(heroAction)}
                    @keydown=${(ev) => {
                      if (!heroTappable) return;
                      if (ev.key !== "Enter" && ev.key !== " " && ev.key !== "Spacebar") return;
                      ev.preventDefault();
                      this._handleAction(heroAction);
                    }}
                  >
                    <ha-icon .icon=${heroIcon}></ha-icon>
                  </div>
                  <div>
                    <div class="title">${this._title()}</div>
                    <div class="sub ${sub.warn ? "warn" : ""}">${sub.text}</div>
                  </div>
                </div>
              `}

          ${modes.length
            ? html`
                <div class="modes" role="group" aria-label=${t("al_aria_modes", this.hass)}>
                  ${modes.map((mode, i) => this._renderMode(mode, i, modes.length, {
                    active,
                    notReady,
                    triggered,
                    accent,
                    accentOn,
                    idleBg,
                    idleFg,
                    unavailable,
                  }))}
                </div>
              `
            : html`<div class="note">${t("al_no_modes", this.hass)}</div>`}

          ${this.config.footnote === false || !foot.text
            ? nothing
            : html`<div class="foot ${foot.tone}" aria-live="polite">${foot.text}</div>`}

          ${zones.length ? this._renderZones(zones) : nothing}
        </div>
      </ha-card>
    `;
  }

  _renderMode(mode, i, n, ctx) {
    const isActive = ctx.active?.key === mode.key;
    const inert = this._isInert(mode);
    const held = this._holdKey === mode.key;
    const label = this._modeLabel(mode);

    // The glyph says what the button IS. The active one keeps its own mode
    // icon (you are here) and the inert one becomes a lock (you cannot go
    // there); the hint line and the aria-label carry the verb.
    const icon = inert ? "m3o:lock" : (this.config[`icon_${mode.key}`] ?? mode.icon);

    const btnBg = isActive ? (ctx.triggered ? "var(--md-sys-color-error)" : ctx.accent) : ctx.idleBg;
    const btnFg = isActive ? (ctx.triggered ? "var(--md-sys-color-on-error)" : ctx.accentOn) : ctx.idleFg;

    /* THE SWEEP IS A PREVIEW of what the button becomes on commit — arming
       shows the accent it will wear, disarming shows the quiet tonal pair it
       will fall back to. The one exception is the whole point of the card: if
       a zone is not ready, arming sweeps in the repo warning role instead, so
       the warning arrives inside the gesture rather than beside it. */
    const armingWithHole = !isActive && ctx.notReady.length > 0;
    const sweep = armingWithHole
      ? "var(--md-sys-cust-color-warning, var(--md-sys-color-error))"
      : isActive
      ? ctx.idleBg
      : ctx.accent;
    const sweepInk = armingWithHole
      ? "var(--md-sys-cust-color-on-warning, var(--md-sys-color-on-error))"
      : isActive
      ? ctx.idleFg
      : ctx.accentOn;

    const aria = inert
      ? t("al_aria_inert", this.hass, { mode: label })
      : isActive
      ? t("al_aria_hold_disarm", this.hass)
      : t("al_aria_hold_arm", this.hass, { mode: label });

    const hint = this._buttonHint(mode);
    const face = html`
      <ha-icon .icon=${icon}></ha-icon>
      <span class="label">${label}</span>
      <span class="hint">${hint}</span>
    `;

    return html`
      <button
        class="mode ${isActive ? "active" : ""} ${inert ? "inert" : ""} ${this._refused === mode.key ? "refused" : ""}"
        style="border-radius:${this._radius(i, n, isActive)};--ma-btn-bg:${btnBg};--ma-btn-fg:${btnFg};--ma-sweep:${sweep};--ma-sweep-ink:${sweepInk};--ma-p:${held ? this._p : 0};"
        aria-label=${aria}
        aria-pressed=${isActive ? "true" : "false"}
        ?disabled=${ctx.unavailable}
        @pointerdown=${(ev) => this._onPointerDown(ev, mode)}
        @keydown=${(ev) => this._onKeyDown(ev, mode)}
        @keyup=${(ev) => this._onKeyUp(ev)}
        @blur=${() => this._release(false)}
        @contextmenu=${(ev) => ev.preventDefault()}
      >
        <div class="face">${face}</div>
        <div class="sweep ${this._settling && !held ? "settling" : ""}">
          <div class="face">${face}</div>
        </div>
        <div class="layer"></div>
      </button>
    `;
  }

  get _zonesExpanded() {
    return this._zonesOpen ?? !!this.config.zones_start_expanded;
  }

  get _unavailExpanded() {
    return !!this._unavailOpen;
  }

  /** One zone row. Shared by every group so a zone looks like itself
   *  wherever it appears, and so the substate line always comes from HA's own
   *  formatter (which already localises "Ready" / "Not Ready" for us). */
  _zoneRow(z, cls = "") {
    /* A sensing zone gets its own word. Showing the panel's raw "Not Ready"
       inside a group headed "ready" would read as a contradiction, and for a
       PIR "Not Ready" is a poor description of what is happening anyway —
       nothing is wrong, something moved. */
    const state = z.sensing
      ? t("al_zone_sensing", this.hass)
      : (this.hass.formatEntityState?.(z.st) ?? this._zoneWord(z.st));
    return html`
      <div class="zrow ${cls} ${z.sensing ? "sensing" : ""}">
        <ha-icon .icon=${z.icon}></ha-icon>
        <div class="ztext">
          <span class="zname">${z.name}</span>
          <span class="zstate">${state}</span>
        </div>
        ${z.skippable
          ? html`
              <button
                class="chip"
                aria-label=${t("al_aria_bypass", this.hass, { name: z.name })}
                @click=${() => this._fireZoneAction(z, "bypass")}
              >
                <ha-icon icon="m3o:visibility-off"></ha-icon>
                <span>${t("al_zone_bypass", this.hass)}</span>
              </button>
            `
          : nothing}
      </div>
    `;
  }

  /** A collapsed count that opens into its rows. Used for both the ready
   *  zones and the unavailable ones: with discovery on, either list can be
   *  forty rows long, and a card that dumps forty rows to say "everything is
   *  fine" has buried the two lines that matter. */
  _zoneSummary({ icon, cls, label, aria, open, toggle, rows }) {
    return html`
      <div class="zgroup">
        <button
          class="zrow summary ${cls} ${open ? "open" : ""}"
          aria-expanded=${open ? "true" : "false"}
          aria-label=${aria || label}
          @click=${toggle}
        >
          <ha-icon .icon=${icon}></ha-icon>
          <div class="ztext"><span class="zname">${label}</span></div>
          <ha-icon class="chev" icon="m3of:arrow-drop-down"></ha-icon>
        </button>
        ${open ? rows.map((z) => this._zoneRow(z)) : nothing}
      </div>
    `;
  }

  _renderZones(zones) {
    const notReady = zones.filter((z) => z.open);
    const unavailable = zones.filter((z) => z.unavailable);
    const bypassed = zones.filter((z) => z.bypassed);
    const ready = zones.filter((z) => !z.open && !z.bypassed && !z.unavailable);
    const sensing = ready.filter((z) => z.sensing).length;

    return html`
      <div class="zones">
        ${notReady.length
          ? html`
              <div class="zgroup">
                <div class="zgroup-title">${t("al_zones_not_ready", this.hass)}</div>
                ${notReady.map((z) => this._zoneRow(z, "notready"))}
              </div>
            `
          : nothing}

        ${unavailable.length
          ? this._zoneSummary({
              icon: "m3o:sensors-off",
              cls: "unavail",
              label: t(
                unavailable.length === 1 ? "al_zones_unavailable_one" : "al_zones_unavailable",
                this.hass,
                { n: unavailable.length }
              ),
              aria: t("al_aria_unavail_toggle", this.hass),
              open: this._unavailExpanded,
              toggle: () => {
                this._unavailOpen = !this._unavailExpanded;
              },
              rows: unavailable,
            })
          : nothing}

        ${ready.length
          ? this._zoneSummary({
              icon: "m3of:check-circle",
              cls: "ok",
              /* The count stays LIVE, because text changing length costs no
                 height — it is regrouping that resized the card, not counting.
                 So this can afford to be honest every second: when a transient
                 zone is sensing, say so on the same single line rather than
                 quietly filing it under "ready". */
              label: sensing
                ? t("al_zones_ready_sensing", this.hass, { n: ready.length - sensing, m: sensing })
                : t(ready.length === 1 ? "al_zones_ready_one" : "al_zones_ready_count", this.hass, {
                    n: ready.length,
                  }),
              aria: t("al_aria_zones_toggle", this.hass),
              open: this._zonesExpanded,
              toggle: () => {
                this._zonesOpen = !this._zonesExpanded;
              },
              rows: ready,
            })
          : nothing}

        ${bypassed.length
          ? html`
              <div class="zgroup">
                <div class="zgroup-title">${t("al_zones_bypassed", this.hass)}</div>
                <div class="chips">
                  ${bypassed.map((z) =>
                    z.unskippable
                      ? html`
                          <button
                            class="chip bypassed"
                            aria-label=${t("al_aria_unbypass", this.hass, { name: z.name })}
                            @click=${() => this._fireZoneAction(z, "unbypass")}
                          >
                            <ha-icon .icon=${z.icon}></ha-icon>
                            <span>${z.name}</span>
                            <ha-icon icon="m3o:close"></ha-icon>
                          </button>
                        `
                      : // No un-skip action configured, or no zone number to
                        // send: still SAY the zone is being skipped, just
                        // without a control that would do nothing.
                        html`
                          <span class="chip bypassed inert">
                            <ha-icon .icon=${z.icon}></ha-icon>
                            <span>${z.name}</span>
                          </span>
                        `
                  )}
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    // Hero plus the mode row, plus roughly a row per zone group on screen.
    // Reads whether zones are CONFIGURED rather than counting resolved ones:
    // this is called before hass lands, so discovery would return nothing and
    // report a card two rows shorter than it renders.
    const hasZones = !!this.config?.zone_filter
      || (Array.isArray(this.config?.zones) && this.config.zones.length > 0);
    return 6 + (hasZones ? 2 : 0);
  }
}

customElements.define("materia-alarm", MateriaAlarm);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-alarm",
  name: "Materia Alarm",
  description: "Alarm panel where arming IS the gesture: press and hold the mode you want. Zone list with bypass, and the not-ready warning lives inside the hold.",
  preview: true,
});
