import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  getHeroProject,
  getFeaturedGridProjects,
  getOtherProjects,
  getProjectCover,
  type Project,
} from "@/lib/projects";
function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cover = getProjectCover(project);
  const external = !project.hasDetailPage;
  return (
    <article
      className={"project-feature " + (index === 0 ? "project-lead" : "")}
      data-reveal
    >
      <a
        className="project-image"
        href={external ? project.href : "/proyectos/" + project.slug}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={"Ver " + project.title}
      >
        <div className="project-image-top">
          <span>
            {String(index + 1).padStart(2, "0")} / {project.category}
          </span>
          <ArrowUpRight size={18} />
        </div>
        {cover ? (
          <Image
            src={cover}
            alt={"Interfaz de " + project.title}
            width={1400}
            height={900}
            sizes={
              index === 0
                ? "(max-width: 768px) 100vw, 1200px"
                : "(max-width: 768px) 100vw, 600px"
            }
          />
        ) : (
          <div className="project-placeholder">{project.title}</div>
        )}
      </a>
      <div className="project-description">
        <div>
          <p className="eyebrow">
            {project.meta.type} / {project.meta.date}
          </p>
          <h3>
            <a
              href={external ? project.href : "/proyectos/" + project.slug}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {project.title} <ArrowUpRight size={24} />
            </a>
          </h3>
        </div>
        <p>{project.shortDescription}</p>
      </div>
      <div className="tech-line">{project.tech.join(" / ")}</div>
    </article>
  );
}
export function ProjectsSection() {
  const hero = getHeroProject();
  return (
    <section id="proyectos" className="editorial-section shell">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">01 / Trabajo seleccionado</p>
        <div>
          <h2>
            Ideas que llegaron
            <br />a <span>producción.</span>
          </h2>
          <p>
            Aplicaciones, plataformas y herramientas.
            <br />
            Pensadas para usarse en el mundo real.
          </p>
        </div>
      </div>
      {hero && <ProjectFeature project={hero} index={0} />}
      <div className="project-grid">
        {getFeaturedGridProjects().map((project, index) => (
          <ProjectFeature
            key={project.slug}
            project={project}
            index={index + 1}
          />
        ))}
      </div>
      <div className="other-projects" data-reveal>
        <p className="eyebrow">Más exploraciones</p>
        {getOtherProjects().map((project) => (
          <a
            key={project.slug}
            href={
              project.hasDetailPage
                ? "/proyectos/" + project.slug
                : project.href
            }
            target={project.hasDetailPage ? undefined : "_blank"}
            rel={project.hasDetailPage ? undefined : "noopener noreferrer"}
          >
            <span>
              {project.title}
              <small>{project.category}</small>
            </span>
            <ArrowUpRight />
          </a>
        ))}
      </div>
    </section>
  );
}
