import Button from "./Button";

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50">
      <div className="bg-[var(--color-surface)] rounded-xl shadow-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">{title}</h2>
          <Button variant="outline" onClick={onClose}>✕</Button>
        </div>
        <div className="mb-4">{children}</div>
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
