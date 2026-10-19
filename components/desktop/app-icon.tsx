import Image from "next/image";
import {
  BadgeCheck,
  Gamepad2,
  Brush,
  Calculator,
  Clock3,
  NotebookPen,
  BrainCircuit,
  BriefcaseBusiness,
  Droplet,
  FileText,
  FolderOpen,
  MailCheck,
  Monitor,
  Search,
  Send,
  Settings2,
  Sigma,
  Stethoscope,
  StickyNote,
  Terminal,
  UserRound,
  UsersRound,
  Video,
  type LucideIcon,
} from "lucide-react";

export const applicationIcons: Record<
  string,
  { icon: LucideIcon; color: string; label: string }
> = {
  acreditapp: { icon: BadgeCheck, color: "blue", label: "Acreditapp" },
  sigma: { icon: Sigma, color: "violet", label: "SIGMA" },
  "produccion-eventos": {
    icon: BriefcaseBusiness,
    color: "teal",
    label: "Producción",
  },
  "recursos-humanos-ssccrs": {
    icon: UsersRound,
    color: "green",
    label: "Recursos Humanos",
  },
  "buscador-dotacion-gcba": {
    icon: Search,
    color: "amber",
    label: "Buscador Dotación",
  },
  "dermatologia-tod": {
    icon: Stethoscope,
    color: "coral",
    label: "Dermatología TOD",
  },
  "simulacro-entrevistas": {
    icon: BrainCircuit,
    color: "violet",
    label: "Simulacro IA",
  },
  "v-mail-validator": {
    icon: MailCheck,
    color: "teal",
    label: "V-Mail Validator",
  },
  "media-compressor": {
    icon: Video,
    color: "slate",
    label: "Media Compressor",
  },
  "acqua-di-colbert": {
    icon: Droplet,
    color: "sky",
    label: "Acqua Di Colbert",
  },
  welcome: { icon: StickyNote, color: "paper", label: "Bienvenida" },
  profile: { icon: UserRound, color: "paper", label: "Perfil" },
  contact: { icon: Send, color: "blue", label: "Contacto" },
  terminal: { icon: Terminal, color: "terminal", label: "Terminal" },
  cv: { icon: FileText, color: "paper", label: "CV" },
  settings: { icon: Settings2, color: "slate", label: "Ajustes" },
  projects: { icon: FolderOpen, color: "sky", label: "Proyectos" },
  utilities: { icon: FolderOpen, color: "amber", label: "Utilidades" },
  doom: { icon: Gamepad2, color: "coral", label: "DOOM" },
  paint: { icon: Brush, color: "coral", label: "Paint" },
  calculator: { icon: Calculator, color: "slate", label: "Calculadora" },
  notepad: { icon: NotebookPen, color: "paper", label: "Bloc de notas" },
  clock: { icon: Clock3, color: "terminal", label: "Reloj" },
  experience: { icon: BriefcaseBusiness, color: "slate", label: "Experiencia" },
  skills: { icon: Monitor, color: "blue", label: "Tecnologías" },
};

export function AppIcon({
  id,
  small = false,
}: {
  id: string;
  small?: boolean;
}) {
  const app = applicationIcons[id] || applicationIcons.projects;
  const Icon = app.icon;
  return (
    <span
      className={`app-icon app-icon--${id === "doom" ? "doom" : app.color}${small ? " app-icon--small" : ""}`}
      aria-hidden="true"
    >
      {id === "doom" ? (
        <Image src="/games/doom/logo.png" alt="" width={603} height={368} sizes={small ? "32px" : "48px"} draggable={false} />
      ) : <Icon strokeWidth={1.65} />}
    </span>
  );
}
