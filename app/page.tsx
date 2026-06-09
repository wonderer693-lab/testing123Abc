import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/data";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";

const siteName = "NextAuthCompare";
const siteUrl = "https://saaspolarbeam.vercel.app";

export function generateMetadata(): Metadata {
  return {
    title: siteName,
    description: "Compare the best Next.js authentication tools in 2026. Expert analysis of Clerk, Kinde, Better Auth, Auth.js, Supabase Auth, Auth0, Logto, WorkOS, Firebase Auth, and Descope — with pricing, features, setup time, and real developer recommendations.",
    openGraph: {
      title: "NextAuthCompare — Best Next.js Authentication Tools Compared (2026)",
      description: "Expert comparison of 10 Next.js auth tools. Pricing, features, setup time, and honest recommendations from auth practitioners.",
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "NextAuthCompare — Best Next.js Authentication Tools Compared (2026)",
      description: "Expert comparison of 10 Next.js auth tools. Pricing, features, setup time, and honest recommendations.",
      site: "@saaspolarbeam",
    },
  };
}

export default function HomePage() {
  const tools = getTools();

  const keyFeatures = (tool: typeof tools[0]) => {
    const features: string[] = [];
    if (tool.id === "clerk") features.push("Pre-built UI components", "Multi-tenancy / orgs", "Edge middleware", "TypeScript-first");
    if (tool.id === "kinde") features.push("Feature flags + remote config", "Visual flow builder", "7.5K MAU free", "Good Next.js SDK");
    if (tool.id === "better-auth") features.push("Open source, self-hosted", "Plugin architecture", "Drizzle/Prisma/Kysely", "No vendor lock-in");
    if (tool.id === "authjs") features.push("80+ OAuth providers", "Battle-tested", "Flexible callbacks", "Framework agnostic");
    if (tool.id === "supabase-auth") features.push("50K MAU free", "Row-Level Security", "Postgres + realtime", "Supabase ecosystem");
    if (tool.id === "auth0") features.push("Enterprise compliance", "Actions engine", "Breach detection", "Massive integrations");
    if (tool.id === "logto") features.push("Open-source core", "Self-hostable", "Clean admin console", "Management API");
    if (tool.id === "workos") features.push("Enterprise SSO/SAML", "SCIM provisioning", "Directory sync", "Stripe-grade DX");
    if (tool.id === "firebase-auth") features.push("50K MAU free", "Anonymous auth", "Google ecosystem", "Massive community");
    if (tool.id === "descope") features.push("Visual flow builder", "No-code screens", "Passkeys/biometrics", "Analytics built-in");
    return features;
  };

  return (
    <>
      <SchemaMarkup schema={organizationSchema(siteUrl, siteName)} />
      <SchemaMarkup schema={websiteSchema(siteUrl, siteName)} />
      <div className="animate-fade-in">
        <section className="mb-12 text-center" aria-labelledby="hero-heading">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Next.js Developer Infrastructure · 2026 Edition
          </div>
          <h1 id="hero-heading" className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
            Compare the Best Next.js Authentication Tools
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-500 dark:text-slate-400">
            We analyzed 10 authentication solutions for Next.js App Router — pricing, developer experience, setup time, and real-world trade-offs. No marketing fluff, just practitioner insights.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="table-heading">
          <h2 id="table-heading" className="sr-only">Authentication Tools Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-sm" role="table">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Tool</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Key Features</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Pricing</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Setup Time</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">
                      <Link href={`/tools/${tool.id}`} className="flex items-center gap-2 group">
                        <span>{tool.name}</span>
                        <svg className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                      <ul className="flex flex-wrap gap-1.5">
                        {keyFeatures(tool).map((f, i) => (
                          <li key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {tool.starting_price}
                      <span className="block text-xs text-slate-400 dark:text-slate-500 font-normal mt-0.5">{tool.free_tier}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {tool.setup_time_nextjs}
                    </td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300 max-w-xs">
                      <Link href={`/tools/${tool.id}`} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium underline underline-offset-2">
                        {tool.best_for_short}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
            All tools evaluated for Next.js 15 App Router compatibility. Click any tool for deep-dive analysis, GitHub issue checks, and expert recommendations.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="why-trust-heading">
          <h2 id="why-trust-heading" className="sr-only">Why Trust This Comparison</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-solid p-5">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Expert Auth Analysis</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Written by practitioners who've shipped auth in production Next.js apps — not scraped from marketing pages.</p>
            </div>
            <div className="card-solid p-5">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Real Pricing Breakdowns</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">We call out the hidden costs: MAU limits, feature gating, infrastructure overhead for self-hosted options.</p>
            </div>
            <div className="card-solid p-5">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">GitHub Issue Checks</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Every tool page links to the repo so you can verify current bugs, edge cases, and community responsiveness.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="sr-only">Pairwise Comparisons</h2>
          <div className="flex flex-wrap items-center justify-center gap-2" id="tool-badges">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-800 transition-all hover:ring-2 hover:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
              >
                {tool.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Need a direct head-to-head? Visit any tool page for links to all 9 pairwise comparisons.
          </p>
        </section>
      </div>
    </>
  );
}