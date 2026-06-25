import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { GlassCard } from '@/components/ui/glass-card';
import { IllustrationFrame } from '@/components/ui/illustration-frame';
import { SectionReveal } from '@/components/ui/section-reveal';

export function AboutSection() {
  return (
    <Section id="sobre-mi" title="Sobre mí" subtitle="Quién soy y qué hago." className="bg-[#0b0f14]/30">
      <SectionReveal>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-white/90 font-light leading-relaxed tracking-tight">
                  Desarrollador web full stack y creador de software. Diseño y construyo
                  aplicaciones web completas: interfaces modernas, APIs, bases de datos e
                  integraciones, con foco en producto y en que la solución funcione en el mundo
                  real.
                </p>
                <p className="mt-4 text-white/70 font-light leading-relaxed tracking-tight">
                  Especializado en transformar procesos manuales en plataformas web usables,
                  escalables y mantenibles. Actualmente en el Gobierno de la Ciudad de Buenos Aires
                  (GCBA).
                </p>
              </div>
              <div className="lg:hidden flex justify-center">
                <IllustrationFrame
                  src={encodeURI('/dibujos_rana/Rana frente a la pc.png')}
                  alt="Ilustración: trabajo en PC"
                  size="sm"
                />
              </div>
              <div className="flex flex-col gap-6">
                <GlassCard>
                  <h3 className="text-[10px] font-light uppercase tracking-[0.08em] text-white/50">
                    Desarrollador web full stack
                  </h3>
                  <p className="mt-2 text-sm font-light text-white/80 tracking-tight">
                    Webapps, paneles administrativos y plataformas a medida con React, Next.js,
                    Node.js y PostgreSQL. Trabajo de punta a punta: arquitectura, frontend, backend,
                    despliegue y evolución del producto.
                  </p>
                </GlassCard>
                <GlassCard>
                  <h3 className="text-[10px] font-light uppercase tracking-[0.08em] text-white/50">
                    Producto y automatización
                  </h3>
                  <p className="mt-2 text-sm font-light text-white/80 tracking-tight">
                    Integración de APIs, flujos automatizados y herramientas internas que ordenan
                    operaciones reales. También experiencia en contenido didáctico y documentación
                    técnica cuando el proyecto lo requiere.
                  </p>
                </GlassCard>
              </div>
            </div>
            <div className="hidden lg:flex items-start justify-center">
              <IllustrationFrame
                src={encodeURI('/dibujos_rana/Rana frente a la pc.png')}
                alt="Ilustración: trabajo en PC"
                size="md"
                imageClassName="lg:max-w-[420px]"
              />
            </div>
          </div>
        </Container>
      </SectionReveal>
    </Section>
  );
}
