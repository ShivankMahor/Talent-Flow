import { useParams } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import Card from "../../../components/Card";

export default function CandidateProfile() {
  const { id } = useParams();
  const { user } = useAuth();

  // Ensure candidates only view their own profile
  if (user?.role === "candidate" && String(user.id) !== id) {
    return <div className="p-6 text-[var(--color-danger)]">Access denied</div>;
  }

  return (
    <div className="p-6 bg-[var(--color-background)] min-h-screen">
      <Card>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Candidate Profile</h1>
        <p className="mt-2 text-[var(--color-text-muted)]">Profile details for {user?.name}</p>
        <div className="mt-4 space-y-2">
          <p><strong>Email:</strong> {user?.email || "alice@candidate.com"}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Status:</strong> Applied</p>
        </div>
      </Card>
    </div>
  );
}
