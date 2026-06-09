export interface AuthTool {
  id: string
  name: string
  starting_price: string
  free_tier: string
  learning_curve: "Easy" | "Medium" | "Advanced"
  setup_time_nextjs: string
  easier_alternative: string
  easier_alternative_url: string
  pros: string[]
  cons: string[]
  affiliate_url: string
  short_description: string
  rating: number
  dx_details: string
  pricing_pitfall: string
  nextjs_integration_score: number
  best_for_short: string
  best_for_detailed: string
}
