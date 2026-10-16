const experiences = [
  {
    period: "Septiembre 2025 – Presente",
    role: "Desarrollador web full-stack",
    org: "GCBA",
    tags: ["WebApps", "APIs", "React", "Next.js"],
    points: [
      "Desarrollo de webapps",
      "Integración de APIs",
      "Mantenimiento evolutivo",
    ],
  },
  {
    period: "Abril 2025 – Presente",
    role: "Analista de datos",
    org: "GCBA",
    tags: ["Data", "Visualización", "SQL", "Informes"],
    points: [
      "Análisis de datos para políticas públicas",
      "Informes y visualizaciones",
      "Limpieza de datos",
      "Colaboración multidisciplinaria",
    ],
  },
  {
    period: "Diciembre 2025 – 10 de marzo de 2026",
    role: "Automatizador de procesos",
    org: "Sofijobs",
    tags: ["N8N", "Automatización", "Procesos"],
    points: [
      "Automatización de procesos con N8N",
      "Diseño y mantenimiento de flujos",
    ],
  },
  {
    period: "Mayo 2024 – Febrero 2025",
    role: "Profesor de Programación e Informática",
    org: "UTN FRBA e-Learning + Natán Gesang + Mater Dolorosa",
    tags: ["Educación", "Desarrollo web", "Mentoría"],
    points: [
      "Diseño de contenido",
      "Dictado de clases",
      "Fundamentos de programación",
      "Desarrollo web",
      "Mentoría",
    ],
  },
  {
    period: "Marzo 2024",
    role: "Pasante",
    org: "Grupo MSA",
    tags: ["Ágil", "Equipo"],
    points: [
      "Apoyo en desarrollo",
      "Metodologías ágiles",
      "Colaboración en equipo",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experiencia" className="shell experience-section">
      <div className="experience-heading">
        <p className="eyebrow">Trayectoria</p>
        <h2>
          Experiencia
          <br />
          <span>en acci?n.</span>
        </h2>
      </div>
      <div>
        {experiences.map((exp) => (
          <article
            key={exp.role + exp.org}
            className="experience-row"
            data-reveal
          >
            <p className="experience-period">{exp.period}</p>
            <div>
              <h3>{exp.role}</h3>
              <p>{exp.org}</p>
              <p className="experience-points">{exp.points.join(" ? ")}</p>
              <div className="tech-line">{exp.tags.join(" / ")}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
