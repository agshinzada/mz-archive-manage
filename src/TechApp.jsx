import "./App.css";
import MainLayout from "./MainLayout";

import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function TechApp() {
  const { routePath } = useAuth();

  return (
    <MainLayout type={routePath}>
      <Outlet />
    </MainLayout>
  );
}

export default TechApp;
