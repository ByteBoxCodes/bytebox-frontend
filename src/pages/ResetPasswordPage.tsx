import ResetPassword from "../features/auth/ResetPassword";
import AuthPanel from "../components/common/AuthPanel";
import Header from "../components/layout/Header";

export default function ResetPasswordPage() {
    return (
        <div className="w-full min-h-screen flex flex-col font-sans relative
                    bg-(--bg-secondary) text-(--text-primary) transition-colors duration-200">

            {/* Global Header */}
            <Header />

            {/* Main Content Area */}
            <div className="flex flex-1 w-full overflow-hidden">
                {/* ── Left Panel (shared) ── */}
                <AuthPanel mode="login" />

                {/* ── Right Column ── */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative overflow-hidden z-10">
                    <div className="w-full max-w-md space-y-8 z-10">
                        <ResetPassword />
                    </div>
                </div>
            </div>
        </div>
    );
}
