// ExampleComponent.jsx
export default function ExampleComponent() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl shadow-lg p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
        <h1 className="text-2xl font-bold mb-4">🎨 Theme Test</h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          This is a demo component using your light/dark color variables.
        </p>

        <div className="space-y-3">
          <button className="w-full py-2 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white">
            Accent Button
          </button>
          <button className="w-full py-2 rounded-lg bg-[var(--color-active)] hover:bg-[var(--color-active-hover)] text-white">
            Active Button
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-6">
          <div className="h-10 rounded bg-[var(--color-shape1)]"></div>
          <div className="h-10 rounded bg-[var(--color-shape2)]"></div>
          <div className="h-10 rounded bg-[var(--color-shape3)]"></div>
          <div className="h-10 rounded bg-[var(--color-shape4)]"></div>
          <div className="h-10 rounded bg-[var(--color-stroke)]"></div>
        </div>
      </div>
    </div>
  );
}
