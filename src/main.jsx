import { createRoot } from "react-dom/client";
import 'tailwindcss/tailwind.css'
import './index.css'
import { AuthProvider } from "./services/AuthContext";
import App from './App';
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
