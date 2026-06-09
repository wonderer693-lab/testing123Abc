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
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import BackToTop from "@/components/BackToTop";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const siteName = "NextAuthCompare";
const siteTagline = "Compare the best Next.js authentication tools. In-depth reviews, pricing breakdowns, and developer experience analysis.";
const siteUrl = "https://saaspolarbeam.vercel.app";

export const viewport: Viewport = {
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  title: { default: siteName, template: `%s - ${siteName}` },
  description: siteTagline,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: siteName,
    description: siteTagline,
    siteName: siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteTagline,
    site: "@saaspolarbeam",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
        <div className="sticky-nav">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight gradient-text-blue"
            >
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect x="2" y="2" width="96" height="96" rx="20" fill="#EEF2FF"/>
                <rect x="2" y="2" width="96" height="96" rx="20" stroke="#4F46E5" strokeWidth="3"/>
                <path d="M50 18L22 35v14c0 18.7 11.7 36.2 28 43 16.3-6.8 28-24.3 28-43V35L50 18z" fill="#4F46E5" opacity="0.15"/>
                <path d="M50 24L28 38v11c0 15.3 9.6 29.6 22 35.2 12.4-5.6 22-19.9 22-35.2V38L50 24z" fill="#4F46E5"/>
                <path d="M43 52l5 5 9-9" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="22" y="85" fontSize="9" fontWeight="700" fill="#4F46E5" fontFamily="system-ui">&lt;/&gt;</text>
              </svg>
              {siteName}
            </a>
            <nav className="flex items-center gap-1">
              <a href="/" className="nav-link px-3 py-2 text-sm">Home</a>
              <a href="/#table-heading" className="nav-link px-3 py-2 text-sm">All Tools</a>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/#why-trust-heading" className="btn-ghost text-sm !py-2 max-sm:hidden">About</Link>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <main className="py-8 sm:py-12">{children}</main>
        </div>

        <footer className="border-t border-blue-100 bg-white/50 dark:border-slate-700 dark:bg-slate-900/50">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">{siteName}</h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{siteTagline}</p>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">Quick Links</h3>
                <div className="space-y-2">
                  <a href="/" className="block text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Home</a>
                  <a href="/#comparisons-grid" className="block text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">All Comparisons</a>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">Popular Comparisons</h3>
                <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <a href="/compare/clerk-vs-auth0" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Clerk vs Auth0</a>
                  <a href="/compare/supabase-auth-vs-firebase-auth" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Supabase Auth vs Firebase Auth</a>
                  <a href="/compare/authjs-vs-clerk" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Auth.js vs Clerk</a>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-blue-100 pt-6 text-center text-sm text-slate-400 dark:border-slate-700 dark:text-slate-500">
              <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
              <p className="mt-1">This site contains affiliate links. We may earn a commission if you purchase through these links.</p>
            </div>
          </div>
        </footer>
        <BackToTop />
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
