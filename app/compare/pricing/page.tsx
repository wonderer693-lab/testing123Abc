import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/data";

export const metadata: Metadata = {
  title: "Next.js Auth Pricing Comparison 2026 — Free Tiers & Enterprise Plans",
  description: "Compare pricing across all major Next.js authentication providers: Clerk, Auth0, Supabase Auth, Firebase Auth, Kinde, and more. Free tiers, MAU limits, and hidden costs exposed.",
  openGraph: {
    title: "Next.js Auth Pricing Comparison (2026) — Free Tiers & Hidden Costs",
    description: "Side-by-side pricing comparison of 10 Next.js auth providers. Free MAU limits, paid plan pricing, and pricing pitfalls for each platform.",
    type: "article",
    locale: "en_US",
    siteName: "NextAuthCompare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Auth Pricing Comparison (2026)",
    description: "Compare pricing across 10 Next.js auth providers — free tiers, MAU limits, and hidden costs exposed.",
    site: "@saaspolarbeam",
    creator: "@saaspolarbeam",
  },
};

export default function PricingPage() {
  const tools = getTools();

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Next.js Auth Pricing Comparison 2026
      </h1>
      <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
        What each provider charges, where the hidden costs live, and which one gives you the most value for your scale.
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Provider</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Starting Price</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Free Tier</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Hidden Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {tools.map((tool) => (
              <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                <td className="p-3">
                  <Link href={`/tools/${tool.id}`} className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    {tool.name}
                  </Link>
                </td>
                <td className="p-3 text-slate-600 dark:text-slate-400">{tool.starting_price}</td>
                <td className="p-3 text-slate-600 dark:text-slate-400">{tool.free_tier}</td>
                <td className="p-3 text-sm text-red-600 dark:text-red-400">{tool.pricing_pitfall?.split(".").slice(0, 2).join(". ")}{tool.pricing_pitfall ? "." : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-800 dark:bg-green-950/20">
          <h2 className="font-semibold text-green-800 dark:text-green-300">Best Free Tiers</h2>
          <ul className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-400">
            <li>Supabase Auth — 50K MAU free</li>
            <li>Firebase Auth — 50K MAU free</li>
            <li>Better Auth — Free (Open Source)</li>
            <li>Auth.js — Free (Open Source)</li>
          </ul>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
          <h2 className="font-semibold text-amber-800 dark:text-amber-300">Watch Out For</h2>
          <ul className="mt-2 space-y-1 text-sm text-amber-700 dark:text-amber-400">
            <li>Clerk: Free $0 → Pro $199/mo jump</li>
            <li>Auth0: B2B starts at $3K+/mo</li>
            <li>Descope: $2K/mo at 30K MAU</li>
            <li>WorkOS: No free tier, sales call required</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="font-semibold text-slate-800 dark:text-slate-200">Which Provider Is Most Cost-Effective?</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li><strong>Hobby project (&lt;1K MAU):</strong> Any free tier works. Supabase Auth or Firebase Auth for platform convenience, Better Auth for full control.</li>
          <li><strong>Early startup (&lt;10K MAU):</strong> Supabase Auth (50K free), Better Auth (free), or Clerk free tier. Avoid Auth0 ($3K+) and Descope ($2K) at this stage.</li>
          <li><strong>Growing SaaS (&lt;50K MAU):</strong> Supabase Auth Pro ($75/mo) or Kinde ($300/mo). Clerk jumps to $199/mo at 20K MAU.</li>
          <li><strong>Enterprise (100K+ MAU):</strong> Auth0 or WorkOS for compliance needs. Expect $3K-$25K+/year.</li>
        </ul>
      </div>
    </div>
  );
}
