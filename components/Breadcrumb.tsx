import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center gap-1.5">
            {index > 0 && (
              <svg className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {index === items.length - 1 ? (
              <span className="font-medium text-slate-900 dark:text-slate-100" aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
