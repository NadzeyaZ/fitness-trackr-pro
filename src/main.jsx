import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout/Layout";

import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter } from "react-router";
import { ActivitiesProvider } from "./activities/ActivitiesContext.jsx";

createRoot(document.getElementById("root")).render(
  <ActivitiesProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ActivitiesProvider>,
);
