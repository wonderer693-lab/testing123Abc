import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadGuideContent } from "@/lib/content-loader";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema, articleSchema, faqSchema } from "@/lib/schema";
import FaqSection from "@/components/FaqSection";

const siteUrl = "https://saaspolarbeam.vercel.app";

const GUIDES = [
  "setup-clerk-nextjs", "setup-supabase-auth-nextjs", "setup-better-auth-nextjs", "setup-kinde-nextjs",
  "migrate-auth0-to-clerk", "migrate-auth0-to-supabase-auth", "migrate-firebase-to-supabase-auth", "migrate-authjs-to-clerk",
  "nextjs-auth-middleware", "nextjs-auth-pricing-guide",
];

export function generateStaticParams() {
  return GUIDES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = loadGuideContent(slug);
  if (!content) return {};

  return {
    title: content.seo.meta_title,
    description: content.seo.meta_description,
    alternates: { canonical: `${siteUrl}/guides/${slug}` },
    openGraph: {
      title: content.seo.og_title,
      description: content.seo.og_description,
      type: "article",
      locale: "en_US",
      siteName: "NextAuthCompare",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.og_title,
      description: content.seo.og_description.slice(0, 120),
      site: "@saaspolarbeam",
      creator: "@saaspolarbeam",
    },
  };
}

const TITLES: Record<string, string> = {
  "setup-clerk-nextjs": "Setup Clerk in Next.js",
  "setup-supabase-auth-nextjs": "Setup Supabase Auth in Next.js",
  "setup-better-auth-nextjs": "Setup Better Auth in Next.js",
  "setup-kinde-nextjs": "Setup Kinde in Next.js",
  "migrate-auth0-to-clerk": "Migrate Auth0 to Clerk",
  "migrate-auth0-to-supabase-auth": "Migrate Auth0 to Supabase Auth",
  "migrate-firebase-to-supabase-auth": "Migrate Firebase to Supabase Auth",
  "migrate-authjs-to-clerk": "Migrate Auth.js to Clerk",
  "nextjs-auth-middleware": "Auth Middleware Guide",
  "nextjs-auth-pricing-guide": "Pricing Guide",
};

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = loadGuideContent(slug);
  if (!content) notFound();

  const label = TITLES[slug] || slug.replace(/-/g, " ");

  return (
    <>
      <SchemaMarkup schema={articleSchema(content.seo.meta_title, content.seo.meta_description, content.last_updated || new Date().toISOString().split("T")[0])} />
      <SchemaMarkup schema={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Guides", url: "/guides" }, { name: label, url: `/guides/${slug}` }])} />
      <SchemaMarkup schema={faqSchema(content.faq.map((f) => ({ q: f.question, a: f.answer })))} />

      <Breadcrumb className="mb-6" items={[
        { name: "Home", url: "/" },
        { name: "Guides", url: "/guides" },
        { name: label, url: `/guides/${slug}` },
      ]} />

      <div className="mx-auto max-w-3xl animate-fade-in">
        <div className="mb-4 flex items-center gap-2">
          <span className="pill pill-blue">Guide</span>
          {content.last_updated && (
            <span className="text-xs text-slate-400 dark:text-slate-500">Updated {content.last_updated}</span>
          )}
        </div>

        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          {content.hero.headline}
        </h1>
        <p className="mb-8 text-base leading-relaxed text-slate-500 dark:text-slate-400">
          {content.hero.subheadline}
        </p>

        <div className="space-y-8">
          {content.sections.map((section, i) => (
            <section key={i}>
              <h2 className="mb-3 text-xl font-bold text-slate-800 dark:text-slate-200">{section.heading}</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <FaqSection items={content.faq.map((f) => ({ q: f.question, a: f.answer }))} />
        </div>
      </div>
    </>
  );
}
