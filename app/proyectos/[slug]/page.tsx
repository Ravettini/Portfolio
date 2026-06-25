import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailContent } from '@/components/projects/project-detail-content';
import { getProjectBySlug, getProjectsWithDetailPages } from '@/lib/projects';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectsWithDetailPages().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Proyecto no encontrado' };
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.hasDetailPage) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
