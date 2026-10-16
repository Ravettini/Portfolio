# Startup and window controls — final review

## Reported closing defect

Reproduced on the previous production implementation: an inactive welcome window remained open after one close click. Pointerdown/focus-capture activation moved its DOM position before click completed. Excluding window controls from pre-click activation and avoiding redundant frontmost reordering fixes the cause. Tests now close inactive welcome/project windows on the first click and close by keyboard and touch.

## User-requested startup

Brief boot animation, skippable loading, Visitante user selection, desktop entrance, per-tab session resume, change-user without losing mounted applications, and restart with reset windows. No authentication or password is required. Hidden desktop is inert while entry screens are displayed.

## Validation

- Standalone TypeScript check passed.
- Final production compilation passed, served locally on port 3001.
- Existing desktop suite: 40 passing checks, no runtime exceptions.
- Final session suite: 18 passing checks, including the closing regression and immediate reduced-motion synchronization through restart without reload.
- Production captures: boot.png, login-desktop.png, login-mobile.png, desktop-session.png.
- Mechanical detector ran once for this extension; findings were advisory additions to the documented boot palette/type ramp, which are now recorded in DESIGN.md and the synchronized sidecar. Detector was not rerun.
- Fresh independent reviewer: ship for this scoped change; its reduced-motion finding scored resolved after the callback fix.

The prior full-redesign CLI phase runner remains at plates; this scoped review and the passing application build do not certify those outstanding CLI phases.
