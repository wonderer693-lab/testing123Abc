import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/data";

export const metadata: Metadata = {
  title: "Best Next.js Authentication Tools in 2026 — Ranked & Reviewed",
  description: "We ranked 10 Next.js auth providers by developer experience, pricing, and features. Find the best auth for your Next.js App Router project — from free open-source to enterprise SSO.",
  openGraph: {
    title: "Best Next.js Auth Tools (2026) — Ranked & Compared",
    description: "Clerk, Auth0, Supabase Auth, Better Auth, and more — ranked by DX, pricing, and production readiness for Next.js App Router.",
    type: "article",
    locale: "en_US",
    siteName: "NextAuthCompare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Next.js Auth Tools (2026) — Ranked & Compared",
    description: "Clerk, Auth0, Supabase Auth, Better Auth, and more — ranked by DX, pricing, and production readiness.",
    site: "@saaspolarbeam",
    creator: "@saaspolarbeam",
  },
};

const CATEGORY: Record<string, string> = {
  clerk: "Managed Auth",
  kinde: "Managed Auth",
  descope: "Managed Auth",
  logto: "Managed Auth",
  "better-auth": "Open Source",
  authjs: "Open Source",
  "supabase-auth": "Platform-Bundled",
  "firebase-auth": "Platform-Bundled",
  auth0: "Enterprise",
  workos: "Enterprise",
};

export default function BestPage() {
  const tools = getTools().sort((a, b) => b.rating - a.rating || (b.nextjs_integration_score ?? 0) - (a.nextjs_integration_score ?? 0));

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Best Next.js Authentication Tools in 2026
      </h1>
      <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
        We evaluated {tools.length} auth providers for Next.js App Router. Here is the ranking, from best overall to specialized picks.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {["Managed Auth", "Open Source", "Enterprise"].map((cat) => {
          const top = tools.filter((t) => CATEGORY[t.id] === cat).slice(0, 3);
          return (
            <div key={cat} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <h2 className="mb-2 text-sm font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">{cat}</h2>
              <ul className="space-y-1">
                {top.map((t, i) => (
                  <li key={t.id} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-mono text-xs text-slate-400">{i + 1}.</span>
                    <Link href={`/tools/${t.id}`} className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      {t.name}
                    </Link>
                    <span className="ml-auto text-xs text-slate-400">{t.rating}★</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {tools.map((tool, i) => (
          <div key={tool.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {i + 1}
                </span>
                <div>
                  <Link href={`/tools/${tool.id}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400">
                    {tool.name}
                  </Link>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{CATEGORY[tool.id]}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-md bg-blue-50 px-2 py-1 font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  {tool.nextjs_integration_score}/10 DX
                </span>
                <span className="text-amber-500">{tool.rating}★</span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{tool.best_for_short}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                {tool.starting_price}
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-slate-500 dark:text-slate-400">{tool.learning_curve} learning curve</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-slate-500 dark:text-slate-400">{tool.setup_time_nextjs} setup</span>
            </div>
            <div className="mt-3 flex gap-2">
              <Link href={`/tools/${tool.id}`} className="btn-primary !py-1.5 !px-3 text-xs">
                Read Review
              </Link>
              <Link href={`/tools/${tool.id}/alternatives`} className="btn-ghost !py-1.5 !px-3 text-xs">
                Alternatives
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
