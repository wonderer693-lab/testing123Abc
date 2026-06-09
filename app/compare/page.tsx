import type { Metadata } from "next";
import { getTools } from "@/lib/data";
import { loadCompareContent } from "@/lib/content-loader";
import CompareCardGrid from "@/components/CompareCardGrid";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "All Comparisons — NextAuthCompare",
  description: "Browse all 90+ side-by-side comparisons of Next.js authentication tools. Find the best auth solution for your project with our detailed analysis.",
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

export default function CompareListingPage() {
  const tools = getTools();
  const pairs = [];

  for (const a of tools) {
    for (const b of tools) {
      if (a.id === b.id) continue;
      const slug = `${a.id}-vs-${b.id}`;
      const category = toolCategory[a.id] || "managed";
      const content = loadCompareContent(slug);
      const quickSummary = content?.quick_summary
        ? content.quick_summary.split(".").slice(0, 2).join(".") + "."
        : `${a.name} scores ${a.nextjs_integration_score}/10 for Next.js. ${b.name} scores ${b.nextjs_integration_score}/10.`;
      pairs.push({ slug, tool1: a, tool2: b, category, quickSummary });
    }
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

      <CompareCardGrid pairs={pairs} categories={categories} />

      <div className="mt-8">
        <Newsletter />
      </div>
    </div>
  );
}
