import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGlossaryTerms, getGlossaryTerm, getTool, getFeatures } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import AffiliateCta from "@/components/AffiliateCta";
import SchemaMarkup from "@/components/SchemaMarkup";
import { breadcrumbSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getGlossaryTerms().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return {};
  return {
    title: `What is ${term.term}? — ${getTool().name} Glossary`,
    description: term.definition.slice(0, 160),
    openGraph: { title: `What is ${term.term}?`, description: term.definition.slice(0, 160) },
  };
}

export default async function GlossaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();

  const tool = getTool();
  const features = getFeatures();

  const relatedFeature = features.find((f) => f.slug === slug);

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Glossary", url: "/" }, { name: term.term, url: `/glossary/${term.slug}` }])} />

      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Glossary", url: "/" }, { name: term.term, url: `/glossary/${term.slug}` }]} />

      <div className="mb-4 flex items-center gap-2">
        <span className="pill pill-amber">Glossary</span>
      </div>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">What is {term.term}?</h1>

      <div className="my-8 rounded-xl border border-slate-200 bg-white/80 p-6">
        <p className="text-lg leading-relaxed text-slate-700">{term.definition}</p>
      </div>

      {relatedFeature && (
        <div className="my-8 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
          <h2 className="mb-2 font-semibold text-blue-800">{term.term} in {tool.name}</h2>
          <p className="mb-3 text-sm text-blue-700/80">{relatedFeature.details}</p>
          <a href={`/features/${relatedFeature.slug}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            Learn about {tool.shortName} {relatedFeature.name} →
          </a>
        </div>
      )}

      {term.seeAlso.length > 0 && (
        <div className="my-8">
          <h2 className="mb-3 text-lg font-bold text-slate-800">See Also</h2>
          <div className="flex flex-wrap gap-2">
            {term.seeAlso.map((s) => (
              <a key={s} href={`/glossary/${s}`} className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-700 transition-colors hover:bg-blue-50">
                {s.replace(/-/g, " ")}
              </a>
            ))}
          </div>
        </div>
      )}

      <AffiliateCta text={`Try ${tool.name} Free →`} />
    </>
  );
}
