import { Navbar } from '@/components/navbar';
import { HeroClient } from '@/components/hero-client';
import { AboutSection } from '@/components/sections/about-section';
import { SpecialtiesSection } from '@/components/sections/specialties-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactSection } from '@/components/sections/contact-section';
import { FooterSection } from '@/components/sections/footer-section';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-full">
        <HeroClient />
        <AboutSection />
        <SpecialtiesSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  );
}
