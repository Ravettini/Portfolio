"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SculptureFallback } from "./sculpture-fallback";
const SculptureScene = dynamic(() => import("./sculpture-scene"), {
  ssr: false,
  loading: () => <SculptureFallback />,
});
export function HeroClient() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.to(".hero-object", {
          y: 70,
          scale: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={root} id="inicio" className="editorial-hero shell">
      <div className="hero-topline" data-intro>
        <span>
          <i className="status-dot" /> Desarrollador web full stack
        </span>
        <span>Buenos Aires, Argentina</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow" data-intro>
            Interfaces. Sistemas. Productos.
          </p>
          <h1 data-intro>
            Ignacio
            <br />
            <span>Ravettini.</span>
          </h1>
          <p className="hero-description" data-intro>
            Transformo problemas reales en software que funciona. Del primer
            concepto a un producto en producción.
          </p>
          <div className="hero-actions" data-intro>
            <a className="button-primary" href="#proyectos">
              Ver proyectos <ArrowDown size={16} />
            </a>
            <a className="text-link" href="#contacto">
              Hablemos <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-object">
          <SculptureScene />
          <div className="object-caption">
            <span>01 / Forma & función</span>
            <span>Diseñado para conectar.</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <span>Actualmente en GCBA</span>
        <span>Frontend ? Backend ? Producto</span>
        <a href="#proyectos" aria-label="Ir a proyectos">
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
