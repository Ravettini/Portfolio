import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Mail, Linkedin } from 'lucide-react';

const links = [
  {
    label: 'Email',
    href: 'mailto:ignaciorave21@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ignacio-ravettini-novellino/',
    icon: Linkedin,
  },
];

export function ContactSection() {
  return (
    <Section
      id="contacto"
      title="Contacto"
      subtitle="Escribime por cualquiera de estos canales."
      className="bg-[#0b0f14]/30"
    >
      <Container>
        <SectionReveal>
          <GlassCard className="p-8 md:p-10">
            <div className="flex flex-col items-center text-center">
              <p className="max-w-md text-white/80 font-light leading-relaxed">
                Si querés conectar o charlar sobre datos, desarrollo o educación técnica, acá me encontrás.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {links.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-light text-white/80 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      <Icon className="h-4 w-4 text-white/60" />
                      {item.label}
                    </a>
                  );
                })}
              </div>
              <a
                href="/cv-ignacio-ravettini.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-2.5 text-xs font-light tracking-tight text-white/90 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Descargar CV
              </a>
              <p className="mt-8 text-xs font-light text-white/50">
                Buenos Aires, Argentina
              </p>
            </div>
          </GlassCard>
        </SectionReveal>
      </Container>
    </Section>
  );
}
