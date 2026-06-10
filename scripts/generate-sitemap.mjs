import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataPath = join(__dirname, "..", "src", "data", "auth-tools.json");
let raw = readFileSync(dataPath, "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const tools = JSON.parse(raw);

const BASE = "https://saaspolarbeam.vercel.app";

const PRIORITY_PAIRS = new Set([
  "auth0-vs-clerk",
  "auth0-vs-kinde",
  "auth0-vs-workos",
  "authjs-vs-better-auth",
  "authjs-vs-clerk",
  "better-auth-vs-clerk",
  "clerk-vs-firebase-auth",
  "clerk-vs-kinde",
  "clerk-vs-supabase-auth",
  "firebase-auth-vs-supabase-auth",
]);

const routes = [
  { path: "", priority: 1.0, changefreq: "weekly" },
  { path: "/compare", priority: 0.9, changefreq: "weekly" },
  { path: "/about", priority: 0.5, changefreq: "monthly" },
  { path: "/disclosure", priority: 0.1, changefreq: "yearly" },
  { path: "/best", priority: 0.9, changefreq: "weekly" },
  { path: "/compare/pricing", priority: 0.8, changefreq: "monthly" },
];

for (const tool of tools) {
  routes.push({ path: `/tools/${tool.id}`, priority: 0.9, changefreq: "monthly" });
  routes.push({ path: `/tools/${tool.id}/alternatives`, priority: 0.8, changefreq: "monthly" });
}

for (const pair of PRIORITY_PAIRS) {
  routes.push({ path: `/compare/${pair}`, priority: 0.9, changefreq: "monthly" });
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
