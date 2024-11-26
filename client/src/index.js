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
      { path: "/Home", element: <HomePage /> },
      { path: "/CreateDeck", element: <DeckCreationPage /> },
      { path: "/ViewDeck/:deckId", element: <DeckViewPage /> },
      { path: "/About", element: <AboutPage /> },
      { path: "/Contact", element: <ContactPage /> },
      { path: "/Login", element: <LoginPage /> },
      { path: "*", element: <LoginPage /> },
      { path: "/CreateProfile", element: <ProfileCreationPage /> },
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
