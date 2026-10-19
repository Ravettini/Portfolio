"use client";

import { ExternalLink, Globe2, RotateCw, ShieldCheck, PanelTop } from "lucide-react";
import { createPortal } from "react-dom";
import { type ReactNode, useEffect, useState } from "react";
import { type Project } from "@/lib/projects";

export function ProjectBrowser({
  project,
  url,
  children,
}: {
  project: Project;
  url: string;
  children: ReactNode;
}) {
  const [view, setView] = useState<"demo" | "project">("demo");
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [delayed, setDelayed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [chromeHost, setChromeHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setChromeHost(document.getElementById(`browser-chrome-${project.slug}`));
  }, [project.slug]);

  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => setDelayed(true), 12000);
    return () => window.clearTimeout(timer);
  }, [loading, revision]);

  const reload = () => {
    setLoading(true);
    setDelayed(false);
    setFailed(false);
    setRevision((value) => value + 1);
  };

  const toolbar = (
      <nav className="project-browser-toolbar" aria-label={`Navegador de ${project.title}`}>
        <div className="project-browser-address" title={url}>
          <ShieldCheck size={14} aria-hidden="true" />
          <span>{new URL(url).hostname}</span>
        </div>
        <div className="project-browser-actions">
          <button
            className="project-browser-info"
            aria-pressed={view === "project"}
            onClick={() => setView(view === "demo" ? "project" : "demo")}
          >
            <PanelTop size={16} aria-hidden="true" />
            {view === "demo" ? "Proyecto" : "Volver a demo"}
          </button>
          <button
            className="project-browser-icon"
            aria-label="Recargar demo desde el inicio"
            title="Recargar demo desde el inicio"
            onClick={() => { setView("demo"); reload(); }}
          >
            <RotateCw size={16} aria-hidden="true" />
          </button>
          <a
            className="project-browser-icon"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir demo en otra pestaña"
            title="Abrir demo en otra pestaña"
          >
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </nav>
  );

  return (
    <div className="project-browser">
      {chromeHost ? createPortal(toolbar, chromeHost) : toolbar}
      <div className="project-browser-viewport" hidden={view !== "demo"}>
        {loading && !delayed && !failed && (
          <div className="project-browser-loading" role="status">
            <Globe2 size={22} aria-hidden="true" />
            <p>Abriendo {project.title}…</p>
          </div>
        )}
        {(delayed || failed) && (
          <div className="project-browser-notice" role="status">
            <span>{failed ? "No pudimos cargar la demo." : "La demo está tardando en cargar."}</span>
            <button onClick={reload}>Reintentar</button>
            <a href={project.href} target="_blank" rel="noopener noreferrer">Abrir en otra pestaña</a>
          </div>
        )}
        <iframe
          key={revision}
          src={url}
          title={`Demo interactiva de ${project.title}`}
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
          allowFullScreen
          onLoad={() => { setLoading(false); setDelayed(false); setFailed(false); }}
          onError={() => { setLoading(false); setFailed(true); }}
        />
      </div>
      {view === "project" && <div className="project-browser-details">{children}</div>}
    </div>
  );
}
