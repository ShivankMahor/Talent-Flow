export default function SmallDetailItem({ label, value, mono, className = "" }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {label && (
        <div className="text-xs font-medium text-[var(--color-text-secondary)]">
          {label}
        </div>
      )}
      <div
        className={`text-[var(--color-text)] text-xs ${mono ? "font-mono" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
