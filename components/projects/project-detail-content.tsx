'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Database,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  Layers,
  Lightbulb,
  Mail,
  Sparkles,
} from 'lucide-react';
import type { Project } from '@/lib/projects';
import { getProjectCover } from '@/lib/projects';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'problema', label: 'Problema' },
  { id: 'solucion', label: 'Solución' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'galeria', label: 'Galería' },
];

const problemIcons = [Database, FileSpreadsheet, Eye];
const resultIcons = [Sparkles, Layers, Mail, Lightbulb];

type ProjectDetailContentProps = {
  project: Project;
};

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const [activeSection, setActiveSection] = useState('resumen');
  const cover = getProjectCover(project);
  const hasGallery = project.gallery.length > 0;

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <Link
          href="/#proyectos"
          className="inline-flex items-center gap-2 text-sm font-light text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Proyectos
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-400">
              Proyecto destacado
            </p>
            <h1 className="mt-3 text-3xl font-extralight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-white/65">
              {project.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-light uppercase tracking-wider text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-400"
            >
              Ver proyecto en vivo
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {cover && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14]/80 shadow-2xl shadow-black/40">
              <Image
                src={cover}
                alt={project.title}
                width={1200}
                height={750}
                className="h-auto w-full"
                priority
              />
            </div>
          )}
        </header>

        <nav className="sticky top-[72px] z-40 mt-10 overflow-x-auto border-b border-white/10 bg-[#05070a]/90 backdrop-blur-md">
          <ul className="flex min-w-max gap-1 pb-px">
            {navItems
              .filter((item) => item.id !== 'galeria' || hasGallery)
              .map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'inline-block px-4 py-3 text-xs font-light tracking-tight transition-colors',
                    activeSection === item.id
                      ? 'border-b-2 border-sky-400 text-white'
                      : 'text-white/50 hover:text-white/80'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-20">
          <section id="resumen" className="scroll-mt-36 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-white">
                ¿Qué es {project.title}?
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/65 md:text-base">
                {project.what}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0b0f14]/70 p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                    Tipo de proyecto
                  </dt>
                  <dd className="mt-1 text-sm font-light text-white/80">{project.meta.type}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                    Cliente
                  </dt>
                  <dd className="mt-1 text-sm font-light text-white/80">{project.meta.client}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                    Fecha
                  </dt>
                  <dd className="mt-1 text-sm font-light text-white/80">{project.meta.date}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section id="problema" className="scroll-mt-36 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-white">El problema</h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/65 md:text-base">
                {project.problem}
              </p>
            </div>
            <div className="space-y-3">
              {project.problemPoints.map((point, index) => {
                const Icon = problemIcons[index % problemIcons.length];
                return (
                  <div
                    key={point.title}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-[#0b0f14]/70 p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-light text-white/90">{point.title}</h3>
                      <p className="mt-1 text-xs font-light leading-relaxed text-white/55">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="solucion" className="scroll-mt-36 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-white">La solución</h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/65 md:text-base">
                {project.solution}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0b0f14]/70 p-6">
              <ul className="space-y-4">
                {project.solutionFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm font-light text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="proceso" className="scroll-mt-36 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-white">Proceso</h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/65 md:text-base">
                Desde el relevamiento inicial hasta la iteración en producción, el desarrollo siguió
                un enfoque incremental orientado a resolver el problema operativo real.
              </p>
            </div>
            <div className="relative space-y-0">
              {project.process.map((step, index) => (
                <div key={step.step} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < project.process.length - 1 && (
                    <span className="absolute left-[18px] top-10 h-[calc(100%-12px)] w-px bg-white/10" />
                  )}
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-light text-sky-400">
                    {step.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-light text-white/90">{step.title}</h3>
                    <p className="mt-1 text-xs font-light leading-relaxed text-white/55">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="resultados" className="scroll-mt-36 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-white">Resultados</h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-white/65 md:text-base">
                El producto transformó un flujo manual y fragmentado en una operación más rápida,
                trazable y escalable, con impacto directo en la eficiencia del equipo.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.results.map((result, index) => {
                const Icon = resultIcons[index % resultIcons.length];
                return (
                  <div
                    key={result.label}
                    className="rounded-2xl border border-white/10 bg-[#0b0f14]/70 p-5"
                  >
                    <Icon className="h-4 w-4 text-sky-400" />
                    <p className="mt-3 text-xl font-light text-white">{result.value}</p>
                    <p className="mt-1 text-xs font-light text-white/55">{result.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="tecnologias" className="scroll-mt-36">
            <h2 className="text-2xl font-light tracking-tight text-white">Tecnologías</h2>
            <p className="mt-3 max-w-2xl text-sm font-light text-white/60">
              Stack y capacidades principales utilizadas en el desarrollo del proyecto.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-light uppercase tracking-wider text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {hasGallery && (
            <section id="galeria" className="scroll-mt-36">
              <h2 className="text-2xl font-light tracking-tight text-white">Galería</h2>
              <p className="mt-3 text-sm font-light text-white/60">Algunas vistas del sistema.</p>
              <div
                className={cn(
                  'mt-6 grid gap-4',
                  project.gallery.length >= 3
                    ? 'sm:grid-cols-2 lg:grid-cols-3'
                    : 'sm:grid-cols-2'
                )}
              >
                {project.gallery.map((src, index) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f14]/70"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — vista ${index + 1}`}
                      width={800}
                      height={500}
                      className="h-auto w-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
