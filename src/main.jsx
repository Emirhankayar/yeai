import * as ReactDOM from "react-dom/client";
import './index.css'
import { AuthProvider } from "./services/AuthContext";
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
