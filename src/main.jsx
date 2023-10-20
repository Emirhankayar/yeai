import React from 'react'
import * as ReactDOM from "react-dom/client";
const App = React.lazy(() => import('./App'));
import './index.css'
import { AuthProvider } from "./services/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
    </AuthProvider>,
)
