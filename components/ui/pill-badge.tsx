import { cn } from '@/lib/utils';

interface PillBadgeProps {
  label?: string;
  text: string;
  className?: string;
}

/** Hero-style pill: label (uppercase) · text. Matches hero badge. */
export function PillBadge({ label, text, className }: PillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm',
        'text-[10px] font-light uppercase tracking-[0.08em] text-white/70',
        className
      )}
    >
      {label && <span>{label}</span>}
      {label && <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />}
      <span className="text-xs font-light tracking-tight text-white/80">{text}</span>
    </span>
  );
}
