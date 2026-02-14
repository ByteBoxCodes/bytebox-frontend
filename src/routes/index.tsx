
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import PracticeQuestionPage from "../pages/question/PracticeQuestionPage";
import ProblemPage from "../pages/ProblemPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/problems",
                element: <ProblemPage />,
            },
            {
                path: "/problems/:questionId",
                element: <PracticeQuestionPage />,
            },
        ],
    },
]);
