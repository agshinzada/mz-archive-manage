import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth();

  if (user && allowedRoles.includes(user.ROLE)) {
    return children;
  }
  return <Navigate to={"/auth/login"} replace />;
}

export default ProtectedRoute;
