import type { Metadata } from "next";
import { getTools } from "@/lib/data";
import { loadCompareContent } from "@/lib/content-loader";
import CompareCardGrid from "@/components/CompareCardGrid";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "All Comparisons — NextAuthCompare",
  description: "Browse side-by-side comparisons of top Next.js authentication tools. Find the best auth solution for your project with detailed analysis.",
  openGraph: {
    title: "Next.js Auth Tool Comparisons — Head-to-Head Reviews",
    description: "Side-by-side comparisons of every major Next.js authentication provider. Pricing, DX scores, features, and honest verdicts.",
    locale: "en_US",
    siteName: "NextAuthCompare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Auth Tool Comparisons — Head-to-Head Reviews",
    description: "Side-by-side comparisons of every major Next.js authentication provider.",
    site: "@saaspolarbeam",
    creator: "@saaspolarbeam",
  },
};

const categories = [
  { id: "all", label: "All" },
  { id: "managed", label: "Managed Auth" },
  { id: "open-source", label: "Open Source" },
  { id: "platform", label: "Platform-Bundled" },
  { id: "enterprise", label: "Enterprise" },
];

const toolCategory: Record<string, string> = {
  clerk: "managed",
  kinde: "managed",
  descope: "managed",
  logto: "managed",
  "better-auth": "open-source",
  authjs: "open-source",
  "supabase-auth": "platform",
  "firebase-auth": "platform",
  auth0: "enterprise",
  workos: "enterprise",
};

const CANONICAL_PAIRS = [
  "auth0-vs-clerk",
  "auth0-vs-kinde",
  "auth0-vs-workos",
  "authjs-vs-better-auth",
  "authjs-vs-clerk",
  "better-auth-vs-clerk",
  "clerk-vs-firebase-auth",
  "clerk-vs-kinde",
  "clerk-vs-supabase-auth",
  "firebase-auth-vs-supabase-auth",
];

export default function CompareListingPage() {
  const tools = getTools();
  const pairs = [];

  for (const slug of CANONICAL_PAIRS) {
    const [idA, idB] = slug.split("-vs-");
    const a = tools.find((t) => t.id === idA);
    const b = tools.find((t) => t.id === idB);
    if (!a || !b) continue;
    const category = toolCategory[a.id] || "managed";
    const content = loadCompareContent(slug);
    const quickSummary = content?.quick_summary
      ? content.quick_summary.split(".").slice(0, 2).join(".") + "."
      : `${a.name} scores ${a.nextjs_integration_score}/10 for Next.js. ${b.name} scores ${b.nextjs_integration_score}/10.`;
    pairs.push({ slug, tool1: a, tool2: b, category, quickSummary });
  }

  return (
    <div className="animate-fade-in">
      <section className="mb-8">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          All Comparisons
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          {pairs.length} head-to-head verdicts, filtered by category.
        </p>
      </section>

      <h2 className="sr-only">Filter by category</h2>
      <CompareCardGrid pairs={pairs} categories={categories} />

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
