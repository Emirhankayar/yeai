import React, {  useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "./utils/customTheme";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import CustomSpinner from "./common/Spinner";
const Navbar = React.lazy(() => import('./common/Navbar'));
const MainPg = React.lazy(() => import('./pages/MainPg'));
const CategoryPg = React.lazy(() => import('./pages/CategoryPg'));
const SignInPg = React.lazy(() => import('./pages/SignInPg'));
const AccountPg = React.lazy(() => import('./pages/AccountPg'));
const PromotePg = React.lazy(() => import('./pages/PromotePg'));
const Footer = React.lazy(() => import('./common/Footer'));

import ApproveTool from "./common/Approve";
import { Turnstile } from '@marsidev/react-turnstile'
import { useSupabaseAuth } from './utils/utils';
import { handleBookmarkClick } from "./utils/bookmarkUtils";
import { UserContext } from './services/UserContext';
import { BookmarkContext } from './services/BookmarkContext';
import { useBookmarks } from './hooks/useBookmarks';
import { CategoryContext } from './services/CategoryContext';
import { CaptchaContext } from "./services/CaptchaContext";

import useFetchCategories from "./hooks/useCategories";

const siteKey = import.meta.env.VITE_CAPTCHA_KEY;

const PrivateRoute = ({ children }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

let channel = new BroadcastChannel('my_channel');

window.onbeforeunload = function() {
  // Close the channel and remove listeners
  channel.close();
};

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
    path: "/tools",
    element: <CategoryPg />,
  },
  {
    path: "/sign-in",
    element: <SignInPg />,
  },
  {
    path: "/account",
    element: <PrivateRoute><AccountPg /></PrivateRoute>,
  },
  {
    path: "/promote",
    element: <PrivateRoute><PromotePg /></PrivateRoute>,
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
  const { captchaCompleted, handleCaptchaCompletion } = useContext(CaptchaContext);
  const user = useSupabaseAuth();
  const categories = useFetchCategories(); 
  const [bookmarks, setBookmarks] = useBookmarks(user);
  

  if (!captchaCompleted) {
    return (
      <div className="min-h-screen flex flex-col gap-10 items-center justify-center">
        <h2>Hooman being confirmed</h2> 

        <Turnstile
          siteKey={siteKey}
          onSuccess={handleCaptchaCompletion}
          />
      </div>
    );
  }

  

  return (

    
    <ThemeProvider value={theme}>
      <UserContext.Provider value={user}>
        <CategoryContext.Provider value={categories}>
          <BookmarkContext.Provider value={{ bookmarks, setBookmarks, handleBookmarkClick }}>
            <React.Suspense fallback={<CustomSpinner />}>
                  <Navbar />
                  <div className="min-h-screen">
                    <RouterProvider router={router} />
                  </div>
                  <Footer />
            </React.Suspense>
          </BookmarkContext.Provider>
        </CategoryContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
