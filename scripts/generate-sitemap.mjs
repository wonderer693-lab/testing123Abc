import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read data from tools.json to generate routes dynamically
const dataPath = join(__dirname, "..", "data", "tools.json");
const raw = readFileSync(dataPath, "utf-8");
const data = JSON.parse(raw);

const BASE = data.site.url;

const routes = [
  { path: "", priority: 1.0, changefreq: "weekly" },
  { path: "/best", priority: 0.9, changefreq: "weekly" },
  ...data.audiences.map((a) => ({ path: `/for/${a.slug}`, priority: 0.8, changefreq: "monthly" })),
  ...data.problems.map((p) => ({ path: `/solves/${p.slug}`, priority: 0.7, changefreq: "monthly" })),
  ...data.tool.features.map((f) => ({ path: `/features/${f.slug}`, priority: 0.8, changefreq: "monthly" })),
  ...data.competitors.map((c) => ({ path: `/compare/${c.slug}`, priority: 0.8, changefreq: "monthly" })),
  ...data.guides.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.7, changefreq: "monthly" })),
  ...data.glossary.map((g) => ({ path: `/glossary/${g.slug}`, priority: 0.5, changefreq: "monthly" })),
];

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
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
console.log(`Sitemap generated at public/sitemap.xml with ${routes.length} routes`);
