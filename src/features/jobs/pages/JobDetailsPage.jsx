import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobsContext";
import Navbar from "../../../components/Navbar";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobs();

  // loading state
  if (!jobs || jobs.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      </div>
    );
  }

  const job = jobs.find((j) => String(j.id) === jobId);

  // not found
  if (!job) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
            Job not found
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            The job you are looking for does not exist or has been removed.
          </p>
          <Button size="sm" onClick={() => navigate(-1)}>
            ← Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[var(--color-surface)] shadow-md rounded-2xl p-6 border border-[var(--color-border)]">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              {job.title}
            </h1>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                job.status === "active"
                  ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
                  : "bg-[var(--color-warning)]/20 text-[var(--color-warning)]"
              }`}
            >
              {job.status}
            </span>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-[var(--color-text-muted)]">
            {job.company && (
              <p>
                <strong className="text-[var(--color-text)]">Company:</strong>{" "}
                {job.company}
              </p>
            )}
            {job.location && (
              <p>
                <strong className="text-[var(--color-text)]">Location:</strong>{" "}
                {job.location}
              </p>
            )}
            {job.salary && (
              <p>
                <strong className="text-[var(--color-text)]">Salary:</strong>{" "}
                {job.salary}
              </p>
            )}
            <p>
              <strong className="text-[var(--color-text)]">Order:</strong>{" "}
              {job.order}
            </p>
            {job.postedDate && (
              <p>
                <strong className="text-[var(--color-text)]">Posted:</strong>{" "}
                {job.postedDate}
              </p>
            )}
            {job.applicants && (
              <p>
                <strong className="text-[var(--color-text)]">Applicants:</strong>{" "}
                {job.applicants}
              </p>
            )}
          </div>

          {/* Tags */}
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {job.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
           {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="border"
              onClick={() => navigate(-1)}
            >
              ← Back
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(`/jobs/${job.id}/edit`)}
            >
              ✏️ Edit Job
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/assessments/${job.id}`)}
            >
              📝 Manage Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
