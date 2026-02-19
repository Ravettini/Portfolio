# Portafolio — Ignacio Ravettini Novellino

Portafolio profesional (Data Analyst | Web Developer). Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, hero con shader CPPN (Three.js + R3F).

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (convenciones; componentes en `/components/ui`)
- **Hero**: GSAP, Three.js, @react-three/fiber v9 (compatible con React 19), shader CPPN (sin drei)

## Instalación

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` es necesario por compatibilidad React 19 + @react-three/fiber.

## Scripts

```bash
npm run dev    # Desarrollo (Turbopack)
npm run build  # Build producción
npm run start  # Servidor producción
npm run lint   # ESLint
```

## Estructura relevante

- **Componentes UI (shadcn)**: `/components/ui` — aquí vive `neural-network-hero.tsx`.
- **Uso del Hero**: `import Hero from "@/components/ui/neural-network-hero"`. En la home se usa vía `HeroClient` (dynamic, ssr: false).
- **Demo del Hero**: ruta `/demo` — muestra el Hero con el contenido de ejemplo de la referencia (Where algorithms become art, etc.).

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── demo/
│   │   ├── page.tsx              # Página demo del Hero
│   │   └── demo-hero-wrapper.tsx
│   └── globals.css
├── components/
│   ├── navbar.tsx
│   ├── hero-client.tsx           # Wrapper cliente para Hero (dynamic, ssr: false)
│   ├── section-wrapper.tsx
│   ├── sections/
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── contact-section.tsx
│   │   └── footer-section.tsx
│   └── ui/
│       └── neural-network-hero.tsx
├── lib/
│   └── utils.ts
├── types/
│   └── react-three-fiber.d.ts   # Extensión JSX para R3F (mesh, etc.)
├── idea.md
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Diseño

- **Identidad**: azul oscuro elegante (#05070a, #0b0f14, #0f1720).
- **Sin** violeta, magenta, cyan ni neon.
- **Texto**: white/90, white/70, white/50.
- **Superficies**: glass (bg-white/5, backdrop-blur), bordes white/10.
- **Motion**: sutil; se respeta `prefers-reduced-motion`.

## Accesibilidad

- Hero: con `prefers-reduced-motion` se reduce animación GSAP y se congela el shader en el primer frame.
- `globals.css`: reduce duración de animaciones/transiciones cuando el usuario prefiere menos movimiento.
- Enfoque visible y enlaces semánticos en navbar y secciones.

## TODOs

- [ ] **Contacto**: reemplazar placeholders (email, LinkedIn, GitHub) por datos reales cuando se tengan.
- [ ] **Proyectos 2 y 3**: reemplazar placeholders por descripción y enlaces reales.
- [ ] **CV**: habilitar botón "Descargar CV" y enlazar archivo cuando esté disponible.
- [ ] **TypeScript**: en `next.config.ts` está `typescript.ignoreBuildErrors: true` por un conflicto entre los tipos de @react-three/fiber (mesh, planeGeometry, etc.) y el typecheck de Next. Si en el futuro los tipos de R3F se cargan correctamente en el build, se puede quitar esta opción y eliminar el workaround.

## Contenido y reglas

- **idea.md** es la fuente de verdad: identidad, colores, estructura y contenido.
- Si algo contradice idea.md, idea.md tiene prioridad.
