import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    period: 'Septiembre 2025 – Presente',
    role: 'Desarrollador web full-stack',
    org: 'GCBA',
    tags: ['WebApps', 'APIs', 'React', 'Next.js'],
    points: [
      'Desarrollo de webapps',
      'Integración de APIs',
      'Mantenimiento evolutivo',
    ],
  },
  {
    period: 'Septiembre 2025 – Presente',
    role: 'Analista de datos',
    org: 'GCBA',
    tags: ['Data', 'Visualización', 'SQL', 'Informes'],
    points: [
      'Análisis de datos para políticas públicas',
      'Informes y visualizaciones',
      'Limpieza de datos',
      'Colaboración multidisciplinaria',
    ],
  },
  {
    period: 'Diciembre 2025 – Actualidad',
    role: 'Automatizador de procesos',
    org: 'Sofijobs',
    tags: ['N8N', 'Automatización', 'Procesos'],
    points: [
      'Automatización de procesos con N8N',
      'Diseño y mantenimiento de flujos',
    ],
  },
  {
    period: 'Mayo 2024 – Febrero 2025',
    role: 'Profesor de Programación e Informática',
    org: 'UTN FRBA e-Learning + Natán Gesang + Mater Dolorosa',
    tags: ['Educación', 'Desarrollo web', 'Mentoría'],
    points: [
      'Diseño de contenido',
      'Dictado de clases',
      'Fundamentos de programación',
      'Desarrollo web',
      'Mentoría',
    ],
  },
  {
    period: 'Marzo 2024',
    role: 'Pasante',
    org: 'Grupo MSA',
    tags: ['Ágil', 'Equipo'],
    points: [
      'Apoyo en desarrollo',
      'Metodologías ágiles',
      'Colaboración en equipo',
    ],
  },
];

export function ExperienceSection() {
  return (
    <Section
      id="experiencia"
      title="Experiencia"
      subtitle="Trayectoria en análisis de datos, desarrollo web y educación."
    >
      <Container>
        <div className="flex flex-col gap-16 md:gap-20">
          {experiences.map((exp, index) => (
            <SectionReveal key={index} stagger={false}>
              <div className="relative flex gap-6 md:gap-10">
                {/* Timeline line (gradient) */}
                {index < experiences.length - 1 && (
                  <div
                    className="absolute left-[11px] top-8 bottom-0 w-px md:left-[15px] bg-gradient-to-b from-white/10 to-transparent"
                    aria-hidden
                  />
                )}
                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0b0f14] md:h-7 md:w-7">
                  <Briefcase className="h-3 w-3 text-white/50 md:h-3.5 md:w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <GlassCard className="p-6 md:p-7">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[10px] font-light uppercase tracking-[0.08em] text-white/50">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-light tracking-tight text-white/90">
                      {exp.role}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/70">{exp.org}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-light uppercase tracking-wider text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
