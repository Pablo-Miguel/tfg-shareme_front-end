import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { checkAuthLoader, checkUnauthLoader, getCollectionByIdLoader, getCollectionStuffLoader, getGlobalCollectionStuffLoader, getStuffByIdLoader, getUserByIdLoader, getUsersLoader } from "./utils/loaders";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import CreateStuffPage from "./pages/CreateStuffPage";
import DetailsPage from "./pages/StuffDetailsPage";
import CreateCollectionPage from "./pages/CreateCollectionPage";
import CollectionDetailsPage from "./pages/CollectionDetailsPage";
import SearchProfilesPage from "./pages/SearchProfilesPage";
import EditProfile from "./pages/EditProfile";
import EditStuffPage from "./pages/EditStuffPage";
import EditCollectionPage from "./pages/EditCollectionPage";
import SearchCollectionsPage from "./pages/SearchCollectionsPage";

export const router = createBrowserRouter([
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
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/search-collections",
        id: 'search-collections',
        element: <SearchCollectionsPage />,
        loader: getGlobalCollectionStuffLoader,
      },
      {
        path: "/search-profiles",
        id: 'search-profiles',
        element: <SearchProfilesPage />,
        loader: getUsersLoader,
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
      },
      {
        path: "/edit-profile",
        element: <EditProfile />
      },
      {
        path: "/edit-stuff/:stuff_id",
        id: 'edit-stuff',
        element: <EditStuffPage />,
        loader: getStuffByIdLoader
      },
      {
        path: "/edit-collection/:collection_id",
        id: 'edit-collection',
        element: <EditCollectionPage />,
        loader: getCollectionByIdLoader
      }
    ],
    loader: checkAuthLoader
  },
  { path: "*", element: <ErrorPage /> }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
