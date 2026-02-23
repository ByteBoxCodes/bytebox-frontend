import Login from "../features/auth/Login";
import AuthPanel from "../components/common/AuthPanel";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";

export default function LoginPage() {
    return (
        <ThemeProvider>
            <div className="w-full h-screen flex overflow-hidden font-sans relative
                        bg-(--bg-secondary) text-(--text-primary) transition-colors duration-200">

                {/* Dark mode gradient overlay */}
                <div className="absolute inset-0 hidden dark:block pointer-events-none"
                    style={{ background: `linear-gradient(to bottom right, var(--dk-bg-from), var(--dk-bg-via), var(--dk-bg-to))` }} />

                {/* ── Left Panel (shared) ── */}
                <AuthPanel />

                {/* ── Right Column ── */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative overflow-hidden z-10">

                    {/* Dark mode blob */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
                        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-3xl"
                            style={{ background: "var(--dk-blob-a)" }} />
                    </div>

                    <div className="w-full max-w-md space-y-8 z-10">
                        {/* Mobile brand */}
                        <div className="lg:hidden text-center">
                            <Link to="/" className="text-3xl font-extrabold text-(--text-primary) dark:text-(--dk-text)">
                                ByteBox
                            </Link>
                        </div>

                        <Login />

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
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
}
