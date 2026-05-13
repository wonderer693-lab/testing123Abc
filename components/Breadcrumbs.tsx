interface Breadcrumb {
  name: string
  url: string
}

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg className="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {i === items.length - 1 ? (
              <span className="font-medium text-slate-800">{item.name}</span>
            ) : (
              <a href={item.url} className="transition-colors hover:text-blue-600">{item.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
