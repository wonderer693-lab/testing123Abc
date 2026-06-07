import Link from "next/link";
import { getTools } from "@/lib/data";

export default function HomePage() {
  const tools = getTools();
  const total = tools.length;

  return (
    <div className="animate-fade-in">
      <section className="mb-10 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700">
          Next.js Developer Infrastructure
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Compare the Best Next.js Authentication Tools
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-500">
          In-depth comparisons, pricing breakdowns, and developer experience analysis
          for the top Next.js auth solutions in 2026.
        </p>

        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-slate-900 text-left text-sm shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-slate-400">install-auth.sh</span>
          </div>
          <div className="space-y-1.5 p-4 font-mono text-xs leading-relaxed text-slate-300">
            <p><span className="text-green-400">$</span> npx create-next-app@latest my-auth-app --typescript</p>
            <p><span className="text-green-400">$</span> cd my-auth-app</p>
            <p><span className="text-green-400">$</span> npm install @clerk/nextjs</p>
            <p className="text-cyan-400">✦  Adding Clerk auth middleware...</p>
            <p className="text-cyan-400">✦  Wrapping layout with ClerkProvider...</p>
            <p className="text-emerald-400">✓  Authentication configured in 2 minutes</p>
            <p className="text-slate-500">— 10 auth providers compared on this site —</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2" id="tool-badges">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={`#tool-${tool.id}`}
              className="pill transition-all hover:scale-105 hover:ring-2 hover:ring-indigo-500"
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
