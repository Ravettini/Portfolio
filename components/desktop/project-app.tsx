"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { type Project } from "@/lib/projects";
import { AppIcon } from "./app-icon";

export function ProjectApp({
  project,
  full = false,
}: {
  project: Project;
  full?: boolean;
}) {
  const [image, setImage] = useState(0);
  return (
    <div className={`project-app${full ? " project-app--full" : ""}`}>
      {full && (
        <Link className="os-back-link" href="/#proyectos">
          <ArrowLeft size={15} /> Volver al escritorio
        </Link>
      )}
      <div className="project-app-heading">
        <AppIcon id={project.slug} />
        <div className="project-app-title">
          <h2>{project.title}</h2>
          <p>{project.category}</p>
        </div>
        <div className="project-app-actions">
          {!full && project.hasDetailPage && (
            <Link
              className="os-button os-button--primary"
              href={`/proyectos/${project.slug}`}
            >
              <ExternalLink size={14} /> Ver caso de estudio
            </Link>
          )}
          <a
            className={`os-button${full || !project.hasDetailPage ? " os-button--primary" : ""}`}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRight size={15} /> Abrir sitio
          </a>
        </div>
      </div>
      <p className="project-app-summary">{project.shortDescription}</p>
      {project.gallery.length > 0 ? (
        <figure className="project-app-gallery">
          <Image
            src={project.gallery[image]}
            alt={`Captura real de ${project.title}, vista ${image + 1} de ${project.gallery.length}`}
            width={1600}
            height={1000}
            sizes={
              full
                ? "(max-width: 900px) 95vw, 1000px"
                : "(max-width: 900px) 95vw, 650px"
            }
            priority={project.slug === "acreditapp"}
          />
          {project.gallery.length > 1 && (
            <figcaption>
              <button
                aria-label="Captura anterior"
                onClick={() =>
                  setImage(
                    (image + project.gallery.length - 1) %
                      project.gallery.length,
                  )
                }
              >
                <ChevronLeft size={15} />
              </button>
              <span>
                {image + 1} / {project.gallery.length}
              </span>
              <button
                aria-label="Captura siguiente"
                onClick={() => setImage((image + 1) % project.gallery.length)}
              >
                <ChevronRight size={15} />
              </button>
            </figcaption>
          )}
        </figure>
      ) : (
        <div className="project-app-no-preview">
          <AppIcon id={project.slug} />
          <p>{project.what}</p>
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            Conocer la aplicación <ArrowUpRight size={15} />
          </a>
        </div>
      )}
      <div className="project-app-tech">
        {project.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {full && (
        <div className="case-content">
          <dl className="case-meta">
            <div>
              <dt>Tipo</dt>
              <dd>{project.meta.type}</dd>
            </div>
            <div>
              <dt>Cliente</dt>
              <dd>{project.meta.client}</dd>
            </div>
            <div>
              <dt>Año</dt>
              <dd>{project.meta.date}</dd>
            </div>
          </dl>
          <section>
            <h2>El proyecto</h2>
            <p>{project.what}</p>
          </section>
          {project.problem && (
            <section>
              <h2>El problema</h2>
              <p>{project.problem}</p>
              {project.problemPoints.map((point) => (
                <div className="case-point" key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              ))}
            </section>
          )}
          {project.solution && (
            <section>
              <h2>La solución</h2>
              <p>{project.solution}</p>
              <ul>
                {project.solutionFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          )}
          {project.process.length > 0 && (
            <section>
              <h2>Proceso de trabajo</h2>
              <div className="case-process">
                {project.process.map((step) => (
                  <article key={step.step}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {project.results.length > 0 && (
            <section>
              <h2>Resultados</h2>
              <dl className="case-results">
                {project.results.map((result) => (
                  <div key={result.label}>
                    <dt>{result.value}</dt>
                    <dd>{result.label}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <footer className="case-footer">
            <p>¿Construimos algo juntos?</p>
            <a
              className="os-button os-button--primary"
              href="mailto:ignaciorave21@gmail.com"
            >
              Escribime <ArrowUpRight size={16} />
            </a>
          </footer>
        </div>
      )}
    </div>
  );
}
