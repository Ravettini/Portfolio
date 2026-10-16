export function AboutSection() {
  return (
    <section id="sobre-mi" className="editorial-section shell profile-section">
      <p className="eyebrow" data-reveal>
        02 / Detr?s del c?digo
      </p>
      <div className="profile-grid" data-reveal>
        <h2>
          Curiosidad para
          <br />
          entender.
          <br />
          <span>Criterio para crear.</span>
        </h2>
        <div>
          <p className="profile-intro">
            Soy Ignacio Ravettini Novellino. Desarrollador web full stack y
            creador de software en Buenos Aires.
          </p>
          <p>
            Dise?o y construyo aplicaciones completas: interfaces, APIs, bases
            de datos e integraciones. Me interesa transformar procesos manuales
            en productos claros, usables y mantenibles.
          </p>
          <p>
            Actualmente trabajo en el Gobierno de la Ciudad de Buenos Aires.
            Tambi?n tengo experiencia en an?lisis de datos, automatizaci?n y
            formaci?n t?cnica.
          </p>
          <a
            className="text-link"
            href="/cv-ignacio-ravettini.pdf"
            download="Ignacio Ravettini CV.pdf"
          >
            Descargar CV ?
          </a>
        </div>
      </div>
    </section>
  );
}
