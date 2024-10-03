import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DBprovider } from "./contexts/DBContext.jsx";
import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DBprovider>
        <App />
      </DBprovider>
    </AuthProvider>
  </StrictMode>
);
