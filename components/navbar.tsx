'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1)).filter(Boolean);
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight / 2;
      let current: string | null = null;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (viewportMid >= top && viewportMid < top + height) {
          current = id;
          break;
        }
        if (top > viewportMid) break;
        current = id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-[#05070a]/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <Link
          href="#inicio"
          className="flex items-center gap-2 text-sm font-light tracking-tight text-white/90 hover:text-white transition-colors"
        >
          <Image
            src="/dibujos_rana/logo.png"
            alt=""
            width={26}
            height={26}
            className="h-[26px] w-auto"
          />
          <span>Ignacio R. N.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-xs font-light tracking-tight transition-colors',
                    isActive ? 'text-white/90' : 'text-white/70 hover:text-white/90'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-light tracking-tight text-white/50 backdrop-blur-sm cursor-not-allowed"
            title="Próximamente"
          >
            CV disponible próximamente
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0b0f14]/95 backdrop-blur-md px-6 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-light text-white/80 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
