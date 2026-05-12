// بسم الله الرحمن الرحيم
// قُلِ ادْعُوا اللَّهَ أَوِ ادْعُوا الرَّحْمَٰنَ ۖ أَيًّا مَّا تَدْعُوا فَلَهُ الْأَسْمَاءُ الْحُسْنَىٰ ۚ وَلَا تَجْهَرْ بِصَلَاتِكَ وَلَا تُخَافِتْ بِهَا وَابْتَغِ بَيْنَ ذَٰلِكَ سَبِيلًا (110) وَقُلِ الْحَمْدُ لِلَّهِ الَّذِي لَمْ يَتَّخِذْ وَلَدًا وَلَمْ يَكُن لَّهُ شَرِيكٌ فِي الْمُلْكِ وَلَمْ يَكُن لَّهُ وَلِيٌّ مِّنَ الذُّلِّ ۖ وَكَبِّرْهُ تَكْبِيرًا (111)
// ما شاء الله لا قوة الا بالله

import type { Metadata } from "next";
import { getSite } from "@/lib/data";
import "./globals.css";

const site = getSite();

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
  return (
    <html lang="en">

      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <header className="mb-8 border-b border-gray-200 pb-4">
            <a href="/" className="text-xl font-bold tracking-tight text-blue-600">
              {site.name}
            </a>
          </header>
          <main>{children}</main>
          <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <p className="mt-1">
              This site contains affiliate links. We may earn a commission if you purchase through these links.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
