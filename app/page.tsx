import Link from "next/link";
import { getAudiences, getProblems, getTool } from "@/lib/data";

export default function HomePage() {
  const audiences = getAudiences();
  const problems = getProblems();
  const tool = getTool();

  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {tool.tagline}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Real reviews from real users. Honest breakdowns of how {tool.name} solves real business problems
          across different industries and use cases.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Guides by Industry</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <Link
              key={a.slug}
              href={`/for/${a.slug}`}
              className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              <h3 className="mb-2 font-semibold text-blue-700">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.problem.slice(0, 120)}...</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Problems GoHighLevel Solves</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((p) => (
            <Link
              key={p.slug}
              href={`/solves/${p.slug}`}
              className="rounded-xl border border-gray-200 p-5 transition-colors hover:border-green-300 hover:bg-green-50"
            >
              <h3 className="mb-2 font-semibold text-green-700">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.explanation.slice(0, 120)}...</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-gray-50 p-8 text-center">
        <h2 className="mb-3 text-2xl font-bold">Start Your Free Trial</h2>
        <p className="mb-4 text-gray-600">
          Join 1M+ businesses using {tool.name} to automate and grow.
        </p>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Get Started Free →
        </a>
      </section>
    </div>
  );
}
