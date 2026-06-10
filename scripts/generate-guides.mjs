import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dataPath = join(__dirname, "..", "src", "data", "auth-tools.json");
let raw = readFileSync(dataPath, "utf-8");
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const tools = JSON.parse(raw);

const GUIDES_DIR = join(__dirname, "..", "content", "guides");

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = (now - start) / 86400000;
  return Math.ceil((diff + start.getDay() + 1) / 7);
}

const BANNED_WORDS = /\b(delve|tapestry|pivotal|showcase|underscore|vibrant|testament|fostering|garner|interplay|intricate|landscape|showcasing|revolutionize|game-changer|cutting-edge|next-generation|seamlessly|robust|empower|empowers|empowering|unlock|unlocks|unlocking|leverage|leveraging|utilize|utilizing|facilitate|facilitating|holistic|comprehensive|transformative|paradigm)\b/gi;

function humanize(text) {
  if (!text || text.length < 20) return text;
  let result = text;
  const bannedMatches = result.match(BANNED_WORDS);
  if (bannedMatches && bannedMatches.length > 0) {
    console.warn(`  [humanize] Found banned words: ${[...new Set(bannedMatches)].join(", ")}`);
    result = result.replace(BANNED_WORDS, (match) => {
      const replacements = {
        delve: "look into", tapestry: "mix", pivotal: "key", showcase: "show",
        underscore: "highlight", vibrant: "lively", testament: "proof",
        fostering: "helping", garner: "get", interplay: "interaction",
        intricate: "complex", landscape: "space", showcasing: "showing",
        revolutionize: "change", "game-changer": "important", "cutting-edge": "modern",
        "next-generation": "new", seamlessly: "smoothly", robust: "solid",
        empower: "help", empowers: "helps", empowering: "helping",
        unlock: "access", unlocks: "opens", unlocking: "opening",
        leverage: "use", leveraging: "using", utilize: "use",
        utilizing: "using", facilitate: "support", facilitating: "supporting",
        holistic: "complete", comprehensive: "thorough", transformative: "transformative",
        paradigm: "model",
      };
      return replacements[match.toLowerCase()] || match;
    });
  }
  result = result.replace(/Not only.*?but also/gi, (m) => m.replace(/Not only /i, "").replace(/,? but also/, " and"));
  result = result.replace(/\u2014/g, " \u2013 ");
  const sentences = result.split(/(?<=\.)\s+/);
  if (sentences.length > 2) {
    const intros = ["Honestly,", "Here's the thing:", "Look,", "The short version:", "In practice,", "Real talk:"];
    result = sentences.map((s, i) => i > 0 && i < sentences.length - 1 && Math.random() < 0.15 ? pick(intros) + " " + s[0].toLowerCase() + s.slice(1) : s).join(" ");
  }
  return result;
}

const week = `Week ${getWeekNumber()}, ${new Date().getFullYear()}`;
const year = new Date().getFullYear();

function getTool(name) {
  return tools.find((t) => t.id === name);
}

// ─── Guide definitions ───

const GUIDES = [
  {
    id: "setup-clerk-nextjs",
    tool: "clerk",
  },
  {
    id: "setup-supabase-auth-nextjs",
    tool: "supabase-auth",
  },
  {
    id: "setup-better-auth-nextjs",
    tool: "better-auth",
  },
  {
    id: "setup-kinde-nextjs",
    tool: "kinde",
  },
  {
    id: "migrate-auth0-to-clerk",
    toolA: "auth0",
    toolB: "clerk",
  },
  {
    id: "migrate-auth0-to-supabase-auth",
    toolA: "auth0",
    toolB: "supabase-auth",
  },
  {
    id: "migrate-firebase-to-supabase-auth",
    toolA: "firebase-auth",
    toolB: "supabase-auth",
  },
  {
    id: "migrate-authjs-to-clerk",
    toolA: "authjs",
    toolB: "clerk",
  },
  {
    id: "nextjs-auth-middleware",
  },
  {
    id: "nextjs-auth-pricing-guide",
  },
];

// ─── SEO templates per guide ───

const SEO = {
  "setup-clerk-nextjs": () => ({
    meta_title: `How to Set Up Clerk in Next.js 15 (${year} Guide)`,
    meta_description: `Step-by-step guide to adding Clerk authentication to Next.js App Router. Install the SDK, configure middleware, and add sign-in in under 10 minutes.`,
    og_title: `Clerk Next.js Setup Guide — Full Walkthrough`,
    og_description: `Learn how to add Clerk authentication to your Next.js App Router project with this practical setup guide. Middleware, components, and server helpers included.`,
  }),
  "setup-supabase-auth-nextjs": () => ({
    meta_title: `How to Set Up Supabase Auth in Next.js 15 (${year} Guide)`,
    meta_description: `Complete guide to integrating Supabase Auth with Next.js App Router. Server component auth, RLS policies, and middleware setup explained.`,
    og_title: `Supabase Auth + Next.js — Setup Guide`,
    og_description: `Integrate Supabase Auth with Next.js App Router: server component helpers, RLS, middleware, and the Supabase JavaScript SDK.`,
  }),
  "setup-better-auth-nextjs": () => ({
    meta_title: `How to Set Up Better Auth in Next.js 15 (${year} Guide)`,
    meta_description: `Step-by-step guide to integrating Better Auth with Next.js App Router. Self-hosted authentication with server component support and middleware.`,
    og_title: `Better Auth Next.js Setup — Complete Guide`,
    og_description: `Learn how to set up Better Auth with Next.js App Router. Self-hosted auth with middleware, server helpers, and database integration.`,
  }),
  "setup-kinde-nextjs": () => ({
    meta_title: `How to Set Up Kinde in Next.js 15 (${year} Guide)`,
    meta_description: `Guide to adding Kinde authentication to Next.js App Router. Feature flags, middleware setup, and auth components explained step by step.`,
    og_title: `Kinde Next.js Integration — Setup Walkthrough`,
    og_description: `Set up Kinde authentication in Next.js App Router. Includes middleware configuration, auth components, and Kinde's feature flag system.`,
  }),
  "migrate-auth0-to-clerk": () => ({
    meta_title: `How to Migrate from Auth0 to Clerk (${year} Migration Guide)`,
    meta_description: `Step-by-step migration guide from Auth0 to Clerk for Next.js apps. User data export, middleware migration, and rollback strategy included.`,
    og_title: `Auth0 to Clerk Migration — Next.js Guide`,
    og_description: `Migrate your Next.js app from Auth0 to Clerk. User export, session migration, middleware changes, and how to handle the transition safely.`,
  }),
  "migrate-auth0-to-supabase-auth": () => ({
    meta_title: `How to Migrate from Auth0 to Supabase Auth (${year} Guide)`,
    meta_description: `Complete migration guide from Auth0 to Supabase Auth for Next.js. User export, RLS setup, cost comparison, and migration checklist.`,
    og_title: `Auth0 to Supabase Auth Migration — Full Guide`,
    og_description: `Migrate from Auth0 to Supabase Auth and save on pricing. Step-by-step user migration, RLS policy setup, and Next.js integration changes.`,
  }),
  "migrate-firebase-to-supabase-auth": () => ({
    meta_title: `How to Migrate from Firebase Auth to Supabase Auth (${year} Guide)`,
    meta_description: `Guide to migrating from Firebase Auth to Supabase Auth for Next.js apps. User export, RLS policies, realtime setup, and avoiding downtime.`,
    og_title: `Firebase Auth to Supabase Auth — Migration Guide`,
    og_description: `Migrate your Next.js app from Firebase Auth to Supabase Auth. User data migration, RLS vs Firestore rules, and cost implications.`,
  }),
  "migrate-authjs-to-clerk": () => ({
    meta_title: `How to Migrate from Auth.js to Clerk (${year} Guide)`,
    meta_description: `Step-by-step migration from Auth.js (NextAuth) to Clerk for Next.js apps. Provider migration, session handling, and middleware changes.`,
    og_title: `Auth.js to Clerk Migration — Next.js Guide`,
    og_description: `Migrate from Auth.js (NextAuth) to Clerk in your Next.js app. User data export, session migration, and drop-in component setup.`,
  }),
  "nextjs-auth-middleware": () => ({
    meta_title: `Next.js Auth Middleware Guide (${year}) — All Providers Compared`,
    meta_description: `How to protect routes with authentication middleware in Next.js App Router. Compare middleware setup across Clerk, Supabase Auth, Auth.js, and more.`,
    og_title: `Next.js Auth Middleware — Complete Guide (${year})`,
    og_description: `Learn how to protect routes using authentication middleware in Next.js App Router. Provider comparisons, edge runtime tips, and common pitfalls.`,
  }),
  "nextjs-auth-pricing-guide": () => ({
    meta_title: `Next.js Auth Pricing Guide ${year} — Which Provider Saves the Most?`,
    meta_description: `Compare pricing across Clerk, Auth0, Supabase Auth, Firebase Auth, and more. Free tier limits, MAU pricing, and hidden costs exposed.`,
    og_title: `Next.js Auth Pricing Comparison — ${year} Guide`,
    og_description: `Complete pricing breakdown for all major Next.js auth providers. Free tiers, MAU limits, scaling costs, and which provider saves you the most.`,
  }),
};

const SECTION_TEMPLATES = {
  "setup-clerk-nextjs": (tool) => [
    {
      heading: "Prerequisites",
      body: `Before installing Clerk, make sure you have a Next.js 15+ project with the App Router enabled. You'll also need a Clerk account — sign up at clerk.com (the free tier covers up to 10K MAU). No credit card required for the free plan.`,
    },
    {
      heading: "Install the Clerk SDK",
      body: `Run \`npm install @clerk/nextjs\` in your project root. The package provides everything you need: \`auth()\` and \`currentUser()\` server helpers, plus client-side components like \`<SignIn/>\` and \`<UserButton/>\`. Make sure you're using the latest version — Clerk ships updates frequently for App Router compatibility.`,
    },
    {
      heading: "Set environment variables",
      body: `Create a \`.env.local\` file in your project root. Add \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_yourkey\` and \`CLERK_SECRET_KEY=sk_test_yourkey\`. You'll find both keys in the Clerk Dashboard under API Keys. Don't commit these to Git — add \`.env.local\` to your \`.gitignore\` if it isn't already there.`,
    },
    {
      heading: "Wrap your app with ClerkProvider",
      body: `Open \`app/layout.tsx\` and wrap your children with \`<ClerkProvider>\`. This provides the auth context to your entire app. Import it from \`@clerk/nextjs\`. Place it outside any \`<html>\` or \`<body>\` tags in the root layout.`,
    },
    {
      heading: "Add middleware for route protection",
      body: `Create or edit \`middleware.ts\` in your project root. Export a default middleware function that matches public and protected routes. Clerk's middleware runs at the edge, so there's no server-side latency for auth checks. You can configure public routes (like \`/\` and \`/about\`) and protected routes (like \`/dashboard\`) using the \`publicRoutes\` and \`ignoredRoutes\` options.`,
    },
    {
      heading: "Add sign-in and sign-up pages",
      body: `Clerk provides pre-built components for authentication pages. Create \`app/sign-in/[[...sign-in]]/page.tsx\` and add \`<SignIn/>\`. Do the same for sign-up. Clerk handles the UI, validation, session management, and redirects automatically. You can customize the appearance through the Clerk Dashboard without touching code.`,
    },
    {
      heading: "Access user data in server components",
      body: `Use \`auth()\` and \`currentUser()\` from \`@clerk/nextjs/server\` in your server components and API routes. \`auth()\` returns the session and user ID — useful for database queries and authorization checks. \`currentUser()\` returns the full user object. Both work seamlessly with React Server Components and the App Router's data fetching patterns.`,
    },
    {
      heading: "Deploy and test",
      body: `Build your project with \`npm run build\` and deploy to Vercel. Set the same environment variables in your Vercel project settings. Test sign-in, protected routes, and the middleware behavior. Clerk's dashboard gives you real-time analytics on sign-ups, active users, and error rates.`,
    },
  ],

  "setup-supabase-auth-nextjs": (tool) => [
    {
      heading: "Prerequisites",
      body: `You'll need a Next.js 15+ App Router project and a Supabase project (create one at supabase.com — the free tier includes 50K MAU, unlimited API requests, and 500MB database). Install the Supabase JavaScript SDK and the helper library.`,
    },
    {
      heading: "Install dependencies",
      body: `Run \`npm install @supabase/supabase-js @supabase/ssr\`. The \`@supabase/ssr\` package is specifically designed for Next.js App Router — it handles cookie-based session management for server components, middleware, and API routes. Without it, you'd need to manage session cookies manually.`,
    },
    {
      heading: "Create a Supabase client",
      body: `Create \`lib/supabase/client.ts\` for browser-side usage and \`lib/supabase/server.ts\` for server components. Use \`createBrowserClient\` and \`createServerClient\` from \`@supabase/ssr\`. Both need your Supabase URL and anon key from the Supabase dashboard under Project Settings > API.`,
    },
    {
      heading: "Set up middleware",
      body: `Create \`middleware.ts\` that refreshes the Supabase session on every request. Use \`createMiddlewareClient\` from \`@supabase/ssr\` to handle cookie management. Define your protected and public routes. The middleware runs at the edge, so there's no cold start penalty for session checks.`,
    },
    {
      heading: "Add sign-up and sign-in flows",
      body: `Supabase Auth supports email/password, magic link, OAuth (Google, GitHub, etc.), and phone auth. Create pages for sign-in and sign-up using Supabase's \`signInWithPassword\` or \`signInWithOAuth\` methods. For magic links, use \`signInWithOtp\`. Store the session after successful authentication using \`setSession\`.`,
    },
    {
      heading: "Protect routes with RLS",
      body: `Supabase's Row Level Security is one of its biggest advantages. Define RLS policies in the Supabase dashboard that reference \`auth.uid()\`. This way, your database queries automatically respect the authenticated user — even if a developer forgets to check auth in the application code. RLS policies are written in plain SQL.`,
    },
    {
      heading: "Access user in server components",
      body: `Use the server client created earlier. Call \`await supabase.auth.getUser()\` in your server components or API routes. The \`@supabase/ssr\` package handles cookie parsing and session validation automatically. You can also use Supabase's realtime features to listen for auth state changes.`,
    },
    {
      heading: "Verify it works",
      body: `Run a full build and test the flow: sign up, sign in, access protected routes, and verify that RLS policies are preventing unauthorized access. Check the Supabase dashboard for auth logs and active sessions. The free tier analytics show sign-up sources and active user counts.`,
    },
  ],

  "setup-better-auth-nextjs": (tool) => [
    {
      heading: "Prerequisites",
      body: `Better Auth is an open-source authentication library for Next.js. You'll need a Next.js 15+ App Router project and a database (SQLite for development, PostgreSQL or MySQL for production). Better Auth uses a database adapter pattern — it supports Drizzle, Prisma, and Kysely out of the box.`,
    },
    {
      heading: "Install Better Auth",
      body: `Run \`npm install better-auth\`. If you're using Prisma, also install \`@better-auth/prisma-adapter\`. For Drizzle, use \`@better-auth/drizzle-adapter\`. Better Auth is designed as a single dependency — no separate auth server or external service required.`,
    },
    {
      heading: "Set up the auth server",
      body: `Create \`app/api/auth/[...all]/route.ts\`. Export a handler from \`better-auth\` that exposes all auth endpoints (sign-in, sign-up, session, etc.). Better Auth generates a REST API that your frontend components call. Configure your database adapter, session settings, and enabled providers here.`,
    },
    {
      heading: "Configure database schema",
      body: `If using Prisma, run \`npx better-auth generate\` to create the migration files for user, session, account, and verification tables. Then run \`npx prisma db push\` or \`npx prisma migrate dev\` to apply them. Better Auth handles all the schema management — you don't need to write table definitions by hand.`,
    },
    {
      heading: "Add middleware for route protection",
      body: `Create \`middleware.ts\` that checks the Better Auth session cookie on every request. Better Auth provides a \`getSessionFromCookie\` helper for edge middleware. Define public routes (landing page, auth pages) and protected routes (dashboard, settings) in your middleware config.`,
    },
    {
      heading: "Build auth UI components",
      body: `Unlike Clerk, Better Auth doesn't ship pre-built UI components. You'll build your own sign-in and sign-up forms using the Better Auth client SDK. Call \`authClient.signIn.email()\` or \`authClient.signUp.email()\` from client components. The benefit is full control over the UI — the cost is more frontend code to write.`,
    },
    {
      heading: "Add social login providers",
      body: `Better Auth supports OAuth providers (Google, GitHub, Discord, etc.) through its plugin system. Install \`@better-auth/oauth\` and configure providers in your auth server setup. Each provider requires a client ID and secret from the provider's developer console. Better Auth handles the OAuth flow end to end.`,
    },
    {
      heading: "Test and deploy",
      body: `Run \`npm run build\` and verify your auth flows work end to end. Since Better Auth is self-hosted, deployment requires setting up environment variables for your database connection string and any OAuth secrets. The lack of per-user pricing makes Better Auth the most cost-effective option at scale — you only pay for your infrastructure.`,
    },
  ],

  "setup-kinde-nextjs": (tool) => [
    {
      heading: "Prerequisites",
      body: `You'll need a Next.js 15+ App Router project and a Kinde account (kinde.com — free tier includes 7,500 MAU). Kinde bundles authentication with feature flags, which means you get two products in one integration. No credit card required to start.`,
    },
    {
      heading: "Install the Kinde SDK",
      body: `Run \`npm install @kinde-oss/kinde-auth-nextjs\`. This SDK provides server-side helpers for Next.js App Router, including middleware integration, session management, and pre-built components. Kinde's SDK is framework-specific — the Next.js package has different APIs than the React or Node.js versions.`,
    },
    {
      heading: "Set environment variables",
      body: `Add the following to your \`.env.local\`: \`KINDE_CLIENT_ID\`, \`KINDE_CLIENT_SECRET\`, \`KINDE_ISSUER_URL\`, \`KINDE_SITE_URL\`, and \`KINDE_POST_LOGOUT_REDIRECT_URL\`. You'll find these in the Kinde Dashboard under Settings > API. The issuer URL includes your Kinde subdomain — it looks like \`https://yoursubdomain.kinde.com\`.`,
    },
    {
      heading: "Set up the Kinde provider",
      body: `Wrap your app with \`KindeProvider\` in the root layout. Unlike Clerk, Kinde's provider goes in a client component wrapper. Create \`components/KindeAuthProvider.tsx\` that wraps children with \`KindeProvider\`. Import it in \`app/layout.tsx\` and wrap your application.`,
    },
    {
      heading: "Add middleware",
      body: `Create \`middleware.ts\` using \`withKindeAuth\` from \`@kinde-oss/kinde-auth-nextjs/middleware\`. Define public and protected routes. Kinde's middleware handles session refresh, route protection, and redirect to login — all at the edge. You can customize the login page URL and callback behavior in the middleware config.`,
    },
    {
      heading: "Create auth pages",
      body: `Kinde hosts the authentication UI on its own domain (similar to Auth0's universal login). You don't build sign-in forms — Kinde handles them. Configure your login and registration screens in the Kinde Dashboard: brand colors, logo, and allowed redirect URLs. The hosted pages support passwordless, social login, and traditional email/password flows.`,
    },
    {
      heading: "Use feature flags",
      body: `Kinde's differentiator is built-in feature flags. Use \`useKindeFeatureFlag\` to check flags in client components, and \`getKindeFeatureFlag\` on the server. Feature flags are evaluated server-side, so there's no flash of hidden content. This is useful for rolling out auth-related features gradually.`,
    },
    {
      heading: "Verify the integration",
      body: `Build and deploy. Kinde's dashboard gives you analytics on sign-ups, active MAU, and feature flag usage. The free tier includes most features except enterprise SSO. Kinde's pricing scales to $300/mo at higher MAU tiers, which is more predictable than Clerk's $0 to $199 jump.`,
    },
  ],

  "migrate-auth0-to-clerk": (toolA, toolB) => [
    {
      heading: "Why migrate from Auth0 to Clerk?",
      body: `${toolA.name} starts at ${toolA.starting_price} with ${toolA.free_tier}. ${toolB.name} starts at ${toolB.starting_price} with ${toolB.free_tier}. Beyond pricing, ${toolB.name} offers deeper Next.js App Router integration with native server component helpers and drop-in UI components. Many teams migrate for the better developer experience, even if they're not at Auth0's pricing ceiling yet.`,
    },
    {
      heading: "Audit your current Auth0 setup",
      body: `Before migrating, document your Auth0 configuration: enabled connections (Google, GitHub, email/password), custom actions and rules, role-based access control (RBAC) settings, and any custom domains. Export your user database from the Auth0 Dashboard under User Management > Export. Auth0 supports JSON and CSV export formats.`,
    },
    {
      heading: "Set up Clerk and import users",
      body: `Create a Clerk account and configure your application. Use Clerk's Import API to migrate users — it accepts user data with hashed passwords if you're using bcrypt, or you can trigger password reset emails for existing users. Clerk's migration tool maps Auth0's user schema to Clerk's automatically. You can run a dry import first to verify the data.`,
    },
    {
      heading: "Update environment variables",
      body: `Replace Auth0 environment variables with Clerk's. You'll need \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\` and \`CLERK_SECRET_KEY\`. Remove Auth0 SDK dependencies (\`@auth0/auth0-nextjs\`) and install \`@clerk/nextjs\` instead. If you're using Auth0's Management API for admin operations, Clerk provides equivalent endpoints through its Backend API.`,
    },
    {
      heading: "Middleware migration",
      body: `Auth0 uses \`withPageAuthRequired\` and \`getSession\` for route protection. Clerk uses \`auth()\` middleware with \`publicRoutes\` and \`ignoredRoutes\` configuration. Rewrite your middleware.ts to use Clerk's edge-compatible auth check. Clerk's middleware is simpler — about 5 lines of code vs Auth0's 15-20 line setup.`,
    },
    {
      heading: "Component migration",
      body: `Replace Auth0's \`UserProvider\` wrapper with Clerk's \`<ClerkProvider>\`. Replace \`useUser()\` with Clerk's \`useUser()\` on the client, or \`currentUser()\` on the server. Auth0's custom login page gets replaced by Clerk's pre-built \`<SignIn/>\` and \`<SignUp/>\` components. If you customized Auth0's Lock UI, you'll need to rebuild the styling in Clerk's dashboard.`,
    },
    {
      heading: "Test the migration",
      body: `Test every auth flow: new user sign-up, existing user sign-in (both with and without password reset), social login, password reset, and session persistence. Verify that protected routes redirect unauthenticated users correctly. Test in a staging environment before cutting over production traffic.`,
    },
    {
      heading: "Rollback strategy",
      body: `Keep your Auth0 configuration active during the migration. Use a feature flag to toggle between auth providers. If issues arise, switch the flag back to Auth0. Once you've confirmed Clerk works for all users over a week, deactivate your Auth0 integration and clean up unused environment variables.`,
    },
  ],

  "migrate-auth0-to-supabase-auth": (toolA, toolB) => [
    {
      heading: "Why migrate from Auth0 to Supabase Auth?",
      body: `${toolA.name} starts at ${toolA.starting_price} with ${toolA.free_tier}. ${toolB.name} starts at ${toolB.starting_price} with ${toolB.free_tier}. Beyond the cost savings, Supabase Auth includes a Postgres database with Row Level Security — your auth and data live in the same system. For Next.js teams already using Supabase for their database, the auth migration is a natural consolidation.`,
    },
    {
      heading: "Export users from Auth0",
      body: `Go to Auth0 Dashboard > User Management > Users and export your user database. Auth0 supports JSON and CSV formats. Make sure to include email, user ID, and metadata fields. Auth0 doesn't export password hashes by default — you'll need to trigger password reset flows for existing users after the migration.`,
    },
    {
      heading: "Set up Supabase Auth",
      body: `Create a Supabase project and configure authentication in the Dashboard. Enable the providers you were using in Auth0 (email/password, Google, GitHub, etc.). Supabase supports most common OAuth providers. Configure your site URL and redirect URLs under Authentication > Settings.`,
    },
    {
      heading: "Import users into Supabase",
      body: `Supabase doesn't have a one-click user import from Auth0. Use the Supabase Management API or write a migration script that inserts users into the \`auth.users\` table. For passwordless migration, you can set a placeholder password and require users to reset on first login. Supabase's community has scripts for Auth0-to-Supabase user migration.`,
    },
    {
      heading: "Set up RLS policies",
      body: `Move your authorization logic from Auth0 Rules and Actions to Supabase Row Level Security. RLS policies are SQL statements that run at the database level — they're more performant and secure than application-level checks. Write policies using \`auth.uid()\` to reference the authenticated user. Test each policy with both authenticated and unauthenticated queries.`,
    },
    {
      heading: "Update Next.js middleware and components",
      body: `Replace Auth0's middleware with Supabase SSR middleware. Install \`@supabase/ssr\` and set up the server and browser clients. Replace Auth0's \`useUser()\` with Supabase's \`supabase.auth.getUser()\` for server components. On the client, use Supabase's \`onAuthStateChange\` listener to handle session events.`,
    },
    {
      heading: "Test everything in staging",
      body: `Deploy to a staging environment and test all flows: sign-up, sign-in, social login, password reset, and protected route access. Verify RLS policies are working by attempting unauthorized data access. Check that the Supabase dashboard shows active sessions and auth logs.`,
    },
    {
      heading: "Cut over and monitor",
      body: `When ready, update your DNS or Vercel environment variables to point to the Supabase configuration. Monitor the Supabase dashboard for auth errors, failed sign-ins, and unusual patterns. Keep Auth0 active for 1-2 weeks as a fallback. The Supabase Pro plan at $75/mo covers 50K MAU with most features included.`,
    },
  ],

  "migrate-firebase-to-supabase-auth": (toolA, toolB) => [
    {
      heading: "Why migrate from Firebase Auth to Supabase Auth?",
      body: `${toolA.name} gives you ${toolA.free_tier} with Google Cloud integration. ${toolB.name} matches with ${toolB.free_tier} plus an open-source Postgres database. The main reasons teams migrate: open-source stack (no vendor lock-in), Row Level Security (more flexible than Firestore rules), and consolidated auth + database in one platform. Pricing is similar at the free tier, but Supabase's Pro plan ($75/mo) includes more than Firebase's Blaze plan at equivalent usage.`,
    },
    {
      heading: "Export users from Firebase",
      body: `Use the Firebase Admin SDK to export users. Write a script that iterates through all users using \`listUsers()\` and exports email, UID, display name, and provider data. Firebase doesn't expose password hashes for security reasons — you'll need to migrate users with a password reset trigger. Google Cloud Identity Platform users can use the \`transferSAML\` and \`transferOIDC\` APIs for enterprise migrations.`,
    },
    {
      heading: "Set up Supabase Auth",
      body: `Create a Supabase project. Enable authentication providers matching your Firebase setup (email/password, Google, GitHub, Apple, etc.) in the Supabase Dashboard under Authentication > Providers. Configure your site URL, redirect URLs, and JWT expiry settings. Supabase uses JWTs for session management, similar to Firebase's ID tokens.`,
    },
    {
      heading: "Migrate user data with password reset",
      body: `Import users into Supabase's \`auth.users\` table via the Management API. Set a random password for each user and mark them as requiring password change. Write a script that sends password reset emails to all existing users, or prompt them to reset on first login. This is the safest approach — no user gets locked out permanently.`,
    },
    {
      heading: "Rewrite security rules",
      body: `Firebase uses Firestore Security Rules (a custom DSL). Supabase uses Row Level Security (standard SQL). Translate your rules: \`request.auth.uid == resource.data.user_id\` becomes \`auth.uid() = user_id\` in SQL. RLS is more expressive — you can write subqueries, join tables, and use functions. Test each policy with the Supabase SQL editor before deploying.`,
    },
    {
      heading: "Update Next.js code",
      body: `Replace Firebase SDK imports with Supabase SSR. Install \`@supabase/ssr\` and \`@supabase/supabase-js\`. Firebase's \`onAuthStateChanged\` becomes Supabase's \`onAuthStateChange\`. Server-side auth moves from Firebase Admin SDK to Supabase's \`createServerClient\`. The Supabase Realtime API replaces Firebase Realtime Database for live updates.`,
    },
    {
      heading: "Test in staging",
      body: `Deploy to a staging environment with both Firebase and Supabase running. Compare auth flows side by side. Test sign-up, sign-in, Google OAuth, password reset, and session persistence. Verify that RLS policies correctly scope data access. Run your test suite against both backends to catch subtle differences.`,
    },
    {
      heading: "Monitor after cutover",
      body: `Switch production traffic to Supabase. Monitor the Supabase dashboard for errors and active users. Keep Firebase configuration active for 2 weeks as a rollback option. The Supabase free tier (50K MAU) is generous — most projects won't need to upgrade for months. At scale, the Pro plan ($75/mo) is significantly cheaper than Firebase's consumption-based Blaze pricing for apps with steady traffic.`,
    },
  ],

  "migrate-authjs-to-clerk": (toolA, toolB) => [
    {
      heading: "Why migrate from Auth.js to Clerk?",
      body: `${toolA.name} (formerly NextAuth) is the most popular open-source auth library for Next.js with ${toolA.free_tier}. ${toolB.name} is the leading managed alternative with ${toolB.free_tier}. Teams migrate from Auth.js to Clerk for three reasons: pre-built UI components (no more building sign-in forms), managed session handling (no database sessions to maintain), and better edge runtime support (Auth.js struggles with edge middleware in some configurations).`,
    },
    {
      heading: "Audit your Auth.js configuration",
      body: `Document your Auth.js setup: enabled providers (credentials, OAuth, email), custom callbacks (JWT, session, signIn), database adapter configuration, and any middleware-based route protection. Auth.js config lives in \`app/api/auth/[...nextauth]/route.ts\` or \`app/api/auth/[...nextauth]/options.ts\`. Export your user data from your Auth.js database — sessions, accounts, and verification requests tables.`,
    },
    {
      heading: "Set up Clerk",
      body: `Create a Clerk account and configure matching providers. Auth.js supports 80+ providers — Clerk supports the most common ones (Google, GitHub, Microsoft, Apple, etc.) out of the box. For custom providers, Clerk's SDK supports OAuth 2.0 and OIDC. Set up your application in the Clerk Dashboard and note your publishable and secret keys.`,
    },
    {
      heading: "Replace the Auth.js API route",
      body: `Delete \`app/api/auth/[...nextauth]/route.ts\`. Clerk doesn't need a dedicated API route — the SDK handles everything through middleware and the \`<ClerkProvider>\`. This is one of the biggest simplifications: you remove an entire API route file and the associated configuration.`,
    },
    {
      heading: "Update middleware",
      body: `Auth.js middleware uses \`getToken()\` to check sessions. Clerk middleware uses the \`auth()\` helper with \`publicRoutes\` config. Rewrite your \`middleware.ts\` to use Clerk's helper. The config is simpler — define which routes are public instead of writing conditional logic. Clerk's middleware also handles edge runtime automatically, which requires manual configuration in Auth.js.`,
    },
    {
      heading: "Migrate components and hooks",
      body: `Replace \`useSession()\` and \`signIn()\`/ \`signOut()\` from \`next-auth/react\` with Clerk's \`useUser()\` and \`<SignIn/>\`/ \`<SignUp/>\` components. The biggest win: you delete your custom sign-in and sign-up forms. Add \`<UserButton/>\` for user menu — Auth.js has no equivalent built-in. Server-side auth moves from \`getServerSession()\` to Clerk's \`auth()\` and \`currentUser()\`.`,
    },
    {
      heading: "Handle callback differences",
      body: `Auth.js callback functions (\`jwt\`, \`session\`, \`signIn\`) let you customize token and session data. Clerk handles this through webhooks — create a webhook endpoint in \`app/api/webhooks/clerk/route.ts\`. Clerk sends events for user creation, update, and deletion. Map your custom callback logic to the appropriate webhook handlers. This is the most involved part of the migration.`,
    },
    {
      heading: "Test and roll out",
      body: `Deploy to staging and test every flow. Verify that existing users can sign in (they'll be created in Clerk on first successful login if you've enabled the appropriate settings — use Clerk's migration API for a cleaner experience). Test email/password, OAuth, and magic link flows. Run a parallel test where both Auth.js and Clerk are active, comparing behavior side by side.`,
    },
  ],

  "nextjs-auth-middleware": () => [
    {
      heading: "What is Next.js auth middleware?",
      body: `Middleware in Next.js App Router runs at the edge before every request. Auth middleware checks whether a user is authenticated and either allows the request through or redirects them to a login page. Unlike traditional server-side auth checks, middleware runs before the page renders — users never see a flash of protected content. Every major auth provider supports edge middleware, but the setup varies significantly.`,
    },
    {
      heading: "Clerk middleware setup",
      body: `Clerk's middleware is the simplest to configure. Create \`middleware.ts\`, import \`auth\` from \`@clerk/nextjs/server\`, and export \`auth().protect()\`. Define \`publicRoutes\` and \`ignoredRoutes\` in the config. Clerk handles session refresh, cookie rotation, and redirect URLs automatically. Total lines of code: about 5.`,
    },
    {
      heading: "Supabase Auth middleware setup",
      body: `Supabase SSR middleware uses \`createMiddlewareClient\` from \`@supabase/ssr\`. It refreshes the Supabase session cookie on every request. You need to manually define which routes are public and protected. Supabase's middleware is more verbose than Clerk's — about 15 lines — but gives you full control over cookie management and session refresh behavior.`,
    },
    {
      heading: "Auth.js middleware setup",
      body: `Auth.js middleware requires \`getToken()\` from \`next-auth/jwt\` and manual route matching. Create a config object with \`matcher\` to define which routes run through middleware. Auth.js middleware works at the edge but has known issues with some edge runtime configurations — test thoroughly if you're on Vercel Edge Functions. More boilerplate than Clerk or Supabase.`,
    },
    {
      heading: "Kinde middleware setup",
      body: `Kinde provides \`withKindeAuth\` from \`@kinde-oss/kinde-auth-nextjs/middleware\`. Similar to Clerk in simplicity — wrap your middleware export and define public routes. Kinde handles session refresh and login redirects automatically. The middleware checks the session cookie and redirects to Kinde's hosted login page for unauthenticated users.`,
    },
    {
      heading: "Better Auth middleware setup",
      body: `Better Auth uses its own \`getSessionFromCookie\` helper for edge middleware. Since Better Auth is self-hosted, you handle all cookie management. The middleware checks for a valid session cookie and redirects accordingly. More setup than managed providers, but no external service dependency. Better suited for teams that prefer infrastructure control over convenience.`,
    },
    {
      heading: "Common middleware pitfalls",
      body: `The most common issue is middleware running on every request, including static assets and API routes. Use Next.js \`config.matcher\` to limit middleware to specific paths. Another issue: forgetting to exclude auth API routes from middleware — this creates infinite redirect loops. Edge runtime has limited Node.js API support, so avoid \`fs\` or \`crypto\` in middleware.`,
    },
    {
      heading: "Which middleware should you choose?",
      body: `For most projects, Clerk or Kinde offer the simplest middleware setup. If you're on a budget, Supabase SSR middleware is well-documented and reliable. Auth.js middleware works for straightforward use cases but has edge case gotchas. Better Auth middleware gives you full control but requires more boilerplate. Match your middleware choice to your auth provider — mixing middleware and provider adds complexity.`,
    },
  ],

  "nextjs-auth-pricing-guide": () => {
    const rows = tools.map((t) => ({
      name: t.name,
      price: t.starting_price,
      free: t.free_tier,
      pitfall: t.pricing_pitfall,
    }));

    return [
      {
        heading: "Free tier comparison",
        body: `All major Next.js auth providers offer free tiers, but the limits vary dramatically. Clerk gives you ${rows.find((r) => r.name === "Clerk").free}. Supabase Auth and Firebase Auth both offer ${rows.find((r) => r.name === "Supabase Auth").free}. Better Auth and Auth.js are completely free since they're open-source. The free tier you choose should match your expected MAU for at least 6 months — migrating auth providers is costly.`,
      },
      {
        heading: "Pricing at scale (10K-50K MAU)",
        body: `At 10K-50K MAU, pricing differences become significant. ${rows.find((r) => r.name === "Clerk").name} jumps from Free to $199/mo at 20K MAU. ${rows.find((r) => r.name === "Supabase Auth").name} Pro costs $75/mo and covers 50K MAU. ${rows.find((r) => r.name === "Kinde").name} scales to $300/mo. ${rows.find((r) => r.name === "Auth0").name} starts at $3K+/mo for B2B features. Open-source options (Better Auth, Auth.js) cost nothing in licensing — only your infrastructure bills.`,
      },
      {
        heading: "Hidden costs to watch for",
        body: `${rows.find((r) => r.name === "Clerk").pitfall} ${rows.find((r) => r.name === "Auth0").pitfall} ${rows.find((r) => r.name === "Descope").pitfall} ${rows.find((r) => r.name === "Supabase Auth").pitfall} Beyond MAU limits, watch for: enterprise SSO upcharges, API rate limiting at lower tiers, database read costs for self-hosted solutions, and migration costs when you outgrow a provider.`,
      },
      {
        heading: "Open-source: free but not cheap",
        body: `Better Auth and Auth.js charge nothing for the software, but self-hosting has real costs: server infrastructure, database hosting, developer time for setup and maintenance, security patching, and scaling infrastructure as you grow. A self-hosted auth setup costs roughly $20-100/mo in infrastructure for a moderate-traffic app, plus engineering time. Compare this to $75-199/mo for managed solutions that include support and uptime SLAs.`,
      },
      {
        heading: "Enterprise pricing (100K+ MAU)",
        body: `At enterprise scale, Auth0 and WorkOS dominate. Auth0 starts around $3K/mo with a minimum commitment. WorkOS requires a sales call — expect $5K-25K+/year depending on SSO connections and SCIM provisioning. Clerk Enterprise exceeds $1K/mo. Supabase Auth at this scale costs $599/mo for the Team plan. Firebase Auth remains usage-based but can spike unpredictably. Open-source options scale cost-effectively if you have the DevOps expertise to manage them.`,
      },
      {
        heading: "Cost-saving strategies",
        body: `Start with an open-source or generous free tier (Supabase Auth or Better Auth). Don't commit to an expensive enterprise plan until you have product-market fit. Use a single auth provider — multiple providers multiply costs and complexity. Negotiate enterprise pricing: most providers offer 20-40% discounts on annual commitments. Factor in migration costs when choosing — switching from Clerk to Supabase costs engineering time.`,
      },
      {
        heading: "Which provider saves the most?",
        body: `For a hobby project (under 1K MAU): any free tier works — Supabase Auth or Clerk are the easiest to set up. For an early startup (under 10K MAU): Supabase Auth's 50K MAU free tier gives you the most room to grow before paying. For a growing SaaS (10K-50K MAU): Supabase Pro at $75/mo is the best value. For enterprise (100K+ MAU): negotiate with Auth0, WorkOS, or stick with Supabase if your needs are standard.`,
      },
    ];
  },
};

// ─── FAQ templates per guide ───

const FAQ = {
  "setup-clerk-nextjs": (tool) => [
    { question: "Is Clerk free for Next.js?", answer: `${tool.name} has a free tier covering up to 10K MAU. Most of its features — including pre-built components, middleware, and server helpers — are available on the free plan. You only need to upgrade when you exceed 10K MAU.` },
    { question: "Does Clerk work with server components?", answer: `Yes — Clerk provides \`auth()\` and \`currentUser()\` from \`@clerk/nextjs/server\` that work directly in React Server Components. No need to mark your pages as client components for auth.` },
    { question: "How long does Clerk setup take?", answer: `Basic setup with middleware and pre-built components takes about 10 minutes. Full configuration with custom branding, webhooks, and organization management takes 1-2 hours.` },
  ],
  "setup-supabase-auth-nextjs": (tool) => [
    { question: "Is Supabase Auth free for Next.js?", answer: `${tool.name} offers a generous free tier covering 50K MAU, unlimited API requests, and 500MB database. The Pro plan starts at $75/mo and includes 100K MAU.` },
    { question: "Does Supabase Auth need its own middleware?", answer: `Yes — Supabase SSR requires custom middleware to refresh sessions. The \`@supabase/ssr\` package provides \`createMiddlewareClient\` that handles session cookie management at the edge.` },
    { question: "Can I use Supabase Auth without Supabase database?", answer: `Technically yes, but you'd miss the main benefit: Row Level Security that ties authentication and authorization directly to your database queries. Using Supabase Auth without the database adds complexity without payoff.` },
  ],
  "setup-better-auth-nextjs": (tool) => [
    { question: "Is Better Auth really free?", answer: `Yes — Better Auth is open-source and MIT-licensed. You pay nothing for the software. Your only costs are infrastructure: a database, server, and any OAuth API usage.` },
    { question: "Does Better Auth work with edge runtime?", answer: `Better Auth supports edge middleware through its session cookie helper, but the full API routes run on the server. It works with Vercel Edge Functions for middleware, with the API routes on Node.js.` },
    { question: "How hard is Better Auth to set up?", answer: `Setup takes 1-2 hours for basic auth, longer than Clerk or Supabase. You need to configure a database adapter, run migrations, and build your own UI components. The trade-off is full control and zero per-user fees.` },
  ],
  "setup-kinde-nextjs": (tool) => [
    { question: "Does Kinde have a free tier?", answer: `Yes — Kinde's free tier covers 7,500 MAU and includes most features except enterprise SSO. It also includes Kinde's feature flag system at no extra cost.` },
    { question: "Is Kinde better than Clerk?", answer: `Kinde offers bundled feature flags and a visual workflow builder that Clerk lacks. Clerk has deeper Next.js integration and a more generous free tier (10K vs 7.5K MAU). The right choice depends on whether you value feature flags or pure auth DX.` },
    { question: "Does Kinde support custom domains for auth pages?", answer: `Yes — Kinde supports custom domains on paid plans. The free tier uses a Kinde subdomain for hosted auth pages, similar to Auth0's universal login.` },
  ],
  "migrate-auth0-to-clerk": () => [
    { question: "How long does Auth0 to Clerk migration take?", answer: `A straightforward migration takes 2-5 days including testing. Complex Auth0 setups with custom rules, actions, and RBAC can take 1-2 weeks.` },
    { question: "Can I keep my Auth0 data after migrating?", answer: `Yes — export your users from Auth0 before deactivating. Keep Auth0 active for 1-2 weeks after migration as a fallback. Clerk's migration API helps map Auth0 user schemas.` },
    { question: "Will my users notice the migration?", answer: `If done correctly, users won't notice. Social login users may need to re-authenticate. Email/password users may need to reset their passwords since Auth0 doesn't export password hashes.` },
  ],
  "migrate-auth0-to-supabase-auth": () => [
    { question: "Will I save money migrating Auth0 to Supabase?", answer: `Almost certainly. Auth0 starts at $3K+/mo for B2B features. Supabase Auth Pro covers 50K MAU at $75/mo. Even Supabase's Team plan ($599/mo) is significantly cheaper for equivalent MAU.` },
    { question: "Can I use both Auth0 and Supabase Auth during migration?", answer: `Running both in parallel is possible with feature flags. Use a feature flag to switch between auth providers. This allows gradual rollout and easy rollback if issues arise.` },
    { question: "Does Supabase Auth support enterprise SSO?", answer: `Supabase Auth supports SAML and OIDC SSO on the Team plan ($599/mo). Auth0's enterprise SSO starts at $3K+/mo. Supabase's enterprise features are more affordable but less mature.` },
  ],
  "migrate-firebase-to-supabase-auth": () => [
    { question: "Is moving from Firebase to Supabase worth it?", answer: `For most Next.js teams, yes. You get an open-source stack with no vendor lock-in, Row Level Security tied to your Postgres database, and consolidated auth + database pricing. The migration effort is typically 3-7 days.` },
    { question: "Are Firestore rules and Supabase RLS equivalent?", answer: `Not exactly, but RLS is more powerful. Firebase rules use a custom DSL limited to Firestore. Supabase RLS uses standard SQL — you can write subqueries, use functions, and join tables. RLS is more flexible but requires SQL knowledge.` },
    { question: "Do I need to rewrite my backend when migrating Firebase to Supabase?", answer: `Your Next.js API routes and server components will need updates. Firebase uses the Admin SDK for server-side operations. Supabase uses \`createServerClient\` from \`@supabase/ssr\`. The patterns are different, but the migration is manageable for a Next.js app.` },
  ],
  "migrate-authjs-to-clerk": () => [
    { question: "Is Clerk better than Auth.js?", answer: `Clerk offers a more polished developer experience with pre-built components and managed sessions. Auth.js gives you 80+ providers and full control. Clerk is better for shipping speed; Auth.js is better if you need an obscure provider or have strict self-hosting requirements.` },
    { question: "Do I lose features moving from Auth.js to Clerk?", answer: `You lose access to Auth.js's 80+ provider ecosystem — Clerk supports the most common ones. You also lose the ability to customize the JWT/session callbacks directly (though webhooks compensate). You gain pre-built UI components, managed sessions, and better edge runtime support.` },
    { question: "Can I run Auth.js and Clerk simultaneously?", answer: `Yes — use a feature flag to switch between the two during migration. Each handles sessions independently, so users need separate sign-in flows. Use staging to validate before cutting over.` },
  ],
  "nextjs-auth-middleware": () => [
    { question: "Does middleware work with all hosting platforms?", answer: `Next.js middleware requires edge runtime support. Vercel supports it natively. Netlify supports it with some limitations. AWS Lambda doesn't support edge middleware — you'll need server-side auth checks instead.` },
    { question: "Can middleware access the database?", answer: `Middleware runs at the edge with limited Node.js API support. Most databases can't be directly accessed from middleware. Use middleware for session cookie checks only — do database lookups in server components or API routes.` },
    { question: "Does middleware slow down my app?", answer: `Edge middleware adds negligible latency (1-5ms per request). It's significantly faster than server-side auth checks since it runs on Vercel's Edge Network close to the user. Avoid heavy computation or external API calls in middleware.` },
  ],
  "nextjs-auth-pricing-guide": () => [
    { question: "Which auth provider has the best free tier?", answer: `Supabase Auth and Firebase Auth both offer 50K MAU free — the most generous free tiers for managed auth. Better Auth and Auth.js are open-source and completely free (you only pay for infrastructure). Clerk gives 10K MAU free.` },
    { question: "At what MAU should I switch from free to paid?", answer: `Switch when you hit 80% of the free tier limit. For Clerk (10K MAU), start evaluating paid options at 8K MAU. For Supabase (50K MAU), you have significant runway before paying. Plan for 3-6 months of growth when choosing your initial provider.` },
    { question: "Is self-hosting auth cheaper than managed?", answer: `At low volumes (under 10K users), self-hosting costs $20-100/mo in infrastructure — comparable to managed providers. At scale (100K+ users), self-hosting is significantly cheaper if you have the DevOps expertise. Factor in engineering time: self-hosting requires 2-5x more maintenance effort.` },
  ],
};

// ─── Generate ───

ensureDir(GUIDES_DIR);

let count = 0;

for (const guide of GUIDES) {
  const seo = SEO[guide.id]();
  const tool = guide.tool ? getTool(guide.tool) : null;
  const toolA = guide.toolA ? getTool(guide.toolA) : null;
  const toolB = guide.toolB ? getTool(guide.toolB) : null;
  let sections;
  if (guide.toolA) {
    sections = SECTION_TEMPLATES[guide.id](toolA, toolB);
  } else if (guide.tool) {
    sections = SECTION_TEMPLATES[guide.id](tool);
  } else {
    sections = SECTION_TEMPLATES[guide.id]();
  }
  let faq;
  if (guide.toolA) {
    faq = FAQ[guide.id](toolA, toolB);
  } else if (guide.tool) {
    faq = FAQ[guide.id](tool);
  } else {
    faq = FAQ[guide.id]();
  }

  const content = {
    page_type: "GUIDE",
    guide_id: guide.id,
    last_updated: week,
    seo,
    hero: {
      headline: seo.meta_title.replace(` (${year} Guide)`, "").replace(` (${year} Migration Guide)`, "").replace(` (${year})`, "").replace(` (${year})`, ""),
      subheadline: seo.meta_description,
    },
    sections: sections.map((s) => ({
      heading: s.heading,
      body: humanize(s.body),
    })),
    faq,
  };

  writeFileSync(join(GUIDES_DIR, `${guide.id}.json`), JSON.stringify(content, null, 2), "utf-8");
  count++;
}

console.log(`Generated ${count} guide pages`);
