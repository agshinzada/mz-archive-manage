import Search from "antd/es/input/Search";
import "./App.css";
import MainLayout from "./MainLayout";
import ProcessingPage from "./pages/ProcessingPage";
import FichesPage from "./pages/FichesPage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default App;
