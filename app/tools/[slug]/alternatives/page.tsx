import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getTools, getToolByName, getAlternatives } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumb from "@/components/Breadcrumb";
import { loadAlternativesContent } from "@/lib/content-loader";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.id }));
}

const siteUrl = "https://saaspolarbeam.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolByName(slug);
  if (!tool) return {};

  const content = loadAlternativesContent(slug);

  const fallbackTitle = `Best 5 ${tool.name} Alternatives for Next.js Developers (2026)`;
  const fallbackDesc = `Compare the top 5 alternatives to ${tool.name} for Next.js authentication. Find the best fit for your project based on pricing, DX, and learning curve.`;

  if (content) {
    return {
      title: content.seo.meta_title,
      description: content.seo.meta_description,
      alternates: { canonical: `${siteUrl}/tools/${slug}/alternatives` },
      openGraph: {
        title: content.seo.og_title,
        description: content.seo.og_description,
        locale: "en_US",
        siteName: "NextAuthCompare",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: content.seo.og_title,
        description: content.seo.og_description.slice(0, 120),
        site: "@saaspolarbeam",
        creator: "@saaspolarbeam",
      },
    };
  }

  return {
    title: fallbackTitle,
    description: fallbackDesc,
    alternates: { canonical: `${siteUrl}/tools/${slug}/alternatives` },
    openGraph: {
      title: `Best 5 ${tool.name} Alternatives`,
      description: `Top alternatives to ${tool.name} for Next.js developers.`,
      locale: "en_US",
      siteName: "NextAuthCompare",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Best 5 ${tool.name} Alternatives`,
      description: fallbackDesc.slice(0, 120),
      site: "@saaspolarbeam",
      creator: "@saaspolarbeam",
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

      <Breadcrumb className="mb-6" items={[
        { name: "Home", url: "/" },
        { name: tool.name, url: `/tools/${tool.id}` },
        { name: "Alternatives", url: `/tools/${tool.id}/alternatives` },
      ]} />

      <div className="mb-4 flex items-center gap-2">
        <span className="pill pill-amber">Alternatives</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">Top 5 picks</span>
      </div>

      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Best 5 {tool.name} Alternatives for Next.js Developers (2026)
      </h1>
      <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
        If {tool.name} does not fit your needs, here are the top alternatives sorted by learning curve
        from easiest to most advanced.
      </p>

      <div className="space-y-4">
        {alternatives.map((alt, i) => (
          <div
            key={alt.id}
            className="card-solid p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 font-bold text-white shadow-sm">
                {i + 1}
              </div>
              <div>
                <h2 className="font-semibold text-slate-800 dark:text-slate-200">{alt.name}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{alt.short_description.slice(0, 120)}...</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {alt.rating}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">{alt.learning_curve}</span>
                  <span className="text-slate-400 dark:text-slate-500">{alt.starting_price}</span>
                  <span className="text-slate-400 dark:text-slate-500">Next.js: {alt.nextjs_integration_score}/10</span>
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

      <div className="mt-8 flex justify-center gap-4">
        <Link href={`/tools/${slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Back to {tool.name} review
        </Link>
      </div>
    </>
  );
}
