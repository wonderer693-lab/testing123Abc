import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFeatures, getFeature, getTool, getCompetitors } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProsCons from "@/components/ProsCons";
import AffiliateCta from "@/components/AffiliateCta";
import FaqSection from "@/components/FaqSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import Sidebar from "@/components/Sidebar";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getFeatures().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return {
    title: `${feature.name} - ${getTool().name} Feature Deep Dive`,
    description: feature.details.slice(0, 160),
    openGraph: { title: `${feature.name} - ${getTool().name}`, description: feature.details.slice(0, 160) },
  };
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const tool = getTool();
  const features = getFeatures();

  const faqs = [
    { q: `What is ${tool.name}'s ${feature.name} feature?`, a: feature.details },
    { q: `Does ${tool.shortName} ${feature.name} cost extra?`, a: `No. ${feature.name} is included in all ${tool.name} plans starting at $${tool.pricing.starter}/month.` },
    { q: `How does ${tool.shortName} ${feature.name} compare to dedicated tools?`, a: `While dedicated tools may offer more specialized features, ${tool.shortName}'s ${feature.name} covers 90% of use cases at a fraction of the cost — and it's fully integrated with the rest of your ${tool.shortName} ecosystem.` },
    { q: `Can I try ${feature.name} before committing?`, a: `Yes. All plans include a 14-day free trial (30 days with affiliate link). No credit card required.` },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: `${feature.name} - ${tool.name}`, url: `/features/${feature.slug}` }])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: `${tool.name} Features`, url: "/" }, { name: feature.name, url: `/features/${feature.slug}` }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="pill pill-blue">Feature</span>
            <span className="text-xs text-slate-400">Included in all plans</span>
          </div>
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl" id="overview">
            {tool.name} {feature.name}
          </h1>

          <section className="mb-10">
            <div className="card-glass p-6">
              <p className="leading-relaxed text-slate-600">{feature.details}</p>
            </div>
          </section>

          <section className="mb-10" id="benefits">
            <h2 className="mb-4 text-xl font-bold text-slate-800">Key Benefits</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {feature.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-blue-100/50 bg-white/60 p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm text-slate-700">{b}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-slate-800">Alternative Tools</h2>
            <p className="mb-4 text-sm text-slate-500">Standalone alternatives to {tool.shortName}'s {feature.name} feature:</p>
            <div className="flex flex-wrap gap-2">
              {feature.alternativeTools.map((alt) => (
                <span key={alt} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">{alt}</span>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Cost comparison:</strong> These standalone tools cost <strong>$50-$450+/month combined</strong>. {tool.shortName} includes {feature.name} in your <strong>${tool.pricing.starter}/month</strong> plan.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-slate-800">Related Features</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.filter((f) => f.slug !== feature.slug).slice(0, 4).map((f) => (
                <a key={f.slug} href={`/features/${f.slug}`} className="card-solid p-4 block">
                  <h3 className="font-semibold text-slate-800">{f.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{f.shortDesc}</p>
                </a>
              ))}
            </div>
          </section>

          <section id="pricing">
            <AffiliateCta text={`Try ${tool.name} ${feature.name} Free →`} />
          </section>
          <section id="faq">
            <FaqSection items={faqs} />
          </section>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar type="feature" currentSlug={feature.slug} />
          </div>
        </div>
      </div>
    </>
  );
}
