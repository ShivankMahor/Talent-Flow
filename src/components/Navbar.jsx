import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../app/providers/authProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold text-[var(--color-accent)]">
            TalentFlow
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {user?.role === "hr" || user?.role === "admin" ? (
              <>
                <Link to="/" className="text-[var(--color-text)] hover:text-[var(--color-accent)]">
                  Jobs
                </Link>
                <Link to="/candidates" className="text-[var(--color-text)] hover:text-[var(--color-accent)]">
                  Candidates
                </Link>
                <Link to="/candidates/board" className="text-[var(--color-text)] hover:text-[var(--color-accent)]">
                  Candidates Board
                </Link>
              </>
            ) : (
              <>
                <Link to="/jobs-board" className="text-[var(--color-text)] hover:text-[var(--color-accent)]">
                  Jobs
                </Link>
                <Link to="/dashboard" className="text-[var(--color-text)] hover:text-[var(--color-accent)]">
                  Dashboard
                </Link>
              </>
            )}
            <Button size="sm" variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-surface-alt)] border-t border-[var(--color-border)]">
          <div className="px-4 py-3 space-y-2">
            {user?.role === "hr" || user?.role === "admin" ? (
              <>
                <Link
                  to="/"
                  className="block text-[var(--color-text)] hover:text-[var(--color-accent)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  to="/candidates"
                  className="block text-[var(--color-text)] hover:text-[var(--color-accent)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Candidates
                </Link>
                <Link
                  to="/candidates/board"
                  className="block text-[var(--color-text)] hover:text-[var(--color-accent)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Assessments
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/jobs-board"
                  className="block text-[var(--color-text)] hover:text-[var(--color-accent)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Jobs
                </Link>
                <Link
                  to="/dashboard"
                  className="block text-[var(--color-text)] hover:text-[var(--color-accent)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
            <Button size="sm" className="w-full" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
