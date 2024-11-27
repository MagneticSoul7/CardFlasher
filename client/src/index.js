import LoginPage from "./pages/LoginPage";
import ProfileCreationPage from "./pages/ProfileCreationPage";
import HomePage from "./pages/HomePage";
import DeckCreationPage from "./pages/DeckCreationPage";
import DeckViewPage from "./pages/DeckViewPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/createDeck", element: <DeckCreationPage /> },
      { path: "/viewDeck/:deckId", element: <DeckViewPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "*", element: <LoginPage /> },
      { path: "/createProfile", element: <ProfileCreationPage /> },
    ],
  },
]);

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
    root
  );
}
// ReactDOM.render(
//   <RouterProvider router={router}/>,
//   document.getElementById("root")
// );
