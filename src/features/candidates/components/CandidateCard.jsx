import Card from "../../../components/Card";
import StageBadge from "../../../components/StageBadge";

export default function CandidateCard({ candidate }) {
  return (
    <Card className="candidate-card select-none flex justify-between items-center hover:shadow-md transition animate-slideIn border rounde p-3 bg-white">
      <div>
        {/* Candidate name + id */}
        <h3 className="text-sm font-semibold text-[var(--color-text)] ">
          {candidate.id}. {candidate.name}
        </h3>

        {/* Email */}
        <p className="mb-1.5 text-xs text-[var(--color-text-muted)]">{candidate.email}</p>

        {/* Stage badge */}
        <StageBadge stage={candidate.stage} size={3.5} px={2} py={0.5}/>
      </div>
    </Card>
  );
}

