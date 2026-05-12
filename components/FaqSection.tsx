export default function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <details key={i} className="rounded-lg border border-gray-200">
            <summary className="cursor-pointer p-4 font-medium hover:bg-gray-50">
              {item.q}
            </summary>
            <p className="border-t border-gray-200 p-4 text-gray-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
