import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

// Auth
import Login from "../../features/auth/pages/Login";

// Jobs
import JobDetailProvider from "../../features/jobs/providers/JobDetailProvider";
import JobsPageProvider from "../../features/jobs/providers/JobsPageProvider";

// Candidate
import CandidatesDetailPageProvider from "../../features/candidates/providers/CandidatesDetailPageProvider";
import CandidatesPage from "../../features/candidates/pages/CandidatesPage";
import CandidatesBoardPage from "../../features/candidates/pages/CandidateBoardPage";
import { CandidatesProvider } from "../../features/candidates/context/CandidatesContext";
// Common
import NotFound from "../../features/common/pages/NotFound";
import Test from "../../features/candidates/pages/Test";
import { BoardCandidatesProvider } from "../../features/candidates/context/BoardCandidatesContext";
import { ToastContainer } from "react-toastify";

export default function AppRouter() {
  const { user } = useAuth();

  return (
      <Routes>
        {/* -------- Login -------- */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />

        {/* -------- Protected Routes -------- */}
        {user ? (
          <>
            {/* <Route path="/" element={<Navigate to="/candidates/board" replace />} /> */}

            <Route
              path="/"
              element={
                <JobsPageProvider/>
              }
            />
            <Route
              path="/test"
              element={
                <Test/>
              }
            />
            <Route
              path="/jobs/:jobId"
              element={
                <JobDetailProvider/>
              }
            />

            <Route
              path="/candidates"
              element={
                <CandidatesProvider>
                  <CandidatesPage/>
                </CandidatesProvider>
              }
            />
            <Route
              path="/candidates/board"
              element={
                <BoardCandidatesProvider>
                  <CandidatesBoardPage/>
                </BoardCandidatesProvider>
              }
            />
            <Route
              path="/candidates/:id"
              element={
                <CandidatesDetailPageProvider/>
              }
            />
          </>
        ) : (
          // If not logged in → everything redirects to login
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {/* -------- 404 -------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}
