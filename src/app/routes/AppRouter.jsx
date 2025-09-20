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

import JobsList from "../../features/jobs/pages/JobsList";
import JobDetails from "../../features/jobs/pages/JobDetails";
// import JobDetail from "../../features/jobs/pages/JobDetail";
// import CandidateList from "../../features/candidates/pages/CandidatesList";

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
        {/* Public */}
        <Route
          path="/jobs/:id"
          element={
            <RoleRoute allowed={['candidate', 'hr']}>
              <JobDetails/>
            </RoleRoute>
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
              <JobsList />
            </RoleRoute>
          }
        />
        {/* <Route
          path="/jobs/:jobId"
          element={
            <RoleRoute allowed={["admin", "hr"]}>
              <JobDetail />
            </RoleRoute>
          }
        /> */}
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
