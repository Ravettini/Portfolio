"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
const links = [
  ["inicio", "Inicio"],
  ["proyectos", "Proyectos"],
  ["sobre-mi", "Perfil"],
  ["contacto", "Contacto"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefix = pathname === "/" ? "" : "/";
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          button.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const narrow = window.matchMedia("(max-width: 767px)");
    const resize = () => {
      if (!narrow.matches) setOpen(false);
    };
    narrow.addEventListener("change", resize);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      narrow.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Ir al contenido
      </a>
      <header className="editorial-nav">
        <div className="shell nav-inner">
          <Link
            className="wordmark"
            href="/"
            aria-label="Ignacio Ravettini, inicio"
          >
            ir<span>.</span>
          </Link>
          <nav className="desktop-nav" aria-label="Principal">
            {links.map(([id, label]) => (
              <Link href={prefix + "#" + id} key={id}>
                {label}
              </Link>
            ))}
          </nav>
          <a className="nav-contact" href="mailto:ignaciorave21@gmail.com">
            Conectemos <ArrowUpRight size={14} />
          </a>
          <button
            ref={button}
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar men?" : "Abrir men?"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div ref={panel} id="mobile-nav" className="mobile-nav">
            <nav aria-label="Principal móvil">
              {links.map(([id, label]) => (
                <Link
                  href={prefix + "#" + id}
                  key={id}
                  onClick={() => {
                    setOpen(false);
                    button.current?.focus();
                  }}
                >
                  {label}
                  <ArrowUpRight />
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
