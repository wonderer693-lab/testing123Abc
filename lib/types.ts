export interface SiteInfo {
  name: string
  url: string
  tagline: string
}

export interface Pricing {
  starter: number
  unlimited: number
  saasPro: number
  currency: string
  cycle: string
}

export interface Feature {
  slug: string
  name: string
  shortDesc: string
}

export interface Audience {
  slug: string
  name: string
  title: string
  metaDesc: string
  problem: string
  realReview: string
  solution: string
}

export interface Problem {
  slug: string
  name: string
  title: string
  metaDesc: string
  explanation: string
}

export interface ToolData {
  name: string
  slug: string
  shortName: string
  tagline: string
  website: string
  affiliateLink: string
  pricing: Pricing
  features: Feature[]
}

export interface RootData {
  site: SiteInfo
  tool: ToolData
  audiences: Audience[]
  problems: Problem[]
}

export interface PageParams {
  slug: string
}
