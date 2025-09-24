// import { ChevronDown } from "lucide-react";

// export default function Select({ 
//   label, 
//   options = [], 
//   error, 
//   value, 
//   onChange, 
//   ...props 
// }) {
//   return (
//     <div className="flex flex-col gap-1 w-full max-w-xs">
//       {label && (
//         <label className="text-sm text-[var(--color-text-muted)] font-medium">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <select
//           value={value}
//           onChange={onChange}
//           {...props}
//           className="appearance-none w-full px-3 py-1.5 pr-8 rounded-lg border border-[var(--color-border)] 
//                      bg-[var(--color-surface)] text-[var(--color-text)] 
//                      focus:ring-2 focus:ring-[var(--color-accent)] outline-none
//                      hover:border-[var(--color-accent)] transition-colors"
//         >
//           {options.map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//         {/* Chevron icon overlay */}
//         <ChevronDown
//           className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]"
//           size={16}
//         />
//       </div>
//       {error && (
//         <span className="text-xs text-[var(--color-danger)]">{error}</span>
//       )}
//     </div>
//   );
// }


import { ChevronDown } from "lucide-react";

export default function Select({ 
  label, 
  options = [], 
  error, 
  value, 
  onChange, 
  ...props 
}) {
  return (
    <div className="flex flex-col gap-1 w-full max-w-xs">
      {label && (
        <label className="text-sm text-[var(--color-text-muted)] font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          {...props}
          className={`
            appearance-none w-full px-3 py-1.5 pr-8 rounded-lg border
            bg-[var(--color-surface)] text-[var(--color-text)]
            border-[var(--color-border)]
            focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none
            hover:border-[var(--color-accent)]
            disabled:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed
            transition-colors duration-200
            ${error ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)]" : ""}
          `}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]"
          size={16}
        />
      </div>
      {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
    </div>
  );
}
