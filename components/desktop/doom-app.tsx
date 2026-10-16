"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, RotateCcw, Maximize, Minimize } from "lucide-react";
import { DOOM_CHANNEL, type DoomCommand, type DoomEvent } from "./doom.types";

export default function DoomApp({
  active,
  onClose,
  onActivate,
}: {
  active: boolean;
  onClose: () => void;
  onActivate: () => void;
}) {
  const app = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [windowError, setWindowError] = useState("");
  const [audioBlocked, setAudioBlocked] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const wad = useRef<ArrayBuffer | null>(null);
  const [instance, setInstance] = useState(0);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "error">(
    "loading",
  );
  const [error, setError] = useState("");
  const [muted, setMuted] = useState(false);
  const [controls, setControls] = useState(false);
  const [mobile, setMobile] = useState(false);
  const activeRef = useRef(active);
  activeRef.current = active;
  function send(message: DoomCommand) {
    frame.current?.contentWindow?.postMessage(
      { channel: DOOM_CHANNEL, ...message },
      location.origin,
    );
  }
  useEffect(() => {
    setMobile(matchMedia("(pointer: coarse)").matches);
    function receive(event: MessageEvent) {
      if (
        event.origin !== location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.channel !== DOOM_CHANNEL
      )
        return;
      const message = event.data as DoomEvent;
      if (message.type === "focus") onActivate();
      if (message.type === "quit") onClose();
      if (message.type === "release") {
        const restoreFocus = () =>
          frame.current
            ?.closest("section")
            ?.querySelector<HTMLButtonElement>(".window-control--close")
            ?.focus();
        if (document.fullscreenElement === app.current)
          void document
            .exitFullscreen()
            .then(restoreFocus)
            .catch(() =>
              app.current?.querySelector<HTMLButtonElement>("button")?.focus(),
            );
        else restoreFocus();
      }
      if (message.type === "ready" && wad.current) {
        send({ type: "load", wad: wad.current });
        send({
          type: "activity",
          active: activeRef.current && !document.hidden,
        });
      }
      if (message.type === "playing") {
        setState("playing");
        send({
          type: "activity",
          active: activeRef.current && !document.hidden,
        });
      }
      if (message.type === "audio")
        setAudioBlocked(message.status === "blocked");
      if (message.type === "error") {
        setError(message.message);
        setState("error");
      }
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => {
    const sync = () =>
      send({ type: "activity", active: active && !document.hidden });
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [active, state]);
  useEffect(() => {
    send({ type: "mute", muted });
  }, [muted, state]);
  const wadRequest = useRef<AbortController | null>(null);
  async function loadBundledWad() {
    wadRequest.current?.abort();
    const request = new AbortController();
    wadRequest.current = request;
    setError("");
    setState("loading");
    try {
      const response = await fetch("/games/doom/doom1.wad", {
        signal: request.signal,
        cache: "force-cache",
        integrity: "sha256-u0ScdIDpoCpiAS0EFAbo5D2qUcqgZQZG0TB9hlC4+Dc=",
      });
      if (!response.ok)
        throw new Error(
          "No se pudieron cargar los recursos de DOOM. Reintentá la carga.",
        );
      const bytes = await response.arrayBuffer();
      if (request.signal.aborted) return;
      wad.current = bytes;
      setInstance((n) => n + 1);
    } catch (cause) {
      if (request.signal.aborted) return;
      setError(
        cause instanceof Error
          ? cause.message
          : "No se pudo cargar DOOM. Revisá tu conexión y reintentá.",
      );
      setState("error");
    }
  }
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) {
      setState("idle");
      return;
    }
    void loadBundledWad();
    return () => wadRequest.current?.abort();
  }, []);
  useEffect(() => {
    const changed = () => {
      setFullscreen(document.fullscreenElement === app.current);
    };
    document.addEventListener("fullscreenchange", changed);
    return () => document.removeEventListener("fullscreenchange", changed);
  }, []);
  async function toggleFullscreen() {
    setWindowError("");
    try {
      if (document.fullscreenElement === app.current)
        await document.exitFullscreen();
      else if (app.current?.requestFullscreen)
        await app.current.requestFullscreen();
      else throw Error("unavailable");
      send({ type: "focus-game" });
    } catch {
      setWindowError(
        "No se pudo activar la pantalla completa. Probá con F11 o ampliá la ventana.",
      );
    }
  }
  function restart() {
    setState("loading");
    setInstance((n) => n + 1);
  }
  const loaded = !!wad.current && (state === "loading" || state === "playing");
  return (
    <div className="doom-app" ref={app}>
      <div className="doom-toolbar">
        <span>DOOM · Episodio 1</span>
        <div>
          <button
            onClick={() => setControls((v) => !v)}
            aria-expanded={controls}
          >
            Controles
          </button>
          {state === "playing" && (
            <>
              <button
                onClick={() => void toggleFullscreen()}
                aria-label={
                  fullscreen
                    ? "Salir de pantalla completa"
                    : "Pantalla completa"
                }
                title={
                  fullscreen
                    ? "Salir de pantalla completa"
                    : "Pantalla completa"
                }
              >
                {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
              <button onClick={restart} aria-label="Reiniciar DOOM">
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => {
                  if (audioBlocked) {
                    setMuted(false);
                    send({ type: "activate-audio" });
                  } else setMuted((v) => !v);
                }}
                aria-label={
                  muted || audioBlocked
                    ? "Activar sonido de DOOM"
                    : "Silenciar DOOM"
                }
              >
                {muted || audioBlocked ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      {controls && (
        <p className="doom-controls">
          W/S o ↑/↓: avanzar y retroceder · A/D o ←/→: girar · Ctrl: disparar ·
          Espacio: usar · Shift: correr · Esc: menú · Tab: mapa. Shift+Tab:
          volver al escritorio.
        </p>
      )}
      <div className="doom-stage">
        {loaded && !mobile && (
          <iframe
            key={instance}
            ref={frame}
            src="/games/doom/player.html"
            title="DOOM – Knee-Deep in the Dead"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        )}
        {state === "loading" && (
          <div className="doom-overlay" role="status">
            <h2>Preparando DOOM…</h2>
            <p>Inicializando el motor de DOOM.</p>
          </div>
        )}
        {(state === "idle" || state === "error" || mobile) && (
          <div className="doom-intro">
            <h2>DOOM</h2>
            <p>Un viaje a 1993. Todo el primer episodio.</p>
            {mobile ? (
              <p>
                Esta experiencia está optimizada para computadora con teclado.
                El resto del escritorio sigue disponible en tu celular.
              </p>
            ) : (
              <>
                <p className="doom-error" role="alert">
                  {error}
                </p>
                <button
                  className="os-button"
                  onClick={() =>
                    wad.current ? restart() : void loadBundledWad()
                  }
                >
                  Reintentar DOOM
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <footer className="doom-footer">
        <span role="status">
          {windowError ||
            (state === "playing"
              ? active
                ? "WASD o flechas · Ctrl: disparar · Espacio: usar · Shift+Tab: salir."
                : "En pausa · Volvé a la ventana para continuar."
              : "Chocolate Doom · Motor GPL-2.0")}
        </span>
        <a href="/games/doom/README.txt" target="_blank" rel="noreferrer">
          Licencias y código
        </a>
      </footer>
    </div>
  );
}
