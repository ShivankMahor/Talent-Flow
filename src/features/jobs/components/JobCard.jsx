// features/jobs/components/JobCard.jsx
import { useNavigate } from "react-router-dom";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import { useJobs } from "../context/JobsContext";
import { GripVerticalIcon } from "lucide-react";

export default function JobCard({ job, dragHandleProps }) {
  const { openEditModal, handleArchive} = useJobs();
  const navigate = useNavigate();

  return (
    <div className="group relative">
      <div className="flex items-cente justify-between gap-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-2 py-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-[var(--color-accent)]/20 group-hover:-translate-y-1">
        <div className="flex items-center gap-2">

        {/* Drag handle */}
        <div
          {...dragHandleProps}
          className="cursor-grab text-gray-400 hover:text-gray-600 select-none pt-1 candidate-card"
          title="Drag to reorder"
        >
          <GripVerticalIcon className="size-5"/>
        </div>

        {/* Job content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            {/* Title + badge */}
            <div onClick={() => navigate(`/jobs/${job.id}`)} className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] truncate">
                  {job.title}
                </h3>
                <Badge status={job.status}>{job.status}</Badge>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                {job.company && <span>{job.company}</span>}
                {job.location && <span>{job.location}</span>}
                {job.salary && <span>{job.salary}</span>}
                {job.postedDate && <span>• {job.postedDate}</span>}
                {job.applicants && <span>{job.applicants} applicants</span>}
              </div>
            </div>

            
          </div>

          {/* Tags row */}
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {job.tags.slice(0, 6).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs font-medium bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] rounded-md border border-[var(--color-stroke)]/30 hover:bg-[var(--color-accent)]/5 hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
              {job.tags.length > 6 && (
                <span className="px-2 py-0.5 text-xs font-medium text-[var(--color-text-muted)]">
                  +{job.tags.length - 6}
                </span>
              )}
            </div>
          )}
        </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            onClick={() => handleArchive(job)}
            size="sm"
            variant="ghost"
            className="opacity-70 hover:opacity-100 text-xs px-2 py-1"
          >
            {job.status === "active" ? "Archive" : "Unarchive"}
          </Button>
          <Button
            size="sm"
            className="text-xs px-2 py-1"
            onClick={() => openEditModal(job)}
          >
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
