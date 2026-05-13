export interface SiteInfo {
  name: string
  url: string
  tagline: string
}

export interface Pricing {
  starter: number
  unlimited?: number
  saasPro?: number
  professional?: number
  enterprise?: number
  pro?: number
  funnelHacker?: number
  standard?: number
  premium?: number
  growth?: number
  currency: string
  cycle: string
  note?: string
}

export interface Feature {
  slug: string
  name: string
  shortDesc: string
  details: string
  benefits: string[]
  alternativeTools: string[]
}

export interface Competitor {
  slug: string
  name: string
  tagline: string
  description: string
  website: string
  affiliateLink: string
  bestFor: string[]
  pricing: Pricing
  pros: string[]
  cons: string[]
  features: string[]
}

export interface Audience {
  slug: string
  name: string
  title: string
  metaDesc: string
  problem: string
  realReview: string
  solution: string
  keyFeatures?: string[]
}

export interface Problem {
  slug: string
  name: string
  title: string
  metaDesc: string
  explanation: string
}

export interface Guide {
  slug: string
  name: string
  title: string
  metaDesc: string
  intro: string
  steps: string[]
  estimatedTime: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  relatedFeatures: string[]
}

export interface GlossaryTerm {
  slug: string
  term: string
  definition: string
  seeAlso: string[]
}

export interface ToolData {
  name: string
  slug: string
  shortName: string
  tagline: string
  description: string
  website: string
  affiliateLink: string
  affiliateLinkBootcamp?: string
  rating: number
  reviewCount: number
  pricing: Pricing
  features: Feature[]
}

export interface RootData {
  site: SiteInfo
  tool: ToolData
  competitors: Competitor[]
  audiences: Audience[]
  problems: Problem[]
  guides: Guide[]
  glossary: GlossaryTerm[]
}

export interface PageParams {
  slug: string
}
