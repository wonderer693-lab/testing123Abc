import { writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE = "https://saaspolarbeam.vercel.app";

const routes = [
  { path: "", priority: 1.0 },
  { path: "/for/marketing-agencies", priority: 0.8 },
  { path: "/for/real-estate", priority: 0.8 },
  { path: "/for/small-business", priority: 0.8 },
  { path: "/for/coaches-consultants", priority: 0.8 },
  { path: "/for/local-services", priority: 0.8 },
  { path: "/solves/missed-leads", priority: 0.8 },
  { path: "/solves/tool-sprawl", priority: 0.8 },
  { path: "/solves/slow-followup", priority: 0.8 },
  { path: "/solves/no-shows", priority: 0.8 },
  { path: "/solves/low-reviews", priority: 0.8 },
  { path: "/solves/manual-processes", priority: 0.8 },
];

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

const outDir = join(__dirname, "..", "public");
writeFileSync(join(outDir, "sitemap.xml"), sitemap, "utf-8");
console.log("Sitemap generated at public/sitemap.xml");
