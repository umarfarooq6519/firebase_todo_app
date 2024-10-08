import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DBprovider } from "./contexts/DBContext.jsx";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DBprovider>
        <ReactLenis root>
          <App />
        </ReactLenis>
      </DBprovider>
    </AuthProvider>
  </StrictMode>
);
