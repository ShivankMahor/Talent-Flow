// import { Navigate } from "react-router-dom";
// import { useAuth } from "../providers/AuthProvider";

// export default function RoleRoute({ children, allowed }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   if (!allowed.includes(user.role)) return <Navigate to="/unauthorized" replace />;
//   return children;
// }

import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ isAuthenticated, role, allowedRoles }) {
  if (!isAuthenticated) {
    // Not logged in → go to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in but wrong role → unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // Role matches → render child routes
  return <Outlet />;
}
