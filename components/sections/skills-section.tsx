import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionReveal } from '@/components/ui/section-reveal';

const skillGroups = [
  {
    label: 'Web',
    skills: [
      'HTML', 'CSS', 'Bootstrap', 'Tailwind', 'JS', 'TS', 'React', 'Next.js',
      'jQuery', 'Responsive Design', 'Vite', 'Express', 'Prisma',
    ],
  },
  {
    label: 'Backend / DB',
    skills: [
      'SQL Server', 'MongoDB', 'APIs', 'CRUD', 'Node.js', 'Express', 'REST',
    ],
  },
  {
    label: 'Datos',
    skills: [
      'Manejo de datos', 'SQL queries', 'Limpieza', 'Visualizaciones',
      'Informes', 'Análisis estadístico',
    ],
  },
  {
    label: 'Educación / Comunicación',
    skills: [
      'Contenido didáctico', 'Currículas', 'Comunicación técnica', 'Documentación',
    ],
  },
  {
    label: 'Soft',
    skills: [
      'Comunicación clara', 'Trabajo en equipo', 'Organización',
      'Orientación a resultados', 'Mejora continua', 'Resolución de problemas',
    ],
  },
];

export function SkillsSection() {
  return (
    <Section
      id="habilidades"
      title="Habilidades"
      subtitle="Tecnologías y competencias con las que trabajo."
    >
      <Container>
        <SectionReveal stagger staggerClass="flex flex-col gap-8">
          {skillGroups.map((group) => (
            <GlassCard key={group.label} className="p-6">
              <h3 className="text-[10px] font-light uppercase tracking-[0.08em] text-white/50 mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-light text-white/80 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </SectionReveal>
      </Container>
    </Section>
  );
}
