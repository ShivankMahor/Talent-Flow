// // features/jobs/components/JobCard.jsx
// import Badge from "../../../components/Badge";
// import Button from "../../../components/Button";

// export default function JobCard({ job }) {
//     console.log("Job: ",job)
//   return (
//     <div className="group relative">
//       {/* Main card */}
//       <div className="flex  justify-between relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:border-[var(--color-accent)]/20 group-hover:-translate-y-1">
//         <div>
//             {/* Header section */}
//             <div className="flex justify-between items-start mb-4">
//             <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-3 mb-2">
//                 <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 truncate">
//                     {job.title}
//                 </h3>
//                 <Badge variant={job.status === "active" ? "success" : "default"}>
//                     {job.status}
//                 </Badge>
//                 </div>
                
//                 {/* Meta information */}
//                 <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] mb-3">
//                 {job.company && (
//                     <span className="flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
//                     </svg>
//                     {job.company}
//                     </span>
//                 )}
//                 {job.location && (
//                     <span className="flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {job.location}
//                     </span>
//                 )}
//                 {job.salary && (
//                     <span className="flex items-center gap-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//                     </svg>
//                     {job.salary}
//                     </span>
//                 )}
//                 </div>
                
//                 {/* Tags */}
//                 {job.tags && job.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-4">
//                     {job.tags.slice(0, 4).map((tag, index) => (
//                         <span 
//                         key={index}
//                         className="px-2 py-1 text-xs font-medium bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] rounded-lg border border-[var(--color-stroke)]/30 hover:bg-[var(--color-accent)]/5 hover:text-[var(--color-accent)] transition-colors duration-200"
//                         >
//                         {tag}
//                     </span>
//                     ))}
//                     {job.tags.length > 4 && (
//                         <span className="px-2 py-1 text-xs font-medium text-[var(--color-text-muted)]">
//                         +{job.tags.length - 4} more
//                     </span>
//                     )}
//                 </div>
//                 )}
                
//                 {/* Stats */}
//                 <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
//                 {job.postedDate && (
//                     <span>Posted {job.postedDate}</span>
//                     )}
//                 {job.applicants && (
//                     <span className="flex items-center gap-1">
//                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
//                     </svg>
//                     {job.applicants} applicants
//                     </span>
//                 )}
//                 </div>
//             </div>
//         </div>
//         </div>
//           {/* Action buttons */}
//           <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-border)]/50">
//             <Button 
//               size="sm" 
//               variant="ghost"
//               className="opacity-70 hover:opacity-100"
//             >
//               {job.status === "active" ? "Archive" : "Unarchive"}
//             </Button>
//             <Button size="sm">
//               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//               Edit
//             </Button>
//           </div>
//         </div>
//     </div>
//   );
// }


// features/jobs/components/JobCard.jsx
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";

export default function JobCard({ job }) {
  return (
    <div className="group relative">
      {/* Main card */}
      <div className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-[var(--color-accent)]/20 group-hover:-translate-y-1">
        
        {/* Header with title, badge and actions in one row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 truncate">
                {job.title}
              </h3>
              <Badge status={job.status}>
                {job.status}
              </Badge>
            </div>
            
            {/* Meta information in compact single line */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
              {job.company && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                  </svg>
                  {job.company}
                </span>
              )}
              {job.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
              )}
              {job.salary && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {job.salary}
                </span>
              )}
              {job.postedDate && (
                <span>• {job.postedDate}</span>
              )}
              {job.applicants && (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                  {job.applicants}
                </span>
              )}
            </div>
          </div>
          
          {/* Action buttons moved to top right */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button 
              size="sm" 
              variant="ghost"
              className="opacity-70 hover:opacity-100 text-xs px-2 py-1"
            >
              {job.status === "active" ? "Archive" : "Unarchive"}
            </Button>
            <Button size="sm" className="text-xs px-2 py-1">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Button>
          </div>
        </div>
        
        {/* Tags row - only show if available */}
        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {job.tags.slice(0, 6).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 text-xs font-medium bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] rounded-md border border-[var(--color-stroke)]/30 hover:bg-[var(--color-accent)]/5 hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                {tag}
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
  );
}