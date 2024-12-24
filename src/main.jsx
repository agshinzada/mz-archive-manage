import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FichesPage from "./pages/ware/FichesPage.jsx";
import ProcessingPage from "./pages/ware/ProcessingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { FichesProvider } from "./context/FichesContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ConfirmedDocumentPage from "./pages/ware/ConfirmedDocumentPage.jsx";
import UnConfirmedDocumentPage from "./pages/ware/UnConfirmedDocumentPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import App from "./App.jsx";
import MainLayout from "./MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProblemFichesPage from "./pages/ware/ProblemFichesPage.jsx";
import DuplicateFichesPage from "./pages/ware/DuplicateFichesPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "MODERATOR", "USER"]}>
        <MainLayout>
          <App />
        </MainLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <FichesPage />,
      },
      {
        path: "processing",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <ProcessingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "invoices",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "MODERATOR", "USER"]}>
            <FichesPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "invoices/approved",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <ConfirmedDocumentPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "invoices/unconfirmed",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <UnConfirmedDocumentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "invoices/problems",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ProblemFichesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "invoices/duplicate",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN", "MODERATOR"]}>
            <DuplicateFichesPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "clients",
      //   element: <ClientsPage />,
      // },
      // {
      //   path: "acts",
      //   element: <ActPage />,
      // },
      // {
      //   path: "handover",
      //   element: <HandoverPage />,
      // },
    ],
  },

  {
    path: "auth/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FichesProvider>
        <RouterProvider router={router} />
      </FichesProvider>
    </AuthProvider>
  </React.StrictMode>
);
