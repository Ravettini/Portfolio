import { ArrowUpRight } from "lucide-react";
export function ContactSection() {
  return (
    <section id="contacto" className="editorial-contact">
      <div className="shell">
        <p className="eyebrow" data-reveal>
          04 / Pr?xima conversaci?n
        </p>
        <h2 data-reveal>
          ?Algo en mente?
          <br />
          <a href="mailto:ignaciorave21@gmail.com">
            Hablemos.
            <ArrowUpRight />
          </a>
        </h2>
        <div className="contact-links">
          <a href="mailto:ignaciorave21@gmail.com">
            ignaciorave21@gmail.com <ArrowUpRight size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/ignacio-ravettini-novellino/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <ArrowUpRight size={18} />
          </a>
          <a
            href="/cv-ignacio-ravettini.pdf"
            download="Ignacio Ravettini CV.pdf"
          >
            Descargar CV <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
