import Button from "../../../components/Button";
import { useAuth } from "../../../app/providers/AuthProvider";

export default function Unauthorized() {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-background)]">
      <h1 className="text-2xl font-bold text-[var(--color-danger)]">Unauthorized</h1>
      <p className="text-[var(--color-text-muted)] mt-2">
        Sorry {user?.name}, you don’t have access to this page.
      </p>
      <Button className="mt-4" onClick={logout}>
        Go back
      </Button>
    </div>
  );
}
