import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./component/homepage";
import Profile from "./component/profile";
import RepoDetail from "./component/reposDetail";
import Following from "./component/following";
import Followers from "./component/followers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "profile/:id",
    element: <Profile />,
  },
  {
    path: "/reposDetail/:id/:Detail",
    element: <RepoDetail />,
  },
  {
    path: "/following/:id",
    element: <Following />,
  },
  {
    path: "/followers/:id",
    element: <Followers />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
