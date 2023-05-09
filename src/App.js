import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { checkAuthLoader, checkUnauthLoader, getCollectionByIdLoader, getCollectionStuffLoader, getStuffByIdLoader, getUserByIdLoader } from "./utils/loaders";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import CreateStuffPage from "./pages/CreateStuffPage";
import DetailsPage from "./pages/StuffDetailsPage";
import CreateCollectionPage from "./pages/CreateCollectionPage";
import CollectionDetailsPage from "./pages/CollectionDetailsPage";
import SearchProfilesPage from "./pages/SearchProfilesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: checkAuthLoader },
      {
        path: "/search-profiles",
        element: <SearchProfilesPage />,
      },
      {
        path: "/profile/:user_id",
        id: 'user-details',
        element: <ProfilePage />,
        loader: getUserByIdLoader,
      },
      {
        path: "/create-stuff",
        element: <CreateStuffPage />
      },
      {
        path: "/stuff-details/:stuff_id",
        id: 'stuff-details',
        element: <DetailsPage />,
        loader: getStuffByIdLoader
      },
      {
        path: "/collection-details/:collection_id",
        id: 'collection-details',
        element: <CollectionDetailsPage />,
        loader: getCollectionByIdLoader
      },
      {
        path: "/create-collection",
        id: 'collection-stuff-details',
        element: <CreateCollectionPage />,
        loader: getCollectionStuffLoader
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
