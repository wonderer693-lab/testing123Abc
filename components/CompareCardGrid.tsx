"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { AuthTool } from "@/lib/types";

interface PairData {
  slug: string;
  tool1: AuthTool;
  tool2: AuthTool;
  category: string;
  quickSummary: string;
}

interface CompareCardGridProps {
  pairs: PairData[];
  categories: { id: string; label: string }[];
}

export default function CompareCardGrid({ pairs, categories }: CompareCardGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPairs = activeCategory === "all"
    ? pairs
    : pairs.filter((p) => p.category === activeCategory);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of pairs) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [pairs]);

  function getDomain(url: string): string {
    try { return new URL(url).hostname; } catch { return ""; }
  }

  return (
    <>
      {filteredPairs.length === 0 && (
        <p className="mb-8 text-center text-sm text-slate-400 dark:text-slate-500">No comparisons match this category.</p>
      )}

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`pill transition-all ${
              activeCategory === cat.id
                ? "pill-blue ring-2 ring-blue-400"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {cat.label}
            {cat.id !== "all" && (
              <span className="ml-1 text-xs opacity-60">({categoryCounts[cat.id] || 0})</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPairs.map(({ slug, tool1, tool2, category, quickSummary }) => (
          <Link
            key={slug}
            href={`/compare/${slug}`}
            className="card-solid group relative flex flex-col p-4 hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
          >
            <div className="mb-3 flex items-center gap-2">
              <img
                src={`https://www.google.com/s2/favicons?domain=${getDomain(tool1.affiliate_url)}&sz=32`}
                alt=""
                className="h-5 w-5 rounded"
                width={20}
                height={20}
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{tool1.name}</span>
              <span className="text-xs text-slate-400">vs</span>
              <img
                src={`https://www.google.com/s2/favicons?domain=${getDomain(tool2.affiliate_url)}&sz=32`}
                alt=""
                className="h-5 w-5 rounded"
                width={20}
                height={20}
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">{tool2.name}</span>
            </div>

            <div className="mb-3 flex items-center gap-3 text-xs">
              <span title={`${tool1.name} rating`}>{tool1.rating}★</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-blue-600 dark:text-blue-400">{tool1.nextjs_integration_score}/10</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span title={`${tool2.name} rating`}>{tool2.rating}★</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-blue-600 dark:text-blue-400">{tool2.nextjs_integration_score}/10</span>
            </div>

            <p className="mb-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
              {quickSummary}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {categories.find((c) => c.id === category)?.label || category}
              </span>
              <span className="text-xs font-medium text-blue-600 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors">
                Read Full &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
