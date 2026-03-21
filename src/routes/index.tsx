import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProblemPage from "../pages/ProblemPage";
import LoginPage from "../pages/LoginPage";
import SubmissionPage from "../pages/SubmissionPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import UserProfilePage from "../pages/UserProfilePage";
import VerifyPage from "../pages/VerifyPage";
import ProtectedRoutes from "@/components/common/ProtectedRoutes";
import GuestRoute from "@/components/common/GuestRoute";
import LeaderboardPage from "../pages/LeaderboardPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <GuestRoute><LoginPage /></GuestRoute>,
    },
    {
        path: "/signup",
        element: <GuestRoute><RegisterPage /></GuestRoute>,
    },
    {
        path: "/reset-password",
        element: <GuestRoute><ResetPasswordPage /></GuestRoute>,
    },
    {
        path: "/verify",
        element: <VerifyPage />,
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
                element: <SubmissionPage />,
            },
            {
                path: "/profile",
                element: (<ProtectedRoutes><UserProfilePage /></ProtectedRoutes>),
            },
            {
                path: "/leaderboard",
                element: <LeaderboardPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
