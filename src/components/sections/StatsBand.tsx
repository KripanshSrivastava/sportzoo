const stats = [
  { label: "Proposal turnaround", value: "24–48 hrs" },
  { label: "Service coverage", value: "Pan-India" },
  { label: "Point of contact per client", value: "1 dedicated" },
  { label: "On-ground presence", value: "Every engagement" },
];

export function StatsBand() {
  return (
    <div style={{ background: "var(--color-accent-900)" }}>
      <div className="container-page grid grid-cols-2 gap-6 py-11 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="m-0" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "28px", color: "var(--color-neutral-100)" }}>
              {s.value}
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--color-neutral-400)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
