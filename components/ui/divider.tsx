import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  /** Vertical (timeline) or horizontal */
  orientation?: 'horizontal' | 'vertical';
}

/** Subtle gradient line (hero-style). */
export function Divider({ className, orientation = 'horizontal' }: DividerProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-transparent via-white/10 to-transparent',
        orientation === 'vertical' && 'h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent',
        orientation === 'horizontal' && 'h-px w-full',
        className
      )}
      aria-hidden
    />
  );
}
