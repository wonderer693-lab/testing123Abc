import { getTool, getFeatures } from "@/lib/data";

export default function Sidebar({ currentSlug, type }: { currentSlug?: string; type: "feature" | "audience" | "guide" }) {
  const tool = getTool();
  const features = getFeatures();

  return (
    <aside className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white/60 p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-800">On This Page</h4>
        <div className="space-y-0.5">
          <a href="#overview" className="toc-link">Overview</a>
          <a href="#benefits" className="toc-link">Benefits</a>
          <a href="#pricing" className="toc-link">Pricing</a>
          <a href="#faq" className="toc-link">FAQ</a>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white/60 p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-800">{tool.shortName} Features</h4>
        <div className="space-y-0.5">
          {features.map((f) => (
            <a
              key={f.slug}
              href={`/features/${f.slug}`}
              className={`toc-link ${currentSlug === f.slug ? "!border-blue-500 !text-blue-700 font-medium bg-blue-50/50 rounded-r-lg" : ""}`}
            >
              {f.name}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 text-center">
        <p className="mb-3 text-sm font-semibold text-slate-800">Start Your Free Trial</p>
        <p className="mb-4 text-xs text-slate-500">Join 1M+ businesses using {tool.name}</p>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn-primary !py-2 !px-4 text-sm"
        >
          Try {tool.shortName} Free →
        </a>
      </div>
    </aside>
  );
}
