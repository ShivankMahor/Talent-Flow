import clsx from "clsx";

export default function Button({ children, variant = "primary", size = "md", loading, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[var(--color-accent)] text-[var(--color-surface)] hover:bg-[var(--color-accent-hover)]",
    danger: "bg-[var(--color-danger)] text-[var(--color-surface)] hover:opacity-90",
    ghost: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(base, variants[variant], sizes[size], props.className)}
    >
      {loading && (
        <span className="animate-spin h-4 w-4 border-2 border-[var(--color-surface)] border-t-transparent rounded-full mr-2" />
      )}
      {children}
    </button>
  );
}
