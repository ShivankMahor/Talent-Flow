// components/Select.jsx
export default function Select({ 
  label, 
  options = [], 
  error, 
  value, 
  onChange, 
  ...props 
}) {
  return (
    <div className="flex flex-col gap-1 ">
      {label && (
        <label className="text-sm text-[var(--color-text-muted)]">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        {...props}
        className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] 
                   bg-[var(--color-surface)] text-[var(--color-text)] 
                   focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-[var(--color-danger)]">{error}</span>
      )}
    </div>
  );
}
