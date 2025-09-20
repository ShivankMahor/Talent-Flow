
// features/jobs/components/JobsPagination.jsx
import Pagination from "../../../components/Pagination"
export default function JobsPagination({ page, total, pageSize = 10, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onChange={onPageChange}
      withJump
    />
  );
}