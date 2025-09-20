import clsx from "clsx";

export default function Badge({ children, status }) {
  const variants = {
    default: "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]",
    success: "bg-[var(--color-success)] text-[var(--color-surface)]",
    warning: "bg-[var(--color-warning)] text-[var(--color-surface)]",
    danger: "bg-[var(--color-danger)] text-[var(--color-surface)]",
    info: "bg-[var(--color-info)] text-[var(--color-surface)]",
  };

  // map job status → variant
  const statusToVariant = {
    active: "success",
    draft: "info",
    closed: "danger",
    paused: "warning",
  };

  const variant = statusToVariant[status] || "default";

  return (
    <span
      className={clsx(
        "px-2 py-0.5 text-xs rounded-full font-medium",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}
