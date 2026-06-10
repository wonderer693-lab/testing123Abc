import { readFileSync } from "fs";
import { join } from "path";
import type { CompareContent, ToolPageContent, AlternativesContent, GuideContent } from "@/content/types";

const CONTENT_DIR = join(process.cwd(), "content");

function loadJSON<T>(path: string): T | null {
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function loadCompareContent(slug: string): CompareContent | null {
  return loadJSON<CompareContent>(join(CONTENT_DIR, "compare", `${slug}.json`));
}

export function loadToolPageContent(toolId: string): ToolPageContent | null {
  return loadJSON<ToolPageContent>(join(CONTENT_DIR, "tools", toolId, "page.json"));
}

export function loadAlternativesContent(toolId: string): AlternativesContent | null {
  return loadJSON<AlternativesContent>(join(CONTENT_DIR, "tools", toolId, "alternatives.json"));
}

export function loadGuideContent(slug: string): GuideContent | null {
  return loadJSON<GuideContent>(join(CONTENT_DIR, "guides", `${slug}.json`));
}

export function contentExists(type: "compare" | "tool" | "alternatives" | "guide", id: string): boolean {
  if (type === "compare") return loadCompareContent(id) !== null;
  if (type === "tool") return loadToolPageContent(id) !== null;
  if (type === "guide") return loadGuideContent(id) !== null;
  return loadAlternativesContent(id) !== null;
}
