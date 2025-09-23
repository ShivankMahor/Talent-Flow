import clsx from "clsx";

export default function Badge({ children, status, variant: explicitVariant, size = "sm" }) {
  const variants = {
    default: "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]",
    success: "bg-[var(--color-success)] text-[var(--color-surface)]",
    warning: "bg-[var(--color-warning)] text-[var(--color-surface)]",
    danger: "bg-[var(--color-danger)] text-[var(--color-surface)]",
    info: "bg-[var(--color-info)] text-[var(--color-surface)]",
  };

  // map statuses → variants
  const statusToVariant = {
    active: "success",
    draft: "info",
    closed: "danger",
    paused: "warning",
    applied: "info",
    screen: "warning",
    tech: "success",
    offer: "info",
    hired: "success",
    rejected: "danger",
    archived: "default"
  };

  // size variants
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  // priority: status → explicit variant → default
  const variant = status ? statusToVariant[status] : explicitVariant || "default";

  return (
    <span
      className={clsx(
        "rounded-full font-medium",
        sizes[size],      // 👈 apply size
        variants[variant] // 👈 apply color
      )}
    >
      {children}
    </span>
  );
}
