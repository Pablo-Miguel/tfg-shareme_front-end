import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { checkAuthLoader, checkUnauthLoader } from "./utils/loaders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <HomePage />, loader: checkAuthLoader }],
  },
  {
    path: "/login",
    element: <LogInPage />,
    loader: checkUnauthLoader,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    loader: checkUnauthLoader,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
