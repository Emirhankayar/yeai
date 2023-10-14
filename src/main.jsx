import React from 'react'
import * as ReactDOM from "react-dom/client";
const App = React.lazy(() => import('./App'));
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
