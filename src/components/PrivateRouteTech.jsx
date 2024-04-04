import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRouteTech({ children }) {
  const { user } = useAuth();

  if (user && (user.ROLE === "TECH" || user.ROLE === "ADMIN")) {
    return children;
  } else {
    return <Navigate to={"auth/login"} />;
  }
}

export default PrivateRouteTech;
