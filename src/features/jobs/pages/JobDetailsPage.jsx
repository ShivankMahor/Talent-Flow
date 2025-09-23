// import { useParams, useNavigate } from "react-router-dom";
// import { useJobs } from "../context/JobsContext";
// import Navbar from "../../../components/Navbar";
// import Button from "../../../components/Button";
// import Loader from "../../../components/Loader";

// export default function JobDetailsPage() {
//   const { jobId } = useParams();
//   const navigate = useNavigate();
//   const { jobs } = useJobs();

//   // loading state
//   if (!jobs || jobs.length === 0) {
//     return (
//       <div className="min-h-screen bg-[var(--color-background)]">
//         <Navbar />
//         <div className="flex justify-center items-center h-[70vh]">
//           <Loader />
//         </div>
//       </div>
//     );
//   }

//   const job = jobs.find((j) => String(j.id) === jobId);

//   // not found
//   if (!job) {
//     return (
//       <div className="min-h-screen bg-[var(--color-background)]">
//         <Navbar />
//         <div className="flex flex-col items-center justify-center h-[70vh] text-center">
//           <div className="text-6xl mb-4">❌</div>
//           <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
//             Job not found
//           </h2>
//           <p className="text-[var(--color-text-muted)] mb-6">
//             The job you are looking for does not exist or has been removed.
//           </p>
//           <Button size="sm" onClick={() => navigate(-1)}>
//             ← Go Back
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--color-background)]">
//       <Navbar />
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-[var(--color-surface)] shadow-md rounded-2xl p-6 border border-[var(--color-border)]">
//           {/* Header */}
//           <div className="flex items-start justify-between mb-6">
//             <h1 className="text-3xl font-bold text-[var(--color-text)]">
//               {job.title}
//             </h1>
//             <span
//               className={`px-4 py-1.5 rounded-full text-sm font-medium ${
//                 job.status === "active"
//                   ? "bg-[var(--color-success)]/20 text-[var(--color-success)]"
//                   : "bg-[var(--color-warning)]/20 text-[var(--color-warning)]"
//               }`}
//             >
//               {job.status}
//             </span>
//           </div>

//           {/* Meta grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-[var(--color-text-muted)]">
//             {job.company && (
//               <p>
//                 <strong className="text-[var(--color-text)]">Company:</strong>{" "}
//                 {job.company}
//               </p>
//             )}
//             {job.location && (
//               <p>
//                 <strong className="text-[var(--color-text)]">Location:</strong>{" "}
//                 {job.location}
//               </p>
//             )}
//             {job.salary && (
//               <p>
//                 <strong className="text-[var(--color-text)]">Salary:</strong>{" "}
//                 {job.salary}
//               </p>
//             )}
//             <p>
//               <strong className="text-[var(--color-text)]">Order:</strong>{" "}
//               {job.order}
//             </p>
//             {job.postedDate && (
//               <p>
//                 <strong className="text-[var(--color-text)]">Posted:</strong>{" "}
//                 {job.postedDate}
//               </p>
//             )}
//             {job.applicants && (
//               <p>
//                 <strong className="text-[var(--color-text)]">Applicants:</strong>{" "}
//                 {job.applicants}
//               </p>
//             )}
//           </div>

//           {/* Tags */}
//           {job.tags && job.tags.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-6">
//               {job.tags.map((tag, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1 text-xs font-medium rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] transition-colors"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Actions */}
//            {/* Actions */}
//           <div className="flex gap-3">
//             <Button
//               size="sm"
//               variant="ghost"
//               className="border"
//               onClick={() => navigate(-1)}
//             >
//               ← Back
//             </Button>
//             <Button
//               size="sm"
//               onClick={() => navigate(`/jobs/${job.id}/edit`)}
//             >
//               ✏️ Edit Job
//             </Button>
//             <Button
//               size="sm"
//               variant="secondary"
//               onClick={() => navigate(`/assessments/${job.id}`)}
//             >
//               📝 Manage Assessment
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useParams, useNavigate } from "react-router-dom";
// import { useJobs } from "../context/JobsContext";
// import Navbar from "../../../components/Navbar";
// import Button from "../../../components/Button";
// import Loader from "../../../components/Loader";
// import Card from "../../../components/Card";
// import Badge from "../../../components/Badge";
// import EmptyState from "../../../components/EmptyState";

// export default function JobDetailsPage() {
//   const { jobId } = useParams();
//   const navigate = useNavigate();
//   const { jobs } = useJobs();

//   // loading state
//   if (!jobs || jobs.length === 0) {
//     return (
//       <div className="min-h-screen bg-[var(--color-background)]">
//         <Navbar />
//         <div className="flex justify-center items-center h-[70vh]">
//           <Loader />
//         </div>
//       </div>
//     );
//   }

//   const job = jobs.find((j) => String(j.id) === jobId);

//   // not found
//   if (!job) {
//     return (
//       <div className="min-h-screen bg-[var(--color-background)]">
//         <Navbar />
//         <div className="max-w-4xl mx-auto p-6">
//           <EmptyState
//             title="Job not found"
//             description="The job you are looking for does not exist or has been removed."
//             icon="❌"
//             action={
//               <Button size="sm" onClick={() => navigate(-1)}>
//                 ← Go Back
//               </Button>
//             }
//           />
//         </div>
//       </div>
//     );
//   }

//   const getStatusVariant = (status) => {
//     switch(status) {
//       case "active":
//         return "success";
//       case "archived":
//         return "warning";
//       default:
//         return "secondary";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[var(--color-background)]">
//       <Navbar />
      
//       <div className="max-w-4xl mx-auto p-6 space-y-6">
//         {/* Header */}
//         <Card className="p-6">
//           <div className="flex items-start justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
//                 {job.title}
//               </h1>
//               <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
//                 {job.company && (
//                   <span className="flex items-center gap-1">
//                     <span>🏢</span> {job.company}
//                   </span>
//                 )}
//                 {job.location && (
//                   <span className="flex items-center gap-1">
//                     <span>📍</span> {job.location}
//                   </span>
//                 )}
//                 {job.salary && (
//                   <span className="flex items-center gap-1 font-semibold text-[var(--color-success)]">
//                     <span>💰</span> {job.salary}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <Badge variant={getStatusVariant(job.status)} size="lg">
//               {job.status}
//             </Badge>
//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <div className="text-center p-3 bg-[var(--color-surface-alt)] rounded-lg">
//               <div className="text-xl font-bold text-[var(--color-primary)]">#{job.order}</div>
//               <div className="text-sm text-[var(--color-text-muted)]">Order</div>
//             </div>
//             {job.applicants && (
//               <div className="text-center p-3 bg-[var(--color-surface-alt)] rounded-lg">
//                 <div className="text-xl font-bold text-[var(--color-accent)]">{job.applicants}</div>
//                 <div className="text-sm text-[var(--color-text-muted)]">Applicants</div>
//               </div>
//             )}
//             {job.type && (
//               <div className="text-center p-3 bg-[var(--color-surface-alt)] rounded-lg">
//                 <div className="text-sm font-semibold text-[var(--color-text)]">{job.type}</div>
//                 <div className="text-sm text-[var(--color-text-muted)]">Type</div>
//               </div>
//             )}
//             {job.experience && (
//               <div className="text-center p-3 bg-[var(--color-surface-alt)] rounded-lg">
//                 <div className="text-sm font-semibold text-[var(--color-text)]">{job.experience}</div>
//                 <div className="text-sm text-[var(--color-text-muted)]">Experience</div>
//               </div>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex flex-wrap gap-3">
//             <Button
//               size="sm"
//               variant="ghost"
//               className="border"
//               onClick={() => navigate(-1)}
//             >
//               ← Back
//             </Button>
//             <Button
//               size="sm"
//               onClick={() => navigate(`/jobs/${job.id}/edit`)}
//             >
//               ✏️ Edit Job
//             </Button>
//             <Button
//               size="sm"
//               variant="secondary"
//               onClick={() => navigate(`/assessments/${job.id}`)}
//             >
//               📝 Assessment
//             </Button>
//             <Button
//               size="sm"
//               variant="ghost"
//               onClick={() => navigate(`/jobs/${job.id}/applicants`)}
//             >
//               👥 Applicants
//             </Button>
//           </div>
//         </Card>

//         {/* Job Details */}
//         <Card className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {job.postedDate && (
//               <div>
//                 <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Posted Date</div>
//                 <div className="text-[var(--color-text)]">{job.postedDate}</div>
//               </div>
//             )}
            
//             <div>
//               <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Job Slug</div>
//               <div className="text-[var(--color-text)] font-mono text-sm">{job.slug}</div>
//             </div>
//           </div>

//           {/* Description */}
//           {job.description && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">Description</h3>
//               <p className="text-[var(--color-text)] leading-relaxed">{job.description}</p>
//             </div>
//           )}

//           {/* Tags */}
//           {job.tags && job.tags.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">Skills & Technologies</h3>
//               <div className="flex flex-wrap gap-2">
//                 {job.tags.map((tag, idx) => (
//                   <Badge key={idx} variant="secondary">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// }




import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../context/JobsContext";
import Navbar from "../../../components/Navbar";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import EmptyState from "../../../components/EmptyState";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { jobs } = useJobs();

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

  if (!job) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">
          <EmptyState
            title="Job not found"
            description="The job you are looking for does not exist or has been removed."
            icon="❌"
            action={
              <Button size="sm" onClick={() => navigate(-1)}>
                ← Go Back
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "archived":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Job Header */}
        <Card className="p-8 shadow-lg rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-[var(--color-text)] mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-muted)]">
                {job.company && (
                  <span className="flex items-center gap-1">
                    <span>🏢</span> {job.company}
                  </span>
                )}
                {job.location && (
                  <span className="flex items-center gap-1">
                    <span>📍</span> {job.location}
                  </span>
                )}
                {job.salary && (
                  <span className="flex items-center gap-1 font-semibold text-[var(--color-success)]">
                    <span>💰</span> {job.salary}
                  </span>
                )}
              </div>
            </div>
            <Badge variant={getStatusVariant(job.status)} size="lg" className="self-start">
              {job.status}
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <StatCard label="Order" value={`#${job.order}`} accent="var(--color-primary)" />
            {job.applicants && (
              <StatCard label="Applicants" value={job.applicants} accent="var(--color-accent)" />
            )}
            {job.type && <StatCard label="Type" value={job.type} />}
            {job.experience && <StatCard label="Experience" value={job.experience} />}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Button size="sm" variant="ghost" onClick={() => navigate(-1)}>
              ← Back
            </Button>
            <Button size="sm" variant="secondary" onClick={() => navigate(`/assessments/${job.id}`)}>
              📝 Assessment
            </Button>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="p-8 shadow-md rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {job.postedDate && (
              <DetailItem label="Posted Date" value={job.postedDate} />
            )}
          </div>

          {job.description && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                Description
              </h3>
              <p className="text-[var(--color-text)] leading-relaxed">
                {job.description}
              </p>
            </section>
          )}

          {job.tags?.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </Card>
      </div>
    </div>
  );
}

/* --- Small UI helpers --- */
function StatCard({ label, value, accent }) {
  return (
    <div className="flex flex-col items-center p-4 bg-[var(--color-surface-alt)] rounded-xl shadow-sm">
      <div
        className="text-xl font-bold"
        style={{ color: accent || "var(--color-text)" }}
      >
        {value}
      </div>
      <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
    </div>
  );
}

function DetailItem({ label, value, mono }) {
  return (
    <div>
      <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
        {label}
      </div>
      <div
        className={`text-[var(--color-text)] ${mono ? "font-mono text-sm" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
