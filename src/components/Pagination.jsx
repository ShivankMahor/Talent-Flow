import Button from "./Button";

export default function Pagination({ page, totalPages, onChange, withJump }) {
  const handleJump = (e) => {
    e.preventDefault();
    const target = Number(e.target.pageInput.value);
    if (target >= 1 && target <= totalPages) {
      onChange(target);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4 items-center">
      <Button size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Prev
      </Button>
      <span className="px-2 py-1 text-[var(--color-text)]">
        Page {page} of {totalPages}
      </span>
      <Button size="sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
      </Button>
      {withJump && (
        <form onSubmit={handleJump} className="flex items-center gap-1 ml-2">
          <input
            name="pageInput"
            type="number"
            min="1"
            max={totalPages}
            className="w-16 px-2 py-1 border rounded-lg border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
            placeholder="Go"
          />
          <Button size="sm" type="submit">Go</Button>
        </form>
      )}
    </div>
  );
}
