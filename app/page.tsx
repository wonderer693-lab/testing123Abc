import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/data";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import SchemaMarkup from "@/components/SchemaMarkup";
import Newsletter from "@/components/Newsletter";

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

  const categories = [
    { name: "Managed Auth", desc: "Plug and play, pay as you grow", tools: ["Clerk", "Kinde", "Descope"], borderClass: "border-t-blue-500" },
    { name: "Open Source", desc: "Free, self-hosted, full control", tools: ["Better Auth", "Auth.js"], borderClass: "border-t-green-500" },
    { name: "Platform-Bundled", desc: "Comes with your database", tools: ["Supabase Auth", "Firebase Auth"], borderClass: "border-t-purple-500" },
    { name: "Enterprise", desc: "SSO, compliance, scale", tools: ["Auth0", "WorkOS"], borderClass: "border-t-amber-500" },
  ];

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
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
            Next.js Developer Infrastructure · 2026 Edition
          </div>
          <h1 id="hero-heading" className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
            Compare the Best Next.js Authentication Tools
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-slate-500 dark:text-slate-400">
            We analyzed 10 authentication solutions for Next.js App Router — pricing, developer experience, setup time, and real-world trade-offs. No marketing fluff, just practitioner insights.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tools.slice(0, 5).map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="pill pill-blue hover:ring-2 hover:ring-blue-400 transition-all">
                {tool.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="browse-heading">
          <h2 id="browse-heading" className="mb-6 text-xl font-bold text-slate-900 dark:text-slate-100">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const catTools = tools.filter((t) => cat.tools.includes(t.name));
              return (
                <div key={cat.name} className={`card-solid p-4 border-t-2 ${cat.borderClass}`}>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">{cat.name}</h3>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{cat.desc}</p>
                  <ul className="mt-3 space-y-1.5">
                    {catTools.map((t) => (
                      <li key={t.id}>
                        <Link href={`/tools/${t.id}`} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                          {t.name}
                        </Link>
                        <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">{t.rating}★</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="table-heading">
          <h2 id="table-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">Full Comparison Table</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-sm" role="table">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                  <th className="sticky top-0 px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">Tool</th>
                  <th className="sticky top-0 px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">Key Features</th>
                  <th className="sticky top-0 px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">Pricing</th>
                  <th className="sticky top-0 px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">Setup Time</th>
                  <th className="sticky top-0 px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-4">
                      <Link href={`/tools/${tool.id}`} className="flex items-center gap-2 group">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{tool.name}</span>
                        <svg className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs text-slate-400 dark:text-slate-500">{tool.rating} ★</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">Next.js {tool.nextjs_integration_score}/10</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {keyFeatures(tool).map((f, i) => (
                          <li key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{tool.starting_price}</span>
                      <span className="block text-xs text-slate-400 dark:text-slate-500 font-normal mt-0.5">{tool.free_tier}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                      {tool.setup_time_nextjs}
                    </td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-300 min-w-[200px]">
                      <Link href={`/tools/${tool.id}`} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium underline underline-offset-2 leading-snug">
                        {tool.best_for_short}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
            All tools evaluated for Next.js 15 App Router. Click any tool for the full deep-dive analysis.
          </p>
        </section>

        <section className="mb-12" aria-labelledby="why-trust-heading">
          <h2 id="why-trust-heading" className="mb-6 text-xl font-bold text-slate-900 dark:text-slate-100 text-center">Why Trust This Comparison</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-solid p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Expert Auth Analysis</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Written by developers who ship auth in production Next.js apps — not AI-scraped marketing pages.</p>
            </div>
            <div className="card-solid p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Real Pricing Breakdowns</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">We call out the hidden costs: MAU limits, feature gating, and infrastructure overhead for self-hosted options.</p>
            </div>
            <div className="card-solid p-5">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Open & Verifiable</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">All evaluations are transparent. Check each tool's GitHub repo for current bug reports and community health.</p>
            </div>
          </div>
        </section>

        <Newsletter />
      </div>
    </>
  );
}
