export default function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="my-8 grid gap-5 sm:grid-cols-2">
      <div className="rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50 to-white p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-200">
            <svg className="h-4 w-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800">Pros</h3>
        </div>
        <ul className="space-y-2.5">
          {pros.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-green-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">&#10003;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-200/50 bg-gradient-to-br from-red-50 to-white p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-200">
            <svg className="h-4 w-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800">Cons</h3>
        </div>
        <ul className="space-y-2.5">
          {cons.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-red-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">&#10007;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
