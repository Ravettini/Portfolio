export type DoomCommand =
  | { type: "load"; wad: ArrayBuffer }
  | { type: "activity"; active: boolean }
  | { type: "focus-game" }
  | { type: "activate-audio" }
  | { type: "mute"; muted: boolean };
export type DoomEvent =
  | { type: "focus" }
  | { type: "release" }
  | { type: "quit" }
  | { type: "ready" }
  | { type: "playing" }
  | { type: "audio"; status: "running" | "blocked" | "muted" | "paused" }
  | { type: "error"; message: string };
export const DOOM_CHANNEL = "ravettini-doom-v1";
