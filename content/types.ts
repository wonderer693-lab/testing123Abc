export interface CompareContent {
  page_type: "VS_COMPARISON";
  tool_1_id: string;
  tool_2_id: string;
  seo: {
    meta_title: string;
    meta_description: string;
    og_title: string;
    og_description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
  };
  quick_summary: string;
  verdict_winner_id: string;
  verdict_text: string;
  structured_data_points: Array<{
    label: string;
    tool_1_value: string;
    tool_2_value: string;
    winner_id: string | null;
  }>;
  pros_and_cons: {
    tool_1: { pros: string[]; cons: string[] };
    tool_2: { pros: string[]; cons: string[] };
  };
  faq: Array<{ question: string; answer: string }>;
}

export interface ToolPageContent {
  page_type: "TOOL_PAGE";
  tool_id: string;
  seo: {
    meta_title: string;
    meta_description: string;
    og_title: string;
    og_description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
  };
  intro_paragraphs: string[];
  who_should_use_paragraphs: string[];
  pricing_context: string;
  faq: Array<{ question: string; answer: string }>;
}

export interface AlternativesContent {
  page_type: "ALTERNATIVES";
  tool_id: string;
  seo: {
    meta_title: string;
    meta_description: string;
    og_title: string;
    og_description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
  };
  intro_paragraphs: string[];
  faq: Array<{ question: string; answer: string }>;
}
