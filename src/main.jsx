import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import "./index.css";
import App from "./App";
import { CaptchaProvider } from "./services/CaptchaContext";

createRoot(document.getElementById("root")).render(
        <CaptchaProvider>

        <App />
        
        </CaptchaProvider>
);
