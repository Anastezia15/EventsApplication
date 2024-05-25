import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import SubscriptionsPage from "./pages/SubscriptionsPage.tsx";
import MyEventsPage from "./pages/MyEventsPage.tsx";
import CreateEventPage from "./pages/CreateEventPage.tsx";
import AllUsersPage from "./pages/AllUsersPage.tsx";
import EditUser from "./components/EditUser.tsx";
import CreateCategory from "./pages/CreateCategory.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "users",
        element: <AllUsersPage />,
      },
      {
        path: "catigories",
        element: <CreateCategory />,
      },
      {
        path: "users/:username",
        element: <EditUser />,
      },
      {
        path: "subscriptions",
        element: <SubscriptionsPage />,
      },
      {
        path: "events",
        element: <MyEventsPage />,
      },
      {
        path: "create",
        element: <CreateEventPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
