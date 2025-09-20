import { useAuth } from "../../../app/providers/AuthProvider";
import Card from "../../../components/Card";
import Button from "../../../components/Button";

export default function CandidateDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 bg-[var(--color-background)] min-h-screen">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">Welcome, {user?.name}</h1>
      <p className="text-[var(--color-text-muted)] mb-6">This is your candidate dashboard.</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-[var(--color-text)]">Available Jobs</h2>
          <p className="text-[var(--color-text-muted)] mb-2">Browse and apply to open positions.</p>
          <Button>View Jobs</Button>
        </Card>

        <Card>
          <h2 className="font-semibold text-[var(--color-text)]">Your Assessments</h2>
          <p className="text-[var(--color-text-muted)] mb-2">Take or resume assessments.</p>
          <Button>Go to Assessments</Button>
        </Card>
      </div>

      <Button variant="ghost" className="mt-6" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
