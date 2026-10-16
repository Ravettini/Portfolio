// ravettiniOS adapter. Engine source/license: ./README.txt
const channel = "ravettini-doom-v1";
const canvas = document.querySelector("canvas");
const audioHint = document.querySelector("#enable-audio");
let audioUnlockTimer;
let engine,
  started = false,
  active = false,
  focused = false,
  muted = false,
  paused = false;
const held = new Map();
const notify = (type, extra = {}) =>
  parent.postMessage({ channel, type, ...extra }, location.origin);
const fail = (error) =>
  notify("error", {
    message: `No se pudo iniciar DOOM. ${String(error?.message || error).slice(0, 240)}`,
  });
function audioStatus() {
  const audio = engine?.SDL2?.audioContext;
  const status = muted
    ? "muted"
    : paused || !started
      ? "paused"
      : audio?.state === "running"
        ? "running"
        : "blocked";
  if (status === "blocked" && active && focused && audioHint.hidden) {
    if (!audioUnlockTimer)
      audioUnlockTimer = setTimeout(() => {
        audioUnlockTimer = undefined;
        if (
          active &&
          focused &&
          !paused &&
          !muted &&
          engine?.SDL2?.audioContext?.state !== "running"
        ) {
          audioHint.hidden = false;
          notify("audio", { status: "blocked" });
        }
      }, 250);
    return;
  }
  clearTimeout(audioUnlockTimer);
  audioUnlockTimer = undefined;
  audioHint.hidden = status !== "blocked" || !active || !focused;
  notify("audio", { status });
}
function activateAudio() {
  if (!started || !active) return;
  muted = false;
  focused = true;
  canvas.focus();
  notify("focus");
  sync();
}
audioHint.addEventListener("click", activateAudio);
function release() {
  for (const [code, key] of held)
    canvas.dispatchEvent(
      new KeyboardEvent("keyup", { code, key, bubbles: true }),
    );
  held.clear();
  if (started) engine._RAV_ReleaseInput();
  if (document.pointerLockElement) document.exitPointerLock();
}
function sync() {
  if (!started) return;
  const run = active && focused && !document.hidden;
  if (!run && !paused) {
    release();
    engine._DB_PauseMainLoop();
  } else if (run && paused) engine._DB_ResumeMainLoop();
  paused = !run;
  const audio = engine.SDL2?.audioContext;
  if (audio) {
    if (run && !muted) void audio.resume().then(audioStatus, audioStatus);
    else void audio.suspend().then(audioStatus, audioStatus);
  }
  audioStatus();
}
canvas.addEventListener("pointerdown", () => {
  notify("focus");
  canvas.focus();
  focused = true;
  sync();
});
canvas.addEventListener("focus", () => {
  notify("focus");
  focused = true;
  sync();
});
window.addEventListener("blur", () => {
  focused = false;
  sync();
});
document.addEventListener("visibilitychange", sync);
window.addEventListener(
  "keydown",
  (e) => {
    if (e.code === "Tab" && e.shiftKey) {
      focused = false;
      sync();
      e.preventDefault();
      e.stopImmediatePropagation();
      notify("release");
      return;
    }
    if (!active || !focused) {
      e.stopImmediatePropagation();
      return;
    }
    held.set(e.code, e.key);
    if (!muted && engine?.SDL2?.audioContext?.state === "suspended")
      void engine.SDL2.audioContext.resume().then(audioStatus, audioStatus);
    if (
      [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "Tab",
      ].includes(e.code)
    )
      e.preventDefault();
  },
  true,
);
window.addEventListener("keyup", (e) => held.delete(e.code), true);
async function load(wad) {
  if (engine) return;
  const timeout = setTimeout(
    () => fail("La carga tardó demasiado. Cerrá y volvé a abrir el juego."),
    60000,
  );
  try {
    const { default: createEngine } = await import("./chocolate-doom.js");
    engine = await createEngine({
      canvas,
      noInitialRun: true,
      locateFile: (name) => new URL(name, import.meta.url).href,
      print: (text) => console.info("[DOOM]", text),
      printErr: (text) => console.warn("[DOOM]", text),
      onAbort: (reason) => {
        clearTimeout(timeout);
        fail(reason);
      },
      onQuit: () => notify("quit"),
      onEngineError: (message) => fail(message),
      onGameReady: () => {
        started = true;
        if (active && !document.hidden) {
          canvas.focus();
          focused = true;
        }
        clearTimeout(timeout);
        engine.SDL2?.audioContext?.addEventListener("statechange", audioStatus);
        sync();
        notify("playing");
      },
    });
    engine.FS.mkdir("/iwads");
    engine.FS.writeFile("/iwads/doom1.wad", new Uint8Array(wad));
    engine.FS.writeFile(
      "/default.cfg",
      [
        "key_up 17",
        "key_down 31",
        "key_left 30",
        "key_right 32",
        "key_fire 29",
        "key_use 57",
        "key_speed 54",
        "use_mouse 0",
        "snd_sfxdevice 3",
        "snd_musicdevice 3",
        "sfx_volume 8",
        "music_volume 8",
        "screenblocks 10",
      ].join("\n") + "\n",
    );
    engine.FS.writeFile(
      "/chocolate-doom.cfg",
      [
        "fullscreen 0",
        "window_width 320",
        "window_height 240",
        "aspect_ratio_correct 1",
        "force_software_renderer 1",
        "usemouse 0",
        "show_endoom 0",
      ].join("\n") + "\n",
    );
    engine.callMain([
      "-iwad",
      "/iwads/doom1.wad",
      "-config",
      "/default.cfg",
      "-extraconfig",
      "/chocolate-doom.cfg",
      "-warp",
      "1",
      "1",
      "-skill",
      "3",
      "-window",
      "-novert",
      "-nomouse",
      "-nogui",
    ]);
  } catch (error) {
    clearTimeout(timeout);
    fail(error);
  }
}
window.addEventListener("message", (event) => {
  if (
    event.origin !== location.origin ||
    event.source !== parent ||
    event.data?.channel !== channel
  )
    return;
  const data = event.data;
  if (data.type === "load" && data.wad instanceof ArrayBuffer)
    void load(data.wad);
  if (data.type === "activity" && typeof data.active === "boolean") {
    active = data.active;
    if (!active) focused = false;
    sync();
  }
  if (data.type === "mute" && typeof data.muted === "boolean") {
    muted = data.muted;
    if (!muted && active) {
      focused = true;
      canvas.focus();
    }
    sync();
  }
  if (data.type === "activate-audio") activateAudio();
  if (data.type === "focus-game" && active) {
    focused = true;
    canvas.focus();
    sync();
  }
});
window.addEventListener("pagehide", () => {
  active = false;
  sync();
  void engine?.SDL2?.audioContext?.close().catch(() => {});
});
window.addEventListener("error", (event) => {
  console.error("[DOOM runtime]", event.error?.stack || event.message);
  active = false;
  void engine?.SDL2?.audioContext?.suspend().catch(() => {});
  fail(event.message);
});
notify("ready");
// Read-only diagnostics support integration checks without game-control backdoors.
export const diagnostics = () => ({
  started,
  active,
  focused,
  paused,
  map: started ? engine._RAV_GetMap() : null,
  x: started ? engine._RAV_GetX() / 65536 : null,
  y: started ? engine._RAV_GetY() / 65536 : null,
  angle: started ? (engine._RAV_GetAngle() * 360) / 65536 : null,
  ammo: started ? engine._RAV_GetAmmo() : null,
  ticks: started ? engine._RAV_GetTime() : null,
  audio: engine?.SDL2?.audioContext?.state,
  screenBlocks: started ? engine._RAV_GetScreenBlocks() : null,
  health: started ? engine._RAV_GetHealth() : null,
});

export const sectorCeiling = (sector) =>
  started ? engine._RAV_GetCeiling(sector) / 65536 : null;
