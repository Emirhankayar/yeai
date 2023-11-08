import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "./utils/customTheme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomSpinner from "./common/Spinner";
const Navbar = React.lazy(() => import('./common/Navbar'));
const MainPg = React.lazy(() => import('./pages/MainPg'));
const CategoryPg = React.lazy(() => import('./pages/CategoryPg'));
const SignInPg = React.lazy(() => import('./pages/SignInPg'));
const AccountPg = React.lazy(() => import('./pages/AccountPg'));
const PromotePg = React.lazy(() => import('./pages/PromotePg'));
const Footer = React.lazy(() => import('./common/Footer'));
import { Turnstile } from '@marsidev/react-turnstile'
import ApproveTool from "./common/Approve";
import { useSupabaseAuth, handleBookmarkClick } from './utils/utils';
import { UserContext } from './services/UserContext';
import { BookmarkContext } from './services/BookmarkContext';
import { useBookmarks } from './hooks/useBookmarks';
import { CategoryContext } from './services/CategoryContext';

const siteKey = import.meta.env.VITE_CAPTCHA_KEY;

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
    element: <CategoryPg />,
  },
  {
    path: "/sign-in",
    element: <SignInPg />,
  },
  {
    path: "/account",
    element: <AccountPg />,
  },
  {
    path: "/promote",
    element: <PromotePg />,
  },
  {
    path: "/contact",
    element: <MainPg />,
  },
  {
    path: "/approve-tool",
    element: <ApproveTool />,
  },
]);

export function App() {
  const [captchaCompleted, setCaptchaCompleted] = useState(localStorage.getItem('captchaCompleted') === 'true');
  const user = useSupabaseAuth();
  const [bookmarks, setBookmarks] = useBookmarks(user);
  const categories = useContext(CategoryContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('captchaCompleted', captchaCompleted);
  }, [captchaCompleted]);
  
  const handleCaptchaCompletion = () => {
    setIsLoading(true);
    setCaptchaCompleted(true);
    setIsLoading(false);
  };

  return (
    <ThemeProvider value={theme}>
      <UserContext.Provider value={user}>
        <CategoryContext.Provider value={categories}>
          <BookmarkContext.Provider value={{ bookmarks, setBookmarks, handleBookmarkClick }}>
            <React.Suspense fallback={<CustomSpinner />}>
                <>
                  <Navbar />
                  <div className="min-h-screen">
                    <RouterProvider router={router} />
                  </div>
                  <Footer />
                </>

            </React.Suspense>
          </BookmarkContext.Provider>
        </CategoryContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
