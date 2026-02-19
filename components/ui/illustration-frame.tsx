import Image from 'next/image';
import { cn } from '@/lib/utils';

interface IllustrationFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** Clases extra para la imagen (ej. lg:max-w-[420px]) */
  imageClassName?: string;
  /** sm = ~260px, md = ~320px */
  size?: 'sm' | 'md';
}

const sizeMap = { sm: { w: 260, h: 260 }, md: { w: 320, h: 320 } };

export function IllustrationFrame({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  size = 'md',
}: IllustrationFrameProps) {
  const { w, h } = sizeMap[size];
  const wPx = width ?? w;
  const hPx = height ?? h;

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center',
        'rounded-2xl',
        className
      )}
    >
      {/* Glow behind image */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(0,0,0,0) 60%)',
          filter: 'blur(28px)',
        }}
        aria-hidden
      />
      <div
        className="relative"
        style={{
          filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.35)) drop-shadow(0 0 18px rgba(59,130,246,0.12))',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={wPx}
          height={hPx}
          className={cn(
          'h-auto w-full max-w-[260px] object-contain md:max-w-[320px]',
          imageClassName
        )}
          sizes="(max-width: 768px) 260px, (max-width: 1023px) 320px, 420px"
        />
      </div>
    </div>
  );
}
