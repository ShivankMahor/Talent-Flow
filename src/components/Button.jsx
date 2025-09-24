// import clsx from "clsx";

// export default function Button({ children, variant = "primary", size = "md", loading, ...props }) {
//   const base =
//     "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

//   const variants = {
//     primary: "bg-[var(--color-accent)] text-[var(--color-surface)] hover:bg-[var(--color-accent-hover)]",
//     danger: "bg-[var(--color-danger)] text-[var(--color-surface)] hover:opacity-90",
//     ghost: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]",
//   };

//   const sizes = {
//     sm: "px-3 py-1 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-5 py-3 text-lg",
//   };

//   return (
//     <button
//       {...props}
//       disabled={loading || props.disabled}
//       className={clsx(base, variants[variant], sizes[size], props.className)}
//     >
//       {loading && (
//         <span className="animate-spin h-4 w-4 border-2 border-[var(--color-surface)] border-t-transparent rounded-full mr-2" />
//       )}
//       {children}
//     </button>
//   );
// }


import clsx from "clsx";

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  loading = false,
  disabled = false,
  className,
  ...props 
}) {
  const base = `
    inline-flex items-center justify-center gap-2 rounded-lg font-medium
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-[var(--color-primary)] text-white 
      hover:bg-[var(--color-primary-hover)] 
      focus:ring-[var(--color-primary)]
    `,
    secondary: `
      bg-[var(--color-surface)] text-[var(--color-text)] 
      border border-[var(--color-border)]
      hover:bg-[var(--color-surface-hover)]
      focus:ring-[var(--color-primary)]
    `,
    outline: `
      bg-transparent text-[var(--color-text)] 
      border border-[var(--color-border)]
      hover:bg-[var(--color-surface-hover)]
      focus:outline-[var(--color-primary)]
    `,
    ghost: `
      bg-transparent text-[var(--color-text)] 
      hover:bg-[var(--color-surface-hover)]
      focus:ring-[var(--color-primary)]
    `,
    danger: `
      bg-[var(--color-danger)] text-white 
      hover:bg-[var(--color-danger-hover)]
      focus:ring-[var(--color-danger)]
    `,
    success: `
      bg-[var(--color-success)] text-white 
      hover:bg-[var(--color-success-hover)]
      focus:ring-[var(--color-success)]
    `
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base"
  };

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={clsx(className, base, variants[variant], sizes[size])}
    >
      {loading && (
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {children}
    </button>
  );
}