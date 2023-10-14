import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomSpinner from "./common/Spinner";
const Navbar = React.lazy(() => import('./common/Navbar'));
const Footer = React.lazy(() => import('./common/Footer'));
const MainPg = React.lazy(() => import('./pages/MainPg'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPg />,
  },
  {
    path: "/features",
    element: <MainPg />,
  },
  {
    path: "/trending",
    element: <MainPg />,
  },
  {
    path: "/faq",
    element: <MainPg />,
  },
  {
    path: "/contact",
    element: <MainPg />,
  },
]);

function App() {
  return (
    <React.Suspense fallback={<CustomSpinner/>}>
      <Navbar/>
      <div className="mt-40 min-h-screen mb-96">
        <RouterProvider router={router}/>
      </div>
      <Footer/>

    </React.Suspense>
  );
}

export default App;
