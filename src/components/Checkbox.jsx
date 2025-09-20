export default function Checkbox({ label, ...props }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        {...props}
        className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
      />
      <span className="text-[var(--color-text)]">{label}</span>
    </label>
  );
}
