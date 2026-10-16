import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectApp } from "./project-app";
import type { Project } from "@/lib/projects";

export function ProjectCase({ project }: { project: Project }) {
  return (
    <main id="main" className="os-case-page">
      <nav className="case-topbar" aria-label="Navegación">
        <Link href="/">
          <strong>IR</strong> ravettiniOS
        </Link>
        <Link href="/#proyectos">
          <ArrowLeft size={14} /> Escritorio
        </Link>
        <a href="mailto:ignaciorave21@gmail.com">
          Contacto <ArrowUpRight size={14} />
        </a>
      </nav>
      <article className="os-case-window">
        <header className="case-window-bar">
          <Link
            href="/"
            aria-label="Cerrar caso y volver al escritorio"
            className="case-close"
          />
          <span>{project.title} — Caso de estudio</span>
        </header>
        <ProjectApp project={project} full />
      </article>
      <footer className="case-page-footer">
        Ignacio Ravettini Novellino · Desarrollo web full stack
      </footer>
    </main>
  );
}
