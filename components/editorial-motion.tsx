"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EditorialMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-intro]", {
          y: 28,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 40,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return <div ref={root}>{children}</div>;
}
