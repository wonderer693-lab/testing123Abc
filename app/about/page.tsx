import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Methodology — NextAuthCompare",
  description:
    "How we review and compare Next.js authentication tools. Our testing methodology, scoring criteria, and editorial standards for honest, data-driven comparisons.",
  openGraph: {
    title: "About & Methodology — How We Compare Next.js Auth Tools",
    description:
      "Transparent methodology behind every comparison. See how we test, score, and review authentication providers for Next.js applications.",
    locale: "en_US",
    siteName: "NextAuthCompare",
  },
  twitter: {
    card: "summary_large_image",
    title: "About & Methodology — How We Compare Next.js Auth Tools",
    description:
      "Transparent methodology behind every comparison on NextAuthCompare.",
    site: "@saaspolarbeam",
    creator: "@saaspolarbeam",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        About & Methodology
      </h1>
      <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
        How we research, test, and compare Next.js authentication tools.
      </p>

      <section className="mb-10">
        <h2 className="section-title text-xl">Who We Are</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          NextAuthCompare is an independent comparison site built by developers
          who work daily with Next.js authentication. We got tired of bouncing
          between documentation pages, pricing calculators, and GitHub repos to
          figure out which auth provider actually fits a given project.
        </p>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Every comparison on this site is grounded in real code, real API
          docs, and real pricing pages. We do not accept payment to influence
          rankings, scores, or verdicts.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">How We Compare</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Each head-to-head comparison evaluates two providers across five
          dimensions:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Next.js Integration
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              How well the SDK works with App Router, Server Components, Route
              Handlers, and Middleware. We check for ready-made adapters and
              edge runtime compatibility.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Developer Experience
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Setup time, documentation quality, TypeScript support, and
              community resources. We simulate onboarding for a new Next.js
              15 project.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Features & Flexibility
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Available auth methods (social, SSO, MFA), organization/tenant
              support, role-based access control, and customization options.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Pricing & Value
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Free-tier limits, MAU-based pricing, overage costs, and hidden
              fees for features like SSO or team management.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Production Readiness
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Uptime SLAs, data residency, compliance certifications (SOC 2,
              GDPR), audit logging, and migration tooling for leaving the
              provider.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Scoring</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Each dimension is scored 1&ndash;10 based on our research. An{" "}
          <strong>overall rating</strong> (1&ndash;5 stars) weights the
          dimensions according to what matters most for Next.js projects:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Next.js Integration &mdash; highest weight</li>
          <li>Developer Experience &mdash; high weight</li>
          <li>Features & Flexibility &mdash; medium weight</li>
          <li>Pricing & Value &mdash; medium weight</li>
          <li>Production Readiness &mdash; medium weight</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Editors&rsquo; Choice</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          The &ldquo;Our Pick&rdquo; winner in each comparison is the provider
          that scores higher overall for the specific needs of a Next.js
          developer. We also mark a <strong>category leading</strong> badge on
          providers that dominate their category (Managed Auth, Open Source,
          Platform-Bundled, Enterprise) across all comparisons.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Updates & Freshness</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          The authentication landscape changes fast. We refresh comparison data
          and scores on a rolling basis. Each comparison page shows its last
          updated date. If a provider ships a major update, we re-evaluate
          within two weeks.
        </p>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Found something outdated?{" "}
          <a
            href="https://github.com/saaspolarbeam/nextauthcompare/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Open an issue on GitHub
          </a>{" "}
          and we&rsquo;ll investigate.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl">Affiliate Disclosure</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Some of the links on this site are affiliate links. If you sign up
          for a provider through these links, we may earn a commission at no
          extra cost to you. This does{" "}
          <strong>not</strong> affect our rankings, scores, or editorial
          content. We only recommend tools we genuinely believe serve Next.js
          developers well.
        </p>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Full disclosure:{" "}
          <a
            href="/disclosure"
            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View our complete disclosure
          </a>
          .
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="section-title text-xl">Contact</h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          Questions, corrections, or feedback? Open a GitHub issue or reach out
          on X/Twitter{" "}
          <a
            href="https://x.com/saaspolarbeam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            @saaspolarbeam
          </a>
          .
        </p>
      </section>
    </div>
  );
}
