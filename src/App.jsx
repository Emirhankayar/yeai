import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "./utils/customTheme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomSpinner from "./common/Spinner";
const Navbar = React.lazy(() => import('./common/Navbar'));
const MainPg = React.lazy(() => import('./pages/MainPg'));
const CategoryPg = React.lazy(() => import('./pages/CategoryPg'));
const SubCategoryPg = React.lazy(() => import('./pages/SubCategoryPg'));
const PostSubPg = React.lazy(() => import('./pages/PostSubPg'));
const SignInPg = React.lazy(() => import('./pages/SignInPg'));
const AccountPg = React.lazy(() => import('./pages/AccountPg'));
const Footer = React.lazy(() => import('./common/Footer'));
import { Turnstile } from '@marsidev/react-turnstile'

import { useSupabaseAuth, handleBookmarkClick } from './utils/utils';
import { UserContext } from './services/UserContext';
import { BookmarkContext } from './services/BookmarkContext';
import { useBookmarks } from './hooks/useBookmarks';


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
    path: "/categories/:categoryName",
    element: <SubCategoryPg />,
  },
  {
    path: "/categories/:categoryName/:postId",
    element: <PostSubPg />,
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
    path: "/faq",
    element: <MainPg />,
  },
  {
    path: "/contact",
    element: <MainPg />,
  },
]);

export function App() {
  const [captchaCompleted, setCaptchaCompleted] = useState(localStorage.getItem('captchaCompleted') === 'true');
  const user = useSupabaseAuth();
  const [bookmarks, setBookmarks] = useBookmarks(user);

  useEffect(() => {
    localStorage.setItem('captchaCompleted', captchaCompleted);
  }, [captchaCompleted]);

  const handleCaptchaCompletion = () => {
    setCaptchaCompleted(true);
  };

  return (
    <ThemeProvider value={theme}>
    <UserContext.Provider value={user}>

    <BookmarkContext.Provider value={{ bookmarks, setBookmarks, handleBookmarkClick }}>

      <React.Suspense fallback={<CustomSpinner />}>
        {captchaCompleted ? (
          <>
            <Navbar />
            <div className="min-h-screen">
              <RouterProvider router={router} />
            </div>
            <Footer />
          </>
        ) : (
          <div className="container h-screen w-full flex flex-col gap-10 items-center justify-center">
            <div className="flex-col flex space-y-5">
              <span>Hooman being confirmed.</span>
              <CustomSpinner/>
            </div>
            <Turnstile
              siteKey={siteKey}
              onSuccess={(token) => { handleCaptchaCompletion(token); }} // Fix this line
            />
          </div>
        )}
      </React.Suspense>
      </BookmarkContext.Provider>

    </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
