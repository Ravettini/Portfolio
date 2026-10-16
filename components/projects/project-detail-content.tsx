import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { EditorialMotion } from "@/components/editorial-motion";
import { ContactSection } from "@/components/sections/contact-section";
import { getProjectCover, type Project } from "@/lib/projects";
export function ProjectDetailContent({ project }: { project: Project }) {
  const cover = getProjectCover(project);
  return (
    <>
      <Navbar />
      <EditorialMotion>
        <main id="main" className="project-detail">
          <header id="inicio" className="shell detail-header">
            <Link className="text-link" href="/#proyectos">
              <ArrowLeft size={16} /> Todos los proyectos
            </Link>
            <p className="eyebrow" data-intro>
              {project.category} / {project.meta.date}
            </p>
            <h1 data-intro>
              {project.title}
              <span>.</span>
            </h1>
            <div className="detail-intro" data-intro>
              <p>{project.shortDescription}</p>
              <a
                className="button-primary"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en vivo <ArrowUpRight size={16} />
              </a>
            </div>
            <dl className="detail-meta">
              <div>
                <dt>Tipo</dt>
                <dd>{project.meta.type}</dd>
              </div>
              <div>
                <dt>Cliente</dt>
                <dd>{project.meta.client}</dd>
              </div>
              <div>
                <dt>A?o</dt>
                <dd>{project.meta.date}</dd>
              </div>
            </dl>
            {cover && (
              <div className="detail-cover" data-reveal>
                <Image
                  src={cover}
                  alt={"Interfaz de " + project.title}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            )}
          </header>
          <div className="shell detail-body">
            <nav className="detail-nav" aria-label="Contenido del proyecto">
              <a href="#resumen">Contexto</a>
              <a href="#problema">Problema</a>
              <a href="#solucion">Soluci?n</a>
              {project.process.length > 0 && <a href="#proceso">Proceso</a>}
              {project.results.length > 0 && (
                <a href="#resultados">Resultados</a>
              )}
              <a href="#tecnologias">Tecnolog?as</a>
              {project.gallery.length > 0 && <a href="#galeria">Galer?a</a>}
            </nav>
            <section id="resumen" className="detail-section" data-reveal>
              <h2>
                <span>01 / Contexto</span>El punto de partida.
              </h2>
              <p>{project.what}</p>
            </section>
            <section id="problema" className="detail-section" data-reveal>
              <h2>
                <span>02 / Desaf?o</span>El problema.
              </h2>
              <div>
                <p>{project.problem}</p>
                <div className="detail-points">
                  {project.problemPoints.map((point) => (
                    <article key={point.title}>
                      <h3>{point.title}</h3>
                      <p>{point.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <section id="solucion" className="detail-section" data-reveal>
              <h2>
                <span>03 / Producto</span>La soluci?n.
              </h2>
              <div>
                <p>{project.solution}</p>
                <ul className="solution-list">
                  {project.solutionFeatures.map((feature) => (
                    <li key={feature}>
                      <ArrowUpRight size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            {project.process.length > 0 && (
              <section id="proceso" className="detail-section" data-reveal>
                <h2>
                  <span>04 / Desarrollo</span>El proceso.
                </h2>
                <div>
                  {project.process.map((step) => (
                    <article className="process-row" key={step.step}>
                      <span>{step.step}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
            {project.results.length > 0 && (
              <section id="resultados" className="detail-section" data-reveal>
                <h2>
                  <span>05 / Impacto</span>Los resultados.
                </h2>
                <div className="results-grid">
                  {project.results.map((result) => (
                    <article key={result.label}>
                      <strong>{result.value}</strong>
                      <p>{result.label}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
            <section id="tecnologias" className="detail-section" data-reveal>
              <h2>
                <span>06 / Stack</span>Las herramientas.
              </h2>
              <ul className="detail-tech">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </section>
            {project.gallery.length > 0 && (
              <section id="galeria" className="gallery-section">
                <p className="eyebrow">07 / Dentro del producto</p>
                <h2>Una mirada m?s cerca.</h2>
                <div className="detail-gallery">
                  {project.gallery.map((src, index) => (
                    <figure key={src} data-reveal>
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          "Abrir vista " + (index + 1) + " de " + project.title
                        }
                      >
                        <Image
                          src={src}
                          alt={project.title + " ? vista " + (index + 1)}
                          width={1400}
                          height={900}
                          sizes="(max-width: 768px) 100vw, 1200px"
                        />
                      </a>
                      <figcaption>
                        <span>
                          0{index + 1} / {project.title}
                        </span>
                        <span>Abrir imagen ?</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
            <Link className="text-link detail-return" href="/#proyectos">
              <ArrowLeft size={16} /> Volver a proyectos
            </Link>
          </div>
          <ContactSection />
        </main>
        <footer className="shell editorial-footer">
          <Link href="/">Ignacio Ravettini Novellino</Link>
          <a href="#inicio">Volver arriba ?</a>
        </footer>
      </EditorialMotion>
    </>
  );
}
