import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProblems, getProblem, getTool, getAudiences } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProsCons from "@/components/ProsCons";
import AffiliateCta from "@/components/AffiliateCta";
import FaqSection from "@/components/FaqSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getProblems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) return {};
  return {
    title: problem.title,
    description: problem.metaDesc,
    openGraph: { title: problem.title, description: problem.metaDesc },
  };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) notFound();

  const tool = getTool();
  const audiences = getAudiences();

  const faqs = [
    { q: `How does ${tool.name} help with ${problem.name.toLowerCase()}?`, a: problem.explanation },
    { q: `Is the Starter plan enough to solve this?`, a: `For most businesses, the $${tool.pricing.starter}/month Starter plan provides enough features to address this. Agencies need the $${tool.pricing.unlimited}/month Unlimited plan.` },
    { q: `How fast will I see results?`, a: `Most users report noticeable improvements within the first week of setup. Full automation workflows can be deployed in 1-2 days.` },
    { q: `Do I need technical skills?`, a: `No. ${tool.name} is designed for non-technical users. Templates and snapshots make setup straightforward.` },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: problem.title, url: `/solves/${problem.slug}` },
      ])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[
        { name: "Home", url: "/" },
        { name: problem.title, url: `/solves/${problem.slug}` },
      ]} />

      <h1 className="mb-4 text-3xl font-bold tracking-tight">{problem.title}</h1>

      <section className="mb-8">
        <p className="leading-relaxed text-gray-700">{problem.explanation}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Who This Helps Most</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {audiences.map((a) => (
            <a
              key={a.slug}
              href={`/for/${a.slug}`}
              className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300"
            >
              <h3 className="font-medium text-blue-700">{a.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{a.problem.slice(0, 100)}...</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">Why {tool.name} Works</h2>
        <ProsCons
          pros={[
            "All-in-one platform replaces 5-10 tools",
            "Automated follow-ups never miss a lead",
            "AI voice agents work 24/7",
            "White-label capabilities for agencies",
            "Snapshots for rapid deployment",
          ]}
          cons={[
            "Learning curve for advanced features",
            "Higher upfront cost than single-purpose tools",
            "Some advanced integrations need API work",
          ]}
        />
      </section>

      <AffiliateCta text={`Start Solving ${problem.name} with ${tool.name} →`} />

      <FaqSection items={faqs} />
    </>
  );
}
