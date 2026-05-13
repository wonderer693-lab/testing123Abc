export default function StepGuide({ steps, estimatedTime, difficulty }: { steps: string[]; estimatedTime: string; difficulty: string }) {
  return (
    <div className="my-8">
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="pill pill-blue">
          <svg className="mr-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {estimatedTime}
        </span>
        <span className={`pill ${difficulty === "Beginner" ? "pill-green" : difficulty === "Advanced" ? "pill-purple" : "pill-amber"}`}>
          {difficulty}
        </span>
      </div>
      <ol className="space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {i + 1}
            </div>
            <div className="min-w-0 pt-1.5 text-sm leading-relaxed text-slate-600">
              {step}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
