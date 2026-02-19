'use client';

import dynamic from 'next/dynamic';

const NeuralNetworkHero = dynamic(
  () => import('@/components/ui/neural-network-hero').then((m) => m.default),
  { ssr: false }
);

export function HeroClient() {
  return (
    <NeuralNetworkHero
      title="Datos claros. Productos sólidos."
      description="Analizo datos para decisiones públicas y construyo aplicaciones web modernas con foco en claridad, impacto y buenas prácticas."
      badgeLabel="Actualmente"
      badgeText="GCBA"
      ctaButtons={[
        { text: 'Ver proyectos', href: '#proyectos', primary: true },
        { text: 'Contacto', href: '#contacto' },
      ]}
      microDetails={['SQL & Visualización', 'React / Next.js', 'Comunicación clara']}
    />
  );
}
