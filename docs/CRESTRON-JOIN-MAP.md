# Bright Conference Room — Crestron Integration Contract

**For the Crestron programmer.** This document lists the join numbers wired into the template.
New assignments define this project's integration contract; they do not confirm that the existing processor program implements it.

Directions are relative to the processor: **UI → CP** means a processor input; **CP → UI** means feedback.
D = digital, A = analog, S = serial. These are separate signal spaces: D301 and A301 are different signals.
Numeric join identifiers are stored as strings in AVstudio JSON. One control may use multiple signals; text, icons and local navigation do not require hardware joins.

## Implementation Rules

- All commands use the project's existing Crestron connector. Connection settings and credentials are excluded from this document.
- For PTZ directions, Zoom and Volume, the UI sends **1 on press and 0 on release**. Movement must stop at 0; the processor defines the centre/home behavior.
- Telephony and shutdown pulses last **100 ms**. Execute each request once, rather than on both edges.
- Display selection D101–103 and display power D110 carry **states**, not pulses.
- Analog commands carry absolute values. Repeated writes of the same value must reapply the request; do not rely solely on a numeric value-change event.
- Local indication updates immediately. Processor feedback subsequently corrects the state. Feedback handlers do not echo commands back to the processor.
- Selecting a destination does not route a source. Clicking a source sends A100. The processor must route that source to every destination selected through D101–103 and return actual routes on A111–113. A111–113 are feedback-only.
- Destination Power does not clear the UI's stored routes. The processor handles physical display power.

## Digital Joins

| Join | UI → CP | CP → UI |
|---|---|---|
| D51 | PTZ left, momentary | — |
| D52 | PTZ right, momentary | — |
| D53 | PTZ up, momentary | — |
| D54 | PTZ down, momentary | — |
| D55 | PTZ centre/home, momentary | — |
| D56 | Zoom out, momentary | — |
| D57 | Zoom in, momentary | — |
| D101 | Destination A selected, boolean | Confirmed selection of A |
| D102 | Destination B selected, boolean | Confirmed selection of B |
| D103 | Destination C selected, boolean | Confirmed selection of C |
| D110 | Display power, boolean | State of the shared display-power switch |
| D212 | Dial, pulse after the complete number has been transmitted | — |
| D213 | Hang up, pulse | — |
| D214 | Hold/pause, pulse | — |
| D301 | Volume up, momentary | Speaker mute: 1 = muted |
| D302 | Volume down, momentary | — |
| D303 | Speaker mute request, momentary | — |
| D304 | — | Microphone mute: 1 = muted |
| D306 | Microphone mute request, momentary | — |
| D307 | Shutdown request, pulse on End session or when the 10 s countdown expires | — |
| D308 | — | System power: 1 = room on |

**Important:** D301 UI→CP means volume up, while D301 CP→UI means speaker mute. This preserves the existing project mapping. D303 is not speaker-mute feedback. D306 is not microphone-mute feedback.

## Analog Joins

| Join | UI → CP | CP → UI | Range |
|---|---|---|---|
| A100 | Route source to all selected destinations | Last selected source | 0–7 |
| A111 | — | Actual source on display A | 0–7 |
| A112 | — | Actual source on display B | 0–7 |
| A113 | — | Actual source on display C | 0–7 |
| A120 | Video-conference content source | Actual content source | 0–7 |
| A151 | Select camera | Actual selected camera | 0–4 |
| A152 | Recall preset on the current camera | Current preset | 0–3 |
| A301 | — | Volume percentage | **0–100**, without 0–65535 scaling |

The UI sends source values 1–7, camera values 1–4 and preset values 1–3. Feedback value 0 means no selection or no source. D-pad and Zoom control the camera selected through A151. When the camera changes, the processor must return the appropriate A152 value, including 0 when no preset is active.

### Source Identifiers

| Value | Datasource ID | Label |
|---|---|---|
| 0 | Empty string | No source |
| 1 | pc | PC |
| 2 | laptop | Laptop |
| 3 | mobile | Mobile |
| 4 | playstation | Play Station |
| 5 | computer | Computer |
| 6 | gamepad | Gamepad |
| 7 | chromecast | Chromecast |

The source of truth is the `joinValue` field in `AVstudio UI/datasources/sources.json`. Row order is not part of the contract: preserve the explicit `joinValue` assignments.

## Serial Joins

| Join | UI → CP | CP → UI | Value |
|---|---|---|---|
| S201 | Complete number to dial | Phone number shown in the input field | Number string |
| S202 | — | Call status | Status text displayed on Settings |

### Dialing Protocol

1. Selecting a contact only fills the number field. Keypad and input edits remain local.
2. The green phone button executes ordered native actions: send the complete field through **S201**, then pulse **D212** for 100 ms. There is no per-digit sequence or artificial delay.
3. The processor must latch S201 before handling D212, validate/normalize the number (including empty input, formatting and supported international prefixes), and initiate the call. The UI sends the field unchanged; it does not filter input or block repeated Dial presses. The processor owns duplicate-request handling and call state.
4. The red button pulses **D213** for 100 ms and clears the local field. The processor cancels any pending dialing and ends the call. Hold pulses **D214** for 100 ms.
5. S201 is bidirectional: outbound dial number and inbound displayed number. Do not continuously echo an old value over local editing. S202 reports actual call status in Settings.

### Controller Routing and Demonstration Preview

`routeSource.js` only previews source labels/icons on locally selected displays. It sends no joins and performs no equipment routing. Native source-card actions send A100 (Presentation) or A120 (conference content). The Crestron programmer must implement all switching, selection initialization and feedback in the controller. A111–113 feedback replaces the preview and is authoritative for actual routes.

The UI initially selects A and C. The controller must initialize and report D101–103 consistently (A=true, B=false, C=true), or return its own authoritative selection. Local defaults alone do not send startup commands. When A100 repeats the same value, process it as a new routing request so newly selected displays can receive the same source.

## Local-Only Behavior

- Home, Help, Settings and navigation between activities.
- Contact selection, number editing and list scrolling.
- The Settings room-name field (`roomDisplayName`): local to the current session; resets on reload.
- Source icons, text and labels: derived from source IDs rather than assigned separate joins.
- Highlighting before feedback arrives: optimistic indication, not confirmation of equipment operation.

## Implementation Files

- `AVstudio UI/global.variables` — all external feedback bindings.
- `AVstudio UI/functions/crestron/` — analog-feedback conversion.
- `AVstudio UI/functions/presentation/routeSource.js` — demonstration-only local source preview; no outbound joins.
- `AVstudio UI/pages/audio/call-actions.page` — native S201 and D212–214 actions.
- `AVstudio UI/pages/components/source-card.page` — native A100/A120 source requests.
- `AVstudio UI/pages/presentation/destination-display.page` — native D101–103 selection states.
- `AVstudio UI/pages/video/` — A151/A152 and D51–57.
- `AVstudio UI/pages/components/shutdown-confirmation.page` and `AVstudio UI/functions/system/shutdownCountdown.js` — D307 and the cancellable 10 s countdown.

## Acceptance Checks with the Actual Processor

- Set A301 to 0/50/100: the UI percentage must match. D301/D304 feedback must update mute indication.
- Press and release Volume/PTZ/Zoom: verify the correct 1/0 transitions.
- Select A and C: verify D101=true, D102=false, D103=true at the controller. Click Laptop: A100=2. The controller must route A/C, leave B unchanged, and return A111=2/A113=2. Repeat Laptop after changing selection; verify routing runs again.
- Select camera 2: A151 = 2. Recall preset 3: A152 = 3. Verify selection feedback.
- Dial an agreed test number; verify the complete S201 arrives before D212 and no per-digit commands are sent. Verify processor validation, duplicate handling, D213 cancellation/hangup and D214 hold.
- Cancel, closing the window or clicking outside must cancel the timer without sending D307. End session or expiry of the 10 s countdown must send exactly one pulse and close the window. D308 must reflect room power.

Project builds and automated tests do not replace these acceptance checks: the actual equipment and processor program have not been verified here.
