import Button from "./Button";
import SmallDetailItem from "./SmallDetailItem";

export default function Pagination({ page, totalPages, onChange, withJump, loading }) {
  const handleJump = (e) => {
    e.preventDefault();
    const target = Number(e.target.pageInput.value);
    if (target >= 1 && target <= totalPages) {
      onChange(target);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4 items-center">
      <Button className={"text-xs font-medium"} variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => onChange(page - 1)}>
        Prev
      </Button>
      <SmallDetailItem label={`Page ${page} of ${totalPages}`}/>
      <Button className={"text-xs font-medium"}  variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => onChange(page + 1)}>
        Next
      </Button>
      {withJump && (
        <form onSubmit={handleJump} className="flex items-center gap-1 ml-">
          <input
            name="pageInput"
            type="number"
            min="1"
            max={totalPages}
            className=" text-center no-spinner w-10 px-2 py-0.5 border rounded-lg border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]"
            placeholder="--"
          />
          <Button className={"text-xs font-medium"} variant="outline" size="sm" type="submit">Go</Button>
        </form>
      )}
    </div>
  );
}
