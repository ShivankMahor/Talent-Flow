import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function RoleRoute({ children, allowed }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return children;
}
