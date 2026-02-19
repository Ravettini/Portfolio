import Link from 'next/link';
import { DemoHeroWrapper } from './demo-hero-wrapper';

/**
 * Página demo del Hero (referencia de integración).
 * Uso: import Hero from "@/components/ui/neural-network-hero"
 */
export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-light text-white/80 backdrop-blur-sm hover:bg-white/10 transition-colors"
        >
          ← Volver al portafolio
        </Link>
      </div>
      <DemoHeroWrapper />
    </div>
  );
}
