import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { checkAuthLoader, checkUnauthLoader, getStuffByIdLoader, getUserByIdLoader } from "./utils/loaders";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import AddStuffPage from "./pages/AddStuffPage";
import DetailsPage from "./pages/DetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: checkAuthLoader },
      {
        path: "/profile/:user_id",
        id: 'user-details',
        element: <ProfilePage />,
        loader: getUserByIdLoader,
      },
      {
        path: "/add-stuff",
        element: <AddStuffPage />
      },
      {
        path: "/details/:stuff_id",
        id: 'stuff-details',
        element: <DetailsPage />,
        loader: getStuffByIdLoader
      }
    ],
    loader: checkAuthLoader
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
  },
  { path: "*", element: <ErrorPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
