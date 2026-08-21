const stats = [
  { label: "Proposal turnaround", value: "24–48 hrs" },
  { label: "Service coverage", value: "Pan-India" },
  { label: "Points of contact per client", value: "1 dedicated" },
  { label: "On-ground presence", value: "Every engagement" },
];

export function StatsBand() {
  return (
    <div className="bg-[color:var(--color-navy-900)] py-10">
      <div className="container-page grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
