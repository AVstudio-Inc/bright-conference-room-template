# Working on Bright Conference Room

This is a native AVstudio NG conference-room UI, not an npm web app. The project marker
is `AVstudio UI/avstudio.config`; the start page is `pages/start.page`.

- Read README.md and docs/CRESTRON-JOIN-MAP.md first. Use the installed AVstudio data-model
  documentation/avstudio-guide skill for the entity being edited. Do not invent schema
  fields, preview commands, dependency versions or compatibility claims. If authoritative
  schema documentation is unavailable, ask before making uncertain schema changes.
- Preserve UUIDs, native JSON/JS formats, relative assets, theme/font files, global slots,
  datasource contexts and subpage input parameters. Containers cannot nest containers.
- Navigation/overlay references use `pages/` paths. `subpageName` may use `./` for same-folder
  or descendant targets. Check every affected reference after moves or renames.
- Keep source `joinValue` assignments stable. Multiple destinations can be selected.
  Native actions send hardware commands; feedback updates must not echo commands.
  routeSource.js is only a local demonstration; actual routing belongs to the controller.
- Preserve S201 then D212 for dialing, D213 hangup, D214 hold and the cancellable shutdown
  timer. Do not silently change join numbers, directions, pulse timing or controller behavior.
- Keep connection values in ignored `AVstudio UI/env/*.env`; commit only neutral examples.
  Never print or commit credentials. Builds may embed resolved credentials and are ignored.
- Check JSON validity, file references and affected bindings after changes. Use AVstudio
  diagnostics/build when available and the join-map acceptance checks for hardware.
  Automated tests are not included; distinguish file checks from real editor and hardware verification.
- Update English documentation alongside behavioral changes. Do not remove assets without
  checking page, theme, CSS and datasource references.
- Ask the owner before license selection, unresolved asset redistribution, publication,
  access changes, or incompatible join-contract changes. Confirm device details and target
  editor version when they cannot be established from the project. Do not publish builds.
