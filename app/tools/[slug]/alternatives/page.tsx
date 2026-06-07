import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getTools, getToolByName, getAlternatives } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolByName(slug);
  if (!tool) return {};
  return {
    title: `Best 5 ${tool.name} Alternatives for Next.js Developers (2026)`,
    description: `Compare the top 5 alternatives to ${tool.name} for Next.js authentication. Find the best fit for your project based on pricing, DX, and learning curve.`,
    openGraph: {
      title: `Best 5 ${tool.name} Alternatives`,
      description: `Top alternatives to ${tool.name} for Next.js developers.`,
    },
  };
}

export default async function AlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolByName(slug);
  if (!tool) notFound();

  const alternatives = getAlternatives(slug);

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: tool.name, url: `/tools/${tool.id}` }, { name: "Alternatives", url: `/tools/${tool.id}/alternatives` }])} />

      <div className="mb-4 flex items-center gap-2">
        <span className="pill pill-amber">Alternatives</span>
        <span className="text-xs text-slate-400">Top 5 picks</span>
      </div>

      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Best 5 {tool.name} Alternatives for Next.js Developers (2026)
      </h1>
      <p className="mb-8 text-lg text-slate-500">
        If {tool.name} does not fit your needs, here are the top alternatives sorted by learning curve
        from easiest to most advanced.
      </p>

      <div className="space-y-4">
        {alternatives.map((alt, i) => (
          <div
            key={alt.id}
            className="card-solid p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
                {i + 1}
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">{alt.name}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{alt.short_description.slice(0, 100)}...</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span>{alt.rating} ★</span>
                  <span>{alt.learning_curve}</span>
                  <span>{alt.starting_price}</span>
                  <span>Next.js: {alt.nextjs_integration_score}/10</span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/compare/${slug}-vs-${alt.id}`}
                className="btn-primary !py-2 !px-4 text-xs"
              >
                Compare
              </Link>
              <a
                href={alt.affiliate_url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-secondary !py-2 !px-4 text-xs"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href={`/tools/${slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          &larr; Back to {tool.name} review
        </Link>
      </div>
    </>
  );
}
