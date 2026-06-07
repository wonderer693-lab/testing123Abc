import Link from "next/link";
import { getTools } from "@/lib/data";

export default function HomePage() {
  const tools = getTools();

  return (
    <div className="animate-fade-in">
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Compare the Best Next.js Authentication Tools
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
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
              className="pill"
              style={{
                background: "var(--color-blue-100)",
                color: "var(--color-blue-800)",
                fontSize: "0.8125rem",
                padding: "0.375rem 1rem",
              }}
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>

      {tools.map((tool) => {
        const others = tools
          .filter((t) => t.id !== tool.id)
          .slice(0, 2);

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
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/compare/${tool.id}-vs-${other.id}`}
                  className="card-solid p-5 group"
                >
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {tool.name} vs {other.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
                    <span>{other.rating} ★</span>
                    <span>{other.learning_curve}</span>
                    <span>{other.starting_price}</span>
                  </div>
                </Link>
              ))}
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
  );
}
