import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

// Route wrappers
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

// Auth
import Login from "../../features/auth/pages/Login";
import Unauthorized from "../../features/auth/pages/Unauthorized";

// Candidate
import CandidateDashboard from "../../features/candidates/pages/CandidateDashboard";
import CandidateProfile from "../../features/candidates/pages/CandidateProfile";
import NotFound from "../../features/common/pages/NotFound";

import JobDetailProvider from "../../features/jobs/providers/JobDetailProvider";
import JobsPageProvider from "../../features/jobs/providers/JobsPageProvider";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Candidate */}
        <Route
          path="/dashboard"
          element={
            <RoleRoute allowed={["candidate"]}>
              <CandidateDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <RoleRoute allowed={["candidate"]}>
              <CandidateProfile />
            </RoleRoute>
          }
        />

        {/* HR/Admin */}
        <Route
          path="/jobs"
          element={
            <RoleRoute allowed={["admin", "hr"]}>
              <JobsPageProvider />
            </RoleRoute>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={
            <RoleRoute allowed={["admin", "hr"]}>
              <JobDetailProvider />
            </RoleRoute>
          }
        />
        {/* <Route
          path="/candidates"
          element={
            <RoleRoute allowed={["admin", "hr"]}>
              <CandidatesList />
            </RoleRoute>
          }
        /> */}

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Default redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to={
                user
                  ? user.role === "candidate"
                    ? "/dashboard"
                    : "/jobs"
                  : "/login"
              }
              replace
            />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
