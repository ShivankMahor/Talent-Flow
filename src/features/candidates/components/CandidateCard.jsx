// import Card from "../../../components/Card";
// import StageBadge from "../../../components/StageBadge";

// export default function CandidateCard({ candidate }) {
//   return (
//     <Card className="candidate-card select-none flex justify-between items-center hover:shadow-md transition animate-slideIn border rounde p-3 bg-white">
//       <div>
//         {/* Candidate name + id */}
//         <h3 className="text-sm font-semibold text-[var(--color-text)] ">
//           {candidate.id}. {candidate.name}
//         </h3>

//         {/* Email */}
//         <p className="mb-1.5 text-xs text-[var(--color-text-muted)]">{candidate.email}</p>

//         {/* Stage badge */}
//         <StageBadge stage={candidate.stage} size={3.5} px={2} py={0.5}/>
//       </div>
//     </Card>
//   );
// }



import Card from "../../../components/Card";
import StageBadge from "../../../components/StageBadge";
import { Mail, Briefcase } from "lucide-react";

export default function CandidateCard({ candidate }) {
  return (
    <Card className="candidate-card select-none flex justify-between items-center hover:shadow-md transition animate-slideIn border rounded p-3 bg-white">
      <div className="space-y-1">
        {/* Candidate name + id */}
        <h3 className="text-sm font-semibold text-[var(--color-text)]">
          {candidate.id}. {candidate.name} <StageBadge stage={candidate.stage} size={3} px={1} py={0} />
        </h3>

        {/* Email */}
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <Mail size={12} /> {candidate.email}
        </div>

        {/* ✅ Role & Company */}
        {candidate.job && (
          <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <Briefcase size={12} className="text-[var(--color-text-secondary)]" />
            <span>
              {candidate.job.title}{" "}
              <span className="text-[var(--color-text-secondary)]">
                @ {candidate.job.company}
              </span>
            </span>
          </div>
        )}

        
      </div>
    </Card>
  );
}
