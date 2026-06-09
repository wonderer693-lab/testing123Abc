"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-4 text-6xl font-extrabold text-slate-200 dark:text-slate-700">500</div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Something went wrong</h1>
      <p className="mb-8 text-slate-500 dark:text-slate-400">An unexpected error occurred. Please try again.</p>
      <button onClick={reset} className="btn-primary">
        Try Again
      </button>
    </div>
  );
}
