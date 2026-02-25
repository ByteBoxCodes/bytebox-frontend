import Register from "../features/auth/Register";
import AuthPanel from "../components/common/AuthPanel";
import Header from "../components/layout/Header";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";

export default function RegisterPage() {
    return (
        <ThemeProvider>
            <div className="w-full min-h-screen flex flex-col font-sans relative
                        bg-(--bg-secondary) text-(--text-primary) transition-colors duration-200">

                {/* Global Header */}
                <Header />

                {/* Main Content Area */}
                <div className="flex flex-1 w-full overflow-hidden">
                    {/* ── Left Panel (shared) — customised for register ── */}
                    <AuthPanel mode="register" />

                    {/* ── Right Column ── */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative overflow-hidden z-10">

                        <div className="w-full max-w-md space-y-8 z-10">
                            {/* Mobile brand text removed since Header is now globally available */}

                            <Register />

                            <p className="text-center text-xs text-(--text-secondary) dark:text-(--dk-text-faint)">
                                By continuing, you agree to our{" "}
                                <Link to="/terms"
                                    className="underline underline-offset-4 hover:opacity-80 transition-opacity
                                             text-(--text-primary) dark:text-(--dk-text-muted)">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link to="/privacy"
                                    className="underline underline-offset-4 hover:opacity-80 transition-opacity
                                             text-(--text-primary) dark:text-(--dk-text-muted)">
                                    Privacy Policy
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
}
