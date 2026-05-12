import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAudiences, getAudience, getTool, getProblems } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProsCons from "@/components/ProsCons";
import ComparisonTable from "@/components/ComparisonTable";
import AffiliateCta from "@/components/AffiliateCta";
import FaqSection from "@/components/FaqSection";
import SchemaMarkup from "@/components/SchemaMarkup";
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
    { q: `How much does ${tool.name} cost for ${audience.name.toLowerCase()}?`, a: `Plans start at $${tool.pricing.starter}/${tool.pricing.cycle} for the Starter plan and $${tool.pricing.unlimited}/${tool.pricing.cycle} for the Unlimited plan.` },
    { q: `Can ${audience.name.toLowerCase()} use the ${tool.pricing.starter} plan?`, a: `Yes. The Starter plan at $${tool.pricing.starter}/month works well for solo operators. Agencies managing multiple clients need the Unlimited plan at $${tool.pricing.unlimited}/month.` },
    { q: `Is there a free trial for ${tool.name}?`, a: `Yes. ${tool.name} offers a 14-day free trial (30 days with affiliate link). No credit card required.` },
  ];

  const comparisonItems = [
    { feature: "CRM & Pipelines", ghl: "Included", alternative: "$50-450/mo" },
    { feature: "Email Marketing", ghl: "Included", alternative: "$79-299/mo" },
    { feature: "SMS Marketing", ghl: "Included", alternative: "$25-100/mo" },
    { feature: "Funnel Builder", ghl: "Included", alternative: "$127-297/mo" },
    { feature: "Booking System", ghl: "Included", alternative: "$10-96/mo" },
    { feature: "Reputation Mgmt", ghl: "Included", alternative: "$29-99/mo" },
    { feature: "Total Cost", ghl: `$${tool.pricing.unlimited}/mo`, alternative: "$500-1,500/mo" },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([
        { name: "Home", url: tool.website },
        { name: audience.title, url: `/for/${audience.slug}` },
      ])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Home", url: "/" },
        { name: audience.title, url: `/for/${audience.slug}` },
      ]} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight">{audience.title}</h1>

      <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 mb-8">
        <p className="text-sm italic text-gray-700">{audience.realReview}</p>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">The Problem</h2>
        <p className="leading-relaxed text-gray-700">{audience.problem}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">How {tool.name} Solves It</h2>
        <p className="leading-relaxed text-gray-700">{audience.solution}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Key Features for {audience.name}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {tool.features.slice(0, 6).map((f) => (
            <div key={f.slug} className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-blue-700">{f.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.shortDesc}</p>
            </div>
          ))}
        </div>
      </section>

      <ComparisonTable items={comparisonItems} title="Cost Comparison" />

      <AffiliateCta />

      <FaqSection items={faqs} />
    </>
  );
}
