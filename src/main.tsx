import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/home/HomePage.tsx";
import PracticePage from "./pages/practice/PracticePage.tsx";
import PracticeQuestionPage from "./pages/practice/PracticeQuestionPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/practice",
        element: <PracticePage />,
      },
      {
        path: "/practice/:questionId",
        element: <PracticeQuestionPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
