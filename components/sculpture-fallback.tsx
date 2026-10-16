import { useId } from "react";

export function SculptureFallback() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="sculpture-fallback"
      viewBox="0 0 600 600"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#b9c7dc" />
          <stop offset=".25" stopColor="#233a5d" />
          <stop offset=".5" stopColor="#708aa9" />
          <stop offset=".7" stopColor="#0f1f3d" />
          <stop offset="1" stopColor="#e2e9f3" />
        </linearGradient>
        <radialGradient id={`${id}core`}>
          <stop stopColor="#7b93b5" />
          <stop offset=".65" stopColor="#233a5d" />
          <stop offset="1" stopColor="#08101f" />
        </radialGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="28">
        <ellipse
          cx="300"
          cy="300"
          rx="205"
          ry="91"
          transform="rotate(-32 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="205"
          ry="91"
          transform="rotate(32 300 300)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="91"
          ry="205"
          transform="rotate(12 300 300)"
        />
      </g>
      <circle cx="300" cy="300" r="65" fill={`url(#${id}core)`} />
    </svg>
  );
}
