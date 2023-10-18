import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomSpinner from "./common/Spinner";

const Navbar = React.lazy(() => import('./common/Navbar'));
const MainPg = React.lazy(() => import('./pages/MainPg'));
const CategoryPg = React.lazy(() => import('./pages/CategoryPg'));
const SubCategoryPg = React.lazy(() => import('./pages/SubCategoryPg'));
const PostSubPg = React.lazy(() => import('./pages/PostSubPg'));

const Footer = React.lazy(() => import('./common/Footer'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPg />,
  },
  {
    path: "/about",
    element: <MainPg />,
  },
  {
    path: "/categories",
    element: <CategoryPg/>,
  },
  {
    path: "/categories/:categoryName",
    element: <SubCategoryPg />,
  },
  {
    path: "/categories/:categoryName/:postId",
    element: <PostSubPg />,
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
      <div className="min-h-screen">
        <RouterProvider router={router}/>
      </div>
      <Footer/>

    </React.Suspense>
  );
}

export default App;
