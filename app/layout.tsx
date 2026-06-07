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
  (19) كُلًّا نُمِدُّ هَٰٓؤُلَآءِ وَهَٰٓؤُلَآءِ مِنۡ
  عَطَآءِ رَبِّكَۚ وَمَا كَانَ عَطَآءُ رَبِّكَ مَحۡظُورًا (20)
  مَّا يَفۡتَحِ ٱللَّهُ لِلنَّاسِ مِن رَّحۡمَةٖ
  فَلَا مُمۡسِكَ لَهَا
*/
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteName = "NextAuthCompare";
const siteTagline = "Compare the best Next.js authentication tools. In-depth reviews, pricing breakdowns, and developer experience analysis.";
const siteUrl = "https://saaspolarbeam.vercel.app";

export const metadata: Metadata = {
  title: { default: siteName, template: `%s - ${siteName}` },
  description: siteTagline,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description: siteTagline,
    siteName: siteName,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
              {siteName}
            </a>
            <nav className="flex items-center gap-1">
              <a href="/" className="nav-link px-3 py-2 text-sm">Home</a>
              <a href="/" className="nav-link px-3 py-2 text-sm">Compare Tools</a>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <main className="py-8 sm:py-12">{children}</main>
        </div>

        <footer className="border-t border-blue-100 bg-white/50">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">{siteName}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{siteTagline}</p>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">Home</a>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800">Popular Comparisons</h3>
                <div className="space-y-2 text-sm text-slate-500">
                  <a href="/compare/clerk-vs-auth0" className="block hover:text-blue-600 transition-colors">Clerk vs Auth0</a>
                  <a href="/compare/supabase-auth-vs-firebase-auth" className="block hover:text-blue-600 transition-colors">Supabase Auth vs Firebase Auth</a>
                  <a href="/compare/authjs-vs-clerk" className="block hover:text-blue-600 transition-colors">Auth.js vs Clerk</a>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-blue-100 pt-6 text-center text-sm text-slate-400">
              <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
              <p className="mt-1">This site contains affiliate links. We may earn a commission if you purchase through these links.</p>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
