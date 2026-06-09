"use client";

import { useState, FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "subscribed" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("subscribed");
    setEmail("");
  };

  if (status === "subscribed") {
    return (
      <section className="mb-12 rounded-xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950/20">
        <p className="font-semibold text-green-800 dark:text-green-300">You are subscribed!</p>
        <p className="mt-1 text-sm text-green-600 dark:text-green-400">We will let you know when new comparisons go live.</p>
      </section>
    );
  }

  return (
    <section className="mb-12 rounded-xl border border-blue-100 bg-blue-50/50 p-6 text-center dark:border-blue-800 dark:bg-blue-950/20">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Stay Updated</h2>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        New comparisons added monthly. No spam, unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
        />
        <button
          type="submit"
          className="btn-primary shrink-0 !py-2 !px-5 text-sm"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}
