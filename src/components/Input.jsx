export default function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-[var(--color-text-muted)]">{label}</label>}
      <input
        {...props}
        className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
      />
      {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
    </div>
  );
}
