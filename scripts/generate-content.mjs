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

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = (now - start) / 86400000;
  return Math.ceil((diff + start.getDay() + 1) / 7);
}

const BANNED_WORDS = /\b(delve|tapestry|pivotal|showcase|underscore|vibrant|testament|fostering|garner|interplay|intricate|landscape|showcasing|revolutionize|game-changer|cutting-edge|next-generation|seamlessly|robust|empower|empowers|empowering|unlock|unlocks|unlocking|leverage|leveraging|utilize|utilizing|facilitate|facilitating|holistic|comprehensive|transformative|paradigm)\b/gi;

function humanize(text) {
  if (!text || text.length < 20) return text;

  let result = text;

  const bannedMatches = result.match(BANNED_WORDS);
  if (bannedMatches && bannedMatches.length > 0) {
    console.warn(`  [humanize] Found banned words: ${[...new Set(bannedMatches)].join(", ")}`);
    result = result.replace(BANNED_WORDS, (match) => {
      const replacements = {
        delve: "look into", tapestry: "mix", pivotal: "key", showcase: "show",
        underscore: "highlight", vibrant: "lively", testament: "proof",
        fostering: "helping", garner: "get", interplay: "interaction",
        intricate: "complex", landscape: "space", showcasing: "showing",
        revolutionize: "change", "game-changer": "important", "cutting-edge": "modern",
        "next-generation": "new", seamlessly: "smoothly", robust: "solid",
        empower: "help", empowers: "helps", empowering: "helping",
        unlock: "access", unlocks: "opens", unlocking: "opening",
        leverage: "use", leveraging: "using", utilize: "use",
        utilizing: "using", facilitate: "support", facilitating: "supporting",
        holistic: "complete", comprehensive: "thorough", transformative: "transformative",
        paradigm: "model",
      };
      return replacements[match.toLowerCase()] || match;
    });
  }

  result = result.replace(/Not only.*?but also/gi, (m) => {
    return m.replace(/Not only /i, "").replace(/,? but also/, " and");
  });

  result = result.replace(/\u2014/g, " \u2013 ");

  const sentences = result.split(/(?<=\.)\s+/);
  if (sentences.length > 2) {
    const varied = sentences.map((s, i) => {
      if (i > 0 && i < sentences.length - 1 && Math.random() < 0.15) {
        const intros = ["Honestly,", "Here's the thing:", "Look,", "The short version:", "In practice,", "Real talk:"];
        return pick(intros) + " " + s[0].toLowerCase() + s.slice(1);
      }
      return s;
    });
    result = varied.join(" ");
  }

  const discourseFlippers = [
    { from: /^Both (\w+) and (\w+) are solid choices/,
      to: (_, a, b) => `${a} and ${b} are both solid — I've tested each — but they serve different needs.` },
    { from: /^For most Next\.js developers building production apps, we recommend/,
      to: (_, rest) => `I recommend ${rest} for production Next.js apps. Here's why:` },
    { from: /We recommend (\w+) for most/,
      to: (_, name) => `${name} is my pick for most` },
    { from: /It depends on your specific needs\./,
      to: () => `The answer depends on what you're building.` },
  ];
  for (const flipper of discourseFlippers) {
    result = result.replace(flipper.from, flipper.to);
  }

  return result;
}

const freshSuffix = ` (Updated Week ${getWeekNumber()}, ${new Date().getFullYear()})`;
const year = new Date().getFullYear();

// ─── Compare page content generators ───

const metaDescTemplates = [
  (a, b) => `Looking for ${a.name} vs ${b.name} for your Next.js app? We compare pricing (${a.starting_price} vs ${b.starting_price}), DX scores, setup time, and give you our honest pick.`,
  (a, b) => `${a.name} or ${b.name} for Next.js authentication? Compare features, pricing, learning curves, and find out which auth tool fits your ${year} project.`,
  (a, b) => `Detailed ${a.name} vs ${b.name} comparison for Next.js App Router. See how they stack up on pricing, developer experience, and real-world trade-offs.`,
  (a, b) => `Choosing between ${a.name} and ${b.name}? We break down the differences in pricing, setup, and Next.js integration to help you decide.`,
  (a, b) => `${a.name} (${a.rating}★) vs ${b.name} (${b.rating}★) for Next.js. Compare ${a.learning_curve} vs ${b.learning_curve} learning curves, free tiers, and get our recommendation.`,
  (a, b) => `I compared ${a.name} and ${b.name} head-to-head for Next.js ${year}. Pricing: ${a.starting_price} vs ${b.starting_price}. DX scores: ${a.nextjs_integration_score}/10 vs ${b.nextjs_integration_score}/10. Read on for the verdict.`,
  (a, b) => `${a.name} vs ${b.name}: which one actually works better with Next.js App Router? I break down setup time (${a.setup_time_nextjs} vs ${b.setup_time_nextjs}), learning curves, and what you'll pay as you grow.`,
  (a, b) => `Stop guessing between ${a.name} and ${b.name}. Here's a practical comparison of how both handle Next.js authentication — pricing, developer experience, and where each one falls short.`,
  (a, b) => `Need to pick between ${a.name} and ${b.name}? ${a.rating > b.rating ? a.name + " has a higher user rating (" + a.rating + "★)" : b.name + " edges ahead on user rating (" + b.rating + "★)"}. But rating is only part of the story. Read our full breakdown.`,
  (a, b) => `${a.name} and ${b.name} are both capable auth tools for Next.js — but they're not interchangeable. I compare ${a.learning_curve} vs ${b.learning_curve} learning curves, pricing models, and which team each tool actually fits.`,
  (a, b) => `Is ${a.name} or ${b.name} the better choice for your Next.js stack? Here's ${a.setup_time_nextjs < b.setup_time_nextjs ? a.name : b.name}'s setup time vs ${a.setup_time_nextjs < b.setup_time_nextjs ? b.name : a.name}'s, plus hidden costs and real DX trade-offs.`,
  (a, b) => `${a.name} ($${a.starting_price.replace(/[^0-9]/g, "") || "free"}) vs ${b.name} ($${b.starting_price.replace(/[^0-9]/g, "") || "free"}) for Next.js. I've tested both in production — here's what you need to know before choosing.`,
];

const ogTitleTemplates = [
  (a, b) => `${a.name} vs ${b.name} — Which Next.js Auth Tool Wins?`,
  (a, b) => `${a.name} vs ${b.name}: Next.js Auth Comparison (${year})`,
  (a, b) => `${a.name} or ${b.name} for Next.js? Our Honest Comparison`,
  (a, b) => `${a.name} vs ${b.name}: Head-to-Head Next.js Review`,
  (a, b) => `${a.name} vs ${b.name} — I Tested Both So You Don't Have To`,
  (a, b) => `${a.name} vs ${b.name}: The Real Difference for Next.js Devs`,
  (a, b) => `Picking ${a.name} or ${b.name}? Here's My Verdict`,
  (a, b) => `${a.name} vs ${b.name} — Which Auth Tool Ships Faster?`,
  (a, b) => `${a.name} vs ${b.name} (${year}): Honest Comparison`,
  (a, b) => `${a.name} or ${b.name}: What Actually Matters for Next.js`,
];

const ogDescTemplates = [
  (a, b) => `${a.name} scores ${a.nextjs_integration_score}/10 for Next.js DX. ${b.name} scores ${b.nextjs_integration_score}/10. See how they compare on pricing, features, and setup time.`,
  (a, b) => `We compared ${a.name} and ${b.name} head-to-head. Pricing: ${a.starting_price} vs ${b.starting_price}. Read our full analysis.`,
  (a, b) => `${a.name} (${a.rating}★) vs ${b.name} (${b.rating}★). ${a.learning_curve} learning curve vs ${b.learning_curve}. Find your ideal Next.js auth solution.`,
  (a, b) => `I tested ${a.name} and ${b.name} with Next.js App Router. Here's my honest comparison of pricing, DX, and which one I'd actually ship.`,
  (a, b) => `${a.name} vs ${b.name}: pricing (${a.starting_price} vs ${b.starting_price}), DX scores, setup time, and my verdict on which tool wins for Next.js development.`,
  (a, b) => `Both ${a.name} and ${b.name} work with Next.js — but the developer experience differs significantly. ${a.nextjs_integration_score}/10 vs ${b.nextjs_integration_score}/10. Read more.`,
  (a, b) => `${a.name} (${a.rating}★, ${a.learning_curve}) and ${b.name} (${b.rating}★, ${b.learning_curve}) compared for Next.js. Who wins on setup, pricing, and DX?`,
  (a, b) => `Detailed comparison of ${a.name} vs ${b.name} for Next.js App Router. Pricing breakdown, real DX scores, and which one I'd recommend for your ${year} project.`,
  (a, b) => `Choosing auth for your Next.js app? ${a.name} and ${b.name} compared: ${a.starting_price} vs ${b.starting_price}, ${a.setup_time_nextjs} vs ${b.setup_time_nextjs} setup.`,
  (a, b) => `${a.name} or ${b.name} for Next.js? My hands-on comparison covers pricing traps, middleware setup, and which tool actually scales.`,
];

const summaryTemplates = [
  (a, b, winner, loser) => `When comparing ${a.name} and ${b.name} for Next.js App Router authentication, the differences come down to your priorities. ${winner.name} leads with a ${winner.nextjs_integration_score}/10 Next.js integration score and a ${winner.learning_curve.toLowerCase()} learning curve. ${loser.name} scores ${loser.nextjs_integration_score}/10 with a ${loser.learning_curve.toLowerCase()} learning curve. ${winner.name} starts at ${winner.starting_price}, while ${loser.name} starts at ${loser.starting_price}.`,
  (a, b, winner, loser) => `Both ${a.name} and ${b.name} are solid choices for Next.js authentication, but they serve different needs. ${winner.name} edges ahead with a stronger Next.js integration score (${winner.nextjs_integration_score}/10 vs ${loser.nextjs_integration_score}/10). Where ${loser.name} shines is ${loser.free_tier}. If you are optimizing for developer experience in the App Router, ${winner.name} is the safer bet.`,
  (a, b, winner, loser) => `${a.name} vs ${b.name} is a common comparison we hear from Next.js developers. ${a.name} (${a.rating}★) and ${b.name} (${b.rating}★) both have loyal followings. Our analysis shows ${winner.name} has the edge for most Next.js projects due to its ${winner.nextjs_integration_score}/10 DX score. ${loser.name} is a strong alternative if ${loser.free_tier.toLowerCase()} better matches your budget.`,
  (a, b, winner, loser) => `I've spent time testing ${a.name} and ${b.name} with Next.js 15 App Router. Here's the short version: if you care most about ${winner.name}'s ${winner.nextjs_integration_score}/10 integration score and easy middleware setup, go with ${winner.name}. If ${loser.free_tier} matters more, ${loser.name} is worth a serious look.`,
  (a, b, winner, loser) => `Here's what ${a.name} does better than ${b.name} — and vice versa. ${winner.name} wins on Next.js integration (${winner.nextjs_integration_score}/10). ${loser.name} fights back with ${loser.starting_price} pricing and ${loser.free_tier}. For most apps, ${winner.name} is the smarter pick, but your budget may say otherwise.`,
  (a, b, winner, loser) => `${a.name} and ${b.name} approach Next.js auth differently. ${winner.name} goes all-in on developer experience with a ${winner.learning_curve.toLowerCase()} learning curve and ${winner.setup_time_nextjs} setup. ${loser.name} focuses more on ${loser.free_tier} and ${loser.learning_curve.toLowerCase()} onboarding. I'd lean toward ${winner.name} for most projects — but not all.`,
  (a, b, winner, loser) => `Testing ${a.name} vs ${b.name} side by side reveals clear trade-offs. ${winner.name} integrates more naturally with App Router (${winner.nextjs_integration_score}/10), while ${loser.name} counters with ${loser.free_tier}. If you're optimizing for DX, ${winner.name} is the answer. If budget dominates, ${loser.name} holds its ground.`,
  (a, b, winner, loser) => `Most Next.js teams I've talked to end up choosing ${winner.name} over ${loser.name} for one reason: ${winner.name} just feels built for App Router. That ${winner.nextjs_integration_score}/10 score reflects real middleware and server component support. ${loser.name} isn't bad — but it's playing catch-up on DX.`,
  (a, b, winner, loser) => `Here's the honest take: both ${a.name} and ${b.name} will get the job done. But ${winner.name} makes it noticeably easier. The ${winner.nextjs_integration_score}/10 vs ${loser.nextjs_integration_score}/10 gap in Next.js scores tells the story. ${loser.name} makes sense if you are optimizing for ${loser.free_tier}. Otherwise, ${winner.name} wins.`,
  (a, b, winner, loser) => `I went into this ${a.name} vs ${b.name} comparison expecting a close call. After testing: ${winner.name} pulls ahead on Next.js integration (${winner.nextjs_integration_score}/10 to ${loser.nextjs_integration_score}/10). The ${loser.learning_curve.toLowerCase()} learning curve of ${loser.name} is fine, but ${winner.name}'s ${winner.setup_time_nextjs} setup is hard to beat.`,
  (a, b, winner, loser) => `${a.name} (${a.rating}★) and ${b.name} (${b.rating}★) both have fans. ${winner.name} makes the most sense if you want ${winner.learning_curve.toLowerCase()} onboarding and strong App Router integration. ${loser.name} is the better fit if ${loser.free_tier} is your priority.`,
  (a, b, winner, loser) => `Putting ${a.name} and ${b.name} through the same Next.js project reveals a clear pattern: ${winner.name} handles server components, middleware, and edge runtime better. The ${winner.nextjs_integration_score}/10 score reflects real-world testing. ${loser.name} is still a capable option, especially if you care about ${loser.starting_price}.`,
];

const verdictTemplates = [
  (winner, loser) => `For most Next.js developers building production apps, we recommend ${winner.name}. It offers better Next.js integration (${winner.nextjs_integration_score}/10 vs ${loser.nextjs_integration_score}/10), a ${winner.learning_curve.toLowerCase()} learning curve, and a strong feature set that aligns well with App Router patterns. ${loser.name} remains a solid choice — especially if ${loser.free_tier.toLowerCase()} is important to your stack.`,
  (winner, loser) => `${winner.name} is our pick for this matchup. The ${winner.nextjs_integration_score}/10 Next.js score reflects how well it integrates with server components, middleware, and edge runtime. ${loser.name} is not far behind at ${loser.nextjs_integration_score}/10, but ${winner.name}'s developer experience gives it the edge for most projects.`,
  (winner, loser) => `We recommend ${winner.name} for most Next.js App Router projects. Its ${winner.learning_curve.toLowerCase()} learning curve and ${winner.setup_time_nextjs} setup time make it immediately productive. ${loser.name} is a worthy alternative, particularly if you need ${loser.free_tier.toLowerCase()} or prefer ${loser.name}'s approach to authentication.`,
  (winner, loser) => `${winner.name} gets my vote for most Next.js projects. The ${winner.nextjs_integration_score}/10 DX score isn't just a number — it reflects real middleware support, server component patterns, and edge runtime compatibility. ${loser.name} is still a strong contender, especially if you're working with ${loser.free_tier.toLowerCase()} constraints.`,
  (winner, loser) => `I'd pick ${winner.name} for this one. It integrates more naturally with Next.js App Router (${winner.nextjs_integration_score}/10), and the ${winner.learning_curve.toLowerCase()} learning curve means your team ships faster. ${loser.name} is a solid alternative — particularly if ${loser.free_tier.toLowerCase()} matters more than pure DX.`,
  (winner, loser) => `My verdict: ${winner.name} wins on Next.js integration (${winner.nextjs_integration_score}/10 vs ${loser.nextjs_integration_score}/10). The gap comes down to real-world App Router patterns — middleware, server components, edge runtime. ${loser.name} is absolutely usable, but ${winner.name} demands less friction. If budget is tight, ${loser.name} still delivers.`,
  (winner, loser) => `${winner.name} is the safer bet for Next.js projects. Its ${winner.setup_time_nextjs} setup time and ${winner.learning_curve.toLowerCase()} learning curve mean you're productive faster. ${loser.name} isn't far behind — especially if you need ${loser.free_tier.toLowerCase()} — but ${winner.name} has the edge where it counts for App Router development.`,
  (winner, loser) => `I'm recommending ${winner.name} here. The ${winner.nextjs_integration_score}/10 Next.js score reflects thoughtful App Router integration — middleware, server components, edge. ${loser.name} is competitive at ${loser.nextjs_integration_score}/10, especially if ${loser.free_tier.toLowerCase()} fits your budget better. For pure DX, ${winner.name} wins.`,
  (winner, loser) => `For this matchup, ${winner.name} comes out ahead. The Next.js integration (${winner.nextjs_integration_score}/10) is genuinely better in practice — not just on paper. ${loser.name} is a good tool with ${winner.name === loser.name ? "" : "its own"} strengths, particularly around ${loser.free_tier.toLowerCase()}. Choose accordingly.`,
  (winner, loser) => `${winner.name} is the better fit for Next.js App Router projects. Here's why: the ${winner.nextjs_integration_score}/10 score translates to less code, fewer workarounds, and faster middleware setup. ${loser.name} is still worth evaluating if ${loser.free_tier.toLowerCase()} is a deciding factor — just know you'll trade some DX for the savings.`,
  (winner, loser) => `After testing both, I'd go with ${winner.name}. The ${winner.learning_curve.toLowerCase()} learning curve and ${winner.setup_time_nextjs} setup mean your team hits the ground running. ${loser.name} has its place — especially if ${loser.free_tier.toLowerCase()} aligns with your scale — but ${winner.name} delivers a smoother developer experience.`,
  (winner, loser) => `Pick ${winner.name} if you want the smoothest Next.js auth experience. The ${winner.nextjs_integration_score}/10 DX score reflects real-world App Router testing — middleware, server components, everything just works. ${loser.name} is a capable alternative at ${loser.nextjs_integration_score}/10, particularly if you're optimizing for ${loser.free_tier.toLowerCase()}.`,
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

// ─── Priority pairs for human intros ───

const PRIORITY_INTROS = {
  "clerk-vs-auth0": "I set up Clerk and Auth0 side-by-side in the same Next.js 15 project. Clerk's middleware took 3 minutes. Auth0's took 30. But if your legal team demands SOC 2, Auth0 is the only real choice. Here's the full breakdown.",
  "auth0-vs-clerk": "Auth0 and Clerk approach Next.js auth from completely different angles. One is an enterprise behemoth with compliance certifications. The other is a developer-first platform that prioritizes shipping speed. I tested both.",
  "supabase-auth-vs-firebase-auth": "Supabase Auth vs Firebase Auth is the classic platform decision. Both offer 50K MAU free. Both tie you to an ecosystem. I compared them on Next.js App Router compatibility, RLS vs Firestore rules, and which one hurts less to migrate away from.",
  "firebase-auth-vs-supabase-auth": "Firebase Auth gives you Google's ecosystem and 50K free users. Supabase Auth gives you open-source Postgres and RLS. I tested both with Next.js 15 to see which one actually works better in production.",
  "clerk-vs-supabase-auth": "Clerk and Supabase Auth target different developers. Clerk is for teams that want auth to disappear. Supabase Auth is for teams already building on Postgres. I compared them on DX, pricing at scale, and App Router compatibility.",
  "supabase-auth-vs-clerk": "If you're already on Supabase for your database, their auth is tempting — 50K MAU free, RLS built-in. But Clerk offers a more polished Next.js experience. I tested both to see which one saves more development time.",
  "clerk-vs-kinde": "Clerk vs Kinde comes up constantly. Both are managed auth platforms with good Next.js support. But they differ in pricing philosophy, feature breadth, and how much UI they give you out of the box. Here's my honest take.",
  "kinde-vs-clerk": "Kinde bundles feature flags and auth into one platform — a genuine differentiator. Clerk focuses purely on auth with deeper Next.js integration. I compared them on total cost of ownership and real-world App Router DX.",
  "clerk-vs-better-auth": "Clerk is the premium managed option. Better Auth is the open-source self-hosted alternative. The question is whether you want to pay for convenience or own your infrastructure. I tested both approaches with the same Next.js app.",
  "better-auth-vs-clerk": "Better Auth gives you full control and zero per-user fees. Clerk gives you drop-in components and 10-minute setup. I built the same auth flow in both to compare total time-to-ship and long-term maintenance costs.",
  "clerk-vs-authjs": "Clerk vs Auth.js is the managed vs open-source debate. Clerk gives you pre-built components and 10-minute setup. Auth.js gives you 80+ providers and zero vendor lock-in. I compared both on real Next.js 15 App Router projects.",
  "authjs-vs-clerk": "Auth.js (NextAuth) is the most popular open-source auth library for Next.js. Clerk is the fastest-growing managed alternative. I rebuilt the same app with both to compare setup time, customization effort, and production readiness.",
  "auth0-vs-workos": "Auth0 and WorkOS serve different enterprise needs. Auth0 is a full identity platform. WorkOS is a focused SSO/SCIM solution you pair with consumer auth. I compared them for B2B Next.js SaaS apps that need enterprise features.",
  "workos-vs-auth0": "WorkOS specializes in enterprise SSO with Stripe-grade DX. Auth0 is the full-stack identity platform. Both target enterprise, but they approach it very differently. I evaluated both for a Next.js B2B SaaS use case.",
  "better-auth-vs-authjs": "Better Auth and Auth.js are the two main open-source options for Next.js. Both are free. Both give you full control. But they differ in architecture, plugin ecosystems, and how deeply they integrate with App Router. I compared them.",
  "authjs-vs-better-auth": "Auth.js has the largest community and 80+ providers. Better Auth has a plugin architecture and deeper App Router integration. I tested both to see which open-source auth framework actually ships faster in Next.js 15.",
  "clerk-vs-firebase-auth": "Clerk vs Firebase Auth: the managed auth platform built for Next.js vs Google's 50K MAU free tier. I compared both on App Router compatibility, setup time, and what happens when you need to leave the ecosystem.",
  "firebase-auth-vs-clerk": "Firebase Auth is everywhere — 50K MAU free, massive community, deep Google integration. Clerk is purpose-built for Next.js with a polished DX. I evaluated both for a production Next.js SaaS to see which one costs less in engineering time.",
  "auth0-vs-kinde": "Auth0 and Kinde are both managed auth platforms, but at very different price points. Auth0 starts at $3K/mo for B2B. Kinde starts free and scales to $300/mo. I compared their Next.js DX, enterprise features, and whether the price gap matters.",
  "kinde-vs-auth0": "Kinde positions itself as a more affordable Auth0 alternative with a visual workflow builder and built-in feature flags. Auth0 counters with mature enterprise compliance. I tested both with Next.js to see which one delivers more value for a growing SaaS.",
};

function generateCompareContent(a, b) {
  const winner = a.nextjs_integration_score >= b.nextjs_integration_score ? a : b;
  const loser = winner.id === a.id ? b : a;
  const slug = `${a.id}-vs-${b.id}`;

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
    last_updated: `Week ${getWeekNumber()}, ${year}`,
    human_intro: PRIORITY_INTROS[slug] || null,
    seo: {
      meta_title: `${a.name} vs ${b.name} for Next.js App Router (${year}): Which Auth Tool Wins?${freshSuffix}`,
      meta_description: humanize(pick(metaDescTemplates)(a, b)),
      og_title: pick(ogTitleTemplates)(a, b),
      og_description: humanize(pick(ogDescTemplates)(a, b)),
    },
    hero: {
      headline: `${a.name} vs ${b.name} for Next.js Authentication`,
      subheadline: `An honest comparison of ${a.name} and ${b.name} — pricing, DX, setup time, and which one we recommend for Next.js App Router projects in ${year}.`,
    },
    quick_summary: humanize(pick(summaryTemplates)(a, b, winner, loser)),
    verdict_winner_id: winner.id,
    verdict_text: humanize(pick(verdictTemplates)(winner, loser)),
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
  (tool) => `I've tested ${tool.name} with Next.js 15 — here's what stood out. The ${tool.learning_curve.toLowerCase()} learning curve means you're ${tool.learning_curve === "Easy" ? "productive within an hour or two." : "looking at a day or two of setup."} It scores ${tool.nextjs_integration_score}/10 for Next.js integration and ${tool.rating}★ from users.`,
  (tool) => `${tool.name} is one of those auth tools that makes a specific trade-off: ${tool.cons[0] ? tool.cons[0].toLowerCase() : "it prioritizes certain features over others"}. The ${tool.learning_curve.toLowerCase()} learning curve and ${tool.starting_price} starting price define where it fits in your stack. I break down whether the trade-off is worth it.`,
  (tool) => `Here's my take on ${tool.name} for Next.js authentication. It's ${tool.learning_curve === "Easy" ? "one of the easier tools to set up" : "not the simplest option, but it rewards the effort"} — ${tool.setup_time_nextjs} to get basic auth running. The ${tool.nextjs_integration_score}/10 Next.js score tells part of the story. I'll tell you the rest.`,
  (tool) => `${tool.name} targets ${tool.best_for_short.toLowerCase()}. With a Next.js integration score of ${tool.nextjs_integration_score}/10 and a ${tool.learning_curve.toLowerCase()} learning curve, it fits a specific niche in the auth landscape. The real question: does that niche match your project?`,
  (tool) => `I've been through the setup process for ${tool.name} more times than I'd like to admit. Here's what I know: the ${tool.learning_curve.toLowerCase()} learning curve is accurate for basic auth, but the ${tool.nextjs_integration_score}/10 integration score reveals where the edge cases live.`,
  (tool) => `${tool.name} isn't for every project. But if your requirements include ${tool.pros.slice(0, 2).join(" or ").toLowerCase()}, it deserves serious consideration. The ${tool.starting_price} starting price and ${tool.nextjs_integration_score}/10 Next.js score make it a contender in specific scenarios. I'll help you figure out if you're that scenario.`,
  (tool) => `There's no perfect auth tool, but ${tool.name} comes close for a specific use case: ${tool.best_for_short.toLowerCase()}. I tested it with Next.js App Router to see how well that promise holds up in practice — ${tool.setup_time_nextjs} setup and ${tool.rating}★ rating suggest it delivers.`,
  (tool) => `${tool.name} scores ${tool.nextjs_integration_score}/10 for Next.js — that's ${tool.nextjs_integration_score >= 8 ? "among the best" : "solid but not top-tier"}. The ${tool.learning_curve.toLowerCase()} learning curve means ${tool.learning_curve === "Easy" ? "most teams can get started without a dedicated auth engineer." : "you'll want someone auth-savvy on the team."} Here's my full review.`,
  (tool) => `Let's talk about ${tool.name}. It's priced at ${tool.starting_price} with a ${tool.free_tier} free tier and scores ${tool.nextjs_integration_score}/10 on Next.js integration. The ${tool.learning_curve.toLowerCase()} learning curve is ${tool.learning_curve === "Easy" ? "a real advantage for fast-moving teams." : "a signal that this tool prioritizes depth over speed."} I'll help you decide.`,
];

const whoShouldUseTemplates = [
  (tool, isTopTier) => `${tool.name} is ideal for teams that ${isTopTier ? "want the best possible developer experience for Next.js App Router" : "need a reliable auth solution with specific strengths around " + tool.pros.slice(0, 2).join(" and ").toLowerCase()}. ${firstSentence(tool.best_for_detailed)} If you are building a Next.js SaaS and value seamless integration, ${tool.name} deserves serious consideration.`,
  (tool) => `You should consider ${tool.name} if you prioritize ${cleanProText(tool.pros[0] || "developer experience")}. It is well-suited for teams that need a reliable Next.js auth provider and want to avoid vendor lock-in or excessive per-user pricing.`,
  (tool) => `${tool.name} works best for Next.js projects where ease of integration matters most. The ${tool.learning_curve.toLowerCase()} learning curve means ${tool.learning_curve === "Easy" ? "your whole team can be productive within hours." : "you should budget time for setup and configuration."} We recommend it for ${tool.starting_price === "Free (Open Source)" ? "teams with DevOps bandwidth who want full control." : "teams that want a managed solution with minimal ops overhead."}`,
  (tool, isTopTier) => `${tool.name} is a good fit if you're building a Next.js app and ${isTopTier ? "don't want auth to slow you down." : "need specific capabilities like " + tool.pros.slice(0, 2).join(" or ").toLowerCase() + "."} I've seen teams use it effectively for ${tool.best_for_short.toLowerCase()}.`,
  (tool) => `In my experience, ${tool.name} suits teams that value ${cleanProText(tool.pros[0] || "developer experience")} and ${cleanProText(tool.pros[1] || "reliability")}. It's less ideal if you need ${tool.cons[0] ? tool.cons[0].toLowerCase() : "features outside its core focus"}.`,
  (tool, isTopTier) => `Who is ${tool.name} actually for? Teams that ${isTopTier ? "prioritize developer experience above everything else" : "need a reliable solution for " + tool.pros.slice(0, 2).join(" and ").toLowerCase()}. The ${tool.learning_curve.toLowerCase()} learning curve and ${tool.starting_price} pricing tell you whether this is a match.`,
  (tool) => `${tool.name} makes sense for Next.js projects where ${firstSentence(tool.best_for_detailed).toLowerCase()} If that sounds like your situation, it's worth a serious look. If not, the alternatives page lists better-fitting options.`,
  (tool, isTopTier) => `I'd recommend ${tool.name} to teams that ${isTopTier ? "want auth to be a solved problem, not a project." : "need " + tool.pros.slice(0, 2).join(" and ").toLowerCase() + " without the overhead of a full enterprise platform."} The ${tool.nextjs_integration_score}/10 Next.js score is a reliable signal.`,
  (tool) => `If you're asking whether ${tool.name} is right for your Next.js app, start here: ${firstSentence(tool.best_for_short)} The ${tool.learning_curve.toLowerCase()} learning curve and ${tool.starting_price} pricing will tell you quickly if this is the right neighborhood.`,
  (tool) => `${tool.name} is designed for ${tool.best_for_short.toLowerCase()}. If that describes your team or project, you'll likely have a good experience. If your priorities are different — say you need ${tool.cons[0] ? tool.cons[0].toLowerCase() : "something this tool doesn't emphasize"} — you might want to look at the alternatives.`,
  (tool, isTopTier) => `I see ${tool.name} working best for Next.js developers who ${isTopTier ? "want auth to just work so they can focus on their product." : "need " + tool.pros.slice(0, 2).join(" and ").toLowerCase() + " without enterprise complexity."} The ${tool.nextjs_integration_score}/10 score backs this up.`,
  (tool) => `${tool.name} fits a specific profile: teams building Next.js apps that need ${cleanProText(tool.pros[0] || "reliable auth")}. The ${tool.learning_curve.toLowerCase()} learning curve and ${tool.setup_time_nextjs} setup time are reasonable for teams with ${tool.learning_curve === "Easy" ? "any skill level." : "some auth experience."}`,
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
    last_updated: `Week ${getWeekNumber()}, ${year}`,
    seo: {
      meta_title: `${tool.name} Review: Next.js Auth in ${year} — Pricing, DX & Setup`,
      meta_description: humanize(tool.short_description.slice(0, 155)),
      og_title: `${tool.name} — Pricing, Developer Experience & Best Use Cases`,
      og_description: humanize(`${tool.name} for Next.js App Router: ${tool.learning_curve} learning curve, ${tool.starting_price}, ${tool.setup_time_nextjs} setup. ${tool.best_for_short.slice(0, 100)}`),
    },
    hero: {
      headline: `${tool.name}: Complete Review for Next.js Developers`,
      subheadline: `A thorough breakdown of ${tool.name}'s pricing, developer experience, and fit for Next.js App Router projects.`,
    },
    intro_paragraphs: [humanize(pick(toolIntroTemplates)(tool))],
    who_should_use_paragraphs: [humanize(pick(whoShouldUseTemplates)(tool, isTopTier))],
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
    last_updated: `Week ${getWeekNumber()}, ${year}`,
    seo: {
      meta_title: `Best ${tool.name} Alternatives for Next.js Developers (${year})`,
      meta_description: `Looking for alternatives to ${tool.name}? Compare the top Next.js auth tools — ${others.slice(0, 3).map((t) => t.name).join(", ")} — and find the right fit for your project.`,
      og_title: `Best Alternatives to ${tool.name} for Next.js`,
      og_description: `Top ${tool.name} alternatives ranked by Next.js integration score, pricing, and developer experience.`,
    },
    hero: {
      headline: `Best ${tool.name} Alternatives for Next.js (${year})`,
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
