DOOM in ravettiniOS — engine provenance and licenses

Engine: Chocolate Doom 3.1.1, GPL-2.0-or-later.
Upstream: https://github.com/chocolate-doom/chocolate-doom
Browser adaptation: https://github.com/OscarRevollo/doom-wasm
Pinned browser source commit: b114de68a4ae4971803aeb1c6051f11c3a96c447
Evaluated alternative: https://github.com/cloudflare/doom-wasm (Chocolate Doom 3.0.0).
The newer adaptation supplies modular ES modules and pause/resume exports.
No upstream precompiled binaries or bundled Freedoom resources are used here.
The engine was built locally from the pinned C source plus the changes below.

Runtime files: chocolate-doom.js and chocolate-doom.wasm.
Corresponding patched source and build scripts: engine-source.zip (same directory).
License: COPYING.txt. Original author and copyright notices remain in the source.
SHA-256 checksums: checksums.json.

Build: Emscripten 4.0.14, CMake 4.4.4, Ninja 1.13.2, Release with function names for diagnostics.
Emscripten builds SDL 2.32.8 and SDL_mixer through its official ports.
Toolchain source/ports: https://github.com/emscripten-core/emscripten/tree/4.0.14
SDL source/license: https://github.com/libsdl-org/SDL/tree/release-2.32.8 (zlib).
SDL_mixer 2.8.0: https://github.com/libsdl-org/SDL_mixer/tree/release-2.8.0 (zlib).
SDL_mixer and the engine's OPL synthesizer produce original WAD MUS music.
No soundfont, proprietary data, server, CDN, SharedArrayBuffer, COOP or COEP needed.
Dynamic execution is disabled at build time; the player has its own restrictive CSP.

Rebuild on Windows:
1. Download/extract engine-source.zip; its chocolate-doom directory is already patched.
2. Install/activate Emscripten 4.0.14 from https://github.com/emscripten-core/emsdk
3. Install CMake and Ninja, then run the included scripts/build.ps1 with
   -EngineRoot <extracted/chocolate-doom> -EmsdkRoot <emsdk>
   -CmakeBin <cmake bin> -NinjaBin <ninja bin> -BuildRoot <build directory>.
4. Copy build/src/chocolate-doom.js and .wasm into this directory.
Do not reapply patch-engine.py to the already patched source. That script is for
a fresh checkout of engine/vendor/chocolate-doom at the pinned browser commit.

ravettiniOS engine changes (GPL-2.0-or-later, 2026):
- The earlier E1M1-only guard and custom completion event have been removed.
  Vanilla level exits, intermissions, episode finale, save/load and demos are restored.
  All nine maps in the original shareware episode are available, including E1M9.
  No registered/retail episode assets are included.
- The browser main loop returns normally (simulate_infinite_loop=0). Startup OPL
  detection advances the software emulator clock synchronously. Asyncify is disabled
  to avoid reentrant stack rewinds when audio and focus callbacks run.
- Added ready/quit/error callbacks, input reset, read-only integration diagnostics,
  and audio pause/resume. Arrow bindings work alongside WASD.
- Browser tic/wipe waits return to requestAnimationFrame instead of sleeping through
  Asyncify while audio callbacks run; simulation keeps its original 35 Hz clock.
- A fixed 320x240 framebuffer avoids high-DPI/window-resize mismatches. CSS performs
  pixelated 4:3 scaling and letterboxing, including actual browser fullscreen.
  Software renderer texture limits of zero are treated as unlimited per SDL semantics.
- The default screenblocks setting is 10 and the menu's maximum remains HUD-visible.
- The audio adapter displays a direct user-gesture unlock button if autoplay is blocked.
  Speaker controls resume game focus when enabling sound; pause/close stop audio.
- No replacement graphics or JavaScript recreation of DOOM.

Original game data:
DOOM graphics, levels, sounds and music are separate from the GPL engine and belong
to id Software / their respective rights holders. The original shareware DOOM1.WAD
is included unchanged and served locally, only when the visitor opens DOOM.
No game files are requested at portfolio startup or for touch-only mobile visitors.
The free game does not require selecting or uploading any files.

Distribution basis: SHAREWARE-LICENSE.txt preserves the limited-use license and
John Carmack's 23 October 1999 clarification that the DOOM shareware WAD is freely
distributable. The clarification is also archived with Debian's non-free package:
https://sources.debian.org/src/doom-wad-shareware/1.9.fixed-2/debian/copyright/
The WAD is not GPL and is not charged for. Keep these notices with the data.

Asset: shareware DOOM1.WAD 1.8, 4196020 bytes,
MD5 5f4eb849b1af12887dec04a2a12e5e62,
from https://www.gamers.org/pub/idgames/idstuff/doom/doom-1.8.wad.gz.
SHA-256: checksums.json; browser fetch integrity verifies the exact original bytes.
The full original shareware episode is playable; the WAD itself has not been edited.

Controls: W/S or Up/Down move, A/D or Left/Right turn, Ctrl fires, Space uses,
Shift runs, Escape opens the original menu, Tab opens the automap.
The toolbar fullscreen button enters/exits browser fullscreen; Esc also exits it.
Mouse aiming/capture is disabled. The active window focuses the game on startup;
Shift+Tab exits fullscreen if needed and returns focus to the window controls. Switching focus or minimizing
releases input and pauses. Closing removes the entire
iframe browsing context, including its WASM memory, audio and event listeners.
Mobile visitors get a desktop-keyboard explanation rather than a virtual joystick.
