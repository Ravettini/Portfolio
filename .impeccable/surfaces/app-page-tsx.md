---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/os.css","app/boot.css","app/utilities.css","components/desktop/desktop.tsx","components/desktop/operating-system.tsx","components/desktop/utilities-apps.tsx","lib/desktop-grid.ts"]
---

# Desktop portfolio

Mode: Experience. Approved reference: `.impeccable/mocks/desktop-apps-small.png`. User approved implementation after requesting 48px desktop project applications in columns at the left.

## Direction contract

THESIS: The portfolio is an explorable personal desktop. Real projects are installed applications, not marketing cards.

OWN-WORLD: Ocean-blue folded-wave wallpaper, soft ivory windows, precise blue actions, compact app icons, translucent menu and dock. Real screenshots replace synthetic preview content. Lucide vectors for app pictograms.

STORY: Meet Ignacio, open software projects, read real case studies, download the CV and make contact. No fictitious profile photo or metrics.

FIRST VIEWPORT: Nine 48px project icons in two left columns; welcome Notes window upper-right; Acreditapp window lower-right; open center and utility dock bottom-center. Windows drag, minimize, maximize and restore. Mobile keeps app launchers and presents active windows as legible sheets.

FORM: User-pinned macOS desktop overrides concept assignment; seed reference unavailable (only raw key reported). Approved in chat. Signature interaction is opening projects from desktop icons into independent windows.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Live project browser extension

The user approved interactive demos inside project windows. Five sanitized demos open maximized, edge-to-edge beneath the system menu, with one 56px unified macOS-style titlebar containing traffic lights, hostname, project toggle, reload and new-tab action. The green control restores a draggable floating browser without remounting the iframe. Project details retain the case-study link. Mobile omits the hostname and keeps 44px toolbar targets in the same single row. View switching and minimizing preserve navigation and forms; closing removes the iframe. Other projects and full case studies retain their presentation. Captures in `.impeccable/review/project-browser-desktop.png` and `project-browser-mobile.png` document the actual result.

## Startup and window-control extension

User requested a PC-style boot animation and user selection, retaining the approved desktop world. The first visit in a tab now shows a brief IR boot mark/progress, then a password-free Visitante selection over the existing blue wallpaper, then a bounded desktop entrance. Returning from a case study or reloading within the tab resumes the session. The system menu provides Cambiar usuario (retains mounted apps) and Reiniciar sistema (resets windows and replays boot). Motion reduction shortens delays and removes spatial animation; boot can also be skipped. No real authentication is implied.

The reported closing bug was reproduced on inactive windows: focus/z-order changes before click canceled the control action. Control targets are excluded from pre-click activation, and already-frontmost windows no longer reorder. Regression checks exercise inactive close on first click, keyboard close, and touch close.

## Latest screenshot-led refinements

The user's later screenshots replace the original two-window first viewport: the desktop now opens with ONLY the welcome note, centered at 492px width; Acreditapp opens only when requested. The screenshot's pinned macOS appearance remains intact.

Desktop app launchers can be dragged, retain their positions in local storage, support Alt plus arrow keys, and reset through Ordenar escritorio. Maximized windows reclaim the dock's old bottom reservation; the dock stays hidden until the lower edge is hovered, tapped, or swiped upward, or keyboard focus enters it. Revealed dock uses a darker blue surface over white apps. Maximized project content is capped at 1160px. Floating dock tooltips require a three-second pointer dwell independently of reduced-motion preferences; keyboard hints remain immediate. The stable CV URL now serves the user's replacement PDF with binary integrity verified. The original PDF has a private workspace backup.

## Fixed-grid correction

The user clarified that desktop launchers must occupy predefined slots and never overlap each other. This replaces free pixel placement: drag, keyboard movement, saved-layout migration and viewport resize all resolve against the same collision-free 109×105px grid. Occupied icons stay put; the moved icon selects a nearest free cell. Existing overlapping saved coordinates are repaired automatically on reload. Alt+arrows moves one slot and Shift moves three, skipping occupied cells in that direction.

## Release-only snapping and multiselection

The user clarified the gesture further: while holding the pointer, the dragged icon follows freely. Only release commits a free grid slot. This supersedes the earlier per-move snapping implementation. Transient preview positions never enter persisted layout, and Escape/cancel discards them. Dragging empty wallpaper draws a blue marquee to select multiple launchers. Ctrl/Cmd+click or Ctrl/Cmd+Space toggles selection; selected launchers can move together and snap without collisions, preserving their formation where space permits. Ordinary single-click opening remains available.


## Functional OS utilities

User requested real OS-style applications. Add a tenth desktop launcher, Utilidades, containing Paint (brush, eraser, color/width, bounded undo/redo, PNG download), keyboard calculator, locally saved Notepad with TXT download, and Buenos Aires clock with stopwatch and laps. Reuse established windows and icon system; preserve nine project launchers and portfolio goal. Utility windows retain state when minimized.


### Resizable floating windows

Desktop windows expose invisible pointer targets along all four edges and corners, with directional cursors and visible keyboard focus. Dragging changes the selected edges while opposite edges remain anchored; arrow keys move a focused edge by 10px, or 40px with Shift. Minimum dimensions are 320?220px (480px wide for embedded demo browsers). Windows remain within the workspace below the system menu and adapt when the viewport shrinks. Escape or pointer cancellation restores the previous geometry. Resizing retains mounted app and iframe state. Maximizing hides edge targets; restoring returns to the chosen size and position. Mobile retains its full-width application sheets. Verified screenshots and interaction evidence are in `.impeccable/review/window-resize-*`.
