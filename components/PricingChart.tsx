import { getTool, getCompetitors } from "@/lib/data";

export default function PricingChart() {
  const tool = getTool();
  const competitors = getCompetitors();

  const items = [
    { name: tool.shortName, price: tool.pricing.unlimited || tool.pricing.starter, color: "bg-blue-500", textColor: "text-blue-700", isHighlight: true },
    ...competitors.slice(0, 4).map((c) => ({
      name: c.name,
      price: c.pricing.starter || c.pricing.professional || 0,
      color: "bg-slate-300",
      textColor: "text-slate-600",
      isHighlight: false,
    })),
  ];

  const maxPrice = Math.max(...items.map((i) => i.price));

  return (
    <div className="my-10 rounded-xl border border-slate-200 p-5">
      <h3 className="mb-1 text-lg font-semibold text-slate-800">Price Comparison</h3>
      <p className="mb-6 text-sm text-slate-500">Monthly cost of entry-level plans</p>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className={`font-medium ${item.textColor}`}>{item.name}</span>
              <span className={`font-semibold ${item.textColor}`}>${item.price}/mo</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color} ${item.isHighlight ? "shadow-sm" : ""}`}
                style={{ width: `${(item.price / maxPrice) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
