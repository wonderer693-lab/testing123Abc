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
    { q: `Is the $${tool.pricing.starter} Starter plan enough?`, a: `For most businesses, yes. Agencies managing multiple clients need the $${tool.pricing.unlimited}/month Unlimited plan.` },
    { q: `How fast will I see results?`, a: `Most users report noticeable improvements within the first week. Full automation workflows can be deployed in 1-2 days.` },
    { q: `Do I need technical skills?`, a: `No. ${tool.name} is designed for non-technical users. Templates and snapshots make setup straightforward.` },
  ];

  return (
    <>
      <SchemaMarkup schema={productSchema()} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: problem.title, url: `/solves/${problem.slug}` }])} />
      <SchemaMarkup schema={faqSchema(faqs)} />

      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: problem.title, url: `/solves/${problem.slug}` }]} />

      <div className="mb-4 flex items-center gap-2">
        <span className="pill pill-green">Problem Solver</span>
      </div>
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{problem.title}</h1>

      <section className="mb-10" id="overview">
        <div className="card-glass p-6">
          <p className="leading-relaxed text-slate-600">{problem.explanation}</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Who This Helps Most</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <a
              key={a.slug}
              href={`/for/${a.slug}`}
              className="card-solid p-4 block"
            >
              <h3 className="font-semibold text-slate-800">{a.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{a.problem.slice(0, 100)}...</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-10" id="benefits">
        <h2 className="section-title text-xl">Why {tool.name} Works</h2>
        <ProsCons
          pros={[
            "All-in-one replaces 5-10 separate tools",
            "Automated follow-ups never miss a lead",
            "AI voice agents work 24/7",
            "White-label capabilities for agencies",
            "Snapshots for rapid client deployment",
          ]}
          cons={[
            "Learning curve for advanced features",
            "Higher upfront cost than single-purpose tools",
            "Some advanced integrations need API work",
          ]}
        />
      </section>

      <section id="pricing">
        <AffiliateCta text={`Start Solving ${problem.name} with ${tool.name} →`} />
      </section>
      <section id="faq">
        <FaqSection items={faqs} />
      </section>
    </>
  );
}
