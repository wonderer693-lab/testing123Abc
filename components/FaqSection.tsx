interface FaqSectionProps {
  items: { q: string; a: string }[]
}

export default function FaqSection({ items }: FaqSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="section-title text-xl">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600"
          >
            <summary className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
              {item.q}
              <svg
                className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180 dark:text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
