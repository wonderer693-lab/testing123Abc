import { getAffiliateLink } from "@/lib/data";

export default function AffiliateCta({ text, className }: { text?: string; className?: string }) {
  const link = getAffiliateLink();
  return (
    <div className={`my-8 rounded-xl border border-blue-200 bg-blue-50 p-6 ${className || ""}`}>
      <p className="mb-1 text-xs text-gray-500">
        Disclosure: I may earn a commission if you purchase through links on this page.
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-3 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
      >
        {text || "Try GoHighLevel Free →"}
      </a>
    </div>
  );
}
