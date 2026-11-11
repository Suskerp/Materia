const{S:e,t:t,a:n,b:a,i:o,c:i,r:l,l:s,R:r,A:c,D:d,d:_,e:m,f:h,s:p,g:u,h:b,j:g,k:f,m:v,n:y,o:w,p:x,q:k,u:$,v:S,w:z,x:E,y:j,z:A,B:C,P:L}=await import(globalThis[Symbol.for("materia.entry-url")]??new URL("./materia.js",import.meta.url).href);function O(a,o){const i=o?.locale||o?.language?o:this?.hass;if(null!=a.label)return t(a.label,i);const l=a.name||"";return e[`f_${l}`]?n(`f_${l}`,i):l.replace(/_/g," ").replace(/^\w/,e=>e.toUpperCase())}Object.assign(e,{e_custom_bypass:{en:"Custom bypass",nl:"Aangepast"},e_setup:{en:"Setup",nl:"Instellingen"},e_alarm_panel:{en:"Alarm panel",nl:"Alarmpaneel"},e_modes_offer_option:{en:"Modes to offer (optional)",nl:"Aangeboden modi (optioneel)"},e_leave_empty_offer:{en:"Leave empty to offer exactly what the panel reports it supports. Set this only to narrow the row or to change its order.",nl:"Leeg = precies wat het paneel ondersteunt. Vul enkel in om de rij te beperken of de volgorde te wijzigen."},e_gesture:{en:"Gesture",nl:"Gebaar"},e_hold_for_ms:{en:"Hold for (ms, default 800)",nl:"Vasthouden (ms, standaard 800)"},e_keep_above_500ms:{en:"Keep this above 500ms — the platform long-press timeout — or an ordinary long-press on the dashboard commits by accident.",nl:"Houd dit boven 500 ms — de lang-indrukken-limiet van het platform — anders bevestigt een gewone lange druk per ongeluk."},e_allow_switch_betwee:{en:"Allow switching between armed modes",nl:"Wisselen tussen ingeschakelde modi toestaan"},e_off_by_defaul:{en:"Off by default: while armed, the other modes are inert and must be disarmed through first. Leaving a house armed in the wrong shape is the mistake that gating prevents.",nl:"Standaard uit: ingeschakeld zijn de andere modi inactief en moet je eerst uitschakelen. Een huis in de verkeerde modus laten staan is net de fout die dit voorkomt."},e_exit_delay_ms:{en:"Exit delay (ms)",nl:"Uitloopvertraging (ms)"},e_how_long_panel:{en:"How long this panel takes to arm. Set it and the shape fills across the delay, showing how far through you are. Leave EMPTY and it breathes instead — the honest answer for a wait of unknown length, and better than a progress bar that finishes at the wrong moment. This is not the timeout below: that one is about silence, this one is about how the panel is programmed.",nl:"Hoe lang dit paneel nodig heeft om in te schakelen. Ingevuld vult de vorm zich over de vertraging; LEEG ademt hij — eerlijker bij een wachttijd van onbekende lengte. Dit is niet de time-out hieronder: die gaat over stilte, deze over hoe het paneel geprogrammeerd is."},e_entry_delay_ms:{en:"Entry delay (ms)",nl:"Ingangsvertraging (ms)"},e_same_for_countd:{en:"Same, for the countdown after someone comes in. Leave empty to breathe.",nl:"Idem, voor het aftellen nadat iemand binnenkomt. Leeg = ademen."},e_give_up_waitin:{en:"Give up waiting for the panel after (ms, default 20000)",nl:"Stop met wachten op het paneel na (ms, standaard 20000)"},e_how_long_card:{en:"How long the card keeps showing the state you asked for before admitting the panel never answered. Counts SILENCE only — every arming or entry-delay read restarts it, so a long exit delay does not need a long timeout here.",nl:"Hoe lang de kaart de gevraagde status toont voor ze toegeeft dat het paneel niet antwoordde. Telt enkel STILTE — elke inschakel- of ingangsmelding herstart de teller."},e_how_long_refusa:{en:"How long a refusal hint stays up (ms, default 2000)",nl:"Hoe lang een weigeringshint blijft staan (ms, standaard 2000)"},e_zones:{en:"Zones",nl:"Zones"},e_find_zones_automa:{en:"Find zones automatically",nl:"Zones automatisch zoeken"},e_entity_id_prefix:{en:"An entity_id prefix (sensor.ultrasync_zone) or a regex. Leave empty and add zones by hand below instead. A hand-written list always wins over this.",nl:"Een entity_id-prefix (sensor.ultrasync_zone) of regex. Leeg = zones hieronder met de hand toevoegen. Een handmatige lijst wint altijd."},e_zone_number_patter:{en:"Zone number pattern (default zone(\\d+)state$)",nl:"Patroon voor zonenummer (standaard zone(\\d+)state$)"},e_how_read_panel:{en:"How to read the panel's zone NUMBER out of an entity_id — the bypass services take a number, not an entity. A zone this does not match offers no Bypass button rather than firing a call with no zone.",nl:"Hoe het zoneNUMMER uit een entity_id gelezen wordt — de bypass-services vragen een nummer. Een zone die niet matcht krijgt geen Bypass-knop."},e_settle_before_zone:{en:"Settle before a zone counts as ready again (ms, default 8000)",nl:"Wachttijd voor een zone weer gereed telt (ms, standaard 8000)"},e_going_not_ready:{en:"Going NOT ready is always immediate — that is the warning, and it must never be late. This only delays a zone leaving the not-ready list, so a door being closed does not make the card jump while a contact bounces.",nl:"NIET gereed worden is altijd meteen — dat is de waarschuwing. Dit vertraagt enkel het verlaten van de niet-gereedlijst, zodat een stuiterend contact de kaart niet doet springen."},e_treat_zones_flap:{en:"Treat zones that flap as movement detectors",nl:"Flappende zones als bewegingsmelders behandelen"},e_last_resort_fallba:{en:"Last-resort fallback, for zones with nothing else to go on. A zone that changes repeatedly is behaving like a PIR, not a door: it keeps its place in the list and just recolours, instead of joining the not-ready group and turning the arm gesture amber. Zones are classified from device_class first, then from the integration's own icon, and a per-zone override always wins. Smoke, heat, gas and water zones are never reached by this.",nl:"Laatste redmiddel voor zones zonder andere info. Een zone die vaak wisselt gedraagt zich als een PIR: ze houdt haar plaats en kleurt enkel, in plaats van de niet-gereedgroep in te gaan. Classificatie gebeurt eerst via device_class, dan via het icoon; een override per zone wint altijd. Rook-, hitte-, gas- en waterzones nooit."},e_change_before_zone:{en:"Changes before a zone counts as flapping (default 6)",nl:"Wijzigingen voor een zone als flappend telt (standaard 6)"},e_window_those_change:{en:"Window those changes are counted over (ms, default 60000)",nl:"Venster waarin die wijzigingen geteld worden (ms, standaard 60000)"},e_read_can_bypass:{en:"Read can_bypass as the bypass indicator",nl:"can_bypass lezen als overbrugindicator"},e_on_by_defaul:{en:"On by default. Some panels never mark a zone's state as bypassed and instead stop allowing further bypass on it, so a can_bypass of false on an otherwise-ready zone means it is already skipped. Turn this off if your panel uses can_bypass to mean a zone can never be bypassed at all, or every such zone will be reported as skipped.",nl:"Standaard aan. Sommige panelen markeren een zone nooit als overbrugd maar staan verdere bypass niet meer toe; can_bypass false bij een gerede zone betekent dan al overgeslagen. Zet uit als je paneel can_bypass gebruikt voor 'nooit overbrugbaar'."},e_trust_can_bypass:{en:"Trust can_bypass even when not ready",nl:"can_bypass ook vertrouwen bij niet gereed"},e_off_by_defaul2:{en:"Off by default. Enable only when your panel uses can_bypass: false as the authoritative already-bypassed signal even while the zone state says Not Ready.",nl:"Standaard uit. Enkel aanzetten als je paneel can_bypass: false gebruikt als definitief 'al overbrugd', ook als de zone Niet Gereed meldt."},e_allow_bypass_smoke:{en:"Allow bypassing smoke and heat detectors",nl:"Rook- en hittemelders overbruggen toestaan"},e_off_by_defaul3:{en:"Off by default. The panel permits it, but skipping a 24-hour zone arms the house with fire detection deliberately excluded, and it does not fix the fault it hides. Turn this on only if you mean it.",nl:"Standaard uit. Het paneel staat het toe, maar een 24-uurszone overslaan schakelt het huis in zonder branddetectie, en het lost de fout niet op. Zet enkel aan als je het meent."},e_bypass_action:{en:"Bypass action",nl:"Bypass-actie"},e_fired_by_bypass:{en:"Fired by the Bypass button. Write {zone} anywhere in the data and the zone number is substituted in — e.g. ultrasync.bypass with data zone: {zone}. Leave empty to hide the button everywhere.",nl:"Uitgevoerd door de Bypass-knop. {zone} in de data wordt vervangen door het zonenummer — bv. ultrasync.bypass met data zone: {zone}. Leeg verbergt de knop."},e_un_bypass_action:{en:"Un-bypass action",nl:"Actie om bypass op te heffen"},e_fired_by_tappin:{en:"Fired by tapping a bypassed chip. Same {zone} substitution.",nl:"Uitgevoerd bij tikken op een overbrugde chip. Zelfde {zone}-vervanging."},e_layout:{en:"Layout",nl:"Indeling"},e_show_shape_state:{en:"Show the shape, state and sub-line",nl:"Vorm, status en subregel tonen"},e_show_explan_line:{en:"Show the explanation line under the buttons",nl:"Uitlegregel onder de knoppen tonen"},e_start_with_ready:{en:"Start with the ready zones expanded",nl:"Gerede zones opengeklapt starten"},e_list_zones_panel:{en:"List zones the panel cannot see",nl:"Zones tonen die het paneel niet ziet"},e_appearance:{en:"Appearance",nl:"Uiterlijk"},e_accent_while_armed:{en:"Accent while armed (default primary)",nl:"Accent tijdens inschakeling (standaard primary)"},e_worn_by_shape:{en:"Worn by the shape and by the active mode button, so the two read as one object.",nl:"Gedragen door de vorm en de actieve modusknop, zodat ze als één object lezen."},e_ink_on_accent:{en:"Ink on that accent",nl:"Inkt op dat accent"},e_card_backgr:{en:"Card background",nl:"Kaartachtergrond"},e_card_text:{en:"Card text",nl:"Kaarttekst"},e_shape_glyph_while:{en:'Shape glyph while disarmed (default "shield")',nl:'Symbool in de vorm, uitgeschakeld (standaard "shield")'},e_shape_glyph_while2:{en:'Shape glyph while triggered (default "crisis-alert")',nl:'Symbool in de vorm, alarm (standaard "crisis-alert")'},e_mode_labels_icons:{en:"Mode labels and icons",nl:"Moduslabels en iconen"},e_actions:{en:"Actions",nl:"Acties"},e_tappin_shape:{en:"Tapping the shape",nl:"Tikken op de vorm"},e_zone_sensor:{en:"Zone sensor",nl:"Zonesensor"},e_door_window_contac:{en:'A door, window or contact. Not ready means on / open / unlocked, or the panel\'s own "Not Ready"; a state starting with "Bypass" counts as bypassed. Whether a Bypass button appears is the panel\'s call, via its can_bypass attribute.',nl:'Een deur, raam of contact. Niet gereed = aan / open / ontgrendeld, of "Not Ready" van het paneel; een status die met "Bypass" begint telt als overbrugd.'},e_name_option_defaul:{en:"Name (optional — defaults to the entity name)",nl:"Naam (optioneel — standaard de entiteitsnaam)"},e_icon_option:{en:"Icon (optional)",nl:"Icoon (optioneel)"},e_24_hour_zone:{en:"24-hour zone (smoke, heat, gas, water)",nl:"24-uurszone (rook, hitte, gas, water)"},e_normal_detect_from:{en:"Normally detected from device_class or the integration's icon, and remembered if the zone goes offline. Pin it here for a zone that is already unavailable when the dashboard loads, since there is nothing to read then. A 24-hour zone always blocks arming, never counts as a movement detector, and is not offered a Bypass button.",nl:"Normaal afgeleid van device_class of het icoon. Leg het hier vast voor een zone die al onbeschikbaar is bij het laden. Een 24-uurszone blokkeert altijd en krijgt geen Bypass-knop."},e_moveme_detect:{en:"Movement detector",nl:"Bewegingsmelder"},e_overri_automa_guess:{en:"Overrides the automatic guess. On: this zone never blocks arming and never turns the gesture amber — it keeps its row and recolours. Off: it always blocks. Leave unset to classify from device_class, falling back to whether it flaps.",nl:"Overschrijft de automatische gok. Aan: blokkeert nooit en kleurt enkel. Uit: blokkeert altijd. Leeg: via device_class, anders of hij flapt."},e_return_player_after:{en:"Return to the player after (s without a touch, 0 = never)",nl:"Terug naar de speler na (s zonder aanraking, 0 = nooit)"},e_content:{en:"Content",nl:"Inhoud"},e_stack:{en:"Stack",nl:"Stapel"},e_row:{en:"Row",nl:"Rij"},e_grid:{en:"Grid",nl:"Raster"},e_kiosk_cover_player:{en:"Kiosk (cover | player, side panel)",nl:"Kiosk (hoes | speler, zijpaneel)"},e_column_number_grid:{en:"Columns (number or grid-template-columns)",nl:"Kolommen (aantal of grid-template-columns)"},e_gap_px:{en:"Gap (px)",nl:"Tussenruimte (px)"},e_paddin_px:{en:"Padding (px)",nl:"Binnenmarge (px)"},e_draw_surfac:{en:"Draw the surface",nl:"Oppervlak tekenen"},e_kiosk_panel:{en:"Kiosk panel",nl:"Kioskpaneel"},e_fill_screen_height:{en:"Fill the screen height",nl:"Schermhoogte vullen"},e_close_panel_after:{en:"Close the panel after (s without a touch, 0 = never)",nl:"Paneel sluiten na (s zonder aanraking, 0 = nooit)"},e_label:{en:"Label",nl:"Label"},e_attrib_fan_speed:{en:"Attribute (e.g. fan_speed) instead of the state",nl:"Attribuut (bv. fan_speed) in plaats van de status"},e_option_shown_as:{en:'Option shown as its own round button (e.g. "off")',nl:'Optie als eigen ronde knop (bv. "off")'},e_icon_for_button:{en:"Icon for that button",nl:"Icoon voor die knop"},e_lit_bar_color:{en:"Lit bar color",nl:"Kleur van verlichte balk"},e_glyph_color_on:{en:"Glyph color on the accent fill",nl:"Symboolkleur op de accentvulling"},e_advanced:{en:"Advanced",nl:"Geavanceerd"},e_overri_servic_domain:{en:"Override service (domain.service)",nl:"Andere service (domein.service)"},e_overri_servic_data:{en:"Override service data key",nl:"Andere data-sleutel voor de service"},e_scale:{en:"Scale",nl:"Schaal"},e_full_scale_value:{en:"Full-scale value (optional)",nl:"Volle-schaalwaarde (optioneel)"},e_all_bars_share:{en:"All bars share one scale, or they cannot be compared. Set this when the domain has a real ceiling — an inverter's kW rating, say — so the bars stop rescaling every time the largest reading moves. Leave empty to scale to the largest current value.",nl:"Alle balken delen één schaal. Vul in als er een echt plafond is — bv. het kW-vermogen van een omvormer — zodat ze niet steeds herschalen. Leeg = schalen naar de grootste waarde."},e_decima_places_option:{en:"Decimal places (optional)",nl:"Decimalen (optioneel)"},e_leave_empty_choose:{en:"Leave empty to choose per value: whole numbers above 100, one decimal below.",nl:"Leeg = per waarde: gehele getallen boven 100, één decimaal eronder."},e_words:{en:"Words",nl:"Woorden"},e_block_label_option:{en:"Block label (optional)",nl:"Bloklabel (optioneel)"},e_sits_top_left:{en:"Sits top-left, uppercased — what this block is. Rendered as a quiet eyebrow, not a headline.",nl:"Linksboven, in hoofdletters — wat dit blok is. Een stille bovenregel, geen kop."},e_freshn_note_option:{en:"Freshness note (optional)",nl:"Versheidsnotitie (optioneel)"},e_top_right_quiete:{en:'Top-right, quieter still — how current the readings are ("bijgewerkt 1 min"). Templatable, so it can be a relative time.',nl:'Rechtsboven, nog stiller — hoe recent de waarden zijn ("bijgewerkt 1 min"). Templates mogelijk.'},e_status_line:{en:"Status line",nl:"Statusregel"},e_senten_page_opened:{en:"The sentence the page is opened to read. Templatable, so the install supplies its own wording in its own language — this card ships no prose.",nl:"De zin waarvoor de pagina geopend wordt. Templates mogelijk, zodat je je eigen woorden in je eigen taal gebruikt."},e_status_icon:{en:"Status icon",nl:"Statusicoon"},e_status_icon_colour:{en:"Status icon colour",nl:"Kleur van het statusicoon"},e_footno_option:{en:"Footnote (optional)",nl:"Voetnoot (optioneel)"},e_quiete_than_status:{en:"Quieter than the status it qualifies — a confidence note, a caveat, when the reading was taken.",nl:"Stiller dan de status — een kanttekening, of wanneer gemeten werd."},e_entity:{en:"Entity",nl:"Entiteit"},e_attrib_option:{en:"Attribute (optional)",nl:"Attribuut (optioneel)"},e_read_attrib_instea:{en:"Read an attribute instead of the state — for a sensor that carries several numbers at once.",nl:"Lees een attribuut in plaats van de status — voor een sensor met meerdere getallen."},e_label_option_defaul:{en:"Label (optional — defaults to the entity name)",nl:"Label (optioneel — standaard de entiteitsnaam)"},e_unit_option_defaul:{en:"Unit (optional — defaults to the entity's own)",nl:"Eenheid (optioneel — standaard die van de entiteit)"},e_bar_colour:{en:"Bar colour",nl:"Balkkleur"},e_image_replac_icon:{en:"Image (replaces icon)",nl:"Afbeelding (vervangt icoon)"},e_fallba_image_shown:{en:"Fallback image (shown instead of the icon when there's no image)",nl:"Reserve-afbeelding (i.p.v. het icoon als er geen afbeelding is)"},e_active_backgr:{en:"Active background",nl:"Actieve achtergrond"},e_active_text_icon:{en:"Active text / icon",nl:"Actieve tekst / icoon"},e_show_last_change:{en:"Show last changed",nl:"Laatst gewijzigd tonen"},e_subtit_inline_with:{en:"Subtitle inline with state",nl:"Ondertitel naast de status"},e_slider_can_turn:{en:"Slider can turn off",nl:"Schuifregelaar kan uitzetten"},e_show_stop:{en:"Show stop",nl:"Stop tonen"},e_label_option:{en:"Label (optional)",nl:"Label (optioneel)"},e_entity_holdin_select:{en:"Entity holding the selection (optional)",nl:"Entiteit met de selectie (optioneel)"},e_only_needed_when:{en:"Only needed when items don't carry their own entity — a room queue's text, an input_select.",nl:"Enkel nodig als items geen eigen entiteit hebben — tekst van een kamerwachtrij, een input_select."},e_attrib_instea_state:{en:"Attribute (instead of the state)",nl:"Attribuut (in plaats van de status)"},e_multi_select_state:{en:"Multi-select (state is a comma-separated list)",nl:"Meervoudige keuze (status is een kommalijst)"},e_carous_horizo_scroll:{en:"Carousel (horizontal scroll instead of a wrapped grid)",nl:"Carrousel (horizontaal scrollen i.p.v. raster)"},e_auto_sort:{en:"Auto-sort",nl:"Automatisch sorteren"},e_sort_by_pick:{en:"Sort by pick frequency on load",nl:"Bij laden sorteren op keuzefrequentie"},e_reads_tracke_entity:{en:"Reads the tracked entity's recent history once when the card loads and puts the most-often-picked values first — the tiles you actually use float to the front instead of always sitting in configured order.",nl:"Leest bij het laden de recente geschiedenis en zet de vaakst gekozen waarden vooraan."},e_histor_window_in:{en:"History window, in days (default 30)",nl:"Geschiedenisvenster in dagen (standaard 30)"},e_select_tile_color:{en:"Selected tile color",nl:"Kleur geselecteerde tegel"},e_select_tile_text:{en:"Selected tile text",nl:"Tekst geselecteerde tegel"},e_second_line_option:{en:"Secondary line (optional)",nl:"Tweede regel (optioneel)"},e_entity_option_tile:{en:"Entity (optional — this tile's own state)",nl:"Entiteit (optioneel — status van deze tegel)"},e_room_s_own:{en:"A room's own input_boolean, say — drives the tile's highlight independent of the card's tracked entity.",nl:"Bv. de input_boolean van een kamer — stuurt de markering van de tegel los van de gevolgde entiteit."},e_value_when_there:{en:"Value (when there's no per-item entity)",nl:"Waarde (als er geen entiteit per item is)"},e_action_overri_defaul:{en:"Action (overrides the default toggle/select)",nl:"Actie (vervangt standaard schakelen/kiezen)"},e_entity_holdin_select2:{en:"Entity holding the selection",nl:"Entiteit met de selectie"},e_show_check_on:{en:"Show the check on selected chips",nl:"Vinkje tonen op geselecteerde chips"},e_select_chip_color:{en:"Selected chip color",nl:"Kleur geselecteerde chip"},e_select_chip_text:{en:"Selected chip text",nl:"Tekst geselecteerde chip"},e_sensors:{en:"Sensors",nl:"Sensoren"},e_temper_sensor:{en:"Temperature sensor",nl:"Temperatuursensor"},e_humidi_sensor:{en:"Humidity sensor",nl:"Vochtigheidssensor"},e_outdoo_temper_sensor:{en:"Outdoor temperature sensor",nl:"Buitentemperatuursensor"},e_behavior:{en:"Behavior",nl:"Gedrag"},e_new_sectio:{en:"New section",nl:"Nieuwe sectie"},e_wallet_sectio_nested:{en:"Wallet section (nested cards)",nl:"Walletsectie (geneste kaarten)"},e_menu_tap_opens:{en:"Menu (tap opens options)",nl:"Menu (tikken opent opties)"},e_keep_height_talles:{en:"Keep the height of the tallest section (no reflow when cycling)",nl:"Hoogte van de hoogste sectie aanhouden (geen verspringen)"},e_dial:{en:"Dial",nl:"Draaiknop"},e_curren_temper_sensor:{en:"Current temperature sensor (optional)",nl:"Huidige-temperatuursensor (optioneel)"},e_curren_humidi_sensor:{en:"Current humidity sensor (optional)",nl:"Huidige-vochtigheidssensor (optioneel)"},e_target_step:{en:"Target step",nl:"Stap voor doelwaarde"},e_defaul_step_report:{en:"Default: the step reported by the selected entity.",nl:"Standaard: de stap van de gekozen entiteit."},e_dial_min_defaul:{en:"Dial min (default: entity)",nl:"Draaiknop min (standaard: entiteit)"},e_dial_max_defaul:{en:"Dial max (default: entity)",nl:"Draaiknop max (standaard: entiteit)"},e_humidi_dial_min:{en:"Humidity dial min (default: entity)",nl:"Vochtigheid min (standaard: entiteit)"},e_humidi_dial_max:{en:"Humidity dial max (default: entity)",nl:"Vochtigheid max (standaard: entiteit)"},e_steppe_placem:{en:"Stepper placement",nl:"Plaats van de knoppen"},e_vertic_beside_dial:{en:"Vertical, beside the dial",nl:"Verticaal, naast de draaiknop"},e_below_dial:{en:"Below the dial",nl:"Onder de draaiknop"},e_wave_animat:{en:"Wave animation",nl:"Golfanimatie"},ed_climate_show_modes:{en:"Show the mode buttons",nl:"Modusknoppen tonen"},ed_climate_hvac_modes:{en:"Modes to show",nl:"Te tonen modi"},ed_climate_hvac_modes_help:{en:"None selected: every mode the thermostat offers",nl:"Niets gekozen: elke modus die de thermostaat aanbiedt"},ed_mode_off:{en:"Off",nl:"Uit"},ed_mode_heat:{en:"Heat",nl:"Verwarmen"},ed_mode_cool:{en:"Cool",nl:"Koelen"},ed_mode_heat_cool:{en:"Heat/cool",nl:"Verwarmen/koelen"},ed_mode_auto:{en:"Auto",nl:"Auto"},e_auto_hvac_action:{en:"Auto (hvac_action, or inferred from temps)",nl:"Auto (hvac_action, of afgeleid uit temperaturen)"},e_always_whenev_mode:{en:"Always (whenever the mode is on)",nl:"Altijd (zolang de modus aan is)"},e_never:{en:"Never",nl:"Nooit"},e_entity_reflec_drive:{en:"Entity to reflect and drive (optional)",nl:"Entiteit om te tonen en te sturen (optioneel)"},e_with_entity_no:{en:"With an entity and no actions below, the gesture turns it on and the active face turns it off — nothing else to configure. Leave empty to fire an action only.",nl:"Met een entiteit en geen acties hieronder zet het gebaar ze aan en de actieve kant uit. Leeg = enkel een actie uitvoeren."},e_state_counts_as:{en:"State that counts as active",nl:"Status die als actief telt"},e_defaul_usual_on:{en:'Defaults to the usual on/open/unlocked family. Set this for a control whose "on" is spelled something else.',nl:"Standaard de gewone on/open/unlocked-familie. Vul in als 'aan' anders heet."},e_action_when_commit:{en:"Action when committing",nl:"Actie bij bevestigen"},e_fired_when_gestur:{en:"Fired when the gesture completes. Overrides the default turn-on.",nl:"Uitgevoerd als het gebaar voltooid is. Vervangt het standaard aanzetten."},e_action_when_switch:{en:"Action when switching off",nl:"Actie bij uitzetten"},e_fired_by_active:{en:"Fired by the active face. Overrides the default turn-off.",nl:"Uitgevoerd door de actieve kant. Vervangt het standaard uitzetten."},e_commit_gestur:{en:"Commit gesture",nl:"Bevestigingsgebaar"},e_press_hold:{en:"Press and hold",nl:"Ingedrukt houden"},e_slide_across:{en:"Slide across",nl:"Overschuiven"},e_which_direct_needs:{en:"Which direction needs the gesture",nl:"Welke richting het gebaar vraagt"},e_turnin_on_only:{en:"Turning ON only, by default: switching an override off returns things to normal and costs nothing, and making the cheap direction ceremonial teaches people the gesture is a formality. Choose both where OFF is the dangerous direction — a control that disables a protection rather than enabling a cost.",nl:"Standaard enkel AANzetten: een override uitzetten brengt alles terug naar normaal. Kies beide als UIT de gevaarlijke richting is — een bediening die een beveiliging uitschakelt."},e_only_turnin_on:{en:"Only turning on",nl:"Enkel aanzetten"},e_both_direct:{en:"Both directions",nl:"Beide richtingen"},e_fracti_track_cross:{en:"Fraction of the track to cross (default 0.55)",nl:"Deel van de baan om over te schuiven (standaard 0,55)"},e_give_up_waitin2:{en:"Give up waiting for the entity after (ms, default 10000)",nl:"Stop met wachten op de entiteit na (ms, standaard 10000)"},e_eyebro_option:{en:"Eyebrow (optional)",nl:"Bovenregel (optioneel)"},e_gestur_label:{en:"Gesture label",nl:"Gebaarlabel"},e_instru_across_track:{en:"The instruction across the track. Keep it short — it sits on one line.",nl:"De instructie op de baan. Houd het kort — één regel."},e_warnin_conseq_line:{en:"Warning / consequence line",nl:"Waarschuwings- / gevolgregel"},e_point_card_shown:{en:"THE POINT OF THIS CARD. Shown before the gesture is touched and while it is held, which is strictly more informative than a dialog that appears after the decision and gets dismissed by reflex. Put the cost or the consequence here.",nl:"HET DOEL VAN DEZE KAART. Getoond voor en tijdens het gebaar — informatiever dan een dialoog achteraf die je uit reflex wegklikt. Zet hier de kost of het gevolg."},e_colour_warnin_line:{en:"Colour the warning line",nl:"Waarschuwingsregel kleuren"},e_label_while_active:{en:"Label while active",nl:"Label indien actief"},e_captio_while_active:{en:"Caption while active",nl:"Bijschrift indien actief"},e_falls_back_warnin:{en:"Falls back to the warning line above when empty.",nl:"Leeg = de waarschuwingsregel hierboven."},e_active_face_hint:{en:'Active face hint (default "Tap to stop")',nl:'Hint op de actieve kant (standaard "Tik om te stoppen")'},e_while_waitin_defaul:{en:'While waiting (default "Working…")',nl:'Tijdens wachten (standaard "Bezig…")'},e_backgr_while_active:{en:"Background while active",nl:"Achtergrond indien actief"},e_text_while_active:{en:"Text while active",nl:"Tekst indien actief"},e_gestur_track:{en:"Gesture track",nl:"Gebaarbaan"},e_text_on_track:{en:"Text on the track",nl:"Tekst op de baan"},e_slide_handle:{en:"Slide handle",nl:"Schuifknop"},e_handle_glyph:{en:"Handle glyph",nl:"Symbool op de knop"},e_icon_while_active:{en:'Icon while active (default "check-circle")',nl:'Icoon indien actief (standaard "check-circle")'},e_icon_on_gestur:{en:"Icon on the gesture handle (optional)",nl:"Icoon op de gebaarknop (optioneel)"},e_doorbe_entity:{en:"Doorbell entity",nl:"Deurbelentiteit"},e_on_ringin_countd:{en:"on = ringing. The countdown runs from its last change.",nl:"aan = belt. Het aftellen loopt vanaf de laatste wijziging."},e_popup_timeou_second:{en:"Popup timeout (seconds)",nl:"Pop-up time-out (seconden)"},e_match_popup_timeou:{en:"Match the popup timeout so the top bar and the dialog agree.",nl:"Gelijk aan de pop-up time-out, zodat bovenbalk en dialoog overeenkomen."},e_ring_length_second:{en:"Ring length (seconds)",nl:"Beldduur (seconden)"},e_how_long_chime:{en:"How long the chime actually sounds — the ring lapses when it ends. Empty = same as the popup timeout.",nl:"Hoe lang de bel echt klinkt. Leeg = gelijk aan de pop-up time-out."},e_eyebro_while_ringin:{en:"Eyebrow while ringing (default: Doorbell)",nl:"Bovenregel bij bellen (standaard: Deurbel)"},e_where_ring_from:{en:"Where the ring is from (default: Front door)",nl:"Waar er gebeld wordt (standaard: Voordeur)"},e_previe_phase_demo:{en:"Preview a phase (demo)",nl:"Fase voorvertonen (demo)"},e_forces_card_s:{en:"Forces the card's face — the live phases only show during a real ring. Clear it for real use.",nl:"Forceert de kaartweergave — de echte fasen verschijnen enkel bij een echte bel. Leegmaken voor echt gebruik."},e_ringing:{en:"Ringing",nl:"Belt"},e_opened:{en:"Opened",nl:"Geopend"},e_lapsed:{en:"Lapsed",nl:"Verlopen"},e_buzz_panel:{en:"Buzz panel",nl:"Zoemerpaneel"},e_tap_buzz_action:{en:"Tap-to-buzz action",nl:"Actie om open te zoemen"},e_street_door_buzzer:{en:"The street-door buzzer. Leave empty to hide the panel.",nl:"De zoemer van de straatdeur. Leeg verbergt het paneel."},e_buzzin_indica:{en:"Buzzing indicator",nl:"Zoemindicator"},e_on_buzzin_usuall:{en:"on = buzzing (usually the buzzer script itself).",nl:"aan = zoemt (meestal het zoemerscript zelf)."},e_panel_title_defaul:{en:"Panel title (default: Buzz in)",nl:"Paneeltitel (standaard: Opendoen)"},e_panel_sub_line:{en:"Panel sub-line",nl:"Subregel van het paneel"},e_defaul_street_door:{en:'Default: "Street door only", translated with the dashboard.',nl:'Standaard: "Enkel de straatdeur", vertaald met het dashboard.'},e_open_panel:{en:"Open panel",nl:"Openpaneel"},e_lock:{en:"Lock",nl:"Slot"},e_gestur_unlock_leave:{en:"The gesture unlocks this. Leave empty to hide the panel.",nl:"Het gebaar ontgrendelt dit. Leeg verbergt het paneel."},e_open_gestur:{en:"Open gesture",nl:"Gebaar om te openen"},e_slide:{en:"Slide",nl:"Schuiven"},e_hold:{en:"Hold",nl:"Vasthouden"},e_open_action_replac:{en:"Open action (replaces the plain unlock)",nl:"Openactie (vervangt het gewone ontgrendelen)"},e_for_let_them:{en:"For a let-them-in sequence that clears more than this one lock. Re-locking always drives the lock itself.",nl:"Voor een binnenlaat-reeks die meer dan dit ene slot opent. Opnieuw vergrendelen stuurt altijd het slot zelf."},e_panel_title_defaul2:{en:"Panel title (default: Open the front door)",nl:"Paneeltitel (standaard: Open de voordeur)"},e_defaul_unlock_front:{en:'Default: "Unlocks the front door for your visitor.", translated with the dashboard.',nl:'Standaard: "Ontgrendelt de voordeur voor je bezoeker.", vertaald met het dashboard.'},e_bottom_row:{en:"Bottom row",nl:"Onderste rij"},e_empty_hides_button:{en:"Empty hides the button. The whole row hides when nothing in it is configured.",nl:"Leeg verbergt de knop. De rij verdwijnt als er niets in ingesteld is."},e_empty_hides_button2:{en:"Empty hides the button.",nl:"Leeg verbergt de knop."},e_mute_toggle_entity:{en:"Mute toggle entity",nl:"Entiteit om te dempen"},e_input_boolea_silenc:{en:"input_boolean silencing the chime. Empty hides the button.",nl:"input_boolean die de bel dempt. Leeg verbergt de knop."},e_entity_option:{en:"Entity (optional)",nl:"Entiteit (optioneel)"},e_with_entity_header:{en:"With an entity the header wears an M3 switch and its state tones the row. Leave empty for a plain drawer.",nl:"Met een entiteit krijgt de kop een M3-schakelaar en kleurt de status de rij. Leeg = gewone lade."},e_second_text_templa:{en:"Secondary text / template",nl:"Tweede tekst / template"},e_behaviour:{en:"Behaviour",nl:"Gedrag"},e_open_by_defaul:{en:"Open by default",nl:"Standaard open"},e_show_switch_in:{en:"Show the switch in the header",nl:"Schakelaar in de kop tonen"},e_only_applie_when:{en:"Only applies when an entity is set.",nl:"Enkel als er een entiteit is."},e_flat_no_card:{en:"Flat (no card chrome — for nesting)",nl:"Vlak (geen kaartrand — om te nesten)"},e_row_color_escala:{en:"Row color (e.g. escalate from state)",nl:"Rijkleur (bv. escaleren vanuit de status)"},e_text_icon_color:{en:"Text / icon color",nl:"Kleur tekst / icoon"},e_switch_track_color:{en:"Switch track color when on",nl:"Kleur schakelaarbaan indien aan"},e_switch_thumb_color:{en:"Switch thumb color when on",nl:"Kleur schakelaarknop indien aan"},e_switch_action_overri:{en:"Switch action (overrides toggling the entity)",nl:"Schakelaaractie (vervangt het schakelen van de entiteit)"},e_moon_phase_sensor:{en:"Moon phase sensor (default: sensor.moon)",nl:"Maanfasesensor (standaard: sensor.moon)"},e_days_shown:{en:"Days shown",nl:"Getoonde dagen"},e_tap_day_expand:{en:"Tap a day to expand its hourly detail",nl:"Tik op een dag voor het uurdetail"},e_show_precip_chance:{en:"Show precipitation chance",nl:"Neerslagkans tonen"},e_hide_below:{en:"Hide below (%)",nl:"Verbergen onder (%)"},e_label_for_today:{en:"Label for today",nl:"Label voor vandaag"},e_header_title:{en:"Header title",nl:"Koptitel"},e_show_header:{en:"Show header",nl:"Kop tonen"},e_hours_shown:{en:"Hours shown",nl:"Getoonde uren"},e_percen_fillin_cookie:{en:"Percent (filling cookie)",nl:"Percentage (vullend koekje)"},e_batter_vertic_bar:{en:"Battery (vertical bar)",nl:"Batterij (verticale balk)"},e_temper_thermo:{en:"Temperature (thermometer)",nl:"Temperatuur (thermometer)"},e_power_load_bars:{en:"Power (load bars)",nl:"Vermogen (belastingsbalken)"},e_energy:{en:"Energy",nl:"Energie"},e_on_off_spinni:{en:"On/off (spinning star)",nl:"Aan/uit (draaiende ster)"},e_plain_value:{en:"Plain value",nl:"Gewone waarde"},e_robot_vacuum_state:{en:"Robot vacuum (state + room + battery bar)",nl:"Robotstofzuiger (status + kamer + batterijbalk)"},e_gauge_tile_floods:{en:"Gauge · tile floods to the value",nl:"Meter · tegel vult tot de waarde"},e_gauge_value_over:{en:"Gauge · value over a track",nl:"Meter · waarde boven een baan"},e_gauge_ladder_bars:{en:"Gauge · ladder of bars",nl:"Meter · ladder van balken"},e_gauge_ring_beside:{en:"Gauge · ring beside the value",nl:"Meter · ring naast de waarde"},e_gauge_positi_on:{en:"Gauge · position on a ramp, with reference marks",nl:"Meter · positie op een helling, met referentiemerken"},e_histor_area_sparkl:{en:"History · area sparkline hero",nl:"Geschiedenis · vlakgrafiek"},e_histor_bare_line:{en:"History · bare line",nl:"Geschiedenis · kale lijn"},e_histor_bar_per:{en:"History · a bar per day",nl:"Geschiedenis · een balk per dag"},e_histor_event_ticks:{en:"History · event ticks (tonal row)",nl:"Geschiedenis · gebeurtenisstreepjes"},e_summar_value_histor:{en:"Summary · value, history and supporting metrics",nl:"Overzicht · waarde, geschiedenis en extra metingen"},e_summar_progre_ring:{en:"Summary · progress ring and authored copy",nl:"Overzicht · voortgangsring en eigen tekst"},e_category:{en:"Category",nl:"Categorie"},e_title:{en:"Title",nl:"Titel"},e_icon_overri_entity:{en:"Icon (overrides entity icon)",nl:"Icoon (vervangt het entiteitsicoon)"},e_subtitle:{en:"Subtitle",nl:"Ondertitel"},e_active_state_binary:{en:"Active state (binary)",nl:"Actieve status (binair)"},e_option_state_value:{en:"Optional state value or template for active styling, e.g. Charging.",nl:"Optionele statuswaarde of template voor actieve stijl, bv. Charging."},e_scale_min_defaul:{en:"Scale min (default 10°)",nl:"Schaal min (standaard 10°)"},e_scale_max_defaul:{en:"Scale max (default 30°)",nl:"Schaal max (standaard 30°)"},e_full_load_watts:{en:"Full-load watts (default 3000)",nl:"Vollast in watt (standaard 3000)"},e_number_bars_defaul:{en:"Number of bars (default 5)",nl:"Aantal balken (standaard 5)"},e_scale_min_defaul2:{en:"Scale min (default: the entity's min attribute, else 0)",nl:"Schaal min (standaard: min-attribuut van de entiteit, anders 0)"},e_scale_max_defaul2:{en:"Scale max (default: the entity's max attribute, else 100 for a %)",nl:"Schaal max (standaard: max-attribuut van de entiteit, anders 100 voor %)"},e_withou_max_gauge:{en:"Without a max the gauge cannot be calibrated and the tile falls back to a plain value.",nl:"Zonder max kan de meter niet kalibreren en valt de tegel terug op een gewone waarde."},e_captio_under_gauge:{en:"Caption under the gauge",nl:"Bijschrift onder de meter"},e_your_senten_in:{en:"Your sentence, in your language. Placeholders: {value} {min} {max} {unit} {percent}. Jinja templates work too. Empty shows the bare top of the scale.",nl:"Je eigen zin. Plaatshouders: {value} {min} {max} {unit} {percent}. Jinja werkt ook. Leeg = de top van de schaal."},e_decima_places_defaul:{en:"Decimal places (default: at most 1)",nl:"Decimalen (standaard: hoogstens 1)"},e_which_end_good:{en:"Which end is good",nl:"Welke kant goed is"},e_left_empty_ramp:{en:"Left empty the ramp is a neutral track and the card passes no judgement — the value's position and the reference marks still show. Set it and the ramp runs through the severity scale in that direction. Never inferred from the entity.",nl:"Leeg is de helling neutraal en oordeelt de kaart niet. Ingevuld loopt de helling door de ernstschaal in die richting. Nooit afgeleid van de entiteit."},e_low_values_are:{en:"Low values are good (consumption, latency)",nl:"Lage waarden zijn goed (verbruik, vertraging)"},e_high_values_are:{en:"High values are good (efficiency, signal)",nl:"Hoge waarden zijn goed (rendement, signaal)"},e_label_at_low:{en:"Label at the low end",nl:"Label aan de lage kant"},e_your_words_placeh:{en:"Your words. Placeholders: {bound} {unit} {value} {min} {max}. Empty shows the bare bound.",nl:"Je eigen woorden. Plaatshouders: {bound} {unit} {value} {min} {max}. Leeg = de grens zelf."},e_label_at_high:{en:"Label at the high end",nl:"Label aan de hoge kant"},e_same_placeh_empty:{en:"Same placeholders. Empty shows the bare bound.",nl:"Zelfde plaatshouders. Leeg = de grens zelf."},e_show_change_pill:{en:"Show the change pill",nl:"Wijzigingspil tonen"},e_fetche_histor_only:{en:"Fetches history only when switched on, since a change needs a window to measure over.",nl:"Haalt enkel geschiedenis op als dit aan staat."},e_paired_batter_sensor:{en:"Paired battery sensor (adds the vertical bar)",nl:"Gekoppelde batterijsensor (voegt de verticale balk toe)"},e_histor_bars_days:{en:"History bars (days)",nl:"Geschiedenisbalken (dagen)"},e_what_each_histor:{en:"What each history bar measures",nl:"Wat elke geschiedenisbalk meet"},e_change_across_day:{en:"Change across the day",nl:"Wijziging over de dag"},e_average:{en:"Average",nl:"Gemiddelde"},e_minimum:{en:"Minimum",nl:"Minimum"},e_maximum:{en:"Maximum",nl:"Maximum"},e_sum_sample:{en:"Sum of samples",nl:"Som van metingen"},e_number_sample:{en:"Number of samples",nl:"Aantal metingen"},e_suppor_metric_1:{en:"Supporting metric 1",nl:"Extra meting 1"},e_metric_1_label:{en:"Metric 1 label",nl:"Label meting 1"},e_metric_1_displa:{en:"Metric 1 display override",nl:"Weergave meting 1 overschrijven"},e_option_jinja_text:{en:"Optional Jinja or text. Placeholders: {value} {unit} {state} {history_changed} {history_date} {history_time}. History timestamps ignore same-value restores after unavailable.",nl:"Optioneel Jinja of tekst. Plaatshouders: {value} {unit} {state} {history_changed} {history_date} {history_time}."},e_metric_1_tap:{en:"Metric 1 tap action",nl:"Tikactie meting 1"},e_suppor_metric_2:{en:"Supporting metric 2",nl:"Extra meting 2"},e_metric_2_label:{en:"Metric 2 label",nl:"Label meting 2"},e_metric_2_displa:{en:"Metric 2 display override",nl:"Weergave meting 2 overschrijven"},e_metric_2_tap:{en:"Metric 2 tap action",nl:"Tikactie meting 2"},e_suppor_metric_3:{en:"Supporting metric 3",nl:"Extra meting 3"},e_metric_3_label:{en:"Metric 3 label",nl:"Label meting 3"},e_metric_3_displa:{en:"Metric 3 display override",nl:"Weergave meting 3 overschrijven"},e_metric_3_tap:{en:"Metric 3 tap action",nl:"Tikactie meting 3"},e_refres_histor_every:{en:"Refresh history every N minutes",nl:"Geschiedenis vernieuwen elke N minuten"},e_headline:{en:"Headline",nl:"Kop"},e_footer:{en:"Footer",nl:"Voettekst"},e_footer_icon:{en:"Footer icon",nl:"Voettekst-icoon"},e_detail_status_sensor:{en:"Detailed status sensor (shown as the state)",nl:"Gedetailleerde statussensor (als status getoond)"},e_curren_room_sensor:{en:"Current room sensor (shown while cleaning)",nl:"Huidige-kamersensor (getoond tijdens poetsen)"},e_batter_sensor_adds:{en:"Battery sensor (adds the vertical bar)",nl:"Batterijsensor (voegt de verticale balk toe)"},e_critic_dry_defaul:{en:"Critical dry, ≤% (default 10 — red)",nl:"Kritiek droog, ≤% (standaard 10 — rood)"},e_water_soon_defaul:{en:"Water soon, ≤% (default 20 — orange)",nl:"Binnenkort water, ≤% (standaard 20 — oranje)"},e_overwa_defaul_60:{en:"Overwatered, >% (default 60 — blue)",nl:"Te veel water, >% (standaard 60 — blauw)"},e_needs_water_now:{en:'"Needs water now" label',nl:'Label "Nu water nodig"'},e_water_soon_label:{en:'"Water soon" label',nl:'Label "Binnenkort water"'},e_optima_label:{en:'"Optimal" label',nl:'Label "Optimaal"'},e_overwa_label:{en:'"Overwatered" label',nl:'Label "Te veel water"'},e_days_histor_defaul:{en:"Days of history (default 3)",nl:"Dagen geschiedenis (standaard 3)"},e_kept_short_on:{en:"Kept short on purpose: a window longer than your recorder keeps returns nothing at all, not a shorter series. Days with no data are simply not drawn.",nl:"Bewust kort: een venster langer dan je recorder bewaart geeft helemaal niets terug. Dagen zonder data worden niet getekend."},e_what_each_bar:{en:"What each bar measures (default: change)",nl:"Wat elke balk meet (standaard: wijziging)"},e_change_how_much:{en:"change = how much the value moved that day (counters). mean/min/max/sum/count for measurements.",nl:"change = hoeveel de waarde die dag bewoog (tellers). mean/min/max/sum/count voor metingen."},e_separa_captio_period:{en:"Separate caption period",nl:"Aparte periode voor het bijschrift"},e_keeps_visibl_bars:{en:"Keeps the visible bars compact while exposing a wider change to the caption. Current month adds {summary_delta}, {summary_delta_signed}, and {summary_delta_pct}.",nl:"Houdt de balken compact maar toont een bredere wijziging in het bijschrift. Huidige maand voegt {summary_delta}, {summary_delta_signed} en {summary_delta_pct} toe."},e_curren_calend_month:{en:"Current calendar month",nl:"Huidige kalendermaand"},e_hours_histor_defaul:{en:"Hours of history (default 24)",nl:"Uren geschiedenis (standaard 24)"},e_window_longer_than:{en:"A window longer than your recorder keeps returns nothing at all.",nl:"Een venster langer dan je recorder bewaart geeft niets terug."},e_points_plotte_defaul:{en:"Points plotted (default 48)",nl:"Getekende punten (standaard 48)"},e_change_pill_text:{en:"Change pill text",nl:"Tekst van de wijzigingspil"},e_placeh_delta_delta:{en:"Placeholders: {delta} {delta_pct} {from} {to} {unit} {hours} {days}. Empty shows just the signed change.",nl:"Plaatshouders: {delta} {delta_pct} {from} {to} {unit} {hours} {days}. Leeg = enkel de wijziging met teken."},e_caption:{en:"Caption",nl:"Bijschrift"},e_your_words_placeh2:{en:"Your words. Placeholders: {value} {unit} {hours} {days} {buckets} {summary_delta} {summary_delta_signed} {summary_delta_pct}. Jinja templates work too.",nl:"Je eigen woorden. Plaatshouders: {value} {unit} {hours} {days} {buckets} {summary_delta} {summary_delta_signed} {summary_delta_pct}. Jinja werkt ook."},e_refres_every_n:{en:"Refresh every N minutes (default 5)",nl:"Vernieuwen elke N minuten (standaard 5)"},e_histor_polled_on:{en:"History is polled on this interval, never on every state change.",nl:"Geschiedenis wordt op dit interval opgehaald, nooit bij elke statuswijziging."},e_accent_color_fill:{en:"Accent color (fill / bars / star)",nl:"Accentkleur (vulling / balken / ster)"},e_tile_color:{en:"Tile color",nl:"Tegelkleur"},e_text_color:{en:"Text color",nl:"Tekstkleur"},e_show_icon_beside:{en:"Show icon beside the heading",nl:"Icoon naast de kop tonen"},e_heading:{en:"Heading",nl:"Kop"},e_style:{en:"Style",nl:"Stijl"},e_right_aligne_meta:{en:"Right-aligned meta line",nl:"Rechts uitgelijnde metaregel"},e_eyebro_text:{en:"Eyebrow text",nl:"Bovenregeltekst"},e_eyebro_icon:{en:"Eyebrow icon",nl:"Bovenregelicoon"},e_big_title_defaul:{en:"Big title (defaults to the state)",nl:"Grote titel (standaard de status)"},e_headli_number_defaul:{en:"Headline number (defaults to the state)",nl:"Groot getal (standaard de status)"},e_unit_after_number:{en:"Unit after the number",nl:"Eenheid na het getal"},e_captio_beside_number:{en:"Caption beside the number",nl:"Bijschrift naast het getal"},e_sub_line:{en:"Sub-line",nl:"Subregel"},e_emphasis:{en:"Emphasis",nl:"Nadruk"},e_hero_owns_panel:{en:"Hero owns the panel; sidekick is its quiet companion — same anatomy one rung down, for pages that already have a hero.",nl:"Hero bezit het paneel; sidekick is zijn stille metgezel — dezelfde opbouw een trede lager, voor pagina's die al een hero hebben."},e_hero_filled_owns:{en:"Hero — filled, owns the panel",nl:"Hero — gevuld, bezit het paneel"},e_sideki_quiet_peer:{en:"Sidekick — quiet peer of the rows",nl:"Sidekick — stille gelijke van de rijen"},e_state_s_count:{en:"State(s) that count as active",nl:"Status(sen) die als actief tellen"},e_show_turnin_burst:{en:"Show the turning burst",nl:"Draaiende uitbarsting tonen"},e_backgr_at_rest:{en:"Background at rest",nl:"Achtergrond in rust"},e_text_at_rest:{en:"Text at rest",nl:"Tekst in rust"},e_name_option:{en:"Name (optional)",nl:"Naam (optioneel)"},e_extern_humidi_sensor:{en:"External humidity sensor",nl:"Externe vochtigheidssensor"},e_humidi_step_option:{en:"Humidity step (optional)",nl:"Vochtigheidsstap (optioneel)"},e_show_device_modes:{en:"Show device modes",nl:"Toestelmodi tonen"},e_card_action:{en:"Card action",nl:"Kaartactie"},e_menu_alignm:{en:"Menu alignment",nl:"Menu-uitlijning"},e_below_right_aligne:{en:"Below · right-aligned",nl:"Onder · rechts uitgelijnd"},e_below_left_aligne:{en:"Below · left-aligned",nl:"Onder · links uitgelijnd"},e_above_right_aligne:{en:"Above · right-aligned",nl:"Boven · rechts uitgelijnd"},e_above_left_aligne:{en:"Above · left-aligned",nl:"Boven · links uitgelijnd"},e_attrib_holdin_level:{en:"Attribute holding the level",nl:"Attribuut met het niveau"},e_defaul_per_domain:{en:"Defaults per domain: volume_level, brightness, percentage, current_position. Leave empty for number helpers.",nl:"Standaard per domein: volume_level, brightness, percentage, current_position. Leeg voor nummerhelpers."},e_leadin_icon:{en:"Leading icon",nl:"Icoon vooraan"},e_traili_contro_entity:{en:"Trailing control entity",nl:"Entiteit voor bediening achteraan"},e_adds_aligne_circul:{en:"Adds an aligned circular toggle beside the slider, for example a media-player zone power control.",nl:"Voegt een ronde schakelaar naast de schuifregelaar toe, bv. de aan/uit van een mediazone."},e_traili_contro_icon:{en:"Trailing control icon",nl:"Icoon bediening achteraan"},e_traili_contro_access:{en:"Trailing control accessible label",nl:"Toegankelijk label bediening achteraan"},e_traili_contro_action:{en:"Trailing control action",nl:"Actie bediening achteraan"},e_range:{en:"Range",nl:"Bereik"},e_left_empty_these:{en:"Left empty, these come from the entity",nl:"Leeg komen deze van de entiteit"},e_minimu_entity_units:{en:"Minimum (entity units)",nl:"Minimum (eenheden van de entiteit)"},e_maximu_entity_units:{en:"Maximum (entity units)",nl:"Maximum (eenheden van de entiteit)"},e_maximu_from_helper:{en:"Maximum from helper",nl:"Maximum uit helper"},e_option_number_input:{en:"Optional number/input_number whose live state caps the slider.",nl:"Optionele number/input_number waarvan de status de schuifregelaar begrenst."},e_maximu_helper_scale:{en:"Maximum helper scale factor",nl:"Schaalfactor van de maximumhelper"},e_for_exampl_0:{en:"For example 0.01 converts a percentage helper (60) to media volume (0.60).",nl:"Bv. 0,01 zet een percentagehelper (60) om naar mediavolume (0,60)."},e_step_entity_units:{en:"Step (entity units)",nl:"Stap (eenheden van de entiteit)"},e_unit_shown_after:{en:"Unit shown after the value",nl:"Eenheid na de waarde"},e_defaul_entity_s:{en:"Defaults to the entity's unit, or % for volume and brightness.",nl:"Standaard de eenheid van de entiteit, of % voor volume en helderheid."},e_container:{en:"Container",nl:"Container"},e_filled_card:{en:"Filled card",nl:"Gevulde kaart"},e_flat_no_backgr:{en:"Flat / no background",nl:"Vlak / geen achtergrond"},e_slider_size:{en:"Slider size",nl:"Grootte schuifregelaar"},e_tile_backgr:{en:"Tile background",nl:"Tegelachtergrond"},e_conten_color_on:{en:"Content color on it",nl:"Inhoudskleur erop"},e_active_track_handle:{en:"Active track & handle",nl:"Actieve baan & knop"},e_inacti_track:{en:"Inactive track",nl:"Inactieve baan"},e_hide_stop_indica:{en:"Hide the stop indicators",nl:"Stopindicatoren verbergen"},e_small_m3_dots:{en:"The small M3 dots at each end of the track. Shown by default.",nl:"De kleine M3-stippen aan de uiteinden van de baan. Standaard zichtbaar."},e_header_icon:{en:"Header icon",nl:"Kopicoon"},e_entiti_rows:{en:"Entities (rows)",nl:"Entiteiten (rijen)"},e_surface:{en:"Surface",nl:"Oppervlak"},e_tonal_fills_card:{en:"Tonal fills the card with a container pair, for a panel meant to read as one block rather than as part of the page.",nl:"Tonal vult de kaart met een containerpaar, voor een paneel dat als één blok moet lezen."},e_card_surfac:{en:"Card surface",nl:"Kaartoppervlak"},e_tonal_contai:{en:"Tonal container",nl:"Tonale container"},e_contai_defaul_primar:{en:"Container (default primary container)",nl:"Container (standaard primary container)"},e_pick_contai_role:{en:"Pick a CONTAINER role, not an accent — a container carries its matching text colour, an accent does not.",nl:"Kies een CONTAINER-rol, geen accent — een container heeft een bijpassende tekstkleur, een accent niet."},e_text_on_contai:{en:"Text on the container",nl:"Tekst op de container"},e_lock_option:{en:"Lock (optional)",nl:"Slot (optioneel)"},e_leave_empty_run:{en:"Leave empty to run self-contained — the card keeps its own state, with nothing to control.",nl:"Leeg = zelfstandig — de kaart houdt haar eigen status bij, zonder iets te bedienen."},e_unlatc_servic:{en:"Unlatch service",nl:"Service om te openen"},e_open_for_strike:{en:'Open is for strikes/relays that don\'t stay meaningfully "unlocked" — the door swings rather than sitting unlatched (lock.open instead of lock.unlock). Locking always uses lock.lock.',nl:"Open is voor sloten/relais die niet echt 'ontgrendeld' blijven — de deur zwaait open (lock.open i.p.v. lock.unlock). Vergrendelen gebruikt altijd lock.lock."},e_unlock_lock_unlock:{en:"Unlock (lock.unlock)",nl:"Ontgrendelen (lock.unlock)"},e_open_lock_open:{en:"Open (lock.open)",nl:"Openen (lock.open)"},e_slide_handle_across:{en:"Slide the handle across",nl:"De knop overschuiven"},e_show_morphi_lock:{en:"Show the morphing lock shape",nl:"Vervormend slotsymbool tonen"},e_open_button:{en:"Open button",nl:"Openknop"},e_open_action:{en:"Open action",nl:"Openactie"},e_separa_extra_action:{en:"A separate, extra action available ONLY once unlocked (a relay pulse, a multi-step let-them-in sequence) — never a substitute for the gesture above, and disabled entirely while locked. Leave empty to hide the button.",nl:"Een aparte extra actie, ENKEL beschikbaar na ontgrendelen (een relaispuls, een binnenlaat-reeks) — nooit een vervanging van het gebaar. Leeg verbergt de knop."},e_icon_defaul_door:{en:'Icon (default "door-open")',nl:'Icoon (standaard "door-open")'},e_label_defaul_open:{en:'Label (default "Open")',nl:'Label (standaard "Openen")'},e_state_means_locked:{en:"State that means locked",nl:"Status die vergrendeld betekent"},e_defaul_locked_for:{en:'Defaults to "locked" for a lock and "off" for a switch — a relay strike is energised to release the door.',nl:'Standaard "locked" voor een slot en "off" voor een schakelaar — een relais is bekrachtigd om de deur vrij te geven.'},e_give_up_waitin3:{en:"Give up waiting for the lock after (ms, default 10000)",nl:"Stop met wachten op het slot na (ms, standaard 10000)"},e_start_out_locked:{en:"Start out locked",nl:"Vergrendeld starten"},e_labels:{en:"Labels",nl:"Labels"},e_while_locked_defaul:{en:'While locked (default "Hold to unlock")',nl:'Indien vergrendeld (standaard "Houd vast om te ontgrendelen")'},e_while_unlock_defaul:{en:'While unlocked (default "Hold to lock")',nl:'Indien ontgrendeld (standaard "Houd vast om te vergrendelen")'},e_while_locked_defaul2:{en:'While locked (default "Slide to unlock")',nl:'Indien vergrendeld (standaard "Schuif om te ontgrendelen")'},e_while_unlock_defaul2:{en:'While unlocked (default "Slide to lock")',nl:'Indien ontgrendeld (standaard "Schuif om te vergrendelen")'},e_while_lockin_defaul:{en:'While locking (default "Locking…")',nl:'Tijdens vergrendelen (standaard "Vergrendelen…")'},e_while_unlock_defaul3:{en:'While unlocking (default "Unlocking…")',nl:'Tijdens ontgrendelen (standaard "Ontgrendelen…")'},e_when_jammed_defaul:{en:'When jammed (default "Jammed — check the door")',nl:'Indien geblokkeerd (standaard "Geblokkeerd — controleer de deur")'},e_self_contai_note:{en:'Self-contained note (default "Demo · no entity")',nl:'Notitie zonder entiteit (standaard "Demo · geen entiteit")'},e_backgr_while_unlock:{en:"Background while unlocked",nl:"Achtergrond indien ontgrendeld"},e_text_while_unlock:{en:"Text while unlocked",nl:"Tekst indien ontgrendeld"},e_backgr_while_locked:{en:"Background while locked",nl:"Achtergrond indien vergrendeld"},e_text_while_locked:{en:"Text while locked",nl:"Tekst indien vergrendeld"},e_accent_locked_glyph:{en:"Accent (locked glyph and handle)",nl:"Accent (slotsymbool en knop)"},e_ink_on_accent2:{en:"Ink on the accent",nl:"Inkt op het accent"},e_icon_while_locked:{en:"Icon while locked",nl:"Icoon indien vergrendeld"},e_icon_while_unlock:{en:"Icon while unlocked",nl:"Icoon indien ontgrendeld"},e_icon_while_litera:{en:'Icon while literally open (default "door-open")',nl:'Icoon indien echt open (standaard "door-open")'},e_rides_on_top:{en:"Rides on top of the unlocked colour, never its own — only the glyph changes.",nl:"Ligt op de ontgrendelde kleur — enkel het symbool verandert."},e_backgr_while_jammed:{en:"Background while jammed (default error container)",nl:"Achtergrond indien geblokkeerd (standaard error container)"},e_text_while_jammed:{en:"Text while jammed",nl:"Tekst indien geblokkeerd"},e_icon_while_jammed:{en:'Icon while jammed (default "warning")',nl:'Icoon indien geblokkeerd (standaard "warning")'},e_defaul_source_title:{en:"Default (source, title, stations + volume)",nl:"Standaard (bron, titel, zenders + volume)"},e_kiosk_chip_statio:{en:"Kiosk (chip + stations button)",nl:"Kiosk (chip + zenderknop)"},e_zone_name_defaul:{en:"Zone name (defaults to the friendly name)",nl:"Zonenaam (standaard de entiteitsnaam)"},e_source_button:{en:"Source button",nl:"Bronknop"},e_volume_ring:{en:"Volume ring",nl:"Volumering"},e_power_menu_per:{en:"Power (menu per zone)",nl:"Aan/uit (menu per zone)"},e_statio_logos_fill:{en:"Station logos fill their tile",nl:"Zenderlogo's vullen hun tegel"},e_power_menu:{en:"Power menu",nl:"Aan/uit-menu"},ed_power_menu_items:{en:"Rows of the power menu (empty: this player)",nl:"Rijen van het aan/uit-menu (leeg: deze speler)"},ed_menu_items:{en:"Rows",nl:"Rijen"},ed_menu_item_type:{en:"Row",nl:"Rij"},ed_menu_switch:{en:"Switch",nl:"Schakelaar"},ed_menu_divider:{en:"Divider",nl:"Scheidingslijn"},ed_menu_all:{en:"All off / All on",nl:"Alles uit / Alles aan"},ed_menu_entity:{en:"Entity (player, switch, toggle, light)",nl:"Entiteit (speler, schakelaar, toggle, lamp)"},ed_menu_in_all:{en:"Included in All off / All on",nl:"Doet mee met Alles uit / Alles aan"},ed_menu_mode:{en:"Menu",nl:"Menu"},ed_menu_mode_select:{en:"Pick a value (select entity)",nl:"Waarde kiezen (selectie-entiteit)"},ed_menu_mode_list:{en:"Button with switches",nl:"Knop met schakelaars"},ed_menu_button_label:{en:"Button label (for screen readers)",nl:"Knoplabel (voor schermlezers)"},ed_menu_icon_color:{en:"Icon colour",nl:"Icoonkleur"},ed_menu_color_error:{en:"Red (power)",nl:"Rood (aan/uit)"},e_eyebro_above_chosen:{en:"Eyebrow above the chosen moment",nl:"Bovenregel boven het gekozen moment"},e_what_being_schedu:{en:'What is being scheduled — e.g. "Start cleaning".',nl:'Wat er gepland wordt — bv. "Start met poetsen".'},e_card_purpose:{en:"What is this card for?",nl:"Waarvoor dient deze kaart?"},e_card_purpose_helper:{en:"Set a date & time only stores the moment in a helper; automations can use it. One moment also runs actions then, and clears itself. The picker options hand the chosen moment to an action of your own.",nl:"Datum en uur instellen bewaart het moment enkel in een helper; automatiseringen kunnen het gebruiken. Eén moment voert dan ook acties uit en wist zichzelf. De kiezer-opties geven het gekozen moment door aan je eigen actie."},e_purpose_moment:{en:"One moment — runs once, then clears itself",nl:"Eén moment — loopt één keer en wist zichzelf"},e_purpose_datetime:{en:"Set a date & time — stored in a helper, runs nothing",nl:"Datum en uur instellen — bewaard in een helper, voert niets uit"},e_datetime_entity:{en:"Date & time helper",nl:"Datum- en tijdhelper"},e_datetime_entity_helper:{en:"An input_datetime helper, ideally with date and time. A moment in the past reads as not set.",nl:"Een input_datetime-helper, liefst met datum en tijd. Een moment in het verleden geldt als niet ingesteld."},e_inline_collap_strip:{en:"Picker for my own action — collapsed strip",nl:"Kiezer voor mijn eigen actie — ingeklapte strook"},e_sheet_always_open:{en:"Picker for my own action — always open, for a modal",nl:"Kiezer voor mijn eigen actie — altijd open, voor een modaal venster"},e_moment_name_helper:{en:'Shown on the card, e.g. "I\'m arriving home".',nl:'Staat op de kaart, bv. "Ik kom thuis".'},e_moment_steps:{en:"What happens",nl:"Wat er gebeurt"},e_plan_steps:{en:"Steps",nl:"Stappen"},e_step_when:{en:"When",nl:"Wanneer"},e_step_at:{en:"At the moment itself",nl:"Op het moment zelf"},e_step_before:{en:"Before the moment",nl:"Voor het moment"},e_step_after:{en:"After the moment",nl:"Na het moment"},e_step_offset:{en:"How long before or after",nl:"Hoe lang ervoor of erna"},e_step_name:{en:"Name (optional)",nl:"Naam (optioneel)"},e_optional:{en:"Optional",nl:"Optioneel"},e_quick_picks:{en:"Quick picks",nl:"Snelkeuzes"},e_presets:{en:"Quick-pick chips",nl:"Snelkeuzeknoppen"},e_presets_builtin:{en:"None added: the built-in six",nl:"Geen toegevoegd: de ingebouwde zes"},e_preset_kind:{en:"Kind",nl:"Soort"},e_preset_in:{en:"A while from now",nl:"Over een tijdje"},e_preset_at:{en:"At a clock time",nl:"Op een kloktijd"},e_preset_in_value:{en:"How long from now",nl:"Hoe lang vanaf nu"},e_preset_at_value:{en:"Time",nl:"Tijdstip"},e_preset_day:{en:"Day",nl:"Dag"},e_preset_next:{en:"First time it comes round",nl:"Eerstvolgende keer"},e_preset_in_days:{en:"In {n} days",nl:"Over {n} dagen"},e_preset_action:{en:"Own action for this chip (optional)",nl:"Eigen actie voor deze knop (optioneel)"},e_triggers_builtin:{en:"None added: the built-in four (a demo)",nl:"Geen toegevoegd: de ingebouwde vier (een demo)"},e_trigger_sub:{en:"Sub-line",nl:"Subregel"},e_trigger_action:{en:"Action when chosen",nl:"Actie bij kiezen"},e_target_actions:{en:"Actions to choose from (none: on/off)",nl:"Acties om uit te kiezen (geen: aan/uit)"},e_window:{en:"Recurring window",nl:"Terugkerend venster"},e_manage_list_add:{en:"Manager — list, add and edit several schedules",nl:"Beheerder — meerdere planningen tonen, toevoegen en bewerken"},e_strip_title_when:{en:"Strip title when nothing is set",nl:"Titel van de strook als niets ingesteld is"},e_strip_sub_line:{en:"Strip sub-line when nothing is set",nl:"Subregel van de strook als niets ingesteld is"},e_on_confir:{en:"On confirm",nl:"Bij bevestigen"},e_use_dateti_date:{en:"Use $datetime, $date, $time, $duration, $weekdays, $repeat, $trigger, $label in the data.",nl:"Gebruik $datetime, $date, $time, $duration, $weekdays, $repeat, $trigger, $label in de data."},e_on_confir_trigge:{en:"On confirm, trigger tab",nl:"Bij bevestigen, triggertab"},e_falls_back_confir:{en:"Falls back to the confirm action when unset.",nl:"Leeg = de bevestigingsactie."},e_how_dismis_modal:{en:"How to dismiss the modal",nl:"Hoe het modale venster te sluiten"},e_sheet_presen_only:{en:"Sheet presentation only. Defaults to browser_mod.close_popup.",nl:"Enkel voor bladweergave. Standaard browser_mod.close_popup."},e_schedu_people_may:{en:"Schedules people may create",nl:"Planningen die mensen mogen maken"},e_recurr_start_end:{en:"Recurring start and end",nl:"Terugkerend begin en einde"},e_one_time_action:{en:"One-time action",nl:"Eenmalige actie"},e_multi_step_plan:{en:"Multi-step plan",nl:"Meerstapsplan"},e_schedu_group:{en:"Schedule group",nl:"Planningsgroep"},e_friend_intern_tag:{en:"A friendly internal tag used to keep this page's schedules together, for example materia_house_plans.",nl:"Een interne tag die de planningen van deze pagina bijeenhoudt, bv. materia_house_plans."},e_multi_step_plans:{en:"Multi-step plans",nl:"Meerstapsplannen"},e_open_schedu_editor:{en:"Open schedule editor",nl:"Planningseditor openen"},e_popup_keeps_dashbo:{en:"Popup keeps the dashboard compact. Requires Browser Mod; inline remains available as a dependency-free fallback.",nl:"Pop-up houdt het dashboard compact. Vereist Browser Mod; inline werkt zonder afhankelijkheden."},e_popup:{en:"Popup",nl:"Pop-up"},e_expand_inline:{en:"Expand inline",nl:"Inline uitklappen"},e_device_friend_action:{en:"Devices and friendly actions",nl:"Toestellen en eenvoudige acties"},e_additi_schedu_entiti:{en:"Additional schedule entities",nl:"Extra planningsentiteiten"},e_option_explic_switch:{en:"Optional explicit switch.schedule_* list, for schedules that cannot be discovered through their target device.",nl:"Optionele expliciete switch.schedule_*-lijst, voor planningen die niet via hun toestel te vinden zijn."},e_schedu_entity:{en:"Scheduler entity",nl:"Scheduler-entiteit"},e_switch_schedu_entity:{en:"A switch.schedule_* entity (HACS Scheduler integration). Reads its current window/weekdays on open, writes back with scheduler.edit. Implies a start+stop window.",nl:"Een switch.schedule_*-entiteit (HACS Scheduler). Leest bij openen het venster/de dagen, schrijft terug met scheduler.edit. Impliceert een start+stop-venster."},e_start_stop_window:{en:"Start+stop window without a scheduler entity",nl:"Start+stop-venster zonder Scheduler-entiteit"},e_for_drivin_custom:{en:"For driving a custom confirm_action with $start/$stop/$weekdays/$actions instead of binding to Scheduler.",nl:"Om een eigen confirm_action met $start/$stop/$weekdays/$actions te sturen i.p.v. Scheduler."},e_start_action:{en:"Start actions",nl:"Startacties"},e_end_action:{en:"End actions (none: on/off reversed)",nl:"Eindacties (geen: aan/uit omgekeerd)"},e_triggers:{en:"Triggers",nl:"Triggers"},e_show_when_tab:{en:'Show the "When…" tab',nl:'Tab "Wanneer…" tonen'},e_disabl_for_straig:{en:"Disable this for a straightforward clock-only scheduler.",nl:"Zet uit voor een eenvoudige planner met enkel de klok."},e_non_clock_trigge:{en:"Non-clock triggers",nl:"Triggers zonder klok"},e_eyebro_above_option:{en:"Eyebrow above the option name",nl:"Bovenregel boven de optienaam"},e_hero_filled_statem:{en:"Hero is the filled statement block; sidekick is its quiet companion for pages that already have a hero.",nl:"Hero is het gevulde blok; sidekick is zijn stille metgezel voor pagina's die al een hero hebben."},e_sideki_quiet_peer2:{en:"Sidekick — quiet peer of the bars",nl:"Sidekick — stille gelijke van de balken"},e_show_decora_shape:{en:"Show the decorative shape",nl:"Decoratieve vorm tonen"},e_block_backgr:{en:"Block background",nl:"Blokachtergrond"},e_block_text:{en:"Block text",nl:"Bloktekst"},e_alerts:{en:"Alerts",nl:"Meldingen"},e_alert_recolo_whole:{en:"An alert recolours the whole block",nl:"Een melding kleurt het hele blok"},e_name_big_title:{en:"Name (the big title when chosen)",nl:"Naam (de grote titel indien gekozen)"},e_pill_label_defaul:{en:"Pill label (defaults to the name)",nl:"Pillabel (standaard de naam)"},e_select_option_value:{en:"Select option value",nl:"Waarde van de optie"},e_one_line_conseq:{en:"One line of consequence",nl:"Eén regel over het gevolg"},e_icon_shown_when:{en:"Icon (shown when there is no route glyph)",nl:"Icoon (getoond zonder routesymbool)"},e_action_overri_select:{en:"Action (overrides selecting the option)",nl:"Actie (vervangt het kiezen van de optie)"},e_name:{en:"Name",nl:"Naam"},e_tabs:{en:"Tabs",nl:"Tabbladen"},e_entity_holdin_select3:{en:"Entity holding the selected tab (optional)",nl:"Entiteit met het gekozen tabblad (optioneel)"},e_leave_empty_for:{en:"Leave empty for per-device tabs (each screen keeps its own). Set an input_select only when the selection must be shared or drive conditional cards elsewhere.",nl:"Leeg = tabbladen per toestel (elk scherm houdt zijn eigen keuze). Vul een input_select in als de keuze gedeeld moet worden of elders kaarten stuurt."},e_vertic_rail_off:{en:"Vertical rail (off = horizontal tab bar)",nl:"Verticale rail (uit = horizontale tabbalk)"},e_value_entity_state:{en:"Value (the entity state this tab means)",nl:"Waarde (de status die dit tabblad betekent)"},e_action_overri_select2:{en:"Action (overrides selecting the tab)",nl:"Actie (vervangt het kiezen van het tabblad)"},e_player_rings_active:{en:"Player (rings the active tile)",nl:"Speler (omcirkelt de actieve tegel)"},e_logo_fills_tile:{en:"Logo fills the tile (no white frame)",nl:"Logo vult de tegel (geen wit kader)"},e_time:{en:"Time",nl:"Tijd"},e_step_in_second:{en:"Step in seconds",nl:"Stap in seconden"},e_name_switch_label:{en:"Name (switch label, accessible name)",nl:"Naam (label van de schakelaar, toegankelijke naam)"},e_text_when_on:{en:"Text when on",nl:"Tekst indien aan"},e_text_when_off:{en:"Text when off",nl:"Tekst indien uit"},e_chip:{en:"Chip",nl:"Chip"},e_label_switch:{en:"Label and switch",nl:"Label en schakelaar"},e_brand_profil:{en:"Brand profile",nl:"Merkprofiel"},e_generi_other:{en:"Generic / other",nl:"Algemeen / ander"},e_entity_overri:{en:"Entity overrides",nl:"Entiteiten overschrijven"},e_status_work_mode:{en:"Status / work mode",nl:"Status / werkmodus"},e_cleani_progre:{en:"Cleaning progress (%)",nl:"Poetsvoortgang (%)"},e_battery:{en:"Battery",nl:"Batterij"},e_curren_room:{en:"Current room",nl:"Huidige kamer"},e_elapse_cleani_time:{en:"Elapsed cleaning time",nl:"Verstreken poetstijd"},e_mop_drying:{en:"Mop drying",nl:"Dweil drogen"},e_last_clean_finish:{en:"Last clean finished",nl:"Laatste beurt klaar"},e_warn_when_consum:{en:"Warn when a consumable has this many hours left (default 1)",nl:"Waarschuwen als een verbruiksdeel zoveel uren over heeft (standaard 1)"},e_warn_when_lifesp:{en:"Warn when a % lifespan drops to (default 5)",nl:"Waarschuwen als de levensduur in % zakt tot (standaard 5)"},e_label_at_full:{en:'Label at a full battery (default "Docked")',nl:'Label bij volle batterij (standaard "In het dokstation")'},e_drying_sub_line:{en:'Drying sub-line (default "Drying the mop")',nl:'Subregel bij drogen (standaard "De mop droogt")'},e_error_colour_whole:{en:"An ERROR colours the whole hero (warnings never do)",nl:"Een FOUT kleurt de hele hero (waarschuwingen nooit)"},e_hero_owns_panel2:{en:"Hero owns the panel; sidekick is its quiet companion — same anatomy one rung down, and it keeps the resting surface even while the robot runs.",nl:"Hero bezit het paneel; sidekick is zijn stille metgezel — dezelfde opbouw een trede lager, en houdt het rustoppervlak ook als de robot rijdt."},e_backgr_while_workin:{en:"Background while working",nl:"Achtergrond tijdens werken"},e_text_while_workin:{en:"Text while working",nl:"Tekst tijdens werken"},e_player_empty_art:{en:"Player (empty: the art scope's)",nl:"Speler (leeg: die van de art scope)"},e_knob:{en:"Knob",nl:"Draaiknop"},e_arc:{en:"Arc",nl:"Boog"},e_tap_vertic_slider:{en:"Tap (vertical slider)",nl:"Tik (verticale schuifregelaar)"},e_narrow_column:{en:"Narrow column",nl:"Smalle kolom"},e_show_name:{en:"Show the name",nl:"Naam tonen"},e_show_temper:{en:"Show temperature",nl:"Temperatuur tonen"},e_temper_sensor_option:{en:"Temperature sensor (optional)",nl:"Temperatuursensor (optioneel)"},e_high_low:{en:"High / low",nl:"Hoog / laag"},e_pollen_worst_specie:{en:"Pollen (worst species)",nl:"Pollen (ergste soort)"},e_real_temper_sensor:{en:"Real temperature sensor (optional)",nl:"Echte temperatuursensor (optioneel)"},e_subtit_metric_condit:{en:"Subtitle metrics (condition always owns the top line)",nl:"Metingen in de ondertitel (de toestand staat altijd bovenaan)"},e_sort_metric_worst:{en:"Sort metrics worst-first",nl:"Metingen sorteren, ergste eerst"},e_max_metric_on:{en:"Max metrics on the subtitle line",nl:"Max. metingen op de ondertitelregel"},e_show_metric_icons:{en:"Show metric icons",nl:"Iconen bij metingen tonen"},e_pollen_sensor_for:{en:"Pollen sensors (for the pollen metric)",nl:"Pollensensoren (voor de pollenmeting)"},e_aqi_sensor_for:{en:"AQI sensor (for the air-quality metric)",nl:"AQI-sensor (voor de luchtkwaliteit)"},e_alert_text_templa:{en:"Alert text / template (takes over top line)",nl:"Meldingstekst / template (neemt de bovenregel over)"},e_background:{en:"Background",nl:"Achtergrond"},e_add_metric_priori:{en:"Add metric to priority",nl:"Meting aan voorrang toevoegen"},e_feels_like_sensor:{en:"Feels-like sensor (optional)",nl:"Gevoelstemperatuursensor (optioneel)"},e_show_condit_text:{en:"Show condition text",nl:"Toestandstekst tonen"},e_show_condit_glyph:{en:"Show condition glyph",nl:"Toestandssymbool tonen"},e_show_feels_like:{en:"Show feels-like",nl:"Gevoelstemperatuur tonen"},e_night_day:{en:"Night / Day",nl:"Nacht / dag"},e_show_night_day:{en:"Show night / day range",nl:"Nacht- / dagbereik tonen"},e_low_sensor_option:{en:"Low sensor (optional)",nl:"Sensor laag (optioneel)"},e_high_sensor_option:{en:"High sensor (optional)",nl:"Sensor hoog (optioneel)"},e_night_label:{en:"Night label",nl:"Label nacht"},e_day_label:{en:"Day label",nl:"Label dag"},e_weathe_entity:{en:"Weather entity",nl:"Weerentiteit"},e_sensor_overri_option:{en:"Sensor override (optional)",nl:"Andere sensor (optioneel)"},e_header_icon_overri:{en:"Header icon (overrides default)",nl:"Kopicoon (vervangt standaard)"},e_unit_conver_from:{en:"Unit (converts from the source)",nl:"Eenheid (omgerekend vanuit de bron)"},e_knots:{en:"knots",nl:"knopen"},e_bearin_sensor_option:{en:"Bearing sensor (optional)",nl:"Windrichtingsensor (optioneel)"},e_from_label:{en:'"From" label',nl:'Label "Uit"'},e_dew_point_sensor:{en:"Dew point sensor (optional)",nl:"Dauwpuntsensor (optioneel)"},e_dew_point_label:{en:"Dew point label",nl:"Label dauwpunt"},e_gauge_min:{en:"Gauge min",nl:"Meter min"},e_gauge_max:{en:"Gauge max",nl:"Meter max"},e_subtit_when_rainin:{en:"Subtitle when raining",nl:"Ondertitel bij regen"},e_none_expect_label:{en:'"None expected" label',nl:'Label "Niets verwacht"'},e_sun_entity:{en:"Sun entity",nl:"Zonentiteit"},e_moon_phase_sensor2:{en:"Moon phase sensor (built-in Moon integration)",nl:"Maanfasesensor (ingebouwde Moon-integratie)"},e_pollen_sensor:{en:"Pollen sensors",nl:"Pollensensoren"},e_variant:{en:"Variant",nl:"Variant"},e_gauges_wide:{en:"Gauges (wide)",nl:"Meters (breed)"},e_small_dot_list:{en:"Small (dot list)",nl:"Klein (stippenlijst)"},e_max_specie_shown:{en:"Max species shown (worst first)",nl:"Max. getoonde soorten (ergste eerst)"},e_hide_specie_at:{en:"Hide species at 'none'",nl:"Soorten verbergen bij 'none'"},e_scale_max_for:{en:"Scale max for numeric sensors (default 4)",nl:"Schaal max voor numerieke sensoren (standaard 4)"},e_shape_color:{en:"Shape color",nl:"Vormkleur"},e_custom_icon_overri:{en:"Custom icon (overrides the colored glyph)",nl:"Eigen icoon (vervangt het gekleurde symbool)"},e_min_max:{en:"Min / Max",nl:"Min / max"},e_show_min_max:{en:"Show min / max",nl:"Min / max tonen"},e_size_10_fill:{en:"Size (10 = fill)",nl:"Grootte (10 = vullen)"},e_text_temper:{en:"Text / temperature",nl:"Tekst / temperatuur"},e_min_max_color:{en:"Min / max color",nl:"Kleur min / max"},e_primary:{en:"Primary",nl:"Primair"},e_secondary:{en:"Secondary",nl:"Secundair"},e_tertiary:{en:"Tertiary",nl:"Tertiair"},e_primar_contai:{en:"Primary Container",nl:"Primaire container"},e_second_contai:{en:"Secondary Container",nl:"Secundaire container"},e_tertia_contai:{en:"Tertiary Container",nl:"Tertiaire container"},e_error_contai:{en:"Error Container",nl:"Foutcontainer"},e_device_contai:{en:"Device Container",nl:"Toestelcontainer"},e_primar_state:{en:"Primary State",nl:"Primaire status"},e_second_state:{en:"Secondary State",nl:"Secundaire status"},e_tertia_state:{en:"Tertiary State",nl:"Tertiaire status"},e_error_state:{en:"Error State",nl:"Foutstatus"},e_device_state:{en:"Device State",nl:"Toestelstatus"},e_asymme_corner_rise:{en:"The asymmetric corners rise to the right; the mirrored one makes a facing pair.",nl:"De asymmetrische hoeken stijgen naar rechts; de gespiegelde vormt een paar."},e_asymme_corner:{en:"Asymmetric corners",nl:"Asymmetrische hoeken"},e_asymme_corner_mirror:{en:"Asymmetric corners — mirrored",nl:"Asymmetrische hoeken — gespiegeld"},e_second_line:{en:"Secondary line",nl:"Tweede regel"},e_one_quiet_line:{en:"One quiet line under the name. Left empty, a quiet badge shows its state word here instead.",nl:"Eén stille regel onder de naam. Leeg toont een stille badge hier zijn statuswoord."},e_state:{en:"State",nl:"Status"},e_also_active_while:{en:"Also active while (optional)",nl:"Ook actief tijdens (optioneel)"},e_script_automa_timer:{en:"A script/automation/timer whose 'on' also counts as active — for when the badge's own entity only reflects part of a longer sequence (e.g. a relay that pulses inside a multi-step unlock script).",nl:"Een script/automatisering/timer waarvan 'on' ook als actief telt — als de eigen entiteit maar een deel van een langere reeks weergeeft."},e_text_icon:{en:"Text / icon",nl:"Tekst / icoon"},e_hold_delibe_by:{en:"A hold is deliberate by construction — the right slot for actions a stray tap must never fire.",nl:"Vasthouden is per definitie bewust — de plek voor acties die een verdwaalde tik nooit mag uitvoeren."},e_button:{en:"Button",nl:"Knop"},e_elevated:{en:"Elevated",nl:"Verhoogd"},e_filled:{en:"Filled",nl:"Gevuld"},e_tonal:{en:"Tonal",nl:"Tonaal"},e_outlined:{en:"Outlined",nl:"Omlijnd"},e_text:{en:"Text",nl:"Tekst"},e_color_role:{en:"Color role",nl:"Kleurrol"},e_unset_each_varian:{en:"Unset = each variant's spec default (filled → primary, tonal → secondary).",nl:"Leeg = standaard per variant (gevuld → primary, tonaal → secondary)."},e_round_pill:{en:"Round (pill)",nl:"Rond (pil)"},e_square:{en:"Square",nl:"Vierkant"},e_active_state:{en:"Active state",nl:"Actieve status"},e_state_s_consid:{en:"State(s) considered active (defaults by domain)",nl:"Status(sen) die als actief gelden (standaard per domein)"},e_morph_shape_when:{en:"Morph shape when active",nl:"Vorm veranderen indien actief"},e_varian_when_active:{en:"Variant when active",nl:"Variant indien actief"},e_defaul_action:{en:"Default action",nl:"Standaardactie"},e_use_defaul_for:{en:"Use 'default' for the fallback",nl:"Gebruik 'default' als terugval"},e_height_defaul_88:{en:"Height (default 88 px)",nl:"Hoogte (standaard 88 px)"},e_configuratio:{en:"Configuration",nl:"Configuratie"},e_connec_segmen_entity:{en:"Connected (segmented, entity-driven)",nl:"Verbonden (gesegmenteerd, via entiteit)"},e_standa_spaced_row:{en:"Standard (spaced row of buttons)",nl:"Standaard (rij losse knoppen)"},e_media_transp_prev:{en:"Media transport (prev / play / next)",nl:"Mediabediening (vorige / afspelen / volgende)"},e_media_toolba_shuffl:{en:"Media toolbar (shuffle / repeat / volume)",nl:"Mediawerkbalk (shuffle / herhalen / volume)"},e_color_preset:{en:"Color preset",nl:"Kleurvoorkeuze"},e_size_applie_whole:{en:"Size (applies to the whole group)",nl:"Grootte (voor de hele groep)"},e_multi_select:{en:"Multi-select",nl:"Meervoudige keuze"},e_max_column:{en:"Max columns",nl:"Max. kolommen"},e_active_color:{en:"Active color",nl:"Actieve kleur"},e_active_text_color:{en:"Active text color",nl:"Actieve tekstkleur"},e_entity_option_button:{en:"Entity (optional — this button's own state)",nl:"Entiteit (optioneel — status van deze knop)"},e_value_state_active:{en:"Value (state that = active; blank = on/truthy)",nl:"Waarde (status = actief; leeg = aan/waar)"},e_active_templa_overri:{en:"Active template (overrides everything, e.g. attribute logic)",nl:"Actieve template (vervangt alles, bv. attribuutlogica)"},e_entity_option_drives:{en:"Entity (optional — drives active state)",nl:"Entiteit (optioneel — stuurt de actieve status)"},e_wide_stretc_share:{en:"Wide (stretch to share the row)",nl:"Breed (rekt om de rij te delen)"},e_action_checke:{en:"Action (checked)",nl:"Actie (aangevinkt)"},e_action_unchec:{en:"Action (unchecked)",nl:"Actie (niet aangevinkt)"},e_clock:{en:"Clock",nl:"Klok"},e_cardin_12_3:{en:"Cardinal (12 · 3 · 6 · 9)",nl:"Hoofdstanden (12 · 3 · 6 · 9)"},e_all_1_12:{en:"All (1–12)",nl:"Alle (1–12)"},e_hour_dots:{en:"Hour dots",nl:"Uurstippen"},e_second_hand_as:{en:"Second hand as rim dot",nl:"Secondewijzer als stip op de rand"},e_smooth_second_hand:{en:"Smooth second hand",nl:"Vloeiende secondewijzer"},e_cookie_face_12:{en:"Cookie face (12-sided)",nl:"Koekjeswijzerplaat (12 kanten)"},e_digita_readou_hh:{en:"Digital readout (HH/MM behind hands)",nl:"Digitale tijd (UU/MM achter de wijzers)"},e_show_date:{en:"Show date",nl:"Datum tonen"},e_hand_thickn:{en:"Hand thickness",nl:"Wijzerdikte"},e_face:{en:"Face",nl:"Wijzerplaat"},e_numbers:{en:"Numbers",nl:"Cijfers"},e_hands:{en:"Hands",nl:"Wijzers"},e_second_hand:{en:"Second hand",nl:"Secondewijzer"},e_defaul_entity_s2:{en:"Defaults to the entity's album art",nl:"Standaard de albumhoes van de entiteit"},e_shown_when_there:{en:"Shown when there's no art",nl:"Getoond als er geen hoes is"},e_defaul_centre_editor:{en:"Default (centred, editorial)",nl:"Standaard (gecentreerd, redactioneel)"},e_player_expres_now:{en:"Player (expressive now playing)",nl:"Speler (expressief nu aan het spelen)"},e_art_size_auto:{en:"Art size (auto, fill or px)",nl:"Hoesgrootte (auto, vullen of px)"},e_auto_fits_space:{en:"Auto (fits the space the player has)",nl:"Auto (past in de beschikbare ruimte)"},e_fill_width:{en:"Fill the width",nl:"Breedte vullen"},e_larges_art_size:{en:"Largest art size, auto / fill (px, default 420)",nl:"Grootste hoesgrootte bij auto / vullen (px, standaard 420)"},e_title_row_player:{en:"Title row (player)",nl:"Titelrij (speler)"},e_app_chip_player:{en:"App chip (player)",nl:"App-chip (speler)"},e_live_radio_logo:{en:"Live radio logo on white (player)",nl:"Radiologo op wit (speler)"},e_default:{en:"Default",nl:"Standaard"},e_player_handle_drag:{en:"Player (handle, drag to seek, LIVE chip)",nl:"Speler (knop, slepen om te verspringen, LIVE-chip)"},e_live_stream:{en:"Live stream",nl:"Livestream"},e_keep_track_full:{en:"Keep the track full and show ∞ for a live stream, even when the player reports idle.",nl:"Baan vol houden en ∞ tonen bij een livestream, ook als de speler idle meldt."},e_wave_color:{en:"Wave color",nl:"Golfkleur"},e_player_in_art:{en:"Player (in an art scope: the scope's)",nl:"Speler (in een art scope: die van de scope)"},e_cycle_tap_next:{en:"Cycle (tap: next source)",nl:"Doorlopen (tik: volgende bron)"},e_menu_pick_from:{en:"Menu (pick from a list)",nl:"Menu (kies uit een lijst)"},e_auto_flips_fit:{en:"Auto (flips to fit the viewport)",nl:"Auto (draait om te passen)"},e_below:{en:"Below",nl:"Onder"},e_above:{en:"Above",nl:"Boven"},e_substate:{en:"Substate",nl:"Substatus"},e_substa_text_templa:{en:"Substate text / template",nl:"Substatustekst / template"},e_from_entity:{en:"…or from entity",nl:"…of uit een entiteit"},e_entity_attrib_option:{en:"Entity attribute (optional)",nl:"Attribuut van de entiteit (optioneel)"},e_separator:{en:"Separator",nl:"Scheidingsteken"},e_dot:{en:"Dot •",nl:"Punt •"},e_dash:{en:"Dash –",nl:"Streepje –"},e_slash:{en:"Slash /",nl:"Schuine streep /"},e_menu_style:{en:"Menu style",nl:"Menustijl"},e_surfac_classi:{en:"Surface (classic)",nl:"Oppervlak (klassiek)"},e_expres_contai_tone:{en:"Expressive (container tone, trailing icons)",nl:"Expressief (containertint, iconen achteraan)"},e_menu_panel_color:{en:"Menu panel color (expressive)",nl:"Kleur menupaneel (expressief)"},e_menu_text_color:{en:"Menu text color (expressive)",nl:"Tekstkleur menu (expressief)"},e_color:{en:"Color",nl:"Kleur"},e_defaul_48_px:{en:"Default (48 px)",nl:"Standaard (48 px)"},e_kiosk_44_px:{en:"Kiosk (44 px)",nl:"Kiosk (44 px)"},e_leadin_button:{en:"Leading button",nl:"Knop vooraan"},e_extra_small:{en:"Extra small",nl:"Extra klein"},e_small:{en:"Small",nl:"Klein"},e_medium:{en:"Medium",nl:"Middel"},e_large:{en:"Large",nl:"Groot"},e_extra_large:{en:"Extra large",nl:"Extra groot"},e_disabl_when:{en:"Disabled when",nl:"Uitgeschakeld wanneer"},e_card_stays_visibl:{en:"Card stays visible but inert (38%) while ALL conditions match.",nl:"Kaart blijft zichtbaar maar inactief (38%) zolang ALLE voorwaarden kloppen."},e_icon:{en:"Icon",nl:"Icoon"},e_zone_n:{en:"Zone {n}",nl:"Zone {n}"},e_zones_note:{en:'Only needed when you are NOT using "Find zones automatically" above, or for a curated subset. The card sorts these itself — decisions first, unavailable zones next, bypassed zones last — so this order is only a tie-break inside a group.',nl:'Alleen nodig als je "Zones automatisch zoeken" hierboven NIET gebruikt, of voor een selectie. De kaart sorteert zelf — beslissingen eerst, onbeschikbare zones daarna, overbrugde zones laatst — dus deze volgorde telt alleen binnen een groep.'},e_player_colours:{en:"Player (colours, and the default for the cards inside)",nl:"Speler (kleuren, en standaard voor de kaarten erin)"},e_cards:{en:"Cards",nl:"Kaarten"},e_kiosk_cards_hint:{en:"Kiosk: the first card is the cover, the rest form the player column.",nl:"Kiosk: de eerste kaart is de hoes, de rest vormt de spelerkolom."},e_row_n:{en:"Row {n}",nl:"Rij {n}"},e_bars:{en:"Bars",nl:"Balken"},e_custom_subbuttons:{en:"Custom sub-buttons (overrides auto)",nl:"Eigen subknoppen (vervangt automatisch)"},e_button_n:{en:"Button {n}",nl:"Knop {n}"},e_items:{en:"Items",nl:"Items"},e_item_n:{en:"Item {n}",nl:"Item {n}"},e_sections_sub:{en:"Wallet sections and menus below the mode group",nl:"Walletsecties en menu's onder de modusgroep"},e_menu:{en:"Menu",nl:"Menu"},e_section:{en:"Section",nl:"Sectie"},e_n_cards:{en:"{n} cards",nl:"{n} kaarten"},e_move_up:{en:"Move up",nl:"Omhoog"},e_move_down:{en:"Move down",nl:"Omlaag"},e_edit:{en:"Edit",nl:"Bewerken"},e_delete:{en:"Delete",nl:"Verwijderen"},e_add_section:{en:"Add section",nl:"Sectie toevoegen"},e_section_n:{en:"Section {n}",nl:"Sectie {n}"},e_cp_entity:{en:"Entity (select / input_select / water_heater)",nl:"Entiteit (select / input_select / water_heater)"},e_cp_substate:{en:"Substate (secondary line — supports templates)",nl:"Substatus (tweede regel — templates mogelijk)"},e_manual_opts:{en:"Manual options (override the entity's)",nl:"Handmatige opties (vervangen die van de entiteit)"},e_value:{en:"Value",nl:"Waarde"},e_remove_option:{en:"Remove option",nl:"Optie verwijderen"},e_add_option:{en:"Add option",nl:"Optie toevoegen"},e_bar_actions:{en:"Bar actions (chips in the open bar)",nl:"Balkacties (chips in de open balk)"},e_remove_action:{en:"Remove action",nl:"Actie verwijderen"},e_add_action:{en:"Add action",nl:"Actie toevoegen"},e_cp_info:{en:"Info (closed-bar text — supports templates)",nl:"Info (tekst in gesloten balk — templates mogelijk)"},e_cp_info_entity:{en:"…or info from an entity's state",nl:"…of info uit de status van een entiteit"},e_card:{en:"Card",nl:"Kaart"},e_picker_na:{en:"Card picker unavailable — add cards via the YAML editor.",nl:"Kaartkiezer niet beschikbaar — voeg kaarten toe via de YAML-editor."},e_name_tpl_default:{en:"Name / template (defaults to the friendly name)",nl:"Naam / template (standaard de entiteitsnaam)"},e_name_tpl:{en:"Name / template",nl:"Naam / template"},e_behind_chevron:{en:"Behind the chevron",nl:"Achter de chevron"},e_behind_chevron_hint:{en:"These cards appear when the row is opened. The chevron only shows once there is at least one.",nl:"Deze kaarten verschijnen als de rij opengaat. De chevron verschijnt pas vanaf één kaart."},e_loading_picker:{en:"Loading card picker…",nl:"Kaartkiezer laden…"},e_card_n:{en:"Card {n}",nl:"Kaart {n}"},e_loading_editor:{en:"Loading card editor…",nl:"Kaarteditor laden…"},e_opt_jinja_headline:{en:"Optional Jinja or text. Empty uses the entity state. Placeholders: {value} {min} {max} {unit} {percent}.",nl:"Optioneel Jinja of tekst. Leeg = status van de entiteit. Plaatshouders: {value} {min} {max} {unit} {percent}."},e_opt_jinja_footer:{en:"Optional Jinja or text. Uses the same placeholders as the headline.",nl:"Optioneel Jinja of tekst. Zelfde plaatshouders als de kop."},e_buttons:{en:"Buttons",nl:"Knoppen"},e_split:{en:"split",nl:"gesplitst"},e_menu_options:{en:"Menu options",nl:"Menuopties"},e_menu_options_hint:{en:"(adding one makes a split button)",nl:"(één toevoegen maakt er een gesplitste knop van)"},e_option_n:{en:"Option {n}",nl:"Optie {n}"},e_state_skips:{en:"State skips",nl:"Statusvervangingen"},e_state_skips_note:{en:'Treat one reported state as another before anything reads it — for hardware that reports a real but misleading transition. Example: from "unlocking" to "unlocked".',nl:'Behandel een gemelde status als een andere voor iets hem leest — voor hardware die een echte maar misleidende overgang meldt. Voorbeeld: van "unlocking" naar "unlocked".'},e_from_raw:{en:"From (raw state)",nl:"Van (ruwe status)"},e_to:{en:"To",nl:"Naar"},e_stations_label:{en:"Stations button label (default: translated)",nl:"Label van de zenderknop (standaard: vertaald)"},e_route_glyph_yaml:{en:"route glyph (YAML)",nl:"routesymbool (YAML)"},e_tab_n:{en:"Tab {n}",nl:"Tab {n}"},e_tab_cards:{en:"This tab's cards",nl:"Kaarten van dit tabblad"},e_logo:{en:"Logo",nl:"Logo"},e_cover:{en:"Cover",nl:"Hoes"},e_tiebreak:{en:"Tie-break priority (most important first)",nl:"Voorrang bij gelijkstand (belangrijkste eerst)"},e_action_mappings:{en:"Action mappings",nl:"Actiekoppelingen"},e_mapping_n:{en:"Mapping {n}",nl:"Koppeling {n}"},e_alignment:{en:"Alignment",nl:"Uitlijning"},e_centre:{en:"Centre",nl:"Midden"},e_left:{en:"Left",nl:"Links"},e_split_yaml:{en:"split · menu in YAML",nl:"gesplitst · menu in YAML"},e_mapped_yaml:{en:"state-mapped action (YAML)",nl:"actie per status (YAML)"},e_state_colors:{en:"State colors",nl:"Statuskleuren"},e_state_n:{en:"State {n}",nl:"Status {n}"},e_state_csv:{en:"State (comma-separated for multiple)",nl:"Status (komma's voor meerdere)"},e_add:{en:"Add",nl:"Toevoegen"},e_logo_url:{en:"Logo (URL, e.g. /local/radio/klara.png)",nl:"Logo (URL, bv. /local/radio/klara.png)"},e_own_buttons:{en:"Own buttons",nl:"Eigen knoppen"},e_default_auto:{en:"Default (automatic)",nl:"Standaard (automatisch)"},e_custom_more:{en:"Custom…",nl:"Aangepast…"},e_custom_css:{en:"Custom CSS color",nl:"Eigen CSS-kleur"},e_use_simple:{en:"Use simple input",nl:"Eenvoudige invoer"},e_use_template:{en:"Use a template",nl:"Template gebruiken"},f_entity:{en:"Entity",nl:"Entiteit"},f_icon:{en:"Icon",nl:"Icoon"},f_tap_action:{en:"Tap action",nl:"Tikactie"},f_double_tap_action:{en:"Double tap action",nl:"Dubbeltikactie"},f_hold_action:{en:"Hold action",nl:"Vasthoudactie"},f_label:{en:"Label",nl:"Label"},f_name:{en:"Name",nl:"Naam"},f_subtitle:{en:"Subtitle",nl:"Ondertitel"},f_show_state:{en:"Show state",nl:"Status tonen"},f_state_display:{en:"State display",nl:"Statusweergave"},f_show_sub_buttons:{en:"Show sub buttons",nl:"Subknoppen tonen"},f_show_slider:{en:"Show slider",nl:"Schuifregelaar tonen"},f_columns:{en:"Columns",nl:"Kolommen"},f_wide:{en:"Wide",nl:"Breed"},f_variant:{en:"Variant",nl:"Variant"},f_value:{en:"Value",nl:"Waarde"},f_tile:{en:"Tile",nl:"Tegel"},f_step:{en:"Step",nl:"Stap"},f_stations:{en:"Stations",nl:"Zenders"},f_state:{en:"State",nl:"Status"},f_show_times:{en:"Show times",nl:"Tijden tonen"},f_show_seconds:{en:"Show seconds",nl:"Seconden tonen"},f_show_art:{en:"Show art",nl:"Hoes tonen"},f_seekable:{en:"Seekable",nl:"Verspringbaar"},f_metric:{en:"Metric",nl:"Meetwaarde"},f_image:{en:"Image",nl:"Afbeelding"},f_heading:{en:"Heading",nl:"Kop"},f_fallback_image:{en:"Fallback image",nl:"Reserve-afbeelding"},f_checked_value:{en:"Checked value",nl:"Waarde indien aangevinkt"},f_checked_entity:{en:"Checked entity",nl:"Entiteit voor aangevinkt"},f_background:{en:"Background",nl:"Achtergrond"},f_attribute:{en:"Attribute",nl:"Attribuut"},f_active_state:{en:"Active state",nl:"Actieve status"},f_layout:{en:"Layout",nl:"Indeling"},f_mode:{en:"Mode",nl:"Modus"},f_size:{en:"Size",nl:"Grootte"},f_shape:{en:"Shape",nl:"Vorm"},f_color:{en:"Color",nl:"Kleur"},f_title:{en:"Title",nl:"Titel"},f_options:{en:"Options",nl:"Opties"},f_unit:{en:"Unit",nl:"Eenheid"},f_min:{en:"Min",nl:"Min"},f_max:{en:"Max",nl:"Max"},f_style:{en:"Style",nl:"Stijl"},f_numbers:{en:"Numbers",nl:"Cijfers"},f_position:{en:"Position",nl:"Positie"},e_switcher:{en:"Switcher",nl:"Wisselaar"},e_accessible_name:{en:"Accessible name",nl:"Toegankelijke naam"},e_remember_sel:{en:"Remember the selection on this device",nl:"Keuze onthouden op dit toestel"},e_storage_key:{en:"Storage key (needed to remember)",nl:"Opslagsleutel (nodig om te onthouden)"},ed_glance_hide_quiet:{en:"Hide values that say nothing (no pollen, no rain, UV 0)",nl:"Verberg waarden zonder nieuws (geen pollen, geen regen, UV 0)"},ed_glance_alerts_entity:{en:"Weather warnings (shown on the second line while active)",nl:"Weerwaarschuwingen (op de tweede regel zolang actief)"},ed_expander_collapsible:{en:"Can be folded (off: its cards always show)",nl:"Inklapbaar (uit: de kaarten zijn altijd zichtbaar)"},ed_time_clearable:{en:"Clear button for a date & time",nl:"Wisknop voor een datum en tijd"},ed_alerts_entity:{en:"Warnings entity (e.g. the KMI warning sensor)",nl:"Waarschuwingsentiteit (bv. de KMI-waarschuwingssensor)"},ed_alerts_show:{en:"Show",nl:"Tonen"},ed_alerts_show_all:{en:"Active and upcoming",nl:"Actief en verwacht"},ed_alerts_show_active:{en:"Active only",nl:"Enkel actief"},ed_alerts_max:{en:"At most this many",nl:"Maximaal zoveel"},e_source_menu:{en:"Inputs as a menu (instead of stepping through them)",nl:"Ingangen als menu (in plaats van erdoor te stappen)"},ed_att_later_hours:{en:"Later hides an item for (hours, default 24 = a day; a rule can override)",nl:"Later verbergt een item voor (uren, standaard 24 = een dag; een regel kan afwijken)"},ed_att_later:{en:"Can be put off (a Later button)",nl:"Kan uitgesteld worden (knop Later)"},ed_att_later_hours_item:{en:"Later hides it for (hours; empty = the card's setting)",nl:"Later verbergt het voor (uren; leeg = instelling van de kaart)"},ed_att_when:{en:"Shows when it",nl:"Toont wanneer het"},ed_att_when_on:{en:"is on",nl:"aan is"},ed_att_when_off:{en:"is off",nl:"uit is"},ed_att_when_below:{en:"is below …",nl:"onder … is"},ed_att_when_above:{en:"is above …",nl:"boven … is"},ed_att_when_is:{en:"is (state) …",nl:"(toestand) … is"},ed_att_when_is_not:{en:"is not (state) …",nl:"niet (toestand) … is"},ed_att_when_unavailable:{en:"is unavailable",nl:"niet beschikbaar is"},ed_att_when_custom:{en:"Custom conditions (several entities, and/or …)",nl:"Eigen voorwaarden (meerdere entiteiten, en/of …)"},ed_att_value:{en:"Value",nl:"Waarde"},ed_att_mode:{en:"Shows",nl:"Toont"},ed_att_mode_now:{en:"What needs attention now",nl:"Wat nu aandacht vraagt"},ed_att_mode_later:{en:"Only put-off items (a second copy, lower on the page)",nl:"Enkel uitgestelde items (een tweede kopie, lager op de pagina)"},ed_att_id:{en:"Card name (optional)",nl:"Naam van de kaart (optioneel)"},ed_att_id_help:{en:"Give it a name to place a second copy lower on the page that takes over when everything here has been put off.",nl:"Geef een naam om lager op de pagina een tweede kopie te plaatsen die overneemt wanneer alles hier uitgesteld is."},ed_att_rules_from:{en:"Use the rules of",nl:"Gebruik de regels van"},ed_att_rules_from_help:{en:"The card name you gave the main card. This copy shows only when everything that needs attention has been put off.",nl:"De naam die je de hoofdkaart gaf. Deze kopie toont enkel wanneer alles wat aandacht vraagt uitgesteld is."},ed_att_items:{en:"Rules",nl:"Regels"},ed_att_kind:{en:"Kind",nl:"Soort"},ed_att_kind_rule:{en:"Rule",nl:"Regel"},ed_att_kind_vacuum:{en:"Robot vacuum (its own alerts)",nl:"Robotstofzuiger (eigen meldingen)"},ed_att_vacuum:{en:"Robot vacuum",nl:"Robotstofzuiger"},ed_att_brand:{en:"Brand",nl:"Merk"},ed_att_name:{en:"Text (empty = the entity's name; template allowed)",nl:"Tekst (leeg = naam van de entiteit; template mag)"},ed_att_secondary:{en:"Detail (template allowed)",nl:"Detail (template mag)"},ed_att_level:{en:"How urgent",nl:"Hoe dringend"},ed_att_level_urgent:{en:"Urgent (red)",nl:"Dringend (rood)"},ed_att_level_warning:{en:"Soon (yellow)",nl:"Binnenkort (geel)"},ed_att_level_info:{en:"Info (neutral)",nl:"Info (neutraal)"},ed_att_entity:{en:"What to watch (a tap on the item opens it)",nl:"Wat opvolgen (tikken op het item opent het)"},ed_att_action_label:{en:"Quick action label",nl:"Label snelle actie"},ed_att_action:{en:"Quick action (optional)",nl:"Snelle actie (optioneel)"},ed_att_conditions:{en:"Shows while",nl:"Toont zolang"},ed_att_conditions_help:{en:"The item shows while all of these hold and disappears by itself when they stop, e.g. soil moisture below 15 %. Without conditions it never shows.",nl:"Het item toont zolang dit alles klopt en verdwijnt vanzelf zodra het niet meer klopt, bv. bodemvocht onder 15 %. Zonder voorwaarden toont het nooit."},ed_alerts_expanded:{en:"Show the full text",nl:"Volledige tekst tonen"},ed_cards:{en:"Cards",nl:"Kaarten"},ed_card:{en:"Card",nl:"Kaart"},ed_card_n:{en:"Card {n} · {type}",nl:"Kaart {n} · {type}"},ed_add_card:{en:"Add card",nl:"Kaart toevoegen"},ed_edit_card:{en:"Edit card",nl:"Kaart bewerken"},ed_remove_card:{en:"Remove card",nl:"Kaart verwijderen"},ed_back:{en:"Back",nl:"Terug"},ed_loading_picker:{en:"Loading card picker…",nl:"Kaartkiezer laden…"},ed_loading_editor:{en:"Loading card editor…",nl:"Kaarteditor laden…"},ed_layout:{en:"Layout",nl:"Indeling"},ed_gap:{en:"Gap (px)",nl:"Tussenruimte (px)"},ed_panels:{en:"Panels",nl:"Panelen"},ed_add_panel:{en:"Add panel",nl:"Paneel toevoegen"},ed_remove_panel:{en:"Remove panel",nl:"Paneel verwijderen"},ed_panel_id:{en:"Panel id (a button opens it with panel: id)",nl:"Paneel-id (een knop opent het met panel: id)"},ed_panel_id_taken:{en:"Empty, or already in use",nl:"Leeg, of al in gebruik"},ed_panel_heading:{en:"Heading",nl:"Titel"},ed_panel_head:{en:"Head row (heading, actions, back / close)",nl:"Kopregel (titel, acties, terug / sluiten)"},ed_panel_actions:{en:"Actions in the head row",nl:"Acties in de kopregel"},ed_panel_cards:{en:"Panel content",nl:"Inhoud van het paneel"},ed_panel_mode:{en:"Panels open",nl:"Panelen openen"},ed_panel_mode_inline:{en:"Inline (in place of the cards)",nl:"Inline (in plaats van de kaarten)"},ed_panel_mode_sheet:{en:"Bottom sheet",nl:"Onderblad"},ed_panel_timeout:{en:"Close after (s without a touch, 0 = never)",nl:"Sluiten na (s zonder aanraking, 0 = nooit)"},ed_stack_direction:{en:"Direction",nl:"Richting"},ed_stack_column:{en:"Column",nl:"Kolom"},ed_stack_row:{en:"Row (equal columns)",nl:"Rij (gelijke kolommen)"},ed_stack_grow:{en:"Card that fills the height (number; empty: the last)",nl:"Kaart die de hoogte vult (nummer; leeg: de laatste)"},ed_switcher_bar:{en:"Bar",nl:"Balk"},ed_switcher_tabs:{en:"Tabs",nl:"Tabbladen"},ed_switcher_connected:{en:"Connected button group",nl:"Verbonden knoppengroep"},ed_switcher_size:{en:"Size (connected bar)",nl:"Grootte (verbonden balk)"},ed_items:{en:"Items",nl:"Items"},ed_item_name:{en:"Name (text or template)",nl:"Naam (tekst of template)"},ed_item_value:{en:"Value under the name (text or template)",nl:"Waarde onder de naam (tekst of template)"},ed_power_player:{en:"Player",nl:"Speler"},ed_power_name:{en:"Name (optional)",nl:"Naam (optioneel)"},ed_tile_icon:{en:"Icon (when there is no image)",nl:"Icoon (zonder afbeelding)"},ed_tile_match:{en:"Active when the player shows (default: the name)",nl:"Actief als de speler toont (standaard: de naam)"},ed_tile_close:{en:"Close the panel or sheet after a tap",nl:"Paneel of blad sluiten na een tik"},ed_tile_active_entity:{en:"Player that rings the active tile (default: the player above)",nl:"Speler die de actieve tegel aanduidt (standaard: de speler hierboven)"},ed_tile_active_attributes:{en:"Compare with (default: album, title, channel)",nl:"Vergelijken met (standaard: album, titel, kanaal)"},ed_flex:{en:"Share of the row (flex)",nl:"Aandeel in de rij (flex)"},ed_btn_confirm:{en:"Confirm with a gesture",nl:"Bevestigen met een gebaar"},ed_btn_confirm_hold:{en:"Hold",nl:"Vasthouden"},ed_btn_confirm_slide:{en:"Slide",nl:"Schuiven"},ed_btn_confirm_both:{en:"Also when turning off",nl:"Ook bij uitschakelen"},ed_btn_confirm_threshold:{en:"Slide distance to commit",nl:"Schuifafstand om te bevestigen"},ed_btn_confirm_hold_ms:{en:"Hold time",nl:"Houdtijd"},ed_alerts:{en:"Alerts (the first that applies shows)",nl:"Meldingen (de eerste die geldt verschijnt)"},ed_alert_entity:{en:"Entity (optional)",nl:"Entiteit (optioneel)"},ed_alert_state:{en:"When the entity is (default: not idle)",nl:"Als de entiteit staat op (standaard: niet in rust)"},ed_alert_text:{en:"Text or template (an empty result: no alert)",nl:"Tekst of template (leeg resultaat: geen melding)"},ed_alert_color:{en:"Background colour",nl:"Achtergrondkleur"},ed_alert_color_on:{en:"Text colour",nl:"Tekstkleur"},ed_alert_action:{en:"Tap action",nl:"Tikactie"},ed_alerts_title:{en:"Alerts",nl:"Meldingen"},ed_alert_tints:{en:"An alert recolours the whole hero",nl:"Een melding kleurt de hele hero"},ed_list_entities_helper:{en:"Readings only; text lines and mixed lists go in Rows below (Rows win).",nl:"Alleen metingen; tekstregels en gemengde lijsten horen in Rijen hieronder (Rijen winnen)."},ed_list_rows:{en:"Rows",nl:"Rijen"},ed_row_text:{en:"Text or template (makes the row a text line)",nl:"Tekst of template (maakt van de rij een tekstregel)"},ed_row_entity:{en:"Entity (a reading; on a text line: what a tap opens)",nl:"Entiteit (een meting; bij een tekstregel: wat een tik opent)"},ed_row_name:{en:"Name (text or template)",nl:"Naam (tekst of template)"},ed_row_attribute:{en:"Attribute instead of the state",nl:"Attribuut in plaats van de status"},ed_row_unit:{en:"Unit",nl:"Eenheid"}});const T=(e,t)=>a`
  <ha-sortable
    handle-selector=".drag-handle"
    @item-moved=${t=>{t.stopPropagation();const{oldIndex:n,newIndex:a}=t.detail;n!==a&&e(n,a)}}
  >
    <div>${t}</div>
  </ha-sortable>
`;function B(e,t){return Object.prototype.hasOwnProperty.call(e||{},t)}const D=(e,t,n)=>({value:`var(--md-sys-cust-color-${e})`,swatch:`var(--md-sys-cust-color-${e}, ${n})`,label:t}),F=(e,t)=>({value:`var(--md-sys-color-${e})`,swatch:`var(--md-sys-color-${e})`,label:t}),M=[{title:"Light",options:[D("light","Light","#FEE082"),D("light-container","Light container","#FEEFCA"),D("on-light","On light","#745D00")]},{title:"Device",options:[D("device","Device","#D9E2FE"),D("device-container","Device container","#EDF0FF"),D("on-device","On device","#0156CF")]},{title:"Climate · Heat",options:[D("climate-heat","Heat","#FFDFD4"),D("climate-heat-container","Heat container","#FFEEE9"),D("on-climate-heat","On heat","#A14614"),D("climate-heat-accent","Heat accent","#A14614")]},{title:"Climate · Cool",options:[D("climate-cool","Cool","#D3E8FF"),D("climate-cool-container","Cool container","#EAF3FF"),D("on-climate-cool","On cool","#205F82"),D("climate-cool-accent","Cool accent","#205F82")]},{title:"Climate · Auto",options:[D("climate-auto","Auto","#D4EBDD"),D("climate-auto-container","Auto container","#EAF6EE"),D("on-climate-auto","On auto","#2E5E44"),D("climate-auto-accent","Auto accent","#2E5E44")]},{title:"Water · Eco",options:[D("water-eco","Eco","#C8E6C9"),D("water-eco-container","Eco container","#E6F4EA"),D("on-water-eco","On eco","#256029")]},{title:"Water · Performance",options:[D("water-performance","Performance","#FFD1B0"),D("water-performance-container","Performance container","#FFEDE0"),D("on-water-performance","On performance","#9C3A00")]},{title:"Warning",options:[D("warning","Warning","#D9A000"),D("warning-container","Warning container","#FEEFCA"),D("on-warning","On warning","#4A3A00"),D("on-warning-container","On warning container","#745D00")]},{title:"Error",options:[D("error","Error","#B3261E"),D("error-container","Error container","#F9DEDC"),D("on-error","On error","#FFFFFF"),D("on-error-container","On error container","#410E0B")]},{title:"Weather",options:[D("weather-sun","Sun","#F2B500"),D("weather-cloud","Cloud","#9FA9B7"),D("weather-cloud-dark","Cloud (dark)","#6F7A8A"),D("weather-rain","Rain","#2E86E0"),D("weather-snow","Snow","#AEB8C4"),D("weather-moon","Moon","#5961C2")]},{title:"Severity scale",options:[D("scale-green","Scale green","#5E9E50"),D("scale-yellow","Scale yellow","#C7A128"),D("scale-orange","Scale orange","#D9713C"),D("scale-red","Scale red","#C94D42"),D("scale-purple","Scale purple","#8A4DA3"),D("scale-maroon","Scale maroon","#7A4040")]},{title:"System (theme)",options:[F("primary","Primary"),F("primary-container","Primary container"),F("secondary","Secondary"),F("secondary-container","Secondary container"),F("tertiary","Tertiary"),F("tertiary-container","Tertiary container"),F("error","Error"),F("error-container","Error container"),F("surface-container","Surface container")]}],I=new Set(M.flatMap(e=>e.options.map(e=>e.value)));function P(e){return e&&"string"==typeof e&&(e.includes("{{")||e.includes("{%"))}const R={template:{}};class H extends o{static properties={hass:{attribute:!1},label:{},value:{},_open:{state:!0},_customOpen:{state:!0}};static styles=i`
    :host { display: block; }

    .label {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 0 0 4px 4px;
    }

    .trigger {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      box-sizing: border-box;
      padding: 11px 12px;
      border: none;
      border-bottom: 1px solid var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42));
      border-radius: 4px 4px 0 0;
      background: var(--mdc-text-field-fill-color, rgba(0, 0, 0, 0.06));
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
      cursor: pointer;
      text-align: left;
    }
    .trigger.open {
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 10px;
    }
    .trigger .value { flex: 1; min-width: 0; }
    .chev { color: var(--secondary-text-color); }

    .panel {
      margin-top: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 10px;
      max-height: 320px;
      overflow-y: auto;
      background: var(--card-background-color, var(--ha-card-background, #1c1c1c));
      padding: 4px 0;
    }

    .grp {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      padding: 12px 12px 4px;
    }

    .opt {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      padding: 9px 12px;
      border: none;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 14px;
      text-align: left;
      cursor: pointer;
    }
    .opt:hover { background: var(--secondary-background-color, rgba(0, 0, 0, 0.06)); }
    .opt.sel { background: rgba(var(--rgb-primary-color, 98, 0, 238), 0.14); font-weight: 600; }
    .opt-label { flex: 1; min-width: 0; }

    .swatch {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      flex-shrink: 0;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.25));
    }
    .swatch.none {
      border-style: dashed;
      background: transparent;
    }

    .check { color: var(--primary-color); --mdc-icon-size: 18px; }
    .cust-ic { color: var(--secondary-text-color); --mdc-icon-size: 18px; width: 18px; }

    ha-textfield { display: block; width: 100%; margin-top: 8px; }
  `;get _isCustom(){return!!this.value&&!I.has(this.value)}_option(e){for(const t of M){const n=t.options.find(t=>t.value===e);if(n)return n}return null}get _currentLabel(){if(!this.value)return n("e_default",this.hass);const e=this._option(this.value);return e?e.label:n("al_mode_custom",this.hass)}get _currentHex(){if(!this.value)return null;const e=this._option(this.value);return e?e.swatch:this.value}disconnectedCallback(){super.disconnectedCallback(),this._removeOutside()}render(){const e=this._currentHex,t=a`<ha-icon class="check" icon="mdi:check"></ha-icon>`;return a`
      ${this.label?a`<div class="label">${this.label}</div>`:""}
      <button type="button" class="trigger ${this._open?"open":""}" @click=${this._toggle}>
        <span class="swatch ${e?"":"none"}" style=${e?`background:${e}`:""}></span>
        <span class="value">${this._currentLabel}</span>
        <ha-icon class="chev" icon=${this._open?"mdi:menu-up":"mdi:menu-down"}></ha-icon>
      </button>

      ${this._open?a`
            <div class="panel">
              <button type="button" class="opt ${this.value?"":"sel"}" @click=${()=>this._pick("")}>
                <span class="swatch none"></span>
                <span class="opt-label">${n("e_default_auto",this.hass)}</span>
                ${this.value?"":t}
              </button>
              ${M.map(e=>a`
                  <div class="grp">${e.title}</div>
                  ${e.options.map(e=>a`
                      <button type="button" class="opt ${this.value===e.value?"sel":""}" @click=${()=>this._pick(e.value)}>
                        <span class="swatch" style="background:${e.swatch};"></span>
                        <span class="opt-label">${e.label}</span>
                        ${this.value===e.value?t:""}
                      </button>
                    `)}
                `)}
              <button type="button" class="opt ${this._isCustom?"sel":""}" @click=${this._chooseCustom}>
                <ha-icon class="cust-ic" icon="mdi:eyedropper-variant"></ha-icon>
                <span class="opt-label">${n("e_custom_more",this.hass)}</span>
                ${this._isCustom?t:""}
              </button>
            </div>
          `:""}

      ${this._isCustom||this._customOpen?a`
            <ha-textfield
              .label=${n("e_custom_css",this.hass)}
              placeholder="#ff8800 · rgb(…) · var(--…)"
              .value=${this._isCustom?this.value:""}
              @input=${this._onCustomInput}
            ></ha-textfield>
          `:""}
    `}_toggle(){this._open=!this._open,this._open?(this._outside=e=>{e.composedPath().includes(this)||(this._open=!1,this._removeOutside())},document.addEventListener("click",this._outside,!0)):this._removeOutside()}_removeOutside(){this._outside&&(document.removeEventListener("click",this._outside,!0),this._outside=null)}_pick(e){this._open=!1,this._customOpen=!1,this._removeOutside(),this._emit(e)}_chooseCustom(){this._open=!1,this._customOpen=!0,this._removeOutside()}_onCustomInput(e){this._emit(e.target.value)}_emit(e){e!==this.value&&(this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0})))}}customElements.define("materia-color-picker",H);class N extends o{static properties={hass:{attribute:!1},value:{attribute:!1},label:{},helper:{},_ready:{state:!0}};static styles=i`
    :host { display: block; }
    .label {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 0 0 4px 4px;
    }
    .helper {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 4px 4px 0;
    }
  `;connectedCallback(){super.connectedCallback(),this._summon()}async _summon(){if(customElements.get("ha-card-conditions-editor"))this._ready=!0;else{try{const e=await(window.loadCardHelpers?.());e?.createCardElement?.({type:"conditional",conditions:[],card:{type:"markdown",content:"x"}}),await customElements.whenDefined("hui-conditional-card"),await(customElements.get("hui-conditional-card")?.getConfigElement?.())}catch(e){}this._ready=!!customElements.get("ha-card-conditions-editor")}}render(){const e=Array.isArray(this.value)?this.value:[];return this._ready?a`
      ${this.label?a`<div class="label">${this.label}</div>`:""}
      <ha-card-conditions-editor
        .hass=${this.hass}
        .conditions=${e}
        @value-changed=${this._changed}
      ></ha-card-conditions-editor>
      ${this.helper?a`<div class="helper">${this.helper}</div>`:""}
    `:a`
        <ha-selector
          .hass=${this.hass}
          .selector=${{object:{}}}
          .value=${this.value}
          .label=${this.label}
          .helper=${this.helper}
        ></ha-selector>
      `}_changed(e){e.stopPropagation();const t=e.detail?.value;this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:Array.isArray(t)&&t.length?t:void 0},bubbles:!0,composed:!0}))}}customElements.define("materia-conditions-field",N);const q={name:"disabled_when",label:"e_disabl_when",helper:"e_card_stays_visibl",conditions:!0,template:!0};class W extends o{static properties={hass:{attribute:!1},lovelace:{attribute:!1},_config:{state:!0},_modes:{state:!0}};static styles=i`
    :host { display: block; }

    /* Drag handle for sortable list rows (see editor-helpers sortableList). */
    .drag-handle {
      cursor: grab;
      opacity: 0.5;
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }
    .drag-handle:active { cursor: grabbing; }

    ha-expansion-panel {
      display: block;
      margin-bottom: 12px;
      border-radius: 12px;
      --expansion-panel-content-padding: 0;
    }

    .section-body {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 8px 16px 16px;
    }

    .field {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* HA's ui_action selector ignores the label property, so action fields
       rendered nameless — this caption is ours, above the control. */
    .field-caption {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-bottom: -8px;
    }

    .field-control {
      flex: 1;
      min-width: 0;
    }

    .tpl-toggle {
      flex-shrink: 0;
      color: var(--secondary-text-color);
      --mdc-icon-button-size: 40px;
      --mdc-icon-size: 20px;
    }
    .tpl-toggle.active {
      color: var(--primary-color);
    }
  `;setConfig(e){this._config=e,this._modes??={}}_formData(){return this._config||{}}get _sections(){return[]}_sectionsSignature(){return""}get _sectionsMemo(){const e=`${this._sectionsSignature()}|${l(this.hass)}`;return this.__secSig===e&&this.__secVal||(this.__secSig=e,this.__secVal=s(this._sections,this.hass)),this.__secVal}_stableContext(e,t,n){const a={};for(const[e,o]of Object.entries(t))a[e]=n[o];this.__ctx??={};const o=this.__ctx[e];return o&&Object.keys(a).every(e=>o[e]===a[e])?o:(this.__ctx[e]=a,a)}_modeFor(e,t){const n=this._modes?.[e];return n||(P(t)?"template":"simple")}_toggleMode(e){const t=this._formData()[e],n=this._modeFor(e,t);this._modes={...this._modes||{},[e]:"template"===n?"simple":"template"}}render(){if(!this.hass||!this._config)return a``;const e=this._formData();return a`
      ${this._sectionsMemo.map((t,n)=>this._renderSection(t,e,n))}
      ${this._renderExtra?this._renderExtra(e):""}
    `}_renderSection(e,t,n){return a`
      <ha-expansion-panel
        outlined
        .header=${e.title}
        .secondary=${e.secondary||""}
        .expanded=${e.expanded??0===n}
      >
        ${e.icon?a`<ha-icon slot="leading-icon" .icon=${e.icon}></ha-icon>`:""}
        <div class="section-body">
          ${(e.fields||[]).map(e=>this._renderField(e,t))}
        </div>
      </ha-expansion-panel>
    `}_renderField(e,t){if(e.render)return a`<div class="field-block">${e.render(t[e.name],t)}</div>`;const o=function(e,t,n){return B(t,n.name)?t[n.name]:B(n,"default")?n.default:!n.selector?.boolean&&void 0}(this._config,t,e);this.__displayedFieldValues??=new Map,this.__displayedFieldValues.set(e.name,o);const i=O(e,this.hass),l=!!e.template,s=l?this._modeFor(e.name,o):"simple",r=e.context?this._stableContext(e.name,e.context,t):void 0;let c;return c=l&&"template"===s?a`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${R}
          .value=${o}
          .label=${i}
          .required=${!!e.required}
        ></ha-selector>
      `:e.conditions?a`
        <materia-conditions-field
          class="field-control"
          .hass=${this.hass}
          .value=${o}
          .label=${i}
          .helper=${e.helper}
        ></materia-conditions-field>
      `:e.color?a`
        <materia-color-picker
          class="field-control"
          .hass=${this.hass}
          .label=${i}
          .value=${o||""}
        ></materia-color-picker>
      `:a`
        <ha-selector
          class="field-control"
          .hass=${this.hass}
          .selector=${e.selector}
          .value=${o}
          .label=${i}
          .helper=${e.helper}
          .context=${r}
          .required=${!!e.required}
        ></ha-selector>
      `,a`
      ${e.selector?.ui_action?a`<div class="field-caption">${i}</div>`:""}
      <div class="field" @value-changed=${t=>this._fieldChanged(e.name,t)}>
        ${c}
        ${l?a`
              <ha-icon-button
                class="tpl-toggle ${"template"===s?"active":""}"
                .label=${n("template"===s?"e_use_simple":"e_use_template",this.hass)}
                @click=${()=>this._toggleMode(e.name)}
              >
                <ha-icon icon="mdi:code-braces"></ha-icon>
              </ha-icon-button>
            `:""}
      </div>
    `}_fieldChanged(e,t){t.stopPropagation();const n=t.detail?.value;(function(e,t,n,a){return!B(e,t)&&Object.is(n,a)})(this._config,e,n,this.__displayedFieldValues?.get(e))||this._setField(e,n)}_setField(e,t){const n={...this._config};""===t||null==t?delete n[e]:n[e]=t,this._commit(n)}_commit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}const K=new Set(["cover"]);function V(e){if(!e?.entity)return{...e};const t=e.entity.split(".")[0],n={show_sub_buttons:!1,show_stop:!0,show_state:!0,subtitle_inline:!0};return K.has(t)&&(n.show_sub_buttons=!0),"light"!==t&&"cover"!==t||(n.show_slider=!0),{...n,...e}}class G extends W{static properties={_expandedButton:{state:!0}};static styles=[W.styles,i`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 4px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        cursor: pointer;
      }
      .button-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
      }
      .button-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `];static getStubConfig(e){const t=Object.keys(e?.states||{}).find(e=>e.startsWith("light."))||"light.example";return{entity:t}}setConfig(e){super.setConfig(e),this._expandedButton??=null}_formData(){return V(this._config)}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const e=this._config?.entity?.split(".")[0],t="cover"===e,n="light"===e;return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"image",label:"e_image_replac_icon",template:!0,selector:{text:{}}},{name:"fallback_image",label:"e_fallba_image_shown",selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_active_backgr",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_active_text_icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",template:!0,selector:{boolean:{}}},{name:"show_last_changed",label:"e_show_last_change",selector:{boolean:{}}},{name:"subtitle_inline",label:"e_subtit_inline_with",selector:{boolean:{}}},...n||t?[{name:"show_slider",selector:{boolean:{}}}]:[],...n?[{name:"slider_turn_off",label:"e_slider_can_turn",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...t?[{name:"show_stop",label:"e_show_stop",selector:{boolean:{}}}]:[]]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(e){return[P(e?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"e_label_option",selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{}}}]}_renderExtra(){const e=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return a`
      <div class="section-header">
        <span>${n("e_custom_subbuttons",this.hass)}</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${e.map((e,t)=>a`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(t)}>
              <span>${e.name||(e.icon&&!P(e.icon)?e.icon:n("e_button_n",this.hass,{n:t+1}))}</span>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._toggleButton(t)}}>
                <ha-icon icon=${this._expandedButton===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._removeButton(t)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===t?a`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${s(this._subButtonSchema(e),this.hass)}
                      .computeLabel=${O}
                      @value-changed=${e=>this._subButtonChanged(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}_toggleButton(e){this._expandedButton=this._expandedButton===e?null:e}_addButton(){const e=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:e}),this._expandedButton=e.length-1}_removeButton(e){const t=[...this._config.sub_buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null);const n={...this._config};0===t.length?delete n.sub_buttons:n.sub_buttons=t,this._commit(n)}_subButtonChanged(e,t){const n=[...this._config.sub_buttons||[]];n[e]={...n[e],...t},this._commit({...this._config,sub_buttons:n})}}customElements.define("materia-card-editor",G);class U extends W{static properties={_selectedCard:{state:!0},_expandedButton:{state:!0}};static styles=[W.styles,i`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 4px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        cursor: pointer;
      }
      .button-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
      }
      .button-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
        overflow-x: auto;
      }
      .tabs {
        display: flex;
        gap: 4px;
        flex: 1;
        overflow-x: auto;
      }
      .tab {
        padding: 6px 14px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 999px;
        font-size: 13px;
        cursor: pointer;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        flex-shrink: 0;
      }
      .tab.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: var(--primary-color);
      }
      .card-actions {
        display: flex;
        gap: 4px;
        margin-top: 8px;
        justify-content: flex-end;
      }
      #editor {
        margin-top: 12px;
      }
    `];setConfig(e){super.setConfig(e),this._selectedCard??=-1,this._expandedButton??=null}_formData(){return{columns:2,...V(this._config)}}_sectionsSignature(){return this._config?.entity?.split(".")[0]||""}get _sections(){const e=this._config?.entity?.split(".")[0],t="cover"===e,n="light"===e;return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"columns",selector:{number:{min:1,max:6,mode:"slider"}}},{name:"color",label:"e_active_backgr",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_active_text_icon",color:!0,template:!0,selector:{text:{}}},{name:"show_state",selector:{boolean:{}}},{name:"show_last_changed",label:"e_show_last_change",selector:{boolean:{}}},{name:"subtitle_inline",label:"e_subtit_inline_with",selector:{boolean:{}}},...n||t?[{name:"show_slider",selector:{boolean:{}}}]:[],...n?[{name:"slider_turn_off",label:"e_slider_can_turn",selector:{boolean:{}}}]:[],{name:"show_sub_buttons",selector:{boolean:{}}},...t?[{name:"show_stop",label:"e_show_stop",selector:{boolean:{}}}]:[]]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]}]}_subButtonSchema(e){return[P(e?.icon)?{name:"icon",required:!0,selector:{template:{}}}:{name:"icon",required:!0,selector:{icon:{}}},{name:"name",label:"e_label_option",selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{}}}]}_renderExtra(){const e=this._config.cards||[],t=e.length,o=this._selectedCard,i=o===t,l=o>=0&&o<t,r=Array.isArray(this._config.sub_buttons)?this._config.sub_buttons:[];return a`
      <div class="section-header">
        <span>${n("e_custom_subbuttons",this.hass)}</span>
        <ha-icon-button @click=${this._addSubButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${r.map((e,t)=>a`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleSubButton(t)}>
              <span>${e.name||(e.icon&&!P(e.icon)?e.icon:n("e_button_n",this.hass,{n:t+1}))}</span>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._toggleSubButton(t)}}>
                <ha-icon icon=${this._expandedButton===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._removeSubButton(t)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===t?a`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${s(this._subButtonSchema(e),this.hass)}
                      .computeLabel=${O}
                      @value-changed=${e=>this._subButtonChanged(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}

      <div class="section-header"><span>${n("e_cards",this.hass)}</span></div>

      <div class="toolbar">
        <div class="tabs">
          ${e.map((e,t)=>a`
              <div
                class="tab ${o===t?"selected":""}"
                @click=${()=>this._selectedCard=t}
              >${t+1}</div>
            `)}
        </div>
        <ha-icon-button
          class="${i?"selected":""}"
          @click=${()=>this._selectedCard=t}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      <div id="editor">
        ${i?a`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardPicked}
              ></hui-card-picker>
            `:l?a`
              <div class="card-actions">
                <ha-icon-button ?disabled=${0===o} @click=${()=>this._moveCard(-1)}>
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </ha-icon-button>
                <ha-icon-button ?disabled=${o===t-1} @click=${()=>this._moveCard(1)}>
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${this._removeCard}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${e[o]}
                @config-changed=${this._handleChildChanged}
              ></hui-card-element-editor>
            `:""}
      </div>
    `}_toggleSubButton(e){this._expandedButton=this._expandedButton===e?null:e}_addSubButton(){const e=[...this._config.sub_buttons||[],{icon:"mdi:star"}];this._commit({...this._config,sub_buttons:e}),this._expandedButton=e.length-1}_removeSubButton(e){const t=[...this._config.sub_buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null);const n={...this._config};0===t.length?delete n.sub_buttons:n.sub_buttons=t,this._commit(n)}_subButtonChanged(e,t){const n=[...this._config.sub_buttons||[]];n[e]={...n[e],...t},this._commit({...this._config,sub_buttons:n})}_handleCardPicked(e){e.stopPropagation();const t=[...this._config.cards||[],e.detail.config];this._selectedCard=t.length-1,this._commit({...this._config,cards:t})}_handleChildChanged(e){if(e.stopPropagation(),e.detail.error)return;const t=[...this._config.cards||[]];t[this._selectedCard]=e.detail.config,this._commit({...this._config,cards:t})}_moveCard(e){const t=[...this._config.cards||[]],n=this._selectedCard,a=n+e;if(a<0||a>=t.length)return;const[o]=t.splice(n,1);t.splice(a,0,o),this._selectedCard=a,this._commit({...this._config,cards:t})}_removeCard(){const e=[...this._config.cards||[]];e.splice(this._selectedCard,1),this._selectedCard=Math.max(0,Math.min(this._selectedCard,e.length-1)),0===e.length&&(this._selectedCard=-1),this._commit({...this._config,cards:e})}}customElements.define("materia-room-editor",U);customElements.define("materia-climate-editor",class extends W{_formData(){return{...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",required:!0,template:!0,selector:{text:{}}}]},{title:"e_sensors",icon:"mdi:thermometer",fields:[{name:"temperature_entity",label:"e_temper_sensor",selector:{entity:{domain:"sensor"}}},{name:"humidity_entity",label:"e_humidi_sensor",selector:{entity:{domain:"sensor"}}},{name:"outdoor_temp_entity",label:"e_outdoo_temper_sensor",selector:{entity:{domain:"sensor"}}}]},{title:"e_behavior",icon:"mdi:tune",fields:[{name:"step",default:.5,selector:{number:{min:.5,max:5,step:.5,mode:"box"}}}]}]}});customElements.define("materia-humidifier-editor",class extends W{_formData(){return{show_modes:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:air-humidifier",fields:[{name:"entity",required:!0,selector:{entity:{domain:"humidifier"}}},{name:"name",label:"e_name_option",template:!0,selector:{text:{}}},{name:"humidity_entity",label:"e_extern_humidi_sensor",selector:{entity:{domain:"sensor"}}}]},{title:"e_behavior",icon:"mdi:tune",fields:[{name:"step",label:"e_humidi_step_option",selector:{number:{min:1,max:20,step:1,mode:"box"}}},{name:"show_modes",label:"e_show_device_modes",default:!0,selector:{boolean:{}}},{name:"tap_action",label:"e_card_action",selector:{ui_action:{}}}]}]}});customElements.define("materia-weather-editor",class extends W{_formData(){return{show_temperature:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"e_sensors",icon:"mdi:water-percent",fields:[{name:"show_temperature",label:"e_show_temper",selector:{boolean:{}}},{name:"temperature_entity",label:"e_temper_sensor_option",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",label:"e_humidi_sensor",selector:{entity:{domain:"sensor"}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});customElements.define("materia-weather-tile-editor",class extends W{_formData(){return{show_minmax:!1,size:10,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"e_moon_phase_sensor",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"e_temper_sensor_option",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"icon",label:"e_custom_icon_overri",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}}]},{title:"e_min_max",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"e_show_min_max",selector:{boolean:{}}},{name:"high_entity",label:"e_high_sensor_option",selector:{entity:{domain:"sensor"}}},{name:"low_entity",label:"e_low_sensor_option",selector:{entity:{domain:"sensor"}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"size",label:"e_size_10_fill",selector:{number:{min:1,max:10,step:1,mode:"slider"}}},{name:"color",label:"e_background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_temper",color:!0,template:!0,selector:{text:{}}},{name:"minmax_color",label:"e_min_max_color",color:!0,template:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});customElements.define("materia-weather-hero-editor",class extends W{_formData(){return{show_condition:!0,show_icon:!0,show_feels_like:!0,show_minmax:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"e_moon_phase_sensor",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"e_real_temper_sensor",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"feels_like_entity",label:"e_feels_like_sensor",selector:{entity:{domain:"sensor"}}},{name:"show_condition",label:"e_show_condit_text",selector:{boolean:{}}},{name:"show_icon",label:"e_show_condit_glyph",selector:{boolean:{}}},{name:"show_feels_like",label:"e_show_feels_like",selector:{boolean:{}}}]},{title:"e_night_day",icon:"mdi:thermometer-lines",fields:[{name:"show_minmax",label:"e_show_night_day",selector:{boolean:{}}},{name:"low_entity",label:"e_low_sensor_option",selector:{entity:{domain:"sensor"}}},{name:"high_entity",label:"e_high_sensor_option",selector:{entity:{domain:"sensor"}}},{name:"night_label",label:"e_night_label",selector:{text:{}}},{name:"day_label",label:"e_day_label",selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color_on",label:"e_text_color",color:!0,template:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});customElements.define("materia-forecast-daily-editor",class extends W{_formData(){return{days:10,show_hourly:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"e_moon_phase_sensor",selector:{entity:{domain:"sensor"}}},{name:"days",label:"e_days_shown",selector:{number:{min:3,max:15,step:1,mode:"slider"}}},{name:"show_hourly",label:"e_tap_day_expand",selector:{boolean:{}}},{name:"show_precipitation",label:"e_show_precip_chance",selector:{boolean:{}}},{name:"min_precipitation",default:10,label:"e_hide_below",selector:{number:{min:0,max:100,step:5,mode:"box"}}},{name:"today_label",label:"e_label_for_today",selector:{text:{}}}]}]}});customElements.define("materia-forecast-hourly-editor",class extends W{_formData(){return{hours:24,show_header:!0,show_precipitation:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"e_moon_phase_sensor",selector:{entity:{domain:"sensor"}}},{name:"name",label:"e_header_title",selector:{text:{}}},{name:"show_header",label:"e_show_header",selector:{boolean:{}}},{name:"hours",label:"e_hours_shown",selector:{number:{min:6,max:48,step:1,mode:"slider"}}},{name:"show_precipitation",label:"e_show_precip_chance",selector:{boolean:{}}},{name:"min_precipitation",default:10,label:"e_hide_below",selector:{number:{min:0,max:100,step:5,mode:"box"}}}]}]}});const Z=[{value:"wind",label:"wm_wind"},{value:"uv",label:"wm_uv_index"},{value:"aqi",label:"wm_air_quality"},{value:"pollen",label:"wm_pollen"},{value:"precipitation",label:"wm_precipitation"},{value:"sun",label:"wm_sunrise_sunset"},{value:"visibility",label:"wm_visibility"},{value:"humidity",label:"wm_humidity"},{value:"pressure",label:"wm_pressure"}],J={pollen:{variant:"gauges",max_shown:4}};customElements.define("materia-weather-metric-editor",class extends W{_formData(){return{metric:"wind",...J[this._config?.metric],...this._config}}_sectionsSignature(){return this._config?.metric||""}get _sections(){const e=this._config?.metric,t={title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"metric",required:!0,selector:{select:{mode:"dropdown",options:Z}}},..."sun"!==e&&"pollen"!==e?[{name:"entity",label:"e_weathe_entity",selector:{entity:{domain:"weather"}}},{name:"sensor",label:"e_sensor_overri_option",selector:{entity:{domain:"sensor"}}}]:[],{name:"name",label:"e_title",selector:{text:{}}},{name:"icon",label:"e_header_icon_overri",selector:{icon:{}}}]},n={title:"e_options",icon:"mdi:tune",fields:[]};"wind"===e&&n.fields.push({name:"unit",label:"e_unit_conver_from",selector:{select:{mode:"dropdown",options:[{value:"km/h",label:"km/h"},{value:"m/s",label:"m/s"},{value:"mph",label:"mph"},{value:"kn",label:"e_knots"},{value:"bft",label:"Beaufort"}]}}},{name:"bearing_entity",label:"e_bearin_sensor_option",selector:{entity:{domain:"sensor"}}},{name:"from_label",label:"e_from_label",selector:{text:{}}}),"humidity"===e&&n.fields.push({name:"dew_entity",label:"e_dew_point_sensor",selector:{entity:{domain:"sensor"}}},{name:"dew_label",label:"e_dew_point_label",selector:{text:{}}}),"pressure"===e&&n.fields.push({name:"min",label:"e_gauge_min",selector:{number:{mode:"box"}}},{name:"max",label:"e_gauge_max",selector:{number:{mode:"box"}}}),"precipitation"===e&&n.fields.push({name:"total_label",label:"e_subtit_when_rainin",selector:{text:{}}},{name:"none_label",label:"e_none_expect_label",selector:{text:{}}}),"sun"===e&&n.fields.push({name:"sun_entity",label:"e_sun_entity",selector:{entity:{domain:"sun"}}},{name:"moon_entity",label:"e_moon_phase_sensor2",selector:{entity:{domain:"sensor"}}}),"pollen"===e&&n.fields.push({name:"entities",label:"e_pollen_sensor",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"variant",label:"e_variant",selector:{select:{mode:"dropdown",options:[{value:"gauges",label:"e_gauges_wide"},{value:"small",label:"e_small_dot_list"}]}}},{name:"max_shown",label:"e_max_specie_shown",selector:{number:{min:1,max:6,step:1,mode:"slider"}}},{name:"hide_inactive",label:"e_hide_specie_at",selector:{boolean:{}}},{name:"max",label:"e_scale_max_for",selector:{number:{min:1,max:10,mode:"box"}}});const a={title:"e_appearance",icon:"mdi:palette-outline",fields:[..."wind"===e?[{name:"shape_color",label:"e_shape_color",color:!0,template:!0,selector:{text:{}}}]:[],{name:"color",label:"e_tile_color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_color",color:!0,template:!0,selector:{text:{}}}]},o={title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return n.fields.length?[t,n,a,o]:[t,a,o]}});const Y=[{value:"minmax",label:"e_high_low"},{value:"wind",label:"wm_wind"},{value:"humidity",label:"wm_humidity"},{value:"uv",label:"wm_uv_index"},{value:"precipitation",label:"wm_precipitation"},{value:"pressure",label:"wm_pressure"},{value:"pollen",label:"e_pollen_worst_specie"},{value:"aqi",label:"wm_air_quality"}];class Q extends W{_formData(){return{metrics:["minmax"],hide_quiet:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"moon_entity",label:"e_moon_phase_sensor",selector:{entity:{domain:"sensor"}}},{name:"temperature_entity",label:"e_real_temper_sensor",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"metrics",label:"e_subtit_metric_condit",selector:{select:{multiple:!0,mode:"list",options:Y}}},{name:"sort_by_severity",label:"e_sort_metric_worst",selector:{boolean:{}}},{name:"max_metrics",label:"e_max_metric_on",selector:{number:{min:1,max:8,step:1,mode:"box"}}},{name:"show_metric_icons",label:"e_show_metric_icons",selector:{boolean:{}}},{name:"pollen_entities",label:"e_pollen_sensor_for",selector:{entity:{domain:"sensor",multiple:!0}}},{name:"aqi_entity",label:"e_aqi_sensor_for",selector:{entity:{domain:"sensor"}}},{name:"hide_quiet",label:"ed_glance_hide_quiet",selector:{boolean:{}}},{name:"alerts_entity",label:"ed_glance_alerts_entity",selector:{entity:{domain:["binary_sensor","sensor"]}}},{name:"alert",label:"e_alert_text_templa",template:!0,selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_color",color:!0,template:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"navigate"}}}]}]}get _priority(){return this._config?.priority??["precipitation","pollen","aqi"]}_movePrio(e,t){const n=[...this._priority],[a]=n.splice(e,1);n.splice(t,0,a),this._commit({...this._config,priority:n})}_removePrio(e){const t=[...this._priority];t.splice(e,1),this._commit({...this._config,priority:t})}_renderExtra(){const e=this._priority,o=Y.filter(t=>!e.includes(t.value));return a`
      <div class="prio-header">${n("e_tiebreak",this.hass)}</div>
      ${T((e,t)=>this._movePrio(e,t),e.map((e,n)=>a`
          <div class="prio-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${t(Y.find(t=>t.value===e)?.label,this.hass)??e}</span>
            <ha-icon-button @click=${()=>this._removePrio(n)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `))}
      ${o.length?a`<ha-form
            .hass=${this.hass}
            .data=${{}}
            .schema=${s([{name:"add",label:"e_add_metric_priori",selector:{select:{mode:"dropdown",options:o}}}],this.hass)}
            .computeLabel=${O}
            @value-changed=${t=>{const n=t.detail.value?.add;n&&this._commit({...this._config,priority:[...e,n]})}}
          ></ha-form>`:""}
    `}}Q.styles=[W.styles,i`
    .prio-header {
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .prio-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 4px 2px 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 10px;
      margin-top: 6px;
      font-size: 13px;
    }
    .prio-row span {
      flex: 1;
    }
    .prio-row .drag-handle {
      cursor: grab;
      opacity: 0.6;
    }
  `],customElements.define("materia-weather-glance-editor",Q);customElements.define("materia-alerts-editor",class extends W{_formData(){return{show:"all",...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:alert-outline",fields:[{name:"entity",required:!0,label:"ed_alerts_entity",selector:{entity:{domain:["binary_sensor","sensor"]}}},{name:"show",label:"ed_alerts_show",selector:{select:{mode:"dropdown",options:[{value:"all",label:"ed_alerts_show_all"},{value:"active",label:"ed_alerts_show_active"}]}}},{name:"max",label:"ed_alerts_max",selector:{number:{min:1,max:10,step:1,mode:"box"}}},{name:"expanded",label:"ed_alerts_expanded",selector:{boolean:{}}}]}]}});const X=["on","off","below","above","is","is_not","unavailable","custom"],ee=new Set(["below","above","is","is_not"]),te=e=>ee.has(e);function ne(e){const t=e?.conditions;if(!Array.isArray(t)||0===t.length)return{when:"on"};if(1!==t.length)return{when:"custom"};const[n]=t,a=n.entity??n.entity_id;return!n||a!==e.entity||n.attribute?{when:"custom"}:"numeric_state"===(n.condition??"state")?null!=n.below&&null==n.above?{when:"below",value:n.below}:null!=n.above&&null==n.below?{when:"above",value:n.above}:{when:"custom"}:n.condition&&"state"!==n.condition?{when:"custom"}:null==n.state_not||Array.isArray(n.state_not)?null==n.state||Array.isArray(n.state)?{when:"custom"}:["on","off","unavailable"].includes(n.state)?{when:n.state}:{when:"is",value:n.state}:{when:"is_not",value:n.state_not}}const ae={},oe=e=>"vacuum"===e?.type?"vacuum":"rule",ie=e=>({level:"warning",brand:"roborock",...e,type:oe(e),..."rule"===oe(e)?ne(e):{}}),le=(e,t)=>{const{when:n,value:a,...o}=t,i={...e,...o};if("vacuum"!==i.type&&(delete i.type,n&&"custom"!==n)){const e=function(e,t,n){if(!e||!X.includes(t)||"custom"===t)return null;if("below"===t||"above"===t){const a=Number(n);return Number.isFinite(a)&&""!==n&&null!=n?[{condition:"numeric_state",entity:e,[t]:a}]:null}return"is"===t||"is_not"===t?null==n||""===n?null:[{condition:"state",entity:e,["is"===t?"state":"state_not"]:String(n)}]:[{condition:"state",entity:e,state:t}]}(i.entity,n,a);e?i.conditions=e:delete i.conditions}for(const e of Object.keys(i))""!==i[e]&&null!=i[e]||delete i[e];return"none"===i.action?.action&&delete i.action,i};customElements.define("materia-attention-editor",class extends W{_formData(){return{mode:"now",...this._config}}get _sections(){const e="later"===this._config?.mode;return[{title:"e_content",icon:"mdi:bell-badge-outline",fields:[{name:"mode",label:"ed_att_mode",selector:{select:{mode:"dropdown",options:[{value:"now",label:"ed_att_mode_now"},{value:"later",label:"ed_att_mode_later"}]}}},...e?[{name:"rules_from",label:"ed_att_rules_from",helper:"ed_att_rules_from_help",selector:{select:{mode:"dropdown",custom_value:!0,options:[...r.keys()]}}}]:[{name:"id",label:"ed_att_id",helper:"ed_att_id_help",selector:{text:{}}},{name:"later_hours",label:"ed_att_later_hours",selector:{number:{min:1,max:168,step:1,mode:"box"}}}]]},...e?[]:[{title:"ed_att_items",icon:"mdi:format-list-checks",fields:[{name:"items",render:e=>this._itemsField(e)}]}]]}_itemsField(e){const t=this.hass;return a`<materia-item-list-editor
      .hass=${t}
      .items=${Array.isArray(e)?e:[]}
      .schema=${e=>((e,t,a,o="",i=!1)=>ae[`${e?.locale?.language??""}|${t}|${a}|${te(a)?o:""}|${i}`]??=[{name:"type",label:n("ed_att_kind",e),selector:{select:{mode:"dropdown",options:[{value:"rule",label:n("ed_att_kind_rule",e)},{value:"vacuum",label:n("ed_att_kind_vacuum",e)}]}}},..."vacuum"===t?[{name:"entity",label:n("ed_att_vacuum",e),selector:{entity:{domain:"vacuum"}}},{name:"brand",label:n("ed_att_brand",e),selector:{select:{mode:"dropdown",options:[{value:"roborock",label:"Roborock"},{value:"ecovacs",label:"Ecovacs"}]}}},{name:"later",label:n("ed_att_later",e),selector:{boolean:{}}},...i?[{name:"later_hours",label:n("ed_att_later_hours_item",e),selector:{number:{min:1,max:168,step:1,mode:"box"}}}]:[]]:[{name:"entity",label:n("ed_att_entity",e),selector:{entity:{}}},{name:"when",label:n("ed_att_when",e),selector:{select:{mode:"dropdown",options:X.map(t=>({value:t,label:n(`ed_att_when_${t}`,e)}))}}},...te(a)?[{name:"value",label:n("ed_att_value",e),selector:"below"===a||"above"===a?{number:{mode:"box",step:"any"}}:{state:{entity_id:o}}}]:[],{name:"level",label:n("ed_att_level",e),selector:{select:{mode:"dropdown",options:[{value:"urgent",label:n("ed_att_level_urgent",e)},{value:"warning",label:n("ed_att_level_warning",e)},{value:"info",label:n("ed_att_level_info",e)}]}}},{name:"name",label:n("ed_att_name",e),selector:{text:{}}},{name:"secondary",label:n("ed_att_secondary",e),selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"action_label",label:n("ed_att_action_label",e),selector:{text:{}}},{name:"action",label:n("ed_att_action",e),selector:{ui_action:{default_action:"none"}}},{name:"later",label:n("ed_att_later",e),selector:{boolean:{}}},...i?[{name:"later_hours",label:n("ed_att_later_hours_item",e),selector:{number:{min:1,max:168,step:1,mode:"box"}}}]:[]]])(t,oe(e),"rule"===oe(e)?ne(e).when:"",e?.entity,!!e?.later)}
      .itemLabel=${e=>"vacuum"===oe(e)?t?.states?.[e.entity]?.attributes?.friendly_name||n("ed_att_kind_vacuum",t):e?.name||t?.states?.[e?.entity]?.attributes?.friendly_name||n("ed_att_kind_rule",t)}
      .toForm=${ie}
      .fromForm=${le}
      .newItem=${()=>({level:"warning"})}
      .itemExtra=${(e,o)=>"vacuum"===oe(e)||"custom"!==ne(e).when?a``:a`<materia-conditions-field
              .hass=${t}
              .value=${e.conditions}
              .label=${n("ed_att_conditions",t)}
              .helper=${n("ed_att_conditions_help",t)}
              @value-changed=${t=>{t.stopPropagation();const n={...e};t.detail.value?n.conditions=t.detail.value:delete n.conditions,o(n)}}
            ></materia-conditions-field>`}
      addLabel=${n("ed_att_items",t)}
      @value-changed=${e=>{e.stopPropagation(),this._setField("items",e.detail.value?.length?e.detail.value:[])}}
    ></materia-item-list-editor>`}});const se=(e,t)=>e.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0})),re=i`
  :host {
    display: block;
  }
  .stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .caption {
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  ha-selector {
    display: block;
  }
`;class ce extends o{static properties={hass:{attribute:!1},items:{attribute:!1},schema:{attribute:!1},itemLabel:{attribute:!1},toForm:{attribute:!1},fromForm:{attribute:!1},newItem:{attribute:!1},itemExtra:{attribute:!1},addLabel:{type:String},_expanded:{state:!0}};static styles=[re,i`
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        font-size: 14px;
      }
      .item {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .item-head {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .item-head span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-body {
        padding: 8px 12px 12px;
      }
      .drag-handle {
        cursor: grab;
        opacity: 0.5;
        --mdc-icon-size: 20px;
      }
    `];get _items(){return Array.isArray(this.items)?this.items:[]}_write(e){se(this,e)}_add(){const e=[...this._items,this.newItem?this.newItem():{}];this._expanded=e.length-1,this._write(e)}_remove(e){const t=[...this._items];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._write(t)}_move(e,t){const n=[...this._items],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._write(n)}_replace(e,t){const n=[...this._items];n[e]=t,this._write(n)}_update(e,t){const n=[...this._items],a=n[e];n[e]=this.fromForm?this.fromForm(a,t):{...a,...t},this._write(n)}render(){if(!this.hass)return c;const e=this._items;return a`
      <div class="head">
        <span>${t(this.addLabel,this.hass)??""}</span>
        <ha-icon-button .label=${n("e_add",this.hass)} @click=${this._add}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
      </div>
      ${T((e,t)=>this._move(e,t),e.map((e,t)=>a`<div class="item">
            <div class="item-head">
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${(this.itemLabel?this.itemLabel(e):"")||`${t+1}`}</span>
              <ha-icon-button @click=${()=>this._expanded=this._expanded===t?null:t}>
                <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._remove(t)}><ha-icon icon="mdi:delete"></ha-icon></ha-icon-button>
            </div>
            ${this._expanded===t?a`<div class="item-body">
                  <ha-form
                    .hass=${this.hass}
                    .data=${this.toForm?this.toForm(e):e}
                    .schema=${s("function"==typeof this.schema?this.schema(e):this.schema,this.hass)}
                    .computeLabel=${O}
                    @value-changed=${e=>{e.stopPropagation(),this._update(t,e.detail.value)}}
                  ></ha-form>
                  ${this.itemExtra?this.itemExtra(e,e=>this._replace(t,e)):c}
                </div>`:c}
          </div>`))}
    `}}customElements.define("materia-item-list-editor",ce);const de=[{name:"name",label:"e_name",selector:{text:{}}},{name:"image",label:"e_logo_url",selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{default_action:"perform-action"}}}],_e={},me={select:{multiple:!0,custom_value:!0,options:["media_album_name","media_title","media_channel","media_artist","media_series_title","source","state"]}};function he(e,t,o="stations",i=!1){return a`<materia-item-list-editor
    .hass=${e.hass}
    .items=${t??[]}
    .schema=${i?(l=e.hass,_e[l?.locale?.language??""]??=[...de.slice(0,2),{name:"icon",label:n("ed_tile_icon",l),selector:{icon:{}}},{name:"match",label:n("ed_tile_match",l),selector:{select:{multiple:!0,custom_value:!0,options:[]}}},de[2]]):de}
    .itemLabel=${e=>e?.name}
    .toForm=${i?f:v}
    .fromForm=${i?y:w}
    .newItem=${()=>({name:""})}
    addLabel=${"stations"===o?"media_stations":"e_items"}
    @value-changed=${t=>{t.stopPropagation(),e._setField(o,t.detail.value?.length?t.detail.value:void 0)}}
  ></materia-item-list-editor>`;var l}function pe(e,t,n,o="ed_menu_items"){const i=e.hass;return a`<materia-item-list-editor
    .hass=${i}
    .items=${Array.isArray(t)?t:[]}
    .schema=${e=>ge(i,x(e).type)}
    .itemLabel=${e=>ue(e,i)}
    .toForm=${x}
    .fromForm=${k}
    .newItem=${()=>({})}
    addLabel=${o}
    @value-changed=${e=>{e.stopPropagation(),n(e.detail.value?.length?e.detail.value:void 0)}}
  ></materia-item-list-editor>`}const ue=(e,t)=>{const a=x(e);return"divider"===a.type?n("ed_menu_divider",t):"all"===a.type?n("ed_menu_all",t):a.name||t?.states?.[a.entity]?.attributes?.friendly_name||a.entity||n("ed_menu_switch",t)},be={},ge=(e,t)=>be[`${e?.locale?.language??""}|${t}`]??=[{name:"type",label:n("ed_menu_item_type",e),selector:{select:{mode:"dropdown",options:[{value:"entity",label:n("ed_menu_switch",e)},{value:"divider",label:n("ed_menu_divider",e)},{value:"all",label:n("ed_menu_all",e)}]}}},..."entity"===t?[{name:"entity",label:n("ed_menu_entity",e),selector:{entity:{domain:["media_player","input_boolean","switch","light","fan"]}}},{name:"name",label:n("ed_power_name",e),selector:{text:{}}},{name:"in_all",label:n("ed_menu_in_all",e),selector:{boolean:{}}}]:[]];function fe(e,t){const o=e.hass;return a`<materia-item-list-editor
    .hass=${o}
    .items=${Array.isArray(t)?t:t?[t]:[]}
    .schema=${ye(o)}
    .itemLabel=${e=>e?.text||e?.entity}
    .toForm=${b}
    .fromForm=${g}
    .newItem=${()=>({text:""})}
    addLabel=${n("ed_alerts",o)}
    @value-changed=${t=>{t.stopPropagation();const n={...e._config};delete n.alert,t.detail.value?.length?n.alerts=t.detail.value:delete n.alerts,e._commit(n)}}
  ></materia-item-list-editor>`}const ve={},ye=e=>ve[e?.locale?.language??""]??=[{name:"entity",label:n("ed_alert_entity",e),selector:{entity:{}}},{name:"state",label:n("ed_alert_state",e),selector:{select:{multiple:!0,custom_value:!0,options:[]}}},{name:"text",label:n("ed_alert_text",e),selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"color",label:n("ed_alert_color",e),selector:{text:{}}},{name:"color_on",label:n("ed_alert_color_on",e),selector:{text:{}}},{name:"tap_action",label:n("ed_alert_action",e),selector:{ui_action:{}}}],we=[{name:"icon",label:"e_icon",selector:{icon:{}}},{name:"label",label:"e_label",selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{default_action:"perform-action"}}}],xe={shuffle:"media_shuffle",repeat:"media_repeat",volume:"media_volume"};class ke extends o{static properties={hass:{attribute:!1},value:{attribute:!1}};static styles=[re,i`
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .chip {
        height: 32px;
        padding: 0 12px 0 8px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
        background: none;
        color: var(--primary-text-color);
        font: inherit;
        font-size: 14px;
        cursor: pointer;
      }
      .chip ha-icon {
        --mdc-icon-size: 18px;
        visibility: hidden;
      }
      .chip[aria-pressed="true"] {
        background: var(--md-sys-color-secondary-container, rgba(var(--rgb-primary-color, 3, 169, 244), 0.15));
        color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
        border-color: transparent;
      }
      .chip[aria-pressed="true"] ha-icon {
        visibility: visible;
      }
    `];_emit(e){se(this,JSON.stringify(e)===JSON.stringify(d)?void 0:e)}render(){if(!this.hass)return c;const e=_(this.value),t=t=>e.some(e=>u(e)===t);return a`<div class="stack">
      <div class="chips" role="group" aria-label=${n("e_buttons",this.hass)}>
        ${Object.entries(xe).map(([e,o])=>a`<button
            class="chip"
            aria-pressed=${t(e)?"true":"false"}
            @click=${()=>this._emit(m(this.value,e,!t(e)))}
          ><ha-icon icon="mdi:check"></ha-icon>${n(o,this.hass)}</button>`)}
      </div>
      <materia-item-list-editor
        .hass=${this.hass}
        .items=${h(this.value)}
        .schema=${we}
        .itemLabel=${e=>e?.label||e?.icon}
        .newItem=${()=>({icon:"mdi:gesture-tap"})}
        addLabel="e_own_buttons"
        @value-changed=${e=>{e.stopPropagation(),this._emit(p(this.value,e.detail.value))}}
      ></materia-item-list-editor>
    </div>`}}customElements.define("materia-toolbar-buttons-editor",ke);const $e=["text","entity","name","icon","attribute","unit","tap_action"],Se=(e,t)=>{const n={...e,...t};for(const e of $e)""!==n[e]&&null!=n[e]||delete n[e];return n},ze={};customElements.define("materia-list-editor",class extends W{_formData(){return{variant:"surface",...this._config}}_sectionsSignature(){return this._config?.variant||"surface"}get _sections(){const e="tonal"===this._config?.variant;return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"title",label:"e_title",template:!0,selector:{text:{}}},{name:"icon",label:"e_header_icon",template:!0,selector:{icon:{}}},{name:"entities",label:"e_entiti_rows",helper:n("ed_list_entities_helper",this.hass),selector:{entity:{multiple:!0}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"e_surface",helper:"e_tonal_fills_card",selector:{select:{mode:"dropdown",options:[{value:"surface",label:"e_card_surfac"},{value:"tonal",label:"e_tonal_contai"}]}}},...e?[{name:"color",label:"e_contai_defaul_primar",helper:"e_pick_contai_role",color:!0,selector:{text:{}}},{name:"color_on",label:"e_text_on_contai",color:!0,selector:{text:{}}}]:[]]}]}_renderExtra(){const e=this.hass;return a`<materia-item-list-editor
      .hass=${e}
      .items=${Array.isArray(this._config.rows)?this._config.rows:[]}
      .schema=${t=e,ze[t?.locale?.language??""]??=[{name:"text",label:n("ed_row_text",t),selector:{text:{}}},{name:"entity",label:n("ed_row_entity",t),selector:{entity:{}}},{name:"name",label:n("ed_row_name",t),selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"attribute",label:n("ed_row_attribute",t),selector:{text:{}}},{name:"unit",label:n("ed_row_unit",t),selector:{text:{}}},{name:"tap_action",label:n("ed_alert_action",t),selector:{ui_action:{}}}]}
      .itemLabel=${e=>e?.text||e?.name||e?.entity}
      .fromForm=${Se}
      .newItem=${()=>({text:""})}
      addLabel=${n("ed_list_rows",e)}
      @value-changed=${e=>{e.stopPropagation(),this._setField("rows",e.detail.value?.length?e.detail.value:void 0)}}
    ></materia-item-list-editor>`;var t}});customElements.define("materia-switch-editor",class extends W{_formData(){return{...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"e_name",selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"secondary",label:"e_second_text_templa",template:!0,selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_row_color_escala",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_icon_color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color",label:"e_switch_track_color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color_on",label:"e_switch_thumb_color",color:!0,template:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}});const Ee=[{value:"percent",label:"e_percen_fillin_cookie"},{value:"battery",label:"e_batter_vertic_bar"},{value:"temperature",label:"e_temper_thermo"},{value:"power",label:"e_power_load_bars"},{value:"energy",label:"e_energy"},{value:"binary",label:"e_on_off_spinni"},{value:"plain",label:"e_plain_value"},{value:"vacuum",label:"e_robot_vacuum_state"},{value:"fill",label:"e_gauge_tile_floods"},{value:"bar",label:"e_gauge_value_over"},{value:"ladder",label:"e_gauge_ladder_bars"},{value:"ring",label:"e_gauge_ring_beside"},{value:"scale",label:"e_gauge_positi_on"},{value:"spark",label:"e_histor_area_sparkl"},{value:"sparkline",label:"e_histor_bare_line"},{value:"weekbars",label:"e_histor_bar_per"},{value:"events",label:"e_histor_event_ticks"},{value:"detail",label:"e_summar_value_histor"},{value:"progress_summary",label:"e_summar_progre_ring"}],je=["spark","sparkline","weekbars","events"],Ae=["weekbars","events"],Ce=["fill","bar","ladder","ring","scale","progress_summary"];customElements.define("materia-glance-tile-editor",class extends W{_formData(){const e=this._config?.variant;return{variant:"percent",show_icon:!0,..."percent"===e?{critical_dry:10,dry_below:20,soggy_above:60,dry_label:n("gt_needs_water_now",this.hass),soon_label:n("gt_water_soon",this.hass),optimal_label:n("gt_optimal",this.hass),wet_label:n("gt_overwatered",this.hass)}:"power"===e?{max:3e3,bars:5}:"ladder"===e?{bars:5}:"spark"===e||"sparkline"===e?{hours:24,points:48,history_refresh:5,show_delta:"spark"===e}:"weekbars"===e||"events"===e?{days:3,aggregate:"delta",history_refresh:5}:"detail"===e?{days:7,aggregate:"delta",history_refresh:5}:{},...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){const e=this._config?.variant,t={title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"variant",label:"e_category",required:!0,selector:{select:{mode:"dropdown",options:Ee}}},{name:"name",label:"e_title",selector:{text:{}}},{name:"icon",label:"e_icon_overri_entity",selector:{icon:{}}},{name:"label",label:"e_subtitle",selector:{text:{}}},{name:"active_state",label:"e_active_state_binary",helper:"e_option_state_value",template:!0,selector:{text:{}}}]},n={title:"e_options",icon:"mdi:tune",fields:[]};"temperature"===e&&n.fields.push({name:"min",label:"e_scale_min_defaul",selector:{number:{mode:"box"}}},{name:"max",label:"e_scale_max_defaul",selector:{number:{mode:"box"}}}),"power"===e&&n.fields.push({name:"max",label:"e_full_load_watts",selector:{number:{mode:"box"}}},{name:"bars",label:"e_number_bars_defaul",selector:{number:{min:2,max:40,mode:"box"}}}),Ce.includes(e)&&n.fields.push({name:"min",label:"e_scale_min_defaul2",selector:{number:{mode:"box",step:"any"}}},{name:"max",label:"e_scale_max_defaul2",helper:"e_withou_max_gauge",selector:{number:{mode:"box",step:"any"}}},{name:"caption",label:"e_captio_under_gauge",helper:"e_your_senten_in",template:!0,selector:{text:{}}},{name:"precision",label:"e_decima_places_defaul",selector:{number:{min:0,max:6,mode:"box"}}}),"ladder"===e&&n.fields.push({name:"bars",label:"e_number_bars_defaul",selector:{number:{min:2,max:40,mode:"box"}}}),"scale"===e&&n.fields.push({name:"good",label:"e_which_end_good",helper:"e_left_empty_ramp",selector:{select:{mode:"dropdown",options:[{value:"low",label:"e_low_values_are"},{value:"high",label:"e_high_values_are"}]}}},{name:"min_label",label:"e_label_at_low",helper:"e_your_words_placeh",template:!0,selector:{text:{}}},{name:"max_label",label:"e_label_at_high",helper:"e_same_placeh_empty",template:!0,selector:{text:{}}},{name:"show_delta",label:"e_show_change_pill",helper:"e_fetche_histor_only",selector:{boolean:{}}}),"plain"===e&&n.fields.push({name:"battery_entity",label:"e_paired_batter_sensor",selector:{entity:{domain:"sensor"}}}),"detail"===e&&n.fields.push({name:"days",label:"e_histor_bars_days",selector:{number:{min:1,max:90,mode:"box"}}},{name:"aggregate",label:"e_what_each_histor",selector:{select:{mode:"dropdown",options:[{value:"delta",label:"e_change_across_day"},{value:"mean",label:"e_average"},{value:"min",label:"e_minimum"},{value:"max",label:"e_maximum"},{value:"sum",label:"e_sum_sample"},{value:"count",label:"e_number_sample"}]}}},{name:"metric_1_entity",label:"e_suppor_metric_1",selector:{entity:{}}},{name:"metric_1_label",label:"e_metric_1_label",template:!0,selector:{text:{}}},{name:"metric_1_value",label:"e_metric_1_displa",helper:"e_option_jinja_text",template:!0,selector:{text:{}}},{name:"metric_1_tap_action",label:"e_metric_1_tap",selector:{ui_action:{default_action:"more-info"}}},{name:"metric_2_entity",label:"e_suppor_metric_2",selector:{entity:{}}},{name:"metric_2_label",label:"e_metric_2_label",template:!0,selector:{text:{}}},{name:"metric_2_value",label:"e_metric_2_displa",template:!0,selector:{text:{}}},{name:"metric_2_tap_action",label:"e_metric_2_tap",selector:{ui_action:{default_action:"more-info"}}},{name:"metric_3_entity",label:"e_suppor_metric_3",selector:{entity:{}}},{name:"metric_3_label",label:"e_metric_3_label",template:!0,selector:{text:{}}},{name:"metric_3_value",label:"e_metric_3_displa",template:!0,selector:{text:{}}},{name:"metric_3_tap_action",label:"e_metric_3_tap",selector:{ui_action:{default_action:"more-info"}}},{name:"history_refresh",label:"e_refres_histor_every",selector:{number:{min:1,max:180,mode:"box"}}}),"progress_summary"===e&&n.fields.push({name:"headline",label:"e_headline",helper:"e_opt_jinja_headline",template:!0,selector:{text:{}}},{name:"footer",label:"e_footer",helper:"e_opt_jinja_footer",template:!0,selector:{text:{}}},{name:"footer_icon",label:"e_footer_icon",selector:{icon:{}}}),"vacuum"===e&&n.fields.push({name:"status_entity",label:"e_detail_status_sensor",selector:{entity:{domain:"sensor"}}},{name:"room_entity",label:"e_curren_room_sensor",selector:{entity:{domain:"sensor"}}},{name:"battery_entity",label:"e_batter_sensor_adds",selector:{entity:{domain:"sensor"}}}),"percent"===e&&n.fields.push({name:"critical_dry",label:"e_critic_dry_defaul",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_below",label:"e_water_soon_defaul",selector:{number:{min:0,max:100,mode:"box"}}},{name:"soggy_above",label:"e_overwa_defaul_60",selector:{number:{min:0,max:100,mode:"box"}}},{name:"dry_label",label:"e_needs_water_now",selector:{text:{}}},{name:"soon_label",label:"e_water_soon_label",selector:{text:{}}},{name:"optimal_label",label:"e_optima_label",selector:{text:{}}},{name:"wet_label",label:"e_overwa_label",selector:{text:{}}}),je.includes(e)&&(Ae.includes(e)?n.fields.push({name:"days",label:"e_days_histor_defaul",helper:"e_kept_short_on",selector:{number:{min:1,max:90,mode:"box"}}},{name:"aggregate",label:"e_what_each_bar",helper:"e_change_how_much",selector:{select:{mode:"dropdown",options:[{value:"delta",label:"e_change_across_day"},{value:"mean",label:"e_average"},{value:"min",label:"e_minimum"},{value:"max",label:"e_maximum"},{value:"sum",label:"e_sum_sample"},{value:"count",label:"e_number_sample"}]}}},{name:"summary_period",label:"e_separa_captio_period",helper:"e_keeps_visibl_bars",selector:{select:{mode:"dropdown",options:[{value:"current_month",label:"e_curren_calend_month"}]}}}):n.fields.push({name:"hours",label:"e_hours_histor_defaul",helper:"e_window_longer_than",selector:{number:{min:1,max:2160,mode:"box"}}},{name:"points",label:"e_points_plotte_defaul",selector:{number:{min:2,max:400,mode:"box"}}},{name:"show_delta",label:"e_show_change_pill",selector:{boolean:{}}},{name:"delta_label",label:"e_change_pill_text",helper:"e_placeh_delta_delta",template:!0,selector:{text:{}}}),n.fields.push({name:"caption",label:"e_caption",helper:"e_your_words_placeh2",template:!0,selector:{text:{}}},{name:"history_refresh",label:"e_refres_every_n",helper:"e_histor_polled_on",selector:{number:{min:1,max:180,mode:"box"}}}));const a={title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"e_accent_color_fill",color:!0,selector:{text:{}}},{name:"color",label:"e_tile_color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_color",color:!0,template:!0,selector:{text:{}}},{name:"show_icon",label:"e_show_icon_beside",selector:{boolean:{}}}]},o={title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]};return n.fields.length?[t,n,a,o]:[t,a,o]}});customElements.define("materia-hero-editor",class extends W{_formData(){return{burst:!0,variant:"hero",alert_tints_hero:!0,...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",label:"e_eyebro_text",selector:{text:{}}},{name:"icon",label:"e_eyebro_icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"title",label:"e_big_title_defaul",template:!0,selector:{text:{}}},{name:"value",label:"e_headli_number_defaul",template:!0,selector:{text:{}}},{name:"unit",label:"e_unit_after_number",selector:{text:{}}},{name:"caption",label:"e_captio_beside_number",template:!0,selector:{text:{}}},{name:"secondary",label:"e_sub_line",template:!0,selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"e_emphasis",helper:"e_hero_owns_panel",selector:{select:{mode:"dropdown",options:[{value:"hero",label:"e_hero_filled_owns"},{value:"sidekick",label:"e_sideki_quiet_peer"}]}}},{name:"active_state",label:"e_state_s_count",selector:{text:{}}},..."sidekick"===this._config?.variant?[]:[{name:"burst",label:"e_show_turnin_burst",selector:{boolean:{}}}],{name:"active_color",label:"e_backgr_while_active",color:!0,template:!0,selector:{text:{}}},{name:"active_color_on",label:"e_text_while_active",color:!0,template:!0,selector:{text:{}}},{name:"color",label:"e_backgr_at_rest",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_at_rest",color:!0,template:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]},{title:n("ed_alerts_title",this.hass),icon:"mdi:alert-circle-outline",expanded:!1,fields:[{name:"alerts",render:e=>fe(this,e??this._config?.alert)},{name:"alert_tints_hero",label:n("ed_alert_tints",this.hass),selector:{boolean:{}}}]}]}});customElements.define("materia-vacuum-hero-editor",class extends W{_formData(){return{brand:"roborock",burst:!0,alert_tints_hero:!0,variant:"hero",...this._config}}_sectionsSignature(){return`${this._config?.brand||""}|${this._config?.variant||""}`}get _sections(){return[{title:"e_setup",icon:"mdi:tune",fields:[{name:"entity",required:!0,selector:{entity:{domain:"vacuum"}}},{name:"brand",label:"e_brand_profil",selector:{select:{mode:"dropdown",options:[{value:"roborock",label:"Roborock"},{value:"ecovacs",label:"Ecovacs"},{value:"generic",label:"e_generi_other"}]}}},{name:"name",label:"e_name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{title:"e_entity_overri",icon:"mdi:link-variant",fields:[{name:"status_entity",label:"e_status_work_mode",selector:{entity:{}}},{name:"progress_entity",label:"e_cleani_progre",selector:{entity:{}}},{name:"battery_entity",label:"e_battery",selector:{entity:{}}},{name:"room_entity",label:"e_curren_room",selector:{entity:{}}},{name:"cleaning_time_entity",label:"e_elapse_cleani_time",selector:{entity:{}}},{name:"error_entity",label:"vh_vacuum_error",selector:{entity:{}}},{name:"dock_error_entity",label:"vh_dock_error",selector:{entity:{}}},{name:"mop_drying_entity",label:"e_mop_drying",selector:{entity:{}}},{name:"last_clean_entity",label:"e_last_clean_finish",selector:{entity:{}}}]},{title:"e_behaviour",icon:"mdi:cog-outline",fields:[{name:"consumable_hours",label:"e_warn_when_consum",selector:{number:{min:0,max:200,mode:"box"}}},{name:"consumable_percent",label:"e_warn_when_lifesp",selector:{number:{min:0,max:100,mode:"box"}}},{name:"docked_label",label:"e_label_at_full",selector:{text:{}}},{name:"drying_label",label:"e_drying_sub_line",selector:{text:{}}},{name:"alert_tints_hero",label:"e_error_colour_whole",selector:{boolean:{}}},{name:"alerts",render:e=>fe(this,e)},..."sidekick"===this._config?.variant?[]:[{name:"burst",label:"e_show_decora_shape",selector:{boolean:{}}}]]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"e_emphasis",helper:"e_hero_owns_panel2",selector:{select:{mode:"dropdown",options:[{value:"hero",label:"e_hero_filled_owns"},{value:"sidekick",label:"e_sideki_quiet_peer"}]}}},{name:"working_color",label:"e_backgr_while_workin",color:!0,selector:{text:{}}},{name:"working_color_on",label:"e_text_while_workin",color:!0,selector:{text:{}}},{name:"color",label:"e_backgr_at_rest",color:!0,selector:{text:{}}},{name:"color_on",label:"e_text_at_rest",color:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});customElements.define("materia-chips-editor",class extends W{_formData(){return{show_check:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"e_entity_holdin_select2",selector:{entity:{}}},{name:"attribute",label:"e_attrib_instea_state",selector:{text:{}}},{name:"multi_select",label:"e_multi_select_state",selector:{boolean:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"show_check",label:"e_show_check_on",selector:{boolean:{}}},{name:"color",label:"e_select_chip_color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_select_chip_text",color:!0,template:!0,selector:{text:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}});customElements.define("materia-bar-select-editor",class extends W{_formData(){return{...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"label",label:"e_label",selector:{text:{}}},{name:"attribute",label:"e_attrib_fan_speed",selector:{text:{}}},{name:"off_option",label:"e_option_shown_as",selector:{text:{}}},{name:"off_icon",label:"e_icon_for_button",selector:{icon:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"accent",label:"e_lit_bar_color",color:!0,template:!0,selector:{text:{}}},{name:"accent_on",label:"e_glyph_color_on",color:!0,template:!0,selector:{text:{}}}]},{title:"e_advanced",icon:"mdi:tune",fields:[{name:"service",label:"e_overri_servic_domain",selector:{text:{}}},{name:"service_key",label:"e_overri_servic_data",selector:{text:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}});class Le extends W{static properties={_expanded:{state:!0}};static styles=[W.styles,i`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{...this._config}}get _sections(){const e=!!this._config?.sort_by_history,t=(this._config?.items||[]).some(e=>e.entity);return[{title:"e_content",icon:"mdi:card-text-outline",fields:[...t?[]:[{name:"entity",label:"e_entity_holdin_select",helper:"e_only_needed_when",selector:{entity:{}}},{name:"attribute",label:"e_attrib_instea_state",selector:{text:{}}},{name:"multi_select",label:"e_multi_select_state",selector:{boolean:{}}}],{name:"carousel",label:"e_carous_horizo_scroll",selector:{boolean:{}}}]},{title:"e_auto_sort",icon:"mdi:sort-variant",fields:[{name:"sort_by_history",label:"e_sort_by_pick",helper:"e_reads_tracke_entity",selector:{boolean:{}}},...e?[{name:"sort_history_days",label:"e_histor_window_in",default:30,selector:{number:{min:1,max:365,mode:"box"}}}]:[]]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_select_tile_color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_select_tile_text",color:!0,template:!0,selector:{text:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}get _itemSchema(){return[{name:"label",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}}},{name:"secondary",label:"e_second_line_option",selector:{text:{}}},{name:"entity",label:"e_entity_option_tile",helper:"e_room_s_own",selector:{entity:{}}},{name:"value",label:"e_value_when_there",selector:{text:{}}},{name:"tap_action",label:"e_action_overri_defaul",selector:{ui_action:{default_action:"none"}}}]}_renderExtra(){const e=this._config?.items||[];return a`
      <div class="options-header">
        <span>${n("e_items",this.hass)}</span>
        <ha-icon-button @click=${this._addItem}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${T((e,t)=>this._moveItem(e,t),e.map((e,t)=>a`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||n("e_item_n",this.hass,{n:t+1})}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeItem(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?a`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s(this._itemSchema,this.hass)}
                        .computeLabel=${O}
                        @value-changed=${e=>this._updateItem(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addItem(){const e=[...this._config.items||[],{label:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,items:e})}_removeItem(e){const t=[...this._config.items||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,items:t})}_moveItem(e,t){const n=[...this._config.items||[]],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commit({...this._config,items:n})}_updateItem(e,t){const n=[...this._config.items||[]];n[e]={...n[e],...t},this._commit({...this._config,items:n})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-carousel-editor",Le);let Oe=null;function Te(){return customElements.get("hui-card-element-editor")&&customElements.get("hui-card-picker")?Promise.resolve():(Oe??=(async()=>{(await $()).createCardElement({type:"vertical-stack",cards:[]});const e=await Promise.race([customElements.whenDefined("hui-vertical-stack-card"),new Promise((e,t)=>setTimeout(()=>t(new Error("timeout")),15e3))]);await e.getConfigElement(),await Promise.all([customElements.whenDefined("hui-card-picker"),customElements.whenDefined("hui-card-element-editor")])})().catch(()=>{Oe=null}),Oe)}const Be=(e,t)=>e.dispatchEvent(new CustomEvent("value-changed",{detail:{value:t},bubbles:!0,composed:!0})),De=e=>e.stopPropagation(),Fe=e=>{const t=e?.type||"card";if(t.startsWith("custom:")){const e=t.slice(7);return(globalThis.customCards||[]).find(t=>t.type===e)?.name||e}return t.charAt(0).toUpperCase()+t.slice(1).replace(/-/g," ")},Me=i`
  :host {
    display: block;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
  }
  .hint,
  .loading {
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 4px;
  }
  .card-row {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 4px 2px 12px;
    margin-top: 6px;
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    border-radius: 10px;
  }
  .card-row span {
    flex: 1;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .drag-handle {
    cursor: grab;
    opacity: 0.5;
    --mdc-icon-size: 20px;
    flex-shrink: 0;
  }
  hui-card-picker {
    display: block;
    margin-top: 8px;
  }
  .edit-head {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 16px;
    font-weight: 600;
    font-size: 14px;
  }
  .slot-body {
    margin-top: 8px;
  }
`;class Ie extends o{static properties={hass:{attribute:!1},lovelace:{attribute:!1},label:{type:String},_ready:{state:!0}};static styles=Me;connectedCallback(){super.connectedCallback(),this._ready||this._load()}_load(e=0){Te().then(()=>{this._ready=!!customElements.get("hui-card-picker")&&!!customElements.get("hui-card-element-editor"),!this._ready&&e<5&&this.isConnected&&setTimeout(()=>this._load(e+1),1e3)})}_picker(e){return this._ready?a`<div @value-changed=${De}><hui-card-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      @config-changed=${t=>{t.stopPropagation(),e(t.detail.config)}}
    ></hui-card-picker></div>`:a`<div class="loading">${n("ed_loading_picker",this.hass)}</div>`}_editor(e,t){return this._ready?a`<div @value-changed=${De}><hui-card-element-editor
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .value=${e}
      @config-changed=${e=>{e.stopPropagation(),t(e.detail.config)}}
    ></hui-card-element-editor></div>`:a`<div class="loading">${n("ed_loading_editor",this.hass)}</div>`}_iconButton(e,t,n){return a`<ha-icon-button .label=${t} @click=${n}><ha-icon icon=${e}></ha-icon></ha-icon-button>`}}class Pe extends Ie{static properties={cards:{attribute:!1},hint:{type:String},addButton:{type:Boolean,attribute:"add-button"},_editing:{state:!0},_adding:{state:!0}};get _cards(){return Array.isArray(this.cards)?this.cards:[]}_write(e){this.cards=e,Be(this,e)}_move(e,t){const n=[...this._cards],[a]=n.splice(e,1);n.splice(t,0,a),this._editing===e&&(this._editing=t),this._write(n)}_remove(e){const t=[...this._cards];t.splice(e,1),this._editing===e&&(this._editing=null),this._write(t)}_update(e,t){const n=[...this._cards];n[e]=t,this._write(n)}render(){const e=this._cards,o=this._editing;if(null!=o&&e[o])return a`
        <div class="edit-head">
          ${this._iconButton("mdi:arrow-left",n("ed_back",this.hass),()=>this._editing=null)}
          <span>${n("ed_card_n",this.hass,{n:o+1,type:Fe(e[o])})}</span>
        </div>
        ${this._editor(e[o],e=>this._update(o,e))}
      `;const i=!this.addButton||this._adding;return a`
      <div class="head">
        <span>${t(this.label,this.hass)??""}</span>
        ${this.addButton?this._iconButton(this._adding?"mdi:close":"mdi:plus",n("ed_add_card",this.hass),()=>this._adding=!this._adding):c}
      </div>
      ${this.hint?a`<div class="hint">${t(this.hint,this.hass)}</div>`:c}
      ${T((e,t)=>this._move(e,t),e.map((e,t)=>a`<div class="card-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${Fe(e)}</span>
            ${this._iconButton("mdi:pencil",n("ed_edit_card",this.hass),()=>this._editing=t)}
            ${this._iconButton("mdi:delete",n("ed_remove_card",this.hass),()=>this._remove(t))}
          </div>`))}
      ${i?this._picker(e=>{this._adding=!1,this._write([...this._cards,e])}):c}
    `}}customElements.define("materia-card-list-editor",Pe),customElements.define("materia-card-slot-editor",class extends Ie{static properties={card:{attribute:!1},_open:{state:!0}};_write(e){this.card=e,Be(this,e)}render(){const e=this.card&&"object"==typeof this.card?this.card:null;return a`
      <div class="head"><span>${t(this.label,this.hass)??n("ed_card",this.hass)}</span></div>
      ${e?a`<div class="card-row">
              <span>${Fe(e)}</span>
              ${this._iconButton(this._open?"mdi:chevron-up":"mdi:pencil",n("ed_edit_card",this.hass),()=>this._open=!this._open)}
              ${this._iconButton("mdi:delete",n("ed_remove_card",this.hass),()=>{this._open=!1,this._write(void 0)})}
            </div>
            ${this._open?a`<div class="slot-body">${this._editor(e,e=>this._write(e))}</div>`:c}`:this._picker(e=>{this._open=!0,this._write(e)})}
    `}});const Re="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:var(--md-sys-color-secondary-container, rgba(120,120,128,.14));color:var(--md-sys-color-on-secondary-container, inherit);margin-bottom:6px;cursor:pointer;",He="border:none;background:transparent;color:inherit;cursor:pointer;padding:4px;display:grid;place-items:center;border-radius:50%;--mdc-icon-size:18px;",Ne="border:1.5px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.2));background:transparent;color:inherit;font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;";customElements.define("materia-climate-panel-editor",class extends W{static properties={_secIdx:{state:!0},_cardIdx:{state:!0},_huiReady:{state:!0}};connectedCallback(){super.connectedCallback(),this._loadHui()}async _loadHui(){customElements.get("hui-card-picker")&&customElements.get("hui-card-element-editor")?this._huiReady=!0:(await Te(),this._huiReady=!!customElements.get("hui-card-picker"))}_formData(){return{steppers:"side",wave:"auto",show_modes:!0,...this._config}}get _secs(){return this._config?.sections||[]}_setSecs(e){const t={...this._config};e.length?t.sections=e:delete t.sections,this._commit(t)}_patchSec(e,t){const n=[...this._secs],a={...n[e],...t};for(const e of Object.keys(t))void 0!==t[e]&&""!==t[e]&&null!==t[e]||delete a[e];n[e]=a,this._setSecs(n)}_moveSec(e,t){const n=[...this._secs],a=e+t;a<0||a>=n.length||([n[e],n[a]]=[n[a],n[e]],this._setSecs(n))}_addSec(){const e=this._secs.length;this._setSecs([...this._secs,{title:n("e_new_sectio",this.hass),style:"section",cards:[]}]),this._secIdx=e}_patchCards(e,t){this._patchSec(e,{cards:t})}render(){return this.hass&&this._config?null!=this._secIdx&&null!=this._cardIdx?this._renderCardView():null!=this._secIdx?this._renderSectionView():super.render():a``}_back(e,t){return a`
      <div style="display:flex;align-items:center;gap:8px;margin:4px 0 14px;">
        <button style=${He} @click=${t}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <span style="font-weight:600;font-size:15px;">${e}</span>
      </div>
    `}_sel(e,n,o,i){return a`
      <div style="margin-bottom:12px;" @value-changed=${e=>{e.stopPropagation(),i(e.detail.value)}}>
        <ha-selector .hass=${this.hass} .selector=${s(n,this.hass)} .value=${o} .label=${t(e,this.hass)}></ha-selector>
      </div>
    `}_renderExtra(){return a`
      <ha-expansion-panel outlined .header=${n("e_sections",this.hass)} .secondary=${n("e_sections_sub",this.hass)} .expanded=${!0}>
        <ha-icon slot="leading-icon" icon="mdi:wallet-outline"></ha-icon>
        <div style="padding:12px;">
          ${this._secs.map((e,t)=>a`
            <div style=${Re} @click=${()=>{this._secIdx=t}}>
              <span style="opacity:.6;font-weight:600;">${t+1}</span>
              <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${e.title||n("menu"===e.style?"e_menu":"e_section",this.hass)}
              </span>
              <span style="opacity:.6;font-size:12px;">${"menu"===e.style?n("e_menu",this.hass).toLowerCase():n("e_n_cards",this.hass,{n:(e.cards||[]).length})}</span>
              <button style=${He} title=${n("e_move_up",this.hass)} @click=${e=>{e.stopPropagation(),this._moveSec(t,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button style=${He} title=${n("e_move_down",this.hass)} @click=${e=>{e.stopPropagation(),this._moveSec(t,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button style=${He} title=${n("e_edit",this.hass)} @click=${e=>{e.stopPropagation(),this._secIdx=t}}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button style=${He} title=${n("e_delete",this.hass)} @click=${e=>{e.stopPropagation(),this._setSecs(this._secs.filter((e,n)=>n!==t))}}><ha-icon icon="mdi:delete"></ha-icon></button>
            </div>
          `)}
          <button style=${Ne} @click=${()=>this._addSec()}>
            <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>${n("e_add_section",this.hass)}
          </button>
        </div>
      </ha-expansion-panel>
    `}_renderSectionView(){const e=this._secIdx,t=this._secs[e];if(!t)return this._secIdx=null,a``;const o="menu"===t.style?"menu":"section";return a`
      ${this._back(t.title||n("e_section_n",this.hass,{n:e+1}),()=>{this._secIdx=null})}
      ${this._sel("e_title",{text:{}},t.title,t=>this._patchSec(e,{title:t}))}
      ${this._sel("e_icon",{icon:{}},t.icon,t=>this._patchSec(e,{icon:t}))}
      ${this._sel("e_style",{select:{mode:"dropdown",options:[{value:"section",label:"e_wallet_sectio_nested"},{value:"menu",label:"e_menu_tap_opens"}]}},o,t=>this._patchSec(e,{style:t}))}
      ${"menu"===o?this._renderMenuFields(e,t):this._renderSectionCards(e,t)}
    `}_renderMenuFields(e,t){const o=t.options||[],i=(t,n)=>{const a=o.map((e,a)=>a===t?{...e,...n}:e);for(const e of Object.keys(n))""!==n[e]&&null!=n[e]||delete a[t][e];this._patchSec(e,{options:a})};return a`
      ${this._sel("e_cp_entity",{entity:{}},t.entity,t=>this._patchSec(e,{entity:t}))}
      ${this._sel("e_cp_substate",{template:{}},t.substate,t=>this._patchSec(e,{substate:t}))}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">${n("e_manual_opts",this.hass)}</div>
      ${o.map((t,l)=>a`
        <div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:8px;">
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),i(l,{label:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.label} .label=${n("e_label",this.hass)}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),i(l,{value:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.value} .label=${n("e_value",this.hass)}></ha-selector>
          </div>
          <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),i(l,{icon:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${t.icon} .label=${n("e_icon",this.hass)}></ha-selector>
          </div>
          <button style="${He}margin-top:12px;" title=${n("e_remove_option",this.hass)}
            @click=${()=>this._patchSec(e,{options:o.filter((e,t)=>t!==l)})}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </button>
        </div>
      `)}
      <button style=${Ne} @click=${()=>this._patchSec(e,{options:[...o,{label:"",value:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>${n("e_add_option",this.hass)}
      </button>
    `}_renderActions(e,t){const o=t.actions||[],i=(t,n)=>{const a=o.map((e,a)=>a===t?{...e,...n}:e);for(const e of Object.keys(n))""!==n[e]&&null!=n[e]||delete a[t][e];this._patchSec(e,{actions:a})};return a`
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">${n("e_bar_actions",this.hass)}</div>
      ${o.map((t,l)=>a`
        <div style="border:1px solid var(--md-sys-color-outline-variant, rgba(0,0,0,.15));border-radius:12px;padding:10px;margin-bottom:8px;">
          <div style="display:flex;gap:6px;align-items:flex-start;">
            <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),i(l,{label:e.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{text:{}}} .value=${t.label} .label=${n("e_label",this.hass)}></ha-selector>
            </div>
            <div style="flex:1;" @value-changed=${e=>{e.stopPropagation(),i(l,{icon:e.detail.value})}}>
              <ha-selector .hass=${this.hass} .selector=${{icon:{}}} .value=${t.icon} .label=${n("e_icon",this.hass)}></ha-selector>
            </div>
            <button style="${He}margin-top:12px;" title=${n("e_remove_action",this.hass)}
              @click=${()=>this._patchSec(e,{actions:o.filter((e,t)=>t!==l)})}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </button>
          </div>
          <div style="margin-top:8px;" @value-changed=${e=>{e.stopPropagation(),i(l,{tap_action:e.detail.value})}}>
            <ha-selector .hass=${this.hass} .selector=${{ui_action:{}}} .value=${t.tap_action} .label=${n("sched_action",this.hass)}></ha-selector>
          </div>
        </div>
      `)}
      <button style="${Ne}margin-bottom:12px;" @click=${()=>this._patchSec(e,{actions:[...o,{label:""}]})}>
        <ha-icon icon="mdi:plus" style="--mdc-icon-size:16px;"></ha-icon>${n("e_add_action",this.hass)}
      </button>
    `}_renderSectionCards(e,t){const o=t.cards||[],i=(t,n)=>{const a=t+n;if(a<0||a>=o.length)return;const i=[...o];[i[t],i[a]]=[i[a],i[t]],this._patchCards(e,i)};return a`
      ${this._sel("e_cp_info",{template:{}},t.info,t=>this._patchSec(e,{info:t}))}
      ${this._sel("e_cp_info_entity",{entity:{}},t.info_entity,t=>this._patchSec(e,{info_entity:t}))}
      ${this._renderActions(e,t)}
      <div style="font-weight:600;font-size:13px;margin:6px 0 8px;">${n("e_cards",this.hass)}</div>
      ${o.map((t,l)=>a`
        <div style=${Re} @click=${()=>{this._cardIdx=l}}>
          <span style="opacity:.6;font-weight:600;">${l+1}</span>
          <span style="flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t.type||n("e_card",this.hass)}</span>
          <button style=${He} title=${n("e_move_up",this.hass)} @click=${e=>{e.stopPropagation(),i(l,-1)}}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button style=${He} title=${n("e_move_down",this.hass)} @click=${e=>{e.stopPropagation(),i(l,1)}}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
          <button style=${He} title=${n("e_edit",this.hass)} @click=${e=>{e.stopPropagation(),this._cardIdx=l}}><ha-icon icon="mdi:pencil"></ha-icon></button>
          <button style=${He} title=${n("e_delete",this.hass)} @click=${t=>{t.stopPropagation(),this._patchCards(e,o.filter((e,t)=>t!==l))}}><ha-icon icon="mdi:delete"></ha-icon></button>
        </div>
      `)}
      ${this._huiReady?a`<hui-card-picker
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            @config-changed=${t=>{t.stopPropagation(),this._patchCards(e,[...o,t.detail.config])}}
          ></hui-card-picker>`:a`<div style="opacity:.7;font-size:12px;margin-top:8px;">${n("e_picker_na",this.hass)}</div>`}
    `}_renderCardView(){const e=this._secIdx,t=this._cardIdx,o=this._secs[e]?.cards?.[t];return o?a`
      ${this._back(o.type||n("e_card",this.hass),()=>{this._cardIdx=null})}
      ${customElements.get("hui-card-element-editor")?a`<hui-card-element-editor
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            .value=${o}
            @config-changed=${n=>{n.stopPropagation();const a=[...this._secs[e].cards||[]];a[t]=n.detail.config,this._patchCards(e,a)}}
          ></hui-card-element-editor>`:c}
    `:(this._cardIdx=null,a``)}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:["climate","humidifier"]}}},{name:"reserve_height",label:"e_keep_height_talles",selector:{boolean:{}}},{name:"show_modes",label:"ed_climate_show_modes",selector:{boolean:{}}},{name:"hvac_modes",label:"ed_climate_hvac_modes",helper:"ed_climate_hvac_modes_help",selector:{select:{multiple:!0,mode:"list",options:[{value:"off",label:"ed_mode_off"},{value:"heat",label:"ed_mode_heat"},{value:"cool",label:"ed_mode_cool"},{value:"heat_cool",label:"ed_mode_heat_cool"},{value:"auto",label:"ed_mode_auto"}]}}}]},{title:"e_dial",icon:"mdi:thermostat",fields:[{name:"temperature_entity",label:"e_curren_temper_sensor",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_entity",label:"e_curren_humidi_sensor",selector:{entity:{domain:"sensor",device_class:"humidity"}}},{name:"step",label:"e_target_step",helper:"e_defaul_step_report",selector:{number:{min:.1,max:20,step:.1,mode:"box"}}},{name:"min_temp",label:"e_dial_min_defaul",selector:{number:{min:-30,max:40,step:.5,mode:"box"}}},{name:"max_temp",label:"e_dial_max_defaul",selector:{number:{min:0,max:60,step:.5,mode:"box"}}},{name:"min_humidity",label:"e_humidi_dial_min",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"max_humidity",label:"e_humidi_dial_max",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"steppers",label:"e_steppe_placem",selector:{select:{mode:"dropdown",options:[{value:"side",label:"e_vertic_beside_dial"},{value:"below",label:"e_below_dial"}]}}},{name:"wave",label:"e_wave_animat",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"e_auto_hvac_action"},{value:"always",label:"e_always_whenev_mode"},{value:"never",label:"e_never"}]}}}]}]}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe=(e,t)=>{const n=e._$AN;if(void 0===n)return!1;for(const e of n)e._$AO?.(t,!1),qe(e,t);return!0},We=e=>{let t,n;do{if(void 0===(t=e._$AM))break;n=t._$AN,n.delete(e),e=t}while(0===n?.size)},Ke=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(void 0===n)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Ue(t)}};function Ve(e){void 0!==this._$AN?(We(this),this._$AM=e,Ke(this)):this._$AM=e}function Ge(e,t=!1,n=0){const a=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(t)if(Array.isArray(a))for(let e=n;e<a.length;e++)qe(a[e],!1),We(a[e]);else null!=a&&(qe(a,!1),We(a));else qe(this,e)}const Ue=e=>{e.type==E.CHILD&&(e._$AP??=Ge,e._$AQ??=Ve)};class Ze extends S{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Ke(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(qe(this,e),We(this))}setValue(e){if(z(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const Je=new WeakMap,Ye=j(class extends Ze{render(e){return c}update(e,[t]){const n=t!==this.G;return n&&void 0!==this.G&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),c}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){const t=this.ht??globalThis;let n=Je.get(t);void 0===n&&(n=new WeakMap,Je.set(t,n)),void 0!==n.get(this.G)&&this.G.call(this.ht,void 0),n.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?Je.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class Qe extends W{static properties={_expanded:{state:!0},_actionRows:{state:!0}};static styles=[W.styles,i`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .mapping-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .mapping-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .mapping-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mapping-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .mapping-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null,this._actionRows??=Object.entries(e.tap_action_map||{}).map(([e,t])=>({state:e,tap_action:t}))}_formData(){const e={variant:"filled",size:"m",shape:"round",...this._config};return"both"===this._config?.confirm_direction&&(e.confirm_both=!0),!0===e.confirm&&(e.confirm="hold"),e}_sectionsSignature(){return`${this._config?.confirm||""}|${this.hass?.locale?.language??""}`}_setField(e,t){if("confirm_both"===e)return super._setField("confirm_direction",t?"both":void 0);super._setField(e,t)}get _confirmFields(){const e=this.hass,t=!0===this._config?.confirm?"hold":this._config?.confirm;return[{name:"confirm",label:n("ed_btn_confirm",e),selector:{select:{mode:"dropdown",options:[{value:"hold",label:n("ed_btn_confirm_hold",e)},{value:"slide",label:n("ed_btn_confirm_slide",e)}]}}},..."hold"===t||"slide"===t?[{name:"confirm_both",label:n("ed_btn_confirm_both",e),selector:{boolean:{}}},"slide"===t?{name:"confirm_threshold",label:n("ed_btn_confirm_threshold",e),selector:{number:{min:.1,max:1,step:.05,mode:"slider"}}}:{name:"confirm_hold_ms",label:n("ed_btn_confirm_hold_ms",e),selector:{number:{min:200,max:3e3,step:50,mode:"box",unit_of_measurement:"ms"}}}]:[]]}get _sections(){return[{title:"e_button",icon:"mdi:gesture-tap-button",fields:[{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"label",template:!0,selector:{text:{}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"elevated",label:"e_elevated"},{value:"filled",label:"e_filled"},{value:"tonal",label:"e_tonal"},{value:"outlined",label:"e_outlined"},{value:"text",label:"e_text"}]}}},{name:"role",label:"e_color_role",helper:"e_unset_each_varian",selector:{select:{mode:"dropdown",options:[{value:"primary",label:"e_primary"},{value:"secondary",label:"e_secondary"},{value:"tertiary",label:"e_tertiary"},{value:"error",label:"gt_state_error"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32)"},{value:"s",label:"S (40)"},{value:"m",label:"M (56)"},{value:"l",label:"L (96)"},{value:"xl",label:"XL (136)"}]}}},{name:"shape",selector:{select:{mode:"dropdown",options:[{value:"round",label:"e_round_pill"},{value:"square",label:"e_square"}]}}},{name:"wide",selector:{boolean:{}}},{name:"flex",label:n("ed_flex",this.hass),selector:{number:{min:0,max:12,step:.5,mode:"box"}}},{name:"entity",selector:{entity:{}}},q]},{title:"e_behavior",icon:"mdi:tune",fields:[{name:"active_state",label:"e_active_state",helper:"e_state_s_consid",selector:{text:{}}},{name:"morph_on_active",label:"e_morph_shape_when",selector:{boolean:{}}},{name:"active_variant",label:"e_varian_when_active",selector:{select:{mode:"dropdown",options:["filled","tonal","outlined","elevated","text"]}}},...this._confirmFields]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"e_defaul_action",selector:{ui_action:{}}}]}]}_renderExtra(){const e=this._actionRows||[];return a`
      <div class="section-header">
        <span>${n("e_action_mappings",this.hass)}</span>
        <ha-icon-button @click=${this._addMapping}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${e.map((e,t)=>a`
          <div class="mapping-card">
            <div class="mapping-header">
              <span>${e.state||n("e_mapping_n",this.hass,{n:t+1})}</span>
              <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeMapping(t)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded===t?a`
                  <div class="mapping-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${e}
                      .schema=${s(this._mappingSchema,this.hass)}
                      .computeLabel=${O}
                      @value-changed=${e=>this._updateMapping(t,e.detail.value)}
                    ></ha-form>
                  </div>
                `:""}
          </div>
        `)}
    `}get _mappingSchema(){return[{name:"state",required:!0,helper:"e_use_defaul_for",selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{}}}]}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_addMapping(){this._actionRows=[...this._actionRows||[],{state:""}],this._expanded=this._actionRows.length-1}_updateMapping(e,t){this._actionRows=(this._actionRows||[]).map((n,a)=>a===e?{...n,...t}:n),this._commitActionRows()}_removeMapping(e){this._actionRows=(this._actionRows||[]).filter((t,n)=>n!==e),this._expanded===e&&(this._expanded=null),this._commitActionRows()}_commitActionRows(){const e={};for(const t of this._actionRows||[])t.state&&t.tap_action&&(e[t.state]=t.tap_action);const{tap_action_map:t,...n}=this._config;this._commit(Object.keys(e).length?{...n,tap_action_map:e}:n)}}customElements.define("materia-button-editor",Qe);class Xe extends W{static properties={_expandedButton:{state:!0},_expandedOption:{state:!0}};static styles=[W.styles,i`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 8px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        cursor: pointer;
      }
      .button-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
      }
      .button-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .opt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        font-weight: 600;
        font-size: 13px;
      }
      .opt-header .hint {
        font-weight: 400;
        font-size: 11px;
        opacity: 0.7;
      }
      .opt-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
        margin-top: 6px;
        overflow: hidden;
      }
      .opt-row {
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 2px 2px 2px 10px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .opt-row span {
        flex: 1;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .opt-body {
        padding: 8px 10px 10px;
      }
    `];setConfig(e){super.setConfig(e),this._expandedButton??=null}_formData(){return{gap:8,padding:4,...this._config}}get _sections(){return[{title:"e_layout",icon:"mdi:tune",fields:[]}]}_renderExtra(){const e=this._config.buttons||[];return a`
      <div class="section-header">
        <span>${n("e_buttons",this.hass)}</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${T((e,t)=>this._moveButton(e,t),e.map((e,t)=>a`
          <div class="button-card">
            <div class="button-header" @click=${()=>this._toggleButton(t)}>
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${e.icon&&!P(e.icon)?e.icon:n("e_button_n",this.hass,{n:t+1})}${e.options?.length?` · ${n("e_split",this.hass)}`:""}</span>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._toggleButton(t)}}>
                <ha-icon icon=${this._expandedButton===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${e=>{e.stopPropagation(),this._removeButton(t)}}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton===t?a`
                  <div class="button-body">
                    <materia-button-editor
                      .hass=${this.hass}
                      ${Ye(n=>{n&&n.__materiaIdx!==t&&(n.__materiaIdx=t,n.setConfig(e))})}
                      @config-changed=${e=>{e.stopPropagation(),this._buttonChanged(t,e.detail.config)}}
                    ></materia-button-editor>

                    <div class="opt-header">
                      <span>${n("e_menu_options",this.hass)} <span class="hint">${n("e_menu_options_hint",this.hass)}</span></span>
                      <ha-icon-button @click=${e=>{e.stopPropagation(),this._addOption(t)}}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                      </ha-icon-button>
                    </div>
                    ${e.options?.length?a`<ha-form
                          .hass=${this.hass}
                          .data=${{menu_position:e.menu_position||"bottom-right"}}
                          .schema=${s([{name:"menu_position",label:"e_menu_alignm",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"e_below_right_aligne"},{value:"bottom-left",label:"e_below_left_aligne"},{value:"top-right",label:"e_above_right_aligne"},{value:"top-left",label:"e_above_left_aligne"}]}}}],this.hass)}
                          .computeLabel=${O}
                          @value-changed=${n=>this._buttonChanged(t,{...e,menu_position:n.detail.value.menu_position})}
                        ></ha-form>`:""}
                    ${T((e,n)=>this._moveOption(t,e,n),(e.options||[]).map((e,o)=>a`
                          <div class="opt-card">
                            <div class="opt-row">
                              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                              <span>${e.label||(e.icon&&!P(e.icon)?e.icon:n("e_option_n",this.hass,{n:o+1}))}</span>
                              <ha-icon-button @click=${()=>this._toggleOption(o)}>
                                <ha-icon icon=${this._expandedOption===o?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                              </ha-icon-button>
                              <ha-icon-button @click=${()=>this._removeOption(t,o)}>
                                <ha-icon icon="mdi:delete"></ha-icon>
                              </ha-icon-button>
                            </div>
                            ${this._expandedOption===o?a`
                                  <div class="opt-body">
                                    <ha-form
                                      .hass=${this.hass}
                                      .data=${e}
                                      .schema=${s(this._optionSchema(e),this.hass)}
                                      .computeLabel=${O}
                                      @value-changed=${e=>this._optionChanged(t,o,e.detail.value)}
                                    ></ha-form>
                                  </div>
                                `:""}
                          </div>
                        `))}
                  </div>
                `:""}
          </div>
        `))}
    `}_moveButton(e,t){const n=[...this._config.buttons||[]],[a]=n.splice(e,1);n.splice(t,0,a),this._expandedButton=null,this._commit({...this._config,buttons:n})}_toggleButton(e){this._expandedButton=this._expandedButton===e?null:e}_addButton(){const e=[...this._config.buttons||[],{icon:"mdi:star",variant:"filled",size:"default"}];this._expandedButton=e.length-1,this._commit({...this._config,buttons:e})}_removeButton(e){const t=[...this._config.buttons||[]];t.splice(e,1),this._expandedButton===e&&(this._expandedButton=null),this._commit({...this._config,buttons:t})}_buttonChanged(e,t){const n=[...this._config.buttons||[]],a=n[e]?.options;n[e]=a&&!t.options?{...t,options:a}:t,this._commit({...this._config,buttons:n})}_optionSchema(e){return[P(e?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{}}}]}_withButtonOptions(e,t){const n=[...this._config.buttons||[]],a={...n[e]},o=[...a.options||[]];t(o),o.length?a.options=o:delete a.options,n[e]=a,this._commit({...this._config,buttons:n})}_addOption(e){this._withButtonOptions(e,e=>{e.push({icon:"mdi:circle-outline"}),this._expandedOption=e.length-1})}_removeOption(e,t){this._expandedOption===t&&(this._expandedOption=null),this._withButtonOptions(e,e=>e.splice(t,1))}_moveOption(e,t,n){this._withButtonOptions(e,e=>{const[a]=e.splice(t,1);e.splice(n,0,a)}),this._expandedOption===t&&(this._expandedOption=n)}_optionChanged(e,t,n){this._withButtonOptions(e,e=>{e[t]={...e[t],...n}})}_toggleOption(e){this._expandedOption=this._expandedOption===e?null:e}}customElements.define("materia-icon-row-editor",Xe);class et extends W{static styles=[W.styles,i`
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
    `];_formData(){return{gesture:"slide",shape:!0,shape_style:"cookie9",initial_locked:!0,unlock_service:"unlock",...this._config}}_sectionsSignature(){return`${this._config?.gesture||"slide"}|${this._config?.entity?.split(".")[0]||""}|${this._config?.open_action?"o":""}`}get _sections(){const e="hold"===this._config?.gesture,t=!!this._config?.entity,n=!!this._config?.entity?.startsWith("lock."),a=!!this._config?.open_action;return[{title:"e_setup",icon:"mdi:tune",fields:[{name:"entity",label:"e_lock_option",helper:"e_leave_empty_run",selector:{entity:{domain:["lock","switch","input_boolean"]}}},...n?[{name:"unlock_service",label:"e_unlatc_servic",helper:"e_open_for_strike",selector:{select:{mode:"dropdown",options:[{value:"unlock",label:"e_unlock_lock_unlock"},{value:"open",label:"e_open_lock_open"}]}}}]:[],{name:"gesture",label:"e_commit_gestur",selector:{select:{mode:"dropdown",options:[{value:"slide",label:"e_slide_handle_across"},{value:"hold",label:"e_press_hold"}]}}},{name:"shape",label:"e_show_morphi_lock",selector:{boolean:{}}}]},{title:"e_open_button",icon:"mdi:door-open",expanded:a,fields:[{name:"open_action",label:"e_open_action",helper:"e_separa_extra_action",selector:{ui_action:{default_action:"none"}}},...a?[{name:"open_button_icon",label:"e_icon_defaul_door",selector:{icon:{}}},{name:"open_button_label",label:"e_label_defaul_open",selector:{text:{}}}]:[]]},{title:"e_behaviour",icon:"mdi:cog-outline",fields:[...e?[{name:"hold_ms",label:"e_hold_for_ms",helper:"e_keep_above_500ms",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}}]:[],...t?[{name:"locked_state",label:"e_state_means_locked",helper:"e_defaul_locked_for",selector:{text:{}}},{name:"pending_timeout_ms",label:"e_give_up_waitin3",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}}]:[{name:"initial_locked",label:"e_start_out_locked",selector:{boolean:{}}}]]},{title:"e_labels",icon:"mdi:text-short",fields:[...e?[{name:"unlock_hold_hint",label:"e_while_locked_defaul",selector:{text:{}}},{name:"lock_hold_hint",label:"e_while_unlock_defaul",selector:{text:{}}}]:[{name:"unlock_hint",label:"e_while_locked_defaul2",selector:{text:{}}},{name:"lock_hint",label:"e_while_unlock_defaul2",selector:{text:{}}}],...t?[{name:"locking_label",label:"e_while_lockin_defaul",selector:{text:{}}},{name:"unlocking_label",label:"e_while_unlock_defaul3",selector:{text:{}}},{name:"jammed_label",label:"e_when_jammed_defaul",selector:{text:{}}}]:[{name:"demo_label",label:"e_self_contai_note",selector:{text:{}}}]]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"unlocked_color",label:"e_backgr_while_unlock",color:!0,selector:{text:{}}},{name:"unlocked_color_on",label:"e_text_while_unlock",color:!0,selector:{text:{}}},{name:"locked_color",label:"e_backgr_while_locked",color:!0,selector:{text:{}}},{name:"locked_color_on",label:"e_text_while_locked",color:!0,selector:{text:{}}},{name:"accent",label:"e_accent_locked_glyph",color:!0,selector:{text:{}}},{name:"accent_on",label:"e_ink_on_accent2",color:!0,selector:{text:{}}},{name:"locked_icon",label:"e_icon_while_locked",selector:{icon:{}}},{name:"unlocked_icon",label:"e_icon_while_unlock",selector:{icon:{}}},...t?[{name:"open_icon",label:"e_icon_while_litera",helper:"e_rides_on_top",selector:{icon:{}}},{name:"jammed_color",label:"e_backgr_while_jammed",color:!0,selector:{text:{}}},{name:"jammed_color_on",label:"e_text_while_jammed",color:!0,selector:{text:{}}},{name:"jammed_icon",label:"e_icon_while_jammed",selector:{icon:{}}}]:[]]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"e_tappin_shape",selector:{ui_action:{default_action:"more-info"}}}]}]}get _showRemapList(){return!!this._config?.entity}_remapEntries(){const e=this._config?.state_remap||{};return Object.entries(e).map(([e,t])=>({from:e,to:t}))}_commitRemap(e){const t={};for(const n of e)n.from&&(t[n.from]=n.to??"");this._commit({...this._config,state_remap:t})}_addRemap(){this._commitRemap([...this._remapEntries(),{from:"",to:""}])}_removeRemap(e){const t=[...this._remapEntries()];t.splice(e,1),this._commitRemap(t)}_updateRemapFrom(e,t){const n=[...this._remapEntries()];n[e]={...n[e],from:t},this._commitRemap(n)}_updateRemapTo(e,t){const n=[...this._remapEntries()];n[e]={...n[e],to:t},this._commitRemap(n)}_renderExtra(){if(!this._showRemapList)return"";const e=this._remapEntries();return a`
      <div class="options-header" style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;font-weight:600;font-size:14px;">
        <span>${n("e_state_skips",this.hass)}</span>
        <ha-icon-button @click=${this._addRemap}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="remap-note">${n("e_state_skips_note",this.hass)}</div>
      ${e.map((e,t)=>a`
          <div class="remap-row">
            <ha-textfield
              .label=${n("e_from_raw",this.hass)}
              .value=${e.from}
              @change=${e=>this._updateRemapFrom(t,e.target.value)}
            ></ha-textfield>
            <ha-icon class="remap-arrow" icon="mdi:arrow-right"></ha-icon>
            <ha-textfield
              .label=${n("e_to",this.hass)}
              .value=${e.to}
              @change=${e=>this._updateRemapTo(t,e.target.value)}
            ></ha-textfield>
            <ha-icon-button @click=${()=>this._removeRemap(t)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
        `)}
    `}}customElements.define("materia-lock-editor",et);const tt=(e={})=>"moment"===e.presentation||"datetime"===e.presentation?e.presentation:"manager"===e.presentation||!0===e.manage_schedules||Array.isArray(e.targets)?"manager":"sheet"===e.presentation?"sheet":"inline",nt=e=>null==e||""===e||"object"==typeof e&&!Object.keys(e).length,at=e=>{for(const[t,n]of Object.entries(e))nt(n)&&delete e[t];return e},ot=e=>{if(e&&"object"==typeof e){if(null!=e.perform_action||e.action)return e;if(e.service)return at({action:"perform-action",perform_action:e.service,target:e.entity_id?{entity_id:e.entity_id}:void 0,data:e.service_data})}},it=(e,t)=>JSON.stringify(e??null)===JSON.stringify(t??null),lt=(e,t)=>{const a=Math.round(Number(e)||0);if(!a)return n("sched_at_moment",t);const{hours:o,minutes:i}=st(a),l=[o?n("sched_unit_h",t,{n:o}):"",i?n("sched_unit_min",t,{n:i}):""].filter(Boolean).join(" ");return n(a<0?"sched_before":"sched_after",t,{d:l})},st=e=>{const t=Math.abs(Math.round(Number(e)||0));return{hours:Math.floor(t/60),minutes:t%60}},rt=e=>e&&"object"==typeof e?Math.round(1440*(Number(e.days)||0)+60*(Number(e.hours)||0)+(Number(e.minutes)||0)+(Number(e.seconds)||0)/60):0,ct=e=>ot(e?.action??(Array.isArray(e?.actions)?e.actions[0]:e?.actions)),dt=(e={})=>{const t=Number(e.offset_minutes??e.offset??0)||0;return at({name:e.name??e.label,action:ct(e),when:t<0?"before":t>0?"after":"at",offset:t?st(t):void 0})},_t=e=>{const t=/^(\d+(?:\.\d+)?)\s*(m|h|d)$/i.exec(String(e??"").trim());if(!t)return;const n=parseFloat(t[1]),a=t[2].toLowerCase();if("d"===a&&Number.isInteger(n))return{days:n,hours:0,minutes:0};const o=Math.round(n*("d"===a?1440:"h"===a?60:1));return{days:Math.floor(o/1440),hours:Math.floor(o%1440/60),minutes:o%60}},mt=(e={})=>null!=e.weekday?`w${e.weekday}`:null!=e.days&&1===Number(e.days)?"tomorrow":null!=e.days?`d${Number(e.days)}`:"next",ht=(e={})=>null!=e.at||null==e.offset?at({label:e.label,kind:"at",at:e.at?`${String(e.at).padStart(5,"0")}:00`:void 0,day:mt(e),tap_action:e.tap_action}):at({label:e.label,kind:"in",in:_t(e.offset),tap_action:e.tap_action}),pt=(e={},t={})=>{const n={...e};for(const e of["label","offset","at","days","weekday","tap_action"])delete n[e];if(t.label&&(n.label=t.label),t.tap_action&&(n.tap_action=t.tap_action),"in"===t.kind){const e=(e=>{const t=rt(e);if(!(t<=0))return t%1440==0?t/1440+"d":t%60==0?t/60+"h":`${t}m`})(t.in);return e&&(n.offset=e),n}t.at&&(n.at=String(t.at).slice(0,5));const a=t.day||"next";return"tomorrow"===a?n.days=1:/^d\d+$/.test(a)?n.days=Number(a.slice(1)):/^w[1-7]$/.test(a)&&(n.weekday=Number(a.slice(1))),n},ut=(e={})=>at({label:e.label??e.name,secondary:e.secondary??e.sub,icon:e.icon,tap_action:e.tap_action}),bt=(e={},t={})=>{const n={...e};for(const e of["label","name","secondary","sub","icon","tap_action"])delete n[e];return at({...n,...t})},gt=e=>"string"==typeof e?{entity:e}:{...e||{}},ft=(e,t={})=>{const n={...gt(e)};for(const e of["entity","name","icon"])delete n[e];return at({...n,...t})},vt=e=>{const t="string"==typeof e?{service:e}:e||{};return at({label:t.label,icon:t.icon,action:t.service?at({action:"perform-action",perform_action:t.service,data:t.service_data}):void 0})},yt=(e,t={})=>{const n="string"==typeof e?{}:{...e||{}};for(const e of["label","icon","service","service_data"])delete n[e];const a={...t.action?.data||{}};return delete a.entity_id,at({...n,label:t.label,icon:t.icon,service:t.action?.perform_action??t.action?.service,service_data:Object.keys(a).length?a:void 0})},wt=e=>at({action:ot(e)}),xt=(e,t={})=>it(t.action,ot(e))?e:t.action||{},kt={ui_action:{actions:["perform-action"],default_action:"perform-action"}},$t=[{name:"action",label:"sched_action",selector:kt},{name:"when",label:"e_step_when",selector:{select:{mode:"dropdown",options:[{value:"at",label:"e_step_at"},{value:"before",label:"e_step_before"},{value:"after",label:"e_step_after"}]}}},{name:"name",label:"e_step_name",selector:{text:{}}}],St=[$t[0],$t[1],{name:"offset",label:"e_step_offset",selector:{duration:{}}},$t[2]],zt=[{name:"label",label:"e_label",selector:{text:{}}},{name:"secondary",label:"e_trigger_sub",selector:{text:{}}},{name:"icon",label:"e_icon",selector:{icon:{}}},{name:"tap_action",label:"e_trigger_action",selector:{ui_action:{}}}],Et=[{name:"entity",label:"e_entity",selector:{entity:{}}},{name:"name",label:"e_name",selector:{text:{}}},{name:"icon",label:"e_icon",selector:{icon:{}}}],jt=[{name:"action",label:"sched_action",selector:kt},{name:"label",label:"e_label",selector:{text:{}}},{name:"icon",label:"e_icon",selector:{icon:{}}}],At=[{name:"name",label:"e_name",selector:{text:{}}},{name:"icon",label:"e_icon",selector:{icon:{}}}],Ct=[{name:"action",label:"sched_action",selector:kt}],Lt={},Ot=(e,{items:t,schema:n,itemLabel:o,toForm:i,fromForm:l,newItem:s,addLabel:r,itemExtra:c,write:d})=>a`
  <materia-item-list-editor
    .hass=${e}
    .items=${Array.isArray(t)?t:[]}
    .schema=${n}
    .itemLabel=${o}
    .toForm=${i}
    .fromForm=${l}
    .newItem=${s}
    .itemExtra=${c}
    addLabel=${r}
    @value-changed=${e=>{e.stopPropagation(),d(e.detail.value?.length?e.detail.value:void 0)}}
  ></materia-item-list-editor>
`,Tt=(e,t,n,a)=>Ot(e,{items:t,schema:e=>"at"===dt(e).when?$t:St,itemLabel:t=>((e,t)=>{const n=e?.name||e?.label||A(t,e?.action??e?.actions??[]);return[lt(e?.offset_minutes??e?.offset,t),n].filter(Boolean).join(" · ")})(t,e),toForm:dt,fromForm:(e,t)=>((e={},t={})=>{const n={...e};delete n.label,delete n.offset,t.name?n.name=t.name:delete n.name;const a="at"!==t.when&&t.when?rt(t.offset):0;return n.offset_minutes="before"===t.when&&a?-a:a,it(t.action,ct(e))||(delete n.actions,t.action?n.action=t.action:delete n.action),n})(e,"at"===t.when||t.offset?t:{...t,offset:{hours:1}}),newItem:()=>({offset_minutes:0}),addLabel:a,write:n}),Bt=()=>Math.random().toString(36).slice(2,8);customElements.define("materia-schedule-editor",class extends W{_formData(){return{editor_presentation:"inline",schedule_types:["window"],show_triggers:!0,...this._config,presentation:tt(this._config)}}_sectionsSignature(){const e=this._config||{};return`${tt(e)}|${[e.schedule_types??"window"].flat().includes("plan")}`}_fieldChanged(e,t){if("presentation"!==e)return super._fieldChanged(e,t);t.stopPropagation();const n=t.detail?.value;n&&n!==tt(this._config)&&this._commit(((e,t,n)=>{const a={...e,presentation:t};return"manager"!==t&&(delete a.manage_schedules,delete a.targets),"moment"!==t||a.manager_tag||(a.manager_tag=n()),a})(this._config,n,()=>`materia_moment_${Bt()}`))}_list(e,t){return{name:e,render:n=>t(n,t=>this._setField(e,t))}}get _presetsField(){const e=!["moment","datetime"].includes(tt(this._config));return this._list("presets",(t,a)=>Ot(this.hass,{items:t,schema:t=>((e,t,a)=>{const o=ht(t),i=l(e),s=/^d\d+$/.test(o.day||"")?o.day:"",r=`${i}|${o.kind}|${s}|${a}`;if(Lt[r])return Lt[r];const c=new Intl.DateTimeFormat(i,{weekday:"long"}),d=[{value:"next",label:n("e_preset_next",e)},{value:"tomorrow",label:n("sched_preset_tomorrow",e)},...[1,2,3,4,5,6,7].map(e=>({value:`w${e}`,label:c.format(new Date(2024,0,e))})),...s?[{value:s,label:n("e_preset_in_days",e,{n:s.slice(1)})}]:[]];return Lt[r]=[{name:"label",label:"e_label",selector:{text:{}}},{name:"kind",label:"e_preset_kind",selector:{select:{mode:"dropdown",options:[{value:"in",label:"e_preset_in"},{value:"at",label:"e_preset_at"}]}}},..."in"===o.kind?[{name:"in",label:"e_preset_in_value",selector:{duration:{enable_day:!0}}}]:[{name:"at",label:"e_preset_at_value",selector:{time:{}}},{name:"day",label:"e_preset_day",selector:{select:{mode:"dropdown",options:d}}}],...a?[{name:"tap_action",label:"e_preset_action",selector:{ui_action:{}}}]:[]]})(this.hass,t,e),itemLabel:e=>e?.label,toForm:ht,fromForm:(e,t)=>pt(e,"in"!==t.kind||t.in||e.offset?t:{...t,in:{hours:1}}),newItem:()=>({offset:"1h"}),addLabel:"e_presets",write:a}))}get _triggersField(){return this._list("triggers",(e,t)=>Ot(this.hass,{items:e,schema:zt,itemLabel:e=>e?.label||e?.name,toForm:ut,fromForm:bt,newItem:()=>({key:`t_${Bt()}`,icon:"m3o:sensors"}),addLabel:"e_non_clock_trigge",write:t}))}_actionsField(e,t){return this._list(e,(e,n)=>Ot(this.hass,{items:e,schema:Ct,itemLabel:e=>((e,t)=>A(e,t))(this.hass,e),toForm:wt,fromForm:xt,newItem:()=>({}),addLabel:t,write:n}))}get _targetsField(){const e=this.hass;return this._list("targets",(t,n)=>Ot(e,{items:t,schema:Et,itemLabel:t=>{const n=gt(t);return n.name||(a=e,o=n.entity,a?.states?.[o]?.attributes?.friendly_name||o);var a,o},toForm:gt,fromForm:ft,newItem:()=>({}),addLabel:"e_device_friend_action",itemExtra:(t,n)=>Ot(e,{items:gt(t).actions,schema:jt,itemLabel:t=>"string"==typeof t?C(e,t):t?.label||(t?.service?C(e,t.service):""),toForm:vt,fromForm:yt,newItem:()=>({}),addLabel:"e_target_actions",write:e=>{const a=gt(t);e?a.actions=e:delete a.actions,n(a)}}),write:n}))}get _plansField(){const e=this.hass;return this._list("plans",(t,n)=>Ot(e,{items:t,schema:At,itemLabel:e=>e?.name||e?.label,newItem:()=>({key:`plan_${Bt()}`,phases:[]}),addLabel:"e_multi_step_plans",itemExtra:(t,n)=>Tt(e,t?.phases,e=>n({...t,phases:e||[]}),"e_plan_steps"),write:n}))}get _sections(){const e=tt(this._config),t={name:"presentation",label:"e_card_purpose",helper:"e_card_purpose_helper",selector:{select:{mode:"dropdown",options:[{value:"moment",label:"e_purpose_moment"},{value:"datetime",label:"e_purpose_datetime"},{value:"manager",label:"e_manage_list_add"},{value:"inline",label:"e_inline_collap_strip"},{value:"sheet",label:"e_sheet_always_open"}]}}},n=[{name:"empty_label",label:"e_strip_title_when",selector:{text:{}}},{name:"empty_sub",label:"e_strip_sub_line",selector:{text:{}}}],a=(e,t)=>({title:"e_triggers",secondary:e,icon:"mdi:sensors",expanded:!1,fields:t}),o=[{name:"name",label:"e_title",helper:"e_moment_name_helper",selector:{text:{}}},{name:"icon",label:"e_icon",selector:{icon:{placeholder:"mdi:calendar-clock"}}}];if("datetime"===e)return[{title:"e_setup",icon:"mdi:tune",expanded:!0,fields:[t,{name:"datetime_entity",label:"e_datetime_entity",helper:"e_datetime_entity_helper",selector:{entity:{domain:"input_datetime"}}},...o]},{title:"e_labels",icon:"mdi:label-outline",expanded:!1,fields:n},{title:"e_quick_picks",secondary:"e_optional",icon:"mdi:clock-fast",expanded:!1,fields:[this._presetsField]}];if("moment"===e)return[{title:"e_setup",icon:"mdi:tune",expanded:!0,fields:[t,...o,this._list("steps",(e,t)=>Tt(this.hass,e,t,"e_moment_steps"))]},{title:"e_labels",icon:"mdi:label-outline",expanded:!1,fields:n},{title:"e_quick_picks",secondary:"e_optional",icon:"mdi:clock-fast",expanded:!1,fields:[this._presetsField]},a("e_optional",[this._triggersField]),{title:"e_advanced",icon:"mdi:cog-outline",expanded:!1,fields:[{name:"manager_tag",label:"e_schedu_group",helper:"e_friend_intern_tag",selector:{text:{}}}]}];if("manager"===e){const e=[this._config?.schedule_types??"window"].flat();return[{title:"e_setup",icon:"mdi:tune",expanded:!0,fields:[t,{name:"name",label:"e_title",selector:{text:{}}},{name:"schedule_types",label:"e_schedu_people_may",selector:{select:{multiple:!0,options:[{value:"window",label:"e_recurr_start_end"},{value:"once",label:"e_one_time_action"},{value:"plan",label:"e_multi_step_plan"}]}}},this._targetsField,...e.includes("plan")?[this._plansField]:[]]},{title:"e_advanced",icon:"mdi:cog-outline",expanded:!1,fields:[{name:"editor_presentation",label:"e_open_schedu_editor",helper:"e_popup_keeps_dashbo",selector:{select:{mode:"dropdown",options:[{value:"popup",label:"e_popup"},{value:"inline",label:"e_expand_inline"}]}}},{name:"schedule_entities",label:"e_additi_schedu_entiti",helper:"e_option_explic_switch",selector:{entity:{domain:"switch",multiple:!0}}},{name:"manager_tag",label:"e_schedu_group",helper:"e_friend_intern_tag",selector:{text:{}}}]}]}return[{title:"e_setup",icon:"mdi:tune",expanded:!0,fields:[t,{name:"name",label:"e_eyebro_above_chosen",helper:"e_what_being_schedu",selector:{text:{}}},...n,{name:"confirm_action",label:"e_on_confir",helper:"e_use_dateti_date",selector:{ui_action:{default_action:"none"}}}]},{title:"e_quick_picks",secondary:"e_presets_builtin",icon:"mdi:clock-fast",expanded:!1,fields:[this._presetsField]},a("e_triggers_builtin",[{name:"show_triggers",label:"e_show_when_tab",helper:"e_disabl_for_straig",selector:{boolean:{}}},{name:"trigger_action",label:"e_on_confir_trigge",helper:"e_falls_back_confir",selector:{ui_action:{default_action:"none"}}},this._triggersField]),{title:"e_window",icon:"mdi:clock-start",expanded:!1,fields:[{name:"schedule_entity",label:"e_schedu_entity",helper:"e_switch_schedu_entity",selector:{entity:{domain:"switch"}}},{name:"show_stop",label:"e_start_stop_window",helper:"e_for_drivin_custom",selector:{boolean:{}}},this._actionsField("actions","e_start_action"),this._actionsField("end_actions","e_end_action")]},{title:"e_advanced",icon:"mdi:cog-outline",expanded:!1,fields:[{name:"close_action",label:"e_how_dismis_modal",helper:"e_sheet_presen_only",selector:{ui_action:{default_action:"none"}}}]}]}});customElements.define("materia-time-input-editor",class extends W{_formData(){return{step:60,clearable:!0,...this._config}}get _sections(){return[{title:"e_time",icon:"mdi:clock-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"input_datetime"}}},{name:"name",label:"e_label",selector:{text:{}}},{name:"step",label:"e_step_in_second",selector:{number:{min:60,max:3600,step:60,mode:"box"}}},{name:"clearable",label:"ed_time_clearable",selector:{boolean:{}}}]}]}});class Dt extends W{static properties={_expanded:{state:!0}};static styles=[W.styles,i`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-header .glyph-note {
        flex: none;
        font-size: 11px;
        opacity: 0.6;
      }
      .option-body {
        padding: 12px;
      }
      .drag-handle {
        cursor: grab;
        --mdc-icon-size: 18px;
        opacity: 0.5;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{variant:"hero",burst:!0,alert_tints_hero:!0,...this._config}}_sectionsSignature(){return this._config?.variant||""}get _sections(){return[{title:"e_setup",icon:"mdi:tune",fields:[{name:"entity",required:!0,selector:{entity:{domain:["select","input_select"]}}},{name:"name",label:"e_eyebro_above_option",selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"variant",label:"e_emphasis",helper:"e_hero_filled_statem",selector:{select:{mode:"dropdown",options:[{value:"hero",label:"e_hero_filled_owns"},{value:"sidekick",label:"e_sideki_quiet_peer2"}]}}},..."sidekick"===this._config?.variant?[]:[{name:"burst",label:"e_show_decora_shape",selector:{boolean:{}}}],{name:"color",label:"e_block_backgr",color:!0,selector:{text:{}}},{name:"color_on",label:"e_block_text",color:!0,selector:{text:{}}}]},{title:"e_alerts",icon:"mdi:alert-circle-outline",expanded:!1,fields:[{name:"alerts",render:e=>fe(this,e??this._config?.alert)},{name:"alert_tints_hero",label:"e_alert_recolo_whole",selector:{boolean:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}get _optionSchema(){return[{name:"label",label:"e_name_big_title",selector:{text:{}}},{name:"short",label:"e_pill_label_defaul",selector:{text:{}}},{name:"value",label:"e_select_option_value",selector:{text:{}}},{name:"secondary",label:"e_one_line_conseq",selector:{text:{}}},{name:"icon",label:"e_icon_shown_when",selector:{icon:{}}},{name:"tap_action",label:"e_action_overri_select",selector:{ui_action:{}}}]}_renderExtra(){return a`
      <div class="options-header">
        <span>${n("e_options",this.hass)}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${T((e,t)=>this._moveOption(e,t),(this._config.options||[]).map((e,t)=>a`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||n("e_option_n",this.hass,{n:t+1})}</span>
                ${e.glyph?a`<span class="glyph-note">${n("e_route_glyph_yaml",this.hass)}</span>`:""}
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?a`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s(this._optionSchema,this.hass)}
                        .computeLabel=${O}
                        @value-changed=${e=>this._updateOptionForm(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_addOption(){const e=[...this._config.options||[],{label:"",value:""}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const n=[...this._config.options||[]],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:n})}_updateOptionForm(e,t){const n=[...this._config.options||[]];n[e]={...n[e],...t},this._commit({...this._config,options:n})}}customElements.define("materia-select-hero-editor",Dt);customElements.define("materia-heading-editor",class extends W{_formData(){return{heading_style:"title",...this._config}}get _sections(){return[{title:"e_heading",icon:"mdi:format-title",fields:[{name:"heading",required:!0,selector:{text:{}}},{name:"heading_style",label:"e_style",selector:{select:{mode:"dropdown",options:[{value:"title",label:"e_title"},{value:"subtitle",label:"e_subtitle"}]}}},{name:"icon",selector:{icon:{}}},{name:"secondary",label:"e_right_aligne_meta",template:!0,selector:{text:{}}},{name:"tap_action",selector:{ui_action:{default_action:"none"}}}]}]}});customElements.define("materia-doorbell-editor",class extends W{_formData(){return{...this._config}}get _sections(){return[{title:"db_eyebrow",icon:"mdi:doorbell",fields:[{name:"entity",label:"e_doorbe_entity",helper:"e_on_ringin_countd",selector:{entity:{domain:["input_boolean","binary_sensor","switch"]}}},{name:"timeout",label:"e_popup_timeou_second",helper:"e_match_popup_timeou",default:30,selector:{number:{min:5,max:300,mode:"box"}}},{name:"ring_seconds",label:"e_ring_length_second",helper:"e_how_long_chime",selector:{number:{min:1,max:300,mode:"box"}}},{name:"name",label:"e_eyebro_while_ringin",selector:{text:{}}},{name:"place",label:"e_where_ring_from",selector:{text:{}}},{name:"demo",label:"e_previe_phase_demo",helper:"e_forces_card_s",selector:{select:{mode:"dropdown",options:[{value:"ringing",label:"e_ringing"},{value:"buzzing",label:"db_buzz_busy"},{value:"buzzed",label:"db_buzz_done"},{value:"opened",label:"e_opened"},{value:"lapsed",label:"e_lapsed"}]}}}]},{title:"e_buzz_panel",icon:"mdi:bullhorn",fields:[{name:"buzz_action",label:"e_tap_buzz_action",helper:"e_street_door_buzzer",selector:{ui_action:{default_action:"none"}}},{name:"buzz_entity",label:"e_buzzin_indica",helper:"e_on_buzzin_usuall",selector:{entity:{}}},{name:"buzz_title",label:"e_panel_title_defaul",selector:{text:{}}},{name:"buzz_sub",label:"e_panel_sub_line",helper:"e_defaul_street_door",selector:{text:{}}}]},{title:"e_open_panel",icon:"mdi:lock-open-variant-outline",fields:[{name:"lock",label:"e_lock",helper:"e_gestur_unlock_leave",selector:{entity:{domain:"lock"}}},{name:"open_gesture",label:"e_open_gestur",selector:{select:{mode:"dropdown",options:[{value:"slide",label:"e_slide"},{value:"hold",label:"e_hold"}]}}},{name:"open_action",label:"e_open_action_replac",helper:"e_for_let_them",selector:{ui_action:{default_action:"none"}}},{name:"open_title",label:"e_panel_title_defaul2",selector:{text:{}}},{name:"open_sub",label:"e_panel_sub_line",helper:"e_defaul_unlock_front",selector:{text:{}}}]},{title:"e_bottom_row",icon:"mdi:dots-horizontal",fields:[{name:"ignore_action",label:"db_ignore",helper:"e_empty_hides_button",selector:{ui_action:{default_action:"none"}}},{name:"replay_action",label:"db_replay",helper:"e_empty_hides_button2",selector:{ui_action:{default_action:"none"}}},{name:"mute_entity",label:"e_mute_toggle_entity",helper:"e_input_boolea_silenc",selector:{entity:{domain:"input_boolean"}}}]}]}});class Ft extends W{static properties={_expanded:{state:!0},_editingCard:{state:!0}};static styles=[W.styles,i`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
      .cards-head {
        font-size: 13px;
        font-weight: 600;
        margin-top: 4px;
      }
      .card-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 4px 2px 12px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
      }
      .card-row span {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      hui-card-picker {
        display: block;
      }
      .edit-head {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null,this._editingCard??=null}connectedCallback(){super.connectedCallback(),this._loadHuiElements()}async _loadHuiElements(){customElements.get("hui-card-element-editor")&&customElements.get("hui-card-picker")||(await Te(),this.requestUpdate())}_formData(){return{vertical:!0,...this._config}}get _sections(){return[{title:"e_tabs",icon:"mdi:tab",fields:[{name:"entity",label:"e_entity_holdin_select3",helper:"e_leave_empty_for",selector:{entity:{domain:["input_select","select","input_text"]}}},{name:"attribute",label:"e_attrib_instea_state",selector:{text:{}}},{name:"vertical",label:"e_vertic_rail_off",selector:{boolean:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}get _itemSchema(){return[{name:"label",selector:{text:{}}},{name:"value",label:"e_value_entity_state",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"e_action_overri_select2",selector:{ui_action:{default_action:"none"}}}]}_itemCards(e){return Array.isArray(e?.cards)?e.cards:e?.card?[e.card]:[]}_renderExtra(){if(this._editingCard)return this._renderCardEditor();const e=this._config.items||[];return a`
      <div class="options-header">
        <span>${n("e_tabs",this.hass)}</span>
        <ha-icon-button @click=${this._addItem}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${T((e,t)=>this._moveItem(e,t),e.map((e,t)=>a`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||n("e_tab_n",this.hass,{n:t+1})}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeItem(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?this._renderItemBody(e,t):""}
            </div>
          `))}
    `}_renderItemBody(e,t){const o=this._itemCards(e);return a`
      <div class="option-body">
        <ha-form
          .hass=${this.hass}
          .data=${e}
          .schema=${s(this._itemSchema,this.hass)}
          .computeLabel=${O}
          @value-changed=${e=>this._updateItem(t,e.detail.value)}
        ></ha-form>

        <div class="cards-head">${n("e_tab_cards",this.hass)}</div>
        ${o.map((e,n)=>a`
            <div class="card-row">
              <span>${e?.type||"card"}</span>
              <ha-icon-button @click=${()=>this._editingCard={item:t,card:n}}>
                <ha-icon icon="mdi:pencil"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${()=>this._removeCard(t,n)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
          `)}
        ${customElements.get("hui-card-picker")?a`
              <hui-card-picker
                .hass=${this.hass}
                @config-changed=${e=>{e.stopPropagation(),this._addCard(t,e.detail.config)}}
              ></hui-card-picker>
            `:a`<div style="font-size:12px;opacity:.6;">${n("e_loading_picker",this.hass)}</div>`}
      </div>
    `}_renderCardEditor(){const{item:e,card:t}=this._editingCard,o=this._itemCards(this._config.items?.[e])[t];return o?a`
      <div class="edit-head">
        <ha-icon-button @click=${()=>this._editingCard=null}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </ha-icon-button>
        <span>${this._config.items[e]?.label||n("e_tab_n",this.hass,{n:e+1})} · ${n("e_card_n",this.hass,{n:t+1})}</span>
      </div>
      ${customElements.get("hui-card-element-editor")?a`
            <hui-card-element-editor
              .hass=${this.hass}
              .value=${o}
              @config-changed=${n=>{n.stopPropagation(),this._updateCard(e,t,n.detail.config)}}
            ></hui-card-element-editor>
          `:a`<div style="font-size:12px;opacity:.6;">${n("e_loading_editor",this.hass)}</div>`}
    `:(this._editingCard=null,a``)}_writeCards(e,t){const n=[...this._config.items||[]],a={...n[e],cards:t};delete a.card,n[e]=a,this._commit({...this._config,items:n})}_addCard(e,t){this._writeCards(e,[...this._itemCards(this._config.items?.[e]),t])}_removeCard(e,t){const n=[...this._itemCards(this._config.items?.[e])];n.splice(t,1),this._editingCard?.item===e&&this._editingCard?.card===t&&(this._editingCard=null),this._writeCards(e,n)}_updateCard(e,t,n){const a=[...this._itemCards(this._config.items?.[e])];a[t]=n,this._writeCards(e,a)}_addItem(){const e=[...this._config.items||[],{label:"",value:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,items:e})}_removeItem(e){const t=[...this._config.items||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._editingCard=null,this._commit({...this._config,items:t})}_moveItem(e,t){const n=[...this._config.items||[]],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commit({...this._config,items:n})}_updateItem(e,t){const n=[...this._config.items||[]];n[e]={...n[e],...t},this._commit({...this._config,items:n})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-tabs-editor",Ft);class Mt extends W{static styles=[W.styles,i`
      materia-card-list-editor {
        margin-top: 8px;
      }
    `];_formData(){return{collapsible:!0,expanded:!1,show_switch:!0,flat:!1,...this._config}}_sectionsSignature(){return this._config?.entity?"entity":"no-entity"}get _sections(){const e=!!this._config?.entity;return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"e_entity_option",helper:"e_with_entity_header",selector:{entity:{}}},{name:"name",label:e?"e_name_tpl_default":"e_name_tpl",required:!e,template:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"secondary",label:"e_second_text_templa",template:!0,selector:{text:{}}}]},{title:"e_behaviour",icon:"mdi:arrow-expand-vertical",fields:[{name:"expanded",label:"e_open_by_defaul",selector:{boolean:{}}},{name:"collapsible",label:"ed_expander_collapsible",selector:{boolean:{}}},{name:"show_switch",label:"e_show_switch_in",helper:"e_only_applie_when",selector:{boolean:{}}},{name:"flat",label:"e_flat_no_card",selector:{boolean:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_row_color_escala",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_icon_color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color",label:"e_switch_track_color",color:!0,template:!0,selector:{text:{}}},{name:"switch_color_on",label:"e_switch_thumb_color",color:!0,template:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"e_switch_action_overri",selector:{ui_action:{default_action:"toggle"}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}_cards(){return Array.isArray(this._config?.cards)?this._config.cards:[]}get _cardsTitle(){return"e_behind_chevron"}get _cardsHint(){return"e_behind_chevron_hint"}_renderExtra(){return a`<materia-card-list-editor
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cards=${this._cards()}
      .label=${this._cardsTitle}
      .hint=${this._cardsHint}
      @value-changed=${e=>{e.stopPropagation(),this._commit({...this._config,cards:e.detail.value})}}
    ></materia-card-list-editor>`}}customElements.define("materia-expander-editor",Mt);function It(e){const{code:t,...n}=e||{};return n}customElements.define("materia-level-editor",class extends W{_formData(){return{variant:"filled",slider_size:"xs",...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"label",label:"e_label",template:!0,selector:{text:{}}},{name:"attribute",label:"e_attrib_holdin_level",helper:"e_defaul_per_domain",selector:{text:{}}},{name:"icon",label:"e_leadin_icon",template:!0,selector:{icon:{}}},{name:"control_entity",label:"e_traili_contro_entity",helper:"e_adds_aligne_circul",selector:{entity:{}}},{name:"control_icon",label:"e_traili_contro_icon",selector:{icon:{}}},{name:"control_label",label:"e_traili_contro_access",selector:{text:{}}},{name:"control_action",label:"e_traili_contro_action",selector:{ui_action:{default_action:"toggle"}}}]},{title:"e_range",icon:"mdi:ruler",secondary:"e_left_empty_these",expanded:!1,fields:[{name:"min",label:"e_minimu_entity_units",selector:{number:{mode:"box",step:"any"}}},{name:"max",label:"e_maximu_entity_units",selector:{number:{mode:"box",step:"any"}}},{name:"max_entity",label:"e_maximu_from_helper",helper:"e_option_number_input",selector:{entity:{domain:["number","input_number","sensor"]}}},{name:"max_entity_factor",label:"e_maximu_helper_scale",helper:"e_for_exampl_0",selector:{number:{mode:"box",step:"any"}}},{name:"step",label:"e_step_entity_units",selector:{number:{mode:"box",step:"any"}}},{name:"unit",label:"e_unit_shown_after",helper:"e_defaul_entity_s",selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",expanded:!1,fields:[{name:"variant",label:"e_container",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"e_filled_card"},{value:"flat",label:"e_flat_no_backgr"}]}}},{name:"slider_size",label:"e_slider_size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS · 16 dp"},{value:"s",label:"S · 24 dp"},{value:"m",label:"M · 40 dp"}]}}},{name:"color",label:"e_tile_backgr",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_conten_color_on",color:!0,template:!0,selector:{text:{}}},{name:"slider_color",label:"e_active_track_handle",color:!0,template:!0,selector:{text:{}}},{name:"slider_track_color",label:"e_inacti_track",color:!0,template:!0,selector:{text:{}}},{name:"hide_stops",label:"e_hide_stop_indica",helper:"e_small_m3_dots",selector:{boolean:{}}}]},{title:"e_advanced",icon:"mdi:tune",expanded:!1,fields:[{name:"service",label:"e_overri_servic_domain",selector:{text:{}}},{name:"service_key",label:"e_overri_servic_data",selector:{text:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}});const Pt=[{value:"home",label:"al_mode_home"},{value:"away",label:"al_mode_away"},{value:"night",label:"al_mode_night"},{value:"vacation",label:"al_mode_vacation"},{value:"custom",label:"e_custom_bypass"}];class Rt extends W{static properties={_expanded:{state:!0}};static styles=[W.styles,i`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .options-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
      .security-note {
        display: flex;
        gap: 12px;
        margin: 0 0 12px;
        padding: 14px 16px;
        border-radius: 16px;
        background: var(--warning-color, var(--md-sys-color-tertiary-container));
        color: var(--md-sys-color-on-tertiary-container, var(--primary-text-color));
        line-height: 1.4;
      }
      .security-note ha-icon { flex: 0 0 auto; margin-top: 2px; }
      .security-note strong { display: block; margin-bottom: 2px; }
    `];setConfig(e){this._legacyCodeConfigured=function(e){return Object.prototype.hasOwnProperty.call(e||{},"code")}(e),super.setConfig(It(e)),this._expanded??=null}render(){const e=this.hass?.states?.[this._config?.entity],t=!!e?.attributes?.code_arm_required;return a`
      ${this._legacyCodeConfigured||t?a`
        <div class="security-note" role="note">
          <ha-icon icon="mdi:shield-lock-outline"></ha-icon>
          <div>
            <strong>${n("al_code_security_title",this.hass)}</strong>
            ${n(this._legacyCodeConfigured?"al_code_legacy_notice":"al_code_native_notice",this.hass)}
          </div>
        </div>
      `:""}
      ${super.render()}
    `}_commit(e){this._legacyCodeConfigured=!1,super._commit(It(e))}_formData(){return{hero:!0,footnote:!0,direct_switch:!1,zones_start_expanded:!1,show_unavailable:!0,hold_ms:800,hint_ms:2e3,pending_timeout_ms:2e4,zone_settle_ms:8e3,zone_flap_detect:!0,zone_flap_count:6,zone_flap_window_ms:6e4,allow_safety_bypass:!1,bypass_from_can_bypass:!0,bypass_from_can_bypass_when_not_ready:!1,...this._config}}_sectionsSignature(){const e=this.hass?.states[this._config?.entity];return[this._config?.entity||"",e?.attributes?.code_arm_required?"c":"",(this._config?.zones||[]).length,(this._config?.modes||[]).join(","),this._config?.zone_filter?"f":"",this._config?.bypass_action?"b":"",!1===this._config?.zone_flap_detect?"nf":"",this._config?.arming_duration_ms?"ad":""].join("|")}get _sections(){return[{title:"e_setup",icon:"mdi:tune",fields:[{name:"entity",label:"e_alarm_panel",selector:{entity:{domain:["alarm_control_panel"]}},required:!0},{name:"modes",label:"e_modes_offer_option",helper:"e_leave_empty_offer",selector:{select:{multiple:!0,mode:"list",options:Pt}}}]},{title:"e_gesture",icon:"mdi:gesture-tap-hold",fields:[{name:"hold_ms",label:"e_hold_for_ms",helper:"e_keep_above_500ms",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}},{name:"direct_switch",label:"e_allow_switch_betwee",helper:"e_off_by_defaul",selector:{boolean:{}}},{name:"arming_duration_ms",label:"e_exit_delay_ms",helper:"e_how_long_panel",selector:{number:{min:1e3,max:6e5,step:1e3,mode:"box"}}},{name:"pending_duration_ms",label:"e_entry_delay_ms",helper:"e_same_for_countd",selector:{number:{min:1e3,max:6e5,step:1e3,mode:"box"}}},{name:"pending_timeout_ms",label:"e_give_up_waitin",helper:"e_how_long_card",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}},{name:"hint_ms",label:"e_how_long_refusa",selector:{number:{min:500,max:8e3,step:100,mode:"box"}}}]},{title:"e_zones",icon:"mdi:door-closed-lock",expanded:!1,fields:[{name:"zone_filter",label:"e_find_zones_automa",helper:"e_entity_id_prefix",selector:{text:{}}},{name:"zone_pattern",label:"e_zone_number_patter",helper:"e_how_read_panel",selector:{text:{}}},{name:"zone_settle_ms",label:"e_settle_before_zone",helper:"e_going_not_ready",selector:{number:{min:0,max:6e4,step:500,mode:"box"}}},{name:"zone_flap_detect",label:"e_treat_zones_flap",helper:"e_last_resort_fallba",selector:{boolean:{}}},{name:"zone_flap_count",label:"e_change_before_zone",selector:{number:{min:2,max:50,step:1,mode:"box"}}},{name:"zone_flap_window_ms",label:"e_window_those_change",selector:{number:{min:1e3,max:6e5,step:1e3,mode:"box"}}},{name:"bypass_from_can_bypass",label:"e_read_can_bypass",helper:"e_on_by_defaul",selector:{boolean:{}}},{name:"bypass_from_can_bypass_when_not_ready",label:"e_trust_can_bypass",helper:"e_off_by_defaul2",selector:{boolean:{}}},{name:"allow_safety_bypass",label:"e_allow_bypass_smoke",helper:"e_off_by_defaul3",selector:{boolean:{}}},{name:"bypass_action",label:"e_bypass_action",helper:"e_fired_by_bypass",selector:{ui_action:{default_action:"none"}}},{name:"unbypass_action",label:"e_un_bypass_action",helper:"e_fired_by_tappin",selector:{ui_action:{default_action:"none"}}}]},{title:"e_layout",icon:"mdi:view-agenda-outline",fields:[{name:"hero",label:"e_show_shape_state",selector:{boolean:{}}},{name:"footnote",label:"e_show_explan_line",selector:{boolean:{}}},{name:"zones_start_expanded",label:"e_start_with_ready",selector:{boolean:{}}},{name:"show_unavailable",label:"e_list_zones_panel",selector:{boolean:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"armed_color",label:"e_accent_while_armed",helper:"e_worn_by_shape",color:!0,selector:{text:{}}},{name:"armed_color_on",label:"e_ink_on_accent",color:!0,selector:{text:{}}},{name:"background",label:"e_card_backgr",color:!0,selector:{text:{}}},{name:"background_on",label:"e_card_text",color:!0,selector:{text:{}}},{name:"disarmed_icon",label:"e_shape_glyph_while",selector:{icon:{}}},{name:"triggered_icon",label:"e_shape_glyph_while2",selector:{icon:{}}}]},{title:"e_mode_labels_icons",icon:"mdi:text-short",expanded:!1,fields:Pt.flatMap(e=>[{name:`label_${e.value}`,label:`${n(e.label,this.hass)} — ${n("e_label",this.hass)}`,selector:{text:{}}},{name:`icon_${e.value}`,label:`${n(e.label,this.hass)} — ${n("e_icon",this.hass)}`,selector:{icon:{}}}])},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",label:"e_tappin_shape",selector:{ui_action:{default_action:"more-info"}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}get _zoneSchema(){return[{name:"entity",label:"e_zone_sensor",helper:"e_door_window_contac",selector:{entity:{domain:["binary_sensor","sensor","lock","cover","input_boolean","switch"]}}},{name:"name",label:"e_name_option_defaul",selector:{text:{}}},{name:"icon",label:"e_icon_option",selector:{icon:{}}},{name:"safety",label:"e_24_hour_zone",helper:"e_normal_detect_from",selector:{boolean:{}}},{name:"transient",label:"e_moveme_detect",helper:"e_overri_automa_guess",selector:{boolean:{}}}]}_zones(){return Array.isArray(this._config?.zones)?this._config.zones:[]}_commitZones(e){const t={...this._config};e.length?t.zones=e:delete t.zones,this._commit(t)}_addZone(){const e=[...this._zones(),{entity:""}];this._expanded=e.length-1,this._commitZones(e)}_removeZone(e){const t=[...this._zones()];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commitZones(t)}_moveZone(e,t){const n=[...this._zones()],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commitZones(n)}_updateZone(e,t){const n=[...this._zones()];n[e]={...n[e],...t},this._commitZones(n)}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_zoneTitle(e,t){if(e.name)return e.name;const a=e.entity?this.hass?.states[e.entity]:null;return a?.attributes?.friendly_name||e.entity||n("e_zone_n",this.hass,{n:t+1})}_renderExtra(){const e=this._zones();return a`
      <div class="options-header">
        <span>${n("e_zones",this.hass)}</span>
        <ha-icon-button @click=${this._addZone}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="options-note">${n("e_zones_note",this.hass)}</div>

      ${T((e,t)=>this._moveZone(e,t),e.map((e,t)=>a`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${this._zoneTitle(e,t)}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeZone(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?a`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s(this._zoneSchema,this.hass)}
                        .computeLabel=${O}
                        @value-changed=${e=>this._updateZone(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}}customElements.define("materia-alarm-editor",Rt);customElements.define("materia-confirm-editor",class extends W{_formData(){return{gesture:"hold",require_gesture:"activate",hold_ms:800,threshold:.55,pending_timeout_ms:1e4,caption_warn:!0,...this._config}}_sectionsSignature(){return[this._config?.entity?"e":"",this._config?.gesture||"hold",this._config?.require_gesture||"activate",this._config?.action?"a":""].join("|")}get _sections(){const e="slide"!==(this._config?.gesture??"hold"),t=!!this._config?.entity;return[{title:"e_setup",icon:"mdi:tune",fields:[{name:"entity",label:"e_entity_reflec_drive",helper:"e_with_entity_no",selector:{entity:{}}},...t?[{name:"active_state",label:"e_state_counts_as",helper:"e_defaul_usual_on",selector:{text:{}}}]:[],{name:"action",label:"e_action_when_commit",helper:"e_fired_when_gestur",selector:{ui_action:{default_action:"none"}}},{name:"deactivate_action",label:"e_action_when_switch",helper:"e_fired_by_active",selector:{ui_action:{default_action:"none"}}}]},{title:"e_gesture",icon:"mdi:gesture-tap-hold",fields:[{name:"gesture",label:"e_commit_gestur",selector:{select:{mode:"dropdown",options:[{value:"hold",label:"e_press_hold"},{value:"slide",label:"e_slide_across"}]}}},{name:"require_gesture",label:"e_which_direct_needs",helper:"e_turnin_on_only",selector:{select:{mode:"dropdown",options:[{value:"activate",label:"e_only_turnin_on"},{value:"both",label:"e_both_direct"}]}}},...e?[{name:"hold_ms",label:"e_hold_for_ms",helper:"e_keep_above_500ms",selector:{number:{min:300,max:5e3,step:50,mode:"box"}}}]:[{name:"threshold",label:"e_fracti_track_cross",selector:{number:{min:.2,max:1,step:.05,mode:"box"}}}],...t?[{name:"pending_timeout_ms",label:"e_give_up_waitin2",selector:{number:{min:1e3,max:6e4,step:500,mode:"box"}}}]:[]]},{title:"e_words",icon:"mdi:text-short",fields:[{name:"eyebrow",label:"e_eyebro_option",template:!0,selector:{text:{}}},{name:"label",label:"e_gestur_label",helper:"e_instru_across_track",template:!0,selector:{text:{}}},{name:"caption",label:"e_warnin_conseq_line",helper:"e_point_card_shown",template:!0,selector:{text:{}}},{name:"caption_warn",label:"e_colour_warnin_line",selector:{boolean:{}}},{name:"active_label",label:"e_label_while_active",template:!0,selector:{text:{}}},{name:"active_caption",label:"e_captio_while_active",helper:"e_falls_back_warnin",template:!0,selector:{text:{}}},..."both"===this._config?.require_gesture?[]:[{name:"deactivate_hint",label:"e_active_face_hint",selector:{text:{}}}],...t?[{name:"busy_label",label:"e_while_waitin_defaul",selector:{text:{}}}]:[]]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"active_color",label:"e_backgr_while_active",color:!0,selector:{text:{}}},{name:"active_color_on",label:"e_text_while_active",color:!0,selector:{text:{}}},{name:"track_color",label:"e_gestur_track",color:!0,selector:{text:{}}},{name:"track_color_on",label:"e_text_on_track",color:!0,selector:{text:{}}},...e?[]:[{name:"handle_color",label:"e_slide_handle",color:!0,selector:{text:{}}},{name:"handle_color_on",label:"e_handle_glyph",color:!0,selector:{text:{}}}],{name:"active_icon",label:"e_icon_while_active",selector:{icon:{}}},{name:"gesture_icon",label:"e_icon_on_gestur",selector:{icon:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}});class Ht extends W{static properties={_expanded:{state:!0}};static styles=[W.styles,i`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .options-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{...this._config}}_sectionsSignature(){return[(this._config?.rows||[]).length,this._config?.status?"s":"",null!=this._config?.max?"m":"",this._config?.footnote?"f":""].join("|")}get _sections(){return[{title:"e_scale",icon:"mdi:ruler",fields:[{name:"max",label:"e_full_scale_value",helper:"e_all_bars_share",selector:{number:{min:0,step:"any",mode:"box"}}},{name:"precision",label:"e_decima_places_option",helper:"e_leave_empty_choose",selector:{number:{min:0,max:4,step:1,mode:"box"}}}]},{title:"e_words",icon:"mdi:text-long",fields:[{name:"eyebrow",label:"e_block_label_option",helper:"e_sits_top_left",template:!0,selector:{text:{}}},{name:"meta",label:"e_freshn_note_option",helper:"e_top_right_quiete",template:!0,selector:{text:{}}},{name:"status",label:"e_status_line",helper:"e_senten_page_opened",template:!0,selector:{text:{}}},{name:"status_icon",label:"e_status_icon",template:!0,selector:{icon:{}}},{name:"status_color",label:"e_status_icon_colour",color:!0,template:!0,selector:{text:{}}},{name:"footnote",label:"e_footno_option",helper:"e_quiete_than_status",template:!0,selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"background",label:"e_card_backgr",color:!0,selector:{text:{}}},{name:"background_on",label:"e_card_text",color:!0,selector:{text:{}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}get _rowSchema(){return[{name:"entity",label:"e_entity",selector:{entity:{}}},{name:"attribute",label:"e_attrib_option",helper:"e_read_attrib_instea",selector:{attribute:{}},context:{filter_entity:"entity"}},{name:"label",label:"e_label_option_defaul",template:!0,selector:{text:{}}},{name:"unit",label:"e_unit_option_defaul",selector:{text:{}}},{name:"color",label:"e_bar_colour",color:!0,selector:{text:{}}}]}_rows(){return Array.isArray(this._config?.rows)?this._config.rows:[]}_commitRows(e){const t={...this._config};e.length?t.rows=e:delete t.rows,this._commit(t)}_addRow(){const e=[...this._rows(),{entity:""}];this._expanded=e.length-1,this._commitRows(e)}_removeRow(e){const t=[...this._rows()];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commitRows(t)}_moveRow(e,t){const n=[...this._rows()],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commitRows(n)}_updateRow(e,t){const n=[...this._rows()];n[e]={...n[e],...t},this._commitRows(n)}_toggleExpand(e){this._expanded=this._expanded===e?null:e}_rowTitle(e,t){if(e.label&&!String(e.label).includes("{{"))return e.label;const a=e.entity?this.hass?.states[e.entity]:null;return a?.attributes?.friendly_name||e.entity||n("e_row_n",this.hass,{n:t+1})}_renderExtra(){const e=this._rows();return a`
      <div class="options-header">
        <span>${n("e_bars",this.hass)}</span>
        <ha-icon-button @click=${this._addRow}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="options-note">
        Rows are drawn in this order, top to bottom — the card does not reorder
        them, so put the one that answers the question first. A row whose value
        is missing draws as unknown rather than as zero.
      </div>

      ${T((e,t)=>this._moveRow(e,t),e.map((e,t)=>a`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${this._rowTitle(e,t)}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeRow(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?a`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s(this._rowSchema,this.hass)}
                        .computeLabel=${O}
                        @value-changed=${e=>this._updateRow(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}}customElements.define("materia-bars-editor",Ht);const Nt=e=>!!e&&"object"==typeof e&&!Array.isArray(e);function qt(e){return Nt(e)?Object.entries(e).map(([e,t])=>({id:e,entry:t})):[]}function Wt(e){if(!e.length)return;const t={};for(const{id:n,entry:a}of e)t[n]=a;return t}function Kt(e,t,n){const a=function(e){return String(e??"").trim().replace(/\s+/g,"_")}(n),o=qt(e);return a?a===t?e:o.some(e=>e.id===a)?null:Wt(o.map(e=>e.id===t?{id:a,entry:e.entry}:e)):null}function Vt(e,t="panel"){const n=function(e,t="panel"){const n=new Set(Object.keys(Nt(e)?e:{}));if(!n.has(t))return t;let a=2;for(;n.has(`${t}_${a}`);)a++;return`${t}_${a}`}(e,t);return{id:n,panels:{...Nt(e)?e:{},[n]:{cards:[]}}}}const Gt={text:{}},Ut={boolean:{}};class Zt extends o{static properties={hass:{attribute:!1},lovelace:{attribute:!1},panels:{attribute:!1},_open:{state:!0},_badId:{state:!0}};static styles=i`
    :host {
      display: block;
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .panel {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .panel-head {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    }
    .panel-head span {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
    }
    ha-textfield,
    ha-selector {
      display: block;
      width: 100%;
    }
  `;_emit(e){this.panels=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e},bubbles:!0,composed:!0}))}_patch(e,t,n){this._emit(function(e,t,n){return Wt(qt(e).map(e=>e.id===t?{id:t,entry:n}:e))}(this.panels,e,function(e,t){const n=Nt(e)&&!!e.type,a=n?{cards:[e]}:{...Nt(e)?e:{}};if("heading"in t&&(t.heading?a.heading=t.heading:delete a.heading),"actions"in t&&(t.actions?.length?a.actions=t.actions:delete a.actions),"head"in t&&(!1===t.head?a.head=!1:delete a.head),"cards"in t){const e=Array.isArray(t.cards)?t.cards:[];"card"in a&&!("cards"in a)&&1===e.length?a.card=e[0]:(delete a.card,a.cards=e)}const o=Object.keys(a);return n&&1===o.length&&1===a.cards?.length?a.cards[0]:a}(t,n)))}_rename(e,t){const n=t.target,a=Kt(this.panels,e,n.value);if(!a)return this._badId=e,void(n.value=e);this._badId=null,a!==this.panels&&(this._open===e&&(this._open=Object.keys(a).find(e=>!(e in(this.panels??{})))),this._emit(a))}_add(){const{id:e,panels:t}=Vt(this.panels);this._open=e,this._emit(t)}_iconButton(e,t,n){return a`<ha-icon-button .label=${t} @click=${n}><ha-icon icon=${e}></ha-icon></ha-icon-button>`}_on(e,t,n,a=e=>e){return o=>{o.stopPropagation(),this._patch(e,t,{[n]:a(o.detail.value)})}}_renderPanel({id:e,entry:t}){const o=this.hass,i=function(e){const t=Nt(e)?e:{};if(t.type)return{heading:"",actions:[],cards:[t],head:!0};let n=[];return Array.isArray(t.cards)?n=t.cards:Nt(t.card)&&(n=[t.card]),{heading:"string"==typeof t.heading?t.heading:null==t.heading?"":String(t.heading),actions:Array.isArray(t.actions)?t.actions:[],cards:n,head:!1!==t.head}}(t),l=this._open===e;return a`<div class="panel">
      <div class="panel-head">
        <span>${i.heading?`${e} · ${i.heading}`:e}</span>
        ${this._iconButton(l?"mdi:chevron-up":"mdi:chevron-down",e,()=>this._open=l?null:e)}
        ${this._iconButton("mdi:delete",n("ed_remove_panel",o),()=>this._emit(function(e,t){return Wt(qt(e).filter(e=>e.id!==t))}(this.panels,e)))}
      </div>
      ${l?a`<div class="body">
            <ha-textfield
              .label=${n("ed_panel_id",o)}
              .value=${e}
              .invalid=${this._badId===e}
              .errorMessage=${n("ed_panel_id_taken",o)}
              @change=${t=>this._rename(e,t)}
            ></ha-textfield>
            <ha-selector
              .hass=${o}
              .selector=${Gt}
              .label=${n("ed_panel_heading",o)}
              .value=${i.heading}
              @value-changed=${this._on(e,t,"heading")}
            ></ha-selector>
            <ha-selector
              .hass=${o}
              .selector=${Ut}
              .label=${n("ed_panel_head",o)}
              .value=${i.head}
              @value-changed=${this._on(e,t,"head",e=>!1!==e)}
            ></ha-selector>
            ${i.head?a`<materia-card-list-editor
                  add-button
                  .hass=${o}
                  .lovelace=${this.lovelace}
                  .label=${n("ed_panel_actions",o)}
                  .cards=${i.actions}
                  @value-changed=${this._on(e,t,"actions")}
                ></materia-card-list-editor>`:c}
            <materia-card-list-editor
              add-button
              .hass=${o}
              .lovelace=${this.lovelace}
              .label=${n("ed_panel_cards",o)}
              .cards=${i.cards}
              @value-changed=${this._on(e,t,"cards")}
            ></materia-card-list-editor>
          </div>`:c}
    </div>`}render(){return this.hass?a`
      <div class="head">
        <span>${n("ed_panels",this.hass)}</span>
        ${this._iconButton("mdi:plus",n("ed_add_panel",this.hass),()=>this._add())}
      </div>
      ${qt(this.panels).map(e=>this._renderPanel(e))}
    `:c}}customElements.define("materia-panels-editor",Zt);const Jt={name:"panel_timeout",label:"e_return_player_after",selector:{number:{min:0,max:60,step:1,mode:"slider",unit_of_measurement:"s"}}};customElements.define("materia-art-scope-editor",class extends Mt{_formData(){return{layout:"stack",gap:16,background:!0,panel_timeout:10,fill:!0,...this._config}}_sectionsSignature(){return this._config?.layout||"stack"}get _sections(){const e=this._config?.layout||"stack";return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"e_player_colours",required:!0,selector:{entity:{domain:"media_player"}}}]},{title:"e_layout",icon:"mdi:view-dashboard-outline",fields:[{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"stack",label:"e_stack"},{value:"row",label:"e_row"},{value:"grid",label:"e_grid"},{value:"kiosk",label:"e_kiosk_cover_player"}]}}},..."grid"===e?[{name:"columns",label:"e_column_number_grid",selector:{text:{}}}]:[],{name:"gap",label:"e_gap_px",selector:{number:{min:0,max:64,mode:"box"}}},{name:"padding",label:"e_paddin_px",selector:{number:{min:0,max:64,mode:"box"}}},{name:"background",label:"e_draw_surfac",selector:{boolean:{}}}]},..."kiosk"===e?[{title:"e_kiosk_panel",icon:"mdi:dock-right",fields:[{name:"fill",label:"e_fill_screen_height",selector:{boolean:{}}},{...Jt,label:"e_close_panel_after"}]}]:[]]}get _cardsTitle(){return"e_cards"}get _cardsHint(){return"e_kiosk_cards_hint"}_renderExtra(){return"kiosk"!==this._config?.layout?super._renderExtra():a`${super._renderExtra()}
      <materia-panels-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .panels=${this._config.panels}
        @value-changed=${e=>{e.stopPropagation(),this._setField("panels",e.detail.value)}}
      ></materia-panels-editor>`}});customElements.define("materia-panel-host-editor",class extends W{_formData(){return{mode:"inline",timeout:30,gap:16,...this._config}}_sectionsSignature(){return this.hass?.locale?.language??""}get _sections(){const e=this.hass;return[{title:n("ed_layout",e),icon:"mdi:dock-bottom",fields:[{name:"mode",label:n("ed_panel_mode",e),selector:{select:{mode:"dropdown",options:[{value:"inline",label:n("ed_panel_mode_inline",e)},{value:"sheet",label:n("ed_panel_mode_sheet",e)}]}}},{name:"timeout",label:n("ed_panel_timeout",e),selector:{number:{min:0,max:300,step:1,mode:"box",unit_of_measurement:"s"}}},{name:"gap",label:n("ed_gap",e),selector:{number:{min:0,max:64,mode:"box"}}}]}]}_renderExtra(){return a`
      <materia-card-list-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .cards=${Array.isArray(this._config.cards)?this._config.cards:[]}
        .label=${n("ed_cards",this.hass)}
        @value-changed=${e=>{e.stopPropagation(),this._commit({...this._config,cards:e.detail.value})}}
      ></materia-card-list-editor>
      <materia-panels-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .panels=${this._config.panels}
        @value-changed=${e=>{e.stopPropagation(),this._setField("panels",e.detail.value)}}
      ></materia-panels-editor>
    `}});customElements.define("materia-stack-editor",class extends W{_formData(){const e={direction:"column",gap:16,...this._config};return Number.isInteger(e.grow)&&(e.grow+=1),e}_sectionsSignature(){return`${"row"===this._config?.direction}|${this.hass?.locale?.language??""}`}_setField(e,t){"grow"===e&&"number"==typeof t&&(t=Math.max(0,Math.round(t)-1)),super._setField(e,t)}get _sections(){const e=this.hass;return[{title:n("ed_layout",e),icon:"mdi:view-split-horizontal",fields:[{name:"direction",label:n("ed_stack_direction",e),selector:{select:{mode:"dropdown",options:[{value:"column",label:n("ed_stack_column",e)},{value:"row",label:n("ed_stack_row",e)}]}}},{name:"gap",label:n("ed_gap",e),selector:{number:{min:0,max:64,mode:"box"}}},..."row"===this._config?.direction?[]:[{name:"grow",label:n("ed_stack_grow",e),selector:{number:{min:1,max:20,mode:"box"}}}]]}]}_renderExtra(){return a`<materia-card-list-editor
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cards=${Array.isArray(this._config.cards)?this._config.cards:[]}
      .label=${n("ed_cards",this.hass)}
      @value-changed=${e=>{e.stopPropagation(),this._commit({...this._config,cards:e.detail.value})}}
    ></materia-card-list-editor>`}});customElements.define("materia-media-header-editor",class extends W{_formData(){return{show_source:!0,show_volume:!0,show_power:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"e_player_in_art",selector:{entity:{domain:"media_player"}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"default",label:"e_defaul_source_title"},{value:"kiosk",label:"e_kiosk_chip_statio"}]}}},{name:"zone_name",label:"e_zone_name_defaul",selector:{text:{}}},{name:"stations_label",label:"e_stations_label",selector:{text:{}}},{name:"show_source",label:"e_source_button",selector:{boolean:{}}},{name:"source_menu",label:"e_source_menu",selector:{boolean:{}}},{name:"show_volume",label:"e_volume_ring",selector:{boolean:{}}},{name:"show_power",label:"e_power_menu_per",selector:{boolean:{}}},{name:"logo_fill",label:"e_statio_logos_fill",selector:{boolean:{}}}]},{title:"media_stations",icon:"mdi:radio",expanded:!1,fields:[{name:"stations",render:e=>he(this,e)}]},{title:"e_power_menu",icon:"mdi:power",expanded:!1,fields:[{name:"power_menu",render:e=>pe(this,e?.items,t=>{const n={...e??{}};t?n.items=t:delete n.items,this._setField("power_menu",Object.keys(n).length?n:void 0)},"ed_power_menu_items")}]}]}});customElements.define("materia-volume-card-editor",class extends W{_sectionsSignature(){return`${this._config?.style}|${!!this._config?.column}`}get _sections(){const e="tap"===this._config?.style&&this._config?.column;return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"e_player_empty_art",selector:{entity:{domain:"media_player"}}},{name:"name",label:"e_name",selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"style",selector:{select:{mode:"dropdown",options:[{value:"knob",label:"e_knob"},{value:"arc",label:"e_arc"},{value:"tap",label:"e_tap_vertic_slider"}]}}},..."tap"===this._config?.style?[{name:"column",label:"e_narrow_column",selector:{boolean:{}}}]:[],...e?[{name:"show_name",label:"e_show_name",selector:{boolean:{}}}]:[]]}]}});const Yt={active_entity:"entity",active_attributes:"attributes"};class Qt extends W{_formData(){const e={close_on_select:!0,...this._config};return e.active?.entity&&(e.active_entity=e.active.entity),null!=e.active?.attributes&&(e.active_attributes=[].concat(e.active.attributes)),e}_sectionsSignature(){return`${this._listKey}|${this.hass?.locale?.language??""}`}_setField(e,t){const n=Yt[e];if(!n)return super._setField(e,t);const a={...this._config?.active??{}};null==t||""===t||Array.isArray(t)&&!t.length?delete a[n]:a[n]=t,super._setField("active",Object.keys(a).length?a:void 0)}get _listKey(){const e=this._config||{};return e.items?"items":e.stations?"stations":"items"}get _sections(){const e=this._listKey;return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"e_player_rings_active",selector:{entity:{domain:"media_player"}}},{name:"name",label:"e_title",selector:{text:{}}},{name:"columns",selector:{number:{min:1,max:8,mode:"box"}}},..."stations"===e?[{name:"logo_fill",label:"e_logo_fills_tile",selector:{boolean:{}}}]:[{name:"tile",selector:{select:{mode:"dropdown",options:[{value:"logo",label:"e_logo"},{value:"cover",label:"e_cover"}]}}},{name:"tile_background",label:"e_tile_backgr",selector:{text:{}}}],{name:"close_on_select",label:n("ed_tile_close",this.hass),selector:{boolean:{}}},{name:"active_entity",label:n("ed_tile_active_entity",this.hass),selector:{entity:{domain:"media_player"}}},{name:"active_attributes",label:n("ed_tile_active_attributes",this.hass),selector:me}]},{title:"stations"===e?"media_stations":"e_items",icon:"stations"===e?"mdi:radio":"mdi:view-grid-outline",fields:[{name:e,render:t=>he(this,t,e,!0)}]}]}}customElements.define("materia-tile-grid-editor",Qt),customElements.define("materia-station-grid-editor",class extends Qt{get _listKey(){return this._config?.items?"items":"stations"}});const Xt=(e,t)=>{const n={...e,...t};for(const e of["name","value"])""!==n[e]&&null!=n[e]||delete n[e];return n},en={};customElements.define("materia-switcher-editor",class extends W{_formData(){return{bar:"tabs",...this._config}}_sectionsSignature(){return`${"connected"===this._config?.bar}|${this.hass?.locale?.language??""}`}get _sections(){const e=this.hass;return[{title:"e_switcher",icon:"mdi:tab",fields:[{name:"bar",label:n("ed_switcher_bar",e),selector:{select:{mode:"dropdown",options:[{value:"tabs",label:n("ed_switcher_tabs",e)},{value:"connected",label:n("ed_switcher_connected",e)}]}}},..."connected"===this._config?.bar?[{name:"size",label:n("ed_switcher_size",e),selector:{select:{mode:"dropdown",options:["xs","s","m","l","xl"]}}}]:[],{name:"name",label:"e_accessible_name",selector:{text:{}}},{name:"remember",label:"e_remember_sel",selector:{boolean:{}}},{name:"key",label:"e_storage_key",selector:{text:{}}}]}]}_renderExtra(){const e=this.hass;return a`<materia-item-list-editor
      .hass=${e}
      .items=${Array.isArray(this._config.items)?this._config.items:[]}
      .schema=${t=e,en[t?.locale?.language??""]??=[{name:"name",label:n("ed_item_name",t),selector:{text:{}}},{name:"value",label:n("ed_item_value",t),selector:{text:{}}}]}
      .itemLabel=${e=>e?.name}
      .fromForm=${Xt}
      .newItem=${()=>({name:""})}
      .itemExtra=${(t,n)=>a`<materia-card-slot-editor
        .hass=${e}
        .lovelace=${this.lovelace}
        .card=${t?.card}
        @value-changed=${e=>{e.stopPropagation();const a={...t};e.detail.value?a.card=e.detail.value:delete a.card,n(a)}}
      ></materia-card-slot-editor>`}
      addLabel=${n("ed_items",e)}
      @value-changed=${e=>{e.stopPropagation(),this._commit({...this._config,items:e.detail.value})}}
    ></materia-item-list-editor>`;var t}});customElements.define("materia-toggle-chip-editor",class extends W{get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:["switch","input_boolean"]}}},{name:"name",label:"e_name_switch_label",template:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}},{name:"label_on",label:"e_text_when_on",template:!0,selector:{text:{}}},{name:"label_off",label:"e_text_when_off",template:!0,selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"chip",label:"e_chip"},{value:"switch",label:"e_label_switch"}]}}}]}]}});const tn=[{value:"primary",label:"e_primary"},{value:"secondary",label:"e_secondary"},{value:"tertiary",label:"e_tertiary"},{value:"error",label:"gt_state_error"},{value:"device",label:"sched_device"},{value:"primary-container",label:"e_primar_contai"},{value:"secondary-container",label:"e_second_contai"},{value:"tertiary-container",label:"e_tertia_contai"},{value:"error-container",label:"e_error_contai"},{value:"device-container",label:"e_device_contai"},{value:"primary-state",label:"e_primar_state"},{value:"secondary-state",label:"e_second_state"},{value:"tertiary-state",label:"e_tertia_state"},{value:"error-state",label:"e_error_state"},{value:"device-state",label:"e_device_state"},{value:"battery",label:"e_battery"}];customElements.define("materia-badge-editor",class extends W{get _actionRole(){const e=["toggle","perform-action","call-service"],t=this._config?.tap_action?.action;if(t&&"none"!==t)return e.includes(t);const n=this._config?.hold_action?.action;return!!n&&"none"!==n&&e.includes(n)}_formData(){return{show_state:!1,variant:"secondary",...this._actionRole?{shape:"leaf"}:{},...this._config}}_sectionsSignature(){return`${this._config?.entity?"entity":"none"}|${this._actionRole?"verb":"nav"}`}get _sections(){const e=!!this._config?.entity,t=[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",selector:{entity:{}}},{name:"name",required:!0,template:!0,selector:{text:{}}},{name:"icon",required:!0,template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},...this._actionRole?[{name:"shape",helper:"e_asymme_corner_rise",selector:{select:{mode:"dropdown",options:[{value:"leaf",label:"e_asymme_corner"},{value:"leaf-flip",label:"e_asymme_corner_mirror"}]}}}]:[],{name:"variant",selector:{select:{mode:"dropdown",options:tn}}},{name:"secondary",label:"e_second_line",template:!0,helper:"e_one_quiet_line",selector:{text:{}}}]}];return e&&t.push({title:"e_state",icon:"mdi:state-machine",fields:[{name:"show_state",selector:{boolean:{}}},{name:"active_state",selector:{text:{}}},{name:"state_display",template:!0,selector:{text:{}}},{name:"busy_entity",label:"e_also_active_while",helper:"e_script_automa_timer",selector:{entity:{domain:["script","automation","timer","input_boolean","binary_sensor"]}}}]}),t.push({title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_icon",color:!0,template:!0,selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"hold_action",helper:"e_hold_delibe_by",selector:{ui_action:{default_action:"none"}}},{name:"double_tap_action",selector:{ui_action:{default_action:"none"}}}]}),t}});class nn extends W{static properties={_expanded:{state:!0}};static styles=[W.styles,i`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header .glyph-note {
        flex: none;
        font-size: 11px;
        opacity: 0.6;
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return["transport","toolbar"].includes(this._config?.group)?{...this._config}:{group:"connected",size:"m",variant:"tonal",...this._config}}_sectionsSignature(){return`${this._config?.group||""}|${this._config?.preset||""}|${this._config?.multi_select?1:0}`}get _mediaSections(){const e=this._config?.group;return[{title:"e_setup",icon:"mdi:tune",fields:[this._groupField,{name:"entity",label:"e_player_in_art",selector:{entity:{domain:"media_player"}}},..."transport"===e?[{name:"size",label:"e_height_defaul_88",selector:{select:{mode:"dropdown",options:[{value:"m",label:"M (56dp)"},{value:"l",label:"L (96dp)"},{value:"xl",label:"XL (136dp)"}]}}}]:[{name:"align",label:"e_alignment",selector:{select:{mode:"dropdown",options:[{value:"center",label:"e_centre"},{value:"start",label:"e_left"}]}}}]]},..."toolbar"===e?[{title:"e_buttons",icon:"mdi:gesture-tap-button",fields:[{name:"buttons",render:e=>a`<materia-toolbar-buttons-editor
                    .hass=${this.hass}
                    .value=${e}
                    @value-changed=${e=>{e.stopPropagation(),this._setField("buttons",e.detail.value)}}
                  ></materia-toolbar-buttons-editor>`}]}]:[]]}get _groupField(){return{name:"group",label:"e_configuratio",selector:{select:{mode:"dropdown",options:[{value:"connected",label:"e_connec_segmen_entity"},{value:"standard",label:"e_standa_spaced_row"},{value:"transport",label:"e_media_transp_prev"},{value:"toolbar",label:"e_media_toolba_shuffl"}]}}}}get _isMediaGroup(){return["transport","toolbar"].includes(this._config?.group)}get _sections(){if(this._isMediaGroup)return this._mediaSections;const e="standard"===this._config?.group,t=[...Object.keys(L).map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1).replace(/-/g," ")})),{value:"custom",label:"al_mode_custom"}],n=[{title:"e_setup",icon:"mdi:tune",fields:[this._groupField,...e?[]:[{name:"entity",selector:{entity:{}}},{name:"attribute",selector:{text:{}}},{name:"preset",label:"e_color_preset",selector:{select:{mode:"dropdown",options:t}}}],{name:"size",label:"e_size_applie_whole",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"XS (32dp)"},{value:"s",label:"S (40dp)"},{value:"m",label:"M (56dp)"},{value:"l",label:"L (96dp)"},{value:"xl",label:"XL (136dp)"}]}}},{name:"variant",label:"e_style",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"e_filled"},{value:"tonal",label:"e_tonal"}]}}},...e?[]:[{name:"multi_select",label:"e_multi_select",selector:{boolean:{}}}],...!e&&this._config?.multi_select?[{name:"columns",label:"e_max_column",selector:{number:{min:1,max:8,mode:"box"}}}]:[]]}];return n.push({title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}),"custom"===this._config?.preset&&n.push({title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color_active",label:"e_active_color",color:!0,template:!0,selector:{text:{}}},{name:"color_on_active",label:"e_active_text_color",color:!0,template:!0,selector:{text:{}}}]}),n}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"entity",label:"e_entity_option_button",selector:{entity:{}}},{name:"value",label:"e_value_state_active",selector:{text:{}}},{name:"active",label:"e_active_templa_overri",template:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{default_action:"call-service"}}}]}get _buttonSchema(){return[{name:"label",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}}},{name:"entity",label:"e_entity_option_drives",selector:{entity:{}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"e_filled"},{value:"tonal",label:"e_tonal"}]}}},{name:"wide",label:"e_wide_stretc_share",selector:{boolean:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{default_action:"call-service"}}}]}get _listKey(){return"standard"===this._config?.group?"buttons":"options"}_renderExtra(){if(this._isMediaGroup)return a``;const e=this._listKey,t="buttons"===e,o=this._config[e]||[],i=t?this._buttonSchema:this._optionSchema;return a`
      <div class="options-header">
        <span>${n(t?"e_buttons":"e_options",this.hass)}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${T((e,t)=>this._moveOption(e,t),o.map((e,o)=>a`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||n(t?"e_button_n":"e_option_n",this.hass,{n:o+1})}</span>
                ${"split"===e.type||e.options?a`<span class="glyph-note">${n("e_split_yaml",this.hass)}</span>`:""}
                ${e.tap_action_map?a`<span class="glyph-note">${n("e_mapped_yaml",this.hass)}</span>`:""}
                <ha-icon-button @click=${()=>this._toggleExpand(o)}>
                  <ha-icon icon=${this._expanded===o?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(o)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===o?a`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s(i,this.hass)}
                        .computeLabel=${O}
                        @value-changed=${e=>this._updateOptionForm(o,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const e=this._listKey,t=[...this._config[e]||[],"buttons"===e?{icon:"",variant:"tonal"}:{label:"",value:"",icon:""}];this._expanded=t.length-1,this._commit({...this._config,[e]:t})}_removeOption(e){const t=this._listKey,n=[...this._config[t]||[]];n.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,[t]:n})}_moveOption(e,t){const n=this._listKey,a=[...this._config[n]||[]],[o]=a.splice(e,1);a.splice(t,0,o),this._expanded===e&&(this._expanded=t),this._commit({...this._config,[n]:a})}_updateOptionForm(e,t){const n=this._listKey,a=[...this._config[n]||[]];a[e]={...a[e],...t},this._commit({...this._config,[n]:a})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-button-group-editor",nn);customElements.define("materia-checkbox-editor",class extends W{get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"checked_entity",selector:{entity:{}}},{name:"checked_value",selector:{text:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"toggle"}}},{name:"tap_action_checked",label:"e_action_checke",selector:{ui_action:{}}},{name:"tap_action_unchecked",label:"e_action_unchec",selector:{ui_action:{}}}]}]}});customElements.define("materia-pill-editor",class extends W{_formData(){return{background:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"state_display",template:!0,selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_color",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_icon",color:!0,template:!0,selector:{text:{}}},{name:"background",selector:{boolean:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{}}}]}]}});class an extends W{static properties={_expanded:{state:!0}};static styles=[W.styles,i`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null}get _isList(){return"list"===this._config?.mode||null==this._config?.mode&&Array.isArray(this._config?.items)}_formData(){return{position:"auto",menu_variant:"surface",...this._config,mode:this._isList?"list":"select"}}_sectionsSignature(){return this._isList?"list":"select"}_setField(e,t){if("mode"!==e)return super._setField(e,t);const n={...this._config};"list"===t?(n.mode="list",n.items??=n.entity?[n.entity]:[]):(delete n.mode,delete n.items),this._commit(n)}get _modeField(){return{name:"mode",label:"ed_menu_mode",selector:{select:{mode:"dropdown",options:[{value:"select",label:"ed_menu_mode_select"},{value:"list",label:"ed_menu_mode_list"}]}}}}get _sections(){return this._isList?[{title:"e_content",icon:"mdi:card-text-outline",fields:[this._modeField,{name:"icon",selector:{icon:{}}},{name:"name",label:"ed_menu_button_label",selector:{text:{}}},{name:"color",label:"ed_menu_icon_color",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"error",label:"ed_menu_color_error"}]}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"default",label:"e_defaul_48_px"},{value:"kiosk",label:"e_kiosk_44_px"}]}}}]}]:[{title:"e_content",icon:"mdi:card-text-outline",fields:[this._modeField,{name:"entity",selector:{entity:{}}},{name:"name",template:!0,selector:{text:{}}},{name:"icon",template:!0,selector:{icon:{}},context:{icon_entity:"entity"}},{name:"position",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"e_auto_flips_fit"},{value:"below",label:"e_below"},{value:"above",label:"e_above"}]}}}]},{title:"e_substate",icon:"mdi:format-text-variant-outline",fields:[{name:"substate",label:"e_substa_text_templa",template:!0,selector:{text:{}}},{name:"substate_entity",label:"e_from_entity",selector:{entity:{}}},{name:"substate_attribute",label:"e_entity_attrib_option",selector:{text:{}}},{name:"substate_separator",label:"e_separator",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"•",label:"e_dot"},{value:"–",label:"e_dash"},{value:"/",label:"e_slash"}]}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_icon",color:!0,template:!0,selector:{text:{}}},{name:"menu_variant",label:"e_menu_style",selector:{select:{mode:"dropdown",options:[{value:"surface",label:"e_surfac_classi"},{value:"expressive",label:"e_expres_contai_tone"}]}}},{name:"menu_color",label:"e_menu_panel_color",color:!0,selector:{text:{}}},{name:"menu_color_on",label:"e_menu_text_color",color:!0,selector:{text:{}}}]}]}get _optionSchema(){return[{name:"label",selector:{text:{}}},{name:"value",required:!0,selector:{text:{}}},{name:"icon",selector:{icon:{}}}]}_renderExtra(){return this._isList?a`<div class="options-header"></div>${pe(this,this._config.items,e=>this._commit({...this._config,items:e??[]}))}`:a`
      <div class="options-header">
        <span>${n("e_options",this.hass)}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${T((e,t)=>this._moveOption(e,t),(this._config.options||[]).map((e,t)=>a`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||e.value||n("e_option_n",this.hass,{n:t+1})}</span>
                <ha-icon-button @click=${()=>this._toggleExpand(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?a`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s(this._optionSchema,this.hass)}
                        .computeLabel=${O}
                        @value-changed=${e=>this._updateOptionForm(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
      ${this._renderStateColors()}
    `}_renderStateColors(){const e=Array.isArray(this._config.state_colors)?this._config.state_colors:[];return a`
      <div class="options-header">
        <span>${n("e_state_colors",this.hass)}</span>
        <ha-icon-button @click=${this._addStateColor}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      ${e.map((e,t)=>a`
          <div class="option-card">
            <div class="option-header">
              <span>${this._stateLabel(e.state)||n("e_state_n",this.hass,{n:t+1})}</span>
              <ha-icon-button @click=${()=>this._removeStateColor(t)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="option-body">
              <ha-textfield
                .label=${n("e_state_csv",this.hass)}
                .value=${this._stateLabel(e.state)}
                @change=${e=>this._updateStateColor(t,"state",this._parseStateInput(e.target.value))}
              ></ha-textfield>
              <materia-color-picker
                .hass=${this.hass}
                .label=${n("e_background",this.hass)}
                .value=${e.color||""}
                @value-changed=${e=>{e.stopPropagation(),this._updateStateColor(t,"color",e.detail.value)}}
              ></materia-color-picker>
              <materia-color-picker
                .hass=${this.hass}
                .label=${n("e_text_icon",this.hass)}
                .value=${e.color_on||""}
                @value-changed=${e=>{e.stopPropagation(),this._updateStateColor(t,"color_on",e.detail.value)}}
              ></materia-color-picker>
            </div>
          </div>
        `)}
    `}_stateLabel(e){return Array.isArray(e)?e.join(", "):e||""}_parseStateInput(e){const t=(e||"").trim();return t.includes(",")?t.split(",").map(e=>e.trim()).filter(Boolean):t}_addStateColor(){const e=[...this._config.state_colors||[],{}];this._commit({...this._config,state_colors:e})}_removeStateColor(e){const t=[...this._config.state_colors||[]];t.splice(e,1);const n={...this._config};t.length?n.state_colors=t:delete n.state_colors,this._commit(n)}_updateStateColor(e,t,n){const a=(this._config.state_colors||[]).map(e=>({...e}));a[e]&&(""===n||null==n?delete a[e][t]:a[e][t]=n,this._commit({...this._config,state_colors:a}))}_addOption(){const e=[...this._config.options||[],{label:"",value:"",icon:""}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const n=[...this._config.options||[]],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:n})}_updateOptionForm(e,t){const n=[...this._config.options||[]];n[e]={...n[e],...t},this._commit({...this._config,options:n})}_toggleExpand(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-menu-editor",an);class on extends W{static properties={_expanded:{state:!0}};static styles=[W.styles,i`
      .opt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .opt-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .opt-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .opt-row span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .opt-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .opt-body ha-form {
        display: block;
        width: 100%;
      }
    `];setConfig(e){super.setConfig(e),this._expanded??=null}_formData(){return{variant:"tonal",size:"s",menu_position:"bottom-right",...this._config}}get _sections(){return[{title:"e_leadin_button",icon:"mdi:card-text-outline",fields:[{name:"icon",template:!0,selector:{icon:{}}},{name:"label",template:!0,selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{default_action:"more-info"}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"filled",label:"e_filled"},{value:"tonal",label:"e_tonal"},{value:"elevated",label:"e_elevated"},{value:"outlined",label:"e_outlined"}]}}},{name:"size",selector:{select:{mode:"dropdown",options:[{value:"xs",label:"e_extra_small"},{value:"s",label:"e_small"},{value:"m",label:"e_medium"},{value:"l",label:"e_large"},{value:"xl",label:"e_extra_large"}]}}},{name:"menu_position",label:"e_menu_alignm",selector:{select:{mode:"dropdown",options:[{value:"bottom-right",label:"e_below_right_aligne"},{value:"bottom-left",label:"e_below_left_aligne"},{value:"top-right",label:"e_above_right_aligne"},{value:"top-left",label:"e_above_left_aligne"}]}}},{name:"color",label:"e_background",color:!0,template:!0,selector:{text:{}}},{name:"color_on",label:"e_text_icon",color:!0,template:!0,selector:{text:{}}},{name:"wide",selector:{boolean:{}}},{name:"flex",label:n("ed_flex",this.hass),selector:{number:{min:0,max:12,step:.5,mode:"box"}}}]},{title:"e_disabled",icon:"mdi:cancel",expanded:!1,fields:[q]}]}_optionSchema(e){return[P(e?.icon)?{name:"icon",selector:{template:{}}}:{name:"icon",selector:{icon:{}}},{name:"label",selector:{text:{}}},{name:"tap_action",label:"sched_action",selector:{ui_action:{}}}]}_renderExtra(){const e=Array.isArray(this._config.options)?this._config.options:[];return a`
      <div class="opt-header">
        <span>${n("e_menu_options",this.hass)}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${T((e,t)=>this._moveOption(e,t),e.map((e,t)=>a`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${e.label||(e.icon&&!P(e.icon)?e.icon:n("e_option_n",this.hass,{n:t+1}))}</span>
                <ha-icon-button @click=${()=>this._toggleOption(t)}>
                  <ha-icon icon=${this._expanded===t?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${()=>this._removeOption(t)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded===t?a`
                    <div class="opt-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${e}
                        .schema=${s(this._optionSchema(e),this.hass)}
                        .computeLabel=${O}
                        @value-changed=${e=>this._optionChanged(t,e.detail.value)}
                      ></ha-form>
                    </div>
                  `:""}
            </div>
          `))}
    `}_addOption(){const e=[...this._config.options||[],{icon:"mdi:circle-outline"}];this._expanded=e.length-1,this._commit({...this._config,options:e})}_removeOption(e){const t=[...this._config.options||[]];t.splice(e,1),this._expanded===e&&(this._expanded=null),this._commit({...this._config,options:t})}_moveOption(e,t){const n=[...this._config.options||[]],[a]=n.splice(e,1);n.splice(t,0,a),this._expanded===e&&(this._expanded=t),this._commit({...this._config,options:n})}_optionChanged(e,t){const n=[...this._config.options||[]];n[e]={...n[e],...t},this._commit({...this._config,options:n})}_toggleOption(e){this._expanded=this._expanded===e?null:e}}customElements.define("materia-split-button-editor",on);customElements.define("materia-media-progress-editor",class extends W{_formData(){return{show_times:!0,seekable:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"default",label:"e_default"},{value:"player",label:"e_player_handle_drag"}]}}},{name:"show_times",selector:{boolean:{}}},{name:"seekable",selector:{boolean:{}}},{name:"live",label:"e_live_stream",helper:"e_keep_track_full",selector:{boolean:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"color",label:"e_wave_color",color:!0,template:!0,selector:{text:{}}}]}]}});customElements.define("materia-media-editor",class extends W{_formData(){return{show_art:!0,show_titles:!0,show_app:!0,live_logo:!0,...this._config}}get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"name",label:"e_title",template:!0,selector:{text:{}}},{name:"subtitle",template:!0,selector:{text:{}}},{name:"image",helper:"e_defaul_entity_s2",template:!0,selector:{text:{}}},{name:"fallback_image",helper:"e_shown_when_there",selector:{text:{}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"variant",selector:{select:{mode:"dropdown",options:[{value:"default",label:"e_defaul_centre_editor"},{value:"player",label:"e_player_expres_now"}]}}},{name:"show_art",selector:{boolean:{}}},{name:"art_size",label:"e_art_size_auto",selector:{select:{custom_value:!0,mode:"dropdown",options:[{value:"auto",label:"e_auto_fits_space"},{value:"fill",label:"e_fill_width"},{value:"240",label:"240 px"},{value:"320",label:"320 px"}]}}},{name:"art_max",label:"e_larges_art_size",selector:{number:{min:136,max:800,mode:"box"}}},{name:"show_titles",label:"e_title_row_player",selector:{boolean:{}}},{name:"show_app",label:"e_app_chip_player",selector:{boolean:{}}},{name:"live_logo",label:"e_live_radio_logo",selector:{boolean:{}}}]},{title:"e_actions",icon:"mdi:gesture-tap",fields:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}}]}]}});customElements.define("materia-clock-editor",class extends W{_formData(){return{hand_width:5,size:10,show_seconds:!0,numbers:"cardinal",...this._config}}get _sections(){return[{title:"e_clock",icon:"mdi:clock-outline",fields:[{name:"numbers",selector:{select:{mode:"dropdown",options:[{value:"cardinal",label:"e_cardin_12_3"},{value:"all",label:"e_all_1_12"},{value:"dots",label:"e_hour_dots"},{value:"none",label:"level_none"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"second_dot",label:"e_second_hand_as",selector:{boolean:{}}},{name:"smooth",label:"e_smooth_second_hand",selector:{boolean:{}}},{name:"cookie",label:"e_cookie_face_12",selector:{boolean:{}}},{name:"digital",label:"e_digita_readou_hh",selector:{boolean:{}}},{name:"date",label:"e_show_date",selector:{boolean:{}}},{name:"hand_width",label:"e_hand_thickn",selector:{number:{min:1,max:12,step:.5,mode:"slider"}}},{name:"size",label:"e_size_10_fill",selector:{number:{min:1,max:10,step:1,mode:"slider"}}}]},{title:"e_appearance",icon:"mdi:palette-outline",fields:[{name:"face_color",label:"e_face",color:!0,template:!0,selector:{text:{}}},{name:"number_color",label:"e_numbers",color:!0,template:!0,selector:{text:{}}},{name:"hand_color",label:"e_hands",color:!0,template:!0,selector:{text:{}}},{name:"second_color",label:"e_second_hand",color:!0,template:!0,selector:{text:{}}}]}]}});customElements.define("materia-volume-ring-editor",class extends W{get _sections(){return[{title:"e_content",icon:"mdi:card-text-outline",fields:[{name:"entity",label:"e_player_in_art",selector:{entity:{domain:"media_player"}}}]}]}});customElements.define("materia-media-source-editor",class extends W{get _sections(){return[{title:"e_content",icon:"mdi:import",fields:[{name:"entity",label:"e_player_in_art",selector:{entity:{domain:"media_player"}}},{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"cycle",label:"e_cycle_tap_next"},{value:"menu",label:"e_menu_pick_from"}]}}}]}]}});
