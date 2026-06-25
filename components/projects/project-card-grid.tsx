import Link from 'next/link';
import { ArrowRight, ExternalLink, FileText, Lightbulb } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { truncateText } from '@/lib/projects';

type ProjectCardGridProps = {
  project: Project;
  external?: boolean;
};

export function ProjectCardGrid({ project, external = false }: ProjectCardGridProps) {
  const href = external ? project.href : `/proyectos/${project.slug}`;
  const isExternal = external;

  const content = (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0b0f14]/70 p-5 transition-all duration-300 hover:border-sky-500/25 hover:bg-[#0d1219]/85 md:p-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-sky-400">
        {project.category}
      </p>
      <h3 className="mt-2 text-lg font-light tracking-tight text-white/90 group-hover:text-white">
        {project.title}
      </h3>
      <p className="mt-2 text-sm font-light leading-relaxed text-white/60">
        {project.shortDescription}
      </p>

      {project.hasDetailPage && project.problem && project.solution && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <div className="flex items-center gap-1.5 text-sky-400">
              <FileText className="h-3 w-3" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em]">Problema</span>
            </div>
            <p className="mt-1.5 text-[11px] font-light leading-relaxed text-white/55">
              {truncateText(project.problem, 90)}
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <div className="flex items-center gap-1.5 text-sky-400">
              <Lightbulb className="h-3 w-3" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em]">Solución</span>
            </div>
            <p className="mt-1.5 text-[11px] font-light leading-relaxed text-white/55">
              {truncateText(project.solution, 90)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-light uppercase tracking-wider text-white/50"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-end gap-2 pt-5 text-sm font-light text-sky-400 transition-colors group-hover:text-sky-300">
        {isExternal ? (
          <>
            Ver proyecto
            <ExternalLink className="h-3.5 w-3.5" />
          </>
        ) : (
          <>
            Ver caso completo
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </div>
    </article>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-2xl"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-2xl"
    >
      {content}
    </Link>
  );
}
