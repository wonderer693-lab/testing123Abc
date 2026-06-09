import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — NextAuthCompare",
  description: "How NextAuthCompare makes money through affiliate links. Transparency about our affiliate partnerships and how they support our work.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Affiliate Disclosure — NextAuthCompare",
    description: "Transparency about our affiliate partnerships with authentication tool providers.",
    locale: "en_US",
    siteName: "NextAuthCompare",
  },
  twitter: {
    card: "summary",
    title: "Affiliate Disclosure — NextAuthCompare",
    description: "Transparency about our affiliate partnerships. We may earn commissions from some links.",
    site: "@saaspolarbeam",
  },
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Affiliate Disclosure
      </h1>

      <div className="prose prose-slate max-w-none dark:prose-invert space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        <p>
          NextAuthCompare is an independent comparison site that provides detailed analysis of Next.js authentication tools. 
          To support this site and keep our content free for readers, we participate in affiliate marketing programs.
        </p>

        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">How Affiliate Links Work</h2>
        <p>
          When you click on an affiliate link on this site and make a purchase, we may earn a small commission at no extra cost to you. 
          These commissions help cover the costs of hosting, research, and content creation.
        </p>

        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Our Commitment to Honesty</h2>
        <p>
          Affiliate partnerships <strong>do not</strong> influence our rankings, reviews, or recommendations. 
          We evaluate each tool based on its features, pricing, developer experience, and real-world performance. 
          Our verdicts are our own opinions, shaped by hands-on testing and practitioner experience.
        </p>
        <p>
          If a tool is rated poorly, we will say so — regardless of whether we have an affiliate relationship. 
          Your trust matters more than a commission.
        </p>

        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Which Programs We Participate In</h2>
        <p>
          We are affiliates for the following tools (note: this list may change over time):
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Clerk (via their affiliate program)</li>
          <li>Kinde (via their affiliate program)</li>
          <li>Better Auth (open source — no affiliate program)</li>
          <li>Auth.js (open source — no affiliate program)</li>
          <li>Supabase Auth (via Supabase affiliate program)</li>
          <li>Auth0 (via Okta affiliate program)</li>
          <li>Logto (via their affiliate program)</li>
          <li>WorkOS (via their affiliate program)</li>
          <li>Firebase Auth (via Google — no affiliate program)</li>
          <li>Descope (via their affiliate program)</li>
        </ul>
        <p className="text-xs text-slate-400">
          Tools marked as "open source — no affiliate program" are linked for informational purposes only.
        </p>

        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Questions?</h2>
        <p>
          If you have any questions about our affiliate relationships or how we make money, 
          please reach out via our GitHub repository.
        </p>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Last updated: June 2026. This disclosure is required by the FTC and reflects our commitment to transparency.
          </p>
        </div>
      </div>
    </div>
  );
}
