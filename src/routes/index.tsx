import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProblemPage from "../pages/ProblemPage";
import LoginPage from "../pages/LoginPage";
import SubmissionPage from "../pages/SubmissionPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/UserProfilePage";
import ProtectedRoutes from "@/components/common/ProtectedRoutes";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <RegisterPage />,
    },
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
                path: "/problem/:questionId",
                element: (<ProtectedRoutes><SubmissionPage /></ProtectedRoutes>),
            },
            {
                path: "/profile",
                element: (<ProtectedRoutes><UserProfilePage /></ProtectedRoutes>),
            },
        ],
    },
]);
