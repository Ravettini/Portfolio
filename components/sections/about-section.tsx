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
                  Analista de datos y Desarrollador Web. Desarrollo interfaces web modernas, analizo
                  datos para la toma de decisiones y diseño contenido educativo de programación.
                </p>
                <p className="mt-4 text-white/70 font-light leading-relaxed tracking-tight">
                  Especializado en soluciones que combinan tecnología y claridad comunicativa.
                  Actualmente en el Gobierno de la Ciudad de Buenos Aires (GCBA).
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
                    Analista de datos
                  </h3>
                  <p className="mt-2 text-sm font-light text-white/80 tracking-tight">
                    Análisis de datos para políticas públicas, informes y visualizaciones. Limpieza
                    de datos, SQL y dashboards. Trabajo en equipos multidisciplinarios con foco en
                    claridad y impacto.
                  </p>
                </GlassCard>
                <GlassCard>
                  <h3 className="text-[10px] font-light uppercase tracking-[0.08em] text-white/50">
                    Desarrollador web
                  </h3>
                  <p className="mt-2 text-sm font-light text-white/80 tracking-tight">
                    Interfaces y aplicaciones web modernas (React, Next.js). Integración de APIs,
                    mantenimiento evolutivo y buenas prácticas. Contenido didáctico y documentación
                    técnica.
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
