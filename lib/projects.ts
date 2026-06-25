export type ProjectMeta = {
  type: string;
  client: string;
  date: string;
};

export type ProjectPoint = {
  title: string;
  description: string;
};

export type ProjectResult = {
  value: string;
  label: string;
};

export type ProjectProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  what: string;
  problem: string;
  solution: string;
  problemPoints: ProjectPoint[];
  solutionFeatures: string[];
  tech: string[];
  href: string;
  gallery: string[];
  meta: ProjectMeta;
  results: ProjectResult[];
  process: ProjectProcessStep[];
  featured: boolean;
  heroFeatured?: boolean;
  hasDetailPage: boolean;
};

export const projects: Project[] = [
  {
    slug: 'acreditapp',
    title: 'Acreditapp',
    category: 'Plataforma de acreditación',
    shortDescription:
      'Plataforma web de acreditación y gestión de eventos que reemplaza planillas y AppSheet con control operativo en tiempo real.',
    what: 'Desarrollé una plataforma web de acreditación y gestión de eventos para reemplazar un proceso manual que se hacía con planillas y AppSheet. Centraliza todo el flujo operativo de acreditación en una sola herramienta pensada para equipos de campo y coordinación en vivo.',
    problem:
      'El problema principal era la falta de control operativo en tiempo real: la acreditación dependía de bases dispersas, altas manuales poco trazables, dificultad para evitar duplicados y poca visibilidad sobre qué estaba pasando durante cada evento. Además, el cierre posterior era lento porque los datos quedaban desordenados y costaba convertir la operación en métricas o reportes útiles.',
    solution:
      'La solución fue una webapp full stack que centraliza todo el flujo en una sola herramienta. Permite crear eventos, importar bases desde Excel, buscar personas por CUIL o DNI, acreditar asistentes en tiempo real, registrar casos “fuera de base”, asignar operadores por evento y mantener trazabilidad completa de cada acción. También incorpora métricas operativas, exportaciones y un informe post-evento con apoyo de IA.',
    problemPoints: [
      {
        title: 'Bases dispersas',
        description: 'La acreditación dependía de planillas y fuentes desconectadas sin un único registro confiable.',
      },
      {
        title: 'Poca trazabilidad',
        description: 'Altas manuales y acciones sin auditoría dificultaban detectar duplicados y errores.',
      },
      {
        title: 'Cierre lento',
        description: 'Al terminar el evento, ordenar datos y generar reportes consumía mucho tiempo operativo.',
      },
    ],
    solutionFeatures: [
      'Importación masiva de bases desde Excel',
      'Búsqueda y acreditación en tiempo real por CUIL o DNI',
      'Registro de casos fuera de base con trazabilidad',
      'Métricas operativas y exportaciones post-evento',
      'Informe automático con apoyo de IA',
    ],
    tech: ['Full stack', 'Eventos', 'Acreditación', 'IA', 'PostgreSQL'],
    href: 'https://acreditapp.helio3.co/',
    gallery: [
      '/proyectos/acreditapp/terminal.png',
      '/proyectos/acreditapp/eventos.png',
      '/proyectos/acreditapp/informe.png',
    ],
    meta: { type: 'Web app full stack', client: 'GCBA', date: '2025' },
    results: [
      { value: 'Tiempo real', label: 'Control operativo durante el evento' },
      { value: '100%', label: 'Trazabilidad de acreditaciones' },
      { value: '−70%', label: 'Tiempo de cierre post-evento' },
      { value: 'IA', label: 'Informe automático de resultados' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Mapeo del flujo manual con planillas y AppSheet.' },
      { step: '02', title: 'Diseño', description: 'Terminal de acreditación, roles y métricas operativas.' },
      { step: '03', title: 'Desarrollo', description: 'Webapp full stack con importación, búsqueda y auditoría.' },
      { step: '04', title: 'Iteración', description: 'Ajustes en campo, exportaciones e informe con IA.' },
    ],
    featured: true,
    heroFeatured: true,
    hasDetailPage: true,
  },
  {
    slug: 'recursos-humanos-ssccrs',
    title: 'Recursos Humanos SSCCRS',
    category: 'Webapp interna',
    shortDescription:
      'Web app full stack de RR.HH. para centralizar personas, vacaciones, presencialidad, reclamos y reportes con permisos por rol.',
    what: 'Desarrollé una web app full stack de Recursos Humanos para un área de gobierno, diseñada para centralizar procesos que antes estaban dispersos entre planillas, circuitos manuales y herramientas aisladas.',
    problem:
      'La operación diaria de RR.HH. dependía de procesos fragmentados: planillas, circuitos manuales y herramientas aisladas generaban fricción administrativa, poca visibilidad sobre aprobaciones, seguimiento de equipos y control de presencialidad, y dificultaban mantener trazabilidad sobre acciones clave.',
    solution:
      'La plataforma permite gestionar personas, organigrama, presencialidad, vacaciones, hojas de ruta, reclamos internos, capacitaciones, certificados médicos, auditoría, mailing y reportes, todo con permisos por rol y trazabilidad de acciones. Construida como monorepo full stack con React, TypeScript, Node.js, Express, Prisma y PostgreSQL.',
    problemPoints: [
      {
        title: 'Procesos dispersos',
        description: 'Vacaciones, reclamos y presencialidad vivían en planillas y circuitos manuales.',
      },
      {
        title: 'Poca visibilidad',
        description: 'Dificultad para seguir aprobaciones, equipos y estados de cada trámite.',
      },
      {
        title: 'Fricción administrativa',
        description: 'Tareas repetitivas sin automatización ni trazabilidad centralizada.',
      },
    ],
    solutionFeatures: [
      'Gestión de personas, organigrama y permisos por rol',
      'Vacaciones, hojas de ruta y reclamos internos',
      'Control de presencialidad y certificados médicos',
      'Importaciones masivas desde Excel',
      'Notificaciones, mailing y auditoría de acciones',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Prisma', 'PostgreSQL'],
    href: 'https://rh.helio3.co/',
    gallery: [
      '/proyectos/recursos-humanos/vacaciones.png',
      '/proyectos/recursos-humanos/metricas.png',
      '/proyectos/recursos-humanos/aprobaciones.png',
    ],
    meta: { type: 'Web app full stack', client: 'GCBA', date: '2025' },
    results: [
      { value: '1 hub', label: 'Operación RR.HH. centralizada' },
      { value: 'Roles', label: 'Permisos y trazabilidad por perfil' },
      { value: '−50%', label: 'Fricción en trámites internos' },
      { value: 'Excel', label: 'Importaciones masivas integradas' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Relevamiento de procesos dispersos del área.' },
      { step: '02', title: 'Diseño', description: 'Módulos, roles y flujos de aprobación.' },
      { step: '03', title: 'Desarrollo', description: 'Monorepo con React, Express, Prisma y PostgreSQL.' },
      { step: '04', title: 'Iteración', description: 'Automatizaciones, notificaciones y reportes.' },
    ],
    featured: true,
    hasDetailPage: true,
  },
  {
    slug: 'buscador-dotacion-gcba',
    title: 'Buscador Dotación GCBA',
    category: 'Herramienta de datos',
    shortDescription:
      'Aplicación interna para consultar y explotar más de 230.000 registros de dotación con filtros avanzados y exportaciones.',
    what: 'Diseñé y desarrollé una aplicación web interna para consultar y explotar la dotación del GCBA sobre una base de más de 230.000 registros. Pensada para transformar una base extensa en una herramienta ágil, usable y orientada a decisiones.',
    problem:
      'El problema operativo concreto era transformar una base extensa y difícil de navegar en una herramienta usable: las consultas, segmentaciones y tareas administrativas requerían mucho tiempo o trabajo manual porque no existía una forma ágil de buscar personas, cruzar CUILs, detectar registros sin email o generar listas de mailing listas para exportar.',
    solution:
      'El sistema centraliza búsquedas por persona, cargo y organismo, incorpora filtros avanzados, cruce masivo de CUILs, detección de registros sin email y generación de listas de mailing listas para exportar en CSV o Excel.',
    problemPoints: [
      {
        title: 'Base masiva',
        description: 'Más de 230.000 registros difíciles de consultar sin herramienta dedicada.',
      },
      {
        title: 'Consultas lentas',
        description: 'Segmentaciones y cruces de CUILs requerían trabajo manual extenso.',
      },
      {
        title: 'Datos incompletos',
        description: 'Detectar registros sin email o armar mailings era un proceso tedioso.',
      },
    ],
    solutionFeatures: [
      'Búsqueda por persona, cargo y organismo',
      'Filtros avanzados y cruce masivo de CUILs',
      'Detección de registros sin email',
      'Generación de listas de mailing exportables',
      'Exportación en CSV y Excel',
    ],
    tech: ['Next.js', 'TypeScript', 'SQL', 'Filtros avanzados', 'Exportación'],
    href: 'https://sqldotacionfiltro.vercel.app/',
    gallery: [
      '/proyectos/buscador-dotacion/cargos.png',
      '/proyectos/buscador-dotacion/mailing.png',
    ],
    meta: { type: 'Web app de consulta', client: 'GCBA', date: '2025' },
    results: [
      { value: '230K+', label: 'Registros consultables' },
      { value: '−80%', label: 'Tiempo en consultas repetitivas' },
      { value: 'CSV/XLSX', label: 'Exportaciones listas para usar' },
      { value: 'Filtros', label: 'Segmentación avanzada de dotación' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Análisis de la base de dotación y casos de uso.' },
      { step: '02', title: 'Diseño', description: 'Búsqueda, filtros y flujos de exportación.' },
      { step: '03', title: 'Desarrollo', description: 'App web con consultas optimizadas y cruce de CUILs.' },
      { step: '04', title: 'Iteración', description: 'Módulos avanzados, mailing y detección de emails.' },
    ],
    featured: true,
    hasDetailPage: true,
  },
  {
    slug: 'sigma',
    title: 'SIGMA',
    category: 'Plataforma de indicadores',
    shortDescription:
      'Plataforma de gestión y monitoreo de indicadores con carga, validación, dashboards y asistencia por IA.',
    what: 'Desarrollé SIGMA, una plataforma web de gestión y monitoreo de indicadores para una subsecretaría del Gobierno de la Ciudad de Buenos Aires. Centraliza la carga, validación, publicación y análisis de avances en una única herramienta.',
    problem:
      'El seguimiento de avances dependía de procesos dispersos basados en planillas, correos y control manual. Eso dificultaba la trazabilidad, retrasaba la consolidación del cumplimiento entre áreas y complicaba la toma de decisiones basada en datos actualizados.',
    solution:
      'El sistema incorpora un modelo jerárquico de áreas, unidades, proyectos e indicadores con ponderación, dashboards accionables, gestión de usuarios por roles, auditoría completa, recordatorios de carga, soporte técnico y una capa de IA para asistencia conversacional, detección de anomalías y generación de tickets.',
    problemPoints: [
      {
        title: 'Seguimiento manual',
        description: 'Planillas y correos dispersos para cargar y validar avances.',
      },
      {
        title: 'Sin consolidación',
        description: 'Dificultad para unificar cumplimiento entre áreas y periodos.',
      },
      {
        title: 'Poca trazabilidad',
        description: 'Faltaba auditoría y visibilidad sobre quién cargó qué y cuándo.',
      },
    ],
    solutionFeatures: [
      'Modelo jerárquico de áreas, proyectos e indicadores',
      'Carga, validación y publicación de avances',
      'Dashboards con ponderación y cumplimiento',
      'Auditoría, roles y recordatorios de carga',
      'IA para asistencia, anomalías y tickets',
    ],
    tech: ['Full stack', 'Indicadores', 'Dashboards', 'IA', 'Auditoría'],
    href: 'https://sigma.sectc.app/home',
    gallery: [
      '/proyectos/sigma/analytics.png',
      '/proyectos/sigma/gestion.png',
    ],
    meta: { type: 'Plataforma de gestión', client: 'GCBA', date: '2025–2026' },
    results: [
      { value: '1 vista', label: 'Consolidación de indicadores' },
      { value: 'Roles', label: 'Gestión por área y permisos' },
      { value: 'IA', label: 'Asistencia y detección de anomalías' },
      { value: 'Auditoría', label: 'Trazabilidad completa de cargas' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Mapeo del modelo de indicadores y flujos de carga.' },
      { step: '02', title: 'Diseño', description: 'Jerarquía, dashboards y roles de usuario.' },
      { step: '03', title: 'Desarrollo', description: 'Plataforma con validación, publicación y analytics.' },
      { step: '04', title: 'Iteración', description: 'IA conversacional, tickets y recordatorios.' },
    ],
    featured: true,
    hasDetailPage: true,
  },
  {
    slug: 'dermatologia-tod',
    title: 'Dermatología TOD',
    category: 'Plataforma comercial',
    shortDescription:
      'Plataforma integral con landing premium, reservas, WhatsApp, chatbot con IA y panel administrativo para un centro dermatológico.',
    what: 'Desarrollé una plataforma web integral para un centro dermatológico que combina presencia de marca, captación de pacientes y gestión operativa en un solo producto.',
    problem:
      'El centro necesitaba unificar en una misma herramienta la experiencia del paciente y la operación interna, reduciendo fricción en la toma de turnos, mejorando el seguimiento comercial y profesionalizando la presencia digital de la marca.',
    solution:
      'La solución incluye una landing premium orientada a comunicar el valor médico y estético del centro, un sistema de reservas con disponibilidad por tratamiento y profesional, integración con WhatsApp, chatbot asistido por IA con límites clínicos, y un panel administrativo para gestionar agenda, solicitudes, leads, conversaciones, tratamientos y métricas.',
    problemPoints: [
      {
        title: 'Experiencia fragmentada',
        description: 'Turnos, consultas y seguimiento comercial estaban desconectados.',
      },
      {
        title: 'Fricción en reservas',
        description: 'La toma de turnos dependía de canales manuales poco escalables.',
      },
      {
        title: 'Marca digital débil',
        description: 'Faltaba una presencia online que transmitiera el nivel del centro.',
      },
    ],
    solutionFeatures: [
      'Landing premium con propuesta médica y estética',
      'Reservas por tratamiento y profesional',
      'Integración con WhatsApp y chatbot con IA',
      'Panel admin para agenda, leads y conversaciones',
      'Métricas de captación y operación',
    ],
    tech: ['Next.js', 'Reservas', 'WhatsApp', 'IA', 'Panel admin'],
    href: 'https://dermatologia-web.vercel.app/',
    gallery: [
      '/proyectos/dermatologia-tod/consultorio.png',
      '/proyectos/dermatologia-tod/chatbot.png',
      '/proyectos/dermatologia-tod/tratamientos.png',
    ],
    meta: { type: 'Plataforma integral', client: 'Centro dermatológico', date: '2025–2026' },
    results: [
      { value: '1 plataforma', label: 'Paciente y operación unificados' },
      { value: 'Turnos', label: 'Reservas online automatizadas' },
      { value: 'WhatsApp', label: 'Canal comercial integrado' },
      { value: 'IA', label: 'Asistente con límites clínicos' },
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Relevamiento de flujo de pacientes y operación.' },
      { step: '02', title: 'Diseño', description: 'Landing, reservas y panel administrativo.' },
      { step: '03', title: 'Desarrollo', description: 'Plataforma con agenda, WhatsApp e IA.' },
      { step: '04', title: 'Iteración', description: 'Leads, métricas y ajustes de conversión.' },
    ],
    featured: true,
    hasDetailPage: true,
  },
  {
    slug: 'simulacro-entrevistas',
    title: 'Simulacro de Entrevistas (IA)',
    category: 'Herramienta con IA',
    shortDescription:
      'Simulador de entrevistas basado en IA: subís tu CV, analiza tu perfil y genera una entrevista personalizada para practicar.',
    what: 'Simulador de entrevistas basado en IA para practicar antes de una entrevista laboral real.',
    problem: '',
    solution: '',
    problemPoints: [],
    solutionFeatures: [],
    tech: ['IA', 'CV', 'Entrevistas'],
    href: 'https://simulacro-entrevista-1.onrender.com/',
    gallery: [],
    meta: { type: 'Web app', client: 'Personal', date: '2024' },
    results: [],
    process: [],
    featured: false,
    hasDetailPage: false,
  },
  {
    slug: 'v-mail-validator',
    title: 'V-Mail Validator',
    category: 'Validación de datos',
    shortDescription:
      'Sistema que detecta correos inválidos, filtra direcciones no deseadas y prepara listas más limpias para campañas institucionales.',
    what: 'Sistema de validación de correos electrónicos para campañas institucionales.',
    problem: '',
    solution: '',
    problemPoints: [],
    solutionFeatures: [],
    tech: ['Next.js', 'TypeScript', 'Validación de datos'],
    href: 'https://vmailproject.vercel.app/',
    gallery: [],
    meta: { type: 'Web app', client: 'Personal', date: '2024' },
    results: [],
    process: [],
    featured: false,
    hasDetailPage: false,
  },
  {
    slug: 'media-compressor',
    title: 'Media Compressor',
    category: 'Utilidad web',
    shortDescription: 'Plataforma para comprimir imágenes y videos de forma rápida y simple.',
    what: 'Plataforma para comprimir imágenes y videos de forma rápida y simple.',
    problem: '',
    solution: '',
    problemPoints: [],
    solutionFeatures: [],
    tech: ['Next.js', 'TypeScript', 'FFmpeg', 'Vercel'],
    href: 'https://proyectocompresor.onrender.com/',
    gallery: [],
    meta: { type: 'Web app', client: 'Personal', date: '2024' },
    results: [],
    process: [],
    featured: false,
    hasDetailPage: false,
  },
  {
    slug: 'acqua-di-colbert',
    title: 'Acqua Di Colbert',
    category: 'Landing page',
    shortDescription: 'Landing page profesional con animaciones del perfume Acqua Di Colbert.',
    what: 'Landing page profesional con animaciones del perfume Acqua Di Colbert.',
    problem: '',
    solution: '',
    problemPoints: [],
    solutionFeatures: [],
    tech: ['Landing', 'Animaciones', 'Netlify'],
    href: 'https://acquadicolbert.netlify.app/',
    gallery: [],
    meta: { type: 'Landing', client: 'Personal', date: '2024' },
    results: [],
    process: [],
    featured: false,
    hasDetailPage: false,
  },
];

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  const base = lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${base}…`;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getHeroProject(): Project | undefined {
  return projects.find((project) => project.heroFeatured);
}

export function getFeaturedGridProjects(): Project[] {
  return projects.filter((project) => project.featured && !project.heroFeatured);
}

export function getOtherProjects(): Project[] {
  return projects.filter((project) => !project.featured);
}

export function getProjectsWithDetailPages(): Project[] {
  return projects.filter((project) => project.hasDetailPage);
}

export function getProjectCover(project: Project): string | undefined {
  return project.gallery[0];
}
