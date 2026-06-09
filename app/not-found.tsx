import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-4 text-6xl font-extrabold text-slate-200 dark:text-slate-700">404</div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Page Not Found</h1>
      <p className="mb-8 text-slate-500 dark:text-slate-400">This page does not exist or has been moved.</p>
      <Link
        href="/"
        className="btn-primary"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}
