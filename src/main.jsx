import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FichesPage from "./pages/FichesPage.jsx";
import ProcessingPage from "./pages/ProcessingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { FichesProvider } from "./context/FichesContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ConfirmedDocumentPage from "./pages/ConfirmedDocumentPage.jsx";
import UnConfirmedDocumentPage from "./pages/UnConfirmedDocumentPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <ProcessingPage />,
      },
      {
        path: "invoices",
        element: <FichesPage />,
      },
      {
        path: "invoices/approved",
        element: <ConfirmedDocumentPage />,
      },
      {
        path: "invoices/unconfirmed",
        element: <UnConfirmedDocumentPage />,
      },
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
