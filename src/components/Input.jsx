// export default function Input({ label, error, ...props }) {
//   return (
//     <div className="flex flex-col gap-1">
//       {label && <label className="text-sm text-[var(--color-text-muted)]">{label}</label>}
//       <input
//         {...props}
//         className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
//       />
//       {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
//     </div>
//   );
// }


// export default function Input({ label, error, hint, className = "", ...props }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="text-sm text-[var(--color-text-muted)] font-medium">
//         {label}
//       </label>
//       <div>

//       <input {...props} className={`w-full px-2 py-1.5 rounded-lg border bg-white text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`} />
//       {error && <p className="text-sm text-red-600">{error}</p>}
//       </div>
//       {hint && !error && <p className="text-sm text-gray-600">{hint}</p>}
//     </div>
//   );
// }



export default function Input({ 
  label, 
  error, 
  hint, 
  className = "", 
  ...props 
}) {
  return (
    <div className="flex flex-col gap-1 w-full max-w-xl">
      {label && (
        <label className="text-sm text-[var(--color-text-muted)] font-medium">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-3 py-1.5 rounded-lg border 
          bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
          border-[var(--color-border)]
          focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none
          hover:border-[var(--color-accent)]
          disabled:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]" : ""}
          ${className}
        `}
      />
      {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
      {hint && !error && <span className="text-xs text-[var(--color-text-muted)]">{hint}</span>}
    </div>
  );
}
