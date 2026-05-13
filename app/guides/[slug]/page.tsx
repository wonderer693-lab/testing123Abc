import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuides, getGuide, getTool, getFeatures } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateCta from "@/components/AffiliateCta";
import FaqSection from "@/components/FaqSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import StepGuide from "@/components/StepGuide";
import Sidebar from "@/components/Sidebar";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.metaDesc,
    openGraph: { title: guide.title, description: guide.metaDesc },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const tool = getTool();
  const features = getFeatures();

  const relatedFeatures = features.filter((f) => guide.relatedFeatures.includes(f.slug));

  const faqs = [
    { q: `How long does it take to ${guide.name.toLowerCase()} in ${tool.shortName}?`, a: `This guide takes approximately ${guide.estimatedTime}. Most users complete it in one sitting.` },
    { q: `Do I need technical skills?`, a: `No. This guide is rated as ${guide.difficulty} level. ${tool.name} is designed for non-technical users.` },
    { q: `Is this feature available on the $${tool.pricing.starter} plan?`, a: `Yes. All features covered in this guide are included in the Starter plan at $${tool.pricing.starter}/month.` },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: guide.title, url: `/guides/${guide.slug}` }])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Guides", url: "/" }, { name: guide.title, url: `/guides/${guide.slug}` }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2">
            <span className="pill pill-green">Guide</span>
          </div>
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl" id="overview">{guide.title}</h1>

          <div className="card-glass mb-8 p-6">
            <p className="leading-relaxed text-slate-600">{guide.intro}</p>
          </div>

          <StepGuide steps={guide.steps} estimatedTime={guide.estimatedTime} difficulty={guide.difficulty} />

          {relatedFeatures.length > 0 && (
            <section className="my-10">
              <h2 className="mb-4 text-xl font-bold text-slate-800">Related Features</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedFeatures.map((f) => (
                  <a key={f.slug} href={`/features/${f.slug}`} className="card-solid p-4 block">
                    <h3 className="font-semibold text-slate-800">{f.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{f.shortDesc}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section id="pricing">
            <AffiliateCta text={`Try ${tool.name} — Follow This Guide →`} />
          </section>
          <section id="faq">
            <FaqSection items={faqs} />
          </section>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar type="guide" />
          </div>
        </div>
      </div>
    </>
  );
}
