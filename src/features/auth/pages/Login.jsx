import { useState } from "react";
import { useAuth } from "../../../app/providers/authProvider";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Card from "../../../components/Card";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid credentials. Try using the demo accounts below.");
    }
  }

  function fillDemo(role) {
    if (role === "hr") {
      setEmail("hr@test.com");
      setPassword("abcd");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
      <Card className="w-full lg:max-w-1/3 lg:m-0 m-4">
        <h1 className="text-xl font-semibold mb-4 text-[var(--color-text)]">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            required
          />
          {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Demo login section */}
        <div className="mt-6 border-t border-[var(--color-border)] pt-4">
          <p className="text-sm text-[var(--color-text-muted)] mb-2">Demo Accounts:</p>
          <div className="flex gap-2 justify-center">
            {/* <Button size="sm" variant="ghost" onClick={() => fillDemo("candidate")}>
              Candidate
            </Button> */}
            <Button size="sm" variant="outline" onClick={() => fillDemo("hr")}>
              HR Manager
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
