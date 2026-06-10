import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getTools, getToolByName } from "@/lib/data";
import { breadcrumbSchema, faqSchema, productSchema, articleSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import FaqSection from "@/components/FaqSection";
import Breadcrumb from "@/components/Breadcrumb";
import { loadCompareContent } from "@/lib/content-loader";

export function generateStaticParams() {
  const tools = getTools();
  const params = [];
  for (const a of tools) {
    for (const b of tools) {
      if (a.id !== b.id) {
        params.push({ slug: `${a.id}-vs-${b.id}` });
      }
    }
  }
  return params;
}

const siteUrl = "https://saaspolarbeam.vercel.app";

function canonicalSlug(slug: string): string {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return slug;
  const [a, b] = parts;
  return a < b ? `${a}-vs-${b}` : `${b}-vs-${a}`;
}

const PRIORITY_PAIRS = new Set([
  "auth0-vs-clerk",
  "auth0-vs-kinde",
  "auth0-vs-workos",
  "authjs-vs-better-auth",
  "authjs-vs-clerk",
  "better-auth-vs-clerk",
  "clerk-vs-firebase-auth",
  "clerk-vs-kinde",
  "clerk-vs-supabase-auth",
  "firebase-auth-vs-supabase-auth",
]);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return {};
  const [toolA, toolB] = parts;
  const a = getToolByName(toolA);
  const b = getToolByName(toolB);
  if (!a || !b) return {};

  const canonSlug = canonicalSlug(slug);
  const content = loadCompareContent(slug);
  const isPriority = PRIORITY_PAIRS.has(canonSlug);

  const fallbackTitle = `${a.name} vs ${b.name} for Next.js App Router (2026 Comparison)`;
  const fallbackDesc = `Compare ${a.name} vs ${b.name} for Next.js authentication. ${a.nextjs_integration_score}/10 vs ${b.nextjs_integration_score}/10 DX scores, pricing (${a.starting_price} vs ${b.starting_price}), setup time, and honest recommendations.`;
  const fallbackOgTitle = `${a.name} vs ${b.name} — Next.js Auth Comparison`;

  const base: Metadata = {
    robots: isPriority ? { index: true, follow: true } : { index: false, follow: true },
    alternates: { canonical: `${siteUrl}/compare/${canonSlug}` },
  };

  if (content) {
    return {
      ...base,
      title: content.seo.meta_title,
      description: content.seo.meta_description,
      openGraph: {
        title: content.seo.og_title,
        description: content.seo.og_description,
        type: "article",
        locale: "en_US",
        siteName: "NextAuthCompare",
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
    ...base,
    title: fallbackTitle,
    description: fallbackDesc,
    openGraph: {
      title: fallbackOgTitle,
      description: fallbackDesc,
      type: "article",
      locale: "en_US",
      siteName: "NextAuthCompare",
    },
    twitter: {
      card: "summary_large_image",
      title: fallbackOgTitle,
      description: fallbackDesc.slice(0, 120),
      site: "@saaspolarbeam",
      creator: "@saaspolarbeam",
    },
  };
}

function diffClass(winnerVal: number, loserVal: number, highIsGood = true): string {
  if (winnerVal === loserVal) return "text-slate-500 dark:text-slate-400";
  if (highIsGood ? winnerVal > loserVal : winnerVal < loserVal) return "text-green-600 dark:text-green-400";
  return "text-red-600 dark:text-red-400";
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) notFound();
  const [toolA, toolB] = parts;
  const a = getToolByName(toolA);
  const b = getToolByName(toolB);
  if (!a || !b) notFound();

  const content = loadCompareContent(slug);

  const winner = a.nextjs_integration_score >= b.nextjs_integration_score ? a : b;
  const loser = winner.id === a.id ? b : a;

  const faqs = content
    ? content.faq.map((f) => ({ q: f.question, a: f.answer }))
    : [
        {
          q: `Should I choose ${a.name} or ${b.name} for my Next.js app?`,
          a: `It depends on your priorities. ${a.name} scores ${a.nextjs_integration_score}/10 for Next.js integration with a ${a.learning_curve} learning curve. ${b.name} scores ${b.nextjs_integration_score}/10 with a ${b.learning_curve} learning curve. Choose ${winner.name} if you prioritize Next.js DX above all else.`,
        },
        {
          q: `Is ${a.name} cheaper than ${b.name}?`,
          a: `${a.name} starts at ${a.starting_price} with ${a.free_tier}. ${b.name} starts at ${b.starting_price} with ${b.free_tier}. Factor in usage limits to determine the best value for your scale.`,
        },
        {
          q: `Which has better developer experience: ${a.name} or ${b.name}?`,
          a: `${a.name} has a ${a.learning_curve} learning curve with a Next.js integration score of ${a.nextjs_integration_score}/10. ${b.name} has a ${b.learning_curve} learning curve scoring ${b.nextjs_integration_score}/10. For pure developer experience, ${winner.name} leads in our evaluation.`,
        },
        {
          q: `Can I use ${a.name} and ${b.name} together?`,
          a: `Most production setups use a single auth provider. Using both ${a.name} and ${b.name} would create conflicting session management. Choose one based on your requirements: ${winner.name} is our recommendation for most Next.js projects.`,
        },
      ];

  return (
    <>
      <SchemaMarkup schema={productSchema(a.name, a.starting_price, a.rating)} />
      <SchemaMarkup schema={productSchema(b.name, b.starting_price, b.rating)} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: `${a.name} vs ${b.name}`, url: `/compare/${slug}` }])} />
      <SchemaMarkup schema={articleSchema(`${a.name} vs ${b.name}: Head-to-Head Comparison for Next.js 2026`, `Compare ${a.name} and ${b.name} for Next.js App Router authentication. Detailed analysis of pricing, developer experience, features, and use cases.`, content?.last_updated || new Date().toISOString().split("T")[0])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumb className="mb-6" items={[
        { name: "Home", url: "/" },
        { name: `${a.name} vs ${b.name}`, url: `/compare/${slug}` },
      ]} />

      <div className="mb-4 flex items-center gap-2">
        <span className="pill pill-purple">Comparison</span>
        {content?.last_updated && (
          <span className="text-xs text-slate-400 dark:text-slate-500">Updated {content.last_updated}</span>
        )}
      </div>

      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        {a.name} vs {b.name}
      </h1>
      <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">Which authentication tool is right for your Next.js project?</p>

      {content?.human_intro && (
        <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-800 dark:bg-amber-950/20">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            My Honest Take
          </div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{content.human_intro}</p>
        </section>
      )}

      {content?.quick_summary && (
        <section className="mb-8 rounded-xl border border-blue-100 bg-blue-50/50 p-5 dark:border-blue-800 dark:bg-blue-950/20">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{content.quick_summary}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="font-semibold text-blue-700 dark:text-blue-400">Our verdict:</span>
            <span className="text-slate-600 dark:text-slate-400">{content.verdict_text}</span>
          </div>
        </section>
      )}

      <div className="mb-10 grid gap-5 sm:grid-cols-2">
        <div className="relative border-2 border-blue-600 shadow-lg bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 overflow-hidden dark:from-blue-950 dark:to-slate-900">
          <span className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-blue-500">
            Top Pick
          </span>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Our Pick</div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{winner.name}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Next.js Score: {winner.nextjs_integration_score}/10 &middot; Rating: {winner.rating} ★
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{winner.short_description.slice(0, 120)}...</p>
          <a href={winner.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary mt-4 !py-2 !px-4 text-sm inline-flex">
            Try {winner.name} Free &rarr;
          </a>
        </div>
        <div className="relative rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{loser.name}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Next.js Score: {loser.nextjs_integration_score}/10 &middot; Rating: {loser.rating} ★
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{loser.short_description.slice(0, 120)}...</p>
          <a href={loser.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-secondary mt-4 !py-2 !px-4 text-sm inline-flex">
            Visit {loser.name} &rarr;
          </a>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="section-title text-xl">Quick Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <th className="px-5 py-3 font-semibold text-slate-700 dark:text-slate-300">Metric</th>
                <th className="px-5 py-3 font-semibold text-blue-700 dark:text-blue-400">{a.name}</th>
                <th className="px-5 py-3 font-semibold text-slate-700 dark:text-slate-300">{b.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-400">Starting Price</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{a.starting_price}</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{b.starting_price}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-400">Free Tier</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{a.free_tier}</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{b.free_tier}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-400">Learning Curve</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{a.learning_curve}</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{b.learning_curve}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-400">Setup Time (Next.js)</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{a.setup_time_nextjs}</td>
                <td className="px-5 py-3 text-slate-800 dark:text-slate-200">{b.setup_time_nextjs}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-400">Easier Alternative</td>
                <td className="px-5 py-3">
                  <Link href={a.easier_alternative_url} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    See alternatives
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <Link href={b.easier_alternative_url} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    See alternatives
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-400">Next.js Integration</td>
                <td className={`px-5 py-3 ${diffClass(a.nextjs_integration_score, b.nextjs_integration_score)}`}>{a.nextjs_integration_score}/10</td>
                <td className={`px-5 py-3 ${diffClass(b.nextjs_integration_score, a.nextjs_integration_score)}`}>{b.nextjs_integration_score}/10</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-400">Rating</td>
                <td className={`px-5 py-3 ${diffClass(a.rating, b.rating)}`}>{a.rating} ★</td>
                <td className={`px-5 py-3 ${diffClass(b.rating, a.rating)}`}>{b.rating} ★</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">{a.name} vs {b.name}: Pros &amp; Cons</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-blue-700 dark:text-blue-400">{a.name} Pros</h3>
            <ul className="space-y-2">
              {a.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {p}
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-4 font-semibold text-red-600 dark:text-red-400">{a.name} Cons</h3>
            <ul className="space-y-2">
              {a.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-blue-700 dark:text-blue-400">{b.name} Pros</h3>
            <ul className="space-y-2">
              {b.pros.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {p}
                </li>
              ))}
            </ul>
            <h3 className="mb-3 mt-4 font-semibold text-red-600 dark:text-red-400">{b.name} Cons</h3>
            <ul className="space-y-2">
              {b.cons.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Best For</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">Choose {a.name} if you need:</h3>
            <ul className="mt-3 space-y-2">
              {a.pros.slice(0, 3).map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Choose {b.name} if you need:</h3>
            <ul className="mt-3 space-y-2">
              {b.pros.slice(0, 3).map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />

      <div className="sticky bottom-4 z-40 rounded-xl border border-blue-200 bg-white/90 p-4 shadow-lg backdrop-blur-xl dark:border-blue-800 dark:bg-slate-900/90 hidden sm:block">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Ship faster with <span className="text-blue-700 dark:text-blue-400">{winner.name}</span>
          </p>
          <div className="flex gap-3">
            <a href={winner.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary !py-2 !px-5 text-sm">
              Try {winner.name} Free &rarr;
            </a>
            <Link href={`/tools/${winner.id}/alternatives`} className="btn-secondary !py-2 !px-5 text-sm">
              See Alternatives
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
