# Newborn pSEO Plan — NextAuthCompare

**Niche:** Authentication tools for Next.js App Router (micro-niche)
**Scale:** 10 tools, 111 existing routes
**Strategy:** Standard newborn pSEO techniques + UX laws applied

---

## Core Philosophy

For a newborn site, the goal is **traction, not scale**. 111 routes is enough. The focus is:

1. **Content depth** — each page must feel human-written, not templated
2. **SEO fundamentals** — unique metadata, internal linking, schema, topical authority
3. **UX that builds trust** — Jacob's Law patterns, Hick's Law simplicity, Miller's Law chunking
4. **Zero complexity** — no AI API, no Phase 2 routes, no build pipeline changes

---

## UX Laws Applied

| Law | Application |
|-----|------------|
| **Jacob's Law** | Standard comparison table layout, pros/cons format, breadcrumb nav. Users already know this pattern from other review/comparison sites. |
| **Hick's Law** | Don't show all 90 comparisons at once. Group tools into categories (Managed vs Self-hosted, Free vs Paid). |
| **Miller's Law** | Show 5-7 items per grouping. Alternatives page shows 5. Categories show 5-7 tools. |
| **Fitts's Law** | CTAs are large buttons, sticky bottom bar, close to relevant content. |
| **Law of Proximity** | Pricing, score, and rating shown together. Related comparisons grouped. |
| **Law of Similarity** | All comparison cards look identical. All tool pages follow same template. |
| **Postel's Law** | Graceful fallbacks if content files are missing. |

---

## SEO Fundamentals for Newborn Sites

1. **Long-tail keyword targeting** — "Clerk vs Auth0 for Next.js App Router" > "auth comparison"
2. **Topic cluster model** — Homepage = pillar page, compare pages = cluster content
3. **Unique metadata per page** — every compare page gets unique title + meta description
4. **Internal linking** — every page links to 3+ related pages
5. **Schema markup** — Product, FAQ, Breadcrumb, Organization on every relevant page
6. **Content freshness** — "Updated 2026" badge on every page

---

## Implementation Steps

### Step 1: Create `content/types.ts`
TypeScript interfaces for generated content (5 page types).

### Step 2: Create `scripts/generate-content.mjs`
Deterministic Node.js script that reads `auth-tools.json` and writes rich content JSON files. No AI API. Uses template-based generation with variable sentence structures to avoid templated feel.

Generates:
- 90 `content/compare/{a}-vs-{b}.json` — rich comparison content
- 10 `content/tools/{slug}/page.json` — enhanced tool content  
- 10 `content/tools/{slug}/alternatives.json` — enhanced alternatives content

### Step 3: Generate content files
Run `npm run precontent` to populate `content/` directory.

### Step 4: Update `app/compare/[slug]/page.tsx`
Consume generated content JSON with graceful fallback to current inline logic.

### Step 5: Update `app/tools/[slug]/page.tsx`
Same pattern — consume content JSON with fallback.

### Step 6: Update `app/tools/[slug]/alternatives/page.tsx`
Same pattern.

### Step 7: Better internal linking
Add "Browse by category" hub to homepage. Categories: Managed Auth, Open Source, Enterprise, Free Tier.

---

## What We Are NOT Doing (anti-scope)

- ❌ No Phase 2 routes (performance, pricing, security)
- ❌ No AI API calls (OpenAI/Anthropic)
- ❌ No build pipeline changes
- ❌ No new npm dependencies
- ❌ No `content/` directory changes to the sitemap

---

## File Checklist

| # | Action | File |
|---|--------|------|
| 1 | Create | `content/types.ts` |
| 2 | Create | `scripts/generate-content.mjs` |
| 3 | Run | `npm run precontent` → populate `content/` |
| 4 | Update | `app/compare/[slug]/page.tsx` |
| 5 | Update | `app/tools/[slug]/page.tsx` |
| 6 | Update | `app/tools/[slug]/alternatives/page.tsx` |
| 7 | Update | `app/page.tsx` (hub categories on homepage) |
| 8 | Verify | `npm run build` passes |
