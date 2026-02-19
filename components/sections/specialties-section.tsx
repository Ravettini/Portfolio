import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { SectionReveal } from '@/components/ui/section-reveal';
import { ArrowRight } from 'lucide-react';

const specialties = [
  {
    id: 'data',
    image: encodeURI('/dibujos_rana/data analyst.png'),
    title: 'Data Analyst',
    bullets: ['Dashboards y KPIs', 'Análisis exploratorio', 'Data cleaning'],
  },
  {
    id: 'fullstack',
    image: '/dibujos_rana/full_stack.png',
    title: 'Full Stack',
    bullets: ['Apps web end-to-end', 'APIs + DB', 'UI/UX moderno'],
  },
  {
    id: 'automation',
    image: encodeURI('/dibujos_rana/workflow fuilder (automatization.png'),
    title: 'Automatización',
    bullets: ['Workflows (n8n)', 'Integración de servicios', 'Generación de documentos'],
  },
];

export function SpecialtiesSection() {
  return (
    <Section
      id="especialidades"
      title="Lo que construyo"
      subtitle="Data, desarrollo full-stack y automatización de procesos."
      className="bg-[#0b0f14]/20"
    >
      <Container>
        <SectionReveal stagger staggerClass="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] focus-within:border-white/20"
            >
              <div className="relative flex min-h-[200px] shrink-0 items-center justify-center rounded-xl">
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(0,0,0,0) 65%)',
                    filter: 'blur(24px)',
                  }}
                  aria-hidden
                />
                <div
                  className="relative transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  style={{
                    filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.35)) drop-shadow(0 0 16px rgba(59,130,246,0.1))',
                  }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    width={240}
                    height={200}
                    className="h-auto w-full max-w-[240px] object-contain"
                    sizes="(max-width: 640px) 220px, 240px"
                  />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-light tracking-tight text-white/90">
                {item.title}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="#proyectos"
                className="mt-6 inline-flex items-center gap-2 text-sm font-light text-white/80 transition-colors hover:text-white/95 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg py-1 -ml-1"
              >
                Ver proyectos
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </SectionReveal>
      </Container>
    </Section>
  );
}
