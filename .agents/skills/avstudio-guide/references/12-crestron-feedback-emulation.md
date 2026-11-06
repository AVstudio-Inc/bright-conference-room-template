# 12 — Crestron feedback emulation (browser console)

> **FOR CRESTRON** — the sections below apply only to crestron connectors. MQTT has its
> own flow — see "MQTT topics (DevTools → MQTT tab)" at the end; web/websocket/amx/knx
> have no emulation.

`window.CrComLib` exists only in the running webview / Live Preview — it is defined when
the `useCrestron` module is loaded (`webviews/packages/ui/src/hooks/useCrestron/useCrestron.tsx`)
and typically only after a crestron connector becomes active. It is **not** available in a
plain script context unless that module has been imported.

Inspect what is actually exposed:

```js
Object.keys(window.CrComLib)
```

## Emulate Crestron → UI feedback (inject a signal into live hooks)

These mirror the signal coming **from** the native processor into the running UI (digital /
analog / serial). Existing `useSubscribe*` hooks and the crestron driver's `subscribe()` /
`read()` pick the value up immediately.

```js
window.CrComLib.bridgeReceiveBooleanFromNative('1', true)    // boolean / digital
window.CrComLib.bridgeReceiveIntegerFromNative('1', 5)       // number / analog
window.CrComLib.bridgeReceiveStringFromNative('1', 'hello')  // string / serial
```

## UI → Crestron (send to the native side)

```js
window.CrComLib.publishEvent('boolean', '1', true)
```

## Read / subscribe

```js
window.CrComLib.getState('boolean', '1')                                    // current value
window.CrComLib.subscribeState('boolean', '1', (v) => console.log(v))       // live updates
```

## Emulate from the AVStudio DevTools panel

The extension ships an **AVStudio DevTools** Chrome DevTools panel whose **Crestron
Feedbacks** tab carries a collapsed **Crestron Emulation** accordion at the top — a form
that calls the same `bridgeReceive*FromNative` bridge without typing console commands:
pick the signal type (Digital / Analog / Serial), enter the join and the value, and send.
Use it for a repeatable, click-through way to inject test signals; the console calls above
remain the scriptable equivalent.

## Inspect live feedbacks (AVStudio DevTools → Crestron tab)

The same panel has a **Crestron** tab — a live table of every Crestron signal the
running page has touched (subscribed by the driver / hooks, read, published, or emulated):
join, signal type (Digital / Analog / Serial), current value, previous value, and a panel-
observed **Last Update** timestamp plus a `changed` badge (`hasChangedSinceInit()`). Filters:
by join text, by type, and by "updated within" window (10s / 1m / 5m); auto-refresh polls
about once a second while the tab is open.

The data is read from the library's signal map — `CrComLib.Ch5SignalFactory.getInstance()
.getStates()` — which is exported but **undocumented**; access is defensive and shows an
error instead of throwing on other library versions. Two consequences to keep in mind:

- "Touched" is wider than "currently subscribed": a signal stays in the map after
  `unsubscribeState` (until the page reloads).
- **Last Update** is tracked by the panel itself between polls (the library keeps no
  timestamps), so it only covers the time the panel has been open; the first sighting of
  a signal counts as its update moment.
- Numeric joins are stored internally as `fb<join>` (the library's
  `getSubscriptionSignalName` normalization — applied by `subscribeState`, `getState` and
  `bridgeReceive*FromNative` alike). The tab displays the bare join number; a raw
  `getStates()` dump from the console lists the internal names.
- The pencil icon in the **Value** column opens a small emulate dialog for that exact
  signal — join and type are taken from the row (sent to the bridge as the row's internal
  signal name), only the value is editable. On success the dialog closes and the row
  updates immediately.

The equivalent console one-liner, if the panel is not at hand:

```js
CrComLib.Ch5SignalFactory.getInstance().getStates()
```


## Bind a property directly to a join (external feedback token)

Instead of creating a variable with an external setter, a render property can bind straight
to a crestron join with `!crestron:type=<boolean|number|string>;name=<join>!` (see
06 §External feedback tokens). `name` is a join number or a text signal name, and may embed
`$`/`%`/`#ds` tokens (including item-relative `#ds:*.<path>#`) for dynamic joins. The same
`window.CrComLib.bridgeReceive*FromNative` calls above drive those tokens in Live
Preview / production; in the editor they render empty (or the token's `default` when set).

```jsonc
"background": { "color": "!crestron:type=string;name=RoomName!" }
```

Usage patterns — direct property, dynamic join, through a subpage parameter, as a mode
selector, and rich-text tags (`<digital_fb>` / `<analog_fb>` / `<serial_fb>`) — are
collected in `06 §External feedback tokens` (§Feedback through parameters, §Feedback as a
mode selector, §Tokens).

## MQTT topics (DevTools → MQTT tab)

The MQTT driver keeps its own topic registry — every topic the running page subscribed to
(MQTT Feedback tokens `!mqtt:...!` and variables with an MQTT external setter) plus the
last payload delivered to it. The DevTools panel's **MQTT** tab shows that registry
live: connector, topic, current value, previous value, subscriber count and the
last-update time; auto-refresh polls about once a second while the tab is open, with a
topic/connector filter.

**Inject a value (no broker needed):** the pencil icon in the **Value** column opens an
inject dialog for that exact topic. The value is delivered **locally** — the driver stores
it and notifies the topic's listeners, nothing is published to the broker (the same
"emulate without hardware" idea as the Crestron signals above). An injection is **not
retained**: a listener subscribing later does not receive past injections; use a real
retained publish (an action) for that.

Console equivalents:

```js
window.__AVSTUDIO_DEVTOOLS__.getMqttTopics()                       // the live table
window.__AVSTUDIO_DEVTOOLS__.emulateMqtt('connectors/broker.mqtt', 'home/lamp', 'on')
```

`emulateMqtt` injects only; a real publish goes through an mqtt action (or
`driver.write`), which sends to the broker over the live connection.

## Pitfalls

- `receiveStateChange` does **not** exist — neither in this codebase nor in
  `@crestron/ch5-crcomlib`. Calling it throws `TypeError: ... is not a function`
  (or, if typed as a bare name, `ReferenceError: X is not defined`).
- Always use the `window.` prefix; a bare `CrComLib` identifier throws
  `ReferenceError: CrComLib is not defined`.
- Works only where `useCrestron` is loaded and a crestron connector is active in the
  running project.
