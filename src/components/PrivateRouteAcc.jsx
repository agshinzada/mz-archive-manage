import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRouteAcc({ children }) {
  const { user } = useAuth();

  if (user && (user.ROLE === "ACC" || user.ROLE === "ADMIN")) {
    return children;
  } else {
    return <Navigate to={"auth/login"} />;
  }
}

export default PrivateRouteAcc;
