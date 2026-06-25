import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { SectionReveal } from '@/components/ui/section-reveal';
import { ProjectCardHero } from '@/components/projects/project-card-hero';
import { ProjectCardGrid } from '@/components/projects/project-card-grid';
import {
  getHeroProject,
  getFeaturedGridProjects,
  getOtherProjects,
} from '@/lib/projects';

export function ProjectsSection() {
  const heroProject = getHeroProject();
  const featuredGridProjects = getFeaturedGridProjects();
  const otherProjects = getOtherProjects();

  return (
    <Section
      id="proyectos"
      title="Proyectos"
      subtitle="Aplicaciones y herramientas en contexto laboral y personal."
      className="bg-[#0b0f14]/20"
    >
      <Container>
        <SectionReveal>
          <div className="space-y-6">
            {heroProject && <ProjectCardHero project={heroProject} />}

            {featuredGridProjects.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {featuredGridProjects.map((project) => (
                  <ProjectCardGrid key={project.slug} project={project} />
                ))}
              </div>
            )}

            {otherProjects.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                {otherProjects.map((project) => (
                  <ProjectCardGrid key={project.slug} project={project} external />
                ))}
              </div>
            )}
          </div>
        </SectionReveal>
      </Container>
    </Section>
  );
}
