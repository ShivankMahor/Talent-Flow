import Card from "../../../components/Card";
const stageBadge = {
  applied: "bg-gray-100 text-gray-700 border border-gray-300",
  screen: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  tech: "bg-purple-100 text-purple-700 border border-purple-300",
  offer: "bg-blue-100 text-blue-700 border border-blue-300",
  hired: "bg-green-100 text-green-700 border border-green-300",
  rejected: "bg-red-100 text-red-700 border border-red-300",
};

export default function CandidateCard({ candidate }) {
  const badgeStyle = stageBadge[candidate.stage] || "bg-gray-50 text-gray-500 border";
  return (
    <Card className="candidate-card select-none flex justify-between items-center hover:shadow-md transition animate-slideIn border rounde p-3 bg-white">
      <div>
        {/* Candidate name + id */}
        <h3 className="text-sm font-semibold text-[var(--color-text)] ">
          {candidate.id}. {candidate.name}
        </h3>

        {/* Email */}
        <p className="text-xs text-[var(--color-text-muted)]">{candidate.email}</p>

        {/* Stage badge */}
        <span
          className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${badgeStyle}`}
        >
          {candidate.stage}
        </span>
      </div>
    </Card>
  );
}

