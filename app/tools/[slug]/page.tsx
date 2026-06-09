import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getTools, getToolByName } from "@/lib/data";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolByName(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Review: Next.js Authentication in 2026 — Features, Pricing & DX`,
    description: tool.short_description,
    alternates: { canonical: `https://saaspolarbeam.vercel.app/tools/${slug}` },
    openGraph: {
      title: `${tool.name} Review — Pricing, Developer Experience & Best Use Cases`,
      description: `${tool.name} for Next.js App Router: ${tool.learning_curve} learning curve, ${tool.starting_price} starting price, ${tool.setup_time_nextjs} setup. ${tool.best_for_short}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — Next.js Auth Review & Expert Analysis`,
      description: `${tool.name} reviewed for Next.js 2026: pricing, DX, setup. ${tool.best_for_short.slice(0, 120)}`,
      site: "@saaspolarbeam",
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolByName(slug);
  if (!tool) notFound();

  const others = getTools().filter((t) => t.id !== slug).slice(0, 3);

  return (
    <>
      <SchemaMarkup schema={productSchema(tool.name, tool.starting_price, tool.rating)} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: tool.name, url: `/tools/${tool.id}` }])} />

      <div className="mb-4 flex items-center gap-2">
        <span className="pill pill-blue">{tool.learning_curve}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">Updated 2026</span>
      </div>

      <section className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
              {tool.name}
            </h1>
            <p className="max-w-2xl text-lg text-slate-500 dark:text-slate-400">{tool.short_description}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center dark:border-amber-800 dark:bg-amber-950/30">
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{tool.rating}</div>
              <div className="text-xs text-amber-600 dark:text-amber-400">Rating ★</div>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-center dark:border-blue-800 dark:bg-blue-950/30">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{tool.nextjs_integration_score}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Next.js /10</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-8 flex flex-wrap gap-3">
        <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
          Try {tool.name} Free &rarr;
        </a>
        <Link href={`/tools/${tool.id}/alternatives`} className="btn-secondary">
          See Alternatives
        </Link>
      </div>

      <section className="mb-10">
        <h2 className="section-title text-xl">Developer Experience in Next.js</h2>
        <div className="card-glass p-6">
          <p className="leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">{tool.dx_details}</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="card-solid p-4 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Starting Price</div>
            <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-200">{tool.starting_price}</div>
          </div>
          <div className="card-solid p-4 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Free Tier</div>
            <div className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">{tool.free_tier}</div>
          </div>
          <div className="card-solid p-4 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Learning Curve</div>
            <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-200">{tool.learning_curve}</div>
          </div>
          <div className="card-solid p-4 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Setup Time</div>
            <div className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-200">{tool.setup_time_nextjs}</div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Who Should Use {tool.name}?</h2>
        <div className="card-glass p-6">
          <p className="leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">{tool.best_for_detailed}</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Pros &amp; Cons</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-5 dark:border-green-800 dark:bg-green-950/30">
            <h3 className="mb-3 font-semibold text-green-800 dark:text-green-300">Pros</h3>
            <ul className="space-y-2">
              {tool.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-900 dark:text-green-200">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-5 dark:border-red-800 dark:bg-red-950/30">
            <h3 className="mb-3 font-semibold text-red-800 dark:text-red-300">Cons</h3>
            <ul className="space-y-2">
              {tool.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-900 dark:text-red-200">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 dark:border-amber-800 dark:from-amber-950/30 dark:to-slate-900">
        <h2 className="section-title text-xl">Pricing Pitfall</h2>
        <p className="mb-4 leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">{tool.pricing_pitfall}</p>
        <div className="flex flex-wrap gap-3">
          <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
            Try {tool.name} Free &rarr;
          </a>
          <Link href={`/tools/${tool.id}/alternatives`} className="btn-secondary">
            Explore Cheaper Alternatives
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Related Comparisons</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.id}
              href={`/compare/${tool.id}-vs-${other.id}`}
              className="card-solid p-4 group"
            >
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 dark:text-slate-200 dark:group-hover:text-blue-400 transition-colors">
                {tool.name} vs {other.name}
              </h3>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{other.rating} ★ &middot; {other.learning_curve}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
