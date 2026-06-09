import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataPath = join(__dirname, "..", "src", "data", "auth-tools.json");
let raw = readFileSync(dataPath, "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const tools = JSON.parse(raw);

const CONTENT_DIR = join(__dirname, "..", "content");
const COMPARE_DIR = join(CONTENT_DIR, "compare");
const TOOLS_DIR = join(CONTENT_DIR, "tools");

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function firstSentence(text) {
  const idx = text.search(/(?<!\bNext)(?<!\bStripe)(?<!\betc)\.\s/);
  if (idx > 0) return text.slice(0, idx + 1).trim();
  const simpleIdx = text.indexOf(". ");
  if (simpleIdx > 10) return text.slice(0, simpleIdx + 1).trim();
  return text + ".";
}

function cleanProText(text) {
  const cleaned = text.toLowerCase().replace(/purpose-built/, "purpose built");
  return cleaned.length > 55 ? cleaned.slice(0, 55).replace(/\s+\S*$/, "") : cleaned;
}

// ─── Compare page content generators ───

const metaDescTemplates = [
  (a, b) => `Looking for ${a.name} vs ${b.name} for your Next.js app? We compare pricing (${a.starting_price} vs ${b.starting_price}), DX scores, setup time, and give you our honest pick.`,
  (a, b) => `${a.name} or ${b.name} for Next.js authentication? Compare features, pricing, learning curves, and find out which auth tool fits your 2026 project.`,
  (a, b) => `Detailed ${a.name} vs ${b.name} comparison for Next.js App Router. See how they stack up on pricing, developer experience, and real-world trade-offs.`,
  (a, b) => `Choosing between ${a.name} and ${b.name}? We break down the differences in pricing, setup, and Next.js integration to help you decide.`,
  (a, b) => `${a.name} (${a.rating}★) vs ${b.name} (${b.rating}★) for Next.js. Compare ${a.learning_curve} vs ${b.learning_curve} learning curves, free tiers, and get our recommendation.`,
];

const ogTitleTemplates = [
  (a, b) => `${a.name} vs ${b.name} — Which Next.js Auth Tool Wins?`,
  (a, b) => `${a.name} vs ${b.name}: Next.js Auth Comparison (2026)`,
  (a, b) => `${a.name} or ${b.name} for Next.js? Our Honest Comparison`,
];

const ogDescTemplates = [
  (a, b) => `${a.name} scores ${a.nextjs_integration_score}/10 for Next.js DX. ${b.name} scores ${b.nextjs_integration_score}/10. See how they compare on pricing, features, and setup time.`,
  (a, b) => `We compared ${a.name} and ${b.name} head-to-head. Pricing: ${a.starting_price} vs ${b.starting_price}. Read our full analysis.`,
  (a, b) => `${a.name} (${a.rating}★) vs ${b.name} (${b.rating}★). ${a.learning_curve} learning curve vs ${b.learning_curve}. Find your ideal Next.js auth solution.`,
];

const summaryTemplates = [
  (a, b, winner, loser) => `When comparing ${a.name} and ${b.name} for Next.js App Router authentication, the differences come down to your priorities. ${winner.name} leads with a ${winner.nextjs_integration_score}/10 Next.js integration score and a ${winner.learning_curve.toLowerCase()} learning curve. ${loser.name} scores ${loser.nextjs_integration_score}/10 with a ${loser.learning_curve.toLowerCase()} learning curve. ${winner.name} starts at ${winner.starting_price}, while ${loser.name} starts at ${loser.starting_price}.`,
  (a, b, winner, loser) => `Both ${a.name} and ${b.name} are solid choices for Next.js authentication, but they serve different needs. ${winner.name} edges ahead with a stronger Next.js integration score (${winner.nextjs_integration_score}/10 vs ${loser.nextjs_integration_score}/10). Where ${loser.name} shines is ${loser.free_tier}. If you are optimizing for developer experience in the App Router, ${winner.name} is the safer bet.`,
  (a, b, winner, loser) => `${a.name} vs ${b.name} is a common comparison we hear from Next.js developers. ${a.name} (${a.rating}★) and ${b.name} (${b.rating}★) both have loyal followings. Our analysis shows ${winner.name} has the edge for most Next.js projects due to its ${winner.nextjs_integration_score}/10 DX score. ${loser.name} is a strong alternative if ${loser.free_tier.toLowerCase()} better matches your budget.`,
];

const verdictTemplates = [
  (winner, loser) => `For most Next.js developers building production apps, we recommend ${winner.name}. It offers better Next.js integration (${winner.nextjs_integration_score}/10 vs ${loser.nextjs_integration_score}/10), a ${winner.learning_curve.toLowerCase()} learning curve, and a strong feature set that aligns well with App Router patterns. ${loser.name} remains a solid choice — especially if ${loser.free_tier.toLowerCase()} is important to your stack.`,
  (winner, loser) => `${winner.name} is our pick for this matchup. The ${winner.nextjs_integration_score}/10 Next.js score reflects how well it integrates with server components, middleware, and edge runtime. ${loser.name} is not far behind at ${loser.nextjs_integration_score}/10, but ${winner.name}'s developer experience gives it the edge for most projects.`,
  (winner, loser) => `We recommend ${winner.name} for most Next.js App Router projects. Its ${winner.learning_curve.toLowerCase()} learning curve and ${winner.setup_time_nextjs} setup time make it immediately productive. ${loser.name} is a worthy alternative, particularly if you need ${loser.free_tier.toLowerCase()} or prefer ${loser.name}'s approach to authentication.`,
];

function generateCompareFaq(a, b, winner) {
  return [
    {
      question: `Should I choose ${a.name} or ${b.name} for my Next.js app?`,
      answer: `It depends on your specific needs. ${a.name} scores ${a.nextjs_integration_score}/10 for Next.js integration with a ${a.learning_curve} learning curve. ${b.name} scores ${b.nextjs_integration_score}/10 with a ${b.learning_curve} learning curve. For most projects, we recommend ${winner.name} because of its stronger DX and better alignment with App Router patterns. However, if ${a.free_tier} or ${b.free_tier} is a deciding factor, the cheaper option may serve you well.`,
    },
    {
      question: `Is ${a.name} or ${b.name} more affordable?`,
      answer: `${a.name} starts at ${a.starting_price} with a free tier of ${a.free_tier}. ${b.name} starts at ${b.starting_price} with a free tier of ${b.free_tier}. The total cost of ownership depends on your MAU (monthly active users). At lower volumes, the free tiers of both are sufficient. As you scale, ${a.starting_price > b.starting_price || a.starting_price.includes("$0") ? a.name + " offers better value at scale" : b.name + " offers better value at scale"}. Factor in hidden costs like enterprise features, SSO, and database infrastructure when comparing.`,
    },
    {
      question: `Is ${a.name} or ${b.name} easier to set up with Next.js?`,
      answer: `${a.name} has a ${a.learning_curve} learning curve with an estimated setup time of ${a.setup_time_nextjs}. ${b.name} has a ${b.learning_curve} learning curve with an estimated setup time of ${b.setup_time_nextjs}. ${a.setup_time_nextjs < b.setup_time_nextjs ? a.name : b.name} is faster to set up, but ease of integration also depends on your team's familiarity with the framework and whether you want pre-built UI components or prefer to build your own.`,
    },
    {
      question: `Can I use ${a.name} and ${b.name} together?`,
      answer: `Using both ${a.name} and ${b.name} in the same Next.js application is not recommended. They would create separate session management systems, conflicting middleware, and competing cookies. Choose one auth provider and stick with it. Migrating between auth providers later is possible but requires user data export and rebuilding authentication flows.`,
    },
    {
      question: `Which has better developer experience: ${a.name} or ${b.name}?`,
      answer: `${a.name} has a ${a.learning_curve} learning curve, a Next.js integration score of ${a.nextjs_integration_score}/10, and a user rating of ${a.rating}★. ${b.name} has a ${b.learning_curve} learning curve, ${b.nextjs_integration_score}/10, and ${b.rating}★. On paper, ${winner.name} leads in DX. In practice, your specific requirements around pre-built components, customization, and team expertise matter just as much. Try both free tiers to see what clicks.`,
    },
  ];
}

function generateCompareContent(a, b) {
  const winner = a.nextjs_integration_score >= b.nextjs_integration_score ? a : b;
  const loser = winner.id === a.id ? b : a;

  const pts = [
    { label: "Starting Price", t1: a.starting_price, t2: b.starting_price, w: null },
    { label: "Free Tier", t1: a.free_tier, t2: b.free_tier, w: null },
    { label: "Learning Curve", t1: a.learning_curve, t2: b.learning_curve, w: null },
    { label: "Setup Time", t1: a.setup_time_nextjs, t2: b.setup_time_nextjs, w: null },
    { label: "Next.js Integration", t1: `${a.nextjs_integration_score}/10`, t2: `${b.nextjs_integration_score}/10`, w: a.nextjs_integration_score > b.nextjs_integration_score ? a.id : b.id },
    { label: "User Rating", t1: `${a.rating}★`, t2: `${b.rating}★`, w: a.rating > b.rating ? a.id : b.id },
  ];

  return {
    page_type: "VS_COMPARISON",
    tool_1_id: a.id,
    tool_2_id: b.id,
    seo: {
      meta_title: `${a.name} vs ${b.name} for Next.js App Router (2026): Which Auth Tool Wins?`,
      meta_description: pick(metaDescTemplates)(a, b),
      og_title: pick(ogTitleTemplates)(a, b),
      og_description: pick(ogDescTemplates)(a, b),
    },
    hero: {
      headline: `${a.name} vs ${b.name} for Next.js Authentication`,
      subheadline: `An honest comparison of ${a.name} and ${b.name} — pricing, DX, setup time, and which one we recommend for Next.js App Router projects in 2026.`,
    },
    quick_summary: pick(summaryTemplates)(a, b, winner, loser),
    verdict_winner_id: winner.id,
    verdict_text: pick(verdictTemplates)(winner, loser),
    structured_data_points: pts,
    pros_and_cons: {
      tool_1: { pros: a.pros, cons: a.cons },
      tool_2: { pros: b.pros, cons: b.cons },
    },
    faq: generateCompareFaq(a, b, winner),
  };
}

// ─── Tool page content generators ───

const toolIntroTemplates = [
  (tool) => `${tool.name} is a${tool.learning_curve === "Easy" ? "n " : " "}${tool.learning_curve.toLowerCase()} authentication solution${tool.starting_price === "Free (Open Source)" ? " that is completely free and open source." : ` with a starting price of ${tool.starting_price}.`} It is designed for Next.js App Router and supports authentication patterns like ${tool.pros.slice(0, 2).join(" and ").toLowerCase().replace(/purpose-built/, "purpose-built")}. Estimated setup time is ${tool.setup_time_nextjs} for a basic integration.`,
  (tool) => `For Next.js developers evaluating auth solutions, ${tool.name} stands out for ${tool.best_for_short.toLowerCase()}. With a rating of ${tool.rating}★ and a Next.js integration score of ${tool.nextjs_integration_score}/10, it${tool.learning_curve === "Easy" ? " is one of the most approachable options available." : " offers depth at the cost of a steeper learning curve."}`,
  (tool) => `${tool.name} serves a specific role in the Next.js auth ecosystem. ${firstSentence(tool.short_description)} The ${tool.learning_curve.toLowerCase()} learning curve and ${tool.setup_time_nextjs} setup time make it ${tool.learning_curve === "Easy" ? "accessible for teams of all sizes." : "better suited for teams with dedicated auth infrastructure experience."}`,
];

const whoShouldUseTemplates = [
  (tool, isTopTier) => `${tool.name} is ideal for teams that ${isTopTier ? "want the best possible developer experience for Next.js App Router" : "need a reliable auth solution with specific strengths around " + tool.pros.slice(0, 2).join(" and ").toLowerCase()}. ${firstSentence(tool.best_for_detailed)} If you are building a Next.js SaaS and value seamless integration, ${tool.name} deserves serious consideration.`,
  (tool) => `You should consider ${tool.name} if you prioritize ${cleanProText(tool.pros[0] || "developer experience")}. It is well-suited for teams that need a reliable Next.js auth provider and want to avoid vendor lock-in or excessive per-user pricing.`,
  (tool) => `${tool.name} works best for Next.js projects where ease of integration matters most. The ${tool.learning_curve.toLowerCase()} learning curve means ${tool.learning_curve === "Easy" ? "your whole team can be productive within hours." : "you should budget time for setup and configuration."} We recommend it for ${tool.starting_price === "Free (Open Source)" ? "teams with DevOps bandwidth who want full control." : "teams that want a managed solution with minimal ops overhead."}`,
];

function generateToolPageContent(tool) {
  const isTopTier = tool.nextjs_integration_score >= 8;
  const dxSentences = tool.dx_details.split(".").filter(Boolean).map(s => s.trim());
  const pricingSentences = tool.pricing_pitfall.split(".").filter(Boolean).map(s => s.trim());
  const faqs = [
    {
      question: `Is ${tool.name} good for Next.js App Router?`,
      answer: `${tool.name} has a Next.js integration score of ${tool.nextjs_integration_score}/10. ${firstSentence(dxSentences[0] || tool.dx_details)} ${tool.name} ${isTopTier ? "is one of the best options available for App Router projects." : "is a capable option for App Router projects."}`,
    },
    {
      question: `How much does ${tool.name} cost?`,
      answer: `${tool.name} starts at ${tool.starting_price} with ${tool.free_tier}. ${firstSentence(pricingSentences[0] || tool.pricing_pitfall)} Factor in your expected MAU when evaluating total cost.`,
    },
    {
      question: `How long does it take to set up ${tool.name} with Next.js?`,
      answer: `Setup time is approximately ${tool.setup_time_nextjs} with ${tool.learning_curve === "Easy" ? "an" : "a"} ${tool.learning_curve.toLowerCase()} learning curve. ${dxSentences.length > 1 ? firstSentence(dxSentences[1]) : firstSentence(dxSentences[0] || tool.dx_details)}`,
    },
  ];

  return {
    page_type: "TOOL_PAGE",
    tool_id: tool.id,
    seo: {
      meta_title: `${tool.name} Review: Next.js Auth in 2026 — Pricing, DX & Setup`,
      meta_description: tool.short_description.slice(0, 155),
      og_title: `${tool.name} — Pricing, Developer Experience & Best Use Cases`,
      og_description: `${tool.name} for Next.js App Router: ${tool.learning_curve} learning curve, ${tool.starting_price}, ${tool.setup_time_nextjs} setup. ${tool.best_for_short.slice(0, 100)}`,
    },
    hero: {
      headline: `${tool.name}: Complete Review for Next.js Developers`,
      subheadline: `A thorough breakdown of ${tool.name}'s pricing, developer experience, and fit for Next.js App Router projects.`,
    },
    intro_paragraphs: [pick(toolIntroTemplates)(tool)],
    who_should_use_paragraphs: [pick(whoShouldUseTemplates)(tool, isTopTier)],
    pricing_context: tool.pricing_pitfall,
    faq: faqs,
  };
}

// ─── Alternatives page content generators ───

function generateAlternativesContent(tool, allTools) {
  const others = allTools.filter((t) => t.id !== tool.id);
  return {
    page_type: "ALTERNATIVES",
    tool_id: tool.id,
    seo: {
      meta_title: `Best ${tool.name} Alternatives for Next.js Developers (2026)`,
      meta_description: `Looking for alternatives to ${tool.name}? Compare the top Next.js auth tools — ${others.slice(0, 3).map((t) => t.name).join(", ")} — and find the right fit for your project.`,
      og_title: `Best Alternatives to ${tool.name} for Next.js`,
      og_description: `Top ${tool.name} alternatives ranked by Next.js integration score, pricing, and developer experience.`,
    },
    hero: {
      headline: `Best ${tool.name} Alternatives for Next.js (2026)`,
      subheadline: `${tool.name} not quite right? Here are the top alternatives, ranked by how well they integrate with Next.js App Router.`,
    },
    intro_paragraphs: [
      `${tool.name} is a solid choice for Next.js authentication — ${firstSentence(tool.short_description).toLowerCase()} But depending on your budget, team size, or feature requirements, one of these alternatives might be a better fit.`,
    ],
    faq: [
      {
        question: `Why would I choose something over ${tool.name}?`,
        answer: `While ${tool.name} scores ${tool.nextjs_integration_score}/10 for Next.js integration, other tools may offer better pricing at scale (${tool.starting_price} with ${tool.free_tier}), different learning curves, or features that ${tool.name} lacks such as ${tool.cons.slice(0, 2).join(", ").toLowerCase()}.`,
      },
    ],
  };
}

// ─── Main generation ───

ensureDir(COMPARE_DIR);

let compareCount = 0;
let toolCount = 0;
let altCount = 0;

for (const a of tools) {
  for (const b of tools) {
    if (a.id === b.id) continue;
    const content = generateCompareContent(a, b);
    const filename = `${a.id}-vs-${b.id}.json`;
    writeFileSync(join(COMPARE_DIR, filename), JSON.stringify(content, null, 2), "utf-8");
    compareCount++;
  }
}

for (const tool of tools) {
  const toolDir = join(TOOLS_DIR, tool.id);
  ensureDir(toolDir);

  const pageContent = generateToolPageContent(tool);
  writeFileSync(join(toolDir, "page.json"), JSON.stringify(pageContent, null, 2), "utf-8");
  toolCount++;

  const altContent = generateAlternativesContent(tool, tools);
  writeFileSync(join(toolDir, "alternatives.json"), JSON.stringify(altContent, null, 2), "utf-8");
  altCount++;
}

console.log(`Generated ${compareCount} compare pages, ${toolCount} tool pages, ${altCount} alternatives pages`);
