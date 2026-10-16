"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  LoaderCircle,
  Power,
  UserRound,
} from "lucide-react";
import { Desktop } from "./desktop";

type Phase = "boot" | "users" | "entering" | "desktop";
const sessionKey = "ravettini-os-session";

export function OperatingSystem() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [initialized, setInitialized] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const userButton = useRef<HTMLButtonElement>(null);
  const sessionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    try {
      const preferences = JSON.parse(
        localStorage.getItem("ravettini-os-preferences") || "{}",
      );
      prefersReducedMotion ||= !!preferences.reducedMotion;
      if (sessionStorage.getItem(sessionKey) === "visitor") setPhase("desktop");
    } catch {
      // The entry sequence also works when browser storage is unavailable.
    }
    setReducedMotion(prefersReducedMotion);
    setInitialized(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Argentina/Buenos_Aires",
        }).format(now),
      );
      setDate(
        new Intl.DateTimeFormat("es-AR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          timeZone: "America/Argentina/Buenos_Aires",
        }).format(now),
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const enterDesktop = useCallback(() => {
    try {
      sessionStorage.setItem(sessionKey, "visitor");
    } catch {
      /* Keep access available without storage. */
    }
    setPhase("desktop");
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (phase === "boot") {
      const timer = setTimeout(
        () => setPhase("users"),
        reducedMotion ? 100 : 1700,
      );
      return () => clearTimeout(timer);
    }
    if (phase === "entering") {
      const timer = setTimeout(enterDesktop, reducedMotion ? 100 : 650);
      return () => clearTimeout(timer);
    }
    if (phase === "users") userButton.current?.focus({ preventScroll: true });
    if (phase === "desktop")
      sessionRef.current
        ?.querySelector<HTMLElement>("#main")
        ?.focus({ preventScroll: true });
  }, [phase, initialized, reducedMotion, enterDesktop]);

  function clearSession() {
    try {
      sessionStorage.removeItem(sessionKey);
    } catch {
      /* In-memory navigation still works. */
    }
  }

  function restart() {
    clearSession();
    setGeneration((value) => value + 1);
    setPhase("boot");
  }

  function lock() {
    clearSession();
    setPhase("users");
  }

  function updateMotionPreference(reduced: boolean) {
    setReducedMotion(
      reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }

  return (
    <div
      ref={sessionRef}
      className={`os-session${reducedMotion ? " os-session--reduced" : ""}`}
      data-phase={phase}
    >
      <div
        className="os-session-desktop"
        inert={phase !== "desktop"}
        aria-hidden={phase !== "desktop"}
      >
        <Desktop
          key={generation}
          onRestart={restart}
          onLock={lock}
          onMotionPreferenceChange={updateMotionPreference}
        />
      </div>
      {phase === "boot" && (
        <main className="os-boot" aria-label="Inicio de ravettiniOS">
          <div className="boot-center">
            <span className="boot-monogram" aria-hidden="true">
              IR<span>.</span>
            </span>
            <h1>
              ravettini<span>OS</span>
            </h1>
            <div className="boot-progress" aria-hidden="true">
              <span />
            </div>
            <p role="status">Iniciando tu espacio de trabajo…</p>
          </div>
          <button className="boot-skip" onClick={() => setPhase("users")}>
            Omitir animación <ArrowRight size={14} />
          </button>
          <span className="boot-signature">
            Diseñado para explorar. Construido por Ignacio.
          </span>
        </main>
      )}
      {(phase === "users" || phase === "entering") && (
        <main
          className={`os-login${phase === "entering" ? " os-login--entering" : ""}`}
          aria-label="Selección de usuario"
        >
          <header className="login-topbar">
            <span>
              <strong>IR</strong> ravettiniOS
            </span>
            <span>Buenos Aires, AR</span>
          </header>
          <div className="login-clock">
            <time>{time || "—:—"}</time>
            <p>{date}</p>
          </div>
          <section className="login-user">
            <h1>
              {phase === "entering"
                ? "Bienvenido a mi escritorio."
                : "Elegí un usuario."}
            </h1>
            <p className="login-intro">
              El espacio de trabajo de Ignacio Ravettini.
            </p>
            <button
              ref={userButton}
              className="login-user-button"
              disabled={phase === "entering"}
              onClick={() => setPhase("entering")}
              aria-label="Entrar como visitante"
            >
              <span className="login-avatar">
                <UserRound size={43} strokeWidth={1.3} />
              </span>
              <span className="login-user-name">Visitante</span>
              <span className="login-user-description">
                Proyectos, ideas y un poco de código.
              </span>
              <span className="login-enter">
                {phase === "entering" ? (
                  <>
                    <LoaderCircle size={17} className="login-spinner" />{" "}
                    Entrando…
                  </>
                ) : (
                  <>
                    Entrar al escritorio <ArrowRight size={16} />
                  </>
                )}
              </span>
            </button>
            <p className="login-status" role="status">
              {phase === "entering"
                ? "Preparando tu escritorio…"
                : "Entrá a explorar. No necesitás contraseña."}
            </p>
          </section>
          <footer className="login-footer">
            <button aria-label="Reiniciar sistema" onClick={restart}>
              <Power size={18} />
              <span>Reiniciar</span>
            </button>
            <a href="mailto:ignaciorave21@gmail.com">
              Contactar a Ignacio <ArrowUpRight size={14} />
            </a>
          </footer>
        </main>
      )}
    </div>
  );
}
