import Link from 'next/link';
import { ArrowRight, FileText, Lightbulb } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { truncateText } from '@/lib/projects';

type ProjectCardHeroProps = {
  project: Project;
};

export function ProjectCardHero({ project }: ProjectCardHeroProps) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-2xl"
    >
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14]/80 p-6 transition-all duration-300 hover:border-sky-500/30 hover:bg-[#0d1219]/90 md:p-8 lg:p-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-400">
          Proyecto destacado
        </p>
        <h3 className="mt-3 text-2xl font-light tracking-tight text-white md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm font-light leading-relaxed text-white/65">
          {project.shortDescription}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-sky-400">
              <FileText className="h-3.5 w-3.5" />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em]">Problema</span>
            </div>
            <p className="mt-2 text-xs font-light leading-relaxed text-white/60">
              {truncateText(project.problem, 140)}
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-sky-400">
              <Lightbulb className="h-3.5 w-3.5" />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em]">Solución</span>
            </div>
            <p className="mt-2 text-xs font-light leading-relaxed text-white/60">
              {truncateText(project.solution, 140)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-light uppercase tracking-wider text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 text-sm font-light text-sky-400 transition-colors group-hover:text-sky-300">
          Ver caso completo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </article>
    </Link>
  );
}
