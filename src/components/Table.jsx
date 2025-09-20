// src/components/Table.jsx
export default function Table({ columns = [], data = [], striped = false }) {
  return (
    <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[var(--color-surface-alt)]">
          <tr>
            {columns.length > 0 ? (
              columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]"
                >
                  {col.Header}
                </th>
              ))
            ) : (
              <th className="px-4 py-2 text-left text-[var(--color-text-muted)]">
                No columns
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className={`border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] ${
                  striped && rowIndex % 2 === 1 ? "bg-[var(--color-surface)]/50" : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-4 py-2">
                    {typeof col.Cell === "function"
                      ? col.Cell(row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="p-4 text-center text-[var(--color-text-muted)]"
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
