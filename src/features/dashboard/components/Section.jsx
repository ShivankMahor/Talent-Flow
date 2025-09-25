// src/features/dashboard/components/Section.jsx
export default function Section({ title, children }) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
