import { getTool } from "@/lib/data";

interface ComparisonItem {
  feature: string
  ghl: string
  alternative: string
}

export default function ComparisonTable({ items, title }: { items: ComparisonItem[]; title?: string }) {
  const tool = getTool();
  return (
    <div className="my-10 overflow-hidden rounded-xl border border-slate-200">
      {title && (
        <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3.5 font-semibold text-slate-700">Feature</th>
              <th className="px-5 py-3.5 font-semibold text-blue-700">{tool.name}</th>
              <th className="px-5 py-3.5 font-semibold text-slate-500">Alternative Tools</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              const isTotal = item.feature === "Total";
              return (
                <tr key={i} className={`${isTotal ? "border-t-2 border-blue-200 bg-blue-50/50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className={`px-5 py-3.5 font-medium ${isTotal ? "text-slate-900" : "text-slate-700"}`}>{item.feature}</td>
                  <td className="px-5 py-3.5 font-medium text-blue-700">
                    {isTotal ? (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">{item.ghl}</span>
                    ) : (
                      item.ghl
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{item.alternative}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
