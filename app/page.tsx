import Link from "next/link";
import { getAudiences, getProblems, getTool, getFeatures, getGuides, getCompetitors, getAffiliateLink, getAffiliateLinkBootcamp, getAffiliateLinkUpgrade, getAffiliateLinkSaaSUpgrade } from "@/lib/data";
import TrustBar from "@/components/TrustBar";
import PricingChart from "@/components/PricingChart";
import FeatureMatrix from "@/components/FeatureMatrix";
import AffiliateCta from "@/components/AffiliateCta";

export default function HomePage() {
  const audiences = getAudiences();
  const problems = getProblems();
  const tool = getTool();
  const features = getFeatures();
  const guides = getGuides();
  const competitors = getCompetitors();
  const bootcampLink = getAffiliateLinkBootcamp();
  const upgradeLink = getAffiliateLinkUpgrade();
  const saasUpgradeLink = getAffiliateLinkSaaSUpgrade();

  return (
    <div className="animate-fade-in">
      <section className="mb-14 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700">
          {tool.rating} ★ · {tool.reviewCount.toLocaleString()}+ Reviews
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          {tool.tagline}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          {tool.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={bootcampLink} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary text-base">
            Start Free Trial →
          </a>
          <a href="#features" className="btn-secondary text-base">
            Explore Features
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          🔥 New? Try the <a href={bootcampLink} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2">HighLevel Bootcamp</a> — 30 days of guided training with live support, included free with your trial
        </p>
      </section>

      <TrustBar />

      <section className="mb-16" id="features">
        <h2 className="section-title">All Features, One Platform</h2>
        <p className="section-subtitle">{tool.shortName} replaces 10+ separate tools with a single, integrated platform.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.slug} href={`/features/${f.slug}`} className="card p-5 group">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600">
                  {f.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">{f.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">{f.shortDesc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {f.benefits.slice(0, 2).map((b) => (
                  <span key={b} className="feature-badge text-[11px]">{b}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="section-title">Guides by Industry</h2>
        <p className="section-subtitle">How different industries use {tool.name} to solve real problems.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {audiences.map((a) => (
            <Link
              key={a.slug}
              href={`/for/${a.slug}`}
              className="card-solid p-6"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold text-lg">
                {a.name.charAt(0)}
              </div>
              <h3 className="mb-2 font-semibold text-slate-800">{a.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{a.problem.slice(0, 120)}...</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="section-title">Problems Solved</h2>
        <p className="section-subtitle">Common business challenges that {tool.name} addresses.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <Link
              key={p.slug}
              href={`/solves/${p.slug}`}
              className="card p-5"
            >
              <h3 className="mb-2 font-semibold text-slate-800">{p.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{p.explanation.slice(0, 100)}...</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="section-title">{tool.shortName} vs Competitors</h2>
        <p className="section-subtitle">See how {tool.name} compares to popular alternatives.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {competitors.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="card-solid p-5"
            >
              <h3 className="mb-1 font-semibold text-slate-800">{tool.shortName} vs {c.name}</h3>
              <p className="text-sm text-slate-500">{c.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.bestFor.slice(0, 2).map((b) => (
                  <span key={b} className="feature-badge">{b}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PricingChart />

      <div className="mb-16 grid gap-4 sm:grid-cols-2">
        <div className="card-solid p-5 text-center">
          <p className="text-sm text-slate-500">Already on the Starter plan?</p>
          <a href={upgradeLink} target="_blank" rel="noopener noreferrer nofollow" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Upgrade to Unlimited and unlock the full platform →
          </a>
        </div>
        <div className="card-solid p-5 text-center">
          <p className="text-sm text-slate-500">Running an agency or SaaS?</p>
          <a href={saasUpgradeLink} target="_blank" rel="noopener noreferrer nofollow" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Move to SaaS Pro — white-label, sub-accounts, and client management →
          </a>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="section-title">Quick Start Guides</h2>
        <p className="section-subtitle">Step-by-step tutorials to get the most out of {tool.name}.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="card-solid p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`pill ${g.difficulty === "Beginner" ? "pill-green" : g.difficulty === "Advanced" ? "pill-purple" : "pill-amber"}`}>
                  {g.difficulty}
                </span>
                <span className="text-xs text-slate-400">{g.estimatedTime}</span>
              </div>
              <h3 className="font-semibold text-slate-800">{g.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{g.intro.slice(0, 100)}...</p>
            </Link>
          ))}
        </div>
      </section>

      <FeatureMatrix />

      <AffiliateCta />
    </div>
  );
}
