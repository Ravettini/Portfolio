const groups = [
  {
    title: "Interfaces",
    description:
      "Experiencias claras, adaptables y enfocadas en las personas que las usan.",
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
    description: "La estructura que conecta el producto con su operación.",
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
];
export function SkillsSection() {
  return (
    <section id="habilidades" className="editorial-section shell">
      <span id="especialidades" className="anchor-alias" />
      <div className="section-heading" data-reveal>
        <p className="eyebrow">03 / Capacidades</p>
        <div>
          <h2>
            Del concepto
            <br />
            <span>al sistema.</span>
          </h2>
          <p>
            Una mirada completa del producto.
            <br />
            Cada parte, conectada con la siguiente.
          </p>
        </div>
      </div>
      <div className="capabilities-grid">
        {groups.map((group, index) => (
          <article key={group.title} data-reveal>
            <span className="capability-number">0{index + 1} ?</span>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
