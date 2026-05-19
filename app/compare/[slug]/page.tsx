import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompetitors, getCompetitor, getTool, getFeatures, getAffiliateLinkBootcamp } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProsCons from "@/components/ProsCons";
import ComparisonTable from "@/components/ComparisonTable";
import AffiliateCta from "@/components/AffiliateCta";
import FaqSection from "@/components/FaqSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import PricingChart from "@/components/PricingChart";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getCompetitors().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};
  const tool = getTool();
  return {
    title: `${tool.shortName} vs ${competitor.name} (2026) — Which Is Better?`,
    description: `Compare ${tool.name} vs ${competitor.name}. Features, pricing, pros & cons. Find out which platform is right for your business.`,
    openGraph: { title: `${tool.shortName} vs ${competitor.name}`, description: `Compare ${tool.name} vs ${competitor.name} side by side.` },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const tool = getTool();
  const features = getFeatures();
  const bootcampLink = getAffiliateLinkBootcamp();

  const comparisonItems = features.map((f) => ({
    feature: f.name,
    ghl: f.shortDesc,
    alternative: competitor.features.includes(f.slug) ? "Available" : "Not available",
  }));

  const faqs = [
    { q: `Should I choose ${tool.name} or ${competitor.name}?`, a: `It depends on your needs. ${tool.name} is best for all-in-one marketing and sales automation at a flat rate. ${competitor.name} is best for ${competitor.bestFor.join(", ")}.` },
    { q: `Is ${tool.name} cheaper than ${competitor.name}?`, a: `${tool.name} starts at $${tool.pricing.starter}/month (flat rate). ${competitor.name} starts at $${competitor.pricing.starter}/month. ${competitor.pricing.note ? `Note: ${competitor.pricing.note}.` : ""}` },
    { q: `Can ${tool.name} replace ${competitor.name}?`, a: `For most use cases, yes. ${tool.name} covers CRM, email, SMS, funnels, booking, and more. However, if you specifically need ${competitor.bestFor.join(", ")}, ${competitor.name} may be a better fit.` },
    { q: `Does ${tool.name} integrate with ${competitor.name}?`, a: `${tool.name} supports API-based integrations. You can connect most tools using native integrations, Zapier, or API.` },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: `${tool.shortName} vs ${competitor.name}`, url: `/compare/${competitor.slug}` }])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Comparisons", url: "/best" }, { name: `${tool.shortName} vs ${competitor.name}`, url: `/compare/${competitor.slug}` }]} />

      <div className="mb-4 flex items-center gap-2">
        <span className="pill pill-purple">Comparison</span>
        <span className="text-xs text-slate-400">Updated 2026</span>
      </div>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {tool.shortName} vs {competitor.name}
      </h1>
      <p className="mb-8 text-lg text-slate-500">Which platform is right for your business?</p>

      <div className="mb-10 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">Our Pick</div>
          <h2 className="text-xl font-bold text-slate-900">{tool.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{tool.tagline}</p>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">${tool.pricing.starter}</span>
            <span className="text-sm text-slate-500">/mo</span>
          </div>
          <a href={bootcampLink} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary mt-4 !py-2 !px-4 text-sm">
            Try {tool.shortName} Free →
          </a>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">{competitor.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{competitor.tagline}</p>
          <div className="mt-3">
            <span className="text-2xl font-bold text-slate-900">${competitor.pricing.starter}</span>
            <span className="text-sm text-slate-500">/mo</span>
          </div>
          <a href={competitor.website} target="_blank" rel="noopener noreferrer nofollow" className="btn-secondary mt-4 !py-2 !px-4 text-sm inline-flex">
            Visit {competitor.name} →
          </a>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="section-title text-xl">Quick Verdict</h2>
        <div className="card-glass p-6">
          <p className="leading-relaxed text-slate-600">{competitor.description}</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">{tool.shortName} vs {competitor.name}: Pros & Cons</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <ProsCons pros={tool.features.map((f) => f.name).slice(0, 5)} cons={["Learning curve for advanced features", "Fewer native integrations than some competitors", "No free tier (trial only)"]} />
          <ProsCons pros={competitor.pros} cons={competitor.cons} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Feature Comparison</h2>
        <ComparisonTable items={comparisonItems} title={`${tool.shortName} vs ${competitor.name}: Features`} />
      </section>

      <PricingChart />

      <section className="mb-10">
        <h2 className="section-title text-xl">Best For</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
            <h3 className="font-semibold text-blue-800">Choose {tool.shortName} if you need:</h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-sm text-blue-700">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                All-in-one platform (CRM + email + SMS + funnels + booking)
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-700">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Flat-rate pricing (not per-user)
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-700">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                White-label / agency mode
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-800">Choose {competitor.name} if you need:</h3>
            <ul className="mt-3 space-y-2">
              {competitor.bestFor.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="pricing">
        <AffiliateCta text={`Try ${tool.shortName} — Save vs ${competitor.name} →`} />
      </section>
      <section id="faq">
        <FaqSection items={faqs} />
      </section>
    </>
  );
}
