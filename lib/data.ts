import { RootData } from "./types";
import raw from "@/data/tools.json";

const data = raw as unknown as RootData;

export function getSite(): RootData["site"] {
  return data.site;
}

export function getTool(): RootData["tool"] {
  return data.tool;
}

export function getAudiences(): RootData["audiences"] {
  return data.audiences;
}

export function getAudience(slug: string): RootData["audiences"][number] | undefined {
  return data.audiences.find((a) => a.slug === slug);
}

export function getProblems(): RootData["problems"] {
  return data.problems;
}

export function getProblem(slug: string): RootData["problems"][number] | undefined {
  return data.problems.find((p) => p.slug === slug);
}

export function getAffiliateLink(): string {
  return data.tool.affiliateLink || "[YOUR_AFFILIATE_LINK]";
}

export function formatPrice(price: number): string {
  return `$${price}/month`;
}
