import Button from "./Button";

export default function EmptyState({ title = "No data", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-[var(--color-border)] rounded-lg">
      <h3 className="text-lg font-semibold text-[var(--color-text)]">{title}</h3>
      {description && <p className="text-[var(--color-text-muted)] mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
