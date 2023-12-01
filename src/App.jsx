import React, { useContext } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "./utils/customTheme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomSpinner from "./common/Spinner";
import { QueryClient, QueryClientProvider } from 'react-query';

const Navbar = React.lazy(() => import("./common/Navbar"));
const MainPg = React.lazy(() => import("./pages/MainPg"));
const CategoryPg = React.lazy(() => import("./pages/CategoryPg"));
const SignInPg = React.lazy(() => import("./pages/SignInPg"));
const AccountPg = React.lazy(() => import("./pages/AccountPg"));
const PromotePg = React.lazy(() => import("./pages/PromotePg"));
const Footer = React.lazy(() => import("./common/Footer"));

import ApproveTool from "./common/Approve";
import { Turnstile } from "@marsidev/react-turnstile";
import { BookmarkProvider } from "./services/BookmarkContext";
import { CategoryProvider } from "./hooks/useCategories";
import { CaptchaContext } from "./services/CaptchaContext";
import PrivateRoute from "./services/PrivateRoute";

import AuthProvider from "./services/AuthContext";

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
    path: "/tools",
    element: <CategoryPg />,
  },
  {
    path: "/sign-in",
    element: <SignInPg />,
  },
  {
    path: "/account",
    element: (
      <PrivateRoute>
        <AccountPg />
      </PrivateRoute>
    ),
  },
  {
    path: "/promote",
    element: (
      <PrivateRoute>
        <PromotePg />
      </PrivateRoute>
    ),
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
  const { captchaCompleted, handleCaptchaCompletion } =
    useContext(CaptchaContext);
    const queryClient = new QueryClient()

    
  if (!captchaCompleted) {
    return (
      <div className="min-h-screen flex flex-col gap-10 items-center justify-center">
        <h2>Hooman being confirmed</h2>

        <Turnstile siteKey={siteKey} onSuccess={handleCaptchaCompletion} />
      </div>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider value={theme}>
      <QueryClientProvider client={queryClient}>

        <BookmarkProvider>
          <CategoryProvider>
            <React.Suspense fallback={<CustomSpinner />}>
              <Navbar />
              <div className="min-h-screen">
                <RouterProvider router={router} />
              </div>
              <Footer />
            </React.Suspense>
          </CategoryProvider>
        </BookmarkProvider>

        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
