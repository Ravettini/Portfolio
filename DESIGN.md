---
name: ravettiniOS
description: A personal portfolio explored as a macOS-inspired desktop.
colors:
  action-blue: "#0757ed"
  action-blue-hover: "#064bcf"
  ink: "#182238"
  muted: "#56617a"
  surface: "#fafafa"
  chrome: "#eeeff2"
  line: "#dce0e8"
  soft: "#edf1f8"
  wallpaper-base: "#082058"
  focus: "#3287ff"
  white: "#fff"
  dark-ink: "#eef3ff"
  dark-muted: "#b0bed7"
  dark-surface: "#1a2233"
  dark-chrome: "#242e40"
  dark-line: "#3b4558"
  dark-soft: "#27344d"
  boot-background: "#06142c"
  boot-text: "#f2f6ff"
  boot-accent: "#7bb7ff"
  boot-progress-track: "#293c5d"
  boot-progress-fill: "#d7e8ff"
  boot-status: "#b0c3e1"
  boot-signature: "#9cb2d5"
  session-focus: "#c6dfff"
  login-overlay: "#02132b4d"
  login-topbar: "#dceaff"
  login-date: "#e0ebff"
  login-intro: "#d0dfff"
  login-avatar: "#dbeaff29"
  login-avatar-ink: "#eef5ff"
  login-avatar-hover: "#edf5ff3b"
  login-description: "#dce8ff"
  login-enter: "#e6f0ff20"
  immersive-dock: "#15386be6"
  dock-reveal-handle: "#8c98b0"
  selection-fill: "#2b85ef35"
  selection-border: "#70b5ff"
  paint-green: "#19a974"
  paint-amber: "#f0a629"
  paint-coral: "#e64c65"
  paint-violet: "#8b5cdb"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, var(--font-sans), sans-serif'
    fontSize: "clamp(25px, 2.15vw, 34px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  maximized-project-title:
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, var(--font-sans), sans-serif'
    fontSize: "13px"
    lineHeight: 1.55
  launcher-label:
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.35
  terminal:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "12px"
    lineHeight: 1.8
  boot-monogram:
    fontSize: "83px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  boot-title:
    fontSize: "18px"
    fontWeight: 600
    letterSpacing: "-0.02em"
  login-clock:
    fontSize: "clamp(57px, 6.3vw, 91px)"
    fontWeight: 350
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  login-heading:
    fontSize: "22px"
    fontWeight: 550
    letterSpacing: "-0.025em"
  login-user-name:
    fontSize: "16px"
    fontWeight: 600
  calculator-output:
    fontSize: "38px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.035em"
  utility-clock:
    fontSize: "51px"
    fontWeight: 350
    lineHeight: 1.3
    letterSpacing: "-0.035em"
  stopwatch-output:
    fontSize: "45px"
    letterSpacing: "-0.035em"
  notepad-text:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "13px"
    lineHeight: 1.9
rounded:
  chip: "4px"
  utility-key: "8px"
  utility-tool: "5px"
  button: "6px"
  gallery: "7px"
  window: "12px"
  case-window: "13px"
  dock: "19px"
  boot-progress: "3px"
  login-user: "15px"
  avatar: "50%"
spacing:
  compact: "7px"
  control-x: "13px"
  control-y: "9px"
  window-x: "18px"
  contact: "30px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "9px 13px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-hover}"
  button-secondary:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "9px 13px"
  app-icon:
    rounded: "{rounded.window}"
    width: "48px"
    height: "48px"
  window:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
  technology-chip:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.chip}"
    padding: "3px 7px"
  calculator-key:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.utility-key}"
    height: "48px"
  calculator-equals:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.utility-key}"
    height: "48px"
  notepad-editor:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "23px"
  selection-box:
    backgroundColor: "{colors.selection-fill}"
  welcome-window:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
    width: "492px"
  maximized-project:
    padding: "28px 32px"
  immersive-dock:
    backgroundColor: "{colors.immersive-dock}"
    rounded: "{rounded.dock}"
  login-user:
    rounded: "{rounded.login-user}"
    padding: "10px 26px"
  login-avatar:
    backgroundColor: "{colors.login-avatar}"
    textColor: "{colors.login-avatar-ink}"
    rounded: "{rounded.avatar}"
    width: "90px"
    height: "90px"
  boot-progress:
    backgroundColor: "{colors.boot-progress-track}"
    rounded: "{rounded.boot-progress}"
    width: "166px"
    height: "3px"
---

# Design System: ravettiniOS

## Overview

**Creative North Star: "The personal desktop"**

The portfolio is a clean, explorable desktop inspired by macOS. Ocean-blue folded waves provide room around compact project applications and softly elevated windows. The user explicitly replaced the earlier editorial direction in `idea.md`; the approved reference is `.impeccable/mocks/desktop-apps-small.png`.

Real project screenshots, semantic vector pictograms and native-style controls carry the experience. The interface stays compact while keeping projects, professional information, CV and contact accessible through windows, search and the dock.

A brief first-PC-style boot sequence leads to a password-free Visitante selection before the desktop. It extends the same blue world with a dark startup surface, a pale monogram and a blurred version of the existing ocean wallpaper. Returning within the same browser tab resumes the desktop.

**Key Characteristics:**
- Ocean-blue wallpaper and light application surfaces.
- Compact project launchers with meaningful icons.
- Independent windows with familiar title bars and traffic-light controls.
- Responsive sheets and visible keyboard focus.
- A short boot sequence and one clear visitor entry point.

## Colors

### Primary

Action blue identifies primary actions, links, active settings and selected menu items. Its darker hover token gives buttons a clear response.

The marquee uses translucent selection-fill and a light selection-border stroke so the wallpaper and icons remain visible beneath it.

The revealed dock in maximized mode uses the immersive-dock token for a more opaque blue tray. The lower-edge reveal handle uses its muted dock-reveal-handle token.

### Neutral

Ink and muted text sit on a near-white surface. Chrome distinguishes window headers; line divides content; soft supports secondary buttons, tabs and technology chips. White launcher labels sit over the blue wallpaper with a small text shadow.

Dark appearance replaces the six neutral roles with their dark tokens. Action blue remains shared. Medianoche darkens the existing wallpaper with a multiply blend over `#031025`.

Paint adds a tool-specific drawing palette: ink, white, action blue and the four paint color tokens. These are selectable drawing colors, not additional global action roles; a custom color picker also accepts user colors. Utility interfaces reuse the established surface, ink, muted, chrome, line, soft and action tokens.

Project icon gradients use the existing blue, violet, green, amber, coral, teal, slate, sky, paper and terminal variants in `app/os.css`; each identifies an application rather than changing the surface palette.

Boot uses the dark startup background, pale boot text, a blue monogram accent and a slim progress track/fill. Login layers a translucent dark overlay over the ocean wallpaper. Its translucent circular avatar, pale text and entry affordance preserve the existing blue atmosphere; session focus uses a lighter outline for contrast on those dark surfaces. These are additions to the desktop palette.

## Typography

The desktop and case pages prefer the platform system font. `var(--font-sans)` resolves to the existing Plus Jakarta Sans loaded in `app/layout.tsx`, followed by sans-serif. Terminal content uses its own monospace stack.

The display role belongs to the welcome heading. Project titles use the title role; window titles are centered labels (11px, weight 600). Body copy scales by context: project previews use 11px, full case paragraphs use 14px and a line height of 1.9, with a reading width of 75ch. Mobile increases preview summaries to 12px. Launcher labels become 10px on mobile.

Boot and login inherit the same system-font stack. The monogram is a large, tight mark; the clock uses light tabular numerals. Boot title, login heading and visitor name use their extracted frontmatter roles. Up to 600px the monogram becomes 68px and the clock 64px; at heights up to 650px the clock becomes 45px.

Calculator and clock displays use large tabular numerals with the utility roles in the frontmatter. Clock and stopwatch outputs become 43px and 38px respectively on mobile. The Notepad editor uses a 13px monospace face with a 1.9 line height; utility toolbars and status rows stay compact (10–12px).

## Layout

The desktop fills the viewport with a translucent menu bar above and a centered utility dock below. Ten launchers, comprising nine projects and the Utilidades folder, occupy deterministic grid slots from the far left. The grid starts at x=23px and y=round(height ? 0.1) for heights up to 800px, or y=round(height ? 0.117) above that, treating height as at least 580px. Slot pitch is 109px horizontally and 105px vertically. Available rows and columns fit the usable space above the dock; the default fills up to five rows per column, usually producing two columns, with additional columns when fewer rows fit. Each pictogram is 48px inside a larger 94px launcher target. The user’s later screenshots replace the earlier two-window first viewport: initial and reset desktop state opens only the welcome Notes window, centered at a width of 492px (`right: calc(50% - 246px)`, `top: calc(50% - 185px)`). Projects open on demand. Committed desktop launcher positions use absolute coordinates restricted to these grid slots; the held drag preview follows the pointer freely before release; the navigation covers the workspace with pointer events disabled on its empty area and enabled on icon buttons.

At widths up to 900px, the desktop scrolls, introduces the owner above the launchers and changes to three columns. Windows become fixed sheets between menu and dock, inset 52px from the top, 12px horizontally and 119px from the bottom. Mobile retains the icon-first layout and starts or resets with no open windows. When any visible window is maximized, the dock hides and the window extends to 12px above the desktop bottom or 16px on mobile. Short desktop viewports fit fewer launcher rows while preserving the fixed slot pitch and use a more compact dock. Full case pages use a centered window up to 1100px wide; process columns become a single column on mobile.

Maximized project content is centered at up to 1160px wide on desktop, with 28px vertical and 32px horizontal padding, a 28px title and a 13px summary.

Startup centers its mark and progress bar. Login stacks the Buenos Aires clock/date, visitor choice and footer actions vertically. At widths up to 600px, footer and top-bar padding tighten; short viewports reduce avatar size from 90px to 63px and compress vertical spacing. The desktop remains mounted, hidden and inert until entry completes.

The Utilidades folder presents four tools in four columns, changing to two columns up to 900px. All tools open in the established native-style windows and mobile sheets. Paint scales a 960×600 canvas responsively; maximized Paint and Notepad content cap at 1100px. Maximized calculator remains 320px wide, and clock content caps at 470px.

## Elevation & Depth

Shadows distinguish overlapping windows from wallpaper. Active windows deepen their shadow; menu and dock use translucent fills with blur and saturation. Icons combine colored gradients, inset highlights and a small cast shadow. Screenshots remain real images inside clipped galleries.

The sidecar records exact window, active-window, dock and search shadows. Window opening uses a brief opacity, scale and translation animation (0.28s). Dock icons rise on hover. Both the operating-system reduced-motion preference and the in-app setting remove animations and transitions.

Startup mark arrival and desktop arrival use 650ms easing; the progress fill runs for 1700ms. Login fades in over 500ms and entry confirms over 650ms. Normal phase delays are 1700ms for boot and 650ms for entering; System/local reduced-motion preference uses 100ms delays and disables animation; changing the in-app setting immediately updates startup and login without a reload. Login blurs the wallpaper by 14px with 85% saturation. Avatar hover strengthens its inset outline.

## Shapes

Windows and application icons share the window radius. Controls have smaller rounded corners; chips are tighter. Traffic-light dots are circular within larger interactive buttons: desktop targets are 24×28px and mobile targets are 28×32px. The dock is a rounded translucent tray. Case windows use a slightly larger radius than desktop windows.

The startup progress bar is a thin rounded track. Login uses a circular avatar within a rounded visitor button, with a smaller rounded entry affordance. Its focus outline is 2px with a 7px offset.

## Components

### Buttons

Primary buttons use action blue and white text; secondary buttons use soft and ink. Both have compact padding and a minimum height of 34px, with context-specific project action sizing. Primary hover uses the hover token; secondary hover reduces brightness. Focus-visible uses a 3px focus-colored outline offset by 4px. The terminal input instead shows a green underline when focused; the search input belongs to the enclosing search interface.

### Project launchers

Each project is a real button with an accessible label and a semantic Lucide SVG pictogram. The decorative icon is hidden from assistive technology. The visible label stays below it. Hover adds a translucent tile; pressing darkens the icon. Symbols represent applications: a badge for Acreditapp, Sigma for SIGMA, people for HR and a stethoscope for dermatology.

All ten desktop launchers are draggable using pointer capture and a 6px movement threshold. The latest user clarification supersedes snapping on every move: while held, icons follow the pointer freely through an ephemeral preview, including passing over other icons. Committed positions and storage stay unchanged during the drag. Only pointer release commits a grid placement in free slots, excluding the moving icons themselves from occupancy and leaving other icons unchanged. Committed icons never share a slot. Pointer cancellation or Escape discards the preview. Positions persist in local storage under `ravettini-os-icon-positions`. Existing arbitrary or overlapping saved positions and viewport resizes normalize to unique bounded cells. A drag does not open its project. Alt plus arrow keys moves one slot in that direction, or three slots with Shift, skipping occupied cells along the movement direction. Ordenar escritorio restores default slots and the initial window state. Mobile retains its grid. The shared logic lives in `lib/desktop-grid.ts`.

A left-pointer drag over empty desktop draws a blue marquee and selects intersecting 94px launcher targets. Ctrl/Cmd-click toggles membership without opening an application; Ctrl/Cmd-Space provides the keyboard equivalent. Escape clears selection; an empty marquee clears it too. Windows, menus, dock and buttons are excluded from marquee initiation. A normal single click still opens a project.

Dragging an already selected icon moves the selected group. On release, the group keeps its formation when a free bounded grid translation fits; otherwise its members take nearest free slots individually. Preview opacity is 0.85 and the launcher layer rises to z-index 135 while dragging. The selection rectangle uses selection-fill, a 1px selection-border stroke, z-index 10 and no pointer events.

### Windows

Native-style chrome contains labeled close, minimize and maximize buttons. Desktop title bars support dragging; activating a window raises it. Minimize hides the mounted window, preserving local state, and restore returns it. Close removes the window, including when its window is inactive; traffic-light control interactions do not trigger competing window focus or stacking changes. Mobile uses fixed sheets. Focus moves into opened windows and returns to a relevant launcher after closing or minimizing.

### Navigation and search

The menu exposes application actions; the dock opens profile, contact, terminal, CV and settings. Running apps have a small dot. Search presents an input and compact icon-led results in a modal dialog, with keyboard focus containment and Escape dismissal. The desktop includes a skip link.

When a visible window is maximized, the dock withdraws below the screen. A lower-center reveal zone (260px wide and 18px high) responds to pointer entry, tap or an upward touch gesture. The revealed dock hides 450ms after pointer leave, with a 2500ms reveal fallback; pointer entry into the dock cancels the fallback. Keyboard focus within the dock also reveals it. Its reveal transition uses 220ms transform easing and 160ms opacity easing, disabled by reduced motion.

Floating dock tooltips appear after 3000ms of pointer dwell and clear immediately on leave. The delay remains three seconds with reduced motion; keyboard focus-visible shows them immediately. This behavior is controlled by JavaScript, rather than a long CSS hover delay.

### Project content and chips

`lib/projects.ts` supplies the original nine projects. Windows show category, summary, real screenshot galleries, technology chips and links to live sites or available case studies. Full case routes reuse the project surface and existing metadata, problem, solution, process and results fields.

The CV keeps the stable public URL `/cv-ignacio-ravettini.pdf` and now serves the exact replacement PDF supplied by the user. Its content is not reinterpreted by this design system.

### Interactive project browsers

The five sanitized demo projects open directly in a browser window. The existing macOS title bar remains; a second chrome row provides Demo/Proyecto view buttons, the real demo hostname, reload from the entry route, a new-tab link and the case-study link. The demo is a live cross-origin iframe, not a raster scaled to the window. Switching to Proyecto keeps that iframe mounted so navigation and form state survive. Closing removes it; minimizing preserves it. At desktop sizes, the initial browser is up to 1100px wide with space reserved for the menu and dock; maximizing fills the existing window frame. Mobile uses the existing sheet, 44px controls and a separate address row.

Only configured public demo URLs are embedded. The sandbox allows scripts, same-origin storage, forms, downloads and popups, with top navigation restricted. A neutral loading surface becomes a nonblocking retry/new-tab notice after 12 seconds. Other projects retain their screenshot presentation, and full case-study routes retain their original content. Gallery sizes now account for maximized windows, with image quality 90. Browser screenshots in `.impeccable/review/project-browser-desktop.png` and `project-browser-mobile.png` are Playwright captures of the actual portfolio and synthetic-data demo, not generated imagery.

Clicking inside a background demo brings its OS window forward. The desktop observes the focused iframe while focus is inside embedded content, including direct switches between frames; observation stops when focus returns to the parent or the page becomes hidden.

### Appearance settings

Settings offer light/dark surfaces, Océano/Medianoche wallpaper and reduced motion. Preferences persist in local storage when available. Selected appearance has a blue inset outline; wallpaper options show the actual wallpaper as swatches.

### Utilities folder and tools

The tenth desktop launcher is an amber folder labeled Utilidades. It opens four working tools, also discoverable through desktop search, the system menu and terminal `open <id>` commands. Their pictograms reuse established icon gradients: Brush/coral for Paint, Calculator/slate, NotebookPen/paper for Notepad and Clock3/terminal for Clock. They retain normal close, minimize, restore and maximize behavior.

Paint offers brush and eraser tools, palette/custom color, brush thickness, clear, undo/redo and PNG download. Pointer input supports mouse or touch on a white 960×600 canvas. A stroke or clear operation records history, capped at 12 undo snapshots; Ctrl/Cmd-Z undoes and Shift adds redo. The eraser draws white. The toolbar groups 30px icon controls, color swatches, a thickness range and the primary PNG action; selected tools use soft fill and action-blue ink.

Calculator provides basic arithmetic, decimal input, sign change, percentage, backspace, clear and equals, with keyboard equivalents. Its four-column keypad uses rounded neutral keys, blue operator text and a blue equals key; keys are 48px high on desktop and 56px on mobile. Tabular output is right-aligned, with a separate expression line and announced errors such as division by zero.

Notepad provides an editable monospace textarea, word/character counts, local-save status and TXT download. Text saves to `ravettini-os-notepad` after a 250ms debounce and flushes the latest content on unmount. Storage failures display a download fallback. Its textarea has an inset 2px action-blue focus outline, offset by -3px. Notes persist locally; Paint, calculator and stopwatch state remain in their mounted windows and reset when those apps close.

Clock switches between Buenos Aires time/date and a stopwatch. The stopwatch supports start, pause, continue, reset and up to 20 recorded laps. The segmented view buttons use the existing soft track and surface selected state; clock numerals and lap values remain tabular.

### Boot and visitor selection

`OperatingSystem` wraps the desktop with boot, users, entering and desktop phases. The boot screen exposes an Omitir animación button that advances to user selection. One password-free Visitante button enters the portfolio. Session storage remembers entry within the browser tab, avoiding replay after reload or return from a case study. It records a UI session, not authentication.

The system menu offers Cambiar usuario, which returns to selection while preserving mounted application state, and Reiniciar sistema, which remounts the desktop, resets its windows and replays boot. Restart also appears on the selection screen. Login focuses the visitor button; desktop entry focuses its main region. Before entry, the mounted desktop is inert and hidden from assistive technology.

## Do's and Don'ts

### Do:
- **Do** preserve the approved compact desktop metaphor and meaningful application icons.
- **Do** use the existing project data and real screenshots.
- **Do** keep visible focus, labeled controls and reduced-motion behavior.
- **Do** use three launcher columns and fixed application sheets on mobile.

### Don't:
- **Don't** restore the superseded editorial direction from `idea.md`.
- **Don't** invent clients, experience, metrics or project previews.
- **Don't** make minimized windows lose their local state.


### Unified demo browser

Demo apps launch maximized, filling the workspace below the 34px system menu (38px on mobile). A single 56px titlebar groups native traffic lights, a centered hostname, Proyecto/Volver a demo, reload and new-tab controls. The presentation retains case-study access. Mobile hides the hostname and uses 44px action targets. The iframe receives the remaining viewport without scaling or margins. Green restores the existing floating window; navigation and form state remain mounted through resize, view changes and minimize. The dock keeps its existing reveal behavior. Other application windows retain their established geometry.


Demo information lives inside each app as an inline Demo control, replacing the former fixed information banner and corner button. The introduction contains the synthetic-data notice and confirmed reset action. Embedded demos allow native confirmation dialogs so cancellation preserves changes and confirmed reset restores the sample dataset.


### Resizable floating windows

Desktop windows expose invisible pointer targets along all four edges and corners, with directional cursors and visible keyboard focus. Dragging changes the selected edges while opposite edges remain anchored; arrow keys move a focused edge by 10px, or 40px with Shift. Minimum dimensions are 320?220px (480px wide for embedded demo browsers). Windows remain within the workspace below the system menu and adapt when the viewport shrinks. Escape or pointer cancellation restores the previous geometry. Resizing retains mounted app and iframe state. Maximizing hides edge targets; restoring returns to the chosen size and position. Mobile retains its full-width application sheets. Verified screenshots and interaction evidence are in `.impeccable/review/window-resize-*`.


### Application favicons and additional projects

The five demos use their original local favicons as desktop and application icons, preserving their artwork inside the existing 48px slots. Spaceweb uses its published favicon; Sofijobs CV uses the established document-search icon. Asset provenance is recorded in `.impeccable/assets/project-favicons.json`.

Spaceweb and Analizador de CVs Sofijobs are available from the desktop, project list, search and terminal, with their supplied external links. Descriptions follow the sites' public metadata; no client, date or outcome was invented. New launcher slots are appended so saved positions of existing icons survive.

Project presentations other than the five demo browsers open centered on desktop. Independent CSS translation centers their initial geometry without competing with the window entrance animation; explicit position takes over once dragged or resized. Maximizing, restoring, responsive mobile sheets and the five maximized demo browsers retain their behavior.


### Lower desktop grid slots

The grid now extends to 12px above the workspace bottom instead of reserving a full-width strip for the dock. Only cells overlapping the actual dock or search hint, with an 8px clearance, are excluded. Pointer drop, keyboard movement, group placement, stored-layout normalization and default placement share those reservations. The drag preview reaches the lower cells, and saved lower positions survive reload. A ResizeObserver repacks affected icons when dock or hint dimensions change, including minimized applications expanding the dock. Verification covers four desktop sizes, lower-left/right placement, persistence, keyboard/group movement, dock growth, viewport changes and legacy overlapping layouts.


### Fixed mobile dock after desktop arrival

The desktop entrance animation no longer retains transform or filter after completing: its final frame uses none and its fill mode is backwards. This keeps the mobile system menu, dock and application sheets attached to the viewport instead of a transformed scrolling ancestor. The mobile dock fits within 12px side margins, caps at 360px, and distributes its five buttons with at least 44px targets; icon dimensions adapt from 36px to 43px. Existing bottom safe-area spacing and scroll padding remain. Verification includes normal and reduced motion, 320/375/390px portrait, 844px landscape, scroll-to-bottom, menu anchoring, opening applications from the scrolled dock and unchanged desktop geometry.
