import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import "./index.css";
import { AuthProvider } from "./services/AuthContext";
import App from "./App";
import { CaptchaProvider } from "./services/CaptchaContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
        <CaptchaProvider>
        

    <App />
        </CaptchaProvider>
  </AuthProvider>
);
