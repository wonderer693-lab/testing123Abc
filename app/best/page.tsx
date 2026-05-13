import Link from "next/link";
import type { Metadata } from "next";
import { getTool, getAudiences, getProblems, getGuides, getCompetitors, getFeatures } from "@/lib/data";
import TrustBar from "@/components/TrustBar";
import AffiliateCta from "@/components/AffiliateCta";
import SchemaMarkup from "@/components/SchemaMarkup";
import { breadcrumbSchema, productSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Best Picks & Resources",
  description: "Curated guides, comparisons, and resources to help you get the most out of your marketing stack.",
};

export default function BestPage() {
  const tool = getTool();
  const audiences = getAudiences();
  const problems = getProblems();
  const guides = getGuides();
  const competitors = getCompetitors();
  const features = getFeatures();

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Best Picks", url: "/best" }])} />

      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Best Picks & Resources</h1>
      <p className="mb-10 text-lg text-slate-500">Everything you need to choose and use {tool.name} effectively.</p>

      <div className="grid gap-8">
        <section>
          <h2 className="section-title">Industry Guides</h2>
          <p className="section-subtitle">Tailored advice for your specific industry.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {audiences.map((a) => (
              <Link key={a.slug} href={`/for/${a.slug}`} className="card-solid p-5">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">{a.name.charAt(0)}</div>
                <h3 className="font-semibold text-slate-800">{a.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{a.problem.slice(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Feature Deep Dives</h2>
          <p className="section-subtitle">Everything {tool.shortName} can do, explained in detail.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link key={f.slug} href={`/features/${f.slug}`} className="card p-4">
                <h3 className="font-semibold text-slate-800">{f.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{f.shortDesc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Comparisons</h2>
          <p className="section-subtitle">See how {tool.shortName} stacks up against the competition.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {competitors.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="card-solid p-5">
                <h3 className="font-semibold text-slate-800">{tool.shortName} vs {c.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Step-by-Step Guides</h2>
          <p className="section-subtitle">Practical tutorials to get things done in {tool.shortName}.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card-solid p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`pill ${g.difficulty === "Beginner" ? "pill-green" : g.difficulty === "Advanced" ? "pill-purple" : "pill-amber"}`}>
                    {g.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800">{g.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{g.intro.slice(0, 80)}...</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Problems Solved</h2>
          <p className="section-subtitle">Common business challenges and how {tool.shortName} addresses them.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <Link key={p.slug} href={`/solves/${p.slug}`} className="card p-4">
                <h3 className="font-semibold text-slate-800">{p.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.explanation.slice(0, 80)}...</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <AffiliateCta />
    </>
  );
}
