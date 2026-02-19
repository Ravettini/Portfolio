import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-20 md:py-28', className)}>
      {(title || subtitle) && (
        <header className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 mb-12 md:mb-16">
          {title && (
            <h2 className="text-3xl font-extralight tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 max-w-xl text-sm font-light tracking-tight text-white/70">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
