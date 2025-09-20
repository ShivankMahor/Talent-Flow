// features/jobs/pages/JobDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobsContext";
import Navbar from "../../../components/Navbar";
import Button from "../../../components/Button";

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobs();

  const job = jobs.find((j) => String(j.id) === id);

  if (!job) {
    return (
      <div>
        <Navbar />
        <div className="p-6 text-center text-gray-500">Job not found ❌</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            {job.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {job.status}
          </span>
        </div>

        {/* Meta */}
        <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
          {job.company && <p><strong>Company:</strong> {job.company}</p>}
          {job.location && <p><strong>Location:</strong> {job.location}</p>}
          {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
          <p><strong>Order:</strong> {job.order}</p>
          {job.postedDate && <p><strong>Posted:</strong> {job.postedDate}</p>}
          {job.applicants && <p><strong>Applicants:</strong> {job.applicants}</p>}
        </div>

        {/* Tags */}
        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] rounded-md border border-[var(--color-stroke)]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button size="sm" onClick={() => navigate(-1)}>
            ← Back
          </Button>
          <Button size="sm" onClick={() => navigate(`/jobs/${job.id}/edit`)}>
            ✏️ Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
