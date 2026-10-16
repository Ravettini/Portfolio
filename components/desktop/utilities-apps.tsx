"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  Download,
  Eraser,
  Pause,
  Pencil,
  Play,
  RotateCcw,
  Undo2,
  Redo2,
  Trash2,
  Flag,
} from "lucide-react";
import { AppIcon } from "./app-icon";

export const utilityApps = [
  { id: "paint", label: "Paint", description: "Un lienzo para tus ideas." },
  {
    id: "calculator",
    label: "Calculadora",
    description: "Las cuentas de todos los días.",
  },
  {
    id: "notepad",
    label: "Bloc de notas",
    description: "Escribí y guardá lo que se te ocurra.",
  },
  {
    id: "clock",
    label: "Reloj",
    description: "Hora de Buenos Aires y cronómetro.",
  },
];

function downloadText(text: string, filename: string) {
  const url = URL.createObjectURL(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function UtilitiesFolder({
  openApp,
}: {
  openApp: (id: string) => void;
}) {
  return (
    <div className="utilities-folder">
      <div className="utilities-folder-heading">
        <h2>Un poco más que un portafolio.</h2>
        <p>Pequeñas herramientas para hacer una pausa y explorar.</p>
      </div>
      <div className="utilities-grid">
        {utilityApps.map((app) => (
          <button key={app.id} onClick={() => openApp(app.id)}>
            <AppIcon id={app.id} />
            <strong>{app.label}</strong>
            <span>{app.description}</span>
          </button>
        ))}
      </div>
      <p className="utilities-folder-footnote">
        También podés encontrarlas en la búsqueda del escritorio.
      </p>
    </div>
  );
}

export function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stroke = useRef<number | null>(null);
  const undoStack = useRef<ImageData[]>([]),
    redoStack = useRef<ImageData[]>([]);
  const [history, setHistory] = useState({ undo: 0, redo: 0 });
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [color, setColor] = useState("#0757ed"),
    [size, setSize] = useState(5);
  const [status, setStatus] = useState("Tu próximo dibujo empieza acá.");
  const palette = [
    "#182238",
    "#ffffff",
    "#0757ed",
    "#19a974",
    "#f0a629",
    "#e64c65",
    "#8b5cdb",
  ];
  const context = () =>
    canvasRef.current?.getContext("2d", { willReadFrequently: true });
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d", {
      willReadFrequently: true,
    });
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 960, 600);
    }
  }, []);
  const syncHistory = () =>
    setHistory({
      undo: undoStack.current.length,
      redo: redoStack.current.length,
    });
  function remember() {
    const ctx = context();
    if (!ctx) return;
    undoStack.current.push(ctx.getImageData(0, 0, 960, 600));
    if (undoStack.current.length > 12) undoStack.current.shift();
    redoStack.current = [];
    syncHistory();
  }
  function point(event: ReactPointerEvent<HTMLCanvasElement>) {
    const r = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - r.left) * 960) / r.width,
      y: ((event.clientY - r.top) * 600) / r.height,
    };
  }
  function begin(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0 || stroke.current !== null) return;
    const ctx = context();
    if (!ctx) return;
    remember();
    stroke.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus({ preventScroll: true });
    const p = point(event);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 4 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 0.01, p.y);
    ctx.stroke();
    setStatus("Dibujando…");
  }
  function move(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (stroke.current !== event.pointerId) return;
    const p = point(event),
      ctx = context();
    if (ctx) {
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }
  function finish(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (stroke.current === event.pointerId) {
      stroke.current = null;
      setStatus("Listo. Podés seguir dibujando o descargar tu imagen.");
    }
  }
  function undo() {
    const ctx = context(),
      previous = undoStack.current.pop();
    if (!ctx || !previous) return;
    redoStack.current.push(ctx.getImageData(0, 0, 960, 600));
    ctx.putImageData(previous, 0, 0);
    syncHistory();
    setStatus("Último cambio deshecho.");
  }
  function redo() {
    const ctx = context(),
      next = redoStack.current.pop();
    if (!ctx || !next) return;
    undoStack.current.push(ctx.getImageData(0, 0, 960, 600));
    ctx.putImageData(next, 0, 0);
    syncHistory();
    setStatus("Cambio recuperado.");
  }
  function clear() {
    const ctx = context();
    if (!ctx) return;
    remember();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 960, 600);
    setStatus("Lienzo limpio. Deshacer permite recuperar el dibujo.");
  }
  function save() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "mi-dibujo-ravettini.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setStatus("Imagen PNG preparada para descargar.");
  }
  return (
    <div
      className="paint-app"
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
        }
      }}
    >
      <div className="utility-toolbar paint-toolbar">
        <div className="utility-tool-group">
          <button
            aria-label="Pincel"
            aria-pressed={tool === "brush"}
            onClick={() => setTool("brush")}
          >
            <Pencil size={16} />
          </button>
          <button
            aria-label="Goma de borrar"
            aria-pressed={tool === "eraser"}
            onClick={() => setTool("eraser")}
          >
            <Eraser size={16} />
          </button>
        </div>
        <div className="paint-palette" aria-label="Colores">
          {palette.map((value) => (
            <button
              key={value}
              aria-label={`Color ${value}`}
              aria-pressed={color === value}
              style={{ background: value }}
              onClick={() => {
                setColor(value);
                setTool("brush");
              }}
            />
          ))}
          <input
            type="color"
            aria-label="Color personalizado"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              setTool("brush");
            }}
          />
        </div>
        <label className="paint-size">
          Grosor{" "}
          <input
            type="range"
            min="1"
            max="30"
            value={size}
            aria-label="Grosor del pincel"
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <span>{size}</span>
        </label>
        <div className="utility-tool-group">
          <button
            aria-label="Deshacer dibujo"
            disabled={!history.undo}
            onClick={undo}
          >
            <Undo2 size={16} />
          </button>
          <button
            aria-label="Rehacer dibujo"
            disabled={!history.redo}
            onClick={redo}
          >
            <Redo2 size={16} />
          </button>
          <button aria-label="Limpiar lienzo" onClick={clear}>
            <Trash2 size={16} />
          </button>
        </div>
        <button className="os-button os-button--primary" onClick={save}>
          <Download size={14} /> PNG
        </button>
      </div>
      <div className="paint-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={960}
          height={600}
          tabIndex={0}
          aria-label="Lienzo de Paint: dibujá con el mouse o con el dedo"
          onPointerDown={begin}
          onPointerMove={move}
          onPointerUp={finish}
          onPointerCancel={finish}
        >
          Tu navegador no admite el lienzo de dibujo.
        </canvas>
      </div>
      <div className="utility-status">
        <span role="status">{status}</span>
        <span>960 × 600</span>
      </div>
    </div>
  );
}

type CalcState = {
  display: string;
  stored: number | null;
  operator: string | null;
  waiting: boolean;
  last: { operator: string; value: number } | null;
  error: string;
};
const initialCalc: CalcState = {
  display: "0",
  stored: null,
  operator: null,
  waiting: false,
  last: null,
  error: "",
};
const evaluate = (a: number, b: number, op: string) =>
  op === "+"
    ? a + b
    : op === "−"
      ? a - b
      : op === "×"
        ? a * b
        : b === 0
          ? NaN
          : a / b;
const numberText = (value: number) => String(Number(value.toPrecision(12)));

export function CalculatorApp() {
  const [state, setState] = useState<CalcState>(initialCalc);
  function press(key: string) {
    setState((previous) => {
      const current = previous.error ? initialCalc : previous;
      if (key === "AC") return initialCalc;
      if (/^\d$/.test(key))
        return {
          ...current,
          display:
            current.waiting || current.display === "0"
              ? key
              : current.display.length < 14
                ? current.display + key
                : current.display,
          waiting: false,
          last: current.waiting ? null : current.last,
        };
      if (key === ",")
        return {
          ...current,
          display: current.waiting
            ? "0."
            : current.display.includes(".")
              ? current.display
              : current.display + ".",
          waiting: false,
        };
      if (key === "⌫")
        return {
          ...current,
          display:
            current.waiting ||
            current.display.length === 1 ||
            /^-\d$/.test(current.display)
              ? "0"
              : current.display.slice(0, -1),
          waiting: false,
        };
      if (key === "±")
        return { ...current, display: numberText(-Number(current.display)) };
      if (key === "%")
        return {
          ...current,
          display: numberText(Number(current.display) / 100),
        };
      if (["+", "−", "×", "÷"].includes(key)) {
        const value =
          current.operator && current.stored !== null && !current.waiting
            ? evaluate(
                current.stored,
                Number(current.display),
                current.operator,
              )
            : Number(current.display);
        if (!Number.isFinite(value))
          return {
            ...initialCalc,
            error: "No se puede dividir por cero.",
            display: "Error",
          };
        return {
          display: numberText(value),
          stored: value,
          operator: key,
          waiting: true,
          last: null,
          error: "",
        };
      }
      if (key === "=") {
        const operator = current.operator || current.last?.operator;
        if (!operator) return current;
        const operand = current.operator
          ? Number(current.display)
          : current.last!.value;
        const value = evaluate(
          current.operator ? current.stored! : Number(current.display),
          operand,
          operator,
        );
        if (!Number.isFinite(value))
          return {
            ...initialCalc,
            error:
              operand === 0 && operator === "÷"
                ? "No se puede dividir por cero."
                : "El resultado es demasiado grande.",
            display: "Error",
          };
        return {
          display: numberText(value),
          stored: null,
          operator: null,
          waiting: true,
          last: { operator, value: operand },
          error: "",
        };
      }
      return current;
    });
  }
  const keys = [
    "AC",
    "±",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "−",
    "1",
    "2",
    "3",
    "+",
    "⌫",
    "0",
    ",",
    "=",
  ];
  const labels: Record<string, string> = {
    AC: "Borrar todo",
    "±": "Cambiar signo",
    "%": "Porcentaje",
    "÷": "Dividir",
    "×": "Multiplicar",
    "−": "Restar",
    "+": "Sumar",
    "⌫": "Borrar último dígito",
    ",": "Separador decimal",
    "=": "Igual",
  };
  return (
    <div
      className="calculator-app"
      tabIndex={0}
      aria-label="Calculadora, también podés usar el teclado"
      onKeyDown={(e) => {
        const key = /^\d$/.test(e.key)
          ? e.key
          : (
              {
                ".": ",",
                ",": ",",
                "*": "×",
                "/": "÷",
                "-": "−",
                "+": "+",
                Enter: "=",
                "=": "=",
                Backspace: "⌫",
                Delete: "AC",
                Escape: "AC",
                "%": "%",
              } as Record<string, string>
            )[e.key];
        if (key) {
          e.preventDefault();
          press(key);
        }
      }}
    >
      <div className="calculator-screen">
        <span className="calculator-expression">
          {state.stored !== null
            ? `${numberText(state.stored).replace(".", ",")} ${state.operator}`
            : "Calculadora"}
        </span>
        <output aria-label="Resultado" aria-live="polite">
          {state.display.replace(".", ",")}
        </output>
        <span className="calculator-error" role="status">
          {state.error}
        </span>
      </div>
      <div className="calculator-keys">
        {keys.map((key) => (
          <button
            key={key}
            aria-label={labels[key] || key}
            className={`${["+", "−", "×", "÷"].includes(key) ? "calc-operator" : ""}${key === "=" ? " calc-equals" : ""}${key === "AC" || key === "±" || key === "%" ? " calc-secondary" : ""}`}
            onClick={() => press(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

export function NotepadApp() {
  const [text, setText] = useState("");
  const latestText = useRef<string | null>(null);
  const [ready, setReady] = useState(false),
    [status, setStatus] = useState("Cargando tus notas…");
  useEffect(() => {
    try {
      latestText.current = localStorage.getItem("ravettini-os-notepad") || "";
      setText(latestText.current);
      setStatus("Guardado en este navegador");
    } catch {
      setStatus("Guardado local no disponible. Podés descargar el texto.");
    }
    setReady(true);
    return () => {
      if (latestText.current !== null) {
        try {
          localStorage.setItem("ravettini-os-notepad", latestText.current);
        } catch {
          /* Download remains the fallback. */
        }
      }
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    setStatus("Guardando…");
    const timer = setTimeout(() => {
      try {
        localStorage.setItem("ravettini-os-notepad", text);
        setStatus("Guardado en este navegador");
      } catch {
        setStatus("No se pudo guardar. Descargá el texto para conservarlo.");
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [text, ready]);
  return (
    <div className="notepad-app">
      <div className="utility-toolbar">
        <span className="notepad-filename">Sin título.txt</span>
        <button
          className="os-button"
          onClick={() => downloadText(text, "mis-notas.txt")}
        >
          <Download size={14} /> Descargar .txt
        </button>
      </div>
      <textarea
        aria-label="Contenido del bloc de notas"
        placeholder="Una idea, un recordatorio, el comienzo de algo…"
        spellCheck
        value={text}
        onChange={(e) => {
          latestText.current = e.target.value;
          setText(e.target.value);
        }}
      />
      <div className="utility-status">
        <span role="status">{status}</span>
        <span>
          {text.length} caracteres ·{" "}
          {text.trim() ? text.trim().split(/\s+/).length : 0} palabras
        </span>
      </div>
    </div>
  );
}

function duration(ms: number) {
  const total = Math.floor(ms / 10);
  return `${String(Math.floor(total / 6000)).padStart(2, "0")}:${String(Math.floor(total / 100) % 60).padStart(2, "0")}.${String(total % 100).padStart(2, "0")}`;
}
export function ClockApp() {
  const [tab, setTab] = useState("clock"),
    [now, setNow] = useState<Date | null>(null);
  const [running, setRunning] = useState(false),
    [elapsed, setElapsed] = useState(0),
    [laps, setLaps] = useState<number[]>([]);
  const started = useRef(0),
    accumulated = useRef(0);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () =>
        setElapsed(accumulated.current + performance.now() - started.current),
      50,
    );
    return () => clearInterval(timer);
  }, [running]);
  function toggle() {
    if (running) {
      accumulated.current += performance.now() - started.current;
      setElapsed(accumulated.current);
      setRunning(false);
    } else {
      started.current = performance.now();
      setRunning(true);
    }
  }
  return (
    <div className="clock-app">
      <div className="clock-tabs" aria-label="Vista del reloj">
        {[
          { id: "clock", label: "Reloj" },
          { id: "stopwatch", label: "Cronómetro" },
        ].map((item) => (
          <button
            key={item.id}
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === "clock" ? (
        <div className="clock-face">
          <p>Buenos Aires, Argentina</p>
          <time>
            {now
              ? new Intl.DateTimeFormat("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                  timeZone: "America/Argentina/Buenos_Aires",
                }).format(now)
              : "—:—:—"}
          </time>
          <span>
            {now
              ? new Intl.DateTimeFormat("es-AR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "America/Argentina/Buenos_Aires",
                }).format(now)
              : ""}
          </span>
        </div>
      ) : (
        <div className="stopwatch-face">
          <output aria-label="Tiempo del cronómetro">
            {duration(elapsed)}
          </output>
          <div className="stopwatch-actions">
            <button className="os-button os-button--primary" onClick={toggle}>
              {running ? <Pause size={15} /> : <Play size={15} />}
              {running ? "Pausar" : elapsed ? "Continuar" : "Iniciar"}
            </button>
            {running ? (
              <button
                className="os-button"
                onClick={() =>
                  setLaps((prev) =>
                    [
                      accumulated.current + performance.now() - started.current,
                      ...prev,
                    ].slice(0, 20),
                  )
                }
              >
                <Flag size={15} /> Vuelta
              </button>
            ) : (
              <button
                className="os-button"
                disabled={!elapsed}
                onClick={() => {
                  setElapsed(0);
                  accumulated.current = 0;
                  setLaps([]);
                }}
              >
                <RotateCcw size={15} /> Reiniciar
              </button>
            )}
          </div>
          {laps.length > 0 && (
            <ol className="stopwatch-laps" aria-label="Vueltas del cronómetro">
              {laps.map((lap, index) => (
                <li key={`${index}-${lap}`}>
                  <span>Vuelta {laps.length - index}</span>
                  <span>{duration(lap)}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
