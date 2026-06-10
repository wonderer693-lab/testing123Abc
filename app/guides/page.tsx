import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Auth Guides & Tutorials — Setup, Migration, Pricing",
  description: "Step-by-step guides for setting up authentication in Next.js App Router, migrating between providers, and comparing pricing. Clerk, Supabase Auth, Auth.js, and more.",
  openGraph: {
    title: "Next.js Auth Guides — Setup, Migration & Pricing",
    description: "Practical guides for Next.js authentication: setup tutorials, migration walkthroughs, and pricing comparisons across all major providers.",
    type: "article",
    locale: "en_US",
    siteName: "NextAuthCompare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Auth Guides — Setup, Migration & Pricing",
    description: "Practical guides for Next.js authentication.",
    site: "@saaspolarbeam",
    creator: "@saaspolarbeam",
  },
};

interface GuideMeta {
  slug: string;
  tag: string;
  title: string;
  desc: string;
}

const GUIDES: GuideMeta[] = [
  { slug: "setup-clerk-nextjs", tag: "Tutorial", title: "How to Set Up Clerk in Next.js 15", desc: "Step-by-step guide to adding Clerk authentication to Next.js App Router. Install the SDK, configure middleware, and add sign-in in under 10 minutes." },
  { slug: "setup-supabase-auth-nextjs", tag: "Tutorial", title: "How to Set Up Supabase Auth in Next.js 15", desc: "Complete guide to integrating Supabase Auth with Next.js App Router. Server component auth, RLS policies, and middleware setup explained." },
  { slug: "setup-better-auth-nextjs", tag: "Tutorial", title: "How to Set Up Better Auth in Next.js", desc: "Step-by-step guide to integrating Better Auth with Next.js App Router. Self-hosted authentication with server component support and middleware." },
  { slug: "setup-kinde-nextjs", tag: "Tutorial", title: "How to Set Up Kinde in Next.js 15", desc: "Guide to adding Kinde authentication to Next.js App Router. Feature flags, middleware setup, and auth components." },
  { slug: "migrate-auth0-to-clerk", tag: "Migration", title: "How to Migrate from Auth0 to Clerk", desc: "Step-by-step migration guide from Auth0 to Clerk for Next.js apps. User data export, middleware migration, and rollback strategy." },
  { slug: "migrate-auth0-to-supabase-auth", tag: "Migration", title: "How to Migrate from Auth0 to Supabase Auth", desc: "Complete migration guide from Auth0 to Supabase Auth for Next.js. User export, RLS setup, cost comparison, and checklist." },
  { slug: "migrate-firebase-to-supabase-auth", tag: "Migration", title: "How to Migrate from Firebase Auth to Supabase Auth", desc: "Guide to migrating from Firebase Auth to Supabase Auth for Next.js apps. User export, RLS policies, and avoiding downtime." },
  { slug: "migrate-authjs-to-clerk", tag: "Migration", title: "How to Migrate from Auth.js to Clerk", desc: "Step-by-step migration from Auth.js (NextAuth) to Clerk for Next.js apps. Provider migration, session handling, and middleware changes." },
  { slug: "nextjs-auth-middleware", tag: "Guide", title: "Next.js Auth Middleware Guide — All Providers Compared", desc: "How to protect routes with authentication middleware in Next.js App Router. Compare middleware across Clerk, Supabase Auth, Auth.js, and more." },
  { slug: "nextjs-auth-pricing-guide", tag: "Guide", title: "Next.js Auth Pricing Guide 2026 — Which Provider Saves the Most?", desc: "Compare pricing across Clerk, Auth0, Supabase Auth, Firebase Auth, and more. Free tier limits, MAU pricing, and hidden costs." },
];

const PILL_COLORS: Record<string, string> = {
  Tutorial: "pill-blue",
  Migration: "pill-amber",
  Guide: "pill-green",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        Guides & Tutorials
      </h1>
      <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
        Step-by-step tutorials, migration walkthroughs, and pricing guides for Next.js authentication.
      </p>

      <div className="space-y-3">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="card-solid block p-4 hover:ring-2 hover:ring-blue-400 transition-all"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className={`pill ${PILL_COLORS[g.tag]} !text-xs`}>{g.tag}</span>
            </div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-200">{g.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{g.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
