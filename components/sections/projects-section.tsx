import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { GlassCard } from '@/components/ui/glass-card';
import { PillBadge } from '@/components/ui/pill-badge';
import { SectionReveal } from '@/components/ui/section-reveal';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Simulacro de Entrevistas (IA)',
    description:
      '¿Tenés una entrevista pronto y te da miedo que te vaya mal? Para eso armé un simulador de entrevistas basado en IA: subís tu CV, analiza tu perfil y te genera una entrevista personalizada para practicar, tanto de soft skills como de habilidades técnicas, ya sea en vivo o por turnos.',
    tech: ['IA', 'CV', 'Entrevistas'],
    href: 'https://simulacro-entrevista-1.onrender.com/',
    featured: true,
    placeholder: false,
  },
  {
    title: 'V-Mail Validator',
    description:
      'Sistema que detecta correos inválidos, filtra direcciones no deseadas y prepara listas más limpias para tus campañas institucionales.',
    tech: ['Next.js', 'TypeScript', 'Validación de datos'],
    href: 'https://vmailproject.vercel.app/',
    featured: false,
    placeholder: false,
  },
  {
    title: 'Media Compressor',
    description: 'Plataforma para comprimir imágenes y videos de forma rápida y simple.',
    tech: ['Next.js', 'TypeScript', 'FFmpeg', 'Vercel'],
    href: 'https://proyectocompresor.onrender.com/',
    featured: false,
    placeholder: false,
  },
  {
    title: 'Acqua Di Colbert',
    description: 'Landing page profesional con animaciones del perfume Acqua Di Colbert.',
    tech: ['Landing', 'Animaciones', 'Netlify'],
    href: 'https://acquadicolbert.netlify.app/',
    featured: false,
    placeholder: false,
  },
];

export function ProjectsSection() {
  return (
    <Section
      id="proyectos"
      title="Proyectos"
      subtitle="Aplicaciones y herramientas en contexto laboral y personal."
      className="bg-[#0b0f14]/20"
    >
      <Container>
        <SectionReveal stagger staggerClass="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <GlassCard
              key={index}
              as="article"
              className={
                project.featured
                  ? 'flex flex-col p-6 md:p-7 sm:col-span-2'
                  : 'flex flex-col p-6 md:p-7'
              }
            >
              <div className="flex flex-col flex-1">
                {project.featured && (
                  <PillBadge label="Destacado" text="En producción" className="mb-3 w-fit" />
                )}
                <h3 className="text-lg font-light tracking-tight text-white/90">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm font-light text-white/70">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-light uppercase tracking-wider text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center">
                  {project.placeholder ? (
                    <span className="text-xs font-light text-white/50">TODO</span>
                  ) : (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-light text-white/90 backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      Ver proyecto
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </SectionReveal>
      </Container>
    </Section>
  );
}
