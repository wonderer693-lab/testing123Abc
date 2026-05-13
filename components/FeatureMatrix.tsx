import { getTool, getCompetitors } from "@/lib/data";

export default function FeatureMatrix() {
  const tool = getTool();
  const competitors = getCompetitors();

  const featureNames = tool.features.map((f) => f.name);

  return (
    <div className="my-10 overflow-hidden rounded-xl border border-slate-200">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-800">Feature Comparison Matrix</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="min-w-[140px] px-4 py-3 font-semibold text-slate-700">Feature</th>
              <th className="px-4 py-3 font-semibold text-blue-700">{tool.shortName}</th>
              {competitors.slice(0, 3).map((c) => (
                <th key={c.slug} className="px-4 py-3 font-semibold text-slate-500">{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tool.features.map((f, i) => (
              <tr key={f.slug} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-4 py-3 font-medium text-slate-700">{f.name}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-green-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Included
                  </span>
                </td>
                {competitors.slice(0, 3).map((c) => (
                  <td key={c.slug} className="px-4 py-3 text-slate-500">
                    {c.features.includes(f.slug) ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        Yes
                      </span>
                    ) : (
                      <span className="text-red-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
