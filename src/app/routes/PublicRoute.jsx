// import { Navigate } from "react-router-dom";
// import { useAuth } from "../providers/AuthProvider";

// export default function PublicRoute({ children }) {
//   const { user } = useAuth();
//   return user ? <Navigate to="/" replace /> : children;
// }


import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({ isAuthenticated }) {
  // If logged in, redirect to default page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise render the child route
  return <Outlet />;
}
