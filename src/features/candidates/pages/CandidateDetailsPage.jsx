// import { useNavigate } from "react-router-dom";
// import Navbar from "../../../components/Navbar";
// import Card from "../../../components/Card";
// import Button from "../../../components/Button";
// import StageBadge from "../../../components/StageBadge";
// import EmptyState from "../../../components/EmptyState";
// import CandidateTimelineBar from "../components/CandidateTimeLineBar";
// import { Mail, User, ArrowLeft } from "lucide-react";
// import Notes from "../../../components/Notes";
// import SmallDetailItem from "../../../components/SmallDetailItem";
// import Loader from "../../../components/Loader"; // ✅ import loader
// import { useCandidateDetail } from "../context/CandidateDetailContext";

// export default function CandidateDetailsPage() {
//   const navigate = useNavigate();
//   const { timeline, loading, candidate } = useCandidateDetail();

//   if (!candidate && !loading) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <EmptyState
//           title="Candidate not found"
//           description="This candidate does not exist or was removed."
//           action={
//             <Button size="sm" onClick={() => navigate(-1)}>
//               <ArrowLeft size={14} /> Go Back
//             </Button>
//           }
//         />
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
//         <Loader /> {/* ✅ full page loading state */}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[var(--color-background)]">
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-4">
//         <Card variant="elevated" className="p-6 space-y-6">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-b-[var(--color-border)] pb-4">
//             <div className="space-y-1">
//               <h1 className="text-3xl font-bold text-[var(--color-text)] flex items-center gap-2">
//                 <User size={30} /> {candidate.name}{" "}
//                 <StageBadge stage={candidate.stage} size={4} px={4} py={2} />
//               </h1>
//               <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
//                 <Mail size={16} /> {candidate.email}
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 items-end">
//               <SmallDetailItem label={"Candidate ID"} value={`#${candidate.id}`} />
//               <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={14} /> Back
//               </Button>
//             </div>
//           </div>

//           {/* Timeline */}
//           {timeline && timeline?.events.length > 0 && (
//             <Card variant="inset">
//               <h3 className="text-lg font-semibold mb-2">Application Timeline</h3>
//               <CandidateTimelineBar timeline={timeline} />
//             </Card>
//           )}

//           {/* Notes */}
//           <Notes candidateId={candidate.id} />
//         </Card>
//       </div>
//     </div>
//   );
// }





import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import StageBadge from "../../../components/StageBadge";
import EmptyState from "../../../components/EmptyState";
import CandidateTimelineBar from "../components/CandidateTimeLineBar";
import { Mail, User, ArrowLeft, Briefcase } from "lucide-react";
import Notes from "../../../components/Notes";
import SmallDetailItem from "../../../components/SmallDetailItem";
import Loader from "../../../components/Loader";
import { useCandidateDetail } from "../context/CandidateDetailContext";

export default function CandidateDetailsPage() {
  const navigate = useNavigate();
  const { timeline, loading, candidate } = useCandidateDetail();

  if (!candidate && !loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <EmptyState
          title="Candidate not found"
          description="This candidate does not exist or was removed."
          action={
            <Button size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft size={14} /> Go Back
            </Button>
          }
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <Card variant="elevated" className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-b-[var(--color-border)] pb-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-[var(--color-text)] flex items-center gap-2">
                <User size={30} /> {candidate.name}{" "}
                <StageBadge stage={candidate.stage} size={4} px={4} py={2} />
              </h1>

              <div className="flex flex-col gap-1 text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {candidate.email}
                </div>

                {candidate.job && (
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} /> {candidate.job.title}{" "}
                    <span className="text-[var(--color-text-secondary)]">
                      @ {candidate.job.company}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <SmallDetailItem label={"Candidate ID"} value={`#${candidate.id}`} />
              <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft size={14} /> Back
              </Button>
            </div>
          </div>

          {/* Timeline */}
          {timeline && timeline?.events?.length > 0 && (
            <Card variant="inset">
              <h3 className="text-lg font-semibold mb-2">Application Timeline</h3>
              <CandidateTimelineBar timeline={timeline} />
            </Card>
          )}

          {/* Notes */}
          <Notes candidateId={candidate.id} />
        </Card>
      </div>
    </div>
  );
}
