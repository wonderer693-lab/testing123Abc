import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getTools, getToolByName } from "@/lib/data";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import FaqSection from "@/components/FaqSection";
import Breadcrumb from "@/components/Breadcrumb";
import { loadToolPageContent } from "@/lib/content-loader";

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.id }));
}

const siteUrl = "https://saaspolarbeam.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolByName(slug);
  if (!tool) return {};

  const content = loadToolPageContent(slug);

  if (content) {
    return {
      title: content.seo.meta_title,
      description: content.seo.meta_description,
      alternates: { canonical: `${siteUrl}/tools/${slug}` },
      openGraph: {
        title: content.seo.og_title,
        description: content.seo.og_description,
      },
      twitter: {
        card: "summary_large_image",
        title: content.seo.og_title,
        description: content.seo.og_description.slice(0, 120),
        site: "@saaspolarbeam",
      },
    };
  }

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

  const content = loadToolPageContent(slug);
  const others = getTools().filter((t) => t.id !== slug).slice(0, 3);

  const sections = [
    { id: "developer-experience", label: "Developer Experience" },
    { id: "quick-stats", label: "Quick Stats" },
    { id: "who-should-use", label: "Who Should Use" },
    { id: "pros-cons", label: "Pros & Cons" },
    { id: "pricing-pitfall", label: "Pricing Pitfall" },
    { id: "related-comparisons", label: "Related Comparisons" },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema(tool.name, tool.starting_price, tool.rating)} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: tool.name, url: `/tools/${tool.id}` }])} />

      <Breadcrumb className="mb-6" items={[
        { name: "Home", url: "/" },
        { name: tool.name, url: `/tools/${tool.id}` },
      ]} />

      <div className="flex items-center gap-2 mb-4">
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

      <div className="mb-10 flex flex-wrap gap-3">
        <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
          Try {tool.name} Free &rarr;
        </a>
        <Link href={`/tools/${tool.id}/alternatives`} className="btn-secondary">
          See Alternatives
        </Link>
      </div>

      <div className="mb-10 overflow-x-auto">
        <nav className="flex gap-2 min-w-max" aria-label="Page sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700">
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <section id="developer-experience" className="mb-10 scroll-mt-20">
        <h2 className="section-title text-xl">Developer Experience in Next.js</h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <p className="leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">{tool.dx_details}</p>
        </div>
      </section>

      <section id="quick-stats" className="mb-10 scroll-mt-20">
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

      <section id="who-should-use" className="mb-10 scroll-mt-20">
        <h2 className="section-title text-xl">Who Should Use {tool.name}?</h2>
        <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 p-6 shadow-sm">
          <p className="leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">{tool.best_for_detailed}</p>
        </div>
      </section>

      <section id="pros-cons" className="mb-10 scroll-mt-20">
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

      <section id="pricing-pitfall" className="mb-10 scroll-mt-20">
        <h2 className="section-title text-xl">Pricing Pitfall</h2>
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/80 p-6 dark:border-amber-800 dark:bg-amber-950/20 shadow-sm">
          <p className="mb-4 leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">{tool.pricing_pitfall}</p>
          <div className="flex flex-wrap gap-3">
            <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
              Try {tool.name} Free &rarr;
            </a>
            <Link href={`/tools/${tool.id}/alternatives`} className="btn-secondary">
              Explore Cheaper Alternatives
            </Link>
          </div>
        </div>
      </section>

      {content && content.faq.length > 0 && (
        <>
          <SchemaMarkup schema={faqSchema(content.faq.map((f) => ({ q: f.question, a: f.answer })))} />
          <section className="mb-10">
            <h2 className="section-title text-xl">Frequently Asked Questions</h2>
            <FaqSection items={content.faq.map((f) => ({ q: f.question, a: f.answer }))} />
          </section>
        </>
      )}

      <section id="related-comparisons" className="mb-10 scroll-mt-20">
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

      <div className="sticky bottom-4 z-40 rounded-xl border border-blue-200 bg-white/90 p-4 shadow-lg backdrop-blur-xl dark:border-blue-800 dark:bg-slate-900/90 hidden sm:block">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            <span className="text-blue-700 dark:text-blue-400">{tool.name}</span> — {tool.learning_curve} learning curve, {tool.setup_time_nextjs} setup
          </p>
          <div className="flex gap-3">
            <a href={tool.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary !py-2 !px-5 text-sm">
              Try Free &rarr;
            </a>
            <Link href={`/tools/${tool.id}/alternatives`} className="btn-secondary !py-2 !px-5 text-sm">
              Alternatives
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
