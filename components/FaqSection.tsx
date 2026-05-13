export default function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="my-10">
      <h2 className="mb-2 text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
      <p className="mb-6 text-sm text-slate-500">Quick answers to common questions.</p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white/60 transition-all open:border-blue-200 open:shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-medium text-slate-800 transition-colors hover:text-blue-700">
              <span>{item.q}</span>
              <svg className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-600">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
