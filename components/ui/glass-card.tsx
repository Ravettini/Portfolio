import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export function GlassCard({ children, className, as: Component = 'div' }: GlassCardProps) {
  return (
    <Component
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm',
        'transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]',
        'focus-within:border-white/20',
        className
      )}
    >
      {children}
    </Component>
  );
}
