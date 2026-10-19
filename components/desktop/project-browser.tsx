"use client";

import { ExternalLink, Globe2, RotateCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
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

  return (
    <div className="project-browser">
      <nav className="project-browser-toolbar" aria-label={`Navegador de ${project.title}`}>
        <div className="project-browser-views" aria-label="Vista del proyecto">
          <button aria-pressed={view === "demo"} onClick={() => setView("demo")}>
            Demo
          </button>
          <button aria-pressed={view === "project"} onClick={() => setView("project")}>
            Proyecto
          </button>
        </div>
        <div className="project-browser-address" title={url}>
          <ShieldCheck size={14} aria-hidden="true" />
          <span>{new URL(url).hostname}</span>
        </div>
        <div className="project-browser-actions">
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
          {project.hasDetailPage && (
            <Link className="project-browser-case" href={`/proyectos/${project.slug}`}>
              Caso de estudio
            </Link>
          )}
        </div>
      </nav>
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
          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-popups-to-escape-sandbox"
          allowFullScreen
          onLoad={() => { setLoading(false); setDelayed(false); setFailed(false); }}
          onError={() => { setLoading(false); setFailed(true); }}
        />
      </div>
      {view === "project" && <div className="project-browser-details">{children}</div>}
    </div>
  );
}
