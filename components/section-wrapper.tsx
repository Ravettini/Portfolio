import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 md:py-28',
        'mx-auto max-w-7xl px-6 md:px-10 lg:px-16',
        className
      )}
    >
      {children}
    </section>
  );
}
