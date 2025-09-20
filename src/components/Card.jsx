export default function Card({ children, className }) {
  return (
    <div className={`bg-[var(--color-surface)] rounded-xl shadow-sm border border-[var(--color-border)] p-4 ${className || ""}`}>
      {children}
    </div>
  );
}
