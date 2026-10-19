import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { demoDeployments, type DemoSlug } from "@/lib/demo-deployments";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(demoDeployments, slug)) notFound();
  const demo = demoDeployments[slug as DemoSlug];
  if (demo.url) redirect(demo.url);
  if (process.env.NODE_ENV === "development")
    redirect(`http://127.0.0.1:${demo.port}`);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 520 }}>
        <h1>{demo.title}</h1>
        <p>La demo con datos ficticios estará disponible próximamente.</p>
        <Link href="/">Volver al portafolio</Link>
      </div>
    </main>
  );
}
