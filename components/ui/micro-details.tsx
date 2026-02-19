import { cn } from '@/lib/utils';

interface MicroDetailsProps {
  items: string[];
  className?: string;
}

/** Hero-style micro-details row: dot · label. */
export function MicroDetails({ items, className }: MicroDetailsProps) {
  return (
    <ul
      className={cn(
        'flex flex-wrap gap-6 text-xs font-extralight tracking-tight text-white/60',
        className
      )}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
