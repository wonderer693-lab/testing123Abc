import { getAffiliateLink, getTool, getAffiliateLinkBootcamp, getAffiliateLinkAI, getAffiliateLinkSaaSUpgrade } from "@/lib/data";

export default function AffiliateCta({ text, className }: { text?: string; className?: string }) {
  const link = getAffiliateLink();
  const bootcampLink = getAffiliateLinkBootcamp();
  const aiLink = getAffiliateLinkAI();
  const saasUpgradeLink = getAffiliateLinkSaaSUpgrade();
  const tool = getTool();
  return (
    <div className={`my-10 overflow-hidden rounded-xl border border-blue-200/50 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 text-center sm:p-8 ${className || ""}`}>
      <div className="mx-auto max-w-lg">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Affiliate Disclosure
        </div>
        <p className="mb-1 text-xs text-slate-400">
          I may earn a commission if you purchase through links on this page.
        </p>
        <p className="mb-2 text-lg font-semibold text-slate-800">Ready to transform your business?</p>
        <p className="mb-5 text-sm text-slate-500">Join 1M+ businesses using {tool.name}. Start your free trial today — no credit card required.</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn-primary"
        >
          {text || `Try ${tool.name} Free →`}
        </a>
        <div className="mt-4 space-y-1.5 text-xs text-slate-400">
          <p>🔥 <a href={bootcampLink} target="_blank" rel="noopener noreferrer nofollow" className="text-slate-500 hover:text-blue-600 transition-colors">HighLevel Bootcamp</a> — 30-day guided setup with live training, free with your trial</p>
          <p>🤖 <a href={aiLink} target="_blank" rel="noopener noreferrer nofollow" className="text-slate-500 hover:text-blue-600 transition-colors">Meet GHL's AI Employee</a> — automated call answering, lead qualification, and booking</p>
          <p>⬆️ <a href={saasUpgradeLink} target="_blank" rel="noopener noreferrer nofollow" className="text-slate-500 hover:text-blue-600 transition-colors">Already a GHL customer?</a> Unlock the full SaaS Pro experience with white-label and client management</p>
        </div>
      </div>
    </div>
  );
}
