# Portafolio — Ignacio Ravettini Novellino

Portafolio full stack construido como un escritorio inspirado en macOS. Los nueve proyectos reales se abren como aplicaciones; incluye perfil, experiencia, tecnologías, contacto, CV, terminal, búsqueda, ajustes de apariencia y una carpeta Utilidades con cuatro herramientas funcionales.

## Desarrollo

Requiere Node.js y npm compatibles con Next.js 15.

```bash
npm install --legacy-peer-deps
npm run dev
```

El inicio presenta una breve carga y permite entrar como Visitante sin contraseña. La sesión se recuerda dentro de la pestaña para volver desde un caso de estudio o recargar sin repetir el ingreso. Cambiar usuario conserva las aplicaciones montadas; Reiniciar sistema reinicia las ventanas y repite la carga. La animación se puede omitir y respeta movimiento reducido.

La home queda disponible en `http://localhost:3000`. El script de desarrollo usa Turbopack.

## Verificación y producción

```bash
npx tsc --noEmit
npm run build
npm run start
```

El chequeo de TypeScript se ejecuta por separado porque `next.config.ts` conserva `typescript.ignoreBuildErrors` para la compatibilidad histórica del demo R3F. Un build correcto no reemplaza el chequeo de tipos. `PORTFOLIO_DIST_DIR` permite cambiar el directorio de salida para validar producción junto con el servidor de desarrollo.

La verificación de navegador local está en `.impeccable/review/verify.mjs`:

```bash
node .impeccable/review/verify.mjs
node .impeccable/review/session-check.mjs
node .impeccable/review/desktop-refinements.mjs
node --experimental-strip-types .impeccable/review/icon-grid-check.mjs
node .impeccable/review/desktop-selection-check.mjs
node .impeccable/review/utilities-check.mjs
```

Requiere el servidor activo, el helper Playwright instalado en `.impeccable/tools` y Microsoft Edge en la ruta Windows indicada en el script. `PORTFOLIO_TEST_URL` cambia la URL de prueba. Los scripts comprueban interacciones del escritorio y la secuencia de inicio, ingreso y sesión y guardan evidencia en `.impeccable/review`.

`npm run lint` conserva el comando histórico `next lint`; su compatibilidad con Next.js 15 y ESLint 9 debe revisarse antes de usarlo como comprobación. Las comprobaciones principales son TypeScript y build.

## Estructura

- `app/page.tsx`: home que monta `OperatingSystem`.
- `components/desktop/operating-system.tsx`: inicio, selección de Visitante y sesión por pestaña.
- `app/boot.css`: paleta, tipografía, animación y adaptación del inicio e ingreso.
- `app/os.css`: tokens, ventanas, aplicaciones y adaptación móvil.
- `components/desktop/utilities-apps.tsx`: Paint, Calculadora, Bloc de notas, Reloj y carpeta Utilidades.
- `app/utilities.css`: estilos adaptables de las herramientas, reutilizando los tokens del escritorio.
- `components/desktop/`: escritorio, iconos semánticos, aplicaciones y casos de estudio.
- `lib/desktop-grid.ts`: celdas de escritorio, ubicación libre más cercana, normalización y movimiento por teclado.
- `lib/projects.ts`: fuente de los nueve proyectos, enlaces, capturas y contenido.
- `app/proyectos/[slug]/page.tsx`: casos disponibles, rutas estáticas y metadatos.
- `public/proyectos/`: capturas reales; `public/desktop/`: wallpaper; `public/cv-ignacio-ravettini.pdf`: CV descargable.
- `app/layout.tsx`: Plus Jakarta Sans alojada localmente (licencia OFL en `public/fonts`), metadatos y Google Analytics.
- `app/demo/`: demo legado del hero con shader CPPN. Se conservan sus dependencias Three.js, React Three Fiber y GSAP.

## Diseño y contenido

La dirección vigente es el escritorio azul con ventanas suaves y aplicaciones de proyecto de 48px, aprobado con `.impeccable/mocks/desktop-apps-small.png`. El usuario reemplazó explícitamente la dirección editorial anterior de `idea.md`; ese archivo permanece como antecedente histórico. `PRODUCT.md` registra propósito y restricciones; `DESIGN.md` documenta el sistema implementado y `.impeccable/design.json` sus extensiones.

El escritorio abre una única ventana de bienvenida centrada; en celular mantiene primero la grilla de proyectos. Este estado reemplaza la composición anterior de dos ventanas según las nuevas capturas del usuario. Los doce iconos (diez proyectos, Utilidades y DOOM) siguen libremente al puntero mientras se mantiene el clic, sin abrir aplicaciones. Solo al soltar encajan en celdas libres de la grilla, sin dejar iconos superpuestos ni desplazar los de celdas ocupadas. Esta aclaración del usuario reemplaza el ajuste continuo durante el movimiento. La vista previa no cambia posiciones guardadas; cancelar o Escape la descarta. Las posiciones se guardan localmente; las posiciones antiguas y los cambios de tamaño se normalizan a celdas válidas y únicas. Alt y flechas mueve una celda, o tres con Shift, saltando las ocupadas en esa dirección. Ordenar escritorio restaura la disposición inicial.

Arrastrar sobre el fondo dibuja un recuadro azul para seleccionar varias aplicaciones. Ctrl/Cmd-clic o Ctrl/Cmd-Espacio suma o quita iconos sin abrirlos; Escape o un recuadro vacío limpia la selección. Arrastrar un icono seleccionado mueve el grupo: al soltar conserva su formación si hay lugar, o distribuye sus miembros en celdas libres cercanas. Un clic normal sigue abriendo el proyecto.

Las ventanas permiten abrir, cerrar, minimizar, restaurar, maximizar y arrastrar en escritorio. En celular se presentan como hojas y los proyectos se distribuyen en tres columnas. Ajustes guarda apariencia clara/oscura, wallpaper y movimiento reducido localmente. Se contemplan foco visible, controles etiquetados, búsqueda con teclado y `prefers-reduced-motion`.

Al maximizar una ventana, el dock se oculta y el contenido ocupa el espacio liberado. El borde inferior central permite mostrarlo con puntero, toque o gesto hacia arriba; el foco de teclado también lo revela. Los tooltips flotantes esperan tres segundos con puntero y aparecen inmediatamente con foco de teclado. El movimiento reducido conserva esa espera.

La décima aplicación del escritorio, Utilidades, agrupa Paint (pincel, goma, deshacer/rehacer y descarga PNG), Calculadora (operaciones básicas con teclado), Bloc de notas (guardado local con debounce de 250ms, guardado al cerrar y descarga TXT) y Reloj (hora de Buenos Aires y cronómetro con vueltas). También se encuentran en la búsqueda y se abren desde la terminal con `open paint`, `open calculator`, `open notepad` o `open clock`. Las notas persisten en este navegador; el resto conserva su estado mientras la ventana permanece montada.

El CV descargable mantiene `/cv-ignacio-ravettini.pdf` y sirve el PDF de reemplazo suministrado por el usuario.

Contacto real: [ignaciorave21@gmail.com](mailto:ignaciorave21@gmail.com) y [LinkedIn](https://www.linkedin.com/in/ignacio-ravettini-novellino/). Los proyectos, casos y CV están integrados.

La ejecución del detector registrada para la selección de escritorio mostró 83 hallazgos ADVISORY sobre documentación histórica de color y tipografía, sin un problema primario. Esto no certifica los gates completos. El sistema visual se conserva y se extiende con el recuadro azul de selección.

La documentación describe el código actual. No certifica el cierre de los gates del motor Impeccable: `.impeccable/build/state.json` mantiene el estado pendiente de `plates`.


DOOM se abre desde su acceso del escritorio, la búsqueda o el comando `doom` (`doom --help` muestra controles). La app carga Chocolate Doom 3.1.1 como WebAssembly local y diferido en un iframe del mismo origen. Incluye el DOOM1.WAD shareware original sin modificar y lo carga automáticamente al abrir la app; el visitante no necesita seleccionar archivos. La licencia y la aclaración de distribución están en `public/games/doom/SHAREWARE-LICENSE.txt`. El motor permite todos los mapas del episodio shareware, sus intermedios, el nivel secreto y el final original. El HUD permanece visible y la barra incluye pantalla completa real del navegador. Si el navegador bloquea el audio, el juego muestra Activar sonido. Shift+Tab libera el teclado y vuelve a los controles de ventana.

Código de interfaz: `components/desktop/doom-app.tsx`, protocolo en `doom.types.ts`, estilos en `app/doom.css`, adaptador y motor en `public/games/doom/`. Procedencia, licencias, fuente correspondiente y recompilación: `public/games/doom/README.txt`, `COPYING.txt`, `engine-source.zip` y `scripts/doom/`. No modifica el diseño global ni requiere servicios externos.

Verificación local de DOOM: `node .impeccable/review/doom-check.mjs`, con `PORTFOLIO_TEST_URL` opcional. El flujo actual sin selector se verifica con `node .impeccable/review/doom-autoload-check.mjs`. Las pruebas actuales de episodio y presentación son `doom-episode-check.mjs` y `doom-hud-audio-check.mjs`: verifican PCM musical, HUD con escalas de pantalla 125% y 200%, activación de audio bloqueado, pantalla completa, E1M2/E1M9 y paso por el intermedio original. La prueba usa noclip para llegar al interruptor real de salida. Esto no equivale a completar manualmente todos los enemigos y secretos. La prueba principal usa Edge de escritorio; Chrome cuenta con verificación del ciclo de ventanas y teclado; Firefox requiere verificación adicional. `npm run lint` necesita configurar ESLint previamente; el repositorio no tiene configuración vigente.


## Demos públicas sin datos reales

Acreditapp, Recursos Humanos, Buscador Dotación, SIGMA y Producción de eventos tienen copias independientes en la carpeta externa `portfolio-demos`. Los originales permanecen intactos. Las copias conservan la interfaz y usan registros sintéticos; no incluyen .env, bases privadas, documentos, fotos personales, historial Git ni backends productivos. Correo, IA y sincronizaciones externas están desactivados. La demo cubre los flujos principales indicados en el README de esa carpeta.

Los cinco accesos del portafolio apuntan a `/demos/[slug]` y redirigen a las URLs públicas verificadas registradas en `lib/demo-deployments.ts`. Mientras falte un deployment, producción muestra un estado pendiente y no envía visitantes al sistema original. Las capturas del portafolio también provienen de los datos ficticios. Las cinco demos están publicadas y verificadas en Vercel. `.impeccable/review/vercel-deployments.json` registra sus URLs y despliegues.

Las cinco copias usan UTF-8 y eliminan las referencias a GCBA del código, los títulos y las etiquetas. Cada una presenta una bienvenida con su nombre, una descripción y acciones para explorar. El texto sobre su uso en un ambiente de trabajo con más de 360 personas fue proporcionado por el autor. La bienvenida recuerda su cierre durante la sesión y se puede volver a abrir con «Acerca de esta demo». Los datos de las demostraciones siguen siendo ficticios. La comprobación de bienvenida, teclado, codificación y vista móvil está en `.impeccable/review/demo-welcome-check.mjs`.

Las cinco demos se pueden usar directamente desde sus ventanas del escritorio. La barra permite alternar entre Demo y Proyecto, recargar desde el inicio o abrir otra pestaña; los casos de estudio siguen disponibles. Cambiar de vista o minimizar conserva la navegación de la demo. La comprobación está en `.impeccable/review/project-browser-check.mjs`.
