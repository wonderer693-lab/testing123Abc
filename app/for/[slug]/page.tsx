import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAudiences, getAudience, getTool } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProsCons from "@/components/ProsCons";
import ComparisonTable from "@/components/ComparisonTable";
import AffiliateCta from "@/components/AffiliateCta";
import FaqSection from "@/components/FaqSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import Sidebar from "@/components/Sidebar";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAudiences().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return {};
  return {
    title: audience.title,
    description: audience.metaDesc,
    openGraph: { title: audience.title, description: audience.metaDesc },
  };
}

export default async function AudiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();

  const tool = getTool();

  const faqs = [
    { q: `Is ${tool.name} good for ${audience.name.toLowerCase()}?`, a: `Yes. ${audience.solution}` },
    { q: `How much does ${tool.name} cost for ${audience.name.toLowerCase()}?`, a: `Plans start at $${tool.pricing.starter}/${tool.pricing.cycle} for Starter and $${tool.pricing.unlimited}/${tool.pricing.cycle} for Unlimited.` },
    { q: `Can ${audience.name.toLowerCase()} use the $${tool.pricing.starter} plan?`, a: `Yes. The Starter plan at $${tool.pricing.starter}/month works for solo operators. Agencies managing multiple clients need Unlimited at $${tool.pricing.unlimited}/month.` },
    { q: `Is there a free trial?`, a: `Yes. 14-day free trial (30 days with affiliate link). No credit card required.` },
  ];

  const comparisonItems = [
    { feature: "CRM & Pipelines", ghl: "Included", alternative: "$50-450/mo" },
    { feature: "Email Marketing", ghl: "Included", alternative: "$79-299/mo" },
    { feature: "SMS Marketing", ghl: "Included", alternative: "$25-100/mo" },
    { feature: "Funnel Builder", ghl: "Included", alternative: "$127-297/mo" },
    { feature: "Booking System", ghl: "Included", alternative: "$10-96/mo" },
    { feature: "Reputation Mgmt", ghl: "Included", alternative: "$29-99/mo" },
    { feature: "Total", ghl: `$${tool.pricing.unlimited}/mo`, alternative: "$500-1,500/mo" },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: audience.title, url: `/for/${audience.slug}` }])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: audience.title, url: `/for/${audience.slug}` }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="pill pill-blue">Industry Guide</span>
          </div>
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl" id="overview">{audience.title}</h1>

          <div className="review-block mb-8">
            <p className="pl-5 text-sm italic leading-relaxed text-slate-700">&ldquo;{audience.realReview}&rdquo;</p>
          </div>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-slate-800">The Problem</h2>
            <p className="leading-relaxed text-slate-600">{audience.problem}</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-slate-800" id="benefits">How {tool.name} Solves It</h2>
            <p className="leading-relaxed text-slate-600">{audience.solution}</p>
          </section>

          <section className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-slate-800">Key Features for {audience.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {tool.features.filter(f => audience.keyFeatures?.includes(f.slug)).map((f) => (
                <div key={f.slug} className="card p-4">
                  <h3 className="font-semibold text-slate-800">{f.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{f.shortDesc}</p>
                </div>
              ))}
            </div>
          </section>

          <ComparisonTable items={comparisonItems} title={`${tool.name} vs. Alternative Tools`} />
          <section id="pricing">
            <AffiliateCta />
          </section>
          <section id="faq">
            <FaqSection items={faqs} />
          </section>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar type="audience" />
          </div>
        </div>
      </div>
    </>
  );
}
