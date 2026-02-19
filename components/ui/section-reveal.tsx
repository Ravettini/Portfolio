'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Si es true, los hijos directos se animan con stagger (delay escalonado) */
  stagger?: boolean;
  /** Clase para el contenedor de los hijos cuando stagger es true */
  staggerClass?: string;
}

export function SectionReveal({ children, className, stagger, staggerClass }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'section-reveal transition-all duration-700 ease-out',
        inView ? 'section-reveal-in-view opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
    >
      {stagger ? (
        <div className={cn('section-reveal-stagger', staggerClass)}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
