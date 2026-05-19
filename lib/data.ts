import { RootData, SiteInfo, ToolData, Audience, Problem, Feature, Competitor, Guide, GlossaryTerm } from "./types";
import raw from "@/data/tools.json";

const data = raw as unknown as RootData;

export function getSite(): SiteInfo {
  return data.site;
}

export function getTool(): ToolData {
  return data.tool;
}

export function getAudiences(): Audience[] {
  return data.audiences;
}

export function getAudience(slug: string): Audience | undefined {
  return data.audiences.find((a) => a.slug === slug);
}

export function getProblems(): Problem[] {
  return data.problems;
}

export function getProblem(slug: string): Problem | undefined {
  return data.problems.find((p) => p.slug === slug);
}

export function getFeatures(): Feature[] {
  return data.tool.features;
}

export function getFeature(slug: string): Feature | undefined {
  return data.tool.features.find((f) => f.slug === slug);
}

export function getCompetitors(): Competitor[] {
  return data.competitors;
}

export function getCompetitor(slug: string): Competitor | undefined {
  return data.competitors.find((c) => c.slug === slug);
}

export function getGuides(): Guide[] {
  return data.guides;
}

export function getGuide(slug: string): Guide | undefined {
  return data.guides.find((g) => g.slug === slug);
}

export function getGlossaryTerms(): GlossaryTerm[] {
  return data.glossary;
}

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return data.glossary.find((g) => g.slug === slug);
}

export function getAffiliateLink(): string {
  return data.tool.affiliateLink || "[YOUR_AFFILIATE_LINK]";
}

export function getAffiliateLinkAnnual(): string {
  return data.tool.affiliateLinkAnnual || getAffiliateLink();
}

export function getAffiliateLinkSaaSPro(): string {
  return data.tool.affiliateLinkSaaSPro || getAffiliateLink();
}

export function getAffiliateLinkBootcamp(): string {
  return data.tool.affiliateLinkBootcamp || getAffiliateLink();
}

export function getAffiliateLinkAI(): string {
  return data.tool.affiliateLinkAI || getAffiliateLink();
}

export function getAffiliateLinkUpgrade(): string {
  return data.tool.affiliateLinkUpgrade || getAffiliateLink();
}

export function getAffiliateLinkSaaSUpgrade(): string {
  return data.tool.affiliateLinkSaaSUpgrade || getAffiliateLink();
}

export function formatPrice(price: number): string {
  return `$${price}/month`;
}
