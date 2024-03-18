import "./App.css";
import MainLayout from "./MainLayout";

import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function AccountingApp() {
  const { routePath } = useAuth();

  return (
    <MainLayout type={routePath}>
      <Outlet />
    </MainLayout>
  );
}

export default AccountingApp;
