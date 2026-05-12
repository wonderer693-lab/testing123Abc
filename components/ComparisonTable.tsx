interface ComparisonItem {
  feature: string
  ghl: string
  alternative: string
}

export default function ComparisonTable({ items, title }: { items: ComparisonItem[]; title?: string }) {
  return (
    <div className="my-8 overflow-x-auto">
      {title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 font-medium">Feature</th>
            <th className="border p-3 font-medium text-green-700">GoHighLevel</th>
            <th className="border p-3 font-medium text-red-600">Alternative Tools</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border p-3 font-medium">{item.feature}</td>
              <td className="border p-3 text-green-700">{item.ghl}</td>
              <td className="border p-3 text-red-600">{item.alternative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
