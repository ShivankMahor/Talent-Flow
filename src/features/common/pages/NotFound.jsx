import { Link } from "react-router-dom";
import Button from "../../../components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-background)] p-6">
      <h1 className="text-6xl font-bold text-[var(--color-danger)]">404</h1>
      <p className="mt-2 text-lg text-[var(--color-text-muted)]">
        Oops! The page you’re looking for does not exist.
      </p>
      <Link to="/" className="mt-6">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
