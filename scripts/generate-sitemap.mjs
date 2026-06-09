import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataPath = join(__dirname, "..", "src", "data", "auth-tools.json");
let raw = readFileSync(dataPath, "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const tools = JSON.parse(raw);

const BASE = "https://saaspolarbeam.vercel.app";

const routes = [
  { path: "", priority: 1.0, changefreq: "weekly" },
];

for (const tool of tools) {
  routes.push({ path: `/tools/${tool.id}`, priority: 0.9, changefreq: "monthly" });
  routes.push({ path: `/tools/${tool.id}/alternatives`, priority: 0.8, changefreq: "monthly" });

  for (const other of tools) {
    if (tool.id !== other.id) {
      routes.push({ path: `/compare/${tool.id}-vs-${other.id}`, priority: 0.9, changefreq: "monthly" });
    }
  }
}

const today = new Date().toISOString().split("T")[0];
const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <lastmod>${today}</lastmod>
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
