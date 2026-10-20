"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  FolderOpen,
  Keyboard,
  Linkedin,
  Mail,
  MapPin,
  Maximize2,
  Minus,
  Moon,
  RotateCcw,
  Search,
  Sun,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { projects } from "@/lib/projects";
import { AppIcon, applicationIcons } from "./app-icon";
import { ProjectApp } from "./project-app";
import { resizeCursors, resizeEdges, resizeWindowRect, type ResizeEdge, type WindowRect } from "@/lib/window-resize";
import {
  UtilitiesFolder,
  PaintApp,
  CalculatorApp,
  NotepadApp,
  ClockApp,
  utilityApps,
} from "./utilities-apps";
import {
  defaultDesktopIcons,
  normalizeDesktopIcons,
  placeDesktopGroup,
  moveDesktopIcon,
  type IconPosition,
  type IconPositions,
  type DesktopObstacle,
} from "@/lib/desktop-grid";

const DoomApp = dynamic(() => import("./doom-app"), { ssr: false });

type AppWindow = {
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  minimized: boolean;
  maximized: boolean;
};
const newWindow = (id: string): AppWindow => ({
  id,
  minimized: false,
  maximized: projects.some((project) => project.slug === id && project.href.startsWith("/demos/")),
});
const iconPositionsKey = "ravettini-os-icon-positions";
function desktopObstacles(): DesktopObstacle[] {
  if (typeof document === "undefined") return [];
  const areas: DesktopObstacle[] = [];
  const dock = document.querySelector<HTMLElement>(".os-dock");
  if (dock?.offsetWidth) areas.push({
    x: dock.offsetLeft - dock.offsetWidth / 2,
    y: dock.offsetTop,
    width: dock.offsetWidth,
    height: dock.offsetHeight,
  });
  const hint = document.querySelector<HTMLElement>(".desktop-hint");
  if (hint?.offsetWidth) {
    const rect = hint.getBoundingClientRect();
    areas.push({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  }
  return areas;
}
function defaultIconPositions(width: number, height: number): IconPositions {
  return defaultDesktopIcons(desktopOrder, width, height, desktopObstacles());
}
const dockApps = ["profile", "contact", "terminal", "cv", "settings"];
const desktopOrder = [
  "acreditapp",
  "recursos-humanos-ssccrs",
  "buscador-dotacion-gcba",
  "v-mail-validator",
  "acqua-di-colbert",
  "sigma",
  "produccion-eventos",
  "dermatologia-tod",
  "simulacro-entrevistas",
  "media-compressor",
  "utilities",
  "doom",
  "spaceweb",
  "sofijobs-cv-analyzer",
];
const anchorApps: Record<string, string> = {
  inicio: "welcome",
  proyectos: "projects",
  "sobre-mi": "profile",
  experiencia: "profile",
  habilidades: "profile",
  especialidades: "profile",
  contacto: "contact",
};

export function Desktop({
  onRestart,
  onLock,
  onMotionPreferenceChange,
}: {
  onRestart?: () => void;
  onLock?: () => void;
  onMotionPreferenceChange?: (reduced: boolean) => void;
}) {
  const [windows, setWindows] = useState<AppWindow[]>([newWindow("welcome")]);
  const [iconPositions, setIconPositions] = useState<IconPositions>({});
  const [isDesktop, setIsDesktop] = useState(false);
  const [draggingIcon, setDraggingIcon] = useState<string | null>(null);
  const [dragPreview, setDragPreview] = useState<IconPositions | null>(null);
  const [selectionBox, setSelectionBox] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const marquee = useRef<{
    pointer: number;
    x: number;
    y: number;
    base: string[];
  } | null>(null);
  const [dockRevealed, setDockRevealed] = useState(false);
  const [tooltipApp, setTooltipApp] = useState<string | null>(null);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iconDrag = useRef<{
    id: string;
    pointer: number;
    startX: number;
    startY: number;
    origins: IconPositions;
    ids: string[];
    preview: IconPositions | null;
    moved: boolean;
  } | null>(null);
  const suppressIconClick = useRef<string | null>(null);
  const dockHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dockSwipeStart = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [clock, setClock] = useState("");
  const [date, setDate] = useState("");
  const [menu, setMenu] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [wallpaper, setWallpaper] = useState("ocean");
  const [toast, setToast] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchInvoker = useRef<HTMLElement | null>(null);
  const workspaceRef = useRef<HTMLElement>(null);
  const [resizing, setResizing] = useState<ResizeEdge | null>(null);
  const resizeGesture = useRef<{
    original: AppWindow;
    rect: WindowRect;
    edge: ResizeEdge;
    pointer: number;
    startX: number;
    startY: number;
  } | null>(null);
  const drag = useRef<{
    id: string;
    pointer: number;
    startX: number;
    startY: number;
    left: number;
    top: number;
    width: number;
  } | null>(null);

  const focusWindow = useCallback(
    (id: string) =>
      setWindows((prev) => {
        const win = prev.find((w) => w.id === id);
        if (prev[prev.length - 1]?.id === id && !win?.minimized) return prev;
        return win
          ? [...prev.filter((w) => w.id !== id), { ...win, minimized: false }]
          : prev;
      }),
    [],
  );
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let watcher: ReturnType<typeof setInterval> | undefined;
    let focusedFrame: HTMLIFrameElement | null = null;
    const stop = () => {
      clearTimeout(timer);
      clearInterval(watcher);
      focusedFrame = null;
    };
    // Pointer events inside a cross-origin frame do not bubble to its window.
    const syncFrame = () => {
      const frame = document.activeElement;
      if (!(frame instanceof HTMLIFrameElement) || document.hidden) {
        stop();
        return;
      }
      if (frame === focusedFrame) return;
      const host = frame.closest<HTMLElement>("[data-app-window]");
      if (!host || host.hidden || !workspaceRef.current?.contains(host)) {
        stop();
        return;
      }
      focusedFrame = frame;
      const id = host.dataset.appWindow;
      if (id) focusWindow(id);
    };
    const watch = () => {
      stop();
      timer = setTimeout(() => {
        syncFrame();
        // Switching directly between frames does not blur the parent again.
        if (focusedFrame) watcher = setInterval(syncFrame, 100);
      }, 0);
    };
    window.addEventListener("blur", watch);
    window.addEventListener("focus", stop);
    document.addEventListener("visibilitychange", watch);
    return () => {
      stop();
      window.removeEventListener("blur", watch);
      window.removeEventListener("focus", stop);
      document.removeEventListener("visibilitychange", watch);
    };
  }, [focusWindow]);
  const openApp = useCallback((id: string) => {
    setMenu(null);
    setSearching(false);
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      return [
        ...prev.filter((w) => w.id !== id),
        existing ? { ...existing, minimized: false } : newWindow(id),
      ];
    });
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>(`[data-app-window="${id}"]`)
        ?.focus({ preventScroll: true }),
    );
  }, []);
  const openSearch = useCallback(() => {
    searchInvoker.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setSearching(true);
    setMenu(null);
  }, []);
  const dismissSearch = useCallback(() => {
    setSearching(false);
    requestAnimationFrame(() => {
      const destination = searchInvoker.current?.isConnected
        ? searchInvoker.current
        : document.querySelector<HTMLElement>(
            '[aria-label="Buscar aplicaciones (Ctrl o Command K)"]',
          );
      destination?.focus({ preventScroll: true });
    });
  }, []);
  const closeApp = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    requestAnimationFrame(() =>
      (
        document.querySelector(`[data-launcher="${id}"]`) as HTMLElement | null
      )?.focus(),
    );
  }, []);
  const active = [...windows].reverse().find((w) => !w.minimized)?.id;
  const hasMaximizedWindow = windows.some(
    (win) => win.maximized && !win.minimized,
  );

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) setWindows([]);
    setIsDesktop(window.innerWidth > 900);
    let initialPositions = defaultIconPositions(
      window.innerWidth,
      window.innerHeight,
    );
    try {
      const saved = JSON.parse(localStorage.getItem(iconPositionsKey) || "{}");
      initialPositions = normalizeDesktopIcons(
        desktopOrder,
        saved,
        window.innerWidth,
        window.innerHeight,
        desktopObstacles(),
      );
    } catch {
      /* Default layout remains available without storage. */
    }
    setIconPositions(initialPositions);
    try {
      const stored = JSON.parse(
        localStorage.getItem("ravettini-os-preferences") || "{}",
      );
      setDark(!!stored.dark);
      setWallpaper(stored.wallpaper === "midnight" ? "midnight" : "ocean");
      setReducedMotion(!!stored.reducedMotion);
    } catch {
      /* Keep default appearance when storage is unavailable. */
    }
    const tick = () => {
      const now = new Date();
      setClock(
        new Intl.DateTimeFormat("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Argentina/Buenos_Aires",
        }).format(now),
      );
      setDate(
        new Intl.DateTimeFormat("es-AR", {
          weekday: "short",
          day: "numeric",
          month: "short",
          timeZone: "America/Argentina/Buenos_Aires",
        }).format(now),
      );
    };
    tick();
    const timer = setInterval(tick, 10000);
    const onHash = () => {
      const id = anchorApps[decodeURIComponent(window.location.hash.slice(1))];
      if (id) openApp(id);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    setReady(true);
    return () => {
      clearInterval(timer);
      window.removeEventListener("hashchange", onHash);
    };
  }, [openApp]);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(
          "ravettini-os-preferences",
          JSON.stringify({ dark, wallpaper, reducedMotion }),
        );
      } catch {
        /* Preferences still work for this visit. */
      }
    }
  }, [dark, wallpaper, reducedMotion, ready]);
  useEffect(() => {
    if (!ready || !isDesktop) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(iconPositionsKey, JSON.stringify(iconPositions));
      } catch {
        /* Dragging still works for this visit. */
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [iconPositions, isDesktop, ready]);
  useEffect(
    () => () => {
      if (dockHideTimer.current) clearTimeout(dockHideTimer.current);
      if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    },
    [],
  );
  useEffect(() => {
    setDockRevealed(false);
  }, [hasMaximizedWindow]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (workspaceRef.current?.closest("[inert]")) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (searching) dismissSearch();
        else openSearch();
      }
      if (event.key === "Escape") {
        if (resizeGesture.current) {
          finishResize(true);
          return;
        }
        if (searching) dismissSearch();
        setMenu(null);
        setSelected([]);
        marquee.current = null;
        setSelectionBox(null);
        if (iconDrag.current) {
          suppressIconClick.current = iconDrag.current.id;
          iconDrag.current = null;
          setDragPreview(null);
          setDraggingIcon(null);
        }
      }
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "ArrowUp" &&
        active
      ) {
        event.preventDefault();
        setWindows((prev) =>
          prev.map((w) =>
            w.id === active ? { ...w, maximized: !w.maximized } : w,
          ),
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, searching, openSearch, dismissSearch]);
  useEffect(() => {
    if (searching) {
      setQuery("");
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [searching]);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timeout);
  }, [toast]);
  useEffect(() => {
    const resize = () => {
      setIsDesktop(window.innerWidth > 900);
      if (window.innerWidth > 900)
        setIconPositions((prev) =>
          normalizeDesktopIcons(
            desktopOrder,
            prev,
            window.innerWidth,
            window.innerHeight,
            desktopObstacles(),
          ),
        );
      setWindows((prev) => prev.map((win) => {
        if (win.width !== undefined && window.innerWidth > 900) {
          const next = resizeWindowRect({ left: win.x || 0, top: win.y || 38, width: win.width, height: win.height || 220 }, "e", 0, 0,
            { width: window.innerWidth, height: window.innerHeight },
            projects.some((project) => project.slug === win.id && project.href.startsWith("/demos/")) ? 480 : 320);
          return { ...win, x: next.left, y: next.top, width: next.width, height: next.height };
        }
        return win.x === undefined ? win : {
          ...win,
          x: Math.max(0, Math.min(win.x, window.innerWidth - Math.min(380, window.innerWidth))),
          y: Math.max(38, Math.min(win.y || 38, window.innerHeight - 180)),
        };
      }));
    };
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(() => {
      if (window.innerWidth > 900) setIconPositions((prev) => normalizeDesktopIcons(
        desktopOrder, prev, window.innerWidth, window.innerHeight, desktopObstacles(),
      ));
    });
    document.querySelectorAll(".os-dock, .desktop-hint").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  function beginDrag(event: ReactPointerEvent<HTMLElement>, win: AppWindow) {
    if (
      event.button !== 0 ||
      win.maximized ||
      window.innerWidth <= 900 ||
      (event.target as HTMLElement).closest("button,a,input")
    )
      return;
    const rect = event.currentTarget.parentElement!.getBoundingClientRect();
    drag.current = {
      id: win.id,
      pointer: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      width: rect.width,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    focusWindow(win.id);
  }
  function moveDrag(event: ReactPointerEvent<HTMLElement>) {
    const d = drag.current;
    if (!d || d.pointer !== event.pointerId) return;
    const x = Math.max(
      0,
      Math.min(
        window.innerWidth - Math.min(d.width, 220),
        d.left + event.clientX - d.startX,
      ),
    );
    const y = Math.max(
      38,
      Math.min(window.innerHeight - 160, d.top + event.clientY - d.startY),
    );
    setWindows((prev) => prev.map((w) => (w.id === d.id ? { ...w, x, y } : w)));
  }
  function applyWindowResize(win: AppWindow, rect: WindowRect, edge: ResizeEdge, dx: number, dy: number) {
    const isBrowser = projects.some((project) => project.slug === win.id && project.href.startsWith("/demos/"));
    const next = resizeWindowRect(rect, edge, dx, dy, {
      width: window.innerWidth,
      height: window.innerHeight,
    }, isBrowser ? 480 : 320);
    setWindows((prev) => prev.map((current) => current.id === win.id
      ? { ...current, x: next.left, y: next.top, width: next.width, height: next.height }
      : current));
  }
  function beginResize(event: ReactPointerEvent<HTMLButtonElement>, win: AppWindow, edge: ResizeEdge) {
    if (event.button !== 0 || win.maximized || window.innerWidth <= 900) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.closest<HTMLElement>(".os-window")!.getBoundingClientRect();
    resizeGesture.current = { original: win, rect, edge, pointer: event.pointerId, startX: event.clientX, startY: event.clientY };
    setResizing(edge);
    focusWindow(win.id);
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveResize(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = resizeGesture.current;
    if (!current || current.pointer !== event.pointerId) return;
    event.stopPropagation();
    applyWindowResize(current.original, current.rect, current.edge, event.clientX - current.startX, event.clientY - current.startY);
  }
  function finishResize(cancel = false) {
    const current = resizeGesture.current;
    resizeGesture.current = null;
    setResizing(null);
    if (cancel && current) {
      const { x, y, width, height } = current.original;
      setWindows((prev) => prev.map((win) => win.id === current.original.id ? { ...win, x, y, width, height } : win));
    }
  }
  function resetDesktop() {
    setWindows(window.innerWidth <= 900 ? [] : [newWindow("welcome")]);
    setIconPositions(
      defaultIconPositions(window.innerWidth, window.innerHeight),
    );
    setMenu(null);
    setToast("Escritorio ordenado");
  }
  function beginIconDrag(
    event: ReactPointerEvent<HTMLButtonElement>,
    id: string,
  ) {
    if (!isDesktop || event.button !== 0) return;
    event.stopPropagation();
    if (event.ctrlKey || event.metaKey) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
      return;
    }
    const ids = selected.includes(id) ? selected : [id];
    suppressIconClick.current = null;
    const origins = Object.fromEntries(
      ids.map((item) => [item, iconPositions[item]]),
    );
    iconDrag.current = {
      id,
      ids,
      pointer: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origins,
      preview: null,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(ids);
  }
  function moveIconDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = iconDrag.current;
    if (!current || current.pointer !== event.pointerId) return;
    let dx = event.clientX - current.startX,
      dy = event.clientY - current.startY;
    if (!current.moved && Math.hypot(dx, dy) < 6) return;
    current.moved = true;
    const values = Object.values(current.origins);
    dx = Math.max(
      8 - Math.min(...values.map((p) => p.x)),
      Math.min(
        window.innerWidth - 102 - Math.max(...values.map((p) => p.x)),
        dx,
      ),
    );
    dy = Math.max(
      38 - Math.min(...values.map((p) => p.y)),
      Math.min(
        Math.max(580, window.innerHeight) -
          106 -
          Math.max(...values.map((p) => p.y)),
        dy,
      ),
    );
    current.preview = Object.fromEntries(
      current.ids.map((id) => [
        id,
        { x: current.origins[id].x + dx, y: current.origins[id].y + dy },
      ]),
    );
    setDraggingIcon(current.id);
    setDragPreview(current.preview);
  }
  function endIconDrag(cancelled = false) {
    const current = iconDrag.current;
    if (current?.moved) {
      suppressIconClick.current = current.id;
      if (!cancelled && current.preview)
        setIconPositions((prev) =>
          placeDesktopGroup(
            current.ids,
            current.preview!,
            prev,
            window.innerWidth,
            window.innerHeight,
            desktopObstacles(),
          ),
        );
    }
    iconDrag.current = null;
    setDraggingIcon(null);
    setDragPreview(null);
  }
  function beginSelection(event: ReactPointerEvent<HTMLElement>) {
    if (
      !isDesktop ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest(
        "button,a,input,.os-window,.os-menu-bar,.os-menu-popover,.os-dock,.spotlight,.desktop-hint",
      )
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    marquee.current = {
      pointer: event.pointerId,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      base: event.ctrlKey || event.metaKey ? selected : [],
    };
    setSelected(marquee.current.base);
    setMenu(null);
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveSelection(event: ReactPointerEvent<HTMLElement>) {
    const start = marquee.current;
    if (!start || start.pointer !== event.pointerId) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left)),
      y = Math.max(34, Math.min(bounds.height, event.clientY - bounds.top));
    const box = {
      x: Math.min(start.x, x),
      y: Math.min(start.y, y),
      width: Math.abs(x - start.x),
      height: Math.abs(y - start.y),
    };
    if (box.width < 3 && box.height < 3) return;
    setSelectionBox(box);
    const hits = desktopOrder.filter((id) => {
      const p = iconPositions[id];
      return (
        p &&
        p.x < box.x + box.width &&
        p.x + 94 > box.x &&
        p.y < box.y + box.height &&
        p.y + 94 > box.y
      );
    });
    setSelected([...new Set([...start.base, ...hits])]);
  }
  function endSelection() {
    marquee.current = null;
    setSelectionBox(null);
  }
  function revealDock() {
    if (dockHideTimer.current) clearTimeout(dockHideTimer.current);
    setDockRevealed(true);
    dockHideTimer.current = setTimeout(() => setDockRevealed(false), 2500);
  }
  function cancelDockTooltip() {
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    setTooltipApp(null);
  }
  function startDockTooltip(id: string) {
    cancelDockTooltip();
    tooltipTimer.current = setTimeout(() => setTooltipApp(id), 3000);
  }
  function hideDockSoon() {
    if (dockHideTimer.current) clearTimeout(dockHideTimer.current);
    dockHideTimer.current = setTimeout(() => setDockRevealed(false), 450);
  }
  const filteredApps = Object.entries(applicationIcons).filter(
    ([id, app]) =>
      `${app.label} ${projects.find((p) => p.slug === id)?.title || ""} ${projects.find((p) => p.slug === id)?.tech.join(" ") || ""}`
        .toLocaleLowerCase("es")
        .includes(query.toLocaleLowerCase("es")) &&
      !["experience", "skills"].includes(id),
  );

  function renderApp(id: string): ReactNode {
    if (id === "doom")
      return (
        <DoomApp
          active={active === "doom"}
          onClose={() => closeApp("doom")}
          onActivate={() => focusWindow("doom")}
        />
      );
    if (id === "utilities") return <UtilitiesFolder openApp={openApp} />;
    if (id === "paint") return <PaintApp />;
    if (id === "calculator") return <CalculatorApp />;
    if (id === "notepad") return <NotepadApp />;
    if (id === "clock") return <ClockApp />;
    const project = projects.find((p) => p.slug === id);
    if (project) return <ProjectApp project={project} />;
    if (id === "welcome")
      return (
        <div className="welcome-content">
          <span className="welcome-greeting">Bienvenido/a a mi espacio</span>
          <h1>Hola, soy Ignacio.</h1>
          <p className="welcome-role">Desarrollador web full stack.</p>
          <p className="welcome-location">
            <MapPin size={15} /> Buenos Aires, Argentina
          </p>
          <div className="welcome-bottom">
            <button
              className="os-button os-button--primary"
              onClick={() => openApp("contact")}
            >
              <Mail size={15} /> Hablemos
            </button>
            <button
              className="os-subtle-button"
              onClick={() => openApp("projects")}
            >
              Mis proyectos <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      );
    if (id === "profile") return <ProfileApp />;
    if (id === "contact") return <ContactApp notify={setToast} />;
    if (id === "terminal") return <TerminalApp openApp={openApp} />;
    if (id === "projects")
      return (
        <div className="finder-app">
          <div className="finder-toolbar">
            <FolderOpen size={16} />
            <span>{projects.length} aplicaciones</span>
          </div>
          <div className="finder-list">
            {projects.map((project) => (
              <button key={project.slug} onClick={() => openApp(project.slug)}>
                <AppIcon id={project.slug} small />
                <span>
                  <strong>{project.title}</strong>
                  <small>{project.category}</small>
                </span>
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
        </div>
      );
    if (id === "cv")
      return (
        <div className="cv-app">
          <AppIcon id="cv" />
          <h2>Currículum de Ignacio</h2>
          <p>Experiencia, proyectos y tecnologías en un solo documento.</p>
          <a
            className="os-button os-button--primary"
            href="/cv-ignacio-ravettini.pdf"
            download="Ignacio Ravettini CV.pdf"
          >
            <ArrowDownToLine size={16} /> Descargar CV
          </a>
          <a
            className="os-subtle-button"
            href="/cv-ignacio-ravettini.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir PDF en otra pestaña <ArrowUpRight size={14} />
          </a>
          <iframe
            title="Currículum de Ignacio Ravettini"
            src="/cv-ignacio-ravettini.pdf#toolbar=0"
          />
        </div>
      );
    if (id === "settings")
      return (
        <div className="settings-app">
          <h2>A tu manera.</h2>
          <p>Un espacio de trabajo para explorar a tu ritmo.</p>
          <section>
            <h3>Apariencia de las ventanas</h3>
            <div className="appearance-options">
              <button
                className={!dark ? "is-chosen" : ""}
                onClick={() => setDark(false)}
                aria-pressed={!dark}
              >
                <Sun size={21} /> Clara {!dark && <Check size={14} />}
              </button>
              <button
                className={dark ? "is-chosen" : ""}
                onClick={() => setDark(true)}
                aria-pressed={dark}
              >
                <Moon size={21} /> Oscura {dark && <Check size={14} />}
              </button>
            </div>
          </section>
          <section>
            <h3>Fondo de escritorio</h3>
            <div className="wallpaper-options">
              <button
                aria-pressed={wallpaper === "ocean"}
                onClick={() => setWallpaper("ocean")}
              >
                <span className="wallpaper-swatch" />
                Océano {wallpaper === "ocean" && <Check size={14} />}
              </button>
              <button
                aria-pressed={wallpaper === "midnight"}
                onClick={() => setWallpaper("midnight")}
              >
                <span className="wallpaper-swatch wallpaper-swatch--midnight" />
                Medianoche {wallpaper === "midnight" && <Check size={14} />}
              </button>
            </div>
          </section>
          <label className="setting-toggle">
            <span>
              <strong>Reducir movimiento</strong>
              <small>Transiciones más discretas.</small>
            </span>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => {
                setReducedMotion(e.target.checked);
                onMotionPreferenceChange?.(e.target.checked);
              }}
            />
          </label>
          <button className="os-button" onClick={resetDesktop}>
            <RotateCcw size={15} /> Ordenar escritorio
          </button>
          <p className="settings-footnote">
            Tus preferencias se guardan en este navegador.
          </p>
        </div>
      );
    return null;
  }

  return (
    <main
      ref={workspaceRef}
      id="main"
      tabIndex={-1}
      className={`os-desktop${dark ? " os-dark" : ""}${wallpaper === "midnight" ? " os-midnight" : ""}${reducedMotion ? " os-reduced-motion" : ""}${hasMaximizedWindow ? " os-desktop--immersive" : ""}${draggingIcon ? " os-desktop--icon-dragging" : ""}${resizing ? " os-desktop--resizing" : ""}`}
      style={resizing ? { cursor: resizeCursors[resizing] } : undefined}
      data-ready={ready}
      onPointerDown={beginSelection}
      onPointerMove={moveSelection}
      onPointerUp={endSelection}
      onPointerCancel={endSelection}
    >
      <a className="os-skip-link" href="#desktop-applications">
        Ir a los proyectos
      </a>
      <header className="os-menu-bar">
        <div className="os-menu-left">
          <button
            className="os-brand"
            aria-label="Menú de ravettiniOS"
            aria-expanded={menu === "system"}
            onClick={() => setMenu(menu === "system" ? null : "system")}
          >
            <span>IR</span>
            <strong>
              ravettini<span>OS</span>
            </strong>
          </button>
          <span className="os-menu-divider" />
          <button
            className="desktop-menu-label"
            onClick={() => setMenu(menu === "file" ? null : "file")}
            aria-expanded={menu === "file"}
          >
            Archivo
          </button>
          <button
            className="desktop-menu-label"
            onClick={() => setMenu(menu === "view" ? null : "view")}
            aria-expanded={menu === "view"}
          >
            Ver
          </button>
          <button
            className="desktop-menu-label"
            onClick={() => setMenu(menu === "window" ? null : "window")}
            aria-expanded={menu === "window"}
          >
            Ventana
          </button>
          <button
            className="desktop-menu-label"
            onClick={() => setMenu(menu === "help" ? null : "help")}
            aria-expanded={menu === "help"}
          >
            Ayuda
          </button>
        </div>
        <div className="os-menu-right">
          <span className="os-status" title="Portafolio web">
            <Wifi size={15} />
          </span>
          <button
            aria-label="Buscar aplicaciones (Ctrl o Command K)"
            onClick={openSearch}
          >
            <Search size={15} />
          </button>
          <button
            aria-label="Abrir ajustes"
            className="os-menu-settings"
            onClick={() => openApp("settings")}
          >
            <Volume2 size={15} />
          </button>
          <time
            className="os-clock"
            aria-label={`Hora de Buenos Aires: ${clock}`}
          >
            <span>{date}</span>
            <strong>{clock || "—:—"}</strong>
          </time>
        </div>
      </header>
      {menu && (
        <>
          <button
            className="os-menu-dismiss"
            aria-label="Cerrar menú"
            onClick={() => setMenu(null)}
          />
          <nav
            className={`os-menu-popover os-menu-popover--${menu}`}
            aria-label="Opciones del escritorio"
          >
            {menu === "system" && (
              <>
                <button onClick={() => openApp("profile")}>
                  Acerca de Ignacio <AppIcon id="profile" small />
                </button>
                <button onClick={() => openApp("settings")}>
                  Ajustes del escritorio
                </button>
                <hr />
                <button onClick={() => openApp("cv")}>Mi currículum</button>
                <button onClick={resetDesktop}>
                  Volver al inicio <RotateCcw size={14} />
                </button>
                {onLock && <button onClick={onLock}>Cambiar usuario</button>}
                {onRestart && (
                  <button onClick={onRestart}>
                    Reiniciar sistema <RotateCcw size={14} />
                  </button>
                )}
              </>
            )}
            {menu === "file" && (
              <>
                <button onClick={() => openApp("projects")}>
                  Explorar proyectos <FolderOpen size={14} />
                </button>
                <button onClick={() => openApp("utilities")}>Utilidades</button>
                <button onClick={() => openApp("contact")}>
                  Nuevo mensaje <Mail size={14} />
                </button>
                <button onClick={() => openApp("cv")}>Abrir currículum</button>
              </>
            )}
            {menu === "view" && (
              <>
                <button onClick={openSearch}>
                  Buscar aplicación <kbd>⌘ / Ctrl K</kbd>
                </button>
                <button onClick={resetDesktop}>Ordenar escritorio</button>
                <button onClick={() => openApp("settings")}>
                  Cambiar apariencia
                </button>
              </>
            )}
            {menu === "window" && (
              <>
                <button
                  onClick={() => {
                    setWindows((prev) =>
                      prev.map((w) => ({ ...w, minimized: true })),
                    );
                    setMenu(null);
                  }}
                >
                  Mostrar escritorio
                </button>
                {windows.map((w) => (
                  <button key={w.id} onClick={() => openApp(w.id)}>
                    {applicationIcons[w.id]?.label}
                    {active === w.id && <Check size={14} />}
                  </button>
                ))}
                {windows.length === 0 && <span>No hay ventanas abiertas.</span>}
              </>
            )}
            {menu === "help" && (
              <div className="os-help">
                <Keyboard size={22} />
                <strong>Sentite como en casa.</strong>
                <p>
                  Un clic abre cada aplicación. Arrastrá la barra superior para
                  mover una ventana.
                </p>
                <p>Rojo: cerrar. Amarillo: minimizar. Verde: ampliar.</p>
                <p>
                  Arrastrá sobre el fondo para seleccionar varias aplicaciones.
                  Ctrl + clic suma o quita una. Podés mover las seleccionadas
                  juntas.
                </p>
                <p>
                  <kbd>Ctrl / ⌘ K</kbd> Buscar apps.
                  <br />
                  <kbd>Esc</kbd> Cerrar menús.
                </p>
              </div>
            )}
          </nav>
        </>
      )}
      <div className="mobile-desktop-intro">
        <span>El escritorio de</span>
        <h1>Ignacio Ravettini.</h1>
        <p>
          Desarrollador web full stack.
          <br />
          Buenos Aires, Argentina.
        </p>
        <button onClick={() => openApp("contact")}>
          Hablemos <ArrowUpRight size={14} />
        </button>
      </div>
      <nav
        id="desktop-applications"
        className={`desktop-applications${isDesktop && ready ? " desktop-applications--movable" : ""}`}
        aria-label="Proyectos como aplicaciones"
      >
        {desktopOrder.map((id) => (
          <button
            key={id}
            data-launcher={id}
            className={`desktop-app${selected.includes(id) ? " desktop-app--selected" : ""}${dragPreview?.[id] ? " desktop-app--dragging" : ""}`}
            style={
              isDesktop && ready && iconPositions[id]
                ? {
                    position: "absolute",
                    left: (dragPreview?.[id] || iconPositions[id]).x,
                    top: (dragPreview?.[id] || iconPositions[id]).y - 34,
                  }
                : undefined
            }
            onPointerDown={(event) => beginIconDrag(event, id)}
            onPointerMove={moveIconDrag}
            onPointerUp={() => endIconDrag()}
            onPointerCancel={() => endIconDrag(true)}
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key === " ") {
                event.preventDefault();
                setSelected((prev) =>
                  prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id],
                );
                return;
              }
              if (
                !isDesktop ||
                !event.altKey ||
                !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
                  event.key,
                )
              )
                return;
              event.preventDefault();
              const position = iconPositions[id];
              if (!position) return;
              const step = event.shiftKey ? 3 : 1;
              setIconPositions((prev) => ({
                ...prev,
                [id]: moveDesktopIcon(
                  id,
                  event.key === "ArrowLeft"
                    ? -step
                    : event.key === "ArrowRight"
                      ? step
                      : 0,
                  event.key === "ArrowUp"
                    ? -step
                    : event.key === "ArrowDown"
                      ? step
                      : 0,
                  prev,
                  window.innerWidth,
                  window.innerHeight,
                  desktopObstacles(),
                ),
              }));
            }}
            onClick={(event) => {
              if (event.detail !== 0 && suppressIconClick.current === id) {
                suppressIconClick.current = null;
                return;
              }
              if (event.ctrlKey || event.metaKey) return;
              setSelected([id]);
              openApp(id);
            }}
            data-selected={selected.includes(id)}
            aria-pressed={selected.includes(id)}
            aria-label={`Abrir ${applicationIcons[id].label}`}
            aria-describedby="icon-movement-help"
          >
            <AppIcon id={id} />
            <span className="desktop-app-label">
              {applicationIcons[id].label}
            </span>
          </button>
        ))}
      </nav>
      <span id="icon-movement-help" className="sr-only">
        Mantené el clic para arrastrar; al soltar se ajusta a la grilla. Ctrl +
        clic o Ctrl + Espacio permite seleccionar varias aplicaciones. Alt y
        flechas mueve entre casilleros.
      </span>
      {selectionBox && (
        <div
          className="desktop-selection-box"
          aria-hidden="true"
          style={{
            left: selectionBox.x,
            top: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
          }}
        />
      )}
      <span className="sr-only" role="status">
        {selected.length > 1
          ? `${selected.length} aplicaciones seleccionadas`
          : ""}
      </span>
      <div className="desktop-hint">
        <span>Tu próxima idea puede empezar acá.</span>
        <button onClick={openSearch}>
          <Search size={12} /> Buscar apps <kbd>Ctrl / ⌘ K</kbd>
        </button>
      </div>
      <div className="os-windows">
        {[...windows]
          .sort((a, b) => a.id.localeCompare(b.id))
          .map((win) => {
            const index = windows.findIndex((w) => w.id === win.id);
            const isProject = projects.some((p) => p.slug === win.id);
            const isDemoProject = projects.some(
              (p) => p.slug === win.id && p.href.startsWith("/demos/"),
            );
            const style: CSSProperties = {
              zIndex: 20 + index,
              ...(win.width !== undefined ? { width: win.width, height: win.height } : {}),
              ...(win.x !== undefined
                ? { left: win.x, top: win.y, right: "auto" }
                : {}),
            };
            return (
              <section
                key={win.id}
                role="region"
                aria-label={`${applicationIcons[win.id]?.label || win.id}, ventana`}
                tabIndex={-1}
                hidden={win.minimized}
                data-app-window={win.id}
                className={`os-window os-window--${win.id}${isProject ? " os-window--project" : ""}${isDemoProject ? " os-window--browser" : ""}${active === win.id ? " os-window--active" : ""}${win.maximized ? " os-window--maximized" : ""}${win.width !== undefined ? " os-window--resized" : ""}${win.x !== undefined ? " os-window--positioned" : ""}`}
                style={style}
                onPointerDown={(event) => {
                  if ((event.target as HTMLElement).closest(".window-controls"))
                    return;
                  focusWindow(win.id);
                }}
                onFocusCapture={(event) => {
                  if ((event.target as HTMLElement).closest(".window-controls"))
                    return;
                  if (active !== win.id) focusWindow(win.id);
                }}
              >
                <header
                  className="os-window-bar"
                  onPointerDown={(event) => beginDrag(event, win)}
                  onPointerMove={moveDrag}
                  onPointerUp={() => {
                    drag.current = null;
                  }}
                  onPointerCancel={() => {
                    drag.current = null;
                  }}
                  onDoubleClick={(e) => {
                    if (!(e.target as HTMLElement).closest("button,a"))
                      setWindows((prev) =>
                        prev.map((w) =>
                          w.id === win.id
                            ? { ...w, maximized: !w.maximized }
                            : w,
                        ),
                      );
                  }}
                >
                  <div className="window-controls">
                    <button
                      className="window-control window-control--close"
                      aria-label={`Cerrar ${applicationIcons[win.id]?.label}`}
                      onClick={() => closeApp(win.id)}
                    >
                      <X size={9} />
                    </button>
                    <button
                      className="window-control window-control--minimize"
                      aria-label={`Minimizar ${applicationIcons[win.id]?.label}`}
                      onClick={() =>
                        setWindows((prev) =>
                          prev.map((w) =>
                            w.id === win.id ? { ...w, minimized: true } : w,
                          ),
                        )
                      }
                    >
                      <Minus size={9} />
                    </button>
                    <button
                      className="window-control window-control--maximize"
                      aria-label={`${win.maximized ? "Restaurar" : "Ampliar"} ${applicationIcons[win.id]?.label}`}
                      onClick={() =>
                        setWindows((prev) =>
                          prev.map((w) =>
                            w.id === win.id
                              ? { ...w, maximized: !w.maximized }
                              : w,
                          ),
                        )
                      }
                    >
                      <Maximize2 size={8} />
                    </button>
                  </div>
                  {isDemoProject ? (
                    <div className="project-browser-chrome" id={`browser-chrome-${win.id}`} />
                  ) : (
                    <>
                      <span className="window-title">
                        {win.id === "welcome"
                          ? "Notas"
                          : applicationIcons[win.id]?.label}
                      </span>
                      <span className="window-bar-tail">
                        <ChevronDown size={13} />
                      </span>
                    </>
                  )}
                </header>
                <div className={`os-window-content${isDemoProject ? " os-window-content--browser" : ""}`}>{renderApp(win.id)}</div>
                {!win.maximized && isDesktop && resizeEdges.map((edge) => (
                  <button
                    key={edge}
                    className={`os-window-resize os-window-resize--${edge}`}
                    data-resize-edge={edge}
                    aria-label={`Ajustar ${applicationIcons[win.id]?.label || win.id} desde ${({ n: "arriba", e: "la derecha", s: "abajo", w: "la izquierda", ne: "la esquina superior derecha", se: "la esquina inferior derecha", sw: "la esquina inferior izquierda", nw: "la esquina superior izquierda" })[edge]}`}
                    onPointerDown={(event) => beginResize(event, win, edge)}
                    onPointerMove={moveResize}
                    onPointerUp={() => finishResize()}
                    onPointerCancel={() => finishResize(true)}
                    onLostPointerCapture={() => finishResize()}
                    onKeyDown={(event) => {
                      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
                      event.preventDefault();
                      event.stopPropagation();
                      const step = event.shiftKey ? 40 : 10;
                      const rect = event.currentTarget.closest<HTMLElement>(".os-window")!.getBoundingClientRect();
                      focusWindow(win.id);
                      applyWindowResize(win, rect, edge,
                        event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0,
                        event.key === "ArrowDown" ? step : event.key === "ArrowUp" ? -step : 0);
                    }}
                  />
                ))}
              </section>
            );
          })}
      </div>
      {hasMaximizedWindow && (
        <button
          className="dock-reveal-zone"
          aria-label="Mostrar aplicaciones"
          onPointerEnter={(event) => {
            if (event.pointerType !== "touch") revealDock();
          }}
          onPointerDown={(event) => {
            dockSwipeStart.current = event.clientY;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (
              dockSwipeStart.current !== null &&
              dockSwipeStart.current - event.clientY > 10
            )
              revealDock();
          }}
          onPointerUp={() => {
            dockSwipeStart.current = null;
          }}
          onPointerCancel={() => {
            dockSwipeStart.current = null;
          }}
          onClick={revealDock}
        >
          <span />
        </button>
      )}
      <nav
        className={`os-dock${dockRevealed ? " os-dock--revealed" : ""}`}
        aria-label="Aplicaciones del sistema"
        onPointerEnter={() => {
          if (dockHideTimer.current) clearTimeout(dockHideTimer.current);
        }}
        onPointerLeave={hideDockSoon}
      >
        {dockApps.map((id) => (
          <button
            key={id}
            data-launcher={id}
            className={`dock-app${active === id ? " dock-app--active" : ""}`}
            data-tooltip-active={tooltipApp === id}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") startDockTooltip(id);
            }}
            onPointerLeave={cancelDockTooltip}
            onClick={() => openApp(id)}
            aria-label={`Abrir ${applicationIcons[id].label}`}
          >
            <AppIcon id={id} />
            <span className="dock-tooltip">{applicationIcons[id].label}</span>
            <span className="dock-label">{applicationIcons[id].label}</span>
            {windows.some((w) => w.id === id) && (
              <span className="dock-running" />
            )}
          </button>
        ))}
        {windows.some((win) => win.minimized) && (
          <span className="dock-separator" />
        )}
        {windows
          .filter((win) => win.minimized && !dockApps.includes(win.id))
          .map((win) => (
            <button
              key={win.id}
              className="dock-app dock-app--minimized"
              data-tooltip-active={tooltipApp === win.id}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") startDockTooltip(win.id);
              }}
              onPointerLeave={cancelDockTooltip}
              onClick={() => openApp(win.id)}
              aria-label={`Restaurar ${applicationIcons[win.id]?.label}`}
            >
              <AppIcon id={win.id} />
              <span className="dock-tooltip">
                Restaurar {applicationIcons[win.id]?.label}
              </span>
              <span className="dock-running" />
            </button>
          ))}
      </nav>
      {searching && (
        <div
          className="spotlight-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) dismissSearch();
          }}
        >
          <section
            className="spotlight"
            role="dialog"
            aria-modal="true"
            aria-label="Buscar aplicaciones"
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                const els =
                  event.currentTarget.querySelectorAll<HTMLElement>(
                    "input,button",
                  );
                const first = els[0],
                  last = els[els.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <div className="spotlight-input">
              <Search size={23} />
              <input
                ref={searchRef}
                placeholder="Buscar proyectos y aplicaciones…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filteredApps[0])
                    openApp(filteredApps[0][0]);
                }}
              />
              <button aria-label="Cerrar búsqueda" onClick={dismissSearch}>
                <X size={19} />
              </button>
            </div>
            <div className="spotlight-results">
              {filteredApps.length ? (
                filteredApps.map(([id, app]) => (
                  <button key={id} onClick={() => openApp(id)}>
                    <AppIcon id={id} small />
                    <span>
                      {app.label}
                      <small>
                        {projects.some((p) => p.slug === id)
                          ? "Proyecto"
                          : "Aplicación del sistema"}
                      </small>
                    </span>
                    <ArrowUpRight size={15} />
                  </button>
                ))
              ) : (
                <p>
                  No encontré aplicaciones con ese nombre. Probá con un proyecto
                  o una tecnología.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
      <div
        className={`os-toast${toast ? " os-toast--visible" : ""}`}
        role="status"
      >
        {toast && (
          <>
            <Check size={16} />
            {toast}
          </>
        )}
      </div>
    </main>
  );
}

function ContactApp({ notify }: { notify: (text: string) => void }) {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("ignaciorave21@gmail.com");
      setCopied(true);
      notify("Email copiado");
    } catch {
      notify("No se pudo copiar. Seleccioná el email o abrí tu correo.");
    }
  }
  return (
    <div className="contact-app">
      <AppIcon id="contact" />
      <h2>¿Algo en mente?</h2>
      <p>Conversemos sobre tu próximo proyecto.</p>
      <a className="contact-email" href="mailto:ignaciorave21@gmail.com">
        ignaciorave21@gmail.com
      </a>
      <div className="contact-app-actions">
        <a
          className="os-button os-button--primary"
          href="mailto:ignaciorave21@gmail.com"
        >
          <Mail size={15} /> Escribir un email
        </a>
        <button className="os-button" onClick={copyEmail}>
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copiado" : "Copiar email"}
        </button>
      </div>
      <a
        className="contact-linkedin"
        href="https://www.linkedin.com/in/ignacio-ravettini-novellino/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin size={19} />
        <span>
          Conectemos en LinkedIn<small>Ignacio Ravettini Novellino</small>
        </span>
        <ArrowUpRight size={17} />
      </a>
      <p className="contact-location">
        <MapPin size={14} /> Buenos Aires, Argentina
      </p>
    </div>
  );
}

function ProfileApp() {
  const [tab, setTab] = useState("perfil");
  const experience = [
    [
      "Septiembre 2025 – Presente",
      "Desarrollador web full-stack",
      "GCBA",
      "Desarrollo de webapps, integración de APIs y mantenimiento evolutivo.",
    ],
    [
      "Abril 2025 – Presente",
      "Analista de datos",
      "GCBA",
      "Análisis de datos para políticas públicas, informes, visualizaciones y limpieza de datos.",
    ],
    [
      "Diciembre 2025 – 10 de marzo de 2026",
      "Automatizador de procesos",
      "Sofijobs",
      "Diseño y mantenimiento de flujos con n8n.",
    ],
    [
      "Mayo 2024 – Febrero 2025",
      "Profesor de Programación e Informática",
      "UTN FRBA e-Learning · Natán Gesang · Mater Dolorosa",
      "Diseño de contenidos, clases de programación y desarrollo web, y mentoría.",
    ],
    [
      "Marzo 2024",
      "Pasante",
      "Grupo MSA",
      "Apoyo en desarrollo, metodologías ágiles y colaboración en equipo.",
    ],
  ];
  return (
    <div className="profile-app">
      <div
        className="profile-tabs"
        role="tablist"
        aria-label="Información profesional"
      >
        {["perfil", "experiencia", "tecnologías"].map((id) => (
          <button
            key={id}
            id={`tab-${id}`}
            role="tab"
            aria-selected={tab === id}
            aria-controls="profile-panel"
            onClick={() => setTab(id)}
            onKeyDown={(event) => {
              if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
                event.preventDefault();
                const ids = ["perfil", "experiencia", "tecnologías"];
                const next =
                  ids[
                    (ids.indexOf(id) + (event.key === "ArrowRight" ? 1 : 2)) % 3
                  ];
                setTab(next);
                document.getElementById(`tab-${next}`)?.focus();
              }
            }}
            tabIndex={tab === id ? 0 : -1}
          >
            {id === "perfil"
              ? "Sobre mí"
              : id === "experiencia"
                ? "Experiencia"
                : "Tecnologías"}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="profile-panel" aria-labelledby={`tab-${tab}`}>
        {tab === "perfil" && (
          <div className="profile-about">
            <div className="profile-monogram">
              IR<span>Buenos Aires, AR</span>
            </div>
            <h2>
              Ignacio Ravettini
              <br />
              Novellino.
            </h2>
            <p className="profile-role">
              Desarrollador web full stack y creador de software.
            </p>
            <p>
              Diseño y construyo aplicaciones completas: interfaces, APIs, bases
              de datos e integraciones. Me interesa transformar procesos
              manuales en productos claros, usables y mantenibles.
            </p>
            <p>
              Actualmente trabajo en el Gobierno de la Ciudad de Buenos Aires.
              También tengo experiencia en análisis de datos, automatización y
              formación técnica.
            </p>
            <a
              className="os-button os-button--primary"
              href="/cv-ignacio-ravettini.pdf"
              download="Ignacio Ravettini CV.pdf"
            >
              <ArrowDownToLine size={15} /> Descargar CV
            </a>
          </div>
        )}
        {tab === "experiencia" && (
          <div className="profile-experience">
            {experience.map(([period, role, org, detail]) => (
              <article key={role}>
                <p className="experience-date">{period}</p>
                <h3>{role}</h3>
                <strong>{org}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        )}
        {tab === "tecnologías" && (
          <div className="profile-skills">
            {[
              {
                title: "Interfaces",
                description:
                  "Experiencias claras, adaptables y enfocadas en las personas.",
                skills: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "HTML / CSS",
                  "Tailwind",
                  "Bootstrap",
                  "jQuery",
                  "Vite",
                  "Responsive Design",
                ],
              },
              {
                title: "Backend y datos",
                description:
                  "La estructura que conecta el producto con su operación.",
                skills: [
                  "Node.js",
                  "Express",
                  "Prisma",
                  "PostgreSQL",
                  "SQL Server",
                  "MongoDB",
                  "APIs REST",
                  "CRUD",
                  "Análisis de datos",
                ],
              },
              {
                title: "Producto y automatización",
                description:
                  "De la idea a producción, con procesos que pueden evolucionar.",
                skills: [
                  "Arquitectura web",
                  "n8n",
                  "Integraciones",
                  "Despliegue",
                  "Mantenimiento evolutivo",
                  "Documentación técnica",
                  "Contenido didáctico",
                  "Currículas",
                  "Mentoría",
                  "Comunicación técnica",
                  "Trabajo en equipo",
                  "Organización",
                  "Mejora continua",
                  "Resolución de problemas",
                  "Orientación a resultados",
                ],
              },
            ].map((group) => (
              <section key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div>
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TerminalApp({ openApp }: { openApp: (id: string) => void }) {
  const [history, setHistory] = useState<{ command: string; output: string }[]>(
    [
      {
        command: "",
        output:
          "ravettiniOS — Terminal\nEscribí help para ver los comandos disponibles.",
      },
    ],
  );
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
  }, [history]);
  function run() {
    const command = input.trim();
    if (!command) return;
    setInput("");
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    const normalized = command.toLowerCase();
    let output = "";
    const commands: Record<string, string> = {
      help: "Comandos disponibles:\n  doom          Abre DOOM (doom --help: controles)\n  whoami        Sobre Ignacio\n  ls / proyectos Lista de proyectos\n  open <nombre> Abre un proyecto (ej. open sigma)\n  perfil        Abre mi perfil\n  contacto      Hablemos\n  cv            Mi currículum\n  date          Hora en Buenos Aires\n  clear         Limpia la terminal",
      whoami:
        "Ignacio Ravettini Novellino\nDesarrollador web full stack · Buenos Aires, Argentina",
      ls: projects.map((p) => p.slug).join("\n"),
      proyectos: projects.map((p) => p.slug).join("\n"),
      pwd: "/home/ignacio/portfolio",
      date: new Date().toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
      }),
      "cat contacto":
        "ignaciorave21@gmail.com\nlinkedin.com/in/ignacio-ravettini-novellino/",
    };
    if (normalized === "clear") {
      setHistory([]);
      return;
    }
    if (normalized === "doom" || normalized === "open doom") {
      openApp("doom");
      output = "Abriendo DOOM: episodio shareware completo.";
    } else if (normalized === "doom --help") {
      output =
        "DOOM - Episodio shareware completo. Inicia directamente con los recursos shareware incluidos. W/S o flechas: avanzar/retroceder. A/D: girar. Ctrl: disparar. Espacio: usar. Shift: correr. Esc: menú.";
    } else if (commands[normalized]) output = commands[normalized];
    else if (["perfil", "contacto", "cv"].includes(normalized)) {
      openApp(
        (
          { perfil: "profile", contacto: "contact", cv: "cv" } as Record<
            string,
            string
          >
        )[normalized],
      );
      output = "Aplicación abierta.";
    } else if (normalized.startsWith("open ")) {
      const name = normalized.slice(5).trim();
      const app = projects.find(
        (p) => p.slug === name || p.title.toLowerCase() === name,
      );
      const utility = utilityApps.find(
        (item) =>
          item.id === name || item.label.toLocaleLowerCase("es") === name,
      );
      if (app) {
        openApp(app.slug);
        output = `Abriendo ${app.title}…`;
      } else if (utility) {
        openApp(utility.id);
        output = `Abriendo ${utility.label}…`;
      } else
        output = `No encontré «${name}». Usá ls para ver los nombres de los proyectos.`;
    } else
      output = `Comando no encontrado: ${command}\nEscribí help para ver qué podés hacer.`;
    setHistory((prev) => [...prev, { command, output }]);
  }
  return (
    <div className="terminal-app" ref={terminalRef}>
      <div
        className="terminal-history"
        role="log"
        aria-label="Historial de terminal"
      >
        {history.map((line, index) => (
          <div key={index}>
            {line.command && (
              <p className="terminal-command">
                <span>ignacio@ravettini</span> ~ % {line.command}
              </p>
            )}
            <pre>{line.output}</pre>
          </div>
        ))}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          run();
        }}
      >
        <label htmlFor="terminal-command">
          <span>ignacio@ravettini</span> ~ %
        </label>
        <input
          id="terminal-command"
          aria-label="Comando de terminal"
          value={input}
          spellCheck={false}
          autoComplete="off"
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const index =
                historyIndex < 0
                  ? commandHistory.length - 1
                  : Math.max(0, historyIndex - 1);
              setHistoryIndex(index);
              setInput(commandHistory[index] || "");
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const index = historyIndex + 1;
              setHistoryIndex(index >= commandHistory.length ? -1 : index);
              setInput(commandHistory[index] || "");
            }
          }}
        />
        <button type="submit" aria-label="Ejecutar comando">
          <ArrowUpRight size={16} />
        </button>
      </form>
    </div>
  );
}
