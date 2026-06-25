'use client';

import dynamic from 'next/dynamic';

const NeuralNetworkHero = dynamic(
  () => import('@/components/ui/neural-network-hero').then((m) => m.default),
  { ssr: false }
);

export function HeroClient() {
  return (
    <NeuralNetworkHero
      title="Creo software web que resuelve problemas reales."
      description="Desarrollador web full stack. Diseño, construyo y mantengo aplicaciones web completas — desde la interfaz hasta la base de datos — con foco en producto, claridad y buenas prácticas."
      badgeLabel="Actualmente"
      badgeText="GCBA"
      ctaButtons={[
        { text: 'Ver proyectos', href: '#proyectos', primary: true },
        { text: 'Contacto', href: '#contacto' },
      ]}
      microDetails={['React / Next.js', 'Full stack', 'Productos en producción']}
    />
  );
}
