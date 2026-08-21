export function StatsBandBlock({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div style={{ background: "var(--color-accent-900)" }}>
      <div className="container-page grid grid-cols-2 gap-6 py-11 sm:grid-cols-4">
        {items.map((s, i) => (
          <div key={i} className="text-center">
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
