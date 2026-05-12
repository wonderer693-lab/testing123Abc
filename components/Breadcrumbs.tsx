interface Breadcrumb {
  name: string
  url: string
}

export default function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span>/</span>}
            {i === items.length - 1 ? (
              <span className="text-gray-900">{item.name}</span>
            ) : (
              <a href={item.url} className="hover:text-blue-600">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
