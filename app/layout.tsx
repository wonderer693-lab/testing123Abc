/*
  بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ (1)
  ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ (2)
  ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ (3) مَٰلِكِ يَوۡمِ ٱلدِّينِ (4)
  إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ (5) ٱهۡدِنَا
  ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ (6) صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ
  عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ
  وَلَا ٱلضَّآلِّينَ (7)
*/

/*
  (109) قُلِ ادۡعُواْ ٱللَّهَ أَوِ ٱدۡعُواْ ٱلرَّحۡمَٰنَۖ أَيًّا مَّا تَدۡعُواْ
  فَلَهُ ٱلۡأَسۡمَآءُ ٱلۡحُسۡنَىٰۚ وَلَا تَجۡهَرۡ بِصَلَاتِكَ
  وَلَا تُخَافِتۡ بِهَا وَٱبۡتَغِ بَيۡنَ ذَٰلِكَ سَبِيلًا
  (110) وَقُلِ ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِي لَمۡ يَتَّخِذۡ وَلَدًا
  وَلَمۡ يَكُن لَّهُۥ شَرِيكٞ فِي ٱلۡمُلۡكِ وَلَمۡ يَكُن
  لَّهُۥ وَلِيّٞ مِّنَ ٱلذُّلِّۖ وَكَبِّرۡهُ تَكۡبِيرًا (111)
*/

/*
  مَّا شَآءَ ٱللَّهُ لَا قُوَّةَ إِلَّا بِٱللَّهِ
  (19) كُلًّا نُّمِدُّ هَٰٓؤُلَآءِ وَهَٰٓؤُلَآءِ مِنۡ
  عَطَآءِ رَبِّكَۚ وَمَا كَانَ عَطَآءُ رَبِّكَ مَحۡظُورًا (20)
  مَّا يَفۡتَحِ ٱللَّهُ لِلنَّاسِ مِن رَّحۡمَةٖ
  فَلَا مُمۡسِكَ لَهَا
*/
import type { Metadata } from "next";
import { getSite, getTool, getFeatures, getGuides, getCompetitors, getAudiences, getAffiliateLink, getAffiliateLinkSaaSUpgrade } from "@/lib/data";
import "./globals.css";

const site = getSite();
const tool = getTool();
const features = getFeatures();
const guides = getGuides();
const competitors = getCompetitors();
const audiences = getAudiences();

export const metadata: Metadata = {
  title: { default: site.name, template: `%s - ${site.name}` },
  description: site.tagline,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.name,
    description: site.tagline,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const trialLink = getAffiliateLink();
  const saasUpgradeLink = getAffiliateLinkSaaSUpgrade();
  return (
    <html lang="en">
      <body>
        <div className="sticky-nav">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight gradient-text-blue"
            >
              <svg width="28" height="28" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <circle cx="120" cy="120" r="110" fill="#F8FAFC"/>
                <g>
                  <path d="M120 20 L126 54 L160 60 L126 66 L120 100 L114 66 L80 60 L114 54 Z" fill="#0EA5E9"/>
                  <path d="M120 45 L123 57 L135 60 L123 63 L120 75 L117 63 L105 60 L117 57 Z" fill="#BAE6FD"/>
                </g>
                <g>
                  <path d="M40 200 L90 130 L140 200 Z" fill="#94A3B8" opacity="0.4"/>
                  <path d="M130 200 L180 140 L220 200 Z" fill="#94A3B8" opacity="0.4"/>
                  <path d="M30 220 L120 100 L210 220 Z" fill="#1E293B"/>
                  <path d="M120 100 L140 126 L125 132 L115 120 L100 130 L95 125 Z" fill="#F1F5F9"/>
                </g>
                <rect x="30" y="215" width="180" height="4" rx="2" fill="#0EA5E9"/>
              </svg>
              {site.name}
            </a>
            <nav className="hidden items-center gap-1 sm:flex">
              <div className="group relative">
                <button className="nav-link flex items-center gap-1 px-3 py-2 text-sm">
                  Industries
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="invisible absolute right-0 top-full z-50 w-56 rounded-xl border border-blue-100 bg-white/95 p-2 opacity-0 shadow-lg backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100">
                  {audiences.map((a) => (
                    <a key={a.slug} href={`/for/${a.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700">{a.name}</a>
                  ))}
                </div>
              </div>
              <div className="group relative">
                <button className="nav-link flex items-center gap-1 px-3 py-2 text-sm">
                  Features
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="invisible absolute right-0 top-full z-50 w-56 rounded-xl border border-blue-100 bg-white/95 p-2 opacity-0 shadow-lg backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100">
                  {features.map((f) => (
                    <a key={f.slug} href={`/features/${f.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700">{f.name}</a>
                  ))}
                </div>
              </div>
              <div className="group relative">
                <button className="nav-link flex items-center gap-1 px-3 py-2 text-sm">
                  Compare
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="invisible absolute right-0 top-full z-50 w-56 rounded-xl border border-blue-100 bg-white/95 p-2 opacity-0 shadow-lg backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100">
                  {competitors.map((c) => (
                    <a key={c.slug} href={`/compare/${c.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700">{tool.shortName} vs {c.name}</a>
                  ))}
                </div>
              </div>
              <div className="group relative">
                <button className="nav-link flex items-center gap-1 px-3 py-2 text-sm">
                  Resources
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="invisible absolute right-0 top-full z-50 w-56 rounded-xl border border-blue-100 bg-white/95 p-2 opacity-0 shadow-lg backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100">
                  {guides.map((g) => (
                    <a key={g.slug} href={`/guides/${g.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700">{g.name}</a>
                  ))}
                </div>
              </div>
              <a href="/best" className="nav-link px-3 py-2 text-sm">Best Picks</a>
              <a href={trialLink} target="_blank" rel="noopener noreferrer nofollow" className="ml-2 btn-primary !py-2 !px-4 text-sm">Start Free Trial</a>
            </nav>
            <details className="sm:hidden">
              <summary className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-slate-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </summary>
              <div className="absolute left-0 right-0 top-full z-50 border-b border-blue-100 bg-white/95 p-4 shadow-lg backdrop-blur-xl">
                <div className="space-y-1">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Industries</p>
                  {audiences.map((a) => (
                    <a key={a.slug} href={`/for/${a.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">{a.name}</a>
                  ))}
                  <hr className="my-2 border-blue-100" />
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Features</p>
                  {features.map((f) => (
                    <a key={f.slug} href={`/features/${f.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">{f.name}</a>
                  ))}
                  <hr className="my-2 border-blue-100" />
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Compare</p>
                  {competitors.map((c) => (
                    <a key={c.slug} href={`/compare/${c.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">{tool.shortName} vs {c.name}</a>
                  ))}
                  <hr className="my-2 border-blue-100" />
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Guides</p>
                  {guides.map((g) => (
                    <a key={g.slug} href={`/guides/${g.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-blue-50">{g.name}</a>
                  ))}
                  <hr className="my-2 border-blue-100" />
                  <a href="/best" className="block rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">Best Picks</a>
                  <a href={trialLink} target="_blank" rel="noopener noreferrer nofollow" className="mt-3 btn-primary block text-center text-sm">Start Free Trial</a>
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <main className="py-8 sm:py-12">{children}</main>
        </div>

        <footer className="border-t border-blue-100 bg-white/50">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <svg width="32" height="32" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                  <circle cx="120" cy="120" r="110" fill="#F8FAFC"/>
                  <g>
                    <path d="M120 20 L126 54 L160 60 L126 66 L120 100 L114 66 L80 60 L114 54 Z" fill="#0EA5E9"/>
                    <path d="M120 45 L123 57 L135 60 L123 63 L120 75 L117 63 L105 60 L117 57 Z" fill="#BAE6FD"/>
                  </g>
                  <g>
                    <path d="M40 200 L90 130 L140 200 Z" fill="#94A3B8" opacity="0.4"/>
                    <path d="M130 200 L180 140 L220 200 Z" fill="#94A3B8" opacity="0.4"/>
                    <path d="M30 220 L120 100 L210 220 Z" fill="#1E293B"/>
                    <path d="M120 100 L140 126 L125 132 L115 120 L100 130 L95 125 Z" fill="#F1F5F9"/>
                  </g>
                  <rect x="30" y="215" width="180" height="4" rx="2" fill="#0EA5E9"/>
                </svg>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">{site.name}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{site.tagline}</p>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">Quick Links</h3>
                <div className="space-y-2 text-sm text-slate-500">
                  <a href="/" className="block hover:text-blue-600 transition-colors">Home</a>
                  <a href="/best" className="block hover:text-blue-600 transition-colors">Best Picks</a>
                  <a href={trialLink} target="_blank" rel="noopener noreferrer nofollow" className="block hover:text-blue-600 transition-colors">Start Free Trial</a>
                  <a href={saasUpgradeLink} target="_blank" rel="noopener noreferrer nofollow" className="block text-xs text-slate-400 hover:text-blue-600 transition-colors">Already a member? Upgrade to SaaS Pro →</a>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">Popular</h3>
                <div className="space-y-2 text-sm text-slate-500">
                  {audiences.slice(0, 4).map((a) => (
                    <a key={a.slug} href={`/for/${a.slug}`} className="block hover:text-blue-600 transition-colors">{a.name}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-blue-100 pt-6 text-center text-sm text-slate-400">
              <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
              <p className="mt-1">This site contains affiliate links. We may earn a commission if you purchase through these links.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
