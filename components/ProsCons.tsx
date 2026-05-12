export default function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="my-8 grid gap-6 sm:grid-cols-2">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-green-700">Pros</h3>
        <ul className="space-y-2">
          {pros.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-green-600">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold text-red-600">Cons</h3>
        <ul className="space-y-2">
          {cons.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
