import Link from "next/link";
import { getTools } from "@/lib/data";

export default function HomePage() {
  const tools = getTools();
  const total = tools.length;

  return (
    <div className="animate-fade-in">
      <section className="mb-10 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold text-gray-600">
          Next.js Developer Infrastructure
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Compare the Best Next.js Authentication Tools
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-500">
          In-depth comparisons, pricing breakdowns, and developer experience analysis
          for the top Next.js auth solutions in 2026.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2" id="tool-badges">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={`#tool-${tool.id}`}
              className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-800 transition-all hover:ring-2 hover:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>

      <div id="comparisons-grid">
        {tools.map((tool, index) => {
          const first = tools[(index + 1) % total];
          const second = tools[(index + 2) % total];

          return (
            <section key={tool.id} id={`tool-${tool.id}`} className="mb-14 scroll-mt-20">
              <div className="mb-4 flex items-center gap-3">
                <span className="pill pill-blue text-sm font-semibold">{tool.name}</span>
                <span className="text-sm text-slate-400">
                  {tool.rating} ★ &middot; Next.js: {tool.nextjs_integration_score}/10
                </span>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-slate-500">
                {tool.short_description}
              </p>

              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <Link
                  href={`/compare/${tool.id}-vs-${first.id}`}
                  className="card-solid p-5 group"
                >
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {tool.name} vs {first.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
                    <span>{first.rating} ★</span>
                    <span>{first.learning_curve}</span>
                    <span>{first.starting_price}</span>
                  </div>
                </Link>
                <Link
                  href={`/compare/${tool.id}-vs-${second.id}`}
                  className="card-solid p-5 group"
                >
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {tool.name} vs {second.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
                    <span>{second.rating} ★</span>
                    <span>{second.learning_curve}</span>
                    <span>{second.starting_price}</span>
                  </div>
                </Link>
              </div>

              <Link
                href={`/tools/${tool.id}`}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all comparisons for {tool.name} &rarr;
              </Link>
            </section>
          );
        })}
      </div>
    </div>
  );
}
