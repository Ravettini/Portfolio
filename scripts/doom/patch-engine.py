"""Apply the ravettiniOS browser integration to the pinned Chocolate Doom browser source.
Usage: python scripts/doom/patch-engine.py path/to/chocolate-doom
GPL-2.0-or-later, matching the modified engine.
"""
from pathlib import Path
import sys

root = Path(sys.argv[1])
p = root / 'src/doom/g_game.c'
s = '\n'.join(line.rstrip() for line in p.read_text().splitlines()) + '\n'
s = s.replace('#include <string.h>', '#include <emscripten.h>\n#include <SDL.h>\n#include <string.h>', 1)
marker = '#define\tBODYQUESIZE'
bridge = '''
// ravettiniOS: browser input cleanup and read-only diagnostics.

EMSCRIPTEN_KEEPALIVE int RAV_GetY(void) { return players[consoleplayer].mo ? players[consoleplayer].mo->y : 0; }
EMSCRIPTEN_KEEPALIVE int RAV_GetAngle(void) { return players[consoleplayer].mo ? (int)(players[consoleplayer].mo->angle >> 16) : 0; }
EMSCRIPTEN_KEEPALIVE int RAV_GetAmmo(void) { return players[consoleplayer].ammo[am_clip]; }
EMSCRIPTEN_KEEPALIVE int RAV_GetTime(void) { return leveltime; }

EMSCRIPTEN_KEEPALIVE void RAV_ReleaseInput(void)
{
    memset(gamekeydown, 0, sizeof(gamekeydown));
    memset(mousearray, 0, sizeof(mousearray));
    memset(joyarray, 0, sizeof(joyarray));
    mousex = mousey = joyxmove = joyymove = joystrafemove = 0;
    SDL_FlushEvents(SDL_KEYDOWN, SDL_MOUSEWHEEL);
}
EMSCRIPTEN_KEEPALIVE int RAV_GetMap(void) { return gameepisode * 10 + gamemap; }
EMSCRIPTEN_KEEPALIVE int RAV_GetX(void) { return players[consoleplayer].mo ? players[consoleplayer].mo->x : 0; }
'''
assert marker in s
s = s.replace(marker, bridge + '\n' + marker, 1)
p.write_text(s)

# The browser uses only the software OPL driver. Advance its startup detection
# clock directly instead of suspending main across live audio callbacks.
p = root / 'opl/opl.c'
s = p.read_text().replace('    delay_data_t delay_data;', '    delay_data_t delay_data;\n#ifdef EMSCRIPTEN\n    extern void RAV_OPL_Advance(unsigned int us);\n    RAV_OPL_Advance((unsigned int) us);\n    return;\n#endif', 1)
s = s.replace('        emscripten_sleep(us / 1000);', '        // Browser startup uses the software clock above.')
p.write_text(s)
p = root / 'opl/opl_sdl.c'
s = p.read_text().replace('// Call the OPL emulator code to fill the specified buffer.', 'void RAV_OPL_Advance(unsigned int us)\n{\n    AdvanceTime(((uint64_t) us * mixing_freq + OPL_SECOND - 1) / OPL_SECOND);\n}\n\n// Call the OPL emulator code to fill the specified buffer.', 1)
p.write_text(s)

p = root / 'src/doom/d_main.c'
s = p.read_text()
s = s.replace('    emscripten_set_main_loop_arg(D_RunFrameCallback, NULL, 0, 1);', '    EM_ASM({ setTimeout(function() { Module.onGameReady(); }, 0); });\n    emscripten_set_main_loop_arg(D_RunFrameCallback, NULL, 0, 0);')
p.write_text(s)
p = root / 'src/browser_exports.c' 
s = p.read_text().replace('#include <emscripten.h>', '#include <emscripten.h>\n#include <SDL.h>\nvoid RAV_ReleaseInput(void);')
s = s.replace('    emscripten_pause_main_loop();', '    RAV_ReleaseInput();\n    SDL_PauseAudio(1);\n    emscripten_pause_main_loop();')
s = s.replace('    emscripten_resume_main_loop();', '    SDL_PauseAudio(0);\n    emscripten_resume_main_loop();')
p.write_text(s)
p = root / 'src/CMakeLists.txt'
s = p.read_text().replace('-sASYNCIFY=1', '-sASYNCIFY=0').replace("'_DB_ResumeMainLoop']", "'_DB_ResumeMainLoop','_RAV_ReleaseInput','_RAV_GetMap','_RAV_GetX','_RAV_GetY','_RAV_GetAngle','_RAV_GetAmmo','_RAV_GetTime','_RAV_GetCeiling','_RAV_GetScreenBlocks','_RAV_GetHealth']")
# SDL_mixer's OPL backend supplies original MUS music without a soundfont.
p.write_text(s)

p = root / 'src/d_loop.c'
s = p.read_text().replace('            I_Sleep(1);', '            return; // browser RAF supplies the next tick; never unwind an audio callback')
p.write_text(s)
p = root / 'src/doom/d_main.c'
s = p.read_text().replace('            I_Sleep(1);', '            if (tics <= 0) return; // browser RAF yields without Asyncify')
p.write_text(s)

p = root / 'src/i_system.c'
s = p.read_text().replace('#include "config.h"', '#include "config.h"\n#include <emscripten.h>', 1)
s = s.replace('    exit(0);', '    emscripten_cancel_main_loop();\n    EM_ASM({ Module.onQuit(); });\n    exit(0);', 1)
s = s.replace('    // Shutdown. Here might be other errors.', '    EM_ASM({ Module.onEngineError(UTF8ToString($0)); }, msgbuf);\n    emscripten_cancel_main_loop();\n\n    // Shutdown. Here might be other errors.', 1)
p.write_text(s)

p = root / 'src/doom/g_game.c'
s = p.read_text()
for a, b in [('up','UP'),('down','DOWN'),('left','LEFT'),('right','RIGHT')]:
    s = s.replace('gamekeydown[key_'+a+']', '(gamekeydown[key_'+a+'] || gamekeydown[KEY_'+b+'ARROW])')
p.write_text(s)

p = root / 'src/doom/g_game.c'
s = p.read_text().replace('#include "r_data.h"', '#include "r_data.h"\n#include "r_state.h"', 1).replace('EMSCRIPTEN_KEEPALIVE int RAV_GetTime(void)', 'EMSCRIPTEN_KEEPALIVE int RAV_GetCeiling(int sector) { return sector >= 0 && sector < numsectors ? sectors[sector].ceilingheight : 0; }\nEMSCRIPTEN_KEEPALIVE int RAV_GetScreenBlocks(void) { return screenblocks; }\nEMSCRIPTEN_KEEPALIVE int RAV_GetHealth(void) { return players[consoleplayer].health; }\nEMSCRIPTEN_KEEPALIVE int RAV_GetTime(void)', 1)
p.write_text(s)

# Keep the classic status bar visible; CSS scales a fixed low-resolution canvas.
p = root / 'src/doom/m_menu.c'
s = p.read_text().replace('if (screenSize < 8)', 'if (screenSize < 7)')
p.write_text(s)
p = root / 'src/i_video.c'
s = p.read_text().replace('    window_flags |= SDL_WINDOW_ALLOW_HIGHDPI;', '    // Browser CSS handles high-DPI scaling without resizing the framebuffer.')
p.write_text(s)

p = root / 'src/i_video.c'
s = p.read_text().replace('    window_flags = SDL_WINDOW_RESIZABLE;', '    window_flags = 0; // Keep the browser framebuffer fixed; CSS handles resizing.')
s = s.replace('while (*w_upscale * SCREENWIDTH > rinfo.max_texture_width)', 'while (rinfo.max_texture_width > 0 && *w_upscale * SCREENWIDTH > rinfo.max_texture_width)').replace('while (*h_upscale * SCREENHEIGHT > rinfo.max_texture_height)', 'while (rinfo.max_texture_height > 0 && *h_upscale * SCREENHEIGHT > rinfo.max_texture_height)')
p.write_text(s)
